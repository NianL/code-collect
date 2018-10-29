var WebConfig = {};

WebConfig.menu = {
    data: [{
        text: '首页',
        value: 'home'
    }, {
        text: '随便写写',
        value: 'article'
    }, {
        text: '小玩意',
        value: 'tool'
    }, {
        text: '关于',
        value: 'about'
    }],
    t(n) {
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].value == n)
                return this.data[i].text;
        }
    }
};
