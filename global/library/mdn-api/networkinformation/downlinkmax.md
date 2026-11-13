---
title: "NetworkInformation: downlinkMax property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/networkinformation/downlinkmax/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NetworkInformation: downlinkMax property

The **`downlinkMax`** read-only property of the `NetworkInformation` interface returns the maximum downlink speed, in megabits per second (Mbps), for the underlying connection technology.

## Value

A number representing the maximum downlink speed, in megabits per second (Mb/s), for the underlying connection technology.

## Examples

The following example monitors the connection using the `change` event and logs changes as they occur.

```js
function logConnectionType() {
  let connectionType = "not supported";
  let downlinkMax = "not supported";

  if ("connection" in navigator) {
    connectionType = navigator.connection.effectiveType;

    if ("downlinkMax" in navigator.connection) {
      downlinkMax = navigator.connection.downlinkMax;
    }
  }

  console.log(
    `Current connection type: ${connectionType} (downlink max: ${downlinkMax})`,
  );
}

logConnectionType();
navigator.connection.addEventListener("change", logConnectionType);
```
