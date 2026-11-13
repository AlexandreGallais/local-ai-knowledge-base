# Compare one request with and without the base

Two copies of the same Angular project, the same model, the same request: one copy with the base, one
without anything. You see by yourself what the base changes. For figures over ten tasks, see
[run-evaluation.md](run-evaluation.md).

## What you need

- The global base installed on the machine ([install.md](install.md)), with its mount file
  `~/.config/containers/containers.conf.d/50-local-ai-base.conf`.
- The `.devcontainer/` folder your team uses for Angular projects, with OpenCode 2.2.7 in its image.
- The parts of the project kit at the size you keep: `project-001.txt` and `import-project.ts`
  ([paste-export.md](paste-export.md), part 3).
- One request, written once in `~/compare/request.md`. Both sessions get the same text.

## 1. Make the two copies

On the machine, outside any container. The starting projects of the evaluation are in the base:

```sh
mkdir -p ~/compare
cp -r ~/.local/share/local-ai-base/evaluation/projects ~/compare/with-base
cp -r ~/.local/share/local-ai-base/evaluation/projects ~/compare/without-base
rm -rf ~/compare/with-base/*/.agents ~/compare/without-base/*/.agents
cp -r <your team's .devcontainer> ~/compare/with-base/.devcontainer
cp -r <your team's .devcontainer> ~/compare/without-base/.devcontainer
```

Both copies now hold the same three projects, without `AGENTS.md` nor `.agents/`. The one you use is
`angular-app/`; its packages are installed one folder up, in the copy itself.

## 2. The copy without the base

The mount file gives the base to every container created while it is there. Put it aside first:

```sh
mv ~/.config/containers/containers.conf.d/50-local-ai-base.conf ~/50-local-ai-base.conf.off
```

1. Open `~/compare/without-base` in its dev container, rebuilt so that it is new.
2. In the container, check that nothing of the base is there. Both commands must say
   "No such file or directory":

   ```sh
   ls /opt/local-ai-base
   ls /etc/opencode
   ```

3. Install the packages, with the agreement of your team: `npm install`.
4. Put the mount file back, on the machine, before you create any other container:

   ```sh
   mv ~/50-local-ai-base.conf.off ~/.config/containers/containers.conf.d/50-local-ai-base.conf
   ```

This container stays without the base as long as you do not rebuild it.

## 3. The copy with the base

1. Paste `project-001.txt` and `import-project.ts` into a new folder `~/compare/with-base/kit/`.
2. Open `~/compare/with-base` in its dev container, rebuilt so that it gets the mount.
3. In the container, run the six checks of [install.md](install.md), part 5.
4. Install the packages, with the agreement of your team: `npm install`.
5. Equip the project, then remove the pasted kit:

   ```sh
   cd angular-app
   node ../kit/import-project.ts
   rm -rf ../kit
   ```

6. Run `opencode` in `angular-app/` and say hello. Confirm the kind "Angular application", then restart
   OpenCode when it asks ([try-welcome.md](try-welcome.md)).

## 4. Give the same request to both

In each container, from `angular-app/`, start `opencode` and paste the text of `~/compare/request.md`.

- With the base, the AI first writes a brief and asks questions. Answer them, and write your answers
  down. Without the base, the AI may ask nothing.
- When the session without the base asks a question that the base asked too, give the same answer.
- Never help one session more than the other: no hint, no correction you would not give to both.

For a first try, take a request of the evaluation: the paragraph under "Request" of
`~/.local/share/local-ai-base/evaluation/tasks/t08-select-box/task.md` (a select box) or of
`t10-valve-list-page/task.md` (a page with its store). Their data is invented, and each one comes
with a proof test for part 5. Never paste the "Proof of success" part: the AI must not see it.

## 5. Compare

Fill the same lines for both sessions:

| Check | Without the base | With the base |
| --- | --- | --- |
| Said "done" without your help? |  |  |
| Questions asked before writing |  |  |
| Messages you had to send to fix something |  |  |
| `npx ng build` in `angular-app/` ends without error |  |  |
| Tests written, and `npx ng test --watch=false` passes |  |  |
| Proof test of the evaluation task passes (below) |  |  |
| Code read by you: as your team writes it? |  |  |
| Time from the request to "done" |  |  |
| Tokens of the session, if OpenCode shows them |  |  |

The build and the tests are the same commands in both containers. The format and lint passes of the
base only exist in the copy with the base: in the other one, judge the code by reading it.

With a request of the evaluation, its proof test checks both results the same way. Once both
sessions are over, copy it on the machine, for t08:

```sh
for copy in with-base without-base; do
  cp ~/.local/share/local-ai-base/evaluation/tasks/t08-select-box/proof.spec.ts \
     ~/compare/$copy/angular-app/src/app/select-box.proof.spec.ts
done
```

Then in each container, from `angular-app/`, run the command given by the `test:` line of
`task.md`, for t08: `npx --no ng test --watch=false --include src/app/select-box.proof.spec.ts`.
For another task, take the file name from its `proof:` line.

## What to send back

The filled table, the request, and the answers you gave to the questions. Never real data in them.
