var PageEdit = {
    template: `
        <div>
            编辑
        </div>
    `,
    created() {
        document.title = '编辑';
        this.$root.$emit('menu-current', 'edit');
    }
};