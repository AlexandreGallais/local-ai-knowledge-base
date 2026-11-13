---
id: kubernetes-rollout
title: Rolling update and rollback
topic: kubernetes
summary: Update a Deployment without downtime, follow the rollout, and go back to a previous revision. Kubernetes 1.37.
tool: kubernetes
version: "1.37"
checked: 2026-11-13
sources: [S1, S2]
license: MIT, written for this base from CC BY 4.0 sources
variant: files
---

# Rolling update and rollback

Contents: 1. Strategy · 2. Commands · 3. Pitfalls · Sources

## 1. Rollout strategy (Deployment strategy)

- `RollingUpdate` is the default. `maxUnavailable` and `maxSurge` take a number or a percentage, 25 % each by default. [S1]
- `Recreate` stops every Pod before it creates the new ones: there is a downtime. [S1]
- A Pod whose readiness probe fails gets no traffic: a rolling update waits for the new Pods to be ready. [S2]

For a service with few replicas, keep every old Pod until a new one is ready:

```yaml
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 0
      maxSurge: 1
```

## 2. Rollout commands (kubectl rollout)

| Need | Command |
| --- | --- |
| Follow the rollout | `kubectl rollout status deployment/<name>` |
| Pause, then resume | `kubectl rollout pause deployment/<name>`, `kubectl rollout resume deployment/<name>` |
| See the revisions | `kubectl rollout history deployment/<name>` |
| Go back one revision | `kubectl rollout undo deployment/<name>` |
| Go back to a revision | `kubectl rollout undo deployment/<name> --to-revision=<n>` |

Source: [S1]. These commands change the cluster, except `status` and `history`: give them to the user; never run them yourself.

## 3. Pitfalls (rolling update)

- The new Pods never get ready: the condition `Progressing` turns `False` after 600 seconds. Read `kubectl describe deployment <name>`. [S1]
- No readiness probe: Pods get traffic before the app is ready, and a rolling update cuts requests. [S2]
- The image tag does not change (`latest`): nothing rolls out. Always change the version tag.

## Sources

- [S1] Kubernetes, "Update a Deployment Without Downtime", <https://kubernetes.io/docs/tasks/run-application/update-deployment-rolling/>, read 2026-11-12, CC BY 4.0, summarized.
- [S2] Kubernetes, "Liveness, Readiness, and Startup Probes", <https://kubernetes.io/docs/concepts/workloads/pods/probes/>, read 2026-11-12, CC BY 4.0, summarized.
