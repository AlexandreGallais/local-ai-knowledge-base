---
title: "Navigator: globalPrivacyControl property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/globalprivacycontrol/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: globalPrivacyControl property

The **`Navigator.globalPrivacyControl`** read-only property returns the user's Global Privacy Control setting for the current website.
This setting indicates whether the user consents to the website or service selling or sharing their personal information with third parties.

The value of the property reflects that of the `Sec-GPC` HTTP header.

## Value

`true` if the user explicitly _does not_ provide consent to sell or share their data.
`false` if the user either grants consent, or has not indicated a preference.

## Example

```js
console.log(navigator.globalPrivacyControl);
// "true" if the user has specifically indicated they do not want their data shared or sold, otherwise "false".
```

## See also

- `Sec-GPC` header
- GlobalPrivacyControl.org
- Do Not Track on Wikipedia
