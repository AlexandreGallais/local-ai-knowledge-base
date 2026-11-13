---
title: "Well-Known Labels, Annotations and Taints (part 7 of 9)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/labels-annotations-taints/_index.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Well-Known Labels, Annotations and Taints (part 7 of 9)

### nfd.node.kubernetes.io/worker.version

Type: Annotation

Example: `nfd.node.kubernetes.io/worker.version: "v0.4.0"`

Used on: Nodes

This annotation records the version for a Node Feature Discovery's
worker
if there is one running on a node. It's used for informative use only.

### nfd.node.kubernetes.io/feature-labels

Type: Annotation

Example: `nfd.node.kubernetes.io/feature-labels: "cpu-cpuid.ADX,cpu-cpuid.AESNI,cpu-hardware_multithreading,kernel-version.full"`

Used on: Nodes

This annotation records a comma-separated list of node feature labels managed by
Node Feature Discovery (NFD).
NFD uses this for an internal mechanism. You should not edit this annotation yourself.

### nfd.node.kubernetes.io/extended-resources

Type: Annotation

Example: `nfd.node.kubernetes.io/extended-resources: "accelerator.acme.example/q500,example.com/coprocessor-fx5"`

Used on: Nodes

This annotation records a comma-separated list of
extended resources
managed by Node Feature Discovery (NFD).
NFD uses this for an internal mechanism. You should not edit this annotation yourself.

### nfd.node.kubernetes.io/node-name

Type: Label

Example: `nfd.node.kubernetes.io/node-name: node-1`

Used on: Nodes

It specifies which node the NodeFeature object is targeting.
Creators of NodeFeature objects must set this label and
consumers of the objects are supposed to use the label for
filtering features designated for a certain node.

**Note:**
These Node Feature Discovery (NFD) labels or annotations only apply to
the nodes where NFD is running. To learn more about NFD and
its components go to its official documentation.

### service.beta.kubernetes.io/aws-load-balancer-access-log-emit-interval (beta) {#service-beta-kubernetes-io-aws-load-balancer-access-log-emit-interval}

Example: `service.beta.kubernetes.io/aws-load-balancer-access-log-emit-interval: "5"`

Used on: Service

The cloud controller manager integration with AWS elastic load balancing configures
the load balancer for a Service based on this annotation. The value determines
how often the load balancer writes log entries. For example, if you set the value
to 5, the log writes occur 5 seconds apart.

### service.beta.kubernetes.io/aws-load-balancer-access-log-enabled (beta) {#service-beta-kubernetes-io-aws-load-balancer-access-log-enabled}

Example: `service.beta.kubernetes.io/aws-load-balancer-access-log-enabled: "false"`

Used on: Service

The cloud controller manager integration with AWS elastic load balancing configures
the load balancer for a Service based on this annotation. Access logging is enabled
if you set the annotation to "true".

### service.beta.kubernetes.io/aws-load-balancer-access-log-s3-bucket-name (beta) {#service-beta-kubernetes-io-aws-load-balancer-access-log-s3-bucket-name}

Example: `service.beta.kubernetes.io/aws-load-balancer-access-log-s3-bucket-name: example`

Used on: Service

The cloud controller manager integration with AWS elastic load balancing configures
the load balancer for a Service based on this annotation. The load balancer
writes logs to an S3 bucket with the name you specify.

### service.beta.kubernetes.io/aws-load-balancer-access-log-s3-bucket-prefix (beta) {#service-beta-kubernetes-io-aws-load-balancer-access-log-s3-bucket-prefix}

Example: `service.beta.kubernetes.io/aws-load-balancer-access-log-s3-bucket-prefix: "/example"`

Used on: Service

The cloud controller manager integration with AWS elastic load balancing configures
the load balancer for a Service based on this annotation. The load balancer
writes log objects with the prefix that you specify.

### service.beta.kubernetes.io/aws-load-balancer-additional-resource-tags (beta) {#service-beta-kubernetes-io-aws-load-balancer-additional-resource-tags}

Example: `service.beta.kubernetes.io/aws-load-balancer-additional-resource-tags: "Environment=demo,Project=example"`

Used on: Service

The cloud controller manager integration with AWS elastic load balancing configures
tags (an AWS concept) for a load balancer based on the comma-separated key/value
pairs in the value of this annotation.

### service.beta.kubernetes.io/aws-load-balancer-alpn-policy (beta) {#service-beta-kubernetes-io-aws-load-balancer-alpn-policy}

Example: `service.beta.kubernetes.io/aws-load-balancer-alpn-policy: HTTP2Optional`

Used on: Service

The AWS load balancer controller
uses this annotation.
See annotations
in the AWS load balancer controller documentation.

### service.beta.kubernetes.io/aws-load-balancer-attributes (beta) {#service-beta-kubernetes-io-aws-load-balancer-attributes}

Example: `service.beta.kubernetes.io/aws-load-balancer-attributes: "deletion_protection.enabled=true"`

Used on: Service

The AWS load balancer controller
uses this annotation.
See annotations
in the AWS load balancer controller documentation.

### service.beta.kubernetes.io/aws-load-balancer-backend-protocol (beta) {#service-beta-kubernetes-io-aws-load-balancer-backend-protocol}

Example: `service.beta.kubernetes.io/aws-load-balancer-backend-protocol: tcp`

Used on: Service

The cloud controller manager integration with AWS elastic load balancing configures
the load balancer listener based on the value of this annotation.

### service.beta.kubernetes.io/aws-load-balancer-connection-draining-enabled (beta) {#service-beta-kubernetes-io-aws-load-balancer-connection-draining-enabled}

Example: `service.beta.kubernetes.io/aws-load-balancer-connection-draining-enabled: "false"`

Used on: Service

The cloud controller manager integration with AWS elastic load balancing configures
the load balancer based on this annotation. The load balancer's connection draining
setting depends on the value you set.

### service.beta.kubernetes.io/aws-load-balancer-connection-draining-timeout (beta) {#service-beta-kubernetes-io-aws-load-balancer-connection-draining-timeout}

Example: `service.beta.kubernetes.io/aws-load-balancer-connection-draining-timeout: "60"`

Used on: Service

If you configure connection draining
for a Service of `type: LoadBalancer`, and you use the AWS cloud, the integration configures
the draining period based on this annotation. The value you set determines the draining
timeout in seconds.

### service.beta.kubernetes.io/aws-load-balancer-ip-address-type (beta) {#service-beta-kubernetes-io-aws-load-balancer-ip-address-type}

Example: `service.beta.kubernetes.io/aws-load-balancer-ip-address-type: ipv4`

Used on: Service

The AWS load balancer controller
uses this annotation.
See annotations
in the AWS load balancer controller documentation.

### service.beta.kubernetes.io/aws-load-balancer-connection-idle-timeout (beta) {#service-beta-kubernetes-io-aws-load-balancer-connection-idle-timeout}

Example: `service.beta.kubernetes.io/aws-load-balancer-connection-idle-timeout: "60"`

Used on: Service

The cloud controller manager integration with AWS elastic load balancing configures
a load balancer based on this annotation. The load balancer has a configured idle
timeout period (in seconds) that applies to its connections. If no data has been
sent or received by the time that the idle timeout period elapses, the load balancer
closes the connection.

### service.beta.kubernetes.io/aws-load-balancer-cross-zone-load-balancing-enabled (beta) {#service-beta-kubernetes-io-aws-load-balancer-cross-zone-load-balancing-enabled}

Example: `service.beta.kubernetes.io/aws-load-balancer-cross-zone-load-balancing-enabled: "true"`

Used on: Service

The cloud controller manager integration with AWS elastic load balancing configures
a load balancer based on this annotation. If you set this annotation to "true",
each load balancer node distributes requests evenly across the registered targets
in all enabled availability zones.
If you disable cross-zone load balancing, each load balancer node distributes requests
evenly across the registered targets in its availability zone only.

### service.beta.kubernetes.io/aws-load-balancer-eip-allocations (beta) {#service-beta-kubernetes-io-aws-load-balancer-eip-allocations}

Example: `service.beta.kubernetes.io/aws-load-balancer-eip-allocations: "eipalloc-01bcdef23bcdef456,eipalloc-def1234abc4567890"`

Used on: Service

The cloud controller manager integration with AWS elastic load balancing configures
a load balancer based on this annotation. The value is a comma-separated list
of elastic IP address allocation IDs.

This annotation is only relevant for Services of `type: LoadBalancer`, where
the load balancer is an AWS Network Load Balancer.

### service.beta.kubernetes.io/aws-load-balancer-extra-security-groups (beta) {#service-beta-kubernetes-io-aws-load-balancer-extra-security-groups}

Example: `service.beta.kubernetes.io/aws-load-balancer-extra-security-groups: "sg-12abcd3456,sg-34dcba6543"`

Used on: Service

The cloud controller manager integration with AWS elastic load balancing configures
a load balancer based on this annotation. The annotation value is a comma-separated
list of extra AWS VPC security groups to configure for the load balancer.

### service.beta.kubernetes.io/aws-load-balancer-healthcheck-healthy-threshold (beta) {#service-beta-kubernetes-io-aws-load-balancer-healthcheck-healthy-threshold}

Example: `service.beta.kubernetes.io/aws-load-balancer-healthcheck-healthy-threshold: "3"`

Used on: Service

The cloud controller manager integration with AWS elastic load balancing configures
a load balancer based on this annotation. The annotation value specifies the number of
successive successful health checks required for a backend to be considered healthy
for traffic.

### service.beta.kubernetes.io/aws-load-balancer-healthcheck-interval (beta) {#service-beta-kubernetes-io-aws-load-balancer-healthcheck-interval}

Example: `service.beta.kubernetes.io/aws-load-balancer-healthcheck-interval: "30"`

Used on: Service

The cloud controller manager integration with AWS elastic load balancing configures
a load balancer based on this annotation. The annotation value specifies the interval,
in seconds, between health check probes made by the load balancer.

### service.beta.kubernetes.io/aws-load-balancer-healthcheck-path (beta) {#service-beta-kubernetes-io-aws-load-balancer-healthcheck-papth}

Example: `service.beta.kubernetes.io/aws-load-balancer-healthcheck-path: /healthcheck`

Used on: Service

The cloud controller manager integration with AWS elastic load balancing configures
a load balancer based on this annotation. The annotation value determines the
path part of the URL that is used for HTTP health checks.

### service.beta.kubernetes.io/aws-load-balancer-healthcheck-port (beta) {#service-beta-kubernetes-io-aws-load-balancer-healthcheck-port}

Example: `service.beta.kubernetes.io/aws-load-balancer-healthcheck-port: "24"`

Used on: Service

The cloud controller manager integration with AWS elastic load balancing configures
a load balancer based on this annotation. The annotation value determines which
port the load balancer connects to when performing health checks.

### service.beta.kubernetes.io/aws-load-balancer-healthcheck-protocol (beta) {#service-beta-kubernetes-io-aws-load-balancer-healthcheck-protocol}

Example: `service.beta.kubernetes.io/aws-load-balancer-healthcheck-protocol: TCP`

Used on: Service

The cloud controller manager integration with AWS elastic load balancing configures
a load balancer based on this annotation. The annotation value determines how the
load balancer checks the health of backend targets.

### service.beta.kubernetes.io/aws-load-balancer-healthcheck-timeout (beta) {#service-beta-kubernetes-io-aws-load-balancer-healthcheck-timeout}

Example: `service.beta.kubernetes.io/aws-load-balancer-healthcheck-timeout: "3"`

Used on: Service

The cloud controller manager integration with AWS elastic load balancing configures
a load balancer based on this annotation. The annotation value specifies the number
of seconds before a probe that hasn't yet succeeded is automatically treated as
having failed.

### service.beta.kubernetes.io/aws-load-balancer-healthcheck-unhealthy-threshold (beta) {#service-beta-kubernetes-io-aws-load-balancer-healthcheck-unhealthy-threshold}

Example: `service.beta.kubernetes.io/aws-load-balancer-healthcheck-unhealthy-threshold: "3"`

Used on: Service

The cloud controller manager integration with AWS elastic load balancing configures
a load balancer based on this annotation. The annotation value specifies the number of
successive unsuccessful health checks required for a backend to be considered unhealthy
for traffic.

### service.beta.kubernetes.io/aws-load-balancer-internal (beta) {#service-beta-kubernetes-io-aws-load-balancer-internal}

Example: `service.beta.kubernetes.io/aws-load-balancer-internal: "true"`

Used on: Service

The cloud controller manager integration with AWS elastic load balancing configures
a load balancer based on this annotation. When you set this annotation to "true",
the integration configures an internal load balancer.

If you use the AWS load balancer controller,
see `service.beta.kubernetes.io/aws-load-balancer-scheme`.

### service.beta.kubernetes.io/aws-load-balancer-manage-backend-security-group-rules (beta) {#service-beta-kubernetes-io-aws-load-balancer-manage-backend-security-group-rules}

Example: `service.beta.kubernetes.io/aws-load-balancer-manage-backend-security-group-rules: "true"`

Used on: Service

The AWS load balancer controller
uses this annotation.
See annotations
in the AWS load balancer controller documentation.

### service.beta.kubernetes.io/aws-load-balancer-name (beta) {#service-beta-kubernetes-io-aws-load-balancer-name}

Example: `service.beta.kubernetes.io/aws-load-balancer-name: my-elb`

Used on: Service

If you set this annotation on a Service, and you also annotate that Service with
`service.beta.kubernetes.io/aws-load-balancer-type: "external"`, and you use the
AWS load balancer controller
in your cluster, then the AWS load balancer controller sets the name of that load
balancer to the value you set for _this_ annotation.

See annotations
in the AWS load balancer controller documentation.

### service.beta.kubernetes.io/aws-load-balancer-nlb-target-type (beta) {#service-beta-kubernetes-io-aws-load-balancer-nlb-target-type}

Example: `service.beta.kubernetes.io/aws-load-balancer-nlb-target-type: "true"`

Used on: Service

The AWS load balancer controller
uses this annotation.
See annotations
in the AWS load balancer controller documentation.

### service.beta.kubernetes.io/aws-load-balancer-private-ipv4-addresses (beta) {#service-beta-kubernetes-io-aws-load-balancer-private-ipv4-addresses}

Example: `service.beta.kubernetes.io/aws-load-balancer-private-ipv4-addresses: "198.51.100.0,198.51.100.64"`

Used on: Service

The AWS load balancer controller
uses this annotation.
See annotations
in the AWS load balancer controller documentation.
