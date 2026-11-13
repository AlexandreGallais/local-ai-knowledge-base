---
title: "Dev Container Features reference (part 3 of 4)"
tool: "devcontainers"
version: "2026-11"
source: "https://github.com/devcontainers/spec/blob/c95ffeed1d059abfe9ffbe79762dc2fa4e7c2421/docs/specs/devcontainer-features.md"
commit: "c95ffeed1d059abfe9ffbe79762dc2fa4e7c2421"
license: "CC-BY-4.0"
---

# Dev Container Features reference (part 3 of 4)

## Execution

### Invoking `install.sh`

The `install.sh` script for each Feature should be executed as `root` during a container image build. This allows the script to add needed OS dependencies or settings that could not otherwise be modified. This also allows the script to switch into another user's context using the `su` command (e.g. `su ${USERNAME} -c "command-goes-here"`). In combination, this allows both root and non-root image modifications to occur even if `sudo` is not present in the base image for security reasons.

To ensure that the appropriate shell is used, the execute bit should be set on `install.sh` and the file invoked directly (e.g. `chmod +x install.sh && ./install.sh`).

> **Note:** It is recommended that Feature authors write `install.sh` using a shell available by default in their supported distributions (e.g. `bash` in Debian/Ubuntu or Fedora, `sh` in Alpine). In the event a different shell is required (e.g. `fish`), `install.sh` can be used to boostrap by checking for the presence of the desired shell, installing it if needed, and then invoking a secondary script using the shell.
>
> The `install.sh` file can similarly be used to bootstrap something written in a compiled language like Go. Given the increasing likelihood that a Feature needs to work on both x86_64 and arm64-based devices (e.g. Apple Silicon Macs), `install.sh` can detect the current architecture (e.g. using something like `uname -m` or `dpkg --print-architecture`), and then invoke the right executable for that architecture.

### Installation order

By default, Features are installed on top of a base image in an order determined as optimal by the implementing tool.

If any of the following properties are provided in the Feature's `devcontainer-feature.json`, or the user's `devcontainer.json`, the order indicated by these propert(ies) are respected.

* The `dependsOn` property defined as a part of a Feature's `devcontainer-feature.json`.
* The `installsAfter` property defined as part of a Feature's `devcontainer-feature.json`.
* The `overrideFeatureInstallOrder` property in user's `devcontainer.json`. Allows users to control the order of execution of their Features.

#### The `dependsOn` property

The optional `dependsOn` property indicates a set of required, "hard" dependencies for a given Feature.

The `dependsOn` property is declared in a Feature's `devcontainer-feature.json` metadata file. Elements of this property mirror the semantics of the `features` object in `devcontainer.json`.  Therefore, all dependencies may provide the relevant options, or an empty object (e.g. `"bar:123": {}`) if the Feature's default options are sufficient.  Identical Features that provide different options are treated as _different_ Features (see Feature equality for more info).

All Features indicated in the `dependsOn` property **must** be satisfied (a Feature equal to each dependency is present in the installation order) _before_ the given Feature is set to be installed.  If any of the Features indicated in the `dependsOn` property cannot be installed (e.g. due to circular dependency, failure to resolve the Feature, etc) the entire dev container creation should fail.

The `dependsOn` property must be evaluated recursively.  Therefore, if a Feature dependency has its own `dependsOn` property, that Feature's dependencies must also be satisfied before the given Feature is installed.

```json
{
    "name": "My Feature",
    "id": "myFeature",
    "version": "1.0.0",
    "dependsOn": {
        "foo:1": {
            "flag": true
        },
        "bar:1.2.3": {},
        "baz@sha256:a4cdc44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" {},
    }
}
```

In the snippet above, `myfeature` MUST be installed after `foo`, `bar`, and `baz`.  If the Features provided via the `dependsOn` property declare their own dependencies, those must also be satisfied before the Feature is installed.

#### The `installsAfter` Property

The `installsAfter` property indicates a "soft dependency" that influences the installation order of Features that are already queued to be installed. The effective behavior of this property is the same as `dependsOn`, with the following differences:

- `installsAfter` is **not** evaluated recursively.
- `installsAfter` only influences the installation order of Features that are **already set to be installed**.  Any Feature not set to be installed after (1) resolving the `dependsOn` dependency tree or (2) indicated by the user's `devcontainer.json` should not be added to the installation list.
- The Feature indicated by `installsAfter` can **not** provide options, nor are they able to be pinned to a specific version tag or digest.  Resolution to the canonical name should still be performed (e.g. if the Feature has been renamed).

```
{
    "name": "My Feature",
    "id": "myFeature",
    "version": "1.0.0",
    "installsAfter": [
        "foo",
        "bar"
    ]
}
```

In the snippet above, `myfeature` must be installed after `foo` and `bar` **if** the Feature is already queued to be installed. If `foo` and `bar` are not already queued to be installed, this dependency relationship should be ignored.

#### The 'overrideFeatureInstallOrder' property

The `overrideFeatureInstallOrder` property of `devcontainer.json` is an array of Feature IDs that are to be installed in descending priority order as soon as its dependencies outlined above are installed.

> This property may not indicate an installation order that is inconsistent with the resolved dependency graph (see dependency algorithm).  If the `overrideFeatureInstallOrder` property is inconsistent with the dependency graph, the implementing tool should fail the dependency resolution step.

This evaluation is performed by assigning a `roundPriority` to all nodes that match the Feature identifier (version omitted) present in the property.

For example, given `n` Features in the `overrideFeatureInstallOrder` array, the orchestrating tool should assign a `roundPriority` of `n - idx` to each Feature, where `idx` is the zero-based index of the Feature in the array.

For example:

```javascript
overrideFeatureInstallOrder = [
  "foo",
  "bar",
  "baz"
]
```

would result in the following `roundPriority` assignments:

```javascript
const roundPriority = {
  "foo": 3,
  "bar": 2,
  "baz": 1
}
```

This property must not influence the dependency relationship as defined by the dependency graph (see dependency graph) and shall only be evaulated at the round-based sorting step (see round sort).  Put another way, this property cannot "pull forward" a Feature until all of its dependencies (both soft and hard) have been installed. After a Feature's dependencies have been installed in other rounds, this property should "pull forward" each Feature as early as possible (given the order of identifiers in the array).

Similar to `installsAfter`, this property's members may not provide options, nor are they able to be pinned to a specific version tag or digest.

If a Feature is indicated in `overrideFeatureInstallOrder` but not a member of the dependency graph (i.e. it is not queued to be installed), the orchestrating tool may fail the dependency resolution step.

> ## Definitions
> ### Definition: Feature Equality
>
> This specification defines two Features as equal if both Features point to the same exact contents and are executed with the same options.
>
> **For Features published to an OCI registry**, two Feature are identical if their manifest digests are equal, and the options executed against the Feature are equal (compared value by value).  Identical manifest digests implies that the tgz  contents of the Feature and its entire `devcontainer-feature.json` are identical.  If any of these conditions are not met,  the Features are considered not equal.
>
> **For Features fetched by HTTPS URI**, two Features are identical if the contents of the tgz are identical (hash to the same value), and the options executed against the Feature are equal (compared value by value).  If any of these conditions  are not met, the Features are considered not equal.
>
> **For local Features**, each Feature is considered unique and not equal to any other local Feature.
>
> ### Definition: Round Stable Sort
>
> To prevent non-deterministic behavior, the algorithm will sort each **round** according to the following rules:
>
> - Compare and sort each Feature lexiographically by their fully qualified resource name (For OCI-published Features, that  means the ID without version or digest.).  If the comparison is equal:
> - Compare and sort each Feature from oldest to newest tag (`latest` being the "most new").  If the comparision is equal:
> - Compare and sort each Feature by their options by:
>   - Greatest number of user-defined options (note omitting an option will default that value to the Feature's default value  and is not considered a user-defined option). If the comparison is equal:
>   - Sort the provided option keys lexicographically.  If the comparison is equal:
>   - Sort the provided option values lexicographically. If the comparision is equal:
> - Sort Features by their canonical name (For OCI-published Features, the Feature ID resolved to the digest hash).
>
> If there is no difference based on these comparator rules, the Features are considered equal.
>
>

> ## Dependency installation order algorithm
>
> An implementing tool is responsible for calculating the Feature installation order (or providing an error if no valid installation order can be resolved). The set of Features to be installed is the union of user-defined Features (those directly indicated in the user's `devcontainer.json` and their dependencies (those indicated by the `dependsOn` or `installsAfter` property, taking into account the user dev container's `overrideFeatureInstallOrder` property).  The implmenting tool will perform the following steps:
> ### (1) Build a dependency graph
>
> From the user-defined Features, the orchestrating tool will build a dependency graph.  The graph will be built by traversing the `dependsOn` and `installsAfter` properties of each Feature.  The metadata for each dependency is then fetched and the node added as an edge to to the dependent Feature.  For `dependsOn`  dependencies, the dependency will be fed back into the worklist to be recursively resolved.
>
> An accumulator is maintained with all uniquely discovered and user-provided Features, each with a reference to its dependencies.  If the exact Feature (see **Feature Equality**) has already been added to the accumulator, it will not be added again.  The accumulator will be fed into (B3) after the Feature tree has  been resolved.
>
> The graph may be stored as an adjacency list with two kinds of edges (1) `dependsOn` edges or "hard dependencies" and (2) `installsAfter` edges or "soft dependencies".
>
> ### (2) Assigning round priority
>
> Each node in the graph has an implicit, default `roundPriority` of 0.
>
> To influence installation order globally while still honoring the dependency graph of built in **(1)**, `roundPriority` values may be tweaks for each Feature.  When each round is calculated in **(3)**, only the Features equal to the max `roundPriority` of that set will be committed (the remaining will be uncommitted and reevaulated in subsequent rounds).
>
> The `roundPriority` is set to a non-zero value in the following instances:
>
> - If the `devcontainer.json` contains an `overrideFeatureInstallOrder`.
>
> ### (3) Round-based sorting
>
> Perform a sort on the result of **(1)** in rounds. This sort will rearrange Features, producing a sorted list of Features to install.  The sort will be performed as follows:
>
> Start with all the elements from **(2)** in a `worklist` and an empty list `installationOrder`.  While the `worklist` is not empty, iterate through each element in the `worklist` and check if all its dependencies (if any) are already members of `installationOrder`.  If the check is true, add it to an intermediate  list `round` If not, skip it.  Equality is determined in **Feature Equality**.
>
> Then for each intermediate `round` list, commit to `installationOrder` only those nodes who share the maximum `roundPriority`.  Return all nodes in `round` with a strictly lower `roundPriority` to the `worklist` to be reprocessed in subsequent iterations.  If there are multiple nodes with the same `roundPriority`,  commit them to `installationOrder` with a final sort according to **Round Stable Sort**.
>
> Repeat for as many rounds as necessary until `worklist` is empty.  If there is ever a round where no elements are added to `installationOrder`, the algorithm should terminate and return an error.  This indicates a circular dependency or other fatal error in the dependency graph.  Implementations should attempt to  provide the user with information about the error and possible mitigation strategies.
>
> ### Notes
>
> From an implementation point of view, `installsAfter` nodes may be added as a separate set of directed edges, just as `dependsOn` nodes are added as directed edges (see **(1)**).  Before round-based installation and sorting **(3)**, an orchestrating tool should remove all `installsAfter` directed edges that do not correspond with a Feature in the `worklist` that is set to be installed.  In each round, a Feature can then be installed if all its requirements (both `dependsOn` and `installsAfter` dependencies) have been fulfilled in previous rounds.
>
> An implemention should fail the dependency resolution step if the evaluation of the `installsAfter` property results in an inconsistent state (e.g. a circular dependency).
>

### Option Resolution

A Feature's 'options' - specified as the value of a single Feature key/value pair in the user's `devcontainer.json` - are passed to the Feature as environment variables.

A supporting tool will parse the `options` object provided by the user.  If a value is provided for a Feature, it will be emitted to a file named `devcontainer-features.env` following the format `<OPTION_NAME>=<value>`.

To ensure a option that is valid as an environment variable, the follow substitutions are performed.

```javascript
(str: string) => str
	.replace(/[^\w_]/g, '_')
	.replace(/^[\d_]+/g, '_')
	.toUpperCase();
```

This file is sourced at build-time for the Feature `install.sh` entrypoint script to handle.

Any options defined by a Feature's `devcontainer-feature.json` that are omitted in the user's `devcontainer.json` will be implicitly exported as its default value.
