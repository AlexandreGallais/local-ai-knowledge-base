---
title: "kubeadm init (part 2 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/kubeadm-init.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm init (part 2 of 2)

### Uploading control plane certificates to the cluster

By adding the flag `--upload-certs` to `kubeadm init` you can temporary upload
the control plane certificates to a Secret in the cluster. Please note that this Secret
will expire automatically after 2 hours. The certificates are encrypted using
a 32byte key that can be specified using `--certificate-key`. The same key can be used
to download the certificates when additional control plane nodes are joining, by passing
`--control-plane` and `--certificate-key` to `kubeadm join`.

The following phase command can be used to re-upload the certificates after expiration:

```shell
kubeadm init phase upload-certs --upload-certs --config=SOME_YAML_FILE
```

**Note:**
A predefined `certificateKey` can be provided in `InitConfiguration` when passing the
configuration file with `--config`.

If a predefined certificate key is not passed to `kubeadm init` and
`kubeadm init phase upload-certs` a new key will be generated automatically.

The following command can be used to generate a new key on demand:

```shell
kubeadm certs certificate-key
```

### Certificate management with kubeadm

For detailed information on certificate management with kubeadm see
Certificate Management with kubeadm.
The document includes information about using external CA, custom certificates
and certificate renewal.

### Managing the kubeadm drop-in file for the kubelet {#kubelet-drop-in}

The `kubeadm` package ships with a configuration file for running the `kubelet` by `systemd`.
Note that the kubeadm CLI never touches this drop-in file. This drop-in file is part of the kubeadm
DEB/RPM package.

For further information, see
Managing the kubeadm drop-in file for systemd.

### Use kubeadm with CRI runtimes

By default, kubeadm attempts to detect your container runtime. For more details on this detection,
see the kubeadm CRI installation guide.

### Setting the node name

By default, kubeadm assigns a node name based on a machine's host address.
You can override this setting with the `--node-name` flag.
The flag passes the appropriate `--hostname-override`
value to the kubelet.

Be aware that overriding the hostname can
interfere with cloud providers.

### Automating kubeadm

Rather than copying the token you obtained from `kubeadm init` to each node, as
in the basic <example-value> tutorial,
you can parallelize the token <example-value> for easier automation. To implement this automation,
you must know the IP address that the control plane node will have after it is started, or use a
DNS name or an address of a load balancer.

1. Generate a token. This token must have the form `<6 character string>.<16 character string>`.
   More formally, it must match the regex: `[a-z0-9]{6}\.[a-z0-9]{16}`.

   kubeadm can generate a token for you:

   ```shell
   kubeadm token <example-value>
   ```

1. Start both the control plane node and the worker nodes concurrently with this token.
   As they come up they should find each other and form the cluster. The same
   `--token` argument can be used on both `kubeadm init` and `kubeadm join`.

1. Similar can be done for `--certificate-key` when joining additional control plane
   nodes. The key can be generated using:

   ```shell
   kubeadm certs certificate-key
   ```

Once the cluster is up, you can use the `/etc/kubernetes/admin.conf` file from
a control plane node to talk to the cluster with administrator credentials or
Generating kubeconfig files for additional users.

Note that this style of bootstrap has some relaxed security guarantees because
it does not allow the root CA hash to be validated with
`--discovery-token-ca-cert-hash` (since it's not generated when the nodes are provisioned).
For details, see the kubeadm join.

## What's next

* kubeadm init phase to understand more about
  `kubeadm init` phases
* kubeadm join to bootstrap a Kubernetes
  worker node and join it to the cluster
* kubeadm upgrade to upgrade a Kubernetes
  cluster to a newer version
* kubeadm reset to revert any changes made
  to this host by `kubeadm init` or `kubeadm join`
