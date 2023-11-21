
export class Dealer {
    constructor() {

    }

    shuffleCards(cards) {
        const shuffled = [...cards];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    delay(ms) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(); // Resolve the Promise after the specified time (ms)
          }, ms);
        });
    }

}
