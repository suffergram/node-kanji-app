function shuffleArray(array) {
  const randomArray = [...array];

  for (let i = randomArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomArray[i], randomArray[j]] = [randomArray[j], randomArray[i]];
  }

  return randomArray;
}

module.exports = {
  shuffleArray
};