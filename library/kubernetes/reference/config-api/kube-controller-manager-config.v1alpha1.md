---
title: "kube-controller-manager Configuration (v1alpha1) (part 1 of 4)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/config-api/kube-controller-manager-config.v1alpha1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kube-controller-manager Configuration (v1alpha1)

## Resource Types

- CloudControllerManagerConfiguration
- LeaderMigrationConfiguration
- KubeControllerManagerConfiguration

## `ClientConnectionConfiguration`     {#ClientConnectionConfiguration}

**Appears in:**

- KubeSchedulerConfiguration

- GenericControllerManagerConfiguration

ClientConnectionConfiguration contains details for constructing a client.

 | Field | Description

 | `kubeconfig` [Required]
`string`

 |
   kubeconfig is the path to a KubeConfig file.

 | `acceptContentTypes` [Required]
`string`

 |
   acceptContentTypes defines the Accept header sent by clients when connecting to a server, overriding the
default value of 'application/json'. This field will control all connections to the server used by a particular
client.

 | `contentType` [Required]
`string`

 |
   contentType is the content type used when sending data to the server from this client.

 | `qps` [Required]
`float32`

 |
   qps controls the number of queries per second allowed for this connection.

 | `burst` [Required]
`int32`

 |
   burst allows extra queries to accumulate when a client is exceeding its rate.

## `DebuggingConfiguration`     {#DebuggingConfiguration}

**Appears in:**

- KubeSchedulerConfiguration

- GenericControllerManagerConfiguration

DebuggingConfiguration holds configuration for Debugging related features.

 | Field | Description

 | `enableProfiling` [Required]
`bool`

 |
   enableProfiling enables profiling via web interface host:port/debug/pprof/

 | `enableContentionProfiling` [Required]
`bool`

 |
   enableContentionProfiling enables block profiling, if
enableProfiling is true.

## `LeaderElectionConfiguration`     {#LeaderElectionConfiguration}

**Appears in:**

- KubeSchedulerConfiguration

- GenericControllerManagerConfiguration

LeaderElectionConfiguration defines the configuration of leader election
clients for components that can run with leader election enabled.

 | Field | Description

 | `leaderElect` [Required]
`bool`

 |
   leaderElect enables a leader election client to gain leadership
before executing the main loop. Enable this when running replicated
components for high availability.

 | `leaseDuration` [Required]
`meta/v1.Duration`

 |
   leaseDuration is the duration that non-leader candidates will wait
after observing a leadership renewal until attempting to acquire
leadership of a led but unrenewed leader slot. This is effectively the
maximum duration that a leader can be stopped before it is replaced
by another candidate. This is only applicable if leader election is
enabled.

 | `renewDeadline` [Required]
`meta/v1.Duration`

 |
   renewDeadline is the interval between attempts by the acting master to
renew a leadership slot before it stops leading. This must be less
than or equal to the lease duration. This is only applicable if leader
election is enabled.

 | `retryPeriod` [Required]
`meta/v1.Duration`

 |
   retryPeriod is the duration the clients should wait between attempting
acquisition and renewal of a leadership. This is only applicable if
leader election is enabled.

 | `resourceLock` [Required]
`string`

 |
   resourceLock indicates the resource object type that will be used to lock
during leader election cycles.

 | `resourceName` [Required]
`string`

 |
   resourceName indicates the name of resource object that will be used to lock
during leader election cycles.

 | `resourceNamespace` [Required]
`string`

 |
   resourceName indicates the namespace of resource object that will be used to lock
during leader election cycles.

## `NodeControllerConfiguration`     {#NodeControllerConfiguration}

**Appears in:**

- CloudControllerManagerConfiguration

NodeControllerConfiguration contains elements describing NodeController.

 | Field | Description

 | `ConcurrentNodeSyncs` [Required]
`int32`

 |
   ConcurrentNodeSyncs is the number of workers
concurrently synchronizing nodes

 | `ConcurrentNodeStatusUpdates` [Required]
`int32`

 |
   ConcurrentNodeStatusUpdates is the number of workers
concurrently updating node statuses.
If unspecified or 0, ConcurrentNodeSyncs is used instead

## `ServiceControllerConfiguration`     {#ServiceControllerConfiguration}

**Appears in:**

- CloudControllerManagerConfiguration

- KubeControllerManagerConfiguration

ServiceControllerConfiguration contains elements describing ServiceController.

 | Field | Description

 | `ConcurrentServiceSyncs` [Required]
`int32`

 |
   concurrentServiceSyncs is the number of services that are
allowed to sync concurrently. Larger number = more responsive service
management, but more CPU (and network) load.

## `CloudControllerManagerConfiguration`     {#cloudcontrollermanager-config-k8s-io-v1alpha1-CloudControllerManagerConfiguration}

CloudControllerManagerConfiguration contains elements describing cloud-controller manager.

 | Field | Description

 | `apiVersion`string | `cloudcontrollermanager.config.k8s.io/v1alpha1`

 | `kind`string | `CloudControllerManagerConfiguration`

 | `Generic` [Required]
`GenericControllerManagerConfiguration`

 |
   Generic holds configuration for a generic controller-manager

 | `KubeCloudShared` [Required]
`KubeCloudSharedConfiguration`

 |
   KubeCloudSharedConfiguration holds configuration for shared related features
both in cloud controller manager and kube-controller manager.

 | `NodeController` [Required]
`NodeControllerConfiguration`

 |
   NodeController holds configuration for node controller
related features.

 | `NodeLifecycleController` [Required]
`k8s.io/cloud-provider/controllers/nodelifecycle/config/v1alpha1.NodeLifecycleControllerConfiguration`

 |
   NodeLifecycleController holds configuration for node lifecycle controller
related features.

 | `ServiceController` [Required]
`ServiceControllerConfiguration`

 |
   ServiceControllerConfiguration holds configuration for ServiceController
related features.

 | `NodeStatusUpdateFrequency` [Required]
`meta/v1.Duration`

 |
   NodeStatusUpdateFrequency is the frequency at which the controller updates nodes' status

 | `Webhook` [Required]
`WebhookConfiguration`

 |
   Webhook is the configuration for cloud-controller-manager hosted webhooks

## `CloudProviderConfiguration`     {#cloudcontrollermanager-config-k8s-io-v1alpha1-CloudProviderConfiguration}

**Appears in:**

- KubeCloudSharedConfiguration

CloudProviderConfiguration contains basically elements about cloud provider.

 | Field | Description

 | `Name` [Required]
`string`

 |
   Name is the provider for cloud services.

 | `CloudConfigFile` [Required]
`string`

 |
   cloudConfigFile is the path to the cloud provider configuration file.

## `KubeCloudSharedConfiguration`     {#cloudcontrollermanager-config-k8s-io-v1alpha1-KubeCloudSharedConfiguration}

**Appears in:**

- CloudControllerManagerConfiguration

- KubeControllerManagerConfiguration

KubeCloudSharedConfiguration contains elements shared by both kube-controller manager
and cloud-controller manager, but not genericconfig.

 | Field | Description

 | `CloudProvider` [Required]
`CloudProviderConfiguration`

 |
   CloudProviderConfiguration holds configuration for CloudProvider related features.

 | `ExternalCloudVolumePlugin` [Required]
`string`

 |
   externalCloudVolumePlugin specifies the plugin to use when cloudProvider is "external".
It is currently used by the in repo cloud providers to handle node and volume control in the KCM.

 | `UseServiceAccountCredentials` [Required]
`bool`

 |
   useServiceAccountCredentials indicates whether controllers should be run with
individual service account credentials.

 | `AllowUntaggedCloud` [Required]
`bool`

 |
   run with untagged cloud instances

 | `RouteReconciliationPeriod` [Required]
`meta/v1.Duration`

 |
   routeReconciliationPeriod is the period for reconciling routes created for Nodes by cloud provider..

 | `ClusterName` [Required]
`string`

 |
   clusterName is the instance prefix for the cluster.

 | `ClusterCIDR` [Required]
`string`

 |
   clusterCIDR is CIDR Range for Pods in cluster.

 | `AllocateNodeCIDRs` [Required]
`bool`

 |
   AllocateNodeCIDRs enables CIDRs for Pods to be allocated and, if
ConfigureCloudRoutes is true, to be set on the cloud provider.

 | `CIDRAllocatorType` [Required]
`string`

 |
   CIDRAllocatorType determines what kind of pod CIDR allocator will be used.

 | `ConfigureCloudRoutes` [Required]
`bool`

 |
   configureCloudRoutes enables CIDRs allocated with allocateNodeCIDRs
to be configured on the cloud provider.

 | `NodeSyncPeriod` [Required]
`meta/v1.Duration`

 |
   nodeSyncPeriod is the period for syncing nodes from cloudprovider. Longer
periods will result in fewer calls to cloud provider, but may delay addition
of new nodes to cluster.

## `WebhookConfiguration`     {#cloudcontrollermanager-config-k8s-io-v1alpha1-WebhookConfiguration}

**Appears in:**

- CloudControllerManagerConfiguration

WebhookConfiguration contains configuration related to
cloud-controller-manager hosted webhooks

 | Field | Description

 | `Webhooks` [Required]
`[]string`

 |
   Webhooks is the list of webhooks to enable or disable
'*' means "all enabled by default webhooks"
'foo' means "enable 'foo'"
'-foo' means "disable 'foo'"
first item for a particular name wins

## `LeaderMigrationConfiguration`     {#controllermanager-config-k8s-io-v1alpha1-LeaderMigrationConfiguration}

**Appears in:**

- GenericControllerManagerConfiguration

LeaderMigrationConfiguration provides versioned configuration for all migrating leader locks.

 | Field | Description

 | `apiVersion`string | `controllermanager.config.k8s.io/v1alpha1`

 | `kind`string | `LeaderMigrationConfiguration`

 | `leaderName` [Required]
`string`

 |
   LeaderName is the name of the leader election resource that protects the migration
E.g. 1-20-KCM-to-1-21-CCM

 | `resourceLock` [Required]
`string`

 |
   ResourceLock indicates the resource object type that will be used to lock
Should be "leases" or "endpoints"

 | `controllerLeaders` [Required]
`[]ControllerLeaderConfiguration`

 |
   ControllerLeaders contains a list of migrating leader lock configurations

## `ControllerLeaderConfiguration`     {#controllermanager-config-k8s-io-v1alpha1-ControllerLeaderConfiguration}

**Appears in:**

- LeaderMigrationConfiguration

ControllerLeaderConfiguration provides the configuration for a migrating leader lock.

 | Field | Description

 | `name` [Required]
`string`

 |
   Name is the name of the controller being migrated
E.g. service-controller, route-controller, cloud-node-controller, etc

 | `component` [Required]
`string`

 |
   Component is the name of the component in which the controller should be running.
E.g. kube-controller-manager, cloud-controller-manager, etc
Or '*' meaning the controller can be run under any component that participates in the migration

## `GenericControllerManagerConfiguration`     {#controllermanager-config-k8s-io-v1alpha1-GenericControllerManagerConfiguration}

**Appears in:**

- CloudControllerManagerConfiguration

- KubeControllerManagerConfiguration

GenericControllerManagerConfiguration holds configuration for a generic controller-manager.

 | Field | Description

 | `Port` [Required]
`int32`

 |
   port is the port that the controller-manager's http service runs on.

 | `Address` [Required]
`string`

 |
   address is the IP address to serve on (set to 0.0.0.0 for all interfaces).

 | `MinResyncPeriod` [Required]
`meta/v1.Duration`

 |
   minResyncPeriod is the resync period in reflectors; will be random between
minResyncPeriod and 2*minResyncPeriod.

 | `ClientConnection` [Required]
`ClientConnectionConfiguration`

 |
   ClientConnection specifies the kubeconfig file and client connection
settings for the proxy server to use when communicating with the apiserver.

 | `ControllerStartInterval` [Required]
`meta/v1.Duration`

 |
   How long to wait between starting controller managers

 | `LeaderElection` [Required]
`LeaderElectionConfiguration`

 |
   leaderElection defines the configuration of leader election client.

 | `Controllers` [Required]
`[]string`

 |
   Controllers is the list of controllers to enable or disable
'*' means "all enabled by default controllers"
'foo' means "enable 'foo'"
'-foo' means "disable 'foo'"
first item for a particular name wins

 | `Debugging` [Required]
`DebuggingConfiguration`

 |
   DebuggingConfiguration holds configuration for Debugging related features.

 | `LeaderMigrationEnabled` [Required]
`bool`

 |
   LeaderMigrationEnabled indicates whether Leader Migration should be enabled for the controller manager.

 | `LeaderMigration` [Required]
`LeaderMigrationConfiguration`

 |
   LeaderMigration holds the configuration for Leader Migration.
