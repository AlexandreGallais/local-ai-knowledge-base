---
title: "Docker Sandboxes settings (part 3 of 3)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes/configuration/settings.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Sandboxes settings (part 3 of 3)

### Upstream proxies and TLS

Upstream proxy support is experimental. Use these settings to control how
outbound traffic reaches the network. See upstream proxies
for setup and when changes take effect.

The standard `HTTP_PROXY`, `HTTPS_PROXY`, and `NO_PROXY` variables and their
lowercase forms are fallbacks for proxy selection, not direct overrides of the
`proxy` and `no_proxy` settings.

#### proxy {.wrap-anywhere}

Set a shared upstream proxy when both sandbox traffic and host-side Docker
Sandboxes traffic should pass <example-value> it:

```console
$ sbx settings set proxy http://proxy.corp:3128
$ sbx daemon restart
```

The value can be an HTTP, HTTPS, or SOCKS5 proxy URL, a PAC source, `system` to
use the operating system's proxy, or `direct` to bypass <example-value> proxies. An
empty value falls back to the standard proxy environment variables and then the
operating system's proxy settings.

The scope-specific settings below take precedence over this shared value.
See proxy value formats and
proxy precedence.

#### proxy.sandbox {.wrap-anywhere}

Use this when traffic from inside sandboxes needs a different route from the
daemon and CLI. For example, send sandbox traffic through a SOCKS5 proxy:

```console
$ sbx settings set proxy.sandbox socks5h://proxy.corp:1080
$ sbx daemon restart
```

With `socks5h://`, the proxy resolves destination names. Use `direct` to bypass
the shared proxy for sandbox traffic, or unset this setting to inherit `proxy`.
It doesn't affect daemon traffic. Sandboxes created after the change use the
updated value; existing sandbox proxies require a daemon restart.

#### proxy.daemon {.wrap-anywhere}

Use this to route the daemon's requests, such as image pulls, separately from
sandbox traffic. Host CLI connections, including connections to cloud sandboxes,
also use this scope. See traffic scopes.

For example, keep a shared proxy for sandbox traffic while letting the daemon
connect directly:

```console
$ sbx settings set proxy.daemon direct
$ sbx daemon restart
```

Unset this setting to inherit `proxy`. Supported CLI requests use changes on
the next invocation; the daemon's own requests require a restart.

#### proxy.sshDirect {.wrap-anywhere}

Set this to `true` to bypass the upstream proxy for cloud SSH connections.
Other host CLI requests keep using the configured proxy. Changes apply on the
next SSH connection without a daemon restart. For setup, see
Cloud SSH.

#### no_proxy {.wrap-anywhere}

List destinations that should bypass the selected upstream proxy. Use a
comma-separated string of hosts, domain suffixes, IP addresses, or CIDR ranges:

```console
$ sbx settings set no_proxy "registry.internal,10.0.0.0/8"
$ sbx daemon restart
```

This shared list applies to sandbox and daemon traffic unless a scope-specific
list replaces it. A value of `*` bypasses the upstream proxy for all destinations.
Proxy exclusions don't grant network access: sandbox requests must still pass
network policy. For how network policy is set, see
Sandbox governance.

#### no_proxy.sandbox {.wrap-anywhere}

Use this when only sandbox traffic should bypass the upstream proxy for a set
of destinations. For example, connect directly to cluster services:

```console
$ sbx settings set no_proxy.sandbox "*.svc.cluster.local"
$ sbx daemon restart
```

A non-empty value replaces the shared `no_proxy` list for sandbox traffic; it
doesn't append to it. Include any shared exclusions that sandboxes still need.
Unset it to inherit `no_proxy` again. Existing sandbox proxies require a daemon
restart.

#### no_proxy.daemon {.wrap-anywhere}

Use this when the daemon and supported CLI requests need different proxy
exclusions from sandbox traffic. For example, pull images directly from an
internal registry:

```console
$ sbx settings set no_proxy.daemon "registry.internal"
$ sbx daemon restart
```

A non-empty value replaces the shared `no_proxy` list for this scope. It doesn't
change sandbox exclusions. Unset it to inherit `no_proxy` again. Supported CLI
requests use changes on the next invocation; daemon requests require a restart.

#### proxy.integratedAuth {.wrap-anywhere}

Turn this on when a corporate proxy requires NTLM or Kerberos authentication
using your Windows sign-in identity:

```console
$ sbx settings set proxy.integratedAuth true
$ sbx daemon restart
```

It applies to both sandbox and daemon proxy traffic. Authentication happens on
the host, so the Windows credentials don't enter the sandbox. It has no effect
on macOS or Linux. For cross-platform authentication with credentials in a
proxy URL, see proxy authentication.

#### tls.allowNegativeSerial {.wrap-anywhere}

Use this compatibility setting when HTTPS requests fail with
`x509: negative serial number` because a TLS-inspecting proxy issues
certificates with negative serial numbers:

```console
$ sbx settings set tls.allowNegativeSerial true
$ sbx daemon restart
```

It relaxes certificate validation to accept those serial numbers. It doesn't
make an untrusted certificate authority trusted or resolve other certificate
errors. For an untrusted internal CA, see
certificate troubleshooting.

### Shared agent skills

Shared agent skills are experimental.

#### skills.defaultMode {.wrap-anywhere}

Choose how future sandboxes use the shared agent skills store when you omit
`--skills`:

- `readonly`: Agents can read shared skills but can't change the store.
- `readwrite`: Agents can read and modify skills used by other sandboxes.
- `off`: Don't mount the shared store.

For example, omit the shared store by default:

```console
$ sbx settings set skills.defaultMode off
```

An explicit `--skills` value or environment-file `skills` value overrides this
default. Existing sandboxes retain their mounts: recreate them to change their
access mode. See share agent skills for setup
and the consequences of sharing a writable store.

## Command reference

### sbx settings ls

List settings. Alias: `sbx settings list`.

Use `--json` for complete records as JSON, or `--no-trunc` for full text. These
options are mutually exclusive.

### sbx settings get \<KEY\>

Print one effective value.

Use `--json` for the complete setting record.

### sbx settings set \<KEY\> \<VALUE\>

Write a user override.

Values are parsed as `bool`, `int`, `float`, `string`, or `json`, according to
the setting's type.

### sbx settings unset \<KEY\>

Remove a user override.

Use `sbx settings <COMMAND> --help` for command help.
