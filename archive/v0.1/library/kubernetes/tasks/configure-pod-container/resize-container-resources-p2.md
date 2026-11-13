---
title: "Resize CPU and Memory Resources assigned to Containers (part 2 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/configure-pod-container/resize-container-resources.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Resize CPU and Memory Resources assigned to Containers (part 2 of 2)

## Clean up

Delete your namespace. This deletes all the Pods that you created for this task:

```shell
kubectl delete namespace qos-example
```

## What's next

### For application developers

* Assign Memory Resources to Containers and Pods

* Assign CPU Resources to Containers and Pods

* Assign Pod-level CPU and memory resources

### For cluster administrators

* Configure Default Memory Requests and Limits for a Namespace

* Configure Default CPU Requests and Limits for a Namespace

* Configure Minimum and Maximum Memory Constraints for a Namespace

* Configure Minimum and Maximum CPU Constraints for a Namespace

* Configure Memory and CPU Quotas for a Namespace
