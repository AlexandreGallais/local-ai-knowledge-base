---
title: "Kubernetes Metrics Reference (part 13 of 13)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/instrumentation/metrics.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Kubernetes Metrics Reference (part 13 of 13)

Stability Level:ALPHA
	Type: Counter
	Labels:operation_nameplugin_nameComponents:kube-controller-manager (/metrics)Deprecated Versions:1.36.0

	watch_cache_capacity
	Total capacity of watch cache broken by resource type.

	Stability Level:ALPHA
	Type: Gauge
	Labels:groupresourceComponents:kube-apiserver (/metrics)

	watch_cache_capacity_decrease_total
	Total number of watch cache capacity decrease events broken by resource type.

	Stability Level:ALPHA
	Type: Counter
	Labels:groupresourceComponents:kube-apiserver (/metrics)

	watch_cache_capacity_increase_total
	Total number of watch cache capacity increase events broken by resource type.

	Stability Level:ALPHA
	Type: Counter
	Labels:groupresourceComponents:kube-apiserver (/metrics)
