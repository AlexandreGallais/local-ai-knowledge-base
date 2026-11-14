# Official documentation of containers

1. When your memory of containers is not sure, look it up with the `containers-official-docs` server: `search_docs`, then `read_doc` on one section.
2. It holds Docker (the Dockerfile reference, the manuals of Docker Engine, Build and Compose, the reference of every docker command), Podman (every podman command, Containerfile, pods, Quadlet), the Compose Specification, the Development Containers specification and the OCI specifications (image, runtime, distribution).
3. Search an instruction of a Dockerfile by its name, as `HEALTHCHECK`, and a command with its words, as `podman run publish`.
4. Podman and Docker share most commands and the Containerfile format: when the project uses Podman, read the Podman page of the command.
5. For `devcontainer.json`, read the Development Containers specification (`devcontainers-spec`).
6. Read one section at a time. Never read the folder `.agents/mcp/containers-official-docs/library/` by hand.
