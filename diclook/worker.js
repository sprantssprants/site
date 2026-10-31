"use strict";

let dictionaryPromise = null;

function getDictionary() {
  if (!dictionaryPromise) {
    dictionaryPromise = loadDictionary().catch((error) => {
      dictionaryPromise = null;
      throw error;
    });
  }
  return dictionaryPromise;
}

async function loadDictionary() {
  const response = await fetch("/diclook/words.txt?v=1");
  if (!response.ok) throw new Error("Dictionary download failed.");
  const words = (await response.text()).trim().split(/\r?\n/);
  const counts = new Uint8Array(words.length * 26);
  const lengths = new Uint8Array(words.length);

  for (let i = 0; i < words.length; i += 1) {
    const word = words[i];
    // Only validated dictionary letters ever become result HTML.
    if (!/^[A-Z]{2,12}$/.test(word)) throw new Error("Invalid dictionary.");
    lengths[i] = word.length;
    const offset = i * 26;
    for (let j = 0; j < word.length; j += 1) {
      counts[offset + word.charCodeAt(j) - 65] += 1;
    }
  }
  return { words, counts, lengths };
}

function markBlanks(word, available) {
  const remaining = available.slice();
  let html = "";
  for (let i = 0; i < word.length; i += 1) {
    const letter = word[i];
    const index = word.charCodeAt(i) - 65;
    if (remaining[index] > 0) {
      remaining[index] -= 1;
      html += letter;
    } else {
      html += `<b>${letter}</b>`;
    }
  }
  return html;
}

function findWords(dictionary, rack) {
  const available = new Uint8Array(26);
  let blanks = 0;
  for (const letter of rack) {
    if (letter === "?") blanks += 1;
    else available[letter.charCodeAt(0) - 65] += 1;
  }

  const groups = Array.from({ length: 13 }, () => []);
  let total = 0;
  const { words, counts, lengths } = dictionary;
  for (let i = 0; i < words.length; i += 1) {
    const length = lengths[i];
    if (length > rack.length) continue;

    let missing = 0;
    const offset = i * 26;
    for (let letter = 0; letter < 26; letter += 1) {
      const shortage = counts[offset + letter] - available[letter];
      if (shortage > 0) missing += shortage;
      if (missing > blanks) break;
    }
    if (missing <= blanks) {
      groups[length].push(blanks ? markBlanks(words[i], available) : words[i]);
      total += 1;
    }
  }

  const sections = [];
  for (let length = rack.length; length >= 2; length -= 1) {
    const matches = groups[length];
    if (!matches.length) continue;
    sections.push(`<h2>${length} letters (${matches.length.toLocaleString()})</h2><div>${matches.join("<br>")}</div>`);
  }
  return { total, html: sections.join("") };
}

self.onmessage = async ({ data }) => {
  try {
    const dictionary = await getDictionary();
    if (data.type === "load") {
      self.postMessage({ type: "ready", id: data.id });
    } else if (data.type === "search") {
      const result = findWords(dictionary, data.rack);
      self.postMessage({ type: "results", id: data.id, ...result });
    }
  } catch {
    self.postMessage({ type: "error", id: data.id });
  }
};
