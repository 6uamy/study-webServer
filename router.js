function route(pathname, handle, responce) {
    console.log('pathname: ' + pathname);

    if (typeof handle[pathname] === 'function') {
        handle[pathname](responce);
    } else {
        responce.writeHead(404, {'Content-Type' : 'text/html'});
        responce.write('not found');
        responce.end();
    }
}

exports.route = route;
