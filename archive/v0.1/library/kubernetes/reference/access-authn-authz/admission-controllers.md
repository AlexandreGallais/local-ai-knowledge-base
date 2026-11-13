---
title: "Admission Control in Kubernetes (part 1 of 4)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/access-authn-authz/admission-controllers.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

This page provides an overview of _admission controllers_.

An admission controller is a piece of code that intercepts requests to the
Kubernetes API server prior to persistence of the resource, but after the request
is authenticated and authorized.

Several important features of Kubernetes require an admission controller to be enabled in order
to properly support the feature.  As a result, a Kubernetes API server that is not properly
configured with the right set of admission controllers is an incomplete server that will not
support all the features you expect.

## What are they?

Admission controllers are code within the Kubernetes
API server that check the
data arriving in a request to modify a resource.

Admission controllers apply to requests that create, delete, or modify objects.
Admission controllers can also block custom verbs, such as a request to connect to a
pod via an API server proxy. Admission controllers do _not_ (and cannot) block requests
to read (**get**, **watch** or **list**) objects, because reads bypass the admission
control layer.

Admission control mechanisms may be _validating_, _mutating_, or both. Mutating
controllers may modify the data for the resource being modified; validating controllers may not.

The admission controllers in Kubernetes  consist of the
list below, are compiled into the
`kube-apiserver` binary, and may only be configured by the cluster
administrator.

### Admission control extension points

Within the full list, there are four
special controllers:
MutatingAdmissionWebhook,
MutatingAdmissionPolicy,
ValidatingAdmissionWebhook, and
ValidatingAdmissionPolicy.
The two webhook controllers execute the mutating and validating (respectively)
admission control webhooks
which are configured in the API. MutatingAdmissionPolicy and ValidatingAdmissionPolicy provides a way to embed
declarative mutation/validation code within the API, without relying on any external HTTP
callouts.

You can use these four admission controllers to customize cluster behavior at
admission time.

### Admission control phases

The admission control process proceeds in two phases. In the first phase,
mutating admission controllers are run. In the second phase, validating
admission controllers are run. Note again that some of the controllers are
both.

If any of the controllers in either phase reject the request, the entire
request is rejected immediately and an error is returned to the end-user.

Finally, in addition to sometimes mutating the object in question, admission
controllers may sometimes have side effects, that is, mutate related
resources as part of request processing. Incrementing quota usage is the
canonical example of why this is necessary. Any such side-effect needs a
corresponding reclamation or reconciliation process, as a given admission
controller does not know for sure that a given request will pass all of the
other admission controllers.

The ordering of these calls can be seen below.

## Why do I need them?

Several important features of Kubernetes require an admission controller to be enabled in order
to properly support the feature. As a result, a Kubernetes API server that is not properly
configured with the right set of admission controllers is an incomplete server and will not
support all the features you expect.

## How do I turn on an admission controller?

The Kubernetes API server flag `enable-admission-plugins` takes a comma-delimited list of admission control plugins to invoke prior to modifying objects in the cluster.
For example, the following command line enables the `NamespaceLifecycle` and the `LimitRanger`
admission control plugins:

```shell
kube-apiserver --enable-admission-plugins=NamespaceLifecycle,LimitRanger ...
```

**Note:**
Depending on the way your Kubernetes cluster is deployed and how the API server is
started, you may need to apply the settings in different ways. For example, you may
have to modify the systemd unit file if the API server is deployed as a systemd
service, you may modify the manifest file for the API server if Kubernetes is deployed
in a self-hosted way.

## How do I turn off an admission controller?

The Kubernetes API server flag `disable-admission-plugins` takes a comma-delimited list of admission control plugins to be disabled, even if they are in the list of plugins enabled by default.

```shell
kube-apiserver --disable-admission-plugins=PodNodeSelector,AlwaysDeny ...
```

## Which plugins are enabled by default?

To see which admission plugins are enabled:

```shell
kube-apiserver -h | grep enable-admission-plugins
```

In Kubernetes , the default ones are:

```shell
CertificateApproval, CertificateSigning, CertificateSubjectRestriction, DefaultIngressClass, DefaultStorageClass, DefaultTolerationSeconds, LimitRanger, MutatingAdmissionPolicy, MutatingAdmissionWebhook, NamespaceLifecycle, PersistentVolumeClaimResize, PodSecurity, Priority, ResourceQuota, RuntimeClass, ServiceAccount, StorageObjectInUseProtection, TaintNodesByCondition, ValidatingAdmissionPolicy, ValidatingAdmissionWebhook
```
