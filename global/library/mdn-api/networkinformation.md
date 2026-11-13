---
title: "NetworkInformation"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/networkinformation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NetworkInformation

The **`NetworkInformation`** interface of the Network Information API provides information about the connection a device is using to communicate with the network and provides a means for scripts to be notified if the connection type changes.
The `NetworkInformation` interface cannot be instantiated. It is instead accessed through the `connection` property of the `Navigator` interface or the `WorkerNavigator` interface.

## Instance properties

_This interface also inherits properties of its parent, `EventTarget`._

- `NetworkInformation.downlink` (read-only)
    Returns the effective bandwidth estimate in megabits per second, rounded to the nearest multiple of 25 kilobits per seconds.
- `NetworkInformation.downlinkMax` (read-only) (experimental)
    Returns the maximum downlink speed, in megabits per second (Mbps), for the underlying connection technology.
- `NetworkInformation.effectiveType` (read-only)
    Returns the effective type of the connection meaning one of 'slow-2g', '2g', '3g', or '4g'. This value is determined using a combination of recently observed round-trip time and downlink values.
- `NetworkInformation.rtt` (read-only)
    Returns the estimated effective round-trip time of the current connection, rounded to the nearest multiple of 25 milliseconds.
- `NetworkInformation.saveData` (read-only)
    Returns `true` if the user has set a reduced data usage option on the user agent.
- `NetworkInformation.type` (read-only) (experimental)
    Returns the type of connection a device is using to communicate with the network. It will be one of the following values:
    - `bluetooth`
    - `cellular`
    - `ethernet`
    - `none`
    - `wifi`
    - `wimax`
    - `other`
    - `unknown`

## Instance methods

_This interface also inherits methods of its parent, `EventTarget`._

## Events

- `change`
    The event that's fired when connection information changes.

## See also

- Online and offline events
