import { QueryObject } from "../types";

export function saveToStorage<T>(key: string, valueToSave: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(valueToSave));
  } catch (error) {
    console.log("AsyncStorage Error: " + error);
  }
}

export function loadFromStorage<T>(key: string): T | null {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.log("AsyncStorage Error: " + error);
    return null;
  }
}

export function removeFromStorage(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.log("AsyncStorage Error: " + error);
  }
}

export const getQueryText = (obj: QueryObject): string => {
  return Object.keys(obj).reduce((text, value, index) => {
    let separator = "&";
    if (index === 0) {
      separator = "";
    }
    return (text = text + `${separator}${value}=${obj[value]}`);
  }, "");
};
