
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
        immediate = false,
        inSequence = true,
        shuffle = false
    }) {
        if (inSequence) {
            for (let i=1; i <= nbCards; i++) {
                const card = source.removeCards(1, positionSource);
                source.adjustCards({immediate: false});
                destination.addCards(card, positionDestination);
                destination.adjustCards({immediate: false});
                await this.delay(i == nbCards ? 600 : 100);
            }
        } else {
            let cards = source.removeCards(nbCards, positionSource);
            source.adjustCards({immediate: immediate});
            if (shuffle) {
                cards = this.shuffleCards(cards);
            }
            destination.addCards(cards, positionDestination);
            destination.adjustCards({immediate: immediate});
            if (!immediate) {
                await this.delay(600);
            }
        }
        return new Promise((resolve) => {
            resolve();
        });
    }

    async moveSelection({
        selectionNames,
        source,
        destination,
        positionDestination = 'top',
        immediate = false,
        inSequence = true,
        shuffle = false
    }) {
        if (inSequence) {
            for (const index in selectionNames) {
                const name = selectionNames[index];
                const card = source.removeSelection(name);
                source.adjustCards({immediate: false});
                destination.addCards(card, positionDestination);
                destination.adjustCards({immediate: false});
                await this.delay(index == selectionNames.length - 1 ? 600 : 100);
            }
        } else {
            let cards = source.removeSelection(selectionNames);
            source.adjustCards({immediate: immediate});
            if (shuffle) {
                cards = this.shuffleCards(cards);
            }
            destination.addCards(cards, positionDestination);
            destination.adjustCards({immediate: immediate});
            if (!immediate) {
                await this.delay(600);
            }
        }
        return new Promise((resolve) => {
            resolve();
        });
    }


}
