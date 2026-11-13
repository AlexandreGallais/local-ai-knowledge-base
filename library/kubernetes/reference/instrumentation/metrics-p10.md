---
title: "Kubernetes Metrics Reference (part 10 of 13)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/instrumentation/metrics.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Kubernetes Metrics Reference (part 10 of 13)

kubelet_pod_watch_events_dropped_total
	Cumulative number of pod watch events dropped.

	Stability Level:ALPHA
	Type: Counter
	Components:kubelet (/metrics)

	kubelet_pod_worker_duration_seconds
	Duration in seconds to sync a single pod. Broken down by operation type: create, update, or sync

	Stability Level:ALPHA
	Type: Histogram
	Labels:operation_typeComponents:kubelet (/metrics)

	kubelet_pod_worker_start_duration_seconds
	Duration in seconds from kubelet seeing a pod to starting a worker.

	Stability Level:ALPHA
	Type: Histogram
	Components:kubelet (/metrics)

	kubelet_podcertificate_states
	Gauge vector reporting the number of pod certificate projected volume sources, faceted by signer_name and state.

	Stability Level:ALPHA
	Type: Custom
	Labels:signer_namestateComponents:kubelet (/metrics)

	kubelet_preemptions
	Cumulative number of pod preemptions by preemption resource

	Stability Level:ALPHA
	Type: Counter
	Labels:preemption_signalComponents:kubelet (/metrics)

	kubelet_resource_manager_allocation_errors_total
	Number of errors encountered during exclusive resource allocation.

	Stability Level:ALPHA
	Type: Counter
	Labels:resource_namesourceComponents:kubelet (/metrics)

	kubelet_resource_manager_allocations_total
	Number of exclusive resource allocations performed by a resource manager.

	Stability Level:ALPHA
	Type: Counter
	Labels:resource_namesourceComponents:kubelet (/metrics)

	kubelet_resource_manager_container_assignments_total
	Number of containers with a specific type of resource assignment.

	Stability Level:ALPHA
	Type: Counter
	Labels:assignment_typeresource_nameComponents:kubelet (/metrics)

	kubelet_restarted_pods_total
	Number of pods that have been restarted because they were deleted and recreated with the same UID while the kubelet was watching them (common for static pods, extremely uncommon for API pods)

	Stability Level:ALPHA
	Type: Counter
	Labels:staticComponents:kubelet (/metrics)

	kubelet_run_podsandbox_duration_seconds
	Duration in seconds of the run_podsandbox operations. Broken down by RuntimeClass.Handler.

	Stability Level:ALPHA
	Type: Histogram
	Labels:runtime_handlerComponents:kubelet (/metrics)

	kubelet_run_podsandbox_errors_total
	Cumulative number of the run_podsandbox operation errors by RuntimeClass.Handler.

	Stability Level:ALPHA
	Type: Counter
	Labels:runtime_handlerComponents:kubelet (/metrics)

	kubelet_running_containers
	Number of containers currently running

	Stability Level:ALPHA
	Type: Gauge
	Labels:container_stateComponents:kubelet (/metrics)

	kubelet_running_pods
	Number of pods that have a running pod sandbox

	Stability Level:ALPHA
	Type: Gauge
	Components:kubelet (/metrics)

	kubelet_runtime_operations_duration_seconds
	Duration in seconds of runtime operations. Broken down by operation type.

	Stability Level:ALPHA
	Type: Histogram
	Labels:operation_typeComponents:kubelet (/metrics)

	kubelet_runtime_operations_errors_total
	Cumulative number of runtime operation errors by operation type.

	Stability Level:ALPHA
	Type: Counter
	Labels:operation_typeComponents:kubelet (/metrics)

	kubelet_runtime_operations_total
	Cumulative number of runtime operations by operation type.

	Stability Level:ALPHA
	Type: Counter
	Labels:operation_typeComponents:kubelet (/metrics)

	kubelet_server_expiration_renew_errors
	Counter of certificate renewal errors.

	Stability Level:ALPHA
	Type: Counter
	Components:kubelet (/metrics)

	kubelet_sleep_action_terminated_early_total
	The number of times lifecycle sleep handler got terminated before it finishes

	Stability Level:ALPHA
	Type: Counter
	Components:kubelet (/metrics)

	kubelet_started_containers_errors_total
	Cumulative number of errors when starting containers

	Stability Level:ALPHA
	Type: Counter
	Labels:codecontainer_typeComponents:kubelet (/metrics)

	kubelet_started_containers_total
	Cumulative number of containers started

	Stability Level:ALPHA
	Type: Counter
	Labels:container_typeComponents:kubelet (/metrics)

	kubelet_started_host_process_containers_errors_total
	Cumulative number of errors when starting hostprocess containers. This metric will only be collected on Windows.

	Stability Level:ALPHA
	Type: Counter
	Labels:codecontainer_typeComponents:kubelet (/metrics)

	kubelet_started_host_process_containers_total
	Cumulative number of hostprocess containers started. This metric will only be collected on Windows.

	Stability Level:ALPHA
	Type: Counter
	Labels:container_typeComponents:kubelet (/metrics)

	kubelet_started_pods_errors_total
	Cumulative number of errors when starting pods

	Stability Level:ALPHA
	Type: Counter
	Components:kubelet (/metrics)

	kubelet_started_pods_total
	Cumulative number of pods started

	Stability Level:ALPHA
	Type: Counter
	Components:kubelet (/metrics)

	kubelet_started_user_namespaced_pods_errors_total
	Cumulative number of errors when starting pods with user namespaces. This metric will only be collected on Linux.

	Stability Level:ALPHA
	Type: Counter
	Components:kubelet (/metrics)

	kubelet_started_user_namespaced_pods_total
	Cumulative number of pods with user namespaces started. This metric will only be collected on Linux.

	Stability Level:ALPHA
	Type: Counter
	Components:kubelet (/metrics)

	kubelet_terminated_containers_total
	Cumulative number of container terminations.

	Stability Level:ALPHA
	Type: Counter
	Labels:container_typeexit_codereasonComponents:kubelet (/metrics)

	kubelet_topology_manager_admission_duration_ms
	Duration in milliseconds to serve a pod admission request.

	Stability Level:ALPHA
	Type: Histogram
	Components:kubelet (/metrics)

	kubelet_topology_manager_admission_errors_total
	The number of admission request failures where resources could not be aligned.

	Stability Level:ALPHA
	Type: Counter
	Components:kubelet (/metrics)

	kubelet_topology_manager_admission_requests_total
	The number of admission requests where resources have to be aligned.

	Stability Level:ALPHA
	Type: Counter
	Components:kubelet (/metrics)

	kubelet_volume_metric_collection_duration_seconds
	Duration in seconds to calculate volume stats

	Stability Level:ALPHA
	Type: Histogram
	Labels:metric_sourceComponents:kubelet (/metrics)

	kubelet_volume_stats_available_bytes
	Number of available bytes in the volume

	Stability Level:ALPHA
	Type: Custom
	Labels:namespacepersistentvolumeclaimComponents:kubelet (/metrics)

	kubelet_volume_stats_capacity_bytes
	Capacity in bytes of the volume

	Stability Level:ALPHA
	Type: Custom
	Labels:namespacepersistentvolumeclaimComponents:kubelet (/metrics)

	kubelet_volume_stats_inodes
	Maximum number of inodes in the volume

	Stability Level:ALPHA
	Type: Custom
	Labels:namespacepersistentvolumeclaimComponents:kubelet (/metrics)

	kubelet_volume_stats_inodes_free
	Number of free inodes in the volume

	Stability Level:ALPHA
	Type: Custom
	Labels:namespacepersistentvolumeclaimComponents:kubelet (/metrics)

	kubelet_volume_stats_inodes_used
	Number of used inodes in the volume

	Stability Level:ALPHA
	Type: Custom
	Labels:namespacepersistentvolumeclaimComponents:kubelet (/metrics)

	kubelet_volume_stats_used_bytes
	Number of used bytes in the volume

	Stability Level:ALPHA
	Type: Custom
	Labels:namespacepersistentvolumeclaimComponents:kubelet (/metrics)

	kubelet_websocket_streaming_requests_total
	Total number of WebSocket streaming requests (exec/attach/portforward) received by the kubelet.

	Stability Level:ALPHA
	Type: Counter
	Labels:subresourceComponents:kubelet (/metrics)

	kubelet_working_pods
	Number of pods the kubelet is actually running, broken down by lifecycle phase, whether the pod is desired, orphaned, or runtime only (also orphaned), and whether the pod is static. An orphaned pod has been removed from local configuration or force deleted in the API and consumes resources that are not otherwise visible.

	Stability Level:ALPHA
	Type: Gauge
	Labels:configlifecyclestaticComponents:kubelet (/metrics)

	kubeproxy_conntrack_reconciler_deleted_entries_total
	Cumulative conntrack flows deleted by conntrack reconciler

	Stability Level:ALPHA
	Type: Counter
	Labels:ip_familyComponents:kube-proxy (/metrics)

	kubeproxy_conntrack_reconciler_sync_duration_seconds
	ReconcileConntrackFlowsLatency latency in seconds

	Stability Level:ALPHA
	Type: Histogram
	Labels:ip_familyComponents:kube-proxy (/metrics)

	kubeproxy_iptables_ct_state_invalid_dropped_packets_total
	packets dropped by iptables to work around conntrack problems

	Stability Level:ALPHA
	Type: Custom
	Components:kube-proxy (/metrics)

	kubeproxy_iptables_localhost_nodeports_accepted_packets_total
	Number of packets accepted on nodeports of loopback interface

	Stability Level:ALPHA
	Type: Custom
	Components:kube-proxy (/metrics)

	kubeproxy_network_programming_duration_seconds
	In Cluster Network Programming Latency in seconds

	Stability Level:ALPHA
	Type: Histogram
	Labels:ip_familyComponents:kube-proxy (/metrics)

	kubeproxy_nftables_localhost_nodeport_listener_creation_failures_total
	Number of localhost NodePort userspace proxy listener creation failures.

	Stability Level:ALPHA
	Type: Counter
	Labels:ip_familyComponents:kube-proxy (/metrics)

	kubeproxy_nftables_localhost_nodeport_listeners
	Number of active localhost NodePort userspace proxy listeners.

	Stability Level:ALPHA
	Type: Gauge
	Labels:ip_familyComponents:kube-proxy (/metrics)

	kubeproxy_nftables_localhost_nodeport_rejected_packets_total
	Number of packets rejected on localhost NodePorts. UDP and SCTP are always rejected; TCP is rejected when the localhost NodePort proxy is not running

	Stability Level:ALPHA
	Type: Custom
	Labels:ip_familyprotocolComponents:kube-proxy (/metrics)

	kubeproxy_proxy_healthz_total
	Cumulative proxy healthz HTTP status

	Stability Level:ALPHA
	Type: Counter
	Labels:codeComponents:kube-proxy (/metrics)

	kubeproxy_proxy_livez_total
	Cumulative proxy livez HTTP status

	Stability Level:ALPHA
	Type: Counter
	Labels:codeComponents:kube-proxy (/metrics)

	kubeproxy_sync_full_proxy_rules_duration_seconds
	SyncProxyRules latency in seconds for full resyncs

	Stability Level:ALPHA
	Type: Histogram
	Labels:ip_familyComponents:kube-proxy (/metrics)

	kubeproxy_sync_partial_proxy_rules_duration_seconds
	SyncProxyRules latency in seconds for partial resyncs

	Stability Level:ALPHA
	Type: Histogram
	Labels:ip_familyComponents:kube-proxy (/metrics)

	kubeproxy_sync_proxy_rules_duration_seconds
	SyncProxyRules latency in seconds

	Stability Level:ALPHA
	Type: Histogram
	Labels:ip_familyComponents:kube-proxy (/metrics)

	kubeproxy_sync_proxy_rules_endpoint_changes_pending
	Pending proxy rules Endpoint changes

	Stability Level:ALPHA
	Type: Gauge
	Components:kube-proxy (/metrics)

	kubeproxy_sync_proxy_rules_endpoint_changes_total
	Cumulative proxy rules Endpoint changes

	Stability Level:ALPHA
	Type: Counter
	Components:kube-proxy (/metrics)

	kubeproxy_sync_proxy_rules_iptables_last
	Number of iptables rules written by kube-proxy in last sync

	Stability Level:ALPHA
	Type: Gauge
	Labels:ip_familytableComponents:kube-proxy (/metrics)

	kubeproxy_sync_proxy_rules_iptables_partial_restore_failures_total
	Cumulative proxy iptables partial restore failures

	Stability Level:ALPHA
	Type: Counter
	Labels:ip_familyComponents:kube-proxy (/metrics)

	kubeproxy_sync_proxy_rules_iptables_restore_failures_total
	Cumulative proxy iptables restore failures

	Stability Level:ALPHA
	Type: Counter
	Labels:ip_familyComponents:kube-proxy (/metrics)

	kubeproxy_sync_proxy_rules_iptables_total
	Total number of iptables rules owned by kube-proxy

	Stability Level:ALPHA
	Type: Gauge
	Labels:ip_familytableComponents:kube-proxy (/metrics)

	kubeproxy_sync_proxy_rules_last_queued_timestamp_seconds
	The last time a sync of proxy rules was queued

	Stability Level:ALPHA
	Type: Gauge
	Labels:ip_familyComponents:kube-proxy (/metrics)

	kubeproxy_sync_proxy_rules_last_timestamp_seconds
	The last time proxy rules were successfully synced

	Stability Level:ALPHA
	Type: Gauge
	Labels:ip_familyComponents:kube-proxy (/metrics)

	kubeproxy_sync_proxy_rules_nftables_cleanup_failures_total
	Cumulative proxy nftables cleanup failures

	Stability Level:ALPHA
	Type: Counter
	Labels:ip_familyComponents:kube-proxy (/metrics)

	kubeproxy_sync_proxy_rules_nftables_sync_failures_total
	Cumulative proxy nftables sync failures

	Stability Level:ALPHA
	Type: Counter
	Labels:ip_familyComponents:kube-proxy (/metrics)

	kubeproxy_sync_proxy_rules_no_local_endpoints_total
	Number of services with a Local traffic policy and no endpoints

	Stability Level:ALPHA
	Type: Gauge
	Labels:ip_familytraffic_policyComponents:kube-proxy (/metrics)

	kubeproxy_sync_proxy_rules_service_changes_pending
	Pending proxy rules Service changes

	Stability Level:ALPHA
	Type: Gauge
	Components:kube-proxy (/metrics)

	kubeproxy_sync_proxy_rules_service_changes_total
	Cumulative proxy rules Service changes

	Stability Level:ALPHA
	Type: Counter
	Components:kube-proxy (/metrics)

	kubeproxy_sync_proxy_rules_winkernel_lb_create_failures_total
	Cumulative proxy winkernel lb create failures

	Stability Level:ALPHA
	Type: Counter
	Labels:errorip_familylb_typeComponents:kube-proxy (/metrics)

	kubeproxy_sync_proxy_rules_winkernel_lb_delete_failures_total
	Cumulative proxy winkernel lb delete failures

	Stability Level:ALPHA
	Type: Counter
	Labels:errorip_familylb_typeComponents:kube-proxy (/metrics)

	kubeproxy_sync_proxy_rules_winkernel_lb_update_failures_total
	Cumulative proxy winkernel lb update failures

	Stability Level:ALPHA
	Type: Counter
	Labels:errorip_familylb_typeComponents:kube-proxy (/metrics)

	leader_election_master_status
	Gauge of if the reporting system is master of the relevant lease, 0 indicates backup, 1 indicates master. 'name' is the string used to identify the lease. Please make sure to group by name.

	Stability Level:ALPHA
	Type: Gauge
	Labels:nameComponents:cloud-controller-manager (/metrics)kube-apiserver (/metrics)kube-controller-manager (/metrics)kube-proxy (/metrics)kube-scheduler (/metrics)kubelet (/metrics)

	leader_election_slowpath_total
	Total number of slow path exercised in renewing leader leases. 'name' is the string used to identify the lease. Please make sure to group by name.

	Stability Level:ALPHA
	Type: Counter
	Labels:nameComponents:cloud-controller-manager (/metrics)kube-apiserver (/metrics)kube-controller-manager (/metrics)kube-proxy (/metrics)kube-scheduler (/metrics)kubelet (/metrics)

	node_authorizer_graph_actions_duration_seconds
	Histogram of duration of graph actions in node authorizer.

	Stability Level:ALPHA
	Type: Histogram
	Labels:operationComponents:kube-apiserver (/metrics)

	node_collector_unhealthy_nodes_in_zone
	Gauge measuring number of not Ready Nodes per zones.

	Stability Level:ALPHA
	Type: Gauge
	Labels:zoneComponents:kube-controller-manager (/metrics)

	node_collector_update_all_nodes_health_duration_seconds
	Duration in seconds for NodeController to update the health of all nodes.
