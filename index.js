var blessed = require('blessed');
var fs = require('fs');
var sqlite3 = require('sqlite3');
var menuData = require('./lib/menu_data');
var screen = blessed.screen({ smartCSR: true });
var initialMenuItems = Object.keys(menuData['Trade Tech Documentation']);
var path = ['Trade Tech Documentation'];

screen.title = 'Trade Tech Documentation';
screen.cursor.color = 'yellow';

function debug(data) {
    fs.writeFile('./debug.log', data + '\n');
} 

function updatePath(path, key, targetRelation) {
    if (targetRelation === 'child') {
        path.push(key);  
    }
    if (targetRelation === 'parent') {
        path.pop();  
    }
}

function getNode(path, menuData) {
    var node = menuData;
    for (var i = 0, l = path.length; i < l; i++) {
        node = node[path[i]]; 
    }
    return node;
} 

/* views */
var frame = blessed.box({
    draggable: true,
    top: 'center',
    left: 'center',
    width: '50%',
    height: '50%',
    bg: 'black',
    fg: 'white',
    border: {
        type: 'line',
        ch:   '*'
    },
    content: 'Trade Tech Documentation'
});

var menuList = blessed.list({
    parent: screen,
    label: 'Main Menu',
    keys: true,
    vi: true,
    items: initialMenuItems,
    style: {
        selected: {
            bg: 'red',
            fg: 'black'
        },
        item: {
            hover: {
                bg: 'black',
                fg: 'red'
            }
        }
    },
    border: {
        type: 'line',
        ch: '*'
    }

});

screen.key(['C-c', 'q'], function(ch, key) {
    process.exit(0);
});


menuList.on('select', function(el, selected) {

    updatePath(path, el.getText(), 'child');
    var menuItems = Object.keys(getNode(path, menuData));

    menuList.setItems( Object.keys(getNode(path, menuData)) );
    menuList.title = path[path.length -1];

    screen.render();

});

var title = blessed.bigtext({
    content: 'abc',
});

frame.append(menuList);
screen.append(frame);
screen.render()
