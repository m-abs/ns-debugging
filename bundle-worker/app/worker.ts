import 'globals';

declare function postMessage(msg: any);
declare function close();
declare var global: any;

global.onmessage = function(msg) {
  console.log(`message from main thread: ${JSON.stringify(msg.data)}`);
};

global.onerror = function(err) {
  console.log(err);

  return true;
};

let i = 0;

setInterval(() => {
  postMessage({i});

  i += 1;

  if (i > 100) {
    close();
  }
}, 1000);
