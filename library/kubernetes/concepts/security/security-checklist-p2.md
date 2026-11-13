---
title: "Security Checklist (part 2 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/security/security-checklist.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Security Checklist (part 2 of 2)

## Admission controllers

- [ ] An appropriate selection of admission controllers is enabled.
- [ ] A pod security policy is enforced by the Pod Security Admission or/and a
  webhook admission controller.
- [ ] The admission chain plugins and webhooks are securely configured.

Admission controllers can help improve the security of the cluster. However,
they can present risks themselves as they extend the API server and
should be properly secured.

The following lists present a number of admission controllers that could be
considered to enhance the security posture of your cluster and application. It
includes controllers that may be referenced in other parts of this document.

This first group of admission controllers includes plugins
enabled by default,
consider to leave them enabled unless you know what you are doing:

`CertificateApproval`
: Performs additional authorization checks to ensure the approving user has
permission to approve certificate request.

`CertificateSigning`
: Performs additional authorization checks to ensure the signing user has
permission to sign certificate requests.

`CertificateSubjectRestriction`
: Rejects any certificate request that specifies a 'group' (or 'organization
attribute') of `system:masters`.

`LimitRanger`
: Enforces the LimitRange API constraints.

`MutatingAdmissionWebhook`
: Allows the use of custom controllers through webhooks, these controllers may
mutate requests that they review.

`PodSecurity`
: Replacement for Pod Security Policy, restricts security contexts of deployed
Pods.

`ResourceQuota`
: Enforces resource quotas to prevent over-usage of resources.

`ValidatingAdmissionWebhook`
: Allows the use of custom controllers through webhooks, these controllers do
not mutate requests that it reviews.

The second group includes plugins that are not enabled by default but are in general
availability state and are recommended to improve your security posture:

`DenyServiceExternalIPs`
: Rejects all net-new usage of the `Service.spec.externalIPs` field. This is a mitigation for
CVE-2020-8554: Man in the middle using LoadBalancer or ExternalIPs.

`NodeRestriction`
: Restricts kubelet's permissions to only modify the pods API resources they own
or the node API resource that represent themselves. It also prevents kubelet
from using the `node-restriction.kubernetes.io/` annotation, which can be used
by an attacker with access to the kubelet's credentials to influence pod
placement to the controlled node.

The third group includes plugins that are not enabled by default but could be
considered for certain use cases:

`AlwaysPullImages`
: Enforces the usage of the latest version of a tagged image and ensures that the deployer
has permissions to use the image.

`ImagePolicyWebhook`
: Allows enforcing additional controls for images through webhooks.

## What's next

- Privilege escalation via Pod creation
  warns you about a specific access control risk; check how you're managing that
  threat.
  - If you use Kubernetes RBAC, read
    RBAC Good Practices for
    further information on authorization.
- Securing a Cluster for
  information on protecting a cluster from accidental or malicious access.
- Cluster Multi-tenancy guide for
  configuration options recommendations and best practices on multi-tenancy.
- Blog post "A Closer Look at NSA/CISA Kubernetes Hardening Guidance"
  for complementary resource on hardening Kubernetes clusters.
