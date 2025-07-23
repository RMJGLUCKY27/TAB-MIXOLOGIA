import { useState, useCallback } from 'react';

/**
 * Custom hook for form validation with real-time feedback
 * Provides validation state management and error handling
 * 
 * @param {Object} initialValues - Initial form values
 * @param {Object} validationRules - Validation rules for each field
 * @returns {Object} Form state and validation methods
 */
export const useFormValidation = (initialValues = {}, validationRules = {}) => {
  // Form state management
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Validation rule functions
   */
  const validationMethods = {
    required: (value, message = 'Este campo es requerido') => {
      if (!value || (typeof value === 'string' && !value.trim())) {
        return message;
      }
      return null;
    },

    email: (value, message = 'Introduce un email válido') => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        return message;
      }
      return null;
    },

    minLength: (length, message) => (value) => {
      if (value && value.length < length) {
        return message || `Mínimo ${length} caracteres`;
      }
      return null;
    },

    maxLength: (length, message) => (value) => {
      if (value && value.length > length) {
        return message || `Máximo ${length} caracteres`;
      }
      return null;
    },

    pattern: (regex, message = 'Formato inválido') => (value) => {
      if (value && !regex.test(value)) {
        return message;
      }
      return null;
    },

    phone: (value, message = 'Introduce un número de teléfono válido') => {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (value && !phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
        return message;
      }
      return null;
    },

    custom: (validatorFn, message) => (value) => {
      if (!validatorFn(value)) {
        return message || 'Valor inválido';
      }
      return null;
    }
  };

  /**
   * Validate a single field
   * @param {string} fieldName - Name of the field to validate
   * @param {*} value - Value to validate
   * @returns {string|null} Error message or null if valid
   */
  const validateField = useCallback((fieldName, value) => {
    const rules = validationRules[fieldName];
    if (!rules) return null;

    // Convert single rule to array for consistent processing
    const rulesArray = Array.isArray(rules) ? rules : [rules];

    for (const rule of rulesArray) {
      let error = null;

      if (typeof rule === 'function') {
        // Custom validation function
        error = rule(value);
      } else if (typeof rule === 'object' && rule.type) {
        // Predefined validation rule
        const { type, message, ...params } = rule;
        const validator = validationMethods[type];

        if (validator) {
          if (params && Object.keys(params).length > 0) {
            // Rule with parameters (e.g., minLength)
            const paramValues = Object.values(params);
            error = validator(...paramValues, message)(value);
          } else {
            // Simple rule (e.g., required, email)
            error = validator(value, message);
          }
        }
      } else if (typeof rule === 'string') {
        // Simple rule name
        const validator = validationMethods[rule];
        if (validator) {
          error = validator(value);
        }
      }

      // Return first error found
      if (error) {
        return error;
      }
    }

    return null;
  }, [validationRules]);

  /**
   * Validate all fields
   * @returns {Object} Object with field names as keys and error messages as values
   */
  const validateAllFields = useCallback(() => {
    const newErrors = {};
    
    Object.keys(validationRules).forEach(fieldName => {
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
      }
    });

    return newErrors;
  }, [values, validateField, validationRules]);

  /**
   * Handle input change with validation
   * @param {string} fieldName - Name of the field
   * @param {*} value - New value
   */
  const handleChange = useCallback((fieldName, value) => {
    // Update value
    setValues(prev => ({
      ...prev,
      [fieldName]: value
    }));

    // Validate field if it has been touched
    if (touched[fieldName]) {
      const error = validateField(fieldName, value);
      setErrors(prev => ({
        ...prev,
        [fieldName]: error
      }));
    }
  }, [touched, validateField]);

  /**
   * Handle field blur (mark as touched and validate)
   * @param {string} fieldName - Name of the field
   */
  const handleBlur = useCallback((fieldName) => {
    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [fieldName]: true
    }));

    // Validate field
    const error = validateField(fieldName, values[fieldName]);
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  }, [values, validateField]);

  /**
   * Reset form to initial state
   */
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  /**
   * Set specific field value and validate
   * @param {string} fieldName - Name of the field
   * @param {*} value - New value
   */
  const setValue = useCallback((fieldName, value) => {
    setValues(prev => ({
      ...prev,
      [fieldName]: value
    }));

    // Validate if touched
    if (touched[fieldName]) {
      const error = validateField(fieldName, value);
      setErrors(prev => ({
        ...prev,
        [fieldName]: error
      }));
    }
  }, [touched, validateField]);

  /**
   * Set multiple values at once
   * @param {Object} newValues - Object with field names and values
   */
  const setMultipleValues = useCallback((newValues) => {
    if (typeof newValues === 'function') {
      setValues(newValues);
    } else {
      setValues(prev => ({
        ...prev,
        ...newValues
      }));
    }
  }, []);

  /**
   * Handle form submission with validation
   * @param {Function} onSubmit - Submit handler function
   * @returns {Function} Submit handler
   */
  const handleSubmit = useCallback((onSubmit) => {
    return async (event) => {
      if (event) {
        event.preventDefault();
      }

      setIsSubmitting(true);

      // Validate all fields
      const formErrors = validateAllFields();
      setErrors(formErrors);

      // Mark all fields as touched
      const allTouched = Object.keys(validationRules).reduce((acc, fieldName) => {
        acc[fieldName] = true;
        return acc;
      }, {});
      setTouched(allTouched);

      // Check if form is valid
      const isValid = Object.keys(formErrors).length === 0;

      if (isValid && onSubmit) {
        try {
          await onSubmit(values);
        } catch (error) {
          console.error('Form submission error:', error);
        }
      }

      setIsSubmitting(false);
      return isValid;
    };
  }, [values, validateAllFields, validationRules]);

  /**
   * Check if form is valid
   */
  const isValid = Object.keys(errors).length === 0 && 
                  Object.keys(validationRules).every(field => !validateField(field, values[field]));

  /**
   * Check if form has been modified
   */
  const isDirty = JSON.stringify(values) !== JSON.stringify(initialValues);

  /**
   * Get field props for easy integration with inputs
   * @param {string} fieldName - Name of the field
   * @returns {Object} Props to spread on input component
   */
  const getFieldProps = useCallback((fieldName) => {
    return {
      value: values[fieldName] || '',
      onChange: (e) => {
        const value = e.target ? e.target.value : e;
        handleChange(fieldName, value);
      },
      onBlur: () => handleBlur(fieldName),
      error: touched[fieldName] ? errors[fieldName] : undefined,
      'aria-invalid': touched[fieldName] && errors[fieldName] ? 'true' : 'false',
      'aria-describedby': errors[fieldName] ? `${fieldName}-error` : undefined
    };
  }, [values, errors, touched, handleChange, handleBlur]);

  return {
    // Form state
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    isDirty,

    // Methods
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setValue,
    setMultipleValues,
    validateField,
    validateAllFields,
    getFieldProps
  };
};

export default useFormValidation;
