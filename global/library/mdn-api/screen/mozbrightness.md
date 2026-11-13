---
title: "Screen: mozBrightness property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/screen/mozbrightness/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Screen: mozBrightness property

Indicates how bright the screen's backlight is, on a scale from 0 (very dim) to 1 (full
brightness); this value is a double-precision float.

You can read and write this attribute even when the screen is disabled, but the
backlight is off while the screen is disabled. If you write a value of X into this
attribute, the attribute may not have the same value X when you later read it. Most
screens don't support as many different brightness levels as there are doubles between 0
and 1. The value's precision might be reduced before storing it.

## Value

A number.

## Specifications

Not part of specification.
