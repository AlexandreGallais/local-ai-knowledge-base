---
title: "Manifest-Based Admission Control (part 1 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/access-authn-authz/manifest-admission-control.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

**Feature state:**

This page provides an overview of manifest-based admission control configuration.
Manifest-based admission control lets you load
admission webhooks
and CEL-based admission policies from static files on disk, rather than from the
Kubernetes API. These policies are active from API server startup, operate
independently of etcd, and can
protect API-based admission resources from modification.

To use the feature, configure the `staticManifestsDir` field in the
AdmissionConfiguration
file passed to the kube-apiserver via `--admission-control-config-file`.
The `ManifestBasedAdmissionControlConfig`
feature gate
must be enabled; it is enabled by default since Kubernetes v1.37.

## Why use manifest-based admission control?

Admission policies and webhooks registered through the Kubernetes API (such as
ValidatingAdmissionPolicy, MutatingAdmissionPolicy,
ValidatingWebhookConfiguration, and MutatingWebhookConfiguration) have several
inherent limitations:

- **Bootstrap gap**: REST-based policy enforcement requires the API objects to be
  created and loaded by the dynamic admission controller. Until that happens,
  policies are not enforced.
- **Self-protection gap**: Admission configuration resources (such as
  ValidatingWebhookConfiguration) are not themselves subject to webhook
  admission, to prevent circular dependencies. A user with sufficient privileges
  can delete or modify critical admission policies.
- **etcd dependency**: REST-based admission configurations depend on etcd
  availability. If etcd is unavailable or corrupted, admission policies may not
  load correctly.

Manifest-based admission control addresses these limitations by loading
configurations from files on disk. These configurations are:

- Active as soon as the API server is ready to serve requests
- Not visible or changeable through the Kubernetes API
- Independent of etcd availability
- Able to intercept operations on API-based admission resources themselves

## Supported resource types

You can include the following resource types in manifest files. Only the
`admissionregistration.k8s.io/v1` API version is supported.

| Plugin name | Supported resource types |
|:------------|:------------------------|
| `ValidatingAdmissionWebhook` | ValidatingWebhookConfiguration |
| `MutatingAdmissionWebhook` | MutatingWebhookConfiguration |
| `ValidatingAdmissionPolicy` | ValidatingAdmissionPolicy, ValidatingAdmissionPolicyBinding |
| `MutatingAdmissionPolicy` | MutatingAdmissionPolicy, MutatingAdmissionPolicyBinding |

You can also use `v1.List` to wrap multiple resources of the same plugin type
in a single document.

Each admission plugin's `staticManifestsDir` must only contain resource types
allowed for that plugin. For example, a directory configured for the
`ValidatingAdmissionPolicy` plugin can only contain ValidatingAdmissionPolicy
and ValidatingAdmissionPolicyBinding resources.

## Configuring manifest-based admission control {#configuration}

To enable manifest-based admission control, you need:

1. The `ManifestBasedAdmissionControlConfig` feature gate enabled on the
   kube-apiserver (enabled by default since Kubernetes v1.37).
1. An `AdmissionConfiguration` file with `staticManifestsDir` fields pointing
   to directories containing your manifest files.
1. The manifest files themselves on disk, accessible to the kube-apiserver
   process.

### AdmissionConfiguration

Add `staticManifestsDir` to the plugin configuration for each admission plugin
that should load manifests from disk. Each plugin requires its own directory.

```yaml
# This is an example AdmissionConfiguration that configures all four admission
# plugins to load manifest-based admission control from static files on disk.
apiVersion: apiserver.config.k8s.io/v1
kind: AdmissionConfiguration
plugins:
- name: ValidatingAdmissionWebhook
  configuration:
    apiVersion: apiserver.config.k8s.io/v1
    kind: WebhookAdmissionConfiguration
    kubeConfigFile: "<path-to-kubeconfig>"
    staticManifestsDir: "/etc/kubernetes/admission/validating-webhooks/"
- name: MutatingAdmissionWebhook
  configuration:
    apiVersion: apiserver.config.k8s.io/v1
    kind: WebhookAdmissionConfiguration
    kubeConfigFile: "<path-to-kubeconfig>"
    staticManifestsDir: "/etc/kubernetes/admission/mutating-webhooks/"
- name: ValidatingAdmissionPolicy
  configuration:
    apiVersion: apiserver.config.k8s.io/v1
    kind: ValidatingAdmissionPolicyConfiguration
    staticManifestsDir: "/etc/kubernetes/admission/validating-policies/"
- name: MutatingAdmissionPolicy
  configuration:
    apiVersion: apiserver.config.k8s.io/v1
    kind: MutatingAdmissionPolicyConfiguration
    staticManifestsDir: "/etc/kubernetes/admission/mutating-policies/"
```

The `staticManifestsDir` field accepts an absolute path to a directory. All
direct-children files with `.yaml`, `.yml`, or `.json` extensions in the
directory are loaded. Subdirectories and files with other extensions are ignored.
Glob patterns and relative paths are not supported.

Pass this file to the kube-apiserver with the `--admission-control-config-file`
flag.

### Configuration types

Each admission plugin uses a specific configuration kind:

| Plugin | apiVersion | kind |
|:-------|:-----------|:-----|
| `ValidatingAdmissionWebhook` | `apiserver.config.k8s.io/v1` | `WebhookAdmissionConfiguration` |
| `MutatingAdmissionWebhook` | `apiserver.config.k8s.io/v1` | `WebhookAdmissionConfiguration` |
| `ValidatingAdmissionPolicy` | `apiserver.config.k8s.io/v1` | `ValidatingAdmissionPolicyConfiguration` |
| `MutatingAdmissionPolicy` | `apiserver.config.k8s.io/v1` | `MutatingAdmissionPolicyConfiguration` |

## Writing manifest files {#manifest-files}

Manifest files contain standard Kubernetes resource definitions. You can include
multiple resources in a single file using YAML document separators (`---`).

### Naming convention {#naming}

All objects in manifest files must have names ending with the `.static.k8s.io`
suffix. For example: `deny-privileged.static.k8s.io`.

When the `ManifestBasedAdmissionControlConfig` feature gate is enabled, creation
of API-based admission objects with names ending in `.static.k8s.io` is blocked.
When the feature gate is disabled, a warning is returned instead.

**Note:**
If two manifest files define objects of the same type with the same name, the
API server fails to start, displaying a descriptive error.

### Restrictions

Manifest-based admission configurations exist in isolation and cannot
reference API resources. The following restrictions apply:

- **Webhooks**: Must use `clientConfig.url`. The `clientConfig.service` field is
  not allowed because the service network may not be available at API server
  startup.
- **Policies**: The `spec.paramKind` field is not allowed. Policies cannot
  reference ConfigMaps or other cluster objects for parameters.
- **Bindings**: The `spec.paramRef` field is not allowed. The `spec.policyName`
  must reference a policy defined in the same manifest file set and must end
  with `.static.k8s.io`.

Manifest files are decoded using the strict decoder, which rejects files
containing duplicate fields or unknown fields. Each object undergoes the same
defaulting and validation that the REST API applies.

## Examples {#examples}

### Protecting API-based admission resources {#protecting-admission-resources}

A key capability of manifest-based admission control is the ability to intercept
operations on admission configuration resources themselves
(ValidatingAdmissionPolicy, MutatingAdmissionPolicy,
ValidatingWebhookConfiguration, MutatingWebhookConfiguration, and their
bindings). REST-based admission webhooks and policies are not invoked on these
resource types to prevent circular dependencies, but manifest-based policies
can enforce rules on them because they do not have that circular dependency.

The following example prevents deletion or modification of admission resources
that carry the `platform.example.com/protected: "true"` label:

```yaml
# This is an example ValidatingAdmissionPolicy that prevents deletion or
# modification of API-based admission resources with the
# "platform.example.com/protected: true" label.
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicy
metadata:
  name: "example-protect-admission-resources.static.k8s.io"
  annotations:
    kubernetes.io/description: "Prevent modification or deletion of protected admission resources"
spec:
  failurePolicy: Fail
  matchConstraints:
    resourceRules:
    - apiGroups: ["admissionregistration.k8s.io"]
      apiVersions: ["*"]
      operations: ["DELETE", "UPDATE"]
      resources:
      - "validatingadmissionpolicies"
      - "validatingadmissionpolicybindings"
      - "mutatingadmissionpolicies"
      - "mutatingadmissionpolicybindings"
      - "validatingwebhookconfigurations"
      - "mutatingwebhookconfigurations"
  validations:
  - expression: >-
      !has(oldObject.metadata.labels) ||
      !('platform.example.com/protected' in oldObject.metadata.labels) ||
      oldObject.metadata.labels['platform.example.com/protected'] != 'true'
    message: "Protected admission resources cannot be modified or deleted"
---
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicyBinding
metadata:
  name: "example-protect-admission-resources-binding.static.k8s.io"
  annotations:
    kubernetes.io/description: "Bind protect-admission-resources policy to all admission resources"
spec:
  policyName: "example-protect-admission-resources.static.k8s.io"
  validationActions:
  - Deny
```

### Enforcing a ValidatingAdmissionPolicy from disk

The following example defines a policy that denies privileged containers in all
namespaces except `kube-system`:

```yaml
# This is an example ValidatingAdmissionPolicy that denies privileged containers
# in all namespaces except kube-system.
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicy
metadata:
  name: "example-deny-privileged.static.k8s.io"
  annotations:
    kubernetes.io/description: "Deny privileged containers outside kube-system"
spec:
  failurePolicy: Fail
  matchConstraints:
    resourceRules:
    - apiGroups: [""]
      apiVersions: ["v1"]
      operations: ["CREATE", "UPDATE"]
      resources: ["pods"]
  variables:
  - name: allContainers
    expression: >-
      object.spec.containers +
      (has(object.spec.initContainers) ? object.spec.initContainers : []) +
      (has(object.spec.ephemeralContainers) ? object.spec.ephemeralContainers : [])
  validations:
  - expression: >-
      !variables.allContainers.exists(c,
      has(c.securityContext) && has(c.securityContext.privileged) &&
      c.securityContext.privileged == true)
    message: "Privileged containers are not allowed"
---
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicyBinding
metadata:
  name: "example-deny-privileged-binding.static.k8s.io"
  annotations:
    kubernetes.io/description: "Bind deny-privileged policy to all namespaces except kube-system"
spec:
  policyName: "example-deny-privileged.static.k8s.io"
  validationActions:
  - Deny
  matchResources:
    namespaceSelector:
      matchExpressions:
      - key: "kubernetes.io/metadata.name"
        operator: NotIn
        values: ["kube-system"]
```

Place this file in the directory configured as `staticManifestsDir` for the
`ValidatingAdmissionPolicy` plugin. The policy and its binding are loaded
together atomically.

### Configuring a ValidatingWebhookConfiguration from disk

The following example configures a validating webhook that calls an external URL:

```yaml
# This is an example ValidatingWebhookConfiguration that calls an external
# URL-based webhook endpoint to validate pod creation and updates.
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingWebhookConfiguration
metadata:
  name: "example-security-webhook.static.k8s.io"
  annotations:
    kubernetes.io/description: "Validate pod creation and updates via external webhook"
webhooks:
- name: "security.platform.example.com"
  clientConfig:
    url: "https://security-webhook.platform.example.com:443/validate"
    caBundle: "<base64-encoded-CA-bundle>"
  rules:
  - apiGroups: [""]
    apiVersions: ["v1"]
    operations: ["CREATE", "UPDATE"]
    resources: ["pods"]
  admissionReviewVersions: ["v1"]
  sideEffects: None
  failurePolicy: Fail
```

**Note:**
Webhook URLs must be reachable from the kube-apiserver at startup. Only
URL-based endpoints are supported; service references are not allowed in
manifest-based webhook configurations.

### Using the List format

You can use `v1.List` to group related resources together in a single document:

```yaml
# This is an example of using the v1.List format to group a
# ValidatingAdmissionPolicy and its binding in a single document.
apiVersion: v1
kind: List
items:
- apiVersion: admissionregistration.k8s.io/v1
  kind: ValidatingAdmissionPolicy
  metadata:
    name: "example-require-labels.static.k8s.io"
    annotations:
      kubernetes.io/description: "Require app.kubernetes.io/name label on all pods"
  spec:
    failurePolicy: Fail
    matchConstraints:
      resourceRules:
      - apiGroups: [""]
        apiVersions: ["v1"]
        operations: ["CREATE"]
        resources: ["pods"]
    validations:
    - expression: >-
        has(object.metadata.labels) &&
        'app.kubernetes.io/name' in object.metadata.labels
      message: "All pods must have the 'app.kubernetes.io/name' label"
- apiVersion: admissionregistration.k8s.io/v1
  kind: ValidatingAdmissionPolicyBinding
  metadata:
    name: "example-require-labels-binding.static.k8s.io"
    annotations:
      kubernetes.io/description: "Bind require-labels policy to all namespaces except kube-system"
  spec:
    policyName: "example-require-labels.static.k8s.io"
    validationActions:
    - Deny
    matchResources:
      namespaceSelector:
        matchExpressions:
        - key: "kubernetes.io/metadata.name"
          operator: NotIn
          values: ["kube-system"]
```

## Evaluation order

Manifest-based configurations are evaluated before API-based configurations.
This ensures that platform-level policies enforced via static configuration take
precedence over API-based policies.

For admission configuration resources themselves (ValidatingAdmissionPolicy,
MutatingAdmissionPolicy, ValidatingAdmissionPolicyBinding,
MutatingAdmissionPolicyBinding, ValidatingWebhookConfiguration,
MutatingWebhookConfiguration), only manifest-based admission hooks are
evaluated. API-based hooks are skipped for these resource types to prevent
circular dependencies.

**Note:**
The non-persisted (virtual) authentication and authorization resources, such as
TokenReview and SubjectAccessReview, are excluded from
admission webhooks
and admission policies alike. Manifest-based configurations cannot intercept
them either, because doing so could lock the cluster out of its own
authentication and authorization path.
