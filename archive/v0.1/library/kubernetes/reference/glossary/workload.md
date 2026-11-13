---
title: "Workload"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/workload.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Workload

A workload is an application running on Kubernetes.

Various core objects that represent different types or parts of a workload
include the DaemonSet, Deployment, Job, ReplicaSet, and StatefulSet objects.

For example, a workload that has a web server and a database might run the
database in one StatefulSet and the web server
in a Deployment.
