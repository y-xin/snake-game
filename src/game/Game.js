// import SnakeController from './SnakeController';
import Snake from './Snake'
import Food from './Food'
import Store from './Store';

import Score from "./Score";

class Game  {
  constructor(canvasId, width = 500, height = 300) {

    this.canvas = document.getElementById(canvasId);
    this.gameOver = false;
    this.speed = 300;
    this.store = Store.getInstance();
    this.width = this.store.set('width', width);
    this.height = this.store.set('height', height);
    this.ctx = this.store.set('ctx', this.canvas.getContext('2d'));
    this.food = this.store.set('food', Food);
    this.snake = this.store.set('snake', Snake);
    this.score = this.store.set('score', Score);
    this.bindEvent();
    this.initCanvas();

  }

  run() {
    this.timer && clearTimeout(this.timer);
    if (this.gameOver) {
      console.log("游戏结束");
      return clearTimeout(this.timer);
    }
    this.drawCanvasBg();
    this.food.draw();
    this.snake.run();
    this.score.draw();

    this.check();
    this.timer = setTimeout(() => {
      this.run()
    }, this.speed)

  }

  start(speed = 300) {
    this.gameOver = false;
    this.speed = speed;
    this.initCanvas();
    this.snake.init();
    this.score.reset();
    this.food.create();
    this.run();
  }

  stop() {
    this.gameOver = true;
    let text = `游戏结束`;
    this.ctx.font = '40px Arial';
    this.ctx.strokeStyle = '#fff';
    this.ctx.strokeText(text, this.width / 2 - this.ctx.measureText(text).width / 2, this.height / 2 - 20)

  }

  /**
   * 碰撞检测
   */
  check() {
    // 碰墙检测
    if (this.snake.check()) {
      console.log("发生碰撞");
      this.stop();

    }
    // 吃东西检测
    if (this.snake.eatFood()) {
      console.log("吃到了 , 加分");
      this.score.add();
    }
  }


  /**
   * 初始化画布
   */
  initCanvas() {
    this.setStyle();
    this.drawCanvasBg();
  }

  setStyle() {
    Object.assign(this.canvas.style, {
      width: `${this.width}px`,
      height: `${this.height}px`,
    });
  }

  /**
   * 画布背景
   */
  drawCanvasBg() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = '#333';
    this.ctx.fillRect(0, 0, this.width, this.height)

    let text = `贪吃蛇游戏`;
    this.ctx.font = '40px Arial';
    this.ctx.strokeStyle = '#fff';
    this.ctx.strokeText(text, this.width / 2 - this.ctx.measureText(text).width / 2, this.height / 2 - 20)

  }

  /**
   * 绑定事件
   */
  bindEvent() {
    document.addEventListener('keyup', (e) => {
      switch (e.keyCode) {
        case 37 :
          this.snake.setDirection('left');
          break;
        case 38 :
          this.snake.setDirection('up');
          break;
        case 39 :
          this.snake.setDirection('right');
          break;
        case 40 :
          this.snake.setDirection('down');
          break;
      }
    })

  }
}


export default Game;

