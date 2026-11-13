---
title: "Notification: tag property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/notification/tag/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Notification: tag property

The **`tag`** read-only property of the
`Notification` interface signifies an identifying tag for the notification,
as specified in the `tag` option of the
`Notification()` constructor.

The idea of notification tags is that more than one notification can share the same
tag, linking them together. One notification can then be programmatically replaced with
another to avoid the users' screen being filled up with a huge number of similar
notifications.

## Value

A string.

## Examples

Our Using the Notifications API article has a good example of tag usage.

## See also

- Using the Notifications API
