var blessed = require('blessed');

var screen = blessed.screen({smartCSR: true});
screen.title = 'Trade Tech Documentation';

// Create a frame perfectly centered horizontally and vertically.
//
var menu = blessed.List({
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'black',
    border: {
      fg: '#f0f0f0'
    },
    hover: {
      bg: 'blue'
    }
  } 
});

var frame = blessed.box({
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: 'Trade Tech Documentation',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'black',
    border: {
      fg: '#f0f0f0'
    },
    hover: {
      bg: 'blue'
    }
  }
});

var titleBox = blessed.box({
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: 'Menu',
});

// Append our frame to the screen.
screen.append(frame);
frame.append(titleBox);

// Add a png icon to the frame
var icon = blessed.image({
  parent: frame,
  top: 0,
  left: 0,
  type: 'overlay',
  width: 'shrink',
  height: 'shrink',
  file: __dirname + '/my-program-icon.png',
  search: false
});

// If our frame is clicked, change the content.
frame.on('click', function(data) {
  frame.setContent('{center}Some different {red-fg}content{/red-fg}.{/center}');
  screen.render();
});

// If frame is focused, handle `enter`/`return` and give us some more content.
frame.key('enter', function(ch, key) {
  frame.setContent('{right}Even different {black-fg}content{/black-fg}.{/right}\n');
  frame.setLine(1, 'bar');
  frame.insertLine(1, 'foo');
  screen.render();
});

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

screen.key(['a'], function(ch, key) {
    screen.title = key 
    frame.style.bg = 'gray';
    screen.render();
});

// Focus our element.
frame.focus();

// Render the screen.
screen.render();
