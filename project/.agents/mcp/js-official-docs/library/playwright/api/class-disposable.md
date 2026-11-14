---
title: "class: Disposable"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-disposable.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: Disposable
* since: v1.59
* langs: js, python

[Disposable] is returned from various methods to allow undoing the corresponding action. For example,
[`method: Page.addInitScript`] returns a [Disposable] that can be used to remove the init script.

## async method: Disposable.close
* since: v1.59
* langs: python

Removes the associated resource. For example, removes the init script installed via
[`method: Page.addInitScript`] or [`method: BrowserContext.addInitScript`].

## async method: Disposable.dispose
* since: v1.59
* langs: js

Removes the associated resource. For example, removes the init script installed via
[`method: Page.addInitScript`] or [`method: BrowserContext.addInitScript`].
