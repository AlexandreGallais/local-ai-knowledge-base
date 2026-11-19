---
name: ci-local-reproduction
description: "Replays a GitLab CI job locally in the same image with podman run (or gitlab-ci-local) to debug it without pushing. Use when a job fails in CI but passes locally, when a CI fix needs testing before push, or when the job's environment is unclear."
metadata:
  id: GL-05
  stars: "3"
  nature: process
  mode: B
  wave: V2
  load: auto
---

# CI local reproduction

**Core rule:** reproduce in the job's own image with the job's own commands and variables, not in your dev environment.

## Procedure

1. Read the job: `image:`, `before_script:`, `script:`, `variables:`, and those inherited through `extends:` and `default:`.
   - Check: you have the full ordered list of commands and the image.
2. Pull the image: `podman pull <image>`.
   - Check: the pull succeeds from the internal registry.
3. Run the job's commands in it, with the project mounted: `podman run --rm -it -v "$PWD":/builds/project:Z -w /builds/project -e CI=true <image> sh` then the commands one by one (omit `-it` when no terminal: pass the commands with `sh -c`).
   - Check: the same error as in CI appears.
4. Fix and rerun inside the same container.
   - Check: the commands pass.
5. Push and follow the pipeline (`mr-pipeline-watch` if present).
   - Check: the job is green in CI.

## This installation

<!-- FILL: what=whether gitlab-ci-local is available; find=command -v gitlab-ci-local; verify=gitlab-ci-local --list prints the project's jobs -->

<!-- FILL: what=CI variables jobs rely on that must be set locally (non-secret); find=grep -n -E '\$[A-Z_]+' .gitlab-ci.yml | head; verify=the job runs locally with these set to safe values -->

## Stop and ask the human if

- The job needs protected variables, secrets or runner services that cannot exist locally.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "It passes in my dev container." | Different image, different tools. Use the job's image. |
| "Skip `before_script`." | It often installs what the script needs. |

## Definition of done

- [ ] CI error reproduced locally in the job's image; fix verified there and in CI.

## Local completion checklist

- [ ] gitlab-ci-local
- [ ] Non-secret CI variables
