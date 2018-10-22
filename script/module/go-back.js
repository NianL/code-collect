Vue.component('l-go-back', {
    template: `
        <div class="go-back">
            <a v-text="'&lt;返回'" @click="goBack"></a> 
        </div>
    `,
    props: ['routerName'],
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