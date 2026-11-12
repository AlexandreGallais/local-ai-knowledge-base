---
id: kubernetes-workload
title: Deployment and Service manifest
topic: kubernetes
summary: Deployment and Service right the first time, with labels, probes, resources and a restricted security context. Kubernetes 1.37.
tool: kubernetes
version: "1.37"
checked: 2026-11-13
sources: [S1, S2, S3, S4, S5, S6]
license: MIT, written for this base from CC BY 4.0 and Apache 2.0 sources
variant: files
---

# Deployment and Service manifest

Contents: 1. Good practices · 2. Deployment · 3. Service · 4. Security context · 5. Pitfalls · Sources

## 1. Good practices of a Kubernetes manifest

- Write the latest stable `apiVersion` of each kind (`docs/kubernetes/api-versions.md`). [S1]
- Write YAML, not JSON. Keep related objects in one file, separated by `---`. [S2]
- Label every object with `app.kubernetes.io/name` and the other `app.kubernetes.io/*` labels. [S2]
- Never run a bare Pod: a Pod without a controller is not rescheduled when its node fails. Use a Deployment. [S2]
- No `hostPort` and no `hostNetwork` without a real need. Write booleans as `true` or `false` only. [S2]
- Never use the image tag `latest`: write a version (KubeLinter `latest-tag`). [S6]

## 2. Deployment (apps/v1)

The selector is required and must equal the labels of the Pod template. [S1]

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
  labels:
    app.kubernetes.io/name: api
spec:
  replicas: 2
  selector:
    matchLabels:
      app.kubernetes.io/name: api
  template:
    metadata:
      labels:
        app.kubernetes.io/name: api
    spec:
      securityContext:
        runAsNonRoot: true
        seccompProfile:
          type: RuntimeDefault
      containers:
        - name: api
          image: registry.example.internal/api:1.4.0
          ports:
            - containerPort: 8080
          readinessProbe:
            httpGet:
              path: /healthz/ready
              port: 8080
          resources:
            requests:
              cpu: "500m"
              memory: "256Mi"
            limits:
              cpu: "1"
              memory: "256Mi"
          securityContext:
            allowPrivilegeEscalation: false
            readOnlyRootFilesystem: true
            capabilities:
              drop: ["ALL"]
```

The full template, with the three probes and the rollout strategy, is `templates/containers/deployment.yaml`. Probes: `docs/kubernetes/health-endpoints.md`. Resources: `docs/kubernetes/resources-realtime.md`.

## 3. Service (v1)

```yaml
apiVersion: v1
kind: Service
metadata:
  name: api
  labels:
    app.kubernetes.io/name: api
spec:
  selector:
    app.kubernetes.io/name: api
  ports:
    - port: 80
      targetPort: 8080
```

- The `selector` must equal the labels of the Pods. The `targetPort` must equal the `containerPort`. Otherwise the Service has no endpoints. [S4]
- Check: `kubectl get endpointslices -l kubernetes.io/service-name=api`. [S4]

## 4. Restricted security context (Pod Security Standards)

The "Restricted" profile asks for `runAsNonRoot: true`, `allowPrivilegeEscalation: false`, `seccompProfile` `RuntimeDefault` or `Localhost`, and every capability dropped. A `hostPath` volume is forbidden from the "Baseline" profile. [S5]

`runAsNonRoot` checks a numeric user: the image must set `USER` with a UID (`docs/containers/dotnet-images.md`).

`readOnlyRootFilesystem: true` answers the KubeLinter check `no-read-only-root-fs` [S6]. If the app writes files, mount an `emptyDir` volume on the folder it writes.

## 5. Pitfalls (Deployment and Service)

- Selector of the Deployment different from the Pod labels: the API refuses the object.
- Memory written `400m`: that is 0.4 byte. Write `400Mi`. [S3]
- A limit without a request: the request is set to the limit. [S3]
- `targetPort: 80` for a .NET 8 or later image: the app listens on 8080.

## Sources

- [S1] Kubernetes, "Deprecated API Migration Guide", <https://kubernetes.io/docs/reference/using-api/deprecation-guide/>, read 2026-11-12, CC BY 4.0, summarized.
- [S2] Kubernetes, "Kubernetes Configuration Good Practices", 2025-11-25, <https://kubernetes.io/blog/2025/11/25/configuration-good-practices/>, read 2026-11-12, CC BY 4.0, summarized.
- [S3] Kubernetes, "Resource Management for Pods and Containers", <https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/>, read 2026-11-12, CC BY 4.0, summarized.
- [S4] Kubernetes, "Debug Pods", <https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/>, read 2026-11-12, CC BY 4.0, summarized.
- [S5] Kubernetes, "Pod Security Standards", <https://kubernetes.io/docs/concepts/security/pod-security-standards/>, read 2026-11-12, CC BY 4.0, summarized.
- [S6] StackRox, Red Hat, "KubeLinter", README, <https://github.com/stackrox/kube-linter>, read 2026-11-12, Apache 2.0, summarized.
