---
id: kubernetes-ingress-gateway
title: Ingress and Gateway API
topic: kubernetes
summary: Ingress v1 fields, the end of Ingress NGINX, and a Gateway API HTTPRoute; ask what the cluster uses. Kubernetes 1.37.
tool: kubernetes
version: "1.37"
checked: 2026-11-13
sources: [S1, S2, S3]
license: MIT, written for this base from CC BY 4.0 sources
variant: files
---

# Ingress and Gateway API

Contents: 1. Which one · 2. Ingress v1 · 3. Gateway API · Sources

## 1. Which one to write (Ingress or Gateway API)

- Ingress NGINX, the controller, gets no release, no fix and no security update after March 2026. Existing installs keep running. [S2]
- Gateway API is the successor of Ingress. It has no Ingress kind: an Ingress is converted once. Its definitions and a controller are installed in the cluster in addition. [S3]
- The right choice depends on what the cluster has installed. Read it in the `AGENTS.md` of the project. If it is not there, ask the user before you write the file.

## 2. Ingress v1 (networking.k8s.io/v1)

- `pathType` is required: `Prefix`, `Exact` or `ImplementationSpecific`. [S1]
- The backend is `service.name` and `service.port.number`. The old `serviceName` and `servicePort` were removed in 1.22. [S1]

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: api
spec:
  rules:
    - host: api.example.internal
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: api
                port:
                  number: 80
```

## 3. Gateway API HTTPRoute (gateway.networking.k8s.io/v1)

The kinds: GatewayClass, Gateway (`gatewayClassName`, `listeners`), HTTPRoute (`parentRefs`, `hostnames`, `rules`, `backendRefs`). [S3]

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: api
spec:
  parentRefs:
    - name: main-gateway
  hostnames:
    - "api.example.internal"
  rules:
    - matches:
        - path:
            type: PathPrefix
            value: /
      backendRefs:
        - name: api
          port: 80
```

- `parentRefs` names a Gateway that the cluster team created. Ask for its name.
- An HTTPRoute does nothing in a cluster without the Gateway API definitions and a controller. [S3]
- kubeconform needs the schemas of these custom kinds in its local schema folder (`docs/kubernetes/validate-offline.md`).

## Sources

- [S1] Kubernetes, "Deprecated API Migration Guide", <https://kubernetes.io/docs/reference/using-api/deprecation-guide/>, read 2026-11-12, CC BY 4.0, summarized.
- [S2] Kubernetes, "Ingress NGINX Retirement: What You Need to Know", 2025-11-11, <https://www.kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/>, read 2026-11-12, CC BY 4.0, summarized.
- [S3] Kubernetes, "Gateway API", <https://kubernetes.io/docs/concepts/services-networking/gateway/>, read 2026-11-12, CC BY 4.0, adapted.
