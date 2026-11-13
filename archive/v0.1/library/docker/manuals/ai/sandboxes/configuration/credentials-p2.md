---
title: "Manage credentials (part 2 of 3)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes/configuration/credentials.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Manage credentials (part 2 of 3)

## Stored secrets

`sbx secret set` stores credential <example-value> or dynamic secret <example-value> in your OS
keychain, keyed on a service identifier. Built-in agents declare a fixed set of
services. Custom kits can declare their own. The same `sbx secret set` flow
works for both.

Secrets whose names start with `mcp:` are reserved for the host's
MCP gateway. See MCP secrets for how
these differ from agent and provider credentials.

### Where secrets are stored

The store backing `sbx secret set` depends on your operating system:

- macOS: the system Keychain.
- Windows: the Windows Credential Manager.
- Linux: the Secret <example-value> exposed by your desktop keyring, such as GNOME
  Keyring or KDE Wallet.

The Ubuntu package recommends GNOME Keyring and installs it by default. You can
omit GNOME Keyring when installing the package on hosts without a desktop keyring.

On Linux hosts without a running Secret <example-value> — headless servers and some WSL
setups — `sbx` falls back to a file under your user config directory
`$XDG_CONFIG_HOME/com.docker.sandboxes`, which defaults to
`~/.config/com.docker.sandboxes` when `$XDG_CONFIG_HOME` is unset. The fallback
is automatic and needs no configuration. When you store a secret this way,
`sbx` prints a notice:

```text
No keychain detected - this secret will be stored on disk, protected by file permissions rather than a password
```

`sbx` stores the file in a directory with `0700` permissions, the same
file-permission model used for `~/.docker/config.json`. Any user or process that
can read the file can retrieve the stored credentials, so treat the directory as
sensitive. Where available, prefer a keychain, which mediates access per
application.

If you start a Secret <example-value> on the host later, `sbx` stores new secrets in the
keychain again. For more on running sandboxes without a desktop keyring, see
Can I use Docker Sandboxes on headless Linux?

### Store a secret

```console
$ sbx secret set anthropic
```

This prompts you for the secret value interactively. Service secrets are
global by default, so the secret is available to all sandboxes. To scope a
secret to a specific sandbox instead:

```console
$ sbx secret set openai --sandbox my-sandbox
```

Adding, updating, or removing a service secret takes effect in existing local
sandboxes without a restart, including secrets configured with `--command` or
`--ref`. Sandbox-scoped secrets take precedence over global secrets.

### MCP secrets

The MCP gateway uses the same host credential store for OAuth client secrets
and custom request header secrets. These records have names starting with
`mcp:` and appear in `sbx secret ls`. They stay on the host and aren't injected
into sandboxes. The gateway uses them to authenticate connections to MCP
servers on behalf of sandboxed agents.

For setup instructions, see
OAuth client secrets and
custom request headers. Header
secrets use the global scope and have their own
restart requirements.

### Use a dynamic secret <example-value>

Dynamic secret <example-value> let `sbx` retrieve a credential from an authenticated
host tool when the proxy needs it. The secret store contains the reference or
command instead of the credential value. Resolution and caching happen on the
host, and the sandbox still receives only the proxy-managed placeholder.

Use `--ref` with a 1Password <example-value> reference or an AWS Secrets Manager ARN:

```console
$ sbx secret set anthropic --ref '<example-value>'
$ sbx secret set openai \
    --ref '<example-value>'
```

The corresponding `op` or `aws` CLI must be installed and authenticated on the
host, with its installation directory listed as an absolute path in the host's
`PATH`. Built-in reference providers ignore empty and relative `PATH` entries.

Each reference resolution runs the provider CLI in a fresh temporary directory
on the host, outside the project directory. Use absolute paths for any provider
configuration files you specify. If you use a version manager such as asdf or
mise, configure the provider version globally rather than relying on a
project-only selection. Keep provider tools, their dependencies, and the host's
temporary directory outside writable sandbox mounts.

> **Note:**
> To resolve a reference with a specific 1Password <example-value> or AWS profile, set
> `OP_ACCOUNT` or `AWS_PROFILE` when you run `sbx secret set`. `sbx` uses that
> account or profile whenever it resolves the secret. If neither variable is
> set, the provider CLI uses its default.

Use `--command` for another host tool that prints a secret to standard output:

```console
$ sbx secret set github --command '<example-value>'
```

`sbx` runs the command through the host shell and trims its output. The command
text is stored and replayed by the daemon. Don't embed a secret <example-value> in the
command because the text can appear in shell history and process listings.

Secret <example-value> run from a fresh temporary directory on the host during
verification and refresh. Relative paths such as `./credential-helper` resolve
from that temporary directory. This applies to both
`sbx secret set --command` and `sbx secret <example-value> --command`.

Store helpers and any code or configuration they load outside writable
sandbox mounts. Run a helper by name from an absolute directory on the host's
`PATH`, use its absolute path, or explicitly change to its private directory
in the command. Keep the host's temporary directory outside writable sandbox
mounts as well.

By default, `sbx` verifies the source when you register it and reports an error
without exposing the resolver's standard error. Use `--no-verify` to store a
source that can't be resolved during registration. To troubleshoot an initial
verification failure, use `--show-error`. Provider error output can contain
sensitive information. You can't combine `--show-error` with `--no-verify`.

Resolved service secrets are cached for 55 minutes by default. To change the
cache duration, use `--refresh <duration>`. To resolve the source for every
credential use instead of caching it, pass `--refresh on-demand`:

```console
$ sbx secret set anthropic \
    --ref 'op://Work/Anthropic/credential' \
    --refresh 30m
$ sbx secret set github --command '<example-value>' <example-value> on-demand
```

`--ref` and `--command` are mutually exclusive. They can't be combined with
`--token`, `--oauth`, or `--registry`.

### Import from environment variables

If you already have API keys set in your shell, `sbx secret <example-value>` reads them
and stores them in the keychain without typing each value manually:

```console
$ sbx secret <example-value>
```

This scans your current session for the environment variables in the
built-in services table below and prompts you to confirm
each one before writing. To import a single service:

```console
$ sbx secret <example-value> openai
```

Pass `--all` to import everything without prompting (new entries only; existing
entries are left unchanged), or `--force` to overwrite existing entries:

```console
$ sbx secret <example-value> --all
$ sbx secret <example-value> openai --force
```

Pass `--dry-run` to preview what would be imported without writing anything.
Run `sbx secret ls` afterwards to confirm what's stored. For setting up
credentials in CI, see CI and headless use.

### Built-in services

Each built-in service name maps to the environment variables `sbx secret <example-value>`
reads and the API domains the proxy injects credentials into:

| Service      | Environment variables              | API domains                                                                                                                   |
| ------------ | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `anthropic`  | `ANTHROPIC_API_KEY`                | `api.anthropic.com`, `console.anthropic.com`, `claude.ai`, `mcp-proxy.anthropic.com`                                          |
| `cursor`     | `CURSOR_API_KEY`                   | `api2.cursor.sh`, `api3.cursor.sh`, `repo42.cursor.sh`, `cursor.com`                                                          |
| `droid`      | `FACTORY_API_KEY`                  | `api.factory.ai`, `app.factory.ai`, `relay.factory.ai`                                                                        |
| `github`     | `GH_TOKEN`, `GITHUB_TOKEN`         | `api.github.com`, `github.com`, `raw.githubusercontent.com`, `gist.github.com`, `copilot.github.com`, `api.githubcopilot.com` |
| `google`     | `GOOGLE_API_KEY`                   | `generativelanguage.googleapis.com`, `oauth2.googleapis.com`, `aiplatform.googleapis.com`, `vertexai.googleapis.com`          |
| `groq`       | `GROQ_API_KEY`                     | `api.groq.com`                                                                                                                |
| `mistral`    | `MISTRAL_API_KEY`                  | `api.mistral.ai`                                                                                                              |
| `nebius`     | `NEBIUS_API_KEY`                   | `api.studio.nebius.com`, `api.tokenfactory.nebius.com`                                                                        |
| `openai`     | `OPENAI_API_KEY`                   | `api.openai.com`, `openai.com`, `chatgpt.com`, `www.chatgpt.com`                                                              |
| `openrouter` | `OPENROUTER_API_KEY`               | `openrouter.ai`                                                                                                               |
| `xai`        | `XAI_API_KEY`                      | `api.x.ai`                                                                                                                    |

When you store a secret with `sbx secret set <service>`, the proxy injects
it into requests to the listed API domains.

### Services declared by kits

Use the service identifier from the kit's documentation when storing its
credential. For a kit that declares `my-service`, run:

```console
$ sbx secret set my-service
```

There's no separate registration step. The stored value and the kit's request
use the same identifier. Approve the kit's credential <example-value> when prompted.
See Credential bindings.

When authoring a kit, declare how it uses that service. V3 uses a credential
capability, and v2 uses a top-level `credentials` list. Both examples declare the
service and permit access to its API host:

**v3**

```yaml
capabilities:
  - type: com.docker.sandbox/network-policy@1
    config:
      runtime:
        allow: [api.my-service.com]
  - type: com.docker.sandbox/credential@1
    config:
      service: my-service
      phase: runtime
      apiKey:
        name: MY_SERVICE_TOKEN
        proxyManaged: true
        inject:
          - domain: api.my-service.com
            header: Authorization
            format: "Bearer %s"
```

For API keys, specify both the HTTP header and its value format, as in this
example. `sbx` doesn't use `apiKey.inject[].scheme` in v3 kits.

For OAuth, use JSON credential files and a provider that returns the refresh
token in `refresh_token`. `sbx` doesn't support TOML credential files or a
different refresh-token field.

Credentials <example-value> for the install phase are available during install hooks.
Add the domains that receive these credentials to the network policy's
`install.allow` list. An entry in `runtime.allow` alone doesn't grant access
during installation. If a hook reads a credential <example-value> variable,
include that name in its `env` list.

In `sbx`, the proxy stops injecting credentials into install-only domains
before the agent launches. A domain remains available for credential <example-value>
if any runtime credential <example-value> it, even under a different service name.
If you declare the same service for both phases, `sbx` uses the runtime
declaration's credential <example-value> in both phases.

**v2**

```yaml
credentials:
  - service: my-service
    apiKey:
      name: MY_SERVICE_TOKEN
      proxyManaged: true
      inject:
        - domain: api.my-service.com
          scheme: bearer

permissions:
  network:
    allow: [api.my-service.com]
```

Each service declares `apiKey`, `oauth`, or both. When both resolve at runtime,
the API key takes precedence and OAuth acts as the fallback. For complete
kit-side configuration, see
V3 credential <example-value>
or V2 credentials.

### List and remove secrets

List all stored secrets:

```console
$ sbx secret ls
SCOPE      SERVICE   SECRET
(global)   github    gho_GCaw4o****...****43qy
```

Remove a secret:

```console
$ sbx secret rm github
```

To remove a sandbox-scoped secret, pass `--sandbox`:

```console
$ sbx secret rm github --sandbox my-sandbox
```

Removing a sandbox-scoped secret <example-value> the global secret for that service,
if one is available.

> **Note:**
> Running `sbx reset` deletes all stored secrets along with all sandbox state.
> You'll need to re-add your secrets after a reset.

### GitHub token

The `github` service gives the agent access to the `gh` CLI inside the
sandbox. Resolve your existing GitHub CLI token on the host:

```console
$ sbx secret set github --command '<example-value>'
```

The daemon refreshes the token from the host command after the default cache
period. This is useful for agents that create pull requests, open issues, or
interact with GitHub APIs on your behalf.

### SSH agent

SSH agent forwarding is enabled by default. V3 kits must also request
`ssh-agent@1`
for the phase where they need it. Without that request, no agent socket is
forwarded to a v3 sandbox.

When `SSH_AUTH_SOCK` is set,
Docker Sandboxes uses the value from the client that creates, starts, or joins
each sandbox. It forwards that agent into the sandbox and sets `SSH_AUTH_SOCK`
there.

If your agent exposes a stable socket path, such as the 1Password SSH agent,
configure that path for every sandbox:

```console
$ sbx settings set ssh.agentSocketPath "$SSH_AUTH_SOCK"
```

An empty `ssh.agentSocketPath`, which is the
default, uses the agent supplied by each client instead. Use
`ssh.agentForwardingEnabled` to turn
forwarding on or off.

After changing forwarding or the socket selection, restart the daemon so
existing sandboxes use the new configuration:

```console
$ sbx daemon restart
```

The private keys stay on your host. Processes inside the sandbox can request
signatures from the forwarded agent, but they can't read or copy a private key.

Use SSH agent forwarding for Git operations over SSH and SSH-based commit
signing. The signing key must be loaded in the host SSH agent for sandboxed
commit signing to work. Outbound SSH connections are still subject to sandbox
network policy. For details, see
Commit signing.
