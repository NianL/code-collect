axios.defaults.baseURL = location.origin;
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

DataAccess.GetArticleList = function (params) {
    return HttpRequest.get('data/article-list.json', params);
};