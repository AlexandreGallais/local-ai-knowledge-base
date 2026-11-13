---
title: "Creating a cluster with kubeadm (part 3 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Creating a cluster with kubeadm (part 3 of 3)

### (Optional) Controlling your cluster from machines other than the control-plane node

In order to get a kubectl on some other computer (e.g. laptop) to talk to your
cluster, you need to copy the administrator kubeconfig file from your control-plane node
to your workstation like this:

```bash
scp root@<control-plane-host>:/etc/kubernetes/admin.conf .
kubectl --kubeconfig ./admin.conf get nodes
```

**Note:**
The example above assumes SSH access is enabled for root. If that is not the
case, you can copy the `admin.conf` file to be accessible by some other user
and `scp` using that other user instead.

The `admin.conf` file gives the user _superuser_ privileges over the cluster.
This file should be used sparingly. For normal users, it's recommended to
generate a unique credential to which you grant privileges. You can do
this with the `kubeadm kubeconfig user --client-name <CN>`
command. That command will print out a KubeConfig file to STDOUT which you
should save to a file and distribute to your user. After that, grant
privileges by using `kubectl create (cluster)rolebinding`.

### (Optional) Proxying API Server to localhost

If you want to connect to the API Server from outside the cluster, you can use
`kubectl proxy`:

```bash
scp root@<control-plane-host>:/etc/kubernetes/admin.conf .
kubectl --kubeconfig ./admin.conf proxy
```

You can now access the API Server locally at `http://localhost:8001/api/v1`

## Clean up {#tear-down}

If you used disposable servers for your cluster, for testing, you can
switch those off and do no further clean up. You can use
`kubectl config delete-cluster` to delete your local references to the
cluster.

However, if you want to deprovision your cluster more cleanly, you should
first drain the node
and make sure that the node is empty, then deconfigure the node.

### Remove the node

Talking to the control-plane node with the appropriate credentials, run:

```bash
kubectl drain <node name> --delete-emptydir-data --force --ignore-daemonsets
```

Before removing the node, reset the state installed by `kubeadm`:

```bash
kubeadm reset
```

The reset process does not reset or clean up iptables rules or IPVS tables.
If you wish to reset iptables, you must do so manually:

```bash
iptables -F && iptables -t nat -F && iptables -t mangle -F && iptables -X
```

If you want to reset the IPVS tables, you must run the following command:

```bash
ipvsadm -C
```

Now remove the node:

```bash
kubectl delete node <node name>
```

If you wish to start over, run `kubeadm init` or `kubeadm join` with the
appropriate arguments.

### Clean up the control plane

You can use `kubeadm reset` on the control plane host to trigger a best-effort
clean up.

See the `kubeadm reset`
reference documentation for more information about this subcommand and its
options.

## Version skew policy {#version-skew-policy}

While kubeadm allows version skew against some components that it manages, it is recommended that you
match the kubeadm version with the versions of the control plane components, kube-proxy and kubelet.

### kubeadm's skew against the Kubernetes version

kubeadm can be used with Kubernetes components that are the same version as kubeadm
or one version older. The Kubernetes version can be specified to kubeadm by using the
`--kubernetes-version` flag of `kubeadm init` or the
`ClusterConfiguration.kubernetesVersion`
field when using `--config`. This option will control the versions
of kube-apiserver, kube-controller-manager, kube-scheduler and kube-proxy.

Example:

* kubeadm is at
* `kubernetesVersion` must be at  or

### kubeadm's skew against the kubelet

Similarly to the Kubernetes version, kubeadm can be used with a kubelet version that is
the same version as kubeadm or three versions older.

Example:

* kubeadm is at
* kubelet on the host must be at , ,
   or

### kubeadm's skew against kubeadm

There are certain limitations on how kubeadm commands can operate on existing nodes or whole clusters
managed by kubeadm.

If new nodes are joined to the cluster, the kubeadm binary used for `kubeadm join` must match
the last version of kubeadm used to either create the cluster with `kubeadm init` or to upgrade
the same node with `kubeadm upgrade`. Similar rules apply to the rest of the kubeadm commands
with the exception of `kubeadm upgrade`.

Example for `kubeadm join`:

* kubeadm version  was used to create a cluster with `kubeadm init`
* Joining nodes must use a kubeadm binary that is at version

Nodes that are being upgraded must use a version of kubeadm that is the same MINOR
version or one MINOR version newer than the version of kubeadm used for managing the
node.

Example for `kubeadm upgrade`:

* kubeadm version  was used to create or upgrade the node
* The version of kubeadm used for upgrading the node must be at
  or

To learn more about the version skew between the different Kubernetes component see
the Version Skew Policy.

## Limitations {#limitations}

### Cluster resilience {#resilience}

The cluster created here has a single control-plane node, with a single etcd database
running on it. This means that if the control-plane node fails, your cluster may lose
data and may need to be recreated from scratch.

Workarounds:

* Regularly back up etcd. The
  etcd data directory configured by kubeadm is at `/var/lib/etcd` on the control-plane node.

* Use multiple control-plane nodes. You can read
  Options for Highly Available topology to pick a cluster
  topology that provides high-availability.

### Platform compatibility {#multi-platform}

kubeadm deb/rpm packages and binaries are built for amd64, arm (32-bit), arm64, ppc64le, and s390x
following the multi-platform proposal.

Multiplatform container images for the control plane and addons are also supported since v1.12.

Only some of the network providers offer solutions for all platforms. Please consult the list of
network providers above or the documentation from each provider to figure out whether the provider
supports your chosen platform.

## Troubleshooting {#troubleshooting}

If you are running into difficulties with kubeadm, please consult our
troubleshooting docs.

## What's next

* Verify that your cluster is running properly with Sonobuoy
* See Upgrading kubeadm clusters
  for details about upgrading your cluster using `kubeadm`.
* Learn about advanced `kubeadm` usage in the kubeadm reference documentation
* Learn more about Kubernetes concepts and `kubectl`.
* See the Cluster Networking page for a bigger list
  of Pod network add-ons.
* See the list of add-ons to
  explore other add-ons, including tools for logging, monitoring, network policy, visualization &
  control of your Kubernetes cluster.
* Configure how your cluster handles logs for cluster events and from
  applications running in Pods.
  See Logging Architecture for
  an overview of what is involved.

### Feedback {#feedback}

* For bugs, visit the kubeadm GitHub issue tracker
* For support, visit the
  #kubeadm Slack channel
* General SIG Cluster Lifecycle development Slack channel:
  #sig-cluster-lifecycle
* SIG Cluster Lifecycle SIG information
* SIG Cluster Lifecycle mailing list:
  kubernetes-sig-cluster-lifecycle
