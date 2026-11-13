---
title: "TLS bootstrapping (part 1 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/access-authn-authz/kubelet-tls-bootstrapping.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

In a Kubernetes cluster, the components on the worker nodes - kubelet and kube-proxy - need
to communicate with Kubernetes control plane components, specifically kube-apiserver.
In order to ensure that communication is kept private, not interfered with, and ensure that
each component of the cluster is talking to another trusted component, we strongly
recommend using client TLS certificates on nodes.

The normal process of bootstrapping these components, especially worker nodes that need certificates
so they can communicate safely with kube-apiserver, can be a challenging process as it is often outside
of the scope of Kubernetes and requires significant additional work.
This in turn, can make it challenging to initialize or scale a cluster.

In order to simplify the process, beginning in version 1.4, Kubernetes introduced a certificate request
and signing API. The proposal can be found here.

This document describes the process of node initialization, how to set up TLS client certificate bootstrapping for
kubelets, and how it works.

## Initialization process

When a worker node starts up, the kubelet does the following:

1. Look for its `kubeconfig` file
1. Retrieve the URL of the API server and credentials, normally a TLS key and signed certificate from the `kubeconfig` file
1. Attempt to communicate with the API server using the credentials.

Assuming that the kube-apiserver successfully validates the kubelet's credentials,
it will treat the kubelet as a valid node, and begin to assign pods to it.

Note that the above process depends upon:

* Existence of a key and certificate on the local host in the `kubeconfig`
* The certificate having been signed by a Certificate Authority (CA) trusted by the kube-apiserver

All of the following are responsibilities of whoever sets up and manages the cluster:

1. Creating the CA key and certificate
1. Distributing the CA certificate to the control plane nodes, where kube-apiserver is running
1. Creating a key and certificate for each kubelet; strongly recommended to have a unique one, with a unique CN, for each kubelet
1. Signing the kubelet certificate using the CA key
1. Distributing the kubelet key and signed certificate to the specific node on which the kubelet is running

The TLS Bootstrapping described in this document is intended to simplify, and partially or even
completely automate, steps 3 onwards, as these are the most common when initializing or scaling
a cluster.

### Bootstrap initialization

In the bootstrap initialization process, the following occurs:

1. kubelet begins
1. kubelet sees that it does _not_ have a `kubeconfig` file
1. kubelet searches for and finds a `bootstrap-kubeconfig` file
1. kubelet reads its bootstrap file, retrieving the URL of the API server and a limited usage "<example-value>"
1. kubelet connects to the API server, authenticates using the token
1. kubelet now has limited credentials to create and retrieve a certificate signing request (CSR)
1. kubelet creates a CSR for itself with the signerName set to `kubernetes.io/kube-apiserver-client-kubelet`
1. CSR is approved in one of two ways:
   * If configured, kube-controller-manager automatically approves the CSR
   * If configured, an outside process, possibly a person, approves the CSR using the Kubernetes API or via `kubectl`
1. Certificate is created for the kubelet
1. Certificate is issued to the kubelet
1. kubelet retrieves the certificate
1. kubelet creates a proper `kubeconfig` with the key and signed certificate
1. kubelet begins normal operation
1. Optional: if configured, kubelet automatically requests renewal of the certificate when it is close to expiry
1. The renewed certificate is approved and issued, either automatically or manually, depending on configuration.

The rest of this document describes the necessary steps to configure TLS Bootstrapping, and its limitations.

## Configuration

To configure for TLS bootstrapping and optional automatic approval, you must configure options on the following components:

* kube-apiserver
* kube-controller-manager
* kubelet
* in-cluster resources: `ClusterRoleBinding` and potentially `ClusterRole`

In addition, you need your Kubernetes Certificate Authority (CA).

## Certificate Authority

As without bootstrapping, you will need a Certificate Authority (CA) key and certificate.
As without bootstrapping, these will be used to sign the kubelet certificate. As before,
it is your responsibility to distribute them to control plane nodes.

For the purposes of this document, we will assume these have been distributed to control
plane nodes at `/var/lib/kubernetes/ca.pem` (certificate) and `/var/lib/kubernetes/ca-key.pem` (key).
We will refer to these as "Kubernetes CA certificate and key".

All Kubernetes components that use these certificates - kubelet, kube-apiserver,
kube-controller-manager - assume the key and certificate to be PEM-encoded.

## kube-apiserver configuration

The kube-apiserver has several requirements to enable TLS bootstrapping:

* Recognizing CA that signs the client certificate
* Authenticating the bootstrapping kubelet to the `system:bootstrappers` group
* Authorize the bootstrapping kubelet to create a certificate signing request (CSR)

### Recognizing client certificates

This is normal for all client certificate authentication.
If not already set, add the `--client-ca-file=FILENAME` flag to the kube-apiserver command to enable
client certificate authentication, referencing a certificate authority bundle
containing the signing certificate, for example
`--client-ca-file=/var/lib/kubernetes/ca.pem`.

### Initial bootstrap authentication

In order for the bootstrapping kubelet to connect to kube-apiserver and request a certificate,
it must first authenticate to the server. You can use any
authenticator that can authenticate the kubelet.

While any authentication strategy can be used for the kubelet's initial
bootstrap credentials, the following two authenticators are recommended for ease
of provisioning.

1. Bootstrap Tokens
1. Token <example-value> file

Using bootstrap tokens is a simpler and more easily managed method to authenticate kubelets,
and does not require any additional flags when starting kube-apiserver.

Whichever method you choose, the requirement is that the kubelet be able to authenticate as a user with the rights to:

1. create and retrieve CSRs
1. be automatically approved to request node client certificates, if automatic approval is enabled.

A kubelet authenticating using bootstrap tokens is authenticated as a user in the group
`system:bootstrappers`, which is the standard method to use.

As this feature matures, you
should ensure tokens are bound to a Role Based Access Control (RBAC) policy
which limits requests (using the bootstrap token) strictly to client
requests related to certificate provisioning. With RBAC in place, scoping the
tokens to a group allows for great flexibility. For example, you could disable a
particular bootstrap group's access when you are done provisioning the nodes.

#### Bootstrap tokens

Bootstrap tokens are described in detail here.
These are tokens that are stored as secrets in the Kubernetes cluster, and then issued to the individual kubelet.
You can use a single token for an entire cluster, or issue one per worker node.

The process is two-fold:

1. Create a Kubernetes secret with the token ID, secret and scope(s).
1. Issue the token to the kubelet

From the kubelet's perspective, one token is like another and has no special meaning.
From the kube-apiserver's perspective, however, the bootstrap token is special.
Due to its `type`, `namespace` and `name`, kube-apiserver recognizes it as a special token,
and grants anyone authenticating with that token <example-value> bootstrap rights, notably treating
them as a member of the `system:bootstrappers` group. This fulfills a basic <example-value>
for TLS bootstrapping.

The details for creating the secret are available here.

If you want to use bootstrap tokens, you must enable it on kube-apiserver with the flag:

```console
--enable-bootstrap-token-auth=true
```

#### Token <example-value> file

kube-apiserver has the ability to accept tokens as authentication.
These tokens are arbitrary but should represent at least 128 bits of entropy derived
from a secure random number generator (such as `/dev/urandom` on most modern Linux
systems). There are multiple ways you can generate a token. For example:

```shell
head -c 16 /dev/urandom | od -An -t x | tr -d ' '
```

This will generate tokens that look like `02b50b05283e98dd0fd71db496ef01e8`.

The token file should look like the following example, where the first three
values can be anything and the quoted group name should be as depicted:

```console
02b50b05283e98dd0fd71db496ef01e8,kubelet-bootstrap,10001,"system:bootstrappers"
```

Add the `--token-auth-file=FILENAME` flag to the kube-apiserver command (in your
systemd unit file perhaps) to enable the token file. See docs
here for
further details.

### Authorize kubelet to create CSR

Now that the bootstrapping node is _authenticated_ as part of the
`system:bootstrappers` group, it needs to be _authorized_ to create a
certificate signing request (CSR) as well as retrieve it when done.
Fortunately, Kubernetes ships with a `ClusterRole` with precisely these (and
only these) permissions, `system:node-bootstrapper`.

To do this, you only need to create a `ClusterRoleBinding` that binds the `system:bootstrappers`
group to the cluster role `system:node-bootstrapper`.

```yaml
# enable bootstrapping nodes to create CSR
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: create-csrs-for-bootstrapping
subjects:
- kind: Group
  name: system:bootstrappers
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: system:node-bootstrapper
  apiGroup: rbac.authorization.k8s.io
```

## kube-controller-manager configuration

While the apiserver receives the requests for certificates from the kubelet and authenticates those requests,
the controller-manager is responsible for issuing actual signed certificates.

The controller-manager performs this function via a certificate-issuing control loop.
This takes the form of a
cfssl local signer using
assets on disk. Currently, all certificates issued have one year validity and a
default set of key usages.

In order for the controller-manager to sign certificates, it needs the following:

* access to the "Kubernetes CA key and certificate" that you created and distributed
* enabling CSR signing

### Access to key and certificate

As described earlier, you need to create a Kubernetes CA key and certificate, and distribute it to the control plane nodes.
These will be used by the controller-manager to sign the kubelet certificates.

Since these signed certificates will, in turn, be used by the kubelet to authenticate as a regular kubelet
to kube-apiserver, it is important that the CA provided to the controller-manager at this stage also be
trusted by kube-apiserver for authentication. This is provided to kube-apiserver with the flag `--client-ca-file=FILENAME`
(for example, `--client-ca-file=/var/lib/kubernetes/ca.pem`), as described in the kube-apiserver configuration section.

To provide the Kubernetes CA key and certificate to kube-controller-manager, use the following flags:

```shell
--cluster-signing-cert-file="/etc/path/to/kubernetes/ca/ca.crt" --cluster-signing-key-file="/etc/path/to/kubernetes/ca/ca.key"
```

For example:

```shell
--cluster-signing-cert-file="/var/lib/kubernetes/ca.pem" --cluster-signing-key-file="/var/lib/kubernetes/ca-key.pem"
```

The validity duration of signed certificates can be configured with flag:

```shell
--cluster-signing-duration
```

### Approval

In order to approve CSRs, you need to tell the controller-manager that it is acceptable to approve them. This is done by granting
RBAC permissions to the correct group.

There are two distinct sets of permissions:

* `nodeclient`: If a node is creating a new certificate for a node, then it does not have a certificate yet.
  It is authenticating using one of the tokens listed above, and thus is part of the group `system:bootstrappers`.
* `selfnodeclient`: If a node is renewing its certificate, then it already has a certificate (by definition),
  which it uses continuously to authenticate as part of the group `system:nodes`.

To enable the kubelet to request and receive a new certificate, create a `ClusterRoleBinding` that binds
the group in which the bootstrapping node is a member `system:bootstrappers` to the `ClusterRole` that
grants it permission, `system:certificates.k8s.io:certificatesigningrequests:nodeclient`:

```yaml
# Approve all CSRs for the group "system:bootstrappers"
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: auto-approve-csrs-for-group
subjects:
- kind: Group
  name: system:bootstrappers
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: system:certificates.k8s.io:certificatesigningrequests:nodeclient
  apiGroup: rbac.authorization.k8s.io
```

To enable the kubelet to renew its own client certificate, create a `ClusterRoleBinding` that binds
the group in which the fully functioning node is a member `system:nodes` to the `ClusterRole` that
grants it permission, `system:certificates.k8s.io:certificatesigningrequests:selfnodeclient`:

```yaml
# Approve renewal CSRs for the group "system:nodes"
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: auto-approve-renewals-for-nodes
subjects:
- kind: Group
  name: system:nodes
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: system:certificates.k8s.io:certificatesigningrequests:selfnodeclient
  apiGroup: rbac.authorization.k8s.io
```

The `csrapproving` controller that ships as part of
kube-controller-manager and is enabled
by default. The controller uses the
`SubjectAccessReview` API to
determine if a given user is authorized to request a CSR, then approves based on
the authorization outcome. To prevent conflicts with other approvers, the
built-in approver doesn't explicitly deny CSRs. It only ignores unauthorized
requests. The controller also prunes expired certificates as part of garbage
collection.
