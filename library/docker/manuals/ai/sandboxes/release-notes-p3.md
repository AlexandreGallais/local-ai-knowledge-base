---
title: "Docker Sandboxes release notes (part 3 of 3)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes/release-notes.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Sandboxes release notes (part 3 of 3)

## 0.50.0

GitHub release

### Highlights

Docker Sandboxes v0.50.0 adds configurable kit host mounts, preserves persistent kit volumes across updates and sandbox recreation, and adds cloud sandbox inspection. It also strengthens host-execution, credential, and workspace-copy protections.

### What's new

#### Security

- `sbx cp` rejects symbolic links that escape a sandbox workspace when the workspace is reached through an alternate host path, including a symlink or junction, macOS `/private/tmp`, or a Linux bind mount of a workspace subdirectory.
- Host Git commands no longer run programs configured by a sandbox through the workspace repository's `.git` directory.
- Browser, clipboard, and self-update helpers run only from trusted system locations, preventing sandbox-writable directories on `PATH` from supplying those programs.
- Local source kits are reused and composed only when their digests match recorded local builds. Each local source kit rebuilds once after upgrading.
- Git kit references reject ambiguous paths, non-ASCII hostnames, and SSH transport syntax. Use IDNA ASCII labels for internationalized hostnames. HTTPS source restrictions are checked against the parsed URL host.
- MCP OAuth requests block cross-origin credential redirects. Rejected silent refreshes preserve saved credentials without opening a browser.
- Browser-open logs omit URL query strings and fragments, keeping OAuth parameters and tokens in those components out of daemon logs and diagnostic bundles.
- Windows clients verify that the daemon's named pipes belong to the same Windows user. Before using the updated CLI, older elevated daemons may need to be stopped with the previous CLI or Task Manager.
- Environment MCP commands require approval to execute on the host, remain scoped to their sandbox, and are disabled by `--skip-host-commands`. Approval notices explain that executable paths are pinned, but file contents are not. Keep executables and scripts outside writable sandbox mounts.
- Gordon clears **Approve all** and **Always allow** grants when a conversation resumes, requiring approval before running tools again.

#### Kits

- When creating a sandbox, use `--mount HOST:SANDBOX_PATH` with `sbx create` or `sbx run` to select a host directory for a kit-declared host mount. The sandbox target must exactly match the `path` of a `host-mount@1` capability declared by a kit in the resolved kit set. Environment files support the same bindings through `mounts`, mapping sandbox target paths to host directories. These options cannot add undeclared mount targets.
- Persistent kit volumes retain data across kit updates and sandbox removal and recreation with the same name. This applies to sandboxes created with this version; existing sandbox records retain their previous storage behavior.
- Creating a sandbox from a v3 kit set without a workload kit reports a clear explanation instead of "the kit set is not coherent."

#### Sandbox lifecycle and workspaces

- Host Git identity is copied into sandboxes for repositories that use the reftable ref format.
- Sandboxes created with `--clone` preserve kit-provided workspace files and report clone initialization failures.
- Canceling clone remote configuration preserves the cancellation error even if stopping Git also fails.

#### Authentication and agents

- Kiro IDE AWS IAM Identity Center sign-in callbacks reach the sandbox even when the callback port hasn't been published.
- Claude sandboxes using subscription OAuth are provisioned without the API-key helper.

#### Networking and policy

- HTTP network rules support query-parameter restrictions. Repeat `--query name=value` to require multiple parameters.

#### Cloud sandboxes

- `sbx --cloud inspect <id|name>` shows details for a single cloud sandbox, including published port URLs. Use `--format json` or `--format yaml` for scripting.
- Running `sbx --cloud run --name <name>` without an agent suggests the correct form: `sbx --cloud run <agent> --name <name>`.

#### CLI and diagnostics

- `sbx exec` returns exit status 125 when it cannot run the command, such as when the sandbox doesn't exist.
- On macOS and Windows, `sbx diagnose` and daemon logs warn when `SSL_CERT_FILE` or `SSL_CERT_DIR` replaces the system trust store and can cause HTTPS certificate verification failures.

#### Experimental Runtime backend

- Workloads have network access.
- Startup stops waiting and cleans up when a workload exits or fails before becoming ready.

## Earlier releases

For older versions, see the
Docker Sandboxes releases on GitHub.
