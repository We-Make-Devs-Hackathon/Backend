
async function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

function splitArray(array, splitInSize = 10) {
  const result = [];
  const copy = [...array];
  while (copy.length) {
    result.push(copy.splice(0, splitInSize));
  }
  return result;
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = {
  sleep,
  splitArray,
  randomIntFromInterval,
};
