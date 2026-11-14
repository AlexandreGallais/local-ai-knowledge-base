---
title: "dotnet-install scripts (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/dotnet-install-script.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# dotnet-install scripts (part 2 of 2)

## Examples

- Install the latest long-term supported (LTS) version to the default location:

  Windows:

  ```powershell
  ./dotnet-install.ps1 -Channel LTS
  ```

  macOS/Linux:

  ```bash
  ./dotnet-install.sh --channel LTS
  ```

- Install the latest preview version of the 6.0.1xx SDK to the specified location:

  Windows:

  ```powershell
  ./dotnet-install.ps1 -Channel 6.0.1xx -Quality preview -InstallDir C:\cli
  ```

  macOS/Linux:

  ```bash
  ./dotnet-install.sh --channel 6.0.1xx --quality preview --install-dir ~/cli
  ```

- Install the 6.0.0 version of the shared runtime:

  Windows:

  ```powershell
  ./dotnet-install.ps1 -Runtime dotnet -Version 6.0.0
  ```

  macOS/Linux:

  ```bash
  ./dotnet-install.sh --runtime dotnet --version 6.0.0
  ```

- Obtain script and install the 6.0.2 version behind a corporate proxy (Windows only):

  ```powershell
  Invoke-WebRequest 'https://dot.net/v1/dotnet-install.ps1' -Proxy $env:HTTP_PROXY -ProxyUseDefaultCredentials <example-value> 'dotnet-install.ps1';
  ./dotnet-install.ps1 -InstallDir '~/.dotnet' -Version '6.0.2' -Runtime 'dotnet' -ProxyAddress $env:HTTP_PROXY -ProxyUseDefaultCredentials;
  ```

- Obtain script and install .NET CLI one-liner examples:

  Windows:

  ```powershell
  # Run a separate PowerShell process because the script calls exit, so it will end the current PowerShell session.
  &powershell -NoProfile -ExecutionPolicy unrestricted -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; &([scriptblock]::Create((Invoke-WebRequest -UseBasicParsing 'https://dot.net/v1/dotnet-install.ps1'))) <additional install-script args>"
  ```

  macOS/Linux:

  ```bash
  curl -sSL https://dot.net/v1/dotnet-install.sh | bash /dev/stdin <additional install-script args>
  ```

- Install multiple versions while not overwriting `dotnet` binaries from prior installs.

  If you install .NET SDKs or the .NET runtime from an earlier version on top of a newer version, you need to use `--skip-non-versioned-files` so that
  the 'unversioned' `dotnet` files from the earlier version don't overwrite the same files from the newer version.

  ```shell
  :~ $ ./dotnet-install.sh --channel 9.0 --install-dir local-dotnet  # installs the latest 9 SDK to the specified directory
  dotnet-install: Attempting to download using aka.ms link https://builds.dotnet.microsoft.com/dotnet/Sdk/9.0.303/dotnet-sdk-9.0.303-linux-x64.tar.gz
  dotnet-install: Remote file https://builds.dotnet.microsoft.com/dotnet/Sdk/9.0.303/dotnet-sdk-9.0.303-linux-x64.tar.gz size is 218004272 bytes.
  dotnet-install: Extracting archive from https://builds.dotnet.microsoft.com/dotnet/Sdk/9.0.303/dotnet-sdk-9.0.303-linux-x64.tar.gz
  dotnet-install: Downloaded file size is 218004272 bytes.
  dotnet-install: The remote and local file sizes are equal.
  dotnet-install: Installed version is 9.0.303
  dotnet-install: Adding to current process PATH: `$HOME/local-dotnet`. Note: This change will be visible only when sourcing script.
  dotnet-install: Note that the script does not resolve dependencies during installation.
  dotnet-install: To check the list of dependencies, go to https://learn.microsoft.com/dotnet/core/install, select your operating system and check the "Dependencies" section.
  dotnet-install: Installation finished successfully.
  :~ $ ./local-dotnet/dotnet --list-runtimes # see what runtimes we have available
  Microsoft.AspNetCore.App 9.0.7 [$HOME/local-dotnet/shared/Microsoft.AspNetCore.App]
  Microsoft.NETCore.App 9.0.7 [$HOME/local-dotnet/shared/Microsoft.NETCore.App]
  :~ $ ./local-dotnet/dotnet --list-sdks # see what SDKs we have available
  9.0.303 [$HOME/local-dotnet/sdk]
  :~ $ ./dotnet-install.sh --channel 8.0 --install-dir local-dotnet --skip-non-versioned-files # install the 8 SDK to the same place, but keep the 9 dotnet binaries
  dotnet-install: Attempting to download using aka.ms link https://builds.dotnet.microsoft.com/dotnet/Sdk/8.0.412/dotnet-sdk-8.0.412-linux-x64.tar.gz
  dotnet-install: Remote file https://builds.dotnet.microsoft.com/dotnet/Sdk/8.0.412/dotnet-sdk-8.0.412-linux-x64.tar.gz size is 216096947 bytes.
  dotnet-install: Extracting archive from https://builds.dotnet.microsoft.com/dotnet/Sdk/8.0.412/dotnet-sdk-8.0.412-linux-x64.tar.gz
  dotnet-install: Downloaded file size is 216096947 bytes.
  dotnet-install: The remote and local file sizes are equal.
  dotnet-install: Installed version is 8.0.412
  dotnet-install: Adding to current process PATH: `$HOME/local-dotnet`. Note: This change will be visible only when sourcing script.
  dotnet-install: Note that the script does not resolve dependencies during installation.
  dotnet-install: To check the list of dependencies, go to https://learn.microsoft.com/dotnet/core/install, select your operating system and check the "Dependencies" section.
  dotnet-install: Installation finished successfully.
  :~ $ ./local-dotnet/dotnet --list-runtimes # we should have 8 and 9 Runtimes now
  Microsoft.AspNetCore.App 8.0.18 [$HOME/local-dotnet/shared/Microsoft.AspNetCore.App]
  Microsoft.AspNetCore.App 9.0.7 [$HOME/local-dotnet/shared/Microsoft.AspNetCore.App]
  Microsoft.NETCore.App 8.0.18 [$HOME/local-dotnet/shared/Microsoft.NETCore.App]
  Microsoft.NETCore.App 9.0.7 [$HOME/local-dotnet/shared/Microsoft.NETCore.App]
  :~ $ ./local-dotnet/dotnet --list-sdks # we should have 2 SDKs now
  8.0.412 [$HOME/local-dotnet/sdk]
  9.0.303 [$HOME/local-dotnet/sdk]

## Set environment variables

Manually installing .NET doesn't add the environment variables system-wide, and generally only works for the session in which .NET was installed. There are two environment variables you should set for your operating system:

- `DOTNET_ROOT`

  This variable is set to the folder .NET was installed to, such as `$HOME/.dotnet` for Linux and macOS, and `$HOME\.dotnet` in PowerShell for Windows.

- `PATH`

  This variable should include both the `DOTNET_ROOT` folder and the user's _.dotnet/tools_ folder. Generally this is `$HOME/.dotnet/tools` on Linux and macOS, and `$HOME\.dotnet\tools` in PowerShell on Windows.

> [!TIP]
> For Linux and macOS, use the `echo` command to set the variables in your shell profile, such as _.bashrc_:
>
> ```bash
> echo 'export DOTNET_ROOT=$HOME/.dotnet' >> ~/.bashrc
> echo 'export PATH=$PATH:$DOTNET_ROOT:$DOTNET_ROOT/tools' >> ~/.bashrc
> ```

## Uninstall

There is no uninstall script. For information about manually uninstalling .NET, see [How to remove the .NET Runtime and SDK](../install/remove-runtime-sdk-versions.md#scripted-or-manual).

## Signature validation of dotnet-install.sh

Signature validation is an important security measure that helps ensure the authenticity and integrity of a script. By verifying the signature of a script, you can be sure that it has not been tampered with and that it comes from a trusted source.

Here is a step-by-step guide on how to verify the authenticity of the `dotnet-install.sh` script using GPG:

1. **Install GPG**: GPG (GNU Privacy Guard) is a free and open-source tool for encrypting and signing data. You can install it by following the [instructions on the GPG website](https://gnupg.org/download/).
2. **Import our public key**: Download the install-scripts [public key](https://dot.net/v1/dotnet-install.asc) file, and then import it into your GPG keyring by running the command `gpg --import dotnet-install.asc`.
3. **Download the signature file**: The signature file for our bash script is available at `https://dot.net/v1/dotnet-install.sig`. You can download it using a tool like `wget` or `curl`.
4. **Verify the signature**: To verify the signature of our bash script, run the command `gpg --verify dotnet-install.sig dotnet-install.sh`. This will check the signature of the `dotnet-install.sh` file against the signature in the `dotnet-install.sig` file.
5. **Check the result**: If the signature is valid, you will see a message containing `Good signature from "Microsoft DevUXTeamPrague <user@example.com>"`. This means that the script has not been tampered with and can be trusted.

### Preparing environment

Installing GPG and importing our public key is a one time operation.

```bash
sudo apt install gpg
wget https://dot.net/v1/dotnet-install.asc
gpg --import dotnet-install.asc
```

When successful, you should see output like the following:

```
gpg: directory '/home/<user>/.gnupg' created
gpg: keybox '/home/<user>/.gnupg/pubring.kbx' created
gpg: /home/<user>/.gnupg/trustdb.gpg: trustdb created
gpg: key <example-value>: public key "Microsoft DevUXTeamPrague <user@example.com>" imported
gpg: Total number processed: 1
gpg:               imported: 1
```

### Download and verification

With the key <example-value>, you can now download the script and the signature, then verify the script matches the signature:

```bash
wget https://dot.net/v1/dotnet-install.sh
wget https://dot.net/v1/dotnet-install.sig
gpg --verify dotnet-install.sig dotnet-install.sh
```

When successful, you should see output like the following:

```
gpg: Signature made <datetime>
gpg:                using RSA key <example-value>
gpg: Good signature from "Microsoft DevUXTeamPrague <user@example.com>" [unknown]
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key <example-value>: 2B93 0AB1 228D 11D5 D7F6  B6AC B9CF 1A51 FC7D 3ACF
```

The warning means that you don't trust the public key in the keyring, but the script is still verified. The exit code returned by the verification command should be `0`, indicating success.

## See also

- .NET releases
- .NET Runtime and SDK download archive
