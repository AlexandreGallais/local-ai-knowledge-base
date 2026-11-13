---
title: "C++ addons (part 1 of 4)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/addons.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# C++ addons

_Addons_ are dynamically-linked shared objects that can be loaded via the
`require()` function as ordinary Node.js modules.
Addons provide a foreign function interface between JavaScript and native code.

There are three options for implementing addons:

* Node-API (recommended)
* `nan` (Native Abstractions for Node.js)
* direct use of internal V8, libuv, and Node.js libraries

The rest of this document focuses on the latter, requiring
knowledge of multiple components and APIs:

* V8: the C++ library Node.js uses to provide the
  JavaScript implementation. It provides the mechanisms for creating objects,
  calling functions, etc. The V8's API is documented mostly in the
  `v8.h` header file (`deps/v8/include/v8.h` in the Node.js source
  tree), and is also available online.

* `libuv`: The C library that implements the Node.js event loop, its worker
  threads and all of the asynchronous behaviors of the platform. It also
  serves as a cross-platform abstraction library, giving easy, POSIX-like
  access across all major operating systems to many common system tasks, such
  as interacting with the file system, sockets, timers, and system events. libuv
  also provides a threading abstraction similar to POSIX threads for
  more sophisticated asynchronous addons that need to move beyond the
  standard event loop. Addon authors should
  avoid blocking the event loop with I/O or other time-intensive tasks by
  offloading work via libuv to non-blocking system operations, worker threads,
  or a custom use of libuv threads.

* Internal Node.js libraries: Node.js itself exports C++ APIs that addons can
  use, the most important of which is the `node::ObjectWrap` class.

* Other statically linked libraries (including OpenSSL): These
  other libraries are located in the `deps/` directory in the Node.js source
  tree. Only the libuv, OpenSSL, V8, and zlib symbols are purposefully
  re-exported by Node.js and may be used to various extents by addons. See
  Linking to libraries included with Node.js for additional information.

All of the following examples are available for download and may
be used as the starting-point for an addon.
