---
title: "Advanced configuration (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/host-and-deploy/iis/advanced.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Advanced configuration of the ASP.NET Core Module and IIS

-->
-->

This article covers advanced configuration options and scenarios for the ASP.NET Core Module and IIS.

## Modify the stack size

*Only applies when using the in-process hosting model.*

Configure the managed stack size using the `stackSize` setting in hexadecimal bytes in the `web.config` file. The default size is 0x100000 bytes (1 MB). The following example changes the stack size to 2 MB (2,097,152 bytes) in hexadecimal 0x200000:

```xml
<aspNetCore processPath="dotnet"
    arguments=".\MyApp.dll"
    stdoutLogEnabled="false"
    stdoutLogFile="\\?\%home%\LogFiles\stdout"
    hostingModel="inprocess">
  <handlerSettings>
    <handlerSetting name="stackSize" value="200000" />
  </handlerSettings>
</aspNetCore>
```

## Disallow rotation on config

The `disallowRotationOnConfigChange` setting is intended for blue/green scenarios where a change to global config shouldn't cause all sites to recycle. When this flag is true, only changes relevant to the site itself will cause it to recycle. For example, a site recycles if its *web.config* changes or something changes that's relevant to the site's path from IIS's perspective. But a general change to *applicationHost.config* wouldn't cause an app to recycle. The following example sets this setting to true:

```xml
<aspNetCore processPath="dotnet"
    arguments=".\MyApp.dll"
    stdoutLogEnabled="false"
    stdoutLogFile="\\?\%home%\LogFiles\stdout"
    hostingModel="inprocess">
  <handlerSettings>
    <handlerSetting name="disallowRotationOnConfigChange" value="true" />
  </handlerSettings>
</aspNetCore>
```

This setting corresponds to the `Microsoft.Web.Administration.ApplicationPoolRecycling.DisallowRotationOnConfigChange` API.

## Reduce 503 likelihood during app recycle

By default, there's a one-second delay between when IIS is notified of a recycle or shutdown and when ANCM tells the managed server to initiate shutdown. The delay is configurable via the `ANCM_shutdownDelay` environment variable or by setting the `shutdownDelay` handler setting. Both values are in milliseconds. The delay is primarily to reduce the likelihood of a race where:

* IIS hasn't started queuing requests to go to the new app.
* ANCM starts rejecting new requests that come into the old app.

This setting doesn't mean incoming requests will be delayed by this amount. The setting indicates that the old app instance will start shutting down after the timeout occurs. Slower machines or machines with heavier CPU usage might need to adjust this value to reduce 503 likelihood.

The following example sets the delay to 5 seconds:

```xml
<aspNetCore processPath="dotnet"
    arguments=".\MyApp.dll"
    stdoutLogEnabled="false"
    stdoutLogFile="\\?\%home%\LogFiles\stdout"
    hostingModel="inprocess">
  <handlerSettings>
    <handlerSetting name="shutdownDelay" value="5000" />
  </handlerSettings>
</aspNetCore>
```

## Proxy configuration uses HTTP protocol and a pairing token

*Only applies to out-of-process hosting.*

The proxy created between the ASP.NET Core Module and Kestrel uses the HTTP protocol. There's no risk of eavesdropping the traffic between the module and Kestrel from a location off of the server.

A pairing token is used to guarantee that the requests received by Kestrel were proxied by IIS and didn't come from some other source. The pairing token is created and set into an environment variable (`ASPNETCORE_TOKEN`) by the module. The pairing token is also set into a header (`MS-ASPNETCORE-TOKEN`) on every proxied request. IIS middleware checks each request it receives to confirm that the pairing token header value matches the environment variable value. If the token values are mismatched, the request is logged and rejected. The pairing token environment variable and the traffic between the module and Kestrel aren't accessible from a location off of the server. Without knowing the pairing token value, a cyberattacker can't submit requests that bypass the check in the IIS middleware.

## ASP.NET Core Module with an IIS Shared Configuration

The ASP.NET Core Module installer runs with the privileges of the `TrustedInstaller` account. Because the local system account doesn't have modify permission for the share path used by the IIS Shared Configuration, the installer throws an access denied error when attempting to configure the module settings in the `applicationHost.config` file on the share.

When using an IIS Shared Configuration on the same machine as the IIS installation, run the ASP.NET Core Hosting Bundle installer with the `OPT_NO_SHARED_CONFIG_CHECK` parameter set to `1`:

```console
dotnet-hosting-{VERSION}.exe OPT_NO_SHARED_CONFIG_CHECK=1
```

When the path to the shared configuration isn't on the same machine as the IIS installation, follow these steps:

1. Disable the IIS Shared Configuration.
1. Run the installer.
1. Export the updated `applicationHost.config` file to the file share.
1. Re-enable the IIS Shared Configuration.

## Data protection

The ASP.NET Core Data Protection stack is used by several ASP.NET Core middlewares, including middleware used in authentication. Even if Data Protection APIs aren't called by user code, data protection should be configured with a deployment script or in user code to create a persistent cryptographic key store. If data protection isn't configured, the keys are held in memory and discarded when the app restarts.

If the Data Protection key ring is stored in memory when the app restarts:

* All cookie-based authentication tokens are invalidated.
* Users are required to sign in again on their next request.
* Any data protected with the key ring can no longer be decrypted. This might include CSRF tokens and ASP.NET Core MVC TempData cookies.

To configure data protection under IIS to persist the key ring, use **one** of the following approaches:

* **Create Data Protection Registry keys**

  ASP.NET Core Data Protection keys used by ASP.NET Core apps are stored in the registry external to the apps. To persist the keys for a given app, create Registry keys for the app pool.

  For standalone, non-webfarm IIS installations, the Data Protection Provision-AutoGenKeys.ps1 PowerShell script can be used for each app pool used with an ASP.NET Core app. This script creates a Registry key in the HKLM registry that's accessible only to the worker process account of the app's app pool. Keys are encrypted at rest using DPAPI with a machine-wide key.

  In web farm scenarios, an app can be configured to use a UNC path to store its Data Protection key ring. By default, the keys aren't encrypted. Ensure that the file permissions for the network share are limited to the Windows account that the app runs under. An X509 certificate can be used to protect keys at rest. Consider a mechanism to allow users to upload certificates. Place certificates into the user's trusted certificate store and ensure they're available on all machines where the user's app runs. For more information, see Configure ASP.NET Core Data Protection.

* **Configure the IIS Application Pool to load the user profile**

  This setting is in the **Process Model** section under the **Advanced Settings** for the app pool. Set **Load User Profile** to `True`. When set to `True`, keys are stored in the user profile directory and protected using DPAPI with a key specific to the user account. Keys are persisted to the `%LOCALAPPDATA%/ASP.NET/DataProtection-Keys` folder.

  The app pool's `setProfileEnvironment` attribute must also be enabled. The default value of `setProfileEnvironment` is `true`. In some scenarios (for example, Windows OS), `setProfileEnvironment` is set to `false`. If keys aren't stored in the user profile directory as expected:

  1. Navigate to the `%windir%/system32/inetsrv/config` folder.
  1. Open the `applicationHost.config` file.
  1. Locate the `<system.applicationHost><applicationPools><applicationPoolDefaults><processModel>` element.
  1. Confirm that the `setProfileEnvironment` attribute isn't present, which defaults the value to `true`, or explicitly set the attribute's value to `true`.

* **Use the file system as a key ring store**

  Adjust the app code to use the file system as a key ring store. Use an X509 certificate to protect the key ring and ensure the certificate is a trusted certificate. If the certificate is self-signed, place the certificate in the Trusted Root store.

  When using IIS in a web farm:

  * Use a file share that all machines can access.
  * Deploy an X509 certificate to each machine. Configure Data Protection in code.

* **Set a machine-wide policy for Data Protection**

  The Data Protection system has limited support for setting a default machine-wide policy for all apps that consume the Data Protection APIs. For more information, see ASP.NET Core Data Protection Overview.

## IIS configuration

### Windows Server operating systems

Enable the **Web Server (IIS)** server role and establish role services.

1. Use the **Add Roles and Features** wizard from the **Manage** menu or the link in **Server Manager**. On the **Server Roles** step, check the box for **Web Server (IIS)**.

1. After the **Features** step, the **Role services** step loads for Web Server (IIS). Select the IIS role services desired or accept the default role services provided.

   **Windows Authentication (Optional)**
   To enable Windows Authentication, expand the following nodes: **Web Server** > **Security**. Select the **Windows Authentication** feature. For more information, see Windows Authentication `<windowsAuthentication>` and Configure Windows authentication.

   **WebSockets (Optional)**
   WebSockets is supported with ASP.NET Core 1.1 or later. To enable WebSockets, expand the following nodes: **Web Server** > **Application Development**. Select the **WebSocket Protocol** feature. For more information, see WebSockets.

1. Proceed through the **Confirmation** step to install the web server role and services. A server/IIS restart isn't required after installing the **Web Server (IIS)** role.

### Windows desktop operating systems

Enable the **IIS Management Console** and **World Wide Web Services**.

1. Navigate to **Control Panel** > **Programs** > **Programs and Features** > **Turn Windows features on or off** (left side of the screen).

1. Open the **Internet Information Services** node. Open the **Web Management Tools** node.

1. Check the box for **IIS Management Console**.

1. Check the box for **World Wide Web Services**.

1. Accept the default features for **World Wide Web Services** or customize the IIS features.

   **Windows Authentication (Optional)**
   To enable Windows Authentication, expand the following nodes: **World Wide Web Services** > **Security**. Select the **Windows Authentication** feature. For more information, see Windows Authentication `<windowsAuthentication>` and Configure Windows authentication.

   **WebSockets (Optional)**
   WebSockets is supported with ASP.NET Core 1.1 or later. To enable WebSockets, expand the following nodes: **World Wide Web Services** > **Application Development Features**. Select the **WebSocket Protocol** feature. For more information, see WebSockets.

1. If the IIS installation requires a restart, restart the system.

## Virtual Directories

IIS Virtual Directories aren't supported with ASP.NET Core apps. An app can be hosted as a sub-application.

## Sub-applications

An ASP.NET Core app can be hosted as an IIS sub-application (sub-app). The sub-app's path becomes part of the root app's URL.

Static asset links within the sub-app should use tilde-slash (`~/`) notation in MVC and Razor Pages. Tilde-slash notation triggers a Tag Helper to prepend the sub-app's pathbase to the rendered relative link. For a sub-app at `/subapp_path`, an image linked with `src="~/image.png"` is rendered as `src="/subapp_path/image.png"`. The root app's static file middleware doesn't process the static file request. The sub-app's static file middleware processes the request.

> **Note:**
> Razor components (`.razor`) shouldn't use tilde-slash notation. For more information, see ASP.NET Core Blazor app base path.

If a static asset's `src` attribute is set to an absolute path (for example, `src="/image.png"`), the link is rendered without the sub-app's pathbase. The root app's static file middleware attempts to serve the asset from the root app's web root, which results in a *404 - Not Found* response unless the static asset is available from the root app.

To host an ASP.NET Core app as a sub-app under another ASP.NET Core app:

1. Establish an app pool for the sub-app. Set the **.NET CLR Version** to **No Managed Code** because the Core Common Language Runtime (CoreCLR) for .NET is booted to host the app in the worker process, not the desktop CLR (.NET CLR).

1. Add the root site in IIS Manager with the sub-app in a folder under the root site.

1. Right-click the sub-app folder in IIS Manager and select **Convert to Application**.

1. In the **Add Application** dialog, use the **Select** button for the **Application Pool** to assign the app pool that you created for the sub-app. Select **OK**.

The assignment of a separate app pool to the sub-app is a requirement when using the in-process hosting model.

For more information on the in-process hosting model and configuring the ASP.NET Core Module, see ASP.NET Core Module (ANCM) for IIS.

## Application Pools

The hosting model determines app pool isolation:

* **In-process hosting**: Apps are required to run in separate app pools.
* **Out-of-process hosting**: We recommend isolating the apps from each other by running each app in its own app pool.

The IIS **Add Website** dialog defaults to a single app pool per app. When a **Site name** is provided, the text is automatically transferred to the **Application pool** textbox. A new app pool is created using the site name when the site is added.
