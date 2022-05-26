type CacheType = "localStorage" | "sessionStorage";

export class CacheStore {
  type: CacheType;
  constructor(type: CacheType) {
    this.type = type;
  }
  getCacheStore(key: string) {
    const value = window[this.type].getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }
  setCacheStore(key: string, value: any) {
    window[this.type].setItem(key, JSON.stringify(value));
  }
  removeCacheStore(key: string) {
    window[this.type].removeItem(key);
  }
  clearCacheStore() {
    window[this.type].clear();
  }
}

export const localStore = new CacheStore("localStorage");
export const sessionStore = new CacheStore("sessionStorage");
