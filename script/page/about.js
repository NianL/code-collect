var PageAbout = {
    template: `
        <div>
            关于我们
        </div>
    `,
    created() {
        document.title = '关于我们';
        this.$root.$emit('menu-current', 'about');
    }
};