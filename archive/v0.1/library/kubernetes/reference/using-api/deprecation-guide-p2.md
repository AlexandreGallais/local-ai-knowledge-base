---
title: "Deprecated API Migration Guide (part 2 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/using-api/deprecation-guide.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Deprecated API Migration Guide (part 2 of 3)

## Removed APIs by release

### v1.32

The **v1.32** release stopped serving the following deprecated API versions:

#### Flow control resources {#flowcontrol-resources-v132}

The **flowcontrol.apiserver.k8s.io/v1beta3** API version of FlowSchema and PriorityLevelConfiguration is no longer served as of v1.32.

* Migrate manifests and API clients to use the **flowcontrol.apiserver.k8s.io/v1** API version, available since v1.29.
* All existing persisted objects are accessible via the new API
* Notable changes in **flowcontrol.apiserver.k8s.io/v1**:
  * The PriorityLevelConfiguration `spec.limited.nominalConcurrencyShares` field only defaults to 30 when unspecified, and an explicit value of 0 is not changed to 30.

### v1.29

The **v1.29** release stopped serving the following deprecated API versions:

#### Flow control resources {#flowcontrol-resources-v129}

The **flowcontrol.apiserver.k8s.io/v1beta2** API version of FlowSchema and PriorityLevelConfiguration is no longer served as of v1.29.

* Migrate manifests and API clients to use the **flowcontrol.apiserver.k8s.io/v1** API version, available since v1.29, or the **flowcontrol.apiserver.k8s.io/v1beta3** API version, available since v1.26.
* All existing persisted objects are accessible via the new API
* Notable changes in **flowcontrol.apiserver.k8s.io/v1**:
  * The PriorityLevelConfiguration `spec.limited.assuredConcurrencyShares` field is renamed to `spec.limited.nominalConcurrencyShares` and only defaults to 30 when unspecified, and an explicit value of 0 is not changed to 30.
* Notable changes in **flowcontrol.apiserver.k8s.io/v1beta3**:
  * The PriorityLevelConfiguration `spec.limited.assuredConcurrencyShares` field is renamed to `spec.limited.nominalConcurrencyShares`

### v1.27

The **v1.27** release stopped serving the following deprecated API versions:

#### CSIStorageCapacity {#csistoragecapacity-v127}

The **storage.k8s.io/v1beta1** API version of CSIStorageCapacity is no longer served as of v1.27.

* Migrate manifests and API clients to use the **storage.k8s.io/v1** API version, available since v1.24.
* All existing persisted objects are accessible via the new API
* No notable changes

### v1.26

The **v1.26** release stopped serving the following deprecated API versions:

#### Flow control resources {#flowcontrol-resources-v126}

The **flowcontrol.apiserver.k8s.io/v1beta1** API version of FlowSchema and PriorityLevelConfiguration is no longer served as of v1.26.

* Migrate manifests and API clients to use the **flowcontrol.apiserver.k8s.io/v1beta2** API version.
* All existing persisted objects are accessible via the new API
* No notable changes

#### HorizontalPodAutoscaler {#horizontalpodautoscaler-v126}

The **autoscaling/v2beta2** API version of HorizontalPodAutoscaler is no longer served as of v1.26.

* Migrate manifests and API clients to use the **autoscaling/v2** API version, available since v1.23.
* All existing persisted objects are accessible via the new API
* Notable changes:
  * `targetAverageUtilization` is replaced with `target.averageUtilization` and `target.type: Utilization`. See Autoscaling on multiple metrics and custom metrics.
### v1.25

The **v1.25** release stopped serving the following deprecated API versions:

#### CronJob {#cronjob-v125}

The **batch/v1beta1** API version of CronJob is no longer served as of v1.25.

* Migrate manifests and API clients to use the **batch/v1** API version, available since v1.21.
* All existing persisted objects are accessible via the new API
* No notable changes

#### EndpointSlice {#endpointslice-v125}

The **discovery.k8s.io/v1beta1** API version of EndpointSlice is no longer served as of v1.25.

* Migrate manifests and API clients to use the **discovery.k8s.io/v1** API version, available since v1.21.
* All existing persisted objects are accessible via the new API
* Notable changes in **discovery.k8s.io/v1**:
  * use per Endpoint `nodeName` field instead of deprecated `topology["kubernetes.io/hostname"]` field
  * use per Endpoint `zone` field instead of deprecated `topology["topology.kubernetes.io/zone"]` field
  * `topology` is replaced with the `deprecatedTopology` field which is not writable in v1

#### Event {#event-v125}

The **events.k8s.io/v1beta1** API version of Event is no longer served as of v1.25.

* Migrate manifests and API clients to use the **events.k8s.io/v1** API version, available since v1.19.
* All existing persisted objects are accessible via the new API
* Notable changes in **events.k8s.io/v1**:
  * `type` is limited to `Normal` and `Warning`
  * `involvedObject` is renamed to `regarding`
  * `action`, `reason`, `reportingController`, and `reportingInstance` are required
    when creating new **events.k8s.io/v1** Events
  * use `eventTime` instead of the deprecated `firstTimestamp` field (which is renamed
    to `deprecatedFirstTimestamp` and not permitted in new **events.k8s.io/v1** Events)
  * use `series.lastObservedTime` instead of the deprecated `lastTimestamp` field
    (which is renamed to `deprecatedLastTimestamp` and not permitted in new **events.k8s.io/v1** Events)
  * use `series.count` instead of the deprecated `count` field
    (which is renamed to `deprecatedCount` and not permitted in new **events.k8s.io/v1** Events)
  * use `reportingController` instead of the deprecated `source.component` field
    (which is renamed to `deprecatedSource.component` and not permitted in new **events.k8s.io/v1** Events)
  * use `reportingInstance` instead of the deprecated `source.host` field
    (which is renamed to `deprecatedSource.host` and not permitted in new **events.k8s.io/v1** Events)

#### HorizontalPodAutoscaler {#horizontalpodautoscaler-v125}

The **autoscaling/v2beta1** API version of HorizontalPodAutoscaler is no longer served as of v1.25.

* Migrate manifests and API clients to use the **autoscaling/v2** API version, available since v1.23.
* All existing persisted objects are accessible via the new API
* Notable changes:
  * `targetAverageUtilization` is replaced with `target.averageUtilization` and `target.type: Utilization`. See Autoscaling on multiple metrics and custom metrics.

#### PodDisruptionBudget {#poddisruptionbudget-v125}

The **policy/v1beta1** API version of PodDisruptionBudget is no longer served as of v1.25.

* Migrate manifests and API clients to use the **policy/v1** API version, available since v1.21.
* All existing persisted objects are accessible via the new API
* Notable changes in **policy/v1**:
  * an empty `spec.selector` (`{}`) written to a `policy/v1` PodDisruptionBudget selects all
    pods in the namespace (in `policy/v1beta1` an empty `spec.selector` selected no pods).
    An unset `spec.selector` selects no pods in either API version.

#### PodSecurityPolicy {#psp-v125}

PodSecurityPolicy in the **policy/v1beta1** API version is no longer served as of v1.25,
and the PodSecurityPolicy admission controller will be removed.

Migrate to Pod Security Admission
or a 3rd party admission webhook.
For a migration guide, see Migrate from PodSecurityPolicy to the Built-In PodSecurity Admission Controller.
For more information on the deprecation, see PodSecurityPolicy Deprecation: Past, Present, and Future.

#### RuntimeClass {#runtimeclass-v125}

RuntimeClass in the **node.k8s.io/v1beta1** API version is no longer served as of v1.25.

* Migrate manifests and API clients to use the **node.k8s.io/v1** API version, available since v1.20.
* All existing persisted objects are accessible via the new API
* No notable changes
