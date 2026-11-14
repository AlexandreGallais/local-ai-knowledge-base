---
title: "Navigator: webdriver property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/webdriver/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: webdriver property

The **`webdriver`** read-only property
of the `navigator` interface indicates whether the user agent is
controlled by automation.

It defines a standard way for co-operating user agents to inform the document that it
is controlled by WebDriver, for example, so that
alternate code paths can be triggered during automation.

The `navigator.webdriver` property is true when in:

- Chrome
    The `--enable-automation` or `--headless` flag is used, or the
    `--remote-debugging-port` flag specifying port 0 is used.
- Firefox
    The `marionette.enabled` preference or `--marionette` flag is
    passed.

## Value

A `Boolean`
