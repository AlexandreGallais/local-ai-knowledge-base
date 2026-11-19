---
name: ci-lint
description: "Validates .gitlab-ci.yml before pushing, with glab ci lint or the CI Lint API. Use when you changed .gitlab-ci.yml or an included CI file, when a pipeline fails with 'yaml invalid' or 'jobs config should contain', or before pushing a CI change."
metadata:
  id: GL-06
  stars: "3"
  nature: process
  mode: B
  wave: V2
  load: auto
---

# CI lint

**Core rule:** no push of a CI change before `glab ci lint` says the configuration is valid.

## Procedure

1. Check the YAML syntax first: `yq '.' .gitlab-ci.yml > /dev/null` (or `python3 -c "import yaml,sys; yaml.safe_load(open('.gitlab-ci.yml'))"`).
   - Check: no parse error.
2. Validate against GitLab: `glab ci lint` (from the project folder).
   - Check: the output says the configuration is valid.
3. On errors, read the message: it names the job and the key; fix it with `gitlab-official-docs`.
   - Check: `glab ci lint` passes after the fix.
4. Commit and push; check that the pipeline is created.
   - Check: `glab ci status` shows the new pipeline.

## This installation

<!-- FILL: what=output of glab ci lint on a valid file and on an invalid one; find=run glab ci lint on the current file and on a copy with a broken key; verify=the valid case and the error case are written here word for word -->

<!-- FILL: what=whether includes from other projects resolve during lint; find=grep -n 'project:' .gitlab-ci.yml; verify=glab ci lint resolves them without permission error -->

## Stop and ask the human if

- Lint fails on an included file from another project you cannot change.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Valid YAML is valid CI." | GitLab checks keywords and structure too. Run `glab ci lint`. |
| "Push and see." | A broken file blocks every pipeline of the branch. |

## Definition of done

- [ ] `glab ci lint` valid before the push; the pipeline is created.

## Local completion checklist

- [ ] glab ci lint outputs
- [ ] Cross-project includes
