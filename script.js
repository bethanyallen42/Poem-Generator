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
  let word = randomStartWord(obj);
  let poetryLine = word;
  let count = 1;

  let key = obj[word];

  while (count < n) {
    if (key.length === 1) {
      poetryLine += " " + key;
      let index = Math.floor(Math.random() * key.length);
      word = key[index];
      key = obj[word];
      count++;
    } else if (key.length > 1) {
      let index = Math.floor(Math.random() * key.length);
      word = key[index];
      poetryLine += " " + word;
      key = obj[word];
      count++;
    } else {
      word = randomStartWord(obj);
      key = obj[word];
    }
  }
  return poetryLine;
}

function randomStartWord(obj) {
  let keysList = Object.keys(obj);
  let idx = Math.floor(Math.random() * keysList.length);
  return keysList[idx];
}

function generatePoem(wordCorpus, num) {
  let wordPairs = generateWordPairs(wordCorpus);
  let poem = "";

  for (let i = 0; i < num; i++) {
    poem += writeLine(wordPairs, Math.floor(Math.random() * 10) + 1);
    poem += "<br>";
  }
  return poem;
}

document.getElementById("poemCard").style.display = "none";

document.getElementById("submitBtn").onclick = function (e) {
  e.preventDefault();
  const text = document.getElementById("submittedCorpus").value;
  const lines = Number(document.getElementById("numOfLines").value);

  console.log(typeof lines);
  document.getElementById("generatedPoem").innerHTML = generatePoem(
    text,
    lines
  );

  document.getElementById("questionCard").style.display = "none";
  document.getElementById("poemCard").style.display = "flex";
  window.scrollTo(0, 0);
};

document.getElementById("playAgain").onclick = function () {
  document.getElementById("poemCard").style.display = "none";
  document.getElementById("questionCard").style.display = "flex";
  document.getElementById("submissionForm").reset();
  window.scrollTo(0, 0);
};
