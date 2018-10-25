Vue.component('l-header', {
    mixins: [MixinImport],
    template: `
        <div class="header-main" v-if="importObject.status">
            <l-menu-nav class="header-main-menu"
                v-if="currentMenu" 
                :default-value="currentMenu" 
                :data="menuData" 
                @menu-click="menuClick"
            />
        </div>
    `,
    data() {
        return {
            importObject: {
                status: false,
                data: [
                    'script/component/menu-nav.js',
                    'css/component/menu-nav.css'
                ]
            },
            currentMenu: null,
            menuData: WebConfig.menu.data
        };
    },
    watch: {
        currentMenu(n) {
            if (n == '') this.currentMenu = 'home';
        }
    },
    created() {
        this.$root.$on('menu-current', (c) => {
            this.currentMenu = c;
        });
    },
    methods: {
        menuClick(item) {
            this.$root.pageJump(item.value);
        }
    }
});