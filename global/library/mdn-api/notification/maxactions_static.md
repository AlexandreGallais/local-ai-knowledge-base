---
title: "Notification: maxActions static property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/notification/maxactions_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Notification: maxActions static property

The **`maxActions`** read-only static property of the `Notification` interface returns the maximum number of actions that can be displayed in a notification.

## Value

An integer.

## Description

Notification actions are buttons or controls that appear within persistent notifications.
Actions are set using the `actions` option of the second argument of the `showNotification()` method.

Browsers typically limit the maximum number of actions they will display for a particular notification.
The `maxActions` property returns that limit, which is the maximum number of elements in the `Notification.actions` array that will be respected by the user agent.

## Examples

### Log the maximum possible number of actions

The following snippet logs the maximum number of supported actions.

```js
const maxActions = Notification.maxActions;
console.log(
  `This device can display at most ${maxActions} actions on each notification.`,
);
```

## See also

- Using the Notifications API
- `Notification.actions`
