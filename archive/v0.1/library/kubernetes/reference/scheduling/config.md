---
title: "Scheduler Configuration (part 1 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/scheduling/config.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Scheduler Configuration

**Feature state:** v1.25 [stable]

You can customize the behavior of the `kube-scheduler` by writing a configuration
file and passing its path as a command line argument.

A scheduling Profile allows you to configure the different stages of scheduling
in the kube-scheduler.
Each stage is exposed in an extension point. Plugins provide scheduling behaviors
by implementing one or more of these extension points.

You can specify scheduling profiles by running `kube-scheduler --config <filename>`,
using the
KubeSchedulerConfiguration v1
struct.

A minimal configuration looks as follows:

```yaml
apiVersion: kubescheduler.config.k8s.io/v1
kind: KubeSchedulerConfiguration
clientConnection:
  kubeconfig: /etc/srv/kubernetes/kube-scheduler/kubeconfig
```

**Note:**
KubeSchedulerConfiguration v1beta3 is deprecated in v1.26 and is removed in v1.29.
Please migrate KubeSchedulerConfiguration to v1.
