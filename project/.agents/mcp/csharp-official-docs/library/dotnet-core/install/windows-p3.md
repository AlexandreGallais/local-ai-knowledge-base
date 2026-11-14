---
title: "Install .NET on Windows (part 3 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/install/windows.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Install .NET on Windows (part 3 of 3)

## Manual install

As an alternative to the installers and package managers, you can download and manually install the SDK and runtime. Manual installation is commonly used as part of continuous integration testing or on systems where you don't have administrative privileges. For most developers and users, it's better to use one of the installer methods.

Download a **binary** release for either the SDK or the runtime from one of the following sites. The .NET SDK includes the corresponding runtime:

- ✔️ .NET 10 downloads
- ✔️ .NET 9 downloads
- ✔️ .NET 8 downloads
- All .NET downloads

After you download the binary release, follow these steps to extract it and configure the environment so the .NET CLI commands are available in the terminal:

01. Choose the **Binaries** download (a _.zip_ file) for your CPU architecture.
01. Extract the downloaded file.
01. Set the `DOTNET_ROOT` environment variable to the extracted folder's location.
01. Ensure `DOTNET_ROOT` is in `PATH`.

For more information about .NET environment variables, see .NET SDK and CLI environment variables.

Different versions of .NET can be extracted to the same folder, where they coexist side-by-side.

### Example

The following commands use PowerShell to extract the .NET binary release to a `dotnet-install` folder in the current working directory and configure the environment variables for the current session. The `$DOTNET_FILE` variable is the file name of the .NET binary release you downloaded.

> **Important:**
> If you run these commands, remember to change the `$DOTNET_FILE` value to the name of the .NET binary you downloaded.

```powershell
$DOTNET_FILE = "dotnet-sdk-9.0.306-win-x64.zip"
$env:DOTNET_ROOT = "<example-value>"

New-Item -ItemType Directory -Force -Path $env:DOTNET_ROOT | Out-Null
Expand-Archive -Path $DOTNET_FILE -DestinationPath $env:DOTNET_ROOT -Force

$env:PATH = "$env:DOTNET_ROOT;$env:DOTNET_ROOT\tools;$env:USERPROFILE\.dotnet\tools;$env:PATH"
```

You can install more than one version of .NET in the same folder.

To make these settings persist across terminal sessions, set them as user or system environment variables. For more information, see Set environment variables system-wide.

To learn how to use the .NET CLI, see .NET CLI overview.

### Set environment variables system-wide

The variables set in the previous example only apply to the current PowerShell session. To make them available in every terminal session, store them as user or system environment variables.

To set the variables for your user account, run the following commands in PowerShell. Replace the path with the folder where you extracted .NET:

```powershell
[Environment]::SetEnvironmentVariable("DOTNET_ROOT", "C:\dotnet", "User")

$newPath = "C:\dotnet;C:\dotnet\tools;$env:USERPROFILE\.dotnet\tools;" + [Environment]::GetEnvironmentVariable("PATH", "User")
[Environment]::SetEnvironmentVariable("PATH", $newPath, "User")
```

To set the variables system-wide for all users, replace `"User"` with `"Machine"` in the previous commands and run PowerShell as an administrator.

Close and reopen your terminal for the changes to take effect.

## Validation

After downloading an installer or binary release, verify it to make sure that the file hasn't been changed or corrupted. You can verify the checksum on your computer and then compare it to what was reported on the download website.

When you download the file from an official download page, the checksum for the file is displayed in a text box. Select the **Copy** button to copy the checksum value to your clipboard.

You can use **PowerShell** or **Command Prompt** to validate the checksum of the file you've downloaded. For example, the following command reports the checksum of the _dotnet-sdk-9.0.306-win-x64.exe_ file:

```cmd
> certutil -hashfile dotnet-sdk-9.0.306-win-x64.exe SHA512
SHA512 hash of dotnet-sdk-9.0.306-win-x64.exe:
f048ddf80c0aa88e713070e66a0009435ad9a5f444adbde6edf2b17f8da562d494a5c37cbabaf63ee3125fe1d2da735a397de9a38dd6ca638b8dc085adc01d4f
CertUtil: -hashfile command completed successfully.
```

```powershell
> (Get-FileHash .\dotnet-sdk-9.0.306-win-x64.exe -Algorithm SHA512).Hash
f048ddf80c0aa88e713070e66a0009435ad9a5f444adbde6edf2b17f8da562d494a5c37cbabaf63ee3125fe1d2da735a397de9a38dd6ca638b8dc085adc01d4f
```

Compare the checksum with the value provided by the download site.

### Use PowerShell and a checksum file to validate

The .NET release notes contain a link to a checksum file you can use to validate your downloaded file. The following steps describe how to download the checksum file and validate a .NET install binary:

01. The release notes page for .NET 9 on GitHub at <https://github.com/dotnet/core/tree/main/release-notes/9.0> contains a section named **Releases**. The table in that section links to the downloads and checksum files for each .NET 9 release.  The following image shows the .NET 8 release table as a reference:

01. Select the link for the version of .NET that you downloaded. The previous section used .NET SDK 9.0.306, which is in the .NET 9.0.10 release.

    > **Tip:**
    > If you're not sure which .NET release contains your checksum file, explore the links until you find it.

01. In the release page, you can see the .NET Runtime and .NET SDK version, and a link to the checksum file.  The following image shows the .NET 8 release table as a reference:

01. Copy the link to the checksum file.

01. Use the following script, but replace the link to download the appropriate checksum file:

    ```powershell
    Invoke-WebRequest https://builds.dotnet.microsoft.com/dotnet/checksums/9.0.10-sha.txt -OutFile 9.0.10-sha.txt
    ```

01. With both the checksum file and the .NET release file downloaded to the same directory, search the checksum file for the checksum of the .NET download:

    When validation passes, you see **True** printed:

    ```powershell
    > (Get-Content .\9.0.10-sha.txt | Select-String "dotnet-sdk-9.0.306-win-x64.exe").Line -like (Get-FileHash .\dotnet-sdk-9.0.306-win-x64.exe -Algorithm SHA512).Hash + "*"
    True
    ```

    If you see **False** printed, the file you downloaded isn't valid and shouldn't be used.

## Troubleshooting

After installing the .NET SDK, you might run into problems trying to run .NET CLI commands. This section collects those common problems and provides solutions.

- No .NET SDK was found
- Building apps is slower than expected
- `hostfxr.dll` / `api-ms-win-crt-runtime-l1-1-0.dll` / `api-ms-win-cor-timezone-l1-1-0.dll` is missing

### No .NET SDK was found

Most likely you installed both the x86 (32-bit) and x64 (64-bit) versions of the .NET SDK. This is causing a conflict because when you run the `dotnet` command, it's resolving to the x86 version when it should resolve to the x64 version. This problem is fixed by adjusting the `%PATH%` variable to resolve the x64 version first.

01. Verify that you have both versions installed by running the `where.exe dotnet` command. If you do, you should see an entry for both the _Program Files\\_ and _Program Files (x86)\\_ folders. If the _Program Files (x86)\\_ folder is first, as demonstrated by the following example, it's incorrect and you should continue on to the next step.

    ```cmd
    > where.exe dotnet
    C:\Program Files (x86)\dotnet\dotnet.exe
    C:\Program Files\dotnet\dotnet.exe
    ```

    > **Tip:**
    > Even though _Program Files_ is used in this example, you may see other copies of _dotnet.exe_ listed. Adjust them so that the appropriate _dotnet.exe_ is resolved first.

    If it's correct and _Program Files\\_ is first, you don't have the problem this section is discussing and you should create a .NET help request issue on GitHub.

01. Press the Windows button and type "Edit the system environment variables" into search. Select **Edit the system environment variables**.

01. The **System Properties** window opens up to the **Advanced Tab**. Select **Environment Variables**.

01. On the **Environment Variables** window, under the **System variables** group, select the *Path** row and then select the **Edit** button.

01. Use the **Move Up** and **Move Down** buttons to move the **C:\\Program Files\\dotnet\\** entry above **C:\\Program Files (x86)\\dotnet\\**.

### Building apps is slower than expected

Ensure that Smart App Control, a Windows feature, is off. Smart App Control isn't recommended to be enabled on machines used for development. Any setting other than "off" might negatively affect SDK performance.

### `hostfxr.dll` / `api-ms-win-crt-runtime-l1-1-0.dll` / `api-ms-win-cor-timezone-l1-1-0.dll` is missing

Install the Microsoft Visual C++ 2015-2019 Redistributable (64-bit or 32-bit).

## Related content

- .NET CLI overview
- Upgrade to a new .NET version.
- How to check if .NET is already installed.
- Tutorial: Create a new console application.
