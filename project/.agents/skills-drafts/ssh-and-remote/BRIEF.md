# BRIEF: ssh-and-remote  (LNX-12, 1 stars, V4)

## Final frontmatter (do not change)

```yaml
name: ssh-and-remote
description: "Uses ssh, scp and tunnels according to the internal policy - keys, configuration, port forwarding. Use when connecting to a remote machine, copying files to or from a server, opening a tunnel to a remote service, or when ssh fails with 'Permission denied (publickey)' or 'Host key verification failed'."
metadata:
  id: LNX-12
  stars: "1"
  nature: reference
  mode: C
  wave: V4
  load: auto
```

## Goal

A reference of the team's SSH practices - which hosts, keys and settings are allowed, and the exact commands for connecting, copying and tunnelling - written with the human because the policy is internal.

## Questions the skill must answer

1. Which hosts may the agent reach by SSH, and from where (dev container, host)?
2. Which key types and agent setup are allowed; where is the configuration?
3. How are host keys verified?
4. Which forwarding is allowed (local, remote, jump hosts)?
5. What must never be done (copying private keys, disabling checks)?

## Where to look (files, commands, people)

- ~/.ssh/config (host aliases only, never private keys)
- the human: the SSH policy

## Required sections

- Core rule in the first 10 lines.
- Procedure with an Action and a Check per step, or a reference table with the commands.
- Stop and ask the human if; Common mistakes; Definition of done.

## Acceptance tests

- Trigger: loads on "copy the build to the test server", "ssh says Permission denied (publickey)", "open a tunnel to the remote database"; does not load on "push to GitLab", "write a shell script", "explain encryption".
- Paired task: copy a file to a test host with an alias from the config; with the skill the agent uses the alias and keeps host key checking on.

## Human input required (yes/no, what)

Yes: the SSH policy, allowed hosts and forbidden actions.
