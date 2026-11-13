---
title: "Well-Known Labels, Annotations and Taints (part 2 of 9)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/labels-annotations-taints/_index.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Well-Known Labels, Annotations and Taints (part 2 of 9)

## Labels, annotations and taints used on API objects

### apf.kubernetes.io/autoupdate-spec

Type: Annotation

Example: `apf.kubernetes.io/autoupdate-spec: "true"`

Used on: `FlowSchema` and `PriorityLevelConfiguration` Objects

If this annotation is set to true on a FlowSchema or PriorityLevelConfiguration, the `spec` for that object
is managed by the kube-apiserver. If the API server does not recognize an APF object, and you annotate it
for automatic update, the API server deletes the entire object. Otherwise, the API server does not manage the
object spec.
For more details, read  Maintenance of the Mandatory and Suggested Configuration Objects.

### app.kubernetes.io/component

Type: Label

Example: `app.kubernetes.io/component: "database"`

Used on: All Objects (typically used on workload resources).

The component within the application architecture.

One of the recommended labels.

### app.kubernetes.io/created-by (deprecated)

Type: Label

Example: `app.kubernetes.io/created-by: "controller-manager"`

Used on: All Objects (typically used on workload resources).

The controller/user who created this resource.

**Note:**
Starting from v1.9, this label is deprecated.

### app.kubernetes.io/instance

Type: Label

Example: `app.kubernetes.io/instance: "mysql-abcxyz"`

Used on: All Objects (typically used on
workload resources).

A unique name identifying the instance of an application.
To assign a non-unique name, use app.kubernetes.io/name.

One of the recommended labels.

### app.kubernetes.io/managed-by

Type: Label

Example: `app.kubernetes.io/managed-by: "helm"`

Used on: All Objects (typically used on
workload resources).

The tool being used to manage the operation of an application.

One of the recommended labels.

### app.kubernetes.io/name

Type: Label

Example: `app.kubernetes.io/name: "mysql"`

Used on: All Objects (typically used on
workload resources).

The name of the application.

One of the recommended labels.

### app.kubernetes.io/part-of

Type: Label

Example: `app.kubernetes.io/part-of: "wordpress"`

Used on: All Objects (typically used on
workload resources).

The name of a higher-level application this object is part of.

One of the recommended labels.

### app.kubernetes.io/version

Type: Label

Example: `app.kubernetes.io/version: "5.7.21"`

Used on: All Objects (typically used on
workload resources).

The current version of the application.

Common forms of values include:

- semantic version
- the Git revision hash
  for the source code.

One of the recommended labels.

### applyset.kubernetes.io/additional-namespaces (alpha) {#applyset-kubernetes-io-additional-namespaces}

Type: Annotation

Example: `applyset.kubernetes.io/additional-namespaces: "namespace1,namespace2"`

Used on: Objects being used as ApplySet parents.

Use of this annotation is Alpha.
For Kubernetes version , you can use this annotation on Secrets,
ConfigMaps, or custom resources if the
CustomResourceDefinition
defining them has the `applyset.kubernetes.io/is-parent-type` label.

Part of the specification used to implement
ApplySet-based pruning in kubectl.
This annotation is applied to the parent object used to track an ApplySet to extend the scope of
the ApplySet beyond the parent object's own namespace (if any).
The value is a comma-separated list of the names of namespaces other than the parent's namespace
in which objects are found.

### applyset.kubernetes.io/contains-group-kinds (alpha) {#applyset-kubernetes-io-contains-group-kinds}

Type: Annotation

Example: `applyset.kubernetes.io/contains-group-kinds: "certificates.cert-manager.io,configmaps,deployments.apps,secrets,services"`

Used on: Objects being used as ApplySet parents.

Use of this annotation is Alpha.
For Kubernetes version , you can use this annotation on Secrets, ConfigMaps,
or custom resources if the CustomResourceDefinition
defining them has the `applyset.kubernetes.io/is-parent-type` label.

Part of the specification used to implement
ApplySet-based pruning in kubectl.
This annotation is applied to the parent object used to track an ApplySet to optimize listing of
ApplySet member objects. It is optional in the ApplySet specification, as tools can perform discovery
or use a different optimization. However, as of Kubernetes version ,
it is required by kubectl. When present, the value of this annotation must be a comma separated list
of the group-kinds, in the fully-qualified name format, i.e. `<resource>.<group>`.

### applyset.kubernetes.io/contains-group-resources (deprecated) {#applyset-kubernetes-io-contains-group-resources}

Type: Annotation

Example: `applyset.kubernetes.io/contains-group-resources: "certificates.cert-manager.io,configmaps,deployments.apps,secrets,services"`

Used on: Objects being used as ApplySet parents.

For Kubernetes version , you can use this annotation on Secrets, ConfigMaps,
or custom resources if the CustomResourceDefinition
defining them has the `applyset.kubernetes.io/is-parent-type` label.

Part of the specification used to implement
ApplySet-based pruning in kubectl.
This annotation is applied to the parent object used to track an ApplySet to optimize listing of
ApplySet member objects. It is optional in the ApplySet specification, as tools can perform discovery
or use a different optimization. However, in Kubernetes version ,
it is required by kubectl. When present, the value of this annotation must be a comma separated list
of the group-kinds, in the fully-qualified name format, i.e. `<resource>.<group>`.

**Note:**
This annotation is currently deprecated and replaced by `applyset.kubernetes.io/contains-group-kinds`,
support for this will be removed in applyset beta or GA.

### applyset.kubernetes.io/id (alpha) {#applyset-kubernetes-io-id}

Type: Label

Example: `applyset.kubernetes.io/id: "applyset-0eFHV8ySqp7XoShsGvyWFQD3s96yqwHmzc4e0HR1dsY-v1"`

Used on: Objects being used as ApplySet parents.

Use of this label is Alpha.
For Kubernetes version , you can use this label on Secrets, ConfigMaps,
or custom resources if the CustomResourceDefinition
defining them has the `applyset.kubernetes.io/is-parent-type` label.

Part of the specification used to implement
ApplySet-based pruning in kubectl.
This label is what makes an object an ApplySet parent object.
Its value is the unique ID of the ApplySet, which is derived from the identity of the parent
object itself. This ID **must** be the base64 encoding (using the URL safe encoding of RFC4648) of
the hash of the group-kind-name-namespace of the object it is on, in the form:
`<base64(sha256(<name>.<namespace>.<kind>.<group>))>`.
There is no relation between the value of this label and object UID.

### applyset.kubernetes.io/is-parent-type (alpha) {#applyset-kubernetes-io-is-parent-type}

Type: Label

Example: `applyset.kubernetes.io/is-parent-type: "true"`

Used on: Custom Resource Definition (CRD)

Use of this label is Alpha.
Part of the specification used to implement
ApplySet-based pruning in kubectl.
You can set this label on a CustomResourceDefinition (CRD) to identify the custom resource type it
defines (not the CRD itself) as an allowed parent for an ApplySet.
The only permitted value for this label is `"true"`; if you want to mark a CRD as
not being a valid parent for ApplySets, omit this label.

### applyset.kubernetes.io/part-of (alpha) {#applyset-kubernetes-io-part-of}

Type: Label

Example: `applyset.kubernetes.io/part-of: "applyset-0eFHV8ySqp7XoShsGvyWFQD3s96yqwHmzc4e0HR1dsY-v1"`

Used on: All objects.

Use of this label is Alpha.
Part of the specification used to implement
ApplySet-based pruning in kubectl.
This label is what makes an object a member of an ApplySet.
The value of the label **must** match the value of the `applyset.kubernetes.io/id`
label on the parent object.

### applyset.kubernetes.io/tooling (alpha) {#applyset-kubernetes-io-tooling}

Type: Annotation

Example: `applyset.kubernetes.io/tooling: "kubectl/v"`

Used on: Objects being used as ApplySet parents.

Use of this annotation is Alpha.
For Kubernetes version , you can use this annotation on Secrets,
ConfigMaps, or custom resources if the CustomResourceDefinitiondefining them has the
`applyset.kubernetes.io/is-parent-type` label.

Part of the specification used to implement
ApplySet-based pruning in kubectl.
This annotation is applied to the parent object used to track an ApplySet to indicate which
tooling manages that ApplySet. Tooling should refuse to mutate ApplySets belonging to other tools.
The value must be in the format `<toolname>/<semver>`.

### apps.kubernetes.io/pod-index (beta) {#apps-kubernetes.io-pod-index}

Type: Label

Example: `apps.kubernetes.io/pod-index: "0"`

Used on: Pod

When a StatefulSet controller creates a Pod for the StatefulSet, it sets this label on that Pod.
The value of the label is the ordinal index of the pod being created.

See Pod Index Label
in the StatefulSet topic for more details.
Note the PodIndexLabel
feature gate must be enabled for this label to be added to pods.

### resource.kubernetes.io/pod-claim-name

Type: Annotation

Example: `resource.kubernetes.io/pod-claim-name: "my-pod-claim"`

Used on: ResourceClaim

This annotation is assigned to generated ResourceClaims.
Its value corresponds to the name of the resource claim in the `.spec` of any Pod(s) for which the ResourceClaim was created.
Within dynamic resource allocation, the
discoverable device metadata feature uses this annotation to map a generated ResourceClaim
back to the Pod claim name (`pod.spec.resourceClaims[].name`) for template-based claims.
Kubernetes manages this annotation, so you should not modify it.

### cluster-autoscaler.kubernetes.io/safe-to-evict

Type: Annotation

Example: `cluster-autoscaler.kubernetes.io/safe-to-evict: "true"`

Used on: Pod

When this annotation is set to `"true"`, the cluster autoscaler is allowed to evict a Pod
even if other rules would normally prevent that.
The cluster autoscaler never evicts Pods that have this annotation explicitly set to
`"false"`; you could set that on an important Pod that you want to keep running.
If this annotation is not set then the cluster autoscaler follows its Pod-level behavior.

### config.kubernetes.io/local-config

Type: Annotation

Example: `config.kubernetes.io/local-config: "true"`

Used on: All objects

This annotation is used in manifests to mark an object as local configuration that
should not be submitted to the Kubernetes API.

A value of `"true"` for this annotation declares that the object is only consumed by
client-side tooling and should not be submitted to the API server.

A value of `"false"` can be used to declare that the object should be submitted to
the API server even when it would otherwise be assumed to be local.

This annotation is part of the Kubernetes Resource Model (KRM) Functions Specification,
which is used by Kustomize and similar third-party tools.
For example, Kustomize removes objects with this annotation from its final build output.

### container.apparmor.security.beta.kubernetes.io/* (deprecated) {#container-apparmor-security-beta-kubernetes-io}

Type: Annotation

Example: `container.apparmor.security.beta.kubernetes.io/my-container: my-custom-profile`

Used on: Pods

This annotation allows you to specify the AppArmor security profile for a container within a
Kubernetes pod. As of Kubernetes v1.30, this should be set with the `appArmorProfile` field instead.
To learn more, see the AppArmor tutorial.
The tutorial illustrates using AppArmor to restrict a container's abilities and access.

The profile specified dictates the set of rules and restrictions that the containerized process must
adhere to. This helps enforce security policies and isolation for your containers.

### csi.alpha.kubernetes.io/node-id (deprecated) {#csi-alpha-kubernetes-io-node-id}

Type: Annotation

Example: `csi.alpha.kubernetes.io/node-id: "node-12345"`

Used on: VolumeAttachments

This annotation records the node identifier used by a CSI driver, as a fallback when the
CSINode object is not available.
The CSI external-attacher sidecar container populates it before a volume is attached.

It provides a fallback mechanism for detaching volumes when an appropriate CSINode is not present.

Because this annotation is deprecated, the Kubernetes project recommends that you do
**not** set this on a VolumeAttachment, nor on any other object.

### csi.volume.kubernetes.io/nodeid (deprecated) {#csi-volume-kubernetes-io-nodeid}

Type: Annotation

Example: `csi.volume.kubernetes.io/nodeid: "node-12345"`

Used on: Nodes

This annotation specifies the identifier for a node as understood by the
Container Storage Interface (CSI) driver. `kubelet` populates this annotation
by calling the `NodeGetInfo` gRPC method of the CSI driver to retrieve the
node ID during driver registration. The external-attacher sidecar container
reads this annotation to get the node ID when attaching or detaching volumes.

This annotation is deprecated in favor of the CSINode object, which provides the same
functionality via the `spec.drivers[].nodeID` field.

### deployment.kubernetes.io/desired-replicas

Type: Annotation

Example: `deployment.kubernetes.io/desired-replicas: "3"`

Used on: ReplicaSet

This annotation is set by the Deployment controller on ReplicaSets it manages.
The value represents the desired number of replicas (`.spec.replicas`) from the Deployment
that owns this ReplicaSet. The Deployment controller uses this annotation to track the
desired state during rolling updates and scaling operations.

This is an internal annotation used by the Deployment controller and should not be
modified manually.

### deployment.kubernetes.io/max-replicas

Type: Annotation

Example: `deployment.kubernetes.io/max-replicas: "5"`

Used on: ReplicaSet

This annotation is set by the Deployment controller on ReplicaSets it manages.
The value represents the maximum number of replicas that this ReplicaSet is allowed to have
during a rolling update. This is used to implement the `maxSurge` parameter of the
Deployment's rolling update strategy, which controls how many extra Pods can be created
above the desired number during an update.

This is an internal annotation used by the Deployment controller and should not be
modified manually.

### deployment.kubernetes.io/revision

Type: Annotation

Example: `deployment.kubernetes.io/revision: "2"`

Used on: ReplicaSet

This annotation is set by the Deployment controller on ReplicaSets it manages.
The value represents the revision number of the Deployment. Each time the Deployment's
Pod template (`.spec.template`) is changed, the revision number is incremented.
This annotation is used to track the rollout history and enables rollback to previous
revisions using `kubectl rollout undo`.

The revision number is also visible when running `kubectl rollout history deployment/<name>`.

This is an internal annotation used by the Deployment controller and should not be
modified manually.
