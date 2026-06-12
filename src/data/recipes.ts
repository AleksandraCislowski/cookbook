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
    slug: "poke-bowl-z-szarpana-wolowina",
    title: "Poke bowl z szarpaną wołowiną",
    description:
      "Kolorowa miska z ryżem, soczystą szarpaną wołowiną, chrupiącymi warzywami, mango i sojowo-limonkowym sosem.",
    category: "Obiad",
    cuisine: "Nowoczesna domowa",
    difficulty: "medium",
    prepTime: 25,
    cookTime: 180,
    servings: 4,
    image: "/images/recipes/poke-bowl-z-szarpana-wolowina.png",
    tags: ["miska", "wołowina", "ryż", "przygotowanie posiłków", "świeże warzywa"],
    ingredients: [
      "800 g łopatki wołowej, mostka albo pręgi wołowej",
      "1 łyżka oleju neutralnego",
      "1 cebula",
      "3 ząbki czosnku",
      "3 łyżki sosu sojowego",
      "2 łyżki sosu hoisin",
      "1 łyżka octu ryżowego albo soku z limonki",
      "1 łyżka miodu albo brązowego cukru",
      "1 łyżeczka startego imbiru",
      "1/2 łyżeczki płatków chili",
      "250 ml bulionu wołowego albo wody",
      "300 g ryżu jaśminowego albo sushi",
      "Ogórek, marchewka, mango, awokado, edamame i czerwona kapusta",
      "Dymka, sezam, kolendra albo mięta do podania",
    ],
    steps: [
      "Osusz wołowinę, dopraw solą i pieprzem, a potem obsmaż ją w ciężkim garnku.",
      "Dodaj cebulę, czosnek, imbir, chili, sos sojowy, hoisin, ocet ryżowy, miód i bulion.",
      "Duś pod przykryciem przez 2,5-3 godziny, aż mięso będzie bardzo miękkie.",
      "Poszarp mięso widelcami i wymieszaj je z sosem z garnka.",
      "Ugotuj ryż i wymieszaj sos do podania z sosu sojowego, oleju sezamowego, limonki, miodu i srirachy.",
      "Pokrój warzywa, mango i awokado, a edamame podgrzej albo przepłucz gorącą wodą.",
      "Złóż miski z ryżu, wołowiny i dodatków, polej sosem i posyp sezamem oraz ziołami.",
    ],
    note:
      "Wołowina powinna być miękka, lepka i dobrze pokryta sosem. Jeśli po 3 godzinach dalej stawia opór, duś ją dłużej.",
    addedDate: "2026-06-12",
  },
];
