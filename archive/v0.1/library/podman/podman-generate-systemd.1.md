---
title: "container-de1e3223b1b888bc02d0962dd6cb5855eb00734061013ffdd3479d225abacdc6.service (part 1 of 2)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-generate-systemd.1.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

% podman-generate-systemd 1

## NAME
podman\-generate\-systemd - [DEPRECATED] Generate systemd unit file(s) for a container or pod

## SYNOPSIS
**podman generate systemd** [*options*] *container|pod*

## DESCRIPTION
DEPRECATED:
Note: **podman generate systemd** is deprecated. We recommend using Quadlet
files when running Podman containers or pods under systemd.  There are no plans to remove the command.
It will receive urgent bug fixes but no new features.

**podman generate systemd** creates a systemd unit file that can be used to control a container or pod.
By default, the command prints the content of the unit files to stdout.

Generating unit files for a pod requires the pod to be created with an infra container (see `--infra=true`).  An infra container runs across the entire lifespan of a pod and is hence required for systemd to manage the life cycle of the pod's main unit.

- Note: When using this command with the remote client, including Mac and Windows (excluding WSL2) machines, place the generated units on the remote system.  Moreover, make sure that the `XDG_RUNTIME_DIR` environment variable is set.  If unset, set it via `export XDG_RUNTIME_DIR=/run/user/$(id -u)`._

- Note: The generated `podman run` command contains an `--sdnotify` option with the value taken from the container.
If the container does not have any explicitly set value or the value is set to __ignore__, the value __conmon__ is used.
The reason for overriding the default value __container__ is that almost no container workloads send notify messages.
Systemd waits for a ready message that never comes, if the value __container__ is used for a container
that does not send notify messages. The use of the default value might have been unintentional by the user,
therefore the overridden default value._

### Kubernetes Integration

A Kubernetes YAML can be executed in systemd via the `podman-kube@.service` systemd template.  The template's argument is the path to the YAML file.  Given a `workload.yaml` file in the home directory, it can be executed as follows:

```
$ escaped=$(systemd-escape ~/workload.yaml)
$ systemctl --user start podman-kube@$escaped.service
$ systemctl --user is-active podman-kube@$escaped.service
active
```

## OPTIONS

#### **--after**=*dependency_name*

Add the systemd unit after (`After=`) option, that ordering dependencies between the list of dependencies and this service. This option may be specified more than once.

User-defined dependencies are appended to the generated unit file, but any existing options needed or defined by default (e.g., `online.target`) are **not** removed or overridden.

#### **--container-prefix**=*prefix*

Set the systemd unit name prefix for containers. The default is *container*.

#### **--env**, **-e**=*env*

Set environment variables to the systemd unit files.

If an environment variable is specified without a value, Podman checks the host environment for a value and sets the variable only if it is set on the host. As a special case, if an environment variable ending in __*__ is specified without a value, Podman searches the host environment for variables starting with the prefix and adds those variables to the systemd unit files.

#### **--files**, **-f**

Generate files instead of printing to stdout.  The generated files are named {container,pod}-{ID,name}.service and are placed in the current working directory.

Note: On a system with SELinux enabled, the generated files inherits contexts from the current working directory. Depending on the SELinux setup, changes to the generated files using `restorecon`, `chcon`, or `semanage` may be required to allow systemd to access these files. Alternatively, use the `-Z` option when running `mv` or `cp`.

#### **--format**=*format*

Print the created units in the specified format (json). If `--files` is specified, the paths to the created files are printed instead of the unit content.

#### **--name**, **-n**

Use the name of the container for the start, stop, and description in the unit file

#### **--new**

This option yields unit files that do not expect containers and pods to exist.  Instead, new containers and pods are created based on their configuration files.  The unit files are created best effort and may need further editing; please review the generated files carefully before using them in production.

Note that `--new` only works on containers and pods created directly via Podman (i.e., `podman [container] {create,run}` or `podman pod create`).  It does not work on containers or pods created via the REST API or via `podman kube play`.  For `podman kube play`, use the `podman-kube@.service` systemd template instead.

#### **--no-header**

Do not generate the header including meta data such as the Podman version and the timestamp.

#### **--pod-prefix**=*prefix*

Set the systemd unit name prefix for pods. The default is *pod*.

#### **--requires**=*dependency_name*

Set the systemd unit requires (`Requires=`) option. Similar to wants, but declares a stronger requirement dependency.

#### **--restart-policy**=*policy*

Set the systemd restart policy.  The restart-policy must be one of: "no", "on-success", "on-failure", "on-abnormal",
"on-watchdog", "on-abort", or "always".  The default policy is *on-failure* unless the container was created with a custom restart policy.

Note that generating a unit without `--new` on a container with a custom restart policy can lead to issues on shutdown; systemd attempts to stop the unit while Podman tries to restart it.  Creating the container without `--restart` and using the `--restart-policy` option when generating the unit file is recommended.

#### **--restart-sec**=*time*

Set the systemd service restartsec value. Configures the time to sleep before restarting a service (as configured with restart-policy).
Takes a value in seconds.

#### **--separator**=*separator*

Set the systemd unit name separator between the name/id of a container/pod and the prefix. The default is *-*.

#### **--start-timeout**=*value*

Override the default start timeout for the container with the given value in seconds.

#### **--stop-timeout**=*value*

Override the default stop timeout for the container with the given value in seconds.

#### **--template**

Add template specifiers to run multiple services from the systemd unit file.

Note that if `--new` was not set to true, it is set to true by default. However, the command fails if `--new` is set to `false` explicitly.

#### **--wants**=*dependency_name*

Add the systemd unit wants (`Wants=`) option, that this service is (weak) dependent on. This option may be specified more than once. This option does not influence the order in which services are started or stopped.

User-defined dependencies are appended to the generated unit file, but any existing options needed or defined by default (e.g., `online.target`) are **not** removed or overridden.
