---
title: "Window: location property (part 4 of 4)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/location/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: location property (part 4 of 4)

```js
const showBookmark = (() => {
  let _useHash;
  let _scrollX;
  let _scrollY;
  let _nodeX;
  let _nodeY;
  let _itFrame;
  let _scrollId = -1;
  let _bookMark;

  // duration: the duration in milliseconds of each frame
  // frames: number of frames for each scroll
  let duration = 200;
  let frames = 10;

  function _next() {
    if (_itFrame > frames) {
      clearInterval(_scrollId);
      _scrollId = -1;
      return;
    }
    _isBot = true;
    document.documentElement.scrollTop = Math.round(
      _scrollY + ((_nodeY - _scrollY) * _itFrame) / frames,
    );
    document.documentElement.scrollLeft = Math.round(
      _scrollX + ((_nodeX - _scrollX) * _itFrame) / frames,
    );
    if (_useHash && _itFrame === frames) {
      location.hash = _bookMark;
    }
    _itFrame++;
  }

  function _chkOwner() {
    if (_isBot) {
      _isBot = false;
      return;
    }
    if (_scrollId > -1) {
      clearInterval(_scrollId);
      _scrollId = -1;
    }
  }

  window.addEventListener("scroll", _chkOwner);

  return (bookmark, useHash) => {
    const node = document.querySelector(bookmark);
    _scrollY = document.documentElement.scrollTop;
    _scrollX = document.documentElement.scrollLeft;
    _bookMark = bookmark;
    _useHash = useHash === true;
    _nodeX = node.offsetLeft;
    _nodeY = node.offsetTop;
    _itFrame = 1;
    if (_scrollId === -1) {
      _scrollId = setInterval(_next, Math.round(duration / frames));
    }
  };
})();
```

## See also

- The interface of the returned value, `Location`
- A similar information, but attached to the document,
  `Document.location`
- Manipulating the browser history
- `hashchange`
