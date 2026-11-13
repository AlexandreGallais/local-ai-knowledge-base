---
title: "Admission Control in Kubernetes (part 2 of 4)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/access-authn-authz/admission-controllers.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Admission Control in Kubernetes (part 2 of 4)

## What does each admission controller do?

### AlwaysAdmit {#alwaysadmit}

**Feature state:** v1.13 [deprecated]

**Type**: Validating.

This admission controller allows all pods into the cluster. It is **deprecated** because
its behavior is the same as if there were no admission controller at all.

### AlwaysDeny {#alwaysdeny}

**Feature state:** v1.13 [deprecated]

**Type**: Validating.

Rejects all requests. AlwaysDeny is **deprecated** as it has no real meaning.

### AlwaysPullImages {#alwayspullimages}

**Type**: Mutating and Validating.

This admission controller modifies every new Pod to force the image pull policy to `Always`. This is useful in a
multitenant cluster so that users can be assured that their private images can only be used by those
who have the credentials to pull them. Without this admission controller, once an image has been pulled to a
node, any pod from any user can use it by knowing the image's name (assuming the Pod is
scheduled onto the right node), without any authorization check against the image. When this admission controller
is enabled, images are always pulled prior to starting containers, which means valid credentials are
required.

### CertificateApproval {#certificateapproval}

**Type**: Validating.

This admission controller observes requests to approve CertificateSigningRequest resources and performs additional
authorization checks to ensure the approving user has permission to **approve** certificate requests with the
`spec.signerName` requested on the CertificateSigningRequest resource.

See Certificate Signing Requests for more
information on the permissions required to perform different actions on CertificateSigningRequest resources.

### CertificateSigning {#certificatesigning}

**Type**: Validating.

This admission controller observes updates to the `status.certificate` field of CertificateSigningRequest resources
and performs an additional authorization checks to ensure the signing user has permission to **sign** certificate
requests with the `spec.signerName` requested on the CertificateSigningRequest resource.

See Certificate Signing Requests for more
information on the permissions required to perform different actions on CertificateSigningRequest resources.

### CertificateSubjectRestriction {#certificatesubjectrestriction}

**Type**: Validating.

This admission controller observes creation of CertificateSigningRequest resources that have a `spec.signerName`
of `kubernetes.io/kube-apiserver-client`. It rejects any request that specifies a 'group' (or 'organization attribute')
of `system:masters`.

### DefaultIngressClass {#defaultingressclass}

**Type**: Mutating.

This admission controller observes creation of `Ingress` objects that do not request any specific
ingress class and automatically adds a default ingress class to them.  This way, users that do not
request any special ingress class do not need to care about them at all and they will get the
default one.

This admission controller does not do anything when no default ingress class is configured. When more than one ingress
class is marked as default, it rejects any creation of `Ingress` with an error and an administrator
must revisit their `IngressClass` objects and mark only one as default (with the annotation
"ingressclass.kubernetes.io/is-default-class").  This admission controller ignores any `Ingress`
updates; it acts only on creation.

See the Ingress documentation for more about ingress
classes and how to mark one as default.

### DefaultStorageClass {#defaultstorageclass}

**Type**: Mutating.

This admission controller observes creation of `PersistentVolumeClaim` objects that do not request any specific storage class
and automatically adds a default storage class to them.
This way, users that do not request any special storage class do not need to care about them at all and they
will get the default one.

This admission controller does nothing when no default `StorageClass` exists. When more than one storage
class is marked as default, and you then create a `PersistentVolumeClaim` with no `storageClassName` set,
Kubernetes uses the most recently created default `StorageClass`.
When a `PersistentVolumeClaim` is created with a specified `volumeName`, it remains in a pending state
if the static volume's `storageClassName` does not match the `storageClassName` on the `PersistentVolumeClaim`
after any default StorageClass is applied to it.
This admission controller ignores any `PersistentVolumeClaim` updates; it acts only on creation.

See persistent volume documentation about persistent volume claims and
storage classes and how to mark a storage class as default.

### DefaultTolerationSeconds {#defaulttolerationseconds}

**Type**: Mutating.

This admission controller sets the default forgiveness toleration for pods to tolerate
the taints `notready:NoExecute` and `unreachable:NoExecute` based on the k8s-apiserver input parameters
`default-not-ready-toleration-seconds` and `default-unreachable-toleration-seconds` if the pods don't already
have toleration for taints `node.kubernetes.io/not-ready:NoExecute` or
`node.kubernetes.io/unreachable:NoExecute`.
The default value for `default-not-ready-toleration-seconds` and `default-unreachable-toleration-seconds` is 5 minutes.

### DenyServiceExternalIPs

**Type**: Validating.

This admission controller rejects all net-new usage of the `Service` field `externalIPs`.  This
feature is very powerful (allows network traffic interception) and not well
controlled by policy.  When enabled, users of the cluster may not create new
Services which use `externalIPs` and may not add new values to `externalIPs` on
existing `Service` objects.  Existing uses of `externalIPs` are not affected,
and users may remove values from `externalIPs` on existing `Service` objects.

Most users do not need this feature at all, and cluster admins should consider disabling it.
Clusters that do need to use this feature should consider using some custom policy to manage usage
of it.

This admission controller is disabled by default.

### EventRateLimit {#eventratelimit}

**Feature state:** v1.13 [alpha]

**Type**: Validating.

This admission controller mitigates the problem where the API server gets flooded by
requests to store new Events. The cluster admin can specify event rate limits by:

* Enabling the `EventRateLimit` admission controller;
* Referencing an `EventRateLimit` configuration file from the file provided to the API
  server's command line flag `--admission-control-config-file`:

```yaml
apiVersion: apiserver.config.k8s.io/v1
kind: AdmissionConfiguration
plugins:
  - name: EventRateLimit
    path: eventconfig.yaml
...
```

There are four types of limits that can be specified in the configuration:

 * `Server`: All Event requests (creation or modifications) received by the API server share a single bucket.
 * `Namespace`: Each namespace has a dedicated bucket.
 * `User`: Each user is allocated a bucket.
 * `SourceAndObject`: A bucket is assigned by each combination of source and
   involved object of the event.

Below is a sample `eventconfig.yaml` for such a configuration:

```yaml
apiVersion: eventratelimit.admission.k8s.io/v1alpha1
kind: Configuration
limits:
  - type: Namespace
    qps: 50
    burst: 100
    cacheSize: 2000
  - type: User
    qps: 10
    burst: 50
```

See the EventRateLimit Config API (v1alpha1)
for more details.

This admission controller is disabled by default.

### ExtendedResourceToleration {#extendedresourcetoleration}

**Type**: Mutating.

This plug-in facilitates creation of dedicated nodes with extended resources.
If operators want to create dedicated nodes with extended resources (like GPUs, FPGAs etc.), they are expected to
taint the node with the extended resource
name as the key. This admission controller, if enabled, automatically
adds tolerations for such taints to pods requesting extended resources, so users don't have to manually
add these tolerations.

This admission controller is disabled by default.

### ImagePolicyWebhook {#imagepolicywebhook}

**Type**: Validating.

The ImagePolicyWebhook admission controller allows a backend webhook to make admission decisions.

This admission controller is disabled by default.

#### Configuration file format {#imagereview-config-file-format}

ImagePolicyWebhook uses a configuration file to set options for the behavior of the backend.
This file may be json or yaml and has the following format:

```yaml
imagePolicy:
  kubeConfigFile: /path/to/kubeconfig/for/backend
  # time in s to cache approval
  allowTTL: 50
  # time in s to cache denial
  denyTTL: 50
  # time in ms to wait between retries
  retryBackoff: 500
  # determines behavior if the webhook backend fails
  defaultAllow: true
```

Reference the ImagePolicyWebhook configuration file from the file provided to the API server's command line flag `--admission-control-config-file`:

```yaml
apiVersion: apiserver.config.k8s.io/v1
kind: AdmissionConfiguration
plugins:
  - name: ImagePolicyWebhook
    path: imagepolicyconfig.yaml
...
```

Alternatively, you can embed the configuration directly in the file:

```yaml
apiVersion: apiserver.config.k8s.io/v1
kind: AdmissionConfiguration
plugins:
  - name: ImagePolicyWebhook
    configuration:
      imagePolicy:
        kubeConfigFile: <path-to-kubeconfig-file>
        allowTTL: 50
        denyTTL: 50
        retryBackoff: 500
        defaultAllow: true
```

The ImagePolicyWebhook config file must reference a
kubeconfig
formatted file which sets up the connection to the backend.
It is required that the backend communicate over TLS.

The kubeconfig file's `cluster` field must point to the remote service, and the `user` field
must contain the returned authorizer.

```yaml
# clusters refers to the remote service.
clusters:
  - name: name-of-remote-imagepolicy-service
    cluster:
      certificate-authority: /path/to/ca.pem    # CA for verifying the remote service.
      server: https://images.example.com/policy # URL of remote service to query. Must use 'https'.

# users refers to the API server's webhook configuration.
users:
  - name: name-of-api-server
    user:
      client-certificate: /path/to/cert.pem # cert for the webhook admission controller to use
      client-key: /path/to/key.pem          # key matching the cert
```

For additional HTTP configuration, refer to the
kubeconfig documentation.

#### Request payloads

When faced with an admission decision, the API Server POSTs a JSON serialized
`imagepolicy.k8s.io/v1alpha1` `ImageReview` object describing the action.
This object contains fields describing the containers being admitted, as well as
any pod annotations that match `*.image-policy.k8s.io/*`.

**Note:**
The webhook API objects are subject to the same versioning compatibility rules
as other Kubernetes API objects. Implementers should be aware of looser compatibility
promises for alpha objects and check the `apiVersion` field of the request to
ensure correct deserialization.
Additionally, the API Server must enable the `imagepolicy.k8s.io/v1alpha1` API extensions
group (`--runtime-config=imagepolicy.k8s.io/v1alpha1=true`).

An example request body:

```json
{
  "apiVersion": "imagepolicy.k8s.io/v1alpha1",
  "kind": "ImageReview",
  "spec": {
    "containers": [
      {
        "image": "myrepo/myimage:v1"
      },
      {
        "image": "myrepo/myimage@sha256:beb6bd6a68f114c1dc2ea4b28db81bdf91de202a9014972bec5e4d9171d90ed"
      }
    ],
    "annotations": {
      "mycluster.image-policy.k8s.io/ticket-1234": "break-glass"
    },
    "namespace": "mynamespace"
  }
}
```

The remote service is expected to fill the `status` field of the request and
respond to either allow or disallow access. The response body's `spec` field is ignored, and
may be omitted. A permissive response would return:

```json
{
  "apiVersion": "imagepolicy.k8s.io/v1alpha1",
  "kind": "ImageReview",
  "status": {
    "allowed": true
  }
}
```

To disallow access, the service would return:

```json
{
  "apiVersion": "imagepolicy.k8s.io/v1alpha1",
  "kind": "ImageReview",
  "status": {
    "allowed": false,
    "reason": "image currently blacklisted"
  }
}
```

**Note:**
`ImageReview` objects will include all images in Pods intended to be executed as
containers. This covers images specified as part of the containers,
initContainers, or ephemeralContainers fields in a Pod specification. As a
result, images included under image volumes are not in scope for the
ImagePolicyWebhook.

For further documentation refer to the
`imagepolicy.v1alpha1` API.

#### Extending with Annotations

All annotations on a Pod that match `*.image-policy.k8s.io/*` are sent to the webhook.
Sending annotations allows users who are aware of the image policy backend to
send extra information to it, and for different backends implementations to
accept different information.

Examples of information you might put here are:

* request to "break glass" to override a policy, in case of emergency.
* a ticket number from a ticket system that documents the break-glass request
* provide a hint to the policy server as to the imageID of the image being provided, to save it a lookup

In any case, the annotations are provided by the user and are not validated by Kubernetes in any way.

### LimitPodHardAntiAffinityTopology {#limitpodhardantiaffinitytopology}

**Type**: Validating.

This admission controller denies any pod that defines an `AntiAffinity` topology key other than
`kubernetes.io/hostname` in `requiredDuringSchedulingIgnoredDuringExecution`.

This admission controller is disabled by default.

### LimitRanger {#limitranger}

**Type**: Mutating and Validating.

This admission controller will observe the incoming request and ensure that it does not violate
any of the constraints enumerated in the `LimitRange` object in a `Namespace`.  If you are using
`LimitRange` objects in your Kubernetes deployment, you MUST use this admission controller to
enforce those constraints. LimitRanger can also be used to apply default resource requests to Pods
that don't specify any; currently, the default LimitRanger applies a 0.1 CPU requirement to all
Pods in the `default` namespace.

See the LimitRange API reference
and the example of LimitRange
for more details.

### MutatingAdmissionPolicy {#mutatingadmissionpolicy}

**Type**: Mutating.

This admission controller uses the Common Expression Language (CEL) to declare mutations to resources. Mutations can be defined either with an apply configuration that is merged using the server side apply merge strategy, or a JSON patch.
It is enabled when both feature gate `mutatingadmissionpolicy` and `admissionregistration.k8s.io/v1alpha1` group/version are enabled.
If any of the MutatingAdmissionPolicy fails, the request fails.
