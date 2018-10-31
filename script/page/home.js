var PageHome = {
    mixins: [MixinImport],
    template: `
        <div v-loading="!importObject.status">
            <template v-if="importObject.status">
                <button @click="loadingStatus=true">show loading</button>
                <button @click="loadingStatus=false">hide loading</button>
                <button @click="$message('弹出消息测试')">message</button>
                <button @click="testConfirm">confirm</button>
                <div v-loading="loadingStatus" style="position:relative ;min-height:400px; background:#eee; margin-top:10px;">
                    <l-menu-nav 
                        default-value="这个" 
                        :data="menuData" 
                    />
                    <l-menu-nav 
                        default-value="JavaScript" 
                        :data="menuData2" 
                    />
                </div>
            </template>
        </div>
    `,
    data() {
        return {
            currentMenu: 'home',
            importObject: {
                status: false,
                data: [

                ]
            },
            loadingStatus: false,
            menuData: [{
                text: '这个',
                value: 'home'
            }, {
                text: '网站的',
                value: 'article'
            }, {
                text: '导航菜单',
                value: 'tool'
            }, {
                text: '组件使用',
                value: 'about'
            }],
            menuData2: [{
                text: 'JavaScript',
                value: 'JavaScript'
            }, {
                text: 'CSS',
                value: 'CSS'
            }, {
                text: 'HTML',
                value: 'HTML'
            }]
        };
    },
    created() {
        document.title = '首页';
        this.$root.$emit('menu-current', this.currentMenu);
    },
    methods: {
        init() {},
        articleHandle(item) {
            console.log(item);
        },
        testConfirm() {
            this.$confirm({
                msg: "确定是否删除？",
                confirm() {
                    console.log("确定");
                },
                cancel() {
                    console.log("取消");
                }
            });
        }
    }
};