import {
  createMealPlanDocument,
  normalizeMealPlanDocument,
  type MealPlanDocument,
} from '@/data/mealPlan';

const STORAGE_KEY = 'cookbook.weeklyMealPlan.v1';

export function readLocalMealPlanDocument() {
  if (typeof window === 'undefined') {
    return createMealPlanDocument();
  }

  try {
    const storedDocument = window.localStorage.getItem(STORAGE_KEY);

    if (!storedDocument) {
      return createMealPlanDocument();
    }

    return normalizeMealPlanDocument(JSON.parse(storedDocument));
  } catch {
    return createMealPlanDocument();
  }
}

export function saveLocalMealPlanDocument(document: MealPlanDocument) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(document));
}
