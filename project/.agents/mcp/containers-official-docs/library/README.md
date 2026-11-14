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
| [compose-spec](compose-spec.index.md) | The Compose Specification: services, networks, volumes, configs, secrets, interpolation, merge | 2026-11 | Apache-2.0 | 28 files, 0.3 MB |
| [devcontainers-spec](devcontainers-spec.index.md) | The Development Containers specification: devcontainer.json, features, templates, lifecycle | 2026-11 | CC-BY-4.0 | 18 files, 0.2 MB |
| [oci-image-spec](oci-image-spec.index.md) | OCI Image Format Specification | 1.1 | Apache-2.0 | 14 files, 0.1 MB |
| [oci-runtime-spec](oci-runtime-spec.index.md) | OCI Runtime Specification | 1.3 | Apache-2.0 | 19 files, 0.2 MB |
| [oci-distribution-spec](oci-distribution-spec.index.md) | OCI Distribution Specification: pull, push and the registry API | 1.1 | Apache-2.0 | 7 files, 0.1 MB |
