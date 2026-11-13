---
title: "Troubleshooting (part 1 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes/troubleshooting.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Troubleshooting

The following diagnostics and recovery steps apply to local sandboxes. Use
`sbx --cloud diagnose` to check cloud
connectivity and account access. For cloud files, expiration, and network access, see
Cloud sandboxes. Local daemon restarts and `sbx reset` do not repair
cloud sandbox state.

## Run diagnostics

Before digging into a specific issue, run
`sbx diagnose` to check for common problems
with your installation, such as a missing CLI binary, daemon reachability
problems, a CLI/daemon version mismatch, missing storage directories, or
broken authentication.

```console
$ sbx diagnose
```

The command prints a summary of checks that passed, warned, or failed, along
with suggested fixes. Use `--json` or `--format yaml` for machine-readable
output, or `--format github-issue` to generate a Markdown snippet suitable for pasting
into a GitHub issue.

## Check sandbox disk usage

If you're running low on disk space, check how much storage your local
sandbox images, containers, and managed volumes use:

```console
$ sbx df
```

The summary shows the size and estimated reclaimable space for each resource
type. To identify individual images, containers, or volumes taking up space,
run:

```console
$ sbx df --verbose
```

Image totals count shared layers once and include image data retained by
containers after you remove the image's tags. Host bind mounts, logs, and caches
are excluded, so the report doesn't account for all disk space used on your host.
A measurement shown as `unknown` couldn't be determined.

Before cleaning up, preview which stopped sandboxes would be removed
with `sbx prune --dry-run`. The reclaimable estimate covers unused resources of
each type, so it isn't the amount that `sbx prune` alone removes. Shared storage
and resources still in use can reduce or delay the space recovered.

## Image pulls fail on eCryptfs

On Linux, image pulls can fail with an I/O error when the sandbox state
directory is on eCryptfs.

If `sbx diagnose` reports `state directory is on eCryptfs`,
use a filesystem other than eCryptfs for sandbox state.

## Sandbox is not responding

If `sbx ls` shows `running (not responding)`, Docker Sandboxes has detected
that the sandbox isn't responding to commands. Stop and start that sandbox,
then retry your command:

```console
$ sbx stop <SANDBOX_NAME>
$ sbx start <SANDBOX_NAME>
```

Files saved in the sandbox are kept when you stop and start it.

## Restart the sandbox daemon

If sandbox commands hang, fail to connect to the daemon, or keep returning
daemon errors, restart the sandbox daemon before resetting sandbox state:

```console
$ sbx daemon restart
```

Then retry the command that failed. Restarting the daemon doesn't delete
sandbox data. If the issue persists or state is corrupted, use
`sbx reset`.

## Resetting sandboxes

If you hit persistent issues or corrupted state, run
`sbx reset` to stop all VMs and delete all sandbox
data. Create fresh sandboxes afterwards.

## Sandbox doesn't contain my project files

Starting with `sbx` version 0.42.0, the workspace path is optional for
`sbx create`. When you omit it, the command creates a mountless sandbox. For
example, these commands create and attach to a sandbox without mounting your
host project files:

```console
$ sbx create --name <sandbox-name> <agent>
$ sbx run --name <sandbox-name>
```

By contrast, `sbx run` mounts the current directory when you don't pass a
workspace path:

```console
$ sbx run <agent>
```

A sandbox's workspace configuration is fixed when the sandbox is created. To
reuse the name of an existing mountless sandbox, first
copy out any files you want to keep,
then remove and recreate it with a workspace path:

```console
$ sbx rm <sandbox-name>
$ sbx run --name <sandbox-name> <agent>
```

See Choose a workspace for mountless, direct,
and clone-mode behavior.

## Sandbox reports a mount state error

If a sandbox reports `saved mount metadata does not match the container`,
remove and recreate the affected sandbox. Before removing it,
copy out any files you want to keep
if the sandbox is still accessible. Removing a sandbox deletes its sandbox data.

If the error says `a recorded mount source now resolves to a different path`,
restore the original host source path, or remove and recreate the sandbox.
This can happen if you replace the source directory or one of its parent
directories with a symlink to a different location.

Changing a host symlink to point elsewhere doesn't move an existing static
mount. The sandbox retains the original source, and filesystem policy checks
when you reuse the sandbox include that source.

## Kiro, Copilot, or Droid shorthand fails

In Docker Sandboxes v0.42, `sbx run kiro`, `sbx run copilot`, and
`sbx run droid` fail because these agents moved from built-in agents to
public kits and their shorthand names aren't resolved in this release.

Upgrade Docker Sandboxes to v0.43.0 or later to launch
these agents by name again. If you need to stay on v0.42, use the full kit
reference for your agent:

```console
$ sbx run docker.io/sbx/kiro-kit:latest
$ sbx run docker.io/sbx/copilot-kit:latest
$ sbx run docker.io/sbx/droid-kit:latest
```

## Network access and policy

For problems caused by network rules, approvals, or organization governance,
such as blocked requests, inactive allow rules, or missing audit records, see
Troubleshoot governance.

## Kit fails to install: source not in allowlist

If loading a kit fails with a message like its source is not in your
allowlist:

```console
$ sbx run claude --kit "git+https://github.com/docker/sbx-kits-contrib.git#dir=vale"
```

`sbx` restricts kit installs to an allowlist of sources, which defaults to
Docker Hub (`docker.io/`) only. Add the kit's publisher to the
`kit.allowedSources` setting,
keeping the entries you want to retain:

```console
$ sbx settings set kit.allowedSources '["docker.io/","github.com/docker/"]'
```

Then run the command again. For details, including how to allow local kits or
any remote source, see Restrict kit sources.

## Kit install or startup command fails

If `sbx create` or `sbx run` shows ✗ on a kit's install command, or warns that a
startup command failed, the full output is inside the sandbox. Read it with
`sbx exec`:

```console
$ sbx exec <sandbox-name> cat /var/log/sbx-kits/<kit>/install-<n>.log
$ sbx exec <sandbox-name> cat /var/log/sbx-kit-startup.log
```

`<n>` is the install command's position in the kit's `install` list, starting
at 0. To stream every install command's output and the startup log while the
sandbox is created, run `sbx -D create` or `sbx -D run`. See
Debug a kit for how to read
the output and fix the common causes.

## SSH and other non-HTTP connections fail

Non-HTTP TCP connections such as SSH can be allowed by adding a policy rule for
the destination. Hostname rules work for these connections because the sandbox
recovers the hostname from its DNS resolver when the protocol doesn't include
one:

```console
$ sbx policy allow network "myhost:22"
```

If the destination is reached by IP address without a DNS lookup, the hostname
can't be recovered. Use an address-based rule in that case:

```console
$ sbx policy allow network "10.1.2.3:22"
```

UDP requires experimental UDP egress
and UDP allow rules. ICMP is blocked and can't be unblocked with policy rules.

For Git operations over SSH, you can either add an allow rule for the Git
server's hostname or IP address, or use HTTPS URLs instead:

```console
$ git clone https://github.com/owner/repo.git
```

## Can't reach a service running on the host

If a request to `127.0.0.1` or a local network IP returns "connection refused"
from inside a sandbox, the address is not reachable from within the sandbox VM.
See Accessing host services from a sandbox.

## Docker authentication failure

If you see a message like `You are not authenticated to Docker`, your login
session has expired. In an interactive terminal, the CLI prompts you to sign in
again. In non-interactive environments such as scripts or CI, run `sbx login`
to re-authenticate.

## Agent authentication failure

If the agent can't reach its model provider or you see API key errors, the key
is likely invalid, expired, or not configured. Verify it's set in your shell
configuration file and that you sourced it or opened a new terminal.

For agents that use the credential proxy, make sure
you haven't set the API key to an invalid value inside the sandbox — the proxy
injects credentials automatically on outbound requests.

If credentials are configured correctly but API calls still fail, check
`sbx policy log` and look at the **PROXY** column. Requests routed through
the `transparent` proxy don't get credential injection. This can happen when a
client inside the sandbox (such as a process in a Docker container) isn't
configured to use the forward proxy. See
View network activity
for details.

## MCP server streams stall

If a remote MCP server's HTTP/2 handling stalls long-lived streams, register
it with `--disable-http2` to use HTTP/1.1:

```console
$ sbx mcp add acme --url https://mcp.acme.com/mcp --disable-http2
```

Replace the example URL with your MCP endpoint. The setting applies to later
connections to this server. The flag requires `--url` and can't be used with
`--command` or `--local`. For registration options, see
Register an MCP server.

## API calls fail with a certificate error

If your organization uses a proxy that inspects HTTPS traffic, agent requests
can fail with a certificate error such as
`SSL certificate problem: self-signed certificate in certificate chain`. Install
your organization's internal root CA inside the sandbox so the agent and its
SDKs trust certificates signed by the proxy. Certificate errors can stop a
request before the credential proxy can inject credentials.

For repeatable setup with a built-in agent, create a
mixin kit
that installs the CA when the sandbox is created. Save the example descriptor
as `internal-ca/internal-ca.yaml` and place your certificate beside it.

Use a PEM-encoded certificate with a `.crt` extension. If traffic can be signed
by more than one internal proxy, install each proxy's root CA before running
`update-ca-certificates`.

Create a sandbox with the kit:

```console
$ sbx run claude --kit ./internal-ca/
```

To update an existing sandbox, copy the certificate into the sandbox and update
the trust store:

```console
$ sbx cp ./internal-ca.crt <sandbox-name>:/tmp/internal-ca.crt
$ sbx exec <sandbox-name> -- sudo install -m 0644 /tmp/internal-ca.crt /usr/local/share/ca-certificates/internal-ca.crt
$ sbx exec <sandbox-name> -- sudo update-ca-certificates
```

> **Important:**
> Install the CA into the system trust store with `update-ca-certificates`, as
> shown above. Don't override the sandbox's TLS trust variables (such as
> `SSL_CERT_FILE`) to point at only your internal CA. Doing so replaces the
> system bundle
> and breaks the trust the credential proxy depends on, so requests on the
> `forward` egress path fail.

If API calls still fail after installing the CA, run `sbx policy log` and check
the egress path in the **PROXY** column:

- `forward`: the credential proxy terminates TLS and presents its own
  certificate, which the sandbox already trusts. Requests on this path don't
  need the internal CA, and overriding the sandbox's trust variables breaks
  them, as described above.
- `forward-bypass` and `transparent`: the proxy forwards packets to the
  upstream proxy without terminating TLS, so the sandbox sees your
  organization's certificate directly. These paths are where installing the
  internal CA applies. The only difference between them is whether the client
  knows it's talking to a proxy.

### Certificate errors during Docker builds

Containers started by the sandbox's Docker Engine have their own trust stores.
They don't inherit the sandbox's installed certificates. If an HTTPS download
in a Dockerfile fails with `self signed certificate in certificate chain`,
install the proxy CA in the build image before the download.

From a shell inside the sandbox, write its proxy CA into your build context:

```console
$ printf '%s' "$PROXY_CA_CERT_B64" | base64 -d > sbx-proxy-ca.crt
```

For a Debian-based image with `ca-certificates` installed, copy the certificate
and update the trust store before commands that make HTTPS requests:

```dockerfile
FROM python:3.13-slim
COPY sbx-proxy-ca.crt /usr/local/share/ca-certificates/sbx-proxy-ca.crt
RUN update-ca-certificates
```

Build inside the sandbox, passing its proxy settings to the build:

```console
$ docker build --build-arg HTTP_PROXY --build-arg HTTPS_PROXY --build-arg NO_PROXY -t my-app .
```

If your organization also inspects TLS, install its root CA in the build image
as a separate `.crt` file before `update-ca-certificates`. Keep the system CA
bundle intact so the image trusts both proxies and public certificate
authorities. The earlier certificate troubleshooting
explains which proxy paths need each CA.

Keep the generated proxy certificate out of version control. Regenerate it and
rebuild the image if the sandbox proxy CA changes.

## Sandbox runs out of disk space

The sandbox root (`/`) filesystem defaults to 20 GB. To increase it, set
`DOCKER_SANDBOXES_ROOT_SIZE` before creating the sandbox:

```console
$ DOCKER_SANDBOXES_ROOT_SIZE=40g sbx run claude
```

`DOCKER_SANDBOXES_ROOT_SIZE` controls the root filesystem size. The Docker data
disk at `/var/lib/docker` is independent and defaults to 10 GB. To change the
Docker data disk size for a sandbox, set `DOCKER_SANDBOXES_DOCKER_SIZE` when you
create it:

```console
$ DOCKER_SANDBOXES_DOCKER_SIZE=20g sbx run claude
```

The Docker data disk must be at least 512 MiB. The environment variable doesn't
resize existing volumes.

For a clone-mode sandbox, set
`DOCKER_SANDBOXES_CLONED_WORKSPACE_SIZE` before creating the sandbox to
configure the cloned workspace volume capacity. The variable accepts
human-readable size strings such as `100g`:

```console
$ DOCKER_SANDBOXES_CLONED_WORKSPACE_SIZE=100g sbx run --clone claude .
```

## Filesystem operations are slow in large repositories

Filesystem operations such as `git status`, `git log`, or directory scans can
be noticeably slow when you pass a workspace path and use direct mode.
Virtiofs caching speeds up these workloads. Clone-mode sandboxes always enable
it, so this tuning applies only to direct mode.

Virtiofs caching is enabled by default on all operating systems. If you
experience Git index corruption or unexpected file content, disable caching
with the kill switch and recreate the sandbox:

```console
$ DOCKER_SANDBOXES_ENABLE_VIRTIOFS_CACHE=0 sbx run <agent>
```
