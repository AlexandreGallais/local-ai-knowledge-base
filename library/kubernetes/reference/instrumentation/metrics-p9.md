---
title: "Kubernetes Metrics Reference (part 9 of 13)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/instrumentation/metrics.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Kubernetes Metrics Reference (part 9 of 13)

Stability Level:ALPHA
	Type: Custom
	Labels:hashComponents:kubelet (/metrics)

	kubelet_credential_provider_plugin_duration
	Duration of execution in seconds for credential <example-value> plugin

	Stability Level:ALPHA
	Type: Histogram
	Labels:plugin_nameComponents:kubelet (/metrics)

	kubelet_credential_provider_plugin_errors_total
	Number of errors from credential <example-value> plugin

	Stability Level:ALPHA
	Type: Counter
	Labels:plugin_nameComponents:kubelet (/metrics)

	kubelet_cri_losing_support
	the Kubernetes version that the currently running CRI implementation will lose support on if not upgraded.

	Stability Level:ALPHA
	Type: Gauge
	Labels:versionComponents:kubelet (/metrics)

	kubelet_desired_pods
	The number of pods the kubelet is being instructed to run. static is true if the pod is not from the apiserver.

	Stability Level:ALPHA
	Type: Gauge
	Labels:staticComponents:kubelet (/metrics)

	kubelet_device_plugin_alloc_duration_seconds
	Duration in seconds to serve a device plugin Allocation request. Broken down by resource name.

	Stability Level:ALPHA
	Type: Histogram
	Labels:resource_nameComponents:kubelet (/metrics)

	kubelet_device_plugin_registration_total
	Cumulative number of device plugin registrations. Broken down by resource name.

	Stability Level:ALPHA
	Type: Counter
	Labels:resource_nameComponents:kubelet (/metrics)

	kubelet_evented_pleg_connection_error_count
	The number of errors encountered during the establishment of streaming connection with the CRI runtime.

	Stability Level:ALPHA
	Type: Counter
	Components:kubelet (/metrics)

	kubelet_evented_pleg_connection_latency_seconds
	The latency of streaming connection with the CRI runtime, measured in seconds.

	Stability Level:ALPHA
	Type: Histogram
	Components:kubelet (/metrics)

	kubelet_evented_pleg_connection_success_count
	The number of times a streaming client was obtained to receive CRI Events.

	Stability Level:ALPHA
	Type: Counter
	Components:kubelet (/metrics)

	kubelet_eviction_stats_age_seconds
	Time between when stats are collected, and when pod is evicted based on those stats by eviction signal

	Stability Level:ALPHA
	Type: Histogram
	Labels:eviction_signalComponents:kubelet (/metrics)

	kubelet_evictions
	Cumulative number of pod evictions by eviction signal

	Stability Level:ALPHA
	Type: Counter
	Labels:eviction_signalComponents:kubelet (/metrics)

	kubelet_graceful_shutdown_end_time_seconds
	Last graceful shutdown end time since unix epoch in seconds

	Stability Level:ALPHA
	Type: Gauge
	Components:kubelet (/metrics)

	kubelet_graceful_shutdown_start_time_seconds
	Last graceful shutdown start time since unix epoch in seconds

	Stability Level:ALPHA
	Type: Gauge
	Components:kubelet (/metrics)

	kubelet_http_inflight_requests
	Number of the inflight http requests

	Stability Level:ALPHA
	Type: Gauge
	Labels:long_runningmethodpathserver_typeComponents:kubelet (/metrics)

	kubelet_http_requests_duration_seconds
	Duration in seconds to serve http requests

	Stability Level:ALPHA
	Type: Histogram
	Labels:long_runningmethodpathserver_typeComponents:kubelet (/metrics)

	kubelet_http_requests_total
	Number of the http requests received since the server started

	Stability Level:ALPHA
	Type: Counter
	Labels:long_runningmethodpathserver_typeComponents:kubelet (/metrics)

	kubelet_image_garbage_collected_total
	Total number of images garbage collected by the kubelet, whether through disk usage or image age.

	Stability Level:ALPHA
	Type: Counter
	Labels:reasonComponents:kubelet (/metrics)

	kubelet_image_manager_ensure_image_requests_total
	Number of ensure-image requests processed by the kubelet.

	Stability Level:ALPHA
	Type: Counter
	Labels:present_locallypull_policypull_requiredComponents:kubelet (/metrics)

	kubelet_image_pull_duration_seconds
	Duration in seconds to pull an image.

	Stability Level:ALPHA
	Type: Histogram
	Labels:image_size_in_bytesComponents:kubelet (/metrics)

	kubelet_imagemanager_image_mustpull_checks_total
	Counter for how many times kubelet checked whether credentials need to be re-verified to access an image

	Stability Level:ALPHA
	Type: Counter
	Labels:resultComponents:kubelet (/metrics)

	kubelet_imagemanager_inmemory_pulledrecords_usage_percent
	The ImagePulledRecords in-memory cache usage in percent.

	Stability Level:ALPHA
	Type: Gauge
	Components:kubelet (/metrics)

	kubelet_imagemanager_inmemory_pullintents_usage_percent
	The ImagePullIntents in-memory cache usage in percent.

	Stability Level:ALPHA
	Type: Gauge
	Components:kubelet (/metrics)

	kubelet_imagemanager_ondisk_pulledrecords
	Number of ImagePulledRecords stored on disk.

	Stability Level:ALPHA
	Type: Gauge
	Components:kubelet (/metrics)

	kubelet_imagemanager_ondisk_pullintents
	Number of ImagePullIntents stored on disk.

	Stability Level:ALPHA
	Type: Gauge
	Components:kubelet (/metrics)

	kubelet_lifecycle_handler_http_fallbacks_total
	The number of times lifecycle handlers successfully fell back to http from https.

	Stability Level:ALPHA
	Type: Counter
	Components:kubelet (/metrics)

	kubelet_managed_ephemeral_containers
	Current number of ephemeral containers in pods managed by this kubelet.

	Stability Level:ALPHA
	Type: Gauge
	Components:kubelet (/metrics)

	kubelet_memory_manager_pinning_errors_total
	The number of memory pages allocations which required pinning that failed.

	Stability Level:ALPHA
	Type: Counter
	Components:kubelet (/metrics)

	kubelet_memory_manager_pinning_requests_total
	The number of memory pages allocations which required pinning.

	Stability Level:ALPHA
	Type: Counter
	Components:kubelet (/metrics)

	kubelet_memory_qos_node_memory_low_bytes
	Total cgroup v2 memory.low in bytes for Burstable pods. This memory is soft-reserved and may be reclaimed under extreme pressure.

	Stability Level:ALPHA
	Type: Gauge
	Components:kubelet (/metrics)

	kubelet_memory_qos_node_memory_min_bytes
	Total cgroup v2 memory.min in bytes for Guaranteed pods. This memory is hard-reserved and never reclaimed by the kernel.

	Stability Level:ALPHA
	Type: Gauge
	Components:kubelet (/metrics)

	kubelet_metrics_provider
	Metrics provider used by kubelet to collect container stats. Values can be 'cadvisor' and 'cri'

	Stability Level:ALPHA
	Type: Gauge
	Labels:providerComponents:kubelet (/metrics)

	kubelet_mirror_pods
	The number of mirror pods the kubelet will try to create (one per admitted static pod)

	Stability Level:ALPHA
	Type: Gauge
	Components:kubelet (/metrics)

	kubelet_node_name
	The node's name. The count is always 1.

	Stability Level:ALPHA
	Type: Gauge
	Labels:nodeComponents:kubelet (/metrics)

	kubelet_node_startup_duration_seconds
	Duration in seconds of node startup in total.

	Stability Level:ALPHA
	Type: Gauge
	Components:kubelet (/metrics)

	kubelet_node_startup_post_registration_duration_seconds
	Duration in seconds of node startup after registration.

	Stability Level:ALPHA
	Type: Gauge
	Components:kubelet (/metrics)

	kubelet_node_startup_pre_kubelet_duration_seconds
	Duration in seconds of node startup before kubelet starts.

	Stability Level:ALPHA
	Type: Gauge
	Components:kubelet (/metrics)

	kubelet_node_startup_pre_registration_duration_seconds
	Duration in seconds of node startup before registration.

	Stability Level:ALPHA
	Type: Gauge
	Components:kubelet (/metrics)

	kubelet_node_startup_registration_duration_seconds
	Duration in seconds of node startup during registration.

	Stability Level:ALPHA
	Type: Gauge
	Components:kubelet (/metrics)

	kubelet_orphan_pod_cleaned_volumes
	The total number of orphaned Pods whose volumes were cleaned in the last periodic sweep.

	Stability Level:ALPHA
	Type: Gauge
	Components:kubelet (/metrics)

	kubelet_orphan_pod_cleaned_volumes_errors
	The number of orphaned Pods whose volumes failed to be cleaned in the last periodic sweep.

	Stability Level:ALPHA
	Type: Gauge
	Components:kubelet (/metrics)

	kubelet_orphaned_runtime_pods_total
	Number of pods that have been detected in the container runtime without being already known to the pod worker. This typically indicates the kubelet was restarted while a pod was force deleted in the API or in the local configuration, which is unusual.

	Stability Level:ALPHA
	Type: Counter
	Components:kubelet (/metrics)

	kubelet_pleg_discard_events
	The number of discard events in PLEG.

	Stability Level:ALPHA
	Type: Counter
	Components:kubelet (/metrics)

	kubelet_pleg_last_seen_seconds
	Timestamp in seconds when PLEG was last seen active.

	Stability Level:ALPHA
	Type: Gauge
	Components:kubelet (/metrics)

	kubelet_pleg_pod_relist_duration_seconds
	Duration in seconds for relisting a single pod in PLEG.

	Stability Level:ALPHA
	Type: Histogram
	Components:kubelet (/metrics)

	kubelet_pleg_relist_duration_seconds
	Duration in seconds for relisting pods in PLEG.

	Stability Level:ALPHA
	Type: Histogram
	Components:kubelet (/metrics)

	kubelet_pleg_relist_interval_seconds
	Interval in seconds between relisting in PLEG.

	Stability Level:ALPHA
	Type: Histogram
	Components:kubelet (/metrics)

	kubelet_pod_deferred_accepted_resizes_total
	Cumulative number of resizes that were accepted after being deferred.

	Stability Level:ALPHA
	Type: Counter
	Labels:retry_triggerComponents:kubelet (/metrics)

	kubelet_pod_deferred_resize_duration_seconds
	Duration in seconds that a pod resize remains deferred before completion. Label 'priority_bucket' classifies the pod priority (system-critical: >=2000000000, high: 100000..1999999999, medium: 1..99999, normal: 0/default, low: -999..-1, very-low: <=-1000, unknown: nil pod). Label 'resolution' describes how the deferred resize was resolved (accepted, reverted, terminated).

	Stability Level:ALPHA
	Type: Histogram
	Labels:priority_bucketresolutionComponents:kubelet (/metrics)

	kubelet_pod_in_progress_resizes
	Number of in-progress resizes for pods.

	Stability Level:ALPHA
	Type: Gauge
	Components:kubelet (/metrics)

	kubelet_pod_infeasible_resizes_total
	Number of infeasible resizes for pods.

	Stability Level:ALPHA
	Type: Counter
	Labels:reason_detailComponents:kubelet (/metrics)

	kubelet_pod_level_resources_admission_total
	Total number of pods admitted during Kubelet admission, categorized by resource configuration mode (pod_and_container_level, pod_level, container_level, or empty for unconfigured/BestEffort) and QoS class.

	Stability Level:ALPHA
	Type: Counter
	Labels:config_modeqos_classComponents:kubelet (/metrics)

	kubelet_pod_pending_resizes
	Number of pending resizes for pods. Label 'priority_bucket' classifies the pod priority (system-critical: >=2000000000, high: 100000..1999999999, medium: 1..99999, normal: 0/default, low: -999..-1, very-low: <=-1000, unknown: nil pod). Label 'reason' describes the state (deferred, infeasible).

	Stability Level:ALPHA
	Type: Gauge
	Labels:priority_bucketreasonComponents:kubelet (/metrics)

	kubelet_pod_requests_get_total
	Number of requests to the PodsAPI Get endpoint. Broken down by server api version and status code.

	Stability Level:ALPHA
	Type: Counter
	Labels:server_api_versionstatus_codeComponents:kubelet (/metrics)

	kubelet_pod_requests_list_total
	Number of requests to the PodsAPI List endpoint. Broken down by server api version and status code.

	Stability Level:ALPHA
	Type: Counter
	Labels:server_api_versionstatus_codeComponents:kubelet (/metrics)

	kubelet_pod_requests_total
	Cumulative number of requests to the PodsAPI endpoint. Broken down by server api version and status code.

	Stability Level:ALPHA
	Type: Counter
	Labels:server_api_versionstatus_codeComponents:kubelet (/metrics)

	kubelet_pod_requests_watch_total
	Number of requests to the PodsAPI Watch endpoint. Broken down by server api version and status code.

	Stability Level:ALPHA
	Type: Counter
	Labels:server_api_versionstatus_codeComponents:kubelet (/metrics)

	kubelet_pod_resize_duration_milliseconds
	Duration in milliseconds to actuate a pod resize

	Stability Level:ALPHA
	Type: Histogram
	Labels:successComponents:kubelet (/metrics)

	kubelet_pod_resources_endpoint_errors_get
	Number of requests to the PodResource Get endpoint which returned error. Broken down by server api version.

	Stability Level:ALPHA
	Type: Counter
	Labels:server_api_versionComponents:kubelet (/metrics)

	kubelet_pod_resources_endpoint_errors_get_allocatable
	Number of requests to the PodResource GetAllocatableResources endpoint which returned error. Broken down by server api version.

	Stability Level:ALPHA
	Type: Counter
	Labels:server_api_versionComponents:kubelet (/metrics)

	kubelet_pod_resources_endpoint_errors_list
	Number of requests to the PodResource List endpoint which returned error. Broken down by server api version.

	Stability Level:ALPHA
	Type: Counter
	Labels:server_api_versionComponents:kubelet (/metrics)

	kubelet_pod_resources_endpoint_requests_get
	Number of requests to the PodResource Get endpoint. Broken down by server api version.

	Stability Level:ALPHA
	Type: Counter
	Labels:server_api_versionComponents:kubelet (/metrics)

	kubelet_pod_resources_endpoint_requests_get_allocatable
	Number of requests to the PodResource GetAllocatableResources endpoint. Broken down by server api version.

	Stability Level:ALPHA
	Type: Counter
	Labels:server_api_versionComponents:kubelet (/metrics)

	kubelet_pod_resources_endpoint_requests_list
	Number of requests to the PodResource List endpoint. Broken down by server api version.

	Stability Level:ALPHA
	Type: Counter
	Labels:server_api_versionComponents:kubelet (/metrics)

	kubelet_pod_resources_endpoint_requests_total
	Cumulative number of requests to the PodResource endpoint. Broken down by server api version.

	Stability Level:ALPHA
	Type: Counter
	Labels:server_api_versionComponents:kubelet (/metrics)

	kubelet_pod_start_duration_seconds
	Duration in seconds from kubelet seeing a pod for the first time to the pod starting to run

	Stability Level:ALPHA
	Type: Histogram
	Components:kubelet (/metrics)

	kubelet_pod_start_sli_duration_seconds
	Duration in seconds to start a pod, excluding time to pull images and run init containers, measured from pod creation timestamp to when all its containers are reported as started and observed via watch

	Stability Level:ALPHA
	Type: Histogram
	Components:kubelet (/metrics)

	kubelet_pod_start_total_duration_seconds
	Duration in seconds to start a pod since creation, including time to pull images and run init containers, measured from pod creation timestamp to when all its containers are reported as started and observed via watch

	Stability Level:ALPHA
	Type: Histogram
	Components:kubelet (/metrics)

	kubelet_pod_status_sync_duration_seconds
	Duration in seconds to sync a pod status update. Measures time from detection of a change to pod status until the API is successfully updated for that pod, even if multiple intevening changes to pod status occur.

	Stability Level:ALPHA
	Type: Histogram
	Components:kubelet (/metrics)
