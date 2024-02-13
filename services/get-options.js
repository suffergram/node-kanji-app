const { vocab } = require('../data/vocab/vocab');
const { kanji } = require('../data/kanji/kanji');

function getOptions(array, amount = 4) {
  const resultArray = [...array].map(item => {
    const current = {
      question: item,
      options: [],
      kanjiLevels: [],
    };

    const levels = new Set();
    for (let el of item.kanji.split('')) {
      try {
        const level = kanji.filter(curr => curr.kanji === el)[0].jlpt;
        levels.add(level);
      } catch (error) {
        continue;
      }
    }
    current.kanjiLevels.push(...levels);

    while (current.options.length < amount - 1) {
      let filteredVocab = [...vocab].filter(el =>
        Math.abs(el.kanji.length - current.question.kanji.length) <= 2
        && el.kanji.split('').some(it => item.kanji.includes(it))
        && el.id !== current.question.id
        && current.options.every(it => it.id !== el.id)
        && el.jlpt >= current.question.jlpt - 1
      );

      if (filteredVocab.length === 0) {
        filteredVocab = [...vocab].filter(el =>
          el.kanji.length === current.question.kanji.length
          && current.question.id
          && current.options.every(it => it.id !== el.id)
          && current.question.jlpt - 1
        );
      }

      const el = filteredVocab[Math.floor(Math.random() * filteredVocab.length)];
      current.options.push(el);
    }

    return current;
  });

  return resultArray;
}

module.exports = {
  getOptions
};
