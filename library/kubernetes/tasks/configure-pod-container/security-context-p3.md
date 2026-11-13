---
title: "Configure a Security Context for a Pod or Container (part 3 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/configure-pod-container/security-context.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Configure a Security Context for a Pod or Container (part 3 of 3)

## Discussion

The security context for a Pod applies to the Pod's Containers and also to
the Pod's Volumes when applicable. Specifically `fsGroup` and `seLinuxOptions` are
applied to Volumes as follows:

* `fsGroup`: Volumes that support ownership management are modified to be owned
  and writable by the GID specified in `fsGroup`. See the
  Ownership Management design document
  for more details.

* `seLinuxOptions`: Volumes that support SELinux labeling are relabeled to be accessible
  by the label specified under `seLinuxOptions`. Usually you only
  need to set the `level` section. This sets the
  Multi-Category Security (MCS)
  label given to all Containers in the Pod as well as the Volumes.

**Warning:**
After you specify an MCS label for a Pod, all Pods with the same label can access the Volume.
If you need inter-Pod protection, you must assign a unique MCS label to each Pod.

## Clean up

Delete the Pod:

```shell
kubectl delete pod security-context-demo
kubectl delete pod security-context-demo-2
kubectl delete pod security-context-demo-3
kubectl delete pod security-context-demo-4
```

## What's next

* PodSecurityContext
* SecurityContext
* CRI Plugin Config Guide
* Security Contexts design document
* Ownership Management design document
* PodSecurity Admission
* AllowPrivilegeEscalation design
  document
* For more information about security mechanisms in Linux, see
  Overview of Linux Kernel Security Features
  (Note: Some information is out of date)
* Read about User Namespaces
  for Linux pods.
* Masked Paths in the OCI Runtime
  Specification
