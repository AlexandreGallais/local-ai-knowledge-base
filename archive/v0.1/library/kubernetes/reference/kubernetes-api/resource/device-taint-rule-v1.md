---
title: "DeviceTaintRule (part 1 of 6)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/resource/device-taint-rule-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# DeviceTaintRule

`apiVersion: resource.k8s.io/v1`

`import "k8s.io/api/resource/v1"`

## DeviceTaintRule {#DeviceTaintRule}

DeviceTaintRule adds one taint to all devices which match the selector. This has the same effect as if the taint was specified directly in the ResourceSlice by the DRA driver.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ObjectMeta
       | Standard object metadata

       | `spec` *DeviceTaintRuleSpec
       | Spec specifies the selector and one taint.  Changing the spec automatically increments the metadata.generation number.

       | `status`DeviceTaintRuleStatus
       | Status provides information about what was requested in the spec.

## DeviceTaintRuleSpec {#DeviceTaintRuleSpec}

DeviceTaintRuleSpec specifies the selector and one taint.

   | Field | Description

       | `deviceSelector`DeviceTaintSelector
       | DeviceSelector defines which device(s) the taint is applied to. All selector criteria must be satisfied for a device to match. The empty selector matches all devices. Without a selector, no devices are matches.

       | `taint` *DeviceTaint
       | The taint that gets applied to matching devices.

## DeviceTaintRuleStatus {#DeviceTaintRuleStatus}

DeviceTaintRuleStatus provides information about an on-going pod eviction.

   | Field | Description

       | `conditions`Condition arraypatch strategy: merge on key `type`
       | Conditions provide information about the state of the DeviceTaintRule and the cluster at some point in time, in a machine-readable and human-readable format.  The following condition is currently defined as part of this API, more may get added: - Type: EvictionInProgress - Status: True if there are currently pods which need to be evicted, False otherwise   (includes the effects which don't cause eviction). - Reason: not specified, may change - Message: includes information about number of pending pods and already evicted pods   in a human-readable format, updated periodically, may change  For `effect: None`, the condition above gets set once for each change to the spec, with the message containing information about what would happen if the effect was `NoExecute`. This feedback can be used to decide whether changing the effect to `NoExecute` will work as intended. It only gets set once to avoid having to constantly update the status.  Must have 8 or fewer entries.

## DeviceTaintRuleList {#DeviceTaintRuleList}

DeviceTaintRuleList is a collection of DeviceTaintRules.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `items` *DeviceTaintRule array
       | Items is the list of DeviceTaintRules.

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ListMeta
       | Standard list metadata

## DeviceTaint {#DeviceTaint}

The device this taint is attached to has the &#34;effect&#34; on any claim which does not tolerate the taint and, through the claim, to pods using the claim.

   | Field | Description

       | `effect` *string
       | The effect of the taint on claims that do not tolerate the taint and through such claims on the pods using them.  Valid effects are None, NoSchedule and NoExecute. PreferNoSchedule as used for nodes is not valid here. More effects may get added in the future. Consumers must treat unknown effects like None.Possible enum values: - `"NoExecute"` Evict any already-running pods that do not tolerate the device taint. - `"NoSchedule"` Do not allow new pods to schedule which use a tainted device unless they tolerate the taint, but allow all pods submitted to Kubelet without going through the scheduler to start, and allow all already-running pods to continue running. - `"None"` No effect, the taint is purely informational.

       | `key` *string
       | The taint key to be applied to a device. Must be a label name.

       | `timeAdded`Time
       | TimeAdded represents the time at which the taint was added or (only in a DeviceTaintRule) the effect was modified. Added automatically during create or update if not set.  In addition, in a DeviceTaintRule a value provided during an update gets replaced with the current time if the provided value is the same as the old one and the new effect is different. Changing the key <example-value> value while keeping the effect unchanged is possible and does not update the time stamp because the eviction which uses it is either already started (NoExecute) or not started yet (NoEffect, NoSchedule).

       | `value`string
       | The taint value corresponding to the taint key. Must be a label value.

## DeviceTaintSelector {#DeviceTaintSelector}

DeviceTaintSelector defines which device(s) a DeviceTaintRule applies to. The empty selector matches all devices. Without a selector, no devices are matched.

   | Field | Description

       | `device`string
       | If device is set, only devices with that name are selected. This field corresponds to slice.spec.devices[].name.  Setting also driver and pool may be required to avoid ambiguity, but is not required.

       | `driver`string
       | If driver is set, only devices from that driver are selected. This fields corresponds to slice.spec.driver.

       | `pool`string
       | If pool is set, only devices in that pool are selected.  Also setting the driver name may be useful to avoid ambiguity when different drivers use the same pool name, but this is not required because selecting pools from different drivers may also be useful, for example when drivers with node-local devices use the node name as their pool name.
