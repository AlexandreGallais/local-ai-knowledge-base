---
title: "CRI-O"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/cri-o.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# CRI-O

A tool that lets you use OCI container runtimes with Kubernetes CRI.

CRI-O is an implementation of the cri
to enable using container
runtimes that are compatible with the Open Container Initiative (OCI)
runtime spec.

Deploying CRI-O allows Kubernetes to use any OCI-compliant runtime as the container
runtime for running Pods, and to fetch
OCI container images from remote registries.
