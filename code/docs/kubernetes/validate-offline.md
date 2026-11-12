---
id: kubernetes-validate-offline
title: Validate manifests without a cluster
topic: kubernetes
summary: Validate manifests without a cluster with kubeconform, KubeLinter, helm lint and kustomize, and what each one misses.
tool: kubeconform, kube-linter, helm
version: "4"
checked: 2026-11-13
sources: [S1, S2, S3, S4, S5]
license: MIT, written for this base from Apache 2.0 sources and others, described in own words
variant: files
---

# Validate manifests without a cluster

Contents: 1. The tools · 2. Commands · 3. Local schemas · 4. What they miss · Sources

## 1. The tools (Kubernetes validation without a cluster)

| Tool | What it checks | What it needs | Limit |
| --- | --- | --- | --- |
| kubeconform | The schema of each object; `-strict` refuses unknown fields and duplicate keys; `-kubernetes-version` | Schemas, downloaded by default; a local folder with `-schema-location` | Not the validation done by the server [S1] |
| KubeLinter | Security and production good practices, on YAML, Helm charts and Kustomize | Its binary and local files | Its options and configuration can change [S3] |
| `helm lint` | The chart: `[ERROR]` for what fails the install, `[WARNING]` for a convention; `--strict` fails on a warning | Helm | Not the result once deployed [S4] |
| `kustomize build` | That the overlay builds; prints the final objects | Kustomize | Their validity: pass them to kubeconform [S5] |
| kubectl-validate | The rules of the server, with the same code | Go to install it | No official image [S2] |

Run kubeconform first, then KubeLinter.

## 2. Commands (validate a manifest)

```sh
kubeconform -strict -summary <files>
kube-linter lint <files>
helm lint --strict <chart folder>
helm template <chart folder> | kubeconform -strict -summary
kustomize build <folder> | kubeconform -strict -summary
```

The `AGENTS.md` of the project can give the cluster version and the local schema folder. Use its commands first.

## 3. Local schemas for kubeconform

- kubeconform downloads its schemas by default. When the network is closed, it fails to download a schema. [S1]
- Point it to a local folder, filled once for the cluster version:

```sh
kubeconform -strict -summary -kubernetes-version 1.37.0 \
  -schema-location '<schema folder>/{{ .ResourceKind }}{{ .KindSuffix }}.json' <files>
```

- Custom kinds (Gateway API, operators) need their own schemas in the same folder. [S1]
- `-cache <folder>` keeps the downloaded schemas. [S1]

## 4. What validation misses

- A manifest that passes kubeconform can still be refused by the server, or fail at run time: links between objects (selector and labels, Secret in the right namespace) are not checked. [S1]
- `kubectl apply --validate -f <file>` and `kubectl apply --dry-run=server -f <file>` ask a real server; they need a cluster. Never run `kubectl apply` without a dry run.
- Say in your answer which checks ran and which did not.

## Sources

- [S1] yannh, "kubeconform", README, <https://github.com/yannh/kubeconform>, read 2026-11-12, Apache 2.0, summarized.
- [S2] Kubernetes SIG CLI, "kubectl-validate", README, <https://github.com/kubernetes-sigs/kubectl-validate>, read 2026-11-12, summarized.
- [S3] StackRox, Red Hat, "KubeLinter", README, <https://github.com/stackrox/kube-linter>, read 2026-11-12, Apache 2.0, summarized.
- [S4] Helm, "helm lint", v4.3.1, <https://helm.sh/docs/helm/helm_lint>, read 2026-11-12, summarized.
- [S5] Kustomize, "Glossary", <https://kubectl.docs.kubernetes.io/references/kustomize/glossary>, read 2026-11-12, summarized.
