---
title: "ASP.NET Core Blazor startup (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/fundamentals/startup.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor startup

-->
-->

This article explains Blazor app startup configuration.

For general guidance on ASP.NET Core app configuration for server-side development, see Configuration in ASP.NET Core.

## Startup process and configuration

The Blazor startup process is automatic and asynchronous via the Blazor script (`blazor.*.js`), where the `*` placeholder is:

* `web` for a Blazor Web App.
* `server` for a Blazor Server app.
* `webassembly` for a Blazor WebAssembly app.

For the location of the script, see ASP.NET Core Blazor project structure.

To manually start Blazor:

* Add an `autostart="false"` attribute and value to the Blazor `<script>` tag.
* Place a script that calls `Blazor.start()` after the Blazor `<script>` tag and inside the closing `</body>` tag.
* Place static server-side rendering (static SSR) options in the `ssr` property.
* Place server-side Blazor-SignalR circuit options in the `circuit` property.
* Place client-side WebAssembly options in the `webAssembly` property.

```html
<script src="{BLAZOR SCRIPT}" autostart="false"></script>
<script>
  ...
  Blazor.start({
    ssr: {
      ...
    },
    circuit: {
      ...
    },
    webAssembly: {
      ...
    }
  });
  ...
</script>
```

**In the preceding example, the `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name.** For the location of the script, see ASP.NET Core Blazor project structure.

## JavaScript initializers

JavaScript (JS) initializers execute logic before and after a Blazor app loads. JS initializers are useful in the following scenarios:

* Customizing how a Blazor app loads.
* Initializing libraries before Blazor starts up.
* Configuring Blazor settings.

JS initializers are detected as part of the build process and imported automatically. Use of JS initializers often removes the need to manually trigger script functions from the app when using Razor class libraries (RCLs).

To define a JS initializer, add a JS module to the project named `{NAME}.lib.module.js`, where the `{NAME}` placeholder is the assembly name, library name, or package identifier. Place the file in the project's web root, which is typically the `wwwroot` folder.

For Blazor Web Apps:

* `beforeWebStart(options)`: Called before the Blazor Web App starts. For example, `beforeWebStart` is used to customize the loading process, logging level, and other options. Receives the Blazor Web options (`options`).
* `afterWebStarted(blazor)`: Called after all `beforeWebStart` promises resolve. For example, `afterWebStarted` can be used to register Blazor event listeners and custom event types. The Blazor instance is passed to `afterWebStarted` as an argument (`blazor`).
* `beforeServerStart(options, extensions)`: Called before the first Server runtime is started. Receives SignalR circuit start options (`options`) and any extensions (`extensions`) added during publishing.
* `afterServerStarted(blazor)`: Called after the first Interactive Server runtime is started.
* `beforeWebAssemblyStart(options, extensions)`: Called before the Interactive WebAssembly runtime is started. Receives the Blazor options (`options`) and any extensions (`extensions`) added during publishing. For example, options can specify the use of a custom boot resource loader.
* `afterWebAssemblyStarted(blazor)`: Called after the Interactive WebAssembly runtime is started.

> **Note:**
> Legacy JS initializers (`beforeStart`, `afterStarted`) aren't invoked by default in a Blazor Web App. You can enable the legacy initializers to run with the `enableClassicInitializers` option. However, legacy initializer execution is unpredictable.
>
> ```html
>
> ```

For Blazor Server, Blazor WebAssembly, and Blazor Hybrid apps:

* `beforeStart(options, extensions)`: Called before Blazor starts. For example, `beforeStart` is used to customize the loading process, logging level, and other options specific to the hosting model.
  * Client-side, `beforeStart` receives the Blazor options (`options`) and any extensions (`extensions`) added during publishing. For example, options can specify the use of a custom boot resource loader.
  * Server-side, `beforeStart` receives SignalR circuit start options (`options`).
  * In a `BlazorWebView`, no options are passed.
* `afterStarted(blazor)`: Called after Blazor is ready to receive calls from JS. For example, `afterStarted` is used to initialize libraries by making JS interop calls and registering custom elements. The Blazor instance is passed to `afterStarted` as an argument (`blazor`).

Additional .NET WebAssembly runtime callbacks:

* `onRuntimeConfigLoaded(config)`: Called when the boot configuration is downloaded. Allows the app to modify parameters (config) before the runtime starts (the parameter is `MonoConfig` from `dotnet.d.ts`):

  ```javascript
  export function onRuntimeConfigLoaded(config) {
    // Sample: Enable startup diagnostic logging when the URL contains 
    // parameter debug=1
    const params = new URLSearchParams(location.search);
    if (params.get("debug") == "1") {
      config.diagnosticTracing = true;
    }
  }
  ```

* `onRuntimeReady({ getAssemblyExports, getConfig })`: Called after the .NET WebAssembly runtime has started (the parameter is `RuntimeAPI` from `dotnet.d.ts`):

  ```javascript
  export function onRuntimeReady({ getAssemblyExports, getConfig }) {
    // Sample: After the runtime starts, but before Main method is called, 
    // call [JSExport]ed method.
    const config = getConfig();
    const exports = await getAssemblyExports(config.mainAssemblyName);
    exports.Sample.Greet();
  }
  ```
Both callbacks can return a `Promise`, and the promise is awaited before the startup continues.

For the file name:

* If the JS initializers are consumed as a static asset in the project, use the format `{ASSEMBLY NAME}.lib.module.js`, where the `{ASSEMBLY NAME}` placeholder is the app's assembly name. For example, name the file `BlazorSample.lib.module.js` for a project with an assembly name of `BlazorSample`. Place the file in the app's `wwwroot` folder.
* If the JS initializers are consumed from an RCL, use the format `{LIBRARY NAME/PACKAGE ID}.lib.module.js`, where the `{LIBRARY NAME/PACKAGE ID}` placeholder is the project's library name or package identifier (`<PackageId>` value in the library's project file). For example, name the file `RazorClassLibrary1.lib.module.js` for an RCL with a package identifier of `RazorClassLibrary1`. Place the file in the library's `wwwroot` folder.

For Blazor Web Apps:

The following example demonstrates JS initializers that load custom scripts before and after the Blazor Web App has started by appending them to the `<head>` in `beforeWebStart` and `afterWebStarted`:

```javascript
export function beforeWebStart() {
  var customScript = document.createElement('script');
  customScript.setAttribute('src', 'beforeStartScripts.js');
  document.head.appendChild(customScript);
}

export function afterWebStarted() {
  var customScript = document.createElement('script');
  customScript.setAttribute('src', 'afterStartedScripts.js');
  document.head.appendChild(customScript);
}
```

The preceding `beforeWebStart` example only guarantees that the custom script loads before Blazor starts. It doesn't guarantee that awaited promises in the script complete their execution before Blazor starts.

For Blazor Server, Blazor WebAssembly, and Blazor Hybrid apps:

The following example demonstrates JS initializers that load custom scripts before and after Blazor has started by appending them to the `<head>` in `beforeStart` and `afterStarted`:

```javascript
export function beforeStart(options, extensions) {
  var customScript = document.createElement('script');
  customScript.setAttribute('src', 'beforeStartScripts.js');
  document.head.appendChild(customScript);
}

export function afterStarted(blazor) {
  var customScript = document.createElement('script');
  customScript.setAttribute('src', 'afterStartedScripts.js');
  document.head.appendChild(customScript);
}
```

The preceding `beforeStart` example only guarantees that the custom script loads before Blazor starts. It doesn't guarantee that awaited promises in the script complete their execution before Blazor starts.

> **Note:**
> MVC and Razor Pages apps don't automatically load JS initializers. However, developer code can include a script to fetch the app's manifest and trigger the load of the JS initializers.

For examples of JS initializers, see the following resources:

* Blazor Web App loading indicator (*Global Interactive WebAssembly rendering without prerendering example*)
* ASP.NET Core Blazor JavaScript with static server-side rendering (static SSR)
* Use Razor components in JavaScript apps and SPA frameworks (*`quoteContainer2` example*)
* ASP.NET Core Blazor event handling (*Custom clipboard paste event example*)
* Enable QR code generation for TOTP authenticator apps in an ASP.NET Core Blazor Web App
* Basic Test App in the ASP.NET Core GitHub repository (`BasicTestApp.lib.module.js`)

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

### Ensure libraries are loaded in a specific order

Append custom scripts to the `<head>` in `beforeStart` and `afterStarted` in the order that they should load.

The following example loads `script1.js` before `script2.js` and `script3.js` before `script4.js`:

```javascript
export function beforeStart(options, extensions) {
    var customScript1 = document.createElement('script');
    customScript1.setAttribute('src', 'script1.js');
    document.head.appendChild(customScript1);

    var customScript2 = document.createElement('script');
    customScript2.setAttribute('src', 'script2.js');
    document.head.appendChild(customScript2);
}

export function afterStarted(blazor) {
    var customScript1 = document.createElement('script');
    customScript1.setAttribute('src', 'script3.js');
    document.head.appendChild(customScript1);

    var customScript2 = document.createElement('script');
    customScript2.setAttribute('src', 'script4.js');
    document.head.appendChild(customScript2);
}
```

### Import additional modules

Use top-level `import` statements in the JS initializers file to import additional modules.

`additionalModule.js`:

```javascript
export function logMessage() {
  console.log('logMessage is logging');
}
```

In the JS initializers file (`.lib.module.js`):

```javascript
import { logMessage } from "/additionalModule.js";

export function beforeStart(options, extensions) {
  ...

  logMessage();
}
```

### Import map

Import maps are supported by ASP.NET Core and Blazor.

## Initialize Blazor when the document is ready

The following example starts Blazor when the document is ready:

```html
<script src="{BLAZOR SCRIPT}" autostart="false"></script>
<script>
  document.addEventListener("DOMContentLoaded", function() {
    Blazor.start();
  });
</script>
```

**In the preceding example, the `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name.** For the location of the script, see ASP.NET Core Blazor project structure.

## Chain to the `Promise` that results from a manual start

To perform additional tasks, such as JS interop initialization, use `then` to chain to the `Promise` that results from a manual Blazor app start:

```html
<script src="{BLAZOR SCRIPT}" autostart="false"></script>
<script>
  Blazor.start().then(function () {
    ...
  });
</script>
```

**In the preceding example, the `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name.** For the location of the script, see ASP.NET Core Blazor project structure.

> **Note:**
> For a library to automatically execute additional tasks after Blazor has started, use a JavaScript initializer. Use of a JS initializer doesn't require the consumer of the library to chain JS calls to Blazor's manual start.
