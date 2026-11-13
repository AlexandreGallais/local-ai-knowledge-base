---
title: "Using RBAC Authorization (part 1 of 5)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/access-authn-authz/rbac.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

Role-based access control (RBAC) is a method of regulating access to computer or
network resources based on the roles of individual users within your organization.

RBAC authorization uses the `rbac.authorization.k8s.io`
API group to drive authorization
decisions, allowing you to dynamically configure policies through the Kubernetes API.

To enable RBAC, start the API server
with the `--authorization-config` flag set to a file that includes the `RBAC` authorizer; for example:

```yaml
apiVersion: apiserver.config.k8s.io/v1
kind: AuthorizationConfiguration
authorizers:
  ...
  - type: RBAC
  ...
```

Or, start the API server with
the `--authorization-mode` flag set to a comma-separated list that includes `RBAC`;
for example:
```shell
kube-apiserver --authorization-mode=...,RBAC --other-options --more-options
```
