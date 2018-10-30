var PageAbout = {
    template: `
        <div class="main-about">
            <div>作者：liun</div>
        </div>
    `,
    created() {
        document.title = '关于我们';
        this.$root.$emit('menu-current', 'about');
    }
};