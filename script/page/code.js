var PageCode = {
    mixins: [MixinImport],
    template: `
        <div v-if="importObject.status">
            小玩意
        </div>
    `,
    data() {
        return {
            importObject: {
                status: false,
                data: [

                ]
            },
            data: {},
        };
    },
    created() {
        document.title = '小玩意';
        this.$root.$emit('menu-current', 'code');
    },
    methods: {
        init() {
            
        }
    }
};