# kubernetes index

One line per document. Open only the documents your task needs.

- [Deployment and Service manifest](docs/kubernetes/workload.md): Deployment and Service right the first time, with labels, probes, resources and a restricted security context. Kubernetes 1.37.
- [Kubernetes API versions](docs/kubernetes/api-versions.md): Which apiVersion to write for each kind, and the versions removed from 1.16 to 1.32. Kubernetes 1.37.
- [Ingress and Gateway API](docs/kubernetes/ingress-gateway.md): Ingress v1 fields, the end of Ingress NGINX, and a Gateway API HTTPRoute; ask what the cluster uses. Kubernetes 1.37.
- [Private registry and pull secret](docs/kubernetes/registry-secret.md): Pull an image from a private registry with a dockerconfigjson Secret in the namespace of the Pod. Kubernetes 1.37.
- [StatefulSet](docs/kubernetes/statefulset.md): When to write a StatefulSet, its headless Service and volume claim templates, and stopping it in order. Kubernetes 1.37.
- [Resources, exclusive cores and .NET memory](docs/kubernetes/resources-realtime.md): Requests, limits and units, exclusive CPU cores for latency, and the .NET garbage collector in a container. Kubernetes 1.37.
- [Rolling update and rollback](docs/kubernetes/rollout.md): Update a Deployment without downtime, follow the rollout, and go back to a previous revision. Kubernetes 1.37.
- [Validate manifests without a cluster](docs/kubernetes/validate-offline.md): Validate manifests without a cluster with kubeconform, KubeLinter, helm lint and kustomize, and what each one misses.
- [Helm charts and Kustomize overlays](docs/kubernetes/helm-kustomize.md): When a chart or an overlay, and the commands to render and check each one without a cluster. Helm 4.
- [Debug a Pod that does not run](docs/kubernetes/debug-pods.md): Read the state and events of a Pod, then match the symptom with its cause and its fix. Kubernetes 1.37.
- [ASP.NET Core health endpoints and probes](docs/kubernetes/health-endpoints.md): Health check endpoints in ASP.NET Core and the startup, liveness and readiness probes that call them. .NET 10.
