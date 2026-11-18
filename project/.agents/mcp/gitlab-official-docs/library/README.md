# Official documentation library

The official documentation of the tools, at a pinned version, as its authors wrote it: each file is
copied unchanged, in its own format. An API reference that lives in the comments of the source code
is taken from those comments. `<tool>.index.md` lists the files of each tool. The AI searches them
with the tools of the brick, then reads one section.

## Usage

From the root of the repository, with git and network access:

```sh
node scripts/fetch-library.ts                 # every tool
node scripts/fetch-library.ts --tool angular  # one tool, or a comma list
node scripts/check-library.ts                 # every file indexed, every license and notice
```

## Tools

| Tool | Documentation | Version | License | Size |
| --- | --- | --- | --- | --- |
| [gitlab-ci](gitlab-ci.index.md) | GitLab CI/CD: the folder doc/ci of the GitLab documentation (.gitlab-ci.yml, the reference of every keyword, variables, cache, artifacts, rules, pipelines) | 19.5 | CC-BY-SA-4.0 | 176 files, 2.2 MB |
| [gitlab-runner](gitlab-runner.index.md) | GitLab Runner: its documentation (install, register, executors Docker and Kubernetes, config.toml, services) | 19.5 | CC-BY-SA-4.0 | 66 files, 1.1 MB |
| [devcontainers-cli](devcontainers-cli.index.md) | Dev Containers CLI: its README and its examples of use, as building and running a dev container in CI | 0.89 | MIT | 3 files, 0.0 MB |
