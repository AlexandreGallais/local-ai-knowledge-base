---
title: "Kubernetes Metrics Reference (part 7 of 13)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/instrumentation/metrics.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Kubernetes Metrics Reference (part 7 of 13)

apiserver_rerouted_request_total
	`Total number of requests that were proxied to a peer kube-apiserver because the local apiserver was not capable of serving it, broken down by 'group', 'version', and 'resource' indicating the GVR of the request. If all three are empty (""), the request is a discovery request.`

	Stability Level:ALPHA
	Type: Counter
	Labels:codegroupresourceversionComponents:kube-apiserver (/metrics)

	apiserver_resource_objects
	Number of stored objects at the time of last check split by kind. In case of a fetching error, the value will be -1.

	Stability Level:ALPHA
	Type: Gauge
	Labels:groupresourceComponents:kube-apiserver (/metrics)

	apiserver_resource_size_estimate_bytes
	Estimated size of stored objects in database. Estimate is based on sum of last observed sizes of serialized objects. In case of a fetching error, the value will be -1.

	Stability Level:ALPHA
	Type: Gauge
	Labels:groupresourceComponents:kube-apiserver (/metrics)

	apiserver_selfrequest_total
	Counter of apiserver self-requests broken out for each verb, API resource and subresource.

	Stability Level:ALPHA
	Type: Counter
	Labels:groupresourcesubresourceverbComponents:kube-apiserver (/metrics)

	apiserver_storage_consistency_checks_total
	Counter for status of consistency checks between etcd and watch cache

	Stability Level:ALPHA
	Type: Counter
	Labels:groupresourcestatusComponents:kube-apiserver (/metrics)

	apiserver_storage_data_key_generation_duration_seconds
	Latencies in seconds of data encryption key(DEK) generation operations.

	Stability Level:ALPHA
	Type: Histogram
	Components:kube-apiserver (/metrics)

	apiserver_storage_data_key_generation_failures_total
	Total number of failed data encryption key(DEK) generation operations.

	Stability Level:ALPHA
	Type: Counter
	Components:kube-apiserver (/metrics)

	apiserver_storage_decode_errors_total
	Number of stored object decode errors split by object type

	Stability Level:ALPHA
	Type: Counter
	Labels:groupresourceComponents:kube-apiserver (/metrics)

	apiserver_storage_envelope_transformation_cache_misses_total
	Total number of cache misses while accessing key decryption key(KEK).

	Stability Level:ALPHA
	Type: Counter
	Components:kube-apiserver (/metrics)

	apiserver_storage_list_duration_seconds
	Latency of the storage layer GetList call in seconds, including object decode, split by whether etcd RangeStream was used.

	Stability Level:ALPHA
	Type: Histogram
	Labels:groupresourcestreamedComponents:kube-apiserver (/metrics)

	apiserver_storage_list_evaluated_objects_total
	Number of objects tested in the course of serving a LIST request from storage

	Stability Level:ALPHA
	Type: Counter
	Labels:groupresourcestorageComponents:kube-apiserver (/metrics)

	apiserver_storage_list_fetched_objects_total
	Number of objects read from storage in the course of serving a LIST request

	Stability Level:ALPHA
	Type: Counter
	Labels:groupindexresourcestorageComponents:kube-apiserver (/metrics)

	apiserver_storage_list_returned_objects_total
	Number of objects returned for a LIST request from storage

	Stability Level:ALPHA
	Type: Counter
	Labels:groupresourcestorageComponents:kube-apiserver (/metrics)

	apiserver_storage_list_total
	Number of LIST requests served from storage

	Stability Level:ALPHA
	Type: Counter
	Labels:groupindexresourcestorageComponents:kube-apiserver (/metrics)

	apiserver_storage_transformation_duration_seconds
	Latencies in seconds of value transformation operations.

	Stability Level:ALPHA
	Type: Histogram
	Labels:transformation_typetransformer_prefixComponents:kube-apiserver (/metrics)

	apiserver_storage_transformation_operations_total
	Total number of transformations. Successful transformation will have a status 'OK' and a varied status string when the transformation fails. The status, resource, and transformation_type fields can be used for alerting purposes. For example, you can monitor for encryption/decryption failures using the transformation_type (e.g., from_storage for decryption and to_storage for encryption). Additionally, these fields can be used to ensure that the correct transformers are applied to each resource.

	Stability Level:ALPHA
	Type: Counter
	Labels:resourcestatustransformation_typetransformer_prefixComponents:kube-apiserver (/metrics)

	apiserver_stream_translator_requests_total
	Total number of requests that were handled by the StreamTranslatorProxy, which processes streaming RemoteCommand/V5

	Stability Level:ALPHA
	Type: Counter
	Labels:codeComponents:kube-apiserver (/metrics)

	apiserver_stream_tunnel_requests_total
	Total number of requests that were handled by the StreamTunnelProxy, which processes streaming PortForward/V2

	Stability Level:ALPHA
	Type: Counter
	Labels:codeComponents:kube-apiserver (/metrics)

	apiserver_terminated_watchers_total
	Counter of watchers closed due to unresponsiveness broken by resource type.

	Stability Level:ALPHA
	Type: Counter
	Labels:groupresourceComponents:kube-apiserver (/metrics)

	apiserver_tls_handshake_errors_total
	Number of requests dropped with 'TLS handshake error from' error

	Stability Level:ALPHA
	Type: Counter
	Components:kube-apiserver (/metrics)

	apiserver_validation_declarative_validation_panics_total
	Number of panics in declarative validation, broken down by validation identifier.

	Stability Level:ALPHA
	Type: Counter
	Labels:validation_identifierComponents:kube-apiserver (/metrics)

	apiserver_validation_declarative_validation_parity_discrepancies_total
	Number of discrepancies between declarative and handwritten validation, broken down by validation identifier.

	Stability Level:ALPHA
	Type: Counter
	Labels:validation_identifierComponents:kube-apiserver (/metrics)

	apiserver_watch_cache_consistent_read_total
	Counter for consistent reads from cache.

	Stability Level:ALPHA
	Type: Counter
	Labels:fallbackgroupresourcesuccessComponents:kube-apiserver (/metrics)

	apiserver_watch_cache_events_dispatched_total
	Counter of events dispatched in watch cache broken by resource type.

	Stability Level:ALPHA
	Type: Counter
	Labels:groupresourceComponents:kube-apiserver (/metrics)

	apiserver_watch_cache_events_received_total
	Counter of events received in watch cache broken by resource type.

	Stability Level:ALPHA
	Type: Counter
	Labels:groupresourceComponents:kube-apiserver (/metrics)

	apiserver_watch_cache_initialization_duration_seconds
	Histogram of watch cache initialization duration in seconds, broken by resource type.

	Stability Level:ALPHA
	Type: Histogram
	Labels:groupresourceComponents:kube-apiserver (/metrics)

	apiserver_watch_cache_initialization_errors_total
	Counter of watch cache initialization errors broken by resource type.

	Stability Level:ALPHA
	Type: Counter
	Labels:groupresourceComponents:kube-apiserver (/metrics)

	apiserver_watch_cache_initializations_total
	Counter of watch cache initializations broken by resource type.

	Stability Level:ALPHA
	Type: Counter
	Labels:groupresourceComponents:kube-apiserver (/metrics)

	apiserver_watch_cache_read_wait_seconds
	Histogram of time spent waiting for a watch cache to become fresh.

	Stability Level:ALPHA
	Type: Histogram
	Labels:groupresourceComponents:kube-apiserver (/metrics)

	apiserver_watch_cache_resource_version
	Current resource version of watch cache broken by resource type. This is truncated to the 15 least significant digits.

	Stability Level:ALPHA
	Type: Gauge
	Labels:groupresourceComponents:kube-apiserver (/metrics)

	apiserver_watch_events_dispatch_duration_seconds
	Histogram of watch event dispatch latency broken by resource type and pipeline stage. The 'total' stage is the end-to-end latency of a delivered event.

	Stability Level:ALPHA
	Type: Histogram
	Labels:groupresourcestageComponents:kube-apiserver (/metrics)

	apiserver_watch_filtered_events_total
	Counter of events filtered out by shard selector during watch dispatch, broken by resource type.

	Stability Level:ALPHA
	Type: Counter
	Labels:groupresourceComponents:kube-apiserver (/metrics)

	apiserver_watch_shards_total
	Number of active sharded watch connections broken by resource type.

	Stability Level:ALPHA
	Type: Gauge
	Labels:groupresourceComponents:kube-apiserver (/metrics)

	apiserver_websocket_streaming_requests_total
	Total number of WebSocket streaming requests (exec/attach/portforward) routed by the API server, labeled by subresource and proxy_type. proxy_type is proxied_to_kubelet when the kubelet handles the request directly; otherwise translated_at_apiserver.

	Stability Level:ALPHA
	Type: Counter
	Labels:proxy_typesubresourceComponents:kube-apiserver (/metrics)

	attach_detach_controller_attachdetach_controller_forced_detaches
	Number of times the A/D Controller performed a forced detach

	Stability Level:ALPHA
	Type: Counter
	Labels:reasonComponents:kube-controller-manager (/metrics)

	attachdetach_controller_total_volumes
	Number of volumes in A/D Controller

	Stability Level:ALPHA
	Type: Custom
	Labels:plugin_namestateComponents:kube-controller-manager (/metrics)

	authenticated_user_requests
	Counter of authenticated requests broken out by username.

	Stability Level:ALPHA
	Type: Counter
	Labels:usernameComponents:kube-apiserver (/metrics)

	authentication_attempts
	Counter of authenticated attempts.

	Stability Level:ALPHA
	Type: Counter
	Labels:resultComponents:kube-apiserver (/metrics)

	authentication_duration_seconds
	Authentication duration in seconds broken out by result.

	Stability Level:ALPHA
	Type: Histogram
	Labels:resultComponents:kube-apiserver (/metrics)

	authentication_token_cache_active_fetch_count

	Stability Level:ALPHA
	Type: Gauge
	Labels:statusComponents:kube-apiserver (/metrics)

	authentication_token_cache_fetch_total

	Stability Level:ALPHA
	Type: Counter
	Labels:statusComponents:kube-apiserver (/metrics)

	authentication_token_cache_request_duration_seconds

	Stability Level:ALPHA
	Type: Histogram
	Labels:statusComponents:kube-apiserver (/metrics)

	authentication_token_cache_request_total

	Stability Level:ALPHA
	Type: Counter
	Labels:statusComponents:kube-apiserver (/metrics)

	authorization_attempts_total
	Counter of authorization attempts broken down by result. It can be either 'allowed', 'denied', 'no-opinion' or 'error'.

	Stability Level:ALPHA
	Type: Counter
	Labels:resultComponents:kube-apiserver (/metrics)

	authorization_duration_seconds
	Authorization duration in seconds broken out by result.

	Stability Level:ALPHA
	Type: Histogram
	Labels:resultComponents:kube-apiserver (/metrics)

	cloud_node_lifecycle_controller_cloud_provider_calls_total
	The total number of cloud provider API calls, labeled by operation and result.

	Stability Level:ALPHA
	Type: Counter
	Labels:operationresultComponents:cloud-controller-manager (/metrics)

	cloud_node_lifecycle_controller_monitor_nodes_duration_seconds
	A metric measuring the duration in seconds of a single MonitorNodes loop execution.

	Stability Level:ALPHA
	Type: Histogram
	Components:cloud-controller-manager (/metrics)

	cloud_provider_webhook_request_duration_seconds
	Request latency in seconds. Broken down by status code.

	Stability Level:ALPHA
	Type: Histogram
	Labels:codewebhookComponents:cloud-controller-manager (/metrics)

	cloud_provider_webhook_request_total
	Number of HTTP requests partitioned by status code.

	Stability Level:ALPHA
	Type: Counter
	Labels:codewebhookComponents:cloud-controller-manager (/metrics)

	clustertrustbundle_publisher_sync_duration_seconds
	The time it took to sync a cluster trust bundle.

	Stability Level:ALPHA
	Type: Histogram
	Labels:codeComponents:kube-controller-manager (/metrics)

	clustertrustbundle_publisher_sync_total
	Number of syncs that occurred in cluster trust bundle publisher.

	Stability Level:ALPHA
	Type: Counter
	Labels:codeComponents:kube-controller-manager (/metrics)

	container_swap_limit_bytes
	Current amount of the container swap limit in bytes. Reported only on non-windows systems

	Stability Level:ALPHA
	Type: Custom
	Labels:containerpodnamespaceComponents:kubelet (/metrics/resource)

	container_swap_usage_bytes
	Current amount of the container swap usage in bytes. Reported only on non-windows systems

	Stability Level:ALPHA
	Type: Custom
	Labels:containerpodnamespaceComponents:kubelet (/metrics/resource)

	csi_node_storage_health_status
	CSI node storage backend health conditions currently reported (1 = present).

	Stability Level:ALPHA
	Type: Gauge
	Labels:driver_namereasonstatusComponents:kubelet (/metrics)

	csi_operations_seconds
	Container Storage Interface operation duration with gRPC error code status total

	Stability Level:ALPHA
	Type: Histogram
	Labels:driver_namegrpc_status_codemethod_namemigratedComponents:kubelet (/metrics)

	daemonset_controller_stale_sync_skips_total
	Total number of DaemonSet syncs skipped due to a stale watch cache.

	Stability Level:ALPHA
	Type: Counter
	Labels:groupresourceComponents:kube-controller-manager (/metrics)

	device_taint_eviction_controller_pod_deletion_duration_seconds
	Latency, in seconds, between the time when a device taint effect has been activated and a Pod's deletion via DeviceTaintEvictionController.

	Stability Level:ALPHA
	Type: Histogram
	Components:kube-controller-manager (/metrics)

	device_taint_eviction_controller_pod_deletions_total
	Total number of Pods deleted by DeviceTaintEvictionController since its start.

	Stability Level:ALPHA
	Type: Counter
	Components:kube-controller-manager (/metrics)

	dra_grpc_operations_duration_seconds
	Duration in seconds of the DRA gRPC operations

	Stability Level:ALPHA
	Type: Histogram
	Labels:driver_namegrpc_status_codemethod_nameComponents:kubelet (/metrics)

	dra_node_prepare_skips_total
	Cumulative number of times NodePrepareResources gRPC calls were skipped due to SkipNodeOperations.

	Stability Level:ALPHA
	Type: Counter
	Labels:driver_nameComponents:kubelet (/metrics)

	dra_node_unprepare_skips_total
	Cumulative number of times NodeUnprepareResources gRPC calls were skipped due to SkipNodeOperations.

	Stability Level:ALPHA
	Type: Counter
	Labels:driver_nameComponents:kubelet (/metrics)

	dra_operations_duration_seconds
	Latency histogram in seconds for the duration of handling all ResourceClaims referenced by a pod when the pod starts or stops. Identified by the name of the operation (PrepareResources or UnprepareResources) and separated by the success of the operation. The number of failed operations is provided through the histogram's overall count.

	Stability Level:ALPHA
	Type: Histogram
	Labels:is_erroroperation_nameComponents:kubelet (/metrics)

	dra_resource_claims_in_use
	The number of ResourceClaims that are currently in use on the node, by driver name (driver_name label value) and across all drivers (special value <any> for driver_name). Note that the sum of all by-driver counts is not the total number of in-use ResourceClaims because the same ResourceClaim might use devices from different drivers. Instead, use the count for the <any> driver_name.
