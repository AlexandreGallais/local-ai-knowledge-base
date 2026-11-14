---
title: "`rel` HTML attribute (part 1 of 3)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/attributes/rel/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `rel` HTML attribute

The **`rel`** attribute defines the relationship between a linked resource and the current document. Valid on `<link>`, ``, `<area>`, and `<form>`, the supported values depend on the element on which the attribute is found.

The type of relationships is given by the value of the `rel` attribute, which, if present, must have a value that is an unordered set of unique space-separated keywords. Differently from a `class` name, which does not express semantics, the `rel` attribute must express tokens that are semantically valid for both machines and humans. The current registries for the possible values of the `rel` attribute are the IANA link relation registry, the HTML Living Standard, and the freely-editable existing-rel-values page in the microformats wiki, as suggested by the Living Standard. If a `rel` attribute not present in one of the three sources above is used some HTML validators (such as the W3C Markup Validation Service) will generate a warning.

The following table lists some of the most important existing keywords. Every keyword within a space-separated value should be unique within that value.
