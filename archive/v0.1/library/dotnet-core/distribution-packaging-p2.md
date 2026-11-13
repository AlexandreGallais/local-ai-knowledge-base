---
title: ".NET distribution packaging (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/distribution-packaging.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# .NET distribution packaging (part 2 of 2)

## Recommended packages

.NET versioning is based on the runtime component `[major].[minor]` version numbers.
The SDK version uses the same `[major].[minor]` and has an independent `[patch]` that combines feature and patch semantics for the SDK.
For example: SDK version 7.0.302 is the second patch release of the third feature release of the SDK that supports the 7.0 runtime. For more information about how versioning works, see .NET versioning overview.

Some of the packages include part of the version number in their name. This allows you to install a specific version.
The rest of the version isn't included in the version name. This allows the OS package manager to update the packages (for example, automatically installing security fixes). Supported package managers are Linux specific.

The following lists the recommended packages:

- `dotnet-sdk-[major].[minor]` - Installs the latest SDK for specific runtime
  - **Version:** \<sdk version>
  - **Example:** dotnet-sdk-7.0
  - **Contains:** (3),(4),(18),(21)
  - **Dependencies:** `dotnet-runtime-[major].[minor]`, `aspnetcore-runtime-[major].[minor]`, `dotnet-targeting-pack-[major].[minor]`, `aspnetcore-targeting-pack-[major].[minor]`, `netstandard-targeting-pack-[netstandard_major].[netstandard_minor]`, `dotnet-apphost-pack-[major].[minor]`, `dotnet-templates-[major].[minor]`

- `dotnet-sdk-aot-[major].[minor]` - Installs the SDK components for platform NativeAOT
  - **Version:** \<sdk version>
  - **Example:** dotnet-sdk-aot-9.0
  - **Contains:** (19, 20)
  - **Dependencies:** `dotnet-sdk-[major].[minor]`, _compiler toolchain and developer packages for libraries that the .NET runtime depends on_

- `aspnetcore-runtime-[major].[minor]` - Installs a specific ASP.NET Core runtime
  - **Version:** \<aspnetcore runtime version>
  - **Example:** aspnetcore-runtime-7.0
  - **Contains:** (6)
  - **Dependencies:** `dotnet-runtime-[major].[minor]`

- `dotnet-runtime-deps-[major].[minor]` _(Optional)_ - Installs the dependencies for running self-contained applications
  - **Version:** \<runtime version>
  - **Example:** dotnet-runtime-deps-7.0
  - **Dependencies:** _distribution-specific dependencies_

- `dotnet-runtime-[major].[minor]` - Installs a specific runtime
  - **Version:** \<runtime version>
  - **Example:** dotnet-runtime-7.0
  - **Contains:** (5)
  - **Dependencies:** `dotnet-hostfxr-[major].[minor]`, `dotnet-runtime-deps-[major].[minor]`

- `dotnet-hostfxr-[major].[minor]` - dependency
  - **Version:** \<runtime version>
  - **Example:** dotnet-hostfxr-7.0
  - **Contains:** (2)
  - **Dependencies:** `dotnet-host`

- `dotnet-host` - dependency
  - **Version:** \<runtime version>
  - **Example:** dotnet-host
  - **Contains:** (1),(8),(9),(10),(16),(22),(23)

- `dotnet-apphost-pack-[major].[minor]` - dependency
  - **Version:** \<runtime version>
  - **Contains:** (13)

- `dotnet-targeting-pack-[major].[minor]` - Allows targeting a non-latest runtime
  - **Version:** \<runtime version>
  - **Contains:** (12)

- `aspnetcore-targeting-pack-[major].[minor]` - Allows targeting a non-latest runtime
  - **Version:** \<aspnetcore runtime version>
  - **Contains:** (11)

- `netstandard-targeting-pack-[netstandard_major].[netstandard_minor]` - Allows targeting a netstandard version
  - **Version:** \<sdk version>
  - **Contains:** (15)

- `dotnet-templates-[major].[minor]`
  - **Version:** \<sdk version>
  - **Contains:** (17)

The following two meta packages are optional. They bring value for end users in that they abstract the top-level package (dotnet-sdk), which simplifies the installation of the full set of .NET packages. These meta packages reference a specific .NET SDK version.

- `dotnet[major]` - Installs the specified SDK version
  - **Version:** \<sdk version>
  - **Example:** dotnet7
  - **Dependencies:** `dotnet-sdk-[major].[minor]`

- `dotnet` - Installs a specific SDK version determined by distros to be the primary version—usually the latest available
  - **Version:** \<sdk version>
  - **Example:** dotnet
  - **Dependencies:** `dotnet-sdk-[major].[minor]`

The `dotnet-runtime-deps-[major].[minor]` requires understanding the _distro-specific dependencies_. Because the distro build system may be able to derive this automatically, the package is optional, in which case these dependencies are added directly to the `dotnet-runtime-[major].[minor]` package.

When package content is under a versioned folder, the package name `[major].[minor]` match the versioned folder name. For all packages, except the `netstandard-targeting-pack-[netstandard_major].[netstandard_minor]`, this also matches with the .NET version.

Dependencies between packages should use an _equal or greater than_ version requirement. For example, `dotnet-sdk-7.0:7.0.401` requires `aspnetcore-runtime-7.0 >= 7.0.6`. This makes it possible for the user to upgrade their installation via a root package (for example, `dnf update dotnet-sdk-7.0`).

Most distributions require all artifacts to be built from source. This has some impact on the packages:

- The third-party libraries under `shared/Microsoft.AspNetCore.All` can't be easily built from source. So that folder is omitted from the `aspnetcore-runtime` package.

- The `NuGetFallbackFolder` is populated using binary artifacts from `nuget.org`. It should remain empty.

Multiple `dotnet-sdk` packages may provide the same files for the `NuGetFallbackFolder`. To avoid issues with the package manager, these files should be identical (checksum, modification date, and so on).

### Debug packages

Debug content should be packaged in debug-named packages that follow the .NET package split described previously in this article. For instance, debug content for the `dotnet-sdk-[major].[minor]` package should be included in a package named `dotnet-sdk-dbg-[major].[minor]`. You should install debug content to the same location as the binaries.

Here are a few binary examples:

In the `{dotnet_root}/sdk/<sdk version>` directory, the following two files are expected:

- `dotnet.dll` - installed with `dotnet-sdk-[major].[minor]` package
- `dotnet.pdb` - installed with `dotnet-sdk-dbg-[major].[minor]` package

In the `{dotnet_root}/shared/Microsoft.NETCore.App/<runtime version>` directory, the following two files are expected:

- `System.Text.Json.dll` - installed with `dotnet-runtime-[major].[minor]` package
- `System.Text.Json.pdb` - installed with `dotnet-runtime-dbg-[major].[minor]` package

In the `{dotnet_root/shared/Microsoft.AspNetCore.App/<aspnetcore version>` directory, the following two files are expected:

- `Microsoft.AspNetCore.Routing.dll` - installed with `aspnetcore-runtime-[major].[minor]` packages
- `Microsoft.AspNetCore.Routing.pdb` - installed with `aspnetcore-runtime-dbg-[major].[minor]` packages

Starting with .NET 8.0, all .NET debug content (PDB files), produced by source-build, is available in a tarball named `dotnet-symbols-sdk-<version>-<rid>.tar.gz`. This archive contains PDBs in subdirectories that match the directory structure of the .NET SDK tarball - `dotnet-sdk-<version>-<rid>.tar.gz`.

While all debug content is available in the debug tarball, not all debug content is equally important. End users are mostly interested in the content of the `shared/Microsoft.AspNetCore.App/<aspnetcore version>` and `shared/Microsoft.NETCore.App/<runtime version>` directories.

The SDK content under `sdk/<sdk version>` is useful for debugging .NET SDK toolsets.

The following packages are the recommended debug packages:

- `aspnetcore-runtime-dbg-[major].[minor]` - Installs debug content for a specific ASP.NET Core runtime
  - **Version:** \<aspnetcore runtime version>
  - **Example:** aspnetcore-runtime-dbg-8.0
  - **Contains:** debug content for (6)
  - **Dependencies:** `aspnetcore-runtime-[major].[minor]`

- `dotnet-runtime-dbg-[major].[minor]` - Installs debug content for a specific runtime
  - **Version:** \<runtime version>
  - **Example:** dotnet-runtime-dbg-8.0
  - **Contains:** debug content for (5)
  - **Dependencies:** `dotnet-runtime-[major].[minor]`

The following debug package is optional:

- `dotnet-sdk-dbg-[major].[minor]` - Installs debug content for a specific SDK version
  - **Version:** \<sdk version>
  - **Example:** dotnet-sdk-dbg-8.0
  - **Contains:** debug content for (3),(4),(18)
  - **Dependencies:** `dotnet-sdk-[major].[minor]`

The debug tarball also contains some debug content under `packs`, which represents copies of content under `shared`. In the .NET layout, the `packs` directory is used for *building* .NET applications. There are no debugging scenarios, so you shouldn't package the debug content under `packs` in the debug tarball.

## Building packages

The dotnet/source-build repository provides instructions on how to build a source tarball of the .NET SDK and all its components. The output of the source-build repository matches the layout described in the first section of this article.
