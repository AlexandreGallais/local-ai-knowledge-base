---
title: "Manage credentials (part 1 of 3)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes/configuration/credentials.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Manage credentials

These credential stores and authentication flows apply to local sandboxes.
Cloud credentials require separate setup: see
Authenticate cloud agents.

Most agents need an API key for their model provider. An HTTP/HTTPS proxy on
your host intercepts outbound requests from the sandbox, looks up the matching
credential on the host, and overwrites the auth header before forwarding. The
real credential stays on the host when proxy management is active; the sandbox
sees only a sentinel value. See
Trust boundaries for how credential isolation
fits into the broader sandbox security model.

## How credential injection works

When a sandbox makes an outbound request, the host-side proxy decides three
things: whether the request **matches** a service the kit (or built-in agent)
declares, what **header** to write, and what **value** to inject. The kit
declares the match and the header; you provide the value on the host. For
proxy-managed credentials, the real value never enters the sandbox — the agent
sees only a sentinel like `proxy-managed`.

A kit can set OAuth `passthrough: true` to opt out of sentinel masking. This
sends the real token response into the sandbox and reduces credential isolation.
See the `oauth` kit fields.

There are several ways to provide that value. When more than one source has a
value for the same service, the stored secret takes precedence.

| Form                                                                        | What it is                                                   | Use it when                                                                                                      |
| --------------------------------------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| Stored secrets (`sbx secret set`)                        | A value or dynamic source in your OS keychain, keyed by service | The default for any built-in or kit-declared service                                                          |
| Custom secrets (`sbx secret set-custom`)                 | A value keyed to a domain and environment variable           | The service model doesn't fit, or the agent validates the variable's format |
| OAuth                                                                       | A host-side sign-in flow; the token never enters the sandbox | The agent supports it, such as Claude Code, Codex, Cursor, or Droid                                              |
| Registry credentials (`sbx secret set --registry`) | Authentication for pulling images and kits                   | Pulling templates or kits from a private registry                                                                |

Providing a value and approving its use are separate steps.
Credential bindings record which mechanisms and domains
you authorize a kit to use. They don't store the credential value.

For multi-provider agents (OpenCode, Docker Agent), the proxy selects
credentials based on the API endpoint being called. See individual
agent pages for provider-specific details.
