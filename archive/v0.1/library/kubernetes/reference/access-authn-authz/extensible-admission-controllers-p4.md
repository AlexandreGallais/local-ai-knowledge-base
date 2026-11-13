---
title: "Dynamic Admission Control (part 4 of 5)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/access-authn-authz/extensible-admission-controllers.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Dynamic Admission Control (part 4 of 5)

### Contacting the webhook

Once the API server has determined a request should be sent to a webhook,
it needs to know how to contact the webhook. This is specified in the `clientConfig`
stanza of the webhook configuration.

Webhooks can either be called via a URL or a service reference,
and can optionally include a custom CA bundle to use to verify the TLS connection.

#### URL

`url` gives the location of the webhook, in standard URL form
(`scheme://host:port/path`).

The `host` should not refer to a service running in the cluster; use
a service reference by specifying the `service` field instead.
The host might be resolved via external DNS in some API servers
(e.g., `kube-apiserver` cannot resolve in-cluster DNS as that would
be a layering violation). `host` may also be an IP address.

Please note that using `localhost` or `127.0.0.1` as a `host` is
risky unless you take great care to run this webhook on all hosts
which run an API server which might need to make calls to this
webhook. Such installations are likely to be non-portable or not readily
run in a new cluster.

The scheme must be "https"; the URL must begin with "https://".

Attempting to use a user or basic auth (for example `user:password@`) is not allowed.
Fragments (`#...`) and query parameters (`?...`) are also not allowed.

Here is an example of a mutating webhook configured to call a URL
(and expects the TLS certificate to be verified using system trust roots, so does not specify a caBundle):

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: MutatingWebhookConfiguration
webhooks:
- name: my-webhook.example.com
  clientConfig:
    url: "https://my-webhook.example.com:9443/my-webhook-path"
```

#### Service reference

The `service` stanza inside `clientConfig` is a reference to the service for this webhook.
If the webhook is running within the cluster, then you should use `service` instead of `url`.
The service namespace and name are required. The port is optional and defaults to 443.
The path is optional and defaults to "/".

Here is an example of a mutating webhook configured to call a service on port "1234"
at the subpath "/my-path", and to verify the TLS connection against the ServerName
`my-service-name.my-service-namespace.svc` using a custom CA bundle:

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: MutatingWebhookConfiguration
webhooks:
- name: my-webhook.example.com
  clientConfig:
    caBundle: <CA_BUNDLE>
    service:
      namespace: my-service-namespace
      name: my-service-name
      path: /my-path
      port: 1234
```

**Note:**
You must replace the `<CA_BUNDLE>` in the above example by a valid CA bundle
which is a PEM-encoded CA bundle for validating the webhook's server certificate.

### Side effects

Webhooks typically operate only on the content of the `AdmissionReview` sent to them.
Some webhooks, however, make out-of-band changes as part of processing admission requests.

Webhooks that make out-of-band changes ("side effects") must also have a reconciliation mechanism
(like a controller) that periodically determines the actual state of the world, and adjusts
the out-of-band data modified by the admission webhook to reflect reality.
This is because a call to an admission webhook does not guarantee the admitted object will be persisted as is, or at all.
Later webhooks can modify the content of the object, a conflict could be encountered while writing to storage,
or the server could power off before persisting the object.

Additionally, webhooks with side effects must skip those side-effects when `dryRun: true` admission requests are handled.
A webhook must explicitly indicate that it will not have side-effects when run with `dryRun`,
or the dry-run request will not be sent to the webhook and the API request will fail instead.

Webhooks indicate whether they have side effects using the `sideEffects` field in the webhook configuration:

* `None`: calling the webhook will have no side effects.
* `NoneOnDryRun`: calling the webhook will possibly have side effects, but if a request with
  `dryRun: true` is sent to the webhook, the webhook will suppress the side effects (the webhook
  is `dryRun`-aware).

Here is an example of a validating webhook indicating it has no side effects on `dryRun: true` requests:

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingWebhookConfiguration
webhooks:
  - name: my-webhook.example.com
    sideEffects: NoneOnDryRun
```

### Timeouts

Because webhooks add to API request latency, they should evaluate as quickly as possible.
`timeoutSeconds` allows configuring how long the API server should wait for a webhook to respond
before treating the call as a failure.

If the timeout expires before the webhook responds, the webhook call will be ignored or
the API call will be rejected based on the failure policy.

The timeout value must be between 1 and 30 seconds.

Here is an example of a validating webhook with a custom timeout of 2 seconds:

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingWebhookConfiguration
webhooks:
  - name: my-webhook.example.com
    timeoutSeconds: 2
```

The timeout for an admission webhook defaults to 10 seconds.

### Reinvocation policy

A single ordering of mutating admissions plugins (including webhooks) does not work for all cases
(see https://issue.k8s.io/64333 as an example). A mutating webhook can add a new sub-structure
to the object (like adding a `container` to a `pod`), and other mutating plugins which have already
run may have opinions on those new structures (like setting an `imagePullPolicy` on all containers).

To allow mutating admission plugins to observe changes made by other plugins,
built-in mutating admission plugins are re-run if a mutating webhook modifies an object,
and mutating webhooks can specify a `reinvocationPolicy` to control whether they are reinvoked as well.

`reinvocationPolicy` may be set to `Never` or `IfNeeded`. It defaults to `Never`.

* `Never`: the webhook must not be called more than once in a single admission evaluation.
* `IfNeeded`: the webhook may be called again as part of the admission evaluation if the object
  being admitted is modified by other admission plugins after the initial webhook call.

The important elements to note are:

* The number of additional invocations is not guaranteed to be exactly one.
* If additional invocations result in further modifications to the object, webhooks are not
  guaranteed to be invoked again.
* Webhooks that use this option may be reordered to minimize the number of additional invocations.
* To validate an object after all mutations are guaranteed complete, use a validating admission
  webhook instead (recommended for webhooks with side-effects).

Here is an example of a mutating webhook opting into being re-invoked if later admission plugins
modify the object:

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: MutatingWebhookConfiguration
webhooks:
- name: my-webhook.example.com
  reinvocationPolicy: IfNeeded
```

Mutating webhooks must be idempotent, able to successfully process an object they have already admitted
and potentially modified. This is true for all mutating admission webhooks, since any change they can make
in an object could already exist in the user-provided object, but it is essential for webhooks that opt into reinvocation.

### Failure policy

`failurePolicy` defines how errors encountered while _calling_ the admission webhook are handled.
Allowed values are `Ignore` or `Fail`.

* `Ignore` means that an error calling the webhook is ignored and the API request is allowed to continue.
* `Fail` means that an error calling the webhook causes the admission to fail and the API request to be rejected.

The failure policy applies to the following types of errors:

* Network errors, timeouts, or connection failures when contacting the webhook.
* The webhook returns a non-2xx HTTP response or a malformed response.
* The API server fails to serialize the admission request or create an internal HTTP client for the webhook.
* (Only for mutating webhooks) the response contains an undecodable or unsupported patch type.

If a write to the Kubernetes API is rejected via an admission callout, this
is a _rejection_ but Kubernetes does not consider it as a failure.
The Kubernetes API server does **not** apply a failure policy when the webhook is reached successfully, and the webhook implementation
has explicitly rejected the request (by specifying `allowed: false` in the response).
An explicit rejection, correctly transmitted, always denies the API request, regardless of the `failurePolicy` setting.

Here is a mutating webhook configured to reject an API request if errors are encountered calling the admission webhook:

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: MutatingWebhookConfiguration
webhooks:
- name: my-webhook.example.com
  failurePolicy: Fail
```

The default `failurePolicy` for an admission webhooks is `Fail`.
