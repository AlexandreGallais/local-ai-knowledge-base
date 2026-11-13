---
title: "Declarative Management of Kubernetes Objects Using Kustomize (part 1 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/manage-kubernetes-objects/kustomization.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

Kustomize is a standalone tool
to customize Kubernetes objects
through a kustomization file.

Since 1.14, kubectl also
supports the management of Kubernetes objects using a kustomization file.
To view resources found in a directory containing a kustomization file, run the following command:

```shell
kubectl kustomize <kustomization_directory>
```

To apply those resources, run `kubectl apply` with `--kustomize` or `-k` flag:

```shell
kubectl apply -k <kustomization_directory>
```

## Before you begin

Install `kubectl`.
