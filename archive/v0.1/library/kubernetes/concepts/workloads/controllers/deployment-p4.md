---
title: "Deployments (part 4 of 5)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/workloads/controllers/deployment.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Deployments (part 4 of 5)

## Pausing and Resuming a rollout of a Deployment {#pausing-and-resuming-a-deployment}

When you update a Deployment, or plan to, you can pause rollouts
for that Deployment before you trigger one or more updates. When
you're ready to apply those changes, you resume rollouts for the
Deployment. This approach allows you to
apply multiple fixes in between pausing and resuming without triggering unnecessary rollouts.

* For example, with a Deployment that was created:

  Get the Deployment details:
  ```shell
  kubectl get deploy
  ```
  The output is similar to this:
  ```
  NAME      DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
  nginx     3         3         3            3           1m
  ```
  Get the rollout status:
  ```shell
  kubectl get rs
  ```
  The output is similar to this:
  ```
  NAME               DESIRED   CURRENT   READY     AGE
  nginx-2142116321   3         3         3         1m
  ```

* Pause by running the following command:
  ```shell
  kubectl rollout pause deployment/nginx-deployment
  ```

  The output is similar to this:
  ```
  deployment.apps/nginx-deployment paused
  ```

* Then update the image of the Deployment:
  ```shell
  kubectl set image deployment/nginx-deployment nginx=nginx:1.16.1
  ```

  The output is similar to this:
  ```
  deployment.apps/nginx-deployment image updated
  ```

* Notice that no new rollout started:
  ```shell
  kubectl rollout history deployment/nginx-deployment
  ```

  The output is similar to this:
  ```
  deployments "nginx"
  REVISION  CHANGE-CAUSE
  1   <none>
  ```
* Get the rollout status to verify that the existing ReplicaSet has not changed:
  ```shell
  kubectl get rs
  ```

  The output is similar to this:
  ```
  NAME               DESIRED   CURRENT   READY     AGE
  nginx-2142116321   3         3         3         2m
  ```

* You can make as many updates as you wish, for example, update the resources that will be used:
  ```shell
  kubectl set resources deployment/nginx-deployment -c=nginx --limits=cpu=200m,memory=512Mi
  ```

  The output is similar to this:
  ```
  deployment.apps/nginx-deployment resource requirements updated
  ```

  The initial state of the Deployment prior to pausing its rollout will continue its function, but new updates to
  the Deployment will not have any effect as long as the Deployment rollout is paused.

* Eventually, resume the Deployment rollout and observe a new ReplicaSet coming up with all the new updates:
  ```shell
  kubectl rollout resume deployment/nginx-deployment
  ```

  The output is similar to this:
  ```
  deployment.apps/nginx-deployment resumed
  ```
* Watch the status of the rollout until it's done.
  ```shell
  kubectl get rs --watch
  ```

  The output is similar to this:
  ```
  NAME               DESIRED   CURRENT   READY     AGE
  nginx-2142116321   2         2         2         2m
  nginx-3926361531   2         2         0         6s
  nginx-3926361531   2         2         1         18s
  nginx-2142116321   1         2         2         2m
  nginx-2142116321   1         2         2         2m
  nginx-3926361531   3         2         1         18s
  nginx-3926361531   3         2         1         18s
  nginx-2142116321   1         1         1         2m
  nginx-3926361531   3         3         1         18s
  nginx-3926361531   3         3         2         19s
  nginx-2142116321   0         1         1         2m
  nginx-2142116321   0         1         1         2m
  nginx-2142116321   0         0         0         2m
  nginx-3926361531   3         3         3         20s
  ```
* Get the status of the latest rollout:
  ```shell
  kubectl get rs
  ```

  The output is similar to this:
  ```
  NAME               DESIRED   CURRENT   READY     AGE
  nginx-2142116321   0         0         0         2m
  nginx-3926361531   3         3         3         28s
  ```
**Note:**
You cannot rollback a paused Deployment until you resume it.

## Deployment status

A Deployment enters various states during its lifecycle. It can be progressing while
rolling out a new ReplicaSet, it can be complete, or it can fail to progress.

### Progressing Deployment

Kubernetes marks a Deployment as _progressing_ when one of the following tasks is performed:

* The Deployment creates a new ReplicaSet.
* The Deployment is scaling up its newest ReplicaSet.
* The Deployment is scaling down its older ReplicaSet(s).
* New Pods become ready or available (ready for at least MinReadySeconds).

When the rollout becomes “progressing”, the Deployment controller adds a condition with the following
attributes to the Deployment's `.status.conditions`:

* `type: Progressing`
* `status: "True"`
* `reason: NewReplicaSetCreated` | `reason: FoundNewReplicaSet` | `reason: ReplicaSetUpdated`

You can monitor the progress for a Deployment by using `kubectl rollout status`.

### Complete Deployment

Kubernetes marks a Deployment as _complete_ when it has the following characteristics:

* All of the replicas associated with the Deployment have been updated to the latest version you've specified, meaning any
updates you've requested have been completed.
* All of the replicas associated with the Deployment are available.
* No old replicas for the Deployment are running.

When the rollout becomes “complete”, the Deployment controller sets a condition with the following
attributes to the Deployment's `.status.conditions`:

* `type: Progressing`
* `status: "True"`
* `reason: NewReplicaSetAvailable`

This `Progressing` condition will retain a status value of `"True"` until a new rollout
is initiated. The condition holds even when availability of replicas changes (which
does instead affect the `Available` condition).

You can check if a Deployment has completed by using `kubectl rollout status`. If the rollout completed
successfully, `kubectl rollout status` returns a zero exit code.

```shell
kubectl rollout status deployment/nginx-deployment
```
The output is similar to this:
```
Waiting for rollout to finish: 2 of 3 updated replicas are available...
deployment "nginx-deployment" successfully rolled out
```
and the exit status from `kubectl rollout` is 0 (success):
```shell
echo $?
```
```
0
```

### Failed Deployment

Your Deployment may get stuck trying to deploy its newest ReplicaSet without ever completing. This can occur
due to some of the following factors:

* Insufficient quota
* Readiness probe failures
* Image pull errors
* Insufficient permissions
* Limit ranges
* Application runtime misconfiguration

One way you can detect this condition is to specify a deadline parameter in your Deployment spec:
(`.spec.progressDeadlineSeconds`). `.spec.progressDeadlineSeconds` denotes the
number of seconds the Deployment controller waits before indicating (in the Deployment status) that the
Deployment progress has stalled.

The following `kubectl` command sets the spec with `progressDeadlineSeconds` to make the controller report
lack of progress of a rollout for a Deployment after 10 minutes:

```shell
kubectl patch deployment/nginx-deployment -p '{"spec":{"progressDeadlineSeconds":600}}'
```
The output is similar to this:
```
deployment.apps/nginx-deployment patched
```
Once the deadline has been exceeded, the Deployment controller adds a DeploymentCondition with the following
attributes to the Deployment's `.status.conditions`:

* `type: Progressing`
* `status: "False"`
* `reason: ProgressDeadlineExceeded`

This condition can also fail early and is then set to status value of `"False"` due to reasons as `ReplicaSetCreateError`.
Also, the deadline is not taken into account anymore once the Deployment rollout completes.

See the Kubernetes API conventions for more information on status conditions.

**Note:**
Kubernetes takes no action on a stalled Deployment other than to report a status condition with
`reason: ProgressDeadlineExceeded`. Higher level orchestrators can take advantage of it and act accordingly, for
example, rollback the Deployment to its previous version.

**Note:**
If you pause a Deployment rollout, Kubernetes does not check progress against your specified deadline.
You can safely pause a Deployment rollout in the middle of a rollout and resume without triggering
the condition for exceeding the deadline.

You may experience transient errors with your Deployments, either due to a low timeout that you have set or
due to any other kind of error that can be treated as transient. For example, let's suppose you have
insufficient quota. If you describe the Deployment you will notice the following section:

```shell
kubectl describe deployment nginx-deployment
```
The output is similar to this:
```
<...>
Conditions:
  Type            Status  Reason
  ----            ------  ------
  Available       True    MinimumReplicasAvailable
  Progressing     True    ReplicaSetUpdated
  ReplicaFailure  True    FailedCreate
<...>
```

If you run `kubectl get deployment nginx-deployment -o yaml`, the Deployment status is similar to this:

```
status:
  availableReplicas: 2
  conditions:
  - lastTransitionTime: 2016-10-04T12:25:39Z
    lastUpdateTime: 2016-10-04T12:25:39Z
    message: Replica set "nginx-deployment-4262182780" is progressing.
    reason: ReplicaSetUpdated
    status: "True"
    type: Progressing
  - lastTransitionTime: 2016-10-04T12:25:42Z
    lastUpdateTime: 2016-10-04T12:25:42Z
    message: Deployment has minimum availability.
    reason: MinimumReplicasAvailable
    status: "True"
    type: Available
  - lastTransitionTime: 2016-10-04T12:25:39Z
    lastUpdateTime: 2016-10-04T12:25:39Z
    message: 'Error creating: pods "nginx-deployment-4262182780-" is forbidden: exceeded quota:
      object-counts, requested: pods=1, used: pods=3, limited: pods=2'
    reason: FailedCreate
    status: "True"
    type: ReplicaFailure
  observedGeneration: 3
  replicas: 2
  unavailableReplicas: 2
```

Eventually, once the Deployment progress deadline is exceeded, Kubernetes updates the status and the
reason for the Progressing condition:

```
Conditions:
  Type            Status  Reason
  ----            ------  ------
  Available       True    MinimumReplicasAvailable
  Progressing     False   ProgressDeadlineExceeded
  ReplicaFailure  True    FailedCreate
```

You can address an issue of insufficient quota by scaling down your Deployment, by scaling down other
controllers you may be running, or by increasing quota in your namespace. If you satisfy the quota
conditions and the Deployment controller then completes the Deployment rollout, you'll see the
Deployment's status update with a successful condition (`status: "True"` and `reason: NewReplicaSetAvailable`).

```
Conditions:
  Type          Status  Reason
  ----          ------  ------
  Available     True    MinimumReplicasAvailable
  Progressing   True    NewReplicaSetAvailable
```

`type: Available` with `status: "True"` means that your Deployment has minimum availability. Minimum availability is dictated
by the parameters specified in the deployment strategy. `type: Progressing` with `status: "True"` means that your Deployment
is either in the middle of a rollout and it is progressing or that it has successfully completed its progress and the minimum
required new replicas are available (see the Reason of the condition for the particulars - in our case
`reason: NewReplicaSetAvailable` means that the Deployment is complete).

You can check if a Deployment has failed to progress by using `kubectl rollout status`. `kubectl rollout status`
returns a non-zero exit code if the Deployment has exceeded the progression deadline.

```shell
kubectl rollout status deployment/nginx-deployment
```
The output is similar to this:
```
Waiting for rollout to finish: 2 out of 3 new replicas have been updated...
error: deployment "nginx" exceeded its progress deadline
```
and the exit status from `kubectl rollout` is 1 (indicating an error):
```shell
echo $?
```
```
1
```

### Operating on a failed deployment

All actions that apply to a complete Deployment also apply to a failed Deployment. You can scale it up/down, roll back
to a previous revision, or even pause it if you need to apply multiple tweaks in the Deployment Pod template.

## Clean up Policy

You can set `.spec.revisionHistoryLimit` field in a Deployment to specify how many old ReplicaSets for
this Deployment you want to retain. The rest will be garbage-collected in the background. By default,
it is 10.

**Note:**
Explicitly setting this field to 0, will result in cleaning up all the history of your Deployment
thus that Deployment will not be able to roll back.

The cleanup only starts **after** a Deployment reaches a
complete state.
If you set `.spec.revisionHistoryLimit` to 0, any rollout nonetheless triggers creation of a new
ReplicaSet before Kubernetes removes the old one.

Even with a non-zero revision history limit, you can have more ReplicaSets than the limit
you configure. For example, if pods are crash looping, and there are multiple rolling updates
events triggered over time, you might end up with more ReplicaSets than the
`.spec.revisionHistoryLimit` because the Deployment never reaches a complete state.

## Canary deployments

If you want to roll out releases to a subset of users or servers using the Deployment, you
can create multiple Deployments, one for each release, following the canary pattern described in
managing resources.

To learn what's involved, follow the Deploy a Release Using a Canary Deployment tutorial.
