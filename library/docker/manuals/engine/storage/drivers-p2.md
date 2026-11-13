---
title: "Storage drivers (part 2 of 3)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/storage/drivers/_index.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Storage drivers (part 2 of 3)

## The copy-on-write (CoW) strategy

Copy-on-write is a strategy of sharing and copying files for maximum efficiency.
If a file or directory exists in a lower layer within the image, and another
layer (including the writable layer) needs read access to it, it just uses the
existing file. The first time another layer needs to modify the file (when
building the image or running the container), the file is copied into that layer
and modified. This minimizes I/O and the size of each of the subsequent layers.
These advantages are explained in more depth below.

### Sharing promotes smaller images

When you use `docker pull` to pull down an image from a repository, or when you
create a container from an image that doesn't yet exist locally, each layer is
pulled down separately, and stored in Docker's local storage area, which is
usually `/var/lib/docker/` on Linux hosts. You can see these layers being pulled
in this example:

```console
$ docker pull ubuntu:22.04
22.04: Pulling from library/ubuntu
f476d66f5408: Pull complete
8882c27f669e: Pull complete
d9af21273955: Pull complete
f5029279ec12: Pull complete
Digest: sha256:6120be6a2b7ce665d0cbddc3ce6eae60fe94637c6a66985312d1f02f63cc0bcd
Status: Downloaded newer image for ubuntu:22.04
docker.io/library/ubuntu:22.04
```

Each of these layers is stored in its own directory inside the Docker host's
local storage area. To examine the layers on the filesystem, list the contents
of `/var/lib/docker/<storage-driver>`. This example uses the `overlay2`
storage driver:

```console
$ ls /var/lib/docker/overlay2
16802227a96c24dcbeab5b37821e2b67a9f921749cd9a2e386d5a6d5bc6fc6d3
377d73dbb466e0bc7c9ee23166771b35ebdbe02ef17753d79fd3571d4ce659d7
3f02d96212b03e3383160d31d7c6aeca750d2d8a1879965b89fe8146594c453d
ec1ec45792908e90484f7e629330666e7eee599f08729c93890a7205a6ba35f5
l
```

The directory names don't correspond to the layer IDs.

Now imagine that you have two different Dockerfiles. You use the first one to
create an image called `acme/my-base-image:1.0`.

```dockerfile
# syntax=docker/dockerfile:1
FROM alpine
RUN apk add --no-cache bash
```

The second one is based on `acme/my-base-image:1.0`, but has some additional
layers:

```dockerfile
# syntax=docker/dockerfile:1
FROM acme/my-base-image:1.0
COPY . /app
RUN chmod +x /app/hello.sh
CMD /app/hello.sh
```

The second image contains all the layers from the first image, plus new layers
created by the `COPY` and `RUN` instructions, and a read-write container layer.
Docker already has all the layers from the first image, so it doesn't need to
pull them again. The two images share any layers they have in common.

If you build images from the two Dockerfiles, you can use `docker image ls` and
`docker image history` commands to verify that the cryptographic IDs of the shared
layers are the same.

1. Make a new directory `cow-test/` and change into it.

2. Within `cow-test/`, create a new file called `hello.sh` with the following contents.

   ```bash
   #!/usr/bin/env bash
   echo "Hello world"
   ```

3. Copy the contents of the first Dockerfile above into a new file called
   `Dockerfile.base`.

4. Copy the contents of the second Dockerfile above into a new file called
   `Dockerfile`.

5. Within the `cow-test/` directory, build the first image. Don't forget to
   include the final `.` in the command. That sets the `PATH`, which tells
   Docker where to look for any files that need to be added to the image.

   ```console
   $ docker build -t acme/my-base-image:1.0 -f Dockerfile.base .
   [+] Building 6.0s (11/11) FINISHED
   => [internal] load build definition from Dockerfile.base                                      0.4s
   => => transferring dockerfile: 116B                                                           0.0s
   => [internal] load .dockerignore                                                              0.3s
   => => transferring context: 2B                                                                0.0s
   => resolve image config for docker.io/docker/dockerfile:1                                     1.5s
   => [auth] docker/dockerfile:pull token for registry-1.docker.io                               0.0s
   => CACHED docker-image://docker.io/docker/dockerfile:1@sha256:9e2c9eca7367393aecc68795c671... 0.0s
   => [internal] load .dockerignore                                                              0.0s
   => [internal] load build definition from Dockerfile.base                                      0.0s
   => [internal] load metadata for docker.io/library/alpine:latest                               0.0s
   => CACHED [1/2] FROM docker.io/library/alpine                                                 0.0s
   => [2/2] RUN apk add --no-cache bash                                                          3.1s
   => exporting to image                                                                         0.2s
   => => exporting layers                                                                        0.2s
   => => writing image sha256:da3cf8df55ee9777ddcd5afc40fffc3ead816bda99430bad2257de4459625eaa   0.0s
   => => naming to docker.io/acme/my-base-image:1.0                                              0.0s
   ```

6. Build the second image.

   ```console
   $ docker build -t acme/my-final-image:1.0 -f Dockerfile .

   [+] Building 3.6s (12/12) FINISHED
   => [internal] load build definition from Dockerfile                                            0.1s
   => => transferring dockerfile: 156B                                                            0.0s
   => [internal] load .dockerignore                                                               0.1s
   => => transferring context: 2B                                                                 0.0s
   => resolve image config for docker.io/docker/dockerfile:1                                      0.5s
   => CACHED docker-image://docker.io/docker/dockerfile:1@sha256:9e2c9eca7367393aecc68795c671...  0.0s
   => [internal] load .dockerignore                                                               0.0s
   => [internal] load build definition from Dockerfile                                            0.0s
   => [internal] load metadata for docker.io/acme/my-base-image:1.0                               0.0s
   => [internal] load build context                                                               0.2s
   => => transferring context: 340B                                                               0.0s
   => [1/3] FROM docker.io/acme/my-base-image:1.0                                                 0.2s
   => [2/3] COPY . /app                                                                           0.1s
   => [3/3] RUN chmod +x /app/hello.sh                                                            0.4s
   => exporting to image                                                                          0.1s
   => => exporting layers                                                                         0.1s
   => => writing image sha256:8bd85c42fa7ff6b33902ada7dcefaaae112bf5673873a089d73583b0074313dd    0.0s
   => => naming to docker.io/acme/my-final-image:1.0                                              0.0s
   ```

7. Check out the sizes of the images.

   ```console
   $ docker image ls

   REPOSITORY             TAG     IMAGE ID         CREATED               SIZE
   acme/my-final-image    1.0     8bd85c42fa7f     About a minute ago    7.75MB
   acme/my-base-image     1.0     da3cf8df55ee     2 minutes ago         7.75MB
   ```

8. Check out the history of each image.

   ```console
   $ docker image history acme/my-base-image:1.0

   IMAGE          CREATED         CREATED BY                                      SIZE      COMMENT
   da3cf8df55ee   5 minutes ago   RUN /bin/sh -c apk add --no-cache bash # bui…   2.15MB    buildkit.dockerfile.v0
   <missing>      7 weeks ago     /bin/sh -c #(nop)  CMD ["/bin/sh"]              0B
   <missing>      7 weeks ago     /bin/sh -c #(nop) ADD file:f278386b0cef68136…   5.6MB
   ```

   Some steps don't have a size (`0B`), and are metadata-only changes, which do
   not produce an image layer and don't take up any size, other than the metadata
   itself. The output above shows that this image consists of 2 image layers.

   ```console
   $ docker image history  acme/my-final-image:1.0

   IMAGE          CREATED         CREATED BY                                      SIZE      COMMENT
   8bd85c42fa7f   3 minutes ago   CMD ["/bin/sh" "-c" "/app/hello.sh"]            0B        buildkit.dockerfile.v0
   <missing>      3 minutes ago   RUN /bin/sh -c chmod +x /app/hello.sh # buil…   39B       buildkit.dockerfile.v0
   <missing>      3 minutes ago   COPY . /app # buildkit                          222B      buildkit.dockerfile.v0
   <missing>      4 minutes ago   RUN /bin/sh -c apk add --no-cache bash # bui…   2.15MB    buildkit.dockerfile.v0
   <missing>      7 weeks ago     /bin/sh -c #(nop)  CMD ["/bin/sh"]              0B
   <missing>      7 weeks ago     /bin/sh -c #(nop) ADD file:f278386b0cef68136…   5.6MB
   ```

   Notice that all steps of the first image are also included in the final
   image. The final image includes the two layers from the first image, and
   two layers that were added in the second image.

   The `<missing>` lines in the `docker history` output indicate that those
   steps were either built on another system and part of the `alpine` image
   that was pulled from Docker Hub, or were built with BuildKit as builder.
   Before BuildKit, the "classic" builder would produce a new "intermediate"
   image for each step for caching purposes, and the `IMAGE` column would show
   the ID of that image.

   BuildKit uses its own caching mechanism, and no longer requires intermediate
   images for caching. Refer to BuildKit
   to learn more about other enhancements made in BuildKit.

9. Check out the layers for each image

   Use the `docker image inspect` command to view the cryptographic IDs of the
   layers in each image:

   ```console
   $ docker image inspect --format "{{json .RootFS.Layers}}" acme/my-base-image:1.0
   [
     "sha256:72e830a4dff5f0d5225cdc0a320e85ab1ce06ea5673acfe8d83a7645cbd0e9cf",
     "sha256:07b4a9068b6af337e8b8f1f1dae3dd14185b2c0003a9a1f0a6fd2587495b204a"
   ]
   ```

   ```console
   $ docker image inspect --format "{{json .RootFS.Layers}}" acme/my-final-image:1.0
   [
     "sha256:72e830a4dff5f0d5225cdc0a320e85ab1ce06ea5673acfe8d83a7645cbd0e9cf",
     "sha256:07b4a9068b6af337e8b8f1f1dae3dd14185b2c0003a9a1f0a6fd2587495b204a",
     "sha256:cc644054967e516db4689b5282ee98e4bc4b11ea2255c9630309f559ab96562e",
     "sha256:e84fb818852626e89a09f5143dbc31fe7f0e0a6a24cd8d2eb68062b904337af4"
   ]
   ```

   Notice that the first two layers are identical in both images. The second
   image adds two additional layers. Shared image layers are only stored once
   in `/var/lib/docker/` and are also shared when pushing and pulling an image
   to an image registry. Shared image layers can therefore reduce network
   bandwidth and storage.

   > **Tip:**
   >
   > Format output of Docker commands with the `--format` option.
   >
   > The examples above use the `docker image inspect` command with the `--format`
   > option to view the layer IDs, formatted as a JSON array. The `--format`
   > option on Docker commands can be a powerful feature that allows you to
   > extract and format specific information from the output, without requiring
   > additional tools such as `awk` or `sed`. To learn more about formatting
   > the output of docker commands using the `--format` flag, refer to the
   > format command and log output section.
   > We also pretty-printed the JSON output using the `jq` utility
   > for readability.
