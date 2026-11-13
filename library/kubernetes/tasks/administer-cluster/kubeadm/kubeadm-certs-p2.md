---
title: "Certificate Management with kubeadm (part 2 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/administer-cluster/kubeadm/kubeadm-certs.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Certificate Management with kubeadm (part 2 of 2)

## Enabling signed kubelet serving certificates {#kubelet-serving-certs}

By default the kubelet serving certificate deployed by kubeadm is self-signed.
This means a connection from external services like the
metrics-server to a
kubelet cannot be secured with TLS.

To configure the kubelets in a new kubeadm cluster to obtain properly signed serving
certificates you must pass the following minimal configuration to `kubeadm init`:

```yaml
apiVersion: kubeadm.k8s.io/v1beta4
kind: ClusterConfiguration
---
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
serverTLSBootstrap: true
```

If you have already created the cluster you must adapt it by doing the following:
 - Find and edit the `kubelet-config` ConfigMap in the `kube-system` namespace.
In that ConfigMap, the `kubelet` key has a
KubeletConfiguration
document as its value. Edit the KubeletConfiguration document to set `serverTLSBootstrap: true`.
- On each node, add the `serverTLSBootstrap: true` field in `/var/lib/kubelet/config.yaml`
and restart the kubelet with `systemctl restart kubelet`

The field `serverTLSBootstrap: true` will enable the bootstrap of kubelet serving
certificates by requesting them from the `certificates.k8s.io` API. One known limitation
is that the CSRs (Certificate Signing Requests) for these certificates cannot be automatically
approved by the default signer in the kube-controller-manager -
`kubernetes.io/kubelet-serving`.
This will require action from the user or a third party controller.

These CSRs can be viewed using:

```shell
kubectl get csr
```
```console
NAME        AGE     SIGNERNAME                        REQUESTOR                      CONDITION
csr-9wvgt   112s    kubernetes.io/kubelet-serving     system:node:worker-1           Pending
csr-lz97v   1m58s   kubernetes.io/kubelet-serving     system:node:control-plane-1    Pending
```

To approve them you can do the following:
```shell
kubectl certificate approve <CSR-name>
```

By default, these serving certificate will expire after one year. Kubeadm sets the
`KubeletConfiguration` field `rotateCertificates` to `true`, which means that close
to expiration a new set of CSRs for the serving certificates will be created and must
be approved to complete the rotation. To understand more see
Certificate Rotation.

If you are looking for a solution for automatic approval of these CSRs it is recommended
that you contact your cloud provider and ask if they have a CSR signer that verifies
the node identity with an out of band mechanism.

Third party custom controllers can be used:
- kubelet-csr-approver

Such a controller is not a secure mechanism unless it not only verifies the CommonName
in the CSR but also verifies the requested IPs and domain names. This would prevent
a malicious actor that has access to a kubelet client certificate to create
CSRs requesting serving certificates for any IP or domain name.

## Generating kubeconfig files for additional users {#kubeconfig-additional-users}

During cluster creation, `kubeadm init` signs the certificate in the `super-admin.conf`
to have `Subject: O = system:masters, CN = kubernetes-super-admin`.
`system:masters`
is a break-glass, super user group that bypasses the authorization layer (for example,
RBAC). The file `admin.conf` is also created
by kubeadm on control plane nodes and it contains a certificate with
`Subject: O = kubeadm:cluster-admins, CN = kubernetes-admin`. `kubeadm:cluster-admins`
is a group logically belonging to kubeadm. If your cluster uses RBAC
(the kubeadm default), the `kubeadm:cluster-admins` group is bound to the
`cluster-admin` ClusterRole.

**Warning:**
Avoid sharing the `super-admin.conf` or `admin.conf` files. Instead, create least
privileged access even for people who work as administrators and use that least
privilege alternative for anything other than break-glass (emergency) access.

You can use the `kubeadm kubeconfig user`
command to generate kubeconfig files for additional users.
The command accepts a mixture of command line flags and
kubeadm configuration options.
The generated kubeconfig will be written to stdout and can be piped to a file using
`kubeadm kubeconfig user ... > somefile.conf`.

Example configuration file that can be used with `--config`:

```yaml
# example.yaml
apiVersion: kubeadm.k8s.io/v1beta4
kind: ClusterConfiguration
# Will be used as the target "cluster" in the kubeconfig
clusterName: "kubernetes"
# Will be used as the "server" (IP or DNS name) of this cluster in the kubeconfig
controlPlaneEndpoint: "some-dns-address:6443"
# The cluster CA key and certificate will be loaded from this local directory
certificatesDir: "/etc/kubernetes/pki"
```

Make sure that these settings match the desired target cluster settings.
To see the settings of an existing cluster use:

```shell
kubectl get cm kubeadm-config -n kube-system -o=jsonpath="{.data.ClusterConfiguration}"
```

The following example will generate a kubeconfig file with credentials valid for 24 hours
for a new user `johndoe` that is part of the `appdevs` group:

```shell
kubeadm kubeconfig user --config example.yaml --org appdevs --client-name johndoe --validity-period 24h
```

The following example will generate a kubeconfig file with administrator credentials valid for 1 week:

```shell
kubeadm kubeconfig user --config example.yaml --client-name admin --validity-period 168h
```

## Signing certificate signing requests (CSR) generated by kubeadm {#signing-csr}

You can create certificate signing requests with `kubeadm certs generate-csr`.
Calling this command will generate `.csr` / `.key` file pairs for regular
certificates. For certificates embedded in kubeconfig files, the command will
generate a `.csr` / `.conf` pair where the key is already embedded in the `.conf` file.

A CSR file contains all relevant information for a CA to sign a certificate.
kubeadm uses a
well defined specification
for all its certificates and CSRs.

The default certificate directory is `/etc/kubernetes/pki`, while the default
directory for kubeconfig files is `/etc/kubernetes`. These defaults can be
overridden with the flags `--cert-dir` and `--kubeconfig-dir`, respectively.

To pass <example-value> options to `kubeadm certs generate-csr` use the `--config` flag,
which accepts a kubeadm configuration
file, similarly to commands such as `kubeadm init`. Any specification such
as extra SANs and custom IP addresses must be stored in the same configuration
file and used for all relevant kubeadm commands by passing it as `--config`.

**Note:**
This guide uses the default Kubernetes directory `/etc/kubernetes`, which requires
a super user. If you are following this guide and are using directories that you can
write to (typically, this means running `kubeadm` with `--cert-dir` and `--kubeconfig-dir`)
then you can omit the `sudo` command.

You must then copy the files that you produced over to within the `/etc/kubernetes`
directory so that `kubeadm init` or `kubeadm join` will find them.

### Preparing CA and service account files

On the primary control plane node, where `kubeadm init` will be executed, call the following
commands:

```shell
sudo kubeadm init phase certs ca
sudo kubeadm init phase certs etcd-ca
sudo kubeadm init phase certs front-proxy-ca
sudo kubeadm init phase certs sa
```

This will populate the folders `/etc/kubernetes/pki` and `/etc/kubernetes/pki/etcd`
with all self-signed CA files (certificates and keys) and service account (public and
private keys) that kubeadm needs for a control plane node.

**Note:**
If you are using an external CA, you must generate the same files out of band and manually
copy them to the primary control plane node in `/etc/kubernetes`.

Once all CSRs are signed, you can delete the root CA key (`ca.key`) as noted in the
External CA mode section.

For secondary control plane nodes (`kubeadm join --control-plane`) there is no need to call
the above commands. Depending on how you setup the
High Availability
cluster, you either have to manually copy the same files from the primary
control plane node, or use the automated `--upload-certs` functionality of `kubeadm init`.

### Generate CSRs

The `kubeadm certs generate-csr` command generates CSRs for all known certificates
managed by kubeadm. Once the command is done you must manually delete `.csr`, `.conf`
or `.key` files that you don't need.

#### Considerations for kubelet.conf {#considerations-kubelet-conf}

This section applies to both control plane and worker nodes.

If you have deleted the `ca.key` file from control plane nodes
(External CA mode), the active kube-controller-manager in
this cluster will not be able to sign kubelet client certificates. If no external
method for signing these certificates exists in your setup (such as an
external signer), you could manually sign the `kubelet.conf.csr`
as explained in this guide.

Note that this also means that the automatic
kubelet client certificate rotation
will be disabled. If so, close to certificate expiration, you must generate
a new `kubelet.conf.csr`, sign the certificate, embed it in `kubelet.conf`
and restart the kubelet.

If this does not apply to your setup, you can skip processing the `kubelet.conf.csr`
on secondary control plane and on workers nodes (all nodes that call `kubeadm join ...`).
That is because the active kube-controller-manager will be responsible
for signing new kubelet client certificates.

**Note:**
You must process the `kubelet.conf.csr` file on the primary control plane node
(the host where you originally ran `kubeadm init`). This is because `kubeadm`
considers that as the node that bootstraps the cluster, and a pre-populated
`kubelet.conf` is needed.

#### Control plane nodes

Execute the following command on primary (`kubeadm init`) and secondary
(`kubeadm join --control-plane`) control plane nodes to generate all CSR files:

```shell
sudo kubeadm certs generate-csr
```

If external etcd is to be used, follow the
External etcd with kubeadm
guide to understand what CSR files are needed on the kubeadm and etcd nodes. Other
`.csr` and `.key` files under `/etc/kubernetes/pki/etcd` can be removed.

Based on the explanation in
Considerations for kubelet.conf keep or delete
the `kubelet.conf` and `kubelet.conf.csr` files.

#### Worker nodes

Based on the explanation in
Considerations for kubelet.conf, optionally call:

```shell
sudo kubeadm certs generate-csr
```

and keep only the `kubelet.conf` and `kubelet.conf.csr` files. Alternatively skip
the steps for worker nodes entirely.

### Signing CSRs for all certificates

**Note:**
If you are using external CA and already have CA serial number files (`.srl`) for
`openssl`, you can copy such files to a kubeadm node where CSRs will be processed.
The `.srl` files to copy are `/etc/kubernetes/pki/ca.srl`,
`/etc/kubernetes/pki/front-proxy-ca.srl` and `/etc/kubernetes/pki/etcd/ca.srl`.
The files can be then moved to a new node where CSR files will be processed.

If a `.srl` file is missing for a CA on a node, the script below will generate a new SRL file
with a random starting serial number.

To read more about `.srl` files see the
`openssl`
documentation for the `--CAserial` flag.

Repeat this step for all nodes that have CSR files.

Write the following script in the `/etc/kubernetes` directory, navigate to the directory
and execute the script. The script will generate certificates for all CSR files that are
present in the `/etc/kubernetes` tree.

```bash
#!/bin/bash

# Set certificate expiration time in days
DAYS=365

# Process all CSR files except those for front-proxy and etcd
find ./ -name "*.csr" | grep -v "pki/etcd" | grep -v "front-proxy" | while read -r FILE;
do
    echo "* Processing ${FILE} ..."
    FILE=${FILE%.*} # Trim the extension
    if [ -f "./pki/ca.srl" ]; then
        SERIAL_FLAG="-CAserial ./pki/ca.srl"
    else
        SERIAL_FLAG="-CAcreateserial"
    fi
    openssl x509 -req -days "${DAYS}" -CA ./pki/ca.crt -CAkey ./pki/ca.key ${SERIAL_FLAG} \
        -in "${FILE}.csr" -out "${FILE}.crt"
    sleep 2
done

# Process all etcd CSRs
find ./pki/etcd -name "*.csr" | while read -r FILE;
do
    echo "* Processing ${FILE} ..."
    FILE=${FILE%.*} # Trim the extension
    if [ -f "./pki/etcd/ca.srl" ]; then
        SERIAL_FLAG=-CAserial ./pki/etcd/ca.srl
    else
        SERIAL_FLAG=-CAcreateserial
    fi
    openssl x509 -req -days "${DAYS}" -CA ./pki/etcd/ca.crt -CAkey ./pki/etcd/ca.key ${SERIAL_FLAG} \
        -in "${FILE}.csr" -out "${FILE}.crt"
done

# Process front-proxy CSRs
echo "* Processing ./pki/front-proxy-client.csr ..."
openssl x509 -req -days "${DAYS}" -CA ./pki/front-proxy-ca.crt -CAkey ./pki/front-proxy-ca.key <example-value> \
    -in ./pki/front-proxy-client.csr -out ./pki/front-proxy-client.crt
```

### Embedding certificates in kubeconfig files

Repeat this step for all nodes that have CSR files.

Write the following script in the `/etc/kubernetes` directory, navigate to the directory
and execute the script. The script will take the `.crt` files that were signed for
kubeconfig files from CSRs in the previous step and will embed them in the kubeconfig files.

```bash
#!/bin/bash

CLUSTER=kubernetes
find ./ -name "*.conf" | while read -r FILE;
do
    echo "* Processing ${FILE} ..."
    KUBECONFIG="${FILE}" kubectl config set-cluster "${CLUSTER}" --certificate-authority ./pki/ca.crt --embed-certs
    USER=$(KUBECONFIG="${FILE}" kubectl config view -o jsonpath='{.users[0].name}')
    KUBECONFIG="${FILE}" kubectl config set-credentials "${USER}" --client-certificate "${FILE}.crt" --embed-certs
done
```

### Performing cleanup {#post-csr-cleanup}

Perform this step on all nodes that have CSR files.

Write the following script in the `/etc/kubernetes` directory, navigate to the directory
and execute the script.

```bash
#!/bin/bash

# Cleanup CSR files
rm -f ./*.csr ./pki/*.csr ./pki/etcd/*.csr # Clean all CSR files

# Cleanup CRT files that were already embedded in kubeconfig files
rm -f ./*.crt
```

Optionally, move `.srl` files to the next node to be processed.

Optionally, if using external CA remove the `/etc/kubernetes/pki/ca.key` file,
as explained in the External CA node section.

### kubeadm node initialization

Once CSR files have been signed and required certificates are in place on the hosts
you want to use as nodes, you can use the commands `kubeadm init` and `kubeadm join`
to create a Kubernetes cluster from these nodes. During `init` and `join`, kubeadm
uses existing certificates, encryption keys and kubeconfig files that it finds in the
`/etc/kubernetes` tree on the host's local filesystem.
