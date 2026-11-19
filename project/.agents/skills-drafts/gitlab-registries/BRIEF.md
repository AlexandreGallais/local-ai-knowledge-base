# BRIEF: gitlab-registries  (GL-09, 3 stars, V2)

## Final frontmatter (do not change)

```yaml
name: gitlab-registries
description: "Uses the internal GitLab Container Registry and Package Registry (npm, PyPI, NuGet, Maven, Cargo) - addresses, authentication, publishing and pulling. Use when pulling or pushing an image, publishing or installing an internal package, or when a registry answers 401, 403 or 404."
metadata:
  id: GL-09
  stars: "3"
  nature: reference
  mode: C
  wave: V2
  load: auto
```

## Goal

A reference of the internal registries used by the team, verified on the machine, so the agent pulls and publishes images and packages without guessing addresses or credentials.

## Questions the skill must answer

1. Which registries does the team use (container, npm, PyPI, NuGet, Maven, Cargo) and at which project or group level?
2. How does authentication work for each (job token in CI, personal token locally), without printing tokens?
3. Exact pull and publish commands per registry, and the config files they need?
4. Naming and versioning rules for published images and packages?
5. What to do on 401, 403 and 404?

## Where to look (files, commands, people)

- .npmrc, pip.conf, NuGet.Config, settings.xml, ~/.cargo/config.toml, ~/.config/containers/auth.json (names only)
- .gitlab-ci.yml publish jobs
- the human: the registries and the publishing rules

## Required sections

- Core rule in the first 10 lines.
- Procedure with an Action and a Check per step, or a reference table with the commands.
- Stop and ask the human if; Common mistakes; Definition of done.

## Acceptance tests

- Trigger: loads on "push this image to the registry", "publish the package", "npm install fails with 401 on the internal registry"; does not load on "write a unit test", "rename a variable", "explain git rebase".
- Paired task: publish a test package to a sandbox project; with the skill the agent uses the right registry and authentication and the package appears in the registry.

## Human input required (yes/no, what)

Yes: registry locations, the publishing rules and the sandbox to test in.
