console.log("Service Worker file");

var window = window ?? self;

window.addEventListener("message", function(event) {
  console.log(event);
  // We only accept messages from this window to itself [i.e. not from any iframes]
  if (event.source != window)
    return;
}, false);