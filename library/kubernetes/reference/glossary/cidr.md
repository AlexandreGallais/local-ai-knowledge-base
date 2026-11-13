---
title: "CIDR"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/cidr.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# CIDR

CIDR (Classless Inter-Domain Routing) is a notation for describing blocks of IP addresses and is used heavily in various networking configurations.

In the context of Kubernetes, each Node is assigned a range of IP addresses through the start address and a subnet mask using CIDR. This allows Nodes to assign each Pod a unique IP address. Although originally a concept for IPv4, CIDR has also been expanded to include IPv6.
