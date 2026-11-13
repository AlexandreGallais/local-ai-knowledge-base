---
title: "Kubernetes Metrics Reference (part 3 of 13)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/instrumentation/metrics.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Kubernetes Metrics Reference (part 3 of 13)

### List of Beta Kubernetes Metrics

Beta metrics observe a looser API contract than its stable counterparts. No labels can be removed from beta metrics during their lifetime, however, labels can be added while the metric is in the beta stage. This offers the assurance that beta metrics will honor existing dashboards and alerts, while allowing for amendments in the future.

	apiserver_authentication_config_controller_automatic_reload_last_timestamp_seconds
	Timestamp of the last automatic reload of authentication configuration split by status and apiserver identity.

	Stability Level:BETA
	Type: Gauge
	Labels:apiserver_id_hashstatusComponents:kube-apiserver (/metrics)

	apiserver_authentication_config_controller_automatic_reloads_total
	Total number of automatic reloads of authentication configuration split by status and apiserver identity.

	Stability Level:BETA
	Type: Counter
	Labels:apiserver_id_hashstatusComponents:kube-apiserver (/metrics)

	apiserver_authorization_config_controller_automatic_reload_last_timestamp_seconds
	Timestamp of the last automatic reload of authorization configuration split by status and apiserver identity.

	Stability Level:BETA
	Type: Gauge
	Labels:apiserver_id_hashstatusComponents:kube-apiserver (/metrics)

	apiserver_authorization_config_controller_automatic_reloads_total
	Total number of automatic reloads of authorization configuration split by status and apiserver identity.

	Stability Level:BETA
	Type: Counter
	Labels:apiserver_id_hashstatusComponents:kube-apiserver (/metrics)

	apiserver_cel_compilation_duration_seconds
	CEL compilation time in seconds.

	Stability Level:BETA
	Type: Histogram
	Components:kube-apiserver (/metrics)

	apiserver_cel_evaluation_duration_seconds
	CEL evaluation time in seconds.

	Stability Level:BETA
	Type: Histogram
	Components:kube-apiserver (/metrics)

	apiserver_flowcontrol_current_executing_requests
	Number of requests in initial (for a WATCH) or any (for a non-WATCH) execution stage in the API Priority and Fairness subsystem

	Stability Level:BETA
	Type: Gauge
	Labels:flow_schemapriority_levelComponents:kube-apiserver (/metrics)

	apiserver_flowcontrol_current_executing_seats
	Concurrency (number of seats) occupied by the currently executing (initial stage for a WATCH, any stage otherwise) requests in the API Priority and Fairness subsystem

	Stability Level:BETA
	Type: Gauge
	Labels:flow_schemapriority_levelComponents:kube-apiserver (/metrics)

	apiserver_flowcontrol_current_inqueue_requests
	Number of requests currently pending in queues of the API Priority and Fairness subsystem

	Stability Level:BETA
	Type: Gauge
	Labels:flow_schemapriority_levelComponents:kube-apiserver (/metrics)

	apiserver_flowcontrol_dispatched_requests_total
	Number of requests executed by API Priority and Fairness subsystem

	Stability Level:BETA
	Type: Counter
	Labels:flow_schemapriority_levelComponents:kube-apiserver (/metrics)

	apiserver_flowcontrol_nominal_limit_seats
	Nominal number of execution seats configured for each priority level

	Stability Level:BETA
	Type: Gauge
	Labels:priority_levelComponents:kube-apiserver (/metrics)

	apiserver_flowcontrol_rejected_requests_total
	Number of requests rejected by API Priority and Fairness subsystem

	Stability Level:BETA
	Type: Counter
	Labels:flow_schemapriority_levelreasonComponents:kube-apiserver (/metrics)

	apiserver_flowcontrol_request_wait_duration_seconds
	Length of time a request spent waiting in its queue

	Stability Level:BETA
	Type: Histogram
	Labels:executeflow_schemapriority_levelComponents:kube-apiserver (/metrics)

	apiserver_storage_events_received_total
	Number of etcd events received split by kind.

	Stability Level:BETA
	Type: Counter
	Labels:groupresourceComponents:kube-apiserver (/metrics)

	apiserver_validating_admission_policy_check_duration_seconds
	Validation admission latency for individual validation expressions in seconds, labeled by policy and further including binding and enforcement action taken.

	Stability Level:BETA
	Type: Histogram
	Labels:enforcement_actionerror_typepolicypolicy_bindingComponents:kube-apiserver (/metrics)

	apiserver_validating_admission_policy_check_total
	Validation admission policy check total, labeled by policy and further identified by binding and enforcement action taken.

	Stability Level:BETA
	Type: Counter
	Labels:enforcement_actionerror_typepolicypolicy_bindingComponents:kube-apiserver (/metrics)

	apiserver_validation_declarative_validation_mismatch_total
	Number of times declarative validation results differed from handwritten validation results for core types.

	Stability Level:BETA
	Type: Counter
	Components:kube-apiserver (/metrics)

	apiserver_validation_declarative_validation_panic_total
	Number of times declarative validation has panicked during validation.

	Stability Level:BETA
	Type: Counter
	Components:kube-apiserver (/metrics)

	apiserver_watch_events_sizes
	Watch event size distribution in bytes

	Stability Level:BETA
	Type: Histogram
	Labels:groupresourceversionComponents:kube-apiserver (/metrics)

	apiserver_watch_events_total
	Number of events sent in watch clients

	Stability Level:BETA
	Type: Counter
	Labels:groupresourceversionComponents:kube-apiserver (/metrics)

	apiserver_watch_list_duration_seconds
	Response latency distribution in seconds for watch list requests broken by group, version, resource and scope.

	Stability Level:BETA
	Type: Histogram
	Labels:groupresourcescopeversionComponents:kube-apiserver (/metrics)

	apiserver_webhooks_x509_insecure_sha1_total
	Counts the number of requests to servers with insecure SHA1 signatures in their serving certificate OR the number of connection failures due to the insecure SHA1 signatures (either/or, based on the runtime environment)

	Stability Level:BETA
	Type: Counter
	Components:kube-apiserver (/metrics)

	apiserver_webhooks_x509_missing_san_total
	Counts the number of requests to servers missing SAN extension in their serving certificate OR the number of connection failures due to the lack of x509 certificate SAN extension missing (either/or, based on the runtime environment)

	Stability Level:BETA
	Type: Counter
	Components:kube-apiserver (/metrics)

	disabled_metrics_total
	The count of disabled metrics.

	Stability Level:BETA
	Type: Counter
	Components:cloud-controller-manager (/metrics)kube-apiserver (/metrics)kube-controller-manager (/metrics)kube-proxy (/metrics)kube-scheduler (/metrics)kubelet (/metrics)

	endpoint_slice_controller_desired_endpoint_slices
	Number of EndpointSlices that would exist with perfect endpoint allocation

	Stability Level:BETA
	Type: Gauge
	Components:kube-controller-manager (/metrics)

	endpoint_slice_controller_endpoints_added_per_sync
	Number of endpoints added on each Service sync

	Stability Level:BETA
	Type: Histogram
	Components:kube-controller-manager (/metrics)

	endpoint_slice_controller_endpoints_desired
	Number of endpoints desired

	Stability Level:BETA
	Type: Gauge
	Components:kube-controller-manager (/metrics)

	endpoint_slice_controller_endpoints_removed_per_sync
	Number of endpoints removed on each Service sync

	Stability Level:BETA
	Type: Histogram
	Components:kube-controller-manager (/metrics)

	endpoint_slice_controller_num_endpoint_slices
	Number of EndpointSlices

	Stability Level:BETA
	Type: Gauge
	Components:kube-controller-manager (/metrics)

	endpoint_slice_controller_services_count_by_traffic_distribution
	Number of Services using some specific trafficDistribution

	Stability Level:BETA
	Type: Gauge
	Labels:traffic_distributionComponents:kube-controller-manager (/metrics)

	hidden_metrics_total
	The count of hidden metrics.

	Stability Level:BETA
	Type: Counter
	Components:cloud-controller-manager (/metrics)kube-apiserver (/metrics)kube-controller-manager (/metrics)kube-proxy (/metrics)kube-scheduler (/metrics)kubelet (/metrics)

	horizontal_pod_autoscaler_controller_metric_computation_duration_seconds
	The time(seconds) that the HPA controller takes to calculate one metric. The label 'action' should be either 'scale_down', 'scale_up', or 'none'. The label 'error' should be either 'spec', 'internal', or 'none'. The label 'metric_type' corresponds to HPA.spec.metrics[*].type

	Stability Level:BETA
	Type: Histogram
	Labels:actionerrormetric_typeComponents:kube-controller-manager (/metrics)

	horizontal_pod_autoscaler_controller_metric_computation_total
	Number of metric computations. The label 'action' should be either 'scale_down', 'scale_up', or 'none'. Also, the label 'error' should be either 'spec', 'internal', or 'none'. The label 'metric_type' corresponds to HPA.spec.metrics[*].type

	Stability Level:BETA
	Type: Counter
	Labels:actionerrormetric_typeComponents:kube-controller-manager (/metrics)

	horizontal_pod_autoscaler_controller_reconciliation_duration_seconds
	The time(seconds) that the HPA controller takes to reconcile once. The label 'action' should be either 'scale_down', 'scale_up', or 'none'. Also, the label 'error' should be either 'spec', 'internal', or 'none'. Note that if both spec and internal errors happen during a reconciliation, the first one to occur is reported in `error` label.

	Stability Level:BETA
	Type: Histogram
	Labels:actionerrorComponents:kube-controller-manager (/metrics)

	horizontal_pod_autoscaler_controller_reconciliations_total
	Number of reconciliations of HPA controller. The label 'action' should be either 'scale_down', 'scale_up', or 'none'. Also, the label 'error' should be either 'spec', 'internal', or 'none'. Note that if both spec and internal errors happen during a reconciliation, the first one to occur is reported in `error` label.

	Stability Level:BETA
	Type: Counter
	Labels:actionerrorComponents:kube-controller-manager (/metrics)

	job_controller_pod_failures_handled_by_failure_policy_total
	`The number of failed Pods handled by failure policy with, 			respect to the failure policy action applied based on the matched, 			rule. Possible values of the action label correspond to the, 			possible values for the failure policy rule action, which are:, 			"FailJob", "Ignore" and "Count".`

	Stability Level:BETA
	Type: Counter
	Labels:actionComponents:kube-controller-manager (/metrics)

	job_controller_terminated_pods_tracking_finalizer_total
	`The number of terminated pods (phase=Failed|Succeeded), that have the finalizer batch.kubernetes.io/job-tracking, The event label can be "add" or "delete".`

	Stability Level:BETA
	Type: Counter
	Labels:eventComponents:kube-controller-manager (/metrics)

	kubelet_image_volume_mounted_errors_total
	Number of failed image volume mounts.

	Stability Level:BETA
	Type: Counter
	Components:kubelet (/metrics)

	kubelet_image_volume_mounted_succeed_total
	Number of successful image volume mounts.

	Stability Level:BETA
	Type: Counter
	Components:kubelet (/metrics)

	kubelet_image_volume_requested_total
	Number of requested image volumes.

	Stability Level:BETA
	Type: Counter
	Components:kubelet (/metrics)

	kubernetes_build_info
	A metric with a constant '1' value labeled by major, minor, git version, git commit, git tree state, build date, Go version, and compiler from which Kubernetes was built, and platform on which it is running.

	Stability Level:BETA
	Type: Gauge
	Labels:build_datecompilergit_commitgit_tree_stategit_versiongo_versionmajorminorplatformComponents:cloud-controller-manager (/metrics)kube-apiserver (/metrics)kube-controller-manager (/metrics)kube-proxy (/metrics)kube-scheduler (/metrics)kubelet (/metrics)

	kubernetes_feature_enabled
	This metric records the data about the stage and enablement of a k8s feature.

	Stability Level:BETA
	Type: Gauge
	Labels:namestageComponents:cloud-controller-manager (/metrics)kube-apiserver (/metrics)kube-controller-manager (/metrics)kube-proxy (/metrics)kube-scheduler (/metrics)kubelet (/metrics)

	prober_probe_total
	Cumulative number of a liveness, readiness or startup probe for a container by result.

	Stability Level:BETA
	Type: Counter
	Labels:containernamespacepodpod_uidprobe_typeresultComponents:kubelet (/metrics/probes)

	registered_metrics_total
	The count of registered metrics broken by stability level and deprecation version.

	Stability Level:BETA
	Type: Counter
	Labels:deprecated_versionstability_levelComponents:cloud-controller-manager (/metrics)kube-apiserver (/metrics)kube-controller-manager (/metrics)kube-proxy (/metrics)kube-scheduler (/metrics)kubelet (/metrics)

	running_managed_controllers
	Indicates where instances of a controller are currently running

	Stability Level:BETA
	Type: Gauge
	Labels:managernameComponents:cloud-controller-manager (/metrics)kube-apiserver (/metrics)kube-controller-manager (/metrics)kube-proxy (/metrics)kube-scheduler (/metrics)kubelet (/metrics)

	scheduler_goroutines
	Number of running goroutines split by the work they do such as binding.

	Stability Level:BETA
	Type: Gauge
	Labels:operationComponents:kube-scheduler (/metrics)

	scheduler_permit_wait_duration_seconds
	Duration of waiting on permit.

	Stability Level:BETA
	Type: Histogram
	Labels:resultComponents:kube-scheduler (/metrics)

	scheduler_plugin_evaluation_total
	Number of attempts to schedule pods by each plugin and the extension point (available only in PreFilter, Filter, PreScore, and Score).

	Stability Level:BETA
	Type: Counter
	Labels:extension_pointpluginprofileComponents:kube-scheduler (/metrics)

	scheduler_plugin_execution_duration_seconds
	Duration for running a plugin at a specific extension point.

	Stability Level:BETA
	Type: Histogram
	Labels:extension_pointpluginstatusComponents:kube-scheduler (/metrics)

	scheduler_pod_scheduling_sli_duration_seconds
	E2e latency for a pod being scheduled, from the time the pod enters the scheduling queue and might involve multiple scheduling attempts.

	Stability Level:BETA
	Type: Histogram
	Labels:attemptsComponents:kube-scheduler (/metrics)

	scheduler_scheduling_algorithm_duration_seconds
	Scheduling algorithm latency in seconds

	Stability Level:BETA
	Type: Histogram
	Components:kube-scheduler (/metrics)

	scheduler_unschedulable_pods
	The number of unschedulable pods broken down by plugin name. A pod will increment the gauge for all plugins that caused it to not schedule and so this metric have meaning only when broken down by plugin.

	Stability Level:BETA
	Type: Gauge
	Labels:pluginprofileComponents:kube-scheduler (/metrics)

	serviceaccount_legacy_tokens_total
	Cumulative legacy service account tokens used

	Stability Level:BETA
	Type: Counter
	Components:kube-apiserver (/metrics)

	serviceaccount_stale_tokens_total
	Cumulative stale projected service account tokens used

	Stability Level:BETA
	Type: Counter
	Components:kube-apiserver (/metrics)

	serviceaccount_valid_tokens_total
	Cumulative valid projected service account tokens used

	Stability Level:BETA
	Type: Counter
	Components:kube-apiserver (/metrics)

	storage_operation_duration_seconds
	Storage operation duration
