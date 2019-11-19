export default class Store {
  constructor() {
    this.store = new Map();
    return this;
  }
  static getInstance() {
    if (!Store.instance) {
      Store.instance = new Store();
    }
    return Store.instance
  }

  set(key, value) {
    if (typeof value === 'function') {
      value = new value();
    }
    this.store.set(key, value);
    return value;
  }
  get(key) {
    if (this.store.has(key)) {
      return this.store.get(key)
    } else {
      return null;
    }
  }

  // delete(key) {
  //   if (this.store.has(key)) {
  //     return this.store.delete(key)
  //   }
  // }
  //
  // destory(key){
  //
  // }
}
