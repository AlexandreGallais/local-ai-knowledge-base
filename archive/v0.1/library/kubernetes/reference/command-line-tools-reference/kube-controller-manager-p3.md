---
title: "kube-controller-manager (part 3 of 5)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/kube-controller-manager.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kube-controller-manager (part 3 of 5)

| --enable-hostpath-provisioner

 |  | Enable HostPath PV provisioning when running without a cloud provider. This allows testing and development of provisioning features.  HostPath provisioning is not supported in any way, won't work in a multi-node cluster, and should not be used for anything other than testing or development.

 | --enable-leader-migration

 |  | Whether to enable controller leader migration.

 | --endpoint-updates-batch-period duration

 |  | The length of endpoint updates batching period. Processing of pod changes will be delayed by this duration to join them with potential upcoming updates and reduce the overall number of endpoints updates. Larger number = higher endpoint programming latency, but lower number of endpoints revision generated

 | --endpointslice-updates-batch-period duration

 |  | The length of endpoint slice updates batching period. Processing of pod changes will be delayed by this duration to join them with potential upcoming updates and reduce the overall number of endpoints updates. Larger number = higher endpoint programming latency, but lower number of endpoints revision generated

 | --external-cloud-volume-plugin string

 |  | The plugin to use when cloud provider is set to external. Can be empty, should only be set when cloud-provider is external. Currently used to allow node-ipam-controller, persistentvolume-binder-controller, persistentvolume-expander-controller and attach-detach-controller to work for in tree cloud providers.

 | --feature-gates colonSeparatedMultimapStringString

 |  | Comma-separated list of component:key=value pairs that describe feature gates for alpha/experimental features of different components.If the component is not specified, defaults to "<example-value>". This flag can be repeatedly invoked. For example: --feature-gates '<example-value>' --feature-gates '<example-value>'Options are:kube:APIResponseCompression=true|false (BETA - default=true)kube:APIServerIdentity=true|false (BETA - default=true)kube:APIServerWebhookAuthenticationToken=true|false (ALPHA - default=false)kube:APIServingWithRoutine=true|false (ALPHA - default=false)kube:AllAlpha=true|false (ALPHA - default=false)kube:AllBeta=true|false (BETA - default=false)kube:AllowParsingUserUIDFromCertAuth=true|false (BETA - default=true)kube:AllowUnsafeMalformedObjectDeletion=true|false (BETA - default=true)kube:AtomicFIFO=true|false (BETA - default=true)kube:AtomicWriteVolumeUserFields=true|false (ALPHA - default=false)kube:AuthorizePodWebsocketUpgradeCreatePermission=true|false (BETA - default=true)kube:CBORServingAndStorage=true|false (ALPHA - default=false)kube:CPUManagerPolicyAlphaOptions=true|false (ALPHA - default=false)kube:CPUManagerPolicyBetaOptions=true|false (BETA - default=true)kube:CRDObservedGenerationTracking=true|false (BETA - default=true)kube:CRIListStreaming=true|false (ALPHA - default=false)kube:CSIVolumeHealth=true|false (ALPHA - default=false)kube:ClearingNominatedNodeNameAfterBinding=true|false (BETA - default=true)kube:ClientsAllowCARotation=true|false (BETA - default=true)kube:ClientsAllowCBOR=true|false (ALPHA - default=false)kube:ClientsAllowTLSCacheGC=true|false (BETA - default=true)kube:ClientsPreferCBOR=true|false (ALPHA - default=false)kube:CloudControllerManagerWatchBasedRoutesReconciliation=true|false (ALPHA - default=false)kube:CloudControllerManagerWebhook=true|false (ALPHA - default=false)kube:ComponentFlagz=true|false (BETA - default=true)kube:ComponentStatusz=true|false (BETA - default=true)kube:CompositePodGroup=true|false (ALPHA - default=false)kube:ConcurrentWatchObjectDecode=true|false (BETA - default=true)kube:ConsistentListFromCacheSkipTimeoutFallback=true|false (ALPHA - default=false)kube:ConstrainedImpersonation=true|false (BETA - default=true)kube:ContainerCheckpoint=true|false (BETA - default=true)kube:ContainerRestartRules=true|false (BETA - default=true)kube:ContainerStopSignals=true|false (ALPHA - default=false)kube:ContextualLogging=true|false (BETA - default=true)kube:ControllerManagerReleaseLeaderElectionLockOnExit=true|false (ALPHA - default=false)kube:CoordinatedLeaderElection=true|false (BETA - default=false)kube:CrossNamespaceVolumeDataSource=true|false (ALPHA - default=false)kube:DRAConsumableCapacity=true|false (BETA - default=true)kube:DRADerivedAttributes=true|false (ALPHA - default=false)kube:DRADeviceBindingConditions=true|false (BETA - default=true)kube:DRADeviceCompatibilityGroups=true|false (ALPHA - default=false)kube:DRAFractionalCapacityRange=true|false (BETA - default=false), or DRAFractionalCapacityRange=true|false (BETA - default=true) if --min-compatibility-version>=1.37kube:DRAListTypeAttributes=true|false (ALPHA - default=false)kube:DRANodeAllocatableResources=true|false (ALPHA - default=false)kube:DRAOptionalNodeOperations=true|false (ALPHA - default=false)kube:DRAPartitionableDevices=true|false (BETA - default=true)kube:DRAPartitionableDevicesType=true|false (ALPHA - default=false)kube:DRAResourceClaimGranularStatusAuthorization=true|false (BETA - default=true)kube:DRAResourcePoolStatus=true|false (ALPHA - default=false)kube:DRASchedulerFilterTimeout=true|false (BETA - default=true)kube:DRAWorkloadResourceClaims=true|false (BETA - default=false)kube:DeclarativeValidationBeta=true|false (BETA - default=true)kube:DefaultPodSysctls=true|false (ALPHA - default=false)kube:DeploymentReplicaSetTerminatingReplicas=true|false (BETA - default=true)kube:DetectCacheInconsistency=true|false (BETA - default=true)kube:EmptyDirVolumeMode=true|false (ALPHA - default=false)kube:EnvFiles=true|false (BETA - default=true)kube:EtcdRangeStream=true|false (BETA - default=true)kube:EventedPLEG=true|false (ALPHA - default=false)kube:EvictionRequestAPI=true|false (ALPHA - default=false)kube:ExcludeAdmissionWebhookVirtualResources=true|false (BETA - default=true)kube:ExtendWebSocketsToKubelet=true|false (BETA - default=true)kube:GRPCContainerProbeTLS=true|false (ALPHA - default=false)kube:GenericWorkload=true|false (BETA - default=false)kube:GracefulNodeShutdown=true|false (BETA - default=true)kube:GracefulNodeShutdownBasedOnPodPriority=true|false (BETA - default=true)kube:H2CContainerProbe=true|false (ALPHA - default=false)kube:HPAGeneration=true|false (BETA - default=true)kube:HPAOptimizedSelectorStore=true|false (BETA - default=true)kube:HPAScaleToZero=true|false (BETA - default=true)kube:HugepageAwareEviction=true|false (BETA - default=true)kube:ImageVolumeWithDigest=true|false (ALPHA - default=false)kube:InOrderInformersBatchProcess=true|false (BETA - default=true)kube:InPlacePodLevelResourcesVerticalScaling=true|false (BETA - default=true)kube:InPlacePodVerticalScalingExclusiveCPUs=true|false (ALPHA - default=false)kube:InPlacePodVerticalScalingExclusiveMemory=true|false (ALPHA - default=false)kube:InPlacePodVerticalScalingMemoryBackedVolumes=true|false (ALPHA - default=false)kube:InPlacePodVerticalScalingSchedulerPreemption=true|false (ALPHA - default=false)kube:InterPodAffinityHostnameFastPath=true|false (ALPHA - default=false)kube:KubeProxyNFTablesLocalhostNodePorts=true|false (ALPHA - default=false)kube:KubeletAllocatedPodsEndpoint=true|false (ALPHA - default=false)kube:KubeletCrashLoopBackOffMax=true|false (BETA - default=true)kube:KubeletEnsureSecretPulledImages=true|false (BETA - default=true)kube:KubeletInUserNamespace=true|false (BETA - default=true)kube:KubeletSeparateDiskGC=true|false (BETA - default=true)kube:KubeletServiceAccountTokenForCredentialProviders=true|false (BETA - default=true)kube:ListFromCacheSnapshot=true|false (BETA - default=true)kube:LocalStorageCapacityIsolationFSQuotaMonitoring=true|false (BETA - default=false)kube:LoggingAlphaOptions=true|false (ALPHA - default=false)kube:LoggingBetaOptions=true|false (BETA - default=true)kube:ManifestBasedAdmissionControlConfig=true|false (BETA - default=true)kube:MatchLabelKeysInPodTopologySpread=true|false (BETA - default=true)kube:MatchLabelKeysInPodTopologySpreadSelectorMerge=true|false (BETA - default=true)kube:MaxUnavailableStatefulSet=true|false (BETA - default=true)kube:MemoryQoS=true|false (BETA - default=true)kube:MutablePVNodeAffinity=true|false (ALPHA - default=false)kube:MutablePodResourcesForSuspendedJobs=true|false (BETA - default=true)kube:MutableSchedulingDirectivesForSuspendedJobs=true|false (BETA - default=true)kube:NFTablesNetlink=true|false (BETA - default=true)kube:NativeHistograms=true|false (BETA - default=true)kube:NodeControllerLeaseCircuitBreaker=true|false (BETA - default=true)kube:NodeLifecycleConditions=true|false (ALPHA - default=false)kube:NominatedNodeNameForExpectation=true|false (BETA - default=true)kube:OpenAPIEnums=true|false (BETA - default=true)kube:OpportunisticBatching=true|false (BETA - default=true)kube:PersistentVolumeClaimUnusedSinceTime=true|false (BETA - default=true)kube:PodAndContainerStatsFromCRI=true|false (BETA - default=false)kube:PodDeletionCost=true|false (BETA - default=true)kube:PodGroupPreemptionPolicy=true|false (ALPHA - default=false)kube:PodLevelResourceManagers=true|false (BETA - default=false)kube:PodLevelResources=true|false (BETA - default=true)kube:PodLevelResourcesFixDefaulting=true|false (BETA - default=true)kube:PodLevelResourcesFixKubeletQOSClass=true|false (BETA - default=true)kube:PodLogsQuerySplitStreams=true|false (ALPHA - default=false)kube:PodTopologyLabelsAdmission=true|false (BETA - default=true)kube:PodsAPI=true|false (BETA - default=true)kube:PortForwardWebsockets=true|false (BETA - default=true)kube:QOSReserved=true|false (ALPHA - default=false)kube:ReduceDefaultCrashLoopBackOffDecay=true|false (ALPHA - default=false)kube:ReloadKubeletClientCAFile=true|false (BETA - default=true)kube:ReloadKubeletServerCertificateFile=true|false (BETA - default=true)kube:RemoteRequestHeaderUID=true|false (BETA - default=true)kube:ResourceHealthStatus=true|false (BETA - default=true)kube:ResourceHealthStatusMessage=true|false (BETA - default=true)kube:RestartAllContainersOnContainerExits=true|false (BETA - default=true)kube:RotateKubeletServerCertificate=true|false (BETA - default=true)kube:RuntimeClassInImageCriApi=true|false (ALPHA - default=false)kube:SchedulerAsyncAPICalls=true|false (BETA - default=false)kube:SchedulerAsyncPreemption=true|false (BETA - default=true)kube:SchedulerPopFromBackoffQ=true|false (BETA - default=true)kube:SchedulerPreQueueingHints=true|false (ALPHA - default=false)kube:ServiceAccountNodeAudienceRestriction=true|false (BETA - default=true)kube:ShardedListAndWatch=true|false (ALPHA - default=false)kube:SizeBasedListCostEstimate=true|false (BETA - default=true)kube:StaleControllerConsistencyDaemonSet=true|false (BETA - default=true)kube:StaleControllerConsistencyHPA=true|false (BETA - default=true)kube:StaleControllerConsistencyJob=true|false (BETA - default=true)kube:StaleControllerConsistencyReplicaSet=true|false (BETA - default=true)kube:StaleControllerConsistencyStatefulSet=true|false (BETA - default=true)kube:StatefulSetRecreateStrategy=true|false (ALPHA - default=false)kube:StatefulSetSemanticRevisionComparison=true|false (BETA - default=true)kube:StorageCapacityScoring=true|false (BETA - default=true)kube:StorageVersionAPI=true|false (ALPHA - default=false)kube:StorageVersionHash=true|false (BETA - default=true)kube:StrictIPCIDRValidation=true|false (BETA - default=true)kube:StructuredAuthenticationConfigurationEgressSelector=true|false (BETA - default=true)kube:StructuredAuthenticationConfigurationJWKSMetrics=true|false (BETA - default=true)kube:TaintTolerationComparisonOperators=true|false (ALPHA - default=false)kube:TokenRequestServiceAccountUIDValidation=true|false (BETA - default=true)kube:TopologyAwareWorkloadScheduling=true|false (ALPHA - default=false)kube:TopologyManagerPolicyAlphaOptions=true|false (ALPHA - default=false)kube:TopologyManagerPolicyBetaOptions=true|false (BETA - default=true)kube:TranslateStreamCloseWebsocketRequests=true|false (BETA - default=true)kube:UnauthenticatedHTTP2DOSMitigation=true|false (BETA - default=true)kube:UnknownVersionInteroperabilityProxy=true|false (BETA - default=true)kube:UnlockWhileProcessingFIFO=true|false (BETA - default=true)kube:UserNamespacesHostNetworkSupport=true|false (ALPHA - default=false)kube:VolumeBindMountOptions=true|false (ALPHA - default=false)kube:VolumeLimitScaling=true|false (BETA - default=true)kube:WatchList=true|false (BETA - default=true)kube:WatchListClient=true|false (BETA - default=true)kube:WatchListCompression=true|false (BETA - default=true)kube:WebhookRoundTripLoadBalancing=true|false (BETA - default=true)kube:WindowsCPUAndMemoryAffinity=true|false (ALPHA - default=false)kube:WindowsGracefulNodeShutdown=true|false (BETA - default=true)kube:WorkloadWithJob=true|false (ALPHA - default=false)

 | --flex-volume-plugin-dir string     Default: "/usr/libexec/kubernetes/kubelet-plugins/volume/exec/"

 |  | Full path of the directory in which the flex volume plugin should search for additional third party volume plugins.

 | -h, --help

 |  | help for kube-controller-manager

 | --horizontal-pod-autoscaler-cpu-initialization-period duration     Default: 5m0s

 |  | The period after pod start when CPU samples might be skipped.

 | --horizontal-pod-autoscaler-downscale-stabilization duration     Default: 5m0s

 |  | The period for which autoscaler will look backwards and not scale down below any recommendation it made during that period.

 | --horizontal-pod-autoscaler-initial-readiness-delay duration     Default: 30s

 |  | The period after pod start during which readiness changes will be treated as initial readiness.

 | --horizontal-pod-autoscaler-sync-period duration     Default: 15s

 |  | The period for syncing the number of pods in horizontal pod autoscaler.

 | --horizontal-pod-autoscaler-tolerance float     Default: 0.1

 |  | The minimum change (from 1.0) in the desired-to-actual metrics ratio for the horizontal pod autoscaler to consider scaling.

 | --http2-max-streams-per-connection int

 |  | The limit that the server gives to clients for the maximum number of streams in an HTTP/2 connection. Zero means to use golang's default.

 | --kube-api-burst int32     Default: 30

 |  | Burst to use while talking with kubernetes apiserver.

 | --kube-api-content-type string     Default: "application/vnd.kubernetes.protobuf"

 |  | Content type of requests sent to apiserver.

 | --kube-api-qps float     Default: 20

 |  | QPS to use while talking with kubernetes apiserver.

 | --kubeconfig string

 |  | Path to kubeconfig file with authorization and master location information (the master location can be overridden by the master flag).

 | --large-cluster-size-threshold int32     Default: 50
