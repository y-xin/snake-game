/**
 * Author Yang
 */
export default class Events {
  constructor(props) {
    this.listeners = new Map();
  }
  addListener(event, fn) {
    if (this.listeners.has(event)) {
      let fns = this.listeners.get(event);
      fns.push(fn);
      this.listeners.set(event, fns);
    } else {
      this.listeners.set(event, [fn]);
    }
  }
  emit(event) {
    let props = [];
    for (let i = 1; i < arguments.length; i++) props.push(arguments[i]);
    if (this.listeners.has(event) && this.listeners.get(event).length) {
      let fns = this.listeners.get(event);
      fns.forEach(item => {
        Events.isFunction(item) && item(...props);
      })
    }
  }

  clearListener (event){
    this.listeners.set(event , [])
  }

  /**
   * 删除事件监听
   * @param event
   */
  removeListener(event){
    this.listeners.delete(event)
  }
  static isFunction(fn) {
    return typeof fn === 'function';
  }
}
