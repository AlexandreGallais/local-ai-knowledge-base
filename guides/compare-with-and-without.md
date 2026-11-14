# Two test projects, with and without the base

Two empty projects side by side, each in its dev container: the same image, the same OpenCode, the same
model and the same rights. The web is closed in both. One has the base, the other has nothing. Ask both
the same thing and compare. Works on macOS and on Linux, in a folder of your choice.

## What you need

- Docker Desktop, or Podman, running.
- VS Code with the Dev Containers extension.
- Node.js 22.18 or later on the machine, only to run the two import scripts.
- Network access the first time a container starts: it installs OpenCode.

## The folders

Everything lives in one folder, here `~/ai-test`; take any other.

```text
~/ai-test/
  paste/           the pasted parts and the two import scripts
  local-ai-base/   the global base, made by import-base.ts
  opencode-user/   your OpenCode configuration: model and rights, shared by both containers
  with-base/       empty project 1: the base is mounted in its container
  without-base/    empty project 2: nothing of the base
```

Keep these five folders together: the containers find `local-ai-base/` and `opencode-user/` beside
their project folder.

## 1. Paste the export

```sh
mkdir -p ~/ai-test/paste
```

Paste into `~/ai-test/paste/`, at the size that passes ([paste-export.md](paste-export.md)): every
`global-NNN.txt`, `project-001.txt`, `import-base.ts` and `import-project.ts`.

## 2. Make the global base

```sh
cd ~/ai-test
node paste/import-base.ts
```

The base lands in `./local-ai-base`. Run it again later to update the base.

## 3. Your OpenCode configuration

```sh
mkdir opencode-user
cp local-ai-base/devcontainer/opencode-user/opencode.jsonc opencode-user/
```

It gives both containers the same rights: every command allowed; an install, a push, a branch or a
deletion asks you first. Add your model in it.

The key of the model goes in one file beside the two projects, read by both containers at their start:

```sh
cp local-ai-base/devcontainer/ai.env .
```

Write your key after `ANTHROPIC_API_KEY=` in `~/ai-test/ai.env`. The file sits outside both projects,
so no Git repository holds it. Rebuild a container after you change it.

The web is locked a second time in each `devcontainer.json`, by `OPENCODE_CONFIG_CONTENT`, which OpenCode
reads above your configuration: no web search tool (`websearch: false`), no `webfetch`, no `curl`,
`wget`, `git clone`, `git fetch` or `git pull`, no shared session. The text is the same in both.

## 4. The two empty projects

```sh
mkdir -p with-base/.devcontainer without-base/.devcontainer
cp local-ai-base/devcontainer/with-base/devcontainer.json with-base/.devcontainer/
cp local-ai-base/devcontainer/without-base/devcontainer.json without-base/.devcontainer/
git -C with-base init -q -b main
git -C without-base init -q -b main
```

## 5. The project kit, for the project with the base

The project kit is `AGENTS.md` and the folder `.agents/`. Only `import-project.ts` writes them, in the
folder you run it from:

```sh
cd ~/ai-test/with-base
node ../paste/import-project.ts
```

It prints "Project kit installed". `without-base/` gets nothing.

## 6. Open the two containers

In VS Code, "Dev Containers: Open Folder in Container..." on `~/ai-test/with-base`, then, in a second
window, on `~/ai-test/without-base`. The first start installs OpenCode 2.2.7 in the project itself: a
`package.json` with only `@opencode/cli`, a `.gitignore` with `node_modules/`.

In the terminal of each container:

```sh
npx opencode --version   # both: opencode v2.2.7
ls /opt/local-ai-base    # with-base: VERSION, rules, tools...   without-base: No such file or directory
```

## 7. Ask

Run `npx opencode` (or `npm run opencode`) in each container, at the root of the project, and give
both the same request.

- Packages: each session runs its own installs and OpenCode asks you to approve them. Approve or refuse
  the same way in both.
- Give the same answer to the same question; never help one session more than the other.

## 8. Compare

| Check | Without the base | With the base |
| --- | --- | --- |
| Said "done" without your help? |  |  |
| Questions asked before writing |  |  |
| Messages you had to send to fix something |  |  |
| The build ends without error |  |  |
| The tests pass |  |  |
| Code read by you: as your team writes it? |  |  |
| Time from the request to "done" |  |  |
| Tokens of the session, if OpenCode shows them |  |  |

## What to send back

The filled table, the request, and the answers you gave. Never real data in them.
