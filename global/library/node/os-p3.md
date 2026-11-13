---
title: "OS (part 3 of 3)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/os.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# OS (part 3 of 3)

### Priority constants

The following process scheduling constants are exported by
`os.constants.priority`.

     | Constant
     | Description

     | `PRIORITY_LOW`
     | The lowest process scheduling priority. This corresponds to
    `IDLE_PRIORITY_CLASS` on Windows, and a nice value of
    `19` on all other platforms.

     | `PRIORITY_BELOW_NORMAL`
     | The process scheduling priority above `PRIORITY_LOW` and
    below `PRIORITY_NORMAL`. This corresponds to
    `BELOW_NORMAL_PRIORITY_CLASS` on Windows, and a nice value of
    `10` on all other platforms.

     | `PRIORITY_NORMAL`
     | The default process scheduling priority. This corresponds to
    `NORMAL_PRIORITY_CLASS` on Windows, and a nice value of
    `0` on all other platforms.

     | `PRIORITY_ABOVE_NORMAL`
     | The process scheduling priority above `PRIORITY_NORMAL` and
    below `PRIORITY_HIGH`. This corresponds to
    `ABOVE_NORMAL_PRIORITY_CLASS` on Windows, and a nice value of
    `-7` on all other platforms.

     | `PRIORITY_HIGH`
     | The process scheduling priority above `PRIORITY_ABOVE_NORMAL`
    and below `PRIORITY_HIGHEST`. This corresponds to
    `HIGH_PRIORITY_CLASS` on Windows, and a nice value of
    `-14` on all other platforms.

     | `PRIORITY_HIGHEST`
     | The highest process scheduling priority. This corresponds to
    `REALTIME_PRIORITY_CLASS` on Windows, and a nice value of
    `-20` on all other platforms.

### libuv constants

     | Constant
     | Description

     | `UV_UDP_REUSEADDR`
     |
