---
title: "Test prerelease .NET SDKs locally with global.json paths (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/test-prerelease-sdk-locally.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Test prerelease .NET SDKs locally with global.json paths

Starting with .NET 10, the `global.json` file supports an `sdk.paths` property that tells the .NET CLI where to look for SDK installations beyond the default system location. This feature lets you install a prerelease SDK into a project-local folder and use it only when you're working in that project. The process doesn't modify system-wide installations, and it doesn't change your machine-level or user-level `PATH` environment variable. (The install script might temporarily update `PATH` in the current shell session, but that change doesn't persist.)

Whether you want to try out a new language feature, evaluate a preview release for your team, or validate your open-source library against an upcoming SDK version in CI, `sdk.paths` gives you a safe, reversible way to do it. If anything goes wrong, you delete one folder and you're back to exactly where you started.

> **Note:**
> This article uses .NET 11 (the current prerelease at the time of writing) as an example throughout. The `sdk.paths` feature works with any SDK version, prerelease or stable, current or future. Replace `11.0` and `preview` in the install commands with whichever version and quality you need.

## Prerequisites

- .NET 10 or later installed on your system so that the `dotnet` host on your `PATH` is version 10.0 or later. The *host* is the system-wide `dotnet` executable available to your entire machine. When you run any `dotnet` command, this host is what kicks in first: it reads `global.json`, decides which SDK version to use, and hands off to that SDK. In this how-to article, you use that system-wide host to steer the CLI toward a locally installed preview SDK.
- A terminal or command prompt (bash, zsh, PowerShell, or Command Prompt).
- (Optional) A Git repository where you want to scope the prerelease SDK.

> **Important:**
> The `sdk.paths` feature requires a .NET 10 or later **host** (the `dotnet` executable on your `PATH`). If your system-wide host is .NET 8 or .NET 9, it won't recognize the `paths` property and falls back to default resolution behavior. You can still use the local SDK by invoking `./.dotnet/dotnet` (or `.\.dotnet\dotnet` on Windows) directly, which bypasses the system host.

To verify your host version, run `dotnet --info` and look for the **Host** section near the top of the output:

```output
Host:
  Version:      10.0.0
  Architecture: x64
  Commit:       abc123def4
```

The `Version` line must show `10.0` or later. The host version is **not** the same as the SDK version reported by `dotnet --version`. If the host shows an older version (for example, `8.0.x` or `9.0.x`), install .NET 10+ system-wide to update the `dotnet` host on your `PATH`.

## How sdk.paths works

The `sdk.paths` property is a JSON array of folder paths where the .NET host looks for SDK installations. The host searches these paths in the order you list them, and uses the first SDK that satisfies the version constraints in `global.json`.

Two key <example-value>:

- **Paths are relative to the `global.json` file's location**, not to your current working directory. If your `global.json` is at the repo root and you specify `".dotnet"`, the host looks for an SDK in the `.dotnet` folder at the repo root — even if you run `dotnet` commands from a subdirectory.
- **`$host$` is a special token** that represents the system-wide .NET installation directory (the location of the `dotnet` executable on your `PATH`). Include `$host$` in the array when you want the system SDK as a fallback.

> **Note:**
> Both the `$host$` token and the entire `paths` property are only recognized by .NET 10+ hosts. Older hosts ignore them entirely — they don't produce an error, they simply skip the property and fall back to default SDK resolution.

For example, the following configuration tells the host to look for an SDK first in a local `.dotnet` folder, then fall back to the system installation:

```json
{
  "sdk": {
    "paths": [".dotnet", "$host$"]
  }
}
```

If you omit `$host$` from the array, the host only searches the directories you specify. If none of them contain a matching SDK, the command fails — which can be useful when you want to enforce that a specific SDK is present.

You can list more than two entries. For example, you could keep separate folders for a preview and a stable SDK and search them in order: `[".dotnet-preview", ".dotnet-stable", "$host$"]`.

## Step 1: Install a prerelease SDK locally

Use the official dotnet-install scripts to download a prerelease SDK into a project-local directory. These scripts don't require administrator privileges and don't modify your system `PATH` or any system-wide installation.

### macOS / Linux

```bash
curl -sSL https://dot.net/v1/dotnet-install.sh -o dotnet-install.sh
chmod +x dotnet-install.sh
./dotnet-install.sh --channel 11.0 --quality preview --install-dir .dotnet
```

### Windows (PowerShell)

```powershell
Invoke-WebRequest 'https://dot.net/v1/dotnet-install.ps1' -OutFile 'dotnet-install.ps1'
.\dotnet-install.ps1 -Channel 11.0 -Quality preview -InstallDir .dotnet
```

> **Note:**
> If script execution is blocked by your system's execution policy, run the install script with:
> `powershell -ExecutionPolicy Bypass -File .\dotnet-install.ps1 -Channel 11.0 -Quality preview -InstallDir .dotnet`

---

The `--install-dir` (or `-InstallDir`) parameter places the SDK in a `.dotnet` folder inside your current directory. No files are written anywhere else on your machine.

> **Tip:**
> The `--quality` parameter accepts three values: `daily` (latest nightly build), `preview` (latest official preview), and `GA` (latest stable release). You can also use `--version` to install an exact SDK version, such as `--version 11.0.100-preview.2.26159.112`.

## Step 2: Add .dotnet/ to .gitignore

The local SDK installation can be several hundred megabytes. Add it to your `.gitignore` to keep it out of source control:

### macOS / Linux

```bash
echo '.dotnet/' >> .gitignore
```

### Windows (PowerShell)

```powershell
Add-Content -Path .gitignore -Value '.dotnet/'
```

---

If your project already has a `.gitignore`, verify that `.dotnet/` isn't being tracked before committing:

```bash
git status --ignored
```

> **Note:**
> Each developer (and each CI agent) runs the install script independently. The `.dotnet` folder is a local cache, not a shared artifact.

## Step 3: Configure global.json

Create or update a `global.json` file at the root of your repository. At minimum, you only need the `paths` property to get started:

```json
{
  "sdk": {
    "paths": [".dotnet", "$host$"]
  }
}
```

This tells the host to look for an SDK first in the local `.dotnet` folder, then fall back to the system installation. No version number is required — the host picks the latest SDK it finds.

For more control, you can pin a minimum version and configure roll-forward behavior:

```json
{
  "sdk": {
    "version": "11.0.100-preview.2.26159.112",
    "allowPrerelease": true,
    "rollForward": "latestFeature",
    "paths": [".dotnet", "$host$"],
    "errorMessage": "Required .NET SDK not found. Run the install-dotnet script for your platform to install it locally."
  }
}
```

Here's what each property does:

| Property | Purpose |
|---|---|
| `version` | The minimum SDK version required by the project. |
| `allowPrerelease` | Allows the host to select prerelease SDK versions during roll-forward. Set to `true` when testing previews. |
| `rollForward` | Controls how the host selects a newer SDK when the exact version isn't available. `latestFeature` allows rolling forward to a newer feature band within the same major.minor version. |
| `paths` | Directories to search for SDK installations, in order. `".dotnet"` is the local folder; `"$host$"` is the system default. |
| `errorMessage` | A custom message shown when no matching SDK is found. Use it to tell contributors exactly how to set up their environment. |

> **Tip:**
> Listing `".dotnet"` before `"$host$"` means the local prerelease SDK takes priority. Reverse the order if you want the system SDK to win when it satisfies the version constraint.

> **Tip:**
> Changed your mind? See Clean up at the end of this article. No system files are touched.

## Quick start: all-in-one command

Now that you understand what each step does, here's a single command that performs Steps 1 through 3 in one go. Paste the command for your OS into a terminal at your project root.

### macOS / Linux

```bash
curl -sSL https://dot.net/v1/dotnet-install.sh -o /tmp/dotnet-install.sh \
  && bash /tmp/dotnet-install.sh --channel 11.0 --quality preview --install-dir .dotnet \
  && rm /tmp/dotnet-install.sh \
  && echo '.dotnet/' >> .gitignore \
  && cat > global.json << 'EOF'
{
  "sdk": {
    "paths": [".dotnet", "$host$"]
  }
}
EOF
echo "Installed: $(.dotnet/dotnet --version)"
```

### Windows (PowerShell)

```powershell
Invoke-WebRequest 'https://dot.net/v1/dotnet-install.ps1' -OutFile "$env:TEMP\dotnet-install.ps1"
& "$env:TEMP\dotnet-install.ps1" -Channel 11.0 -Quality preview -InstallDir .dotnet
Remove-Item "$env:TEMP\dotnet-install.ps1"
Add-Content -Path .gitignore -Value '.dotnet/'
@'
{
  "sdk": {
    "paths": [".dotnet", "$host$"]
  }
}
'@ | Set-Content -Path global.json
Write-Host "Installed: $(& .\.dotnet\dotnet.exe --version)"
```

---

## Step 4: Create team install scripts (optional)

When multiple people work on the same repository, a convenience script prevents everyone from having to remember the install commands. Create one script for each platform at the root of your repo. These scripts install the SDK, create `global.json`, update `.gitignore`, and optionally install workloads — all in one step.

**install-dotnet.sh** (macOS/Linux):

### macOS / Linux

```bash
#!/usr/bin/env bash
set -e

# -------- Configuration --------
CHANNEL="11.0"
QUALITY="preview"
# Uncomment the workloads your project needs:
# WORKLOADS="maui wasm-tools"
# --------------------------------

SCRIPT_DIR="<example-value>"$(dirname "<example-value>")"<example-value>"
INSTALL_DIR="$SCRIPT_DIR/.dotnet"

echo "Installing .NET $CHANNEL ($QUALITY) SDK to $INSTALL_DIR ..."

curl -sSL https://dot.net/v1/dotnet-install.sh -o "$SCRIPT_DIR/dotnet-install.sh"
chmod +x "$SCRIPT_DIR/dotnet-install.sh"
"$SCRIPT_DIR/dotnet-install.sh" --channel "$CHANNEL" --quality "$QUALITY" --install-dir "$INSTALL_DIR"
rm -f "$SCRIPT_DIR/dotnet-install.sh"

# Auto-detect the installed SDK version
SDK_VERSION="$("$INSTALL_DIR/dotnet" --version)"

# Create global.json with the installed version
cat > "$SCRIPT_DIR/global.json" << EOF
{
  "sdk": {
    "version": "$SDK_VERSION",
    "allowPrerelease": true,
    "rollForward": "latestFeature",
    "paths": [".dotnet", "\$host\$"],
    "errorMessage": "Required .NET SDK not found. Run ./install-dotnet.sh (macOS/Linux) or .\\\\install-dotnet.ps1 (Windows) to install it locally."
  }
}
EOF

# Ensure .dotnet/ is in .gitignore
if ! grep -qxF '.dotnet/' "$SCRIPT_DIR/.gitignore" 2>/dev/null; then
    echo '.dotnet/' >> "$SCRIPT_DIR/.gitignore"
fi

# Install workloads if configured
if [ -n "${WORKLOADS:-}" ]; then
    echo "Installing workloads: $WORKLOADS"
    # shellcheck disable=SC2086
    "$INSTALL_DIR/dotnet" workload install $WORKLOADS
fi

echo ""
echo "Done! SDK $SDK_VERSION installed to $INSTALL_DIR"
echo "Run 'dotnet --version' to verify."
```

### Windows (PowerShell)

```powershell
$ErrorActionPreference = 'Stop'

# -------- Configuration --------
$Channel  = '11.0'
$Quality  = 'preview'
# Uncomment the workloads your project needs:
# $Workloads = @('maui', 'wasm-tools')
# --------------------------------

$scriptDir  = Split-Path -Parent $MyInvocation.MyCommand.Definition
$installDir = Join-Path $scriptDir '.dotnet'

Write-Host "Installing .NET $Channel ($Quality) SDK to $installDir ..."

$installerPath = Join-Path $scriptDir 'dotnet-install.ps1'
Invoke-WebRequest 'https://dot.net/v1/dotnet-install.ps1' -OutFile $installerPath
& $installerPath -Channel $Channel -Quality $Quality -InstallDir $installDir
Remove-Item $installerPath -ErrorAction SilentlyContinue

# Auto-detect the installed SDK version
$sdkVersion = & (Join-Path $installDir 'dotnet.exe') --version

# Create global.json with the installed version
@"
{
  "sdk": {
    "version": "$sdkVersion",
    "allowPrerelease": true,
    "rollForward": "latestFeature",
    "paths": [".dotnet", "`$host`$"],
    "errorMessage": "Required .NET SDK not found. Run ./install-dotnet.sh (macOS/Linux) or .\\install-dotnet.ps1 (Windows) to install it locally."
  }
}
"@ | Set-Content -Path (Join-Path $scriptDir 'global.json') -Encoding UTF8

# Ensure .dotnet/ is in .gitignore
$gitignorePath = Join-Path $scriptDir '.gitignore'
if (!(Test-Path $gitignorePath) -or !(Select-String -Path $gitignorePath -Pattern '^\s*\.dotnet/\s*$' -Quiet)) {
    Add-Content -Path $gitignorePath -Value '.dotnet/'
}

# Install workloads if configured
if ($Workloads) {
    Write-Host "Installing workloads: $($Workloads -join ', ')"
    & (Join-Path $installDir 'dotnet.exe') workload install @Workloads
}

Write-Host ""
Write-Host "Done! SDK $sdkVersion installed to $installDir"
Write-Host "Run 'dotnet --version' to verify."
```

---

Make the shell script executable and add both scripts to your repository:

```bash
chmod +x install-dotnet.sh
git add install-dotnet.sh install-dotnet.ps1
```

With these scripts checked in, the `errorMessage` in `global.json` can direct contributors to run the appropriate one for their platform. A new team member clones the repo, runs the script, and is ready to build — no manual SDK installation steps to follow.

## Step 5: Verify the installation

From the directory that contains your `global.json` (or any subdirectory), run the following commands to confirm the host is resolving the local prerelease SDK:

```dotnetcli
dotnet --version
```

The output should show the prerelease version you installed, for example:

```output
11.0.100-preview.2.26159.112
```

For more detailed information about which SDK was resolved and where it was loaded from, run:

```dotnetcli
dotnet --info
```

Look for the **Base Path** line in the output. It should point to the `.dotnet` folder relative to your project, confirming that the local installation is in use.

> **Note:**
> If the output shows your system SDK version instead of the prerelease, check the following:
>
> - **Host version vs. SDK version:** The *host* version (shown in `dotnet --info` under the **Host** heading) determines whether `paths` is understood. It must be 10.0 or later. The *SDK* version (shown by `dotnet --version`) is the version resolved after the host processes `global.json`.
> - The `global.json` file is in a parent directory of your current working directory.
> - The `.dotnet` folder contains a complete SDK installation (check for a `sdk` subfolder inside it).
