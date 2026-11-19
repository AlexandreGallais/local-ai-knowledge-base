# BRIEF: image-registry-ops  (CTR-09, 2 stars, V3)

## Final frontmatter (do not change)

```yaml
name: image-registry-ops
description: "Pulls, tags and pushes container images with the internal registries - tags, digests, skopeo copy and inspect. Use when pulling or pushing an image, copying an image between registries, pinning an image by digest, or when a pull fails with unauthorized or manifest unknown."
metadata:
  id: CTR-09
  stars: "2"
  nature: reference
  mode: C
  wave: V3
  load: auto
```

## Goal

A reference of the internal container registries and the exact podman and skopeo commands to pull, tag, push, inspect and copy images, with authentication handled without printing secrets.

## Questions the skill must answer

1. Which internal registries exist and what is their naming scheme for images and tags?
2. How does authentication work (podman login, auth file location) without printing tokens?
3. How to inspect an image remotely without pulling it (skopeo inspect)?
4. How to pin by digest and find the digest of a tag?
5. Which tags are immutable or protected?

## Where to look (files, commands, people)

- ~/.config/containers/registries.conf and auth.json (names only)
- .gitlab-ci.yml image build and push jobs
- the human: naming and tagging rules

## Required sections

- Core rule in the first 10 lines.
- Procedure with an Action and a Check per step, or a reference table with the commands.
- Stop and ask the human if; Common mistakes; Definition of done.

## Acceptance tests

- Trigger: loads on "push the image to the registry", "pull fails with unauthorized", "pin this image by digest"; does not load on "write a Containerfile", "fix the unit test", "explain podman".
- Paired task: pin the base image of a Containerfile by digest; with the skill the digest comes from skopeo inspect and the build still works.

## Human input required (yes/no, what)

Yes: registry naming and tagging rules, and which tags are protected.
