let http = require('http'); // nodejs가 가지고 있는 기능(모듈)
let url = require('url');

function start(route, handle) {
    function onRequest(request, responce) {
        let pathname = url.parse(request.url).pathname;
        let queryData = url.parse(request.url, true).query;

        if (!request.url.includes('favicon.ico')) {
            route(pathname, handle, responce, queryData.productId);
        }
    }

    http.createServer(onRequest).listen(8888); // localhost:8888
}

exports.start = start;
