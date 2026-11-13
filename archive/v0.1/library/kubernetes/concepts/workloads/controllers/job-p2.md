---
title: "Jobs (part 2 of 6)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/workloads/controllers/job.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Jobs (part 2 of 6)

## Integrate with Workload APIs

**Feature state:**

When the `WorkloadWithJob`
feature gate is enabled, the Job controller compiles a Job's `.spec.scheduling`
configuration into Workload and
PodGroup objects (`scheduling.k8s.io/v1beta1`)
before it creates any Pods. This lets you express explicit scheduling intent for a Job,
such as gang scheduling (all Pods
scheduled together or none), topology co-location, and disruption behavior.

When you omit `.spec.scheduling`, the Job defaults to the `Basic` scheduling
policy, which preserves the standard pod-by-pod scheduling outcome of an ordinary
Job. The controller still creates a `Workload` and `PodGroup` for every
eligible Job (including `Basic` ones), so the observable objects are consistent
regardless of the policy.

### Scheduling configuration

The `.spec.scheduling` field accepts the following fields:

- `schedulingPolicy`: exactly one of `basic` or `gang` must be specified. With `gang`,
  all Pods must be schedulable together before any of them are bound. An omitted
  `gang.minCount` defaults to the Job's `.spec.parallelism`. See
  PodGroup scheduling policies.
- `schedulingConstraints`:
  topology
  co-location constraints for the Job's Pods.
- `disruptionMode`: whether the Pods are disrupted individually (`single`) or as a
  group (`all`). See
  disruption and priority.
- `resourceClaims`: dynamic resource claims shared across the Job's Pods.

All `.spec.scheduling` fields are immutable after the Job is created, except for
`schedulingPolicy.gang.minCount`, which you can change to
scale a gang elastically.

### Gang scheduling

The following Job requests gang scheduling for its 8 Pods, co-located within a
single zone, and disrupted together:

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: distributed-training
  namespace: training
spec:
  parallelism: 8
  completions: 8
  completionMode: Indexed
  scheduling:
    schedulingPolicy:
      gang: {}                # minCount omitted -> defaults to parallelism (8)
    schedulingConstraints:
      key:
      - level: topology.kubernetes.io/zone
    disruptionMode:
      all: {}                 # the entire group is disrupted together
  template:
    spec:
      restartPolicy: Never
      containers:
      - name: trainer
        image: training-image:latest
        resources:
          limits:
            nvidia.com/gpu: 1
```

When the Job controller processes this Job, it:

1. Creates a Workload object in the same
   namespace, containing a `podGroupTemplate` compiled from `.spec.scheduling`
   (here, a gang policy with
   `minCount: 8`).
1. Creates a PodGroup object from that template. The PodGroup is the runtime
   scheduling unit and carries an inline copy of the policy.
1. Creates Pods with `.spec.schedulingGroup.podGroupName` set to the PodGroup's
   name, linking each Pod to its scheduling group.

The controller discovers these objects through spec references
(`Workload.spec.controllerRef` and `PodGroup.spec.workloadRef`), not by
name. Objects the controller creates carry an `ownerReferences` entry pointing to
the Job, so they are garbage collected when the Job is deleted.

### Default (Basic) scheduling

A Job that omits `.spec.scheduling` defaults to `Basic`, which acts as an implicit
opt-out of gang scheduling. Its Pods schedule the same way as an ordinary Job,
while a `Basic` `Workload` and `PodGroup` are still created:

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: batch-processor
  namespace: batch
spec:
  parallelism: 10
  completions: 10
  # .spec.scheduling omitted -> defaults to Basic scheduling.
  template:
    spec:
      restartPolicy: Never
      containers:
      - name: processor
        image: processor-image:v1
```

### Higher-level controllers

For a standalone Job, the Job controller owns both the `Workload` and the
`PodGroup`. When a Job instead carries an `ownerReference` to a parent controller
that compiles the `Workload` (for example, `JobSet`), the Job controller defers
`Workload` ownership to that parent. Whether the Job controller still creates the
runtime `PodGroup` depends on what the parent delegates:

- If the parent sets the `scheduling.k8s.io/group-template-name` annotation on the
  Job, the Job controller creates and owns the `PodGroup`, mapped to the parent's
  named `PodGroupTemplate`.
- Otherwise, the parent owns both objects and the Job controller creates neither;
  it discovers the existing objects and uses them when creating Pods.

If a Job's Pod template already has `.spec.template.spec.schedulingGroup` set, the
Job controller creates neither object, letting you (or a higher-level controller)
manage the `Workload`/`PodGroup` lifecycle yourself.

### CronJob behavior

Jobs created by a `CronJob` are standalone; the `CronJob` does not create or manage
`Workload` objects. If a `CronJob`'s `jobTemplate` sets `.spec.scheduling`, the Job
controller creates a separate `Workload` and `PodGroup` for each Job instance,
compiled from that Job's `.spec.scheduling` (defaulting to `Basic` when omitted).
These objects are garbage collected when each Job completes or is deleted.

### Limitations for Alpha release {#workload-integration-limitations}

- Each Job maps to exactly one `PodGroup`; all Pods in the Job share a single
  scheduling policy.
- Only `schedulingPolicy.gang.minCount` is mutable; all other `.spec.scheduling`
  fields are immutable after creation.
- Suspended Jobs retain their `Workload` and `PodGroup` objects; they are not deleted
  on suspend or recreated on resume.
