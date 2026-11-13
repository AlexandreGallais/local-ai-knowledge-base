---
title: "Deploy ASP.NET Core apps to Azure App Service (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/host-and-deploy/azure-apps/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Deploy ASP.NET Core apps to Azure App Service (part 2 of 2)

## Publish and deploy the app

For a 64-bit deployment:

* Use a 64-bit .NET Core SDK to build a 64-bit app.
* Set the **Platform** to **64 Bit** in the App Service's **Configuration** > **General settings**. The app must use a Basic or higher service plan to enable the choice of platform bitness.

### Deploy the app framework-dependent

Apps published as framework-dependent are cross-platform and don't include the .NET runtime in the deployment. Azure App Service includes the .NET runtime.

# Visual Studio

1. Right-click the project in **Solution Explorer** and select **Publish**. Alternatively, select **Build** > **Publish {Application Name}** from the Visual Studio toolbar.
1. In the **Publish** dialog, select **Azure** > **Next**.
1. Select the Azure service.
1. Select **Advanced**. The **Publish** dialog opens.
1. Select a Resource group and Hosting plan, or create new ones.
1. Select **Finish**.
1. In the **Publish** page:
   * For **Configuration**, select the pen icon **Edit Configuration**:
      * Confirm that the **Release** configuration is selected.
      * In the **Deployment Mode** drop-down list, select  **Framework-Dependent**.
      * In the **Target Runtime** drop-down list, select the desired runtime. The default is `win-x86`.
    * To remove additional files upon deployment, open **File Publish Options** and select the checkbox to remove additional files at the destination.
   * Select **Save**.
   * Select **Publish**.

# .NET CLI

1. In the project file, don't specify a Runtime Identifier (RID).

1. From a command shell, publish the app in Release configuration with the dotnet publish command. In the following example, the app is published as a framework-dependent app:

   ```console
   dotnet publish --configuration Release
   ```

1. Move the contents of the *bin/Release/{TARGET FRAMEWORK}/publish* directory to the site in App Service. If dragging the *publish* folder contents from your local hard drive or network share directly to App Service in the Kudu console, drag the files to the `D:\home\site\wwwroot` folder in the Kudu console.

---

### Deploy the app self-contained

Publishing an app as self-contained produces a platform-specific executable. The output publishing folder contains all components of the app, including the .NET libraries and target runtime. For more information, see [Publish self-contained]/dotnet/core/deploying/#publish-self-contained).
Use Visual Studio or the .NET CLI for a self-contained deployment (SCD).

# Visual Studio

1. Right-click the project in **Solution Explorer** and select **Publish**. Alternatively, select **Build** > **Publish {Application Name}** from the Visual Studio toolbar.
1. In the **Publish** dialog, select **Azure** > **Next**.
1. Select the Azure service.
1. Select **Advanced**. The **Publish** dialog opens.
1. Select a Resource group and Hosting plan, or create new ones.
1. Select **Finish**.
1. In the **Publish** page:
   * For **Configuration**, select the pen icon **Edit Configuration**:
      * Confirm that the **Release** configuration is selected.
      * In the **Deployment Mode** drop-down list, select **Self-Contained**.
      * In the **Target Runtime** drop-down list, select the desired runtime. The default is `win-x86`.
    * To remove additional files upon deployment, open **File Publish Options** and select the checkbox to remove additional files at the destination.
   * Select **Save**.
   * Select **Publish**.

# .NET CLI

1. In the project file, specify one or more Runtime Identifiers (RIDs). Use `<RuntimeIdentifier>` for a single RID, or use `<RuntimeIdentifiers>` to provide a semicolon-delimited list of multiple RIDs. In the following example, the `win-x86` RID is specified:

   ```xml
   <PropertyGroup>
     <TargetFramework>{TARGET FRAMEWORK}</TargetFramework>
     <RuntimeIdentifier>win-x86</RuntimeIdentifier>
   </PropertyGroup>
   ```

1. From a command shell, publish the app in Release configuration for the host's runtime with the dotnet publish command. In the following example, the app is published for the `win-x86` RID. The RID supplied to the `--runtime` option must be provided in the `<RuntimeIdentifier>` (or `<RuntimeIdentifiers>`) property in the project file.

   ```console
   dotnet publish --configuration Release --runtime win-x86 --self-contained
   ```

1. Move the contents of the *bin/Release/{TARGET FRAMEWORK}/{RUNTIME IDENTIFIER}/publish* directory to the site in App Service. If dragging the *publish* folder contents from your local hard drive or network share directly to App Service in the Kudu console, drag the files to the `D:\home\site\wwwroot` folder in the Kudu console.

---

## Protocol settings (HTTPS)

Secure protocol bindings allow specifying a certificate to use when responding to requests over HTTPS. Binding requires a valid private certificate (*.pfx*) issued for the specific hostname. For more information, see Tutorial: Bind an existing custom SSL certificate to Azure App Service.

## Transform web.config

If you need to transform *web.config* on publish (for example, set environment variables based on the configuration, profile, or environment), see Transform web.config.

## Related content

* App Service overview
* Azure App Service diagnostics overview
* Host ASP.NET Core in a web farm
* Tutorial: Connect to SQL Database from .NET App Service without secrets using a managed identity

Azure App Service on Windows Server uses Internet Information Services (IIS). Kestrel and YARP on the front end provides the load balancer. The following topics pertain to the underlying IIS technology:

* Host ASP.NET Core on Windows with IIS
* ASP.NET Core Module (ANCM) for IIS
* IIS modules with ASP.NET Core
* Windows Server - IT administrator content for current and previous releases
