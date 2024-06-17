// 洗牌算法是一种用于随机打乱数组顺序的算法;
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const originalArray = [1, 2, 3, 4, 5];
const shuffledArray = shuffleArray([...originalArray]);

console.log(shuffledArray);
