---
title: "Downward API"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/downward-api.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Downward API

Kubernetes' mechanism to expose Pod and container field values to code running in a container.

It is sometimes useful for a container to have information about itself, without
needing to make changes to the container code that directly couple it to Kubernetes.

The Kubernetes downward API allows containers to consume information about themselves
or their context in a Kubernetes cluster. Applications in containers can have
access to that information, without the application needing to act as a client of
the Kubernetes API.

There are two ways to expose Pod and container fields to a running container:

- using environment variables
- using a `downwardAPI` volume

Together, these two ways of exposing Pod and container fields are called the _downward API_.
