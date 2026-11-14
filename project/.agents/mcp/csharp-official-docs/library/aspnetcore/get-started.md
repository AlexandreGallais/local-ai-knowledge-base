---
title: "Get started with ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/get-started.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Get started with ASP.NET Core

This tutorial shows how to create, run, and modify an ASP.NET Core Blazor Web App using the .NET CLI. *Blazor* is a .NET frontend web framework that supports both server-side rendering and client interactivity in a single programming model.

You'll learn how to:

> * Create a Blazor Web App.
> * Run the app.
> * Change the app.
> * Shut the app down.

## Prerequisites

Obtain and install the latest .NET SDK at Download .NET.

## Create a Blazor Web App

Open a command shell to a suitable location for the sample app and use the following command to create a Blazor Web App. The `-o|--output` option creates a folder for the project and names the project `BlazorSample`:

```dotnetcli
dotnet new blazor -o BlazorSample
```

## Run the app

Change the directory to the `BlazorSample` folder with the following command:

```dotnetcli
cd BlazorSample
```

The `dotnet watch` command runs the app and opens your default browser to the app's landing page:

```dotnetcli
dotnet watch
```

Using the app's sidebar navigation, visit the Counter page, where you can select the **:::no-loc text="Click me":::** button to increment the counter.

## Change the app

Leave the browser open with the Counter page loaded. By using the `dotnet watch` command to run the app, you can make changes to the app's markup and code without having to rebuild the app to reflect the changes in the browser.

The `Counter` Razor component that renders the Counter web page is located at `Components/Pages/Counter.razor` in the project. *Razor* is a syntax for combining HTML markup with C# code designed for developer productivity.

Open the `Counter.razor` file in a text editor and note a few interesting lines that render content and make the component's counter feature work.

`Components/Pages/Counter.razor`:

```razor
@page "/counter"

<PageTitle>Counter</PageTitle>

<h1>Counter</h1>

<p role="status">Current count: @currentCount</p>

<button class="btn btn-primary" @onclick="IncrementCount">Click me</button>

@code {
    private int currentCount = 0;

    private void IncrementCount()
    {
        currentCount++;
    }
}
```

The file starts with a line that indicates the component's relative path (`/counter`):

```razor
@page "/counter"
```

The title of the page is set by `<PageTitle>` tags:

```razor
<PageTitle>Counter</PageTitle>
```

An H1 heading is displayed:

```razor
<h1>Counter</h1>
```

A paragraph element (``) displays the current count, which is stored in a variable named `currentCount`:

```razor
<p role="status">Current count: @currentCount</p>
```

A button (``) allows the user to increment the counter, which occurs when a button click executes a C# method named `IncrementCount`:

```razor
<button class="btn btn-primary" @onclick="IncrementCount">Click me</button>
```

The `@code` block contains C# code that the component executes:

* The counter variable `currentCount` is established with an initial value of zero.
* The `IncrementCount` method is defined. The code within the method increments the `currentCount` variable by one each time the method is invoked.

```csharp
private int currentCount = 0;

private void IncrementCount()
{
    currentCount++;
}
```

Let's change the increment of the counter in the `IncrementCount` method.

Change the line so that `currentCount` is incremented by a value of ten each time `IncrementCount` is called:

```diff
- currentCount++;
+ currentCount += 10;
```

Save the file.

As soon as you save the file, the running app is updated automatically because you used the `dotnet watch` command. Go back to the app in the browser and select the **:::no-loc text="Click me":::** button in the Counter page. Witness how the counter now increments from its existing value of one to a value of eleven. Each time the button is selected the value increments by ten.

## Shut the app down

Follow these steps:

* Close the browser window.
* To shut down the app, press `Ctrl`+`C` in the command shell.

*Congratulations!* You've successfully completed this tutorial.

## Next steps

In this tutorial, you learned how to:

> * Create a Blazor Web App.
> * Run the app.
> * Change the app.
> * Shut the app down.

To learn more about the fundamentals of ASP.NET Core, see the following:

> ASP.NET Core fundamentals overview

## Additional tutorials

App type | Scenario | Tutorials
-------- | -------- | ---------
Web app | New server and client web development with Blazor | Build a Blazor todo list app and Build a Blazor movie database app (Overview)
Web API | Server-based data processing with Minimal APIs | Tutorial: Create a Minimal API with ASP.NET Core
Remote Procedure Call (RPC) app | Contract-first services using Protocol Buffers | Create a .NET gRPC client and server in ASP.NET Core
Real-time app | Server/client bidirectional communication | Get started with ASP.NET Core SignalR

## Related content

* Introduction to .NET
* Visual Studio
* Visual Studio Code
* .NET Developer Community
* .NET Live TV
