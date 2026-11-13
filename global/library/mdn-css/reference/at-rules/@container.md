---
title: "`@container` CSS at-rule (part 1 of 3)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@container/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `@container` CSS at-rule

The **`@container`** CSS at-rule is a conditional group rule that applies styles to a containment context.
Style declarations are filtered by a condition and applied to the elements within the container if the condition is true.
The condition is evaluated when the queried container size, `<style-feature>`, or scroll-state changes.

The condition must specify a `container-name`, a `<container-query>`, or both.

The `container-name` property specifies a list of query container names, which are used to filter which containers are targeted by the `@container` rules. If only a `container-name` value is included (a name-only container query), the contained rules are applied to any containers with one or more of those `container-name` values set on them.

The container features in the `<container-query>` are evaluated against the selected containers.
If no `<container-name>` is specified, the `<container-query>` features are evaluated against the nearest ancestor query container that has the matching `container-type`.
