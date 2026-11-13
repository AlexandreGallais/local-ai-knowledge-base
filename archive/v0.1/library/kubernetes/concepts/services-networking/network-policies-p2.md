---
title: "Network Policies (part 2 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/services-networking/network-policies.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Network Policies (part 2 of 2)

## Targeting multiple namespaces by label

In this scenario, your `Egress` NetworkPolicy targets more than one namespace using their
label names. For this to work, you need to label the target namespaces. For example:

```shell
kubectl label namespace frontend namespace=frontend
kubectl label namespace backend namespace=backend
```

Add the labels under `namespaceSelector` in your NetworkPolicy document. For example:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: egress-namespaces
spec:
  podSelector:
    matchLabels:
      app: myapp
  policyTypes:
  - Egress
  egress:
  - to:
    - namespaceSelector:
        matchExpressions:
        - key: <example-value>
          operator: In
          values: ["frontend", "backend"]
```

**Note:**
It is not possible to directly specify the name of the namespaces in a NetworkPolicy.
You must use a `namespaceSelector` with `matchLabels` or `matchExpressions` to select the
namespaces based on their labels.

## Targeting a Namespace by its name

The Kubernetes control plane sets an immutable label `kubernetes.io/metadata.name` on all
namespaces, the value of the label is the namespace name.

While NetworkPolicy cannot target a namespace by its name with some object field, you can use the
standardized label to target a specific namespace.

## Pod lifecycle

**Note:**
The following applies to clusters with a conformant networking plugin and a conformant implementation of
NetworkPolicy.

When a new NetworkPolicy object is created, it may take some time for a network plugin
to handle the new object. If a pod that is affected by a NetworkPolicy
is created before the network plugin has completed NetworkPolicy handling,
that pod may be started unprotected, and isolation rules will be applied when
the NetworkPolicy handling is completed.

Once the NetworkPolicy is handled by a network plugin,

1. All newly created pods affected by a given NetworkPolicy will be isolated before they are started.
   Implementations of NetworkPolicy must ensure that filtering is effective throughout
   the Pod lifecycle, even from the very first instant that any container in that Pod is started.
   Because they are applied at Pod level, NetworkPolicies apply equally to init containers,
   sidecar containers, and regular containers.

1. Allow rules will be applied eventually after the isolation rules (or may be applied at the same time).
   In the worst case, a newly created pod may have no network connectivity at all when it is first started, if
   isolation rules were already applied, but no allow rules were applied yet.

Every created NetworkPolicy will be handled by a network plugin eventually, but there is no
way to tell from the Kubernetes API when exactly that happens.

Therefore, pods must be resilient against being started up with different network
connectivity than expected. If you need to make sure the pod can reach certain destinations
before being started, you can use an init container
to wait for those destinations to be reachable before kubelet starts the app containers.

Every NetworkPolicy will be applied to all selected pods eventually.
Because the network plugin may implement NetworkPolicy in a distributed manner,
it is possible that pods may see a slightly inconsistent view of network policies
when the pod is first created, or when pods or policies change.
For example, a newly-created pod that is supposed to be able to reach both Pod A
on Node 1 and Pod B on Node 2 may find that it can reach Pod A immediately,
but cannot reach Pod B until a few seconds later.

## NetworkPolicy and `hostNetwork` pods

NetworkPolicy behaviour for `hostNetwork` pods is undefined, but it should be limited to 2 possibilities:

- The network plugin can distinguish `hostNetwork` pod traffic from all other traffic
  (including being able to distinguish traffic from different `hostNetwork` pods on
  the same node), and will apply NetworkPolicy to `hostNetwork` pods just like it does
  to pod-network pods.
- The network plugin cannot properly distinguish `hostNetwork` pod traffic,
  and so it ignores `hostNetwork` pods when matching `podSelector` and `namespaceSelector`.
  Traffic to/from `hostNetwork` pods is treated the same as all other traffic to/from the node IP.
  (This is the most common implementation.)

This applies when

1. a `hostNetwork` pod is selected by `spec.podSelector`.

   ```yaml
     ...
     spec:
       podSelector:
         matchLabels:
           role: client
     ...
   ```

1. a `hostNetwork` pod is selected by a `podSelector` or `namespaceSelector` in an `ingress` or `egress` rule.

   ```yaml
     ...
     ingress:
       - from:
         - podSelector:
             matchLabels:
               role: client
     ...
   ```

At the same time, since `hostNetwork` pods have the same IP addresses as the nodes they reside on,
their connections will be treated as node connections. For example, you can allow traffic
from a `hostNetwork` Pod using an `ipBlock` rule.

## What you can't do with network policies (at least, not yet)

As of Kubernetes , the following functionality does not exist in the
NetworkPolicy API, but you might be able to implement workarounds using Operating System
components (such as SELinux, OpenVSwitch, IPTables, and so on) or Layer 7 technologies (Ingress
controllers, Service Mesh implementations) or admission controllers. In case you are new to
network security in Kubernetes, its worth noting that the following User Stories cannot (yet) be
implemented using the NetworkPolicy API.

- Forcing internal cluster traffic to go through a common gateway (this might be best served with
  a service mesh or other proxy).
- Anything TLS related (use a service mesh or ingress controller for this).
- Node specific policies (you can use CIDR notation for these, but you cannot target nodes by
  their Kubernetes identities specifically).
- Targeting of services by name (you can, however, target pods or namespaces by their
  labels, which is often a viable workaround).
- Creation or management of "Policy requests" that are fulfilled by a third party.
- Default policies which are applied to all namespaces or pods (there are some third party
  Kubernetes distributions and projects which can do this).
- Advanced policy querying and reachability tooling.
- The ability to log network security events (for example connections that are blocked or accepted).
- The ability to explicitly deny policies (currently the model for NetworkPolicies are deny by
  default, with only the ability to add allow rules).
- The ability to prevent loopback or incoming host traffic (Pods cannot currently block localhost
  access, nor do they have the ability to block access from their resident node).

## NetworkPolicy's impact on existing connections

When the set of NetworkPolicies that applies to an existing connection changes - this could happen
either due to a change in NetworkPolicies or if the relevant labels of the namespaces/pods selected by the
policy (both subject and peers) are changed in the middle of an existing connection - it is
implementation defined as to whether the change will take effect for that existing connection or not.
Example: A policy is created that leads to denying a previously allowed connection, the underlying network plugin
implementation is responsible for defining if that new policy will close the existing connections or not.
It is recommended not to modify policies/pods/namespaces in ways that might affect existing connections.

## What's next

- See the Declare Network Policy
  walkthrough for further examples.
- See more recipes for common
  scenarios enabled by the NetworkPolicy resource.
