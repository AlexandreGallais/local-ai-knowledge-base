---
title: "DiagnosticSource and DiagnosticListener (part 2 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/diagnostics/diagnosticsource-diagnosticlistener.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# DiagnosticSource and DiagnosticListener (part 2 of 3)

## Log an event

The `DiagnosticSource` type is an abstract base class that defines the methods needed to log events. The class that holds the implementation is `DiagnosticListener`.
The first step in instrumenting code with `DiagnosticSource` is to create a
`DiagnosticListener`. For example:

```csharp
private static DiagnosticSource httpLogger = new DiagnosticListener("System.Net.Http");
```
Notice that `httpLogger` is typed as a `DiagnosticSource`.
That's because this code
only writes events and thus is only concerned with the `DiagnosticSource` methods that
the `DiagnosticListener` implements. `DiagnosticListeners` are given names when they are created,
and this name should be the name of a logical grouping of related events (typically the component).
Later, this name is used to find the Listener and subscribe to any of its events.
Thus the event names only need to be unique within a component.

-------------------------------------------

The `DiagnosticSource` logging
interface consists of two methods:

```csharp
    bool IsEnabled(string name)
    void Write(string name, object value);
```

This is instrument site specific. You need to check the instrumentation site to see what types are passed into `IsEnabled`. This provides you with the information to know what to cast the payload to.

A typical call site will look like:

```csharp
if (httpLogger.IsEnabled("RequestStart"))
{
    httpLogger.Write("RequestStart", new { Url = url });
}
```
Every event has a `string` name (for example, `RequestStart`), and exactly one `object` as a payload.
If you need to send more than one item, you can do so by creating an `object` with properties to represent all its information. C#'s anonymous type
feature is typically used to create a type to pass 'on the fly', and makes this scheme very
convenient. At the instrumentation site, you must guard the call to `Write()` with an `IsEnabled()` check on
the same event name. Without this check, even when the instrumentation is inactive, the rules
of the C# language require all the work of creating the payload `object` and calling `Write()` to be
done, even though nothing is actually listening for the data. By guarding the `Write()` call, you
make it efficient when the source is not enabled.

Combining everything you have:

```csharp
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
```
-------------------------------------------
