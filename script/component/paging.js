Vue.component("l-paging", {
    template: '\
        <div v-if="paging.total>paging.rows" class="l-paging">\
            <a v-if="paging.index>1" @click="pagingHandle(paging.index-1)">&lt;</a>\
            <span v-else>&lt;</span>\
            <a v-for="item in c_maxIndex" :class="{select:paging.index==item}" @click="pagingHandle(item)">{{item}}</a>\
            <a v-if="paging.index!=c_maxIndex" @click="pagingHandle(paging.index+1)">&gt;</a>\
            <span v-else>&gt;</span>\
        </div>\
    ',
    props: {
        paging: {
            type: Object,
            default: {
                index: 1,
                rows: 10,
                total: 0
            }
        }
    },
    computed: {
        c_maxIndex: function () {
            if (this.paging.total > 0) return Math.ceil(this.paging.total / this.paging.rows);
            else return 0

        }
    },
    methods: {
        pagingHandle: function (index) {
            this.$emit("paging-handle", index);
        }
    }
});