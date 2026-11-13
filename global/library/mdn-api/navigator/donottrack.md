---
title: "Navigator: doNotTrack property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/donottrack/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: doNotTrack property

The **`doNotTrack`** read-only property of the `Navigator` interface returns the user's Do Not Track setting, which indicates whether the user is requesting websites and advertisers to not track them.

The value of the property reflects that of the `DNT` HTTP header, i.e., values of `"1"`, `"0"`, or `null`.

The whole DNT (Do Not Track) specification has been discontinued. The mechanism design was flawed, because it was a cooperative feature between users, websites, and browsers. The idea is that the user tells the _website_ to not track them, and the _website_ would comply. However, there is no strict enforcement of this policy, so advertisement websites ignored the DNT header and tracked users anyway. The feature is therefore useless. Moreover, it is harmful as it leaves more user fingerprint in the header, which can be used to track users even more.

Browsers are exploring other more enforceable privacy features, such as global privacy control, restriction to third-party cookies, and more.

## Value

A string or `null`.

## Examples

```js
console.log(navigator.doNotTrack);
// prints "1" if DNT is enabled; "0" if the user opted-in for tracking; otherwise null
```

## Specifications

Part of the discontinued Tracking Preference Expression (DNT) specification.

## See also

- `DNT` HTTP header
