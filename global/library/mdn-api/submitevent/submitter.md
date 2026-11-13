---
title: "SubmitEvent: submitter property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/submitevent/submitter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SubmitEvent: submitter property

The read-only **`submitter`** property found on
the `SubmitEvent` interface specifies the submit button or other element
that was invoked to cause the form to be submitted.

## Value

An element, indicating the element that sent
the `submit` event to the form. While this
is often an `` element whose `type` is `submit` or a `` element whose `type` is `submit`, it could be some other element which has initiated a
submission process.

If the submission was not triggered by a button of some kind, the value of `submitter` is `null`.

## Examples

See `SubmitEvent` for example code.
