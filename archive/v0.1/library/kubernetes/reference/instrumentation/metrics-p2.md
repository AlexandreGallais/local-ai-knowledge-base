---
title: "Kubernetes Metrics Reference (part 2 of 13)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/instrumentation/metrics.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Kubernetes Metrics Reference (part 2 of 13)

## Metrics (v1.37)

This page details the metrics that different Kubernetes components export. You can query the metrics endpoint for these
components using an HTTP scrape, and fetch the current metrics data in Prometheus format.

### List of Stable Kubernetes Metrics

Stable metrics observe strict API contracts and no labels can be added or removed from stable metrics during their lifetime.

	apiserver_admission_controller_admission_duration_seconds
	Admission controller latency histogram in seconds, identified by name and broken out for each operation and API resource and type (validate or admit).

	Stability Level:STABLE
	Type: Histogram
	Labels:nameoperationrejectedtypeComponents:kube-apiserver (/metrics)

	apiserver_admission_step_admission_duration_seconds
	Admission sub-step latency histogram in seconds, broken out for each operation and API resource and step type (validate or admit).

	Stability Level:STABLE
	Type: Histogram
	Labels:operationrejectedtypeComponents:kube-apiserver (/metrics)

	apiserver_admission_webhook_admission_duration_seconds
	Admission webhook latency histogram in seconds, identified by name and broken out for each operation and API resource and type (validate or admit).

	Stability Level:STABLE
	Type: Histogram
	Labels:nameoperationrejectedtypeComponents:kube-apiserver (/metrics)

	apiserver_current_inflight_requests
	Maximal number of currently used inflight request limit of this apiserver per request kind in last second.

	Stability Level:STABLE
	Type: Gauge
	Labels:request_kindComponents:kube-apiserver (/metrics)

	apiserver_longrunning_requests
	Gauge of all active long-running apiserver requests broken out by verb, group, version, resource, scope and component. Not all requests are tracked this way.

	Stability Level:STABLE
	Type: Gauge
	Labels:componentgroupresourcescopesubresourceverbversionComponents:kube-apiserver (/metrics)

	apiserver_request_duration_seconds
	Response latency distribution in seconds for each verb, dry run value, group, version, resource, subresource, scope and component.

	Stability Level:STABLE
	Type: Histogram
	Labels:componentdry_rungroupresourcescopesubresourceverbversionComponents:kube-apiserver (/metrics)

	apiserver_request_total
	Counter of apiserver requests broken out for each verb, dry run value, group, version, resource, scope, component, and HTTP response code.

	Stability Level:STABLE
	Type: Counter
	Labels:codecomponentdry_rungroupresourcescopesubresourceverbversionComponents:kube-apiserver (/metrics)

	apiserver_requested_deprecated_apis
	Gauge of deprecated APIs that have been requested, broken out by API group, version, resource, subresource, and removed_release.

	Stability Level:STABLE
	Type: Gauge
	Labels:groupremoved_releaseresourcesubresourceversionComponents:kube-apiserver (/metrics)

	apiserver_response_sizes
	Response size distribution in bytes for each group, version, verb, resource, subresource, scope and component.

	Stability Level:STABLE
	Type: Histogram
	Labels:componentgroupresourcescopesubresourceverbversionComponents:kube-apiserver (/metrics)

	apiserver_storage_objects
	[DEPRECATED, consider using apiserver_resource_objects instead] Number of stored objects at the time of last check split by kind. In case of a fetching error, the value will be -1.

	Stability Level:STABLE
	Type: Gauge
	Labels:resourceComponents:kube-apiserver (/metrics)Deprecated Versions:1.34.0

	apiserver_storage_size_bytes
	Size of the storage database file physically allocated in bytes.

	Stability Level:STABLE
	Type: Custom
	Labels:storage_cluster_idComponents:kube-apiserver (/metrics)

	container_cpu_usage_seconds_total
	Cumulative cpu time consumed by the container in core-seconds

	Stability Level:STABLE
	Type: Custom
	Labels:containerpodnamespaceComponents:kubelet (/metrics/resource)

	container_memory_working_set_bytes
	Current working set of the container in bytes

	Stability Level:STABLE
	Type: Custom
	Labels:containerpodnamespaceComponents:kubelet (/metrics/resource)

	container_start_time_seconds
	Start time of the container since unix epoch in seconds

	Stability Level:STABLE
	Type: Custom
	Labels:containerpodnamespaceComponents:kubelet (/metrics/resource)

	cronjob_controller_job_creation_skew_duration_seconds
	Time between when a cronjob is scheduled to be run, and when the corresponding job is created

	Stability Level:STABLE
	Type: Histogram
	Components:kube-controller-manager (/metrics)

	job_controller_job_pods_finished_total
	The number of finished Pods that are fully tracked

	Stability Level:STABLE
	Type: Counter
	Labels:completion_moderesultComponents:kube-controller-manager (/metrics)

	job_controller_job_sync_duration_seconds
	The time it took to sync a job

	Stability Level:STABLE
	Type: Histogram
	Labels:actioncompletion_moderesultComponents:kube-controller-manager (/metrics)

	job_controller_job_syncs_total
	The number of job syncs

	Stability Level:STABLE
	Type: Counter
	Labels:actioncompletion_moderesultComponents:kube-controller-manager (/metrics)

	job_controller_jobs_finished_total
	The number of finished jobs

	Stability Level:STABLE
	Type: Counter
	Labels:completion_modereasonresultComponents:kube-controller-manager (/metrics)

	kube_pod_resource_limit
	Resources limit for workloads on the cluster, broken down by pod. This shows the resource usage the scheduler and kubelet expect per pod for resources along with the unit for the resource if any.

	Stability Level:STABLE
	Type: Custom
	Labels:namespacepodnodeschedulerpriorityresourceunitComponents:kube-scheduler (/metrics)

	kube_pod_resource_request
	Resources requested by workloads on the cluster, broken down by pod. This shows the resource usage the scheduler and kubelet expect per pod for resources along with the unit for the resource if any.

	Stability Level:STABLE
	Type: Custom
	Labels:namespacepodnodeschedulerpriorityresourceunitComponents:kube-scheduler (/metrics)

	kubernetes_healthcheck
	This metric records the result of a single healthcheck.

	Stability Level:STABLE
	Type: Gauge
	Labels:nametypeComponents:cloud-controller-manager (/metrics/slis)kube-apiserver (/metrics/slis)kube-controller-manager (/metrics/slis)kube-proxy (/metrics/slis)kube-scheduler (/metrics/slis)kubelet (/metrics/slis)

	kubernetes_healthchecks_total
	This metric records the results of all healthcheck.

	Stability Level:STABLE
	Type: Counter
	Labels:namestatustypeComponents:cloud-controller-manager (/metrics/slis)kube-apiserver (/metrics/slis)kube-controller-manager (/metrics/slis)kube-proxy (/metrics/slis)kube-scheduler (/metrics/slis)kubelet (/metrics/slis)

	node_collector_evictions_total
	Number of Node evictions that happened since current instance of NodeController started.

	Stability Level:STABLE
	Type: Counter
	Labels:zoneComponents:kube-controller-manager (/metrics)

	node_cpu_usage_seconds_total
	Cumulative cpu time consumed by the node in core-seconds

	Stability Level:STABLE
	Type: Custom
	Components:kubelet (/metrics/resource)

	node_memory_working_set_bytes
	Current working set of the node in bytes

	Stability Level:STABLE
	Type: Custom
	Components:kubelet (/metrics/resource)

	pod_cpu_usage_seconds_total
	Cumulative cpu time consumed by the pod in core-seconds

	Stability Level:STABLE
	Type: Custom
	Labels:podnamespaceComponents:kubelet (/metrics/resource)

	pod_memory_working_set_bytes
	Current working set of the pod in bytes

	Stability Level:STABLE
	Type: Custom
	Labels:podnamespaceComponents:kubelet (/metrics/resource)

	resource_scrape_error
	1 if there was an error while getting container metrics, 0 otherwise

	Stability Level:STABLE
	Type: Custom
	Components:kubelet (/metrics/resource)

	scheduler_framework_extension_point_duration_seconds
	Latency for running all plugins of a specific extension point.

	Stability Level:STABLE
	Type: Histogram
	Labels:extension_pointprofilestatusComponents:kube-scheduler (/metrics)

	scheduler_pending_pods
	Number of pending pods, by the queue type. 'active' means number of pods in activeQ; 'backoff' means number of pods in backoffQ; 'unschedulable' means number of pods in unschedulableEntities that the scheduler attempted to schedule and failed; 'gated' is the number of unschedulable pods that the scheduler never attempted to schedule because they are gated; 'incomplete' means number of pods in incompletePodGroupPods; 'pending' means number of pods in pendingPodGroupPods.

	Stability Level:STABLE
	Type: Gauge
	Labels:queueComponents:kube-scheduler (/metrics)

	scheduler_pod_scheduling_attempts
	Number of attempts to successfully schedule a pod.

	Stability Level:STABLE
	Type: Histogram
	Components:kube-scheduler (/metrics)

	scheduler_preemption_attempts_total
	Total preemption attempts in the cluster till now

	Stability Level:STABLE
	Type: Counter
	Components:kube-scheduler (/metrics)

	scheduler_preemption_victims
	Number of selected preemption victims for preemption initiated by a single pod

	Stability Level:STABLE
	Type: Histogram
	Components:kube-scheduler (/metrics)

	scheduler_queue_incoming_pods_total
	Number of pods added to scheduling queues by event and queue type.

	Stability Level:STABLE
	Type: Counter
	Labels:eventqueueComponents:kube-scheduler (/metrics)

	scheduler_schedule_attempts_total
	Number of attempts to schedule pods, by the result. 'unschedulable' means a pod could not be scheduled, while 'error' means an internal scheduler problem.

	Stability Level:STABLE
	Type: Counter
	Labels:profileresultComponents:kube-scheduler (/metrics)

	scheduler_scheduling_attempt_duration_seconds
	Scheduling attempt latency in seconds (scheduling algorithm + binding)

	Stability Level:STABLE
	Type: Histogram
	Labels:profileresultComponents:kube-scheduler (/metrics)
