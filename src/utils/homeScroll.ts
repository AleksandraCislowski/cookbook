export const HOME_SCROLL_RESTORE_KEY = 'cookbook-restore-home-scroll';
export const HOME_SCROLL_RECIPE_SLUG_KEY = 'cookbook-home-scroll-recipe-slug';
export const HOME_SCROLL_STORAGE_KEY = 'cookbook-home-scroll-y';

export function rememberHomeScrollPosition(recipeSlug?: string) {
  sessionStorage.setItem(HOME_SCROLL_STORAGE_KEY, String(window.scrollY));

  if (recipeSlug) {
    sessionStorage.setItem(HOME_SCROLL_RECIPE_SLUG_KEY, recipeSlug);
  }
}

export function requestHomeScrollRestore() {
  sessionStorage.setItem(HOME_SCROLL_RESTORE_KEY, 'true');
}
