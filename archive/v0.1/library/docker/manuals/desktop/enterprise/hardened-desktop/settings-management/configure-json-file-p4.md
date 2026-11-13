---
title: "Configure Settings Management with a JSON file (part 4 of 4)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/enterprise/hardened-desktop/settings-management/configure-json-file.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Configure Settings Management with a JSON file (part 4 of 4)

### Enhanced Container Isolation

| Parameter                                                      | OS  | Description                                                                                                                                                                                                                                                                                                                                               | Version |
| :------------------------------------------------------------- | --- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `enhancedContainerIsolation`                                   |     | If `value` is set to true, Docker Desktop runs all containers as unprivileged, via the Linux user-namespace, prevents them from modifying sensitive configurations inside the Docker Desktop VM, and uses other advanced techniques to isolate them. For more information, see Enhanced Container Isolation. |         |
|        `dockerSocketMount`                 |     | By default, enhanced container isolation blocks bind-mounting the Docker Engine socket into containers (e.g., `docker run -v /var/run/docker.sock:/var/run/docker.sock ...`). This lets you relax this in a controlled way. See ECI Configuration for more info.                                             |         |
|               `imageList`   |     | Indicates which container images are allowed to bind-mount the Docker Engine socket.                                                                                                                                                                                                                                                                      |         |
|               `commandList` |     | Restricts the commands that containers can issue via the bind-mounted Docker Engine socket.                                                                                                                                                                                                                                                               |         |
