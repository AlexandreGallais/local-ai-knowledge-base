---
name: compose-stacks
description: "Runs side services for development and tests (database, broker, mock API) with podman compose or podman kube play. Use when a project has a compose.yaml, docker-compose.yml or a Kubernetes YAML for local services, when tests need a database or a broker, or when a service of the stack does not start."
metadata:
  id: CTR-05
  stars: "3"
  nature: reference
  mode: B
  wave: V2
  load: auto
---

# Compose stacks

**Core rule:** start only the services the task needs, wait until each is healthy, and stop them when done.

## Procedure

1. Read the stack file: services, ports, volumes, healthchecks (`compose.yaml` or `docker-compose.yml`).
   - Check: you know which service the task needs and its port.
2. Start it: `podman compose up -d <service>`.
   - Check: `podman compose ps` shows it running.
3. Wait for healthy: `podman inspect --format '{{.State.Health.Status}}' <container>` until `healthy`, or poll its port.
   - Check: the status is `healthy`, or the port answers.
4. Run the task (tests, app) against it.
   - Check: the task passes.
5. Stop it: `podman compose down` (add `-v` only with a yes: it deletes the data volumes).
   - Check: `podman compose ps` is empty.

| Docker Compose habit | With Podman |
| --- | --- |
| `docker compose up` | `podman compose up` |
| bind mount `./data:/data` | `./data:/data:Z` |
| `network_mode: host` | avoid; publish ports instead |
| Kubernetes YAML | `podman kube play <file>.yaml`, `podman kube down <file>.yaml` |

## This installation

<!-- FILL: what=compose provider behind podman compose; find=podman compose version; verify=podman compose up -d on a one-service file starts it -->

<!-- FILL: what=images of the side services and their internal registry; find=grep -n 'image:' compose*.y*ml docker-compose*.y*ml; verify=podman pull of each image succeeds -->

## Stop and ask the human if

- A service needs data or credentials you do not have.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Start the whole stack." | Start what the task needs; the rest costs memory and time. |
| "`down -v` to reset." | It deletes data volumes. Ask first. |

## Definition of done

- [ ] Needed services healthy before use; stopped afterwards.

## Local completion checklist

- [ ] Compose provider
- [ ] Side-service images
