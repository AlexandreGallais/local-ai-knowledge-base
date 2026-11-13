---
title: "Admission Control in Kubernetes (part 4 of 4)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/access-authn-authz/admission-controllers.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Admission Control in Kubernetes (part 4 of 4)

### TaintNodesByCondition {#taintnodesbycondition}

**Type**: Mutating.

This admission controller taints newly created
Nodes as `NotReady` and `NoSchedule`. That tainting avoids a race condition that could cause Pods
to be scheduled on new Nodes before their taints were updated to accurately reflect their reported
conditions.

### ValidatingAdmissionPolicy {#validatingadmissionpolicy}

**Type**: Validating.

This admission controller implements the CEL validation for incoming matched requests.
It is enabled when both feature gate `validatingadmissionpolicy` and `admissionregistration.k8s.io/v1alpha1` group/version are enabled.
If any of the ValidatingAdmissionPolicy fails, the request fails.

### ValidatingAdmissionWebhook {#validatingadmissionwebhook}

**Type**: Validating.

This admission controller calls any validating webhooks which match the request. Matching
webhooks are called in parallel; if any of them rejects the request, the request
fails. This admission controller only runs in the validation phase; the webhooks it calls may not
mutate the object, as opposed to the webhooks called by the `MutatingAdmissionWebhook` admission controller.

If a webhook called by this has side effects (for example, decrementing quota) it
*must* have a reconciliation system, as it is not guaranteed that subsequent
webhooks or other validating admission controllers will permit the request to finish.

If you disable the ValidatingAdmissionWebhook, you must also disable the
`ValidatingWebhookConfiguration` object in the `admissionregistration.k8s.io/v1`
group/version via the `--runtime-config` flag.

## Is there a recommended set of admission controllers to use?

Yes. The recommended admission controllers are enabled by default
(shown here),
so you do not need to explicitly specify them.
You can enable additional admission controllers beyond the default set using the
`--enable-admission-plugins` flag (**order doesn't matter**).
