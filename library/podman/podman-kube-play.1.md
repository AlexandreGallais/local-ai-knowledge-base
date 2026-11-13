---
title: "podman-kube-play.1 (part 1 of 3)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-kube-play.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-kube-play.1

% podman-kube-play 1

## NAME
podman-kube-play - Create containers, pods and volumes based on Kubernetes YAML

## SYNOPSIS
**podman kube play** [*options*] *file.yml|-|https://website.io/file.yml*

## DESCRIPTION
**podman kube play** reads in a structured file of Kubernetes YAML.  It recreates the containers, pods, or volumes described in the YAML.  Containers within a pod are then started, and the ID of the new Pod or the name of the new Volume is output. If the YAML file is specified as "-", then `podman kube play` reads the YAML file from stdin.
The input can also be a URL that points to a YAML file such as https://podman.io/demo.yml. `podman kube play` reads the YAML from the URL and create pods and containers from it.

Using the `--down` command line option, it is also capable of tearing down the pods created by a previous run of `podman kube play`.

Using the `--replace` command line option, it tears down the pods(if any) created by a previous run of `podman kube play` and recreate the pods with the Kubernetes YAML file.

Ideally the input file is created by the Podman command (see podman-kube-generate(1)).  This guarantees a smooth import and expected results.

Currently, the supported Kubernetes kinds are:

- Pod
- Deployment
- PersistentVolumeClaim
- ConfigMap
- Secret
- DaemonSet
- Job

`Kubernetes Pods or Deployments`

Only five volume types are supported by kube play, the *hostPath*, *emptyDir*, *configMap*, *persistentVolumeClaim*, and *image* volume types.

- When using the *hostPath* volume type, only the  *default (empty)*, *DirectoryOrCreate*, *Directory*, *FileOrCreate*, *File*, *Socket*, *CharDevice* and *BlockDevice* subtypes are supported. Podman interprets the value of *hostPath* *path* as a file path when it contains at least one forward slash, otherwise Podman treats the value as the name of a named volume.
- When using a *persistentVolumeClaim*, the value for *claimName* is the name for the Podman named volume.
- When using an *emptyDir* volume, Podman creates an anonymous volume that is attached the containers running inside the pod and is deleted once the pod is removed.
- When using an *configMap* volume, Podman creates an anonymous volume that is attached the containers running inside the pod and is deleted once the pod is removed.
- When using an *image* volume, Podman creates a read-only image volume with an empty subpath (the whole image is mounted). The image must already exist locally. It is supported in rootful mode only.

Note: The default restart policy for containers is `always`.  You can change the default by setting the `restartPolicy` field in the spec.

Note: When playing a kube YAML with init containers, the init container is created with init type value `once`. To change the default type, use the `io.podman.annotations.init.container.type` annotation to set the type to `always`.

Note: *hostPath* volume types created by kube play is given an SELinux shared label (z), bind mounts are not relabeled (use `chcon -t container_file_t -R <directory>`).

Note: To set userns of a pod, use the **io.podman.annotations.userns** annotation in the pod/deployment definition. For example, **io.podman.annotations.userns=keep-id** annotation tells Podman to create a user namespace where the current rootless user's UID:GID are mapped to the same values in the container. This can be overridden with the `--userns` flag.

Note: Use the **io.podman.annotations.volumes-from** annotation to bind mount volumes of one container to another. You can mount volumes from multiple source containers to a target container. The source containers that belong to the same pod must be defined before the source container in the kube YAML. The annotation format is `io.podman.annotations.volumes-from/targetContainer: "sourceContainer1:mountOpts1;sourceContainer2:mountOpts2"`.

Note: If the `:latest` tag is used, Podman attempts to pull the image from a registry. If the image was built locally with Podman or Buildah, it has `localhost` as the domain, in that case, Podman uses the image from the local store even if it has the `:latest` tag.

Note: The command `podman play kube` is an alias of `podman kube play`, and performs the same function.

Note: The command `podman kube down` can be used to stop and remove pods or containers based on the same Kubernetes YAML used
by `podman kube play` to create them.

Note: To customize the name of the infra container created during `podman kube play`, use the **io.podman.annotations.infra.name** annotation in the pod definition. This annotation is automatically set when generating a kube yaml from a pod that was created with the `--infra-name` flag set.

Note: Use the **io.podman.annotations.pids-limit/$ctrname** annotation to configure the pod's pids limit.

Note: Use the **io.podman.annotations.cpuset/$ctrname** annotation to restrict a container's execution to a specific set of CPU cores. This is equivalent to the `--cpuset-cpus=number` option in podman-run(1).

Note: Use the **io.podman.annotations.memory-nodes/$ctrname** annotation to restrict a container's memory allocations to a specific set of memory nodes on NUMA systems. This is equivalent to the `--cpuset-mems=nodes` option in podman-run(1).

`Kubernetes PersistentVolumeClaims`

A Kubernetes PersistentVolumeClaim represents a Podman named volume. Only the PersistentVolumeClaim name is required by Podman to create a volume. Kubernetes annotations can be used to make use of the available options for Podman volumes.

- volume.podman.io/driver
- volume.podman.io/device
- volume.podman.io/type
- volume.podman.io/uid
- volume.podman.io/gid
- volume.podman.io/mount-options
- volume.podman.io/import-source
- volume.podman.io/image

Use `volume.podman.io/import-source` to import the contents of the tarball (.tar, .tar.gz, .tgz, .bzip, .tar.xz, .txz, .tar.zst) specified in the annotation's value into the created Podman volume

Kube play is capable of building images on the fly given the correct directory layout and Containerfiles. This
option is not available for remote clients, including Mac and Windows (excluding WSL2) machines, yet. Consider the following excerpt from a YAML file:
```
apiVersion: v1
kind: Pod
metadata:
...
spec:
  containers:
  - name: container
    image: foobar
...
```

If there is a directory named `foobar` in the current working directory with a file named `Containerfile` or `Dockerfile`,
Podman kube play builds that image and name it `foobar`.  An example directory structure for this example looks
like:
```
|- mykubefiles
    |- myplayfile.yaml
    |- foobar
         |- Containerfile
```

The build considers `foobar` to be the context directory for the build. If there is an image in local storage
called `foobar`, the image is not built unless the `--build` flag is used. Use `--build=false` to completely
disable builds.

Kube play supports CDI (Container Device Interface) device selectors to share
host devices (e.g. GPUs) with containers. The configuration format follows
Kubernetes extended resource management:
```
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: container
    resources:
      limits:
        nvidia.com/gpu=all: 1
```

To enable sharing host devices, analogous to using the `--device` flag Podman
kube supports a custom CDI selector: `podman.io/device=<host device path>`.

`Kubernetes ConfigMap`

Kubernetes ConfigMap can be referred as a source of environment variables or volumes in Pods or Deployments.
ConfigMaps aren't a standalone object in Podman; instead, when a container uses a ConfigMap, Podman creates environment variables or volumes as needed.

For example, the following YAML document defines a ConfigMap and then uses it in a Pod:

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: foo
data:
    FOO: bar
---
apiVersion: v1
kind: Pod
metadata:
  name: foobar
spec:
  containers:
  - name: container-1
    image: foobar
    envFrom:
    - configMapRef:
        name: foo
        optional: false
```

and as a result environment variable `FOO` is set to `bar` for container `container-1`.

`Kubernetes Secret`

Kubernetes Secret represents a Podman named secret. The Kubernetes Secret is saved as a whole and may be referred to as a source of environment variables or volumes in Pods or Deployments.

For example, the following YAML document defines a Secret and then uses it in a Pod:

```
kind: Secret
apiVersion: v1
metadata:
  name: foo
data:
  foo: YmFy # base64 for bar
---
apiVersion: v1
kind: Pod
metadata:
  name: foobar
spec:
  containers:
  - name: container-1
    image: foobar
    env:
    - name: FOO
      valueFrom:
        secretKeyRef:
          name: foo
          key: foo
```

and as a result environment variable `FOO` is set to `bar` for container `container-1`.

`Automounting Volumes (deprecated)`

Note: The automounting annotation is deprecated. Kubernetes has native support for image volumes and that should be used rather than this podman-specific annotation.

An image can be automatically mounted into a container if the annotation `io.podman.annotations.kube.image.automount/$ctrname` is given. The following rules apply:

- The image must already exist locally.
- The image must have at least 1 volume directive.
- The path given by the volume directive will be mounted from the image into the container. For example, an image with a volume at `/test/test_dir` will have `/test/test_dir` in the image mounted to `/test/test_dir` in the container.
- Multiple images can be specified. If multiple images have a volume at a specific path, the last image specified trumps.
- The images are always mounted read-only.
- Images to mount are defined in the annotation "io.podman.annotations.kube.image.automount/$ctrname" as a semicolon-separated list. They are mounted into a single container in the pod, not the whole pod. The annotation can be specified for additional containers if additional mounts are required.
