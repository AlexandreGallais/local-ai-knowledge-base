---
title: "Troubleshooting (part 2 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes/troubleshooting.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Troubleshooting (part 2 of 2)

## Clone mode reports "not in a Git repository" on WSL

On Windows, running `sbx run --clone` against a
repository on a WSL filesystem (a `\\wsl.localhost\...` path) can fail even
though the directory is a valid Git repository:

```console
> sbx run --clone claude \\wsl.localhost\Ubuntu\home\you\repo
error: --clone requires a Git repository, but \\wsl.localhost\Ubuntu\home\you\repo is not in a Git repository
```

The cause is Git's dubious ownership check. When Git on Windows accesses a
repository owned by a different user across the WSL boundary, it refuses to
operate on it, so the underlying repository detection fails:

```console
> git -C \\wsl.localhost\Ubuntu\home\you\repo rev-parse --show-toplevel
fatal: detected dubious ownership in repository at '//wsl.localhost/Ubuntu/home/you/repo'
```

Add the repository to Git's `safe.directory` list to allow access, then run
the command again:

```console
> git config --global --add safe.directory '%(prefix)///wsl.localhost/Ubuntu/home/you/repo'
> sbx run --clone claude \\wsl.localhost\Ubuntu\home\you\repo
```

## SSH agent socket is missing

If `SSH_AUTH_SOCK` is set inside a sandbox but `ssh-add -L` reports
`No such file or directory`, check whether your custom template includes
`socat`. Docker Sandboxes uses it to create the socket that forwards requests
to your host SSH agent. Installing OpenSSH client tools alone isn't enough.

For an Ubuntu-based custom template, add `socat` to the packages installed as
root in your Dockerfile, then rebuild the template and create a sandbox from
it. Docker-provided sandbox templates already include `socat`.

If the socket exists but forwarding still fails, check the
SSH agent settings.

## Sandbox commits aren't signed

Docker Sandboxes can sign Git commits with SSH keys from your host agent.
For setup steps, see Commit signing.

Forwarding is enabled by default. Check
`ssh.agentForwardingEnabled`
and `ssh.agentSocketPath` to
confirm that forwarding is enabled and inspect the socket selection:

```console
$ sbx settings get ssh.agentForwardingEnabled
$ sbx settings get ssh.agentSocketPath
```

If you use each client's current `SSH_AUTH_SOCK`, reconnect from a shell where
it points to the intended agent. If `ssh.agentSocketPath` returns a path,
confirm that it points to an active host agent. After changing forwarding or
the socket selection, run `sbx daemon restart`.

If `ssh-add -L` prints `The agent has no identities.`, the sandbox can reach
the forwarded agent, but the host agent doesn't have a loaded key. Load the
signing key into your host SSH agent:

```console
$ ssh-add ~/.ssh/id_ed25519
```

If commit signing works on the host but fails in a sandbox, check whether Git
is configured to sign with a host file path such as
`/Users/me/.ssh/id_ed25519.pub`. The sandbox uses the forwarded SSH agent, not
the host key file path. Use the inline public key form instead:

```console
$ git config --global gpg.format ssh
$ git config --global user.signingkey "key::$(ssh-add -L | head -n 1)"
```

If Git reports that `ssh-keygen` is missing, use a sandbox template that
includes OpenSSH client tools.

If `git log --show-signature` reports that `gpg.ssh.allowedSignersFile` needs
to be configured, Git can't verify the SSH signature locally. This verification
config isn't required to create signed commits. GitHub uses the SSH signing
keys configured in your GitHub account to verify commits.

GPG and S/MIME signing keys aren't available inside the sandbox. If your
repository or organization requires GPG or S/MIME signatures, or if SSH signing
isn't configured, use one of these workarounds:

- Commit outside the sandbox. Let the agent make changes without committing,
  then commit and sign from your host terminal.

- Sign after the fact. Let the agent commit inside the sandbox, then re-sign
  the commits on your host:

  ```console
  $ git rebase --exec 'git commit --amend --no-edit -S' origin/main
  ```

  This replays each commit on the branch and re-signs it with your local
  signing key.

## Daemon fails to start after downgrading

If you downgrade `sbx` to a version older than the one that last managed your
local state, the daemon may fail to start with a database version mismatch:

```text
error: failed to start backend in-process: start backend: creating containerd
server: ... database is at major version 6, but this binary only supports up
to major version 1
```

A newer version of `sbx` upgraded the local database to a schema that older
binaries don't understand. To recover, reset all sandbox state:

```console
$ sbx reset --preserve-secrets
```

This stops all VMs and deletes all sandbox data. You'll need to create new
sandboxes afterwards. The `--preserve-secrets` flag keeps any secrets you've
set so you don't have to reconfigure them.

## Removing all state

As a last resort, if `sbx reset` doesn't resolve your issue, you can remove the
`sbx` state directory entirely. This deletes all sandbox data, configuration, and
cached images. Stop all running sandboxes first with `sbx reset`.

**macOS**

```console
$ rm -rf ~/Library/Application\ Support/com.docker.sandboxes/
```

**Windows**

```powershell
> Remove-Item -Recurse -Force "$env:LOCALAPPDATA\DockerSandboxes"
```

**Linux**

Sandbox state on Linux follows the XDG Base Directory specification and is
spread across three directories:

```console
$ rm -rf ~/.local/state/sandboxes/
$ rm -rf ~/.cache/sandboxes/
$ rm -rf ~/.config/sandboxes/
```

If you have set custom `XDG_STATE_HOME`, `XDG_CACHE_HOME`, or
`XDG_CONFIG_HOME` environment variables, replace `~/.local/state`,
`~/.cache`, and `~/.config` with the corresponding values.

## Enable automatic diagnostics uploads

To opt in to automatic diagnostics uploads after certain daemon errors, set
`diagnostics.autoUpload` to
`yes`:

```console
$ sbx settings set diagnostics.autoUpload yes
```

Automatic bundles include basic system information and client, daemon, crash,
and MCP logs. Docker Sandboxes redacts recognized identity values and
credential patterns, but collected logs can still contain user content. Failed
uploads remain in a local queue for a later retry.

## Report an issue

If you've exhausted the steps above and the problem persists, file a GitHub
issue at github.com/docker/sbx-releases/issues.

To help Docker investigate, generate a diagnostics bundle and share it when
reporting the issue:

```console
$ sbx diagnose --upload
```

The bundle contains daemon logs, diagnostic check results, and basic system
information. When `--upload` is confirmed, the bundle is uploaded to Docker
support and the command prints a diagnostics ID. Include this ID in your
issue so the team can correlate it with the uploaded bundle.

Without terminal input, `sbx diagnose --upload` saves the bundle locally and
skips the upload. Check for a diagnostics ID to confirm that the upload
succeeded.
