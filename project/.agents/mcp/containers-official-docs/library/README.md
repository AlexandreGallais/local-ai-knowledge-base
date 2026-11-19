# Official documentation library

The official documentation of the tools, at a pinned version, as its authors wrote it: each file is
copied unchanged, in its own format. An API reference that lives in the comments of the source code
is taken from those comments. `<tool>.index.md` lists the files of each tool. The AI searches them
with the tools of the brick, then reads one section.

## Usage

From the root of the repository, with git and network access:

```sh
node scripts/fetch-library.ts                 # every tool
node scripts/fetch-library.ts --tool angular  # one tool, or a comma list
node scripts/check-library.ts                 # every file indexed, every license and notice
```

## Tools

| Tool | Documentation | Version | License | Size |
| --- | --- | --- | --- | --- |
| [dockerfile](dockerfile.index.md) | Dockerfile reference and the Dockerfile frontend of BuildKit: instructions, syntax, build checks | 0.35 | Apache-2.0 | 25 files, 0.2 MB |
| [docker-manuals](docker-manuals.index.md) | Docker manuals: Docker Engine (containers, networking, storage), Docker Build, Docker Compose | 2026-11 | Apache-2.0 | 298 files, 2.9 MB |
| [docker-cli](docker-cli.index.md) | Docker CLI reference: every docker command and its options | 29.9 | Apache-2.0 | 185 files, 1.1 MB |
| [podman](podman.index.md) | Podman: every podman command and its options, Containerfile, pods, Quadlet | 6.2 | Apache-2.0 | 506 files, 1.2 MB |
| [containers-common](containers-common.index.md) | The configuration files of Podman, Buildah and Skopeo: containers.conf (engine, network, mounts, environment of every container), containers-mounts.conf, Containerfile and .containerignore | 0.70 | Apache-2.0 | 5 files, 0.1 MB |
| [containers-image](containers-image.index.md) | The image configuration of Podman, Buildah and Skopeo: registries.conf (mirrors, search registries, insecure registries), policy.json, signatures, auth.json, certificates | 5.42 | Apache-2.0 | 10 files, 0.1 MB |
| [containers-storage](containers-storage.index.md) | The storage of Podman, Buildah and Skopeo: storage.conf (drivers, rootless storage, additional image stores) and the containers-storage commands | 1.65 | Apache-2.0 | 62 files, 0.1 MB |
| [buildah](buildah.index.md) | Buildah: building OCI images without a daemon, every buildah command (bud, from, run, commit, push...) and its options | 1.46 | Apache-2.0 | 41 files, 0.3 MB |
| [skopeo](skopeo.index.md) | Skopeo: inspecting, copying and syncing images between registries without pulling them, every skopeo command | 1.25 | Apache-2.0 | 12 files, 0.1 MB |
| [podman-desktop](podman-desktop.index.md) | Podman Desktop: installing and using it on Linux, Windows and macOS, Podman machines, Kubernetes, extensions, troubleshooting | 1.31 | Apache-2.0 | 125 files, 0.4 MB |
| [toolbx](toolbx.index.md) | Toolbx: development containers that share the user's home, display, sound and devices with the host, on Fedora and others (its manual pages) | 0.3 | Apache-2.0 | 10 files, 0.0 MB |
| [distrobox](distrobox.index.md) | Distrobox: any Linux distribution in a container that shares the home, the display (X11, Wayland), the sound and the devices of the host; usage, compatibility and tips | 1.8 | GPL-3.0-only | 28 files, 0.2 MB |
| [x11docker](x11docker.index.md) | x11docker: running graphical applications in containers with the display (X11 or Wayland), the sound (PulseAudio, ALSA), the GPU and the clipboard of the host, safely | 7.8 | MIT | 2 files, 0.1 MB |
| [vscode-devcontainers](vscode-devcontainers.index.md) | Dev containers in VS Code: creating a dev container, devcontainer.json reference, advanced containers (Podman, rootless, mounts, environment), the devcontainer CLI, tips and FAQ | main | CC-BY-3.0-US | 9 files, 0.2 MB |
| [devcontainers-site](devcontainers-site.index.md) | containers.dev: the implementors' guide of the Development Containers specification (features, templates, distribution, JSON reference) and its guides (Dockerfile, GitLab CI, prebuilds) | gh-pages | MIT | 15 files, 0.2 MB |
| [devcontainers-features](devcontainers-features.index.md) | The reference features of dev containers (desktop-lite, docker-in-docker, docker-outside-of-docker, node, rust, dotnet, java, python, powershell, git-lfs...): what each installs and its options | main | MIT | 56 files, 0.1 MB |
| [devcontainers-images](devcontainers-images.index.md) | The reference images of dev containers (base, universal, javascript-node, typescript-node, rust, dotnet, java, python, cpp...): what each holds and how to use it | main | MIT | 18 files, 0.1 MB |
| [compose-spec](compose-spec.index.md) | The Compose Specification: services, networks, volumes, configs, secrets, interpolation, merge | 2026-11 | Apache-2.0 | 28 files, 0.3 MB |
| [devcontainers-spec](devcontainers-spec.index.md) | The Development Containers specification: devcontainer.json, features, templates, lifecycle | 2026-11 | CC-BY-4.0 | 18 files, 0.2 MB |
| [oci-image-spec](oci-image-spec.index.md) | OCI Image Format Specification | 1.1 | Apache-2.0 | 14 files, 0.1 MB |
| [oci-runtime-spec](oci-runtime-spec.index.md) | OCI Runtime Specification | 1.3 | Apache-2.0 | 19 files, 0.2 MB |
| [oci-distribution-spec](oci-distribution-spec.index.md) | OCI Distribution Specification: pull, push and the registry API | 1.1 | Apache-2.0 | 7 files, 0.1 MB |
