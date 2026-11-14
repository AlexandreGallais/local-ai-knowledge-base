# Install the global base

The base is one folder, read-only, that every dev container sees at `/opt/local-ai-base`. A project
only holds `AGENTS.md` and `.agents/`. To try it on one machine, with two test projects, follow
[compare-with-and-without.md](compare-with-and-without.md): it does all of this step by step.

## 1. Make the base folder

Paste the parts ([paste-export.md](paste-export.md)), then, from the folder where you want the base:

```sh
node <folder of the parts>/import-base.ts
```

The base lands in `./local-ai-base`. `--target <folder>` puts it elsewhere; the folder must be new,
empty or an older base. Run the same command again to update it: the older base is replaced whole.

## 2. Give it to the dev containers

Each container needs one read-only mount: the base at `/opt/local-ai-base`. Choose one way.

**A. In the `devcontainer.json` of the project**, Docker or Podman. Add to `"mounts"`, with the path of
your base folder:

```jsonc
"mounts": [
  "type=bind,source=/path/to/local-ai-base,target=/opt/local-ai-base,readonly"
]
```

**B. For every container of the machine**, Podman only, without touching any project: run the import
with `--machine`. It writes `~/.config/containers/containers.conf.d/50-local-ai-base.conf` with the
mount. On a machine with SELinux, add `,z` after `ro` in that file.

## 3. OpenCode in the container

- Install it at the version of the base: `npm install --global @opencode/cli@2.2.7`.
- In your own OpenCode configuration (`~/.config/opencode/opencode.jsonc`), keep your model, its
  context window (`limit.context`), tool calls (`capabilities.tools: true`) and your rights, then add
  the keys of `setup/opencode/opencode.jsonc` of the export: the common rules, the MCP servers of the
  base, the formatter, the web lock. The base imposes no rights of its own.

## 4. Check

In a container created after the mount:

```sh
ls /opt/local-ai-base                           # shows VERSION, rules, tools...
touch /opt/local-ai-base/probe                  # must fail: read-only
node /opt/local-ai-base/tools/base-version.ts   # prints the version of the base
opencode mcp list                               # lists the servers of the base
```

If `/opt/local-ai-base` is missing, the container was created before the mount: rebuild it.
