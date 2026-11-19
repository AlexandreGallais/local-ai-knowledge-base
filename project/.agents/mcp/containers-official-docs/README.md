# Brick `containers-official-docs`

The official documentation of containers: the Dockerfile reference (BuildKit), the Docker manuals
(Engine, Build, Compose), the reference of every docker command, Podman (every podman command, pods,
Quadlet) and its configuration files (`containers.conf`, `containers-mounts.conf`, `registries.conf`,
`policy.json`, `storage.conf`), Buildah, Skopeo, Podman Desktop, the Compose Specification, dev
containers (the Development Containers specification, the containers.dev guides, the VS Code pages,
the reference features and images), graphical applications and sound in a container (x11docker,
Distrobox, Toolbx) and the OCI specifications (image, runtime, distribution).

Each file is the official file, unchanged, in its own format (Markdown, MDX, roff), at a noted
version. The MCP server searches the documentation and returns one section at a time.

## What it holds

| File | Role |
| --- | --- |
| `server.ts`, `server.py` | The MCP server, in Node and in Python, with the same answers: `search_docs`, then `read_doc` on one section. The same code in every documentation brick. |
| `brick.json` | The name of the server and the words of its tools. |
| `search.ts`, `search.py` | The local search, in Node and in Python: each file cut into sections by its format, BM25 ranking, exact API names first, 10 hits at most. |
| `build-index.ts`, `build_index.py` | Build `index/`, the same bytes in Node and in Python, one plain-text file per tool. The server runs it when `index/` is missing. |
| `library/` | The documentation, one folder per tool; `<tool>.index.md` lists its files; `README.md` lists the tools, their version, license and size; `lock.json` the commit of each. |
| `licenses/`, `THIRD_PARTY_NOTICES.md` | The license of each source, its copyright and its attribution. |
| `mcp.ts`, `mcp.py` | The small MCP core, in Node and in Python, the same copy in every brick. |
| `rules.md` | The rules the AI reads at every request. |

`library/` and `index/` stay out of the project's Git (`.gitignore` of this folder): the import of
the brick brings `library/` back and builds `index/`.

## Usage

From the project root, after a change of `library/`:

```sh
node .agents/mcp/containers-official-docs/build-index.ts
python3 .agents/mcp/containers-official-docs/build_index.py   # the same, without Node
```

## Set aside

- Kubernetes, Helm and Kustomize: the team does not use them today.
- The pages of Docker Desktop, Docker Hub and Docker Scout: services, not tools of a project.
- The wiki of x11docker: it states no license; its README and its manual page are under MIT.

## Licenses

Docker, Podman, its configuration files, Buildah, Skopeo, Podman Desktop, Toolbx, Compose and the OCI
specifications are under Apache 2.0; the Development Containers specification under CC BY 4.0; the VS
Code pages under CC BY 3.0 US; containers.dev, the reference features and images and x11docker under
MIT; Distrobox under GPL 3.0. `THIRD_PARTY_NOTICES.md` gives each source with its attribution, and
`licenses/` holds the text of each license. The code of this brick (its `.ts` and `.py` files) is
under the MIT License of the base.

## Remove it

Delete this folder, then remove the line `containers-official-docs` from `opencode.json` (the next import of the kit
removes it too). The other bricks do not use it.
