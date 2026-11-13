---
title: "WebhookAdmission Configuration (v1)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/config-api/apiserver-webhookadmission.v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# WebhookAdmission Configuration (v1)

Package v1 is the v1 version of the API.

## Resource Types

- WebhookAdmission

## `WebhookAdmission`     {#apiserver-config-k8s-io-v1-WebhookAdmission}

WebhookAdmission provides configuration for the webhook admission controller.

 | Field | Description

 | `apiVersion`string | `apiserver.config.k8s.io/v1`

 | `kind`string | `WebhookAdmission`

 | `kubeConfigFile` [Required]
`string`

 |
   KubeConfigFile is the path to the kubeconfig file.

 | `staticManifestsDir`
`string`

 |
   StaticManifestsDir is the path to a directory containing static webhook
configurations to be loaded at startup. Files with extensions .yaml,
.yml, and .json are read. Only admissionregistration.k8s.io/v1
ValidatingWebhookConfiguration and MutatingWebhookConfiguration
resources are supported.
Using this field requires the ManifestBasedAdmissionControlConfig
feature gate to be enabled.
