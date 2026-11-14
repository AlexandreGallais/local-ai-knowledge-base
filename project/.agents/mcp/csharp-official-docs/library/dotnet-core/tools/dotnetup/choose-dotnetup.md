---
title: "When to use dotnetup"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/dotnetup/choose-dotnetup.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# When to use dotnetup

> **Note:**
> `dotnetup` is in public preview. Its features and behavior might change before general availability.

You can install .NET in several ways. `dotnetup` is one option. It installs and
manages .NET SDKs and runtimes for your user account. This article helps you
decide whether `dotnetup` fits your scenario, or whether another installation
method is a better choice.

## Scenarios that fit dotnetup

Consider `dotnetup` when you want to:

- Install .NET without administrator rights and without a system package
  manager.
- Keep several SDK and runtime versions side by side, and update them together.
- Follow a channel, such as `lts`, `10.0`, or `10.0.1xx`, so that updates move
  to the newest matching version.
- Install the SDK that a repository's `global.json` file requires.
- Try preview or daily builds without changing the machine-wide installation.
- Use the same commands on Windows, macOS, and Linux.

## Scenarios that fit other methods

Another installation method might be a better choice when you:

- **Need a supported, generally available installation method.** `dotnetup` is
  in public preview. For production machines, use the .NET installers, a
  package manager, or Visual Studio.
- **Develop with Visual Studio.** Visual Studio installs and services its own
  machine-wide copy of .NET. For more information, see
  Install .NET on Windows.
- **Need machine-wide .NET installations.** Choose an installation method
  based on your operating system and servicing needs. On Windows, use
  Microsoft Update or update the package with WinGet. On Linux, use your
  distribution's package manager. On macOS, run the .NET installer again to
  install a newer version. For more information, see
  Install .NET on Windows,
  Install .NET on macOS, or
  Install .NET on Linux.
- **Manage and remove .NET installations across an organization's Windows
  devices.** Use the .NET Install Manager.

## Compare installation methods

| Capability | dotnetup | .NET installers and package managers | dotnet-install scripts |
| --- | --- | --- | --- |
| Installation scope | User | Machine | Any folder that you choose |
| Requires administrator rights | No, except to change the system `PATH` on Windows in `everywhere` mode | Yes | No |
| Tracks installations | Yes | Yes, through the OS | No |
| Updates installations | Yes, with `dotnetup update` | Depends on the OS and installation method | No. Run the script again. |
| Removes unused installations | Yes | Yes, through the OS | No |
| Reads `global.json` | Yes | No | Yes, with the `--jsonfile` option |
| Installs daily builds | Yes | No | Yes |
| Support status | Public preview | Generally available | Generally available |

## Use dotnetup with other installations

`dotnetup` doesn't remove or change machine-wide installations. How the two
installations interact depends on the access mode that you choose:

- In `none` and `shell` modes, processes that don't use the dotnetup
  environment configuration continue to use the machine-wide installation.
- In `everywhere` mode on Windows, the dotnetup-managed installation takes
  precedence over the machine-wide installation. Migrate the machine-wide SDKs
  and runtimes that you need into the dotnetup-managed installation.

For more information, see
dotnetup environment configuration.

## Next steps

> Get started with dotnetup
