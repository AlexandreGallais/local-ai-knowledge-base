---
title: "Debug ThreadPool Starvation (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/diagnostics/debug-threadpool-starvation.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Debug ThreadPool Starvation (part 2 of 2)

## Resolve ThreadPool starvation

To eliminate ThreadPool starvation, ThreadPool threads need to remain unblocked so that they're available to handle incoming work items. There are multiple ways to determine what each thread was doing. If the issue occurs only occasionally, then collecting a trace with dotnet-trace is best to record application behavior over a period of time. If the issue occurs constantly, then you can use the dotnet-stack tool or capture a dump with dotnet-dump that can be viewed in Visual Studio. dotnet-stack can be faster because it shows the thread stacks immediately on the console. But Visual Studio dump debugging offers better visualizations that map frames to source, Just My Code can filter out runtime implementation frames, and the Parallel Stacks feature can help group large numbers of threads with similar stacks. This tutorial shows the dotnet-stack and dotnet-trace options. For an example of investigating the thread stacks using Visual Studio, see the Diagnosing ThreadPool starvation tutorial video.

### Diagnose a continuous issue with dotnet-stack

Run Bombardier again to put the web server under load:

```dotnetcli
bombardier-windows-amd64.exe https://localhost:5001/api/diagscenario/taskwait -d 120s
```

Then run dotnet-stack to see the thread stack traces:

```dotnetcli
dotnet-stack report -n DiagnosticScenarios
```

You should see a long output containing a large number of stacks, many of which look like this:

```dotnetcli
Thread (0x25968):
  [Native Frames]
  System.Private.CoreLib.il!System.Threading.ManualResetEventSlim.Wait(int32,value class System.Threading.CancellationToken)
  System.Private.CoreLib.il!System.Threading.Tasks.Task.SpinThenBlockingWait(int32,value class System.Threading.CancellationToken)
  System.Private.CoreLib.il!System.Threading.Tasks.Task.InternalWaitCore(int32,value class System.Threading.CancellationToken)
  System.Private.CoreLib.il!System.Threading.Tasks.Task`1[System.__Canon].GetResultCore(bool)
  DiagnosticScenarios!testwebapi.Controllers.DiagScenarioController.TaskWait()
  Anonymously Hosted DynamicMethods Assembly!dynamicClass.lambda_method1(pMT: 00007FF7A8CBF658,class System.Object,class System.Object[])
  Microsoft.AspNetCore.Mvc.Core.il!Microsoft.AspNetCore.Mvc.Infrastructure.ActionMethodExecutor+SyncObjectResultExecutor.Execute(class Microsoft.AspNetCore.Mvc.Infrastructure.IActionResultTypeMapper,class Microsoft.Extensions.Internal.ObjectMethodExecutor,class System.Object,class System.Object[])
  Microsoft.AspNetCore.Mvc.Core.il!Microsoft.AspNetCore.Mvc.Infrastructure.ControllerActionInvoker.InvokeActionMethodAsync()
  Microsoft.AspNetCore.Mvc.Core.il!Microsoft.AspNetCore.Mvc.Infrastructure.ControllerActionInvoker.Next(value class State&,value class Scope&,class System.Object&,bool&)
  Microsoft.AspNetCore.Mvc.Core.il!Microsoft.AspNetCore.Mvc.Infrastructure.ControllerActionInvoker.InvokeNextActionFilterAsync()
  Microsoft.AspNetCore.Mvc.Core.il!Microsoft.AspNetCore.Mvc.Infrastructure.ControllerActionInvoker.Next(value class State&,value class Scope&,class System.Object&,bool&)
  Microsoft.AspNetCore.Mvc.Core.il!Microsoft.AspNetCore.Mvc.Infrastructure.ControllerActionInvoker.InvokeNextActionFilterAsync()
  Microsoft.AspNetCore.Mvc.Core.il!Microsoft.AspNetCore.Mvc.Infrastructure.ControllerActionInvoker.Next(value class State&,value class Scope&,class System.Object&,bool&)
  Microsoft.AspNetCore.Mvc.Core.il!Microsoft.AspNetCore.Mvc.Infrastructure.ControllerActionInvoker.InvokeInnerFilterAsync()
  Microsoft.AspNetCore.Mvc.Core.il!Microsoft.AspNetCore.Mvc.Infrastructure.ResourceInvoker.Next(value class State&,value class Scope&,class System.Object&,bool&)
  Microsoft.AspNetCore.Mvc.Core.il!Microsoft.AspNetCore.Mvc.Infrastructure.ResourceInvoker.InvokeFilterPipelineAsync()
  Microsoft.AspNetCore.Mvc.Core.il!Microsoft.AspNetCore.Mvc.Infrastructure.ResourceInvoker.InvokeAsync()
  Microsoft.AspNetCore.Mvc.Core.il!Microsoft.AspNetCore.Mvc.Routing.ControllerRequestDelegateFactory+<>c__DisplayClass10_0.<CreateRequestDelegate>b__0(class Microsoft.AspNetCore.Http.HttpContext)
  Microsoft.AspNetCore.Routing.il!Microsoft.AspNetCore.Routing.EndpointMiddleware.Invoke(class Microsoft.AspNetCore.Http.HttpContext)
  Microsoft.AspNetCore.Authorization.Policy.il!Microsoft.AspNetCore.Authorization.AuthorizationMiddleware+<Invoke>d__6.MoveNext()
  System.Private.CoreLib.il!System.Runtime.CompilerServices.AsyncMethodBuilderCore.Start(!!0&)
  Microsoft.AspNetCore.Authorization.Policy.il!Microsoft.AspNetCore.Authorization.AuthorizationMiddleware.Invoke(class Microsoft.AspNetCore.Http.HttpContext)
  Microsoft.AspNetCore.HttpsPolicy.il!Microsoft.AspNetCore.HttpsPolicy.HttpsRedirectionMiddleware.Invoke(class Microsoft.AspNetCore.Http.HttpContext)
  Microsoft.AspNetCore.HttpsPolicy.il!Microsoft.AspNetCore.HttpsPolicy.HstsMiddleware.Invoke(class Microsoft.AspNetCore.Http.HttpContext)
  Microsoft.AspNetCore.HostFiltering.il!Microsoft.AspNetCore.HostFiltering.HostFilteringMiddleware.Invoke(class Microsoft.AspNetCore.Http.HttpContext)
  Microsoft.AspNetCore.Server.Kestrel.Core.il!Microsoft.AspNetCore.Server.Kestrel.Core.Internal.Http.HttpProtocol+<ProcessRequests>d__223`1[System.__Canon].MoveNext()
  System.Private.CoreLib.il!System.Threading.ExecutionContext.RunInternal(class System.Threading.ExecutionContext,class System.Threading.ContextCallback,class System.Object)
  System.Private.CoreLib.il!System.Runtime.CompilerServices.AsyncTaskMethodBuilder`1+AsyncStateMachineBox`1[System.Threading.Tasks.VoidTaskResult,Microsoft.AspNetCore.Server.Kestrel.Core.Internal.Http.HttpProtocol+<ProcessRequests>d__223`1[System.__Canon]].MoveNext(class System.Threading.Thread)
  System.Private.CoreLib.il!System.Threading.Tasks.AwaitTaskContinuation.RunOrScheduleAction(class System.Runtime.CompilerServices.IAsyncStateMachineBox,bool)
  System.Private.CoreLib.il!System.Threading.Tasks.Task.RunContinuations(class System.Object)
  System.IO.Pipelines.il!System.IO.Pipelines.StreamPipeReader+<<ReadAsync>g__Core|36_0>d.MoveNext()
  System.Private.CoreLib.il!System.Threading.ExecutionContext.RunInternal(class System.Threading.ExecutionContext,class System.Threading.ContextCallback,class System.Object)
  System.Private.CoreLib.il!System.Runtime.CompilerServices.AsyncTaskMethodBuilder`1+AsyncStateMachineBox`1[System.IO.Pipelines.ReadResult,System.IO.Pipelines.StreamPipeReader+<<ReadAsync>g__Core|36_0>d].MoveNext(class System.Threading.Thread)
  System.Private.CoreLib.il!System.Threading.Tasks.AwaitTaskContinuation.RunOrScheduleAction(class System.Runtime.CompilerServices.IAsyncStateMachineBox,bool)
  System.Private.CoreLib.il!System.Threading.Tasks.Task.RunContinuations(class System.Object)
  System.Private.CoreLib.il!System.Runtime.CompilerServices.AsyncTaskMethodBuilder`1[System.Int32].SetExistingTaskResult(class System.Threading.Tasks.Task`1<!0>,!0)
  System.Net.Security.il!System.Net.Security.SslStream+<ReadAsyncInternal>d__186`1[System.Net.Security.AsyncReadWriteAdapter].MoveNext()
  System.Private.CoreLib.il!System.Threading.ExecutionContext.RunInternal(class System.Threading.ExecutionContext,class System.Threading.ContextCallback,class System.Object)
  System.Private.CoreLib.il!System.Runtime.CompilerServices.AsyncTaskMethodBuilder`1+AsyncStateMachineBox`1[System.Int32,System.Net.Security.SslStream+<ReadAsyncInternal>d__186`1[System.Net.Security.AsyncReadWriteAdapter]].MoveNext(class System.Threading.Thread)
  Microsoft.AspNetCore.Server.Kestrel.Core.il!Microsoft.AspNetCore.Server.Kestrel.Core.Internal.DuplexPipeStream+<ReadAsyncInternal>d__27.MoveNext()
  System.Private.CoreLib.il!System.Threading.ExecutionContext.RunInternal(class System.Threading.ExecutionContext,class System.Threading.ContextCallback,class System.Object)
  System.Private.CoreLib.il!System.Threading.ThreadPoolWorkQueue.Dispatch()
  System.Private.CoreLib.il!System.Threading.PortableThreadPool+WorkerThread.WorkerThreadStart()
```

The frames at the bottom of these stacks indicate that these threads are ThreadPool threads:

```dotnetcli
  System.Private.CoreLib.il!System.Threading.ThreadPoolWorkQueue.Dispatch()
  System.Private.CoreLib.il!System.Threading.PortableThreadPool+WorkerThread.WorkerThreadStart()
```

And the frames near the top reveal that the thread is blocked on a call to `GetResultCore(bool)` from the DiagnosticScenarioController.TaskWait() function:

```dotnetcli
Thread (0x25968):
  [Native Frames]
  System.Private.CoreLib.il!System.Threading.ManualResetEventSlim.Wait(int32,value class System.Threading.CancellationToken)
  System.Private.CoreLib.il!System.Threading.Tasks.Task.SpinThenBlockingWait(int32,value class System.Threading.CancellationToken)
  System.Private.CoreLib.il!System.Threading.Tasks.Task.InternalWaitCore(int32,value class System.Threading.CancellationToken)
  System.Private.CoreLib.il!System.Threading.Tasks.Task`1[System.__Canon].GetResultCore(bool)
  DiagnosticScenarios!testwebapi.Controllers.DiagScenarioController.TaskWait()
```

### Diagnose an intermittent issue with dotnet-trace

The dotnet-stack approach is effective only for obvious, consistent blocking operations that occur in every request. In some scenarios, the blocking happens sporadically only every few minutes, making dotnet-stack less useful for diagnosing the issue. In this case, you can use dotnet-trace to collect events over a period of time and save them in a nettrace file that can be analyzed later.

There's one particular event that helps diagnosing thread pool starvation: the WaitHandleWait event, which was introduced in .NET 9. It's emitted when a thread becomes blocked by operations such as sync-over-async calls (for example, `Task.Result`, `Task.Wait`, and `Task.GetAwaiter().GetResult()`) or by other locking operations like `lock`, `Monitor.Enter`, `ManualResetEventSlim.Wait`, and `SemaphoreSlim.Wait`.

Run Bombardier again to put the web server under load:

```dotnetcli
bombardier-windows-amd64.exe https://localhost:5001/api/diagscenario/taskwait -d 120s
```

Then run dotnet-trace to collect wait events:

```dotnetcli
dotnet trace collect -n DiagnosticScenarios --clrevents waithandle --clreventlevel verbose --duration 00:00:30
```

That should generate a file named `DiagnosticScenarios.exe_yyyyddMM_hhmmss.nettrace` containing the events. This nettrace can be analyzed using two different tools:

- PerfView: A performance analysis tool developed by Microsoft for Windows only.
- .NET Events Viewer: A nettrace analysis Blazor web tool developed by the community.

The following sections show how to use each tool to read the nettrace file.

#### Analyze a nettrace with Perfview

1. Download PerfView and run it.
1. Open the nettrace file by double-clicking it.

1. Double click on **Advanced Group** > **Any Stacks**. A new window opens.

1. Double click on the line "Event Microsoft-Windows-DotNETRuntime/WaitHandleWait/Start".

   Now you should see the stack traces where the WaitHandleWait events were emitted. They are split by "WaitSource". Currently there are two sources: `MonitorWait` for events emitted through Monitor.Wait, and `Unknown` for all the others.

1. Start with MonitorWait as it represents 64.8% of the events. You can check the checkboxes to expand the stack traces responsible for emitting this event.

   This stack trace can be read as: `Task<T>.Result` emitted a WaitHandleWait event with a WaitSource MonitorWait (`Task<T>.Result` uses `Monitor.Wait` to perform a wait). It was called by `DiagScenarioController.TaskWait`, which was called by some lambda, which was called by some ASP.NET code

#### Analyze a nettrace with .NET Events Viewer

1. Go to verdie-g.github.io/dotnet-events-viewer.
1. Drag-and-drop the nettrace file.

1. Go to the **Events Tree** page, select the event "WaitHandleWaitStart", and then select **Run query**.

1. You should see the stack traces where the WaitHandleWait events were emitted. Click on the arrows to expand the stack traces responsible for emitting this event.

   This stack trace can be read as: `ManualResetEventSlim.Wait` emitted a WaitHandleWait event. It was called by `Task.SpinThenBlockWait`, which was called by `Task.InternalWaitCore`, which was called by `Task<T>.Result`, which was called by `DiagScenario.TaskWait`, which was called by some lambda, which was called by some ASP.NET code

In real world scenarios, you might find a lot of wait events emitted from threads outside the thread pool. Here, you're investigating a *thread pool* starvation, so all waits on dedicated thread outside of the thread pool aren't relevant. You can tell if a stack trace is from a thread pool thread by looking at the first methods, which should contain a mention of the thread pool (for example, `WorkerThread.WorkerThreadStart` or `ThreadPoolWorkQueue`).

### Code fix

Now you can navigate to the code for this controller in the sample app's *Controllers/DiagnosticScenarios.cs* file to see that it's calling an async API without using `await`. This is the sync-over-async code pattern, which is known to block threads and is the most common cause of ThreadPool starvation.

```csharp
public ActionResult<string> TaskWait()
{
    // ...
    Customer c = PretendQueryCustomerFromDbAsync("Dana").Result;
    return "success:taskwait";
}
```

In this case the code can be readily changed to use the async/await instead as shown in the `TaskAsyncWait()` endpoint. Using await allows the current thread to service other workitems while the database query is in progress. When the database lookup is complete, a ThreadPool thread will resume execution. This way no thread is blocked in the code during each request.

```csharp
public async Task<ActionResult<string>> TaskAsyncWait()
{
    // ...
    Customer c = await PretendQueryCustomerFromDbAsync("Dana");
    return "success:taskasyncwait";
}
```

Running Bombadier to send load to the `api/diagscenario/taskasyncwait` endpoint shows that the ThreadPool thread count stays much lower and average latency remains near 500ms when using the async/await approach:

```dotnetcli
>bombardier-windows-amd64.exe https://localhost:5001/api/diagscenario/taskasyncwait
Bombarding https://localhost:5001/api/diagscenario/taskasyncwait for 10s using 125 connection(s)
[=============================================================================================] 10s
Done!
Statistics        Avg      Stdev        Max
  Reqs/sec       227.92     274.27    1263.48
  Latency      532.58ms    58.64ms      1.14s
  HTTP codes:
    1xx - 0, 2xx - 2390, 3xx - 0, 4xx - 0, 5xx - 0
    others - 0
  Throughput:    98.81KB/s
```
