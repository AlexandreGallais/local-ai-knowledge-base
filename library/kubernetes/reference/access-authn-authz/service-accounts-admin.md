---
title: "Managing Service Accounts (part 1 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/access-authn-authz/service-accounts-admin.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

A _ServiceAccount_ provides an identity for processes that run in a Pod.

A process inside a Pod can use the identity of its associated service account to
authenticate to the cluster's API server.

For an introduction to service accounts, read configure service accounts.

This task guide explains some of the concepts behind ServiceAccounts. The
guide also explains how to obtain or revoke tokens that represent
ServiceAccounts, and how to (optionally) bind a ServiceAccount's validity to
the lifetime of an API object.

## Before you begin

To be able to follow these steps exactly, ensure you have a namespace named
`examplens`.
If you don't, create one by running:

```shell
kubectl create namespace examplens
```

## User accounts versus service accounts

Kubernetes distinguishes between the concept of a user account and a service account
for a number of reasons:

- User accounts are for humans. Service accounts are for application processes,
  which (for Kubernetes) run in containers that are part of pods.
- User accounts are intended to be global: names must be unique across all
  namespaces of a cluster. No matter what namespace you look at, a particular
  username that represents a user represents the same user.
  In Kubernetes, service accounts are namespaced: two different namespaces can
  contain ServiceAccounts that have identical names.
- Typically, a cluster's user accounts might be synchronised from a corporate
  database, where new user account creation requires special privileges and is
  tied to complex business processes. By contrast, service account creation is
  intended to be more lightweight, allowing cluster users to create service accounts
  for specific tasks on demand. Separating ServiceAccount creation from the steps to
  onboard human users makes it easier for workloads to follow the principle of
  least privilege.
- Auditing considerations for humans and service accounts may differ; the separation
  makes that easier to achieve.
- A configuration bundle for a complex system may include definition of various service
  accounts for components of that system. Because service accounts can be created
  without many constraints and have namespaced names, such configuration is
  usually portable.

## Bound service account tokens

ServiceAccount tokens can be bound to API objects that exist in the kube-apiserver.
This can be used to tie the validity of a token to the existence of another API object.
Supported object types are as follows:

* Pod (used for projected volume mounts, see below)
* Secret (can be used to allow revoking a token by deleting the Secret)
* Node (can be used to auto-revoke a token when its Node is deleted; creating new node-bound tokens is GA in v1.33+)
* ValidatingWebhookConfiguration or MutatingWebhookConfiguration (used for
  authenticating to admission webhooks;
  Alpha in v1.37, requires the `APIServerWebhookAuthenticationToken`
  feature gate)

When a token is bound to an object, the object's `metadata.name` and `metadata.uid` are
stored as extra 'private claims' in the issued JWT.

When a bound token is presented to the kube-apiserver, the service account authenticator
will extract and verify these claims.
If the referenced object or the ServiceAccount is pending deletion (for example, due to finalizers),
then for any instant that is 60 seconds (or more) after the `.metadata.deletionTimestamp` date,
authentication with that token would fail.
If the referenced object no longer exists (or its `metadata.uid` does not match),
the request will not be authenticated.

### Additional metadata in Pod bound tokens

**Feature state:**

When a service account token is bound to a Pod object, additional metadata is also
embedded into the token that indicates the value of the bound pod's `spec.nodeName` field,
and the uid of that Node, if available.

This node information is **not** verified by the kube-apiserver when the token is used for authentication.
It is included so integrators do not have to fetch Pod or Node API objects to check the associated Node name
and uid when inspecting a JWT.

### Verifying and inspecting private claims

The TokenReview API can be used to verify and extract private claims from a token:

1. First, assume you have a pod named `test-pod` and a service account named `my-sa`.
1. Create a token that is bound to this Pod:

   ```shell
   kubectl create token my-sa --bound-object-kind="Pod" --bound-object-name="test-pod"
   ```

1. Copy this token into a new file named `tokenreview.yaml`:

   ```yaml
   apiVersion: authentication.k8s.io/v1
   kind: TokenReview
   spec:
     token: <token from step 2>
   ```

1. Submit this resource to the apiserver for review:

   ```shell
   # use '-o yaml' to inspect the output
   kubectl create -o yaml -f tokenreview.yaml
   ```

   You should see an output like below:

   ```yaml
   apiVersion: authentication.k8s.io/v1
   kind: TokenReview
   metadata:
     creationTimestamp: null
   spec:
     token: <token>
   status:
     audiences:
     - https://kubernetes.default.svc.cluster.local
     authenticated: true
     user:
       extra:
         authentication.kubernetes.io/credential-id:
         - JTI=7ee52be0-9045-4653-aa5e-0da57b8dccdc
         authentication.kubernetes.io/node-name:
         - kind-control-plane
         authentication.kubernetes.io/node-uid:
         - 497e9d9a-47aa-4930-b0f6-9f2fb574c8c6
         authentication.kubernetes.io/pod-name:
         - test-pod
         authentication.kubernetes.io/pod-uid:
         - e87dbbd6-3d7e-45db-aafb-72b24627dff5
       groups:
       - system:serviceaccounts
       - system:serviceaccounts:default
       - system:authenticated
       uid: f8b4161b-2e2b-11e9-86b7-2afc33b31a7e
       username: system:serviceaccount:default:my-sa
   ```

   **Note:**
   Despite using `kubectl create -f` to create this resource, and defining it similar to
   other resource types in Kubernetes, TokenReview is a special type and the kube-apiserver
   does not actually persist the TokenReview object into etcd.
   Hence `kubectl get tokenreview` is not a valid command.

#### Schema for service account private claims

The schema for the Kubernetes-specific claims within JWT tokens is not currently documented,
however the relevant code area can be found in
the serviceaccount package
in the Kubernetes codebase.

You can inspect a JWT using standard JWT decoding tool. Below is an example of a JWT for the
`my-serviceaccount` ServiceAccount, bound to a Pod object named `my-pod` which is scheduled
to the Node `my-node`, in the `my-namespace` namespace:

```json
{
  "aud": [
    "https://my-audience.example.com"
  ],
  "exp": 1729605240,
  "iat": 1729601640,
  "iss": "https://my-cluster.example.com",
  "jti": "aed34954-b33a-4142-b1ec-389d6bbb4936",
  "kubernetes.io": {
    "namespace": "my-namespace",
    "node": {
      "name": "my-node",
      "uid": "646e7c5e-32d6-4d42-9dbd-e504e6cbe6b1"
    },
    "pod": {
      "name": "my-pod",
      "uid": "5e0bd49b-f040-43b0-99b7-22765a53f7f3"
    },
    "serviceaccount": {
      "name": "my-serviceaccount",
      "uid": "14ee3fa4-a7e2-420f-9f9a-dbc4507c3798"
    }
  },
  "nbf": 1729601640,
  "sub": "system:serviceaccount:my-namespace:my-serviceaccount"
}
```

**Note:**
The `aud` and `iss` fields in this JWT may differ between different Kubernetes clusters depending
on your configuration.

The presence of both the `pod` and `node` claim implies that this token is bound
to a *Pod* object. When verifying Pod bound ServiceAccount tokens, the API server **does not**
verify the existence of the referenced Node object.

Services that run outside of Kubernetes and want to perform offline validation of JWTs may
use this schema, along with a compliant JWT validator configured with OpenID Discovery information
from the API server, to verify presented JWTs without requiring use of the TokenReview API.

Services that verify JWTs in this way **do not verify** the claims embedded in the JWT token to be
current and still valid.
This means if the token is bound to an object, and that object no longer exists, the token will still
be considered valid (until the configured token expires).

Clients that require assurance that a token's bound claims are still valid **MUST** use the TokenReview
API to present the token to the `kube-apiserver` for it to verify and expand the embedded claims, using
similar steps to the Verifying and inspecting private claims
section above, but with a supported client library.
For more information on JWTs and their structure, see the JSON Web Token RFC.

## Bound service account token volume mechanism {#bound-service-account-token-volume}

**Feature state:**

By default, the Kubernetes control plane (specifically, the
ServiceAccount admission controller)
adds a projected volume to Pods,
and this volume includes a token for Kubernetes API access.

Here's an example of how that looks for a launched Pod:

```yaml
...
  - name: kube-api-access-<random-suffix>
    projected:
      sources:
        - serviceAccountToken:
            path: token # must match the path the app expects
        - configMap:
            items:
              - key: ca.crt
                path: ca.crt
            name: kube-root-ca.crt
        - downwardAPI:
            items:
              - fieldRef:
                  apiVersion: v1
                  fieldPath: metadata.namespace
                path: namespace
```

That manifest snippet defines a projected volume that consists of three sources. In this case,
each source also represents a single path within that volume. The three sources are:

1. A `serviceAccountToken` source, that contains a token that the kubelet acquires from kube-apiserver.
   The kubelet fetches time-bound tokens using the TokenRequest API. A token served for a TokenRequest expires
   either when the pod is deleted or after a defined lifespan (by default, that is 1 hour).
   The kubelet also refreshes that token before the token expires.
   The token is bound to the specific Pod and has the kube-apiserver as its audience.
   This mechanism superseded an earlier mechanism that added a volume based on a Secret,
   where the Secret represented the ServiceAccount for the Pod, but did not expire.
1. A `configMap` source. The ConfigMap contains a bundle of certificate authority data. Pods can use these
   certificates to make sure that they are connecting to your cluster's kube-apiserver (and not to middlebox
   or an accidentally misconfigured peer).
1. A `downwardAPI` source that looks up the name of the namespace containing the Pod, and makes
   that name information available to application code running inside the Pod.

Any container within the Pod that mounts this particular volume can access the above information.

**Note:**
There is no specific mechanism to invalidate a token issued via TokenRequest. If you no longer
trust a bound service account token for a Pod, you can delete that Pod. Deleting a Pod expires
its bound service account tokens.

## Manual Secret management for ServiceAccounts

Versions of Kubernetes before v1.22 automatically created credentials for accessing
the Kubernetes API. This older mechanism was based on creating token Secrets that
could then be mounted into running Pods.

In more recent versions, including Kubernetes v, API credentials
are obtained directly using the
TokenRequest API,
and are mounted into Pods using a projected volume.
The tokens obtained using this method have bounded lifetimes, and are automatically
invalidated when the Pod they are mounted into is deleted.

You can still manually create
a Secret to hold a service account token; for example, if you need a token that never expires.

Once you manually create a Secret and link it to a ServiceAccount,
the Kubernetes control plane automatically populates the token into that Secret.

**Note:**
Although the manual mechanism for creating a long-lived ServiceAccount token exists,
using TokenRequest
to obtain short-lived API access tokens is recommended instead.

## Auto-generated legacy ServiceAccount token clean up {#auto-generated-legacy-serviceaccount-token-clean-up}

Before version 1.24, Kubernetes automatically generated Secret-based tokens for
ServiceAccounts. To distinguish between automatically generated tokens and
manually created ones, Kubernetes checks for a reference from the
ServiceAccount's secrets field. If the Secret is referenced in the `secrets`
field, it is considered an auto-generated legacy token. Otherwise, it is
considered a manually created legacy token. For example:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: build-robot
  namespace: default
secrets:
  - name: build-robot-secret # usually NOT present for a manually generated token
```

Beginning from version 1.29, legacy ServiceAccount tokens that were generated
automatically will be marked as invalid if they remain unused for a certain
period of time (set to default at one year). Tokens that continue to be unused
for this defined period (again, by default, one year) will subsequently be
purged by the control plane.

If users use an invalidated auto-generated token, the token validator will

1. add an audit annotation for the key-value pair
  `authentication.k8s.io/legacy-token-invalidated: <secret name>/<namespace>`,
1. increment the `invalid_legacy_auto_token_uses_total` metric count,
1. update the Secret label `kubernetes.io/legacy-token-last-used` with the new
   date,
1. return an error indicating that the token has been invalidated.

When receiving this validation error, users can update the Secret to remove the
`kubernetes.io/legacy-token-invalid-since` label to temporarily allow use of
this token.

Here's an example of an auto-generated legacy token that has been marked with the
`kubernetes.io/legacy-token-last-used` and `kubernetes.io/legacy-token-invalid-since`
labels:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: build-robot-secret
  namespace: default
  labels:
    kubernetes.io/legacy-token-last-used: 2022-10-24
    kubernetes.io/legacy-token-invalid-since: 2023-10-25
  annotations:
    kubernetes.io/service-account.name: build-robot
type: kubernetes.io/service-account-token
```
