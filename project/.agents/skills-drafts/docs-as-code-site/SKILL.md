---
name: docs-as-code-site
description: "Manual: run only when the user explicitly asks for /docs-as-code-site. Sets up or maintains a documentation site versioned in the repository (MkDocs, Docusaurus or Antora), built offline and checked in CI."
metadata:
  id: WRT-08
  stars: "1"
  nature: reference
  mode: B
  wave: V4
  load: manual
---

# Docs as code site

**Core rule:** the site builds from the repository with one command, offline, with link checking, and its build runs in CI.

## Procedure

1. Use the generator the project already has, else the one approved by the team (below).
   - Check: the generator is installed from the internal mirror.
2. Keep sources in `docs/` with a navigation file; one page per topic.
   - Check: the navigation lists every page.
3. Build strictly (broken links fail the build): `mkdocs build --strict` for MkDocs, the equivalent for the chosen tool.
   - Check: the build passes.
4. Add the build to CI as a job that publishes the site artefact.
   - Check: `glab ci lint` passes and the job runs.

## This installation

<!-- FILL: what=documentation generator approved by the team and its plugins; find=ls mkdocs.yml docusaurus.config.* antora.yml and ask the human; verify=the generator builds the docs offline -->

<!-- FILL: what=where the built site is published internally; find=ask the human or read the CI pages job; verify=the published site shows the last build -->

## Stop and ask the human if

- The site would be published outside the internal network.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Themes from a CDN." | No Internet: themes and plugins must be installed locally. |
| "Skip strict mode." | Broken links reach readers. |

## Definition of done

- [ ] Site builds strictly and offline; CI job builds it.

## Local completion checklist

- [ ] Approved generator
- [ ] Publication target
