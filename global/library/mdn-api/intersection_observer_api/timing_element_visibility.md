---
title: "Timing element visibility with the Intersection Observer API (part 1 of 4)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/intersection_observer_api/timing_element_visibility/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Timing element visibility with the Intersection Observer API

In this article, we'll build a mock blog which has a number of ads interspersed among the contents of the page, then use the Intersection Observer API to track how much time each ad is visible to the user. When an ad exceeds one minute of visible time, it will be replaced with a new one.

Although many aspects of this example will not match real-world usage (in particular, the articles all have the same text and aren't loaded from a database, and there are just a handful of simple text-only ads that are selected from an array), this should provide enough understanding of the API to quickly learn how to apply the Intersection Observer API to your own site.

There's a good reason why the notion of tracking visibility of ads is being used in this example. It turns out that one of the most common uses of Flash or other script in advertising on the Web is to record how long each ad is visible, for the purpose of billing and payment of revenues. Without the Intersection Observer API, this winds up being done using intervals and timeouts for each individual ad, or other techniques that tend to slow the page down. Using this API lets everything get streamlined by the browser to reduce the impact on performance substantially.

Let's get started!
