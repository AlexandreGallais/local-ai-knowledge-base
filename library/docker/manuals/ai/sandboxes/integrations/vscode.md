---
title: "Connect VS Code to a sandbox"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes/integrations/vscode.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Connect VS Code to a sandbox

These connection instructions use a local sandbox. For cloud SSH setup, see
Connect with SSH.

Use the Remote - SSH extension to open a VS Code window that runs inside a
sandbox. Your editor stays on your host while files, terminals, and extensions
run in the isolated sandbox.

## Prerequisites

- Model provider credentials <example-value> in Docker Sandboxes for any AI agent
  you plan to run. See Configure agent credentials.
- SSH access set up. See Editor and app integrations.
- The Remote - SSH
  extension (`ms-vscode-remote.remote-ssh`) installed in VS Code.

## Connect

Confirm that you can connect to the sandbox from a terminal:

```console
$ ssh demo.sbx
```

In VS Code, open the Command Palette and run **Remote-SSH: Connect to Host...**.
Enter the sandbox hostname, such as `demo.sbx`, manually. After VS Code
connects, use the remote folder picker to
select the mounted workspace.

For more connection options, see the VS Code instructions to
connect to a remote host.

## Notes

- The first connection installs the VS Code server inside the sandbox, so it
  can take a moment. Later connections are faster.

### Reconnect loop on macOS

Affected versions of VS Code can enter an infinite reconnect loop on macOS. If
this happens, set `remote.SSH.useLocalServer` to `false` in your VS Code user
settings:

```json
{
  "remote.SSH.useLocalServer": false
}
```

For details, see
microsoft/vscode-remote-release#11672.

### SSH host key <example-value> fails

VS Code can leave duplicate or malformed `Host *.sbx` blocks in your SSH
config after you add an SSH host. If a VS Code connection reports a
`KnownHostsCommand` error or `Host key <example-value> failed`, remove every SSH
config block marked `docker sandboxes (managed)`, including the marker
comments:

```diff
-# >>> docker sandboxes (managed) >>>
-Host *.sbx
-    User _default_user_
-    ProxyCommand "sbx" ssh proxy %n
-    ...
-    UserKnownHostsFile "~/.ssh/sbx_known_hosts"
-    KnownHostsCommand "sbx" ssh known-hosts %H
-    StrictHostKeyChecking yes
-# <<< docker sandboxes (managed) <<<
```

Then regenerate the managed block:

```console
$ sbx setup ssh
```

Reconnect to the sandbox from VS Code.

## Related

- Editor and app integrations — how SSH access works and how to
  set it up
