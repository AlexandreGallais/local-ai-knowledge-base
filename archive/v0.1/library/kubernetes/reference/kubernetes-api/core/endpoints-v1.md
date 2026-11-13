---
title: "Endpoints (part 1 of 8)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/core/endpoints-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Endpoints

`apiVersion: v1`

`import "k8s.io/api/core/v1"`

## Endpoints {#Endpoints}

Endpoints is a collection of endpoints that implement the actual service. Example:

	 Name: &#34;mysvc&#34;,
	 Subsets: [
	   {
	     Addresses: [{&#34;ip&#34;: &#34;10.10.1.1&#34;}, {&#34;ip&#34;: &#34;10.10.2.2&#34;}],
	     Ports: [{&#34;name&#34;: &#34;a&#34;, &#34;port&#34;: 8675}, {&#34;name&#34;: &#34;b&#34;, &#34;port&#34;: 309}]
	   },
	   {
	     Addresses: [{&#34;ip&#34;: &#34;10.10.3.3&#34;}],
	     Ports: [{&#34;name&#34;: &#34;a&#34;, &#34;port&#34;: 93}, {&#34;name&#34;: &#34;b&#34;, &#34;port&#34;: 76}]
	   },
	]

Endpoints is a legacy API and does not contain information about all Service features. Use discoveryv1.EndpointSlice for complete information about Service endpoints.

Deprecated: This API is deprecated in v1.33+. Use discoveryv1.EndpointSlice.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ObjectMeta
       | Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

       | `subsets`EndpointSubset array
       | The set of all endpoints is the union of all subsets. Addresses are placed into subsets according to the IPs they share. A single address with multiple ports, some of which are ready and some of which are not (because they come from different containers) will result in the address being displayed in different subsets for the different ports. No address will appear in both Addresses and NotReadyAddresses in the same subset. Sets of addresses and ports that comprise a service.

## EndpointsList {#EndpointsList}

EndpointsList is a list of endpoints. Deprecated: This API is deprecated in v1.33+.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `items` *Endpoints array
       | List of endpoints.

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ListMeta
       | Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

## EndpointAddress {#EndpointAddress}

EndpointAddress is a tuple that describes single IP address. Deprecated: This API is deprecated in v1.33+.

   | Field | Description

       | `hostname`string
       | The Hostname of this endpoint

       | `ip` *string
       | The IP of this endpoint. May not be loopback (127.0.0.0/8 or ::1), link-local (169.254.0.0/16 or fe80::/10), or link-local multicast (224.0.0.0/24 or ff02::/16).

       | `nodeName`string
       | Optional: Node hosting this endpoint. This can be used to determine endpoints local to a node.

       | `targetRef`ObjectReference
       | Reference to object providing the endpoint.

## EndpointPort {#EndpointPort}

EndpointPort is a tuple that describes a single port. Deprecated: This API is deprecated in v1.33+.

   | Field | Description

       | `appProtocol`string
       | The application protocol for this port. This is used as a hint for implementations to offer richer behavior for protocols that they understand. This field follows standard Kubernetes label syntax. Valid values are either:  * Un-prefixed protocol names - reserved for IANA standard service names (as per RFC-6335 and https://www.iana.org/assignments/service-names).  * Kubernetes-defined prefixed names:   * 'kubernetes.io/h2c' - HTTP/2 prior knowledge over cleartext as described in https://www.rfc-editor.org/rfc/rfc9113.html#name-starting-http-2-with-prior-   * 'kubernetes.io/ws'  - WebSocket over cleartext as described in https://www.rfc-editor.org/rfc/rfc6455   * 'kubernetes.io/wss' - WebSocket over TLS as described in https://www.rfc-editor.org/rfc/rfc6455  * Other protocols should use implementation-defined prefixed names such as mycompany.com/my-custom-protocol.

       | `name`string
       | The name of this port.  This must match the 'name' field in the corresponding ServicePort. Must be a DNS_LABEL. Optional only if one port is defined.

       | `port` *integer
       | The port number of the endpoint.

       | `protocol`string
       | The IP protocol for this port. Must be UDP, TCP, or SCTP. Default is TCP.Possible enum values: - `"SCTP"` is the SCTP protocol. - `"TCP"` is the TCP protocol. - `"UDP"` is the UDP protocol.

## EndpointSubset {#EndpointSubset}

EndpointSubset is a group of addresses with a common set of ports. The expanded set of endpoints is the Cartesian product of Addresses x Ports. For example, given:

	{
	  Addresses: [{&#34;ip&#34;: &#34;10.10.1.1&#34;}, {&#34;ip&#34;: &#34;10.10.2.2&#34;}],
	  Ports:     [{&#34;name&#34;: &#34;a&#34;, &#34;port&#34;: 8675}, {&#34;name&#34;: &#34;b&#34;, &#34;port&#34;: 309}]
	}

The resulting set of endpoints can be viewed as:

	a: [ 10.10.1.1:8675, 10.10.2.2:8675 ],
	b: [ 10.10.1.1:309, 10.10.2.2:309 ]

Deprecated: This API is deprecated in v1.33+.

   | Field | Description

       | `addresses`EndpointAddress array
       | IP addresses which offer the related ports that are marked as ready. These endpoints should be considered safe for load balancers and clients to utilize.

       | `notReadyAddresses`EndpointAddress array
       | IP addresses which offer the related ports but are not currently marked as ready because they have not yet finished starting, have recently failed a readiness check, or have recently failed a liveness check.

       | `ports`EndpointPort array
       | Port numbers available on the related IP addresses.
