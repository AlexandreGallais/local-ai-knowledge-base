---
title: "MCP gateway (part 2 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes/mcp-gateway.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# MCP gateway (part 2 of 2)

## Authorize OAuth-backed servers

If a registered remote server requires OAuth, `sbx mcp add` starts the
authorization flow by default:

```console
$ sbx mcp add notion --url https://mcp.notion.com/mcp
```

OAuth credentials stay on the host. In local gateway mode, `sbx` stores tokens
in the host operating system's credential store.

To register an OAuth-backed server without authorizing it, pass `--skip-auth`:

```console
$ sbx mcp add notion --url https://mcp.notion.com/mcp --skip-auth
```

### Use a pre-registered OAuth client

In local gateway mode, you can register a remote OAuth server that doesn't
support Dynamic Client Registration. If the server publishes OAuth metadata,
pass the client ID that you registered with the server provider:

```console
$ sbx mcp add slack --url https://slack.example.com/mcp \
  --client-id <CLIENT_ID>
```

If the server doesn't publish OAuth metadata, pass
`--oauth-authorization-server` with the client ID. The flag accepts a local
file path or an HTTP or HTTPS URL to an RFC 8414 authorization server metadata
document. The document must define `authorization_endpoint` and
`token_endpoint`:

```console
$ sbx mcp add serverx --url https://mcp.serverx.example/mcp \
  --oauth-authorization-server ./serverx-authorization-server.json \
  --client-id <CLIENT_ID>
```

These flags are only valid with `--url`.

For a confidential OAuth client, store the client secret <example-value> registering
the server. There is no `--client-secret` flag:

```console
$ sbx secret set mcp:slack:client_secret
$ sbx mcp add slack --url https://slack.example.com/mcp \
  --client-id <CLIENT_ID>
```

The client secret stays in the host credential store and isn't
written to the MCP registration. If the server requires a confidential client
and no secret is stored, registration succeeds but authorization is skipped.
Store the secret, then run `sbx mcp auth <server>`.

#### Change the OAuth client

If you re-register a server name with a different client ID, issuer, or token
endpoint, `sbx` refuses to use the secret bound to the previous client.
After verifying that the registration points to the intended client and
provider, store that client's secret, clear the old binding, and authorize:

```console
$ sbx secret set mcp:slack:client_secret
$ sbx secret rm mcp:slack:client_secret:<example-value>
$ sbx mcp auth slack
```

Setting a secret alone doesn't clear the old binding. The `:identity` record
is metadata that binds the stored secret to its OAuth client. Authorization
records the binding for the new client.

For secrets stored under the legacy name `mcp:<server>.client_secret`, set
the secret again using `mcp:<server>:client_secret`.

### Set OAuth scopes

Use the repeatable `--scope` flag to record the default scopes requested during
authorization:

```console
$ sbx mcp add serverx --url https://mcp.serverx.example/mcp \
  --scope read --scope write
```

The `sbx mcp auth` command accepts `--scope` to override the recorded defaults
for one authorization:

```console
$ sbx mcp auth serverx --scope read
```

Unless you pass `--no-scope`, `sbx` requests the first available scope set in
the following order:

1. Scopes passed to `sbx mcp auth --scope`
2. Default scopes recorded by `sbx mcp add --scope`
3. Scopes that the protected resource says it requires
4. Whichever of `openid`, `email`, `profile`, and `offline_access` the
   authorization server advertises

If none of these provide a scope set, `sbx` omits the OAuth `scope` parameter so
the authorization server applies its default grant. Other advertised scopes
aren't included in the fallback.

When `sbx` uses recorded defaults or resource-required scopes, it also
requests `offline_access` if the authorization server advertises it. The
server can then issue a refresh token, so you don't have to authorize again
when the access token expires. Scopes passed to `sbx mcp auth --scope` are
requested exactly as given, without `offline_access`. Existing credentials
issued without a refresh token aren't upgraded; run `sbx mcp auth` again to
request a new grant.

Pass `--no-scope` to suppress the recorded defaults, resource-required scopes,
and advertised scope fallback for one authorization, without changing the
stored defaults:

```console
$ sbx mcp auth serverx --no-scope
```

You can't combine `--no-scope` with `--scope`. Scopes you choose are checked
against the authorization server's advertised scopes and the resource's
required scopes. If either source publishes scopes, a scope present in neither
produces a warning but is still requested. The authorization server can still
refuse an advertised scope for a particular
client. For a local authorization flow that requested scopes, `sbx` lists the
requested, advertised, and refused scopes and suggests a retry command. If the
server identifies the refused scopes, the command removes them. Otherwise, it
uses `--no-scope`.
`sbx` never retries automatically.

For each OAuth-backed remote server exposed to a sandbox, the gateway exposes a
helper tool named `<server>-authorize`, such as `notion-authorize`. The agent can
call the tool to authorize or reauthorize the server. If the server isn't
authorized, the helper is the only tool exposed for that server.

You can manage OAuth credentials from the host:

```console
$ sbx mcp auth status notion
$ sbx mcp auth notion
$ sbx mcp auth rm notion
```

Use `--all` to apply `auth`, `auth status`, or `auth rm` to all registered
OAuth-backed servers. The `auth status` output reports the scopes granted by the
authorization server, the defaults recorded with `sbx mcp add --scope`, and the
scopes the server supports. It collapses duplicate scope names and highlights
granted scopes that weren't requested or are no longer in the supported set.
Use `--json` for machine-readable output:

```console
$ sbx mcp auth status notion --json
```

### Override the OAuth resource indicator

Use `--resource` when your OAuth provider requires a token <example-value> that
differs from the resource identifier discovered by `sbx`. By default, `sbx`
uses the server's protected-resource metadata, or the endpoint URL if the
metadata is absent. Check the value with `sbx mcp inspect <SERVER>` before
setting an override:

```console
$ sbx mcp add serverx --url https://mcp.serverx.example/mcp \
  --resource https://api.serverx.example/mcp
```

Use the resource URI supplied by your provider. It must have a scheme and host
and no fragment. To change an existing registration's value, remove the
registration and add it again.

This override requires OAuth authorization on the host. The hosted gateway
doesn't use it unless you also supply `--oauth-authorization-server` or
`--client-id` to route authorization through the host. Without those flags,
`sbx mcp add` warns that the hosted gateway won't use the override.

## Choose an MCP mode

Every sandbox starts an MCP gateway. When the sandbox starts, supported agent
integrations read the gateway URL and register it with the agent.

Whether you pass `--static-mcp` when you create the sandbox determines its MCP
mode:

- Static mode loads only the servers you specify, or starts without servers
  if you specify `none`. It doesn't expose dynamic discovery tools to the agent.
- Dynamic mode pre-loads no servers and lets the agent find and attach
  registered servers.

This choice persists across sandbox restarts unless you
unload every server in a named static set.
Sandboxes created with `--static-mcp none` remain static.

### Use static mode

Pass `--static-mcp` to pre-load registered MCP servers:

```console
$ sbx mcp add notion --url https://mcp.notion.com/mcp
$ sbx mcp add linear --url https://mcp.linear.app/mcp
$ sbx run claude --name my-session --static-mcp notion,linear
```

You can pass `--static-mcp` as a comma-separated list or repeat the flag:

```console
$ sbx run claude --name my-session \
  --static-mcp notion --static-mcp linear
```

Every name in the static set must already be registered with `sbx mcp add`. The
gateway doesn't expose `mcp-find`, `mcp-add`, or `mcp-config-set` to the agent.

You can't replace the initial set by passing `--static-mcp` when reconnecting to
an existing sandbox. To attach another server from the host, use
`sbx mcp load`.

### Start without MCP servers

Pass `--static-mcp none` to `sbx create` or `sbx run` to start a local sandbox
with no MCP servers and no dynamic discovery tools:

```console
$ sbx run claude --name mcp-empty --static-mcp none
```

`none` is case-insensitive and can't be combined with server names. Cloud
sandboxes don't support this value. You can load registered servers later with
`sbx mcp load`. The sandbox remains in
static mode after loading or unloading servers and across restarts.

### Use dynamic mode

Omit `--static-mcp` to use dynamic mode. The gateway pre-loads no servers and
exposes `mcp-find`, `mcp-add`, and `mcp-config-set` to the agent. The agent can
search the registered server catalog and attach servers during the session.

If you run `sbx mcp add` after a dynamic sandbox starts, its gateway refreshes
the searchable catalog. The agent can then find and attach the new registration
without restarting. The `sbx mcp add` command doesn't attach the server by
itself.

## Add a server to a running sandbox

To attach an already-registered server to a running sandbox, use
`sbx mcp load`. This works in both static and dynamic modes:

```console
$ sbx mcp add linear --url https://mcp.linear.app/mcp
$ sbx mcp load linear --sandbox my-session
```

Connected agent sessions receive a tool-list update, so the added tools become
visible without reconnecting. The loaded server remains attached across sandbox
restarts.

## Remove a server from a running sandbox

In Docker Sandboxes v0.48.0 and later, use `sbx mcp unload` to detach a server
from a running sandbox's local MCP gateway. This works in both static and
dynamic modes. Cloud sandboxes and hosted MCP gateways don't support unloading
servers.

```console
$ sbx mcp unload linear --sandbox my-session
```

Connected agent sessions receive a tool-list update, so the server's tools are
removed without restarting the agent. The command also removes the saved
attachment so the server isn't restored when the sandbox or daemon restarts.
The server's host registration and credentials <example-value> available, and other
sandboxes that have loaded the server are unaffected.

To attach the server again:

```console
$ sbx mcp load linear --sandbox my-session
```

In dynamic mode, the agent can also find and attach the registered server
again. Unloading a server doesn't prevent the agent from reloading it.

If you unload all servers from a sandbox created with a named static set, it
stays in static mode for the current session. After restarting the Docker
Sandboxes daemon and reconnecting, the agent can find and attach registered servers. A sandbox
created with `--static-mcp none` keeps dynamic discovery disabled after unloading
its last server and restarting.

## Built-in gateway tools

The local MCP gateway exposes a small set of built-in tools. These tools belong
to the gateway itself, not to a registered MCP server. Agents can see and call
them on the same MCP connection as server tools, so they can appear in agent
tool lists, logs, policy decisions, audit logs, or approval prompts.

You don't need to call these tools directly for normal setup. Use `sbx mcp`
commands to register servers and manage credentials from the host. The tools
matter because agents can call them during a session, and admins can govern
them separately from tools provided by registered MCP servers.

| Tool                 | Description                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------ |
| `mcp-exec`           | Executes a tool by name through the gateway.                                               |
| `code-mode`          | Creates an ephemeral JavaScript tool that can call selected tools through the MCP gateway. |
| `mcp-find`           | Searches the registered server catalog without changing sandbox state. Dynamic mode only.  |
| `mcp-add`            | Attaches a registered server to the sandbox. Dynamic mode only.                            |
| `mcp-config-set`     | Sets per-session configuration overrides for an attached server. Dynamic mode only.        |
| `<server>-authorize` | Starts or restarts OAuth authorization for an exposed OAuth-backed remote server.          |

Servers attached with `mcp-add` remain attached across sandbox restarts. The
gateway exposes `<server>-authorize` for OAuth-backed remote servers, even when
they already have a valid token. Local stdio servers don't expose this helper.
If `code-mode` creates a generated tool, the tool is shared by clients connected
to the sandbox's gateway and disappears when the gateway is replaced or stops.

In MCP access policies, built-in gateway tools are `MCP::Primordial` resources
and use the `invokePrimordial` action. Tools from registered MCP servers are
`MCP::Tool` resources and use the `invokeTool` action. For details, see the
MCP policy reference.

## Manage registrations

List registered servers:

```console
$ sbx mcp ls
```

Inspect a registered server:

```console
$ sbx mcp inspect notion
```

When multiple registrations share a name, inspection requires `--sandbox` to
select the owning sandbox:

```console
$ sbx mcp inspect filesystem --sandbox my-sandbox
```

For environment-owned registrations, inspection shows the owning sandbox and
environment in text, JSON, and YAML output. If only one registration has the
name, you can inspect it without `--sandbox`.

Remove a registered server:

```console
$ sbx mcp rm notion
```

Removing a registration doesn't detach the server from sandboxes that have
already loaded it. Use
`sbx mcp unload` for each sandbox
before removing the registration.

For OAuth-backed servers, `sbx mcp rm` removes the OAuth access token <example-value> it
removes the server registration. A client secret for a pre-registered OAuth
client and its identity binding remain in the host credential store so you can
reuse them when you re-add the same client. The command prints the
`sbx secret rm` commands for removing them. To remove only the OAuth access
token, use `sbx mcp auth rm`.

## Governance

Organizations with AI Governance can use
Organization MCP access policies to
control MCP server registration, tool calls, gateway meta-tools, resources,
prompts, and approval requirements. MCP access policies are organization
policies written in Cedar.
