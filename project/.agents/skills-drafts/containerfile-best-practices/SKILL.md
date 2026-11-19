---
name: containerfile-best-practices
description: "Writes Containerfiles and Dockerfiles that build fast and run safely - multi-stage builds, layer order for cache, non-root user, minimal base images (UBI, Fedora). Use when creating or editing a Containerfile or Dockerfile, when an image is too big or slow to build, or when a container runs as root."
metadata:
  id: CTR-04
  stars: "4"
  nature: reference
  mode: B
  wave: V2
  load: auto
---

# Containerfile best practices

**Core rule:** build in one stage and ship only the runtime in a minimal image, as a non-root user, with dependency layers before source layers.

## Procedure

1. Start from the team's approved base image (below), pinned by tag or digest.
   - Check: `FROM` lines use an image from the internal registry with an explicit tag.
2. Order layers: system packages, then dependency manifests and install, then source, then build.
   - Check: changing one source file rebuilds only the last layers (`podman build` shows cache hits).
3. Use a multi-stage build: build tools in the first stage, copy only the result to the runtime stage.
   - Check: `podman image ls` shows the final image much smaller than the build stage.
4. Run as non-root: create or use a user, `USER <uid>`.
   - Check: `podman run --rm <image> id -u` prints a non-zero UID.
5. Add a `.containerignore` (or `.dockerignore`) for `.git`, build output, dependency folders and `.env`.
   - Check: the build context is small (`podman build` prints its size).
6. Add `HEALTHCHECK` when the image runs a service; confirm its syntax in `containers-official-docs`.
   - Check: `podman inspect` shows the healthcheck.

## This installation

<!-- FILL: what=approved base images and their registry path; find=grep -rn '^FROM' --include='Containerfile*' --include='Dockerfile*' . and ask the team list; verify=podman pull <image> succeeds -->

<!-- FILL: what=how packages are installed inside images through the mirror; find=grep -rn -E 'dnf|microdnf|npm ci|pip install' Containerfile*; verify=a build with the network limited to internal mirrors succeeds -->

## Stop and ask the human if

- The image needs a base outside the approved list, or root at run time.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "`COPY . .` first." | Any change busts the dependency cache. Copy manifests first. |
| "`latest` is fine." | Builds stop being reproducible. Pin the tag. |

## Definition of done

- [ ] Approved pinned base; multi-stage; non-root; ignore file; healthcheck for services.
- [ ] Image builds and runs; size and UID checked.

## Local completion checklist

- [ ] Approved base images
- [ ] Package installation through the mirror
