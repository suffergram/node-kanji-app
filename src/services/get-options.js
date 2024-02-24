const { vocab } = require('../data/vocab/vocab');
const { kanji } = require('../data/kanji/kanji');
const { KANJI_DIFF, KANA_DIFF } = require('../constants/constants');

function getOptions(array, amount = 4) {
  const resultArray = [...array].map(item => {
    const current = {
      question: item,
      options: [],
      kanji: [],
    };

    for (let el of item.kanji.split('')) {
      try {
        const foundKanji = kanji.filter(curr => curr.kanji === el)[0];
        foundKanji && current.kanji.push(foundKanji);
      } catch (error) {
        continue;
      }
    }

    while (current.options.length < amount - 1) {
      let filteredVocab = [...vocab].filter(el =>
        Math.abs(el.kanji.length - current.question.kanji.length) <= KANJI_DIFF
        && current.question.kana.split('; ').some(it => it === el.kana)
        && Math.abs(el.kana.length - current.question.kana.length) <= KANA_DIFF
        && el.kanji.split('').some(it => item.kanji.includes(it))
        && el.id !== current.question.id
        && current.options.every(it => it.id !== el.id)
        && el.jlpt >= current.question.jlpt - 1
      );

      if (filteredVocab.length === 0) {
        filteredVocab = [...vocab].filter(el =>
          el.kanji.length === current.question.kanji.length
          && el.kana !== current.question.kana
          && current.question.kana.split('; ').some(it => it.length === el.kana.length)
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
