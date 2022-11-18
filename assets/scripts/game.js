let game = {
    
    //este método verificará as cartas viradas. Se forem iguais, mantém viradas, se forem diferentes desvira, não permite desvirar a mesma carta e não deixa virar mais de duas cartas.
    lockMode: false,
    firstCard: null,
    secondCard: null,

    patrick: ["1","2","3","4","5","6","7","8","9","10"],

    setCard: function(id){
        //esta linha retorna a carta com o mesmo id da carta com o id cliclado.
        let card = this.cards.filter(card=>card.id === id)[0]
        console.log(card)
        //esta linha verifica se a carta já foi virada, permitindo somente a ação de virar.
        if(card.flipped || this.lockMode){
            return false
        }

        if(!this.firstCard){
            this.firstCard = card
            this.firstCard.flipped = true
            return true
        }else{
            this.secondCard = card
            this.lockMode = true
            this.secondCard.flipped = true
            return true
        }
    },

    //esta linha verifica se as cartas possuem o mesmo id.
    checkMatch: function(){
        if(!this.firstCard || !this.secondCard){
            return false
        }
        return this.firstCard.icon === this.secondCard.icon
    },

    //esta linha desvira as cartas, caso não possuam o mesmo id.
    clearCards: function(){
        this.firstCard = null
        this.secondCard = null
        this.lockMode = false
    },

    //esta linha fará virar a mesma carta desvirada na última jogada.
    unflipCards: function(){
        this.firstCard.flipped = false
        this.secondCard.flipped = false
        this.clearCards()

    },

    //esta linha verifica se todas as cartas estão flipadas, se sim, gameover.
    checkGameOver: function(){
        return this.cards.filter(card=> !card.flipped).length == 0
    },

    cards: null,
    
    // precisamos de duas cartas para cada número, conforme array acima
    createCardsFromPatrick: function(){
        this.cards = []

        this.patrick.forEach((pat)=>{
            this.cards.push(this.createPairFromPatrick(pat))
        })
        //aqui estamos retornando os 20 itens, ou cartas
        this.cards = this.cards.flatMap(pair=> pair)
        this.shuffleCards()
        return this.cards
    },

    createPairFromPatrick: function(pat){
        return [{
            id: this.createIdWithPatrick(pat),
            icon: pat,
            flipped: false
        }, {
            id: this.createIdWithPatrick(pat),
            icon: pat,
            flipped: false
        }]
    },

    createIdWithPatrick: function(pat){
        return pat + parseInt(Math.random() *1000)
    },

    shuffleCards: function(cards){
        let currentIndex = this.cards.length
        let randomIndex = 0
    
        while(currentIndex !== 0){
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--
    
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        }
    }
}