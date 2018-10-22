Vue.component('l-article-list', {
    template: `
        <div class="l-article-list">
            <div class="list" v-for="(item,index) in data" :key="index">
                <h3><a @click="clickHandle(item)">{{ item.title }}</a></h3>
                <div class="content">
                    <div class="describe">
                        <p v-html="item.describe"></p>
                        <span class="time">{{ item.createTime }}</span>
                    </div>
                </div>
            </div>
        </div>
    `,
    props: ['data'],
    data() {
        return {
            currentMenu: null,
            menuData: WebConfig.menu.data
        };
    },
    methods: {
        clickHandle(item) {
            this.$emit('click-handle', item);
        }
    }
});