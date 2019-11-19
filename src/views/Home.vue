<template>
  <div class="home">
    <label for="">移动时间</label>
    <input v-model="speed" type="text" placeholder="速度">
    <button @click="start">开始</button>
    <button @click="stop">结束</button>
    <button @click="reset">重置</button>
    <div class="canvas-wrap">
      <canvas id="canvas" width="500" height="400"></canvas>
    </div>
  </div>
</template>

<script>

  import Game from '../game/Game';

  export default {
    name: 'home',

    data() {
      return {
        gameOver: false,
        ready: true,
        score: 0,
        speed: 200   // 速度值其实为 setTimeout 定时器的时间值 越大越慢
      }
    },
    mounted() {
      this.game = new Game('canvas', 500, 400);
      },
    methods: {
      start() {
        this.gameOver = false;
        this.game.start(this.speed);
      },
      stop() {
        this.gameOver = true;
        this.game.stop()
      },
      reset() {
        this.gameOver = false;
        this.game.initCanvas()
      }
    }
  }
</script>

<style>
  .canvas-wrap {
    width: 500px;
    height: 400px;

    margin: 100px auto;
  }

</style>
