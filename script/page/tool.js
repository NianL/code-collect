var PageTool = {
    mixins: [MixinImport],
    template: `
        <div class="main-tool" v-loading="!importObject.status">
            <template v-if="importObject.status">
                <template v-if="tabType==1">
                    <div class="main-search">
                        <input v-model="searchContent" onfocus="this.select()" placeholder="输入关键词模糊查询" />
                    </div>
                    <div class="main-tool-list">
                        <template v-for="item in c_itemList">
                            <a class="item" @click="toolItemHandle(item)">{{item.title}}</a>
                        </template>
                    </div>
                </template>
                <template v-if="tabType==2">
                    <l-go-back :router-name="currentMenu" />
                    <component class="main-tool-item" :is="'l-tool-'+toolItem" />
                </template>
            </template>
        </div>
    `,
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
            searchContent: "",
        };
    },
    watch: {
        '$route'() {
            this.getData();
        }
    },
    computed: {
        c_itemList() {
            var result = [];
            var search = this.searchContent.toLowerCase();
            if (this.toolInfo.list && this.toolInfo.list.length) {
                this.toolInfo.list.map(item => {
                    if (item.title.toLowerCase().indexOf(search) != -1)
                        result.push(item);
                })
            }
            return result;
        }
    },
    created() {
        this.$emit('now-menu', this.currentMenu);
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
                this.importObject.status = false;
                ImportFile.load([item.path], () => {
                    document.title = item.title;
                    this.toolItem = itemName;
                    this.tabType = 2;
                    this.importObject.status = true;
                });
            } else {
                document.title = WebConfig.menu.t(this.currentMenu);;
                this.toolItem = null;
                this.tabType = 1;
            }
        },
        toolItemHandle(item) {
            this.$router.push({
                name: this.toolInfo.routerName,
                params: {
                    name: item.name
                }
            });
        }
    }
};