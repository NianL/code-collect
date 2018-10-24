Vue.component('l-loading', {
    template: '\
        <div class="l-loading">\
            <div class="l-loading-spinner">\
                <svg viewBox="25 25 50 50" class="circular" :style="c_style">\
                    <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>\
                </svg>\
            </div>\
        </div>\
    ',
    props: {
        size: {
            type: Number,
            default: 45
        }
    },
    computed: {
        c_style: function () {
            return {
                width: this.size + 'px',
                height: this.size + 'px'
            }
        }
    }
});

Vue.directive("loading", {
    bind: function (el) {
        var coms = Vue.extend({
            template: '<l-loading style="display:none" />'
        });
        var coms = new coms().$mount().$el;
        el.appendChild(coms);
        //el.style.position = 'relative';
    },
    inserted: function (el, obj) {
        var elLoading = el.querySelector('.l-loading');
        if (obj.value) {
            elLoading.style.display = 'block';
        } else {
            elLoading.style.display = 'none';
        }
    },
    update: function (el, obj) { //组件更新
        var elLoading = el.querySelector('.l-loading');
        if (obj.value) {
            elLoading.style.display = 'block';
        } else {
            elLoading.style.display = 'none';
        }
    },
});