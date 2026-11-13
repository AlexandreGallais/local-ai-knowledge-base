---
title: "Docker Sandboxes release notes (part 1 of 3)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes/release-notes.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Sandboxes release notes

This page lists changes in recent stable releases of Docker Sandboxes. For
the full release history, including pre-releases and downloads, see the
Docker Sandboxes releases on GitHub.

## 0.53.0

GitHub release

### Highlights

Docker Sandboxes v0.53.0 adds local disk usage reports, Claude in Chrome access, and automatic loopback port publication for kits. It also improves recovery after host network changes, sandbox startup, credential handling, and command output for scripts.

> **Note:**
> v0.52.0 was skipped. These release notes cover changes since v0.51.0.

### Breaking changes

#### Gemini agent retirement

The built-in `gemini` agent name is retired. Existing Gemini sandboxes keep running, but cannot be moved with `sbx move`.

#### Agent arguments

`sbx run <agent> -- <args>` preserves the image's entrypoint arguments when you pass a prompt or subcommand, matching cloud behavior. If the entrypoint already includes a subcommand, omit that subcommand from your arguments to avoid running it twice. For example, use `sbx run kiro -- "explain this project"` without repeating `chat`. To run a different subcommand, invoke the agent directly with `sbx exec` in a running sandbox.

#### Credential providers and settings

- Built-in secret reference providers run host tools from a temporary directory and ignore empty or relative `PATH` entries. Put provider tools in absolute `PATH` directories, use absolute configuration paths, and configure asdf or mise versions globally instead of relying on project-only selections.
- `DOCKER_SANDBOXES_USE_DHI` is no longer read. Use `sbx settings set platform.images.useDHI true` to select Docker Hardened Image templates.
- `sbx logout` requires confirmation even without a running daemon. Use `--yes` or `-y` in scripts. `sbx --cloud logout` warns that signing out affects the whole account, then performs the same sign-out.
- Unsupported `--detach` and `--privileged` flags have been removed from `sbx exec` and `sbx env exec`. Local exec commands also reject `--detach-keys` instead of ignoring it.

#### HTTP policy matching

HTTP policy matching treats ASCII letters in URL paths and query parameter names and values case-insensitively. Review rules that rely on case to distinguish allowed and denied requests.

### What's new

#### Security and credentials

- Sandbox restarts check filesystem policy against the original static mount sources and reject inconsistent saved mount metadata. If a mount source resolves elsewhere, restore the original host path or recreate the sandbox. For mismatched saved metadata, recreate the sandbox. Save accessible sandbox files before removing it.
- Kit install hooks expressed as argument lists pass each argument literally, without shell interpretation.
- Claude Code Remote Control keeps environment and session credentials on the host and omits remotely supplied environment variables and MCP configuration. Access requires the `claude.remoteControl` setting.
- Diagnostic bundles redact account names, home-directory installation paths, and usernames in archive filenames. Sanitized errors also redact paths containing spaces or Unicode, and human-readable inspection output removes terminal control characters.
- `sbx rm`, `sbx prune`, and `sbx env rm` avoid deleting a different sandbox that takes over a name after removal is confirmed.

#### Kits, agents, and skills

- Enable `claude.chrome` to let sandboxed Claude Code use Claude in Chrome with your stored Claude subscription OAuth login. Install the host browser extension, sign in with the same account, and start Claude Code with `--chrome`. API-key authentication alone is insufficient. Turning the setting off blocks further connections; end existing browser sessions to revoke active access.
- Kits granted `ports.publish` with `approval: none` can request an automatically assigned loopback host port without prompting. These bindings disappear when the sandbox stops. Fixed host ports still require approval.
- Unused source-kit build images are eligible for cleanup after seven days. Images referenced by existing sandboxes, saved templates, or in-progress operations are retained. Collected builds may need to be restored or rebuilt on later use.
- Kits launched from Docker Console receive configured proxy-managed API-key variables, including the Anthropic and OpenAI variables used by agents such as Hermes.
- Codex uses the local model selected with `--model` instead of falling back to OpenAI. Agent launchers wrapped in `tini` handle positional prompts and subcommands correctly.
- With `--clone`, kit install hooks can access the cloned project in the workspace. V3 kits receive requested privileged container access, so the kit builder can start Docker inside the sandbox.
- Kit inspection and validation warn about unsupported static-file paths. Install progress identifies commands without descriptions, and `sbx kit add` explains when a recorded mount is denied or its host path is missing.
- Skill import previews group skills by source directory, show missing agent directories only with `--verbose`, and avoid incorrect overwrite warnings.

#### Sandbox lifecycle and workspaces

- `sbx run` reattaches to the current directory's sandbox when another directory with the same name has taken the default sandbox name. Creation rejects names that differ from an existing local name only in case.
- Environment files use the last matching port, MCP server name, or additional workspace target, including across merged files. A replacement replaces the whole entry, so repeat every field you want to retain. Invalid host IP bindings are rejected before planning.
- Sandboxes inherit the host's global Git identity when the workspace root isn't a Git repository. SSH sessions use the login shell of the sandbox user.
- `sbx run` preserves agent output when stdin is `/dev/null` or a closed pipe. Image-pull retries continue into the agent session when a cached image is used.
- Sandbox creation and restore retry temporary registry failures while preserving the original mirror and DHI settings. Concurrent commands on macOS are less likely to cause startup failures while reading cache metadata.
- Sandboxes can restart when Docker was manually installed inside them but cannot start, unless their configuration requires Docker inside the sandbox.
- Canceling creation, runs, or kit additions during engine checks stops promptly. Shell environment recovery stops hung subprocesses, and quitting the TUI cancels pending shell startup while preserving terminals already opened.
- `sbx cp` supports copying a directory to a new path ending in `/` and reports a missing destination directory before uploading.
- Clipboard image paste ignores images larger than 64 MiB, returning an empty clipboard to the agent.

#### Networking and policy

- Stalled outbound connections close after about 30 seconds by default, allowing clients to reconnect after host network changes such as connecting a VPN. Tune the timeout with `egress.stalledConnectionTimeoutSeconds`, or set it to `0` to disable it. Restart the daemon to apply a changed value to existing sandboxes.
- Fixed `EOF` errors during sign-in and other requests through TLS-inspecting proxies that reject handshakes offering ML-DSA certificate signatures, including some Zscaler, Palo Alto, and F5 configurations.
- Published loopback ports work with WSL2 mirrored networking, restoring access to the clone-mode Git remote.
- Unpublishing an automatically assigned port keeps it unpublished after a sandbox restart. Published-port endpoints bracket IPv6 host addresses in list and inspect output, including JSON and YAML.
- Kit pulls work with registries such as Artifactory and self-hosted GitLab whose token service uses a separate host with a private IP address. GitHub release-asset HEAD requests no longer fail with 401 when a GitHub secret is configured.
- DNS answers include CNAME records for aliased hostnames, supporting tools such as Kerberos. HTTPS proxy connections preserve trailing dots in destination names.
- With UDP egress disabled, the first 20 distinct refused external destinations per sandbox network get individual log entries. Further destinations share a `<further blocked attempts>` entry and remain blocked. Denied host UDP traffic is labeled `host.docker.internal`.
- Empty policy rule listings return an empty list in structured output. Declining `sbx policy reset` returns an error, and policy initialization rejects an explicitly empty sandbox scope.

#### Authentication, MCP, and models

- Docker sign-in retries device-code polling after rate-limit access-denied responses. On Linux, a daemon that started before the keychain was available suggests `sbx daemon restart` instead of repeatedly requesting sign-in.
- Unreachable OAuth callbacks time out after 60 seconds. Canceling browser, clipboard, MCP metadata, or image-pull requests also cancels associated helper work and credential reads.
- Environment files can register host MCP commands for multiple sandboxes with independent approval and revocation. Damaged scoped registrations no longer block unrelated MCP gateways.
- Use `--sandbox` with `sbx mcp inspect` or `sbx mcp rm --registration-only` to select a sandbox-owned registration when names are shared. Recovery preserves other sandboxes' registrations and saved credentials.
- MCP, model-provider, and credential errors include corrective commands for unsupported headers, registration conflicts, missing providers, removal failures, and model-server startup timeouts.
- Secret import cancels when confirmation input ends. Conflicting secret-source flags, ambiguous quiet secret listings, and MCP command arguments supplied without `--command` are rejected instead of being silently accepted.

#### Cloud sandboxes

- Sandbox moves reject occupied explicit destination names before capturing or transferring the source. `--name` sets the exact destination name. Cloud-to-local moves derive the default destination name from the source sandbox name even when selected by ID.
- Moving an already-cloud sandbox with `--to cloud` exits cleanly with an explanatory message. Resume recognizes running lifecycle states consistently, and sandboxes whose container creation fails can be deleted instead of remaining stuck.
- Cloud sign-in failures produce warnings and suggest signing in again when appropriate. Invalid SSH certificate lifetimes are rejected even when a cached certificate is available.
- Failed volume and template removals include failure records in JSON and YAML. Port publishing includes the reported protocol in structured output.
- Cloud secret and policy commands reject unsupported local-only flags and filters instead of silently ignoring them. In particular, cloud secret writes reject `--ref` and `--command` instead of storing a literal value.

#### CLI, templates, and diagnostics

- `sbx df` reports local image, container, and managed-volume disk usage and estimated reclaimable space. Use `--verbose` for individual resources. The estimate isn't the amount `sbx prune` alone removes.
- `sbx template ls --all --digests --no-trunc` reveals untagged and digest-only local images. Remove them by repository digest or image ID. JSON and YAML listings preserve full image IDs.
- `sbx inspect` is listed in help and shell completion. Local JSON and YAML inspection includes the sandbox ID and creation time.
- Update notices, confirmation previews, and diagnostic guidance go to stderr to preserve redirected results. Kit pull, sign, and add commands and local template save and load commands write success results to stdout.
- Shell completion covers more supported values, including pull policies, timeout actions, capture modes, shared skills modes, and move destinations. Template save completion suggests source sandboxes, and template flags omit anonymous image IDs.
- Policy checks and MCP authorization accept `-v` for `--verbose`. MCP listings accept `list` as an alias for `ls`, and SSH setup removal accepts `rm` as an alias for `remove`.
- Commands reject more invalid arguments and unsupported options before doing work. Local exec preserves sandbox environment values when a bare host environment variable is unset. Commands requiring confirmation explain how `--no-input` prevents them from proceeding.
- `sbx diagnose --upload` captures daemon goroutine stacks even when the daemon API is unresponsive and retains more crash information and rotated logs. On macOS and Linux, send `SIGUSR1` to `sandboxd` to save goroutine stacks without stopping it.
- Linux packages recommend GNOME Keyring instead of requiring it. Sandbox creation explains missing or inaccessible `/dev/kvm`. Windows handles redirected AppData paths and stops the daemon during per-user MSI upgrades and uninstalls without opening an invisible console.
