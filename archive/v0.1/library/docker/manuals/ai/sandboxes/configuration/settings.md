---
title: "Docker Sandboxes settings (part 1 of 3)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes/configuration/settings.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Sandboxes settings

Use `sbx settings` to configure Docker Sandboxes on your host, including
clipboard access, kit sources, and defaults for sandbox creation. Settings
apply across your local sandboxes. For project-specific configuration, use
environment files.

The commands read and write settings through the local daemon, starting it if
necessary. Overrides persist across CLI invocations and daemon restarts.

## View settings

List settings with their effective value, type, source, and description:

```console
$ sbx settings ls
```

Long values and descriptions are truncated in the table. Use
`sbx settings ls --no-trunc` for complete text, or `sbx settings ls --json`
for JSON output. The JSON records also include defaults and environment
variable names where available.

To inspect one setting:

```console
$ sbx settings get clipboard.imagePaste
false
$ sbx settings get clipboard.imagePaste --json
```

By default, `get` prints only the effective value. Use `--json` or
`--format yaml` for the complete setting record, including the source and default.

## Change a setting

Set an override by passing the setting key and a value of the required type.
For example, allow sandboxed agents to read images from your host clipboard:

```console
$ sbx settings set clipboard.imagePaste true
```

For JSON values, quote the argument so your shell passes it intact. This
example permits kits from Docker Hub and your organization's GitHub repositories:

```console
$ sbx settings set kit.allowedSources '["docker.io/","github.com/myorg/"]'
```

JSON arrays and objects replace the whole value. Include any entries you want
to keep.

Remove an override with `unset`:

```console
$ sbx settings unset clipboard.imagePaste
```

The setting falls back to its environment variable, if set, or its default.
Setting a value equal to its built-in default also removes the stored override.

### Value precedence

For each setting, the first available value wins:

1. The setting's environment variable, if it has one
2. A user override written with `sbx settings set`
3. The built-in default

The `SOURCE` column in `sbx settings ls` identifies the selected source as
`envvar`, `override`, or `default`. If an environment variable takes precedence,
`set` still updates the stored override and reports why the effective value
hasn't changed. `unset` removes only the stored override, not the environment
variable.

### When changes take effect

Most changes take effect within about five seconds. Settings marked `yes` in
the `RESTART` column require a daemon restart for existing daemon-side consumers:

```console
$ sbx daemon restart
```

The `set` and `unset` commands print a restart reminder when needed. Some
settings apply only when creating a sandbox: changing a template default or disk
size doesn't update existing sandboxes. Proxy settings have separate timing for
CLI requests, daemon traffic, and sandbox traffic. See
When proxy changes take effect.

## Environment variables

Some settings have an environment variable equivalent, listed in the reference
entries below. These variables configure Docker Sandboxes on the host. They
don't set environment variables inside a sandbox.

The daemon inherits environment variables when it starts. Export a variable
before the first `sbx` command, or restart an existing daemon from the shell
where you set it. For example:

```console
$ export DOCKER_SANDBOXES_CLIPBOARD_IMAGE_PASTE=true
$ sbx daemon restart
$ sbx settings get clipboard.imagePaste
true
```

Changing your shell environment doesn't change the environment of a running
daemon, even for settings that normally take effect without a restart. To
return to a stored override or default, remove the variable and restart:

```console
$ unset DOCKER_SANDBOXES_CLIPBOARD_IMAGE_PASTE
$ sbx daemon restart
```

CLI operations that read settings locally use their own environment on each
invocation. Keep the CLI and daemon environments consistent when using these
variables. A persistent override with `sbx settings set` avoids needing to
export a variable in each shell.
