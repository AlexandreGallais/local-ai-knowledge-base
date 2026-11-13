---
title: "Notification: lang property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/notification/lang/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Notification: lang property

The **`lang`** read-only property of the
`Notification` interface indicates the language used in the notification,
as specified in the `lang` option of the
`Notification()` constructor.

The language itself is specified using a string representing a BCP 47 language tag.

## Value

A string specifying the language tag.

## Examples

The following snippet fires a notification; a simple `options` object is
created, then the notification is fired using the `Notification()`
constructor.

```js
const options = {
  body: "Your code submission has received 3 new review comments.",
  lang: "en-US",
};

const n = new Notification("New review activity", options);

console.log(n.lang); // "en-US"
```

## See also

- Using the Notifications API
