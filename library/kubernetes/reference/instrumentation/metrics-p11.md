---
title: "Kubernetes Metrics Reference (part 11 of 13)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/instrumentation/metrics.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Kubernetes Metrics Reference (part 11 of 13)

node_collector_update_node_health_duration_seconds
	Duration in seconds for NodeController to update the health of a single node.

	Stability Level:ALPHA
	Type: Histogram
	Components:kube-controller-manager (/metrics)

	node_collector_zone_health
	Gauge measuring percentage of healthy nodes per zone.

	Stability Level:ALPHA
	Type: Gauge
	Labels:zoneComponents:kube-controller-manager (/metrics)

	node_collector_zone_size
	Gauge measuring number of registered Nodes per zones.

	Stability Level:ALPHA
	Type: Gauge
	Labels:zoneComponents:kube-controller-manager (/metrics)

	node_controller_cloud_provider_taint_removal_delay_seconds
	Number of seconds after node creation when NodeController removed the cloud-provider taint of a single node.

	Stability Level:ALPHA
	Type: Histogram
	Components:cloud-controller-manager (/metrics)

	node_controller_initial_node_sync_delay_seconds
	Number of seconds after node creation when NodeController finished the initial synchronization of a single node.

	Stability Level:ALPHA
	Type: Histogram
	Components:cloud-controller-manager (/metrics)

	node_ipam_controller_cidrset_allocation_tries_per_request
	Number of endpoints added on each Service sync

	Stability Level:ALPHA
	Type: Histogram
	Labels:clusterCIDRComponents:kube-controller-manager (/metrics)

	node_ipam_controller_cidrset_cidrs_allocations_total
	Counter measuring total number of CIDR allocations.

	Stability Level:ALPHA
	Type: Counter
	Labels:clusterCIDRComponents:kube-controller-manager (/metrics)

	node_ipam_controller_cidrset_cidrs_releases_total
	Counter measuring total number of CIDR releases.

	Stability Level:ALPHA
	Type: Counter
	Labels:clusterCIDRComponents:kube-controller-manager (/metrics)

	node_ipam_controller_cidrset_usage_cidrs
	Gauge measuring percentage of allocated CIDRs.

	Stability Level:ALPHA
	Type: Gauge
	Labels:clusterCIDRComponents:kube-controller-manager (/metrics)

	node_ipam_controller_cirdset_max_cidrs
	Maximum number of CIDRs that can be allocated.

	Stability Level:ALPHA
	Type: Gauge
	Labels:clusterCIDRComponents:kube-controller-manager (/metrics)

	node_swap_usage_bytes
	Current swap usage of the node in bytes. Reported only on non-windows systems

	Stability Level:ALPHA
	Type: Custom
	Components:kubelet (/metrics/resource)

	plugin_manager_total_plugins
	Number of plugins in Plugin Manager

	Stability Level:ALPHA
	Type: Custom
	Labels:socket_pathstateComponents:kubelet (/metrics)

	pod_gc_collector_force_delete_pod_errors_total
	Number of errors encountered when forcefully deleting the pods since the Pod GC Controller started.

	Stability Level:ALPHA
	Type: Counter
	Labels:namespacereasonComponents:kube-controller-manager (/metrics)

	pod_gc_collector_force_delete_pods_total
	Number of pods that are being forcefully deleted since the Pod GC Controller started.

	Stability Level:ALPHA
	Type: Counter
	Labels:namespacereasonComponents:kube-controller-manager (/metrics)

	pod_security_errors_total
	Number of errors preventing normal evaluation. Non-fatal errors may result in the latest restricted profile being used for evaluation.

	Stability Level:ALPHA
	Type: Counter
	Labels:fatalrequest_operationresourcesubresourceComponents:kube-apiserver (/metrics)

	pod_security_evaluations_total
	Number of policy evaluations that occurred, not counting ignored or exempt requests.

	Stability Level:ALPHA
	Type: Counter
	Labels:decisionmodepolicy_levelpolicy_versionrequest_operationresourcesubresourceComponents:kube-apiserver (/metrics)

	pod_security_exemptions_total
	Number of exempt requests, not counting ignored or out of scope requests.

	Stability Level:ALPHA
	Type: Counter
	Labels:request_operationresourcesubresourceComponents:kube-apiserver (/metrics)

	pod_swap_usage_bytes
	Current amount of the pod swap usage in bytes. Reported only on non-windows systems

	Stability Level:ALPHA
	Type: Custom
	Labels:podnamespaceComponents:kubelet (/metrics/resource)

	prober_probe_duration_seconds
	Duration in seconds for a probe response.

	Stability Level:ALPHA
	Type: Histogram
	Labels:containernamespacepodprobe_typeComponents:kubelet (/metrics/probes)

	pv_collector_bound_pv_count
	Gauge measuring number of persistent volume currently bound

	Stability Level:ALPHA
	Type: Custom
	Labels:storage_classComponents:kube-controller-manager (/metrics)

	pv_collector_bound_pvc_count
	Gauge measuring number of persistent volume claim currently bound

	Stability Level:ALPHA
	Type: Custom
	Labels:namespacestorage_classvolume_attributes_classComponents:kube-controller-manager (/metrics)

	pv_collector_total_pv_count
	Gauge measuring total number of persistent volumes

	Stability Level:ALPHA
	Type: Custom
	Labels:plugin_namevolume_modeComponents:kube-controller-manager (/metrics)

	pv_collector_unbound_pv_count
	Gauge measuring number of persistent volume currently unbound

	Stability Level:ALPHA
	Type: Custom
	Labels:storage_classComponents:kube-controller-manager (/metrics)

	pv_collector_unbound_pvc_count
	Gauge measuring number of persistent volume claim currently unbound

	Stability Level:ALPHA
	Type: Custom
	Labels:namespacestorage_classvolume_attributes_classComponents:kube-controller-manager (/metrics)

	reconstruct_volume_operations_errors_total
	The number of volumes that failed reconstruction from the operating system during kubelet startup.

	Stability Level:ALPHA
	Type: Counter
	Components:kubelet (/metrics)

	reconstruct_volume_operations_total
	The number of volumes that were attempted to be reconstructed from the operating system during kubelet startup. This includes both successful and failed reconstruction.

	Stability Level:ALPHA
	Type: Counter
	Components:kubelet (/metrics)

	replicaset_controller_sorting_deletion_age_ratio
	The ratio of chosen deleted pod's ages to the current youngest pod's age (at the time). Should be <2. The intent of this metric is to measure the rough efficacy of the sorting (and deletion) of pods when a replicaset scales down. This only considers Ready pods when calculating and reporting.

	Stability Level:ALPHA
	Type: Histogram
	Components:kube-controller-manager (/metrics)

	replicaset_controller_stale_sync_skips_total
	Total number of ReplicaSet syncs skipped due to a stale watch cache.

	Stability Level:ALPHA
	Type: Counter
	Labels:groupresourceComponents:kube-controller-manager (/metrics)

	resourcepoolstatusrequest_controller_request_processing_duration_seconds
	Time taken to process a ResourcePoolStatusRequest

	Stability Level:ALPHA
	Type: Histogram
	Labels:driver_nameComponents:kube-controller-manager (/metrics)

	resourcepoolstatusrequest_controller_request_processing_errors_total
	Total number of errors encountered while processing ResourcePoolStatusRequests

	Stability Level:ALPHA
	Type: Counter
	Labels:driver_nameComponents:kube-controller-manager (/metrics)

	resourcepoolstatusrequest_controller_requests_processed_total
	Total number of ResourcePoolStatusRequests processed

	Stability Level:ALPHA
	Type: Counter
	Labels:driver_nameComponents:kube-controller-manager (/metrics)

	rest_client_dns_resolution_duration_seconds
	DNS resolver latency in seconds. Broken down by host.

	Stability Level:ALPHA
	Type: Histogram
	Labels:hostComponents:cloud-controller-manager (/metrics)kube-apiserver (/metrics)kube-controller-manager (/metrics)kube-proxy (/metrics)kube-scheduler (/metrics)kubelet (/metrics)

	rest_client_exec_plugin_call_total
	Number of calls to an exec plugin, partitioned by the type of event encountered (no_error, plugin_execution_error, plugin_not_found_error, client_internal_error) and an optional exit code. The exit code will be set to 0 if and only if the plugin call was successful.

	Stability Level:ALPHA
	Type: Counter
	Labels:call_statuscodeComponents:cloud-controller-manager (/metrics)kube-apiserver (/metrics)kube-controller-manager (/metrics)kube-proxy (/metrics)kube-scheduler (/metrics)kubelet (/metrics)

	rest_client_exec_plugin_certificate_rotation_age
	Histogram of the number of seconds the last auth exec plugin client certificate lived before being rotated. If auth exec plugin client certificates are unused, histogram will contain no data.

	Stability Level:ALPHA
	Type: Histogram
	Components:cloud-controller-manager (/metrics)kube-apiserver (/metrics)kube-controller-manager (/metrics)kube-proxy (/metrics)kube-scheduler (/metrics)kubelet (/metrics)

	rest_client_exec_plugin_policy_call_total
	Number of comparisons of an exec plugin to the plugin policy and allowlist (if any), partitioned by whether or not the policy permits the plugin

	Stability Level:ALPHA
	Type: Counter
	Labels:alloweddeniedComponents:cloud-controller-manager (/metrics)kube-apiserver (/metrics)kube-controller-manager (/metrics)kube-proxy (/metrics)kube-scheduler (/metrics)kubelet (/metrics)

	rest_client_exec_plugin_ttl_seconds
	Gauge of the shortest TTL (time-to-live) of the client certificate(s) managed by the auth exec plugin. The value is in seconds until certificate expiry (negative if already expired). If auth exec plugins are unused or manage no TLS certificates, the value will be +INF.

	Stability Level:ALPHA
	Type: Gauge
	Components:cloud-controller-manager (/metrics)kube-apiserver (/metrics)kube-controller-manager (/metrics)kube-proxy (/metrics)kube-scheduler (/metrics)kubelet (/metrics)

	rest_client_rate_limiter_duration_seconds
	Client side rate limiter latency in seconds. Broken down by verb, and host.

	Stability Level:ALPHA
	Type: Histogram
	Labels:hostverbComponents:cloud-controller-manager (/metrics)kube-apiserver (/metrics)kube-controller-manager (/metrics)kube-proxy (/metrics)kube-scheduler (/metrics)kubelet (/metrics)

	rest_client_request_duration_seconds
	Request latency in seconds. Broken down by verb, and host.

	Stability Level:ALPHA
	Type: Histogram
	Labels:hostverbComponents:cloud-controller-manager (/metrics)kube-apiserver (/metrics)kube-controller-manager (/metrics)kube-proxy (/metrics)kube-scheduler (/metrics)kubelet (/metrics)

	rest_client_request_retries_total
	Number of request retries, partitioned by status code, verb, and host.

	Stability Level:ALPHA
	Type: Counter
	Labels:codehostverbComponents:cloud-controller-manager (/metrics)kube-apiserver (/metrics)kube-controller-manager (/metrics)kube-proxy (/metrics)kube-scheduler (/metrics)kubelet (/metrics)

	rest_client_request_size_bytes
	Request size in bytes. Broken down by verb and host.

	Stability Level:ALPHA
	Type: Histogram
	Labels:hostverbComponents:cloud-controller-manager (/metrics)kube-apiserver (/metrics)kube-controller-manager (/metrics)kube-proxy (/metrics)kube-scheduler (/metrics)kubelet (/metrics)

	rest_client_requests_total
	Number of HTTP requests, partitioned by status code, method, and host.

	Stability Level:ALPHA
	Type: Counter
	Labels:codehostmethodComponents:cloud-controller-manager (/metrics)kube-apiserver (/metrics)kube-controller-manager (/metrics)kube-proxy (/metrics)kube-scheduler (/metrics)kubelet (/metrics)

	rest_client_response_size_bytes
	Response size in bytes. Broken down by verb and host.

	Stability Level:ALPHA
	Type: Histogram
	Labels:hostverbComponents:cloud-controller-manager (/metrics)kube-apiserver (/metrics)kube-controller-manager (/metrics)kube-proxy (/metrics)kube-scheduler (/metrics)kubelet (/metrics)

	rest_client_transport_ca_reload_total
	Number of times a CA reload is attempted, partitioned by the result and reason for the reload attempt

	Stability Level:ALPHA
	Type: Counter
	Labels:reasonresultComponents:cloud-controller-manager (/metrics)kube-apiserver (/metrics)kube-controller-manager (/metrics)kube-proxy (/metrics)kube-scheduler (/metrics)kubelet (/metrics)

	rest_client_transport_cache_entries
	Number of transport entries in the internal cache.

	Stability Level:ALPHA
	Type: Gauge
	Components:cloud-controller-manager (/metrics)kube-apiserver (/metrics)kube-controller-manager (/metrics)kube-proxy (/metrics)kube-scheduler (/metrics)kubelet (/metrics)

	rest_client_transport_cache_gc_calls_total
	Number of times a GC cleanup attempts to delete a transport cache entry, partitioned by the result: deleted, skipped

	Stability Level:ALPHA
	Type: Counter
	Labels:resultComponents:cloud-controller-manager (/metrics)kube-apiserver (/metrics)kube-controller-manager (/metrics)kube-proxy (/metrics)kube-scheduler (/metrics)kubelet (/metrics)

	rest_client_transport_cert_rotation_gc_calls_total
	Number of times a cert rotation goroutine cancel func is called via GC cleanup of the associated transport

	Stability Level:ALPHA
	Type: Counter
	Components:cloud-controller-manager (/metrics)kube-apiserver (/metrics)kube-controller-manager (/metrics)kube-proxy (/metrics)kube-scheduler (/metrics)kubelet (/metrics)

	rest_client_transport_create_calls_total
	Number of calls to get a new transport, partitioned by the result of the operation hit: obtained from the cache, miss: created and added to the cache, miss-gc: recreated and added back to the cache after being garbage collected, uncacheable: created and not cached

	Stability Level:ALPHA
	Type: Counter
	Labels:resultComponents:cloud-controller-manager (/metrics)kube-apiserver (/metrics)kube-controller-manager (/metrics)kube-proxy (/metrics)kube-scheduler (/metrics)kubelet (/metrics)

	retroactive_storageclass_errors_total
	Total number of failed retroactive StorageClass assignments to persistent volume claim

	Stability Level:ALPHA
	Type: Counter
	Components:kube-controller-manager (/metrics)

	retroactive_storageclass_total
	Total number of retroactive StorageClass assignments to persistent volume claim

	Stability Level:ALPHA
	Type: Counter
	Components:kube-controller-manager (/metrics)

	root_ca_cert_publisher_sync_duration_seconds
	Number of namespace syncs happened in root ca cert publisher.

	Stability Level:ALPHA
	Type: Histogram
	Labels:codeComponents:kube-controller-manager (/metrics)

	root_ca_cert_publisher_sync_total
	Number of namespace syncs happened in root ca cert publisher.

	Stability Level:ALPHA
	Type: Counter
	Labels:codeComponents:kube-controller-manager (/metrics)

	route_controller_route_sync_total
	A metric counting the number of route reconciles with the cloud provider, labeled by the trigger (periodic or node_change) and the outcome (error if the reconcile failed, changed if at least one route was created or deleted, otherwise noop).

	Stability Level:ALPHA
	Type: Counter
	Labels:outcometriggerComponents:cloud-controller-manager (/metrics)

	scheduler_async_api_call_execution_duration_seconds
	Duration in seconds for executing API call in the async dispatcher.

	Stability Level:ALPHA
	Type: Histogram
	Labels:call_typeresultComponents:kube-scheduler (/metrics)

	scheduler_async_api_call_execution_total
	Total number of API calls executed by the async dispatcher.

	Stability Level:ALPHA
	Type: Counter
	Labels:call_typeresultComponents:kube-scheduler (/metrics)

	scheduler_batch_attempts_total
	Counts of results when we attempt to use batching.
