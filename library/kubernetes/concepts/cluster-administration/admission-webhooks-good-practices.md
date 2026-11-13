---
title: "Admission Webhook Good Practices (part 1 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/cluster-administration/admission-webhooks-good-practices.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Admission Webhook Good Practices

This page provides good practices and considerations when designing
_admission webhooks_ in Kubernetes. This information is intended for
cluster operators who run admission webhook servers or third-party applications
that modify or validate your API requests.

Before reading this page, ensure that you're familiar with the following
concepts:

* Admission controllers
* Admission webhooks

## Importance of good webhook design {#why-good-webhook-design-matters}

Admission control occurs when any create, update, or delete request
is sent to the Kubernetes API. Admission controllers intercept requests that
match specific criteria that you define. These requests are then sent to
mutating admission webhooks or validating admission webhooks. These webhooks are
often written to ensure that specific fields in object specifications exist or
have specific allowed values.

Webhooks are a powerful mechanism to extend the Kubernetes API. Badly-designed
webhooks often result in workload disruptions because of how much control
the webhooks have over objects in the cluster. Like other API extension
mechanisms, webhooks are challenging to test at scale for compatibility with
all of your workloads, other webhooks, add-ons, and plugins.

Additionally, with every release, Kubernetes adds or modifies the API with new
features, feature promotions to beta or stable status, and deprecations. Even
stable Kubernetes APIs are likely to change. For example, the `Pod` API changed
in v1.29 to add the
Sidecar containers feature.
While it's rare for a Kubernetes object to enter a broken state because of a new
Kubernetes API, webhooks that worked as expected with earlier versions of an API
might not be able to reconcile more recent changes to that API. This can result
in unexpected behavior after you upgrade your clusters to newer versions.

This page describes common webhook failure scenarios and how to avoid them by
cautiously and thoughtfully designing and implementing your webhooks.

## Identify whether you use admission webhooks {#identify-admission-webhooks}

Even if you don't run your own admission webhooks, some third-party applications
that you run in your clusters might use mutating or validating admission
webhooks.

To check whether your cluster has any mutating admission webhooks, run the
following command:

```shell
kubectl get mutatingwebhookconfigurations
```
The output lists any mutating admission controllers in the cluster.

To check whether your cluster has any validating admission webhooks, run the
following command:

```shell
kubectl get validatingwebhookconfigurations
```
The output lists any validating admission controllers in the cluster.

## Choose an admission control mechanism {#choose-admission-mechanism}

Kubernetes includes multiple admission control and policy enforcement options.
Knowing when to use a specific option can help you to improve latency and
performance, reduce management overhead, and avoid issues during version
upgrades. The following table describes the mechanisms that let you mutate or
validate resources during admission:

  Mutating and validating admission control in Kubernetes

       | Mechanism
       | Description
       | Use cases

       | Mutating admission webhook
       | Intercept API requests before admission and modify as needed using
        custom logic.
       |
        Make critical modifications that must happen before resource
          admission.
        Make complex modifications that require advanced logic, like calling
          external APIs.

       | Mutating admission policy
       | Intercept API requests before admission and modify as needed using
        Common Expression Language (CEL) expressions.
       |
        Make critical modifications that must happen before resource
          admission.
        Make simple modifications, such as adjusting labels or replica
        counts.

       | Validating admission webhook
       | Intercept API requests before admission and validate against complex
        policy declarations.
       |
        Validate critical configurations before resource admission.
        Enforce complex policy logic before admission.

       | Validating admission policy
       | Intercept API requests before admission and validate against CEL
        expressions.
       |
        Validate critical configurations before resource admission.
        Enforce policy logic using CEL expressions.

In general, use _webhook_ admission control when you want an extensible way to
declare or configure the logic. Use built-in CEL-based admission control when
you want to declare simpler logic without the overhead of running a webhook
server. The Kubernetes project recommends that you use CEL-based admission
control when possible.

### Use built-in validation and defaulting for CustomResourceDefinitions {#no-crd-validation-defaulting}

If you use
CustomResourceDefinitions,
don't use admission webhooks to validate values in CustomResource specifications
or to set default values for fields. Kubernetes lets you define validation rules
and default field values when you create CustomResourceDefinitions.

To learn more, see the following resources:

* Validation rules
* Defaulting

## Performance and latency {#performance-latency}

This section describes recommendations for improving performance and reducing
latency. In summary, these are as follows:

* Consolidate webhooks and limit the number of API calls per webhook.
* Use audit logs to check for webhooks that repeatedly do the same action.
* Use load balancing for webhook availability.
* Set a small timeout value for each webhook.
* Consider cluster availability needs during webhook design.

### Design admission webhooks for low latency {#design-admission-webhooks-low-latency}

Mutating admission webhooks are called in sequence. Depending on the mutating
webhook setup, some webhooks might be called multiple times. Every mutating
webhook call adds latency to the admission process. This is unlike validating
webhooks, which get called in parallel.

When designing your mutating webhooks, consider your latency requirements and
tolerance. The more mutating webhooks there are in your cluster, the greater the
chance of latency increases.

Consider the following to reduce latency:

* Consolidate webhooks that perform a similar mutation on different objects.
* Reduce the number of API calls made in the mutating webhook server logic.
* Limit the match conditions of each mutating webhook to reduce how many
  webhooks are triggered by a specific API request.
* Consolidate small webhooks into one server and configuration to help with
  ordering and organization.

### Prevent loops caused by competing controllers {#prevent-loops-competing-controllers}

Consider any other components that run in your cluster that might conflict with
the mutations that your webhook makes. For example, if your webhook adds a label
that a different controller removes, your webhook gets called again. This leads
to a loop.

To detect these loops, try the following:

1.  Update your cluster audit policy to log audit events. Use the following
    parameters:

      * `level`: `RequestResponse`
      * `verbs`: `["patch"]`
      * `omitStages`: `RequestReceived`

    Set the audit rule to create events for the specific resources that your
    webhook mutates.

1.  Check your audit events for webhooks being reinvoked multiple times with the
    same patch being applied to the same object, or for an object having
    a field updated and reverted multiple times.

### Set a small timeout value {#small-timeout}

Admission webhooks should evaluate as quickly as possible (typically in
milliseconds), since they add to API request latency. Use a small timeout for
webhooks.

For details, see
Timeouts.

### Use a load balancer to ensure webhook availability {#load-balancer-webhook}

Admission webhooks should leverage some form of load-balancing to provide high
availability and performance benefits. If a webhook is running within the
cluster, you can run multiple webhook backends behind a Service of type
`ClusterIP`.

### Use a high-availability deployment model {#ha-deployment}

Consider your cluster's availability requirements when designing your webhook.
For example, during node downtime or zonal outages, Kubernetes marks Pods as
`NotReady` to allow load balancers to reroute traffic to available zones and
nodes. These updates to Pods might trigger your mutating webhooks. Depending on
the number of affected Pods, the mutating webhook server has a risk of timing
out or causing delays in Pod processing. As a result, traffic won't get
rerouted as quickly as you need.

Consider situations like the preceding example when writing your webhooks.
Exclude operations that are a result of Kubernetes responding to unavoidable
incidents.

## Request filtering {#request-filtering}

This section provides recommendations for filtering which requests trigger
specific webhooks. In summary, these are as follows:

* Limit the webhook scope to avoid system components and read-only requests.
* Limit webhooks to specific namespaces.
* Use match conditions to perform fine-grained request filtering.
* Match all versions of an object.

### Limit the scope of each webhook {#webhook-limit-scope}

Admission webhooks are only called when an API request matches the corresponding
webhook configuration. Limit the scope of each webhook to reduce unnecessary
calls to the webhook server. Consider the following scope limitations:

* Avoid matching objects in the `kube-system` namespace. If you run your own
  Pods in the `kube-system` namespace, use an
  `objectSelector`
  to avoid mutating a critical workload.
* Don't mutate node leases, which exist as Lease objects in the
  `kube-node-lease` system namespace. Mutating node leases might result in
  failed node upgrades. Only apply validation controls to Lease objects in this
  namespace if you're confident that the controls won't put your cluster at
  risk.
* Don't match TokenReview, SubjectAccessReview, or other
  virtual authentication and authorization resources.
  These are always read-only requests, and intercepting them might break your
  cluster. Starting with Kubernetes v1.37, admission webhooks are not called
  for these resources by default.
* Limit each webhook to a specific namespace by using a
  `namespaceSelector`.

### Filter for specific requests by using match conditions {#filter-match-conditions}

Admission controllers support multiple fields that you can use to match requests
that meet specific criteria. For example, you can use a `namespaceSelector` to
filter for requests that target a specific namespace.

For more fine-grained request filtering, use the `matchConditions` field in your
webhook configuration. This field lets you write multiple CEL expressions that
must evaluate to `true` for a request to trigger your admission webhook. Using
`matchConditions` might significantly reduce the number of calls to your webhook
server.

For details, see
Matching requests: `matchConditions`.

### Match all versions of an API {#match-all-versions}

By default, admission webhooks run on any API versions that affect a specified
resource. The `matchPolicy` field in the webhook configuration controls this
behavior. Specify a value of `Equivalent` in the `matchPolicy` field or omit
the field to allow the webhook to run on any API version.

For details, see
Matching requests: `matchPolicy`.
