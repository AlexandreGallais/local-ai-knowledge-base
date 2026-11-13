---
title: "API Priority and Fairness (part 2 of 4)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/cluster-administration/flow-control.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# API Priority and Fairness (part 2 of 4)

## Resources

The flow control API involves two kinds of resources.
PriorityLevelConfigurations
define the available priority levels, the share of the available concurrency
budget that each can handle, and allow for fine-tuning queuing behavior.
FlowSchemas
are used to classify individual inbound requests, matching each to a
single PriorityLevelConfiguration.

### PriorityLevelConfiguration

A PriorityLevelConfiguration represents a single priority level. Each
PriorityLevelConfiguration has an independent limit on the number of outstanding
requests, and limitations on the number of queued requests.

The nominal concurrency limit for a PriorityLevelConfiguration is not
specified in an absolute number of seats, but rather in "nominal
concurrency shares." The total concurrency limit for the API Server is
distributed among the existing PriorityLevelConfigurations in
proportion to these shares, to give each level its nominal limit in
terms of seats. This allows a cluster administrator to scale up or
down the total amount of traffic to a server by restarting
`kube-apiserver` with a different value for `--max-requests-inflight`
(or `--max-mutating-requests-inflight`), and all
PriorityLevelConfigurations will see their maximum allowed concurrency
go up (or down) by the same fraction.

**Caution:**
In the versions before `v1beta3` the relevant
PriorityLevelConfiguration field is named "assured concurrency shares"
rather than "nominal concurrency shares". Also, in Kubernetes release
1.25 and earlier there were no periodic adjustments: the
nominal/assured limits were always applied without adjustment.

The bounds on how much concurrency a priority level may lend and how
much it may borrow are expressed in the PriorityLevelConfiguration as
percentages of the level's nominal limit. These are resolved to
absolute numbers of seats by multiplying with the nominal limit /
100.0 and rounding. The dynamically adjusted concurrency limit of a
priority level is constrained to lie between (a) a lower bound of its
nominal limit minus its lendable seats and (b) an upper bound of its
nominal limit plus the seats it may borrow. At each adjustment the
dynamic limits are derived by each priority level reclaiming any lent
seats for which demand recently appeared and then jointly fairly
responding to the recent seat demand on the priority levels, within
the bounds just described.

**Caution:**
With the Priority and Fairness feature enabled, the total concurrency limit for
the server is set to the sum of `--max-requests-inflight` and
`--max-mutating-requests-inflight`. There is no longer any distinction made
between mutating and non-mutating requests; if you want to treat them
separately for a given resource, make separate FlowSchemas that match the
mutating and non-mutating verbs respectively.

When the volume of inbound requests assigned to a single
PriorityLevelConfiguration is more than its permitted concurrency level, the
`type` field of its specification determines what will happen to extra requests.
A type of `Reject` means that excess traffic will immediately be rejected with
an HTTP 429 (Too Many Requests) error. A type of `Queue` means that requests
above the threshold will be queued, with the shuffle sharding and fair queuing techniques used
to balance progress between request flows.

The queuing configuration allows tuning the fair queuing algorithm for a
priority level. Details of the algorithm can be read in the
enhancement proposal, but in short:

* Increasing `queues` reduces the rate of collisions between different flows, at
  the cost of increased memory usage. A value of 1 here effectively disables the
  fair-queuing logic, but still allows requests to be queued.

* Increasing `queueLengthLimit` allows larger bursts of traffic to be
  sustained without dropping any requests, at the cost of increased
  latency and memory usage.

* Changing `handSize` allows you to adjust the probability of collisions between
  different flows and the overall concurrency available to a single flow in an
  overload situation.

  **Note:**
  A larger `handSize` makes it less likely for two individual flows to collide
  (and therefore for one to be able to starve the other), but more likely that
  a small number of flows can dominate the apiserver. A larger `handSize` also
  potentially increases the amount of latency that a single high-traffic flow
  can cause. The maximum number of queued requests possible from a
  single flow is `handSize * queueLengthLimit`.

Following is a table showing an interesting collection of shuffle
sharding configurations, showing for each the probability that a
given mouse (low-intensity flow) is squished by the elephants (high-intensity flows) for
an illustrative collection of numbers of elephants. See
https://play.golang.org/p/Gi0PLgVHiUg , which computes this table.

HandSize | Queues | 1 elephant | 4 elephants | 16 elephants
|----------|-----------|------------|----------------|--------------------|
| 12 | 32 | 4.428838398950118e-09 | 0.11431348830099144 | 0.9935089607656024 |
| 10 | 32 | 1.550093439632541e-08 | 0.0626479840223545 | 0.9753101519027554 |
| 10 | 64 | 6.601827268370426e-12 | 0.00045571320990370776 | 0.49999929150089345 |
| 9 | 64 | 3.6310049976037345e-11 | 0.00045501212304112273 | 0.4282314876454858 |
| 8 | 64 | 2.25929199850899e-10 | 0.0004886697053040446 | 0.35935114681123076 |
| 8 | 128 | 6.994461389026097e-13 | 3.4055790161620863e-06 | 0.02746173137155063 |
| 7 | 128 | 1.0579122850901972e-11 | 6.960839379258192e-06 | 0.02406157386340147 |
| 7 | 256 | 7.597695465552631e-14 | 6.728547142019406e-08 | 0.0006709661542533682 |
| 6 | 256 | 2.7134626662687968e-12 | 2.9516464018476436e-07 | 0.0008895654642000348 |
| 6 | 512 | 4.116062922897309e-14 | 4.982983350480894e-09 | 2.26025764343413e-05 |
| 6 | 1024 | 6.337324016514285e-16 | 8.09060164312957e-11 | 4.517408062903668e-07 |

### FlowSchema

A FlowSchema matches some inbound requests and assigns them to a
priority level. Every inbound request is tested against FlowSchemas,
starting with those with the numerically lowest `matchingPrecedence` and
working upward. The first match wins.

**Caution:**
Only the first matching FlowSchema for a given request matters. If multiple
FlowSchemas match a single inbound request, it will be assigned based on the one
with the highest `matchingPrecedence`. If multiple FlowSchemas with equal
`matchingPrecedence` match the same request, the one with lexicographically
smaller `name` will win, but it's better not to rely on this, and instead to
ensure that no two FlowSchemas have the same `matchingPrecedence`.

A FlowSchema matches a given request if at least one of its `rules`
matches. A rule matches if at least one of its `subjects` *and* at least
one of its `resourceRules` or `nonResourceRules` (depending on whether the
incoming request is for a resource or non-resource URL) match the request.

For the `name` field in subjects, and the `verbs`, `apiGroups`, `resources`,
`namespaces`, and `nonResourceURLs` fields of resource and non-resource rules,
the wildcard `*` may be specified to match all values for the given field,
effectively removing it from consideration.

A FlowSchema's `distinguisherMethod.type` determines how requests matching that
schema will be separated into flows. It may be `ByUser`, in which one requesting
user will not be able to starve other users of capacity; `ByNamespace`, in which
requests for resources in one namespace will not be able to starve requests for
resources in other namespaces of capacity; or blank (or `distinguisherMethod` may be
omitted entirely), in which all requests matched by this FlowSchema will be
considered part of a single flow. The correct choice for a given FlowSchema
depends on the resource and your particular environment.

## Defaults

Each kube-apiserver maintains two sorts of APF configuration objects:
mandatory and suggested.

### Mandatory Configuration Objects

The four mandatory configuration objects reflect fixed built-in
guardrail behavior. This is behavior that the servers have before
those objects exist, and when those objects exist their specs reflect
this behavior. The four mandatory objects are as follows.

* The mandatory `exempt` priority level is used for requests that are
  not subject to flow control at all: they will always be dispatched
  immediately. The mandatory `exempt` FlowSchema classifies all
  requests from the `system:masters` group into this priority
  level. You may define other FlowSchemas that direct other requests
  to this priority level, if appropriate.

* The mandatory `catch-all` priority level is used in combination with
  the mandatory `catch-all` FlowSchema to make sure that every request
  gets some kind of classification. Typically you should not rely on
  this catch-all configuration, and should create your own catch-all
  FlowSchema and PriorityLevelConfiguration (or use the suggested
  `global-default` priority level that is installed by default) as
  appropriate. Because it is not expected to be used normally, the
  mandatory `catch-all` priority level has a very small concurrency
  share and does not queue requests.

### Suggested Configuration Objects

The suggested FlowSchemas and PriorityLevelConfigurations constitute a
reasonable default configuration. You can modify these and/or create
additional configuration objects if you want. If your cluster is
likely to experience heavy load then you should consider what
configuration will work best.

The suggested configuration groups requests into six priority levels:

* The `node-high` priority level is for health updates from nodes.

* The `system` priority level is for non-health requests from the
  `system:nodes` group, i.e. Kubelets, which must be able to contact
  the API server in order for workloads to be able to schedule on
  them.

* The `leader-election` priority level is for leader election requests from
  built-in controllers (in particular, requests for `endpoints`, `configmaps`,
  or `leases` coming from the `system:kube-controller-manager` or
  `system:kube-scheduler` users and service accounts in the `kube-system`
  namespace). These are important to isolate from other traffic because failures
  in leader election cause their controllers to fail and restart, which in turn
  causes more expensive traffic as the new controllers sync their informers.

* The `workload-high` priority level is for other requests from built-in
  controllers.

* The `workload-low` priority level is for requests from any other service
  account, which will typically include all requests from controllers running in
  Pods.

* The `global-default` priority level handles all other traffic, e.g.
  interactive `kubectl` commands run by nonprivileged users.

The suggested FlowSchemas serve to steer requests into the above
priority levels, and are not enumerated here.

### Maintenance of the Mandatory and Suggested Configuration Objects

Each `kube-apiserver` independently maintains the mandatory and
suggested configuration objects, using initial and periodic behavior.
Thus, in a situation with a mixture of servers of different versions
there may be thrashing as long as different servers have different
opinions of the proper content of these objects.

Each `kube-apiserver` makes an initial maintenance pass over the
mandatory and suggested configuration objects, and after that does
periodic maintenance (once per minute) of those objects.

For the mandatory configuration objects, maintenance consists of
ensuring that the object exists and, if it does, has the proper spec.
The server refuses to allow a creation or update with a spec that is
inconsistent with the server's guardrail behavior.

Maintenance of suggested configuration objects is designed to allow
their specs to be overridden. Deletion, on the other hand, is not
respected: maintenance will restore the object. If you do not want a
suggested configuration object then you need to keep it around but set
its spec to have minimal consequences. Maintenance of suggested
objects is also designed to support automatic migration when a new
version of the `kube-apiserver` is rolled out, albeit potentially with
thrashing while there is a mixed population of servers.

Maintenance of a suggested configuration object consists of creating
it --- with the server's suggested spec --- if the object does not
exist. OTOH, if the object already exists, maintenance behavior
depends on whether the `kube-apiservers` or the users control the
object. In the former case, the server ensures that the object's spec
is what the server suggests; in the latter case, the spec is left
alone.

The question of who controls the object is answered by first looking
for an annotation with key `apf.kubernetes.io/autoupdate-spec`. If
there is such an annotation and its value is `true` then the
kube-apiservers control the object. If there is such an annotation
and its value is `false` then the users control the object. If
neither of those conditions holds then the `metadata.generation` of the
object is consulted. If that is 1 then the kube-apiservers control
the object. Otherwise the users control the object. These rules were
introduced in release 1.22 and their consideration of
`metadata.generation` is for the sake of migration from the simpler
earlier behavior. Users who wish to control a suggested configuration
object should set its `apf.kubernetes.io/autoupdate-spec` annotation
to `false`.

Maintenance of a mandatory or suggested configuration object also
includes ensuring that it has an `apf.kubernetes.io/autoupdate-spec`
annotation that accurately reflects whether the kube-apiservers
control the object.

Maintenance also includes deleting objects that are neither mandatory
nor suggested but are annotated
`apf.kubernetes.io/autoupdate-spec=true`.
