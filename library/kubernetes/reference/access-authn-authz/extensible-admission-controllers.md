---
title: "Dynamic Admission Control (part 1 of 5)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/access-authn-authz/extensible-admission-controllers.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

In addition to compiled-in admission plugins,
admission plugins can be developed as extensions and run as webhooks configured at runtime.
This page describes how to build, configure, use, and monitor admission webhooks.

## What are admission webhooks?

Admission webhooks are HTTP callbacks that receive admission requests and do
something with them. You can define two types of admission webhooks,
validating admission webhook
and
mutating admission webhook.
Mutating admission webhooks are invoked first, and can modify objects sent to the API server to enforce custom defaults.
After all object modifications are complete, and after the incoming object is validated by the API server,
validating admission webhooks are invoked and can reject requests to enforce custom policies.

**Note:**
Admission webhooks that need to guarantee they see the final state of the object in order to enforce policy
should use a validating admission webhook, since objects can be modified after being seen by mutating webhooks.

## Experimenting with admission webhooks

Admission webhooks are essentially part of the cluster control-plane. You should
write and deploy them with great caution. Please read the
user guides
for instructions if you intend to write/deploy production-grade admission webhooks.
In the following, we describe how to quickly experiment with admission webhooks.

### Prerequisites

* Ensure that MutatingAdmissionWebhook and ValidatingAdmissionWebhook
  admission controllers are enabled.
  Here
  is a recommended set of admission controllers to enable in general.

* Ensure that the `admissionregistration.k8s.io/v1` API is enabled.

### Write an admission webhook server

Please refer to the implementation of the admission webhook server
that is validated in a Kubernetes e2e test. The webhook handles the
`AdmissionReview` request sent by the API servers, and sends back its decision
as an `AdmissionReview` object in the same version it received.

See the webhook request section for details on the data sent to webhooks.

See the webhook response section for the data expected from webhooks.

The example admission webhook server leaves the `ClientAuth` field
empty,
which defaults to `NoClientCert`. This means that the webhook server does not
authenticate the identity of the clients, supposedly API servers. If you need
mutual TLS or other ways to authenticate the clients, see
how to authenticate API servers.

### Deploy the admission webhook service

The webhook server in the e2e test is deployed in the Kubernetes cluster, via
the deployment API.
The test also creates a service
as the front-end of the webhook server. See
code.

You may also deploy your webhooks outside of the cluster. You will need to update
your webhook configurations accordingly.

### Configure admission webhooks on the fly

You can dynamically configure what resources are subject to what admission
webhooks via
ValidatingWebhookConfiguration
or
MutatingWebhookConfiguration.

The following is an example `ValidatingWebhookConfiguration`, a mutating webhook configuration is similar.
See the webhook configuration section for details about each config field.

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingWebhookConfiguration
metadata:
  name: "pod-policy.example.com"
webhooks:
- name: "pod-policy.example.com"
  rules:
  - apiGroups:   [""]
    apiVersions: ["v1"]
    operations:  ["CREATE"]
    resources:   ["pods"]
    scope:       "Namespaced"
  clientConfig:
    service:
      namespace: "example-namespace"
      name: "example-service"
    caBundle: <CA_BUNDLE>
  admissionReviewVersions: ["v1"]
  sideEffects: None
  timeoutSeconds: 5
```

**Note:**
You must replace the `<CA_BUNDLE>` in the above example by a valid CA bundle
which is a PEM-encoded (field value is Base64 encoded) CA bundle for validating the webhook's server certificate.

The `scope` field specifies if only cluster-scoped resources ("Cluster") or namespace-scoped
resources ("Namespaced") will match this rule. "&lowast;" means that there are no scope restrictions.

**Note:**
When using `clientConfig.service`, the server cert must be valid for
`<svc_name>.<svc_namespace>.svc`.

**Note:**
Default timeout for a webhook call is 10 seconds,
You can set the `timeout` and it is encouraged to use a short timeout for webhooks.
If the webhook call times out, the request is handled according to the webhook's
failure policy.

When an API server receives a request that matches one of the `rules`, the
API server sends an `admissionReview` request to webhook as specified in the
`clientConfig`.

After you create the webhook configuration, the system will take a few seconds
to honor the new configuration.

### Authenticate API servers   {#authenticate-apiservers}

If your admission webhooks require authentication, you can configure the
API servers to use basic auth, bearer token, or a cert to authenticate itself to
the webhooks. There are three steps to complete the configuration.

* When starting the API server, specify the location of the admission control
  configuration file via the `--admission-control-config-file` flag.

* In the admission control configuration file, specify where the
  MutatingAdmissionWebhook controller and ValidatingAdmissionWebhook controller
  should read the credentials. The credentials are stored in kubeConfig files
  (yes, the same schema that's used by kubectl), so the field name is
  `kubeConfigFile`. Here is an example admission control configuration file:

```yaml
apiVersion: apiserver.config.k8s.io/v1
kind: AdmissionConfiguration
plugins:
- name: ValidatingAdmissionWebhook
  configuration:
    apiVersion: apiserver.config.k8s.io/v1
    kind: WebhookAdmissionConfiguration
    kubeConfigFile: "<path-to-kubeconfig-file>"
- name: MutatingAdmissionWebhook
  configuration:
    apiVersion: apiserver.config.k8s.io/v1
    kind: WebhookAdmissionConfiguration
    kubeConfigFile: "<path-to-kubeconfig-file>"
```

For more information about `AdmissionConfiguration`, see the
AdmissionConfiguration (v1) reference.
See the webhook configuration section for details about each config field.

In the kubeConfig file, provide the credentials:

```yaml
apiVersion: v1
kind: Config
users:
# name should be set to the DNS name of the service or the host (including port) of the URL the webhook is configured to speak to.
# If a non-443 port is used for services, it must be included in the name when configuring 1.16+ API servers.
#
# For a webhook configured to speak to a service on the default port (443), specify the DNS name of the service:
# - name: webhook1.ns1.svc
#   user: ...
#
# For a webhook configured to speak to a service on non-default port (e.g. 8443), specify the DNS name and port of the service in 1.16+:
# - name: webhook1.ns1.svc:8443
#   user: ...
# and optionally create a second stanza using only the DNS name of the service for compatibility with 1.15 API servers:
# - name: webhook1.ns1.svc
#   user: ...
#
# For webhooks configured to speak to a URL, match the host (and port) specified in the webhook's URL. Examples:
# A webhook with `url: https://www.example.com`:
# - name: www.example.com
#   user: ...
#
# A webhook with `url: https://www.example.com:443`:
# - name: www.example.com:443
#   user: ...
#
# A webhook with `url: https://www.example.com:8443`:
# - name: www.example.com:8443
#   user: ...
#
- name: 'webhook1.ns1.svc'
  user:
    client-certificate-data: "<pem encoded certificate>"
    client-key-data: "<pem encoded key>"
# The `name` supports using * to wildcard-match prefixing segments.
- name: '*.webhook-company.org'
  user:
    password: "<password>"
    username: "<name>"
# '*' is the default match.
- name: '*'
  user:
    token: "<token>"
```

Of course you need to set up the webhook server to handle these authentication requests.

### Authenticating to admission webhooks {#authenticating-to-admission-webhooks}

**Feature state:**

As an alternative to the manual credential management described in
Authenticate API servers, the `kube-apiserver` can
issue short-lived, scoped ServiceAccount tokens for authenticating to admission
webhooks. This mechanism uses the
TokenRequest
API to issue tokens that are bound to a specific webhook configuration and
scoped to particular API groups.

**Note:**
This mechanism implements token issuance. Automatic token acquisition and
presentation by the `kube-apiserver` and aggregated API servers when calling
webhooks, along with a webhook-side token verification library, are not part of
this mechanism.

#### How it works

The TokenRequest API is extended to support issuing tokens bound to
ValidatingWebhookConfiguration or MutatingWebhookConfiguration objects.
These tokens include attestation claims that specify which API groups the token
authorizes its bearer to query the webhook about. The token becomes invalid if
the referenced webhook configuration is deleted.

To request a webhook authentication token, a TokenRequest must include:

1. **A `.spec.boundObjectRef` field** referencing either a ValidatingWebhookConfiguration or
   a MutatingWebhookConfiguration. The referenced webhook configuration must
   exist and must not be marked for deletion.

1. **A `.spec.attestations` field** with exactly one entry: the key
   `admissionReviewAPIGroups` with a single-element string array value specifying
   the API group this token covers. The value `"*"` means all API groups.
   The specified API group must match a rule in the referenced webhook
   configuration.

1. **A `.spec.audiences` field** with exactly one element that matches the webhook's
   endpoint:
   - For URL-configured webhooks: the audience must be an exact match of the
     URL.
   - For service-configured webhooks: the audience must match the pattern
     `https://<name>.<namespace>.svc:<port>[]`, where `<port>` defaults
     to `443` and `` defaults to `/` if not specified in the webhook
     configuration.

1. **A `.spec.expirationSeconds`** value. The maximum allowed expiration for
   webhook-bound tokens is 600 seconds (10 minutes).

#### Authorization requirements

Two levels of authorization are checked when issuing a webhook authentication
token:

1. The requester must have `create` permission on `serviceaccounts/token` for
   the target service account (the standard TokenRequest authorization).

1. The service account named in the TokenRequest must have `attest` permission
   on the `admissionReviewAPIGroups` resource in the `authentication.k8s.io`
   API group, with a `resourceName` that matches the API group specified in
   the attestation (or `"*"` for all API groups).

The following example RBAC configuration allows a service account to request
webhook authentication tokens scoped to the `mygroup.example.com` API group:

```yaml
# ClusterRole granting attest permission for a specific API group
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: webhook-auth-attest-mygroup-example-com
rules:
  - apiGroups: ["authentication.k8s.io"]
    resources: ["admissionReviewAPIGroups"]
    resourceNames: ["mygroup.example.com"]
    verbs: ["attest"]
---
# Bind the ClusterRole to the service account used for token acquisition
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: webhook-auth-attest-mygroup-example-com-binding
subjects:
  - kind: ServiceAccount
    name: webhook-auth-sa
    namespace: kube-system
roleRef:
  kind: ClusterRole
  name: webhook-auth-attest-mygroup-example-com
  apiGroup: rbac.authorization.k8s.io
```

#### Token claims and verification via TokenReview

When a webhook authentication token is verified through
TokenReview,
the following additional keys are populated in the `.status.user.extra` field of
the response:

For tokens bound to a ValidatingWebhookConfiguration:
- `authentication.kubernetes.io/validatingwebhookconfiguration-name`
- `authentication.kubernetes.io/validatingwebhookconfiguration-uid`

For tokens bound to a MutatingWebhookConfiguration:
- `authentication.kubernetes.io/mutatingwebhookconfiguration-name`
- `authentication.kubernetes.io/mutatingwebhookconfiguration-uid`

For all webhook authentication tokens:
- `attestation.authentication.kubernetes.io/admissionReviewAPIGroups` --
  the API group the token is authorized for.

The underlying JWT includes these claims in the `kubernetes.io` private claims
namespace. For example, a token bound to a MutatingWebhookConfiguration:

```json
{
  "kubernetes.io": {
    "mutatingwebhookconfiguration": {
      "name": "my-webhook",
      "uid": "44e818f2-2ad0-4432-9816-3a649ca9945c"
    },
    "attestations": {
      "admissionReviewAPIGroups": ["mygroup.example.com"]
    }
  }
}
```
