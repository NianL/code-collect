var PageHome = {
    mixins: [MixinImport],
    template: `
        <div v-if="importObject.status">
            <button @click="loadingStatus=true">show loading</button>
            <button @click="loadingStatus=false">hide loading</button>
            <div v-loading="loadingStatus" style="position:relative ;min-height:400px; background:#666; margin-top:10px;"></div>
        </div>
    `,
    data() {
        return {
            importObject: {
                status: false,
                data: [

                ]
            },
            loadingStatus: false,
        };
    },
    created() {
        document.title = '首页';
        this.$root.$emit('menu-current', 'home');
    },
    methods: {
        init() {},
        articleHandle(item) {
            console.log(item);
        }
    }
};