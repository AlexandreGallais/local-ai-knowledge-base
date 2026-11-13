---
title: "Service Accounts (part 2 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/security/service-accounts.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Service Accounts (part 2 of 2)

## Alternatives

* Issue your own tokens using another mechanism, and then use
  Webhook Token Authentication
  to validate bearer tokens using your own validation service.
* Provide your own identities to Pods.
  * Use the SPIFFE CSI driver plugin to provide SPIFFE SVIDs as X.509 certificate pairs to Pods.

  * Use a service mesh such as Istio to provide certificates to Pods.
* Authenticate from outside the cluster to the API server without using service account tokens:
  * Configure the API server to accept OpenID Connect (OIDC) tokens from your identity provider.
  * Use service accounts or user accounts created using an external Identity
    and Access Management (IAM) service, such as from a cloud provider, to
    authenticate to your cluster.
  * Use the CertificateSigningRequest API with client certificates.
* Configure the kubelet to retrieve credentials from an image registry.
* Use a Device Plugin to access a virtual Trusted Platform Module (TPM), which
  then allows authentication using a private key.

## What's next

* Learn how to manage your ServiceAccounts as a cluster administrator.
* Learn how to assign a ServiceAccount to a Pod.
* Read the ServiceAccount API reference.
