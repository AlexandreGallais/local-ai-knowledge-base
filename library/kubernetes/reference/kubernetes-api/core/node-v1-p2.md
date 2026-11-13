---
title: "Node (part 2 of 8)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/core/node-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Node (part 2 of 8)

## NodeRuntimeHandlerFeatures {#NodeRuntimeHandlerFeatures}

NodeRuntimeHandlerFeatures is a set of features implemented by the runtime handler.

   | Field | Description

       | `recursiveReadOnlyMounts`boolean
       | RecursiveReadOnlyMounts is set to true if the runtime handler supports RecursiveReadOnlyMounts.

       | `userNamespaces`boolean
       | UserNamespaces is set to true if the runtime handler supports UserNamespaces, including for volumes.

## NodeSwapStatus {#NodeSwapStatus}

NodeSwapStatus represents swap memory information.

   | Field | Description

       | `capacity`integer
       | Total amount of swap memory in bytes.

## NodeSystemInfo {#NodeSystemInfo}

NodeSystemInfo is a set of ids/uuids to uniquely identify the node.

   | Field | Description

       | `architecture` *string
       | The Architecture reported by the node

       | `bootID` *string
       | Boot ID reported by the node.

       | `containerRuntimeVersion` *string
       | ContainerRuntime Version reported by the node through runtime remote API (e.g. containerd://1.4.2).

       | `kernelVersion` *string
       | Kernel Version reported by the node from 'uname -r' (e.g. 3.16.0-0.bpo.4-amd64).

       | `kubeProxyVersion` *string
       | Deprecated: KubeProxy Version reported by the node.

       | `kubeletVersion` *string
       | Kubelet Version reported by the node.

       | `machineID` *string
       | MachineID reported by the node. For unique machine identification in the cluster this field is preferred. Learn more from man(5) machine-id: http://man7.org/linux/man-pages/man5/machine-id.5.html

       | `operatingSystem` *string
       | The Operating System reported by the node

       | `osImage` *string
       | OS Image reported by the node from /etc/os-release (e.g. Debian GNU/Linux 7 (wheezy)).

       | `runningInUserNamespace`boolean
       | Whether the node is running in a user namespace.

       | `swap`NodeSwapStatus
       | Swap Info reported by the node.

       | `systemUUID` *string
       | SystemUUID reported by the node. For unique machine identification MachineID is preferred. This field is specific to Red Hat hosts https://access.redhat.com/documentation/en-us/red_hat_subscription_management/1/html/rhsm/uuid

## Taint {#Taint}

The node this Taint is attached to has the &#34;effect&#34; on any pod that does not tolerate the Taint.

   | Field | Description

       | `effect` *string
       | Required. The effect of the taint on pods that do not tolerate the taint. Valid effects are NoSchedule, PreferNoSchedule and NoExecute.Possible enum values: - `"NoExecute"` Evict any already-running pods that do not tolerate the taint. Currently enforced by NodeController. - `"NoSchedule"` Do not allow new pods to schedule onto the node unless they tolerate the taint, but allow all pods submitted to Kubelet without going through the scheduler to start, and allow all already-running pods to continue running. Enforced by the scheduler. - `"PreferNoSchedule"` Like TaintEffectNoSchedule, but the scheduler tries not to schedule new pods onto the node, rather than prohibiting new pods from scheduling onto the node entirely. Enforced by the scheduler.

       | `key` *string
       | Required. The taint key to be applied to a node.

       | `timeAdded`Time
       | TimeAdded represents the time at which the taint was added.

       | `value`string
       | The taint value corresponding to the taint key.
