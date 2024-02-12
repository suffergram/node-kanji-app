const { vocab } = require('../data/vocab/vocab');

function getOptions(array, amount = 4) {
  const resultArray = [...array];

  resultArray.map(item => {
    return []; // some logic here
  });

  return resultArray;
}

module.exports = {
  getOptions
};
