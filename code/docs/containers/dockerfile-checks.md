---
id: containers-dockerfile-checks
title: Dockerfile checks
topic: containers
summary: Run hadolint and the Docker build checks, read their messages, and fix each rule code.
tool: hadolint, docker
version: "1.8"
checked: 2026-11-13
sources: [S1, S2, S3]
license: MIT, written for this base from Apache 2.0 and GPL-3.0 sources, rules described in own words
variant: files
---

# Dockerfile checks

Contents: 1. Two tools · 2. Commands · 3. Messages and fixes · 4. Settings · Sources

## 1. Two tools that complete each other (hadolint and docker build --check)

|  | hadolint | `docker build --check` |
| --- | --- | --- |
| What it reads | The Dockerfile and the shell of each `RUN` (ShellCheck rules) | The Dockerfile, with the builder, without building |
| What it needs | Its binary, or its image | Dockerfile syntax 1.8, Buildx 0.15.0, a Docker daemon that answers |
| Sees alone | Missing tag or `latest`, last `USER` root, `ADD`, `pipefail`, package versions | Instruction case, undefined `ARG` and variables, ignored file copied, fixed platform |
| Exit code | Not zero from its failure threshold (default `info`) | Not zero with `--check` |

Both see the exec form, relative `WORKDIR`, secrets in `ARG` or `ENV`, a reserved stage name and a fixed platform. Run hadolint first: it works everywhere. Add the Docker checks when a daemon answers. [S1] [S2] [S3]

Neither tool builds the image. A Dockerfile that passes both can still fail to build. Say so when no build ran. [S1]

## 2. Commands (Dockerfile check commands)

```sh
hadolint Dockerfile
docker info >/dev/null && docker build --check -f Dockerfile .
```

- Without the binary, hadolint runs from its image: `docker run --rm -i hadolint/hadolint < Dockerfile`, or with Podman `podman run --rm -i docker.io/hadolint/hadolint < Dockerfile`. [S3]
- `docker build --check` prints `failed to connect to the docker API` when no daemon answers: skip it and say so. [S1]
- Output formats of hadolint: `-f tty` (default), `json`, `sarif`, `junit` and others. [S3]

## 3. Messages and fixes (hadolint and build check codes)

| Code | Meaning | Fix |
| --- | --- | --- |
| DL3006 | Image without a tag | Add a version tag |
| DL3007 | Image tag `latest` | Write a version tag |
| DL3002 | Last user is root | Add `USER` with a non-root account |
| DL3000, WorkdirRelativePath | Relative `WORKDIR` | Write an absolute path |
| DL3020 | `ADD` for local files | Use `COPY` |
| DL3025, JSONArgsRecommended | `CMD` or `ENTRYPOINT` in shell form | Write the JSON array form |
| DL3008 | System package without a version | Warning only: pin when you know the version |
| DL3009 | Package lists kept | `rm -rf /var/lib/apt/lists/*` in the same `RUN` |
| DL3015 | Recommended packages installed | Add `--no-install-recommends` |
| DL4006 | Pipe without `pipefail` | `SHELL ["/bin/bash", "-o", "pipefail", "-c"]` |
| SecretsUsedInArgOrEnv | A secret name in `ARG` or `ENV` | Remove it from the image |
| CopyIgnoredFile | `COPY` of a file that `.dockerignore` excludes | Fix the copy or the ignore list |
| UndefinedVar, UndefinedArgInFrom | A variable never defined | Declare the `ARG` before it is used |

Sources: [S2] [S3]. Fix only the lines the tool names, then run the same commands again.

## 4. Settings (.hadolint.yaml and check comments)

- `.hadolint.yaml` next to the Dockerfile sets the failure threshold and the level of each rule. Keep DL3008 as a warning. [S3]
- `# hadolint ignore=DL3008` on the line above an instruction skips one rule for that line. Use it only with a reason in the same comment. [S3]
- `# check=skip=<codes>` at the top of the Dockerfile skips build checks; `# check=error=true` makes them fail the build. [S1] [S2]

## Sources

- [S1] Docker, "Checking your build configuration", <https://docs.docker.com/build/checks/>, read 2026-11-12, Apache 2.0, summarized; and a test of the research without a daemon, Docker CLI 29.9.3, Buildx 0.38.1.
- [S2] Docker, "Build checks", <https://docs.docker.com/reference/build-checks/>, read 2026-11-12, Apache 2.0, summarized.
- [S3] hadolint, README, <https://github.com/hadolint/hadolint>, read 2026-11-12, GPL-3.0, rules described in own words.
