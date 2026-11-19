---
name: offline-environment
description: "Keeps the agent inside a network with no Internet, using internal mirrors and the documentation servers only. Use when about to run any install, download, curl, wget, pip, npm, dnf, cargo, dotnet or mvn command, before writing a URL, and when you see ENOTFOUND, EAI_AGAIN, 'Could not resolve host' or a timeout."
metadata:
  id: DOC-02
  stars: "5"
  nature: guardrail
  mode: B
  wave: V0
  load: always
---

# Offline environment

**Core rule:** there is no Internet. Install only through the internal mirrors below, read documentation only through the MCP documentation servers, and never write a URL you did not read in a file or a tool result.

## Rules

1. Before an install, read the mirror of the tool in the table below; never add a public registry or URL.
   - Check: the command points to the internal mirror, or uses the tool's configured default.
2. Look up documentation with `<brick>_search_docs` then `<brick>_read_doc`, never with a fetch command.
   - Check: the documentation you cite comes from a tool result.
3. On a network error, classify it with the table before any retry.
   - Check: you named the class of the error.

| Tool | Internal mirror |
|---|---|
| dnf | <!-- FILL: what=dnf repositories in use; find=dnf repolist; verify=dnf repolist lists only internal repos -->
| npm | <!-- FILL: what=npm registry; find=npm config get registry; verify=npm ping prints PONG -->
| pip | <!-- FILL: what=pip index; find=pip config list; verify=pip download --no-deps -d /tmp/p <small package> succeeds -->
| NuGet | <!-- FILL: what=NuGet sources; find=dotnet nuget list source; verify=only internal sources are Enabled -->
| Maven | <!-- FILL: what=Maven mirror; find=grep -A3 '<mirror>' ~/.m2/settings.xml; verify=mvn -q help:effective-settings shows the mirror -->
| Cargo | <!-- FILL: what=Cargo registry replacement; find=cat ~/.cargo/config.toml; verify=cargo search serde returns results -->
| Proxy | <!-- FILL: what=proxy variables; find=printenv http_proxy https_proxy no_proxy; verify=values match the internal proxy or are empty -->

| Error text | Class | Action |
| --- | --- | --- |
| `ENOTFOUND`, `EAI_AGAIN`, `Could not resolve host`, `Temporary failure in name resolution` | DNS: public host | Use the internal mirror |
| `ETIMEDOUT`, `Connection timed out` | Blocked route | Use the internal mirror; do not retry |
| `self signed certificate`, `certificate verify failed` | Internal CA | Load `tls-and-corporate-ca` |
| `404` on an internal mirror | Package missing from mirror | Ask the human |

## Stop and ask the human if

- A package is missing from the internal mirror.
- A task needs a document that no documentation server holds: report it with `docs-gap-report`.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "I will curl the docs page." | No Internet. Use the documentation servers. |
| "Retry, it may be slow." | A public host never answers here. |

## Definition of done

- [ ] No command reached for a public host; every install used an internal mirror.
- [ ] No invented URL in code, docs or replies.

## Local completion checklist

- [ ] dnf repositories
- [ ] npm registry
- [ ] pip index
- [ ] NuGet sources
- [ ] Maven mirror
- [ ] Cargo registry
- [ ] Proxy variables
