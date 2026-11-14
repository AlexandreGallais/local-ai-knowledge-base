---
title: "Configure distributed tracing in .NET (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/diagnostics/distributed-tracing-configuration.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Configure distributed tracing in .NET (part 2 of 2)

## Run the sample

The following .NET 11 console app creates one enabled operation and one disabled operation. It then updates the disabled operation's rule, calls `Reload`, and starts the operation again through the same local `ActivitySource`.

```csharp
using System.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Diagnostics.Tracing;

IConfigurationRoot configuration = new ConfigurationBuilder()
    .AddInMemoryCollection(new Dictionary<string, string?>
    {
        ["Tracing:EnabledTracing:Default"] = "false",
        ["Tracing:EnabledTracing:Contoso.Orders:Default"] = "true",
        ["Tracing:EnabledTracing:Contoso.Orders:DisabledOperation"] = "false",
    })
    .Build();

ServiceCollection services = new();
services.AddTracing(tracing =>
{
    tracing.AddListener("Console", listener =>
    {
        listener.Sample = static (ref ActivityCreationOptions<ActivityContext> _) =>
            ActivitySamplingResult.AllData;
        listener.SampleUsingParentId = static (ref ActivityCreationOptions<string> _) =>
            ActivitySamplingResult.AllData;
        listener.ActivityStarted = activity =>
            Console.WriteLine($"Listener started: {activity.OperationName}");
    });
    tracing.AddConfiguration(configuration.GetSection("Tracing"));
});

using ServiceProvider serviceProvider = services.BuildServiceProvider();
ActivitySourceFactory factory =
    serviceProvider.GetRequiredService<ActivitySourceFactory>();
using ActivitySource source = factory.Create("Contoso.Orders");

Console.WriteLine("Before reload:");
WriteResult(source, "EnabledOperation");
WriteResult(source, "DisabledOperation");

configuration["Tracing:EnabledTracing:Contoso.Orders:DisabledOperation"] = "true";
configuration.Reload();

Console.WriteLine("After reload:");
WriteResult(source, "DisabledOperation");

static void WriteResult(ActivitySource source, string operationName)
{
    using Activity? activity = source.StartActivity(operationName);
    string state = activity is null ? "disabled" : "enabled";
    Console.WriteLine($"{operationName}: {state}");
}
```
```vb
Imports System.Diagnostics
Imports Microsoft.Extensions.Configuration
Imports Microsoft.Extensions.DependencyInjection
Imports Microsoft.Extensions.Diagnostics.Tracing

Module Program
    Sub Main()
        Dim initialData As New Dictionary(Of String, String) From {
            {"Tracing:EnabledTracing:Default", "false"},
            {"Tracing:EnabledTracing:Contoso.Orders:Default", "true"},
            {"Tracing:EnabledTracing:Contoso.Orders:DisabledOperation", "false"}
        }

        Dim configuration As IConfigurationRoot =
            New ConfigurationBuilder().AddInMemoryCollection(initialData).Build()

        Dim services As New ServiceCollection()
        services.AddTracing(
            Sub(tracing)
                tracing.AddListener(
                    "Console",
                    Sub(listener)
                        listener.Sample = AddressOf SampleActivity
                        listener.SampleUsingParentId = AddressOf SampleActivityUsingParentId
                        listener.ActivityStarted =
                            Sub(activity) Console.WriteLine(
                                $"Listener started: {activity.OperationName}")
                    End Sub)
                tracing.AddConfiguration(configuration.GetSection("Tracing"))
            End Sub)

        Using serviceProvider As ServiceProvider = services.BuildServiceProvider()
            Dim factory As ActivitySourceFactory =
                serviceProvider.GetRequiredService(Of ActivitySourceFactory)()

            Using source As ActivitySource = factory.Create("Contoso.Orders")
                Console.WriteLine("Before reload:")
                WriteResult(source, "EnabledOperation")
                WriteResult(source, "DisabledOperation")

                configuration(
                    "Tracing:EnabledTracing:Contoso.Orders:DisabledOperation") = "true"
                configuration.Reload()

                Console.WriteLine("After reload:")
                WriteResult(source, "DisabledOperation")
            End Using
        End Using
    End Sub

    Private Function SampleActivity(
        ByRef options As ActivityCreationOptions(Of ActivityContext)
    ) As ActivitySamplingResult
        Return ActivitySamplingResult.AllData
    End Function

    Private Function SampleActivityUsingParentId(
        ByRef options As ActivityCreationOptions(Of String)
    ) As ActivitySamplingResult
        Return ActivitySamplingResult.AllData
    End Function

    Private Sub WriteResult(source As ActivitySource, operationName As String)
        Using activity As Activity = source.StartActivity(operationName)
            Dim state As String = If(activity Is Nothing, "disabled", "enabled")
            Console.WriteLine($"{operationName}: {state}")
        End Using
    End Sub
End Module
```
The C# and Visual Basic <example-value> produce the same result:

```console
Before reload:
Listener started: EnabledOperation
EnabledOperation: enabled
DisabledOperation: disabled
After reload:
Listener started: DisabledOperation
DisabledOperation: enabled
```

## See also

- Distributed tracing overview
- Configuration in .NET
- Activity tracing configuration in What's new in .NET 11
