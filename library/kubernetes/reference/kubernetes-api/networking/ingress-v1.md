---
title: "Ingress (part 1 of 8)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/networking/ingress-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Ingress

`apiVersion: networking.k8s.io/v1`

`import "k8s.io/api/networking/v1"`

## Ingress {#Ingress}

Ingress is a collection of rules that allow inbound connections to reach the endpoints defined by a backend. An Ingress can be configured to give services externally-reachable urls, load balance traffic, terminate SSL, offer name based virtual hosting etc.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ObjectMeta
       | metadata is the standard object metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

       | `spec`IngressSpec
       | spec is the desired state of the Ingress. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

       | `status`IngressStatus
       | status is the current state of the Ingress. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

## IngressSpec {#IngressSpec}

IngressSpec describes the Ingress the user wishes to exist.

   | Field | Description

       | `defaultBackend`IngressBackend
       | defaultBackend is the backend that should handle requests that don't match any rule. If Rules are not specified, DefaultBackend must be specified. If DefaultBackend is not set, the handling of requests that do not match any of the rules will be up to the Ingress controller.

       | `ingressClassName`string
       | ingressClassName is the name of an IngressClass cluster resource. Ingress controller implementations use this field to know whether they should be serving this Ingress resource, by a transitive connection (controller -> IngressClass -> Ingress resource). Although the `kubernetes.io/ingress.class` annotation (simple constant name) was never formally defined, it was widely supported by Ingress controllers to create a direct binding between Ingress controller and Ingress resources. Newly created Ingress resources should prefer using the field. However, even though the annotation is officially deprecated, for backwards compatibility reasons, ingress controllers should still honor that annotation if present.

       | `rules`IngressRule array
       | rules is a list of host rules used to configure the Ingress. If unspecified, or no rule matches, all traffic is sent to the default backend.

       | `tls`IngressTLS array
       | tls represents the TLS configuration. Currently the Ingress only supports a single TLS port, 443. If multiple members of this list specify different hosts, they will be multiplexed on the same port according to the hostname specified through the SNI TLS extension, if the ingress controller fulfilling the ingress supports SNI.

## IngressStatus {#IngressStatus}

IngressStatus describe the current state of the Ingress.

   | Field | Description

       | `loadBalancer`IngressLoadBalancerStatus
       | loadBalancer contains the current status of the load-balancer.

## IngressList {#IngressList}

IngressList is a collection of Ingress.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `items` *Ingress array
       | items is the list of Ingress.

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ListMeta
       | Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

## HTTPIngressPath {#HTTPIngressPath}

HTTPIngressPath associates a path with a backend. Incoming urls matching the path are forwarded to the backend.

   | Field | Description

       | `backend` *IngressBackend
       | backend defines the referenced service endpoint to which the traffic will be forwarded to.

       | `path`string
       | path is matched against the path of an incoming request. Currently it can contain characters disallowed from the conventional "path" part of a URL as defined by RFC 3986. Paths must begin with a '/' and must be present when using PathType with value "Exact" or "Prefix".

       | `pathType` *string
       | pathType determines the interpretation of the path matching. PathType can be one of the following values: * Exact: Matches the URL path exactly. * Prefix: Matches based on a URL path prefix split by '/'. Matching is   done on a path element by element basis. A path element refers is the   list of labels in the path split by the '/' separator. A request is a   match for path p if every p is an element-wise prefix of p of the   request path. Note that if the last element of the path is a substring   of the last element in request path, it is not a match (e.g. /foo/bar   matches /foo/bar/baz, but does not match /foo/barbaz). * ImplementationSpecific: Interpretation of the Path matching is up to   the IngressClass. Implementations can treat this as a separate PathType   or treat it identically to Prefix or Exact path types. Implementations are required to support all path types.Possible enum values: - `"Exact"` matches the URL path exactly and with case sensitivity. - `"ImplementationSpecific"` matching is up to the IngressClass. Implementations can treat this as a separate PathType or treat it identically to Prefix or Exact path types. - `"Prefix"` matches based on a URL path prefix split by '/'. Matching is case sensitive and done on a path element by element basis. A path element refers to the list of labels in the path split by the '/' separator. A request is a match for path p if every p is an element-wise prefix of p of the request path. Note that if the last element of the path is a substring of the last element in request path, it is not a match (e.g. /foo/bar matches /foo/bar/baz, but does not match /foo/barbaz). If multiple matching paths exist in an Ingress spec, the longest matching path is given priority. Examples: - /foo/bar does not match requests to /foo/barbaz - /foo/bar matches request to /foo/bar and /foo/bar/baz - /foo and /foo/ both match requests to /foo and /foo/. If both paths are present in an Ingress spec, the longest matching path (/foo/) is given priority.

## HTTPIngressRuleValue {#HTTPIngressRuleValue}

HTTPIngressRuleValue is a list of http selectors pointing to backends. In the example: http://<host>/<path>?<searchpart> -> backend where where parts of the url correspond to RFC 3986, this resource will be used to match against everything after the last '/' and before the first '?' or '#'.

   | Field | Description

       | `paths` *HTTPIngressPath array
       | paths is a collection of paths that map requests to backends.

## IngressBackend {#IngressBackend}

IngressBackend describes all endpoints for a given service and port.

   | Field | Description

       | `resource`TypedLocalObjectReference
       | resource is an ObjectRef to another Kubernetes resource in the namespace of the Ingress object. If resource is specified, a service.Name and service.Port must not be specified. This is a mutually exclusive setting with "Service".

       | `service`IngressServiceBackend
       | service references a service as a backend. This is a mutually exclusive setting with "Resource".

## IngressLoadBalancerIngress {#IngressLoadBalancerIngress}

IngressLoadBalancerIngress represents the status of a load-balancer ingress point.

   | Field | Description

       | `hostname`string
       | hostname is set for load-balancer ingress points that are DNS based.

       | `ip`string
       | ip is set for load-balancer ingress points that are IP based.

       | `ports`IngressPortStatus array
       | ports provides information about the ports exposed by this LoadBalancer.

## IngressLoadBalancerStatus {#IngressLoadBalancerStatus}

IngressLoadBalancerStatus represents the status of a load-balancer.

   | Field | Description

       | `ingress`IngressLoadBalancerIngress array
       | ingress is a list containing ingress points for the load-balancer.

## IngressPortStatus {#IngressPortStatus}

IngressPortStatus represents the error condition of a service port

   | Field | Description

       | `error`string
       | error is to record the problem with the service port The format of the error shall comply with the following rules: - built-in error values shall be specified in this file and those shall use   CamelCase names - cloud provider specific error values must have names that comply with the   format foo.example.com/CamelCase.

       | `port` *integer
       | port is the port number of the ingress port.

       | `protocol` *string
       | protocol is the protocol of the ingress port. The supported values are: "TCP", "UDP", "SCTP"Possible enum values: - `"SCTP"` is the SCTP protocol. - `"TCP"` is the TCP protocol. - `"UDP"` is the UDP protocol.

## IngressRule {#IngressRule}

IngressRule represents the rules mapping the paths under a specified host to the related backend services. Incoming requests are first evaluated for a host match, then routed to the backend associated with the matching IngressRuleValue.

   | Field | Description

       | `host`string
       | host is the fully qualified domain name of a network host, as defined by RFC 3986. Note the following deviations from the "host" part of the URI as defined in RFC 3986: 1. IPs are not allowed. Currently an IngressRuleValue can only apply to    the IP in the Spec of the parent Ingress. 2. The `:` delimiter is not respected because ports are not allowed. 	  Currently the port of an Ingress is implicitly :80 for http and 	  :443 for https. Both these may change in the future. Incoming requests are matched against the host before the IngressRuleValue. If the host is unspecified, the Ingress routes all traffic based on the specified IngressRuleValue.  host can be "precise" which is a domain name without the terminating dot of a network host (e.g. "foo.bar.com") or "wildcard", which is a domain name prefixed with a single wildcard label (e.g. "*.foo.com"). The wildcard character '\*' must appear by itself as the first DNS label and matches only a single label. You cannot have a wildcard label by itself (e.g. Host == "*"). Requests will be matched against the Host field in the following way: 1. If host is precise, the request matches this rule if the http host header is equal to Host. 2. If host is a wildcard, then the request matches this rule if the http host header is to equal to the suffix (removing the first label) of the wildcard rule.

       | `http`HTTPIngressRuleValue
       | http is a HTTP IngressRuleValue, which contains a list of http selectors

## IngressServiceBackend {#IngressServiceBackend}

IngressServiceBackend references a Kubernetes Service as a Backend.

   | Field | Description

       | `name` *string
       | name is the referenced service. The service must exist in the same namespace as the Ingress object.

       | `port`ServiceBackendPort
       | port of the referenced service. A port name or port number is required for a IngressServiceBackend.

## IngressTLS {#IngressTLS}

IngressTLS describes the transport layer security associated with an ingress.

   | Field | Description

       | `hosts`string array
       | hosts is a list of hosts included in the TLS certificate. The values in this list must match the name/s used in the tlsSecret. Defaults to the wildcard host setting for the loadbalancer controller fulfilling this Ingress, if left unspecified.

       | `secretName`string
       | secretName is the name of the secret used to terminate TLS traffic on port 443. Field is left optional to allow TLS routing based on SNI hostname alone. If the SNI host in a listener conflicts with the "<example-value>" header field used by an IngressRule, the SNI host is used for termination and value of the "<example-value>" header is used for routing.

## ServiceBackendPort {#ServiceBackendPort}

ServiceBackendPort is the service port being referenced.

   | Field | Description

       | `name`string
       | name is the name of the port on the Service. This is a mutually exclusive setting with "Number".

       | `number`integer
       | number is the numerical port number (e.g. 80) on the Service. This is a mutually exclusive setting with "Name".
