---
title: "Use ASP.NET Core SignalR with Blazor"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/tutorials/signalr-blazor.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Use ASP.NET Core SignalR with Blazor

This tutorial provides a basic <example-value> experience for building a real-time app using SignalR with Blazor. This article is useful for developers who are already familiar with SignalR and are seeking to understand how to use SignalR in a Blazor app. For detailed guidance on the SignalR and Blazor frameworks, see the following reference documentation sets and the API documentation:

* Overview of ASP.NET Core SignalR
* ASP.NET Core Blazor
* .NET API browser

Learn how to:

> * Create a Blazor app
> * Add the SignalR client library
> * Add a SignalR hub
> * Add SignalR services and an endpoint for the SignalR hub
> * Add a Razor component code for chat

At the end of this tutorial, you'll have a working chat app.

# Visual Studio

Visual Studio (latest release) with the **ASP.NET and web development** workload

# Visual Studio Code

Install the latest releases of the following:

* Visual Studio Code
* C# Dev Kit
* .NET SDK

For more information, see Debug ASP.NET Core Blazor apps.

The Visual Studio Code instructions use the .NET CLI for ASP.NET Core development functions such as project creation. You can follow these instructions on macOS, Linux, or Windows and with any code editor. Minor changes may be required if you use an integrated development environment (IDE) other than Visual Studio Code.

# .NET CLI

.NET SDK (latest release)

---

## Sample app

Downloading the tutorial's sample chat app isn't required for this tutorial. The sample app is the final, working app produced by following the steps of this tutorial. When you open the samples repository, open the version folder that you plan to target and find the sample named `BlazorSignalRApp`.

View or download sample code (how to download)

## Create a Blazor Web App

Follow the guidance for your choice of tooling:

# Visual Studio

> **Note:**
> Visual Studio 2022 or later and .NET 8 or later SDK are required.

In Visual Studio:

* Select **Create a new project** from the **Start Window** or select **File** > **New** > **Project** from the menu bar.
* In the **Create a new project** dialog, select **Blazor Web App** from the list of project templates. Select the **Next** button.
* In the **Configure your new project** dialog, name the project `BlazorSignalRApp` in the **Project name** field, including matching the capitalization. Using this exact project name is important to ensure that the namespaces match for code that you copy from the tutorial into the app that you're building.
* Confirm that the **Location** for the app is suitable. Leave the **Place solution and project in the same directory** checkbox selected. Select the **Next** button.
* In the **Additional information** dialog, use the following settings:
  * **Framework**: Confirm that the latest framework is selected. If Visual Studio's **Framework** dropdown list doesn't include the latest available .NET framework, update Visual Studio and restart the tutorial.
  * **Authentication type**: **None**
  * **Configure for HTTPS**: Selected
  * **Interactive render mode**: **WebAssembly**
  * **Interactivity location**: **Per page/component**
  * **Include sample pages**: Selected
  * **Do not use top-level statements**: Not selected
  * **Use the .dev.localhost TLD in the application URL**: Not selected
  * Select **Create**.

# Visual Studio Code

This tutorial assumes that you have familiarity with VS Code. If you're new to VS Code, see the VS Code documentation. The videos listed by the Introductory Videos page are designed to give you an overview of VS Code's features.

In VS Code:

* Go to the **Explorer** view and select the **Create .NET Project** button. Alternatively, you can bring up the **Command Palette** using `Ctrl`+`Shift`+`P`, and then type "`.NET`" and find and select the **.NET: New Project** command.

* Select the **Blazor Web App** project template from the list.

* In the **Project Location** dialog, create or select a folder for the project.

* In the **Command Palette**, name the project `BlazorSignalRApp`, including matching the capitalization. Using this exact project name is important to ensure that the namespaces match for code that you copy from the tutorial into the app that you're building.

* Adjust the project's options by selecting **Show all template options**.

  Change **Interactive render mode** to **WebAssembly**.

  After the preceding changes are made, the **Command Palette** shows the following:

  * **Framework**: Confirm that the latest framework is selected. If Visual Studio's **Framework** dropdown list doesn't include the latest available .NET framework, update Visual Studio and restart the tutorial.
  * **Authentication type**: **None**
  * **Configure for HTTPS**: Selected
  * **Interactive render mode**: **WebAssembly**
  * **Interactivity location**: **Per page/component**
  * **Include sample pages**: Selected
  * **Do not use top-level statements**: Not selected
  * **Use the .dev.localhost TLD in the application URL**: Not selected

* Select **Create project** from the **Command Palette**.

# .NET CLI

In a command shell:

* Change to the directory using the `cd` command to where you want to create the project folder (for example, `cd c:/users/Bernie_Kopell/Documents`).
* Use the `dotnet new` command with the `blazor` project template to create a new Blazor Web App project. The `-o|--output` option passed to the command creates the project in a new folder named `BlazorSignalRApp` at the current directory location. Pass the `-int|--interactivity` option with `WebAssembly` to adopt client-side rendering (CSR). Pass the `-ai|--all-interactive` option with `False` to adopt per-page/component interactivity location.

  > **Important:**
  > Name the project `BlazorSignalRApp`, including matching the capitalization, so the namespaces match for code that you copy from the tutorial to the app as you follow the tutorial.

  ```dotnetcli
  dotnet new blazor -o BlazorSignalRApp -int WebAssembly -ai False
  ```

---

The guidance in this article uses a WebAssembly component for the SignalR client because it doesn't make sense to use SignalR to connect to a hub from an Interactive Server component in the same app, as that can lead to server port exhaustion.

# Visual Studio

In **Solution Explorer**, right-click the `BlazorSignalRApp.Client` project and select **Manage NuGet Packages**.

In the **Manage NuGet Packages** dialog, confirm that the **Package source** is set to `nuget.org`.

With **Browse** selected, type `Microsoft.AspNetCore.SignalR.Client` in the search box.

In the search results, select the latest release of the `Microsoft.AspNetCore.SignalR.Client` package. Select **Install**.

If the **Preview Changes** dialog appears, select **OK**.

If the **License Acceptance** dialog appears, select **I Accept** if you agree with the license terms.

# Visual Studio Code

In the **Terminal** (**Terminal** > **New Terminal** from the menu bar opened to the `BlazorSignalRApp.Client` project using `cd BlazorSignalRApp.Client`), execute the following command:

```powershell
dotnet add package Microsoft.AspNetCore.SignalR.Client
```

To add an earlier version of the package, supply the `--version {VERSION}` option, where the `{VERSION}` placeholder is the version of the package to add.

# .NET CLI

In a command shell opened to the `BlazorSignalRApp.Client` project, execute the following command:

```dotnetcli
dotnet add package Microsoft.AspNetCore.SignalR.Client
```

To add an earlier version of the package, supply the `--version {VERSION}` option, where the `{VERSION}` placeholder is the version of the package to add.

---

## Add a SignalR hub

In the server `BlazorSignalRApp` project, create a `Hubs` (plural) folder and add the following `ChatHub` class (`Hubs/ChatHub.cs`):

_Code sample not included: ~/../blazor-samples/8.0/BlazorSignalRApp/BlazorSignalRApp/Hubs/ChatHub.cs._
## Add services and an endpoint for the SignalR hub

Open the `Program` file of the server `BlazorSignalRApp` project.

Add the namespaces for `Microsoft.AspNetCore.ResponseCompression` and the `ChatHub` class to the top of the file:

```csharp
using Microsoft.AspNetCore.ResponseCompression;
using BlazorSignalRApp.Hubs;
```

Add SignalR and response compression middleware services:

```csharp
builder.Services.AddSignalR();

builder.Services.AddResponseCompression(opts =>
{
   opts.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(
       [ "application/octet-stream" ]);
});
```

Use response compression middleware at the top of the processing pipeline's configuration. Place the following line of code immediately after the line that builds the app (`var app = builder.Build();`):

```csharp
app.UseResponseCompression();
```

Add an endpoint for the hub:

```csharp
app.MapHub<ChatHub>("/chathub");
```

## Add Razor component code for chat

Add the following `Pages/Chat.razor` file to the `BlazorSignalRApp.Client` project:

_Code sample not included: ~/../blazor-samples/8.0/BlazorSignalRApp/BlazorSignalRApp.Client/Pages/Chat.razor._
Add an entry to the `NavMenu` component to reach the chat page. In `Components/Layout/NavMenu.razor` immediately after the `` block for the `Weather` component, add the following `` block:

```razor
<div class="nav-item px-3">
    <NavLink class="nav-link" href="chat">
        <span class="bi bi-list-nested-nav-menu" aria-hidden="true"></span> Chat
    </NavLink>
</div>
```

> **Note:**
> Disable response compression middleware in the `Development` environment when using Hot Reload. For more information, see ASP.NET Core Blazor SignalR guidance.

## Run the app

Follow the guidance for your tooling:

# Visual Studio

With the server `BlazorSignalRApp` project selected in **Solution Explorer**, press `F5` to run the app with debugging or `Ctrl`+`F5` to run the app without debugging.

# Visual Studio Code

Press `F5` to run the app with debugging or `Ctrl`+`F5` to run the app without debugging.

# .NET CLI

In a command shell opened to the root folder of the server `BlazorSignalRApp` project, execute the following command:

```dotnetcli
dotnet watch
```

---

Copy the URL from the address bar, open another browser instance or tab, and paste the URL in the address bar.

Choose either browser, enter a name and message, and select the button to send the message. The name and message are displayed on both pages instantly:

Quotes: *Star Trek VI: The Undiscovered Country* &copy;1991 Paramount

## Next steps

In this tutorial, you learned how to:

> * Create a Blazor app
> * Add the SignalR client library
> * Add a SignalR hub
> * Add SignalR services and an endpoint for the SignalR hub
> * Add a Razor component code for chat

For detailed guidance on the SignalR and Blazor frameworks, see the following reference documentation sets:

> Overview of ASP.NET Core SignalR
> ASP.NET Core Blazor

## Related content

* Bearer token <example-value> with Identity Server, WebSockets, and Server-Sent Events
* Secure a SignalR hub in Blazor WebAssembly apps
* SignalR cross-origin negotiation for authentication
* SignalR configuration
* Debug ASP.NET Core Blazor apps
* Blazor samples GitHub repository (`dotnet/blazor-samples`) (how to download)
