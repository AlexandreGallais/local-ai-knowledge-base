---
title: "Implementation details (part 2 of 4)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/implementation-details.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Implementation details (part 2 of 4)

## kubeadm init workflow internal design

The `kubeadm init` consists of a sequence of atomic work tasks to perform,
as described in the `kubeadm init` internal workflow.

The `kubeadm init phase` command allows
users to invoke each task individually, and ultimately offers a reusable and composable
API/toolbox that can be used by other Kubernetes bootstrap tools, by any IT automation tool or by
an advanced user for creating custom clusters.

### Preflight checks

Kubeadm executes a set of preflight checks before starting the init, with the aim to verify
preconditions and avoid common cluster startup problems.
The user can skip specific preflight checks or all of them with the `--ignore-preflight-errors` option.

- [Warning] if the Kubernetes version to use (specified with the `--kubernetes-version` flag) is
  at least one minor version higher than the kubeadm CLI version.
- Kubernetes system requirements:
  - if running on linux:
    - [Error] if Kernel is older than the minimum required version
    - [Error] if required cgroups subsystem aren't set up
- [Error] if the CRI endpoint does not answer
- [Error] if user is not root
- [Error] if the machine hostname is not a valid DNS subdomain
- [Warning] if the host name cannot be reached via network lookup
- [Error] if kubelet version is lower that the minimum kubelet version supported by kubeadm (current minor -1)
- [Error] if kubelet version is at least one minor higher than the required controlplane version (unsupported version skew)
- [Warning] if kubelet service does not exist or if it is disabled
- [Warning] if firewalld is active
- [Error] if API server bindPort or ports 10250/10251/10252 are used
- [Error] if `/etc/kubernetes/manifest` folder already exists and it is not empty
- [Error] if swap is on
- [Error] if `ip`, `iptables`, `mount`, `nsenter` commands are not present in the command path
- [Warning] if `ethtool`, `tc`, `touch` commands are not present in the command path
- [Warning] if extra arg flags for API server, controller manager, scheduler contains some invalid options
- [Warning] if connection to https://API.AdvertiseAddress:API.BindPort goes through proxy
- [Warning] if connection to services subnet goes through proxy (only first address checked)
- [Warning] if connection to Pods subnet goes through proxy (only first address checked)
- If external etcd is provided:
  - [Error] if etcd version is older than the minimum required version
  - [Error] if etcd certificates or keys are specified, but not provided
- If external etcd is NOT provided (and thus local etcd will be installed):
  - [Error] if ports 2379 is used
  - [Error] if Etcd.DataDir folder already exists and it is not empty
- If authorization mode is ABAC:
  - [Error] if abac_policy.json does not exist
- If authorization mode is WebHook
  - [Error] if webhook_authz.conf does not exist

**Note:**
Preflight checks can be invoked individually with the
`kubeadm init phase preflight`
command.

### Generate the necessary certificates

Kubeadm generates certificate and private key pairs for different purposes:

- A self signed certificate authority for the Kubernetes cluster saved into `ca.crt` file and
  `ca.key` private key file

- A serving certificate for the API server, generated using `ca.crt` as the CA, and saved into
  `apiserver.crt` file with its private key `apiserver.key`. This certificate should contain
  the following alternative names:

  - The Kubernetes service's internal clusterIP (the first address in the services CIDR, e.g.
    `10.96.0.1` if service subnet is `10.96.0.0/12`)
  - Kubernetes DNS names, e.g. `kubernetes.default.svc.cluster.local` if `--service-dns-domain`
    flag value is `cluster.local`, plus default DNS names `kubernetes.default.svc`,
    `kubernetes.default`, `kubernetes`
  - The node-name
  - The `--apiserver-advertise-address`
  - Additional alternative names specified by the user

- A client certificate for the API server to connect to the kubelets securely, generated using
  `ca.crt` as the CA and saved into `apiserver-kubelet-client.crt` file with its private key
  `apiserver-kubelet-client.key`.

- A private key for signing ServiceAccount Tokens saved into `sa.key` file along with its public key `sa.pub`

- A certificate authority for the front proxy saved into `front-proxy-ca.crt` file with its key
  `front-proxy-ca.key`

- A client certificate for the front proxy client, generated using `front-proxy-ca.crt` as the CA and
  saved into `front-proxy-client.crt` file with its private key`front-proxy-client.key`

Certificates are stored by default in `/etc/kubernetes/pki`, but this directory is configurable
using the `--cert-dir` flag.

Please note that:

1. If a given certificate and private key pair both exist, and their content is evaluated to be compliant with the above specs, the existing files will
   be used and the generation phase for the given certificate will be skipped. This means the user can, for example, copy an existing CA to
   `/etc/kubernetes/pki/ca.{crt,key}`, and then kubeadm will use those files for signing the rest of the certs.
   See also using custom certificates
1. For the CA, it is possible to provide the `ca.crt` file but not the `ca.key` file. If all other certificates and kubeconfig files
   are already in place, kubeadm recognizes this condition and activates the ExternalCA, which also implies the `csrsigner` controller in
   controller-manager won't be started
1. If kubeadm is running in external CA mode;
   all the certificates must be provided by the user, because kubeadm cannot generate them by itself
1. In case kubeadm is executed in the `--dry-run` mode, certificate files are written in a temporary folder
1. Certificate generation can be invoked individually with the
   `kubeadm init phase certs all` command

### Generate kubeconfig files for control plane components

Kubeadm generates kubeconfig files with identities for control plane components:

- A kubeconfig file for the kubelet to use during TLS bootstrap -
  `/etc/kubernetes/bootstrap-kubelet.conf`. Inside this file, there is a bootstrap-token or embedded
  client certificates for authenticating this node with the cluster.

  This client certificate should:

  - Be in the `system:nodes` organization, as required by the
    Node Authorization module
  - Have the Common Name (CN) `system:node:<hostname-lowercased>`

- A kubeconfig file for controller-manager, `/etc/kubernetes/controller-manager.conf`; inside this
  file is embedded a client certificate with controller-manager identity. This client certificate should
  have the CN `system:kube-controller-manager`, as defined by default
  RBAC core components roles

- A kubeconfig file for scheduler, `/etc/kubernetes/scheduler.conf`; inside this file is embedded
  a client certificate with scheduler identity.
  This client certificate should have the CN `system:kube-scheduler`, as defined by default
  RBAC core components roles

Additionally, a kubeconfig file for kubeadm as an administrative entity is generated and stored
in `/etc/kubernetes/admin.conf`. This file includes a certificate with
`Subject: O = kubeadm:cluster-admins, CN = kubernetes-admin`. `kubeadm:cluster-admins`
is a group managed by kubeadm. It is bound to the `cluster-admin` ClusterRole during `kubeadm init`,
by using the `super-admin.conf` file, which does not require RBAC.
This `admin.conf` file must remain on control plane nodes and should not be shared with additional users.

During `kubeadm init` another kubeconfig file is generated and stored in `/etc/kubernetes/super-admin.conf`.
This file includes a certificate with `Subject: O = system:masters, CN = kubernetes-super-admin`.
`system:masters` is a superuser group that bypasses RBAC and makes `super-admin.conf` useful in case
of an emergency where a cluster is locked due to RBAC misconfiguration.
The `super-admin.conf` file must be stored in a safe location and should not be shared with additional users.

See RBAC user facing role bindings
for additional information on RBAC and built-in ClusterRoles and groups.

You can run `kubeadm kubeconfig user`
to generate kubeconfig files for additional users.

**Caution:**
The generated configuration files include an embedded authentication key, and you should treat
them as confidential.

Also note that:

1. `ca.crt` certificate is embedded in all the kubeconfig files.
1. If a given kubeconfig file exists, and its content is evaluated as compliant with the above specs,
   the existing file will be used and the generation phase for the given kubeconfig will be skipped
1. If kubeadm is running in ExternalCA mode,
   all the required kubeconfig must be provided by the user as well, because kubeadm cannot
   generate any of them by itself
1. In case kubeadm is executed in the `--dry-run` mode, kubeconfig files are written in a temporary folder
1. Generation of kubeconfig files can be invoked individually with the
   `kubeadm init phase kubeconfig all` command

### Generate static Pod manifests for control plane components

Kubeadm writes static Pod manifest files for control plane components to
`/etc/kubernetes/manifests`. The kubelet watches this directory for Pods to be created on startup.

Static Pod manifests share a set of common properties:

- All static Pods are deployed on `kube-system` namespace
- All static Pods get `tier:control-plane` and `component:{component-name}` labels
- All static Pods use the `system-node-critical` priority class
- `hostNetwork: true` is set on all static Pods to allow control plane startup before a network is
  configured; as a consequence:

  * The `address` that the controller-manager and the scheduler use to refer to the API server is `127.0.0.1`
  * If the etcd server is set up locally, the `etcd-server` address will be set to `127.0.0.1:2379`

- Leader election is enabled for both the controller-manager and the scheduler
- Controller-manager and the scheduler will reference kubeconfig files with their respective, unique identities
- All static Pods get any extra flags or patches that you specify, as described in
  passing custom arguments to control plane components
- All static Pods get any extra Volumes specified by the user (Host path)

Please note that:

1. All images will be pulled from registry.k8s.io by default.
   See using custom images
   for customizing the image repository
1. In case kubeadm is executed in the `--dry-run` mode, static Pod files are written in a
   temporary folder
1. Static Pod manifest generation for control plane components can be invoked individually with
   the `kubeadm init phase control-plane all` command

#### API server

The static Pod manifest for the API server is affected by the following parameters provided by the users:

- The `apiserver-advertise-address` and `apiserver-bind-port` to bind to; if not provided, those
  values default to the IP address of the default network interface on the machine and port 6443
- The `service-cluster-ip-range` to use for services
- If an external etcd server is specified, the `etcd-servers` address and related TLS settings
  (`etcd-cafile`, `etcd-certfile`, `etcd-keyfile`);
  if an external etcd server is not provided, a local etcd will be used (via host network)
- If a cloud provider is specified, the corresponding `--cloud-provider` parameter is configured together
  with the `--cloud-config` path if such file exists (this is experimental, alpha and will be
  removed in a future version)

Other API server flags that are set unconditionally are:

- `--insecure-port=0` to avoid insecure connections to the api server
- `--enable-bootstrap-token-auth=true` to enable the `BootstrapTokenAuthenticator` authentication module.
  See TLS Bootstrapping for more details
- `--allow-privileged` to `true` (required e.g. by kube proxy)
- `--requestheader-client-ca-file` to `front-proxy-ca.crt`
- `--enable-admission-plugins` to:

  - `NamespaceLifecycle`
    e.g. to avoid deletion of system reserved namespaces
  - `LimitRanger`
    and `ResourceQuota`
    to enforce limits on namespaces
  - `ServiceAccount`
    to enforce service account automation
  - `PersistentVolumeLabel`
    attaches region or zone labels to PersistentVolumes as defined by the cloud provider (This
    admission controller is deprecated and will be removed in a future version.
    It is not deployed by kubeadm by default with v1.9 onwards when not explicitly opting into
    using `gce` or `aws` as cloud providers)
  - `DefaultStorageClass`
    to enforce default storage class on `PersistentVolumeClaim` objects
  - `DefaultTolerationSeconds`
  - `NodeRestriction`
    to limit what a kubelet can modify (e.g. only pods on this node)

- `--kubelet-preferred-address-types` to `InternalIP,ExternalIP,Hostname;` this makes `kubectl
  logs` and other API server-kubelet communication work in environments where the hostnames of the
  nodes aren't resolvable

- Flags for using certificates generated in previous steps:

  - `--client-ca-file` to `ca.crt`
  - `--tls-cert-file` to `apiserver.crt`
  - `--tls-private-key-file` to `apiserver.key`
  - `--kubelet-client-certificate` to `apiserver-kubelet-client.crt`
  - `--kubelet-client-key` to `apiserver-kubelet-client.key`
  - `--service-account-key-file` to `sa.pub`
  - `--requestheader-client-ca-file` to `front-proxy-ca.crt`
  - `--proxy-client-cert-file` to `front-proxy-client.crt`
  - `--proxy-client-key-file` to `front-proxy-client.key`

- Other flags for securing the front proxy
  (API Aggregation)
  communications:

  - `--requestheader-username-headers=X-Remote-User`
  - `--requestheader-group-headers=X-Remote-Group`
  - `--requestheader-extra-headers-prefix=X-Remote-Extra-`
  - `--requestheader-allowed-names=front-proxy-client`

#### Controller manager

The static Pod manifest for the controller manager is affected by following parameters provided by
the users:

- If kubeadm is invoked specifying a `--pod-network-cidr`, the subnet manager feature required for
  some CNI network plugins is enabled by setting:

  - `--allocate-node-cidrs=true`
  - `--cluster-cidr` and `--node-cidr-mask-size` flags according to the given CIDR

Other flags that are set unconditionally are:

- `--controllers` enabling all the default controllers plus `BootstrapSigner` and `TokenCleaner`
  controllers for TLS bootstrap. See TLS Bootstrapping
  for more details.

- `--use-service-account-credentials` to `true`

- Flags for using certificates generated in previous steps:

  - `--root-ca-file` to `ca.crt`
  - `--cluster-signing-cert-file` to `ca.crt`, if External CA mode is disabled, otherwise to `""`
  - `--cluster-signing-key-file` to `ca.key`, if External CA mode is disabled, otherwise to `""`
  - `--service-account-private-key-file` to `sa.key`

#### Scheduler

The static Pod manifest for the scheduler is not affected by parameters provided by the user.
