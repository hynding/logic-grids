// import data from "logic-grids-data/languages/en/words/en-words-common.json";
export class CodeBreakerGame {
  private wordCache: Record<string, string[] | false> = {};
  private currentWordsListUrl: string = "";
  private letterCountSelect: HTMLSelectElement | null =
    document.querySelector("#letter-count");
  private container: HTMLElement | null = document.querySelector("#container");
  private answer: HTMLElement | null = document.querySelector("#answer");

  private isDisabled: boolean = false;
  private letterCount: number = 4;
  private totalAttempts: number = 6;
  private guessedWords: string[] = [];
  private currentRow: number = 0;
  private currentColumn: number = 0;
  private currentLetters: string[] = [];

  private availableWords: string[] = [];
  private randomWord: string = "";
  private randomWordLetters: string[] = [];

  constructor(wordListUrl: string) {
    this.currentWordsListUrl = wordListUrl;
    this.wordCache[this.currentWordsListUrl] = false;
    this.letterCountSelect?.addEventListener("change", (event) => {
      this.letterCount = Number((event.target as HTMLSelectElement).value);
      this.restart();
    });
    window.addEventListener("keydown", (event) => {
      if (this.isDisabled) {
        return;
      }
      if (event.key === "Backspace" && this.currentLetters.length) {
        this.currentLetters.pop();
        this.currentColumn--;
        const letterBox = document.querySelector(
          `#letter_${this.currentRow}_${this.currentColumn}`
        );
        if (letterBox) {
          letterBox.textContent = "";
        }
        return;
      }
      const letter = event.key.toUpperCase();
      const isLetter = !!letter.match(/^[A-Z]$/g);
      if (isLetter) {
        this.currentLetters.push(letter);
        const letterBox = document.querySelector(
          `#letter_${this.currentRow}_${this.currentColumn}`
        );
        if (letterBox) {
          letterBox.textContent = letter;
        }
        this.currentColumn++;

        if (this.currentColumn === this.letterCount) {
          this.isDisabled = true;
          setTimeout(() => {
            const currentWord = this.currentLetters.join("");
            const foundWord = this.availableWords.find((word) => {
              return word === currentWord;
            });
            this.currentColumn = 0;
            if (foundWord) {
              const results = this.getResults();
              results.forEach((result, i) => {
                if (!result) {
                  return;
                }
                const lb = document.querySelector(
                  `#letter_${this.currentRow}_${i}`
                );
                if (lb) {
                  lb.classList.add(result > 0 ? "match" : "exists");
                }
              });
              this.guessedWords.push(foundWord);
              if (foundWord === this.randomWord) {
                console.log("You Win!");
                return;
              }
              this.currentRow++;
            } else {
              for (let i = 0; i < this.letterCount; i++) {
                const lb = document.querySelector(
                  `#letter_${this.currentRow}_${i}`
                );
                if (lb) {
                  lb.textContent = "";
                }
              }
            }
            this.currentLetters = [];
            this.isDisabled = false;
          }, 1000);
        }
      }
    });
    this.start();
  }

  restart() {
    this.start();
  }

  async start() {
    // console.log('data', data)
    let commonWords: string[] | false =
      this.wordCache[this.currentWordsListUrl];
    if (!commonWords) {
      try {
        const response = await fetch(this.currentWordsListUrl);
        commonWords = await response.json();
        if (Array.isArray(commonWords)) {
          this.availableWords = commonWords.filter(
            (word) => word.length === this.letterCount
          );
          const wordIndex = Math.floor(
            Math.random() * this.availableWords.length
          );
          this.randomWord = this.availableWords[wordIndex];
          this.randomWordLetters = this.randomWord.split("");
          this.currentRow = 0;
          this.currentColumn = 0;
          this.currentLetters = [];
          this.guessedWords = [];

          if (this.container && this.answer) {
            this.container.innerHTML = "";
            this.answer.innerHTML = "";
          }
          for (let i = 0; i < this.totalAttempts; i++) {
            const row = document.createElement("div");
            for (let j = 0; j < this.letterCount; j++) {
              const input = document.createElement("div");
              input.id = `letter_${i}_${j}`;
              input.classList.add("letter-box");
              row.appendChild(input);
            }
            this.container?.append(row);
          }
          if (this.answer) {
            this.answer.textContent = this.randomWord;
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    this.isDisabled = false;
  }

  getResults() {
    // 1 - match
    // -1 - wrong spot
    // 0 - not in answer
    const answerLetterCount: Record<string, number> = {};
    const enteredLetterCount: Record<string, number> = {};
    this.randomWordLetters.forEach((letter) => {
      if (!answerLetterCount[letter]) {
        answerLetterCount[letter] = 0;
      }
      answerLetterCount[letter]++;
    });
    this.currentLetters.forEach((letter) => {
      if (!enteredLetterCount[letter]) {
        enteredLetterCount[letter] = 0;
      }
      enteredLetterCount[letter]++;
    });

    return this.currentLetters.map((letter, index) => {
      const wordLetter = this.randomWordLetters[index];
      if (letter === wordLetter) {
        return 1;
      }
      const existingIndex = this.randomWordLetters.findIndex(
        (searchLetter) => searchLetter === letter
      );
      if (enteredLetterCount[letter]) {
        enteredLetterCount[letter]--;
      }
      if (!enteredLetterCount[letter]) {
        return existingIndex < 0 ? 0 : -1;
      }
      return 0;
    });
  }
}
