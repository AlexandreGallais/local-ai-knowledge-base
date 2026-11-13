---
title: "Well-Known Labels, Annotations and Taints (part 8 of 9)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/labels-annotations-taints/_index.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Well-Known Labels, Annotations and Taints (part 8 of 9)

### service.beta.kubernetes.io/aws-load-balancer-proxy-protocol (beta) {#service-beta-kubernetes-io-aws-load-balancer-proxy-protocol}

Example: `service.beta.kubernetes.io/aws-load-balancer-proxy-protocol: "*"`

Used on: Service

The official Kubernetes integration with AWS elastic load balancing configures
a load balancer based on this annotation. The only permitted value is `"*"`,
which indicates that the load balancer should wrap TCP connections to the backend
Pod with the PROXY protocol.

### service.beta.kubernetes.io/aws-load-balancer-scheme (beta) {#service-beta-kubernetes-io-aws-load-balancer-scheme}

Example: `service.beta.kubernetes.io/aws-load-balancer-scheme: internal`

Used on: Service

The AWS load balancer controller
uses this annotation.
See annotations
in the AWS load balancer controller documentation.

### service.beta.kubernetes.io/aws-load-balancer-security-groups (deprecated) {#service-beta-kubernetes-io-aws-load-balancer-security-groups}

Example: `service.beta.kubernetes.io/aws-load-balancer-security-groups: "sg-53fae93f,sg-8725gr62r"`

Used on: Service

The AWS load balancer controller uses this annotation to specify a comma separated list
of security groups you want to attach to an AWS load balancer. Both name and ID of security
are supported where name matches a `Name` tag, not the `groupName` attribute.

When this annotation is added to a Service, the load-balancer controller attaches the security groups
referenced by the annotation to the load balancer. If you omit this annotation, the AWS load balancer
controller automatically creates a new security group and attaches it to the load balancer.

**Note:**
Kubernetes v1.27 and later do not directly set or read this annotation. However, the AWS
load balancer controller (part of the Kubernetes project) does still use the
`service.beta.kubernetes.io/aws-load-balancer-security-groups` annotation.

### service.beta.kubernetes.io/load-balancer-source-ranges (deprecated) {#service-beta-kubernetes-io-load-balancer-source-ranges}

Example: `service.beta.kubernetes.io/load-balancer-source-ranges: "192.0.2.0/25"`

Used on: Service

The AWS load balancer controller
uses this annotation. You should set `.spec.loadBalancerSourceRanges` for the Service instead.

### service.beta.kubernetes.io/aws-load-balancer-ssl-cert (beta) {#service-beta-kubernetes-io-aws-load-balancer-ssl-cert}

Example: `service.beta.kubernetes.io/aws-load-balancer-ssl-cert: "arn:aws:acm:us-east-1:123456789012:certificate/12345678-1234-1234-1234-123456789012"`

Used on: Service

The official integration with AWS elastic load balancing configures TLS for a Service of
`type: LoadBalancer` based on this annotation. The value of the annotation is the
AWS Resource Name (ARN) of the X.509 certificate that the load balancer listener should
use.

(The TLS protocol is based on an older technology that abbreviates to SSL.)

### service.beta.kubernetes.io/aws-load-balancer-ssl-negotiation-policy (beta) {#service-beta-kubernetes-io-aws-load-balancer-ssl-negotiation-policy}

Example: `service.beta.kubernetes.io/aws-load-balancer-ssl-negotiation-policy: ELBSecurityPolicy-TLS-1-2-2017-01`

The official integration with AWS elastic load balancing configures TLS for a Service of
`type: LoadBalancer` based on this annotation. The value of the annotation is the name
of an AWS policy for negotiating TLS with a client peer.

### service.beta.kubernetes.io/aws-load-balancer-ssl-ports (beta) {#service-beta-kubernetes-io-aws-load-balancer-ssl-ports}

Example: `service.beta.kubernetes.io/aws-load-balancer-ssl-ports: "*"`

The official integration with AWS elastic load balancing configures TLS for a Service of
`type: LoadBalancer` based on this annotation. The value of the annotation is either `"*"`,
which means that all the load balancer's ports should use TLS, or it is a comma separated
list of port numbers.

### service.beta.kubernetes.io/aws-load-balancer-subnets (beta) {#service-beta-kubernetes-io-aws-load-balancer-subnets}

Example: `service.beta.kubernetes.io/aws-load-balancer-subnets: "private-a,private-b"`

Kubernetes' official integration with AWS uses this annotation to configure a
load balancer and determine in which AWS availability zones to deploy the managed
load balancing service. The value is either a comma separated list of subnet names, or a
comma separated list of subnet IDs.

### service.beta.kubernetes.io/aws-load-balancer-target-group-attributes (beta) {#service-beta-kubernetes-io-aws-load-balancer-target-group-attributes}

Example: `service.beta.kubernetes.io/aws-load-balancer-target-group-attributes: "stickiness.enabled=true,stickiness.type=source_ip"`

Used on: Service

The AWS load balancer controller
uses this annotation.
See annotations
in the AWS load balancer controller documentation.

### service.beta.kubernetes.io/aws-load-balancer-target-node-labels (beta) {#service-beta-kubernetes-io-aws-target-node-labels}

Example: `service.beta.kubernetes.io/aws-load-balancer-target-node-labels: "kubernetes.io/os=Linux,topology.kubernetes.io/region=us-east-2"`

Kubernetes' official integration with AWS uses this annotation to determine which
nodes in your cluster should be considered as valid targets for the load balancer.

### service.beta.kubernetes.io/aws-load-balancer-type (beta) {#service-beta-kubernetes-io-aws-load-balancer-type}

Example: `service.beta.kubernetes.io/aws-load-balancer-type: external`

Kubernetes' official integrations with AWS use this annotation to determine
whether the AWS cloud provider integration should manage a Service of
`type: LoadBalancer`.

There are two permitted values:

`nlb`
: the cloud controller manager configures a Network Load Balancer

`external`
: the cloud controller manager does not configure any load balancer

If you deploy a Service of `type: LoadBalancer` on AWS, and you don't set any
`service.beta.kubernetes.io/aws-load-balancer-type` annotation,
the AWS integration deploys a classic Elastic Load Balancer. This behavior,
with no annotation present, is the default unless you specify otherwise.

When you set this annotation to `external` on a Service of `type: LoadBalancer`,
and your cluster has a working deployment of the AWS Load Balancer controller,
then the AWS Load Balancer controller attempts to deploy a load balancer based
on the Service specification.

**Caution:**
Do not modify or add the `service.beta.kubernetes.io/aws-load-balancer-type` annotation
on an existing Service object. See the AWS documentation on this topic for more
details.

### service.beta.kubernetes.io/azure-load-balancer-disable-tcp-reset (deprecated) {#service-beta-kubernetes-azure-load-balancer-disble-tcp-reset}

Example: `service.beta.kubernetes.io/azure-load-balancer-disable-tcp-reset: "false"`

Used on: Service

This annotation only works for Azure standard load balancer backed service.
This annotation is used on the Service to specify whether the load balancer
should disable or enable TCP reset on idle timeout. If enabled, it helps
applications to behave more predictably, to detect the termination of a connection,
remove expired connections and initiate new connections.
You can set the value to be either true or false.

See Load Balancer TCP Reset for more information.

**Note:**
This annotation is deprecated.

### pod-security.kubernetes.io/enforce

Type: Label

Example: `pod-security.kubernetes.io/enforce: "baseline"`

Used on: Namespace

Value **must** be one of `privileged`, `baseline`, or `restricted` which correspond to
Pod Security Standard levels.
Specifically, the `enforce` label _prohibits_ the creation of any Pod in the labeled
Namespace which does not meet the requirements outlined in the indicated level.

See Enforcing Pod Security at the Namespace Level
for more information.

### pod-security.kubernetes.io/enforce-version

Type: Label

Example: `pod-security.kubernetes.io/enforce-version: ""`

Used on: Namespace

Value **must** be `latest` or a valid Kubernetes version in the format `v<major>.<minor>`.
This determines the version of the
Pod Security Standard
policies to apply when validating a Pod.

See Enforcing Pod Security at the Namespace Level
for more information.

### pod-security.kubernetes.io/audit

Type: Label

Example: `pod-security.kubernetes.io/audit: "baseline"`

Used on: Namespace

Value **must** be one of `privileged`, `baseline`, or `restricted` which correspond to
Pod Security Standard levels.
Specifically, the `audit` label does not prevent the creation of a Pod in the labeled
Namespace which does not meet the requirements outlined in the indicated level,
but adds an this annotation to the Pod.

See Enforcing Pod Security at the Namespace Level
for more information.

### pod-security.kubernetes.io/audit-version

Type: Label

Example: `pod-security.kubernetes.io/audit-version: ""`

Used on: Namespace

Value **must** be `latest` or a valid Kubernetes version in the format `v<major>.<minor>`.
This determines the version of the
Pod Security Standard
policies to apply when validating a Pod.

See Enforcing Pod Security at the Namespace Level
for more information.

### pod-security.kubernetes.io/warn

Type: Label

Example: `pod-security.kubernetes.io/warn: "baseline"`

Used on: Namespace

Value **must** be one of `privileged`, `baseline`, or `restricted` which correspond to
Pod Security Standard levels.
Specifically, the `warn` label does not prevent the creation of a Pod in the labeled
Namespace which does not meet the requirements outlined in the indicated level,
but returns a warning to the user after doing so.
Note that warnings are also displayed when creating or updating objects that contain
Pod templates, such as Deployments, Jobs, StatefulSets, etc.

See Enforcing Pod Security at the Namespace Level
for more information.

### pod-security.kubernetes.io/warn-version

Type: Label

Example: `pod-security.kubernetes.io/warn-version: ""`

Used on: Namespace

Value **must** be `latest` or a valid Kubernetes version in the format `v<major>.<minor>`.
This determines the version of the Pod Security Standard
policies to apply when validating a submitted Pod.
Note that warnings are also displayed when creating or updating objects that contain
Pod templates, such as Deployments, Jobs, StatefulSets, etc.

See Enforcing Pod Security at the Namespace Level
for more information.

### rbac.authorization.kubernetes.io/autoupdate

Type: Annotation

Example: `rbac.authorization.kubernetes.io/autoupdate: "false"`

Used on: ClusterRole, ClusterRoleBinding, Role, RoleBinding

When this annotation is set to `"true"` on default RBAC objects created by the API server,
they are automatically updated at server start to add missing permissions and subjects
(extra permissions and subjects are left in place).
To prevent autoupdating a particular role or rolebinding, set this annotation to `"false"`.
If you create your own RBAC objects and set this annotation to `"false"`, `kubectl auth reconcile`
(which allows reconciling arbitrary RBAC objects in a manifest)
respects this annotation and does not automatically add missing permissions and subjects.

### kubernetes.io/psp (deprecated) {#kubernetes-io-psp}

Type: Annotation

Example: `kubernetes.io/psp: restricted`

Used on: Pod

This annotation was only relevant if you were using
PodSecurityPolicy objects.
Kubernetes v does not support the PodSecurityPolicy API.

When the PodSecurityPolicy admission controller admitted a Pod, the admission controller
modified the Pod to have this annotation.
The value of the annotation was the name of the PodSecurityPolicy that was used for validation.

### seccomp.security.alpha.kubernetes.io/pod (non-functional) {#seccomp-security-alpha-kubernetes-io-pod}

Type: Annotation

Used on: Pod

Kubernetes before v1.25 allowed you to configure seccomp behavior using this annotation.
See Restrict a Container's Syscalls with seccomp to
learn the supported way to specify seccomp restrictions for a Pod.

### container.seccomp.security.alpha.kubernetes.io/[NAME] (non-functional) {#container-seccomp-security-alpha-kubernetes-io}

Type: Annotation

Used on: Pod

Kubernetes before v1.25 allowed you to configure seccomp behavior using this annotation.
See Restrict a Container's Syscalls with seccomp to
learn the supported way to specify seccomp restrictions for a Pod.

### snapshot.storage.kubernetes.io/allow-volume-mode-change

Type: Annotation

Example: `snapshot.storage.kubernetes.io/allow-volume-mode-change: "true"`

Used on: VolumeSnapshotContent

Value can either be `true` or `false`. This determines whether a user can modify
the mode of the source volume when a PersistentVolumeClaim is being created from
a VolumeSnapshot.

Refer to Converting the volume mode of a Snapshot
and the Kubernetes CSI Developer Documentation
for more information.

### scheduler.alpha.kubernetes.io/critical-pod (deprecated)

Type: Annotation

Example: `scheduler.alpha.kubernetes.io/critical-pod: ""`

Used on: Pod

This annotation lets Kubernetes control plane know about a Pod being a critical Pod
so that the descheduler will not remove this Pod.

**Note:**
Starting in v1.16, this annotation was removed in favor of
Pod Priority.

### jobset.sigs.k8s.io/jobset-name

Type: Label, Annotation

Example:  `jobset.sigs.k8s.io/jobset-name: "my-jobset"`

Used on: Jobs, Pods

This label/annotation is used to store the name of the JobSet that a Job or Pod belongs to.
JobSet is an extension API that you can deploy into your Kubernetes cluster.

### jobset.sigs.k8s.io/replicatedjob-replicas

Type: Label, Annotation

Example: `jobset.sigs.k8s.io/replicatedjob-replicas: "5"`

Used on: Jobs, Pods

This label/annotation specifies the number of replicas for a ReplicatedJob.

### jobset.sigs.k8s.io/replicatedjob-name

Type: Label, Annotation

Example: `jobset.sigs.k8s.io/replicatedjob-name: "my-replicatedjob"`

Used on: Jobs, Pods

This label or annotation stores the name of the replicated job that this Job or Pod is part of.

### jobset.sigs.k8s.io/job-index

Type: Label, Annotation

Example: `jobset.sigs.k8s.io/job-index: "0"`

Used on: Jobs, Pods

This label/annotation is set by the JobSet controller on child Jobs and Pods. It contains the index of the Job replica within its parent ReplicatedJob.

### jobset.sigs.k8s.io/job-key

Type: Label, Annotation

Example: `jobset.sigs.k8s.io/job-key: "0f1e93893c4cb372080804ddb9153093cb0d20cefdd37f653e739c232d363feb"`

Used on: Jobs, Pods

The JobSet controller sets this label (and also an annotation with the same key)  on child Jobs and
Pods of a JobSet. The value is the SHA256 hash of the namespaced Job name.
