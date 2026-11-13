---
title: "Kits v2 (part 2 of 4)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes/customize/kits-v2.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Kits v2 (part 2 of 4)

## Credentials

A kit declares the credentials it needs and how the proxy injects them into
outbound requests. It does not declare a host discovery source. The user
provides the value through the secret store or the first-run prompt, and a
credential binding authorizes its use. A kit
can't read arbitrary host environment variables or files.

`credentials` is a list; each entry names a `service` and configures one or more
auth mechanisms.

| Field         | Description                                                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `service`     | Credential identifier, matched against the value stored with `sbx secret set`. Lowercase kebab-case.                                        |
| `description` | Optional. Shown to the user when approving a binding.                                     |
| `required`    | Marks the credential as essential to the agent. If it has no binding, `sbx` warns and starts with the credential withheld. Default `false`. |
| `provider`    | Reserved for a provider registry. Accepted with a warning and no runtime effect.                                                            |
| `apiKey`      | API-key injection (see apiKey).                                                                                                  |
| `oauth`       | OAuth interception (see oauth).                                                                                                   |

Each service must declare `apiKey`, `oauth`, or both. When both resolve at
runtime, the API key takes precedence and OAuth acts as the fallback.

### `apiKey`

| Field               | Description                                                                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`              | Environment variable name for the credential (for example, `ANTHROPIC_API_KEY`).                                                                  |
| `proxyManaged`      | If `true`, `sbx` sets `name` inside the container to the `proxy-managed` sentinel. Default `false`.                                               |
| `inject[].domain`   | Domain to inject the credential into. Must also be allowed in `permissions.network`.                                                  |
| `inject[].header`   | HTTP header the proxy sets (for example, `x-api-key`, `Authorization`).                                                                           |
| `inject[].format`   | Header value format, with one `%s` placeholder (for example, `"%s"` or `"Bearer %s"`). Mutually exclusive with `scheme`.                          |
| `inject[].scheme`   | Shorthand for common auth schemes. `bearer` expands to `Authorization: Bearer %s`; `basic` requires `username`. Mutually exclusive with `format`. |
| `inject[].username` | Username for HTTP Basic auth, for example `x-access-token` for Git over HTTPS.                                                                    |

### `oauth`

For agents that authenticate with OAuth (for example, Claude Code), the proxy
intercepts token responses and replaces real tokens with sentinels, then swaps
the real token back in on outbound requests. By default, the token never enters
the sandbox. Setting `passthrough: true` opts out of sentinel masking and sends
the real token response into the sandbox.

| Field                                    | Description                                                                                                                                                                                       |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tokenEndpoint.host` / `path`            | The OAuth token endpoint the proxy intercepts.                                                                                                                                                    |
| `sentinels.accessToken` / `refreshToken` | Sentinel values written into the container in place of the real tokens.                                                                                                                           |
| `credentialFile.path`                    | Where to write the credential file inside the container (`~` expands).                                                                                                                            |
| `credentialFile.structure`               | Declarative JSON shape. Supports `{{.AccessToken}}`, `{{.RefreshToken}}`, `{{.ExpiresAt}}`, and `{{.Scopes}}`.                                                                                   |
| `credentialFile.template`                | Go template. Supports `{{.AccessToken}}`, `{{.RefreshToken}}`, `{{.ExpiresAt}}`, `{{.Scopes}}`, and `{{.ScopesJSON}}`.                                                                          |
| `resourceHosts`                          | API hosts where the proxy attaches the token on outbound requests, distinct from the token endpoint host.                                                                                         |
| `skipIfEnv`                              | Accepted for compatibility, but ignored for schema v2. A v2 binding is authoritative instead of host environment variables.                                                                       |
| `responseFields`                         | Overrides the default field names the proxy reads from the token response.                                                                                                                        |
| `passthrough`                            | If `true`, the proxy passes the token response through unchanged instead of replacing the tokens with sentinels.                                                                                  |

`credentialFile.structure` provides a declarative alternative to
`credentialFile.template`. The engine renders it as well-formed JSON. If both
fields are set, `structure` takes precedence.

## Network

Network egress is declared under `permissions.network`. Credentials no longer carry
their own domain mapping — the proxy injects a credential only into the domains
its `apiKey.inject` lists, and every domain the
sandbox reaches must be allowed here.

| Field                       | Description                                                                                                     |
| --------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `permissions.network.allow` | Domains the sandbox can reach.                                                                                  |
| `permissions.network.deny`  | Domains the sandbox is blocked from reaching. Deny takes precedence over allow, including across composed kits. |

Allow and deny patterns:

| Pattern               | Example                  | Status                      |
| --------------------- | ------------------------ | --------------------------- |
| Exact host            | `api.example.com`        | Enforced                    |
| Exact host and port   | `api.example.com:8080`   | Enforced                    |
| Single-label wildcard | `*.example.com`          | Enforced                    |
| Multi-label wildcard  | `**.example.com`         | Parsed; enforcement pending |
| Port range            | `api.example.com:80-443` | Parsed; enforcement pending |
| Port wildcard         | `api.example.com:*`      | Parsed; enforcement pending |
| CIDR                  | `10.0.0.0/8`             | Parsed; enforcement pending |

In v1 this was the `network:` block (`allowedDomains` / `deniedDomains`, plus
`serviceDomains` / `serviceAuth`). In v2, those fields are decode errors.

## Ports

Declare `ports` as a list of entries to expose sandbox services to the host:

| Field       | Description                                                         |
| ----------- | ------------------------------------------------------------------- |
| `container` | Container port, 1 to 65535.                                         |
| `protocol`  | `tcp` or `udp`. Empty publishes one family; see below.              |
| `name`      | Optional label surfaced by tools that list published port bindings. |

Host ports are allocated ephemerally. Leave `protocol` empty unless the service
listens on IPv6: an empty value publishes IPv4 only (`127.0.0.1`), which is what
a service bound to `0.0.0.0` needs, while `tcp` publishes both `127.0.0.1` and
`::1` — and a client arriving over `::1` is accepted and then reset if nothing
in the sandbox is listening there. Users can pin host ports with
`sbx ports --publish <host>:<container>`.

## Environment

| Field       | Description                                    |
| ----------- | ---------------------------------------------- |
| `environment.variables` | Key-value pairs set directly in the container. |

Do not set `DASH_`, `SBX_`, or `DOCKER_` variables, and avoid overriding
`HOME`, `USER`, `SHELL`, `PATH`, `LD_PRELOAD`, and `LD_LIBRARY_PATH`. The
runtime reserves these names and may override them.
