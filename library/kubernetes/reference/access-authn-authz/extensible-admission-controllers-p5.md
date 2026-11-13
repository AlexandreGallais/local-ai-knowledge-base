---
title: "Dynamic Admission Control (part 5 of 5)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/access-authn-authz/extensible-admission-controllers.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Dynamic Admission Control (part 5 of 5)

## Monitoring admission webhooks

The API server provides ways to monitor admission webhook behaviors. These
monitoring mechanisms help cluster admins to answer questions like:

1. Which mutating webhook mutated the object in a API request?

2. What change did the mutating webhook applied to the object?

3. Which webhooks are frequently rejecting API requests? What's the reason for a rejection?

### Mutating webhook auditing annotations

Sometimes it's useful to know which mutating webhook mutated the object in a API request, and what change did the
webhook apply.

The Kubernetes API server performs auditing on each
mutating webhook invocation. Each invocation generates an auditing annotation
capturing if a request object is mutated by the invocation, and optionally generates an annotation
capturing the applied patch from the webhook admission response. The annotations are set in the
audit event for given request on given stage of its execution, which is then pre-processed
according to a certain policy and written to a backend.

The audit level of a event determines which annotations get recorded:

- At `Metadata` audit level or higher, an annotation with key
  `mutation.webhook.admission.k8s.io/round_{round idx}_index_{order idx}` gets logged with JSON
  payload indicating a webhook gets invoked for given request and whether it mutated the object or not.

  For example, the following annotation gets recorded for a webhook being reinvoked. The webhook is
  ordered the third in the mutating webhook chain, and didn't mutated the request object during the
  invocation.

  ```yaml
  # the audit event recorded
  {
      "kind": "Event",
      "apiVersion": "audit.k8s.io/v1",
      "annotations": {
          "mutation.webhook.admission.k8s.io/round_1_index_2": "{\"configuration\":\"my-mutating-webhook-configuration.example.com\",\"webhook\":\"my-webhook.example.com\",\"mutated\": false}"
          # other annotations
          ...
      }
      # other fields
      ...
  }
  ```

  ```yaml
  # the annotation value deserialized
  {
      "configuration": "my-mutating-webhook-configuration.example.com",
      "webhook": "my-webhook.example.com",
      "mutated": false
  }
  ```

  The following annotation gets recorded for a webhook being invoked in the first round. The webhook
  is ordered the first in the mutating webhook chain, and mutated the request object during the
  invocation.

  ```yaml
  # the audit event recorded
  {
      "kind": "Event",
      "apiVersion": "audit.k8s.io/v1",
      "annotations": {
          "mutation.webhook.admission.k8s.io/round_0_index_0": "{\"configuration\":\"my-mutating-webhook-configuration.example.com\",\"webhook\":\"my-webhook-always-mutate.example.com\",\"mutated\": true}"
          # other annotations
          ...
      }
      # other fields
      ...
  }
  ```

  ```yaml
  # the annotation value deserialized
  {
      "configuration": "my-mutating-webhook-configuration.example.com",
      "webhook": "my-webhook-always-mutate.example.com",
      "mutated": true
  }
  ```

- At `Request` audit level or higher, an annotation with key
  `patch.webhook.admission.k8s.io/round_{round idx}_index_{order idx}` gets logged with JSON payload indicating
  a webhook gets invoked for given request and what patch gets applied to the request object.

  For example, the following annotation gets recorded for a webhook being reinvoked. The webhook is ordered the fourth in the
  mutating webhook chain, and responded with a JSON patch which got applied to the request object.

  ```yaml
  # the audit event recorded
  {
      "kind": "Event",
      "apiVersion": "audit.k8s.io/v1",
      "annotations": {
          "patch.webhook.admission.k8s.io/round_1_index_3": "{\"configuration\":\"my-other-mutating-webhook-configuration.example.com\",\"webhook\":\"my-webhook-always-mutate.example.com\",\"patch\":[{\"op\":\"add\",\"path\":\"/data/mutation-stage\",\"value\":\"yes\"}],\"patchType\":\"JSONPatch\"}"
          # other annotations
          ...
      }
      # other fields
      ...
  }
  ```

  ```yaml
  # the annotation value deserialized
  {
      "configuration": "my-other-mutating-webhook-configuration.example.com",
      "webhook": "my-webhook-always-mutate.example.com",
      "patchType": "JSONPatch",
      "patch": [
          {
              "op": "add",
              "path": "/data/mutation-stage",
              "value": "yes"
          }
      ]
  }
  ```

### Admission webhook metrics

The API server  exposes Prometheus metrics from the `/metrics` endpoint, which can be used for monitoring and
diagnosing API server status. The following metrics record status related to admission webhooks.

#### API server admission webhook rejection count

Sometimes it's useful to know which admission webhooks are frequently rejecting API requests, and the
reason for a rejection.

The API server exposes a Prometheus counter metric recording admission webhook rejections. The
metrics are labelled to identify the causes of webhook rejection(s):

- `name`: the name of the webhook that rejected a request.
- `operation`: the operation type of the request, can be one of `CREATE`,
  `UPDATE`, `DELETE` and `CONNECT`.
- `type`: the admission webhook type, can be one of `admit` and `validating`.
- `error_type`: identifies if an error occurred during the webhook invocation
  that caused the rejection. Its value can be one of:

  - `calling_webhook_error`: unrecognized errors or timeout errors from the admission webhook happened and the
    webhook's Failure policy is set to `Fail`.
  - `no_error`: no error occurred. The webhook rejected the request with `allowed: false` in the admission
    response. The metrics label `rejection_code` records the `.status.code` set in the admission response.
  - `apiserver_internal_error`: an API server internal error happened.

- `rejection_code`: the HTTP status code set in the admission response when a
  webhook rejected a request.

Example of the rejection count metrics:

```
# HELP apiserver_admission_webhook_rejection_count [ALPHA] Admission webhook rejection count, identified by name and broken out for each admission type (validating or admit) and operation. Additional labels specify an error type (calling_webhook_error or apiserver_internal_error if an error occurred; no_error otherwise) and optionally a non-zero rejection code if the webhook rejects the request with an HTTP status code (honored by the apiserver when the code is greater or equal to 400). Codes greater than 600 are truncated to 600, to keep the metrics cardinality bounded.
# TYPE apiserver_admission_webhook_rejection_count counter
apiserver_admission_webhook_rejection_count{error_type="calling_webhook_error",name="always-timeout-webhook.example.com",operation="CREATE",rejection_code="0",type="validating"} 1
apiserver_admission_webhook_rejection_count{error_type="calling_webhook_error",name="invalid-admission-response-webhook.example.com",operation="CREATE",rejection_code="0",type="validating"} 1
apiserver_admission_webhook_rejection_count{error_type="no_error",name="deny-unwanted-configmap-data.example.com",operation="CREATE",rejection_code="400",type="validating"} 13
```

## Best practices and warnings

For recommendations and considerations when writing mutating admission webhooks,
see
Admission Webhooks Good Practices.
