var PageAbout = {
    template: `
        <div class="main-about">
            <div>作者：liun</div>
        </div>
    `,
    data() {
        return {
            currentMenu: 'about'
        };
    },
    created() {
        document.title = WebConfig.menu.t(this.currentMenu);;
        this.$root.$emit('menu-current', this.currentMenu);
    }
};

//export default PageAbout;