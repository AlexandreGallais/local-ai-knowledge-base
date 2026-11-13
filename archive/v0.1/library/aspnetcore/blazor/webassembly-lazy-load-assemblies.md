---
title: "Lazy load assemblies in ASP.NET Core Blazor WebAssembly"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/webassembly-lazy-load-assemblies.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Lazy load assemblies in ASP.NET Core Blazor WebAssembly

-->
-->

Blazor WebAssembly app startup performance can be improved by waiting to load developer-created app assemblies until the assemblies are required, which is called *lazy loading*.

This article's initial sections cover the app configuration. For a working demonstration, see the Complete example section at the end of this article.

*This article only applies to Blazor WebAssembly apps.* Assembly lazy loading doesn't benefit server-side apps because server-rendered apps don't download assemblies to the client.

Lazy loading shouldn't be used for core runtime assemblies, which might be trimmed on publish and unavailable on the client when the app loads.

## File extension placeholder (`{FILE EXTENSION}`) for assembly files

Assembly files use the Webcil packaging format for .NET assemblies with a `.wasm` file extension.

Throughout the article, the `{FILE EXTENSION}` placeholder represents "`wasm`".

## Project file configuration

Mark assemblies for lazy loading in the app's project file (`.csproj`) using the `BlazorWebAssemblyLazyLoad` item. Use the assembly name with file extension. The Blazor framework prevents the assembly from loading at app launch.

```xml
<ItemGroup>
  <BlazorWebAssemblyLazyLoad Include="{ASSEMBLY NAME}.{FILE EXTENSION}" />
</ItemGroup>
```

The `{ASSEMBLY NAME}` placeholder is the name of the assembly, and the `{FILE EXTENSION}` placeholder is the file extension. The file extension is required.

Include one `BlazorWebAssemblyLazyLoad` item for each assembly. If an assembly has dependencies, include a `BlazorWebAssemblyLazyLoad` entry for each dependency.

## `Router` component configuration

The Blazor framework automatically registers a singleton service for lazy loading assemblies in client-side Blazor WebAssembly apps, `Microsoft.AspNetCore.Components.WebAssembly.Services.LazyAssemblyLoader`. The `Microsoft.AspNetCore.Components.WebAssembly.Services.LazyAssemblyLoader.LoadAssembliesAsync*` method:

* Uses JS interop to fetch assemblies via a network call.
* Loads assemblies into the runtime executing on WebAssembly in the browser.

Blazor's `Microsoft.AspNetCore.Components.Routing.Router` component designates the assemblies that Blazor searches for routable components and is also responsible for rendering the component for the route where the user navigates. The `Microsoft.AspNetCore.Components.Routing.Router` component's `OnNavigateAsync` method is used in conjunction with lazy loading to load the correct assemblies for endpoints that a user requests.

Logic is implemented inside `Microsoft.AspNetCore.Components.Routing.Router.OnNavigateAsync` to determine the assemblies to load with `Microsoft.AspNetCore.Components.WebAssembly.Services.LazyAssemblyLoader`. Options for how to structure the logic include:

* Conditional checks inside the `Microsoft.AspNetCore.Components.Routing.Router.OnNavigateAsync` method.
* A lookup table that maps routes to assembly names, either injected into the component or implemented within the component's code.

In the following example:

* The namespace for `Microsoft.AspNetCore.Components.WebAssembly.Services` is specified.
* The `Microsoft.AspNetCore.Components.WebAssembly.Services.LazyAssemblyLoader` service is injected (`AssemblyLoader`).
* The `{PATH}` placeholder is the path where the list of assemblies should load. The example uses a conditional check for a single path that loads a single set of assemblies.
* The `{LIST OF ASSEMBLIES}` placeholder is the comma-separated list of assembly file name strings, including their file extensions (for example, `"Assembly1.{FILE EXTENSION}", "Assembly2.{FILE EXTENSION}"`).

`App.razor`:

```razor
@using Microsoft.AspNetCore.Components.Routing
@using Microsoft.AspNetCore.Components.WebAssembly.Services
@using Microsoft.Extensions.Logging
@inject LazyAssemblyLoader AssemblyLoader
@inject ILogger<App> Logger

<Router AppAssembly="typeof(App).Assembly" 
    OnNavigateAsync="OnNavigateAsync">
    ...
</Router>

@code {
    private async Task OnNavigateAsync(NavigationContext args)
    {
        try
           {
               if (args.Path == "{PATH}")
               {
                   var assemblies = await AssemblyLoader.LoadAssembliesAsync(
                       [ {LIST OF ASSEMBLIES} ]);
               }
           }
           catch (Exception ex)
           {
               Logger.LogError("Error: {Message}", ex.Message);
           }
    }
}
```

> **Note:**
> The preceding example doesn't show the contents of the `Microsoft.AspNetCore.Components.Routing.Router` component's Razor markup (`...`). For a demonstration with complete code, see the Complete example section of this article.

## Assemblies that include routable components

When the list of assemblies includes routable components, the assembly list for a given path is passed to the `Microsoft.AspNetCore.Components.Routing.Router` component's `Microsoft.AspNetCore.Components.Routing.Router.AdditionalAssemblies` collection.

In the following example:

* The List\<`System.Reflection.Assembly`> in `lazyLoadedAssemblies` passes the assembly list to `Microsoft.AspNetCore.Components.Routing.Router.AdditionalAssemblies`. The framework searches the assemblies for routes and updates the route collection if new routes are found. To access the `System.Reflection.Assembly` type, the namespace for `System.Reflection` is included at the top of the `App.razor` file.
* The `{PATH}` placeholder is the path where the list of assemblies should load. The example uses a conditional check for a single path that loads a single set of assemblies.
* The `{LIST OF ASSEMBLIES}` placeholder is the comma-separated list of assembly file name strings, including their file extensions (for example, `"Assembly1.{FILE EXTENSION}", "Assembly2.{FILE EXTENSION}"`).

`App.razor`:

```razor
@using System.Reflection
@using Microsoft.AspNetCore.Components.Routing
@using Microsoft.AspNetCore.Components.WebAssembly.Services
@using Microsoft.Extensions.Logging
@inject ILogger<App> Logger
@inject LazyAssemblyLoader AssemblyLoader

<Router AppAssembly="typeof(App).Assembly" 
    AdditionalAssemblies="lazyLoadedAssemblies" 
    OnNavigateAsync="OnNavigateAsync">
    ...
</Router>

@code {
    private List<Assembly> lazyLoadedAssemblies = [];

    private async Task OnNavigateAsync(NavigationContext args)
    {
        try
        {
            if (args.Path == "{PATH}")
            {
                var assemblies = await AssemblyLoader.LoadAssembliesAsync(
                    [ {LIST OF ASSEMBLIES} ]);
                lazyLoadedAssemblies.AddRange(assemblies);
            }
        }
        catch (Exception ex)
        {
            Logger.LogError("Error: {Message}", ex.Message);
        }
    }
}
```

> **Note:**
> The preceding example doesn't show the contents of the `Microsoft.AspNetCore.Components.Routing.Router` component's Razor markup (`...`). For a demonstration with complete code, see the Complete example section of this article.

For more information, see ASP.NET Core Blazor routing.

## User interaction with `<Navigating>` content

While loading assemblies, which can take several seconds, the `Microsoft.AspNetCore.Components.Routing.Router` component can indicate to the user that a page transition is occurring with the router's `Microsoft.AspNetCore.Components.Routing.Router.Navigating` property.

For more information, see ASP.NET Core Blazor routing.

## Handle cancellations in `OnNavigateAsync`

The `Microsoft.AspNetCore.Components.Routing.NavigationContext` object passed to the `Microsoft.AspNetCore.Components.Routing.Router.OnNavigateAsync` callback contains a `Microsoft.AspNetCore.Components.Routing.NavigationContext.CancellationToken` that's set when a new navigation event occurs. The `Microsoft.AspNetCore.Components.Routing.Router.OnNavigateAsync` callback must throw when the cancellation token is set to avoid continuing to run the `Microsoft.AspNetCore.Components.Routing.Router.OnNavigateAsync` callback on an outdated navigation.

For more information, see ASP.NET Core Blazor routing.

## Complete example

The demonstration in this section:

* Creates a robot controls assembly (`GrantImaharaRobotControls.{FILE EXTENSION}`) as a Razor class library (RCL) that includes a `Robot` component (`Robot.razor` with a route template of `/robot`).
* Lazily loads the RCL's assembly to render its `Robot` component when the `/robot` URL is requested by the user.

Create a standalone Blazor WebAssembly app to demonstrate lazy loading of a Razor class library's assembly. Name the project `LazyLoadTest`.

Add an ASP.NET Core class library project to the solution:

* Visual Studio: Right-click the solution file in **Solution Explorer** and select **Add** > **New project**. From the dialog of new project types, select **Razor Class Library**. Name the project `GrantImaharaRobotControls`. Do **not** select the **Support pages and views** checkbox.
* Visual Studio Code/.NET CLI: Execute `dotnet new razorclasslib -o GrantImaharaRobotControls` from a command prompt. The `-o|--output` option creates a folder and names the project `GrantImaharaRobotControls`.

Create a `HandGesture` class in the RCL with a `ThumbUp` method that hypothetically makes a robot perform a thumbs-up gesture. The method accepts an argument for the axis, `Left` or `Right`, as an `enum`. The method returns `true` on success.

`HandGesture.cs`:

```csharp
using Microsoft.Extensions.Logging;

namespace GrantImaharaRobotControls;

public static class HandGesture
{
    public static bool ThumbUp(Axis axis, ILogger logger)
    {
        logger.LogInformation("Thumb up gesture. Axis: {Axis}", axis);

        // Code to make robot perform gesture

        return true;
    }
}

public enum Axis { Left, Right }
```

Add the following component to the root of the RCL project. The component permits the user to submit a left or right hand thumb-up gesture request.

`Robot.razor`:

```razor
@page "/robot"
@using Microsoft.AspNetCore.Components.Forms
@using Microsoft.Extensions.Logging
@inject ILogger<Robot> Logger

<h1>Robot</h1>

<EditForm FormName="RobotForm" Model="robotModel" OnValidSubmit="HandleValidSubmit">
    <InputRadioGroup @bind-Value="robotModel.AxisSelection">
        @foreach (var entry in Enum.GetValues<Axis>())
        {
            <InputRadio Value="entry" />
            <text>&nbsp;</text>@entry<br>
        }
    </InputRadioGroup>

    <button type="submit">Submit</button>
</EditForm>

<p>
    @message
</p>

@code {
    private RobotModel robotModel = new() { AxisSelection = Axis.Left };
    private string? message;

    private void HandleValidSubmit()
    {
        Logger.LogInformation("HandleValidSubmit called");

        var result = HandGesture.ThumbUp(robotModel.AxisSelection, Logger);

        message = $"ThumbUp returned {result} at {DateTime.Now}.";
    }

    public class RobotModel
    {
        public Axis AxisSelection { get; set; }
    }
}
```

In the `LazyLoadTest` project, create a project reference for the `GrantImaharaRobotControls` RCL:

* Visual Studio: Right-click the `LazyLoadTest` project and select **Add** > **Project Reference** to add a project reference for the `GrantImaharaRobotControls` RCL.
* Visual Studio Code/.NET CLI: Execute `dotnet add reference {PATH}` in a command shell from the project's folder. The `{PATH}` placeholder is the path to the RCL project.

Specify the RCL's assembly for lazy loading in the `LazyLoadTest` app's project file (`.csproj`):

```xml
<ItemGroup>
    <BlazorWebAssemblyLazyLoad Include="GrantImaharaRobotControls.{FILE EXTENSION}" />
</ItemGroup>
```

The following `Microsoft.AspNetCore.Components.Routing.Router` component demonstrates loading the `GrantImaharaRobotControls.{FILE EXTENSION}` assembly when the user navigates to `/robot`. Replace the app's default `App` component with the following `App` component.

During page transitions, a styled message is displayed to the user with the `<Navigating>` element. For more information, see the User interaction with `<Navigating>` content section.

The assembly is assigned to `Microsoft.AspNetCore.Components.Routing.Router.AdditionalAssemblies`, which results in the router searching the assembly for routable components, where it finds the `Robot` component. The `Robot` component's route is added to the app's route collection. For more information, see the ASP.NET Core Blazor routing article and the Assemblies that include routable components section of this article.

`App.razor`:

```razor
@using System.Reflection
@using Microsoft.AspNetCore.Components.Routing
@using Microsoft.AspNetCore.Components.WebAssembly.Services
@using Microsoft.Extensions.Logging
@inject ILogger<App> Logger
@inject LazyAssemblyLoader AssemblyLoader

<Router AppAssembly="typeof(App).Assembly"
        AdditionalAssemblies="lazyLoadedAssemblies" 
        OnNavigateAsync="OnNavigateAsync">
    <Navigating>
        <div style="padding:20px;background-color:blue;color:white">
            <p>Loading the requested page&hellip;</p>
        </div>
    </Navigating>
    <Found Context="routeData">
        <RouteView RouteData="routeData" DefaultLayout="typeof(MainLayout)" />
    </Found>
    <NotFound>
        <LayoutView Layout="typeof(MainLayout)">
            <p>Sorry, there's nothing at this address.</p>
        </LayoutView>
    </NotFound>
</Router>

@code {
    private List<Assembly> lazyLoadedAssemblies = [];
    private bool grantImaharaRobotControlsAssemblyLoaded;

    private async Task OnNavigateAsync(NavigationContext args)
    {
        try
        {
            if ((args.Path == "robot") && !grantImaharaRobotControlsAssemblyLoaded)
            {
                var assemblies = await AssemblyLoader.LoadAssembliesAsync(
                    [ "GrantImaharaRobotControls.{FILE EXTENSION}" ]);
                lazyLoadedAssemblies.AddRange(assemblies);
                grantImaharaRobotControlsAssemblyLoaded = true;
            }
        }
        catch (Exception ex)
        {
            Logger.LogError("Error: {Message}", ex.Message);
        }
    }
}
```

Build and run the app.

When the `Robot` component from the RCL is requested at `/robot`, the `GrantImaharaRobotControls.{FILE EXTENSION}` assembly is loaded and the `Robot` component is rendered. You can inspect the assembly loading in the **Network** tab of the browser's developer tools.

## Troubleshoot

* If unexpected rendering occurs, such as rendering a component from a previous navigation, confirm that the code throws if the cancellation token is set.
* If assemblies configured for lazy loading unexpectedly load at app start, check that the assembly is marked for lazy loading in the project file.

## Related content

* Handle asynchronous navigation events with `OnNavigateAsync`
* ASP.NET Core Blazor performance best practices
