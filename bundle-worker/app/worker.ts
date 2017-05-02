// require('globals'); // necessary to bootstrap tns modules on the new thread

declare function postMessage(msg: any);
declare function close();

onmessage = function(msg) {
  console.dump(msg);
};

onerror = function(err) {
  console.dump(err);

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
