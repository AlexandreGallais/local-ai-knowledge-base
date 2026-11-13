---
title: "Use a logging driver plugin"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/logging/plugins.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Use a logging driver plugin

Docker logging plugins allow you to extend and customize Docker's logging
capabilities beyond those of the built-in logging drivers.
A logging service provider can
implement their own plugins and make them
available on Docker Hub, or a private registry. This topic shows
how a user of that logging service can configure Docker to use the plugin.

## Install the logging driver plugin

To install a logging driver plugin, use `docker plugin install <org/image>`,
using the information provided by the plugin developer.

You can list all installed plugins using `docker plugin ls`, and you can inspect
a specific plugin using `docker inspect`.

## Configure the plugin as the default logging driver

When the plugin is installed, you can configure the Docker daemon to use it as
the default by setting the plugin's name as the value of the `log-driver`
key in the `daemon.json`, as detailed in the
logging overview. If the
logging driver supports additional options, you can set those as the values of
the `log-opts` array in the same file.

## Configure a container to use the plugin as the logging driver

After the plugin is installed, you can configure a container to use the plugin
as its logging driver by specifying the `--log-driver` flag to `docker run`, as
detailed in the
logging overview.
If the logging driver supports additional options, you can specify them using
one or more `--log-opt` flags with the option name as the key and the option
value as the value.
