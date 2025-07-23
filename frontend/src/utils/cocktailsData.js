// Mock data for Tabú Mixología cocktails
export const cocktailsData = [
  {
    id: 1,
    name: "Negroni Classico",
    category: "classic",
    description: "Una perfecta armonía entre amargor y dulzura, el Negroni representa la esencia de la coctelería italiana con su equilibrio magistral.",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ingredients: [
      { name: "Gin", quantity: "30", unit: "ml" },
      { name: "Campari", quantity: "30", unit: "ml" },
      { name: "Vermouth Rosso", quantity: "30", unit: "ml" },
      { name: "Naranja", quantity: "1", unit: "twist" }
    ],
    instructions: [
      "Combinar gin, Campari y vermouth en un vaso mezclador con hielo",
      "Remover suavemente durante 15 segundos",
      "Colar sobre hielo en un vaso old fashioned",
      "Expresar los aceites de la cáscara de naranja sobre la superficie",
      "Decorar con el twist de naranja"
    ],
    preparation: "Agitado",
    glass: "Old Fashioned",
    garnish: "Twist de naranja",
    difficulty: "Intermedio",
    time: "3 minutos"
  },
  {
    id: 2,
    name: "Whiskey Sour Ahumado",
    category: "modern",
    description: "Una reinterpretación contemporánea del clásico, donde las notas ahumadas del whiskey se fusionan con la acidez perfecta del limón.",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ingredients: [
      { name: "Whiskey Bourbon", quantity: "60", unit: "ml" },
      { name: "Jugo de limón fresco", quantity: "25", unit: "ml" },
      { name: "Jarabe simple", quantity: "20", unit: "ml" },
      { name: "Clara de huevo", quantity: "1", unit: "unidad" },
      { name: "Chips de madera ahumada", quantity: "al gusto", unit: "" }
    ],
    instructions: [
      "Ahumar el vaso con chips de madera durante 30 segundos",
      "En coctelera, combinar whiskey, jugo de limón y jarabe",
      "Agregar clara de huevo y realizar dry shake",
      "Añadir hielo y agitar vigorosamente por 15 segundos",
      "Doble colar en el vaso ahumado con hielo fresco",
      "Decorar con espuma natural y twist de limón"
    ],
    preparation: "Agitado",
    glass: "Copa coupe",
    garnish: "Twist de limón",
    difficulty: "Avanzado",
    time: "5 minutos"
  },
  {
    id: 3,
    name: "Virgin Mojito Elegante",
    category: "mocktail",
    description: "La frescura de la menta cubana se encuentra con la sofisticación, creando una experiencia refrescante sin alcohol pero llena de carácter.",
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ingredients: [
      { name: "Hojas de menta fresca", quantity: "10", unit: "hojas" },
      { name: "Jugo de lima fresco", quantity: "30", unit: "ml" },
      { name: "Jarabe de azúcar", quantity: "20", unit: "ml" },
      { name: "Agua con gas", quantity: "120", unit: "ml" },
      { name: "Lima", quantity: "2", unit: "gajos" }
    ],
    instructions: [
      "Macerar suavemente las hojas de menta en el fondo del vaso",
      "Agregar gajos de lima y jarabe, macerar levemente",
      "Llenar el vaso con hielo hasta ¾",
      "Completar con agua con gas",
      "Remover con cuchara de bar desde abajo",
      "Decorar con ramo de menta fresca y gajo de lima"
    ],
    preparation: "Macerado",
    glass: "Highball",
    garnish: "Menta fresca y lima",
    difficulty: "Fácil",
    time: "2 minutos"
  },
  {
    id: 4,
    name: "Manhattan Premium",
    category: "classic",
    description: "El rey de los cócteles clásicos, donde el whiskey de centeno encuentra su complemento perfecto en el vermouth dulce y la amargura sutil.",
    image: "https://images.unsplash.com/photo-1570797197190-8e003a00c846?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ingredients: [
      { name: "Whiskey de centeno", quantity: "60", unit: "ml" },
      { name: "Vermouth dulce", quantity: "30", unit: "ml" },
      { name: "Angostura bitters", quantity: "3", unit: "dashes" },
      { name: "Cereza marasquino", quantity: "1", unit: "unidad" }
    ],
    instructions: [
      "Combinar whiskey, vermouth y bitters en vaso mezclador",
      "Agregar hielo y remover durante 20 segundos",
      "Colar en copa coupe fría",
      "Decorar con cereza marasquino en palillo",
      "Expresar aceites de cáscara de limón sobre la superficie"
    ],
    preparation: "Revuelto",
    glass: "Copa coupe",
    garnish: "Cereza marasquino",
    difficulty: "Intermedio",
    time: "4 minutos"
  },
  {
    id: 5,
    name: "Espresso Martini Deconstruido",
    category: "modern",
    description: "Una experiencia sensorial única donde el café encuentra su expresión más sofisticada, fusionando texturas y temperaturas contrastantes.",
    image: "https://images.unsplash.com/photo-1593240096-c61b6f82c4a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ingredients: [
      { name: "Vodka premium", quantity: "45", unit: "ml" },
      { name: "Licor de café", quantity: "15", unit: "ml" },
      { name: "Espresso frío", quantity: "30", unit: "ml" },
      { name: "Jarabe simple", quantity: "10", unit: "ml" },
      { name: "Granos de café", quantity: "3", unit: "unidades" }
    ],
    instructions: [
      "Preparar espresso y enfriar completamente",
      "En coctelera con hielo, combinar vodka, licor y espresso",
      "Agregar jarabe simple al gusto",
      "Agitar vigorosamente hasta crear espuma natural",
      "Doble colar en copa martini fría",
      "Decorar con 3 granos de café flotando en la espuma"
    ],
    preparation: "Agitado",
    glass: "Copa martini",
    garnish: "Granos de café",
    difficulty: "Avanzado",
    time: "6 minutos"
  },
  {
    id: 6,
    name: "Gin Tonic Botánico",
    category: "modern",
    description: "Una celebración de los botánicos donde cada sorbo revela capas complejas de sabores herbales y cítricos en perfecta armonía.",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ingredients: [
      { name: "Gin botánico", quantity: "50", unit: "ml" },
      { name: "Tónica premium", quantity: "150", unit: "ml" },
      { name: "Pepino", quantity: "3", unit: "rodajas" },
      { name: "Romero fresco", quantity: "1", unit: "rama" },
      { name: "Lima", quantity: "1", unit: "gajo" }
    ],
    instructions: [
      "Enfriar copa balloon en congelador",
      "Macerar suavemente pepino en el fondo de la copa",
      "Agregar hielo hasta llenar ¾ de la copa",
      "Verter gin lentamente sobre el hielo",
      "Completar con tónica, vertiendo suavemente",
      "Flamear rama de romero y colocar como decoración",
      "Decorar con gajo de lima y rodajas de pepino"
    ],
    preparation: "Directo",
    glass: "Copa balloon",
    garnish: "Pepino, romero y lima",
    difficulty: "Intermedio",
    time: "3 minutos"
  }
];

// Filter categories for cocktails
export const filterCategories = [
  { id: 'all', name: 'Todos', count: cocktailsData.length },
  { id: 'classic', name: 'Clásicos', count: cocktailsData.filter(c => c.category === 'classic').length },
  { id: 'modern', name: 'Modernos', count: cocktailsData.filter(c => c.category === 'modern').length },
  { id: 'mocktail', name: 'Sin Alcohol', count: cocktailsData.filter(c => c.category === 'mocktail').length }
];

// Utility functions for data manipulation
export const getCocktailById = (id) => {
  return cocktailsData.find(cocktail => cocktail.id === parseInt(id));
};

export const getCocktailsByCategory = (category) => {
  if (category === 'all') return cocktailsData;
  return cocktailsData.filter(cocktail => cocktail.category === category);
};

export const searchCocktails = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return cocktailsData.filter(cocktail => 
    cocktail.name.toLowerCase().includes(lowercaseQuery) ||
    cocktail.description.toLowerCase().includes(lowercaseQuery) ||
    cocktail.ingredients.some(ingredient => 
      ingredient.name.toLowerCase().includes(lowercaseQuery)
    )
  );
};

// Local storage utilities for favorites
export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem('tabu-favorites');
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error reading favorites from localStorage:', error);
    return [];
  }
};

export const addToFavorites = (cocktailId) => {
  try {
    const favorites = getFavorites();
    if (!favorites.includes(cocktailId)) {
      favorites.push(cocktailId);
      localStorage.setItem('tabu-favorites', JSON.stringify(favorites));
    }
    return favorites;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    return getFavorites();
  }
};

export const removeFromFavorites = (cocktailId) => {
  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(id => id !== cocktailId);
    localStorage.setItem('tabu-favorites', JSON.stringify(updatedFavorites));
    return updatedFavorites;
  } catch (error) {
    console.error('Error removing from favorites:', error);
    return getFavorites();
  }
};

export const isFavorite = (cocktailId) => {
  const favorites = getFavorites();
  return favorites.includes(cocktailId);
};
