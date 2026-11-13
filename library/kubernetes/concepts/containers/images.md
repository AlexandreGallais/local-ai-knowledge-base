---
title: "Images (part 1 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/containers/images.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Images

A container image represents binary data that encapsulates an application and all its
software dependencies. Container images are executable software bundles that can run
standalone and that make very well-defined assumptions about their runtime environment.

You typically create a container image of your application and push it to a registry
before referring to it in a Pod.

This page provides an outline of the container image concept.

**Note:**
If you are looking for the container images for a Kubernetes
release (such as v, the latest minor release),
visit Download Kubernetes.

## Image names

Container images are usually given a name such as `pause`, `example/mycontainer`, or `kube-apiserver`.
Images can also include a registry hostname; for example: `fictional.registry.example/imagename`,
and possibly a port number as well; for example: `fictional.registry.example:10443/imagename`.

If you don't specify a registry hostname, Kubernetes assumes that you mean the Docker public registry.
You can change this behavior by setting a default image registry in the
container runtime configuration.

After the image name part you can add a _tag_ or _digest_ (in the same way you would when using with commands
like `docker` or `podman`). Tags let you identify different versions of the same series of images.
Digests are a unique identifier for a specific version of an image. Digests are hashes of the image's content,
and are immutable. Tags can be moved to point to different images, but digests are fixed.

Image tags consist of lowercase and uppercase letters, digits, underscores (`_`),
periods (`.`), and dashes (`-`). A tag can be up to 128 characters long, and must
conform to the following regex pattern: `a-zA-Z0-9_{0,127}`.
You can read more about it and find the validation regex in the
OCI Distribution Specification.
If you don't specify a tag, Kubernetes assumes you mean the tag `latest`.

Image digests consists of a hash algorithm (such as `sha256`) and a hash value. For example:
`sha256:1ff6c18fbef2045af6b9c16bf034cc421a29027b800e4f9b68ae9b1cb3e9ae07`.
You can find more information about the digest format in the
OCI Image Specification.

Some image name examples that Kubernetes can use are:

- `busybox` — Image name only, no tag or digest. Kubernetes will use the Docker
    public registry and latest tag. Equivalent to `docker.io/library/busybox:latest`.
- `busybox:1.32.0` — Image name with tag. Kubernetes will use the Docker
    public registry. Equivalent to `docker.io/library/busybox:1.32.0`.
- `registry.k8s.io/pause:latest` — Image name with a custom registry and latest tag.
- `registry.k8s.io/pause:3.5` — Image name with a custom registry and non-latest tag.
- `registry.k8s.io/pause@sha256:1ff6c18fbef2045af6b9c16bf034cc421a29027b800e4f9b68ae9b1cb3e9ae07` —
    Image name with digest.
- `registry.k8s.io/pause:3.5@sha256:1ff6c18fbef2045af6b9c16bf034cc421a29027b800e4f9b68ae9b1cb3e9ae07` —
    Image name with tag and digest. Only the digest will be used for pulling.

## Updating images

When you first create a Deployment,
StatefulSet, Pod, or other
object that includes a PodTemplate, and a pull policy was not explicitly specified,
then by default the pull policy of all containers in that Pod will be set to
`IfNotPresent`. This policy causes the
kubelet to skip pulling an
image if it already exists.

### Image pull policy

The `imagePullPolicy` for a container and the tag of the image both affect _when_ the
kubelet attempts to pull
(download) the specified image.

Here's a list of the values you can set for `imagePullPolicy` and the effects
these values have:

`IfNotPresent`
: the image is pulled only if it is not already present locally.

`Always`
: every time the kubelet launches a container, the kubelet requests the
  container runtime
  to pull the image. The container runtime contacts the registry, resolves
  the image tag or name to a
  digest,
  and downloads any layers that are not already cached locally.
  If all layers are already present, the container runtime uses the cached
  image without downloading it again. The kubelet itself does not check
  whether the image is cached locally; it always delegates to the container
  runtime.

`Never`
: the kubelet does not try fetching the image. If the image is somehow already present
  locally, the kubelet attempts to start the container; otherwise, startup fails.
  See pre-pulled images for more details.

The caching semantics of the container runtime make even
`imagePullPolicy: Always` efficient, as long as the registry is reliably accessible.
The container runtime can notice that the image layers already exist on the node
so that they don't need to be downloaded again.

**Note:**
You should avoid using the `:latest` tag when deploying containers in production as
it is harder to track which version of the image is running and more difficult to
roll back properly.

Instead, specify a meaningful tag such as `v1.42.0` and/or a digest.

To make sure the Pod always uses the same version of a container image, you can specify
the image's digest;
replace `<image-name>:<tag>` with `<image-name>@<digest>`
(for example, `image@sha256:45b23dee08af5e43a7fea6c4cf9c25ccf269ee113168c19722f87876677c5cb2`).

When using image tags, if the image registry were to change the code that the tag on that image
represents, you might end up with a mix of Pods running the old and new code. An image digest
uniquely identifies a specific version of the image, so Kubernetes runs the same code every time
it starts a container with that image name and digest specified. Specifying an image by digest
pins the code that you run so that a change at the registry cannot lead to that mix of versions.

There are third-party admission controllers
that mutate Pods (and PodTemplates) when they are created, so that the
running workload is defined based on an image digest rather than a tag.
That might be useful if you want to make sure that your entire workload is
running the same code no matter what tag changes happen at the registry.

#### Default image pull policy {#imagepullpolicy-defaulting}

When you (or a controller) submit a new Pod to the API server, your cluster sets the
`imagePullPolicy` field when specific conditions are met:

- if you omit the `imagePullPolicy` field, and you specify the digest for the
  container image, the `imagePullPolicy` is automatically set to `IfNotPresent`.
- if you omit the `imagePullPolicy` field, and the tag for the container image is
  `:latest`, `imagePullPolicy` is automatically set to `Always`.
- if you omit the `imagePullPolicy` field, and you don't specify the tag for the
  container image, `imagePullPolicy` is automatically set to `Always`.
- if you omit the `imagePullPolicy` field, and you specify a tag for the container
  image that isn't `:latest`, the `imagePullPolicy` is automatically set to
  `IfNotPresent`.

**Note:**
The value of `imagePullPolicy` of the container is always set when the object is
first _created_, and is not updated if the image's tag or digest later changes.

For example, if you create a Deployment with an image whose tag is _not_
`:latest`, and later update that Deployment's image to a `:latest` tag, the
`imagePullPolicy` field will _not_ change to `Always`. You must manually change
the pull policy of any object after its initial creation.

#### Required image pull

If you would like to always force a pull, you can do one of the following:

- Set the `imagePullPolicy` of the container to `Always`.
- Omit the `imagePullPolicy` and use `:latest` as the tag for the image to use;
  Kubernetes will set the policy to `Always` when you submit the Pod.
- Omit the `imagePullPolicy` and the tag for the image to use;
  Kubernetes will set the policy to `Always` when you submit the Pod.
- Enable the AlwaysPullImages
  admission controller.

### ImagePullBackOff

When a kubelet starts creating containers for a Pod using a container runtime,
it might be possible the container is in Waiting
state because of `ImagePullBackOff`.

The status `ImagePullBackOff` means that a container could not start because Kubernetes
could not pull a container image (for reasons such as invalid image name, or pulling
from a private registry without `imagePullSecret`). The `BackOff` part indicates
that Kubernetes will keep trying to pull the image, with an increasing back-off delay.

Kubernetes raises the delay between each attempt until it reaches a compiled-in limit,
which is 300 seconds (5 minutes).

### Image pull per runtime class

**Feature state:**
Kubernetes includes alpha support for performing image pulls based on the RuntimeClass of a Pod.

If you enable the `RuntimeClassInImageCriApi` feature gate,
the kubelet references container images by a tuple of image name and runtime handler
rather than just the image name or digest. Your
container runtime
may adapt its behavior based on the selected runtime handler.
Pulling images based on runtime class is useful for VM-based containers, such as
Windows Hyper-V containers.

## Serial and parallel image pulls

By default, the kubelet pulls images serially. In other words, the kubelet sends
only one image pull request to the image service at a time. Other image pull
requests have to wait until the one being processed is complete.

Nodes make image pull decisions in isolation. Even when you use serialized image
pulls, two different nodes can pull the same image in parallel.

If you would like to enable parallel image pulls, you can set the field
`serializeImagePulls` to false in the kubelet configuration.
With `serializeImagePulls` set to false, image pull requests will be sent to the image service immediately,
and multiple images will be pulled at the same time.

When enabling parallel image pulls, ensure that the image service of your container
runtime can handle parallel image pulls.

The kubelet never pulls multiple images in parallel on behalf of one Pod. For example,
if you have a Pod that has an init container and an application container, the image
pulls for the two containers will not be parallelized. However, if you have two
Pods that use different images, and the parallel image pull feature is enabled,
the kubelet will pull the images in parallel on behalf of the two different Pods.

### Maximum parallel image pulls

**Feature state:** v1.35 [stable]

When `serializeImagePulls` is set to false, the kubelet defaults to no limit on
the maximum number of images being pulled at the same time. If you would like to
limit the number of parallel image pulls, you can set the field `maxParallelImagePulls`
in the kubelet configuration. With `maxParallelImagePulls` set to _n_, only _n_
images can be pulled at the same time, and any image pull beyond _n_ will have to
wait until at least one ongoing image pull is complete.

Limiting the number of parallel image pulls prevents image pulling from consuming
too much network bandwidth or disk I/O, when parallel image pulling is enabled.

You can set `maxParallelImagePulls` to a positive number that is greater than or
equal to 1. If you set `maxParallelImagePulls` to be greater than or equal to 2,
you must set `serializeImagePulls` to false. The kubelet will fail to start
with an invalid `maxParallelImagePulls` setting.

## Multi-architecture images with image indexes

As well as providing binary images, a container registry can also serve a
container image index.
An image index can point to multiple image manifests
for architecture-specific versions of a container. The idea is that you can have
a name for an image (for example: `pause`, `example/mycontainer`, `kube-apiserver`)
and allow different systems to fetch the right binary image for the machine
architecture they are using.

The Kubernetes project typically creates container images for its releases with
names that include the suffix `-$(ARCH)`. For backward compatibility, generate
older images with suffixes. For instance, an image named as `pause` would be a
multi-architecture image containing manifests for all supported architectures,
while `pause-amd64` would be a backward-compatible version for older configurations,
or for YAML files with hardcoded image names containing suffixes.
