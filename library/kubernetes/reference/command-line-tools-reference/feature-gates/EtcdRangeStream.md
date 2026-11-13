---
title: "EtcdRangeStream"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/EtcdRangeStream.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# EtcdRangeStream

Enables the kube-apiserver to use etcd's `RangeStream` RPC to stream large list
responses from etcd, instead of fetching them in a single `Range` response. This
reduces memory spikes in both etcd and the kube-apiserver when serving large
`LIST` requests.
