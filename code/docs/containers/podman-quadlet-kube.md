---
id: containers-podman-quadlet-kube
title: Podman Quadlet and kube play
topic: containers
summary: Run a container as a systemd service with Quadlet, and run a Kubernetes YAML locally with podman kube play.
tool: podman
version: "6"
checked: 2026-11-13
sources: [S1, S2]
license: MIT, written for this base from Apache 2.0 sources
variant: files
---

# Podman Quadlet and kube play

Contents: 1. Quadlet · 2. kube play · 3. Pitfalls · Sources

## 1. A container as a service (Podman Quadlet)

- A file `.container` (or `.volume`, `.network`, `.kube`, `.image`, `.build`, `.pod`) becomes a systemd service after `systemctl daemon-reload`. [S1]
- Folders: `/etc/containers/systemd/` for root, `~/.config/containers/systemd/` for a user. [S1]
- `api.container` gives the service `api.service`; the container is named `systemd-api`. [S1]
- The generated services are transient: `systemctl enable` does not apply. Start at boot with an `[Install]` section and `WantedBy=default.target`. [S1]
- Dry run of the generator: `/usr/lib/systemd/system-generators/podman-system-generator --user --dryrun`. [S1]
- Pulling an image can take longer than the 90 seconds systemd allows: set `TimeoutStartSec` or pull the image first. [S1]

```ini
# ~/.config/containers/systemd/api.container
[Container]
Image=registry.example.internal/api:1.4.0
PublishPort=8080:8080

[Service]
TimeoutStartSec=300

[Install]
WantedBy=default.target
```

## 2. A Kubernetes YAML on one machine (podman kube play)

- `podman kube play app.yaml` creates the containers, pods and volumes of the file; `--down` removes them; `--replace` creates them again. [S2]
- Kinds it handles: Pod, Deployment, PersistentVolumeClaim, ConfigMap, Secret, DaemonSet, Job. Service and Ingress are not handled. [S2]
- Fields it does not handle, among others: `imagePullSecrets`, `readinessProbe`, `startupProbe`. [S2]
- With the tag `:latest`, Podman tries to pull the image. [S2]
- It expects best a file made by `podman kube generate`. [S2]

`podman kube play` runs a Pod locally. It does not validate a manifest for a cluster: use `docs/kubernetes/validate-offline.md` for that.

## 3. Pitfalls (Quadlet and kube play)

- `systemctl enable api.service` for a Quadlet unit: it fails. Use the `[Install]` section.
- A short image name in `Image=`: write the full name with its registry.
- A Service or an Ingress in the file for `kube play`: Podman ignores them; publish ports in the Pod instead.

## Sources

- [S1] Podman, "podman-systemd.unit(5)", v6.1.0, <https://docs.podman.io/en/v6.1.0/markdown/podman-systemd.unit.5.html>, read 2026-11-12, Apache 2.0, summarized.
- [S2] Podman, "podman-kube-play(1)", <https://docs.podman.io/en/stable/markdown/podman-kube-play.1.html>, read 2026-11-12, Apache 2.0, summarized.
