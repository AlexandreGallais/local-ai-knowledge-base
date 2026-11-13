---
title: "Restart service when sleep finishes (part 1 of 11)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-systemd.unit.5.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

% podman-systemd.unit 5

## NAME

podman\-systemd.unit - systemd units using Podman Quadlet

## SYNOPSIS

*name*.artifact, *name*.build, *name*.container, *name*.image, *name*.kube, *name*.network, *name*.pod, *name*.volume

- **`.build`** — Builds a container image from a Containerfile. See podman-build.unit(5).
- **`.container`** — Defines and manages a single container. See podman-container.unit(5).
- **`.image`** — Pulls and caches a container image. See podman-image.unit(5).
- **`.kube`** — Deploys containers from Kubernetes YAML using podman-kube.unit(5).
- **`.network`** — Creates a Podman network for containers and pods. See podman-network.unit(5).
- **`.pod`** — Creates a Podman pod that containers can join. See podman-pod.unit(5).
- **`.volume`** — Ensures a named Podman volume exists. See podman-volume.unit(5).

### Podman rootful unit search path

Quadlet files for the root user can be placed in the following directories ordered in precedence. Meaning duplicate named quadlets found under /run take precedence over ones in /etc, as well as those in /usr:

Temporary quadlets, usually used for testing:

* /run/containers/systemd/

System administrator's defined quadlets:

* /etc/containers/systemd/

Distribution defined quadlets:

* /usr/share/containers/systemd/

### Podman rootless unit search path

Quadlet files for non-root users can be placed in the following directories:

 * $XDG_RUNTIME_DIR/containers/systemd/
 * $XDG_CONFIG_HOME/containers/systemd/ or ~/.config/containers/systemd/
 * /etc/containers/systemd/users/${UID}
 * /etc/containers/systemd/users/
 * /usr/share/containers/systemd/users/${UID}
 * /usr/share/containers/systemd/users/

### Using symbolic links

Quadlet supports using symbolic links for the base of the search paths and inside them.
