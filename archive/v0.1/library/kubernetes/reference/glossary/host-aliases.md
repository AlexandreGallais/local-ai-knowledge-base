---
title: "HostAliases"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/host-aliases.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# HostAliases

A HostAliases is a mapping between the IP address and hostname to be injected into a Pod's hosts file.

HostAliases is an optional list of hostnames and IP addresses that will be injected into the Pod's hosts file if specified. This is only valid for non-hostNetwork Pods.
