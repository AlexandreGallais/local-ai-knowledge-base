---
title: "Managing Service Accounts (part 2 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/access-authn-authz/service-accounts-admin.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Managing Service Accounts (part 2 of 3)

## Control plane details

### ServiceAccount controller

A ServiceAccount controller manages the ServiceAccounts inside namespaces, and
ensures a ServiceAccount named "default" exists in every active namespace.

### Token controller

The service account token controller runs as part of `kube-controller-manager`.
This controller acts asynchronously. It:

- watches for ServiceAccount deletion and deletes all corresponding ServiceAccount
  token Secrets.
- watches for ServiceAccount token Secret addition, and ensures the referenced
  ServiceAccount exists, and adds a token to the Secret if needed.
- watches for Secret deletion and removes a reference from the corresponding
  ServiceAccount if needed.

You must pass a service account private key file to the token controller in
the `kube-controller-manager` using the `--service-account-private-key-file`
flag. The private key is used to sign generated service account tokens.
Similarly, you must pass the corresponding public key to the `kube-apiserver`
using the `--service-account-key-file` flag. The public key will be used to
verify the tokens during authentication.

**Feature state:**

An alternate setup to setting `--service-account-private-key-file` and `--service-account-key-file` flags is
to configure an external JWT signer for external ServiceAccount token signing and key management.
Note that these setups are mutually exclusive and cannot be configured together.

### ServiceAccount admission controller

The modification of pods is implemented via a plugin
called an Admission Controller.
It is part of the API server.
This admission controller acts synchronously to modify pods as they are created.
When this plugin is active (and it is by default on most distributions), then
it does the following when a Pod is created:

1. If the pod does not have a `.spec.serviceAccountName` set, the admission controller sets the name of the
   ServiceAccount for this incoming Pod to `default`.
1. The admission controller ensures that the ServiceAccount referenced by the incoming Pod exists. If there
   is no ServiceAccount with a matching name, the admission controller rejects the incoming Pod. That check
   applies even for the `default` ServiceAccount.
1. Provided that neither the ServiceAccount's `automountServiceAccountToken` field nor the
   Pod's `automountServiceAccountToken` field is set to `false`:
   - the admission controller mutates the incoming Pod, adding an extra
     volume that contains
     a token for API access.
   - the admission controller adds a `volumeMount` to each container in the Pod,
     skipping any containers that already have a volume mount defined for the path
     `/var/run/secrets/kubernetes.io/serviceaccount`.
     For Linux containers, that volume is mounted at `/var/run/secrets/kubernetes.io/serviceaccount`;
     on Windows nodes, the mount is at the equivalent path.
1. If the spec of the incoming Pod doesn't already contain any `imagePullSecrets`, then the
   admission controller adds `imagePullSecrets`, copying them from the `ServiceAccount`.

### Legacy ServiceAccount token tracking controller

**Feature state:**

This controller generates a ConfigMap called
`kube-system/kube-apiserver-legacy-service-account-token-tracking` in the
`kube-system` namespace. The ConfigMap records the timestamp when legacy service
account tokens began to be monitored by the system.

### Legacy ServiceAccount token cleaner

**Feature state:**

The legacy ServiceAccount token cleaner runs as part of the
`kube-controller-manager` and checks every 24 hours to see if any auto-generated
legacy ServiceAccount token has not been used in a *specified amount of time*.
If so, the cleaner marks those tokens as invalid.

The cleaner works by first checking the ConfigMap created by the control plane
(provided that `LegacyServiceAccountTokenTracking` is enabled). If the current
time is a *specified amount of time* after the date in the ConfigMap, the
cleaner then loops through the list of Secrets in the cluster and evaluates each
Secret that has the type `kubernetes.io/service-account-token`.

If a Secret meets all of the following conditions, the cleaner marks it as
invalid:

- The Secret is auto-generated, meaning that it is bi-directionally referenced
  by a ServiceAccount.
- The Secret is not currently mounted by any pods.
- The Secret has not been used in a *specified amount of time* since it was
  created or since it was last used.

The cleaner marks a Secret invalid by adding a label called
`kubernetes.io/legacy-token-invalid-since` to the Secret, with the current date
as the value. If an invalid Secret is not used in a *specified amount of time*,
the cleaner will delete it.

**Note:**
All the *specified amount of time* above defaults to one year. The cluster
administrator can configure this value through the
`--legacy-service-account-token-clean-up-period` command line argument for the
`kube-controller-manager` component.

### TokenRequest API

**Feature state:** v1.22 [stable]

You use the TokenRequest
subresource of a ServiceAccount to obtain a time-bound token for that ServiceAccount.
You don't need to call this to obtain an API token for use within a container, since
the kubelet sets this up for you using a _projected volume_.

If you want to use the TokenRequest API from `kubectl`, see
Manually create an API token for a ServiceAccount.

The Kubernetes control plane (specifically, the ServiceAccount admission controller)
adds a projected volume to Pods, and the kubelet ensures that this volume contains a token
that lets containers authenticate as the right ServiceAccount.

(This mechanism superseded an earlier mechanism that added a volume based on a Secret,
where the Secret represented the ServiceAccount for the Pod but did not expire.)

Here's an example of how that looks for a launched Pod:

```yaml
...
  - name: kube-api-access-<random-suffix>
    projected:
      defaultMode: 420 # decimal equivalent of octal 0644
      sources:
        - serviceAccountToken:
            expirationSeconds: 3607
            path: token
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

That manifest snippet defines a projected volume that combines information from three sources:

1. A `serviceAccountToken` source, that contains a token that the kubelet acquires from kube-apiserver.
   The kubelet fetches time-bound tokens using the TokenRequest API. A token served for a TokenRequest expires
   either when the pod is deleted or after a defined lifespan (by default, that is 1 hour).
   The token is bound to the specific Pod and has the kube-apiserver as its audience.
1. A `configMap` source. The ConfigMap contains a bundle of certificate authority data. Pods can use these
   certificates to make sure that they are connecting to your cluster's kube-apiserver (and not to a middlebox
   or an accidentally misconfigured peer).
1. A `downwardAPI` source. This `downwardAPI` volume makes the name of the namespace containing the Pod available
   to application code running inside the Pod.

Any container within the Pod that mounts this volume can access the above information.

## Create additional API tokens {#create-token}

**Caution:**
Only create long-lived API tokens if the token request mechanism
is not suitable. The token request mechanism provides time-limited tokens; because these
expire, they represent a lower risk to information security.

To create a non-expiring, persisted API token for a ServiceAccount, create a
Secret of type `kubernetes.io/service-account-token` with an annotation
referencing the ServiceAccount. The control plane then generates a long-lived token and
updates that Secret with that generated token data.

Here is a sample manifest for such a Secret:

```yaml
apiVersion: v1
kind: Secret
type: kubernetes.io/service-account-token
metadata:
  name: mysecretname
  annotations:
    kubernetes.io/service-account.name: myserviceaccount
```

To create a Secret based on this example, run:

```shell
kubectl -n examplens create -f https://k8s.io/examples/secret/serviceaccount/mysecretname.yaml
```

To see the details for that Secret, run:

```shell
kubectl -n examplens describe secret mysecretname
```

The output is similar to:

```
Name:           mysecretname
Namespace:      examplens
Labels:         <none>
Annotations:    kubernetes.io/service-account.name=myserviceaccount
                kubernetes.io/service-account.uid=8a85c4c4-8483-11e9-bc42-526af7764f64

Type:   kubernetes.io/service-account-token

Data
====
ca.crt:         1362 bytes
namespace:      9 bytes
token:          ...
```

If you launch a new Pod into the `examplens` namespace, it can use the `myserviceaccount`
service-account-token Secret that you just created.

**Caution:**
Do not reference manually created Secrets in the `secrets` field of a
ServiceAccount. Or the manually created Secrets will be cleaned if it is not used for a long
time. Please refer to auto-generated legacy ServiceAccount token clean up.

## Delete/invalidate a ServiceAccount token {#delete-token}

### Delete/invalidate a long-lived/legacy ServiceAccount token {#delete-legacy-token}

If you know the name of the Secret that contains the token you want to remove:

```shell
kubectl delete secret name-of-secret
```

Otherwise, first find the Secret for the ServiceAccount.

```shell
# This assumes that you already have a namespace named 'examplens'
kubectl -n examplens get serviceaccount/example-automated-thing -o yaml
```

The output is similar to:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"v1","kind":"ServiceAccount","metadata":{"annotations":{},"name":"example-automated-thing","namespace":"examplens"}}
  creationTimestamp: "2019-07-21T07:07:07Z"
  name: example-automated-thing
  namespace: examplens
  resourceVersion: "777"
  selfLink: /api/v1/namespaces/examplens/serviceaccounts/example-automated-thing
  uid: f23fd170-66f2-4697-b049-e1e266b7f835
secrets:
  - name: example-automated-thing-token-zyxwv
```

Then, delete the Secret you now know the name of:

```shell
kubectl -n examplens delete secret/example-automated-thing-token-zyxwv
```

### Delete/invalidate a short-lived ServiceAccount token {#delete-short-lived}

Short lived ServiceAccount tokens automatically expire after the time-limit
specified during their creation. There is no central record of tokens issued,
so there is no way to revoke individual tokens.

If you have to revoke a short-lived token before its expiration, you
can delete and re-create the ServiceAccount it is associated to. This will
change its UID and hence invalidate **all** ServiceAccount tokens that were
created for it.
