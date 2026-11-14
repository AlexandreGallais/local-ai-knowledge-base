---
title: "Notification: actions property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/notification/actions/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Notification: actions property

The **`actions`** read-only property of the `Notification` interface provides the actions available for users to select when interacting with the notification.

## Value

A read-only array of actions.
Each element in the array is an object with the following members:

- `action`
    A string identifying a user action to be displayed on the notification.
- `title`
    A string containing action text to be shown to the user.
- `icon`
    A string containing the URL of an icon to display with the action.
- `navigate` (optional) (experimental)
    A string containing a URL to navigate to when the user activates this action.
    When set, the user agent navigates to this URL instead of firing the `notificationclick` event.
    See `Notification.navigate` for more information.

## Description

Notification actions are buttons or controls that appear within persistent notifications.
They are set using the `actions` option of the second argument of the `showNotification()` method.
Note that actions are not available for non-persistent notifications.
If you pass an `options` object with an `actions` property that is anything other than `null` to the `Notification()` constructor, a `TypeError` is thrown.

Clicking the button associated with an action navigates to the URL set in the `navigate` option if one is specified.
Otherwise, it fires a `notificationclick` event on the service worker that includes the action that was selected (and the associated `Notification` instance), so the worker can handle it without the user ever switching to your page.

> **Note:**
> Browsers typically limit the maximum number of actions they will display for a particular notification.
> Check the static `Notification.maxActions` property to determine the limit.

## Examples

### Basic usage

The following code shows how a service worker might listen for the `notificationclick` event and use it to retrieve both the clicked action and an array of all actions.

```js
// sw.js
self.addEventListener("notificationclick", (event) => {
  const clickedAction = event.action; // e.g. "reply" or "" if body was clicked

  // Read all defined actions
  const notification = event.notification; // the Notification object
  console.log(notification.actions); // full array of action objects

  notification.close();
});
```

## See also

- Using the Notifications API
- `Notification.maxActions`
