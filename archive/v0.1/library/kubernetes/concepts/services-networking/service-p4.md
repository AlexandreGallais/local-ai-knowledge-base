---
title: "Service (part 4 of 4)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/services-networking/service.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Service (part 4 of 4)

## Discovering services

For clients running inside your cluster, Kubernetes supports two primary modes of
finding a Service: environment variables and DNS.

### Environment variables

When a Pod is run on a Node, the kubelet adds a set of environment variables
for each active Service. It adds `{SVCNAME}_SERVICE_HOST` and `{SVCNAME}_SERVICE_PORT` variables,
where the Service name is upper-cased and dashes are converted to underscores.

For example, the Service `redis-primary` which exposes TCP port 6379 and has been
allocated cluster IP address 10.0.0.11, produces the following environment
variables:

```shell
REDIS_PRIMARY_SERVICE_HOST=10.0.0.11
REDIS_PRIMARY_SERVICE_PORT=6379
REDIS_PRIMARY_PORT=tcp://10.0.0.11:6379
REDIS_PRIMARY_PORT_6379_TCP=tcp://10.0.0.11:6379
REDIS_PRIMARY_PORT_6379_TCP_PROTO=tcp
REDIS_PRIMARY_PORT_6379_TCP_PORT=6379
REDIS_PRIMARY_PORT_6379_TCP_ADDR=10.0.0.11
```

**Note:**
When you have a Pod that needs to access a Service, and you are using
the environment variable method to publish the port and cluster IP to the client
Pods, you must create the Service *before* the client Pods come into existence.
Otherwise, those client Pods won't have their environment variables populated.

If you only use DNS to discover the cluster IP for a Service, you don't need to
worry about this ordering issue.

Kubernetes also supports and provides variables that are compatible with Docker
Engine's "_legacy container links_" feature.
You can read `makeLinkVariables`
to see how this is implemented in Kubernetes.

### DNS

You can (and almost always should) set up a DNS service for your Kubernetes
cluster using an add-on.

A cluster-aware DNS server, such as CoreDNS, watches the Kubernetes API for new
Services and creates a set of DNS records for each one.  If DNS has been enabled
throughout your cluster then all Pods should automatically be able to resolve
Services by their DNS name.

For example, if you have a Service called `my-service` in a Kubernetes
namespace `my-ns`, the control plane and the DNS Service acting together
create a DNS record for `my-service.my-ns`. Pods in the `my-ns` namespace
should be able to find the service by doing a name lookup for `my-service`
(`my-service.my-ns` would also work).

Pods in other namespaces must qualify the name as `my-service.my-ns`. These names
will resolve to the cluster IP assigned for the Service.

Kubernetes also supports DNS SRV (Service) records for named ports.  If the
`my-service.my-ns` Service has a port named `http` with the protocol set to
`TCP`, you can do a DNS SRV query for `_http._tcp.my-service.my-ns` to discover
the port number for `http`, as well as the IP address.

The Kubernetes DNS server is the only way to access `ExternalName` Services.
You can find more information about `ExternalName` resolution in
DNS for Services and Pods.

## Virtual IP addressing mechanism

Read Virtual IPs and Service Proxies explains the
mechanism Kubernetes provides to expose a Service with a virtual IP address.

### Traffic policies

You can set the `.spec.internalTrafficPolicy` and `.spec.externalTrafficPolicy` fields
to control how Kubernetes routes traffic to healthy (“ready”) backends.

See Traffic Policies for more details.

### Traffic distribution control {#traffic-distribution}

The `.spec.trafficDistribution` field provides another way to influence traffic
routing within a Kubernetes Service. While traffic policies focus on strict
semantic guarantees, traffic distribution allows you to express _preferences_
(such as routing to topologically closer endpoints). This can help optimize for
performance, cost, or reliability. In Kubernetes , the
following values are supported:

`PreferSameZone`
: Indicates a preference for routing traffic to endpoints that are in the same
  zone as the client.

`PreferSameNode`
: Indicates a preference for routing traffic to endpoints that are on the same
  node as the client.

`PreferClose` (deprecated)
: This is an older alias for `PreferSameZone` that is less clear about
  the semantics.

If the field is not set, the implementation will apply its default routing strategy.

See Traffic
Distribution for
more details

### Session stickiness

If you want to make sure that connections from a particular client are passed to
the same Pod each time, you can configure session affinity based on the client's
IP address. Read session affinity
to learn more.

## External IPs

**Feature state:** v1.36 [deprecated]

All users should begin migrating away from `externalIPs`.
Consider using an external load balancer controller or a Gateway API
implementation instead.

If there are external IPs that route to one or more cluster nodes, Kubernetes Services
can be exposed on those `externalIPs`. When network traffic arrives into the cluster, with
the external IP (as destination IP) and the port matching that Service, rules and routes
that Kubernetes has configured ensure that the traffic is routed to one of the endpoints
for that Service.

When you define a Service, you can specify `externalIPs` for any
service type.
In the example below, the Service named `"my-service"` can be accessed by clients using TCP,
on `"198.51.100.32:80"` (calculated from `.spec.externalIPs[]` and `.spec.ports[].port`).

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app.kubernetes.io/name: MyApp
  ports:
    - name: http
      protocol: TCP
      port: 80
      targetPort: 49152
  externalIPs:
    - 198.51.100.32
```

**Note:**
Kubernetes does not manage allocation of `externalIPs`; these are the responsibility
of the cluster administrator.

## API Object

Service is a top-level resource in the Kubernetes REST API. You can find more details
about the Service API object.

## What's next

Learn more about Services and how they fit into Kubernetes:

* Follow the Connecting Applications with Services
  tutorial.
* Read about Ingress, which
  exposes HTTP and HTTPS routes from outside the cluster to Services within
  your cluster.
* Read about Gateway, an extension to
  Kubernetes that provides more flexibility than Ingress.

For more context, read the following:

* Virtual IPs and Service Proxies
* EndpointSlices
* Service API reference
* EndpointSlice API reference
* Endpoint API reference (legacy)
