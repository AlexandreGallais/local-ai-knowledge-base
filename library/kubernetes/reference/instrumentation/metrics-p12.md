---
title: "Kubernetes Metrics Reference (part 12 of 13)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/instrumentation/metrics.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Kubernetes Metrics Reference (part 12 of 13)

scheduler_batch_attempts_total
	Counts of results when we attempt to use batching.

	Stability Level:ALPHA
	Type: Counter
	Labels:profileresultComponents:kube-scheduler (/metrics)

	scheduler_batch_cache_flushed_total
	Counts of cache flushes by reason.

	Stability Level:ALPHA
	Type: Counter
	Labels:profilereasonComponents:kube-scheduler (/metrics)

	scheduler_batch_rescore_attempts_total
	Counts of rescore attempts during opportunistic batching.

	Stability Level:ALPHA
	Type: Counter
	Labels:profileComponents:kube-scheduler (/metrics)

	scheduler_batch_rescore_duration_seconds
	Latency for rescoring a node during opportunistic batching.

	Stability Level:ALPHA
	Type: Histogram
	Labels:profileComponents:kube-scheduler (/metrics)

	scheduler_cache_size
	Number of nodes, pods, and assumed (bound) pods in the scheduler cache.

	Stability Level:ALPHA
	Type: Gauge
	Labels:typeComponents:kube-scheduler (/metrics)

	scheduler_dra_bindingconditions_allocations_total
	Number of allocations using devices with BindingConditions, counted per driver per scheduling attempt

	Stability Level:ALPHA
	Type: Counter
	Labels:driverprofilestatusComponents:kube-scheduler (/metrics)

	scheduler_dra_bindingconditions_wait_duration_seconds
	Time in seconds spent waiting for BindingConditions to be satisfied during PreBind.

	Stability Level:ALPHA
	Type: Histogram
	Labels:driverprofilestatusComponents:kube-scheduler (/metrics)

	scheduler_event_handling_duration_seconds
	Event handling latency in seconds.

	Stability Level:ALPHA
	Type: Histogram
	Labels:eventComponents:kube-scheduler (/metrics)

	scheduler_generated_placements_total
	Number of candidate placements generated when scheduling pod groups.

	Stability Level:ALPHA
	Type: Counter
	Labels:profileComponents:kube-scheduler (/metrics)

	scheduler_get_node_hint_duration_seconds
	Latency for getting a node hint.

	Stability Level:ALPHA
	Type: Histogram
	Labels:hintedprofileComponents:kube-scheduler (/metrics)

	scheduler_inflight_events
	Number of events currently tracked in the scheduling queue.

	Stability Level:ALPHA
	Type: Gauge
	Labels:eventComponents:kube-scheduler (/metrics)

	scheduler_pending_async_api_calls
	Number of API calls currently pending in the async queue.

	Stability Level:ALPHA
	Type: Gauge
	Labels:call_typeComponents:kube-scheduler (/metrics)

	scheduler_placement_evaluation_duration_seconds
	Latency in seconds of evaluating a single candidate placement when scheduling pod groups, by result. 'feasible' means the pod group fit into the placement, while 'infeasible' means it did not.

	Stability Level:ALPHA
	Type: Histogram
	Labels:profileresultComponents:kube-scheduler (/metrics)

	scheduler_placement_evaluations_total
	Number of candidate placements evaluated when scheduling pod groups, by result. 'feasible' means the pod group fit into the placement, while 'infeasible' means it did not.

	Stability Level:ALPHA
	Type: Counter
	Labels:profileresultComponents:kube-scheduler (/metrics)

	scheduler_pod_scheduled_after_flush_total
	Number of pods that were successfully scheduled after being flushed from unschedulableEntities due to timeout. This metric helps detect potential queueing hint misconfigurations or event handling issues.

	Stability Level:ALPHA
	Type: Counter
	Components:kube-scheduler (/metrics)

	scheduler_podgroup_schedule_attempts_total
	Number of attempts to schedule pod group, by the result. 'unschedulable' means a pod group could not be scheduled, while 'error' means an internal scheduler problem.

	Stability Level:ALPHA
	Type: Counter
	Labels:profileresultComponents:kube-scheduler (/metrics)

	scheduler_podgroup_scheduling_algorithm_duration_seconds
	Pod group scheduling algorithm latency in seconds

	Stability Level:ALPHA
	Type: Histogram
	Components:kube-scheduler (/metrics)

	scheduler_podgroup_scheduling_attempt_duration_seconds
	Pod group scheduling attempt latency in seconds

	Stability Level:ALPHA
	Type: Histogram
	Labels:profileresultComponents:kube-scheduler (/metrics)

	scheduler_pre_queueing_hint_evaluations_total
	Number of PreQueueingHint evaluations, labeled by plugin and result (all_pods or narrowed).

	Stability Level:ALPHA
	Type: Counter
	Labels:pluginresultComponents:kube-scheduler (/metrics)

	scheduler_preemption_evaluation_duration_seconds
	Duration in seconds for identifying the target preemption victims.

	Stability Level:ALPHA
	Type: Histogram
	Labels:preemptorresultComponents:kube-scheduler (/metrics)

	scheduler_preemption_execution_duration_seconds
	Duration in seconds for preempting the target preemption victims. With async preemption enabled, preemption execution does not block the scheduling of other pods.

	Stability Level:ALPHA
	Type: Histogram
	Labels:preemptorresultComponents:kube-scheduler (/metrics)

	scheduler_preemption_goroutines_duration_seconds
	Duration in seconds for running goroutines for the preemption.

	Stability Level:ALPHA
	Type: Histogram
	Labels:resultComponents:kube-scheduler (/metrics)Deprecated Versions:1.37.0

	scheduler_preemption_goroutines_execution_total
	Number of preemption goroutines executed.

	Stability Level:ALPHA
	Type: Counter
	Labels:resultComponents:kube-scheduler (/metrics)

	scheduler_preemption_pdb_violations_total
	Total number of pod disruption budget violations caused by preemption.

	Stability Level:ALPHA
	Type: Counter
	Labels:preemptorComponents:kube-scheduler (/metrics)

	scheduler_preemption_workload_disruptions
	Number of workload preemption units being preempted. A single preemption unit can be all pods in a pod group (in case of DisruptionMode=all), or a single pod (in case of DisruptionMode=single).

	Stability Level:ALPHA
	Type: Histogram
	Labels:preemptorComponents:kube-scheduler (/metrics)

	scheduler_queue_incoming_entities_total
	Number of scheduling entities added to scheduling queues by event, queue type, and entity type. Entity types are either 'pod' (for individual pods that are not members of any podgroup) or 'podgroup'.

	Stability Level:ALPHA
	Type: Counter
	Labels:eventqueuetypeComponents:kube-scheduler (/metrics)

	scheduler_queued_entities
	Number of queued scheduling entities ('pod' or 'podgroup'; 'pod' stands for individual pods that are not members of any podgroup) by the queue type. 'active' means number of entities in activeQ; 'backoff' means number of entities in backoffQ; 'unschedulable' means number of entities in unschedulableEntities that the scheduler attempted to schedule and failed; 'gated' is the number of unschedulable entities that the scheduler never attempted to schedule because they are gated.

	Stability Level:ALPHA
	Type: Gauge
	Labels:queuetypeComponents:kube-scheduler (/metrics)

	scheduler_queueing_hint_execution_duration_seconds
	Duration for running a queueing hint function of a plugin.

	Stability Level:ALPHA
	Type: Histogram
	Labels:eventhintpluginComponents:kube-scheduler (/metrics)

	scheduler_store_schedule_results_duration_seconds
	Latency for storing scheduling results.

	Stability Level:ALPHA
	Type: Histogram
	Labels:profileComponents:kube-scheduler (/metrics)

	scheduler_volume_binder_cache_requests_total
	Total number for request volume binding cache

	Stability Level:ALPHA
	Type: Counter
	Labels:operationComponents:kube-scheduler (/metrics)

	scheduler_volume_scheduling_stage_error_total
	Volume scheduling stage error count

	Stability Level:ALPHA
	Type: Counter
	Labels:operationComponents:kube-scheduler (/metrics)

	scheduler_workload_preemption_attempts_total
	Total preemption attempts initiated by workload (including pod groups) in the cluster till now.

	Stability Level:ALPHA
	Type: Counter
	Labels:resultComponents:kube-scheduler (/metrics)

	scheduler_workload_preemption_victims
	Number of pod preemption victims caused by workload preemption.

	Stability Level:ALPHA
	Type: Histogram
	Components:kube-scheduler (/metrics)

	scrape_error
	1 if there was an error while getting container metrics, 0 otherwise

	Stability Level:ALPHA
	Type: Custom
	Components:kubelet (/metrics/resource)Deprecated Versions:1.29.0

	selinux_warning_controller_selinux_volume_conflict
	Conflict between two Pods using the same volume

	Stability Level:ALPHA
	Type: Custom
	Labels:propertypod1_namespacepod1_namepod1_valuepod2_namespacepod2_namepod2_valueComponents:kube-controller-manager (/metrics)

	service_controller_loadbalancer_sync_total
	A metric counting the amount of times any load balancer has been configured, as an effect of service/node changes on the cluster

	Stability Level:ALPHA
	Type: Counter
	Components:cloud-controller-manager (/metrics)

	service_controller_nodesync_error_total
	A metric counting the amount of times any load balancer has been configured and errored, as an effect of node changes on the cluster

	Stability Level:ALPHA
	Type: Counter
	Components:cloud-controller-manager (/metrics)

	service_controller_nodesync_latency_seconds
	A metric measuring the latency for nodesync which updates loadbalancer hosts on cluster node updates.

	Stability Level:ALPHA
	Type: Histogram
	Components:cloud-controller-manager (/metrics)

	service_controller_update_loadbalancer_host_latency_seconds
	A metric measuring the latency for updating each load balancer hosts.

	Stability Level:ALPHA
	Type: Histogram
	Components:cloud-controller-manager (/metrics)

	serviceaccount_invalid_legacy_auto_token_uses_total
	Cumulative invalid auto-generated legacy tokens used

	Stability Level:ALPHA
	Type: Counter
	Components:kube-apiserver (/metrics)

	serviceaccount_legacy_auto_token_uses_total
	Cumulative auto-generated legacy tokens used

	Stability Level:ALPHA
	Type: Counter
	Components:kube-apiserver (/metrics)

	serviceaccount_legacy_manual_token_uses_total
	Cumulative manually created legacy tokens used

	Stability Level:ALPHA
	Type: Counter
	Components:kube-apiserver (/metrics)

	statefulset_controller_stale_sync_skips_total
	Total number of StatefulSet syncs skipped due to a stale watch cache.

	Stability Level:ALPHA
	Type: Counter
	Labels:groupresourceComponents:kube-controller-manager (/metrics)

	statefulset_controller_statefulset_max_unavailable
	Maximum number of unavailable pods allowed during StatefulSet rolling updates

	Stability Level:ALPHA
	Type: Gauge
	Labels:pod_management_policystatefulset_namestatefulset_namespaceComponents:kube-controller-manager (/metrics)

	statefulset_controller_statefulset_unavailable_replicas
	Current number of unavailable pods in StatefulSet

	Stability Level:ALPHA
	Type: Gauge
	Labels:pod_management_policystatefulset_namestatefulset_namespaceComponents:kube-controller-manager (/metrics)

	storage_count_attachable_volumes_in_use
	Measure number of volumes in use

	Stability Level:ALPHA
	Type: Custom
	Labels:nodevolume_pluginComponents:kube-controller-manager (/metrics)

	taint_eviction_controller_pod_deletion_duration_seconds
	Latency, in seconds, between the time when a taint effect has been activated for the Pod and its deletion via TaintEvictionController.

	Stability Level:ALPHA
	Type: Histogram
	Components:kube-controller-manager (/metrics)

	taint_eviction_controller_pod_deletions_total
	Total number of Pods deleted by TaintEvictionController since its start.

	Stability Level:ALPHA
	Type: Counter
	Components:kube-controller-manager (/metrics)

	ttl_after_finished_controller_job_deletion_duration_seconds
	The time it took to delete the job since it became eligible for deletion

	Stability Level:ALPHA
	Type: Histogram
	Components:kube-controller-manager (/metrics)

	version_info
	Provides the compatibility version info of the component. The component label is the name of the component, usually kube, but is relevant for aggregated-apiservers.

	Stability Level:ALPHA
	Type: Gauge
	Labels:binarycomponentemulationmin_compatComponents:cloud-controller-manager (/metrics)kube-apiserver (/metrics)kube-controller-manager (/metrics)kube-proxy (/metrics)kube-scheduler (/metrics)kubelet (/metrics)

	volume_manager_selinux_container_errors_total
	Number of errors when kubelet cannot compute SELinux context for a container. Kubelet can't start such a Pod then and it will retry, therefore value of this metric may not represent the actual nr. of containers.

	Stability Level:ALPHA
	Type: Gauge
	Labels:access_modeComponents:kubelet (/metrics)

	volume_manager_selinux_container_warnings_total
	Number of errors when kubelet cannot compute SELinux context for a container that are ignored. They will become real errors when SELinuxMountReadWriteOncePod feature is expanded to all volume access modes.

	Stability Level:ALPHA
	Type: Gauge
	Labels:access_modeComponents:kubelet (/metrics)

	volume_manager_selinux_pod_context_mismatch_errors_total
	Number of errors when a Pod defines different SELinux contexts for its containers that use the same volume. Kubelet can't start such a Pod then and it will retry, therefore value of this metric may not represent the actual nr. of Pods.

	Stability Level:ALPHA
	Type: Gauge
	Labels:access_modeComponents:kubelet (/metrics)

	volume_manager_selinux_pod_context_mismatch_warnings_total
	Number of errors when a Pod defines different SELinux contexts for its containers that use the same volume. They are not errors yet, but they will become real errors when SELinuxMountReadWriteOncePod feature is expanded to all volume access modes.

	Stability Level:ALPHA
	Type: Gauge
	Labels:access_modeComponents:kubelet (/metrics)

	volume_manager_selinux_volume_context_mismatch_errors_total
	Number of errors when a Pod uses a volume that is already mounted with a different SELinux context than the Pod needs. Kubelet can't start such a Pod then and it will retry, therefore value of this metric may not represent the actual nr. of Pods.

	Stability Level:ALPHA
	Type: Gauge
	Labels:access_modevolume_pluginComponents:kubelet (/metrics)

	volume_manager_selinux_volume_context_mismatch_warnings_total
	Number of errors when a Pod uses a volume that is already mounted with a different SELinux context than the Pod needs. They are not errors yet, but they will become real errors when SELinuxMountReadWriteOncePod feature is expanded to all volume access modes.

	Stability Level:ALPHA
	Type: Gauge
	Labels:access_modevolume_pluginComponents:kubelet (/metrics)

	volume_manager_selinux_volumes_admitted_total
	Number of volumes whose SELinux context was fine and will be mounted with mount -o context option.

	Stability Level:ALPHA
	Type: Gauge
	Labels:access_modevolume_pluginComponents:kubelet (/metrics)

	volume_manager_total_volumes
	Number of volumes in Volume Manager

	Stability Level:ALPHA
	Type: Custom
	Labels:plugin_namestateComponents:kubelet (/metrics)

	volume_operation_errors_total
	Total volume operation errors

	Stability Level:ALPHA
	Type: Counter
	Labels:operation_nameplugin_nameComponents:kube-controller-manager (/metrics)

	volume_operation_total_errors
	Total volume operation errors
