let http = require('http'); // nodejs가 가지고 있는 기능(모듈)
//let url = require('url');

function start(route, handle) {
    function onRequest(request, responce) {
        let pathname = new URL(request.url, `http://${request.headers.host}`).pathname;
        let queryData = new URL(request.url, `http://${request.headers.host}`).searchParams;
        if (!request.url.includes('favicon.ico')) {
            route(pathname, handle, responce, queryData.get('productId'));
        }
    }

    http.createServer(onRequest).listen(8888); // localhost:8888
}

exports.start = start;
