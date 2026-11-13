---
title: "Virtual IPs and Service Proxies (part 4 of 4)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/networking/virtual-ips.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Virtual IPs and Service Proxies (part 4 of 4)

## Traffic distribution control {#traffic-distribution}

The `spec.trafficDistribution` field within a Kubernetes Service allows you to
express preferences for how traffic should be routed to Service endpoints.

`PreferSameZone`
: This prioritizes sending traffic to endpoints in the same zone as the client.
  The EndpointSlice controller updates EndpointSlices with `hints` to
  communicate this preference, which kube-proxy then uses for routing decisions.
  If a client's zone does not have any available endpoints, traffic will be
  routed cluster-wide for that client.

`PreferSameNode`
: This prioritizes sending traffic to endpoints on the same node as the client.
  As with `PreferSameZone`, the EndpointSlice controller updates
  EndpointSlices with `hints` indicating that a slice should be used for a
  particular node. If a client's node does not have any available endpoints,
  then the service proxy will fall back to "same zone" behavior, or cluster-wide
  if there are no same-zone endpoints either.

`PreferClose` (deprecated)
: This is an older alias for `PreferSameZone` that is less clear about
  the semantics.

In the absence of any value for `trafficDistribution`, the default strategy is
to distribute traffic evenly to all endpoints in the cluster.

### Comparison with `service.kubernetes.io/topology-mode: Auto`

The `trafficDistribution` field with `PreferSameZone`, and the older "Topology-Aware
Routing" feature using the `service.kubernetes.io/topology-mode: Auto`
annotation both aim to prioritize same-zone traffic. However, there is a key
difference in their approaches:

* `service.kubernetes.io/topology-mode: Auto` attempts to distribute traffic
  proportionally across zones based on allocatable CPU resources. This heuristic
  includes safeguards (such as the fallback
  behavior
  for small numbers of endpoints), sacrificing some predictability in favor of
  potentially better load balancing.

* `trafficDistribution: PreferSameZone` aims to be simpler and more predictable:
  "If there are endpoints in the zone, they will receive all traffic for that
  zone, if there are no endpoints in a zone, the traffic will be distributed to
  other zones". This approach offers more predictability, but it means that you
  are responsible for avoiding endpoint
  overload.

If the `service.kubernetes.io/topology-mode` annotation is set to `Auto`, it
will take precedence over `trafficDistribution`. The annotation may be deprecated
in the future in favor of the `trafficDistribution` field.

### Interaction with Traffic Policies

When compared to the `trafficDistribution` field, the traffic policy fields
(`externalTrafficPolicy` and `internalTrafficPolicy`) are meant to offer a
stricter traffic locality requirements. Here's how `trafficDistribution`
interacts with them:

* Precedence of Traffic Policies: For a given Service, if a traffic policy
  (`externalTrafficPolicy` or `internalTrafficPolicy`) is set to `Local`, it
  takes precedence over `trafficDistribution` for the corresponding
  traffic type (external or internal, respectively).

* `trafficDistribution` Influence: For a given Service, if a traffic policy
  (`externalTrafficPolicy` or `internalTrafficPolicy`) is set to `Cluster` (the
  default), or if the fields are not set, then `trafficDistribution`
  guides the routing behavior for the corresponding traffic type
  (external or internal, respectively). This means that an attempt will be made
  to route traffic to an endpoint that is in the same zone as the client.

### Considerations for using traffic distribution control

A Service using `trafficDistribution` will attempt to route traffic to (healthy)
endpoints within the appropriate topology, even if this means that some
endpoints receive much more traffic than other endpoints. If you do not have a
sufficient number of endpoints within the same topology ("same zone", "same
node", etc.) as the clients, then endpoints may become overloaded. This is
especially likely if incoming traffic is not proportionally distributed across
the topology. To mitigate this, consider the following strategies:

* Pod Topology Spread Constraints:
  Use Pod Topology Spread Constraints to distribute your pods evenly
  across zones or nodes.

* Zone-specific Deployments: If you are using "same zone" traffic
  distribution, but expect to see different traffic patterns in
  different zones, you can create a separate Deployment for each zone.
  This approach allows the separate workloads to scale independently.
  There are also workload management addons available from the
  ecosystem, outside the Kubernetes project itself, that can help
  here.

## What's next

To learn more about Services,
read Connecting Applications with Services.

You can also:

* Read about Services as a concept
* Read about Ingresses as a concept
* Read the API reference for the Service API
