var PageCode = {
    template: `
        <div class="main-code">
            <div>代码收藏</div>
        </div>
    `,
    data() {
        return {
            currentMenu: 'code'
        };
    },
    created() {
        document.title = WebConfig.menu.t(this.currentMenu);;
        this.$emit('now-menu', this.currentMenu);
    }
};
