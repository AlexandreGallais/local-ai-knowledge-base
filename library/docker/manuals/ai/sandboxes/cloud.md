---
title: "Cloud sandboxes"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes/cloud/_index.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Cloud sandboxes

Cloud sandboxes run AI agents on Docker-managed infrastructure instead of your
local machine. Use them when you need an isolated environment that doesn't
depend on the compute resources or virtualization support of your host.

Cloud sandboxes use the same `sbx` CLI as local sandboxes. Add the global
`--cloud` flag to send a supported command to the Cloud Sandboxes API:

```console
$ sbx --cloud ls
```

Cloud and local sandboxes have separate state and different capabilities. A
cloud sandbox can't mount a host workspace or use host hardware, and its
secrets, network policy, ports, and lifecycle are managed in the cloud. See
Local and cloud differences before adapting a local
workflow.

## Prerequisites

To use cloud sandboxes, you need:

- The `sbx` CLI, version 0.45.0 or later
- An active Docker Agentic Platform subscription

Follow Signup and billing to activate
cloud access and review compute charges. Then return here to sign in from the
CLI and configure your agent.

### Sign in from the CLI

Sign in with the same Docker account you used to subscribe:

```console
$ sbx login
```

For CI and other environments without a browser, sign in with a Docker
Personal Access Token (PAT) for the subscribed account:

```console
$ echo "$DOCKER_PAT" | sbx login --username <your-docker-id> --password-stdin
```

For PAT setup instructions, see CI and headless use.

Check cloud connectivity and account access:

```console
$ sbx --cloud diagnose
```

If the check reports that your account doesn't have access, follow
Check account access.

## Get started

Credentials configured for local sandboxes aren't available to cloud
sandboxes. Configure a cloud credential for your agent before launching it.
For Claude Code, store an Anthropic API key:

```console
$ sbx --cloud secret set anthropic
```

See Authenticate cloud agents for other agents and credential
options.

Cloud sandboxes expire after one hour by default. On expiration, the service
stops sandboxes that can be resumed and deletes the rest. Check the timeout
action before relying on a sandbox to retain your work. See
Configure expiration.

Create a sandbox without attaching, allowing access to GitHub for this example:

```console
$ sbx --cloud create --name cloud-project --allow-network github.com:443 claude
```

Cloud sandboxes don't accept a local workspace path. Clone the public
Welcome to Docker repository
inside the sandbox:

```console
$ sbx --cloud exec cloud-project git clone \
    https://github.com/docker/welcome-to-docker.git /home/agent/workspace/project
```

Attach to the agent:

```console
$ sbx --cloud attach cloud-project
```

Ask Claude to inspect `/home/agent/workspace/project` and write a description
of the application to `/home/agent/workspace/review.md`. When the file is ready,
press `Ctrl+\` to detach and leave the agent running.

Copy the result to your machine:

```console
$ sbx --cloud cp cloud-project:/home/agent/workspace/review.md ./review.md
```

Read the result, then remove the sandbox when you're finished:

```console
$ sbx --cloud rm cloud-project
```

Removal deletes files stored only in the sandbox. For your own projects, see
Transfer files and
Authenticate cloud agents before cloning private repositories.

## Learn more

- Signup and billing covers activation
  and compute charges
- Local and cloud differences compares the two execution
  environments
- Use cloud sandboxes covers creation, files, ports, and lifecycle
- Authenticate cloud agents covers cloud-specific secrets,
  API keys, and OAuth
- Manage cloud network policy covers account-level and
  sandbox-level network access
- Move a sandbox explains filesystem transfers between local and
  cloud environments
- `sbx` CLI reference lists commands and options
