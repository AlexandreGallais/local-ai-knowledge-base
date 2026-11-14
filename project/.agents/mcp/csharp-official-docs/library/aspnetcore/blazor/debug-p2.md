---
title: "Debug ASP.NET Core Blazor apps (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/debug.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Debug ASP.NET Core Blazor apps (part 2 of 2)

## Debug a Blazor WebAssembly app with Firefox

*The guidance in this section applies debugging Blazor WebAssembly apps in Firefox running on Windows.*

Debugging a Blazor WebAssembly app with Firefox requires configuring the browser for remote debugging and connecting to the browser using the browser developer tools through the .NET WebAssembly debugging proxy.

> **Note:**
> Debugging in Firefox from Visual Studio isn't supported at this time.

To debug a Blazor WebAssembly app in Firefox during development:

1. Configure Firefox:
   * Open `about:config` in a new browser tab. Read and dismiss the warning that appears.
   * Enable `devtools.debugger.remote-enabled` by setting its value to `True`.
   * Enable `devtools.chrome.enabled` by setting its value to `True`.
   * Disable `devtools.debugger.prompt-connection` by setting its value to `False`.
1. Close all Firefox instances.
1. Run the app in a command shell with `dotnet watch` (or `dotnet run`).
1. Relaunch the Firefox browser and navigate to the app.
1. Open `about:debugging` in a new browser tab. **Leave this tab open**.
1. Go back to the tab where the app is running. Start remote debugging by pressing `Shift`+`Alt`+`d`.
1. In the `Debugger` tab, open the app source file you wish to debug under the `file://` node and set a breakpoint. For example, set a breakpoint on the `currentCount++;` line in the `IncrementCount` method of the `Counter` component (`Pages/Counter.razor`).
1. Navigate to the `Counter` component page (`/counter`) in the app's browser tab and select the counter button to hit the breakpoint.
1. Press `F5` to continue execution in the debugging tab.

## Break on unhandled exceptions

The debugger doesn't break on unhandled exceptions because Blazor catches exceptions that are unhandled by developer code.

To break on unhandled exceptions:

* Open the debugger's exception settings (**Debug** > **Windows** > **Exception Settings**) in Visual Studio.
* Set the following **JavaScript Exceptions** settings:
  * **All Exceptions**
  * **Uncaught Exceptions**

## Browser source maps

Browser source maps allow the browser to map compiled files back to their original source files and are commonly used for client-side debugging. However, Blazor doesn't currently map C# directly to JavaScript/Wasm. Instead, Blazor does IL interpretation within the browser, so source maps aren't relevant.

## Firewall configuration

If a firewall blocks communication with the debug proxy, create a firewall exception rule that permits communication between the browser and the `NodeJS` process.

> **Warning:**
> Modification of a firewall configuration must be made with care to avoid creating security vulnerabilities. Carefully apply security guidance, follow best security practices, and respect warnings issued by the firewall's manufacturer.
>
> Permitting open communication with the `NodeJS` process:
>
> * Opens up the Node server to any connection, depending on the firewall's capabilities and configuration.
> * Might be risky depending on your network.
> * **Is only recommended on developer machines.**
>
> If possible, only allow open communication with the `NodeJS` process **on trusted or private networks**.

For Windows Firewall configuration guidance, see Create an Inbound Program or Service Rule. For more information, see Windows Defender Firewall with Advanced Security and related articles in the Windows Firewall documentation set.

## Troubleshoot

If you're running into errors, the following tips may help:

* Remove breakpoints:
  * Google Chrome: In the **Debugger** tab, open the developer tools in your browser. In the console, execute `localStorage.clear()` to remove any breakpoints.
  * Microsoft Edge: In the **Application** tab, open **Local storage**. Right-click the site and select **Clear**.
* Confirm that you've installed and trusted the ASP.NET Core HTTPS development certificate. For more information, see Enforce HTTPS in ASP.NET Core.
* Visual Studio requires the **Enable JavaScript debugging for ASP.NET (Chrome and Edge)** option in **Tools** > **Options** > **Debugging** > **General**. This is the default setting for Visual Studio. If debugging isn't working, confirm that the option is selected.
* If your environment uses an HTTP proxy, make sure that `localhost` is included in the proxy bypass settings. This can be done by setting the `NO_PROXY` environment variable in either:
  * The `launchSettings.json` file for the project.
  * At the user or system environment variables level for it to apply to all apps. When using an environment variable, restart Visual Studio for the change to take effect.
* Ensure that firewalls or proxies don't block communication with the debug proxy (`NodeJS` process). For more information, see the Firewall configuration section.

### Breakpoints in `OnInitialized{Async}` not hit

The Blazor framework's debugging proxy doesn't launch instantly on app startup, so breakpoints in the `OnInitialized{Async}` lifecycle methods might not be hit. We recommend adding a delay at the start of the method body to give the debug proxy some time to launch before the breakpoint is hit. You can include the delay based on an `if` compiler directive to ensure that the delay isn't present for a release build of the app.

`Microsoft.AspNetCore.Components.ComponentBase.OnInitialized*`:

```csharp
protected override void OnInitialized()
{
#if DEBUG
    Thread.Sleep(10000);
#endif

    ...
}
```

`Microsoft.AspNetCore.Components.ComponentBase.OnInitializedAsync*`:

```csharp
protected override async Task OnInitializedAsync()
{
#if DEBUG
    await Task.Delay(10000);
#endif

    ...
}
```

### Visual Studio (Windows) timeout

If Visual Studio throws an exception that the debug adapter failed to launch mentioning that the timeout was reached, you can adjust the timeout with a Registry setting:

```console
VsRegEdit.exe set "<VSInstallFolder>" HKCU JSDebugger\Options\Debugging "BlazorTimeoutInMilliseconds" dword {TIMEOUT}
```

The `{TIMEOUT}` placeholder in the preceding command is in milliseconds. For example, one minute is assigned as `60000`.

## Control Hot Reload

The `WasmEnableHotReload` MSBuild property enables Hot Reload and is set to `true` by default when building in the `Debug` configuration. Hot Reload isn't enabled (set to `false`) when building in any other configuration.

To use a custom configuration name when debugging, for example, `DebugWebAssembly`, set the property to `true` to enable Hot Reload:

```xml
<PropertyGroup>
  <WasmEnableHotReload>true</WasmEnableHotReload>
</PropertyGroup>
```

To disable Hot Reload for the `Debug` configuration, set the value to `false`:

```xml
<PropertyGroup>
  <WasmEnableHotReload>false</WasmEnableHotReload>
</PropertyGroup>
```
