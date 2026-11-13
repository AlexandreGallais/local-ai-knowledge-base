---
title: "Troubleshooting kubeadm (part 1 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/setup/production-environment/tools/kubeadm/troubleshooting-kubeadm.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

As with any program, you might run into an error installing or running kubeadm.
This page lists some common failure scenarios and have provided steps that can help you understand and fix the problem.

If your problem is not listed below, please follow the following steps:

- If you think your problem is a bug with kubeadm:
  - Go to github.com/kubernetes/kubeadm and search for existing issues.
  - If no issue exists, please open one and follow the issue template.

- If you are unsure about how kubeadm works, you can ask on Slack in `#kubeadm`,
  or open a question on StackOverflow. Please include
  relevant tags like `#kubernetes` and `#kubeadm` so folks can help you.

## Not possible to join a v1.18 Node to a v1.17 cluster due to missing RBAC

In v1.18 kubeadm added prevention for joining a Node in the cluster if a Node with the same name already exists.
This required adding RBAC for the bootstrap-token user to be able to GET a Node object.

However this causes an issue where `kubeadm join` from v1.18 cannot join a cluster created by kubeadm v1.17.

To workaround the issue you have two options:

Execute `kubeadm init phase bootstrap-token` on a control-plane node using kubeadm v1.18.
Note that this enables the rest of the bootstrap-token <example-value> as well.

or

Apply the following RBAC manually using `kubectl apply -f ...`:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: kubeadm:get-nodes
rules:
  - apiGroups:
      - ""
    resources:
      - nodes
    verbs:
      - get
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: kubeadm:get-nodes
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: kubeadm:get-nodes
subjects:
  - apiGroup: rbac.authorization.k8s.io
    kind: Group
    name: system:bootstrappers:kubeadm:default-node-token
```

## `ebtables` or some similar executable not found during installation

If you see the following warnings while running `kubeadm init`

```console
[preflight] WARNING: ebtables not found in system path
[preflight] WARNING: ethtool not found in system path
```

Then you may be missing `ebtables`, `ethtool` or a similar executable on your node.
You can install them with the following commands:

- For Ubuntu/Debian users, run `apt install ebtables ethtool`.
- For CentOS/Fedora users, run `dnf install ebtables ethtool`.

## kubeadm blocks waiting for control plane during installation

If you notice that `kubeadm init` hangs after printing out the following line:

```console
[apiclient] Created API client, waiting for the control plane to become ready
```

This may be caused by a number of problems. The most common are:

- network connection problems. Check that your machine has full network connectivity before continuing.
- control plane containers are crashlooping or hanging. You can check this by running `docker ps`
  and investigating each container by running `docker logs`. For other container runtime, see
  Debugging Kubernetes nodes with crictl.

## kubeadm blocks when removing managed containers

The following could happen if the container runtime halts and does not remove
any Kubernetes-managed containers:

```shell
sudo kubeadm reset
```

```console
[preflight] Running pre-flight checks
[reset] Stopping the kubelet service
[reset] Unmounting mounted directories in "/var/lib/kubelet"
[reset] Removing kubernetes-managed containers
(block)
```

A possible solution is to restart the container runtime and then re-run `kubeadm reset`.
You can also use `crictl` to debug the state of the container runtime. See
Debugging Kubernetes nodes with crictl.

## Pods in `RunContainerError`, `CrashLoopBackOff` or `Error` state

Right after `kubeadm init` there should not be any pods in these states.

- If there are pods in one of these states _right after_ `kubeadm init`, please open an
  issue in the kubeadm repo. `coredns` (or `kube-dns`) should be in the `Pending` state
  until you have deployed the network add-on.
- If you see Pods in the `RunContainerError`, `CrashLoopBackOff` or `Error` state
  after deploying the network add-on and nothing happens to `coredns` (or `kube-dns`),
  it's very likely that the Pod Network add-on that you installed is somehow broken.
  You might have to grant it more RBAC privileges or use a newer version. Please file
  an issue in the Pod Network providers' issue tracker and get the issue triaged there.

## `coredns` is stuck in the `Pending` state

This is **expected** and part of the design. kubeadm is network provider-agnostic, so the admin
should install the pod network add-on
of choice. You have to install a Pod Network
before CoreDNS may be deployed fully. Hence the `Pending` state before the network is set up.

## `HostPort` services do not work

The `HostPort` and `HostIP` functionality is available depending on your Pod Network
provider. Please contact the author of the Pod Network add-on to find out whether
`HostPort` and `HostIP` functionality are available.

Calico, Canal, and Flannel CNI providers are verified to support HostPort.

For more information, see the
CNI portmap documentation.

If your network provider does not support the portmap CNI plugin, you may need to use the
NodePort feature of services
or use `HostNetwork=true`.

## Pods are not accessible via their Service IP

- Many network add-ons do not yet enable hairpin mode
  which allows pods to access themselves via their Service IP. This is an issue related to
  CNI. Please contact the network
  add-on provider to get the latest status of their support for hairpin mode.

- If you are using VirtualBox (directly or via Vagrant), you will need to
  ensure that `hostname -i` returns a routable IP address. By default, the first
  interface is connected to a non-routable host-only network. A work around
  is to modify `/etc/hosts`, see this
  Vagrantfile
  for an example.

## TLS certificate errors

The following error indicates a possible certificate mismatch.

```none
# kubectl get pods
Unable to connect to the server: x509: certificate signed by unknown authority (possibly because of "crypto/rsa: verification error" while trying to verify candidate authority certificate "kubernetes")
```

- Verify that the `$HOME/.kube/config` file contains a valid certificate, and
  regenerate a certificate if necessary. The certificates in a kubeconfig file
  are base64 encoded. The `base64 --decode` command can be used to decode the certificate
  and `openssl x509 -text -noout` can be used for viewing the certificate information.

- Unset the `KUBECONFIG` environment variable using:

  ```sh
  unset KUBECONFIG
  ```

  Or set it to the default `KUBECONFIG` location:

  ```sh
  export KUBECONFIG=/etc/kubernetes/admin.conf
  ```

- Another workaround is to overwrite the existing `kubeconfig` for the "admin" user:

  ```sh
  mv $HOME/.kube $HOME/.kube.bak
  mkdir $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config
  ```

## Kubelet client certificate rotation fails {#kubelet-client-cert}

By default, kubeadm configures a kubelet with automatic rotation of client certificates by using the
`/var/lib/kubelet/pki/kubelet-client-current.pem` symlink specified in `/etc/kubernetes/kubelet.conf`.
If this rotation process fails you might see errors such as `x509: certificate has expired or is not yet valid`
in kube-apiserver logs. To fix the issue you must follow these steps:

1. Backup and delete `/etc/kubernetes/kubelet.conf` and `/var/lib/kubelet/pki/kubelet-client*` from the failed node.
1. From a working control plane node in the cluster that has `/etc/kubernetes/pki/ca.key` execute
   `kubeadm kubeconfig user --org system:nodes --client-name system:node:$NODE > kubelet.conf`.
   `$NODE` must be set to the name of the existing failed node in the cluster.
   Modify the resulted `kubelet.conf` manually to adjust the cluster name and server endpoint,
   or pass `kubeconfig user --config` (see Generating kubeconfig files for additional users). If your cluster does not have
   the `ca.key` you must sign the embedded certificates in the `kubelet.conf` externally.
1. Copy this resulted `kubelet.conf` to `/etc/kubernetes/kubelet.conf` on the failed node.
1. Restart the kubelet (`systemctl restart kubelet`) on the failed node and wait for
   `/var/lib/kubelet/pki/kubelet-client-current.pem` to be recreated.
1. Manually edit the `kubelet.conf` to point to the rotated kubelet client certificates, by replacing
   `client-certificate-data` and `client-key-data` with:

   ```yaml
   client-certificate: /var/lib/kubelet/pki/kubelet-client-current.pem
   client-key: <example-value>-current.pem
   ```

1. Restart the kubelet.
1. Make sure the node becomes `Ready`.

## Default NIC When using flannel as the pod network in Vagrant

The following error might indicate that something was wrong in the pod network:

```sh
Error from server (NotFound): the server could not find the requested resource
```

- If you're using flannel as the pod network inside Vagrant, then you will have to
  specify the default interface name for flannel.

  Vagrant typically assigns two interfaces to all VMs. The first, for which all hosts
  are assigned the IP address `10.0.2.15`, is for external traffic that gets NATed.

  This may lead to problems with flannel, which defaults to the first interface on a host.
  This leads to all hosts thinking they have the same public IP address. To prevent this,
  pass the `--iface eth1` flag to flannel so that the second interface is chosen.

## Non-public IP used for containers

In some situations `kubectl logs` and `kubectl run` commands may return with the
following errors in an otherwise functional cluster:

```console
Error from server: Get https://10.19.0.41:10250/containerLogs/default/mysql-ddc65b868-glc5m/mysql: dial tcp 10.19.0.41:10250: getsockopt: no route to host
```

- This may be due to Kubernetes using an IP that can not communicate with other IPs on
  the seemingly same subnet, possibly by policy of the machine provider.
- DigitalOcean assigns a public IP to `eth0` as well as a private one to be used internally
  as anchor for their floating IP feature, yet `kubelet` will pick the latter as the node's
  `InternalIP` instead of the public one.

  Use `ip addr show` to check for this scenario instead of `ifconfig` because `ifconfig` will
  not display the offending alias IP address. Alternatively an API endpoint specific to
  DigitalOcean allows you to query for the anchor IP from the droplet:

  ```sh
  curl http://169.254.169.254/metadata/v1/interfaces/public/0/anchor_ipv4/address
  ```

  The workaround is to tell `kubelet` which IP to use using `--node-ip`.
  When using DigitalOcean, it can be the public one (assigned to `eth0`) or
  the private one (assigned to `eth1`) should you want to use the optional
  private network. The `kubeletExtraArgs` section of the kubeadm
  `NodeRegistrationOptions` structure
  can be used for this.

  Then restart `kubelet`:

  ```sh
  systemctl daemon-reload
  systemctl restart kubelet
  ```

## `coredns` pods have `CrashLoopBackOff` or `Error` state

If you have nodes that are running SELinux with an older version of Docker, you might experience a scenario
where the `coredns` pods are not starting. To solve that, you can try one of the following options:

- Upgrade to a newer version of Docker.

- Disable SELinux.

- Modify the `coredns` deployment to set `allowPrivilegeEscalation` to `true`:

```bash
kubectl -n kube-system get deployment coredns -o yaml | \
  sed 's/allowPrivilegeEscalation: false/allowPrivilegeEscalation: true/g' | \
  kubectl apply -f -
```

Another cause for CoreDNS to have `CrashLoopBackOff` is when a CoreDNS Pod deployed in Kubernetes detects a loop.
A number of workarounds
are available to avoid Kubernetes trying to restart the CoreDNS Pod every time CoreDNS detects the loop and exits.

**Warning:**
Disabling SELinux or setting `allowPrivilegeEscalation` to `true` can compromise
the security of your cluster.

## etcd pods restart continually

If you encounter the following error:

```
rpc error: code = 2 desc = oci runtime error: exec failed: container_linux.go:247: starting container process caused "process_linux.go:110: decoding init error from pipe caused \"read parent: connection reset by peer\""
```

This issue appears if you run CentOS 7 with Docker 1.13.1.84.
This version of Docker can prevent the kubelet from executing into the etcd container.

To work around the issue, choose one of these options:

- Roll back to an earlier version of Docker, such as 1.13.1-75

  ```
  dnf downgrade docker-1.13.1-75.git8633870.el7.centos.x86_64 docker-client-1.13.1-75.git8633870.el7.centos.x86_64 docker-common-1.13.1-75.git8633870.el7.centos.x86_64
  ```

- Install one of the more recent recommended versions, such as 18.06:

  ```bash
  sudo dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
  dnf install docker-ce-18.06.1.ce-3.el7.x86_64
  ```

## Not possible to pass a comma separated list of values to arguments inside a `--component-extra-args` flag

`kubeadm init` flags such as `--component-extra-args` allow you to pass <example-value> arguments to a control-plane
component like the kube-apiserver. However, this mechanism is limited due to the underlying type used for parsing
the values (`mapStringString`).

If you decide to pass an argument that supports multiple, comma-separated values such as
`--apiserver-extra-args "enable-admission-plugins=LimitRanger,NamespaceExists"` this flag will fail with
`flag: malformed pair, expect string=string`. This happens because the list of arguments for
`--apiserver-extra-args` expects `key=value` pairs and in this case `NamespacesExists` is considered
as a key that is missing a value.

Alternatively, you can try separating the `key=value` pairs like so:
`--apiserver-extra-args "enable-admission-plugins=LimitRanger,enable-admission-plugins=NamespaceExists"`
but this will result in the key `enable-admission-plugins` only having the value of `NamespaceExists`.

A known workaround is to use the kubeadm configuration file.
