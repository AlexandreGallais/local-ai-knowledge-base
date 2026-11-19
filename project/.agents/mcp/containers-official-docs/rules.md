# Official documentation of containers

1. When your memory of containers is not sure, look it up with the `containers-official-docs` server: `search_docs`, then `read_doc` on one section.
2. It holds Docker (the Dockerfile reference, the manuals of Docker Engine, Build and Compose, every docker command), Podman (every podman command, Containerfile, pods, Quadlet) and its configuration files (`containers.conf`, `registries.conf`, `storage.conf`), Buildah, Skopeo, Podman Desktop, the Compose Specification, dev containers (the specification, VS Code, the reference features and images), x11docker, Distrobox, Toolbx and the OCI specifications.
3. Search an instruction of a Dockerfile by its name, as `HEALTHCHECK`, and a command with its words, as `podman run publish`.
4. Podman and Docker share most commands and the Containerfile format: when the project uses Podman, read the Podman page of the command.
5. For `devcontainer.json`, read the Development Containers specification (`devcontainers-spec`) and the VS Code pages (`vscode-devcontainers`).
6. To give a container the display, the sound or the GPU of the host (an Electron or Tauri application in a dev container), read x11docker, Distrobox and Toolbx: they say which sockets and devices to mount, as the Wayland or X11 socket and the PipeWire or PulseAudio socket.
7. Read one section at a time. Never read the folder `.agents/mcp/containers-official-docs/library/` by hand.
