---
title: "Navigator: oscpu property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/oscpu/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: oscpu property

The **`oscpu`** read-only property of the `Navigator` interface returns a string that identifies the current operating system.

## Value

A string providing a string which identifies the operating system on which the browser is running.

| Operating system              | `oscpuInfo` string format                         |
| ----------------------------- | ------------------------------------------------- |
| OS/2                          | `OS/2 Warp x (either 3, 4 or 4.5)`                |
| Windows CE                    | `WindowsCE x.y`                                   |
| Windows 64-bit (64-bit build) | `Windows NT x.y; Win64; x64`                      |
| Windows 64-bit (32-bit build) | `Windows NT x.y; WOW64`                           |
| Windows 32-bit                | `Windows NT x.y`                                  |
| Mac OS X (PPC build)          | `PowerPC Mac OS X version x.y`                    |
| Mac OS X (i386/x64 build)     | `Intel Mac OS X` or `macOS version x.y`           |
| Linux 64-bit (32-bit build)   | Output of `uname -s` followed by `i686 on x86_64` |
| Linux                         | Output of `uname -sm`                             |

In this table `x.y` refers to the version of the operating system

## Usage notes

Unless your code is privileged (chrome or at least has the UniversalBrowserRead privilege), it may get the value of the `general.oscpu.override` preference instead of the true platform.

## Examples

```js
function osInfo() {
  alert(navigator.oscpu);
}

osInfo(); // alerts "Windows NT 6.0" for example
```
