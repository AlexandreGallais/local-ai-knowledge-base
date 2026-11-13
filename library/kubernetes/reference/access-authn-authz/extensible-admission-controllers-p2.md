---
title: "Dynamic Admission Control (part 2 of 5)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/access-authn-authz/extensible-admission-controllers.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Dynamic Admission Control (part 2 of 5)

## Webhook request and response

### Request

Webhooks are sent as POST requests, with `Content-Type: application/json`,
with an `AdmissionReview` API object in the `admission.k8s.io` API group
serialized to JSON as the body.

Webhooks can specify what versions of `AdmissionReview` objects they accept
with the `admissionReviewVersions` field in their configuration:

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingWebhookConfiguration
webhooks:
- name: my-webhook.example.com
  admissionReviewVersions: ["v1", "v1beta1"]
```

`admissionReviewVersions` is a required field when creating webhook configurations.
Webhooks are required to support at least one `AdmissionReview`
version understood by the current and previous API server.

API servers send the first `AdmissionReview` version in the `admissionReviewVersions` list they support.
If none of the versions in the list are supported by the API server, the configuration will not be allowed to be created.
If an API server encounters a webhook configuration that was previously created and does not support any of the `AdmissionReview`
versions the API server knows how to send, attempts to call to the webhook will fail and be subject to the failure policy.

This example shows the data contained in an `AdmissionReview` object
for a request to update the `scale` subresource of an `apps/v1` `Deployment`:

```yaml
{
  "apiVersion": "admission.k8s.io/v1",
  "kind": "AdmissionReview",
  "request": {
    # Random uid uniquely identifying this admission call
    "uid": "705ab4f5-6393-11e8-b7cc-42010a800002",

    # Fully-qualified group/version/kind of the incoming object
    "kind": {
      "group": "autoscaling",
      "version": "v1",
      "kind": "Scale"
    },

    # Fully-qualified group/version/kind of the resource being modified
    "resource": {
      "group": "apps",
      "version": "v1",
      "resource": "deployments"
    },

    # Subresource, if the request is to a subresource
    "subResource": "scale",

    # Fully-qualified group/version/kind of the incoming object in the original request to the API server
    # This only differs from `kind` if the webhook specified `matchPolicy: Equivalent` and the original
    # request to the API server was converted to a version the webhook registered for
    "requestKind": {
      "group": "autoscaling",
      "version": "v1",
      "kind": "Scale"
    },

    # Fully-qualified group/version/kind of the resource being modified in the original request to the API server
    # This only differs from `resource` if the webhook specified `matchPolicy: Equivalent` and the original
    # request to the API server was converted to a version the webhook registered for
    "requestResource": {
      "group": "apps",
      "version": "v1",
      "resource": "deployments"
    },

    # Subresource, if the request is to a subresource
    # This only differs from `subResource` if the webhook specified `matchPolicy: Equivalent` and the original
    # request to the API server was converted to a version the webhook registered for
    "requestSubResource": "scale",

    # Name of the resource being modified
    "name": "my-deployment",

    # Namespace of the resource being modified, if the resource is namespaced (or is a Namespace object)
    "namespace": "my-namespace",

    # operation can be CREATE, UPDATE, DELETE, or CONNECT
    "operation": "UPDATE",

    "userInfo": {
      # Username of the authenticated user making the request to the API server
      "username": "admin",

      # UID of the authenticated user making the request to the API server
      "uid": "014fbff9a07c",

      # Group memberships of the authenticated user making the request to the API server
      "groups": [
        "system:authenticated",
        "my-admin-group"
      ],

      # Arbitrary extra info associated with the user making the request to the API server
      # This is populated by the API server authentication layer
      "extra": {
        "some-key": [
          "some-value1",
          "some-value2"
        ]
      }
    },

    # object is the new object being admitted. It is null for DELETE operations
    "object": {
      "apiVersion": "autoscaling/v1",
      "kind": "Scale"
    },

    # oldObject is the existing object. It is null for CREATE and CONNECT operations
    "oldObject": {
      "apiVersion": "autoscaling/v1",
      "kind": "Scale"
    },

    # options contain the options for the operation being admitted, like meta.k8s.io/v1 CreateOptions,
    # UpdateOptions, or DeleteOptions. It is null for CONNECT operations
    "options": {
      "apiVersion": "meta.k8s.io/v1",
      "kind": "UpdateOptions"
    },

    # dryRun indicates the API request is running in dry run mode and will not be persisted
    # Webhooks with side effects should avoid actuating those side effects when dryRun is true
    "dryRun": false
  }
}
```

### Response

Webhooks respond with a 200 HTTP status code, `Content-Type: application/json`,
and a body containing an `AdmissionReview` object (in the same version they were sent),
with the `response` stanza populated, serialized to JSON.

At a minimum, the `response` stanza must contain the following fields:

* `uid`, copied from the `request.uid` sent to the webhook
* `allowed`, either set to `true` or `false`

Example of a minimal response from a webhook to allow a request:

```json
{
  "apiVersion": "admission.k8s.io/v1",
  "kind": "AdmissionReview",
  "response": {
    "uid": "<value from request.uid>",
    "allowed": true
  }
}
```

Example of a minimal response from a webhook to forbid a request:

```json
{
  "apiVersion": "admission.k8s.io/v1",
  "kind": "AdmissionReview",
  "response": {
    "uid": "<value from request.uid>",
    "allowed": false
  }
}
```

When rejecting a request, the webhook can customize the http code and message returned to the user
using the `status` field. The specified status object is returned to the user.
See the API documentation
for details about the `status` type.
Example of a response to forbid a request, customizing the HTTP status code and message presented to the user:

```json
{
  "apiVersion": "admission.k8s.io/v1",
  "kind": "AdmissionReview",
  "response": {
    "uid": "<value from request.uid>",
    "allowed": false,
    "status": {
      "code": 403,
      "message": "You cannot do this because it is Tuesday and your name starts with A"
    }
  }
}
```

When allowing a request, a mutating admission webhook may optionally modify the incoming object as well.
This is done using the `patch` and `patchType` fields in the response.
The only currently supported `patchType` is `JSONPatch`.
See JSON patch documentation for more details.
For `patchType: JSONPatch`, the `patch` field contains a base64-encoded array of JSON patch operations.

As an example, a single patch operation that would set `spec.replicas` would be
`[{"op": "add", "path": "/spec/replicas", "value": 3}]`

Base64-encoded, this would be `W3sib3AiOiAiYWRkIiwgInBhdGgiOiAiL3NwZWMvcmVwbGljYXMiLCAidmFsdWUiOiAzfV0=`

So a webhook response to add that label would be:

```json
{
  "apiVersion": "admission.k8s.io/v1",
  "kind": "AdmissionReview",
  "response": {
    "uid": "<value from request.uid>",
    "allowed": true,
    "patchType": "JSONPatch",
    "patch": "W3sib3AiOiAiYWRkIiwgInBhdGgiOiAiL3NwZWMvcmVwbGljYXMiLCAidmFsdWUiOiAzfV0="
  }
}
```

Admission webhooks can optionally return warning messages that are returned to the requesting client
in HTTP `Warning` headers with a warning code of 299. Warnings can be sent with allowed or rejected admission responses.

If you're implementing a webhook that returns a warning:

* Don't include a "Warning:" prefix in the message
* Use warning messages to describe problems the client making the API request should correct or be aware of
* Limit warnings to 120 characters if possible

**Caution:**
Individual warning messages over 256 characters may be truncated by the API server before being returned to clients.
If more than 4096 characters of warning messages are added (from all sources), additional warning messages are ignored.

```json
{
  "apiVersion": "admission.k8s.io/v1",
  "kind": "AdmissionReview",
  "response": {
    "uid": "<value from request.uid>",
    "allowed": true,
    "warnings": [
      "duplicate envvar entries specified with name MY_ENV",
      "memory request less than 4MB specified for container mycontainer, which will not start successfully"
    ]
  }
}
```
