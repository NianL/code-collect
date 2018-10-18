Vue.component('l-article-list', {
    template: `
        <div class="l-article-list">
            <div class="list box-shadow-gray" v-for="(item,index) in data" :key="index">
                <h3><a @click="clickHandle(item)">{{ item.title }}</a></h3>
                <div class="content">
                    <div class="describe">
                        <p v-html="item.describe"></p>
                        <span class="tag">{{ item.tag }}</span>
                        <span class="time">{{ item.createTime }}</span>
                    </div>
                </div>
            </div>
        </div>
    `,
    props: {
        'data': {
            type: Array,
            default: []
        }
    },
    data() {
        return {
        }
    },
    created() {

    },
    methods: {
        clickHandle(item) {
            this.$emit('click-handle', item);
        }
    }
});