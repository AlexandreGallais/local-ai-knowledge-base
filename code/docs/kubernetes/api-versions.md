---
id: kubernetes-api-versions
title: Kubernetes API versions
topic: kubernetes
summary: Which apiVersion to write for each kind, and the versions removed from 1.16 to 1.32. Kubernetes 1.37.
tool: kubernetes
version: "1.37"
checked: 2026-11-13
sources: [S1, S2]
license: MIT, written for this base from CC BY 4.0 sources
variant: files
---

# Kubernetes API versions

Contents: 1. Versions to write · 2. Removed versions · 3. Converting · 4. Kubernetes releases · Sources

## 1. apiVersion to write (Kubernetes 1.37)

| Kind | apiVersion |
| --- | --- |
| Deployment, DaemonSet, ReplicaSet, StatefulSet | `apps/v1` |
| Service, ConfigMap, Secret, Pod, PersistentVolumeClaim | `v1` |
| Job, CronJob | `batch/v1` |
| Ingress | `networking.k8s.io/v1` |
| HTTPRoute, Gateway, GatewayClass | `gateway.networking.k8s.io/v1` |
| HorizontalPodAutoscaler | `autoscaling/v2` |
| PodDisruptionBudget | `policy/v1` |
| CustomResourceDefinition | `apiextensions.k8s.io/v1` |
| Role, RoleBinding, ClusterRole | `rbac.authorization.k8s.io/v1` |

The cluster tells the versions it serves: `kubectl api-resources`. [S1]

## 2. Removed versions (Kubernetes deprecation guide)

| Removed in | Old version | Write instead |
| --- | --- | --- |
| 1.16 | Deployment, DaemonSet, ReplicaSet in `extensions/v1beta1`, `apps/v1beta1`, `apps/v1beta2` | `apps/v1` |
| 1.22 | Ingress in `extensions/v1beta1` and `networking.k8s.io/v1beta1` | `networking.k8s.io/v1` |
| 1.22 | CustomResourceDefinition and RBAC in `v1beta1` | `v1` |
| 1.25 | CronJob in `batch/v1beta1` | `batch/v1` |
| 1.25 | PodDisruptionBudget in `policy/v1beta1` | `policy/v1` |
| 1.25 | PodSecurityPolicy | Pod Security Admission |
| 1.25, 1.26 | HorizontalPodAutoscaler in `autoscaling/v2beta1`, `v2beta2` | `autoscaling/v2` |
| 1.32 | FlowSchema in `flowcontrol.apiserver.k8s.io/v1beta3` | `v1` |

Source: [S1]. A cluster refuses an object whose `apiVersion` was removed.

Wrong (Ingress before 1.22):

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
spec:
  rules:
    - http:
        paths:
          - path: /
            backend:
              serviceName: api
              servicePort: 80
```

Right:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: api
spec:
  rules:
    - http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: api
                port:
                  number: 80
```

## 3. Converting a file (kubectl convert)

`kubectl convert -f <file> --output-version <group>/<version>` converts a file. It is a plugin to install, and its result must be read again. [S1]

Without the plugin, rewrite the fields by hand with the right example above, then validate with kubeconform (`docs/kubernetes/validate-offline.md`).

## 4. Kubernetes releases

- Current minor version on 2026-11-12: 1.37. Maintained branches: 1.37, 1.36, 1.35, about one year of patches each. [S2]
- The cluster version is not in the repository. Read it in the `AGENTS.md` of the project, or ask the user.

## Sources

- [S1] Kubernetes, "Deprecated API Migration Guide", <https://kubernetes.io/docs/reference/using-api/deprecation-guide/>, read 2026-11-12, CC BY 4.0, summarized.
- [S2] Kubernetes, "Releases", <https://kubernetes.io/releases/>, read 2026-11-12, CC BY 4.0, summarized.
