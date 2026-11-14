---
title: "Create a Windows Service installer"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/windows-service-with-installer.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Create a Windows Service installer

When you create a .NET Windows Service (not to be mistaken with a .NET Framework Windows Service), you may want to create an installer for your service. Without an installer, users would have to know how to install and configure your service. An installer bundles your app's executables and exposes a customizable installation user experience. This tutorial is a continuation of the Create a Windows Service tutorial. It shows how to create an installer for your .NET Windows Service.

In this tutorial, you'll learn how to:

>
> - Install the Visual Studio Installer Projects extension.
> - Create a setup project.
> - Update an existing .NET Worker project to support installation.
> - Automate the installation and uninstallation with the Windows Service Control Manager.

## Prerequisites

- You're expected to have completed the Create a Windows Service tutorial, or be prepared to clone the sample repo.
- The .NET 8.0 SDK or later
- A Windows OS
- A .NET integrated development environment (IDE)
  - Feel free to use Visual Studio
- An existing .NET Windows Service

# Wix Toolset

Start by installing the Wix Toolset. The Wix Toolset is a set of tools that build Windows installation packages from XML source code.

```dotnetcli
dotnet tool install --global wix
```

Next, install the HeatWave for VS2022 extension. After installing, restart Visual Studio and you'll see new project templates available.

# Microsoft installer extension

Install the Microsoft Visual Studio Installer Projects extension. After installing, restart Visual Studio and you'll see new project templates available.

---

## Get existing project

This tutorial is based on the app created as part of the Create a Windows Service using BackgroundService tutorial. You can either clone the sample repo or use the app you built in the previous tutorial.

> **Tip:**
> All of the "Workers in .NET" example source code is available in the **Samples Browser** for download. For more information, see Browse code samples: Workers in .NET.

# Wix Toolset

Open the solution in Visual Studio, and select `F5` to ensure that the app builds and runs as expected. Press `Ctrl`+`C` to stop the app.

# Microsoft installer extension

Open the solution in Visual Studio, and select `F5` to ensure that the app builds and runs as expected. Press `Ctrl`+`C` to stop the app.

### Handle installation switches

The Windows Service app needs to handle installation switches. The setup project will call into the Windows Service app with `/Install` and `/Uninstall` switches during installation and uninstallation respectively. When these switches are present, the app will behave differently, in that it will only perform installation or uninstallation using the Windows Service Control Manager executable (_sc.exe_).

For the app to call a separate process, install the CliWrap NuGet package as a convenience. To install the `CliWrap` package, use the following command.

```dotnetcli
dotnet add App.WindowsService.csproj package CliWrap
```

For more information, see dotnet package add.

With `CliWrap` installed, open the _Program.cs_ file of the `App.WindowsService` project. After the `using` directives, but before the `IHost` is created, add the following code:

```csharp
using CliWrap;

const string ServiceName = ".NET Joke Service";

if (args is { Length: 1 })
{
    try
    {
        string executablePath =
            Path.Combine(AppContext.BaseDirectory, "App.WindowsService.exe");

        if (args[0] is "/Install")
        {
            await Cli.Wrap("sc")
                .WithArguments(new[] { "create", ServiceName, $"binPath={executablePath}", "start=auto" })
                .ExecuteAsync();
        }
        else if (args[0] is "/Uninstall")
        {
            await Cli.Wrap("sc")
                .WithArguments(new[] { "stop", ServiceName })
                .ExecuteAsync();

            await Cli.Wrap("sc")
                .WithArguments(new[] { "delete", ServiceName })
                .ExecuteAsync();
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex);
    }

    return;
}
```

The preceding code:

- Declares the service name as a `const string` value.
- Checks the `args` for a single value.
- Gets the executable path from the `System.AppContext.BaseDirectory`.
- When the `"/Install"` switch is present, `sc create ".NET Joke Service" binPath="path/to/App.WindowsService.exe" start=auto` is called.
- When the `"/Uninstall"` switch is present, `sc stop ".NET Joke Service"` and `sc delete ".NET Joke Service"` are called.

When no installation switches are present, the app behaves as it did before, but it now includes installation functionality.

> **Note:**
> Defining custom actions, and manually handling installation switches is considered an anti-pattern. While this documentation demonstrates how to do it, you might want to consider using the third-party Wix Toolset instead.

---

# Wix Toolset

To add a new Wix setup project, right-click on the solution in the **Solution Explorer** and select **Add > New Project**:

Select **MSI Package (Wix v4)** from the available templates, then select **Next**. Provide the desired **Name** and **Location**, then select **Create**.

# Microsoft installer extension

To add a new setup project, right-click on the solution in the **Solution Explorer** and select **Add > New Project**:

Select **Setup Project** from the available templates, then select **Next**. Provide the desired **Name** and **Location**, then select **Create**.

---

# Wix Toolset

To configure the setup project, you first must add a reference to the `App.WindowsService` project. Right-click the setup project in the **Solution Explorer**, and then select **Add > Project Reference**.

The template includes example component and localization files. Delete these, files leaving only the _Package.wxs_ file. Your project should now include a `ProjectReference` element, similar to the following:

```xml
<Project Sdk="WixToolset.Sdk/4.0.0">
  <ItemGroup>
    <ProjectReference Include="..\App.WindowsService.csproj" />
  </ItemGroup>
</Project>
```

After the project reference has been added, configure the _Package.wxs_ file. Open the file in the editor, and then replace the contents with the following:

```xml
<?xml version="1.0" encoding="UTF-8"?>

<!-- Define the variables in "$(var.*) expressions" -->
<?define Name = ".NET Joke Service" ?>
<?define Manufacturer = "Microsoft" ?>
<?define Version = "1.0.0.0" ?>
<?define UpgradeCode = "9ED3FF33-8718-444E-B44B-69A2344B7E98" ?>

<Wix xmlns="http://wixtoolset.org/schemas/v4/wxs">
    <Package Name="$(Name)"
             Manufacturer="$(Manufacturer)"
             Version="$(Version)"
             UpgradeCode="$(var.UpgradeCode)"
             Compressed="true">

        <!-- Allow upgrades and prevent downgrades -->
        <MajorUpgrade DowngradeErrorMessage="A later version of [ProductName] is already installed. Setup will now exit." />

        <!-- Define the directory structure -->
        <StandardDirectory Id="ProgramFiles6432Folder">

            <!-- Create a folder inside program files -->
            <Directory Id="ROOTDIRECTORY" Name="$(var.Manufacturer)">

                <!-- Create a folder within the parent folder given the name -->
                <Directory Id="INSTALLFOLDER" Name="$(Name)" />
            </Directory>
        </StandardDirectory>

        <!-- The files inside this DirectoryRef are linked to
             the App.WindowsService directory via INSTALLFOLDER -->
        <DirectoryRef Id="INSTALLFOLDER">

            <!-- Create a single component which is the App.WindowsService.exe file -->
            <Component Id="ServiceExecutable" Bitness="always64">

                <!-- Copies the App.WindowsService.exe file using the
                     project reference preprocessor variables -->
                <File Id="App.WindowsService.exe"
                      Source="$(var.App.WindowsService.TargetDir)publish\App.WindowsService.exe"
                      KeyPath="true" />

                <!-- Remove all files from the INSTALLFOLDER on uninstall -->
                <RemoveFile Id="ALLFILES" Name="*.*" On="both" />

                <!-- Tell WiX to install the Service -->
                <ServiceInstall Id="ServiceInstaller"
                                Type="ownProcess"
                                Name="App.WindowsService"
                                DisplayName="$(Name)"
                                Description="A joke service that periodically logs nerdy humor."
                                Start="auto"
                                Account="LocalService"
                                ErrorControl="normal" />

                <!-- Tell WiX to start the Service -->
                <ServiceControl Id="StartService"
                                Start="install"
                                Stop="both"
                                Remove="uninstall"
                                Name="App.WindowsService"
                                Wait="true" />
            </Component>
        </DirectoryRef>

        <!-- Tell WiX to install the files -->
        <Feature Id="Service" Title="App.WindowsService Setup" Level="1">
            <ComponentRef Id="ServiceExecutable" />
        </Feature>

    </Package>
</Wix>
```

The `ServiceInstall` element's `Account` attribute specifies the account under which the service runs. The `LocalService` account is a built-in account with reduced privileges that's appropriate for most services. Common values include:

- `LocalService`: A built-in account with reduced privileges and no network credentials.
- `NetworkService`: Similar to LocalService but has network credentials.
- `LocalSystem`: The highest privilege level (use with caution).

When you build the project, the output is an MSI file that can be used to install and uninstall the service.

# Microsoft installer extension

To configure the installer project, select the project in the **Solution Explorer**. Select `F4` to open the project properties pane. You can configure the app's "add" and "remove" icons, author, manufacturer, product name, title, target platform, and so on.

The installer project needs to define two custom actions for installation behavior. Right-click the project in the **Solution Explorer**, and then select **View > Custom Actions**.

From the **Custom Actions** window, select **Install > Add Custom Action**.

Double-click the **Application Folder** (or select **Add Output...** with **Application Folder** selected), and select **Publish Items from App.WindowsService (Active)**.

Select **Ok** to confirm the selection. Right-click the added **Publish Items from App.WindowsService (Active)** node under **Install**, then select **Properties**.

Add `/Install` to the **Arguments**. Follow these same steps for **Uninstall**, adding `/Uninstall` to the **Arguments**.

Once you've done both, you should see the following:

With these updates, the setup project has been configured to delegate its *Install* and *Uninstall* actions to call into the Windows Service app with appropriate arguments.

---

# Wix Toolset

To test the installer, publish the _App.WindowsService_ project. Right-click the project in the **Solution Explorer**, and then select **Publish**. Once published with the profile you created in the previous tutorial, the executable will be in the publish directory. Next, you **Build** the setup project and run the installer.

You need to run the installation as an administrator. To do this, right-click the MSI file, and then select **Run as administrator**.

Once the service is installed, you can open **Services** to see the service running. To uninstall the service, use the **Windows Add or Remove Programs** feature to call the installer.

# Microsoft installer extension

To test the installer, expand **Solution Configurations** in Visual Studio, and select **Release** (assuming **Debug** was selected). Build the solution and then right-click on the setup project and select **Build**. By default, setup projects are not part of the build.

Select **View > Output**, and ensure that the **Show output from** dropdown has **Build** selected. The Microsoft Installer (MSI) file path is displayed. Copy the path and open the installer. Run the installer.

You need to run the installation as an administrator. To do this, right-click the MSI file, and then select **Run as administrator**.

        **1. Installer welcome dialog**

        **2. Installer select folder dialog**

        **3. Installer confirm dialog**

        **4. Installer complete dialog**

Once the service is installed, you can open **Services** to start the service. To uninstall the service, use the **Windows Add or Remove Programs** feature to call the installer.

---

## See also

- Worker Services in .NET
- Create a Queue Service
- Use scoped services within a `BackgroundService`
- Implement the `IHostedService` interface
