import Base from './Base'

export default class Snake extends Base {
  /**
   * @param ctx
   * @param width   画布width
   * @param height  画布height
   */
  constructor() {
    super(0, 0, 10, 10);
    this.snakeBlock = [];
    this.direction = 'right'; // 前进方向 up down left right
    this.init();
  }

  /**
   * 初始化蛇
   */
  init() {
    this.direction = 'right';
    this.snakeBlock = [{
      x: 10, y: 10,
    }];
    super.draw(this.x, this.y)
  }

  run() {
    if (this.snakeBlock.length) {
      let head = {
        x: this.snakeBlock[0].x,
        y: this.snakeBlock[0].y
      };
      switch (this.direction) {
        case 'up' :
          head.y = head.y - this.h;
          break;
        case 'down' :
          head.y = head.y + this.h;
          break;
        case 'left' :
          head.x = head.x - this.w;
          break;
        case 'right' :
          head.x = head.x + this.w;
          break;
      }

      this.border =  {
        top: head.y,
        bottom: head.y + this.h,
        left: head.x,
        right: head.x + this.w
      }

      this.snakeBlock.unshift(head);
      this.snakeBlock.pop();
      this.snakeBlock.map(item => this.draw(item.x, item.y))
    }
  }

  draw(x, y) {
    this.ctx.fillStyle = 'red';
    super.draw(x, y);
  }

  check() {

    // 碰墙
    if (this.border.right > this.canvasW ||
        this.border.left < 0 ||
        this.border.top < 0 ||
        this.border.bottom > this.canvasH) {
      console.log("碰墙");

      return true
    }
    // 自身碰撞
    for (let i = 1; i < this.snakeBlock.length; i++) {
      let block = this.snakeBlock[i];
      if (this.border.top === block.y &&
          this.border.left === block.x
      ) {
        console.log("自身碰撞");
        return true;
      }
    }
    return false
  }

  eatFood() {
    const food = this.store.get('food');
    if (!food.border) {
      food.create();
    }
    if (this.border.top === food.border.top && this.border.left === food.border.left) {
      let head = {
        x: food.border.left,
        y: food.border.top,
      }
      switch (this.direction) {
        case 'up' : head.y -=  this.h ;break;
        case 'down' : head.y += this.h ;break;
        case 'left' : head.x -=  this.w ;break;
        case 'right' : head.x +=  this.w ;break;
      }
      this.snakeBlock.unshift(head);
      food.create();
      return true;
    } else {
      return false;
    }
  }

  /**
   * 设置方向
   * @param direction
   * 不可以反方向走
   */
  setDirection(direction) {
    switch (direction) {
      case 'up' :
        this.direction !== 'down' && (this.direction = direction);
        break;
      case 'down' :
        this.direction !== 'up' && (this.direction = direction);
        break;
      case 'left' :
        this.direction !== 'right' && (this.direction = direction);
        break;
      case 'right' :
        this.direction !== 'left' && (this.direction = direction);
        break;
    }
  }
}
