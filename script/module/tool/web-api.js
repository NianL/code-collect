Vue.component('l-tool-web-api', {
    mixins: [MixinImport],
    template: `
        <div class="web-api" v-if="importObject.status">
            <h3>WebApi调试小工具</h3>
            <div class="rows">
                <div class="type">
                    <a :class="{select:request.type=='GET'}" @click="request.type='GET'">GET</a>
                    <a :class="{select:request.type=='POST'}" @click="request.type='POST'">POST</a>
                </div>
            </div>
            <div class="rows http">
                <input class="input" placeholder="http://" />
                <a class="button submit" @click="submitRequest">提交</a>
                <a class="button" @click="saveRequest">保存</a>
            </div>
            <div class="rows">
                <a class="button" @click="addParams">添加参数</a>
                <template v-if="request.params.length>0">
                    <table class="params" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                            <th>参数名</th>
                            <th>类型</th>
                            <th>传入值</th>
                            <th></th>
                        </tr>
                        <template v-for="item in request.params">
                            <tr>
                                <td>
                                    <input class="input key" v-model="item.key" />
                                </td>
                                <td>
                                    <select class="input" v-model="item.type">
                                        <option>String</option>
                                        <option>Number</option>
                                        <option>Boolean</option>
                                    </select>
                                </td>
                                <td>
                                    <template v-if="item.type!='Boolean'">
                                        <input  class="input value" v-model="item.value" />
                                    </template>
                                    <template v-else>
                                        <select class="input" v-model="item.value">
                                            <option>true</option>
                                            <option>false</option>
                                        </select>
                                    </template>
                                </td>
                                <td>
                                    <a class="remove" @click="removeParams(index)">移除</a>
                                </td>
                            </tr>
                        </template>
                    </table>
                </template>
            </div>
            <div class="rows result">
                <div>运行结果</div>
                <textarea />
            </div>
        </div>
    `,
    data() {
        return {
            importObject: {
                status: false,
                data: [
                    'css/module/tool/web-api.css'
                ]
            },
            request: {
                type: 'GET',
                url: '',
                params: []
            }
        };
    },
    methods: {
        addParams() {
            this.request.params.push({
                key: "",
                type: "String",
                value: ""
            });
        },
        removeParams(index) {
            this.request.params.splice(index, 1);
        },
        submitRequest() {
            var url = this.request.url;
            var params = {};

            this.request.params.map(i => {
                if (i.key != "") {
                    var value;
                    switch (i.type) {
                        case "String":
                            value = String(i.value);
                            break;
                        case "Number":
                            value = Number(i.value);
                            break;
                        case "Boolean":
                            value = Boolean(i.value);
                            break;
                    }
                    params[i.key] = value;
                }
            });

            if (this.request.type == "GET") {
                axios.get(url, {
                    params: params
                }).then(res => {
                    console.log(res);
                }).catch(res => {
                    console.log(res);
                });
            } else {
                axios.post(url, params).then(res => {
                    console.log(res);
                }).catch(res => {
                    console.log(res);
                });
            }
        },
        saveRequest() {

        }
    }
});