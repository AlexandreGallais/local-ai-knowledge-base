---
title: "Kubernetes driver (part 2 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/build/builders/drivers/kubernetes.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Kubernetes driver (part 2 of 2)

## Multi-platform builds

The Kubernetes driver has support for creating
multi-platform images,
either using QEMU or by leveraging the native architecture of nodes.

### QEMU

Like the `docker-container` driver, the Kubernetes driver also supports using
QEMU (user
mode) to build images for non-native platforms. Include the `--platform` flag
and specify which platforms you want to output to.

For example, to build a Linux image for `amd64` and `arm64`:

```console
$ docker buildx build \
  --builder=kube \
  --platform=linux/amd64,linux/arm64 \
  -t <user>/<image> \
  --push .
```

> **Warning:**
>
> QEMU performs full-CPU emulation of non-native platforms, which is much
> slower than native builds. Compute-heavy tasks like compilation and
> compression/decompression will likely take a large performance hit.

Using a custom BuildKit image or invoking non-native binaries in builds may
require that you explicitly turn on QEMU using the `qemu.install` option when
creating the builder:

```console
$ docker buildx create \
  --bootstrap \
  --name=kube \
  --driver=kubernetes \
  --driver-opt=namespace=buildkit,qemu.install=true
```

### Native

If you have access to cluster nodes of different architectures, the Kubernetes
driver can take advantage of these for native builds. To do this, use the
`--append` flag of `docker buildx create`.

First, create your builder with explicit support for a single architecture, for
example `amd64`:

```console
$ docker buildx create \
  --bootstrap \
  --name=kube \
  --driver=kubernetes \
  --platform=linux/amd64 \
  --node=builder-amd64 \
  --driver-opt=namespace=buildkit,nodeselector="kubernetes.io/arch=amd64"
```

This creates a Buildx builder named `kube`, containing a single builder node
named `builder-amd64`. Assigning a node name using `--node` is optional. Buildx
generates a random node name if you don't provide one.

Note that the Buildx concept of a node isn't the same as the Kubernetes concept
of a node. A Buildx node in this case could connect multiple Kubernetes nodes of
the same architecture together.

With the `kube` builder created, you can now introduce another architecture into
the mix using `--append`. For example, to add `arm64`:

```console
$ docker buildx create \
  --append \
  --bootstrap \
  --name=kube \
  --driver=kubernetes \
  --platform=linux/arm64 \
  --node=builder-arm64 \
  --driver-opt=namespace=buildkit,nodeselector="kubernetes.io/arch=arm64"
```

Listing your builders shows both nodes for the `kube` builder:

```console
$ docker buildx ls
NAME/NODE       DRIVER/ENDPOINT                                         STATUS   PLATFORMS
kube            kubernetes
  builder-amd64 kubernetes:///kube?deployment=builder-amd64&kubeconfig= running  linux/amd64*, linux/amd64/v2, linux/amd64/v3, linux/386
  builder-arm64 kubernetes:///kube?deployment=builder-arm64&kubeconfig= running  linux/arm64*
```

You can now build multi-arch `amd64` and `arm64` images, by specifying those
platforms together in your build command:

```console
$ docker buildx build --builder=kube --platform=linux/amd64,linux/arm64 -t <user>/<image> --push .
```

You can repeat the `buildx create --append` command for as many architectures
that you want to support.

## Rootless mode

The Kubernetes driver supports rootless mode. For more information on how
rootless mode works, and its requirements, refer to the
Rootless Buildkit documentation.

To turn it on in your cluster, you can use the `rootless=true` driver option:

```console
$ docker buildx create \
  --name=kube \
  --driver=kubernetes \
  --driver-opt=namespace=buildkit,rootless=true
```

This will create your pods without `securityContext.privileged`.

Requires Kubernetes version 1.19 or later. Using Ubuntu as the host kernel is
recommended.

## Example: Creating a Buildx builder in Kubernetes

This guide shows you how to:

- Create a namespace for your Buildx resources
- Create a Kubernetes builder.
- List the available builders
- Build an image using your Kubernetes builders

Prerequisites:

- You have an existing Kubernetes cluster. If you don't already have one, you
  can follow along by installing
  minikube.
- The cluster you want to connect to is accessible via the `kubectl` command,
  with the `KUBECONFIG` environment variable
  set appropriately if necessary.

1. Create a `buildkit` namespace.

   Creating a separate namespace helps keep your Buildx resources separate from
   other resources in the cluster.

   ```console
   $ kubectl create namespace buildkit
   namespace/buildkit created
   ```

2. Create a new builder with the Kubernetes driver:

   ```console
   $ docker buildx create \
     --bootstrap \
     --name=kube \
     --driver=kubernetes \
     --driver-opt=namespace=buildkit
   ```

   > **Note:**
   >
   > Remember to specify the namespace in driver options.

3. List available builders using `docker buildx ls`

   ```console
   $ docker buildx ls
   NAME/NODE                DRIVER/ENDPOINT STATUS  PLATFORMS
   kube                     kubernetes
     kube0-6977cdcb75-k9h9m                 running linux/amd64, linux/amd64/v2, linux/amd64/v3, linux/386
   default *                docker
     default                default         running linux/amd64, linux/386
   ```

4. Inspect the running pods created by the build driver with `kubectl`.

   ```console
   $ kubectl -n buildkit get deployments
   NAME    READY   UP-TO-DATE   AVAILABLE   AGE
   kube0   1/1     1            1           32s

   $ kubectl -n buildkit get pods
   NAME                     READY   STATUS    RESTARTS   AGE
   kube0-6977cdcb75-k9h9m   1/1     Running   0          32s
   ```

   The build driver creates the necessary resources on your cluster in the
   specified namespace (in this case, `buildkit`), while keeping your driver
   configuration locally.

5. Use your new builder by including the `--builder` flag when running Buildx
   commands. For example: :

   ```console
   # Replace <registry> with your Docker username
   # and <image> with the name of the image you want to build
   docker buildx build \
     --builder=kube \
     -t <registry>/<image> \
     --push .
   ```

That's it: you've now built an image from a Kubernetes pod, using Buildx.

## Further reading

For more information on the Kubernetes driver, see the
buildx reference.
