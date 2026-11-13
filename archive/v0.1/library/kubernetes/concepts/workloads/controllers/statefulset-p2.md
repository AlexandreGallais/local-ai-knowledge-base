---
title: "StatefulSets (part 2 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/workloads/controllers/statefulset.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# StatefulSets (part 2 of 2)

## Rolling Updates

When a StatefulSet's `.spec.updateStrategy.type` is set to `RollingUpdate`, the
StatefulSet controller will delete and recreate each Pod in the StatefulSet. It will proceed
in the same order as Pod termination (from the largest ordinal to the smallest), updating
each Pod one at a time.

The Kubernetes control plane waits until an updated Pod is Running and Ready prior
to updating its predecessor. If you have set `.spec.minReadySeconds` (see
Minimum Ready Seconds), the control plane additionally waits that
amount of time after the Pod turns ready, before moving on.

### Partitioned rolling updates {#partitions}

The `RollingUpdate` update strategy can be partitioned, by specifying a
`.spec.updateStrategy.rollingUpdate.partition`. If a partition is specified, all Pods with an
ordinal that is greater than or equal to the partition will be updated when the StatefulSet's
`.spec.template` is updated. All Pods with an ordinal that is less than the partition will not
be updated, and, even if they are deleted, they will be recreated at the previous version. If a
StatefulSet's `.spec.updateStrategy.rollingUpdate.partition` is greater than its `.spec.replicas`,
updates to its `.spec.template` will not be propagated to its Pods.
In most cases you will not need to use a partition, but they are useful if you want to stage an
update, roll out a canary, or perform a phased roll out.

### Maximum unavailable Pods

**Feature state:**

You can control the maximum number of Pods that can be unavailable during an update
by specifying the `.spec.updateStrategy.rollingUpdate.maxUnavailable` field.
The value can be an absolute number (for example, `5`) or a percentage of desired
Pods (for example, `10%`). Absolute number is calculated from the percentage value
by rounding it up. This field cannot be 0. The default setting is 1.

This field applies to all Pods in the range `0` to `replicas - 1`. If there is any
unavailable Pod in the range `0` to `replicas - 1`, it will be counted towards
`maxUnavailable`.

### Forced rollback

When using Rolling Updates with the default
Pod Management Policy (`OrderedReady`),
it's possible to get into a broken state that requires manual intervention to repair.

If you update the Pod template to a configuration that never becomes Running and
Ready (for example, due to a bad binary or application-level configuration error),
StatefulSet will stop the rollout and wait.

In this state, it's not enough to revert the Pod template to a good configuration.
Due to a known issue,
StatefulSet will continue to wait for the broken Pod to become Ready
(which never happens) before it will attempt to revert it back to the working
configuration.

After reverting the template, you must also delete any Pods that StatefulSet had
already attempted to run with the bad configuration.
StatefulSet will then begin to recreate the Pods using the reverted template.

## Recreate

**Feature state:**

When a StatefulSet's `.spec.updateStrategy.type` is set to `Recreate`, the StatefulSet
controller deletes all of the StatefulSet's Pods at once and waits for them to terminate
completely before creating any new Pods from the updated `.spec.template`. Unlike
`RollingUpdate`, the old and new revisions of a Pod are never running at
the same time, so this strategy incurs downtime for the duration of the update. This mirrors
the `Recreate` strategy of Deployments and is useful for applications that cannot run two
versions concurrently, such as workloads that require exclusive access to a shared resource
or that use an on-disk format that is incompatible between versions.

The deletion always removes every Pod together, regardless of the
Pod Management Policy. Once all Pods have terminated, the new
Pods are created according to that policy: with `OrderedReady` (the default) the Pods are
recreated one at a time, in ascending ordinal order, waiting for each to become Running and
Ready before creating the next; with `Parallel` all of the Pods are recreated at once.

Because this is an alpha feature, you must enable the `StatefulSetRecreateStrategy`
feature gate
on the kube-controller-manager and the kube-apiserver to use this strategy.

## Revision history

ControllerRevision is a Kubernetes API resource used by controllers, such as the StatefulSet controller, to track historical configuration changes.

StatefulSets use ControllerRevisions to maintain a revision history, enabling rollbacks and version tracking.

### How StatefulSets track changes using ControllerRevisions

When you update a StatefulSet's Pod template (`spec.template`), the StatefulSet controller:

1. Prepares a new ControllerRevision object
2. Stores a snapshot of the Pod template and metadata
3. Assigns an incremental revision number

#### Key <example-value>

See ControllerRevision to learn more about key <example-value> and other details.

---

### Managing Revision History

Control retained revisions with `.spec.revisionHistoryLimit`:

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: webapp
spec:
  revisionHistoryLimit: 5  # Keep last 5 revisions
  # ... other spec fields ...
```

* **Default**: 10 revisions retained if unspecified
* **Cleanup**: Oldest revisions are garbage-collected when exceeding the limit

#### Performing Rollbacks

You can revert to a previous configuration using:

```bash
# View revision history
kubectl rollout history statefulset/webapp

# Rollback to a specific revision
kubectl rollout undo statefulset/webapp --to-revision=3
```

This will:

* Apply the Pod template from revision 3
* Create a new ControllerRevision with an updated revision number

#### Inspecting ControllerRevisions

To view associated ControllerRevisions:

```bash
# List all revisions for the StatefulSet
kubectl get controllerrevisions -l app.kubernetes.io/name=webapp

# View detailed configuration of a specific revision
kubectl get controllerrevision/webapp-3 -o yaml
```

#### Best Practices

##### Retention Policy

- Set `revisionHistoryLimit` between **5–10** for most workloads.
- Increase only if **deep rollback history** is required.

##### Monitoring

* Regularly check revisions with:

  ```bash
  kubectl get controllerrevisions
  ```

- Alert on **rapid revision count growth**.

##### Avoid

* Manual edits to ControllerRevision objects.
* Using revisions as a backup mechanism (use actual backup tools).
* Setting `revisionHistoryLimit: 0` (disables rollback capability).

## PersistentVolumeClaim retention

**Feature state:**

The optional `.spec.persistentVolumeClaimRetentionPolicy` field controls if
and how PVCs are deleted during the lifecycle of a StatefulSet. You must enable the
`StatefulSetAutoDeletePVC` feature gate
on the API server and the controller manager to use this field.
Once enabled, there are two policies you can configure for each StatefulSet:

`whenDeleted`
: Configures the volume retention behavior that applies when the StatefulSet is deleted.

`whenScaled`
: Configures the volume retention behavior that applies when the replica count of
  the StatefulSet   is reduced; for example, when scaling down the set.

For each policy that you can configure, you can set the value to either `Delete` or `Retain`.

`Delete`
: The PVCs created from the StatefulSet `volumeClaimTemplate` are deleted for each Pod
  affected by the policy. With the `whenDeleted` policy all PVCs from the
  `volumeClaimTemplate` are deleted after their Pods have been deleted. With the
  `whenScaled` policy, only PVCs corresponding to Pod replicas being scaled down are
  deleted, after their Pods have been deleted.

`Retain` (default)
: PVCs from the `volumeClaimTemplate` are not affected when their Pod is
  deleted. This is the behavior before this new feature.

Bear in mind that these policies **only** apply when Pods are being removed due to the
StatefulSet being deleted or scaled down. For example, if a Pod associated with a StatefulSet
fails due to node failure, and the control plane creates a replacement Pod, the StatefulSet
retains the existing PVC.  The existing volume is unaffected, and the cluster will attach it to
the node where the new Pod is about to launch.

The default for policies is `Retain`, matching the StatefulSet behavior before this new feature.

Here is an example policy:

```yaml
apiVersion: apps/v1
kind: StatefulSet
...
spec:
  persistentVolumeClaimRetentionPolicy:
    whenDeleted: Retain
    whenScaled: Delete
...
```

The StatefulSet controller adds
owner references
to its PVCs, which are then deleted by the garbage collector after the Pod is terminated. This enables the Pod to
cleanly unmount all volumes before the PVCs are deleted (and before the backing PV and
volume are deleted, depending on the retain policy).  When you set the `whenDeleted`
policy to `Delete`, an owner reference to the StatefulSet instance is placed on all PVCs
associated with that StatefulSet.

The `whenScaled` policy must delete PVCs only when a Pod is scaled down, and not when a
Pod is deleted for another reason. When reconciling, the StatefulSet controller compares
its desired replica count to the actual Pods present on the cluster. Any StatefulSet Pod
whose id greater than the replica count is condemned and marked for deletion. If the
`whenScaled` policy is `Delete`, the condemned Pods are first set as owners to the
associated StatefulSet template PVCs, before the Pod is deleted. This causes the PVCs
to be garbage collected after only the condemned Pods have terminated.

This means that if the controller crashes and restarts, no Pod will be deleted before its
owner reference has been updated appropriate to the policy. If a condemned Pod is
force-deleted while the controller is down, the owner reference may or may not have been
set up, depending on when the controller crashed. It may take several reconcile loops to
update the owner references, so some condemned Pods may have set up owner references and
others may not. For this reason we recommend waiting for the controller to come back up,
which will verify owner references before terminating Pods. If that is not possible, the
operator should verify the owner references on PVCs to ensure the expected objects are
deleted when Pods are force-deleted.

### Replicas

`.spec.replicas` is an optional field that specifies the number of desired Pods. It defaults to 1.

Should you manually scale a StatefulSet, via `kubectl scale
statefulset statefulset --replicas=X`, and then you update that StatefulSet
based on a manifest (for example: by running `kubectl apply -f
statefulset.yaml`), then applying that manifest overwrites the manual scaling
that you previously did.

If a HorizontalPodAutoscaler
(or any similar API for horizontal scaling) is managing scaling for a
Statefulset, don't set `.spec.replicas`. Instead, allow the Kubernetes
control plane to manage
the `.spec.replicas` field automatically.

## What's next

* Learn about Pods.
* Find out how to use StatefulSets
  * Follow an example of deploying a stateful application.
  * Follow an example of deploying Cassandra with Stateful Sets.
  * Follow an example of running a replicated stateful application.
  * Learn how to scale a StatefulSet.
  * Learn what's involved when you delete a StatefulSet.
  * Learn how to configure a Pod to use a volume for storage.
  * Learn how to configure a Pod to use a PersistentVolume for storage.
* `StatefulSet` is a top-level resource in the Kubernetes REST API.
  Read the
  object definition to understand the API for stateful sets.
* Read about PodDisruptionBudget and how
  you can use it to manage application availability during disruptions.
