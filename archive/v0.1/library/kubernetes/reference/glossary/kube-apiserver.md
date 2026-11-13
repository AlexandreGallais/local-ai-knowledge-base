---
title: "API server"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/kube-apiserver.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# API server

The API server is a component of the Kubernetes
control plane that exposes the Kubernetes API.
The API server is the front end for the Kubernetes control plane.

The main implementation of a Kubernetes API server is kube-apiserver.
kube-apiserver is designed to scale horizontally—that is, it scales by deploying more instances.
You can run several instances of kube-apiserver and balance traffic between those instances.
