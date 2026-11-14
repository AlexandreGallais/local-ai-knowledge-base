---
title: "Microsoft.Testing.Platform (MTP) server mode (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/microsoft-testing-platform-server-mode.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Server mode

MTP server mode lets an editor, IDE, custom test UI, or other test tool launch a test application and drive discovery and execution through JSON-RPC. Use server mode when your tool needs test metadata, selected-test execution, progress updates, or result artifacts without parsing terminal output. For normal command-line and CI runs, run the test application directly or use `dotnet test`.

For one-shot discovery without a persistent connection, use `--list-tests json`. For an existing VSTest client, see Programmatic test discovery and execution.

Start the public JSON-RPC server with `--server` or `--server jsonrpc`.

> **Important:**
> The .NET SDK uses a separate internal binary protocol through `--server dotnettestcli`. Don't pass that value yourself. `dotnet test` configures the transport and protocol arguments.

## Use the source-only client

MTP 2.4 provides a canonical JSON-RPC client. Add the Microsoft.Testing.Platform.ServerMode.Client.Sources package. The package injects C# source into your project instead of adding a runtime assembly.

The source-only design provides:

- No runtime DLL or additional deployment dependency.
- Native AOT-compatible, reflection-free serialization.
- Protocol types and serialization code from the same repository as the MTP server.

The injected `MtpServerClient`, `IMtpServerClient`, and protocol types can initialize a connection, discover tests, run tests, request server exit, and report test-node updates. All injected types remain `internal` to the consuming assembly. The client handles process launch, transport, message framing, and serialization; you don't need to implement JSON-RPC yourself.

The package compiles C# source. To use the client from Visual Basic or another .NET language, reference a C# class library that exposes your own public API around the injected types, as in the following example.

## Discover and run tests from .NET

This example uses the source-only client package version 2.5.2 and targets .NET 10. Build an MTP-enabled test application first, then pass the path to its built `.dll` or executable to the client.

The shared C# helper discovers tests, prints each node's serializable metadata, and runs the discovered tests by UID. To run a subset, select the required UIDs from the discovery updates and pass only those UIDs to `RunTestsAsync`. Don't use display names as test identities.

```csharp
using System.Text.Json;
using Microsoft.Testing.Platform.ServerMode.Client;

namespace TestClientSample;

public static class TestClient
{
    public static async Task<int> DiscoverAndRunAsync(
        string testApplicationPath,
        CancellationToken <example-value> = default)
    {
        string path = Path.GetFullPath(testApplicationPath);
        var testUids = new HashSet<string>(StringComparer.Ordinal);

        using (IMtpServerClient client = await MtpServerClient.LaunchAsync(
            path, cancellationToken: <example-value>))
        {
            try
            {
                MtpServerCapabilities capabilities =
                    await client.InitializeAsync(cancellationToken);
                if (capabilities.MultiConnectionProvider)
                {
                    throw new NotSupportedException("A passive controller connection can't discover or run tests.");
                }

                if (!capabilities.SupportsDiscovery)
                {
                    throw new NotSupportedException("The test application doesn't support discovery.");
                }

                client.LogReceived += (_, log) => Console.Error.WriteLine(log.Message);
                client.TestNodesUpdated += (_, update) =>
                {
                    foreach (MtpTestNodeUpdate change in update.Changes)
                    {
                        Console.WriteLine(JsonSerializer.Serialize(change.Node));
                        if (change.NodeType != "group"
                            && change.ExecutionState == "discovered"
                            && change.Uid is string uid)
                        {
                            testUids.Add(uid);
                        }
                    }
                };

                await client.DiscoverTestsAsync(cancellationToken);
                await client.ExitAsync(cancellationToken);
            }
            finally
            {
                await client.ShutdownAsync();
            }
        }

        if (testUids.Count == 0)
        {
            Console.Error.WriteLine("No tests were discovered.");
            return 8;
        }

        var completedUids = new HashSet<string>(StringComparer.Ordinal);
        bool hasUnsuccessfulResult = false;
        using IMtpServerClient runClient = await MtpServerClient.LaunchAsync(
            path, cancellationToken: <example-value>);
        try
        {
            MtpServerCapabilities capabilities =
                await runClient.InitializeAsync(cancellationToken);
            if (capabilities.MultiConnectionProvider)
            {
                throw new NotSupportedException("A passive controller connection can't discover or run tests.");
            }

            runClient.LogReceived += (_, log) => Console.Error.WriteLine(log.Message);
            runClient.TestNodesUpdated += (_, update) =>
            {
                foreach (MtpTestNodeUpdate change in update.Changes)
                {
                    Console.WriteLine(JsonSerializer.Serialize(change.Node));
                    if (change.Uid is string uid
                        && testUids.Contains(uid)
                        && change.ExecutionState is string state
                        && state is not ("discovered" or "in-progress")
                        && (!change.Node.TryGetValue("retry.is-superseded", out object? superseded)
                            || superseded is not true))
                    {
                        completedUids.Add(uid);
                        hasUnsuccessfulResult |= state is not ("passed" or "skipped");
                    }
                }
            };

            MtpRunResult result = await runClient.RunTestsAsync(testUids, cancellationToken);
            foreach (MtpAttachment artifact in result.Artifacts)
            {
                Console.WriteLine($"Artifact: {artifact.Uri}");
            }

            await runClient.ExitAsync(cancellationToken);

            if (hasUnsuccessfulResult || !testUids.All(completedUids.Contains))
            {
                Console.Error.WriteLine("A selected test failed or didn't report a final result.");
                return 2;
            }

            return 0;
        }
        finally
        {
            await runClient.ShutdownAsync();
        }
    }
}
```
The helper starts a separate test process for discovery and execution, so it doesn't require `MtpServerCapabilities.MultiRequestSupport`. To reuse a process, check that capability after `InitializeAsync` before you issue multiple requests. Also check `SupportsDiscovery` before you request discovery.

> **Important:**
> The source-only client's launch helpers manage one JSON-RPC connection. In version 2.5.2, they don't accept and route the additional connections used by controller-backed extensions. For example, TRX reporting on Windows can start a controller whose passive connection arrives before the active test host. A connection with `MultiConnectionProvider` set to `true` only pushes updates and artifacts; don't send discovery or run requests to it. The example rejects that connection.
>
> For controller-backed reports, run the test application through the CLI or `dotnet test`, or use a tool client that handles the protocol's additional connections. A single-connection client can still receive artifacts that the active test host publishes.

The C# and Visual Basic <example-value> projects both reference the C# helper project:

### C#

```csharp
using TestClientSample;

if (args.Length != 1)
{
    Console.Error.WriteLine("Usage: DiscoverAndRun <test-application-path>");
    return 1;
}

return await TestClient.DiscoverAndRunAsync(args[0]);
```
### Visual Basic

```vb
Imports System
Imports TestClientSample

Module Program
    Function Main(args As String()) As Integer
        If args.Length <> 1 Then
            Console.Error.WriteLine("Usage: DiscoverAndRun <test-application-path>")
            Return 1
        End If

        Return TestClient.DiscoverAndRunAsync(args(0)).GetAwaiter().GetResult()
    End Function
End Module
```
---

Run either console project with the test application path as its argument:

```dotnetcli
dotnet run --project <client-project> -- <test-application-path>
```

The example returns `0` when every selected UID has a final outcome and every non-superseded final result reports `passed` or `skipped`, `2` for unsuccessful or missing final outcomes, and `8` when discovery returns no tests. These decisions belong to the sample client. A completed `RunTestsAsync` task means the protocol request completed, not that the tests passed. `MtpRunResult.Artifacts` contains run artifacts, not a pass/fail verdict. Use test-node updates to determine test outcomes.

Multiple results can share a UID. The example ignores an earlier retry attempt only when `retry.is-superseded` is `true`; UID equality alone doesn't establish a retry. A later passed or skipped result can't erase an earlier non-superseded failure.

### Consume updates and metadata

Subscribe to `TestNodesUpdated` before discovery or execution. Read `Changes` from each update, and identify nodes by `Uid`. The client provides convenience properties such as `DisplayName`, `ExecutionState`, `ErrorMessage`, and `DurationInMilliseconds`. Read the `Node` dictionary for other serialized fields, including `traits` and framework-specific properties.

MSTest publishes test categories and custom `TestProperty` values as traits. Metadata availability depends on the test framework and what it publishes during discovery. Arbitrary attributes and in-memory `IProperty` implementations don't automatically cross the process boundary. To publish portable key-value metadata, use the public `TestMetadataProperty` type. The platform and compatibility layers can supply other serializable fields; their internal property types aren't extension APIs. For details, see Test-node properties.

Don't expect the JSON-RPC node dictionary to match the `--list-tests json` document. The transports use different field layouts. Also, don't assume every framework emits the VSTest-specific `vstest.*` fields.

The client processes updates in order and invokes the corresponding handlers before the discovery or run task completes. You don't need a delay to wait for the final update. Handlers run synchronously on the client's read loop, so don't block them or synchronously wait for another client operation. Dispatch expensive work or UI updates to the appropriate thread.

Pass a cancellation token to discovery or run methods to request cancellation through the protocol. If the test framework supports tree filters, use `DiscoverTestsWithFilterAsync` or `RunTestsWithFilterAsync` with an MTP tree-filter expression to select tests without first creating a UID collection. These methods don't accept VSTest `--filter` expressions.

## Meet client requirements

Use C# 12 or later. The package respects your project's language-version setting. If your target framework defaults to an earlier C# version, set `LangVersion` to `12.0` or later. The package also supplies internal compatibility types for .NET Framework 4.6.2 and `netstandard2.0`.

Remove any hand-written copy of the MTP client before you add the package to avoid duplicate internal types.

## Choose a launch model

To start the test application as an external process, use `MtpServerClient.LaunchAsync`. The client owns that child process and terminates it during teardown when needed.

To configure an external test application for a particular environment, set `MtpServerClientOptions.EnvironmentVariables` before launch. The child process inherits the parent's environment, with the supplied values applied to the child. These options don't change the environment for an in-process host.

Each client controls one test application. For multiple test applications, create a client for each application and aggregate their results in your tool.

For an embedded host or UI-thread environment that can't use `Process.Start`, use `MtpServerClient.LaunchInProcessAsync`. The method runs the test application through an asynchronous callback in the current process. Don't block the launching thread because the callback and client share the process.

Both launch models use a loopback TCP transport. Browser WebAssembly can't create the required listener, so in-process launch throws `System.PlatformNotSupportedException`. In-process launch doesn't provide an alternative WebAssembly transport.

## Shut down the client

To tear down the client and launched application without blocking the calling thread, call `IMtpServerClient.ShutdownAsync()`. The asynchronous method avoids UI-thread responsiveness and deadlock problems in embedded hosts.

For an in-process host, `MtpServerClientOptions.ServerShutdownTimeout` controls how long teardown waits after the client closes the transport. The default is 30 seconds. Read `ServerExitCode` after shutdown to get the callback's exit code. The value remains `null` while the application runs or when the application fails instead of returning an exit code.

## Declare client statefulness

Starting with MTP 2.4.1, set the nullable `MtpServerClientOptions.IsStateful` option to describe how the client consumes test-node updates:

| Value | Declaration |
|---|---|
| `true` | The client retains an addressable set of test nodes for the session and keeps each node's last-known state until another update changes it, as an IDE test explorer might. |
| `false` | The client consumes updates without retaining that test-node state. |
| `null` (default) | The client doesn't declare the capability. The initialize handshake omits the field. |

The client sends an explicit Boolean value through the experimental `capabilities.testing.isStateful` protocol capability. Statefulness is independent of connection lifetime and the server's `MultiRequestSupport` capability. A client doesn't become stateful merely because it sends several requests over the same connection.

MTP 2.4.0 uses a non-nullable Boolean option with a default of `false`. To preserve an undeclared capability, use MTP 2.4.1 or later.

Inside a framework or extension, use the experimental `IClientInfo` service to inspect the declaration. Read `clientInfo.Capabilities.IsStateful` for a conservative Boolean result, which is `false` when the capability is undeclared. In MTP 2.4.1 or later, `ClientCapabilitiesExtensions.GetIsStateful()` preserves the distinction between undeclared, explicitly stateless, and stateful clients.
