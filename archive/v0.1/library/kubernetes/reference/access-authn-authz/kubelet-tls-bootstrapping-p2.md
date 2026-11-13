---
title: "TLS bootstrapping (part 2 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/access-authn-authz/kubelet-tls-bootstrapping.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# TLS bootstrapping (part 2 of 2)

## kubelet configuration

Finally, with the control plane nodes properly set up and all of the necessary
authentication and authorization in place, we can configure the kubelet.

The kubelet requires the following configuration to bootstrap:

* A path to store the key and certificate it generates (optional, can use default)
* A path to a `kubeconfig` file that does not yet exist; it will place the bootstrapped config file here
* A path to a bootstrap `kubeconfig` file to provide the URL for the server and bootstrap credentials, e.g. a bootstrap token
* Optional: instructions to rotate certificates

The bootstrap `kubeconfig` should be in a path available to the kubelet, for example `/var/lib/kubelet/bootstrap-kubeconfig`.

Its format is identical to a normal `kubeconfig` file. A sample file might look as follows:

```yaml
apiVersion: v1
kind: Config
clusters:
- cluster:
    certificate-authority: /var/lib/kubernetes/ca.pem
    server: https://my.server.example.com:6443
  name: bootstrap
contexts:
- context:
    cluster: bootstrap
    user: kubelet-bootstrap
  name: bootstrap
current-context: bootstrap
preferences: {}
users:
- name: kubelet-bootstrap
  user:
    token: <example-token>
```

The important elements to note are:

* `certificate-authority`: path to a CA file, used to validate the server certificate presented by kube-apiserver
* `server`: URL to kube-apiserver
* `token`: the token to use

The format of the token does not matter, as long as it matches what kube-apiserver expects. In the above example, we used a bootstrap token.
As stated earlier, _any_ valid authentication method can be used, not only tokens.

Because the bootstrap `kubeconfig` _is_ a standard `kubeconfig`, you can use `kubectl` to generate it. To create the above example file:

```
kubectl config --kubeconfig=/var/lib/kubelet/bootstrap-kubeconfig set-cluster bootstrap --server='https://my.server.example.com:6443' --certificate-authority=/var/lib/kubernetes/ca.pem
kubectl config --kubeconfig=/var/lib/kubelet/bootstrap-kubeconfig set-credentials <example-value> --token=<example-token>
kubectl config --kubeconfig=/var/lib/kubelet/bootstrap-kubeconfig set-context bootstrap --user=kubelet-bootstrap --cluster=bootstrap
kubectl config --kubeconfig=/var/lib/kubelet/bootstrap-kubeconfig use-context bootstrap
```

To indicate to the kubelet to use the bootstrap `kubeconfig`, use the following kubelet flag:

```
--bootstrap-kubeconfig="/var/lib/kubelet/bootstrap-kubeconfig" --kubeconfig="/var/lib/kubelet/kubeconfig"
```

When starting the kubelet, if the file specified via `--kubeconfig` does not
exist, the bootstrap kubeconfig specified via `--bootstrap-kubeconfig` is used
to request a client certificate from the API server. On approval of the
certificate request and receipt back by the kubelet, a kubeconfig file
referencing the generated key and obtained certificate is written to the path
specified by `--kubeconfig`. The certificate and key file will be placed in the
directory specified by `--cert-dir`.

### Client and serving certificates

All of the above relate to kubelet _client_ certificates, specifically, the certificates a kubelet
uses to authenticate to kube-apiserver.

A kubelet also can use _serving_ certificates. The kubelet itself exposes an https endpoint for certain features.
To secure these, the kubelet can do one of:

* use provided key and certificate, via the `--tls-private-key-file` and `--tls-cert-file` flags
* create self-signed key and certificate, if a key and certificate are not provided
* request serving certificates from the cluster server, via the CSR API

The client certificate provided by TLS bootstrapping is signed, by default, for `client auth` only, and thus cannot
be used as serving certificates, or `server auth`.

However, you _can_ enable its server certificate, at least partially, via certificate rotation.

### Certificate rotation

Kubernetes v1.8 and higher kubelet implements features for enabling
rotation of its client and/or serving certificates. Note, rotation of serving
certificate is a __beta__ feature and requires the `RotateKubeletServerCertificate`
feature flag on the kubelet (enabled by default).

You can configure the kubelet to rotate its client certificates by creating new CSRs
as its existing credentials expire. To enable this feature, use the `rotateCertificates`
field of kubelet configuration file
or pass the following command line argument to the kubelet (deprecated):

```
--rotate-certificates
```

Enabling `RotateKubeletServerCertificate` causes the kubelet **both** to request a serving
certificate after bootstrapping its client credentials **and** to rotate that
certificate. To enable this behavior, use the field `serverTLSBootstrap` of
the kubelet configuration file
or pass the following command line argument to the kubelet (deprecated):

```
--rotate-server-certificates
```

**Note:**
The CSR approving controllers implemented in core Kubernetes do not
approve node _serving_ certificates for
security reasons. To use
`RotateKubeletServerCertificate` operators need to run a custom approving
controller, or manually approve the serving certificate requests.

A deployment-specific approval process for kubelet serving certificates should typically only approve CSRs which:

1. are requested by nodes (ensure the `spec.username` field is of the form
   `system:node:<nodeName>` and `spec.groups` contains `system:nodes`)
1. request usages for a serving certificate (ensure `spec.usages` contains `server auth`,
   optionally contains `digital signature` and `key <example-value>`, and contains no other usages)
1. only have IP and DNS subjectAltNames that belong to the requesting node,
   and have no URI and Email subjectAltNames (parse the x509 Certificate Signing Request
   in `spec.request` to verify `subjectAltNames`)

## Other authenticating components

All of TLS bootstrapping described in this document relates to the kubelet. However,
other components may need to communicate directly with kube-apiserver. Notable is kube-proxy, which
is part of the Kubernetes node components and runs on every node, but may also include other components such as monitoring or networking.

Like the kubelet, these other components also require a method of authenticating to kube-apiserver.
You have several options for generating these credentials:

* The old way: Create and distribute certificates the same way you did for kubelet before TLS bootstrapping
* DaemonSet: Since the kubelet itself is loaded on each node, and is sufficient to start base services,
  you can run kube-proxy and other node-specific services not as a standalone process, but rather as a
  daemonset in the `kube-system` namespace. Since it will be in-cluster, you can give it a proper service
  account with appropriate permissions to perform its activities. This may be the simplest way to configure
  such services.

## kubectl approval

CSRs can be approved outside of the approval flows built into the controller
manager.

The signing controller does not immediately sign all certificate requests.
Instead, it waits until they have been flagged with an "Approved" status by an
appropriately-privileged user. This flow is intended to allow for automated
approval handled by an external approval controller or the approval controller
implemented in the core controller-manager. However cluster administrators can
also manually approve certificate requests using kubectl. An administrator can
list CSRs with `kubectl get csr` and describe one in detail with
`kubectl describe csr <name>`. An administrator can approve or deny a CSR with
`kubectl certificate approve <name>` and `kubectl certificate deny <name>`.
