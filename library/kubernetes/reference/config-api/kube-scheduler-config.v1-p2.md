---
title: "kube-scheduler Configuration (v1) (part 2 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/config-api/kube-scheduler-config.v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kube-scheduler Configuration (v1) (part 2 of 3)

## `VolumeBindingArgs`     {#kubescheduler-config-k8s-io-v1-VolumeBindingArgs}

VolumeBindingArgs holds arguments used to configure the VolumeBinding plugin.

 | Field | Description

 | `apiVersion`string | `kubescheduler.config.k8s.io/v1`

 | `kind`string | `VolumeBindingArgs`

 | `bindTimeoutSeconds` [Required]
`int64`

 |
   BindTimeoutSeconds is the timeout in seconds in volume binding operation.
Value must be non-negative integer. The value zero indicates no waiting.
If this value is nil, the default value (600) will be used.

 | `shape`
`[]UtilizationShapePoint`

 |
   Shape specifies the points defining the score function shape, which is
used to score nodes based on the utilization of provisioned PVs.
The utilization is calculated by dividing the total requested
storage of the pod by the total capacity of feasible PVs on each node.
Each point contains utilization (ranges from 0 to 100) and its
associated score (ranges from 0 to 10). You can turn the priority by
specifying different scores for different utilization numbers.
The default shape points are:

10 for 0 utilization
0 for 100 utilization
All points must be sorted in increasing order by utilization.

## `Extender`     {#kubescheduler-config-k8s-io-v1-Extender}

**Appears in:**

- KubeSchedulerConfiguration

Extender holds the parameters used to communicate with the extender. If a verb is unspecified/empty,
it is assumed that the extender chose not to provide that extension.

 | Field | Description

 | `urlPrefix` [Required]
`string`

 |
   URLPrefix at which the extender is available

 | `filterVerb` [Required]
`string`

 |
   Verb for the filter call, empty if not supported. This verb is appended to the URLPrefix when issuing the filter call to extender.

 | `preemptVerb` [Required]
`string`

 |
   Verb for the preempt call, empty if not supported. This verb is appended to the URLPrefix when issuing the preempt call to extender.

 | `prioritizeVerb` [Required]
`string`

 |
   Verb for the prioritize call, empty if not supported. This verb is appended to the URLPrefix when issuing the prioritize call to extender.

 | `weight` [Required]
`int64`

 |
   The numeric multiplier for the node scores that the prioritize call generates.
The weight should be a positive integer

 | `bindVerb` [Required]
`string`

 |
   Verb for the bind call, empty if not supported. This verb is appended to the URLPrefix when issuing the bind call to extender.
If this method is implemented by the extender, it is the extender's responsibility to bind the pod to apiserver. Only one extender
can implement this function.

 | `enableHTTPS` [Required]
`bool`

 |
   EnableHTTPS specifies whether https should be used to communicate with the extender

 | `tlsConfig` [Required]
`ExtenderTLSConfig`

 |
   TLSConfig specifies the transport layer security config

 | `httpTimeout` [Required]
`meta/v1.Duration`

 |
   HTTPTimeout specifies the timeout duration for a call to the extender. Filter timeout fails the scheduling of the pod. Prioritize
timeout is ignored, k8s/other extenders priorities are used to select the node.

 | `nodeCacheCapable` [Required]
`bool`

 |
   NodeCacheCapable specifies that the extender is capable of caching node information,
so the scheduler should only send minimal information about the eligible nodes
assuming that the extender already cached full details of all nodes in the cluster

 | `managedResources`
`[]ExtenderManagedResource`

 |
   ManagedResources is a list of extended resources that are managed by
this extender.

A pod will be sent to the extender on the Filter, Prioritize and Bind
(if the extender is the binder) phases iff the pod requests at least
one of the extended resources in this list. If empty or unspecified,
all pods will be sent to this extender.
If IgnoredByScheduler is set to true for a resource, kube-scheduler
will skip checking the resource in predicates.

 | `ignorable` [Required]
`bool`

 |
   Ignorable specifies if the extender is ignorable, i.e. scheduling should not
fail when the extender returns an error or is not reachable.

## `ExtenderManagedResource`     {#kubescheduler-config-k8s-io-v1-ExtenderManagedResource}

**Appears in:**

- Extender

ExtenderManagedResource describes the arguments of extended resources
managed by an extender.

 | Field | Description

 | `name` [Required]
`string`

 |
   Name is the extended resource name.

 | `ignoredByScheduler` [Required]
`bool`

 |
   IgnoredByScheduler indicates whether kube-scheduler should ignore this
resource when applying predicates.

## `ExtenderTLSConfig`     {#kubescheduler-config-k8s-io-v1-ExtenderTLSConfig}

**Appears in:**

- Extender

ExtenderTLSConfig contains settings to enable TLS with extender

 | Field | Description

 | `insecure` [Required]
`bool`

 |
   Server should be accessed without verifying the TLS certificate. For testing only.

 | `serverName` [Required]
`string`

 |
   ServerName is passed to the server for SNI and is used in the client to check server
certificates against. If ServerName is empty, the hostname used to contact the
server is used.

 | `certFile` [Required]
`string`

 |
   Server requires TLS client certificate authentication

 | `keyFile` [Required]
`string`

 |
   Server requires TLS client certificate authentication

 | `caFile` [Required]
`string`

 |
   Trusted root certificates for server

 | `certData` [Required]
`[]byte`

 |
   CertData holds PEM-encoded bytes (typically read from a client certificate file).
CertData takes precedence over CertFile

 | `keyData` [Required]
`[]byte`

 |
   KeyData holds PEM-encoded bytes (typically read from a client certificate key file).
KeyData takes precedence over KeyFile

 | `caData` [Required]
`[]byte`

 |
   CAData holds PEM-encoded bytes (typically read from a root certificates bundle).
CAData takes precedence over CAFile

## `KubeSchedulerProfile`     {#kubescheduler-config-k8s-io-v1-KubeSchedulerProfile}

**Appears in:**

- KubeSchedulerConfiguration

KubeSchedulerProfile is a scheduling profile.

 | Field | Description

 | `schedulerName` [Required]
`string`

 |
   SchedulerName is the name of the scheduler associated to this profile.
If SchedulerName matches with the pod's "spec.schedulerName", then the pod
is scheduled with this profile.

 | `percentageOfNodesToScore` [Required]
`int32`

 |
   PercentageOfNodesToScore is the percentage of all nodes that once found feasible
for running a pod, the scheduler stops its search for more feasible nodes in
the cluster. This helps improve scheduler's performance. Scheduler always tries to find
at least "minFeasibleNodesToFind" feasible nodes no matter what the value of this flag is.
Example: if the cluster size is 500 nodes and the value of this flag is 30,
then scheduler stops finding further feasible nodes once it finds 150 feasible ones.
When the value is 0, default percentage (5%--50% based on the size of the cluster) of the
nodes will be scored. It will override global PercentageOfNodesToScore. If it is empty,
global PercentageOfNodesToScore will be used.

 | `plugins` [Required]
`Plugins`

 |
   Plugins specify the set of plugins that should be enabled or disabled.
Enabled plugins are the ones that should be enabled in addition to the
default plugins. Disabled plugins are any of the default plugins that
should be disabled.
When no enabled or disabled plugin is specified for an extension point,
default plugins for that extension point will be used if there is any.
If a QueueSort plugin is specified, the same QueueSort Plugin and
PluginConfig must be specified for all profiles.

 | `pluginConfig` [Required]
`[]PluginConfig`

 |
   PluginConfig is an optional set of custom plugin arguments for each plugin.
Omitting config args for a plugin is equivalent to using the default config
for that plugin.

## `Plugin`     {#kubescheduler-config-k8s-io-v1-Plugin}

**Appears in:**

- PluginSet

Plugin specifies a plugin name and its weight when applicable. Weight is used only for Score and PlacementScore plugins.

 | Field | Description

 | `name` [Required]
`string`

 |
   Name defines the name of plugin

 | `weight` [Required]
`int32`

 |
   Weight defines the weight of plugin, only used for Score and PlacementScore plugins.

## `PluginConfig`     {#kubescheduler-config-k8s-io-v1-PluginConfig}

**Appears in:**

- KubeSchedulerProfile

PluginConfig specifies arguments that should be passed to a plugin at the time of initialization.
A plugin that is invoked at multiple extension points is initialized once. Args can have arbitrary structure.
It is up to the plugin to process these Args.

 | Field | Description

 | `name` [Required]
`string`

 |
   Name defines the name of plugin being configured

 | `args` [Required]
`k8s.io/apimachinery/pkg/runtime.RawExtension`

 |
   Args defines the arguments passed to the plugins at the time of initialization. Args can have arbitrary structure.

## `PluginSet`     {#kubescheduler-config-k8s-io-v1-PluginSet}

**Appears in:**

- Plugins

PluginSet specifies enabled and disabled plugins for an extension point.
If an array is empty, missing, or nil, default plugins at that extension point will be used.

 | Field | Description

 | `enabled` [Required]
`[]Plugin`

 |
   Enabled specifies plugins that should be enabled in addition to default plugins.
If the default plugin is also configured in the scheduler config file, the weight of plugin will
be overridden accordingly.
These are called after default plugins and in the same order specified here.

 | `disabled` [Required]
`[]Plugin`

 |
   Disabled specifies default plugins that should be disabled.
When all default plugins need to be disabled, an array containing only one "*" should be provided.

## `Plugins`     {#kubescheduler-config-k8s-io-v1-Plugins}

**Appears in:**

- KubeSchedulerProfile

Plugins include multiple extension points. When specified, the list of plugins for
a particular extension point are the only ones enabled. If an extension point is
omitted from the config, then the default set of plugins is used for that extension point.
Enabled plugins are called in the order specified here, after default plugins. If they need to
be invoked before default plugins, default plugins must be disabled and re-enabled here in desired order.

 | Field | Description

 | `preEnqueue` [Required]
`PluginSet`

 |
   PreEnqueue is a list of plugins that should be invoked before adding pods to the scheduling queue.

 | `queueSort` [Required]
`PluginSet`

 |
   QueueSort is a list of plugins that should be invoked when sorting pods in the scheduling queue.

 | `preFilter` [Required]
`PluginSet`

 |
   PreFilter is a list of plugins that should be invoked at "PreFilter" extension point of the scheduling framework.

 | `filter` [Required]
`PluginSet`

 |
   Filter is a list of plugins that should be invoked when filtering out nodes that cannot run the Pod.

 | `postFilter` [Required]
`PluginSet`

 |
   PostFilter is a list of plugins that are invoked after filtering phase, but only when no feasible nodes were found for the pod.

 | `preScore` [Required]
`PluginSet`

 |
   PreScore is a list of plugins that are invoked before scoring.

 | `score` [Required]
`PluginSet`

 |
   Score is a list of plugins that should be invoked when ranking nodes that have passed the filtering phase.

 | `reserve` [Required]
`PluginSet`

 |
   Reserve is a list of plugins invoked when reserving/unreserving resources
after a node is assigned to run the pod.

 | `permit` [Required]
`PluginSet`

 |
   Permit is a list of plugins that control binding of a Pod. These plugins can prevent or delay binding of a Pod.

 | `preBind` [Required]
`PluginSet`

 |
   PreBind is a list of plugins that should be invoked before a pod is bound.

 | `bind` [Required]
`PluginSet`

 |
   Bind is a list of plugins that should be invoked at "Bind" extension point of the scheduling framework.
The scheduler call these plugins in order. Scheduler skips the rest of these plugins as soon as one returns success.

 | `postBind` [Required]
`PluginSet`

 |
   PostBind is a list of plugins that should be invoked after a pod is successfully bound.

 | `multiPoint` [Required]
`PluginSet`

 |
   MultiPoint is a simplified config section to enable plugins for all valid extension points.
Plugins enabled through MultiPoint will automatically register for every individual extension
point the plugin has implemented. Disabling a plugin through MultiPoint disables that behavior.
The same is true for disabling "*" through MultiPoint (no default plugins will be automatically registered).
Plugins can still be disabled through their individual extension points.
In terms of precedence, plugin config follows this basic hierarchy

Specific extension points
Explicitly configured MultiPoint plugins
The set of default plugins, as MultiPoint plugins
This implies that a higher precedence plugin will run first and overwrite any settings within MultiPoint.
Explicitly user-configured plugins also take a higher precedence over default plugins.
Within this hierarchy, an Enabled setting takes precedence over Disabled. For example, if a plugin is
set in both `multiPoint.Enabled` and `multiPoint.Disabled`, the plugin will be enabled. Similarly,
including `multiPoint.Disabled = '*'` and `multiPoint.Enabled = pluginA` will still register that specific
plugin through MultiPoint. This follows the same behavior as all other extension point configurations.

 | `placementGenerate` [Required]
`PluginSet`

 |
   PlacementGenerate is a list of plugins that should be invoked during pod group scheduling cycle when determining placements for a pod group.

 | `placementScore` [Required]
`PluginSet`

 |
   PlacementScore is a list of plugins that should be invoked during workload scheduling cycle when ranking pod group assignments.

 | `podGroupPostFilter` [Required]
`PluginSet`

 |
   PodGroupPostFilter is a list of plugins that are invoked after the workload scheduling phase,
but only when the PodGroup cannot be scheduled (equivalent to PostFilter for single pods).

## `PodTopologySpreadConstraintsDefaulting`     {#kubescheduler-config-k8s-io-v1-PodTopologySpreadConstraintsDefaulting}

(Alias of `string`)

**Appears in:**

- PodTopologySpreadArgs

PodTopologySpreadConstraintsDefaulting defines how to set default constraints
for the PodTopologySpread plugin.

## `RequestedToCapacityRatioParam`     {#kubescheduler-config-k8s-io-v1-RequestedToCapacityRatioParam}

**Appears in:**

- ScoringStrategy

RequestedToCapacityRatioParam define RequestedToCapacityRatio parameters

 | Field | Description

 | `shape` [Required]
`[]UtilizationShapePoint`

 |
   Shape is a list of points defining the scoring function shape.
