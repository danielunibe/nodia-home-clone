export const appState = {
  currentIndex: 0,
  total: 0,
};

export function setTotal(total) {
  appState.total = total;
}

export function nextIndex() {
  if (!appState.total) return 0;
  appState.currentIndex = (appState.currentIndex + 1) % appState.total;
  return appState.currentIndex;
}

export function prevIndex() {
  if (!appState.total) return 0;
  appState.currentIndex = (appState.currentIndex - 1 + appState.total) % appState.total;
  return appState.currentIndex;
}

export function setIndex(idx) {
  if (!appState.total) {
    appState.currentIndex = 0;
    return 0;
  }
  const safe = ((idx % appState.total) + appState.total) % appState.total;
  appState.currentIndex = safe;
  return safe;
}
