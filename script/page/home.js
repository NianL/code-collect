var PageHome = {
    mixins: [MixinImport],
    template: `
        <div v-if="importObject.status">
            123
        </div>
    `,
    data() {
        return {
            importObject: {
                status: false,
                data: [
                    
                ]
            },
        };
    },
    created() {
        document.title = '首页';
        this.$root.$emit('menu-current', 'home');
    },
    methods: {
        init() {
            
        },
        articleHandle(item){
            console.log(item);
        }
    }
};