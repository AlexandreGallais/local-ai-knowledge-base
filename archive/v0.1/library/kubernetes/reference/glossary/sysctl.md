---
title: "sysctl"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/sysctl.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# sysctl

`sysctl` is a semi-standardized interface for reading or changing the
 attributes of the running Unix kernel.

On Unix-like systems, `sysctl` is both the name of the tool that administrators
use to view and modify these settings, and also the system call that the tool
uses.

Container runtimes and
network plugins may rely on `sysctl` values being set a certain way.
