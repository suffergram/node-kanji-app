import { kanji } from '../data/kanji/kanji';
import { vocab } from '../data/vocab/vocab';

function getQuizPool(
  amount,
  kanjiLevel,
  vocabLevel
) {
  const pool = [];

  const poolKanjiArray = kanji
    .filter((item) => item.jlpt >= kanjiLevel)
    .map((item) => item.kanji);

  const poolVocabArray = vocab.filter(
    (word) =>
      word.jlpt >= vocabLevel &&
      word.kanji.split('').every((item) => poolKanjiArray.includes(item))
  );

  let currentAmount = 0;

  while (currentAmount < amount) {
    const randomIndex = Math.floor(Math.random() * poolVocabArray.length);

    if (
      pool.every((item) => item.question.id !== poolVocabArray[randomIndex].id)
    ) {
      currentAmount += 1;

      const current = {
        question: poolVocabArray[randomIndex],
        options: [],
        kanjiLevels: [],
      };

      let option = 1;

      while (option < OPTIONS_AMOUNT) { // TODO: change the constant
        const randomOption = Math.floor(Math.random() * poolVocabArray.length);
        if (
          randomOption !== randomIndex &&
          current.options.every(
            (item) => item.id !== poolVocabArray[randomOption].id
          )
        ) {
          current.options.push(poolVocabArray[randomOption]);
          option += 1;
        }
      }

      current.kanjiLevels.push(
        ...current.question.kanji
          .split('')
          .map(
            (item) =>
              kanji.filter((currentKanji) => currentKanji.kanji === item)[0]
                .jlpt
          )
      );

      pool.push(current);
    }
  }

  return pool;
}
