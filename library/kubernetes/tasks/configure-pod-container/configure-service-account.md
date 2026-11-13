---
title: "Configure Service Accounts for Pods (part 1 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/configure-pod-container/configure-service-account.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Configure Service Accounts for Pods

Kubernetes offers two distinct ways for clients that run within your
cluster, or that otherwise have a relationship to your cluster's
control plane
to authenticate to the
API server.

A _service account_ provides an identity for processes that run in a Pod,
and maps to a ServiceAccount object. When you authenticate to the API
server, you identify yourself as a particular _user_. Kubernetes recognises
the concept of a user, however, Kubernetes itself does **not** have a User
API.

This task guide is about ServiceAccounts, which do exist in the Kubernetes
API. The guide shows you some ways to configure ServiceAccounts for Pods.

## Use the default service account to access the API server

When Pods contact the API server, Pods authenticate as a particular
ServiceAccount (for example, `default`). There is always at least one
ServiceAccount in each namespace.

Every Kubernetes namespace contains at least one ServiceAccount: the default
ServiceAccount for that namespace, named `default`.
If you do not specify a ServiceAccount when you create a Pod, Kubernetes
automatically assigns the ServiceAccount named `default` in that namespace.

You can fetch the details for a Pod you have created. For example:

```shell
kubectl get pods/<podname> -o yaml
```

In the output, you see a field `spec.serviceAccountName`.
Kubernetes automatically
sets that value if you don't specify it when you create a Pod.

An application running inside a Pod can access the Kubernetes API using
automatically mounted service account credentials.
See accessing the Cluster to learn more.

When a Pod authenticates as a ServiceAccount, its level of access depends on the
authorization plugin and policy
in use.

The API credentials are automatically revoked when the Pod is deleted, even if
finalizers are in place. In particular, the API credentials are revoked 60 seconds
beyond the `.metadata.deletionTimestamp` set on the Pod (the deletion timestamp
is typically the time that the **delete** request was accepted plus the Pod's
termination grace period).

### Opt out of API credential automounting

If you don't want the kubelet
to automatically mount a ServiceAccount's API credentials, you can opt out of
the default behavior.
You can opt out of automounting API credentials on `/var/run/secrets/kubernetes.io/serviceaccount/token`
for a service account by setting `automountServiceAccountToken: false` on the ServiceAccount:

For example:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: build-robot
automountServiceAccountToken: false
...
```

You can also opt out of automounting API credentials for a particular Pod:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  serviceAccountName: build-robot
  automountServiceAccountToken: false
  ...
```

If both the ServiceAccount and the Pod's `.spec` specify a value for
`automountServiceAccountToken`, the Pod spec takes precedence.

## Use more than one ServiceAccount {#use-multiple-service-accounts}

Every namespace has at least one ServiceAccount: the default ServiceAccount
resource, called `default`. You can list all ServiceAccount resources in your
current namespace
with:

```shell
kubectl get serviceaccounts
```

The output is similar to this:

```
NAME      SECRETS    AGE
default   1          1d
```

You can create additional ServiceAccount objects like this:

```shell
kubectl apply -f - <<EOF
apiVersion: v1
kind: ServiceAccount
metadata:
  name: build-robot
EOF
```

The name of a ServiceAccount object must be a valid
DNS subdomain name.

If you get a complete dump of the service account object, like this:

```shell
kubectl get serviceaccounts/build-robot -o yaml
```

The output is similar to this:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  creationTimestamp: 2019-06-16T00:12:34Z
  name: build-robot
  namespace: default
  resourceVersion: "272500"
  uid: 721ab723-13bc-11e5-aec2-42010af0021e
```

You can use authorization plugins to
set permissions on service accounts.

To use a non-default service account, set the `spec.serviceAccountName`
field of a Pod to the name of the ServiceAccount you wish to use.

You can only set the `serviceAccountName` field when creating a Pod, or in a
template for a new Pod. You cannot update the `.spec.serviceAccountName` field
of a Pod that already exists.

**Note:**
The `.spec.serviceAccount` field is a deprecated alias for `.spec.serviceAccountName`.
If you want to remove the fields from a workload resource, set both fields to empty explicitly
on the pod template.

### Cleanup {#cleanup-use-multiple-service-accounts}

If you tried creating `build-robot` ServiceAccount from the example above,
you can clean it up by running:

```shell
kubectl delete serviceaccount/build-robot
```

## Manually create an API token for a ServiceAccount

Suppose you have an existing service account named "build-robot" as mentioned earlier.

You can get a time-limited API token for that ServiceAccount using `kubectl`:

```shell
kubectl create token build-robot
```

The output from that command is a token that you can use to authenticate as that
ServiceAccount. You can request a specific token duration using the `--duration`
command line argument to `kubectl create token` (the actual duration of the issued
token might be shorter, or could even be longer).

**Feature state:**

Using `kubectl` v1.31 or later, it is possible to create a service
account token that is directly bound to a Node:

```shell
kubectl create token build-robot --bound-object-kind Node --bound-object-name node-001 --bound-object-uid 123...456
```

The token will be valid until it expires or either the associated Node or service account are deleted.

**Note:**
Versions of Kubernetes before v1.22 automatically created long term credentials for
accessing the Kubernetes API. This older mechanism was based on creating token Secrets
that could then be mounted into running Pods. In more recent versions, including
Kubernetes v, API credentials are obtained directly by using the
TokenRequest API,
and are mounted into Pods using a
projected volume.
The tokens obtained using this method have bounded lifetimes, and are automatically
invalidated when the Pod they are mounted into is deleted.

You can still manually create a service account token Secret; for example,
if you need a token that never expires. However, using the
TokenRequest
subresource to obtain a token to access the API is recommended instead.

### Manually create a long-lived API token for a ServiceAccount

If you want to obtain an API token for a ServiceAccount, you create a new Secret
with a special annotation, `kubernetes.io/service-account.name`.

```shell
kubectl apply -f - <<EOF
apiVersion: v1
kind: Secret
metadata:
  name: build-robot-secret
  annotations:
    kubernetes.io/service-account.name: build-robot
type: kubernetes.io/service-account-token
EOF
```

If you view the Secret using:

```shell
kubectl get secret/build-robot-secret -o yaml
```

you can see that the Secret now contains an API token for the "build-robot" ServiceAccount.

Because of the annotation you set, the control plane automatically generates a token for that
ServiceAccounts, and stores them into the associated Secret. The control plane also cleans up
tokens for deleted ServiceAccounts.

```shell
kubectl describe secrets/build-robot-secret
```

The output is similar to this:

```
Name:           build-robot-secret
Namespace:      default
Labels:         <none>
Annotations:    kubernetes.io/service-account.name: build-robot
                kubernetes.io/service-account.uid: da68f9c6-9d26-11e7-b84e-002dc52800da

Type:   kubernetes.io/service-account-token

Data
====
ca.crt:         1338 bytes
namespace:      7 bytes
token:          ...
```

**Note:**
The content of `token` is omitted here.

Take care not to display the contents of a `kubernetes.io/service-account-token`
Secret somewhere that your terminal / computer screen could be seen by an onlooker.

When you delete a ServiceAccount that has an associated Secret, the Kubernetes
control plane automatically cleans up the long-lived token from that Secret.

**Note:**
If you view the ServiceAccount using:

` kubectl get serviceaccount build-robot -o yaml`

You can't see the `build-robot-secret` Secret in the ServiceAccount API objects
`.secrets` field
because that field is only populated with auto-generated Secrets.

## Add ImagePullSecrets to a service account

First, create an imagePullSecret.
Next, verify it has been created. For example:

- Create an imagePullSecret, as described in
  Specifying ImagePullSecrets on a Pod.

  ```shell
  kubectl create secret docker-registry myregistrykey --docker-server=<registry name> \
          --docker-username=DUMMY_USERNAME --docker-password=DUMMY_DOCKER_PASSWORD \
          --docker-email=DUMMY_DOCKER_EMAIL
  ```

- Verify it has been created.

  ```shell
  kubectl get secrets myregistrykey
  ```

  The output is similar to this:

  ```
  NAME             TYPE                              DATA    AGE
  myregistrykey    kubernetes.io/.dockerconfigjson   1       1d
  ```

### Add image pull secret to service account

Next, modify the default service account for the namespace to use this Secret as an imagePullSecret.

```shell
kubectl patch serviceaccount default -p '{"imagePullSecrets": [{"name": "myregistrykey"}]}'
```

You can achieve the same outcome by editing the object manually:

```shell
kubectl edit serviceaccount/default
```

The output of the `sa.yaml` file is similar to this:

Your selected text editor will open with a configuration looking something like this:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  creationTimestamp: 2021-07-07T22:02:39Z
  name: default
  namespace: default
  resourceVersion: "243024"
  uid: 052fb0f4-3d50-11e5-b066-42010af0d7b6
```

Using your editor, delete the line with key `resourceVersion`, add lines for
`imagePullSecrets:` and save it. Leave the `uid` value set the same as you found it.

After you made those changes, the edited ServiceAccount looks something like this:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  creationTimestamp: 2021-07-07T22:02:39Z
  name: default
  namespace: default
  uid: 052fb0f4-3d50-11e5-b066-42010af0d7b6
imagePullSecrets:
  - name: myregistrykey
```

### Verify that imagePullSecrets are set for new Pods

Now, when a new Pod is created in the current namespace and using the default
ServiceAccount, the new Pod has its `spec.imagePullSecrets` field set automatically:

```shell
kubectl run nginx --image=<registry name>/nginx --restart=Never
kubectl get pod nginx -o=jsonpath='{.spec.imagePullSecrets[0].name}{"\n"}'
```

The output is:

```
myregistrykey
```
