---
title: "Kits"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes/customize/_index.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Kits

Kits let you shape a sandbox around the way you work. Use a custom base image,
add the tools your project needs, and give your agent instructions for using
them. You also control which services the sandbox can access, how it
authenticates, and what runs when the sandbox starts.

A kit can define the whole environment or add something to an existing one,
such as a toolchain or your team's shared configuration. Package those choices
once, then reuse them across projects and share them with your team.

To keep the configuration for a sandbox in an editable, shareable file, use a
sandbox environment file.
It selects kits alongside workspace paths, resources, credentials, and lifecycle
commands. Keep a tool's requirements in its kit so they follow the tool across
environments. Use the environment file for the choices involved in setting up
your sandbox.

Docker recommends v3 kits. This section covers v3. For the supported v2
format, see Kits v2.

## What is a kit?

A kit packages software and configuration for a sandbox. A YAML file, called
its descriptor, tells Docker Sandboxes what the kit needs: network access,
credentials, setup commands, or instructions for the agent. You publish the
kit as a container image containing its files and descriptor.

You identify a published kit by its container image reference, such as
`docker.io/docker/sbx-kit-claude:2.1.267`. When you use the kit, `sbx`
prepares its files and applies its settings. You can use one kit for a
complete environment or combine kits that contribute different parts.

## What kits can do

Use kits to:

- Package a custom agent, or configure an existing agent for your team's
  projects.
- Include the tools the agent needs, such as linters, language runtimes,
  test runners, and compilers.
- Share linter rules, editor settings, helper scripts, and reference material.
  Give the agent instructions and skills for using them.
- Connect the agent to services through network rules and credentials,
  including internal APIs and private package registries.
- Initialize each sandbox and run supporting services when it starts, such
  as a development server for previewing the agent's work.

## Workloads and mixins

Kits have two roles in a sandbox: a workload supplies the base environment
and launch command, and mixins add tools or behavior to it.

| Kind | What it supplies | How you use it |
| --- | --- | --- |
| `workload` | The environment and command to run, such as an agent or a shell | Pass it to `sbx run` or `sbx create` |
| `mixin` | Additional tools, configuration, or runtime behavior | Add it with `--kit` |

For example, this command runs a workload with a mixin:

```console
$ sbx run docker.io/docker/sbx-kit-claude:2.1.267 --kit docker.io/sbx/playwright:1.61.1
```

The Claude Code workload starts the agent, and the Playwright mixin adds
browser-testing tools.

## Kit sets

A kit set combines kits into a single kit that you can publish and reuse.
Use it to package a workload with the mixins you need, so you and your team
can run the environment from one reference.

The set specifies which kits and versions to combine. It can also add setup
commands, agent instructions, network access, and other settings for the
combined environment.

If the set includes a workload, you run the published kit with `sbx run`.
If it contains only mixins, you add it to a workload with `--kit`.

An environment file can select individual kits or a published set. Choose a set
when you want one published reference with a fixed list of components. The set
records their image digests when you build it.

See Use kits for how to run kits
and add mixins. To customize and publish your own combination, see
Compose a kit set.

## Version compatibility

V3 requires `sbx` v0.45 or later. Every kit in a v3 sandbox must use v3:
select a v3 workload and add only v3 mixins.

Built-in agent names such as `claude` and `codex` select v3 kits. Add v3
mixins directly, for example with `sbx run claude --kit ./some-v3-mixin`.
V1 and v2 kits cannot be combined with v3 kits.

A kit's capabilities can require a later release or a local sandbox. See
Kit capability support
for details. V2 remains supported and is not deprecated.

## Choose your next step

- Use kits to run a published environment or combine
  a workload with mixins.
- Author kits to build an agent environment,
  package a tool, or combine kits into a set to share with your team.
- Explore the sandbox-kit-spec repository
  for the authoritative v3 specification, build frontend, and examples.

To save an environment you've configured inside a sandbox,
see Save a sandbox as a template.
