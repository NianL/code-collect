var PageTool = {
    mixins: [MixinImport],
    template: `
        <div class="main-tool" v-if="importObject.status">
            <template v-if="tabType==1">
                <a class="item" v-for="item in toolInfo.list" @click="toolItemHandle(item)">{{item.title}}</a>
            </template>
            <template v-if="tabType==2">
                <l-go-back :router-name="currentMenu" />
                <page-view class="main-tool-item" :path="'l-tool-'+toolItem" />
            </template>
        </div>
    `,
    components: {
        'page-view': {
            props: ['path'],
            render: function (h) {
                return h(this.path);
            }
        }
    },
    data() {
        return {
            currentMenu: 'tool',
            importObject: {
                status: false,
                data: [
                    'script/module/go-back.js'
                ]
            },
            toolInfo: {},
            toolItem: null,
            tabType: 0, //0 1 2
        };
    },
    watch: {
        '$route'() {
            this.getData();
        }
    },
    created() {
        this.$root.$emit('menu-current', this.currentMenu);
        this.getData();
    },
    methods: {
        getData() {
            if (JSON.stringify(this.toolInfo) == '{}') {
                DataAccess.GetToolList()
                    .then(res => {
                        if (res.status == 200) {
                            this.toolInfo = res.data;
                            this.initItem();
                        }
                    });
            } else {
                this.initItem();
            }
        },
        initItem() {
            var itemName = this.$route.params.name;
            if (itemName) {
                var item;
                for (var i = 0; i < this.toolInfo.list.length; i++) {
                    if (this.toolInfo.list[i]['name'] == itemName) {
                        item = this.toolInfo.list[i];
                        break;
                    }
                }
                ImportFile.load([item.path], () => {
                    document.title = item.title;
                    this.toolItem = itemName;
                    this.tabType = 2;
                });
            } else {
                document.title = '小玩意';
                this.toolItem = null;
                this.tabType = 1;
            }
        },
        toolItemHandle(item) {
            this.$root.pageJump(this.toolInfo.routerName, {
                name: item.name
            });
        }
    }
};