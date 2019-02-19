<div class="card mainCard">
<div class="container card-holder">
				<Card :card />
			</div>
</div>
<script>
import Card from './Card.svelte'
export default {
    oncreate() {
        // Child is positioned absolutely, so this forces container to fill height of child
        const childHeight = document.querySelector('.card').scrollHeight
        //document.querySelector('#appgenerator').style.height = `${childHeight-150}px`
    },

    // Expose the templates as components that can be referened in this template
    components: {
        Card
    },

    // Compute the card object by indexing the currentCard in the cards array
    computed: {
        card: ($cards, $currentCard) => $cards.find(card => card.id === $currentCard)
    }
}
</script>