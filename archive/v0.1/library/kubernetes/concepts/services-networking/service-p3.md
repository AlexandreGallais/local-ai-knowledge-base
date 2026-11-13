---
title: "Service (part 3 of 4)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/services-networking/service.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Service (part 3 of 4)

### `type: LoadBalancer` {#loadbalancer}

On cloud providers which support external load balancers, setting the `type`
field to `LoadBalancer` provisions a load balancer for your Service.
The actual creation of the load balancer happens asynchronously, and
information about the provisioned balancer is published in the Service's
`.status.loadBalancer` field.
For example:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app.kubernetes.io/name: MyApp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9376
  clusterIP: 10.0.171.239
  type: LoadBalancer
status:
  loadBalancer:
    ingress:
    - ip: 192.0.2.127
```

Traffic from the external load balancer is directed at the backend Pods. The cloud
provider decides how it is load balanced.

To implement a Service of `type: LoadBalancer`, Kubernetes typically starts off
by making the changes that are equivalent to you requesting a Service of
`type: NodePort`. The cloud-controller-manager component then configures the external
load balancer to forward traffic to that assigned node port.

You can configure a load balanced Service to
omit assigning a node port, provided that the
cloud provider implementation supports this.

Some cloud providers allow you to specify the `loadBalancerIP`. In those cases, the load-balancer is created
with the user-specified `loadBalancerIP`. If the `loadBalancerIP` field is not specified,
the load balancer is set up with an ephemeral IP address. If you specify a `loadBalancerIP`
but your cloud provider does not support the feature, the `loadbalancerIP` field that you
set is ignored.

**Note:**
The`.spec.loadBalancerIP` field for a Service was deprecated in Kubernetes v1.24.

This field was under-specified and its meaning varies across implementations.
It also cannot support dual-stack networking. This field may be removed in a future API version.

If you're integrating with a provider that supports specifying the load balancer IP address(es)
for a Service via a (provider specific) annotation, you should switch to doing that.

If you are writing code for a load balancer integration with Kubernetes, avoid using this field.
You can integrate with Gateway rather than Service, or you
can define your own (provider specific) annotations on the Service that specify the equivalent detail.

#### Node liveness impact on load balancer traffic

Load balancer health checks are critical to modern applications. They are used to
determine which server (virtual machine, or IP address) the load balancer should
dispatch traffic to. The Kubernetes APIs do not define how health checks have to be
implemented for Kubernetes managed load balancers, instead it's the cloud providers
(and the people implementing integration code) who decide on the behavior. Load
balancer health checks are extensively used within the context of supporting the
`externalTrafficPolicy` field for Services.

#### Load balancers with mixed protocol types

**Feature state:**

By default, for LoadBalancer type of Services, when there is more than one port defined, all
ports must have the same protocol, and the protocol must be one which is supported
by the cloud provider.

The feature gate `MixedProtocolLBService` (enabled by default for the kube-apiserver as of v1.24) allows the use of
different protocols for LoadBalancer type of Services, when there is more than one port defined.

**Note:**
The set of protocols that can be used for load balanced Services is defined by your
cloud provider; they may impose restrictions beyond what the Kubernetes API enforces.

#### Disabling load balancer NodePort allocation {#load-balancer-nodeport-allocation}

**Feature state:** v1.24 [stable]

You can optionally disable node port allocation for a Service of `type: LoadBalancer`, by setting
the field `spec.allocateLoadBalancerNodePorts` to `false`. This should only be used for load balancer implementations
that route traffic directly to pods as opposed to using node ports. By default, `spec.allocateLoadBalancerNodePorts`
is `true` and type LoadBalancer Services will continue to allocate node ports. If `spec.allocateLoadBalancerNodePorts`
is set to `false` on an existing Service with allocated node ports, those node ports will **not** be de-allocated automatically.
You must explicitly remove the `nodePorts` entry in every Service port to de-allocate those node ports.

#### Specifying class of load balancer implementation {#load-balancer-class}

**Feature state:** v1.24 [stable]

For a Service with `type` set to `LoadBalancer`, the `.spec.loadBalancerClass` field
enables you to use a load balancer implementation other than the cloud provider default.

By default, `.spec.loadBalancerClass` is not set and a `LoadBalancer`
type of Service uses the cloud provider's default load balancer implementation if the
cluster is configured with a cloud provider using the `--cloud-provider` component
flag.

If you specify `.spec.loadBalancerClass`, it is assumed that a load balancer
implementation that matches the specified class is watching for Services.
Any default load balancer implementation (for example, the one provided by
the cloud provider) will ignore Services that have this field set.
`spec.loadBalancerClass` can be set on a Service of type `LoadBalancer` only.
Once set, it cannot be changed.
The value of `spec.loadBalancerClass` must be a label-style identifier,
with an optional prefix such as "`internal-vip`" or "`example.com/internal-vip`".
Unprefixed names are reserved for end-users.

#### Load balancer IP address mode {#load-balancer-ip-mode}

For a Service of `type: LoadBalancer`, a controller can set `.status.loadBalancer.ingress.ipMode`.
The `.status.loadBalancer.ingress.ipMode` specifies how the load-balancer IP behaves.
It may be specified only when the `.status.loadBalancer.ingress.ip` field is also specified.

There are two possible values for `.status.loadBalancer.ingress.ipMode`: "VIP" and "Proxy".
The default value is "VIP" meaning that traffic is delivered to the node
with the destination set to the load-balancer's IP and port.
There are two cases when setting this to "Proxy", depending on how the load-balancer
from the cloud provider delivers the traffics:

- If the traffic is delivered to the node then DNATed to the pod, the destination would be set to the node's IP and node port;
- If the traffic is delivered directly to the pod, the destination would be set to the pod's IP and port.

Service implementations may use this information to adjust traffic routing.

#### Internal load balancer

In a mixed environment it is sometimes necessary to route traffic from Services inside the same
(virtual) network address block.

In a split-horizon DNS environment you would need two Services to be able to route both external
and internal traffic to your endpoints.

To set an internal load balancer, add one of the following annotations to your Service
depending on the cloud service provider you're using:

**Default**
Select one of the tabs.

**GCP**

```yaml
metadata:
  name: my-service
  annotations:
    networking.gke.io/load-balancer-type: "Internal"
```

**AWS**

```yaml
metadata:
  name: my-service
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-scheme: "internal"
```

**Azure**

```yaml
metadata:
  name: my-service
  annotations:
    service.beta.kubernetes.io/azure-load-balancer-internal: "true"
```

**IBM Cloud**

```yaml
metadata:
  name: my-service
  annotations:
    service.kubernetes.io/ibm-load-balancer-cloud-provider-ip-type: "private"
```

**OpenStack**

```yaml
metadata:
  name: my-service
  annotations:
    service.beta.kubernetes.io/openstack-internal-load-balancer: "true"
```

**Baidu Cloud**

```yaml
metadata:
  name: my-service
  annotations:
    service.beta.kubernetes.io/cce-load-balancer-internal-vpc: "true"
```

**Tencent Cloud**

```yaml
metadata:
  annotations:
    service.kubernetes.io/qcloud-loadbalancer-internal-subnetid: subnet-xxxxx
```

**Alibaba Cloud**

```yaml
metadata:
  annotations:
    service.beta.kubernetes.io/alibaba-cloud-loadbalancer-address-type: "intranet"
```

**OCI**

```yaml
metadata:
  name: my-service
  annotations:
    service.beta.kubernetes.io/oci-load-balancer-internal: true
```

### `type: ExternalName` {#externalname}

Services of type ExternalName map a Service to a DNS name, not to a typical selector such as
`my-service` or `cassandra`. You specify these Services with the `spec.externalName` parameter.

This Service definition, for example, maps
the `my-service` Service in the `prod` namespace to `my.database.example.com`:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
  namespace: prod
spec:
  type: ExternalName
  externalName: my.database.example.com
```

**Note:**
A Service of `type: ExternalName` accepts an IPv4 address string,
but treats that string as a DNS name comprised of digits,
not as an IP address (the internet does not however allow such names in DNS).
Services with external names that resemble IPv4
addresses are not resolved by DNS servers.

If you want to map a Service directly to a specific IP address, consider using
headless Services.

When looking up the host `my-service.prod.svc.cluster.local`, the cluster DNS Service
returns a `CNAME` record with the value `my.database.example.com`. Accessing
`my-service` works in the same way as other Services but with the crucial
difference that redirection happens at the DNS level rather than via proxying or
forwarding. Should you later decide to move your database into your cluster, you
can start its Pods, add appropriate selectors or endpoints, and change the
Service's `type`.

**Caution:**
You may have trouble using ExternalName for some common protocols, including HTTP and HTTPS.
If you use ExternalName then the hostname used by clients inside your cluster is different from
the name that the ExternalName references.

For protocols that use hostnames this difference may lead to errors or unexpected responses.
HTTP requests will have a `Host:` header that the origin server does not recognize;
TLS servers will not be able to provide a certificate matching the hostname that the client connected to.

## Headless Services

Sometimes you don't need load-balancing and a single Service IP.  In
this case, you can create what are termed _headless Services_, by explicitly
specifying `"None"` for the cluster IP address (`.spec.clusterIP`).

You can use a headless Service to interface with other service discovery mechanisms,
without being tied to Kubernetes' implementation.

For headless Services, a cluster IP is not allocated, kube-proxy does not handle
these Services, and there is no load balancing or proxying done by the platform for them.

A headless Service allows a client to connect to whichever Pod it prefers, directly. Services that are headless don't
configure routes and packet forwarding using
virtual IP addresses and proxies; instead, headless Services report the
endpoint IP addresses of the individual pods via internal DNS records, served through the cluster's
DNS service.
To define a headless Service, you make a Service with `.spec.type` set to ClusterIP (which is also the default for `type`),
and you additionally set `.spec.clusterIP` to None.

The string value None is a special case and is not the same as leaving the `.spec.clusterIP` field unset.

How DNS is automatically configured depends on whether the Service has selectors defined:

### With selectors

For headless Services that define selectors, the endpoints controller creates
EndpointSlices in the Kubernetes API, and modifies the DNS configuration to return
A or AAAA records (IPv4 or IPv6 addresses) that point directly to the Pods backing the Service.

### Without selectors

For headless Services that do not define selectors, the control plane does
not create EndpointSlice objects. However, the DNS system looks for and configures
either:

* DNS CNAME records for `type: ExternalName` Services.
* DNS A / AAAA records for all IP addresses of the Service's ready endpoints,
  for all Service types other than `ExternalName`.
  * For IPv4 endpoints, the DNS system creates A records.
  * For IPv6 endpoints, the DNS system creates AAAA records.

When you define a headless Service without a selector, the `port` must
match the `targetPort`.
