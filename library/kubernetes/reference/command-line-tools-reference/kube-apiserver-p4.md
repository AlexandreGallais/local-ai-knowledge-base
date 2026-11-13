---
title: "kube-apiserver (part 4 of 6)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/kube-apiserver.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kube-apiserver (part 4 of 6)

|  | Comma-separated list of component:key=value pairs that describe feature gates for alpha/experimental features of different components.If the component is not specified, defaults to "kube". This flag can be repeatedly invoked. For example: --feature-gates 'wardle:featureA=true,wardle:featureB=false' --feature-gates 'kube:featureC=true'Options are:kube:APIResponseCompression=true|false (BETA - default=true)kube:APIServerIdentity=true|false (BETA - default=true)kube:APIServerWebhookAuthenticationToken=true|false (ALPHA - default=false)kube:APIServingWithRoutine=true|false (ALPHA - default=false)kube:AllAlpha=true|false (ALPHA - default=false)kube:AllBeta=true|false (BETA - default=false)kube:AllowParsingUserUIDFromCertAuth=true|false (BETA - default=true)kube:AllowUnsafeMalformedObjectDeletion=true|false (BETA - default=true)kube:AtomicFIFO=true|false (BETA - default=true)kube:AtomicWriteVolumeUserFields=true|false (ALPHA - default=false)kube:AuthorizePodWebsocketUpgradeCreatePermission=true|false (BETA - default=true)kube:CBORServingAndStorage=true|false (ALPHA - default=false)kube:CPUManagerPolicyAlphaOptions=true|false (ALPHA - default=false)kube:CPUManagerPolicyBetaOptions=true|false (BETA - default=true)kube:CRDObservedGenerationTracking=true|false (BETA - default=true)kube:CRIListStreaming=true|false (ALPHA - default=false)kube:CSIVolumeHealth=true|false (ALPHA - default=false)kube:ClearingNominatedNodeNameAfterBinding=true|false (BETA - default=true)kube:ClientsAllowCARotation=true|false (BETA - default=true)kube:ClientsAllowCBOR=true|false (ALPHA - default=false)kube:ClientsAllowTLSCacheGC=true|false (BETA - default=true)kube:ClientsPreferCBOR=true|false (ALPHA - default=false)kube:CloudControllerManagerWatchBasedRoutesReconciliation=true|false (ALPHA - default=false)kube:CloudControllerManagerWebhook=true|false (ALPHA - default=false)kube:ComponentFlagz=true|false (BETA - default=true)kube:ComponentStatusz=true|false (BETA - default=true)kube:CompositePodGroup=true|false (ALPHA - default=false)kube:ConcurrentWatchObjectDecode=true|false (BETA - default=true)kube:ConsistentListFromCacheSkipTimeoutFallback=true|false (ALPHA - default=false)kube:ConstrainedImpersonation=true|false (BETA - default=true)kube:ContainerCheckpoint=true|false (BETA - default=true)kube:ContainerRestartRules=true|false (BETA - default=true)kube:ContainerStopSignals=true|false (ALPHA - default=false)kube:ContextualLogging=true|false (BETA - default=true)kube:ControllerManagerReleaseLeaderElectionLockOnExit=true|false (ALPHA - default=false)kube:CoordinatedLeaderElection=true|false (BETA - default=false)kube:CrossNamespaceVolumeDataSource=true|false (ALPHA - default=false)kube:DRAConsumableCapacity=true|false (BETA - default=true)kube:DRADerivedAttributes=true|false (ALPHA - default=false)kube:DRADeviceBindingConditions=true|false (BETA - default=true)kube:DRADeviceCompatibilityGroups=true|false (ALPHA - default=false)kube:DRAFractionalCapacityRange=true|false (BETA - default=false), or DRAFractionalCapacityRange=true|false (BETA - default=true) if --min-compatibility-version>=1.37kube:DRAListTypeAttributes=true|false (ALPHA - default=false)kube:DRANodeAllocatableResources=true|false (ALPHA - default=false)kube:DRAOptionalNodeOperations=true|false (ALPHA - default=false)kube:DRAPartitionableDevices=true|false (BETA - default=true)kube:DRAPartitionableDevicesType=true|false (ALPHA - default=false)kube:DRAResourceClaimGranularStatusAuthorization=true|false (BETA - default=true)kube:DRAResourcePoolStatus=true|false (ALPHA - default=false)kube:DRASchedulerFilterTimeout=true|false (BETA - default=true)kube:DRAWorkloadResourceClaims=true|false (BETA - default=false)kube:DeclarativeValidationBeta=true|false (BETA - default=true)kube:DefaultPodSysctls=true|false (ALPHA - default=false)kube:DeploymentReplicaSetTerminatingReplicas=true|false (BETA - default=true)kube:DetectCacheInconsistency=true|false (BETA - default=true)kube:EmptyDirVolumeMode=true|false (ALPHA - default=false)kube:EnvFiles=true|false (BETA - default=true)kube:EtcdRangeStream=true|false (BETA - default=true)kube:EventedPLEG=true|false (ALPHA - default=false)kube:EvictionRequestAPI=true|false (ALPHA - default=false)kube:ExcludeAdmissionWebhookVirtualResources=true|false (BETA - default=true)kube:ExtendWebSocketsToKubelet=true|false (BETA - default=true)kube:GRPCContainerProbeTLS=true|false (ALPHA - default=false)kube:GenericWorkload=true|false (BETA - default=false)kube:GracefulNodeShutdown=true|false (BETA - default=true)kube:GracefulNodeShutdownBasedOnPodPriority=true|false (BETA - default=true)kube:H2CContainerProbe=true|false (ALPHA - default=false)kube:HPAGeneration=true|false (BETA - default=true)kube:HPAOptimizedSelectorStore=true|false (BETA - default=true)kube:HPAScaleToZero=true|false (BETA - default=true)kube:HugepageAwareEviction=true|false (BETA - default=true)kube:ImageVolumeWithDigest=true|false (ALPHA - default=false)kube:InOrderInformersBatchProcess=true|false (BETA - default=true)kube:InPlacePodLevelResourcesVerticalScaling=true|false (BETA - default=true)kube:InPlacePodVerticalScalingExclusiveCPUs=true|false (ALPHA - default=false)kube:InPlacePodVerticalScalingExclusiveMemory=true|false (ALPHA - default=false)kube:InPlacePodVerticalScalingMemoryBackedVolumes=true|false (ALPHA - default=false)kube:InPlacePodVerticalScalingSchedulerPreemption=true|false (ALPHA - default=false)kube:InterPodAffinityHostnameFastPath=true|false (ALPHA - default=false)kube:KubeProxyNFTablesLocalhostNodePorts=true|false (ALPHA - default=false)kube:KubeletAllocatedPodsEndpoint=true|false (ALPHA - default=false)kube:KubeletCrashLoopBackOffMax=true|false (BETA - default=true)kube:KubeletEnsureSecretPulledImages=true|false (BETA - default=true)kube:KubeletInUserNamespace=true|false (BETA - default=true)kube:KubeletSeparateDiskGC=true|false (BETA - default=true)kube:KubeletServiceAccountTokenForCredentialProviders=true|false (BETA - default=true)kube:ListFromCacheSnapshot=true|false (BETA - default=true)kube:LocalStorageCapacityIsolationFSQuotaMonitoring=true|false (BETA - default=false)kube:LoggingAlphaOptions=true|false (ALPHA - default=false)kube:LoggingBetaOptions=true|false (BETA - default=true)kube:ManifestBasedAdmissionControlConfig=true|false (BETA - default=true)kube:MatchLabelKeysInPodTopologySpread=true|false (BETA - default=true)kube:MatchLabelKeysInPodTopologySpreadSelectorMerge=true|false (BETA - default=true)kube:MaxUnavailableStatefulSet=true|false (BETA - default=true)kube:MemoryQoS=true|false (BETA - default=true)kube:MutablePVNodeAffinity=true|false (ALPHA - default=false)kube:MutablePodResourcesForSuspendedJobs=true|false (BETA - default=true)kube:MutableSchedulingDirectivesForSuspendedJobs=true|false (BETA - default=true)kube:NFTablesNetlink=true|false (BETA - default=true)kube:NativeHistograms=true|false (BETA - default=true)kube:NodeControllerLeaseCircuitBreaker=true|false (BETA - default=true)kube:NodeLifecycleConditions=true|false (ALPHA - default=false)kube:NominatedNodeNameForExpectation=true|false (BETA - default=true)kube:OpenAPIEnums=true|false (BETA - default=true)kube:OpportunisticBatching=true|false (BETA - default=true)kube:PersistentVolumeClaimUnusedSinceTime=true|false (BETA - default=true)kube:PodAndContainerStatsFromCRI=true|false (BETA - default=false)kube:PodDeletionCost=true|false (BETA - default=true)kube:PodGroupPreemptionPolicy=true|false (ALPHA - default=false)kube:PodLevelResourceManagers=true|false (BETA - default=false)kube:PodLevelResources=true|false (BETA - default=true)kube:PodLevelResourcesFixDefaulting=true|false (BETA - default=true)kube:PodLevelResourcesFixKubeletQOSClass=true|false (BETA - default=true)kube:PodLogsQuerySplitStreams=true|false (ALPHA - default=false)kube:PodTopologyLabelsAdmission=true|false (BETA - default=true)kube:PodsAPI=true|false (BETA - default=true)kube:PortForwardWebsockets=true|false (BETA - default=true)kube:QOSReserved=true|false (ALPHA - default=false)kube:ReduceDefaultCrashLoopBackOffDecay=true|false (ALPHA - default=false)kube:ReloadKubeletClientCAFile=true|false (BETA - default=true)kube:ReloadKubeletServerCertificateFile=true|false (BETA - default=true)kube:RemoteRequestHeaderUID=true|false (BETA - default=true)kube:ResourceHealthStatus=true|false (BETA - default=true)kube:ResourceHealthStatusMessage=true|false (BETA - default=true)kube:RestartAllContainersOnContainerExits=true|false (BETA - default=true)kube:RotateKubeletServerCertificate=true|false (BETA - default=true)kube:RuntimeClassInImageCriApi=true|false (ALPHA - default=false)kube:SchedulerAsyncAPICalls=true|false (BETA - default=false)kube:SchedulerAsyncPreemption=true|false (BETA - default=true)kube:SchedulerPopFromBackoffQ=true|false (BETA - default=true)kube:SchedulerPreQueueingHints=true|false (ALPHA - default=false)kube:ServiceAccountNodeAudienceRestriction=true|false (BETA - default=true)kube:ShardedListAndWatch=true|false (ALPHA - default=false)kube:SizeBasedListCostEstimate=true|false (BETA - default=true)kube:StaleControllerConsistencyDaemonSet=true|false (BETA - default=true)kube:StaleControllerConsistencyHPA=true|false (BETA - default=true)kube:StaleControllerConsistencyJob=true|false (BETA - default=true)kube:StaleControllerConsistencyReplicaSet=true|false (BETA - default=true)kube:StaleControllerConsistencyStatefulSet=true|false (BETA - default=true)kube:StatefulSetRecreateStrategy=true|false (ALPHA - default=false)kube:StatefulSetSemanticRevisionComparison=true|false (BETA - default=true)kube:StorageCapacityScoring=true|false (BETA - default=true)kube:StorageVersionAPI=true|false (ALPHA - default=false)kube:StorageVersionHash=true|false (BETA - default=true)kube:StrictIPCIDRValidation=true|false (BETA - default=true)kube:StructuredAuthenticationConfigurationEgressSelector=true|false (BETA - default=true)kube:StructuredAuthenticationConfigurationJWKSMetrics=true|false (BETA - default=true)kube:TaintTolerationComparisonOperators=true|false (ALPHA - default=false)kube:TokenRequestServiceAccountUIDValidation=true|false (BETA - default=true)kube:TopologyAwareWorkloadScheduling=true|false (ALPHA - default=false)kube:TopologyManagerPolicyAlphaOptions=true|false (ALPHA - default=false)kube:TopologyManagerPolicyBetaOptions=true|false (BETA - default=true)kube:TranslateStreamCloseWebsocketRequests=true|false (BETA - default=true)kube:UnauthenticatedHTTP2DOSMitigation=true|false (BETA - default=true)kube:UnknownVersionInteroperabilityProxy=true|false (BETA - default=true)kube:UnlockWhileProcessingFIFO=true|false (BETA - default=true)kube:UserNamespacesHostNetworkSupport=true|false (ALPHA - default=false)kube:VolumeBindMountOptions=true|false (ALPHA - default=false)kube:VolumeLimitScaling=true|false (BETA - default=true)kube:WatchList=true|false (BETA - default=true)kube:WatchListClient=true|false (BETA - default=true)kube:WatchListCompression=true|false (BETA - default=true)kube:WebhookRoundTripLoadBalancing=true|false (BETA - default=true)kube:WindowsCPUAndMemoryAffinity=true|false (ALPHA - default=false)kube:WindowsGracefulNodeShutdown=true|false (BETA - default=true)kube:WorkloadWithJob=true|false (ALPHA - default=false)

 | --goaway-chance float

 |  | To prevent HTTP/2 clients from getting stuck on a single apiserver, randomly close a connection (GOAWAY). The client's other in-flight requests won't be affected, and the client will reconnect, likely landing on a different apiserver after going through the load balancer again. This argument sets the fraction of requests that will be sent a GOAWAY. Clusters with single apiservers, or which don't use a load balancer, should NOT enable this. Min is 0 (off), Max is .02 (1/50 requests); .001 (1/1000) is a recommended starting point.

 | -h, --help

 |  | help for kube-apiserver

 | --http2-max-streams-per-connection int

 |  | The limit that the server gives to clients for the maximum number of streams in an HTTP/2 connection. Zero means to use golang's default.

 | --kubelet-certificate-authority string

 |  | Path to a cert file for the certificate authority.

 | --kubelet-client-certificate string

 |  | Path to a client cert file for TLS.

 | --kubelet-client-key string

 |  | Path to a client key file for TLS.

 | --kubelet-preferred-address-types strings     Default: "Hostname,InternalDNS,InternalIP,ExternalDNS,ExternalIP"

 |  | List of the preferred NodeAddressTypes to use for kubelet connections.

 | --kubelet-timeout duration     Default: 5s

 |  | Timeout for kubelet operations.

 | --kubernetes-service-node-port int

 |  | If non-zero, the Kubernetes master service (which apiserver creates/maintains) will be of type NodePort, using this as the value of the port. If zero, the Kubernetes master service will be of type ClusterIP.

 | --lease-reuse-duration-seconds int     Default: 60

 |  | The time in seconds that each lease is reused. A lower value could avoid large number of objects reusing the same lease. Notice that a too small value may cause performance problems at storage layer.

 | --livez-grace-period duration

 |  | This option represents the maximum amount of time it should take for apiserver to complete its startup sequence and become live. From apiserver's start time to when this amount of time has elapsed, /livez will assume that unfinished post-start hooks will complete successfully and therefore return true.

 | --log-flush-frequency duration     Default: 5s

 |  | Maximum number of seconds between log flushes

 | --log-text-info-buffer-size quantity

 |  | [Alpha] In text format with split output streams, the info messages can be buffered for a while to increase performance. The default value of zero bytes disables buffering. The size can be specified as number of bytes (512), multiples of 1000 (1K), multiples of 1024 (2Ki), or powers of those (3M, 4G, 5Mi, 6Gi). Enable the LoggingAlphaOptions feature gate to use this.

 | --log-text-split-stream

 |  | [Alpha] In text format, write error messages to stderr and info messages to stdout. The default is to write a single stream to stdout. Enable the LoggingAlphaOptions feature gate to use this.

 | --logging-format string     Default: "text"

 |  | Sets the log format. Permitted formats: "text".

 | --max-connection-bytes-per-sec int

 |  | If non-zero, throttle each user connection to this number of bytes/sec. Currently only applies to long-running requests.

 | --max-mutating-requests-inflight int     Default: 200

 |  | This and --max-requests-inflight are summed to determine the server's total concurrency limit (which must be positive) if --enable-priority-and-fairness is true. Otherwise, this flag limits the maximum number of mutating requests in flight, or a zero value disables the limit completely.

 | --max-requests-inflight int     Default: 400
