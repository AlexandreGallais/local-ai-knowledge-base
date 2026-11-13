---
title: "Kubernetes Metrics Reference (part 8 of 13)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/instrumentation/metrics.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Kubernetes Metrics Reference (part 8 of 13)

Stability Level:ALPHA
	Type: Custom
	Labels:driver_nameComponents:kubelet (/metrics)

	dynamic_resource_allocation_resource_claims
	Number of ResourceClaims, categorized by allocation status, admin access, and source. Source can be 'resource_claim_template' (created from a template), 'extended_resource' (extended resources), or empty (manually created by a user).

	Stability Level:ALPHA
	Type: Custom
	Labels:allocatedadmin_accesssourceComponents:kube-controller-manager (/metrics)

	dynamic_resource_allocation_resourceclaim_creates_total
	Number of ResourceClaims creation requests, categorized by creation status, admin access, and owning API group and kind (either Pod or scheduling.k8s.io/PodGroup)

	Stability Level:ALPHA
	Type: Counter
	Labels:admin_accessowner_api_groupowner_api_kindstatusComponents:kube-controller-manager (/metrics)kube-scheduler (/metrics)

	endpoint_slice_controller_changes
	Number of EndpointSlice changes

	Stability Level:ALPHA
	Type: Counter
	Labels:operationComponents:kube-controller-manager (/metrics)

	endpoint_slice_controller_endpointslices_changed_per_sync
	Number of EndpointSlices changed on each Service sync

	Stability Level:ALPHA
	Type: Histogram
	Labels:topologytraffic_distributionComponents:kube-controller-manager (/metrics)

	endpoint_slice_controller_syncs
	Number of EndpointSlice syncs

	Stability Level:ALPHA
	Type: Counter
	Labels:resultComponents:kube-controller-manager (/metrics)

	endpoint_slice_mirroring_controller_addresses_skipped_per_sync
	Number of addresses skipped on each Endpoints sync due to being invalid or exceeding MaxEndpointsPerSubset

	Stability Level:ALPHA
	Type: Histogram
	Components:kube-controller-manager (/metrics)

	endpoint_slice_mirroring_controller_changes
	Number of EndpointSlice changes

	Stability Level:ALPHA
	Type: Counter
	Labels:operationComponents:kube-controller-manager (/metrics)

	endpoint_slice_mirroring_controller_desired_endpoint_slices
	Number of EndpointSlices that would exist with perfect endpoint allocation

	Stability Level:ALPHA
	Type: Gauge
	Components:kube-controller-manager (/metrics)

	endpoint_slice_mirroring_controller_endpoints_added_per_sync
	Number of endpoints added on each Endpoints sync

	Stability Level:ALPHA
	Type: Histogram
	Components:kube-controller-manager (/metrics)

	endpoint_slice_mirroring_controller_endpoints_desired
	Number of endpoints desired

	Stability Level:ALPHA
	Type: Gauge
	Components:kube-controller-manager (/metrics)

	endpoint_slice_mirroring_controller_endpoints_removed_per_sync
	Number of endpoints removed on each Endpoints sync

	Stability Level:ALPHA
	Type: Histogram
	Components:kube-controller-manager (/metrics)

	endpoint_slice_mirroring_controller_endpoints_sync_duration
	Duration of syncEndpoints() in seconds

	Stability Level:ALPHA
	Type: Histogram
	Components:kube-controller-manager (/metrics)

	endpoint_slice_mirroring_controller_endpoints_updated_per_sync
	Number of endpoints updated on each Endpoints sync

	Stability Level:ALPHA
	Type: Histogram
	Components:kube-controller-manager (/metrics)

	endpoint_slice_mirroring_controller_num_endpoint_slices
	Number of EndpointSlices

	Stability Level:ALPHA
	Type: Gauge
	Components:kube-controller-manager (/metrics)

	ephemeral_volume_controller_create_failures_total
	Number of PersistentVolumeClaim creation requests

	Stability Level:ALPHA
	Type: Counter
	Components:kube-controller-manager (/metrics)

	ephemeral_volume_controller_create_total
	Number of PersistentVolumeClaim creation requests

	Stability Level:ALPHA
	Type: Counter
	Components:kube-controller-manager (/metrics)

	etcd_bookmark_counts
	Number of etcd bookmarks (progress notify events) split by kind.

	Stability Level:ALPHA
	Type: Gauge
	Labels:groupresourceComponents:kube-apiserver (/metrics)Deprecated Versions:1.36.0

	etcd_bookmark_total
	Number of etcd bookmarks (progress notify events) split by kind.

	Stability Level:ALPHA
	Type: Counter
	Labels:groupresourceComponents:kube-apiserver (/metrics)

	etcd_lease_object_counts
	Number of objects attached to a single etcd lease.

	Stability Level:ALPHA
	Type: Histogram
	Components:kube-apiserver (/metrics)

	etcd_request_duration_seconds
	Etcd request latency in seconds for each operation and object type.

	Stability Level:ALPHA
	Type: Histogram
	Labels:groupoperationresourceComponents:kube-apiserver (/metrics)

	etcd_request_errors_total
	Etcd failed request counts for each operation and object type.

	Stability Level:ALPHA
	Type: Counter
	Labels:groupoperationresourceComponents:kube-apiserver (/metrics)

	etcd_requests_total
	Etcd request counts for each operation and object type.

	Stability Level:ALPHA
	Type: Counter
	Labels:groupoperationresourceComponents:kube-apiserver (/metrics)

	field_validation_request_duration_seconds
	Response latency distribution in seconds for each field validation value

	Stability Level:ALPHA
	Type: Histogram
	Labels:field_validationComponents:kube-apiserver (/metrics)

	force_cleaned_failed_volume_operation_errors_total
	The number of volumes that failed force cleanup after their reconstruction failed during kubelet startup.

	Stability Level:ALPHA
	Type: Counter
	Components:kubelet (/metrics)

	force_cleaned_failed_volume_operations_total
	The number of volumes that were force cleaned after their reconstruction failed during kubelet startup. This includes both successful and failed cleanups.

	Stability Level:ALPHA
	Type: Counter
	Components:kubelet (/metrics)

	garbagecollector_controller_resources_sync_error_total
	Number of garbage collector resources sync errors

	Stability Level:ALPHA
	Type: Counter
	Components:kube-controller-manager (/metrics)

	horizontal_pod_autoscaler_controller_desired_replicas
	Current desired replica count for HPA objects.

	Stability Level:ALPHA
	Type: Gauge
	Labels:hpa_namenamespaceComponents:kube-controller-manager (/metrics)

	horizontal_pod_autoscaler_controller_num_horizontal_pod_autoscalers
	Current number of controlled HPA objects.

	Stability Level:ALPHA
	Type: Gauge
	Components:kube-controller-manager (/metrics)

	horizontal_pod_autoscaler_controller_stale_sync_skips_total
	Total number of HPA syncs skipped due to a stale watch cache.

	Stability Level:ALPHA
	Type: Counter
	Labels:groupresourceComponents:kube-controller-manager (/metrics)

	informer_processing_latency_seconds
	Time taken to process events after popping from the queue.

	Stability Level:ALPHA
	Type: Histogram
	Labels:groupnameresourceversionComponents:cloud-controller-manager (/metrics)kube-apiserver (/metrics)kube-controller-manager (/metrics)kube-proxy (/metrics)kube-scheduler (/metrics)kubelet (/metrics)

	informer_queued_items
	Number of items currently queued in the FIFO.

	Stability Level:ALPHA
	Type: Gauge
	Labels:groupnameresourceversionComponents:cloud-controller-manager (/metrics)kube-apiserver (/metrics)kube-controller-manager (/metrics)kube-proxy (/metrics)kube-scheduler (/metrics)kubelet (/metrics)

	informer_store_resource_version
	The 15 least significant digits of the resource version of the store.

	Stability Level:ALPHA
	Type: Gauge
	Labels:groupnameresourceversionComponents:cloud-controller-manager (/metrics)kube-apiserver (/metrics)kube-controller-manager (/metrics)kube-proxy (/metrics)kube-scheduler (/metrics)kubelet (/metrics)

	job_controller_job_finished_indexes_total
	`The number of finished indexes. Possible values for the, 			status label are: "succeeded", "failed". Possible values for the, 			backoffLimit label are: "perIndex" and "global"`

	Stability Level:ALPHA
	Type: Counter
	Labels:backoffLimitstatusComponents:kube-controller-manager (/metrics)

	job_controller_job_pods_creation_total
	`The number of Pods created by the Job controller labelled with a reason for the Pod creation., This metric also distinguishes between Pods created using different PodReplacementPolicy settings., Possible values of the "reason" label are:, "new", "recreate_terminating_or_failed", "recreate_failed"., Possible values of the "status" label are:, "succeeded", "failed".`

	Stability Level:ALPHA
	Type: Counter
	Labels:reasonstatusComponents:kube-controller-manager (/metrics)

	job_controller_jobs_by_external_controller_total
	The number of Jobs managed by an external controller

	Stability Level:ALPHA
	Type: Counter
	Labels:controller_nameComponents:kube-controller-manager (/metrics)

	job_controller_stale_sync_skips_total
	Total number of Job syncs skipped due to a stale watch cache.

	Stability Level:ALPHA
	Type: Counter
	Labels:groupresourceComponents:kube-controller-manager (/metrics)

	kube_apiserver_clusterip_allocator_allocated_ips
	Gauge measuring the number of allocated IPs for Services

	Stability Level:ALPHA
	Type: Gauge
	Labels:cidrComponents:kube-apiserver (/metrics)

	kube_apiserver_clusterip_allocator_allocation_duration_seconds
	Duration in seconds to allocate a Cluster IP by ServiceCIDR

	Stability Level:ALPHA
	Type: Histogram
	Labels:cidrComponents:kube-apiserver (/metrics)

	kube_apiserver_clusterip_allocator_allocation_errors_total
	Number of errors trying to allocate Cluster IPs

	Stability Level:ALPHA
	Type: Counter
	Labels:cidrscopeComponents:kube-apiserver (/metrics)

	kube_apiserver_clusterip_allocator_allocation_total
	Number of Cluster IPs allocations

	Stability Level:ALPHA
	Type: Counter
	Labels:cidrscopeComponents:kube-apiserver (/metrics)

	kube_apiserver_clusterip_allocator_available_ips
	Gauge measuring the number of available IPs for Services

	Stability Level:ALPHA
	Type: Gauge
	Labels:cidrComponents:kube-apiserver (/metrics)

	kube_apiserver_nodeport_allocator_allocated_ports
	Gauge measuring the number of allocated NodePorts for Services

	Stability Level:ALPHA
	Type: Gauge
	Components:kube-apiserver (/metrics)

	kube_apiserver_nodeport_allocator_allocation_errors_total
	Number of errors trying to allocate NodePort

	Stability Level:ALPHA
	Type: Counter
	Labels:scopeComponents:kube-apiserver (/metrics)

	kube_apiserver_nodeport_allocator_allocation_total
	Number of NodePort allocations

	Stability Level:ALPHA
	Type: Counter
	Labels:scopeComponents:kube-apiserver (/metrics)

	kube_apiserver_nodeport_allocator_available_ports
	Gauge measuring the number of available NodePorts for Services

	Stability Level:ALPHA
	Type: Gauge
	Components:kube-apiserver (/metrics)

	kube_apiserver_pod_logs_backend_tls_failure_total
	Total number of requests for pods/logs that failed due to kubelet server TLS verification

	Stability Level:ALPHA
	Type: Counter
	Components:kube-apiserver (/metrics)

	kube_apiserver_pod_logs_insecure_backend_total
	Total number of requests for pods/logs sliced by usage type: enforce_tls, skip_tls_allowed, skip_tls_denied

	Stability Level:ALPHA
	Type: Counter
	Labels:usageComponents:kube-apiserver (/metrics)

	kubelet_active_pods
	The number of pods the kubelet considers active and which are being considered when admitting new pods. static is true if the pod is not from the apiserver.

	Stability Level:ALPHA
	Type: Gauge
	Labels:staticComponents:kubelet (/metrics)

	kubelet_admission_rejections_total
	Cumulative number pod admission rejections by the Kubelet.

	Stability Level:ALPHA
	Type: Counter
	Labels:reasonComponents:kubelet (/metrics)

	kubelet_certificate_manager_client_expiration_renew_errors
	Counter of certificate renewal errors.

	Stability Level:ALPHA
	Type: Counter
	Components:kubelet (/metrics)

	kubelet_certificate_manager_client_ttl_seconds
	Gauge of the TTL (time-to-live) of the Kubelet's client certificate. The value is in seconds until certificate expiry (negative if already expired). If client certificate is invalid or unused, the value will be +INF.

	Stability Level:ALPHA
	Type: Gauge
	Components:kubelet (/metrics)

	kubelet_certificate_manager_server_rotation_seconds
	Histogram of the number of seconds the previous certificate lived before being rotated.

	Stability Level:ALPHA
	Type: Histogram
	Components:kubelet (/metrics)

	kubelet_certificate_manager_server_ttl_seconds
	Gauge of the shortest TTL (time-to-live) of the Kubelet's serving certificate. The value is in seconds until certificate expiry (negative if already expired). If serving certificate is invalid or unused, the value will be +INF.

	Stability Level:ALPHA
	Type: Gauge
	Components:kubelet (/metrics)

	kubelet_cgroup_manager_duration_seconds
	Duration in seconds for cgroup manager operations. Broken down by method.

	Stability Level:ALPHA
	Type: Histogram
	Labels:operation_typeComponents:kubelet (/metrics)

	kubelet_cgroup_version
	cgroup version on the hosts.

	Stability Level:ALPHA
	Type: Gauge
	Components:kubelet (/metrics)

	kubelet_container_aligned_compute_resources_count
	Cumulative number of aligned compute resources allocated to containers by alignment type.

	Stability Level:ALPHA
	Type: Counter
	Labels:boundaryscopeComponents:kubelet (/metrics)

	kubelet_container_aligned_compute_resources_failure_count
	Cumulative number of failures to allocate aligned compute resources to containers by alignment type.

	Stability Level:ALPHA
	Type: Counter
	Labels:boundaryscopeComponents:kubelet (/metrics)

	kubelet_container_log_filesystem_used_bytes
	Bytes used by the container's logs on the filesystem.

	Stability Level:ALPHA
	Type: Custom
	Labels:uidnamespacepodcontainerComponents:kubelet (/metrics)

	kubelet_container_requested_resizes_total
	Number of requested resizes, counted at the container level. Different resources on the same container are counted separately. The 'requirement' label refers to 'memory' or 'limits'; the 'operation' label can be one of 'add', 'remove', 'increase' or 'decrease'.

	Stability Level:ALPHA
	Type: Counter
	Labels:operationrequirementresourceComponents:kubelet (/metrics)

	kubelet_containers_per_pod_count
	The number of containers per pod.

	Stability Level:ALPHA
	Type: Histogram
	Components:kubelet (/metrics)

	kubelet_cpu_manager_allocation_per_numa
	Number of CPUs allocated per NUMA node

	Stability Level:ALPHA
	Type: Gauge
	Labels:numa_nodeComponents:kubelet (/metrics)

	kubelet_cpu_manager_exclusive_cpu_allocation_count
	The total number of CPUs exclusively allocated to containers running on this node

	Stability Level:ALPHA
	Type: Gauge
	Components:kubelet (/metrics)

	kubelet_cpu_manager_pinning_errors_total
	The number of cpu core allocations which required pinning failed.

	Stability Level:ALPHA
	Type: Counter
	Components:kubelet (/metrics)

	kubelet_cpu_manager_pinning_requests_total
	The number of cpu core allocations which required pinning.

	Stability Level:ALPHA
	Type: Counter
	Components:kubelet (/metrics)

	kubelet_cpu_manager_shared_pool_size_millicores
	The size of the shared CPU pool for non-guaranteed QoS pods, in millicores.

	Stability Level:ALPHA
	Type: Gauge
	Components:kubelet (/metrics)

	kubelet_credential_provider_config_info
	Information about the last applied credential provider configuration with hash as label
