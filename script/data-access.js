axios.defaults.baseURL = "";
// axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

var HttpRequest = {};
HttpRequest.get = function (url, params) {
    return axios.get(url, {
        params: params
    }).catch(function () {
        console.log(url + " error");
    });
};

HttpRequest.post = function (url, params, config) {
    return axios.post(url, params, config).catch(function () {
        console.log(url + " error");
    });
};

var DataAccess = {};

DataAccess.GetArticleList = function () {
    return HttpRequest.get('data/article/list.json');
};

DataAccess.GetArticleDetail = function (id) {
    return HttpRequest.get('data/article/' + id + '.json');
};

DataAccess.GetToolList = function () {
    return HttpRequest.get('data/tool/list.json');
};