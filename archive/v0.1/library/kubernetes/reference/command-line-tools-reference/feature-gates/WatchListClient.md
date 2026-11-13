---
title: "WatchListClient"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/WatchListClient.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# WatchListClient

Allows an API client to request a stream of data rather than fetching a full list.
This functionality is available in `client-go` and requires the
WatchList
feature to be enabled on the server.
If the `WatchList` is not supported on the server, the client will seamlessly fall back to a standard list request.
