---
title: "Feature Dependencies (part 1 of 2)"
tool: "devcontainers"
version: "2026-11"
source: "https://github.com/devcontainers/spec/blob/c95ffeed1d059abfe9ffbe79762dc2fa4e7c2421/docs/specs/feature-dependencies.md"
commit: "c95ffeed1d059abfe9ffbe79762dc2fa4e7c2421"
license: "CC-BY-4.0"
---

# Feature Dependencies

This has now been implemented:
* Discussion issue: https://github.com/devcontainers/spec/issues/109
* CLI PR: https://github.com/devcontainers/cli/commit/236b85162a945a1af9e72fcbe02eb5c7c864b31d

Below is the original proposal.

## Motivation

We've seen significant interest in the ability to "reuse" or "extend" a given Feature with one or more additional Features.  Often in software a given tool depends on another (or several) tool(s)/framework(s).  As the dev container Feature ecosystem has grown, there has been a growing need to reduce redundant code in Features by first installing a set of dependent Features.

## Goal

The solution shall provide a way to publish a Feature that "depends" on >= 1 other published Features. Dependent Features will be installed by the orchestrating tool following this specification.

The solution outlined shall not only execute the installation scripts, but also merge the additional development container config, as outlined in the documented merging logic.

The solution should provide guidelines for Feature authorship, and prefer solutions that enable simple authoring of Features, as well as easy consumption by end-users.

A non-goal is to require the use or implementation of a full-blown dependency management system (such as `npm` or `apt`).  The solution should allow Features to operate as "self-contained, shareable units of installation code and development container configuration"(1).

## Definitions

- **User-defined Feature**.  Features defined explicitly by the user in the `features` object of `devcontainer.json`.
- **Published Feature**.  Features published to an OCI registry or a direct HTTPS link to a Feature tgz.

## Existing Solutions

See https://github.com/devcontainers/spec/pull/208/files#diff-a29ffaac693437b6fbf001066b97896f7aef4d6d37dc65b8b98b22a5e19f6c7aR26 for existing solutions and alternative approaches.

## Proposed Specification

### (A) Add `dependsOn` property

A new property `dependsOn` can be optionally added to the `devcontainer-feature.json`.  This property mirrors the `features` object in `devcontainer.json`.  Adding Feature(s) to this property tells the orchestrating tool to install the Feature(s) (with the associated options, if provided) before installing the Feature that declares the dependency.

> This property is similar to the existing `installsAfter` property, with the key distinctions that `installsAfter` (1) is **not** recursive, (2) indicates a soft dependency to influence installation order **if and only if a given Feature is already set to be installed via a user-defined Feature or transitively through a user-defined Feature**, and (3) Features indicated by `installsAfter` can not provide options, nor are they able to be pinned to a specific version tag or digest.

The installation order is subject to the algorithm set forth in this document. Where there is ambiguity, it is up to the orchestrating tool to decide the order of installation. Implementing tools should provide a consistent installation order in instances of ambiguity (i.e. sort alphanumerically by identifier).

| Property | Type | Description |
|----------|------|-------------|
| `dependsOn` | `object` | The ID and options of the Feature dependency.  Pinning to version tags or digests are honored.  When published, the ID must refer to either a Feature (1) published to an OCI registry, (2) a Feature Tgz URI, or (3) a Feature in the local file tree (**).  Otherwise, IDs follow the same semantics of the `features` object in `devcontainer.json`.  (a.k.a "Hard Dependency") |

(**) Deprecated Feature identifiers (i.e. GitHub Release) are not supported and the presence of this property may be considered a fatal error or ignored. For local Features (i.e. during development), you may also depend on other local Features by providing a relative path to the Feature, relative to folder containing the active `devcontainer.json`. This behavior of Features within this property again mirror the `features` object in `devcontainer.json`.

An example `devcontainer-feature.json` file with a dependency on four other published Features:

```json
{
    "name": "My Feature",
    "id": "myFeature",
    "version": "1.0.0",
    "dependsOn": {
        "ghcr.io/second:1": {
            "flag": true
        },
        "features.azurecr.io/third:1": {},
        "features.azurecr.io/fourth:1.2.3": {},
        "features.azurecr.io/fifth@sha256:a4cdc44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855": {}
    }
}
```

`myfeature` will be installed after `second`, `third`, `fourth`, and `fifth`.

The following three sections will illustrate how an orchestrating tool shouuld identify dependencies between Features, depending on how the Feature is referenced.

#### Identifying Dependencies - OCI Registry

To speed up dependency resolution, all Features published to an OCI registry will have their entire `devcontainer-feature.json` serialized and added as an annotation.

The orchestrating tool can use this annotation to resolve the Feature's dependencies without having to download and extract the Feature's tarball.

More specifically, an annotation named `dev.containers.metadata` will be populated on the manifest when published by an implementing tool.  This annotation is the escaped JSON object of the entire `devcontainer-feature.json` as it appears during the packaging stage.

An example manifest with the `dev.containers.metadata` annotation:

```json
{
  "schemaVersion": 2,
  "mediaType": "application/vnd.oci.image.manifest.v1+json",
  "config": {
    "mediaType": "application/vnd.devcontainers",
    "digest": "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "size": 0
  },
  "layers": [
    {
      "mediaType": "application/vnd.devcontainers.layer.v1+tar",
      "digest": "sha256:738af5504b253dc6de51d2cb1556cdb7ce70ab18b2f32b0c2f12650ed6d2e4bc",
      "size": 3584,
      "annotations": {
        "org.opencontainers.image.title": "devcontainer-feature-myFeature.tgz"
      }
    }
  ],
  "annotations": {
    "dev.containers.metadata": "{\"name\": \"My Feature\",\"id\": \"myFeature\",\"version\": \"1.0.0\",\"dependsOn\": {\"ghcr.io/myotherFeature:1\": {\"flag\": true},\"features.azurecr.io/aThirdFeature:1\": {},\"features.azurecr.io/aFourthFeature:1.2.3\": {}}}"
  }
}
```

> If no annotation is present on a Feature's manifest, the orchestrating tool MUST fallback to downloading and extracting the Feature's contents to read the metadata properties. Failure to do so may result in a Feature being installed without its dependencies (e.g. `installsAfter`).

In summary, supporting tools may choose to identify the dependencies of the declared user-defined Features by fetching the manifest of the Features and reading the `dependsOn` and `installsAfter` properties from the `dev.containers.metadata` annotation.  This will allow the orchestrating tool to recursively resolve all dependencies without having to download and extract each Feature's tarball.

#### Identifying Dependencies - HTTPS Direct Tarball

Published Features referenced directly by HTTPS URI pointing to the packaged tarball archive will need to be fully downloaded an extracted to read the `dependsOn` property.

#### Identifying Dependencies - Local Features

Local Features dependencies are identified by directly reading the `dependsOn` property in the associated `devcontainer-feature.json` metadata file.

### (B) `dependsOn` install order algorithm

The orchestrating tool is responsible for calculating a Feature installation order (or error, if no valid installation order can be resolved). The set of Features to be installed is the union of user-defined Features and their dependencies.  The orchestrating tool will perform the following steps:

#### **(B1) Building dependency graph**

From the user-defined Features, the orchestrating tool will build a dependency graph.  The graph will be built by traversing the `dependsOn` and `installsAfter` properties of each Feature.  The metadata for each dependency is then fetched and the node added as an edge to to the dependent Feature.  For `dependsOn` dependencies, the dependency will be fed back into the worklist to be recursively resolved.

An accumulator is maintained with all uniquely discovered and user-provided Features, each with a reference to its dependencies.  If the exact Feature (see **Feature Equality**) has already been added to the accumulator, it will not be added again.  The accumulator will be fed into (B3) after the Feature tree has been resolved.

The graph may be stored as an adjacency list with two kinds of edges (1) `dependsOn` edges or "hard dependencies" and (2) `installsAfter` edges or "soft dependencies".

#### **(B2) Assigning `roundPriority`**

Each node in the graph has an implicit, default `roundPriority` of 0.

To influence installation order globally while still honoring the dependency graph of built in **(B1)**, `roundPriority` values may be tweaks for each Feature.  When each round is calculated in **(B3)**, only the Features equal to the max `roundPriority` of that set will be committed (the remaining will be uncommitted and reevaulated in subsequent rounds).

The `roundPriority` is set to a non-zero value in the following instances:

- If the `devcontainer.json` contains an `overrideFeatureInstallOrder`.

#### **(B3) Round-based sorting**

Perform a sort on the result of **(B1)** in rounds. This sort will rearrange Features, producing a sorted list of Features to install.  The sort will be performed as follows:

Start with all the elements from **(B2)** in a `worklist` and an empty list `installationOrder`.  While the `worklist` is not empty, iterate through each element in the `worklist` and check if all its dependencies (if any) are already members of `installationOrder`.  If the check is true, add it to an intermediate list `round` If not, skip it.  Equality is determined in **Feature Equality**.

Then for each intermediate `round` list, commit to `installationOrder` only those nodes who share the maximum `roundPriority`.  Return all nodes in `round` with a strictly lower `roundPriority` to the `worklist` to be reprocessed in subsequent iterations.  If there are multiple nodes with the same `roundPriority`, commit them to `installationOrder` with a final sort according to **Round Stable Sort**.

Repeat for as many rounds as necessary until `worklist` is empty.  If there is ever a round where no elements are added to `installationOrder`, the algorithm should terminate and return an error.  This indicates a circular dependency or other fatal error in the dependency graph.  Implementations should attempt to provide the user with information about the error and possible mitigation strategies.

#### Definition: Feature Equality

This specification defines two Features as equal if both Features point to the same exact contents and are executed with the same options.

**For Features published to an OCI registry**, two Feature are identical if their manifest digests are equal, and the options executed against the Feature are equal (compared value by value).  Identical manifest digests implies that the tgz contents of the Feature and its entire `devcontainer-feature.json` are identical.  If any of these conditions are not met, the Features are considered not equal.

**For Features fetched by HTTPS URI**, two Features are identical if the contents of the tgz are identical (hash to the same value), and the options executed against the Feature are equal (compared value by value).  If any of these conditions are not met, the Features are considered not equal.

**For local Features**, each Feature is considered unique and not equal to any other local Feature.

#### Definition: Round Stable Sort

To prevent non-deterministic behavior, the algorithm will sort each **round** according to the following rules:

- Compare and sort each Feature lexiographically by their fully qualified resource name (For OCI-published Features, that means the ID without version or digest.).  If the comparison is equal:
- Compare and sort each Feature from oldest to newest tag (`latest` being the "most new").  If the comparision is equal:
- Compare and sort each Feature by their options by:
  - Greatest number of user-defined options (note omitting an option will default that value to the Feature's default value and is not considered a user-defined option). If the comparison is equal:
  - Sort the provided option keys lexicographically.  If the comparison is equal:
  - Sort the provided option values lexicographically. If the comparision is equal:
- Sort Features by their canonical name (For OCI-published Features, the Feature ID resolved to the digest hash).

If there is no difference based on these comparator rules, the Features are considered equal.
