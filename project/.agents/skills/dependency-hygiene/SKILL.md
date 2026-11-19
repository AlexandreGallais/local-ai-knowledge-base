---
name: dependency-hygiene
description: "Keeps dependencies safe - lockfiles committed, versions pinned, approved sources only, changelog read before any update. Use when adding, removing or updating a package, editing package.json, requirements, pyproject, Cargo.toml, pom.xml, build.gradle or a csproj, or when a lockfile changes unexpectedly."
metadata:
  id: SEC-06
  stars: "3"
  nature: process
  mode: A
  wave: V2
  load: auto
---

# Dependency hygiene

**Core rule:** add a dependency only when needed, from the internal mirror, pinned through the lockfile, after reading what it brings.

## Procedure

1. Check the need: can the standard library or an existing dependency do it?
   - Check: you can name why a new package is required.
2. Check the candidate: maintained (recent release), licence allowed, size and transitive dependencies (`npm view <pkg> dependencies license`, `pip show`, `cargo tree -i`).
   - Check: licence, version and dependency count are noted.
3. Add it with the package manager so the lockfile updates: `npm install <pkg>@<version>`, `uv add`, `cargo add`, `dotnet add package`.
   - Check: manifest and lockfile both changed.
4. For an update, read the changelog between the two versions first; one dependency per change.
   - Check: breaking changes are listed before updating.
5. Run the build and the tests; commit manifest and lockfile together.
   - Check: green; one commit for the dependency change.

## Stop and ask the human if

- The licence is not in the allowed list, or the package is not on the internal mirror.
- An update has breaking changes in a module the project uses.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Edit the version in the manifest by hand." | The lockfile goes out of sync. Use the package manager. |
| "Update everything at once." | One failure hides in many changes. One dependency at a time. |

## Definition of done

- [ ] Need justified; licence and source checked; lockfile updated and committed.
- [ ] Build and tests green after the change.
