---
title: "Service (part 3 of 11)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/core/service-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Service (part 3 of 11)

| `type`string
       | type determines how the Service is exposed. Defaults to ClusterIP. Valid options are ExternalName, ClusterIP, NodePort, and LoadBalancer. "ClusterIP" allocates a cluster-internal IP address for load-balancing to endpoints. Endpoints are determined by the selector or if that is not specified, by manual construction of an Endpoints object or EndpointSlice objects. If clusterIP is "None", no virtual IP is allocated and the endpoints are published as a set of endpoints rather than a virtual IP. "NodePort" builds on ClusterIP and allocates a port on every node which routes to the same endpoints as the clusterIP. "LoadBalancer" builds on NodePort and creates an external load-balancer (if supported in the current cloud) which routes to the same endpoints as the clusterIP. "ExternalName" aliases this service to the specified externalName. Several other fields do not apply to ExternalName services. More info: https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-typesPossible enum values: - `"ClusterIP"` means a service will only be accessible inside the cluster, via the cluster IP. - `"ExternalName"` means a service consists of only a reference to an external name that kubedns or equivalent will return as a CNAME record, with no exposing or proxying of any pods involved. - `"LoadBalancer"` means a service will be exposed via an external load balancer (if the cloud provider supports it), in addition to 'NodePort' type. - `"NodePort"` means a service will be exposed on one port of every node, in addition to 'ClusterIP' type.

## ServiceStatus {#ServiceStatus}

ServiceStatus represents the current status of a service.

   | Field | Description

       | `conditions`Condition arraypatch strategy: merge on key `type`
       | Current service state

       | `loadBalancer`LoadBalancerStatus
       | LoadBalancer contains the current status of the load-balancer, if one is present.

## ServiceList {#ServiceList}

ServiceList holds a list of services.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `items` *Service array
       | List of services

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ListMeta
       | Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

## ClientIPConfig {#ClientIPConfig}

ClientIPConfig represents the configurations of Client IP based session affinity.

   | Field | Description

       | `timeoutSeconds`integer
       | timeoutSeconds specifies the seconds of ClientIP type session sticky time. The value must be >0 && \<=86400(for 1 day) if ServiceAffinity == "ClientIP". Default value is 10800(for 3 hours).

## LoadBalancerIngress {#LoadBalancerIngress}

LoadBalancerIngress represents the status of a load-balancer ingress point: traffic intended for the service should be sent to an ingress point.

   | Field | Description

       | `hostname`string
       | Hostname is set for load-balancer ingress points that are DNS based (typically AWS load-balancers)

       | `ip`string
       | IP is set for load-balancer ingress points that are IP based (typically GCE or OpenStack load-balancers)

       | `ipMode`string
       | IPMode specifies how the load-balancer IP behaves, and may only be specified when the ip field is specified. Setting this to "VIP" indicates that traffic is delivered to the node with the destination set to the load-balancer's IP and port. Setting this to "Proxy" indicates that traffic is delivered to the node or pod with the destination set to the node's IP and node port or the pod's IP and port. Service implementations may use this information to adjust traffic routing.

       | `ports`PortStatus array
       | Ports is a list of records of service ports If used, every port defined in the service should have an entry in it

## LoadBalancerStatus {#LoadBalancerStatus}

LoadBalancerStatus represents the status of a load-balancer.

   | Field | Description

       | `ingress`LoadBalancerIngress array
       | Ingress is a list containing ingress points for the load-balancer. Traffic intended for the service should be sent to these ingress points.

## PortStatus {#PortStatus}

PortStatus represents the error condition of a service port

   | Field | Description

       | `error`string
       | Error is to record the problem with the service port The format of the error shall comply with the following rules: - built-in error values shall be specified in this file and those shall use   CamelCase names - cloud provider specific error values must have names that comply with the   format foo.example.com/CamelCase.

       | `port` *integer
       | Port is the port number of the service port of which status is recorded here

       | `protocol` *string
       | Protocol is the protocol of the service port of which status is recorded here The supported values are: "TCP", "UDP", "SCTP"Possible enum values: - `"SCTP"` is the SCTP protocol. - `"TCP"` is the TCP protocol. - `"UDP"` is the UDP protocol.

## ServicePort {#ServicePort}

ServicePort contains information on service's port.

   | Field | Description

       | `appProtocol`string
       | The application protocol for this port. This is used as a hint for implementations to offer richer behavior for protocols that they understand. This field follows standard Kubernetes label syntax. Valid values are either:  * Un-prefixed protocol names - reserved for IANA standard service names (as per RFC-6335 and https://www.iana.org/assignments/service-names).  * Kubernetes-defined prefixed names:   * 'kubernetes.io/h2c' - HTTP/2 prior knowledge over cleartext as described in https://www.rfc-editor.org/rfc/rfc9113.html#name-starting-http-2-with-prior-   * 'kubernetes.io/ws'  - WebSocket over cleartext as described in https://www.rfc-editor.org/rfc/rfc6455   * 'kubernetes.io/wss' - WebSocket over TLS as described in https://www.rfc-editor.org/rfc/rfc6455  * Other protocols should use implementation-defined prefixed names such as mycompany.com/my-custom-protocol.

       | `name`string
       | The name of this port within the service. This must be a DNS_LABEL. All ports within a ServiceSpec must have unique names. When considering the endpoints for a Service, this must match the 'name' field in the EndpointPort. Optional if only one ServicePort is defined on this service.

       | `nodePort`integer
       | The port on each node on which this service is exposed when type is NodePort or LoadBalancer.  Usually assigned by the system. If a value is specified, in-range, and not in use it will be used, otherwise the operation will fail.  If not specified, a port will be allocated if this Service requires one.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type from NodePort to ClusterIP). More info: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport

       | `port` *integer
       | The port that will be exposed by this service.

       | `protocol`string
       | The IP protocol for this port. Supports "TCP", "UDP", and "SCTP". Default is TCP.Possible enum values: - `"SCTP"` is the SCTP protocol. - `"TCP"` is the TCP protocol. - `"UDP"` is the UDP protocol.

       | `targetPort`
       | Number or name of the port to access on the pods targeted by the service. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME. If this is a string, it will be looked up as a named port in the target Pod's container ports. If this is not specified, the value of the 'port' field is used (an identity map). This field is ignored for services with clusterIP=None, and should be omitted or set equal to the 'port' field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#defining-a-service

## SessionAffinityConfig {#SessionAffinityConfig}

SessionAffinityConfig represents the configurations of session affinity.

   | Field | Description

       | `clientIP`ClientIPConfig
       | clientIP contains the configurations of Client IP based session affinity.
