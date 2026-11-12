---
id: kubernetes-registry-secret
title: Private registry and pull secret
topic: kubernetes
summary: Pull an image from a private registry with a dockerconfigjson Secret in the namespace of the Pod. Kubernetes 1.37.
tool: kubernetes
version: "1.37"
checked: 2026-11-13
sources: [S1, S2]
license: MIT, written for this base from CC BY 4.0 sources
variant: files
---

# Private registry and pull secret

Contents: 1. The Secret · 2. Using it · 3. Images without a registry · Sources

## 1. The pull Secret (kubernetes.io/dockerconfigjson)

- The Secret has the type `kubernetes.io/dockerconfigjson`. [S1]
- It is created by `kubectl create secret docker-registry <name> --docker-server=<registry> --docker-username=<user> --docker-password=<password>`, or from an existing configuration file of the engine. [S1]
- A password typed on the command line stays in the shell history. Prefer the file form, and never write a password in a manifest or in the repository.
- Never run these commands yourself: they change the cluster. Give them to the user.

## 2. Using the Secret in a Pod (imagePullSecrets)

```yaml
spec:
  template:
    spec:
      imagePullSecrets:
        - name: registry-pull
      containers:
        - name: api
          image: registry.example.internal/api:1.4.0
```

- The Secret must be in the same namespace as the Pod. Otherwise the Pod waits and its events show `FailedToRetrieveImagePullSecret`. [S1]
- Write the full image name with the registry, and a version tag.

## 3. Images without a registry (archive)

- The .NET SDK can write an image archive without a daemon (`docs/containers/dotnet-images.md`); load it with `docker load -i` or `podman load -i`. [S2]
- Put configuration values in a ConfigMap or in environment variables of the Deployment, never in the image. Keep one file per environment or one Kustomize overlay (`docs/kubernetes/helm-kustomize.md`).

## Sources

- [S1] Kubernetes, "Pull an Image from a Private Registry", <https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry>, read 2026-11-12, CC BY 4.0, summarized.
- [S2] Microsoft, "Containerize a .NET app with dotnet publish", <https://learn.microsoft.com/dotnet/core/containers/sdk-publish>, read 2026-11-12, CC BY 4.0, summarized.
