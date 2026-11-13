---
title: "Jobs (part 4 of 6)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/workloads/controllers/job.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Jobs (part 4 of 6)

## Success policy {#success-policy}

When creating an Indexed Job, you can define when a Job can be declared as succeeded using a `.spec.successPolicy`,
based on the pods that succeeded.

By default, a Job succeeds when the number of succeeded Pods equals `.spec.completions`.
These are some situations where you might want additional control for declaring a Job succeeded:

* When running simulations with different parameters,
  you might not need all the simulations to succeed for the overall Job to be successful.
* When following a leader-worker pattern, only the success of the leader determines the success or
  failure of a Job. Examples of this are frameworks like MPI and PyTorch etc.

You can configure a success policy, in the `.spec.successPolicy` field,
to meet the above use cases. This policy can handle Job success based on the
succeeded pods. After the Job meets the success policy, the job controller terminates the lingering Pods.
A success policy is defined by rules. Each rule can take one of the following forms:

* When you specify the `succeededIndexes` only,
  once all indexes specified in the `succeededIndexes` succeed, the job controller marks the Job as succeeded.
  The `succeededIndexes` must be a list of intervals between 0 and `.spec.completions-1`.
* When you specify the `succeededCount` only,
  once the number of succeeded indexes reaches the `succeededCount`, the job controller marks the Job as succeeded.
* When you specify both `succeededIndexes` and `succeededCount`,
  once the number of succeeded indexes from the subset of indexes specified in the `succeededIndexes` reaches the `succeededCount`,
  the job controller marks the Job as succeeded.

Note that when you specify multiple rules in the `.spec.successPolicy.rules`,
the job controller evaluates the rules in order. Once the Job meets a rule, the job controller ignores remaining rules.

Here is a manifest for a Job with `successPolicy`:

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: job-success
spec:
  parallelism: 10
  completions: 10
  completionMode: Indexed # Required for the success policy
  successPolicy:
    rules:
      - succeededIndexes: 0,2-3
        succeededCount: 1
  template:
    spec:
      containers:
      - name: main
        image: python
        command:          # Provided that at least one of the Pods with 0, 2, and 3 indexes has succeeded,
                          # the overall Job is a success.
          - python3
          - -c
          - |
            import os, sys
            if os.environ.get("JOB_COMPLETION_INDEX") == "2":
              sys.exit(0)
            else:
              sys.exit(1)
      restartPolicy: Never
```

In the example above, both `succeededIndexes` and `succeededCount` have been specified.
Therefore, the job controller will mark the Job as succeeded and terminate the lingering Pods
when either of the specified indexes, 0, 2, or 3, succeed.
The Job that meets the success policy gets the `SuccessCriteriaMet` condition with a `SuccessPolicy` reason.
After the removal of the lingering Pods is issued, the Job gets the `Complete` condition.

Note that the `succeededIndexes` is represented as intervals separated by a hyphen.
The number are listed in represented by the first and last element of the series, separated by a hyphen.

**Note:**
When you specify both a success policy and some terminating policies such as `.spec.backoffLimit` and `.spec.podFailurePolicy`,
once the Job meets either policy, the job controller respects the terminating policy and ignores the success policy.

## Job termination and cleanup

When a Job completes, no more Pods are created, but the Pods are usually not deleted either.
Keeping them around allows you to still view the logs of completed pods to check for errors, warnings, or other diagnostic output.
The job object also remains after it is completed so that you can view its status. It is up to the user to delete
old jobs after noting their status. Delete the job with `kubectl` (e.g. `kubectl delete jobs/pi` or `kubectl delete -f ./job.yaml`).
When you delete the job using `kubectl`, all the pods it created are deleted too.

By default, a Job will run uninterrupted unless a Pod fails (`restartPolicy=Never`)
or a Container exits in error (`restartPolicy=OnFailure`), at which point the Job defers to the
`.spec.backoffLimit` described above. Once `.spec.backoffLimit` has been reached the Job will
be marked as failed and any running Pods will be terminated.

Another way to terminate a Job is by setting an active deadline.
Do this by setting the `.spec.activeDeadlineSeconds` field of the Job to a number of seconds.
The `activeDeadlineSeconds` applies to the duration of the job, no matter how many Pods are created.
Once a Job reaches `activeDeadlineSeconds`, all of its running Pods are terminated and the Job status
will become `type: Failed` with `reason: DeadlineExceeded`.

Note that a Job's `.spec.activeDeadlineSeconds` takes precedence over its `.spec.backoffLimit`.
Therefore, a Job that is retrying one or more failed Pods will not deploy additional Pods once
it reaches the time limit specified by `activeDeadlineSeconds`, even if the `backoffLimit` is not yet reached.

Example:

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: pi-with-timeout
spec:
  backoffLimit: 5
  activeDeadlineSeconds: 100
  template:
    spec:
      containers:
      - name: pi
        image: perl:5.34.0
        command: ["perl", "-Mbignum=bpi", "-wle", "print bpi(2000)"]
      restartPolicy: Never
```

Note that both the Job spec and the Pod template spec
within the Job have an `activeDeadlineSeconds` field. Ensure that you set this field at the proper level.

Keep in mind that the `restartPolicy` applies to the Pod, and not to the Job itself:
there is no automatic Job restart once the Job status is `type: Failed`.
That is, the Job termination mechanisms activated with `.spec.activeDeadlineSeconds`
and `.spec.backoffLimit` result in a permanent Job failure that requires manual intervention to resolve.

### Terminal Job conditions

A Job has two possible terminal states, each of which has a corresponding Job
condition:
* Succeeded:  Job condition `Complete`
* Failed: Job condition `Failed`

Jobs fail for the following reasons:
- The number of Pod failures exceeded the specified `.spec.backoffLimit` in the Job
  specification. For details, see Pod backoff failure policy.
- The Job runtime exceeded the specified `.spec.activeDeadlineSeconds`
- An indexed Job that used `.spec.backoffLimitPerIndex` has failed indexes.
  For details, see Backoff limit per index.
- The number of failed indexes in the Job exceeded the specified
  `spec.maxFailedIndexes`. For details, see Backoff limit per index
- A failed Pod matches a rule in `.spec.podFailurePolicy` that has the `FailJob`
   action. For details about how Pod failure policy rules might affect failure
   evaluation, see Pod failure policy.

Jobs succeed for the following reasons:
- The number of succeeded Pods reached the specified `.spec.completions`
- The criteria specified in `.spec.successPolicy` are met. For details, see
  Success policy.

In Kubernetes v1.31 and later the Job controller delays the addition of the
terminal conditions,`Failed` or `Complete`, until all of the Job Pods are terminated.

In Kubernetes v1.30 and earlier, the Job controller added the `Complete` or the
`Failed` Job terminal conditions as soon as the Job termination process was
triggered and all Pod finalizers were removed. However, some Pods would still
be running or terminating at the moment that the terminal condition was added.

In Kubernetes v1.31 and later, the controller only adds the Job terminal conditions
_after_ all of the Pods are terminated. You can control this behavior by using the
`JobManagedBy` and the `JobPodReplacementPolicy` (both enabled by default)
feature gates.

### Termination of Job pods

The Job controller adds the `FailureTarget` condition or the `SuccessCriteriaMet`
condition to the Job to trigger Pod termination after a Job meets either the
success or failure criteria.

Factors like `terminationGracePeriodSeconds` might increase the amount of time
from the moment that the Job controller adds the `FailureTarget` condition or the
`SuccessCriteriaMet` condition to the moment that all of the Job Pods terminate
and the Job controller adds a terminal condition
(`Failed` or `Complete`).

You can use the `FailureTarget` or the `SuccessCriteriaMet` condition to evaluate
whether the Job has failed or succeeded without having to wait for the controller
to add a terminal condition.

For example, you might want to decide when to create a replacement Job
that replaces a failed Job. If you replace the failed Job when the `FailureTarget`
condition appears, your replacement Job runs sooner, but could result in Pods
from the failed and the replacement Job running at the same time, using
extra compute resources.

Alternatively, if your cluster has limited resource capacity, you could choose to
wait until the `Failed` condition appears on the Job, which would delay your
replacement Job but would ensure that you conserve resources by waiting
until all of the failed Pods are removed.

## Clean up finished jobs automatically

Finished Jobs are usually no longer needed in the system. Keeping them around in
the system will put pressure on the API server. If the Jobs are managed directly
by a higher level controller, such as
CronJobs, the Jobs can be
cleaned up by CronJobs based on the specified capacity-based cleanup policy.

### TTL mechanism for finished Jobs

**Feature state:** v1.23 [stable]

Another way to clean up finished Jobs (either `Complete` or `Failed`)
automatically is to use a TTL mechanism provided by a
TTL controller for
finished resources, by specifying the `.spec.ttlSecondsAfterFinished` field of
the Job.

When the TTL controller cleans up the Job, it will delete the Job cascadingly,
i.e. delete its dependent objects, such as Pods, together with the Job. Note
that when the Job is deleted, its lifecycle guarantees, such as finalizers, will
be honored.

For example:

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: pi-with-ttl
spec:
  ttlSecondsAfterFinished: 100
  template:
    spec:
      containers:
      - name: pi
        image: perl:5.34.0
        command: ["perl", "-Mbignum=bpi", "-wle", "print bpi(2000)"]
      restartPolicy: Never
```

The Job `pi-with-ttl` will be eligible to be automatically deleted, `100`
seconds after it finishes.

If the field is set to `0`, the Job will be eligible to be automatically deleted
immediately after it finishes. If the field is unset, this Job won't be cleaned
up by the TTL controller after it finishes.

**Note:**
It is recommended to set `ttlSecondsAfterFinished` field because unmanaged jobs
(Jobs that you created directly, and not indirectly through other workload APIs
such as CronJob) have a default deletion
policy of `orphanDependents` causing Pods created by an unmanaged Job to be left around
after that Job is fully deleted.
Even though the control plane eventually
garbage collects
the Pods from a deleted Job after they either fail or complete, sometimes those
lingering pods may cause cluster performance degradation or in worst case cause the
cluster to go offline due to this degradation.

You can use LimitRanges and
ResourceQuotas to place a
cap on the amount of resources that a particular namespace can
consume.
