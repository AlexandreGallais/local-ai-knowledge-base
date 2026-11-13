---
title: "Kubernetes Metrics Reference (part 6 of 13)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/instrumentation/metrics.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Kubernetes Metrics Reference (part 6 of 13)

apiserver_envelope_encryption_dek_cache_inter_arrival_time_seconds
	Time (in seconds) of inter arrival of transformation requests.

	Stability Level:ALPHA
	Type: Histogram
	Labels:transformation_typeComponents:kube-apiserver (/metrics)

	apiserver_envelope_encryption_dek_source_cache_size
	Number of records in data encryption key (DEK) source cache. On a restart, this value is an approximation of the number of decrypt RPC calls the server will make to the KMS plugin.

	Stability Level:ALPHA
	Type: Gauge
	Labels:provider_nameComponents:kube-apiserver (/metrics)

	apiserver_envelope_encryption_invalid_key_id_from_status_total
	Number of times an invalid keyID is returned by the Status RPC call split by error.

	Stability Level:ALPHA
	Type: Counter
	Labels:errorprovider_nameComponents:kube-apiserver (/metrics)

	apiserver_envelope_encryption_key_id_hash_last_timestamp_seconds
	The last time in seconds when a keyID was used.

	Stability Level:ALPHA
	Type: Gauge
	Labels:apiserver_id_hashkey_id_hashprovider_nametransformation_typeComponents:kube-apiserver (/metrics)

	apiserver_envelope_encryption_key_id_hash_status_last_timestamp_seconds
	The last time in seconds when a keyID was returned by the Status RPC call.

	Stability Level:ALPHA
	Type: Gauge
	Labels:apiserver_id_hashkey_id_hashprovider_nameComponents:kube-apiserver (/metrics)

	apiserver_envelope_encryption_key_id_hash_total
	Number of times a keyID is used split by transformation type, provider, and apiserver identity.

	Stability Level:ALPHA
	Type: Counter
	Labels:apiserver_id_hashkey_id_hashprovider_nametransformation_typeComponents:kube-apiserver (/metrics)

	apiserver_envelope_encryption_kms_operations_latency_seconds
	KMS operation duration with gRPC error code status total.

	Stability Level:ALPHA
	Type: Histogram
	Labels:grpc_status_codemethod_nameprovider_nameComponents:kube-apiserver (/metrics)

	apiserver_externaljwt_fetch_keys_data_timestamp
	Unix Timestamp in seconds of the last successful FetchKeys data_timestamp value returned by the external signer

	Stability Level:ALPHA
	Type: Gauge
	Components:kube-apiserver (/metrics)

	apiserver_externaljwt_fetch_keys_request_total
	Total attempts at syncing supported JWKs

	Stability Level:ALPHA
	Type: Counter
	Labels:codeComponents:kube-apiserver (/metrics)

	apiserver_externaljwt_fetch_keys_success_timestamp
	Unix Timestamp in seconds of the last successful FetchKeys request

	Stability Level:ALPHA
	Type: Gauge
	Components:kube-apiserver (/metrics)

	apiserver_externaljwt_request_duration_seconds
	Request duration and time for calls to external-jwt-signer

	Stability Level:ALPHA
	Type: Histogram
	Labels:codemethodComponents:kube-apiserver (/metrics)

	apiserver_externaljwt_sign_request_total
	Total attempts at signing JWT

	Stability Level:ALPHA
	Type: Counter
	Labels:codeComponents:kube-apiserver (/metrics)

	apiserver_flowcontrol_current_inqueue_seats
	Number of seats currently pending in queues of the API Priority and Fairness subsystem

	Stability Level:ALPHA
	Type: Gauge
	Labels:flow_schemapriority_levelComponents:kube-apiserver (/metrics)

	apiserver_flowcontrol_current_limit_seats
	current derived number of execution seats available to each priority level

	Stability Level:ALPHA
	Type: Gauge
	Labels:priority_levelComponents:kube-apiserver (/metrics)

	apiserver_flowcontrol_current_r
	R(time of last change)

	Stability Level:ALPHA
	Type: Gauge
	Labels:priority_levelComponents:kube-apiserver (/metrics)

	apiserver_flowcontrol_demand_seats
	Observations, at the end of every nanosecond, of (the number of seats each priority level could use) / (nominal number of seats for that level)

	Stability Level:ALPHA
	Type: TimingRatioHistogram
	Labels:priority_levelComponents:kube-apiserver (/metrics)

	apiserver_flowcontrol_demand_seats_average
	Time-weighted average, over last adjustment period, of demand_seats

	Stability Level:ALPHA
	Type: Gauge
	Labels:priority_levelComponents:kube-apiserver (/metrics)

	apiserver_flowcontrol_demand_seats_high_watermark
	High watermark, over last adjustment period, of demand_seats

	Stability Level:ALPHA
	Type: Gauge
	Labels:priority_levelComponents:kube-apiserver (/metrics)

	apiserver_flowcontrol_demand_seats_smoothed
	Smoothed seat demands

	Stability Level:ALPHA
	Type: Gauge
	Labels:priority_levelComponents:kube-apiserver (/metrics)

	apiserver_flowcontrol_demand_seats_stdev
	Time-weighted standard deviation, over last adjustment period, of demand_seats

	Stability Level:ALPHA
	Type: Gauge
	Labels:priority_levelComponents:kube-apiserver (/metrics)

	apiserver_flowcontrol_dispatch_r
	R(time of last dispatch)

	Stability Level:ALPHA
	Type: Gauge
	Labels:priority_levelComponents:kube-apiserver (/metrics)

	apiserver_flowcontrol_epoch_advance_total
	Number of times the queueset's progress meter jumped backward

	Stability Level:ALPHA
	Type: Counter
	Labels:priority_levelsuccessComponents:kube-apiserver (/metrics)

	apiserver_flowcontrol_latest_s
	S(most recently dispatched request)

	Stability Level:ALPHA
	Type: Gauge
	Labels:priority_levelComponents:kube-apiserver (/metrics)

	apiserver_flowcontrol_lower_limit_seats
	Configured lower bound on number of execution seats available to each priority level

	Stability Level:ALPHA
	Type: Gauge
	Labels:priority_levelComponents:kube-apiserver (/metrics)

	apiserver_flowcontrol_next_discounted_s_bounds
	min and max, over queues, of S(oldest waiting request in queue) - estimated work in progress

	Stability Level:ALPHA
	Type: Gauge
	Labels:boundpriority_levelComponents:kube-apiserver (/metrics)

	apiserver_flowcontrol_next_s_bounds
	min and max, over queues, of S(oldest waiting request in queue)

	Stability Level:ALPHA
	Type: Gauge
	Labels:boundpriority_levelComponents:kube-apiserver (/metrics)

	apiserver_flowcontrol_priority_level_request_utilization
	Observations, at the end of every nanosecond, of number of requests (as a fraction of the relevant limit) waiting or in any stage of execution (but only initial stage for WATCHes)

	Stability Level:ALPHA
	Type: TimingRatioHistogram
	Labels:phasepriority_levelComponents:kube-apiserver (/metrics)

	apiserver_flowcontrol_priority_level_seat_utilization
	Observations, at the end of every nanosecond, of utilization of seats for any stage of execution (but only initial stage for WATCHes)

	Stability Level:ALPHA
	Type: TimingRatioHistogram
	Labels:priority_levelConst Labels:phase:executingComponents:kube-apiserver (/metrics)

	apiserver_flowcontrol_read_vs_write_current_requests
	Observations, at the end of every nanosecond, of the number of requests (as a fraction of the relevant limit) waiting or in regular stage of execution

	Stability Level:ALPHA
	Type: TimingRatioHistogram
	Labels:phaserequest_kindComponents:kube-apiserver (/metrics)

	apiserver_flowcontrol_request_dispatch_no_accommodation_total
	Number of times a dispatch attempt resulted in a non accommodation due to lack of available seats

	Stability Level:ALPHA
	Type: Counter
	Labels:flow_schemapriority_levelComponents:kube-apiserver (/metrics)

	apiserver_flowcontrol_request_execution_seconds
	Duration of initial stage (for a WATCH) or any (for a non-WATCH) stage of request execution in the API Priority and Fairness subsystem

	Stability Level:ALPHA
	Type: Histogram
	Labels:flow_schemapriority_leveltypeComponents:kube-apiserver (/metrics)

	apiserver_flowcontrol_request_queue_length_after_enqueue
	Length of queue in the API Priority and Fairness subsystem, as seen by each request after it is enqueued

	Stability Level:ALPHA
	Type: Histogram
	Labels:flow_schemapriority_levelComponents:kube-apiserver (/metrics)

	apiserver_flowcontrol_seat_fair_frac
	Fair fraction of server's concurrency to allocate to each priority level that can use it

	Stability Level:ALPHA
	Type: Gauge
	Components:kube-apiserver (/metrics)

	apiserver_flowcontrol_target_seats
	Seat allocation targets

	Stability Level:ALPHA
	Type: Gauge
	Labels:priority_levelComponents:kube-apiserver (/metrics)

	apiserver_flowcontrol_upper_limit_seats
	Configured upper bound on number of execution seats available to each priority level

	Stability Level:ALPHA
	Type: Gauge
	Labels:priority_levelComponents:kube-apiserver (/metrics)

	apiserver_flowcontrol_watch_count_samples
	count of watchers for mutating requests in API Priority and Fairness

	Stability Level:ALPHA
	Type: Histogram
	Labels:flow_schemapriority_levelComponents:kube-apiserver (/metrics)

	apiserver_flowcontrol_work_estimated_seats
	Number of estimated seats (maximum of initial and final seats) associated with requests in API Priority and Fairness

	Stability Level:ALPHA
	Type: Histogram
	Labels:flow_schemapriority_levelComponents:kube-apiserver (/metrics)

	apiserver_impersonation_attempts_duration_seconds
	Latency of impersonation attempts in seconds split by mode and decision.

	Stability Level:ALPHA
	Type: Histogram
	Labels:decisionmodeComponents:kube-apiserver (/metrics)

	apiserver_impersonation_attempts_total
	Total number of impersonation attempts split by mode and decision.

	Stability Level:ALPHA
	Type: Counter
	Labels:decisionmodeComponents:kube-apiserver (/metrics)

	apiserver_impersonation_authorization_attempts_duration_seconds
	Latency of authorization checks made by the impersonation handler in seconds split by mode and decision.

	Stability Level:ALPHA
	Type: Histogram
	Labels:decisionmodeComponents:kube-apiserver (/metrics)

	apiserver_impersonation_authorization_attempts_total
	Total number of authorization checks made by the impersonation handler split by mode and decision.

	Stability Level:ALPHA
	Type: Counter
	Labels:decisionmodeComponents:kube-apiserver (/metrics)

	apiserver_init_events_total
	Counter of init events processed in watch cache broken by resource type.

	Stability Level:ALPHA
	Type: Counter
	Labels:groupresourceComponents:kube-apiserver (/metrics)

	apiserver_kube_aggregator_x509_insecure_sha1_total
	Counts the number of requests to servers with insecure SHA1 signatures in their serving certificate OR the number of connection failures due to the insecure SHA1 signatures (either/or, based on the runtime environment)

	Stability Level:ALPHA
	Type: Counter
	Components:kube-apiserver (/metrics)

	apiserver_kube_aggregator_x509_missing_san_total
	Counts the number of requests to servers missing SAN extension in their serving certificate OR the number of connection failures due to the lack of x509 certificate SAN extension missing (either/or, based on the runtime environment)

	Stability Level:ALPHA
	Type: Counter
	Components:kube-apiserver (/metrics)

	apiserver_manifest_admission_config_controller_automatic_reload_last_timestamp_seconds
	Timestamp of the last automatic reload of admission manifest configuration split by status, plugin, and apiserver identity.

	Stability Level:ALPHA
	Type: Gauge
	Labels:apiserver_id_hashpluginstatusComponents:kube-apiserver (/metrics)

	apiserver_manifest_admission_config_controller_automatic_reloads_total
	Total number of automatic reloads of admission manifest configuration split by status, plugin, and apiserver identity.

	Stability Level:ALPHA
	Type: Counter
	Labels:apiserver_id_hashpluginstatusComponents:kube-apiserver (/metrics)

	apiserver_manifest_admission_config_controller_last_config_info
	Information about the last applied admission manifest configuration with hash as label, split by plugin and apiserver identity.

	Stability Level:ALPHA
	Type: Custom
	Labels:pluginapiserver_id_hashhashComponents:kube-apiserver (/metrics)

	apiserver_mutating_admission_policy_check_duration_seconds
	Mutation admission latency for individual mutation expressions in seconds, labeled by policy and binding.

	Stability Level:ALPHA
	Type: Histogram
	Labels:error_typepolicypolicy_bindingComponents:kube-apiserver (/metrics)

	apiserver_mutating_admission_policy_check_total
	Mutation admission policy check total, labeled by policy and further identified by binding.

	Stability Level:ALPHA
	Type: Counter
	Labels:error_typepolicypolicy_bindingComponents:kube-apiserver (/metrics)

	apiserver_nodeport_repair_port_errors_total
	Number of errors detected on ports by the repair loop broken down by type of error: leak, repair, full, outOfRange, duplicate, unknown

	Stability Level:ALPHA
	Type: Counter
	Labels:typeComponents:kube-apiserver (/metrics)

	apiserver_nodeport_repair_reconcile_errors_total
	Number of reconciliation failures on the nodeport repair reconcile loop

	Stability Level:ALPHA
	Type: Counter
	Components:kube-apiserver (/metrics)

	apiserver_peer_discovery_sync_errors_total
	Total number of errors encountered while syncing discovery information from a peer kube-apiserver

	Stability Level:ALPHA
	Type: Counter
	Labels:typeComponents:kube-apiserver (/metrics)

	apiserver_peer_proxy_errors_total
	Total number of errors encountered while proxying requests to a peer kube apiserver

	Stability Level:ALPHA
	Type: Counter
	Labels:groupresourcetypeversionComponents:kube-apiserver (/metrics)

	apiserver_request_aborts_total
	Number of requests which apiserver aborted possibly due to a timeout, for each group, version, verb, resource, subresource and scope

	Stability Level:ALPHA
	Type: Counter
	Labels:groupresourcescopesubresourceverbversionComponents:kube-apiserver (/metrics)

	apiserver_request_body_size_bytes
	Apiserver request body size in bytes broken out by resource and verb.

	Stability Level:ALPHA
	Type: Histogram
	Labels:groupresourceverbComponents:kube-apiserver (/metrics)

	apiserver_request_filter_duration_seconds
	Request filter latency distribution in seconds, for each filter type

	Stability Level:ALPHA
	Type: Histogram
	Labels:filterComponents:kube-apiserver (/metrics)

	apiserver_request_post_timeout_total
	Tracks the activity of the request handlers after the associated requests have been timed out by the apiserver

	Stability Level:ALPHA
	Type: Counter
	Labels:sourcestatusComponents:kube-apiserver (/metrics)

	apiserver_request_sli_duration_seconds
	Response latency distribution (not counting webhook duration and priority & fairness queue wait times) in seconds for each verb, group, version, resource, subresource, scope and component.

	Stability Level:ALPHA
	Type: Histogram
	Labels:componentgroupresourcescopesubresourceverbversionComponents:kube-apiserver (/metrics)

	apiserver_request_terminations_total
	Number of requests which apiserver terminated in self-defense.

	Stability Level:ALPHA
	Type: Counter
	Labels:codecomponentgroupresourcescopesubresourceverbversionComponents:kube-apiserver (/metrics)

	apiserver_request_timestamp_comparison_time
	Time taken for comparison of old vs new objects in UPDATE or PATCH requests

	Stability Level:ALPHA
	Type: Histogram
	Labels:code_pathComponents:kube-apiserver (/metrics)
