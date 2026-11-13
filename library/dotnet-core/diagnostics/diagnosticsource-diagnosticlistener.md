---
title: "DiagnosticSource and DiagnosticListener (part 1 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/diagnostics/diagnosticsource-diagnosticlistener.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# DiagnosticSource and DiagnosticListener

**This article applies to: ✔️** .NET Core 3.1 and later versions **✔️** .NET Framework 4.5 and later versions

`System.Diagnostics.DiagnosticSource` is a module that allows code to be instrumented for production-time
logging of rich data payloads for consumption within the process that was instrumented. At runtime, consumers can dynamically discover
data sources and subscribe to the ones of interest. `System.Diagnostics.DiagnosticSource` was designed to allow in-process
tools to access rich data. When using `System.Diagnostics.DiagnosticSource`, the consumer is assumed
to be within the same process and as a result, non-serializable types (for example, `HttpResponseMessage` or `HttpContext`) can be passed,
giving customers plenty of data to work with.

## Getting Started with DiagnosticSource

This walkthrough shows how to create a DiagnosticSource event and instrument code with `System.Diagnostics.DiagnosticSource`.
It then explains how to consume the event by finding interesting DiagnosticListeners, subscribing to their events, and decoding event data payloads.
It finishes by describing *filtering*, which allows only specific events to pass through the system.

## DiagnosticSource Implementation

You will work with the following code. This code is an *HttpClient* class with a `SendWebRequest` method that sends an HTTP request to the URL and receives a reply.

```csharp
using System.Diagnostics;
MyListener TheListener = new MyListener();
TheListener.Listening();
HTTPClient Client = new HTTPClient();
Client.SendWebRequest("https://learn.microsoft.com/dotnet/core/diagnostics/");

class HTTPClient
{
    private static DiagnosticSource httpLogger = new DiagnosticListener("System.Net.Http");
    public byte[] SendWebRequest(string url)
    {
        if (httpLogger.IsEnabled("RequestStart"))
        {
            httpLogger.Write("RequestStart", new { Url = url });
        }
        //Pretend this sends an HTTP request to the url and gets back a reply.
        byte[] reply = new byte[] { };
        return reply;
    }
}
class Observer<T> : IObserver<T>
{
    public Observer(Action<T> onNext, Action onCompleted)
    {
        _onNext = onNext ?? new Action<T>(_ => { });
        _onCompleted = onCompleted ?? new Action(() => { });
    }
    public void OnCompleted() { _onCompleted(); }
    public void OnError(Exception error) { }
    public void OnNext(T value) { _onNext(value); }
    private Action<T> _onNext;
    private Action _onCompleted;
}
class MyListener
{
    IDisposable networkSubscription;
    IDisposable listenerSubscription;
    private readonly object allListeners = new();
    public void Listening()
    {
        Action<KeyValuePair<string, object>> whenHeard = delegate (KeyValuePair<string, object> data)
        {
            Console.WriteLine($"Data received: {data.Key}: {data.Value}");
        };
        Action<DiagnosticListener> onNewListener = delegate (DiagnosticListener listener)
        {
            Console.WriteLine($"New Listener discovered: {listener.Name}");
            //Subscribe to the specific DiagnosticListener of interest.
            if (listener.Name == "System.Net.Http")
            {
                //Use lock to ensure the callback code is thread safe.
                lock (allListeners)
                {
                    if (networkSubscription != null)
                    {
                        networkSubscription.Dispose();
                    }
                    IObserver<KeyValuePair<string, object>> iobserver = new Observer<KeyValuePair<string, object>>(whenHeard, null);
                    networkSubscription = listener.Subscribe(iobserver);
                }

            }
        };
        //Subscribe to discover all DiagnosticListeners
        IObserver<DiagnosticListener> observer = new Observer<DiagnosticListener>(onNewListener, null);
        //When a listener is created, invoke the onNext function which calls the delegate.
        listenerSubscription = DiagnosticListener.AllListeners.Subscribe(observer);
    }
    // Typically you leave the listenerSubscription subscription active forever.
    // However when you no longer want your callback to be called, you can
    // call listenerSubscription.Dispose() to cancel your subscription to the IObservable.
}
```
Running the provided implementation prints to the console.

```console
New Listener discovered: System.Net.Http
Data received: RequestStart: { Url = https://learn.microsoft.com/dotnet/core/diagnostics/ }
```
