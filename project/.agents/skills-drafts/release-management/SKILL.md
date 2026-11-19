---
name: release-management
description: "Manual: run only when the user explicitly asks for /release-management. Publishes a release on GitLab - tag, release with notes generated from commits and merge requests, assets - following the team's process."
metadata:
  id: GL-10
  stars: "2"
  nature: process
  mode: B
  wave: V3
  load: manual
---

# Release management

**Core rule:** a release is created from a tag whose pipeline is green, with notes written for users, and only with the human's yes.

## Procedure

1. Prepare the version and changelog (`versioning-and-changelog`).
   - Check: annotated tag created locally; changelog entry committed.
2. Push the tag after a yes: `git push origin v<version>`.
   - Check: `glab ci status --branch v<version>` (or the tag pipeline) ends green.
3. Write the release notes (`changelog-from-commits`).
   - Check: notes reviewed by the human.
4. Create the release: `glab release create v<version> --notes-file /tmp/notes.md` (add asset files as the team does).
   - Check: `glab release view v<version>` shows the notes and assets.

## This installation

<!-- FILL: what=release flags of this glab version (notes file, assets, milestone); find=glab release create --help; verify=a release created in a sandbox project shows notes and assets -->

<!-- FILL: what=the team's release process (who approves, which branch, which jobs); find=CONTRIBUTING.md, .gitlab-ci.yml release jobs, and the human; verify=the process is written here and matches the last release -->

## Stop and ask the human if

- Always before pushing the tag and creating the release.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Tag and release from a red pipeline." | Users get a broken version. Wait for green. |
| "Delete and recreate a tag to fix it." | Others may have fetched it. Make a new patch release. |

## Definition of done

- [ ] Tag pipeline green; release created with reviewed notes; approvals obtained.

## Local completion checklist

- [ ] glab release flags
- [ ] Team release process
