const fs = require('fs');
const main_view = fs.readFileSync('./main.html', 'utf-8');
const orderlist_view = fs.readFileSync('./orderlist.html', 'utf-8');

const mariadb = require('./database/connect/mariadb');

function main(responce) {
    console.log('main');

    mariadb.query('SELECT * FROM product', (err, rows) => {
        console.log(rows);
    });
    
    responce.writeHead(200, {'Content-Type' : 'text/html'});
    responce.write(main_view);
    responce.end();
}

function redRacket(responce) {
    fs.readFile('./img/redRacket.png', (err, data) => {
        responce.writeHead(200, {'Content-Type' : 'text/html'});
        responce.write(data);
        responce.end();
    });
}

function blueRacket(responce) {
    fs.readFile('./img/blueRacket.png', (err, data) => {
        responce.writeHead(200, {'Content-Type' : 'text/html'});
        responce.write(data);
        responce.end();
    });
}

function blackRacket(responce) {
    fs.readFile('./img/blackRacket.png', (err, data) => {
        responce.writeHead(200, {'Content-Type' : 'text/html'});
        responce.write(data);
        responce.end();
    });
}

function order(responce, productId) {
    responce.writeHead(200, {'Content-Type' : 'text/html'});

    mariadb.query("INSERT INTO orderlist VALUES(" + productId + ", '" + new Date().toLocaleDateString() + "');", function(err, rows) {
        console.log(rows);
    });

    responce.write('order page');
    responce.end();
}

function orderlist(responce) {
    responce.writeHead(200, {'Content-Type' : 'text/html'});

    mariadb.query("SELECT * FROM orderlist", (err, row) => {
        responce.write(orderlist_view);
        
        row.forEach(element => {
            responce.write("<tr>"
                        + "<td>" + element.product_id + "</td>"
                        + "<td>" + element.order_date + "</td>"
                        + "</tr>");
        });

        responce.write("</table>");
        responce.end();
    });
}

function mainCSS(response) {
    fs.readFile('./css/main.css', function(err, data) {
        response.writeHead(200, {'Content-Type':'text/css'});
        response.write(data);
        response.end();
    });
}

let handle = {}; // key-value
handle['/'] = main;
handle['/order'] = order;
handle['/orderlist.html'] = orderlist;

handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;

handle['/css/main.css'] = mainCSS;

exports.handle = handle;
