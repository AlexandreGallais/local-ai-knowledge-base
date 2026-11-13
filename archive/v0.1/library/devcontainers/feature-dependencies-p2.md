---
title: "Feature Dependencies (part 2 of 2)"
tool: "devcontainers"
version: "2026-11"
source: "https://github.com/devcontainers/spec/blob/c95ffeed1d059abfe9ffbe79762dc2fa4e7c2421/docs/specs/feature-dependencies.md"
commit: "c95ffeed1d059abfe9ffbe79762dc2fa4e7c2421"
license: "CC-BY-4.0"
---

# Feature Dependencies (part 2 of 2)

## Note: Existing methods of altering Feature installation order

Two existing properties (1) `installsAfter` on the Feature metadata, and  (2) `overrideFeatureInstallationOrder` in the `devcontainer.json` both exist to alter the installation order of user-defined Features.  The behavior of these properties are carried forward in this proposal.

### installsAfter

The `installsAfter` property is a "soft dependency" that influences the installation order of Features that are queued to be installed.  The effective behavior of this property is the same as `dependsOn`, with the following differences:

- `installsAfter` is not recursive.
- `installsAfter` only influences the installation order of Features that are already set to be installed after resolving the dependency tree.
- The Feature indicated by `installsAfter` can not provide options, nor are they able to be pinned to a specific version tag or digest.  This is unchanged from the current specification.

From an implementation point of view, `installsAfter` nodes may be added as a seperate set of directed edges, just as `dependsOn` nodes are added as directed edges (see **(B1)**).  Before round-based installation and sorting **(B3)**, an orchestrating tool should remove all `installsAfter` directed edges that do not correspond with a Feature in the `worklist` that is set to be installed.  In each round, a Feature can then be installed if all its requirements (both `dependsOn` and `installsAfter` dependencies) have been fulfilled in previous rounds.

An implemention should fail the dependency resolution step if the evaluation of the `installsAfter` property results in an inconsistent state (e.g. a circular dependency).

### overrideFeatureInstallOrder

The `overrideFeatureInstallOrder` property of `devcontainer.json` is an array of Feature IDs that are to be installed in descending priority order as soon as its dependencies outlined above are installed.

This evaluation is performed by assigning a `roundPriority` to all nodes that match the Feature identifier present in the property.

For example, given `n` Features in the `overrideFeatureInstallOrder` array, the orchestrating tool should assign a `roundPriority` of `n - idx` to each Feature, where `idx` is the zero-based index of the Feature in the array.

For example:

```json
overrideFeatureInstallOrder = [
  "foo",
  "bar",
  "baz"
]
```

would result in the following `roundPriority` assignments:

```json
const roundPriority = {
  "foo": 3,
  "bar": 2,
  "baz": 1
}
```

This property must not influence the dependency relationship as defined by the dependency graph (see **(B1)**) and shall only be evaulated at the round-based sorting step (see **(B3)**).  Put another way, this property cannot "pull forward" a Feature until all of its dependencies (both soft and hard) have been installed.  After a Feature's dependencies have been installed in other rounds, this property should "pull forward" each Feature as early as possible (given the order of identifiers in the array).

Similar to `installsAfter`, this property's members may not provide options, nor are they able to be pinned to a specific version tag or digest.  This is unchanged from the current specification.

If a Feature is indicated in `overrideFeatureInstallOrder` but not a member of the dependency graph (i.e. it is not queued to be installed), the orchestrating tool may fail the dependency resolution step.

## Additional Remarks

### Feature authorship

Features should be authored with the following considerations:

- Features should be authored with the assumption that they will be installed in any order, so long as the dependencies are met at some point beforehand.
- Since two Features with different options are considered different, a single Feature may be installed more than once.  Features should be idempotent.
- Features that require updating shared state in the container (e.g. updating the `$PATH`), should be aware that the same Feature may be run multiple times. Consider a method for previous runs of the Feature to communicate with future runs, updating the shared state in the intended way.

### Image Metadata

Dependency resolution is only performed on initial container creation by reading the `features` object of `devcontainer.json` and resolving the Features in that point in time.  For subsequent creations from an image (or resumes of a dev container), the dependency tree is **not** re-calculated.  To re-calculate the dependency tree, the user must delete the image (or dev container) and recreate it from a `devcontainer.json`.

Once Feature dependencies are resolved, they are treated the same as if members of the user-defined Features.  That means both user-defined Features and their dependencies are stored in the image's metadata.
