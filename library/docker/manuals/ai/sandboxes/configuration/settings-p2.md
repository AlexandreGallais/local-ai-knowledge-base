---
title: "Docker Sandboxes settings (part 2 of 3)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes/configuration/settings.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Sandboxes settings (part 2 of 3)

## Settings reference

Each entry lists its built-in default, before overrides. An environment
variable appears only when the setting has a direct equivalent. Use
`sbx settings ls` to inspect the values supported by your installed version.

### Agents and host access

#### browser.enabled {.wrap-anywhere}

Set this to `false` to prevent sandboxed processes from opening URLs in your
host browser:

```console
$ sbx settings set browser.enabled false
```

This also prevents in-sandbox OAuth logins that redirect to localhost.

#### clipboard.imagePaste {.wrap-anywhere}

Turn this on to paste screenshots and other host clipboard images into agents
such as Claude Code and Codex with `Ctrl+V`. Text paste doesn't need this setting.

```console
$ sbx settings set clipboard.imagePaste true
```

This grants sandboxed processes access to host clipboard images. The change
applies to running sandboxes without recreating them. Set it to `false` to
withdraw that access. See image paste
for supported behavior.

#### claude.chrome {.wrap-anywhere}

Turn this on to let sandboxed Claude Code access host browser tabs through
Claude in Chrome:

```console
$ sbx settings set claude.chrome true
```

Changes apply to new browser connections from running sandboxes. Set it to
`false` to block further connections; established connections stay active until
you end the Claude browser sessions. See
Claude in Chrome for authentication
requirements and setup.

#### claude.remoteControl {.wrap-anywhere}

Turn this on before using Claude Code's `/remote-control` command inside a
sandbox:

```console
$ sbx settings set claude.remoteControl true
```

Docker Sandboxes keeps Remote Control environment and session credentials on
the host. The sandbox receives placeholders, and the proxy supplies the real
credentials only for the environment or session they belong to while this
setting is enabled. Remotely supplied environment variables and MCP
configuration aren't passed into the sandbox.

Set this to `false` to stop the proxy from supplying Remote Control credentials.
Changes apply to requests from running sandboxes. See
Claude Code remote control.

#### env.rememberHostCommands {.wrap-anywhere}

Use this when you repeatedly run a trusted environment file and want to
approve its host commands once, until those commands change:

```console
$ sbx settings set env.rememberHostCommands true
```

The first approval is still required. Commands run on your host with your
permissions, outside the sandbox. Leave the setting at `false` to require
approval on every invocation, or use `--force` to approve only one
invocation. See environment lifecycle commands.

#### sandbox.fuse {.wrap-anywhere}

Expose `/dev/fuse` and grant the `SYS_ADMIN` capability so processes can mount
FUSE filesystems in local sandboxes. Set this to `false` to disable FUSE access
for sandboxes you create:

```console
$ sbx settings set sandbox.fuse false
```

Changes apply only to newly created sandboxes. Existing sandboxes retain their
FUSE configuration, including after restarts. To disable access for one sandbox,
set `sandboxOptions.fuse` to `false`
in its environment file. When this setting is `false`, environment files cannot
enable FUSE access. Cloud sandboxes do not support FUSE.

#### ssh.agentForwardingEnabled {.wrap-anywhere}

Set this to `false` when sandboxes should not be able to request signatures
from your host SSH agent, including for Git authentication and commit signing:

```console
$ sbx settings set ssh.agentForwardingEnabled false
$ sbx daemon restart
```

Restarting the daemon applies the change to existing forwarders. When forwarding
is enabled, the private keys remain on the host, but sandboxed processes can
ask the agent to use them. See SSH agent credentials.

#### ssh.agentSocketPath {.wrap-anywhere}

Use a fixed path when every sandbox should use the same host SSH agent, such
as a password <example-value>'s agent, regardless of which shell starts the sandbox:

```console
$ sbx settings set ssh.agentSocketPath "$SSH_AUTH_SOCK"
$ sbx daemon restart
```

Run this from a shell whose `SSH_AUTH_SOCK` points to the intended agent. The
command stores that path, not a reference to the variable.

When this setting is empty, Docker Sandboxes uses the `SSH_AUTH_SOCK` value
supplied by each client. On Windows, if `SSH_AUTH_SOCK` is also unset, it uses
the `\\.\pipe\openssh-ssh-agent` named pipe. This works with Windows OpenSSH
and with 1Password's SSH agent when it provides that pipe. The host agent must
be running. Set `SSH_AUTH_SOCK` or configure `ssh.agentSocketPath` to use a
different agent.

Remove the fixed path with `sbx settings unset ssh.agentSocketPath` and restart
the daemon to update existing forwarders.

### Images and storage

#### platform.images.registryMirror {.wrap-anywhere}

Use this when your organization routes Docker Hub pulls through a registry
mirror. Specify a host, optionally with a port and path prefix, without a URL
scheme:

```console
$ sbx settings set platform.images.registryMirror registry.example.com/docker-remote
```

The mirror applies to template and kit references that resolve to Docker Hub.
References to other registries stay unchanged. An empty value disables
mirroring.

A bare, non-loopback host can also configure Docker pulls inside sandboxes
created after the change. A mirror with a path prefix doesn't configure those
pulls. See registry mirrors for authentication, certificate
requirements, and how to apply changes to existing sandboxes.

#### platform.images.useDHI {.wrap-anywhere}

Turn this on to use Docker Hardened Image variants when creating sandboxes
with default agent templates:

```console
$ sbx settings set platform.images.useDHI true
```

For example, the default template `docker/sandbox-templates:claude-code-docker`
becomes `dhi/sbx-templates:claude-code-docker`. The image tag stays the same.
An explicit `--template` or a custom kit image takes precedence.

Existing sandboxes keep their template. Create a sandbox after changing the
setting to use the selected image variant.

#### sandbox.disk.dockerVolume {.wrap-anywhere}

Increase this default if sandboxes need more room for Docker images,
containers, and volumes under `/var/lib/docker`. The minimum is 512 MiB:

```console
$ sbx settings set sandbox.disk.dockerVolume 20g
```

The size applies when creating a sandbox. It doesn't resize existing volumes
or increase the size of the sandbox workspace.

To choose a size for one sandbox without changing the default:

```console
$ DOCKER_SANDBOXES_DOCKER_SIZE=30g sbx create claude ~/my-project
```

This variable applies to that creation command. It doesn't change the value
reported by `sbx settings get sandbox.disk.dockerVolume`.

### Kits

#### kit.allowedSources {.wrap-anywhere}

Add a publisher here before installing its kits from a remote registry or Git
repository. The value replaces the entire allowlist, so retain any sources you
still need:

```console
$ sbx settings set kit.allowedSources '["docker.io/","github.com/myorg/"]'
```

Prefixes match on a path-segment boundary: `github.com/myorg/` permits that
organization's repositories, but not `github.com/myorg-other/`. The value
`["*"]` permits any remote source. Local directories and ZIP files are controlled
by kit.allowLocalKits.

See restrict kit sources for source
formats and examples.

#### kit.allowLocalKits {.wrap-anywhere}

Set this to `false` to require kits to come from a remote source instead of a
local directory or ZIP file:

```console
$ sbx settings set kit.allowLocalKits false
```

Remote sources must still satisfy kit.allowedSources.
Keep this enabled while developing kits locally. Allowing local kits doesn't
exempt them from signature requirements when
kit.requireSignature is enabled.

#### kit.requireSignature {.wrap-anywhere}

Turn this on to reject unsigned kits and kits whose signatures don't match
your trusted signers. Configure kit.trustedSigners first,
then require signatures:

```console
$ sbx settings set kit.requireSignature true
```

The check applies when installing kits from local directories, Git, or OCI
registries. ZIP kits can't carry verifiable signatures and are rejected.

A signature covers the kit's `spec.yaml` and `files/` content. It doesn't pin
image tags or verify downloads performed by the kit's commands. See
sign and verify kits.

#### kit.trustedSigners {.wrap-anywhere}

Set the identities or public keys whose kit signatures you trust. The value is
a JSON array. Each entry describes either a keyless signer or a public key, and
a signature can match any entry.

For a keyless signer, specify both the identity and its OpenID Connect issuer:

```console
$ sbx settings set kit.trustedSigners \
    '[{"identity":"user@example.com","issuer":"https://accounts.google.com"}]'
```

For a public key:

```console
$ sbx settings set kit.trustedSigners '[{"key":"/path/to/cosign.pub"}]'
```

Each command replaces the whole list. To trust both, include both objects in
one array. The default policy trusts Docker employee identities ending in
`@docker.com`, attested by Google's issuer. Setting trusted signers alone
doesn't require signatures: also enable
kit.requireSignature.

#### kit.ignoreTransparencyLog {.wrap-anywhere}

Use this for private kits whose keyless signatures were created with
`--tlog-upload=false`, so verification doesn't require a public Rekor
transparency log entry:

```console
$ sbx settings set kit.ignoreTransparencyLog true
```

Signature and signer verification still apply. These signatures must provide a
timestamp from a timestamp authority instead of a transparency log timestamp.
Leave this at `false` when your signing workflow uses the public transparency
log. It has no effect on signatures verified with a public key.

### Model server

#### model.server.enabled {.wrap-anywhere}

Set this to `false` to turn off the bundled model service and skip its runtime
download. Changes require a daemon restart. This setting has no environment
variable override.

See Disable the bundled service for
commands and how this affects your model choices.

### MCP gateway

#### mcp.forceLocalGateway {.wrap-anywhere}

Set this to `true` to use the local MCP gateway when your account would
otherwise use the SaaS gateway:

```console
$ sbx settings set mcp.forceLocalGateway true
$ sbx daemon restart
```

The daemon caches its gateway selection, so a restart is required after changing
this setting. It doesn't override a gateway selected by organization governance.
Set it back to `false` and restart to return to automatic selection. See
MCP gateway for server registration and agent setup.

### Daemon logging

These settings control rotation of `daemon.log`, not logs written by the CLI
or processes inside a sandbox. Changes take effect after `sbx daemon restart`.
The backup count and age limits apply together: a rotated log is removed when
it exceeds either limit.

#### daemon.log.maxSizeMB {.wrap-anywhere}

Set the size in MB at which the daemon log rotates. The minimum is `1`:

```console
$ sbx settings set daemon.log.maxSizeMB 100
$ sbx daemon restart
```

#### daemon.log.maxBackups {.wrap-anywhere}

Set the maximum number of rotated daemon logs to keep. The value must be zero
or greater. A value of `0` removes the count limit, but the age limit still
applies:

```console
$ sbx settings set daemon.log.maxBackups 5
$ sbx daemon restart
```

#### daemon.log.maxAgeDays {.wrap-anywhere}

Set how many days to keep rotated daemon logs, from `0` to `3650`. A value of
`0` removes the age limit, but the backup count limit still applies:

```console
$ sbx settings set daemon.log.maxAgeDays 30
$ sbx daemon restart
```

### Telemetry

#### telemetry.disabled {.wrap-anywhere}

Set this to `true` to persistently disable telemetry for the local CLI and
daemon:

```console
$ sbx settings set telemetry.disabled true
$ sbx daemon restart
```

The next CLI invocation uses the saved preference. A running daemon keeps its
previous telemetry setting until you restart it.

`SBX_NO_TELEMETRY` is a separate opt-out, rather than an environment variable
equivalent for this setting. A value of `1` disables telemetry regardless of
the saved preference. Other values, including `0`, don't override a saved
opt-out. See telemetry collection
for what the CLI collects.

### Diagnostics

#### diagnostics.autoUpload {.wrap-anywhere}

Choose whether Docker Sandboxes may automatically upload diagnostic bundles
after eligible daemon errors:

- `yes`: Consent to automatic uploads.
- `no`: Decline automatic uploads and suppress further consent prompts.
- Empty string: No recorded decision. Docker Sandboxes may prompt for consent,
  but doesn't automatically upload without it.

For example, decline automatic uploads:

```console
$ sbx settings set diagnostics.autoUpload no
```

Use `sbx settings unset diagnostics.autoUpload` to clear the decision. Read
automatic diagnostics uploads
for what bundles contain before opting in. This controls automatic uploads,
not an explicit `sbx diagnose --upload` request.

#### diagnostics.autoUploadErrorCooldownInDays {.wrap-anywhere}

Increase this value to upload automatic diagnostic bundles less frequently.
For example, allow at most one automatic upload per seven days:

```console
$ sbx settings set diagnostics.autoUploadErrorCooldownInDays 7
```

The cooldown applies across all eligible errors, not separately to each error
type. Values below one are treated as one day. This setting doesn't grant
upload consent: diagnostics.autoUpload must be `yes`.

### Outbound connections

#### egress.stalledConnectionTimeoutSeconds {.wrap-anywhere}

Set how many seconds an outbound TCP connection from a local sandbox can go
without the remote end acknowledging data before the connection closes. This
bounds how long a connection stranded by a host network change, such as a VPN
connecting, can hang.

Use a value from `0` to `3600`. Set `0` to disable the timeout. For example,
increase the timeout to tolerate longer network interruptions:

```console
$ sbx settings set egress.stalledConnectionTimeoutSeconds 90
$ sbx daemon restart
```

Changes apply to sandboxes created after the change. For existing sandboxes,
restart the daemon to rebuild their network proxies with the updated value.
The experimental Runtime backend doesn't support this setting.

A network outage longer than the timeout can close long-lived connections,
including streams and uploads. On Linux, the timeout also closes a connection
if the remote end stops reading data for longer than the timeout. Increase the
value or disable the timeout if you need connections to survive these pauses.
