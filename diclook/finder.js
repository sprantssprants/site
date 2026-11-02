"use strict";

const form = document.getElementById("search-form");
const input = document.getElementById("letters");
const status = document.getElementById("status");
const results = document.getElementById("results");
let worker = null;
let requestId = 0;

function startWorker() {
  if (worker) return worker;
  const workerUrl = URL.createObjectURL(new Blob(
    [window.WORD_FINDER_WORKER_SOURCE], { type: "text/javascript" }
  ));
  try {
    worker = new Worker(workerUrl);
  } catch (error) {
    URL.revokeObjectURL(workerUrl);
    throw error;
  }
  worker.onmessage = ({ data }) => {
    URL.revokeObjectURL(workerUrl);
    if (data.id !== requestId) return;
    if (data.type === "ready") {
      status.textContent = "Enter your letters above.";
    } else if (data.type === "results") {
      // Insert the entire result list in one update, without paging or batching.
      results.innerHTML = data.html;
      status.textContent = data.total
        ? `${data.total.toLocaleString()} ${data.total === 1 ? "word" : "words"} found.`
        : "No words found.";
    } else if (data.type === "error") {
      results.replaceChildren();
      status.textContent = "Couldn't load the local dictionary. Press Enter to try again.";
    }
  };
  worker.onerror = () => {
    URL.revokeObjectURL(workerUrl);
    worker.terminate();
    worker = null;
    results.replaceChildren();
    status.textContent = "Couldn't start the word finder. Press Enter to try again.";
  };
  return worker;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  requestId += 1;
  results.replaceChildren();
  const typed = input.value.replace(/\s/g, "");

  if (!typed) {
    status.textContent = "Enter some letters, or ? for a blank.";
    return;
  }
  if (!/^[a-z?]+$/i.test(typed)) {
    status.textContent = "Use only A-Z and ? for blanks. Spaces are ignored.";
    return;
  }
  if (typed.length > 12) {
    status.textContent = "Enter at most 12 letters, counting each ? as one letter.";
    return;
  }
  if ((typed.match(/\?/g) || []).length > 2) {
    status.textContent = "Use at most two ? blanks.";
    return;
  }

  const rack = typed.toUpperCase();
  input.value = rack;
  status.textContent = "Searching...";
  try {
    startWorker().postMessage({ type: "search", id: requestId, rack });
  } catch {
    status.textContent = "Couldn't start the word finder. Please reload the page.";
  }
});

try {
  startWorker().postMessage({ type: "load", id: requestId });
} catch {
  status.textContent = "Couldn't start the word finder. Please reload the page.";
}
