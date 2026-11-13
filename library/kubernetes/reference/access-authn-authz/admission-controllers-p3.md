---
title: "Admission Control in Kubernetes (part 3 of 4)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/access-authn-authz/admission-controllers.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Admission Control in Kubernetes (part 3 of 4)

### MutatingAdmissionWebhook {#mutatingadmissionwebhook}

**Type**: Mutating.

This admission controller calls any mutating webhooks which match the request. Matching
webhooks are called in serial; each one may modify the object if it desires.

This admission controller (as implied by the name) only runs in the mutating phase.

If a webhook called by this has side effects (for example, decrementing quota) it
*must* have a reconciliation system, as it is not guaranteed that subsequent
webhooks or validating admission controllers will permit the request to finish.

If you disable the MutatingAdmissionWebhook, you must also disable the
`MutatingWebhookConfiguration` object in the `admissionregistration.k8s.io/v1`
group/version via the `--runtime-config` flag, both are on by default.

#### Use caution when authoring and installing mutating webhooks

* Users may be confused when the objects they try to create are different from
  what they get back.
* Built in control loops may break when the objects they try to create are
  different when read back.
  * Setting originally unset fields is less likely to cause problems than
    overwriting fields set in the original request. Avoid doing the latter.
* Future changes to control loops for built-in resources or third-party resources
  may break webhooks that work well today. Even when the webhook installation API
  is finalized, not all possible webhook behaviors will be guaranteed to be supported
  indefinitely.

### NamespaceAutoProvision {#namespaceautoprovision}

**Type**: Mutating.

This admission controller examines all incoming requests on namespaced resources and checks
if the referenced namespace does exist.
It creates a namespace if it cannot be found.
This admission controller is useful in deployments that do not want to restrict creation of
a namespace prior to its usage.

### NamespaceExists {#namespaceexists}

**Type**: Validating.

This admission controller checks all requests on namespaced resources other than `Namespace` itself.
If the namespace referenced from a request doesn't exist, the request is rejected.

### NamespaceLifecycle {#namespacelifecycle}

**Type**: Validating.

This admission controller enforces that a `Namespace` that is undergoing termination cannot have
new objects created in it, and ensures that requests in a non-existent `Namespace` are rejected.
This admission controller also prevents deletion of three system reserved namespaces `default`,
`kube-system`, `kube-public`.

A `Namespace` deletion kicks off a sequence of operations that remove all objects (pods, services,
etc.) in that namespace.  In order to enforce integrity of that process, we strongly recommend
running this admission controller.

### NodeDeclaredFeatureValidator {#nodedeclaredfeaturevalidator}

**Feature state:**

**Type**: Validating.

This admission controller intercepts writes to bound Pods, to ensure that the
changes are compatible with the features declared by the node where the Pod is
currently running. It uses the `.status.declaredFeatures` field of the Node to
determine the set of enabled features. If a Pod update requires a feature that
is not listed in the features of its current node, the admission controller
will reject the update request. This prevents runtime failures due to feature
mismatch after a Pod has been scheduled.

This admission controller is enabled by
default if the `NodeDeclaredFeatures` feature gate is enabled.

### NodeRestriction {#noderestriction}

**Type**: Validating.

This admission controller limits the `Node` and `Pod` objects a kubelet can modify. In order to be limited by this admission controller,
kubelets must use credentials in the `system:nodes` group, with a username in the form `system:node:<nodeName>`.
Such kubelets will only be allowed to modify their own `Node` API object, and only modify `Pod` API objects that are bound to their node.
kubelets are not allowed to update or remove taints from their `Node` API object.

The `NodeRestriction` admission plugin prevents kubelets from deleting their `Node` API object,
and enforces kubelet modification of labels under the `kubernetes.io/` or `k8s.io/` prefixes as follows:

* **Forbidden** (Kubelets are blocked from modifying these):
  * Labels with a `node-restriction.kubernetes.io/` prefix. This prefix is reserved for administrators to label `Node` objects for workload isolation.
  * Labels with a `node-role.kubernetes.io/` prefix (for example: `node-role.kubernetes.io/control-plane`). These are restricted to prevent unprivileged nodes from self-declaring cluster roles.
* **Allowed** (Kubelets can add/remove/update these):
  * `kubernetes.io/hostname`
  * `kubernetes.io/arch`
  * `kubernetes.io/os`
  * `beta.kubernetes.io/instance-type`
  * `node.kubernetes.io/instance-type`
  * `failure-domain.beta.kubernetes.io/region` (deprecated)
  * `failure-domain.beta.kubernetes.io/zone` (deprecated)
  * `topology.kubernetes.io/region`
  * `topology.kubernetes.io/zone`
  * `kubelet.kubernetes.io/`-prefixed labels
  * `node.kubernetes.io/`-prefixed labels
* **Reserved**:
  Use of any other labels under the `kubernetes.io` or `k8s.io` prefixes by kubelets is reserved.
  The `NodeRestriction` admission plugin generally disallows these to prevent unauthorized self-labeling,
  but may allow additional labels under these prefixes in the future as part of future features.

When the `ServiceAccountNodeAudienceRestriction` feature gate
is enabled, this admission plugin also restricts the audiences for which a kubelet can
request service account tokens via the `TokenRequest` API. The kubelet can only request
tokens for audiences already referenced by pods on that node (through projected service
account token <example-value> or CSI driver token <example-value>), or for audiences explicitly granted
through RBAC using the `request-serviceaccounts-token-audience` verb. For more details,
see Service account token <example-value> restriction.

Future versions may add additional restrictions to ensure kubelets have the minimal set of
permissions required to operate correctly.

### OwnerReferencesPermissionEnforcement {#ownerreferencespermissionenforcement}

**Type**: Validating.

This admission controller protects the access to the `metadata.ownerReferences` of an object
so that only users with **delete** permission to the object can change it.
This admission controller also protects the access to `metadata.ownerReferences[x].blockOwnerDeletion`
of an object, so that only users with **update** permission to the `finalizers`
subresource of the referenced *owner* can change it.

### PersistentVolumeClaimResize {#persistentvolumeclaimresize}

**Feature state:** v1.24 [stable]

**Type**: Validating.

This admission controller implements additional validations for checking incoming
`PersistentVolumeClaim` resize requests.

Enabling the `PersistentVolumeClaimResize` admission controller is recommended.
This admission controller prevents resizing of all claims by default unless a claim's `StorageClass`
 explicitly enables resizing by setting `allowVolumeExpansion` to `true`.

For example: all `PersistentVolumeClaim`s created from the following `StorageClass` support volume expansion:

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: gluster-vol-default
provisioner: kubernetes.io/glusterfs
parameters:
  resturl: "http://192.168.10.100:8080"
  restuser: ""
  secretNamespace: ""
  secretName: ""
allowVolumeExpansion: true
```

For more information about persistent volume claims, see PersistentVolumeClaims.

### PodNodeSelector {#podnodeselector}

**Feature state:** v1.5 [alpha]

**Type**: Validating.

This admission controller defaults and limits what node selectors may be used within a namespace
by reading a namespace annotation and a global configuration.

This admission controller is disabled by default.

#### Configuration file format

`PodNodeSelector` uses a configuration file to set options for the behavior of the backend.
Note that the configuration file format will move to a versioned file in a future release.
This file may be json or yaml and has the following format:

```yaml
podNodeSelectorPluginConfig:
  clusterDefaultNodeSelector: name-of-node-selector
  namespace1: name-of-node-selector
  namespace2: name-of-node-selector
```

Reference the `PodNodeSelector` configuration file from the file provided to the API server's
command line flag `--admission-control-config-file`:

```yaml
apiVersion: apiserver.config.k8s.io/v1
kind: AdmissionConfiguration
plugins:
- name: PodNodeSelector
  path: podnodeselector.yaml
...
```

#### Configuration Annotation Format

`PodNodeSelector` uses the annotation key `scheduler.alpha.kubernetes.io/node-selector` to assign
node selectors to namespaces.

```yaml
apiVersion: v1
kind: Namespace
metadata:
  annotations:
    scheduler.alpha.kubernetes.io/node-selector: name-of-node-selector
  name: namespace3
```

#### Internal Behavior

This admission controller has the following behavior:

1. If the `Namespace` has an annotation with a key `scheduler.alpha.kubernetes.io/node-selector`,
   use its value as the node selector.
2. If the namespace lacks such an annotation, use the `clusterDefaultNodeSelector` defined in the
   `PodNodeSelector` plugin configuration file as the node selector.
3. Evaluate the pod's node selector against the namespace node selector for conflicts. Conflicts
   result in rejection.
4. Evaluate the pod's node selector against the namespace-specific allowed selector defined the
   plugin configuration file. Conflicts result in rejection.

**Note:**
PodNodeSelector allows forcing pods to run on specifically labeled nodes. Also see the PodTolerationRestriction
admission plugin, which allows preventing pods from running on specifically tainted nodes.

### PodSecurity {#podsecurity}

**Feature state:** v1.25 [stable]

**Type**: Validating.

The PodSecurity admission controller checks new Pods before they are
admitted, determines if it should be admitted based on the requested security context and the restrictions on permitted
Pod Security Standards
for the namespace that the Pod would be in.

See the Pod Security Admission
documentation for more information.

PodSecurity replaced an older admission controller named PodSecurityPolicy.

### PodTolerationRestriction {#podtolerationrestriction}

**Feature state:** v1.7 [alpha]

**Type**: Mutating and Validating.

The PodTolerationRestriction admission controller verifies any conflict between tolerations of a
pod and the tolerations of its namespace.
It rejects the pod request if there is a conflict.
It then merges the tolerations annotated on the namespace into the tolerations of the pod.
The resulting tolerations are checked against a list of allowed tolerations annotated to the namespace.
If the check succeeds, the pod request is admitted otherwise it is rejected.

If the namespace of the pod does not have any associated default tolerations or allowed
tolerations annotated, the cluster-level default tolerations or cluster-level list of allowed tolerations are used
instead if they are specified.

Tolerations to a namespace are assigned via the `scheduler.alpha.kubernetes.io/defaultTolerations` annotation key.
The list of allowed tolerations can be added via the `scheduler.alpha.kubernetes.io/tolerationsWhitelist` annotation key.

Example for namespace annotations:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: apps-that-need-nodes-exclusively
  annotations:
    scheduler.alpha.kubernetes.io/defaultTolerations: '[{"operator": "Exists", "effect": "NoSchedule", "key": "dedicated-node"}]'
    scheduler.alpha.kubernetes.io/tolerationsWhitelist: '[{"operator": "Exists", "effect": "NoSchedule", "key": "dedicated-node"}]'
```

This admission controller is disabled by default.

### PodTopologyLabels {#podtopologylabels}

**Feature state:**

**Type**: Mutating

The PodTopologyLabels admission controller mutates the `pods/binding` subresources
for all pods bound to a Node, adding topology labels matching those of the bound Node.
This allows Node topology labels to be available as pod labels,
which can be surfaced to running containers using the
Downward API.
The labels available as a result of this controller are the
topology.kubernetes.io/region and
topology.kubernetes.io/zone labels.

**Note:**
If any mutating admission webhook adds or modifies labels of the `pods/binding` subresource,
these changes will propagate to pod labels as a result of this controller,
overwriting labels with conflicting keys.

This admission controller is enabled when the `PodTopologyLabelsAdmission` feature gate is enabled.

### Priority {#priority}

**Type**: Mutating and Validating.

The priority admission controller uses the `priorityClassName` field and populates the integer
value of the priority.
If the priority class is not found, the Pod is rejected.

### ResourceQuota {#resourcequota}

**Type**: Validating.

This admission controller will observe the incoming request and ensure that it does not violate
any of the constraints enumerated in the `ResourceQuota` object in a `Namespace`.  If you are
using `ResourceQuota` objects in your Kubernetes deployment, you MUST use this admission
controller to enforce quota constraints.

See the ResourceQuota API reference
and the example of Resource Quota for more details.

### RuntimeClass {#runtimeclass}

**Type**: Mutating and Validating.

If you define a RuntimeClass with Pod overhead
configured, this admission controller checks incoming Pods.
When enabled, this admission controller rejects any Pod create requests
that have the overhead already set.
For Pods that have a RuntimeClass configured and selected in their `.spec`,
this admission controller sets `.spec.overhead` in the Pod based on the value
defined in the corresponding RuntimeClass.

See also Pod Overhead
for more information.

### ServiceAccount {#serviceaccount}

**Type**: Mutating and Validating.

This admission controller implements automation for
serviceAccounts.
The Kubernetes project strongly recommends enabling this admission controller.
You should enable this admission controller if you intend to make any use of Kubernetes
`ServiceAccount` objects.

To enhance the security measures around Secrets, use separate namespaces to isolate access to mounted secrets.

### StorageObjectInUseProtection

**Type**: Mutating.

The `StorageObjectInUseProtection` plugin adds the `kubernetes.io/pvc-protection` or `kubernetes.io/pv-protection`
finalizers to newly created Persistent Volume Claims (PVCs) or Persistent Volumes (PV).
In case a user deletes a PVC or PV the PVC or PV is not removed until the finalizer is removed
from the PVC or PV by PVC or PV Protection Controller.
Refer to the
Storage Object in Use Protection
for more detailed information.
