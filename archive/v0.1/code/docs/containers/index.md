# containers index

One line per document. Open only the documents your task needs.

- [Dockerfile rules](docs/containers/dockerfile-rules.md): Rules with wrong and right examples for a Dockerfile that passes hadolint and the Docker build checks.
- [Dockerfile checks](docs/containers/dockerfile-checks.md): Run hadolint and the Docker build checks, read their messages, and fix each rule code.
- [.NET container images](docs/containers/dotnet-images.md): Image names, tags, non-root user, port 8080 and image publishing without a Dockerfile for .NET 10.
- [Angular container image](docs/containers/angular-image.md): Build an Angular application in a container and serve its browser folder with an unprivileged NGINX on port 8080.
- [Podman compared with Docker](docs/containers/podman-vs-docker.md): What changes with Podman, with full image names, rootless ports, pasta network, compose provider and registry mirrors.
- [Podman Quadlet and kube play](docs/containers/podman-quadlet-kube.md): Run a container as a systemd service with Quadlet, and run a Kubernetes YAML locally with podman kube play.
- [devcontainer.json properties and lifecycle](docs/containers/devcontainer-json.md): Where devcontainer.json lives, its useful properties, and the order of its lifecycle commands.
- [Run commands in a dev container](docs/containers/devcontainer-run.md): How the coding assistant runs commands in the dev container, the devcontainer CLI, and features without a registry.
- [Container problems and their causes](docs/containers/container-problems.md): Explain a container that does not start, cannot be reached, cannot pull or cannot write, with Docker or Podman.
