---
title: "Other Tools"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/tools/_index.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Other Tools

Kubernetes contains several tools to help you work with the Kubernetes system.

## crictl

`crictl` is a command-line
interface for inspecting and debugging CRI-compatible
container runtimes.

## Dashboard

`Dashboard`, the web-based user interface of Kubernetes, allows you to deploy containerized applications
to a Kubernetes cluster, troubleshoot them, and manage the cluster and its
resources itself.

## Headlamp

Headlamp is an extensible Kubernetes graphical user
interface, and is an optional Kubernetes cluster component.
Headlamp is part of the Kubernetes project.

Headlamp provides:

* A modern, user-friendly graphical interface for cluster management and troubleshooting
* Support for both in-cluster deployment and desktop application modes
* Extensibility through a plugin system
* RBAC-based controls that adapt to user permissions

## Helm

Helm is a tool for managing packages of pre-configured
Kubernetes resources. These packages are known as _Helm charts_.

Use Helm to:

* Find and use popular software packaged as Kubernetes charts
* Share your own applications as Kubernetes charts
* Create reproducible builds of your Kubernetes applications
* Intelligently manage your Kubernetes manifest files
* Manage releases of Helm packages

## kind

`kind` is a tool for running local Kubernetes
clusters using Docker container nodes. kind is primarily designed for testing
Kubernetes itself, but may also be used for local development or CI.

## Kompose

`Kompose` is a tool to help Docker Compose users move to Kubernetes.

Use Kompose to:

* Translate a Docker Compose file into Kubernetes objects
* Go from local Docker development to managing your application via Kubernetes
* Convert v1 or v2 Docker Compose `yaml` files or Distributed Application Bundles

## Kui

`Kui` is a GUI tool that takes your normal `kubectl` command line requests and responds with graphics.
Instead of ASCII tables, Kui provides a GUI rendering with tables that you can sort.

Kui lets you:

* Directly click on long, auto-generated resource names instead of copying and pasting
* Type in `kubectl` commands and see them execute, even sometimes faster than `kubectl` itself
* Query a Job and see its execution rendered
  as a waterfall diagram
* Click through resources in your cluster using a tabbed UI

## Minikube

`minikube` is a tool that
runs a single-node Kubernetes cluster locally on your workstation for
development and testing purposes.
