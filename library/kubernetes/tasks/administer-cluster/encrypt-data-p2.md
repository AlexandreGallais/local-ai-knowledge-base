---
title: "Encrypting Confidential Data at Rest (part 2 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/administer-cluster/encrypt-data.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Encrypting Confidential Data at Rest (part 2 of 2)

## Encrypt your data {#encrypting-your-data}

### Generate the encryption key {#generate-key-no-kms}

The following steps assume that you are not using KMS, and therefore the steps also
assume that you need to generate an encryption key. If you already have an encryption key,
skip to Write an encryption configuration file.

**Caution:**
Storing the raw encryption key in the EncryptionConfig only moderately improves your security posture,
compared to no encryption.

For additional secrecy, consider using the `kms` provider as this relies on keys held outside your
Kubernetes cluster. Implementations of `kms` can work with hardware security modules or with
encryption services managed by your cloud provider.

To learn about setting
up encryption at rest using KMS, see
Using a KMS provider for data encryption.
The KMS provider plugin that you use may also come with additional specific documentation.

Start by generating a new encryption key, and then encode it using base64:

**Linux**
Generate a 32-byte random key and base64 encode it. You can use this command:
```shell
head -c 32 /dev/urandom | base64
```

You can use `/dev/hwrng` instead of `/dev/urandom` if you want to
use your PC's built-in hardware entropy source. Not all Linux
devices provide a hardware random generator.

**macOS**

Generate a 32-byte random key and base64 encode it. You can use this command:
```shell
head -c 32 /dev/urandom | base64
```

**Windows**
Generate a 32-byte random key and base64 encode it. You can use this command:
```powershell
# Do not run this in a session where you have set a random number
# generator seed.
[Convert]::ToBase64String((1..32|%{[byte](Get-Random -Max 256)}))
```

**Note:**
Keep the encryption key confidential, including while you generate it and
ideally even after you are no longer actively using it.

### Replicate the encryption key

Using a secure mechanism for file transfer, make a copy of that encryption key
available to every other control plane host.

At a minimum, use encryption in transit - for example, secure shell (SSH). For more
security, use asymmetric encryption between hosts, or change the approach you are using
so that you're relying on KMS encryption.

### Write an encryption configuration file

**Caution:**
The encryption configuration file may contain keys that can decrypt content in etcd.
If the configuration file contains any key material, you must properly
restrict permissions on all your control plane hosts so only the user
who runs the kube-apiserver can read this configuration.

Create a new encryption configuration file. The contents should be similar to:

```yaml
---
apiVersion: apiserver.config.k8s.io/v1
kind: EncryptionConfiguration
resources:
  - resources:
      - secrets
      - configmaps
      - pandas.awesome.bears.example
    providers:
      - aescbc:
          keys:
            - name: key1
              # See the following text for more details about the secret value
              secret: <BASE 64 ENCODED SECRET>
      - identity: {} # this fallback allows reading unencrypted secrets;
                     # for example, during initial migration
```

To create a new encryption key (that does not use KMS), see
Generate the encryption key.

### Use the new encryption configuration file

You will need to mount the new encryption config file to the `kube-apiserver` static pod. Here is an example on how to do that:

1. Save the new encryption config file to `/etc/kubernetes/enc/enc.yaml` on the control-plane node.
1. Edit the manifest for the `kube-apiserver` static pod: `/etc/kubernetes/manifests/kube-apiserver.yaml` so that it is similar to:

   ```yaml
   ---
   #
   # This is a fragment of a manifest for a static Pod.
   # Check whether this is correct for your cluster and for your API server.
   #
   apiVersion: v1
   kind: Pod
   metadata:
     annotations:
       kubeadm.kubernetes.io/kube-apiserver.advertise-address.endpoint: 10.20.30.40:443
     creationTimestamp: null
     labels:
       app.kubernetes.io/component: kube-apiserver
       tier: control-plane
     name: kube-apiserver
     namespace: kube-system
   spec:
     containers:
     - command:
       - kube-apiserver
       ...
       - --encryption-provider-config=/etc/kubernetes/enc/enc.yaml  # add this line
       volumeMounts:
       ...
       - name: enc                           # add this line
         mountPath: /etc/kubernetes/enc      # add this line
         readOnly: true                      # add this line
       ...
     volumes:
     ...
     - name: enc                             # add this line
       hostPath:                             # add this line
         path: /etc/kubernetes/enc           # add this line
         type: DirectoryOrCreate             # add this line
     ...
   ```

1. Restart your API server.

**Caution:**
Your config file contains keys that can decrypt the contents in etcd, so you must properly restrict
permissions on your control-plane nodes so only the user who runs the `kube-apiserver` can read it.

You now have encryption in place for **one** control plane host. A typical
Kubernetes cluster has multiple control plane hosts, so there is more to do.

### Reconfigure other control plane hosts {#api-server-config-update-more}

If you have multiple API servers in your cluster, you should deploy the
changes in turn to each API server.

**Caution:**
For cluster configurations with two or more control plane nodes, the encryption configuration
should be identical across each control plane node.

If there is a difference in the encryption provider configuration between control plane
nodes, this difference may mean that the kube-apiserver can't decrypt data.

When you are planning to update the encryption configuration of your cluster, plan this
so that the API servers in your control plane can always decrypt the stored data
(even part way through rolling out the change).

Make sure that you use the **same** encryption configuration on each
control plane host.

### Verify that newly written data is encrypted {#verifying-that-data-is-encrypted}

Data is encrypted when written to etcd. After restarting your `kube-apiserver`, any newly
created or updated Secret (or other resource kinds configured in `EncryptionConfiguration`)
should be encrypted when stored.

To check this, you can use the `etcdctl` command line
program to retrieve the contents of your secret data.

This example shows how to check this for encrypting the Secret API.

1. Create a new Secret called `secret1` in the `default` namespace:

   ```shell
   kubectl create secret generic secret1 -n default --from-literal=mykey=mydata
   ```

1. Using the `etcdctl` command line tool, read that Secret out of etcd:

   ```
   ETCDCTL_API=3 etcdctl get /registry/secrets/default/secret1 [...] | hexdump -C
   ```

   where `[...]` must be the additional arguments for connecting to the etcd server.

   For example:

   ```shell
   ETCDCTL_API=3 etcdctl \
      --cacert=/etc/kubernetes/pki/etcd/ca.crt   \
      --cert=/etc/kubernetes/pki/etcd/server.crt \
      --key=/etc/kubernetes/pki/etcd/server.key  \
      get /registry/secrets/default/secret1 | hexdump -C
   ```

   The output is similar to this (abbreviated):

   ```hexdump
   00000000  2f 72 65 67 69 73 74 72  79 2f 73 65 63 72 65 74  |/registry/secret|
   00000010  73 2f 64 65 66 61 75 6c  74 2f 73 65 63 72 65 74  |s/default/secret|
   00000020  31 0a 6b 38 73 3a 65 6e  63 3a 61 65 73 63 62 63  |1.k8s:enc:aescbc|
   00000030  3a 76 31 3a 6b 65 79 31  3a c7 6c e7 d3 09 bc 06  |:v1:key1:.l.....|
   00000040  25 51 91 e4 e0 6c e5 b1  4d 7a 8b 3d b9 c2 7c 6e  |%Q...l..Mz.=..|n|
   00000050  b4 79 df 05 28 ae 0d 8e  5f 35 13 2c c0 18 99 3e  |.y..(..._5.,...>|
   [...]
   00000110  23 3a 0d fc 28 ca 48 2d  6b 2d 46 cc 72 0b 70 4c  |#:..(.H-k-F.r.pL|
   00000120  a5 fc 35 43 12 4e 60 ef  bf 6f fe cf df 0b ad 1f  |..5C.N`..o......|
   00000130  82 c4 88 53 02 da 3e 66  ff 0a                    |...S..>f..|
   0000013a
   ```

1. Verify the stored Secret is prefixed with `k8s:enc:aescbc:v1:` which indicates
   the `aescbc` provider has encrypted the resulting data. Confirm that the key name shown in `etcd`
   matches the key name specified in the `EncryptionConfiguration` mentioned above. In this example,
   you can see that the encryption key named `key1` is used in `etcd` and in `EncryptionConfiguration`.

1. Verify the Secret is correctly decrypted when retrieved via the API:

   ```shell
   kubectl get secret secret1 -n default -o yaml
   ```

   The output should contain `mykey: bXlkYXRh`, with contents of `mydata` encoded using base64;
   read
   decoding a Secret
   to learn how to completely decode the Secret.

### Ensure all relevant data are encrypted {#ensure-all-secrets-are-encrypted}

It's often not enough to make sure that new objects get encrypted: you also want that
encryption to apply to the objects that are already stored.

For this example, you have configured your cluster so that Secrets are encrypted on write.
Performing a replace operation for each Secret will encrypt that content at rest,
where the objects are unchanged.

You can make this change across all Secrets in your cluster:

```shell
# Run this as an administrator that can read and write all Secrets
kubectl get secrets --all-namespaces -o json | kubectl replace -f -
```

The command above reads all Secrets and then updates them with the same data, in order to
apply server side encryption.

**Note:**
If an error occurs due to a conflicting write, retry the command.
It is safe to run that command more than once.

For larger clusters, you may wish to subdivide the Secrets by namespace,
or script an update.

## Prevent plain text retrieval {#cleanup-all-secrets-encrypted}

If you want to make sure that the only access to a particular API kind is done using
encryption, you can remove the API server's ability to read that API's backing data
as plaintext.

**Warning:**
Making this change prevents the API server from retrieving resources that are marked
as encrypted at rest, but are actually stored in the clear.

When you have configured encryption at rest for an API (for example: the API kind
`Secret`, representing `secrets` resources in the core API group), you **must** ensure
that all those resources in this cluster really are encrypted at rest. Check this before
you carry on with the next steps.

Once all Secrets in your cluster are encrypted, you can remove the `identity`
part of the encryption configuration. For example:

---
apiVersion: apiserver.config.k8s.io/v1
kind: EncryptionConfiguration
resources:
  - resources:
      - secrets
    providers:
      - aescbc:
          keys:
            - name: key1
              secret: <BASE 64 ENCODED SECRET>
      - identity: {} # REMOVE THIS LINE

…and then restart each API server in turn. This change prevents the API server
from accessing a plain-text Secret, even by accident.

## Rotate a decryption key {#rotating-a-decryption-key}

Changing an encryption key for Kubernetes without incurring downtime requires a multi-step operation,
especially in the presence of a highly-available deployment where multiple `kube-apiserver` processes
are running.

1. Generate a new key and add it as the second key entry for the current provider on all
   control plane nodes.
1. Restart **all** `kube-apiserver` processes, to ensure each server can decrypt
   any data that are encrypted with the new key.
1. Make a secure backup of the new encryption key. If you lose all copies of this key you would
   need to delete all the resources were encrypted under the lost key, and workloads may not
   operate as expected during the time that at-rest encryption is broken.
1. Make the new key the first entry in the `keys` array so that it is used for encryption-at-rest
   for new writes
1. Restart all `kube-apiserver` processes to ensure each control plane host now encrypts using the new key
1. As a privileged user, run `kubectl get secrets --all-namespaces -o json | kubectl replace -f -`
   to encrypt all existing Secrets with the new key
1. After you have updated all existing Secrets to use the new key and have made a secure backup of the
   new key, remove the old decryption key from the configuration.

## Decrypt all data {#decrypting-all-data}

This example shows how to stop encrypting the Secret API at rest. If you are encrypting
other API kinds, adjust the steps to match.

To disable encryption at rest, place the `identity` provider as the first
entry in your encryption configuration file:

```yaml
---
apiVersion: apiserver.config.k8s.io/v1
kind: EncryptionConfiguration
resources:
  - resources:
      - secrets
      # list any other resources here that you previously were
      # encrypting at rest
    providers:
      - identity: {} # add this line
      - aescbc:
          keys:
            - name: key1
              secret: <BASE 64 ENCODED SECRET> # keep this in place
                                               # make sure it comes after "identity"
```

Then run the following command to force decryption of all Secrets:

```shell
kubectl get secrets --all-namespaces -o json | kubectl replace -f -
```

Once you have replaced all existing encrypted resources with backing data that
don't use encryption, you can remove the encryption settings from the
`kube-apiserver`.

## Configure automatic reloading

You can configure automatic reloading of encryption provider configuration.
That setting determines whether the
API server should
load the file you specify for `--encryption-provider-config` only once at
startup, or automatically whenever you change that file. Enabling this option
allows you to change the keys for encryption at rest without restarting the
API server.

To allow automatic reloading, configure the API server to run with:
`--encryption-provider-config-automatic-reload=true`.
When enabled, file changes are polled every minute to observe the modifications.
The `apiserver_encryption_config_controller_automatic_reload_last_timestamp_seconds`
metric identifies when the new config becomes effective. This allows
encryption keys to be rotated without restarting the API server.

## What's next

* Read about decrypting data that are already stored at rest
* Learn more about the EncryptionConfiguration configuration API (v1).
