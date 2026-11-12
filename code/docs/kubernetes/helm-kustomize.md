---
id: kubernetes-helm-kustomize
title: Helm charts and Kustomize overlays
topic: kubernetes
summary: When a chart or an overlay, and the commands to render and check each one without a cluster. Helm 4.
tool: helm
version: "4"
checked: 2026-11-13
sources: [S1, S2]
license: MIT, written for this base, described in own words
variant: files
---

# Helm charts and Kustomize overlays

Contents: 1. Which one · 2. Helm · 3. Kustomize · Sources

## 1. Chart or overlay (Helm or Kustomize)

- Kustomize changes plain YAML files without a text template: a base, overlays that depend on it, and patches (strategic merge or JSON). [S2]
- Helm packages templates and values into a chart. [S1]
- Use what the project already uses. Read it in the `AGENTS.md` of the project, or look for `Chart.yaml` and `kustomization.yaml`. Never mix both for the same objects.

## 2. Helm chart commands

| Need | Command |
| --- | --- |
| Check the chart | `helm lint --strict <chart folder>` |
| Check for a Kubernetes version | `helm lint --strict --kube-version <version> <chart folder>` |
| Render the objects | `helm template <chart folder>` |
| Validate the rendered objects | `helm template <chart folder> \| kubeconform -strict -summary` |

- `helm lint` prints `[ERROR]` for what will fail the install and `[WARNING]` for a gap with the conventions; `--strict` makes a warning fail. [S1]
- Never run `helm install` or `helm upgrade` yourself: they change the cluster.
- Check `helm template --help` before you use an option of it.

## 3. Kustomize overlay commands

```text
deploy/
  base/
    kustomization.yaml
    deployment.yaml
    service.yaml
  overlays/
    test/kustomization.yaml
    production/kustomization.yaml
```

```yaml
# deploy/overlays/production/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - ../../base
images:
  - name: registry.example.internal/api
    newTag: 1.4.0
```

- Render: `kustomize build deploy/overlays/production`. [S2]
- Validate: `kustomize build deploy/overlays/production | kubeconform -strict -summary`.

## Sources

- [S1] Helm, "helm lint", v4.3.1, <https://helm.sh/docs/helm/helm_lint>, read 2026-11-12, summarized.
- [S2] Kustomize, "Glossary", <https://kubectl.docs.kubernetes.io/references/kustomize/glossary>, read 2026-11-12, summarized.
