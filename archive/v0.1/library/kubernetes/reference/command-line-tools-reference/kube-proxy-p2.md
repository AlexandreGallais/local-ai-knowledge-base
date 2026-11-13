---
title: "kube-proxy (part 2 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/kube-proxy.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kube-proxy (part 2 of 3)

## Options

 | --add_dir_header

 |  | If true, adds the file directory to the header of the log messages

 | --alsologtostderr

 |  | log to standard error as well as files (no effect when -logtostderr=true)

 | --alsologtostderrthreshold int

 |  | logs at or above this threshold go to stderr when -alsologtostderr=true (no effect when -logtostderr=true)

 | --bind-address string     Default: 0.0.0.0

 |  | Overrides kube-proxy's idea of what its node's primary IP is. Note that the name is a historical artifact, and kube-proxy does not actually bind any sockets to this IP. This parameter is ignored if a config file is specified by --config.

 | --bind-address-hard-fail

 |  | If true kube-proxy will treat failure to bind to a port as fatal and exit

 | --cleanup

 |  | If true cleanup iptables and ipvs rules and exit.

 | --cluster-cidr string

 |  | The CIDR range of the pods in the cluster. (For dual-stack clusters, this can be a comma-separated dual-stack pair of CIDR ranges.). When --detect-local-mode is set to ClusterCIDR, kube-proxy will consider traffic to be local if its source IP is in this range. (Otherwise it is not used.) This parameter is ignored if a config file is specified by --config.

 | --config string

 |  | The path to the configuration file.

 | --config-sync-period duration     Default: 15m0s

 |  | How often configuration from the apiserver is refreshed.  Must be greater than 0.

 | --conntrack-max-per-core int32     Default: 32768

 |  | Maximum number of NAT connections to track per CPU core (0 to leave the limit as-is and ignore conntrack-min).

 | --conntrack-min int32     Default: 131072

 |  | Minimum number of conntrack entries to allocate, regardless of conntrack-max-per-core (set conntrack-max-per-core=0 to leave the limit as-is).

 | --conntrack-tcp-be-liberal

 |  | Enable liberal mode for tracking TCP packets by setting nf_conntrack_tcp_be_liberal to 1

 | --conntrack-tcp-timeout-close-wait duration     Default: 1h0m0s

 |  | NAT timeout for TCP connections in the CLOSE_WAIT state

 | --conntrack-tcp-timeout-established duration     Default: 24h0m0s

 |  | Idle timeout for established TCP connections (0 to leave as-is)

 | --conntrack-udp-timeout duration

 |  | Idle timeout for UNREPLIED UDP connections (0 to leave as-is)

 | --conntrack-udp-timeout-stream duration

 |  | Idle timeout for ASSURED UDP connections (0 to leave as-is)

 | --detect-local-mode LocalMode

 |  | Mode to use to detect local traffic. This parameter is ignored if a config file is specified by --config.

 | --feature-gates <comma-separated 'key=True|False' pairs>

 |  | A set of key=value pairs that describe feature gates for alpha/experimental features. Options are:APIResponseCompression=true|false (BETA - default=true)APIServerIdentity=true|false (BETA - default=true)APIServerWebhookAuthenticationToken=true|false (ALPHA - default=false)APIServingWithRoutine=true|false (ALPHA - default=false)AllAlpha=true|false (ALPHA - default=false)AllBeta=true|false (BETA - default=false)AllowParsingUserUIDFromCertAuth=true|false (BETA - default=true)AllowUnsafeMalformedObjectDeletion=true|false (BETA - default=true)AtomicFIFO=true|false (BETA - default=true)AtomicWriteVolumeUserFields=true|false (ALPHA - default=false)AuthorizePodWebsocketUpgradeCreatePermission=true|false (BETA - default=true)CBORServingAndStorage=true|false (ALPHA - default=false)CPUManagerPolicyAlphaOptions=true|false (ALPHA - default=false)CPUManagerPolicyBetaOptions=true|false (BETA - default=true)CRDObservedGenerationTracking=true|false (BETA - default=true)CRIListStreaming=true|false (ALPHA - default=false)CSIVolumeHealth=true|false (ALPHA - default=false)ClearingNominatedNodeNameAfterBinding=true|false (BETA - default=true)ClientsAllowCARotation=true|false (BETA - default=true)ClientsAllowCBOR=true|false (ALPHA - default=false)ClientsAllowTLSCacheGC=true|false (BETA - default=true)ClientsPreferCBOR=true|false (ALPHA - default=false)CloudControllerManagerWatchBasedRoutesReconciliation=true|false (ALPHA - default=false)CloudControllerManagerWebhook=true|false (ALPHA - default=false)ComponentFlagz=true|false (BETA - default=true)ComponentStatusz=true|false (BETA - default=true)CompositePodGroup=true|false (ALPHA - default=false)ConcurrentWatchObjectDecode=true|false (BETA - default=true)ConsistentListFromCacheSkipTimeoutFallback=true|false (ALPHA - default=false)ConstrainedImpersonation=true|false (BETA - default=true)ContainerCheckpoint=true|false (BETA - default=true)ContainerRestartRules=true|false (BETA - default=true)ContainerStopSignals=true|false (ALPHA - default=false)ContextualLogging=true|false (BETA - default=true)ControllerManagerReleaseLeaderElectionLockOnExit=true|false (ALPHA - default=false)CoordinatedLeaderElection=true|false (BETA - default=false)CrossNamespaceVolumeDataSource=true|false (ALPHA - default=false)DRAConsumableCapacity=true|false (BETA - default=true)DRADerivedAttributes=true|false (ALPHA - default=false)DRADeviceBindingConditions=true|false (BETA - default=true)DRADeviceCompatibilityGroups=true|false (ALPHA - default=false)DRAFractionalCapacityRange=true|false (BETA - default=false), or DRAFractionalCapacityRange=true|false (BETA - default=true) if --min-compatibility-version>=1.37DRAListTypeAttributes=true|false (ALPHA - default=false)DRANodeAllocatableResources=true|false (ALPHA - default=false)DRAOptionalNodeOperations=true|false (ALPHA - default=false)DRAPartitionableDevices=true|false (BETA - default=true)DRAPartitionableDevicesType=true|false (ALPHA - default=false)DRAResourceClaimGranularStatusAuthorization=true|false (BETA - default=true)DRAResourcePoolStatus=true|false (ALPHA - default=false)DRASchedulerFilterTimeout=true|false (BETA - default=true)DRAWorkloadResourceClaims=true|false (BETA - default=false)DeclarativeValidationBeta=true|false (BETA - default=true)DefaultPodSysctls=true|false (ALPHA - default=false)DeploymentReplicaSetTerminatingReplicas=true|false (BETA - default=true)DetectCacheInconsistency=true|false (BETA - default=true)EmptyDirVolumeMode=true|false (ALPHA - default=false)EnvFiles=true|false (BETA - default=true)EtcdRangeStream=true|false (BETA - default=true)EventedPLEG=true|false (ALPHA - default=false)EvictionRequestAPI=true|false (ALPHA - default=false)ExcludeAdmissionWebhookVirtualResources=true|false (BETA - default=true)ExtendWebSocketsToKubelet=true|false (BETA - default=true)GRPCContainerProbeTLS=true|false (ALPHA - default=false)GenericWorkload=true|false (BETA - default=false)GracefulNodeShutdown=true|false (BETA - default=true)GracefulNodeShutdownBasedOnPodPriority=true|false (BETA - default=true)H2CContainerProbe=true|false (ALPHA - default=false)HPAGeneration=true|false (BETA - default=true)HPAOptimizedSelectorStore=true|false (BETA - default=true)HPAScaleToZero=true|false (BETA - default=true)HugepageAwareEviction=true|false (BETA - default=true)ImageVolumeWithDigest=true|false (ALPHA - default=false)InOrderInformersBatchProcess=true|false (BETA - default=true)InPlacePodLevelResourcesVerticalScaling=true|false (BETA - default=true)InPlacePodVerticalScalingExclusiveCPUs=true|false (ALPHA - default=false)InPlacePodVerticalScalingExclusiveMemory=true|false (ALPHA - default=false)InPlacePodVerticalScalingMemoryBackedVolumes=true|false (ALPHA - default=false)InPlacePodVerticalScalingSchedulerPreemption=true|false (ALPHA - default=false)InterPodAffinityHostnameFastPath=true|false (ALPHA - default=false)KubeProxyNFTablesLocalhostNodePorts=true|false (ALPHA - default=false)KubeletAllocatedPodsEndpoint=true|false (ALPHA - default=false)KubeletCrashLoopBackOffMax=true|false (BETA - default=true)KubeletEnsureSecretPulledImages=true|false (BETA - default=true)KubeletInUserNamespace=true|false (BETA - default=true)KubeletSeparateDiskGC=true|false (BETA - default=true)KubeletServiceAccountTokenForCredentialProviders=true|false (BETA - default=true)ListFromCacheSnapshot=true|false (BETA - default=true)LocalStorageCapacityIsolationFSQuotaMonitoring=true|false (BETA - default=false)LoggingAlphaOptions=true|false (ALPHA - default=false)LoggingBetaOptions=true|false (BETA - default=true)ManifestBasedAdmissionControlConfig=true|false (BETA - default=true)MatchLabelKeysInPodTopologySpread=true|false (BETA - default=true)MatchLabelKeysInPodTopologySpreadSelectorMerge=true|false (BETA - default=true)MaxUnavailableStatefulSet=true|false (BETA - default=true)MemoryQoS=true|false (BETA - default=true)MutablePVNodeAffinity=true|false (ALPHA - default=false)MutablePodResourcesForSuspendedJobs=true|false (BETA - default=true)MutableSchedulingDirectivesForSuspendedJobs=true|false (BETA - default=true)NFTablesNetlink=true|false (BETA - default=true)NativeHistograms=true|false (BETA - default=true)NodeControllerLeaseCircuitBreaker=true|false (BETA - default=true)NodeLifecycleConditions=true|false (ALPHA - default=false)NominatedNodeNameForExpectation=true|false (BETA - default=true)OpenAPIEnums=true|false (BETA - default=true)OpportunisticBatching=true|false (BETA - default=true)PersistentVolumeClaimUnusedSinceTime=true|false (BETA - default=true)PodAndContainerStatsFromCRI=true|false (BETA - default=false)PodDeletionCost=true|false (BETA - default=true)PodGroupPreemptionPolicy=true|false (ALPHA - default=false)PodLevelResourceManagers=true|false (BETA - default=false)PodLevelResources=true|false (BETA - default=true)PodLevelResourcesFixDefaulting=true|false (BETA - default=true)PodLevelResourcesFixKubeletQOSClass=true|false (BETA - default=true)PodLogsQuerySplitStreams=true|false (ALPHA - default=false)PodTopologyLabelsAdmission=true|false (BETA - default=true)PodsAPI=true|false (BETA - default=true)PortForwardWebsockets=true|false (BETA - default=true)QOSReserved=true|false (ALPHA - default=false)ReduceDefaultCrashLoopBackOffDecay=true|false (ALPHA - default=false)ReloadKubeletClientCAFile=true|false (BETA - default=true)ReloadKubeletServerCertificateFile=true|false (BETA - default=true)RemoteRequestHeaderUID=true|false (BETA - default=true)ResourceHealthStatus=true|false (BETA - default=true)ResourceHealthStatusMessage=true|false (BETA - default=true)RestartAllContainersOnContainerExits=true|false (BETA - default=true)RotateKubeletServerCertificate=true|false (BETA - default=true)RuntimeClassInImageCriApi=true|false (ALPHA - default=false)SchedulerAsyncAPICalls=true|false (BETA - default=false)SchedulerAsyncPreemption=true|false (BETA - default=true)SchedulerPopFromBackoffQ=true|false (BETA - default=true)SchedulerPreQueueingHints=true|false (ALPHA - default=false)ServiceAccountNodeAudienceRestriction=true|false (BETA - default=true)ShardedListAndWatch=true|false (ALPHA - default=false)SizeBasedListCostEstimate=true|false (BETA - default=true)StaleControllerConsistencyDaemonSet=true|false (BETA - default=true)StaleControllerConsistencyHPA=true|false (BETA - default=true)StaleControllerConsistencyJob=true|false (BETA - default=true)StaleControllerConsistencyReplicaSet=true|false (BETA - default=true)StaleControllerConsistencyStatefulSet=true|false (BETA - default=true)StatefulSetRecreateStrategy=true|false (ALPHA - default=false)StatefulSetSemanticRevisionComparison=true|false (BETA - default=true)StorageCapacityScoring=true|false (BETA - default=true)StorageVersionAPI=true|false (ALPHA - default=false)StorageVersionHash=true|false (BETA - default=true)StrictIPCIDRValidation=true|false (BETA - default=true)StructuredAuthenticationConfigurationEgressSelector=true|false (BETA - default=true)StructuredAuthenticationConfigurationJWKSMetrics=true|false (BETA - default=true)TaintTolerationComparisonOperators=true|false (ALPHA - default=false)TokenRequestServiceAccountUIDValidation=true|false (BETA - default=true)TopologyAwareWorkloadScheduling=true|false (ALPHA - default=false)TopologyManagerPolicyAlphaOptions=true|false (ALPHA - default=false)TopologyManagerPolicyBetaOptions=true|false (BETA - default=true)TranslateStreamCloseWebsocketRequests=true|false (BETA - default=true)UnauthenticatedHTTP2DOSMitigation=true|false (BETA - default=true)UnknownVersionInteroperabilityProxy=true|false (BETA - default=true)UnlockWhileProcessingFIFO=true|false (BETA - default=true)UserNamespacesHostNetworkSupport=true|false (ALPHA - default=false)VolumeBindMountOptions=true|false (ALPHA - default=false)VolumeLimitScaling=true|false (BETA - default=true)WatchList=true|false (BETA - default=true)WatchListClient=true|false (BETA - default=true)WatchListCompression=true|false (BETA - default=true)WebhookRoundTripLoadBalancing=true|false (BETA - default=true)WindowsCPUAndMemoryAffinity=true|false (ALPHA - default=false)WindowsGracefulNodeShutdown=true|false (BETA - default=true)WorkloadWithJob=true|false (ALPHA - default=false)This parameter is ignored if a config file is specified by --config.

 | --healthz-bind-address ipport     Default: 0.0.0.0:10256

 |  | The IP address and port for the health check server to serve on, defaulting to "0.0.0.0:10256". This parameter is ignored if a config file is specified by --config.

 | -h, --help

 |  | help for kube-proxy

 | --hostname-override string

 |  | If non-empty, will be used as the name of the Node that kube-proxy is running on. If unset, the node name is assumed to be the same as the node's hostname.

 | --init-only

 |  | If true, perform any initialization steps that must be done with full root privileges, and then exit. After doing this, you can run kube-proxy again with only the CAP_NET_ADMIN capability.

 | --iptables-localhost-nodeports     Default: true

 |  | If false, kube-proxy will disable the legacy behavior of allowing NodePort services to be accessed via localhost. (Applies only to iptables mode and IPv4; localhost NodePorts are never allowed with other proxy modes or with IPv6.)

 | --iptables-masquerade-bit int32     Default: 14

 |  | If using the iptables or ipvs proxy mode, the bit of the fwmark space to mark packets requiring SNAT with.  Must be within the range [0, 31].

 | --iptables-min-sync-period duration     Default: 1s

 |  | The minimum period between iptables rule resyncs (e.g. '5s', '1m', '2h22m'). A value of 0 means every Service or EndpointSlice change will result in an immediate iptables resync.

 | --iptables-sync-period duration     Default: 30s

 |  | An interval (e.g. '5s', '1m', '2h22m') indicating how frequently various re-synchronizing and cleanup operations are performed. Must be greater than 0.

 | --ipvs-exclude-cidrs strings

 |  | A comma-separated list of CIDRs which the ipvs proxier should not touch when cleaning up IPVS rules.

 | --ipvs-min-sync-period duration     Default: 1s

 |  | The minimum period between IPVS rule resyncs (e.g. '5s', '1m', '2h22m'). A value of 0 means every Service or EndpointSlice change will result in an immediate IPVS resync.

 | --ipvs-scheduler string

 |  | The ipvs scheduler type when proxy mode is ipvs

 | --ipvs-strict-arp
