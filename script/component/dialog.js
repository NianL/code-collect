Vue.component('l-dialog', {
    template: '\
        <div class="l-dialog">\
            <transition name="fade">\
                <div class="shadow" v-show="isShow"></div>\
            </transition>\
            <transition name="fade">\
                <div class="message-box" v-show="isShow">\
                    <div class="box">\
                        <div class="close"><span class="title" v-text="title"></span><a @click="cancel">x</a></div>\
                        <div class="content">\
                            <slot></slot>\
                        </div>\
                        <div class="button">\
                            <a class="confirm" @click="confirm">确定</a>\
                            <a class="cancel" @click="cancel">取消</a>\
                        </div>\
                    </div>\
                </div>\
            </transition>\
        </div>\
    ',
    props: {
        title: {
            type: String,
            default: ''
        },
        show: {
            type: Boolean,
            default: true
        },
    },
    data: function () {
        return {
            isShow: false
        }
    },
    watch: {
        show: function (n) {
            this.isShow = n;
        }
    },
    created: function () {
        setTimeout(() => {
            this.isShow = this.show
        });
    },
    methods: {
        confirm: function () {
            this.submit(true);
        },
        cancel: function () {
            this.submit(false);
        },
        submit: function (res) {
            this.$emit('handle', res);
        }
    }
});