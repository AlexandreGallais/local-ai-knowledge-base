---
title: "WebhookClientConfig"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/definitions/webhook-client-config-v1-admissionregistration.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# WebhookClientConfig

`apiVersion: admissionregistration.k8s.io/v1`

`import "k8s.io/api/admissionregistration/v1"`

## WebhookClientConfig {#WebhookClientConfig}

WebhookClientConfig contains the information to make a TLS connection with the webhook

   | Field | Description

       | `caBundle`string
       | caBundle is a PEM encoded CA bundle which will be used to validate the webhook's server certificate. If unspecified, system trust roots on the apiserver are used.

       | `service`ServiceReference
       | service is a reference to the service for this webhook. Either `service` or `url` must be specified.  If the webhook is running within the cluster, then you should use `service`.

       | `url`string
       | url gives the location of the webhook, in standard URL form (`scheme://host:port/path`). Exactly one of `url` or `service` must be specified.  The `host` should not refer to a service running in the cluster; use the `service` field instead. The host might be resolved via external DNS in some apiservers (e.g., `kube-apiserver` cannot resolve in-cluster DNS as that would be a layering violation). `host` may also be an IP address.  Please note that using `localhost` or `127.0.0.1` as a `host` is risky unless you take great care to run this webhook on all hosts which run an apiserver which might need to make calls to this webhook. Such installs are likely to be non-portable, i.e., not easy to turn up in a new cluster.  The scheme must be "<example-value>"; the URL must begin with "<example-value>".  A path is optional, and if present may be any string permissible in a URL. You may use the path to pass an arbitrary string to the webhook, for example, a cluster identifier.  Attempting to use a user or basic auth e.g. "<example-value>" is not allowed. Fragments ("<example-value>") and query parameters ("<example-value>") are not allowed, either.
