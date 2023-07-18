export const getLocalStorageValue = (name: string): any[] => {
  const local = localStorage.getItem(name);
  const parsedLocal = local !== null ? JSON.parse(local) : [];

  return parsedLocal;
};
