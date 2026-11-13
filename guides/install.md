# Install the global base on a machine

Once per machine. Then every dev container reads the base, read-only, and every project only holds
`AGENTS.md` and `.agents/` (decision 0019 of the project: a mounted folder, servers run with stdio).

## 1. Put the base in a folder of the machine

1. Paste the parts of the global base export, then run `node import-base.ts` (see the export guide).
2. The base lands in `~/.local/share/local-ai-base`. Nothing else on the machine writes there.

## 2. Mount it in every container

Write `~/.config/containers/containers.conf.d/50-local-ai-base.conf`, with the absolute path of your
home folder in place of `HOME`:

```toml
[containers]
volumes = [
  "HOME/.local/share/local-ai-base:/opt/local-ai-base:ro",
  "HOME/.local/share/local-ai-base/opencode:/etc/opencode:ro",
]
```

- The first line gives the base to every container, read-only, at the same path.
- The second line gives OpenCode its common configuration, agents, skills and plugins.
- On a machine with SELinux, add `,z` after `ro`.

`node import-base.ts --machine` writes this file for you.

## 3. Switch OpenCode updates off

OpenCode reads the `update` setting only in the user's own configuration. In the dev container,
`~/.config/opencode/opencode.jsonc` holds:

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "update": "disable"
}
```

Keep `@opencode/cli` at `2.2.7` in the image of the dev container: version 2.3.0 changes how
subagents run.

## 4. Declare the size of the model

Compaction only starts when OpenCode knows the context window of the model. In the configuration of
your model provider, the model must declare `limit.context` and `capabilities.tools: true`.

## 5. Check

Recreate the dev container of a project, then run in it:

```sh
ls /opt/local-ai-base                           # shows VERSION, rules, tools...
touch /opt/local-ai-base/probe                  # must fail: read-only
node /opt/local-ai-base/tools/base-version.ts   # prints the version of the base
opencode debug config                           # lists /etc/opencode among the sources
opencode mcp list                               # lists the servers of the base
git status --short                              # shows AGENTS.md and .agents/ only
```

Write down what each command prints. If the base is missing in the container, the tool that starts
your dev containers does not read `containers.conf`: then start them with the Dev Containers CLI and
its `--mount` option, or ask for a default feature that declares the mount.
