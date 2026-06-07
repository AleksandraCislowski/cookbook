export type Recipe = {
  slug: string;
  title: string;
  description: string;
  category: string;
  cuisine: string;
  difficulty: "easy" | "medium" | "slow";
  prepTime: number;
  cookTime: number;
  servings: number;
  image: string;
  tags: string[];
  ingredients: string[];
  steps: string[];
  note: string;
  addedDate: string;
};

export const recipes: Recipe[] = [
  {
    slug: "lemon-ricotta-pancakes",
    title: "Lemon Ricotta Pancakes",
    description: "Fluffy weekend pancakes with lemon zest and creamy ricotta.",
    category: "Breakfast",
    cuisine: "Modern",
    difficulty: "easy",
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    image:
      "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=1200&q=80",
    tags: ["sweet", "weekend", "vegetarian"],
    ingredients: [
      "250 g ricotta",
      "2 eggs",
      "180 ml milk",
      "180 g flour",
      "1 lemon, zested",
      "1 tbsp sugar",
    ],
    steps: [
      "Whisk ricotta, eggs, milk, lemon zest, and sugar.",
      "Fold in flour until the batter is just combined.",
      "Cook small pancakes on a lightly buttered pan.",
      "Serve with berries, yogurt, or maple syrup.",
    ],
    note: "Blueberries can go straight into the pan after pouring the batter.",
    addedDate: "2026-06-07",
  },
  {
    slug: "tomato-butter-beans",
    title: "Tomato Butter Beans",
    description: "Creamy beans in a garlicky tomato sauce with herbs and olive oil.",
    category: "Dinner",
    cuisine: "Mediterranean",
    difficulty: "easy",
    prepTime: 12,
    cookTime: 25,
    servings: 3,
    image:
      "https://images.unsplash.com/photo-1515516969-d4008cc6241a?auto=format&fit=crop&w=1200&q=80",
    tags: ["quick", "vegetarian", "pantry"],
    ingredients: [
      "2 cans butter beans",
      "400 g crushed tomatoes",
      "3 garlic cloves",
      "1 tsp smoked paprika",
      "A handful of parsley",
      "Olive oil",
    ],
    steps: [
      "Soften garlic in olive oil without browning it.",
      "Add tomatoes, paprika, salt, and pepper.",
      "Simmer until glossy, then fold in drained beans.",
      "Finish with parsley and a little more olive oil.",
    ],
    note: "Good with toasted sourdough or a crisp green salad.",
    addedDate: "2026-06-04",
  },
  {
    slug: "miso-mushroom-udon",
    title: "Miso Mushroom Udon",
    description: "A warm noodle bowl with mushrooms, miso, ginger, and greens.",
    category: "Dinner",
    cuisine: "Japanese-inspired",
    difficulty: "medium",
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    image:
      "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=1200&q=80",
    tags: ["comfort", "noodles", "vegetarian"],
    ingredients: [
      "2 portions udon noodles",
      "250 g mushrooms",
      "2 tbsp white miso",
      "1 thumb ginger",
      "700 ml vegetable stock",
      "Pak choi or spinach",
    ],
    steps: [
      "Brown mushrooms in a hot pan until deeply golden.",
      "Add ginger and vegetable stock.",
      "Whisk miso with a little hot broth, then stir it back in.",
      "Add noodles and greens, then serve immediately.",
    ],
    note: "Keep miso below a hard boil for the best flavor.",
    addedDate: "2026-06-02",
  },
  {
    slug: "herb-roasted-salmon",
    title: "Herb Roasted Salmon",
    description: "Salmon with dill, parsley, lemon, and a fast cucumber salad.",
    category: "Dinner",
    cuisine: "Nordic",
    difficulty: "easy",
    prepTime: 10,
    cookTime: 18,
    servings: 4,
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80",
    tags: ["fish", "fresh", "weeknight"],
    ingredients: [
      "600 g salmon fillet",
      "1 lemon",
      "Dill and parsley",
      "1 cucumber",
      "Greek yogurt",
      "Black pepper",
    ],
    steps: [
      "Cover salmon with herbs, lemon zest, salt, and pepper.",
      "Roast until just cooked through.",
      "Toss cucumber with yogurt, dill, lemon juice, and salt.",
      "Serve salmon with cucumber salad and potatoes.",
    ],
    note: "Take salmon out when it still looks slightly glossy in the center.",
    addedDate: "2026-05-29",
  },
  {
    slug: "cardamom-plum-cake",
    title: "Cardamom Plum Cake",
    description: "Soft snacking cake with tart plums and warm cardamom.",
    category: "Baking",
    cuisine: "Home baking",
    difficulty: "medium",
    prepTime: 20,
    cookTime: 45,
    servings: 8,
    image:
      "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=1200&q=80",
    tags: ["dessert", "autumn", "vegetarian"],
    ingredients: [
      "180 g butter",
      "160 g sugar",
      "3 eggs",
      "190 g flour",
      "1 tsp cardamom",
      "6 plums",
    ],
    steps: [
      "Cream butter and sugar until pale.",
      "Beat in eggs one at a time.",
      "Fold in flour and cardamom.",
      "Top with sliced plums and bake until golden.",
    ],
    note: "Excellent the next morning with coffee.",
    addedDate: "2026-05-21",
  },
];
