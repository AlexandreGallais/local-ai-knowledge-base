---
title: "Kubernetes Metrics Reference (part 4 of 13)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/instrumentation/metrics.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Kubernetes Metrics Reference (part 4 of 13)

Stability Level:BETA
	Type: Histogram
	Labels:migratedoperation_namestatusvolume_pluginComponents:kubelet (/metrics)

	volume_operation_total_seconds
	Storage operation end to end duration in seconds

	Stability Level:BETA
	Type: Histogram
	Labels:operation_nameplugin_nameComponents:kubelet (/metrics)

	workqueue_adds_total
	Total number of adds handled by workqueue

	Stability Level:BETA
	Type: Counter
	Labels:nameComponents:cloud-controller-manager (/metrics)kube-apiserver (/metrics)kube-controller-manager (/metrics)kube-proxy (/metrics)kube-scheduler (/metrics)kubelet (/metrics)

	workqueue_depth
	Current depth of workqueue

	Stability Level:BETA
	Type: Gauge
	Labels:nameComponents:cloud-controller-manager (/metrics)kube-apiserver (/metrics)kube-controller-manager (/metrics)kube-proxy (/metrics)kube-scheduler (/metrics)kubelet (/metrics)

	workqueue_longest_running_processor_seconds
	How many seconds has the longest running processor for workqueue been running.

	Stability Level:BETA
	Type: Gauge
	Labels:nameComponents:cloud-controller-manager (/metrics)kube-apiserver (/metrics)kube-controller-manager (/metrics)kube-proxy (/metrics)kube-scheduler (/metrics)kubelet (/metrics)

	workqueue_queue_duration_seconds
	How long in seconds an item stays in workqueue before being requested.

	Stability Level:BETA
	Type: Histogram
	Labels:nameComponents:cloud-controller-manager (/metrics)kube-apiserver (/metrics)kube-controller-manager (/metrics)kube-proxy (/metrics)kube-scheduler (/metrics)kubelet (/metrics)

	workqueue_retries_total
	Total number of retries handled by workqueue

	Stability Level:BETA
	Type: Counter
	Labels:nameComponents:cloud-controller-manager (/metrics)kube-apiserver (/metrics)kube-controller-manager (/metrics)kube-proxy (/metrics)kube-scheduler (/metrics)kubelet (/metrics)

	workqueue_unfinished_work_seconds
	How many seconds of work has done that is in progress and hasn't been observed by work_duration. Large values indicate stuck threads. One can deduce the number of stuck threads by observing the rate at which this increases.

	Stability Level:BETA
	Type: Gauge
	Labels:nameComponents:cloud-controller-manager (/metrics)kube-apiserver (/metrics)kube-controller-manager (/metrics)kube-proxy (/metrics)kube-scheduler (/metrics)kubelet (/metrics)

	workqueue_work_duration_seconds
	How long in seconds processing an item from workqueue takes.

	Stability Level:BETA
	Type: Histogram
	Labels:nameComponents:cloud-controller-manager (/metrics)kube-apiserver (/metrics)kube-controller-manager (/metrics)kube-proxy (/metrics)kube-scheduler (/metrics)kubelet (/metrics)
