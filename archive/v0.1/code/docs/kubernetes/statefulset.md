---
id: kubernetes-statefulset
title: StatefulSet
topic: kubernetes
summary: When to write a StatefulSet, its headless Service and volume claim templates, and stopping it in order. Kubernetes 1.37.
tool: kubernetes
version: "1.37"
checked: 2026-11-13
sources: [S1]
license: MIT, written for this base from CC BY 4.0 sources
variant: files
---

# StatefulSet

Contents: 1. When · 2. Manifest · 3. Pitfalls · Sources

## 1. When to write a StatefulSet

- Write a StatefulSet when each Pod needs a stable identity and its own stable storage: a database, a broker, a node of a cluster. [S1]
- For a stateless API or a front end, write a Deployment (`docs/kubernetes/workload.md`).

## 2. StatefulSet manifest (apps/v1)

- `serviceName` names a headless Service (`clusterIP: None`) that you create yourself. [S1]
- `volumeClaimTemplates` gives each Pod its own PersistentVolumeClaim. [S1]

```yaml
apiVersion: v1
kind: Service
metadata:
  name: store
spec:
  clusterIP: None
  selector:
    app.kubernetes.io/name: store
  ports:
    - port: 5432
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: store
spec:
  serviceName: store
  replicas: 1
  selector:
    matchLabels:
      app.kubernetes.io/name: store
  template:
    metadata:
      labels:
        app.kubernetes.io/name: store
    spec:
      containers:
        - name: store
          image: registry.example.internal/store:16.4
          volumeMounts:
            - name: data
              mountPath: /var/lib/data
  volumeClaimTemplates:
    - metadata:
        name: data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 10Gi
```

## 3. Pitfalls (StatefulSet)

- The volumes are not deleted with the StatefulSet: delete the claims on purpose, never by accident. [S1]
- An ordered rolling update can block on a Pod that never gets ready. [S1]
- To stop the Pods in order, scale to zero before you delete the object. [S1]
- Jobs and CronJobs (`batch/v1`) are for work that ends; their page was not read for this base: run `kubectl explain job.spec` on a cluster before you write one.

## Sources

- [S1] Kubernetes, "StatefulSets", <https://kubernetes.io/docs/concepts/workloads/controllers/statefulset>, read 2026-11-12, CC BY 4.0, summarized.
