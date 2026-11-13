---
title: "kubelet (part 3 of 5)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/kubelet.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubelet (part 3 of 5)

|  | Duration for which the kubelet has to wait before transitioning out of an eviction pressure condition. (DEPRECATED: This parameter should be set via the config file specified by the Kubelet's --config flag. See https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/ for more information.)

 | --eviction-soft <comma-separated 'key=value' pairs>

 |  | A set of eviction thresholds (e.g. memory.available<1.5Gi) that if met over a corresponding grace period would trigger a pod eviction. (DEPRECATED: This parameter should be set via the config file specified by the Kubelet's --config flag. See https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/ for more information.)

 | --eviction-soft-grace-period <comma-separated 'key=value' pairs>

 |  | A set of eviction grace periods (e.g. memory.available=1m30s) that correspond to how long a soft eviction threshold must hold before triggering a pod eviction. (DEPRECATED: This parameter should be set via the config file specified by the Kubelet's --config flag. See https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/ for more information.)

 | --exit-on-lock-contention

 |  | Whether kubelet should exit upon lock-file contention.

 | --experimental-allocatable-ignore-eviction

 |  | When set to 'true', Hard Eviction Thresholds will be ignored while calculating Node Allocatable. See https://kubernetes.io/docs/tasks/administer-cluster/reserve-compute-resources/ for more details. [default=false] (DEPRECATED: will be removed in 1.25 or later.)

 | --experimental-mounter-path string

 |  | [Experimental] Path of mounter binary. Leave empty to use the default mount. (DEPRECATED: will be removed in 1.25 or later. in favor of using CSI.)

 | --fail-cgroupv1     Default: true

 |  | Prevent the kubelet from starting on the host using cgroup v1.

 | --fail-swap-on     Default: true

 |  | Makes the Kubelet fail to start if swap is enabled on the node.  (DEPRECATED: This parameter should be set via the config file specified by the Kubelet's --config flag. See https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/ for more information.)

 | --feature-gates <comma-separated 'key=True|False' pairs>

 |  | A set of key=value pairs that describe feature gates for alpha/experimental features. Options are:APIResponseCompression=true|false (BETA - default=true)APIServerIdentity=true|false (BETA - default=true)APIServerWebhookAuthenticationToken=true|false (ALPHA - default=false)APIServingWithRoutine=true|false (ALPHA - default=false)AllAlpha=true|false (ALPHA - default=false)AllBeta=true|false (BETA - default=false)AllowParsingUserUIDFromCertAuth=true|false (BETA - default=true)AllowUnsafeMalformedObjectDeletion=true|false (BETA - default=true)AtomicFIFO=true|false (BETA - default=true)AtomicWriteVolumeUserFields=true|false (ALPHA - default=false)AuthorizePodWebsocketUpgradeCreatePermission=true|false (BETA - default=true)CBORServingAndStorage=true|false (ALPHA - default=false)CPUManagerPolicyAlphaOptions=true|false (ALPHA - default=false)CPUManagerPolicyBetaOptions=true|false (BETA - default=true)CRDObservedGenerationTracking=true|false (BETA - default=true)CRIListStreaming=true|false (ALPHA - default=false)CSIVolumeHealth=true|false (ALPHA - default=false)ClearingNominatedNodeNameAfterBinding=true|false (BETA - default=true)ClientsAllowCARotation=true|false (BETA - default=true)ClientsAllowCBOR=true|false (ALPHA - default=false)ClientsAllowTLSCacheGC=true|false (BETA - default=true)ClientsPreferCBOR=true|false (ALPHA - default=false)CloudControllerManagerWatchBasedRoutesReconciliation=true|false (ALPHA - default=false)CloudControllerManagerWebhook=true|false (ALPHA - default=false)ComponentFlagz=true|false (BETA - default=true)ComponentStatusz=true|false (BETA - default=true)CompositePodGroup=true|false (ALPHA - default=false)ConcurrentWatchObjectDecode=true|false (BETA - default=true)ConsistentListFromCacheSkipTimeoutFallback=true|false (ALPHA - default=false)ConstrainedImpersonation=true|false (BETA - default=true)ContainerCheckpoint=true|false (BETA - default=true)ContainerRestartRules=true|false (BETA - default=true)ContainerStopSignals=true|false (ALPHA - default=false)ContextualLogging=true|false (BETA - default=true)ControllerManagerReleaseLeaderElectionLockOnExit=true|false (ALPHA - default=false)CoordinatedLeaderElection=true|false (BETA - default=false)CrossNamespaceVolumeDataSource=true|false (ALPHA - default=false)DRAConsumableCapacity=true|false (BETA - default=true)DRADerivedAttributes=true|false (ALPHA - default=false)DRADeviceBindingConditions=true|false (BETA - default=true)DRADeviceCompatibilityGroups=true|false (ALPHA - default=false)DRAFractionalCapacityRange=true|false (BETA - default=false), or DRAFractionalCapacityRange=true|false (BETA - default=true) if --min-compatibility-version>=1.37DRAListTypeAttributes=true|false (ALPHA - default=false)DRANodeAllocatableResources=true|false (ALPHA - default=false)DRAOptionalNodeOperations=true|false (ALPHA - default=false)DRAPartitionableDevices=true|false (BETA - default=true)DRAPartitionableDevicesType=true|false (ALPHA - default=false)DRAResourceClaimGranularStatusAuthorization=true|false (BETA - default=true)DRAResourcePoolStatus=true|false (ALPHA - default=false)DRASchedulerFilterTimeout=true|false (BETA - default=true)DRAWorkloadResourceClaims=true|false (BETA - default=false)DeclarativeValidationBeta=true|false (BETA - default=true)DefaultPodSysctls=true|false (ALPHA - default=false)DeploymentReplicaSetTerminatingReplicas=true|false (BETA - default=true)DetectCacheInconsistency=true|false (BETA - default=true)EmptyDirVolumeMode=true|false (ALPHA - default=false)EnvFiles=true|false (BETA - default=true)EtcdRangeStream=true|false (BETA - default=true)EventedPLEG=true|false (ALPHA - default=false)EvictionRequestAPI=true|false (ALPHA - default=false)ExcludeAdmissionWebhookVirtualResources=true|false (BETA - default=true)ExtendWebSocketsToKubelet=true|false (BETA - default=true)GRPCContainerProbeTLS=true|false (ALPHA - default=false)GenericWorkload=true|false (BETA - default=false)GracefulNodeShutdown=true|false (BETA - default=true)GracefulNodeShutdownBasedOnPodPriority=true|false (BETA - default=true)H2CContainerProbe=true|false (ALPHA - default=false)HPAGeneration=true|false (BETA - default=true)HPAOptimizedSelectorStore=true|false (BETA - default=true)HPAScaleToZero=true|false (BETA - default=true)HugepageAwareEviction=true|false (BETA - default=true)ImageVolumeWithDigest=true|false (ALPHA - default=false)InOrderInformersBatchProcess=true|false (BETA - default=true)InPlacePodLevelResourcesVerticalScaling=true|false (BETA - default=true)InPlacePodVerticalScalingExclusiveCPUs=true|false (ALPHA - default=false)InPlacePodVerticalScalingExclusiveMemory=true|false (ALPHA - default=false)InPlacePodVerticalScalingMemoryBackedVolumes=true|false (ALPHA - default=false)InPlacePodVerticalScalingSchedulerPreemption=true|false (ALPHA - default=false)InterPodAffinityHostnameFastPath=true|false (ALPHA - default=false)KubeProxyNFTablesLocalhostNodePorts=true|false (ALPHA - default=false)KubeletAllocatedPodsEndpoint=true|false (ALPHA - default=false)KubeletCrashLoopBackOffMax=true|false (BETA - default=true)KubeletEnsureSecretPulledImages=true|false (BETA - default=true)KubeletInUserNamespace=true|false (BETA - default=true)KubeletSeparateDiskGC=true|false (BETA - default=true)KubeletServiceAccountTokenForCredentialProviders=true|false (BETA - default=true)ListFromCacheSnapshot=true|false (BETA - default=true)LocalStorageCapacityIsolationFSQuotaMonitoring=true|false (BETA - default=false)LoggingAlphaOptions=true|false (ALPHA - default=false)LoggingBetaOptions=true|false (BETA - default=true)ManifestBasedAdmissionControlConfig=true|false (BETA - default=true)MatchLabelKeysInPodTopologySpread=true|false (BETA - default=true)MatchLabelKeysInPodTopologySpreadSelectorMerge=true|false (BETA - default=true)MaxUnavailableStatefulSet=true|false (BETA - default=true)MemoryQoS=true|false (BETA - default=true)MutablePVNodeAffinity=true|false (ALPHA - default=false)MutablePodResourcesForSuspendedJobs=true|false (BETA - default=true)MutableSchedulingDirectivesForSuspendedJobs=true|false (BETA - default=true)NFTablesNetlink=true|false (BETA - default=true)NativeHistograms=true|false (BETA - default=true)NodeControllerLeaseCircuitBreaker=true|false (BETA - default=true)NodeLifecycleConditions=true|false (ALPHA - default=false)NominatedNodeNameForExpectation=true|false (BETA - default=true)OpenAPIEnums=true|false (BETA - default=true)OpportunisticBatching=true|false (BETA - default=true)PersistentVolumeClaimUnusedSinceTime=true|false (BETA - default=true)PodAndContainerStatsFromCRI=true|false (BETA - default=false)PodDeletionCost=true|false (BETA - default=true)PodGroupPreemptionPolicy=true|false (ALPHA - default=false)PodLevelResourceManagers=true|false (BETA - default=false)PodLevelResources=true|false (BETA - default=true)PodLevelResourcesFixDefaulting=true|false (BETA - default=true)PodLevelResourcesFixKubeletQOSClass=true|false (BETA - default=true)PodLogsQuerySplitStreams=true|false (ALPHA - default=false)PodTopologyLabelsAdmission=true|false (BETA - default=true)PodsAPI=true|false (BETA - default=true)PortForwardWebsockets=true|false (BETA - default=true)QOSReserved=true|false (ALPHA - default=false)ReduceDefaultCrashLoopBackOffDecay=true|false (ALPHA - default=false)ReloadKubeletClientCAFile=true|false (BETA - default=true)ReloadKubeletServerCertificateFile=true|false (BETA - default=true)RemoteRequestHeaderUID=true|false (BETA - default=true)ResourceHealthStatus=true|false (BETA - default=true)ResourceHealthStatusMessage=true|false (BETA - default=true)RestartAllContainersOnContainerExits=true|false (BETA - default=true)RotateKubeletServerCertificate=true|false (BETA - default=true)RuntimeClassInImageCriApi=true|false (ALPHA - default=false)SchedulerAsyncAPICalls=true|false (BETA - default=false)SchedulerAsyncPreemption=true|false (BETA - default=true)SchedulerPopFromBackoffQ=true|false (BETA - default=true)SchedulerPreQueueingHints=true|false (ALPHA - default=false)ServiceAccountNodeAudienceRestriction=true|false (BETA - default=true)ShardedListAndWatch=true|false (ALPHA - default=false)SizeBasedListCostEstimate=true|false (BETA - default=true)StaleControllerConsistencyDaemonSet=true|false (BETA - default=true)StaleControllerConsistencyHPA=true|false (BETA - default=true)StaleControllerConsistencyJob=true|false (BETA - default=true)StaleControllerConsistencyReplicaSet=true|false (BETA - default=true)StaleControllerConsistencyStatefulSet=true|false (BETA - default=true)StatefulSetRecreateStrategy=true|false (ALPHA - default=false)StatefulSetSemanticRevisionComparison=true|false (BETA - default=true)StorageCapacityScoring=true|false (BETA - default=true)StorageVersionAPI=true|false (ALPHA - default=false)StorageVersionHash=true|false (BETA - default=true)StrictIPCIDRValidation=true|false (BETA - default=true)StructuredAuthenticationConfigurationEgressSelector=true|false (BETA - default=true)StructuredAuthenticationConfigurationJWKSMetrics=true|false (BETA - default=true)TaintTolerationComparisonOperators=true|false (ALPHA - default=false)TokenRequestServiceAccountUIDValidation=true|false (BETA - default=true)TopologyAwareWorkloadScheduling=true|false (ALPHA - default=false)TopologyManagerPolicyAlphaOptions=true|false (ALPHA - default=false)TopologyManagerPolicyBetaOptions=true|false (BETA - default=true)TranslateStreamCloseWebsocketRequests=true|false (BETA - default=true)UnauthenticatedHTTP2DOSMitigation=true|false (BETA - default=true)UnknownVersionInteroperabilityProxy=true|false (BETA - default=true)UnlockWhileProcessingFIFO=true|false (BETA - default=true)UserNamespacesHostNetworkSupport=true|false (ALPHA - default=false)VolumeBindMountOptions=true|false (ALPHA - default=false)VolumeLimitScaling=true|false (BETA - default=true)WatchList=true|false (BETA - default=true)WatchListClient=true|false (BETA - default=true)WatchListCompression=true|false (BETA - default=true)WebhookRoundTripLoadBalancing=true|false (BETA - default=true)WindowsCPUAndMemoryAffinity=true|false (ALPHA - default=false)WindowsGracefulNodeShutdown=true|false (BETA - default=true)WorkloadWithJob=true|false (ALPHA - default=false) (DEPRECATED: This parameter should be set via the config file specified by the Kubelet's --config flag. See https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/ for more information.)

 | --file-check-frequency duration     Default: 20s

 |  | Duration between checking config files for new data (DEPRECATED: This parameter should be set via the config file specified by the Kubelet's --config flag. See https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/ for more information.)

 | --hairpin-mode string     Default: "promiscuous-bridge"

 |  | How should the kubelet setup hairpin NAT. This allows endpoints of a Service to loadbalance back to themselves if they should try to access their own Service. Valid values are "promiscuous-bridge", "hairpin-veth" and "none". (DEPRECATED: This parameter should be set via the config file specified by the Kubelet's --config flag. See https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/ for more information.)

 | --healthz-bind-address string     Default: 127.0.0.1

 |  | The IP address for the healthz server to serve on (set to '0.0.0.0' or '::' for listening on all interfaces and IP address families) (DEPRECATED: This parameter should be set via the config file specified by the Kubelet's --config flag. See https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/ for more information.)

 | --healthz-port int32     Default: 10248

 |  | The port of the localhost healthz endpoint (set to 0 to disable) (DEPRECATED: This parameter should be set via the config file specified by the Kubelet's --config flag. See https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/ for more information.)

 | -h, --help

 |  | help for kubelet

 | --hostname-override string

 |  | If non-empty, will use this string as identification instead of the actual hostname.

 | --http-check-frequency duration     Default: 20s

 |  | Duration between checking http for new data (DEPRECATED: This parameter should be set via the config file specified by the Kubelet's --config flag. See https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/ for more information.)

 | --image-credential-provider-bin-dir string

 |  | The path to the directory where credential provider plugin binaries are located.

 | --image-credential-provider-config string

 |  | Path to a credential provider plugin config file (JSON/YAML/YML) or a directory of such files (merged in lexicographical order; non-recursive search).

 | --image-gc-high-threshold int32     Default: 85
