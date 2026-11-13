---
title: "Go language-specific guide (part 3 of 7)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/guides/golang.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Go language-specific guide (part 3 of 7)

### Tag images

An image name is made up of slash-separated name components. Name components may
contain lowercase letters, digits, and separators. A separator is defined as a
period, one or two underscores, or one or more dashes. A name component may not
start or end with a separator.

An image is made up of a manifest and a list of layers. In simple terms, a tag
points to a combination of these artifacts. You can have multiple tags for the
image and, in fact, most images have multiple tags. Create a second tag
for the image you built and take a look at its layers.

Use the `docker image tag` (or `docker tag` shorthand) command to create a new
tag for your image. This command takes two arguments; the first argument is the
source image, and the second is the new tag to create. The following command
creates a new `docker-gs-ping:v1.0` tag for the `docker-gs-ping:latest` you
built:

```console
$ docker image tag docker-gs-ping:latest docker-gs-ping:v1.0
```

The Docker `tag` command creates a new tag for the image. It doesn't create a
new image. The tag points to the same image and is another way to reference
the image.

Now run the `docker image ls` command again to see the updated list of local
images:

```console
$ docker image ls

REPOSITORY                       TAG       IMAGE ID       CREATED         SIZE
docker-gs-ping                   latest    7f153fbcc0a8   6 minutes ago   1.11GB
docker-gs-ping                   v1.0      7f153fbcc0a8   6 minutes ago   1.11GB
...
```

You can see that you have two images that start with `docker-gs-ping`. You know
they're the same image because if you look at the `IMAGE ID` column, you can
see that the values are the same for the two images. This value is a unique
identifier Docker uses internally to identify the image.

Remove the tag that you just created. To do this, you’ll use the
`docker image rm` command, or the shorthand `docker rmi` (which stands for
"remove image"):

```console
$ docker image rm docker-gs-ping:v1.0
Untagged: docker-gs-ping:v1.0
```

Notice that the response from Docker tells you that the image hasn't been
removed but only untagged.

Verify this by running the following command:

```console
$ docker image ls
```

You will see that the tag `v1.0` is no longer in the list of images kept by your Docker instance.

```text
REPOSITORY                       TAG       IMAGE ID       CREATED         SIZE
docker-gs-ping                   latest    7f153fbcc0a8   7 minutes ago   1.11GB
...
```

The tag `v1.0` has been removed but you still have the `docker-gs-ping:latest`
tag available on your machine, so the image is there.

### Multi-stage builds

You may have noticed that your `docker-gs-ping` image weighs in at over a
gigabyte, which is a lot for a tiny compiled Go application. You may also be
wondering what happened to the full suite of Go tools, including the compiler,
after you had built your image.

The answer is that the full toolchain is still there, in the container image.
Not only this is inconvenient because of the large file size, but it may also
present a security risk when the container is deployed.

These two issues can be solved by using multi-stage builds.

In a nutshell, a multi-stage build can carry over the artifacts from one build stage into another,
and every build stage can be instantiated from a different base image.

Thus, in the following example, you are going to use a full-scale official Go
image to build your application. Then you'll copy the application binary into
another image whose base is very lean and doesn't include the Go toolchain or
other optional components.

The `Dockerfile.multistage` in the sample application's repository has the
following content:

```dockerfile
# syntax=docker/dockerfile:1

# Build the application from source
FROM golang:1.19 AS build-stage

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY *.go ./

RUN CGO_ENABLED=0 GOOS=linux go build -o /docker-gs-ping

# Run the tests in the container
FROM build-stage AS run-test-stage
RUN go test -v ./...

# Deploy the application binary into a lean image
FROM gcr.io/distroless/base-debian12 AS build-release-stage

WORKDIR /

COPY --from=build-stage /docker-gs-ping /docker-gs-ping

EXPOSE 8080

USER nonroot:nonroot

ENTRYPOINT ["/docker-gs-ping"]
```

Since you have two Dockerfiles now, you have to tell Docker what Dockerfile
you'd like to use to build the image. Tag the new image with `multistage`. This
tag (like any other, apart from `latest`) has no special meaning for Docker,
it's something you chose.

```console
$ docker build -t docker-gs-ping:multistage -f Dockerfile.multistage .
```

Comparing the sizes of `docker-gs-ping:multistage` and `docker-gs-ping:latest`
you see a few orders-of-magnitude difference.

```console
$ docker image ls
REPOSITORY       TAG          IMAGE ID       CREATED              SIZE
docker-gs-ping   multistage   e3fdde09f172   About a minute ago   28.1MB
docker-gs-ping   latest       336a3f164d0f   About an hour ago    1.11GB
```

This is so because the "distroless"
base image that you have used in the second stage of the build is very barebones and is designed for lean deployments of static binaries.

There's much more to multi-stage builds, including the possibility of multi-architecture builds,
so feel free to check out multi-stage builds. This is, however, not essential for your progress here.
