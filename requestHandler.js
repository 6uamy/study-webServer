const mariadb = require('./database/connect/mariadb');

function main(responce) {
    console.log('main');

    mariadb.query('SELECT * FROM product', (err, rows) => {
        console.log(rows);
    });
    
    responce.writeHead(200, {'Content-Type' : 'text/html'});
    responce.write('Hello here is Main');
    responce.end();
}

function login(responce) {
    console.log('login');

    responce.writeHead(200, {'Content-Type' : 'text/html'});
    responce.write('Hello here is Login');
    responce.end();
}

let handle = {}; // key-value
handle['/'] = main;
handle['/login'] = login;

exports.handle = handle;
