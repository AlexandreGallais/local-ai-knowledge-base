---
title: "Test prerelease .NET SDKs locally with global.json paths (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/test-prerelease-sdk-locally.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Test prerelease .NET SDKs locally with global.json paths (part 2 of 2)

## Step 6: Install workloads on the local SDK (optional)

After you install a local SDK, you can install optional workloads like .NET MAUI or Blazor WebAssembly AOT on it. Workloads installed on the local SDK are completely independent of workloads on your system-wide installation.

### Install a workload

Make sure you run this from the folder that contains your `global.json` (or a subdirectory of it). Use the local `dotnet` binary directly to ensure the workload is installed in the local SDK and not your system installation:

### macOS / Linux

```bash
./.dotnet/dotnet workload install maui
```

### Windows (PowerShell)

```powershell
.\.dotnet\dotnet.exe workload install maui
```

---

> **Important:**
> Always use `./.dotnet/dotnet` (or `.\.dotnet\dotnet` on Windows) for workload commands. The `global.json` `paths` feature routes SDK resolution correctly for commands like `dotnet build` and `dotnet run`, but workload commands store metadata relative to the `dotnet` root of the host that runs them. When you use the system host, workloads end up in the system installation rather than the local one. This is a known gap in how `sdk.paths` interacts with `DOTNET_ROOT`. Using the local binary directly ensures workloads are installed and tracked in the right place.

> **Note:**
> On macOS and Linux, you do **not** need `sudo` for workload install when using a local SDK. The `.dotnet/` folder is user-owned, so all workload files are written with your normal user permissions. This is different from system-wide installs, which might require elevated privileges.

### Common workloads

The following table lists commonly used workloads:

| Workload | Install command |
|---|---|
| .NET MAUI | `./.dotnet/dotnet workload install maui` |
| ASP.NET Core (Blazor WASM AOT) | `./.dotnet/dotnet workload install wasm-tools` |

You can install multiple workloads in a single command:

### macOS / Linux

```bash
./.dotnet/dotnet workload install maui wasm-tools
```

### Windows (PowerShell)

```powershell
.\.dotnet\dotnet.exe workload install maui wasm-tools
```

---

### Verify installed workloads

To see which workloads are installed on the local SDK:

### macOS / Linux

```bash
./.dotnet/dotnet workload list
```

### Windows (PowerShell)

```powershell
.\.dotnet\dotnet.exe workload list
```

---

> **Tip:**
> Workloads installed on the local SDK are stored inside the `.dotnet/` directory. Deleting the directory removes the SDK and all its workloads. Shared download caches (such as `~/.nuget/packages`) might remain but don't affect your system.

## Step 7: Use the prerelease SDK in CI (optional)

The same approach works in continuous integration pipelines. However, CI runners might not have a .NET 10+ host preinstalled, so you need to ensure the host is available before relying on `sdk.paths`.

### GitHub Actions example

The following workflow installs a .NET 10 host using `actions/setup-dotnet`, then installs the .NET 11 preview SDK locally. The `setup-dotnet` step ensures the runner has a .NET 10+ host on `PATH` that can read the `paths` property in `global.json`.

```yaml
name: Build with preview SDK

on: [push, pull_request]

jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]

    steps:
      - uses: actions/checkout@v4

      - name: Install .NET 10 host
        uses: actions/setup-dotnet@v4
        with:
          dotnet-version: '10.0.x'
          dotnet-quality: 'preview'

      - name: Cache local SDK
        uses: actions/cache@v4
        with:
          path: .dotnet
          key: <example-value>{{ matrix.os }}-${{ hashFiles('global.json') }}

      - name: Install .NET 11 preview SDK locally
        # Use bash shell explicitly — Windows runners default to PowerShell,
        # which doesn't support the curl/chmod/shell-script syntax below.
        shell: bash
        run: |
          curl -sSL https://dot.net/v1/dotnet-install.sh -o dotnet-install.sh
          chmod +x dotnet-install.sh
          ./dotnet-install.sh --channel 11.0 --quality preview --install-dir .dotnet

      - name: Build
        run: dotnet build

      - name: Test
        run: dotnet test
```

Because the `global.json` in your repository already has the `paths` configuration, the `dotnet build` and `dotnet test` steps automatically pick up the local SDK. No changes to the CI agent's system-wide installation are needed.

> **Tip:**
> The `actions/cache` step caches the `.dotnet/` directory between runs, keyed on the OS and the hash of `global.json`. The cache refreshes automatically when you update the SDK version in `global.json`.

> **Note:**
> The `strategy.matrix` section runs the build across multiple operating systems. You can extend the matrix to test against multiple SDK versions by adding a `sdk-version` dimension and using it in the install step.

### Fallback: use the local host directly

If you can't install .NET 10+ system-wide on the runner (for example, in a locked-down CI environment), invoke the local SDK's own host directly instead of relying on the system `dotnet`:

```yaml
- name: Install .NET 11 preview SDK locally
  run: |
    curl -sSL https://dot.net/v1/dotnet-install.sh -o dotnet-install.sh
    chmod +x dotnet-install.sh
    ./dotnet-install.sh --channel 11.0 --quality preview --install-dir .dotnet

- name: Build using local host
  run: ./.dotnet/dotnet build

- name: Test using local host
  run: ./.dotnet/dotnet test
```

This approach bypasses the system host entirely and doesn't require `sdk.paths` resolution — the local `dotnet` executable knows where its own SDK is.

## Limitations

The `sdk.paths` feature has a few constraints to be aware of:

- **Requires a .NET 10 or later host on `PATH`.** The `dotnet` executable that reads `global.json` must be version 10.0 or later. If the system host is older, it ignores the `paths` property entirely.
- **Applies to SDK commands only.** The `paths` property affects SDK resolution for commands like `dotnet build`, `dotnet run`, and `dotnet test`. It does not affect app host resolution or framework-dependent execution (for example, `dotnet myapp.dll`).
- **Paths are relative to the global.json location.** If you move your `global.json` file, update the paths accordingly. An absolute path also works but reduces portability across machines.

## Clean up

Removing a local prerelease SDK takes two steps:

1. Delete the local SDK folder:

   ### macOS / Linux

   ```bash
   rm -rf .dotnet/
   ```

   ### Windows (PowerShell)

   ```powershell
   Remove-Item -Recurse -Force .dotnet
   ```

   ---

2. Remove the `paths` property from `global.json`, or delete the file if you no longer need it. Your project reverts to using the system-wide SDK.

Because everything is project-local — including any workloads you installed — there are no registry entries, environment variables, or system files to clean up. Removing the folder and reverting `global.json` is all it takes. Any workloads installed on the local SDK are deleted along with the `.dotnet/` folder.

## Next steps

- global.json overview — Full reference for all `global.json` properties, including `version`, `rollForward`, and `allowPrerelease`.
- dotnet-install scripts reference — Complete list of parameters for the cross-platform install scripts.
- .NET SDK overview — Learn about SDK versioning, roll-forward policies, and how the host resolves SDKs.
- How to select the .NET version to use — Details on how the .NET host resolves SDK and runtime versions.
- What's new in .NET 11 — Overview of features and improvements in .NET 11.
