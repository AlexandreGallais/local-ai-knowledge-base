---
name: gitlab-ci-authoring
description: "Writes and changes .gitlab-ci.yml - stages, rules, needs, cache, artifacts, include, extends, variables, environments. Use when creating or editing .gitlab-ci.yml or an included CI file, adding a job, changing when a job runs, or speeding up a pipeline's structure."
metadata:
  id: GL-03
  stars: "4"
  nature: reference
  mode: B
  wave: V2
  load: auto
---

# GitLab CI authoring

**Core rule:** every keyword you write is confirmed in `gitlab-official-docs`, and the file passes `glab ci lint` before you push it.

## Procedure

1. Read the current `.gitlab-ci.yml` and its `include:` files.
   - Check: you can list stages, templates (`extends`) and shared variables.
2. Write the job from the closest existing job (`extends:` a template when one exists).
   - Check: the new job follows the same image, tags and cache pattern.
3. Control when it runs with `rules:` (not `only` or `except`).
   - Check: each rule has an `if:` you can explain.
4. Declare dependencies with `needs:` and outputs with `artifacts:` (with `expire_in`).
   - Check: downstream jobs get the files they need.
5. Validate: `glab ci lint`.
   - Check: the output says the configuration is valid.

| Keyword | Use |
| --- | --- |
| `rules:` | when a job runs (branch, MR, changed files, variables) |
| `needs:` | start a job as soon as its inputs exist (DAG) |
| `cache:` | reuse dependencies between pipelines (key on the lockfile) |
| `artifacts:` | pass files to later jobs or keep reports |
| `extends:` | reuse a hidden template job (`.template`) |
| `include:` | split or share configuration |
| `variables:` | non-secret values; secrets come from CI/CD settings |

## This installation

<!-- FILL: what=runner tags and default image of the project; find=grep -n -E 'tags:|image:' .gitlab-ci.yml; verify=a job with these tags runs (glab ci status shows it picked up) -->

<!-- FILL: what=shared CI templates included by the team; find=grep -n -A3 'include:' .gitlab-ci.yml; verify=glab ci lint resolves the includes without error -->

## Stop and ask the human if

- The change touches deployment jobs, protected variables or security scans.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "`only: [main]` is fine." | `rules:` replaces it; do not mix both in one job. |
| "Put the token in `variables:`." | Secrets go in protected CI/CD variables, never in the file. |

## Definition of done

- [ ] Keywords confirmed in the docs; `glab ci lint` valid.
- [ ] The pipeline runs the new job when expected (checked on the branch).

## Local completion checklist

- [ ] Runner tags and default image
- [ ] Shared templates
