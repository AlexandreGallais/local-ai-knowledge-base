# Two test projects, with and without the base

From the pasted export to two dev containers side by side: the same Angular project, the same image,
the same OpenCode and the same model; one has the base, the other has nothing. Works on macOS and on
Linux, in a folder of your choice. For figures over ten tasks, see [run-evaluation.md](run-evaluation.md).

## What you need

- Docker Desktop, or Podman, running.
- VS Code with the Dev Containers extension.
- Node.js 22.18 or later on the machine, only to run the two import scripts.
- Network access the first time a container starts: it installs OpenCode and the packages.
- The model you use with OpenCode, and how you configure it.

## The folders

Everything lives in one folder, here `~/ai-test`; take any other.

```text
~/ai-test/
  paste/           the pasted parts and the two import scripts
  local-ai-base/   the global base, made by import-base.ts
  opencode-user/   your OpenCode configuration (the model), shared by both containers
  with-base/       test project 1: the base is mounted in its container
  without-base/    test project 2: nothing of the base
```

The two dev containers find `local-ai-base/` and `opencode-user/` beside their project folder: keep
these five folders together.

## 1. Paste the export

```sh
mkdir -p ~/ai-test/paste
```

Paste into `~/ai-test/paste/`, at the size that passes ([paste-export.md](paste-export.md)):

- every `global-NNN.txt`;
- `project-001.txt`;
- `import-base.ts` and `import-project.ts`.

## 2. Make the global base

```sh
cd ~/ai-test
node paste/import-base.ts
```

The base lands in `./local-ai-base`, the folder you ran the command from. To put it elsewhere, add
`--target <folder>`; the folder must be new, empty or an older base.

## 3. Write your OpenCode configuration

```sh
mkdir opencode-user
cp local-ai-base/templates/devcontainer/opencode-user/opencode.jsonc opencode-user/
```

Open `opencode-user/opencode.jsonc` and add your model, as you configure it today. Both containers read
this same file, so both use the same model.

## 4. Make the two projects

The starting projects of the evaluation are in the base. Copy them twice, without their profile, and
give each copy its dev container:

```sh
cp -r local-ai-base/evaluation/projects with-base
cp -r local-ai-base/evaluation/projects without-base
rm -rf with-base/*/.agents without-base/*/.agents
mkdir with-base/.devcontainer without-base/.devcontainer
cp local-ai-base/templates/devcontainer/with-base/devcontainer.json with-base/.devcontainer/
cp local-ai-base/templates/devcontainer/without-base/devcontainer.json without-base/.devcontainer/
```

Each copy holds three projects; you work in `angular-app/`.

## 5. Give the project kit to the project with the base

The project kit is two things written into a project: `AGENTS.md` and the folder `.agents/`. It goes
into `with-base/angular-app/` only:

```sh
cd ~/ai-test/with-base/angular-app
node ~/ai-test/paste/import-project.ts
```

It prints "Project kit installed". `without-base/angular-app/` gets nothing.

## 6. Open the two containers

In VS Code, run "Dev Containers: Open Folder in Container..." on `~/ai-test/with-base`; then, in a
second window, on `~/ai-test/without-base`. The first start installs OpenCode 2.2.7 and the packages:
wait for it to end.

In the terminal of each container, check:

```sh
opencode --version       # both: 2.2.7
ls /opt/local-ai-base    # with-base: VERSION, rules, tools...   without-base: No such file or directory
ls /etc/opencode         # with-base: opencode.jsonc, agents...  without-base: No such file or directory
```

Then make `angular-app/` the root of its own Git repository, in both containers:

```sh
cd angular-app
git init -q
```

## 7. The first conversation with the base

In the container `with-base`, from `angular-app/`, run `opencode` and say hello. The AI recognises an
Angular application and asks you to confirm it, its subject, its versions and its copyright header.
Answer, then restart OpenCode when it asks ([try-welcome.md](try-welcome.md)).

## 8. Give the same request to both

In each container, from `angular-app/`, run `opencode` and paste the same request.

For a first try, take the paragraph under "Request" of
`~/ai-test/local-ai-base/evaluation/tasks/t08-select-box/task.md` (a select box) or of
`t10-valve-list-page/task.md` (a page with its store). Never paste its "Proof of success" part: the
AI must not see it.

- With the base, the AI first writes a brief and asks questions. Answer them, and write your answers
  down. When the other session asks the same question, give the same answer.
- Never help one session more than the other.

## 9. Compare

When both say they are done, copy the proof test of the task into both projects, on the machine:

```sh
for copy in with-base without-base; do
  cp ~/ai-test/local-ai-base/evaluation/tasks/t08-select-box/proof.spec.ts \
     ~/ai-test/$copy/angular-app/src/app/select-box.proof.spec.ts
done
```

Then, in each container, from `angular-app/`:

```sh
npx ng build
npx --no ng test --watch=false --include src/app/select-box.proof.spec.ts
```

For another task, take the file name from the `proof:` line of its `task.md`. Fill the same lines for
both:

| Check | Without the base | With the base |
| --- | --- | --- |
| Said "done" without your help? |  |  |
| Questions asked before writing |  |  |
| Messages you had to send to fix something |  |  |
| `npx ng build` ends without error |  |  |
| The proof test passes |  |  |
| Code read by you: as your team writes it? |  |  |
| Time from the request to "done" |  |  |
| Tokens of the session, if OpenCode shows them |  |  |

## What to send back

The filled table, the request, and the answers you gave to the questions. Never real data in them.
