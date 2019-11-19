import Store from "./Store";

export default class Score {
  constructor() {
    this.store = Store.getInstance();
    this.ctx = this.store.get('ctx');
    this.score = 0;
    this.canvasW = this.store.get('width');
  }

  add() {
    this.score++;
  }

  reset() {
    this.score = 0;
  }

  draw() {
    let text = `分数：${this.score}`;
    this.ctx.font = '16px Arial';
    this.ctx.fillStyle = '#fff';
    this.ctx.fillText(text, this.canvasW / 2 - this.ctx.measureText(text).width / 2, 30)
  }
}
