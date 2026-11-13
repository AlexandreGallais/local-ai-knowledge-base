---
title: "Manage credentials (part 3 of 3)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes/configuration/credentials.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Manage credentials (part 3 of 3)

## Custom secrets

> **Important:**
> Custom secrets are experimental. Behavior, flags, and the placeholder format may
> change without notice.

For credentials that don't fit the service-identifier model — for example,
when an agent validates the environment variable format at boot — use
`sbx secret <example-value>`. The secret is keyed on one or more target domains, an
environment variable name, and an optional placeholder string, instead of a
service identifier.

Prefer the service-based flow whenever it's an option —
the kit handles the wiring; you only provide the value.

### Set a custom secret

Custom secrets are global by default. Pass `--sandbox` to scope one to a
specific sandbox.

To read the value from standard input, set `API_KEY` in your host environment
and pipe it with `--value-stdin`:

```console
$ printf '<example-value>' "<example-value>" | sbx secret <example-value> \
    --host api.example.com \
    --env API_KEY \
    --value-stdin
```

This keeps the value out of the `sbx` command arguments. Omit `--value-stdin`
to enter the value at a prompt instead. `--value-stdin` can't be combined with
`--value`, `--token`, `--ref`, or `--command`.

> **Warning:**
> Passing a literal secret with `--value` or `--token` records it in shell
> history and exposes it in process arguments. Expanding an environment
> variable with `--value "$API_KEY"` still exposes the value in process
> arguments. Use the prompt or standard input instead.

Inside the sandbox, `API_KEY` is set to a generated placeholder (for example,
`sbx-cs-<rand>`). When a sandboxed process sends a request to any of the
configured hosts and the placeholder appears in an HTTP request header, the
proxy replaces it with the real value. Replacement applies only to HTTP request
headers, not request bodies. The agent never sees the real secret.

### List custom secrets

To find stored custom secrets by host, use `--host`:

```console
$ sbx secret ls --host api.example.com
```

To filter by environment variable name, use `--env-name`:

```console
$ sbx secret ls --env-name API_KEY
```

Add `--sandbox` to list only matching secrets stored for a specific sandbox:

```console
$ sbx secret ls --host api.example.com --sandbox my-sandbox
```

### Target multiple hosts

Repeat `--host` to cover multiple domains with the same secret — useful when
an API is split across related hostnames or when two unrelated endpoints share
a credential:

```console
$ sbx secret <example-value> \
    --host api.example.com \
    --host uploads.example.com \
    --env API_KEY \
    --value <secret>
```

A `--host` value can also use wildcards, with the same syntax as
network rule hostname patterns:
`*` matches a single label (`*.example.com` covers `api.example.com`) and `**`
matches any number (`**.example.com` covers `api.example.com` and
`v2.api.example.com`).

### Resolve custom secrets dynamically

Custom secrets also accept dynamic secret sources.
Replace `--value` with either `--ref` or `--command`:

```console
$ sbx secret <example-value> \
    --host api.example.com \
    --env API_KEY \
    --ref 'op://Work/Example/credential'
```

Dynamic custom secrets resolve on demand by default. Pass `--refresh` with a
duration to cache the resolved value. The verification and error-output flags
work the same as they do for service secrets. `--ref` and `--command` can't be
combined with `--value` or `--token`.

### Install npm packages from GitHub Packages

The built-in `github` service doesn't inject credentials into requests to
`npm.pkg.github.com`. To install private npm packages from GitHub Packages,
add a custom secret for that host.

On the host, authenticate the GitHub CLI with a token that can read the package.
GitHub documents a personal access token (classic) with at least `read:packages`
scope for this use. See
Authenticating to GitHub Packages.
Then register the token <example-value>, replacing `my-sandbox` with your sandbox's name:

```console
$ sbx secret <example-value> \
    --sandbox my-sandbox \
    --host npm.pkg.github.com \
    --env NODE_AUTH_TOKEN \
    --command '<example-value>'
```

The command prints a generated placeholder. For an existing sandbox, set
`NODE_AUTH_TOKEN` to that placeholder using `sbx run -e` for an agent session,
or `/etc/sandbox-persistent.sh` for future sessions. See
Set environment variables.
Use the placeholder, not the actual GitHub token.

Inside the sandbox, add the following entries to your project's `.npmrc`,
replacing `@my-org` with the package's scope. Keep `${NODE_AUTH_TOKEN}` literal
so npm reads the environment variable:

```ini
@my-org:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

Install the package inside the sandbox:

```console
$ npm install @my-org/my-package
```

Replace `@my-org/my-package` with your package name. npm sends the placeholder
to `npm.pkg.github.com`, and the proxy replaces it with the token <example-value> by
`gh auth token` on the host.

## Credential <example-value>

A credential <example-value> file records which credential <example-value> and domains
you've approved for each service. It lives at
`~/.config/sbx/credentials.yaml`, or `%APPDATA%\sbx\credentials.yaml` on
Windows.

Third-party kits require an approved binding for each credential they use,
regardless of schema version. `sbx` creates one interactively the first time you
run such a kit (see First-run approval); you can also
write entries by hand. Credentials <example-value> only by the built-in kits shipped
with `sbx` don't need a binding.

Each entry under `bindings` is keyed by a
service identifier and approves one or both credential
mechanisms:

- `apiKey` — approves injecting the service's stored API key. The value comes
  from the secret store (`sbx secret set <service>`); the
  binding records approval, it doesn't hold or locate the value.
- `oauth` — approves the OAuth flow for the service. You sign in on the host,
  and the proxy handles token <example-value> and routing. OAuth domains include the
  token <example-value> host and any resource hosts declared by the kit.

Each mechanism takes a `domains` list that records the domains you approved.
`sbx` asks for approval when a kit requests domains that the existing binding
doesn't cover.

```yaml
bindings:
  anthropic:
    apiKey:
      domains: [api.anthropic.com]
  github:
    apiKey:
      domains: [api.github.com, github.com]
```

A binding is only an approval record: the presence of `apiKey` or `oauth`
authorizes that mechanism. Declining a credential <example-value> no entry at all.
The real credential isn't stored in this file.

### First-run approval

When a third-party kit needs a credential that has no binding, `sbx` walks you
through approving one. For an API key, you can use a value already in the secret
store or enter one at the prompt. For OAuth, you approve the sign-in flow. In
both cases, you approve the domains declared by the kit. `sbx` writes the entry
to `credentials.yaml`.

In non-interactive contexts (CI or `--detach`), there's no one to answer the
prompt. In `sbx`, the sandbox starts with the credential <example-value> when no
binding exists. For a required credential, `sbx` prints a warning rather than
failing sandbox creation. This is a limitation of `sbx` enforcement: kit authors
shouldn't rely on a required credential being available merely because the
sandbox started.

Pre-create the binding by running the kit interactively once or by writing
`credentials.yaml` directly before running unattended.

The bindings file gates whether a third-party kit can use a service
credential. The kit's credential <example-value> rules and network permissions still
constrain which requests can carry the credential.

### Kits that require a binding

Third-party kits require your approval to use credentials, regardless of
schema version. The built-in kits shipped with `sbx` can use credentials they
request without a binding. If a third-party v2 kit extends a built-in agent,
you must approve its use of the inherited credentials. You must also approve
a third-party kit that requests the same service itself.

## Registry credentials

Registry credentials <example-value> to private OCI registries when pulling
templates or kits, and can
also let the agent pull and push images from inside the sandbox through the
host-side proxy. Use `sbx secret set --registry <host>` to store them. For
Docker Hub, `sbx` reuses your `sbx login` session — no registry secret needed.
For other registries (GitHub Container Registry, ECR, ACR, self-hosted Nexus,
and so on), store credentials with `sbx secret set --registry`.

Choose the scope by adding `--all-sandboxes`, adding `--sandbox SANDBOX`, or
passing neither:

```text
sbx secret set [--all-sandboxes | --sandbox SANDBOX] --registry HOST
```

- **Host-only** (no scope flag): `sbx` uses it to pull templates
  and kits when creating a sandbox. The credential stays on the host and is
  never available inside the sandbox.
- **All sandboxes** (`--all-sandboxes`): same as host-only, plus the proxy
  authenticates registry login requests from sandboxes. The credential stays
  on the host and is never written to the sandbox filesystem. Use it when
  agents build and publish container images.
- **Sandbox-scoped** (`--sandbox SANDBOX`): same proxy behavior as
  `--all-sandboxes`, but only for the named sandbox. Use it when only one
  sandbox needs registry access.

### Store registry credentials

Pipe a token from stdin and target the registry hostname:

```console
$ gh auth token | sbx secret set --registry ghcr.io --password-stdin
```

For registries that require a username (for example, ACR with an admin
account), add `--username`:

```console
$ echo "<example-value>" | sbx secret set \
    --registry myregistry.azurecr.io \
    --username myuser \
    --password-stdin
```

Add `--all-sandboxes` to make the credential <example-value> to every new sandbox:

```console
$ gh auth token | sbx secret set --all-sandboxes --registry ghcr.io --password-stdin
$ sbx run claude
```

Store all-sandboxes registry credentials <example-value> creating a sandbox. Existing
sandboxes don't pick up all-sandboxes registry credentials added later. To add
registry access to an existing sandbox, use a sandbox-scoped credential instead.

To scope the credential to a single sandbox, store it under that sandbox's name:

```console
$ gh auth token | sbx secret set --sandbox my-app --registry ghcr.io --password-stdin
```

For v2 kits on Docker Hub, `sbx kit pull` and `sbx kit push` use the session from
`sbx login`. For other registries, both commands use these credentials. Both
commands fall back to the Docker credential store, so credentials from
`docker login` also work. V3 kits are
published with Docker Buildx,
which uses the credentials from `docker login`.

### Trust a private registry authentication endpoint

Use `--registry-auth-endpoint` with `--registry` when a self-hosted registry
authenticates sandbox requests through a separate host. For example, a
self-hosted GitLab registry at
`registry.example.com` might advertise `https://gitlab.example.com/jwt/auth`
as the `realm` in its Registry v2 `WWW-Authenticate: Bearer` challenge.

Store the credential and trust that endpoint for a specific sandbox:

```console
$ echo "<example-value>" | sbx secret set --sandbox my-app \
    --registry registry.example.com \
    --username "$GITLAB_USER" \
    --registry-auth-endpoint https://gitlab.example.com/jwt/auth \
    --password-stdin
```

Replace the example hosts with your registry and authentication hosts, and set
`GITLAB_USER` and `GITLAB_PAT` to your GitLab username and personal access token.

This authorizes the proxy to send the stored registry credential to
`https://gitlab.example.com/jwt/auth` to exchange it for a registry token. The
advertised realm must use HTTPS and match the configured host and path exactly.
Other paths on that host, including `/jwt/auth/`, aren't covered. The endpoint
URL must contain no embedded credentials, query string, or fragment. Token
requests can still include protocol parameters such as `service` and `scope`.

Without this flag, the proxy accepts authentication endpoints on the registry's
own host and built-in registry relationships, such as Docker Hub's authentication
host. Other authentication hosts require explicit configuration.

### Remove registry credentials

Remove both the host-only and all-sandboxes entries for a registry:

```console
$ sbx secret rm --registry ghcr.io -f
```

To remove only the all-sandboxes entry and leave the host-only credential in
place, pass `--all-sandboxes`:

```console
$ sbx secret rm --all-sandboxes --registry ghcr.io -f
```

To remove a sandbox-scoped credential, pass the sandbox name:

```console
$ sbx secret rm --sandbox my-sandbox --registry ghcr.io -f
```

## Best practices

- Use stored secrets to provide credentials. The OS keychain
  protects them at rest; on Linux hosts without a keychain they are held in a
  permission-protected file instead. See
  Where secrets are stored.
- Don't set API keys manually inside the sandbox. Sandbox agents are
  pre-configured to use proxy-managed credentials.
- Registry credentials stay on the host and are injected by the proxy when a
  sandbox authenticates to the registry. Reserve them for sandboxes that need
  registry access, and prefer sandbox scope over `--all-sandboxes` to limit
  exposure.
- Several agents support OAuth as another secure option: the flow runs on the
  host, so the token is never exposed inside the sandbox. If you haven't stored
  a credential, the agent prompts you to authenticate — Codex prompts on the
  host from `sbx run codex`, while Claude Code, Cursor, and Droid prompt
  interactively inside the sandbox. To authenticate ahead of time, run
  `sbx secret set openai --oauth` for Codex or use `/login` inside Claude
  Code; Cursor and Droid have no ahead-of-time option, so their sign-in prompt
  appears when the agent starts. See the individual agent pages
  for each agent's flow.
- If you store credentials in 1Password or AWS Secrets Manager, see
  Sourcing credentials from 1Password
  and Sourcing credentials from AWS Secrets Manager.

## Custom templates and placeholder values

When building custom templates or installing agents manually in a shell
sandbox, some agents require environment variables like `OPENAI_API_KEY` to be
set before they start. Set these to placeholder values (e.g. `proxy-managed`)
if needed. The proxy injects actual credentials <example-value> of the environment
variable value.
