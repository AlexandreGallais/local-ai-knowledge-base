---
name: glab-cli
description: "Drives the internal GitLab from the terminal with glab - merge requests, issues, pipelines, jobs, variables, authentication. Use when you need anything from GitLab (MR, issue, pipeline, job log, CI variable), when you see glab in a command or an error, or when a GitHub habit (gh, PR, Actions) must be translated to GitLab."
metadata:
  id: GL-01
  stars: "5"
  nature: reference
  mode: B
  wave: V1
  load: auto
---

# glab CLI

**Core rule:** use `glab` for GitLab, never `gh`; check `glab auth status` once per session before the first GitLab command.

## Procedure

1. Check authentication: `glab auth status`.
   - Check: it shows the internal host and "Logged in"; otherwise stop and ask the human.
2. Find the command in the table; confirm its flags with `glab <command> --help` or `gitlab-official-docs_search_docs`.
   - Check: every flag you use appears in the help output.
3. Prefer machine-readable output when parsing: `--output json` (alias `-F json`) where the command offers it.
   - Check: the output parses as JSON before you rely on it.

## Commands

| Need | Command |
| --- | --- |
| Create a merge request from the current branch | `glab mr create --fill --target-branch <target> --draft --yes` |
| View the MR of the current branch | `glab mr view` |
| List the MRs assigned to me | `glab mr list --assignee=@me` |
| Comment on an MR | `glab mr note <iid> --message "<text>"` |
| Pipeline status of the current branch | `glab ci status` |
| Wait for the pipeline to finish | `glab ci status --wait` |
| Failed jobs of an MR's pipeline | `glab ci get --merge-request=<iid> --status=failed --with-job-details` |
| Log of a job | `glab ci trace <job-id>` |
| Retry a job | `glab ci retry <job-id>` |
| Validate `.gitlab-ci.yml` | `glab ci lint` |
| View an issue | `glab issue view <iid>` |
| Call the API | `glab api projects/:id/merge_requests/<iid>` |

| GitHub habit | GitLab with glab |
| --- | --- |
| `gh pr create` | `glab mr create` |
| pull request, PR | merge request, MR, `!<iid>` |
| GitHub Actions, checks | GitLab CI pipeline, jobs |
| `gh run view --log` | `glab ci trace <job-id>` |

## This installation

<!-- FILL: what=internal GitLab host; find=glab config get host and git remote -v; verify=glab auth status prints Logged in to this host -->

<!-- FILL: what=glab version installed; find=glab --version; verify=the commands of the table above print their help with glab <command> --help -->

<!-- FILL: what=how the token is provided (environment variable or config); find=glab auth status and printenv GITLAB_TOKEN GITLAB_HOST without printing values; verify=glab api user returns the current user -->

## Stop and ask the human if

- `glab auth status` fails: never ask for a token in chat; let the human log in.
- A command would delete or close something on GitLab (`destructive-action-gate`).

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "`gh` will work." | This is GitLab. Use `glab`. |
| "I will print the token to check it." | Check with `glab auth status`; never print a token. |
| "`glab ci view` for logs." | `ci view` is interactive; use `glab ci trace <job-id>`. |

## Definition of done

- [ ] Every GitLab action ran through `glab` with flags confirmed in its help.
- [ ] No token printed or pasted.

## Local completion checklist

- [ ] Internal GitLab host
- [ ] glab version and command help
- [ ] Token provisioning
