var PageArticle = {
    template: `
        <div>
            <ul>
                <li v-for="item in data" @click="viewDetail(item)">文章-{{ item }}</li>
            </ul>
        </div>
    `,
    data() {
        return {
            data: [1, 2, 3]
        }
    },
    created() {
        document.title = '我的文章';
        this.$root.$emit('menu-current', 'article');
    },
    methods: {
        viewDetail(item) {
            this.$root.pageJump('article-detail', {
                id: item
            });
        }
    }
};