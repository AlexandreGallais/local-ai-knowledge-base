---
title: "Update tracked .NET installations with dotnetup"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/dotnetup/usecases/update-installations.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Update tracked .NET installations with dotnetup

> **Note:**
> `dotnetup` is in public preview. Its features and behavior might change before general availability.

`dotnetup` stores the requested channel separately from the resolved version.
An update resolves each rolling channel again.

These updates don't update the dotnetup executable.
To update the tool itself, use
`dotnetup self update`.

## Choose an update scope

Use one of these commands:

```dotnetcli
# Update all tracked SDK and runtime requirements.
dotnetup update

# Update SDK requirements only.
dotnetup sdk update

# Update SDK and runtime requirements.
dotnetup sdk update --all

# Update runtime requirements only.
dotnetup runtime update
```

Runtime updates include the core .NET and ASP.NET Core runtimes. On Windows,
they also include Windows Desktop runtime requirements.

## Limit the installation root

By default, an update can process requirements for all roots in the selected
manifest. Use `--install-path` to limit the operation:

```dotnetcli
dotnetup update --install-path D:\tools\dotnet
```

## Update repository files

SDK requirements can use `global.json` as their source. To write the newly
resolved SDK version back to each source file, run:

```dotnetcli
dotnetup sdk update --update-global-json
```

Without this option, dotnetup installs the update but does not edit the
repository file.

An update processes stored requirements before garbage collection refreshes
changed `global.json` sources. After you change a repository's `global.json`,
run `dotnetup sdk install` from that repository before you update its stored
requirements. Otherwise, the first update might still process the previous
requirement.

## Understand update behavior

- Exact SDK and runtime versions are skipped - they were explicitly requested, so can never be updated.
- Each installation requirement is processed independently.
- Processing of all installation requirements continues after an individual failure.
- The command reports failure after it processes all remaining installation requirements.
- Successful updates run garbage collection - a cleanup process that removes any installed components that none of your configured installation requirements actually need.
- An installed version remains if another requirement still needs it.

## Review the result

Verify tracked state and on-disk installations:

```dotnetcli
dotnetup list
```

For machine-readable output:

```dotnetcli
dotnetup list --format json
```

## Remove a tracked requirement

To remove an SDK requirement, pass its stored channel or exact version:

```dotnetcli
dotnetup sdk uninstall 10.0.1xx
```

Uninstall removes the requirement, then cleans up unreferenced installations
throughout the selected root.
It warns if another requirement keeps the requested installation or if
cleanup removes additional installations.
Review these warnings before you confirm the operation.
In noninteractive automation, use `--non-interactive` to skip confirmation,
not the warnings.

For runtime requirements, use `dotnetup runtime uninstall`.
For details, see
SDK uninstall and
Runtime uninstall.

## See also

- dotnetup update
- dotnetup sdk update
- dotnetup runtime update
- Update or remove dotnetup
