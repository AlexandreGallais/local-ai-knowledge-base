---
title: "ServiceWorkerRegistration: active property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworkerregistration/active/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorkerRegistration: active property

The **`active`** read-only property of the
`ServiceWorkerRegistration` interface returns a service worker whose
`ServiceWorker.state` is `activating` or `activated`.
This property is initially set to `null`.

An active worker controls a `Client` if the client's URL
falls within the scope of the registration (the `scope` option set when
`ServiceWorkerContainer.register` is first called.)

> **Note:**
> Once an active worker is `activating`, neither a
> runtime script error nor a force termination of the active worker prevents the active
> worker from getting `activated`.

## Value

A `ServiceWorker` object's property, if it is currently in an
`activating` or `activated` state.

## See also

- Using Service Workers
- Service workers basic code example
- Using web workers
