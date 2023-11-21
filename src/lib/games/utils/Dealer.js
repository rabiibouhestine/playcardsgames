
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

    async moveCards({nbCards, source, positionSource = 'top', destination, positionDestination = 'top'}) {
        for (let i=1; i <= nbCards; i++) {
            const cards = source.removeCards(1, positionSource);
            source.adjustCards({immediate: false, faceUp: false});
            destination.addCards(cards, positionDestination);
            destination.adjustCards({immediate: false, faceUp: true});
            await this.delay(i == nbCards ? 600 : 100);
        }
        return new Promise((resolve) => {
            resolve();
        });
    }

}
