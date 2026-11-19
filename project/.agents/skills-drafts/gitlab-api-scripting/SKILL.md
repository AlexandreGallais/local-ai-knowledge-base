---
name: gitlab-api-scripting
description: "Automates GitLab through its REST API with glab api or a token - pagination, rate limits, read-only first. Use when a GitLab task has no glab command, when listing or updating many issues, merge requests, pipelines or projects, or when writing a script against the GitLab API."
metadata:
  id: GL-08
  stars: "2"
  nature: tooling
  mode: B
  wave: V3
  load: auto
---

# GitLab API scripting

**Core rule:** call the API through `glab api` (it handles host and token), paginate every list, and run a read-only dry run before any write.

## Procedure

1. Find the endpoint in `gitlab-official-docs` (`<resource> API`).
   - Check: method, path and parameters are confirmed.
2. Read first: `glab api "projects/:id/<resource>?per_page=100" --paginate`.
   - Check: the JSON output parses (`| jq length`).
3. For writes, print what would change first, then run with the human's yes: `glab api --method PUT "projects/:id/issues/<iid>" -f labels=<labels>`.
   - Check: the response shows the change.
4. Respect rate limits: small batches, stop on HTTP 429 and wait as the response says.
   - Check: no 429 left unhandled.

## This installation

<!-- FILL: what=glab api options available in this glab version (--paginate, --method, -f); find=glab api --help; verify=a paginated read of the project's issues returns JSON -->

<!-- FILL: what=rate limits of the internal GitLab; find=response headers of glab api -i projects/:id; verify=the RateLimit headers are noted, or their absence -->

## Stop and ask the human if

- A script would write to many objects or to projects you do not own.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "The first page is the whole list." | Lists are paginated; use `--paginate`. |
| "curl with the token in the command." | It lands in the shell history and logs. Use `glab api`. |

## Definition of done

- [ ] Endpoint confirmed; reads paginated; writes previewed and approved; rate limits handled.

## Local completion checklist

- [ ] glab api options
- [ ] Rate limits
