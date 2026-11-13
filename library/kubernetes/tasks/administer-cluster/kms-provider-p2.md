---
title: "Using a KMS provider for data encryption (part 2 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/administer-cluster/kms-provider.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Using a KMS provider for data encryption (part 2 of 2)

## Encrypting your data with the KMS provider

To encrypt the data:

1. Create a new `EncryptionConfiguration` file using the appropriate properties for the `kms` provider
to encrypt resources like Secrets and ConfigMaps. If you want to encrypt an extension API that is
defined in a CustomResourceDefinition, your cluster must be running Kubernetes v1.26 or newer.

1. Set the `--encryption-provider-config` flag on the kube-apiserver to point to the location of the configuration file.

1. `--encryption-provider-config-automatic-reload` boolean argument
   determines if the file set by `--encryption-provider-config` should be
   automatically reloaded
   if the disk contents change.

1. Restart your API server.

### KMS v1 {#encrypting-your-data-with-the-kms-provider-kms-v1}

   ```yaml
   apiVersion: apiserver.config.k8s.io/v1
   kind: EncryptionConfiguration
   resources:
     - resources:
         - secrets
         - configmaps
         - pandas.awesome.bears.example
       providers:
         - kms:
             name: myKmsPluginFoo
             endpoint: unix:///tmp/socketfile-foo.sock
             cachesize: 100
             timeout: 3s
         - kms:
             name: myKmsPluginBar
             endpoint: unix:///tmp/socketfile-bar.sock
             cachesize: 100
             timeout: 3s
   ```

### KMS v2 {#encrypting-your-data-with-the-kms-provider-kms-v2}

   ```yaml
   apiVersion: apiserver.config.k8s.io/v1
   kind: EncryptionConfiguration
   resources:
     - resources:
         - secrets
         - configmaps
         - pandas.awesome.bears.example
       providers:
         - kms:
             apiVersion: v2
             name: myKmsPluginFoo
             endpoint: unix:///tmp/socketfile-foo.sock
             timeout: 3s
         - kms:
             apiVersion: v2
             name: myKmsPluginBar
             endpoint: unix:///tmp/socketfile-bar.sock
             timeout: 3s
   ```

Setting `--encryption-provider-config-automatic-reload` to `true` collapses all health checks to a single health check endpoint. Individual health checks are only available when KMS v1 providers are in use and the encryption config is not auto-reloaded.

The following table summarizes the health check endpoints for each KMS version:

| KMS configurations | Without Automatic Reload | With Automatic Reload |
| ------------------ | ------------------------ | --------------------- |
| KMS v1 only        | Individual Healthchecks  | Single Healthcheck    |
| KMS v2 only        | Single Healthcheck       | Single Healthcheck    |
| Both KMS v1 and v2 | Individual Healthchecks  | Single Healthcheck    |
| No KMS             | None                     | Single Healthcheck    |

`Single Healthcheck` means that the only health check endpoint is `/healthz/kms-providers`.

`Individual Healthchecks` means that each KMS plugin has an associated health check endpoint based on its location in the encryption config: `/healthz/kms-provider-0`, `/healthz/kms-provider-1` etc.

These healthcheck endpoint paths are hard coded and generated/controlled by the server. The indices for individual healthchecks corresponds to the order in which the KMS encryption config is processed.

Until the steps defined in Ensuring all secrets are encrypted are performed, the `providers` list should end with the `identity: {}` provider to allow unencrypted data to be read.  Once all resources are encrypted, the `identity` provider should be removed to prevent the API server from honoring unencrypted data.

For details about the `EncryptionConfiguration` format, please check the
API server encryption API reference.

## Verifying that the data is encrypted

When encryption at rest is correctly configured, resources are encrypted on write.
After restarting your `kube-apiserver`, any newly created or updated Secret or other resource types
configured in `EncryptionConfiguration` should be encrypted when stored. To verify,
you can use the `etcdctl` command line program to retrieve the contents of your secret data.

1. Create a new secret <example-value> `secret1` in the `default` namespace:

   ```shell
   kubectl create secret <example-value> secret1 -n default --from-literal=mykey=<example-value>
   ```

1. Using the `etcdctl` command line, read that secret out of etcd:

   ```shell
   ETCDCTL_API=3 etcdctl get /kubernetes.io/secrets/default/secret1 [...] | hexdump -C
   ```

   where `[...]` contains the additional arguments for connecting to the etcd server.

1. Verify the stored secret is prefixed with `k8s:enc:kms:v1:` for KMS v1 or prefixed with `k8s:enc:kms:v2:` for KMS v2, which indicates that the `kms` provider has encrypted the resulting data.

1. Verify that the secret is correctly decrypted when retrieved via the API:

   ```shell
   kubectl describe secret <example-value> -n default
   ```

   The Secret <example-value> contain `mykey: <example-value>`

## Ensuring all secrets are encrypted

When encryption at rest is correctly configured, resources are encrypted on write.
Thus we can perform an in-place no-op update to ensure that data is encrypted.

The following command reads all secrets and then updates them to apply server side encryption.
If an error occurs due to a conflicting write, retry the command.
For larger clusters, you may wish to subdivide the secrets by namespace or script an update.

```shell
kubectl get secrets --all-namespaces -o json | kubectl replace -f -
```

## Switching from a local encryption provider to the KMS provider

To switch from a local encryption provider to the `kms` provider and re-encrypt all of the secrets:

1. Add the `kms` provider as the first entry in the configuration file as shown in the following example.

   ```yaml
   apiVersion: apiserver.config.k8s.io/v1
   kind: EncryptionConfiguration
   resources:
     - resources:
         - secrets
       providers:
         - kms:
             apiVersion: v2
             name : myKmsPlugin
             endpoint: unix:///tmp/socketfile.sock
         - aescbc:
             keys:
               - name: key1
                 secret: <BASE 64 ENCODED SECRET>
   ```

1. Restart all `kube-apiserver` processes.

1. Run the following command to force all secrets to be re-encrypted using the `kms` provider.

   ```shell
   kubectl get secrets --all-namespaces -o json | kubectl replace -f -
   ```

## What's next

If you no longer want to use encryption for data persisted in the Kubernetes API, read
decrypt data that are already stored at rest.
