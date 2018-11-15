Vue.component('l-header', {
    template: `
        <div class="header-main">
            <l-menu-nav class="header-main-menu"
                v-if="currentMenu" 
                :default-value="currentMenu" 
                :data="menuData" 
                @menu-click="menuClick"
            />
        </div>
    `,
    props: ['currentMenu'],
    data() {
        return {
            menuData: WebConfig.menu.data
        };
    },
    methods: {
        menuClick(item) {
            this.$router.push({
                name: item.value
            });
        }
    }
});