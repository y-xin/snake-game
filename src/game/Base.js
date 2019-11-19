
import Store from './Store';



export default class Base {
  /**
   * @param ctx
   * @param x 元素x
   * @param y 元素y
   * @param w 元素w
   * @param h 元素h
   * @param width 画布width
   * @param height 画布height
   */
  constructor(x = 0, y = 0, w = 0, h = 0) {
    this.store = Store.getInstance();
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.ctx = this.store.get('ctx');
    this.canvasW = this.store.get('width');
    this.canvasH = this.store.get('height');
  }

  draw(x = this.x, y = this.y) {

    this.ctx.fillRect(x, y, this.w, this.h);
  }
}
