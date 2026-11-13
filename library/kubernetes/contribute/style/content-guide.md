---
title: "Documentation Content Guide"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/contribute/style/content-guide.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Documentation Content Guide

This page contains guidelines for Kubernetes documentation.

If you have questions about what's allowed, join the #sig-docs channel in
Kubernetes Slack and ask!

You can register for Kubernetes Slack at https://slack.k8s.io/.

For information on creating new content for the Kubernetes
docs, follow the style guide.

## Overview

Source for the Kubernetes website, including the docs, resides in the
kubernetes/website repository.

Located in the `kubernetes/website/content/<language_code>/docs` folder, the
majority of Kubernetes documentation is specific to the Kubernetes
project.

## What's allowed

Kubernetes docs allow content for third-party projects only when:

- Content documents software in the Kubernetes project
- Content documents software that's out of project but necessary for Kubernetes to function
- Content is canonical on kubernetes.io, or links to canonical content elsewhere

### Third party content

Kubernetes documentation includes applied examples of projects in the Kubernetes
project—projects that live in the kubernetes and
kubernetes-sigs GitHub organizations.

Links to active content in the Kubernetes project are always allowed.

Kubernetes requires some third party content to function. Examples include container runtimes (containerd, CRI-O, Docker),
networking policy (CNI plugins),
Ingress controllers,
and logging.

Docs can link to third-party open source software (OSS) outside the Kubernetes
project only if it's necessary for Kubernetes to function.

### Dual sourced content

Wherever possible, Kubernetes docs link to canonical sources instead of hosting
dual-sourced content.

Dual-sourced content requires double the effort (or more!) to maintain
and grows stale more quickly.

**Note:**
If you're a maintainer for a Kubernetes project and need help hosting your own docs,
ask for help in #sig-docs on Kubernetes Slack.

### More information

If you have questions about allowed content, join the Kubernetes Slack #sig-docs channel and ask!

## What's next

* Read the Style guide.
