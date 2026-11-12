---
id: kubernetes-debug-pods
title: Debug a Pod that does not run
topic: kubernetes
summary: Read the state and events of a Pod, then match the symptom with its cause and its fix. Kubernetes 1.37.
tool: kubernetes
version: "1.37"
checked: 2026-11-13
sources: [S1, S2, S3, S4]
license: MIT, written for this base from CC BY 4.0 sources
variant: files
---

# Debug a Pod that does not run

Contents: 1. Read first · 2. Symptoms · Sources

## 1. Read the Pod first (kubectl describe)

1. Ask for the output of `kubectl describe pod <name>`, or run it if you have access. These commands only read.
2. Read the state, the last termination reason and exit code, and the events at the end. [S1] [S2]
3. Match them with the table below. Give the cause, then the smallest fix.
4. Never change the cluster yourself: give the user the command or the manifest change.

## 2. Symptoms, causes and fixes (Kubernetes Pods)

| Symptom | Likely cause | Command or fix |
| --- | --- | --- |
| `Pending`, event `FailedScheduling` | Requests larger than the free room | Lower the requests [S1] [S2] |
| Waiting, image not pulled | Wrong image name, image not pushed, pull Secret not found (`FailedToRetrieveImagePullSecret`) | Check the name and the namespace of the Secret [S2] [S3] |
| `OOMKilled`, exit code 137, restarts | Memory limit passed | Find a leak, or raise the limit [S1] |
| Slow, never stopped | CPU limit reached: throttled, not killed | Raise the CPU limit [S1] |
| Service without endpoints | Wrong selector or port | `kubectl get endpointslices -l kubernetes.io/service-name=<service>` [S2] |
| A field ignored in silence | Misspelled key | `kubectl apply --validate --dry-run=server -f <file>`; kubeconform `-strict` [S2] |
| Rollout does not move | New Pods never ready | Condition `Progressing` `False` after 600 s; `kubectl describe deployment <name>` [S4] |
| Object refused: unknown version | `apiVersion` removed | `docs/kubernetes/api-versions.md` |

## Sources

- [S1] Kubernetes, "Resource Management for Pods and Containers", <https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/>, read 2026-11-12, CC BY 4.0, summarized.
- [S2] Kubernetes, "Debug Pods", <https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/>, read 2026-11-12, CC BY 4.0, summarized.
- [S3] Kubernetes, "Pull an Image from a Private Registry", <https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry>, read 2026-11-12, CC BY 4.0, summarized.
- [S4] Kubernetes, "Update a Deployment Without Downtime", <https://kubernetes.io/docs/tasks/run-application/update-deployment-rolling/>, read 2026-11-12, CC BY 4.0, summarized.
