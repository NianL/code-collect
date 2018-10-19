Vue.component('l-go-back', {
    template: `
        <div class="go-back">
            <a v-text="'&lt;'+content" @click="goBack"></a> 
        </div>
    `,
    props: ['content', 'routerName'],
    methods: {
        goBack() {
            if (this.routerName) {
                this.$root.pageJump(this.routerName);
            } else {
                history.go(-1);
            }
        }
    }
});