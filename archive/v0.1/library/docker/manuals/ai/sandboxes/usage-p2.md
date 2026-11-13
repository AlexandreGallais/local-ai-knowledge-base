---
title: "Usage (part 2 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes/usage.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Usage (part 2 of 2)

## Copy files between host and sandbox

Use `sbx cp` to copy files or directories between
your host and a sandbox. This is useful for one-off files that aren't part of a
mounted workspace, such as generated output, logs, or setup files. The sandbox
path must be absolute. `sbx cp` doesn't resolve relative paths such as `.`
against the sandbox's default working directory.

For example, copy files to or from the default working directory used by a
Docker-provided agent template:

```console
$ sbx cp ./config.json my-sandbox:/home/agent/workspace/
$ sbx cp my-sandbox:/home/agent/workspace/output.log ./
$ sbx cp ./src/ my-sandbox:/home/agent/workspace/src
```

One side of the copy must use `SANDBOX:PATH`. Copying directly between two
sandboxes isn't supported.

## Publish ports

Sandboxes are network-isolated — your browser or local
tools can't reach a server running inside one by default. A port mapping of
`8080:3000` publishes sandbox port 3000 on host port 8080.

If you know which ports you need, publish them when you create the sandbox:

```console
$ sbx run --publish 8080:3000 --name my-sandbox claude
```

For an existing sandbox, use `sbx ports` to
forward traffic from your host. Publishing a port on a stopped local sandbox
starts it first:

```console
$ sbx ports my-sandbox --publish 8080:3000
$ open http://localhost:8080
```

To let the OS pick a free host port instead of choosing one yourself, specify
only the sandbox port. Then use `sbx ports` to check which host port was
assigned:

```console
$ sbx ports my-sandbox --publish 3000
$ sbx ports my-sandbox
```

`sbx ls` shows active port mappings alongside each sandbox. `sbx ports` lists
them in detail. The `CREATED` column shows the sandbox age, and the `STATUS`
column identifies sandboxes kept running in detached mode with `(detached)`.

```console
$ sbx ls
SANDBOX      AGENT    STATUS      PORTS                       WORKSPACE         CREATED
my-sandbox   claude   ● running   127.0.0.1:8080->3000/tcp4    /home/user/proj    2m
```

To stop forwarding a port:

```console
$ sbx ports my-sandbox --unpublish 8080:3000
```

When `sbx run` re-attaches to an existing sandbox, it ignores `--publish`. Use
`sbx ports` to publish ports on that sandbox. For dev server and host-service
recipes, see
Local services.

## What persists

While a sandbox exists, installed packages, Docker images, configuration
changes, command history, and mountless workspace files all persist across
stops and restarts. Removing a sandbox deletes its container filesystem.
Host workspace files, including repositories used as clone sources, and the
shared agent skills store remain on your host.
Persistent kit volumes in local sandboxes also survive removal. See
Keep kit data when recreating a sandbox
for how to reattach them.

To capture changes in the container filesystem,
save a template.
For a reproducible environment defined in source,
author a kit.

## Saving a sandbox as a template

Save a sandbox's container filesystem as a reusable template image after
setting up tools or configuration interactively. A template contains image
content; the agent kit still supplies runtime settings such as credentials
and network rules. The examples here reuse templates with built-in agents.

A saved template isn't a backup of the whole sandbox. Mounted filesystems,
including host workspaces and the Docker store at `/var/lib/docker`, aren't
included. Save any data from those mounts separately.

> **Warning:**
> Saving a sandbox captures files in its container filesystem, including any
> secrets stored there. If you manually added API keys, tokens, or other
> credentials to the sandbox, they're embedded in the saved template and
> shared with anyone you distribute it to. To keep credentials out of
> templates, manage them with `sbx secret set` instead — the proxy injects
> them at runtime so they're never written to the filesystem. For more
> information, see Manage credentials.

### Save and reuse

Stop the sandbox (or let the CLI prompt you), then save it with a name and
tag:

```console
$ sbx template save my-sandbox my-template:v1
```

The image is stored in the sandbox runtime's local image store. Create a
new sandbox from it with the `-t` flag:

```console
$ sbx run -t my-template:v1 claude
```

### List and remove templates

List tagged template images in the sandbox runtime's local image store:

```console
$ sbx template ls
```

Remove a template you no longer need:

```console
$ sbx template rm my-template:v1
```

If a local image you want to remove doesn't appear in the default listing,
it may have no tag. Include images without tags and show their digests:

```console
$ sbx template ls --all --digests
```

Remove the image using its image ID or repository digest from the listing:

```console
$ sbx template rm <IMAGE_ID>
```

```console
$ sbx template rm <REPOSITORY>@sha256:<DIGEST>
```

You can use a prefix of an image ID as long as it uniquely identifies a template.
The `--all` and `--digests` flags apply only to local templates. For all listing
options, see the
`sbx template ls` reference.

### Export and import

To share a saved template or move it to another machine, export it as a
tar file:

```console
$ sbx template save my-sandbox my-template:v1 --output my-template.tar
```

On the other machine, load the tar file and use it:

```console
$ sbx template load my-template.tar
$ sbx run -t my-template:v1 claude
```

### Limitations

Agent configuration files are always recreated when a sandbox is created.
Changes to user-level agent configuration files, such as
`/home/agent/.claude/settings.json` and `/home/agent/.claude.json`, do not
persist in saved templates.

If the saved template was built for a different agent than the one you
specify in `sbx run`, the CLI prints a warning to stderr with a suggested
command. For example, saving a Claude sandbox and running it with `codex`
suggests `sbx run -t my-template:v1 claude`.

## Load a template

To create a sandbox from a template image in a registry, pass its full image
reference to `--template`. Use the agent the image was prepared for:

```console
$ sbx run --template docker.io/my-org/my-template:v1 claude
```

Unlike Docker commands, `sbx` doesn't automatically add the Docker Hub domain
(`docker.io`) to image references. For available images and the built-in agent
workflow, see Base images.

> **Note:**
> The Docker daemon used by Docker Sandboxes pulls templates from a
> registry directly; it doesn't share the image store of your local Docker
> daemon on the host. To route Docker Hub image pulls through your
> organization's registry infrastructure, configure a
> registry mirror.

> **Important:**
> For Docker Hub, `sbx` reuses your `sbx login` session to pull private
> images. For other registries (GitHub Container Registry, ECR, ACR, a
> self-hosted Nexus, and so on), store pull credentials with
> `sbx secret set --registry`
> before running the sandbox:
>
> ```console
> $ gh auth token | sbx secret set --registry ghcr.io --password-stdin
> ```
>
> Without stored credentials, pulls from non-Docker Hub registries are
> anonymous and private images fail to pull.

For locally-built images, save the image to a tar and load it directly
into the sandbox runtime instead of pulling from a registry:

```console
$ docker image save my-org/my-template:v1 -o my-template.tar
$ sbx template load my-template.tar
$ sbx run --template my-org/my-template:v1 claude
```

`sbx template load` imports the tar into the sandbox runtime's image
store, so the image doesn't need to be reachable from a registry at
sandbox creation time.

### Template caching

When creating a sandbox, `sbx` checks the registry for the template image by
default and downloads missing or updated layers. If the pull fails and the
image is cached locally, it can use the cached image. Cached images persist
across sandbox creation and deletion, and are cleared when you run `sbx reset`.

### Updating agents

Agent templates include an agent version, which can differ from the agent's
latest release. Updating the `sbx` CLI or pulling an updated template doesn't
update agents inside existing sandboxes.

To update an installed agent, run its documented update command inside the
sandbox, either from a sandbox shell or with `sbx exec`. Restart the agent
session to use the updated version. The update persists across sandbox stops
and starts, but is deleted when you remove the sandbox. To reuse the updated
agent in other sandboxes, save a template.
