function generateWordPairs(string) {
  let wordArr = string
    .replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g, "")
    .replace(/\s{2,}/g, " ")
    .toLowerCase()
    .split(" ");
  return markovChain(wordArr);
}

function markovChain(arr) {
  const dictionary = {};

  arr.forEach((item, index, arr) => {
    if (dictionary[item]) {
      if (arr[index + 1]) {
        dictionary[item].push(arr[index + 1]);
      }
    } else {
      if (arr[index + 1]) {
        dictionary[item] = [arr[index + 1]];
      } else {
        dictionary[item] = [];
      }
    }
  });

  return dictionary;
}

function writeLine(obj, n) {
  let keysList = Object.keys(obj);

  let poetryLineArr = [];

  while (poetryLineArr.length < n) {
    let randomKeyName = keysList[random(keysList.length)];
    let randomKey = obj[randomKeyName];

    if (randomKey.length === 1) {
      poetryLineArr.push(randomKeyName);
      if (poetryLineArr.length === n) {
        break;
      }
      poetryLineArr.push(randomKey[0]);
    } else if (randomKey.length > 1) {
      poetryLineArr.push(randomKeyName);
      if (poetryLineArr.length === n) {
        break;
      }
      poetryLineArr.push(randomKey[random(randomKey.length)]);
    }
  }
  return poetryLineArr.join(" ");
}

function random(num) {
  return Math.floor(Math.random() * num);
}

function generatePoem(wordCorpus, num) {
  let wordPairs = generateWordPairs(wordCorpus);
  let poem = "";
  for (let i = 0; i < num; i++) {
    poem += writeLine(wordPairs, Math.floor(Math.random() * 10) + 1);
    poem += "\n";
  }

  console.log(poem);
  return poem;
}
