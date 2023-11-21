
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

    async moveCards({
        nbCards,
        source,
        destination,
        positionSource = 'top',
        positionDestination = 'top',
        faceUpSource = false,
        faceUpDestination = true,
        immediate = false,
        inSequence = true
    }) {
        if (inSequence) {
            for (let i=1; i <= nbCards; i++) {
                const card = source.removeCards(1, positionSource);
                source.adjustCards({immediate: false, faceUp: faceUpSource});
                destination.addCards(card, positionDestination);
                destination.adjustCards({immediate: false, faceUp: faceUpDestination});
                await this.delay(i == nbCards ? 600 : 100);
            }
        } else {
            const card = source.removeCards(nbCards, positionSource);
            source.adjustCards({immediate: immediate, faceUp: faceUpSource});
            destination.addCards(card, positionDestination);
            destination.adjustCards({immediate: immediate, faceUp: faceUpDestination});
            if (!immediate) {
                await this.delay(600);
            }
        }
        return new Promise((resolve) => {
            resolve();
        });
    }

}
