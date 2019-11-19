// import Event from '../libs/events11';
import Base from "./Base";
import utils from '../libs/utils'

export default class Food extends Base {
  constructor() {
    super(0, 0, 10, 10);
  }

  create() {
    this.x = parseInt(utils.randomValue(0, this.canvasW - this.w) / 10) * 10;
    this.y = parseInt(utils.randomValue(0, this.canvasH - this.h) / 10) * 10;

    //食物边框模型
    this.border = {
      top: this.y,
      left: this.x,
      bottom: this.y + this.h,
      right: this.x + this.w
    }
    this.draw(this.x, this.y);
  }

  draw(x, y) {
    this.ctx.fillStyle = 'yellow';
    super.draw(x, y);
  }
}
