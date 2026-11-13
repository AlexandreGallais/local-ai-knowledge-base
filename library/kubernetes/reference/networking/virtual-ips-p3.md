---
title: "Virtual IPs and Service Proxies (part 3 of 4)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/networking/virtual-ips.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Virtual IPs and Service Proxies (part 3 of 4)

### `kernelspace` proxy mode {#proxy-mode-kernelspace}

_This proxy mode is only available on Windows nodes._

The kube-proxy configures packet filtering rules in the Windows _Virtual Filtering Platform_ (VFP),
an extension to Windows vSwitch. These rules process encapsulated packets within the node-level
virtual networks, and rewrite packets so that the destination IP address (and layer 2 information)
is correct for getting the packet routed to the correct destination.
The Windows VFP is analogous to tools such as Linux `nftables` or `iptables`. The Windows VFP extends
the _Hyper-V Switch_, which was initially implemented to support virtual machine networking.

When a Pod on a node sends traffic to a virtual IP address, and the kube-proxy selects a Pod on
a different node as the load balancing target, the `kernelspace` proxy mode rewrites that packet
to be destined to the target backend Pod. The Windows _Host Networking Service_ (HNS) ensures that
packet rewriting rules are configured so that the return traffic appears to come from the virtual
IP address and not the specific backend Pod.

#### Direct server return for `kernelspace` mode {#windows-direct-server-return}

**Feature state:**

As an alternative to the basic operation, a node that hosts the backend Pod for a Service can
apply the packet rewriting directly, rather than placing this burden on the node where the client
Pod is running. This is called _direct server return_.

To use this, you must run kube-proxy with the `--enable-dsr` command line argument **and**
enable the `WinDSR` feature gate.

Direct server return also optimizes the case for Pod return traffic even when both Pods
are running on the same node.

## Session affinity

In these proxy models, the traffic bound for the Service's IP:Port is
proxied to an appropriate backend without the clients knowing anything
about Kubernetes or Services or Pods.

If you want to make sure that connections from a particular client
are passed to the same Pod each time, you can select the session affinity based
on the client's IP addresses by setting `.spec.sessionAffinity` to `ClientIP`
for a Service (the default is `None`).

### Session stickiness timeout

You can also set the maximum session sticky time by setting
`.spec.sessionAffinityConfig.clientIP.timeoutSeconds` appropriately for a Service.
(the default value is 10800, which works out to be 3 hours).

**Note:**
On Windows, setting the maximum session sticky time for Services is not supported.

## IP address assignment to Services

Unlike Pod IP addresses, which actually route to a fixed destination,
Service IPs are not actually answered by a single host. Instead, kube-proxy
uses packet processing logic (such as Linux iptables) to define _virtual_ IP
addresses which are transparently redirected as needed.

When clients connect to the VIP, their traffic is automatically transported to an
appropriate endpoint. The environment variables and DNS for Services are actually
populated in terms of the Service's virtual IP address (and port).

### Avoiding collisions

One of the primary philosophies of Kubernetes is that you should not be
exposed to situations that could cause your actions to fail through no fault
of your own. For the design of the Service resource, this means not making
you choose your own IP address if that choice might collide with
someone else's choice. That is an isolation failure.

In order to allow you to choose an IP address for your Services, we must
ensure that no two Services can collide. Kubernetes does that by allocating each
Service its own IP address from within the `service-cluster-ip-range`
CIDR range that is configured for the API Server.

### IP address allocation tracking

To ensure each Service receives a unique IP address, an internal allocator atomically
updates a global allocation map in etcd
prior to creating each Service. The map object must exist in the registry for
Services to get IP address assignments, otherwise creations will
fail with a message indicating an IP address could not be allocated.

In the control plane, a background controller is responsible for creating that
map (needed to support migrating from older versions of Kubernetes that used
in-memory locking). Kubernetes also uses controllers to check for invalid
assignments (for example: due to administrator intervention) and for cleaning up allocated
IP addresses that are no longer used by any Services.

#### IP address allocation tracking using the Kubernetes API {#ip-address-objects}

**Feature state:**

The control plane replaces the existing etcd allocator with a revised implementation
that uses IPAddress and ServiceCIDR objects instead of an internal global allocation map.
Each cluster IP address associated to a Service then references an IPAddress object.

Enabling the feature gate also replaces a background controller with an alternative
that handles the IPAddress objects and supports migration from the old allocator model.
Kubernetes  does not support migrating from IPAddress
objects to the internal allocation map.

One of the main benefits of the revised allocator is that it removes the size limitations
for the IP address range that can be used for the cluster IP address of Services.
With `MultiCIDRServiceAllocator` enabled, there are no limitations for IPv4, and for IPv6
you can use IP address netmasks that are a /64 or smaller (as opposed to /108 with the
legacy implementation).

Making IP address allocations available via the API means that you as a cluster administrator
can allow users to inspect the IP addresses assigned to their Services.
Kubernetes extensions, such as the Gateway API,
can use the IPAddress API to extend Kubernetes' inherent networking capabilities.

Here is a brief example of a user querying for IP addresses:

```shell
kubectl get services
```

```
NAME         TYPE        CLUSTER-IP        EXTERNAL-IP   PORT(S)   AGE
kubernetes   ClusterIP   2001:db8:1:2::1   <none>        443/TCP   3d1h
```

```shell
kubectl get ipaddresses
```

```
NAME              PARENTREF
2001:db8:1:2::1   services/default/kubernetes
2001:db8:1:2::a   services/kube-system/kube-dns
```

Kubernetes also allow users to dynamically define the available IP ranges for Services using
ServiceCIDR objects. During bootstrap, a default ServiceCIDR object named `kubernetes` is created
from the value of the `--service-cluster-ip-range` command line argument to kube-apiserver:

```shell
kubectl get servicecidrs
```

```
NAME         CIDRS         AGE
kubernetes   10.96.0.0/28  17m
```

Users can create or delete new ServiceCIDR objects to manage the available IP ranges for Services:

```shell
cat <<'EOF' | kubectl apply -f -
apiVersion: networking.k8s.io/v1
kind: ServiceCIDR
metadata:
  name: newservicecidr
spec:
  cidrs:
  - 10.96.0.0/24
EOF
```

```
servicecidr.networking.k8s.io/newcidr1 created
```

```shell
kubectl get servicecidrs
```

```
NAME             CIDRS         AGE
kubernetes       10.96.0.0/28  17m
newservicecidr   10.96.0.0/24  7m
```

Distributions or administrators of Kubernetes clusters may want to control that
new Service CIDRs added to the cluster does not overlap with other networks on
the cluster, that only belong to a specific range of IPs or just simple retain
the existing behavior of only having one ServiceCIDR per cluster.  An example of
a Validation Admission Policy to achieve this is:

```yaml
---
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicy
metadata:
  name: "servicecidrs-default"
spec:
  failurePolicy: Fail
  matchConstraints:
    resourceRules:
    - apiGroups:   ["networking.k8s.io"]
      apiVersions: ["v1","v1beta1"]
      operations:  ["CREATE", "UPDATE"]
      resources:   ["servicecidrs"]
  matchConditions:
  - name: 'exclude-default-servicecidr'
    expression: "object.metadata.name != 'kubernetes'"
  variables:
  - name: allowed
    expression: "['10.96.0.0/16','2001:db8::/64']"
  validations:
  - expression: "object.spec.cidrs.all(i , variables.allowed.exists(j , cidr(j).containsCIDR(i)))"
---
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicyBinding
metadata:
  name: "servicecidrs-binding"
spec:
  policyName: "servicecidrs-default"
  validationActions: [Deny,Audit]
---
```

### IP address ranges for Service virtual IP addresses {#service-ip-static-sub-range}

**Feature state:** v1.26 [stable]

Kubernetes divides the `ClusterIP` range into two bands, based on
the size of the configured `service-cluster-ip-range` by using the following formula
`min(max(16, cidrSize / 16), 256)`. That formula means the result is _never less than 16 or
more than 256, with a graduated step function between them_.

Kubernetes prefers to allocate dynamic IP addresses to Services by choosing from the upper band,
which means that if you want to assign a specific IP address to a `type: ClusterIP`
Service, you should manually assign an IP address from the **lower** band. That approach
reduces the risk of a conflict over allocation.

## Traffic policies

You can set the `.spec.internalTrafficPolicy` and `.spec.externalTrafficPolicy` fields
to control how Kubernetes routes traffic to healthy (“ready”) backends.

### Internal traffic policy

**Feature state:** v1.26 [stable]

You can set the `.spec.internalTrafficPolicy` field to control how traffic from
internal sources is routed. Valid values are `Cluster` and `Local`. Set the field to
`Cluster` to route internal traffic to all ready endpoints and `Local` to only route
to ready node-local endpoints. If the traffic policy is `Local` and there are no
node-local endpoints, traffic is dropped by kube-proxy.

### External traffic policy

You can set the `.spec.externalTrafficPolicy` field to control how traffic from
external sources is routed. Valid values are `Cluster` and `Local`. Set the field
to `Cluster` to route external traffic to all ready endpoints and `Local` to only
route to ready node-local endpoints. If the traffic policy is `Local` and there
are no node-local endpoints, the kube-proxy does not forward any traffic for the
relevant Service.

If `Cluster` is specified, all nodes are eligible load balancing targets _as long as_
the node is not being deleted and kube-proxy is healthy. In this mode: load balancer
health checks are configured to target the service proxy's readiness port and path.
In the case of kube-proxy this evaluates to: `${NODE_IP}:10256/healthz`. kube-proxy
will return either an HTTP code 200 or 503. kube-proxy's load balancer health check
endpoint returns 200 if:

1. kube-proxy is healthy, meaning:

   it's able to progress programming the network and isn't timing out while doing
   so (the timeout is defined to be: **2 × `iptables.syncPeriod`**); and

1. the node is not being deleted (there is no deletion timestamp set for the Node).

kube-proxy returns 503 and marks the node as not
eligible when it's being deleted because it supports connection
draining for terminating nodes. A couple of important things occur from the point
of view of a Kubernetes-managed load balancer when a node _is being_ / _is_ deleted.

While deleting:

* kube-proxy will start failing its readiness probe and essentially mark the
  node as not eligible for load balancer traffic. The load balancer health
  check failing causes load balancers which support connection draining to
  allow existing connections to terminate, and block new connections from
  establishing.

When deleted:

* The service controller in the Kubernetes cloud controller manager removes the
  node from the referenced set of eligible targets. Removing any instance from
  the load balancer's set of backend targets immediately terminates all
  connections. This is also the reason kube-proxy first fails the health check
  while the node is deleting.

It's important to note for Kubernetes vendors that if any vendor configures the
kube-proxy readiness probe as a liveness probe: that kube-proxy will start
restarting continuously when a node is deleting until it has been fully deleted.
kube-proxy exposes a `/livez` path which, as opposed to the `/healthz` one, does
**not** consider the Node's deleting state and only its progress programming the
network. `/livez` is therefore the recommended path for anyone looking to define
a livenessProbe for kube-proxy.

Users deploying kube-proxy can inspect both the readiness / liveness state by
evaluating the metrics: `proxy_livez_total` / `proxy_healthz_total`. Both
metrics publish two series, one with the 200 label and one with the 503 one.

For `Local` Services: kube-proxy will return 200 if

1. kube-proxy is healthy/ready, and
1. has a local endpoint on the node in question.

Node deletion does **not** have an impact on kube-proxy's return
code for what concerns load balancer health checks. The reason for this is:
deleting nodes could end up causing an ingress outage should all endpoints
simultaneously be running on said nodes.

The Kubernetes project recommends that cloud provider integration code
configures load balancer health checks that target the service proxy's healthz
port. If you are using or implementing your own virtual IP implementation,
that people can use instead of kube-proxy, you should set up a similar health
checking port with logic that matches the kube-proxy implementation.

### Traffic to terminating endpoints

**Feature state:** v1.28 [stable]

If the `ProxyTerminatingEndpoints`
feature gate
is enabled in kube-proxy and the traffic policy is `Local`, that node's
kube-proxy uses a more complicated algorithm to select endpoints for a Service.
With the feature enabled, kube-proxy checks if the node
has local endpoints and whether or not all the local endpoints are marked as terminating.
If there are local endpoints and **all** of them are terminating, then kube-proxy
will forward traffic to those terminating endpoints. Otherwise, kube-proxy will always
prefer forwarding traffic to endpoints that are not terminating.

This forwarding behavior for terminating endpoints exists to allow `NodePort` and `LoadBalancer`
Services to gracefully drain connections when using `externalTrafficPolicy: Local`.

As a deployment goes through a rolling update, nodes backing a load balancer may transition from
N to 0 replicas of that deployment. In some cases, external load balancers can send traffic to
a node with 0 replicas in between health check probes. Routing traffic to terminating endpoints
ensures that Nodes that are scaling down Pods can gracefully receive and drain traffic to
those terminating Pods. By the time the Pod completes termination, the external load balancer
should have seen the node's health check failing and fully removed the node from the backend
pool.
