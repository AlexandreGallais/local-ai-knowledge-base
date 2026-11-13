---
title: "Advanced configuration (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/host-and-deploy/iis/advanced.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Advanced configuration (part 2 of 2)

## Application Pool Identity

An app pool identity account allows an app to run under a unique account without having to create and manage domains or local accounts. On IIS 8.0 or later, the IIS Admin Worker Process (WAS) creates a virtual account with the name of the new app pool and runs the app pool's worker processes under this account by default. In the IIS Management Console under **Advanced Settings** for the app pool, ensure that the **Identity** is set to use `ApplicationPoolIdentity`:

The IIS management process creates a secure identifier with the name of the app pool in the Windows Security System. Resources can be secured using this identity. However, this identity isn't a real user account and doesn't show up in the Windows User Management Console.

If the IIS worker process requires elevated access to the app, modify the Access Control List (ACL) for the directory containing the app:

1. Open Windows Explorer and navigate to the directory.

1. Right-click on the directory and select **Properties**.

1. Under the **Security** tab, select the **Edit** button, and then the **Add** button.

1. Select the **Locations** button and make sure the system is selected.

1. Enter `IIS AppPool\{APP POOL NAME}` format, where the placeholder `{APP POOL NAME}` is the app pool name, in **Enter the object names to select** area. Select the **Check Names** button. For the *DefaultAppPool* check the names using `IIS AppPool\DefaultAppPool`. When the **Check Names** button is selected, a value of `DefaultAppPool` is indicated in the object names area. It isn't possible to enter the app pool name directly into the object names area. Use the `IIS AppPool\{APP POOL NAME}` format, where the placeholder `{APP POOL NAME}` is the app pool name, when checking for the object name.

1. Select **OK**.

1. Read & execute permissions should be granted by default. Provide additional permissions as needed.

Access can also be granted at a command prompt using the **ICACLS** tool. Using the *DefaultAppPool* as an example, the following command is used to grant read and execute permissions to the `MyWebApp` folder, subfolders, and files:

```console
ICACLS C:\sites\MyWebApp /grant "IIS AppPool\DefaultAppPool:(OI)(CI)RX"
```

For more information, see the icacls article.

## HTTP/2 support

HTTP/2 is supported with ASP.NET Core in the following IIS deployment scenarios:

* In-process
  * Windows Server 2016/Windows 10 or later; IIS 10 or later.
  * TLS 1.2 or later connection.
* Out-of-process
  * Windows Server 2016/Windows 10 or later; IIS 10 or later.
  * Public-facing edge server connections use HTTP/2, but the reverse proxy connection to the Kestrel server uses HTTP/1.1.
  * TLS 1.2 or later connection.

For an in-process deployment when an HTTP/2 connection is established, `HttpRequest.Protocol` reports `HTTP/2`. For an out-of-process deployment when an HTTP/2 connection is established, `HttpRequest.Protocol` reports `HTTP/1.1`.

For more information on the in-process and out-of-process hosting models, see ASP.NET Core Module (ANCM) for IIS.

HTTP/2 is enabled by default. Connections fall back to HTTP/1.1 if an HTTP/2 connection isn't established. For more information on HTTP/2 configuration with IIS deployments, see HTTP/2 on IIS.

## CORS preflight requests

*This section only applies to ASP.NET Core apps that target the .NET Framework.*

For an ASP.NET Core app that targets the .NET Framework, OPTIONS requests aren't passed to the app by default in IIS. To learn how to configure the app's IIS handlers in `web.config` to pass <example-value> requests, see Enable cross-origin requests in ASP.NET Web API 2: How CORS Works.

## Application Initialization Module and Idle Timeout

When hosted in IIS by the ASP.NET Core Module version 2:

* **Application Initialization Module**: App's hosted in-process or out-of-process can be configured to start automatically on a worker process restart or server restart.
* **Idle Timeout**: App's hosted in-process can be configured not to time out during periods of inactivity.

### Application Initialization Module

*Applies to apps hosted in-process and out-of-process.*

IIS Application Initialization is an IIS feature that sends an HTTP request to the app when the app pool starts or is recycled. The request triggers the app to start. By default, IIS issues a request to the app's root URL (`/`) to initialize the app (see the additional resources for more details on configuration).

Confirm that the IIS Application Initialization role feature in enabled:

On Windows 7 or later desktop systems when using IIS locally:

1. Navigate to **Control Panel** > **Programs** > **Programs and Features** > **Turn Windows features on or off** (left side of the screen).
1. Open **Internet Information Services** > **World Wide Web Services** > **Application Development Features**.
1. Select the checkbox for **Application Initialization**.

On Windows Server 2008 R2 or later:

1. Open the **Add Roles and Features Wizard**.
1. In the **Select role services** panel, open the **Application Development** node.
1. Select the checkbox for **Application Initialization**.

Use either of the following approaches to enable the Application Initialization Module for the site:

* Using IIS Manager:

  1. Select **Application Pools** in the **Connections** panel.
  1. Right-click the app's app pool in the list and select **Advanced Settings**.
  1. The default **Start Mode** is `OnDemand`. Set the **Start Mode** to `AlwaysRunning`. Select **OK**.
  1. Open the **Sites** node in the **Connections** panel.
  1. Right-click the app and select **Manage Website** > **Advanced Settings**.
  1. The default **Preload Enabled** setting is `False`. Set **Preload Enabled** to `True`. Select **OK**.

* Using `web.config`, add the `<applicationInitialization>` element with `doAppInitAfterRestart` set to `true` to the `<system.webServer>` elements in the app's `web.config` file:

  ```xml
  <?xml version="1.0" encoding="utf-8"?>
  <configuration>
    <location path="." inheritInChildApplications="false">
      <system.webServer>
        <applicationInitialization doAppInitAfterRestart="true" />
      </system.webServer>
    </location>
  </configuration>
  ```

### Idle Timeout

*Only applies to apps hosted in-process.*

To prevent the app from idling, set the app pool's idle timeout using IIS Manager:

1. Select **Application Pools** in the **Connections** panel.
1. Right-click the app's app pool in the list and select **Advanced Settings**.
1. The default **Idle Time-out (minutes)** is `20` minutes. Set the **Idle Time-out (minutes)** to `0` (zero). Select **OK**.
1. Recycle the worker process.

To prevent apps hosted out-of-process from timing out, use either of the following approaches:

* Ping the app from an external service in order to keep it running.
* If the app only hosts background services, avoid IIS hosting and use a Windows Service to host the ASP.NET Core app.

### Application Initialization Module and Idle Timeout additional resources

* IIS 8.0 Application Initialization
* Application Initialization `<applicationInitialization>`
* Process Model Settings for an Application Pool `<processModel>`

## Module, schema, and configuration file locations

### Module

**IIS (x86/amd64)**:

* `%windir%\System32\inetsrv\aspnetcore.dll`

* `%windir%\SysWOW64\inetsrv\aspnetcore.dll`

* `%ProgramFiles%\IIS\Asp.Net Core Module\V2\aspnetcorev2.dll`

* `%ProgramFiles(x86)%\IIS\Asp.Net Core Module\V2\aspnetcorev2.dll`

**IIS Express (x86/amd64)**:

* `%ProgramFiles%\IIS Express\aspnetcore.dll`

* `%ProgramFiles(x86)%\IIS Express\aspnetcore.dll`

* `%ProgramFiles%\IIS Express\Asp.Net Core Module\V2\aspnetcorev2.dll`

* `%ProgramFiles(x86)%\IIS Express\Asp.Net Core Module\V2\aspnetcorev2.dll`

### Schema

**IIS**:

* `%windir%\System32\inetsrv\config\schema\aspnetcore_schema.xml`

* `%windir%\System32\inetsrv\config\schema\aspnetcore_schema_v2.xml`

**IIS Express**:

* `%ProgramFiles%\IIS Express\config\schema\aspnetcore_schema.xml`

* `%ProgramFiles%\IIS Express\config\schema\aspnetcore_schema_v2.xml`

### Configuration

**IIS**:

* `%windir%\System32\inetsrv\config\applicationHost.config`

**IIS Express**:

* Visual Studio: `{APPLICATION ROOT}\.vs\config\applicationHost.config`

* *iisexpress.exe* CLI: `%USERPROFILE%\Documents\IISExpress\config\applicationhost.config`

The files can be found by searching for `aspnetcore` in the `applicationHost.config` file.

## Install Web Deploy when publishing with Visual Studio

When deploying apps to servers with Web Deploy, install the latest version of Web Deploy on the server. To install Web Deploy, see IIS Downloads: Web Deploy.

## Create the IIS site

1. On the hosting system, create a folder to contain the app's published folders and files. In a following step, the folder's path is provided to IIS as the physical path to the app. For more information on an app's deployment folder and file layout, see ASP.NET Core directory structure.

1. In IIS Manager, open the server's node in the **Connections** panel. Right-click the **Sites** folder. Select **Add Website** from the contextual menu.

1. Provide a **Site name** and set the **Physical path** to the app's deployment folder. Provide the **Binding** configuration and create the website by selecting **OK**:

   > **Warning:**
   > Top-level wildcard bindings (`http://*:80/` and `http://+:80`) should **not** be used. Top-level wildcard bindings can open up your app to security vulnerabilities. This applies to both strong and weak wildcards. Use explicit host names rather than wildcards. Subdomain wildcard binding (for example, `*.mysub.com`) doesn't have this security risk if you control the entire parent domain (as opposed to `*.com`, which is vulnerable). See RFC 9110: HTTP Semantics (Section 7.2: Host and :authority) for more information.

1. Under the server's node, select **Application Pools**.

1. Right-click the site's app pool, and select **Basic <example-value>** from the contextual menu.

1. In the **Edit Application Pool** window, set the **.NET CLR version** to **No Managed Code**:

    ASP.NET Core runs in a separate process and manages the runtime. ASP.NET Core doesn't rely on loading the desktop CLR (.NET CLR). The Core Common Language Runtime (CoreCLR) for .NET is booted to host the app in the worker process. Setting the **.NET CLR version** to **No Managed Code** is optional but recommended.

   * For a 32-bit (x86) self-contained deployment published with a 32-bit SDK that uses the in-process hosting model, enable the Application Pool for 32-bit. In IIS Manager, navigate to **Application Pools** in the **Connections** sidebar. Select the app's Application Pool. In the **Actions** sidebar, select **Advanced Settings**. Set **Enable 32-Bit Applications** to `True`.

   * For a 64-bit (x64) self-contained deployment that uses the in-process hosting model, disable the app pool for 32-bit (x86) processes. In IIS Manager, navigate to **Application Pools** in the **Connections** sidebar. Select the app's Application Pool. In the **Actions** sidebar, select **Advanced Settings**. Set **Enable 32-Bit Applications** to `False`.

1. Confirm the process model identity has the proper permissions.

   If the default identity of the app pool (**Process Model** > **Identity**) is changed from **ApplicationPoolIdentity** to another identity, verify that the new identity has the required permissions to access the app's folder, database, and other required resources. For example, the app pool requires read and write access to folders where the app reads and writes files.

**Windows Authentication configuration (Optional)**
For more information, see Configure Windows authentication.

## Shadow copy

Shadow copying app assemblies to the ASP.NET Core Module (ANCM) for IIS can provide a better end user experience than stopping the app by deploying an app offline file.

When an ASP.NET Core app is running on Windows, the binaries are locked so that they can't be modified or replaced. Shadow copying enables the app assemblies to be updated while the app is running by making a copy of the assemblies.

Shadow copy isn't intended to enable zero-downtime deployment, so it's expected that IIS will still recycle the app, and some requests might get a 503 Service Unavailable response. We recommend using a pattern like blue-green deployments or Azure deployment slots for zero-downtime deployments. Shadow copy helps minimize downtime on deployments, but it can't completely eliminate it.

Customizing the ANCM handler settings in `web.config` enables shadow copying:

```
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <handlers>
      <remove name="aspNetCore"/>
      <add name="aspNetCore" path="*" verb="*" modules="AspNetCoreModuleV2" resourceType="Unspecified"/>
    </handlers>
    <aspNetCore processPath="%LAUNCHER_PATH%" arguments="%LAUNCHER_ARGS%" stdoutLogEnabled="false" stdoutLogFile=".logsstdout">
      <handlerSettings>
        <handlerSetting name="enableShadowCopy" value="true" />
        <!-- Ensure that the IIS ApplicationPool identity has permission to this directory -->
        <handlerSetting name="shadowCopyDirectory" value="../ShadowCopyDirectory/" />
        <handlerSetting name="cleanShadowCopyDirectory" value="true" />
      </handlerSettings>
    </aspNetCore>
  </system.webServer>
</configuration>
```

The following handler settings configure shadow copying:

* `enableShadowCopy`: When set to `true`, enables shadow copying of app assemblies.
* `shadowCopyDirectory`: Specifies the directory where assemblies are shadow copied. Ensure that the IIS `ApplicationPool` identity has read, write, and delete permissions (such as **Modify** permissions) to this directory.
* `cleanShadowCopyDirectory`: Optional. When set to `true`, cleans the shadow copy directory before copying assemblies on startup. The default value is `false`.
