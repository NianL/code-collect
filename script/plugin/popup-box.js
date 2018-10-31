var PluginPopupBox = {};
PluginPopupBox.install = function (Vue, options) {
    Vue.prototype.$message = function (obj, type) {
        var coms = Vue.extend({
            template: '\
                <div class="popup-box">\
                    <transition name="fade">\
                        <div class="shadow" v-show="isShow"></div>\
                    </transition>\
                    <transition name="move">\
                        <div class="message-box" v-show="isShow">\
                            <div class="box">\
                                <div class="close"><a @click="confirm">x</a></div>\
                                <div class="content">{{msg}}</div>\
                                <div class="button">\
                                    <a class="confirm" @click="confirm">确定</a>\
                                </div>\
                            </div>\
                        </div>\
                    </transition>\
                </div>\
            ',
            data: function () {
                return {
                    isShow: false,
                    msg: "",
                    confirmFun: null
                };
            },
            created: function () {
                if (typeof (obj) == 'object') {
                    this.msg = obj.msg;
                    this.confirmFun = obj.confirm;
                } else {
                    this.msg = obj;
                }
                setTimeout(() => {
                    this.isShow = true;
                });
            },
            methods: {
                confirm: function () {
                    if (this.confirmFun) this.confirmFun();
                    this.remove();
                },
                remove: function () {
                    this.isShow = false;
                    setTimeout(() => {
                        document.body.removeChild(coms);
                    }, 500);
                }
            }
        });
        var coms = new coms().$mount().$el;
        document.body.appendChild(coms);
    };
    // ['tips', 'error', 'warning'].forEach(function (type) {
    //     Vue.prototype.$message[type] = function (obj) {
    //         return Vue.prototype.$message(obj, type);
    //     }
    // });

    Vue.prototype.$confirm = function (obj, type) {
        var coms = Vue.extend({
            template: '\
                <div class="popup-box">\
                    <transition name="fade">\
                        <div class="shadow" v-show="isShow"></div>\
                    </transition>\
                    <transition name="move">\
                        <div class="message-box" v-show="isShow">\
                            <div class="box">\
                                <div class="close"><a @click="cancel">x</a></div>\
                                <div class="content">{{msg}}</div>\
                                <div class="button">\
                                    <a class="confirm" @click="confirm">确定</a>\
                                    <a class="cancel" @click="cancel">取消</a>\
                                </div>\
                            </div>\
                        </div>\
                    </transition>\
                </div>\
            ',
            data: function () {
                return {
                    isShow: false,
                    msg: "",
                    confirmFun: null,
                    cancelFun: null,
                };
            },
            created: function () {
                if (typeof (obj) == 'object') {
                    this.msg = obj.msg;
                    this.confirmFun = obj.confirm;
                    this.cancelFun = obj.cancel;
                } else {
                    this.msg = obj;
                }
                setTimeout(() => {
                    this.isShow = true;
                });
            },
            methods: {
                confirm: function () {
                    if (this.confirmFun) this.confirmFun();
                    this.remove();
                },
                cancel: function () {
                    if (this.cancelFun) this.cancelFun();
                    this.remove();
                },
                remove: function () {
                    this.isShow = false;
                    setTimeout(() => {
                        document.body.removeChild(coms);
                    }, 500);
                }
            }
        });
        var coms = new coms().$mount().$el;
        document.body.appendChild(coms);
    };

}

// export default PluginPopupBox;
Vue.use(PluginPopupBox);