---
title: "Docker Engine prior releases (part 1 of 13)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/release-notes/prior-releases.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Engine prior releases

## 1.13.1 (2017-02-08)

> **Important:**
>
> On Linux distributions where `devicemapper` was the default storage driver, the `overlay2`, or `overlay` is now used by default (if the kernel supports it). To use devicemapper, you can manually configure the storage driver to use through the `--storage-driver` daemon option, or by setting "storage-driver" in the `daemon.json` configuration file.

> **Important:**
>
> In Docker 1.13, the managed plugin api changed, as compared to the experimental version introduced in Docker 1.12. You must **uninstall** plugins which you installed with Docker 1.12 _before_ upgrading to Docker 1.13. You can uninstall plugins using the `docker plugin rm` command.

If you have already upgraded to Docker 1.13 without uninstalling
previously-installed plugins, you may see this message when the Docker daemon
starts:

    Error starting daemon: json: cannot unmarshal string into Go value of type types.PluginEnv

To manually remove all plugins and resolve this problem, take the following steps:

1. Remove plugins.json from: `/var/lib/docker/plugins/`.
2. Restart Docker. Verify that the Docker daemon starts with no errors.
3. Reinstall your plugins.

### Contrib

* Do not require a custom build of tini #28454
* Upgrade to Go 1.7.5 #30489

### Remote API (v1.26) & Client

+ Support secrets in docker stack deploy with compose file #30144

### Runtime

* Fix size issue in `docker system df` #30378
* Fix error on `docker inspect` when Swarm certificates were expired. #29246
* Fix deadlock on v1 plugin with activate error #30408
* Fix SELinux regression #30649

### Plugins

* Support global scoped network plugins (v2) in swarm mode #30332
+ Add `docker plugin upgrade` #29414

### Windows

* Fix small regression with old plugins in Windows #30150
* Fix warning on Windows #30730
