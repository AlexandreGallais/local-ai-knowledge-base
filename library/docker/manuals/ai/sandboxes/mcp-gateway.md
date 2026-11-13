---
title: "MCP gateway (part 1 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes/mcp-gateway.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# MCP gateway

This page describes the local MCP gateway. Cloud sandboxes use MCP servers
configured in Docker Agentic Platform: see
Load an MCP server.

Docker Sandboxes includes an MCP gateway for connecting agents to Model Context
Protocol servers. The gateway gives the agent inside the sandbox one MCP
endpoint, while `sbx` manages the registered servers, OAuth credentials, and
sandbox lifecycle on the host.

This is different from configuring an MCP server directly in an agent such as
Claude Code. Direct MCP setup configures that agent's own MCP client. With
Docker Sandboxes, you register MCP servers once on the host, and the sandbox
gateway exposes them to supported agents inside isolated sandboxes. That
host-managed gateway provides a single path for credentials, explicit server
loading, live updates, and organization governance.

> **Note:**
> The Docker Sandboxes MCP gateway is separate from the Docker Desktop MCP
> Toolkit. You don't need the Docker Desktop MCP Toolkit to use `sbx mcp`, and
> MCP Toolkit server settings aren't shared with Docker Sandboxes.

## Prerequisites

- Sign in with `sbx login`.
- Use an agent integration that configures MCP at startup: Claude Code, Codex,
  Devin, Kiro, or OpenCode.
- For remote servers that require OAuth without Dynamic Client Registration,
  register an OAuth client with the server provider.
- For `--local --url` registrations that resolve to OCI packages, use a host
  with Docker installed and running. Docker is also required for explicit
  `--command docker ...` registrations.

## Quick start

Start by registering one MCP server on the host:

```console
$ sbx mcp add notion --url https://mcp.notion.com/mcp
```

If the server requires OAuth, `sbx` opens an authorization flow before it stores
the registration. After registration, verify that the server is registered:

```console
$ sbx mcp ls
```

The listing shows each server's transport, status, gateway, and details.

Then start a sandbox and expose the registered server:

```console
$ sbx run claude --name mcp-demo --static-mcp notion
```

The sandbox starts with an MCP gateway and pre-loads the `notion` server. The
registration remains on the host and can be reused by other sandboxes.

## Register an MCP server

`sbx mcp add` registers an MCP server by name. The registration records the
server definition on the host. It doesn't attach the server to a sandbox by
itself. To expose a registered server to a sandbox, pass it with
`--static-mcp` when you create the
sandbox, or use `sbx mcp load` for a
sandbox that's already running.

Server names can contain letters, numbers, dots, hyphens, and underscores.
The name `none` is reserved for
starting a sandbox without MCP servers.

The `--url` flag can point to different kinds of input. The execution location
depends on what you register:

- A remote endpoint URL identifies a running MCP server. The server runs
  remotely, and the sandbox gateway connects to it.
- A metadata URL with `--local` returns a registry entry, `server.json`, or
  `server.yaml` that describes an OCI-packaged stdio server. `sbx` resolves the
  image and runs it on the host with Docker.
- An explicit command runs on the host as a stdio MCP server.

Local stdio servers run on the host, not inside the sandbox. The agent inside
the sandbox connects only to the MCP gateway.

If a `--url` hostname resolves to a private, loopback, link-local, or cloud
metadata address, `sbx` registers the server but warns you about the resolved
address. Register only URLs you trust. Fetching a manifest from an untrusted
URL can expose internal services or cloud metadata, and DNS rebinding can
redirect a hostname after it has been checked.

OAuth metadata discovery also warns and continues when it encounters these
addresses, including redirect destinations.
For a trusted internal server, pass `--skip-ssrf-check` to skip both the MCP
URL check and the OAuth metadata discovery checks and suppress their warnings.
Use the flag only when you trust the MCP host, OAuth provider, and all metadata
redirect destinations.

### Remote endpoint URL

For a remote MCP endpoint, pass the server URL:

```console
$ sbx mcp add notion --url https://mcp.notion.com/mcp
$ sbx mcp add linear --url https://mcp.linear.app/mcp
```

If requests to a remote server stall, see
MCP server streams stall.

#### Custom request headers

Use `--header 'Name: value'` to send custom HTTP headers to a remote MCP
endpoint, for example to authenticate with an API key. Repeat the flag for
each header, using each header name once:

```console
$ sbx mcp add acme --url https://mcp.acme.com/mcp \
  --header '<example-value>' \
  --header 'Accept: application/json, text/event-stream'
$ sbx secret set mcp:acme:api-key
```

Replace the example URL with your MCP endpoint. The `sbx secret set` command
prompts for the API key and stores it in the
host credential store.
The `${api-key}` placeholder stays in the registration. When a sandbox
connects, the gateway reads the secret and substitutes its value in the header.
Use single quotes around header values so your shell preserves placeholders.
Placeholders name stored secrets, not environment variables: `${api-key}`
reads `mcp:acme:api-key`, regardless of your shell environment.

Store each placeholder with `sbx secret set mcp:<server>:<placeholder>`.
Credential <example-value> such as `Authorization` must use a secret placeholder.
An explicit `Authorization` header takes precedence over an OAuth access token.

After storing the secret, expose the server to a sandbox:

```console
$ sbx run claude --name acme-demo --static-mcp acme
```

Custom headers require a remote HTTP endpoint and can't be used with
`--command` or `--local`. They also require the host to connect to the server.
The hosted gateway rejects these registrations unless you supply
`--oauth-authorization-server`, which routes the connection through the host.

#### Manage header secrets

Header secrets use the global scope on the host. Set them with
`sbx secret set mcp:<server>:<placeholder>` without `--sandbox`.
Header secrets require a stored value and don't support `--ref` or `--command`
dynamic sources.
To check the header templates and whether their secrets are set, run
`sbx mcp inspect acme`. The command doesn't display resolved secret values.

The secret store also contains an automatically managed `:endpoint` record,
such as `mcp:acme:api-key:<example-value>`. This metadata binds the secret to the
registered server's URLs so the gateway can detect an endpoint change before
sending the secret. You don't need to set this record yourself. If you change
the server's endpoint, follow the CLI guidance to set the secret again for
that endpoint.

To rotate a header secret, run `sbx secret set` with the same name. After
setting, changing, or removing a header secret, stop and restart the sandbox
or restart `sandboxd` to apply the change to an existing gateway. An existing
connection keeps its previous value, and a server skipped because its secret
was missing isn't retried automatically.

Removing a registration with `sbx mcp rm` keeps its header secrets and prints
commands to remove them. To remove the example secret:

```console
$ sbx secret rm mcp:acme:api-key
```

### Local stdio server

Some MCP servers communicate over stdio instead of exposing a remote HTTP
endpoint. Use a local stdio server when `sbx` should launch the MCP server on
the host. You can provide a metadata URL or an explicit command.

#### From registry or manifest metadata

Use `--local --url` when you have an MCP community registry URL or a URL that
returns a `server.json` or `server.yaml` document. The registry entry or
manifest must describe an OCI package that uses stdio transport. `sbx` doesn't
launch non-OCI package types, such as `npm`, from metadata. To use those
servers, register an explicit command.

This path resolves the image from the metadata and starts it on the host with
Docker, so Docker must be installed and running on the host.

```console
$ sbx mcp add fetch --local \
  --url https://registry.modelcontextprotocol.io/v0/servers/fetch-mcp/versions/latest
```

If the entry doesn't publish an OCI stdio package, `sbx` rejects the
registration instead of starting it locally.

A server manifest describes the MCP server package and how to start it. It can
be hosted on a GitHub raw URL, internal HTTP server, or CDN.

```console
$ sbx mcp add opine --local --url https://example.com/mcp/opine/server.yaml
```

#### From an explicit command

Use `--command` when you already know the executable and arguments, or when you
need custom Docker flags. The command can be a package runner such as `npx` or
a Docker container command:

```console
$ sbx mcp add playwright --command npx --args @playwright/mcp@latest
$ sbx mcp add local-image-server --command docker \
  --args "run,-i,--rm,your/image"
```

To set the working directory for the host process, pass `--dir`. This flag is
only valid with `--command`:

```console
$ sbx mcp add local-fs --command node --args server.js --dir /srv/data
```

Use registry or manifest metadata when you have a published server definition
and don't need to customize `docker run`. Use `--command` for local
development, private servers, or custom container flags.

> **Warning:**
> Local stdio servers run on the host, outside sandbox isolation. If the command
> starts a Docker container, that container uses host Docker isolation, not
> sandbox isolation. The process or container can access host files, host
> network resources, and credentials made available to it. Use trusted commands
> and images, and avoid mounting host paths or passing credentials <example-value> the
> server needs them.

### Docker Hardened Image

For an MCP server packaged as a Docker Hardened Image, pass its `dhi.io`
reference instead of a registry or manifest URL:

```console
$ sbx mcp add fetch --url dhi.io/fetch-mcp:latest
```

Use a tag or digest: `dhi.io/<IMAGE>:<TAG>` or
`dhi.io/<IMAGE>@sha256:<DIGEST>`. For images from other registries, use a
server-manifest URL or an explicit command.
