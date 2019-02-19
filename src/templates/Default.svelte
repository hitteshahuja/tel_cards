<div class="card-container manual-flip">
<div class="col-md-12">
        <div class="bs-callout bs-callout-catalogue clearfix">
            <div class="icon">
                <i class="far fa-bookmark" aria-hidden="true"></i>
            </div>
            <h4>Case Studies</h4>
            <p>Case studies go here...</p>
        </div>
        <div class="card cataloguepane" data-spy="scroll">
            <div class="front">
                <ul class="list-group list-group-flush">
                    {{#each defaultCards as card}}
                    <a href="#" class="list-group-item list-group-item-action" on:click="store.set({ currentPage: 'card', currentCard: card.id })">
                        <div class="applist">
                            <h5><img style="display: inline; height: 1em; vertical-align: top;" src="{{ card.assets.logo.image }}"> {{ card.name }}</h5>
                            <p class="categories">
                                {{#each card.activities as activity}}
                                <span class="badge activity {{ activity.name }}">{{ activity.name }}</span>&nbsp;
                                {{/each}}
                            </p>
                            <p class="submittercatalogue"><small>Submitted by {{ card.submitter.name }} | {{ card.submitter.title }}</small></p>
                            <p class="appinfo">{{ card.tagline }}</p>
                        </div>
                    </a>
                    {{/each}}
                </ul>
            </div>
        </div>

</div>
</div>
<script>
    export default {
        // Show only cards that have default = yes
computed: {
    defaultCards:($cards) => {
        return $cards.filter(card => {
            return card.default === true
        })
    }
}
    }
</script>