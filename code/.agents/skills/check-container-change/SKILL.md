---
name: check-container-change
description: Check a changed Dockerfile, devcontainer.json, Kubernetes manifest, Helm chart or kustomization with tools, and fix it until zero errors. Use when you write or change one of these files, or when the user asks to check or validate one.
license: MIT
metadata:
  variant: files
  version: "0.1.0"
---

# Check a container change

## Rules

- Check with a tool. Never say that a file is valid from memory.
- Run only the tools that are installed. Never install a tool.
- Never search the web. Never open a URL.
- Never run a command that changes a cluster or a registry: no `kubectl apply` without `--dry-run`, no `helm install`, no `docker push`.
- Say which checks you could not run.
- Write a new file from the templates of `templates/containers/` and the "Right" examples of `docs/containers/` and `docs/kubernetes/`.

## File types and tools

Use the command of `## Check commands` in `AGENTS.md` when it has one for the file type. It can give the cluster version and the local schema folder. Otherwise use the commands below, in order.

| Type | How to recognize it | Tools |
| --- | --- | --- |
| Image build file | `Dockerfile`, `Containerfile`, `*.Dockerfile` | `hadolint`, `docker` |
| Dev container | `devcontainer.json` | `devcontainer` |
| Kubernetes manifest | YAML file with `apiVersion` and `kind` | `kubeconform`, `kube-linter` |
| Helm chart | Folder with `Chart.yaml` | `helm`, `kubeconform` |
| Kustomization | Folder with `kustomization.yaml` | `kustomize`, `kubeconform` |

Commands, by type:

```sh
# Image build file
hadolint <file>
docker info >/dev/null && docker build --check -f <file> <context folder>
# Dev container
devcontainer read-configuration --workspace-folder <project root>
# Kubernetes manifest
kubeconform -strict -summary <files>
kube-linter lint <files>
# Helm chart
helm lint --strict <chart folder>
helm template <chart folder> | kubeconform -strict -summary
# Kustomization
kustomize build <folder> | kubeconform -strict -summary
```

## Steps

1. Name each file of the task. Give each file one type from the table.

<!-- files:begin id=run-checks -->

2. For each tool of the type, run `command -v <tool>`. Skip a missing tool. Remember its name.
3. Run the commands of the type, in order.
4. Fix every error and every warning that the tools print. Change only the lines they name. Find the rule code in `docs/containers/dockerfile-checks.md` or `docs/kubernetes/validate-offline.md`.
5. Run the same commands again. Repeat until zero errors. Stop after 3 failed attempts on the same error. Show the error to the user.

<!-- files:end -->

6. Give the result in the answer format.

## Answer format

1. The result in one sentence: all checks pass, or how many errors are left.
2. One line per file: the file, the tool, the result.
3. `Not checked:` and each tool that was missing or each check that could not run.

## Example

Wrong:

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet
COPY publish/ /app
CMD dotnet /app/App.dll
```

`hadolint` prints DL3006 (the image has no tag) and DL3025 (`CMD` is not in JSON form).

Right:

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY publish/ ./
USER $APP_UID
ENTRYPOINT ["dotnet", "App.dll"]
```

## Pitfalls

- `docker build --check` prints `failed to connect to the docker API`: no Docker daemon answers. Skip this check, keep the `hadolint` result, and add it to `Not checked:`.
- `devcontainer read-configuration` runs `docker ps` first. Without a container engine it fails: add it to `Not checked:` and ask the user to rebuild the dev container.
- `kubeconform` fails to download a schema: its schema location is remote. Use the local schema folder of `AGENTS.md`. If there is none, add it to `Not checked:`.
- With Podman, write the full image name with its registry, for example `docker.io/hadolint/hadolint`.
- A file that passes every linter can still fail to build or to start. Say so when no build ran.

## Final check

- Did every result come from a tool that you ran in this session?
- Did you list every check that you could not run?
- Did you avoid every command that changes a cluster or a registry?
