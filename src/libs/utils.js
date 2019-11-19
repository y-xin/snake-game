export default {
  randomValue(min, max) {
    if (arguments.length > 1) {
      return parseInt(Math.random() * (max - min + 1) + min, 10);
    }
    return parseInt(Math.random() * min + 1, 10);
  }
}
