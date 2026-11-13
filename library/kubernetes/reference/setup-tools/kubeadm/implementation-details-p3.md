---
title: "Implementation details (part 3 of 4)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/implementation-details.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Implementation details (part 3 of 4)

### Generate static Pod manifest for local etcd

If you specified an external etcd, this step will be skipped, otherwise kubeadm generates a
static Pod manifest file for creating a local etcd instance running in a Pod with following attributes:

- listen on `localhost:2379` and use `HostNetwork=true`
- make a `hostPath` mount out from the `dataDir` to the host's filesystem
- Any extra flags specified by the user

Please note that:

1. The etcd container image will be pulled from `registry.gcr.io` by default. See
   using custom images
   for customizing the image repository.
1. If you run kubeadm in `--dry-run` mode, the etcd static Pod manifest is written
   into a temporary folder.
1. You can directly invoke static Pod manifest generation for local etcd, using the
   `kubeadm init phase etcd local`
   command.

### Wait for the control plane to come up

On control plane nodes, kubeadm waits up to 4 minutes for the control plane components
and the kubelet to be available. It does that by performing a health check on the respective
component `/healthz` or `/livez` endpoints.

After the control plane is up, kubeadm completes the tasks described in following paragraphs.

### Save the kubeadm ClusterConfiguration in a ConfigMap for later reference

kubeadm saves the configuration passed to `kubeadm init` in a ConfigMap named `kubeadm-config`
under `kube-system` namespace.

This will ensure that kubeadm actions executed in future (e.g `kubeadm upgrade`) will be able to
determine the actual/current cluster state and make new decisions based on that data.

Please note that:

1. Before saving the ClusterConfiguration, sensitive information like the token is stripped from the configuration
1. Upload of control plane node configuration can be invoked individually with the command
   `kubeadm init phase upload-config`.

### Mark the node as control-plane

As soon as the control plane is available, kubeadm executes the following actions:

- Labels the node as control-plane with `node-role.kubernetes.io/control-plane=""`
- Taints the node with `node-role.kubernetes.io/control-plane:NoSchedule`

Please note that the phase to mark the control-plane phase can be invoked
individually with the `kubeadm init phase mark-control-plane` command.

### Configure TLS-Bootstrapping for node joining

Kubeadm uses Authenticating with Bootstrap Tokens
for joining new nodes to an existing cluster; for more details see also
design proposal.

`kubeadm init` ensures that everything is properly configured for this process, and this includes
following steps as well as setting API server and controller flags as already described in
previous paragraphs.

**Note:**
TLS bootstrapping for nodes can be configured with the command
`kubeadm init phase bootstrap-token`,
executing all the configuration steps described in following paragraphs;
alternatively, each step can be invoked individually.

#### Create a bootstrap token

`kubeadm init` creates a first bootstrap token, either generated automatically or provided by the
user with the `--token` flag; as documented in bootstrap token specification, token should be
saved as a secret with name `bootstrap-token-<token-id>` under `kube-system` namespace.

Please note that:

1. The default token created by `kubeadm init` will be used to validate temporary user during TLS
   bootstrap process; those users will be member of
  `system:bootstrappers:kubeadm:default-node-token` group
1. The token has a limited validity, default 24 hours (the interval may be changed with the `—token-ttl` flag)
1. Additional tokens can be created with the `kubeadm token`
   command, that provide other useful functions for token management as well.

#### Allow joining nodes to call CSR API

Kubeadm ensures that users in `system:bootstrappers:kubeadm:default-node-token` group are able to
access the certificate signing API.

This is implemented by creating a ClusterRoleBinding named `kubeadm:kubelet-bootstrap` between the
group above and the default RBAC role `system:node-bootstrapper`.

#### Set up auto approval for new bootstrap tokens

Kubeadm ensures that the Bootstrap Token will get its CSR request automatically approved by the
csrapprover controller.

This is implemented by creating ClusterRoleBinding named `kubeadm:node-autoapprove-bootstrap`
between the `system:bootstrappers:kubeadm:default-node-token` group and the default role
`system:certificates.k8s.io:certificatesigningrequests:nodeclient`.

The role `system:certificates.k8s.io:certificatesigningrequests:nodeclient` should be created as
well, granting POST permission to
`/apis/certificates.k8s.io/certificatesigningrequests/nodeclient`.

#### Set up nodes certificate rotation with auto approval

Kubeadm ensures that certificate rotation is enabled for nodes, and that a new certificate request
for nodes will get its CSR request automatically approved by the csrapprover controller.

This is implemented by creating ClusterRoleBinding named
`kubeadm:node-autoapprove-certificate-rotation` between the `system:nodes` group and the default
role `system:certificates.k8s.io:certificatesigningrequests:selfnodeclient`.

#### Allow the API server to access the kubelet API

Kubeadm ensures that the API server can access the kubelet API using its client certificate
`apiserver-kubelet-client.crt`.

This is implemented by creating a ClusterRoleBinding named `kubeadm:apiserver-kubelet-client`
between the user `kube-apiserver-kubelet-client` and the default RBAC role
`system:kubelet-api-admin`.

#### Create the public cluster-info ConfigMap

This phase creates the `cluster-info` ConfigMap in the `kube-public` namespace.

Additionally, it creates a Role and a RoleBinding granting access to the ConfigMap for
unauthenticated users (i.e. users in RBAC group `system:unauthenticated`).

**Note:**
The access to the `cluster-info` ConfigMap _is not_ rate-limited. This may or may not be a
problem if you expose your cluster's API server to the internet; worst-case scenario here is a
DoS attack where an attacker uses all the in-flight requests the kube-apiserver can handle to
serve the `cluster-info` ConfigMap.

### Install addons

Kubeadm installs the internal DNS server and the kube-proxy addon components via the API server.

**Note:**
This phase can be invoked individually with the command
`kubeadm init phase addon all`.

#### proxy

A ServiceAccount for `kube-proxy` is created in the `kube-system` namespace; then kube-proxy is
deployed as a DaemonSet:

- The credentials (`ca.crt` and `token`) to the control plane come from the ServiceAccount
- The location (URL) of the API server comes from a ConfigMap
- The `kube-proxy` ServiceAccount is bound to the privileges in the `system:node-proxier` ClusterRole

#### DNS

- The CoreDNS service is named `kube-dns` for compatibility reasons with the legacy `kube-dns`
addon.

- A ServiceAccount for CoreDNS is created in the `kube-system` namespace.

- The `coredns` ServiceAccount is bound to the privileges in the `system:coredns` ClusterRole

## kubeadm join phases internal design

Similarly to `kubeadm init`, also `kubeadm join` internal workflow consists of a sequence of
atomic work tasks to perform.

This is split into discovery (having the Node trust the Kubernetes API Server) and TLS bootstrap
(having the Kubernetes API Server trust the Node).

see Authenticating with Bootstrap Tokens
or the corresponding design proposal.

### Preflight checks

`kubeadm` executes a set of preflight checks before starting the join, with the aim to verify
preconditions and avoid common cluster startup problems.

Also note that:

1. `kubeadm join` preflight checks are basically a subset of `kubeadm init` preflight checks
1. If you are joining a Windows node, Linux specific controls are skipped.
1. In any case the user can skip specific preflight checks (or eventually all preflight checks)
   with the `--ignore-preflight-errors` option.

### Discovery cluster-info

There are 2 main schemes for discovery. The first is to use a shared token along with the IP
address of the API server.
The second is to provide a file (that is a subset of the standard kubeconfig file).

#### Shared token discovery

If `kubeadm join` is invoked with `--discovery-token`, token discovery is used; in this case the
node basically retrieves the cluster CA certificates from the `cluster-info` ConfigMap in the
`kube-public` namespace.

In order to prevent "man in the middle" attacks, several steps are taken:

- First, the CA certificate is retrieved via insecure connection (this is possible because
  `kubeadm init` is granted access to `cluster-info` users for `system:unauthenticated`)

- Then the CA certificate goes through following validation steps:

  - Basic validation: using the token ID against a JWT signature
  - Pub key validation: using provided `--discovery-token-ca-cert-hash`. This value is available
    in the output of `kubeadm init` or can be calculated using standard tools (the hash is
    calculated over the bytes of the Subject Public Key Info (SPKI) object as in RFC7469). The
    `--discovery-token-ca-cert-hash flag` may be repeated multiple times to allow more than one public key.
  - As an additional validation, the CA certificate is retrieved via secure connection and then
    compared with the CA retrieved initially

**Note:**
You can skip CA validation by passing the `--discovery-token-unsafe-skip-ca-verification` flag on the command line.
This weakens the kubeadm security model since others can potentially impersonate the Kubernetes API server.

#### File/https discovery

If `kubeadm join` is invoked with `--discovery-file`, file discovery is used; this file can be a
local file or downloaded via an HTTPS URL; in case of HTTPS, the host installed CA bundle is used
to verify the connection.

With file discovery, the cluster CA certificate is provided into the file itself; in fact, the
discovery file is a kubeconfig file with only `server` and `certificate-authority-data` attributes
set, as described in the `kubeadm join`
reference doc; when the connection with the cluster is established, kubeadm tries to access the
`cluster-info` ConfigMap, and if available, uses it.

## TLS Bootstrap

Once the cluster info is known, the file `bootstrap-kubelet.conf` is written, thus allowing
kubelet to do TLS Bootstrapping.

The TLS bootstrap mechanism uses the shared token to temporarily authenticate with the Kubernetes
API server to submit a certificate signing request (CSR) for a locally created key pair.

The request is then automatically approved and the operation completes saving `ca.crt` file and
`kubelet.conf` file to be used by the kubelet for joining the cluster, while `bootstrap-kubelet.conf`
is deleted.

**Note:**
- The temporary authentication is validated against the token saved during the `kubeadm init`
  process (or with additional tokens created with `kubeadm token` command)
- The temporary authentication resolves to a user member of
  `system:bootstrappers:kubeadm:default-node-token` group which was granted access to the CSR api
  during the `kubeadm init` process
- The automatic CSR approval is managed by the csrapprover controller, according to
  the configuration present in the `kubeadm init` process
