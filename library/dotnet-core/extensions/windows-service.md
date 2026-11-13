---
title: "Create Windows Service using BackgroundService (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/extensions/windows-service.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Create Windows Service using `BackgroundService`

.NET Framework developers are probably familiar with Windows Service apps. Before .NET Core and .NET 5+, developers who relied on .NET Framework could create Windows Services to perform background tasks or execute long-running processes. This functionality is still available and you can create Worker Services that run as a Windows Service.

In this tutorial, you'll learn how to:

>
> - Publish a .NET worker app as a single file executable.
> - Create a Windows Service.
> - Create the `BackgroundService` app as a Windows Service.
> - Start and stop the Windows Service.
> - View event logs.
> - Delete the Windows Service.

> **Tip:**
> All of the "Workers in .NET" example source code is available in the **Samples Browser** for download. For more information, see Browse code samples: Workers in .NET.

> **Important:**
> Installing the .NET SDK also installs the `Microsoft.NET.Sdk.Worker` and the worker template. In other words, after installing the .NET SDK, you could create a new worker by using the dotnet new worker command. If you're using Visual Studio, the template is hidden until the optional ASP.NET and web development workload is installed.

## Prerequisites

- The .NET 8.0 SDK or later
- A Windows OS
- A .NET integrated development environment (IDE)
  - Feel free to use Visual Studio

## Create a new project

To create a new Worker Service project with Visual Studio, you'd select **File** > **New** > **Project...**. From the **Create a new project** dialog search for "Worker Service", and select Worker Service template. If you'd rather use the .NET CLI, open your favorite terminal in a working directory. Run the `dotnet new` command, and replace the `<Project.Name>` with your desired project name.

```dotnetcli
dotnet new worker --name <Project.Name>
```

For more information on the .NET CLI new worker service project command, see dotnet new worker.

> **Tip:**
> If you're using Visual Studio Code, you can run .NET CLI commands from the integrated terminal. For more information, see Visual Studio Code: Integrated Terminal.

## Install NuGet package

To interop with native Windows Services from .NET `Microsoft.Extensions.Hosting.IHostedService` implementations, you'll need to install the `Microsoft.Extensions.Hosting.WindowsServices` NuGet package.

To install this from Visual Studio, use the **Manage NuGet Packages** dialog. Search for "Microsoft.Extensions.Hosting.WindowsServices", and install it. If you'd rather use the .NET CLI, run the following command. (If you're using an SDK version of .NET 9 or earlier, use the `dotnet add package` form instead.)

```dotnetcli
dotnet package add Microsoft.Extensions.Hosting.WindowsServices
```

For more information, see dotnet package add.

After successfully adding the packages, your project file should now contain the following package references:

```xml
<ItemGroup>
  <PackageReference Include="Microsoft.Extensions.Hosting" Version="10.0.13" />
  <PackageReference Include="Microsoft.Extensions.Hosting.WindowsServices" Version="10.0.12" />
</ItemGroup>
```
## Update project file

This worker project makes use of C#'s nullable reference types. To enable them for the entire project, update the project file accordingly:

```xml
<Project Sdk="Microsoft.NET.Sdk.Worker">

  <PropertyGroup>
    <TargetFramework>net10.0-windows</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>true</ImplicitUsings>
    <RootNamespace>App.WindowsService</RootNamespace>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.Extensions.Hosting" Version="10.0.13" />
    <PackageReference Include="Microsoft.Extensions.Hosting.WindowsServices" Version="10.0.12" />
  </ItemGroup>
</Project>
```
The preceding project file changes add the `<Nullable>enable<Nullable>` node. For more information, see Setting the nullable context.

## Create the service

Add a new class to the project named *JokeService.cs*, and replace its contents with the following C# code:

```csharp
﻿namespace App.WindowsService;

public sealed class JokeService
{
    public string GetJoke()
    {
        Joke joke = _jokes.ElementAt(
            Random.Shared.Next(_jokes.Count));

        return $"{joke.Setup}{Environment.NewLine}{joke.Punchline}";
    }

    // Programming jokes borrowed from:
    // https://github.com/eklavyadev/karljoke/blob/main/source/jokes.json
    private readonly HashSet<Joke> _jokes = new()
    {
        new Joke("What's the best thing about a Boolean?", "Even if you're wrong, you're only off by a bit."),
        new Joke("What's the object-oriented way to become wealthy?", "Inheritance"),
        new Joke("Why did the programmer quit their job?", "Because they didn't get arrays."),
        new Joke("Why do programmers always mix up Halloween and Christmas?", "Because Oct 31 == Dec 25"),
        new Joke("How many programmers does it take to change a lightbulb?", "None that's a hardware problem"),
        new Joke("If you put a million monkeys at a million keyboards, one of them will eventually write a Java program", "the rest of them will write Perl"),
        new Joke("['hip', 'hip']", "(hip hip array)"),
        new Joke("To understand what recursion is...", "You must first understand what recursion is"),
        new Joke("There are 10 types of people in this world...", "Those who understand binary and those who don't"),
        new Joke("Which song would an exception sing?", "Can't catch me - Avicii"),
        new Joke("Why do Java programmers wear glasses?", "Because they don't C#"),
        new Joke("How do you check if a webpage is HTML5?", "Try it out on Internet Explorer"),
        new Joke("A user interface is like a joke.", "If you have to explain it then it is not that good."),
        new Joke("I was gonna tell you a joke about UDP...", "...but you might not get it."),
        new Joke("The punchline often arrives before the set-up.", "Do you know the problem with UDP jokes?"),
        new Joke("Why do C# and Java developers keep breaking their keyboards?", "Because they use a strongly typed language."),
        new Joke("Knock-knock.", "A race condition. Who is there?"),
        new Joke("What's the best part about TCP jokes?", "I get to keep telling them until you get them."),
        new Joke("A programmer puts two glasses on their bedside table before going to sleep.", "A full one, in case they gets thirsty, and an empty one, in case they don’t."),
        new Joke("There are 10 kinds of people in this world.", "Those who understand binary, those who don't, and those who weren't expecting a base 3 joke."),
        new Joke("What did the router say to the doctor?", "It hurts when IP."),
        new Joke("An IPv6 packet is walking out of the house.", "He goes nowhere."),
        new Joke("3 SQL statements walk into a NoSQL bar. Soon, they walk out", "They couldn't find a table.")
    };
}

readonly record struct Joke(string Setup, string Punchline);
```
The preceding joke service source code exposes a single piece of functionality, the `GetJoke` method. This is a `string` returning method that represents a random programming joke. The class-scoped `_jokes` field is used to store the list of jokes. A random joke is selected from the list and returned.

## Rewrite the `Worker` class

Replace the existing `Worker` from the template with the following C# code, and rename the file to *WindowsBackgroundService.cs*:

```csharp
﻿namespace App.WindowsService;

public sealed class WindowsBackgroundService(
    JokeService jokeService,
    ILogger<WindowsBackgroundService> logger) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken <example-value>)
    {
        try
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                string joke = jokeService.GetJoke();
                logger.LogWarning("{Joke}", joke);

                await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
            }
        }
        catch (OperationCanceledException)
        {
            // When the stopping token is canceled, for example, a call made from services.msc,
            // we shouldn't exit with a non-zero exit code. In other words, this is expected...
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "{Message}", ex.Message);

            // Terminates this process and returns an exit code to the operating system.
            // This is required to avoid the 'BackgroundServiceExceptionBehavior', which
            // performs one of two scenarios:
            // 1. When set to "Ignore": will do nothing at all, errors cause zombie services.
            // 2. When set to "StopHost": will cleanly stop the host, and log errors.
            //
            // In order for the Windows Service Management system to leverage configured
            // recovery options, we need to terminate the process with a non-zero exit code.
            Environment.Exit(1);
        }
    }
}
```
In the preceding code, the `JokeService` is injected along with an `ILogger`. Both are made available to the class as fields. In the `ExecuteAsync` method, the joke service requests a joke and writes it to the logger. In this case, the logger is implemented by the Windows Event Log - `Microsoft.Extensions.Logging.EventLog.EventLogLoggerProvider`. Logs are written to, and available for viewing in the **Event Viewer**.

> **Note:**
> By default, the *Event Log* severity is `Microsoft.Extensions.Logging.LogLevel.Warning`. This can be configured, but for demonstration purposes the `WindowsBackgroundService` logs with the `Microsoft.Extensions.Logging.LoggerExtensions.LogWarning*` extension method. To specifically target the `EventLog` level, add an entry in the **appsettings.{Environment}.json**, or provide an `Microsoft.Extensions.Logging.EventLog.EventLogSettings.Filter` value.
>
> ```json
> {
>   "Logging": {
>     "LogLevel": {
>       "Default": "Warning"
>     },
>     "EventLog": {
>       "SourceName": "The Joke Service",
>       "LogName": "Application",
>       "LogLevel": {
>         "Microsoft": "Information",
>         "Microsoft.Hosting.Lifetime": "Information"
>       }
>     }
>   }
> }
> ```
>
> For more information on configuring log levels, see Logging providers in .NET: Configure Windows EventLog.

## Rewrite the `Program` class

Replace the template *Program.cs* file contents with the following C# code:

```csharp
﻿using App.WindowsService;
using Microsoft.Extensions.Logging.Configuration;
using Microsoft.Extensions.Logging.EventLog;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);
builder.Services.AddWindowsService(options =>
{
    options.ServiceName = ".NET Joke Service";
});

LoggerProviderOptions.RegisterProviderOptions<
    EventLogSettings, EventLogLoggerProvider>(builder.Services);

builder.Services.AddSingleton<JokeService>();
builder.Services.AddHostedService<WindowsBackgroundService>();

IHost host = builder.Build();
host.Run();
```
The `AddWindowsService` extension method configures the app to work as a Windows Service. The service name is set to `".NET Joke Service"`. The hosted service is registered for dependency injection.

For more information on registering services, see Dependency injection in .NET.

## Publish the app

To create the .NET Worker Service app as a Windows Service, it's recommended that you publish the app as a single file executable. It's less error-prone to have a self-contained executable, as there aren't any dependent files lying around the file system. But you may choose a different publishing modality, which is perfectly acceptable, so long as you create an **.exe* file that can be targeted by the Windows Service Control Manager.

> **Important:**
> An alternative publishing approach is to build the *\*.dll* (instead of an *\*.exe*), and when you install the published app using the Windows Service Control Manager you delegate to the .NET CLI and pass the DLL. For more information, see .NET CLI: dotnet command.
>
> ```powershell
> sc.exe create ".NET Joke Service" binpath= "C:\Path\To\dotnet.exe C:\Path\To\App.WindowsService.dll"
> ```

```xml
<Project Sdk="Microsoft.NET.Sdk.Worker">

  <PropertyGroup>
    <TargetFramework>net10.0-windows</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>true</ImplicitUsings>
    <RootNamespace>App.WindowsService</RootNamespace>
    <OutputType>exe</OutputType>
    <PublishSingleFile Condition="'$(Configuration)' == 'Release'">true</PublishSingleFile>
    <RuntimeIdentifier>win-x64</RuntimeIdentifier>
    <PlatformTarget>x64</PlatformTarget>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.Extensions.Hosting" Version="10.0.13" />
    <PackageReference Include="Microsoft.Extensions.Hosting.WindowsServices" Version="10.0.12" />
  </ItemGroup>
</Project>
```
The preceding highlighted lines of the project file define the following behaviors:

- `<OutputType>exe</OutputType>`: Creates a console application.
- `<PublishSingleFile Condition="'$(Configuration)' == 'Release'">true</PublishSingleFile>`: Enables single-file publishing.
- `<RuntimeIdentifier>win-x64</RuntimeIdentifier>`: Specifies the RID of `win-x64`.
- `<PlatformTarget>x64</PlatformTarget>`: Specify the target platform CPU of 64-bit.

To publish the app from Visual Studio, you can create a publish profile that is persisted. The publish profile is XML-based and has the *.pubxml* file extension. Visual Studio uses this profile to publish the app implicitly, whereas if you're using the .NET CLI, you must explicitly specify the publish profile for it to be used.

Right-click on the project in the **Solution Explorer**, and select **Publish**. Then, select **Add a publish profile** to create a profile. From the **Publish** dialog, select **Folder** as your **Target**.

Leave the default **Location**, and then select **Finish**. Once the profile is created, select **Show all settings**, and verify your **Profile settings**.

Ensure that the following settings are specified:

- **Deployment mode**: Self-contained
- **Produce single file**: checked
- **Enable ReadyToRun compilation**: checked
- **Trim unused assemblies (in preview)**: unchecked

Finally, select **Publish**. The app is compiled, and the resulting .exe file is published to the */publish* output directory.

Alternatively, you could use the .NET CLI to publish the app:

```dotnetcli
dotnet publish --output "C:\custom\publish\directory"
```

For more information, see `dotnet publish`.

> **Important:**
> With .NET 6, if you attempt to debug the app with the `<PublishSingleFile>true</PublishSingleFile>` setting, you won't be able to debug the app. For more information, see Unable to attach to CoreCLR when debugging a 'PublishSingleFile' .NET 6 app.
