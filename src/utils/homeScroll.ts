export const HOME_SCROLL_RESTORE_KEY = 'cookbook-restore-home-scroll';
export const HOME_SCROLL_STORAGE_KEY = 'cookbook-home-scroll-y';

export function rememberHomeScrollPosition() {
  sessionStorage.setItem(HOME_SCROLL_STORAGE_KEY, String(window.scrollY));
}

export function requestHomeScrollRestore() {
  sessionStorage.setItem(HOME_SCROLL_RESTORE_KEY, 'true');
}
