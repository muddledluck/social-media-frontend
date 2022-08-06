type Serializer<T> = {
  store: (obj: T) => void;
  load: () => T | null;
  remove: () => void;
  isStored: () => boolean;
};

function createSerializer<T>(key: string): Serializer<T> {
  if (typeof window !== "undefined") {
    console.log("You are on the browser");
    const storage = localStorage;
    // 👉️ can use localStorage here
    const storeFn = (item: T) => storage.setItem(key, JSON.stringify(item));
    const removeFn = () => storage.remoteItem(key);
    const existsFn = () => {
      const keys = Object.keys(storage);
      return keys.includes(key);
    };
    const loadFn = () => {
      const result = storage.getItem(key);
      try {
        return result === null ? null : (JSON.parse(result) as T);
      } catch (error) {
        return null;
      }
    };
    return {
      store: storeFn,
      load: loadFn,
      remove: removeFn,
      isStored: existsFn,
    };
  } else {
    // 👉️ can't use localStorage
    const fun = () => console.log("server side, can't access localStorage");
    return {
      store: fun,
      load: () => null,
      remove: fun,
      isStored: () => false,
    };
  }
}

export const clearLocalStorage = () => {
  try {
    localStorage.clear();
    console.log("************************************");
    console.log("CLEARED ASYNC STORAGE");
    console.log("************************************");
  } catch (error) {
    console.log(error);
  }
};

export const TokenStorage = createSerializer<string>("ca_auth_token");
