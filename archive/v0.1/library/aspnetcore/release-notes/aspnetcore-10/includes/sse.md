---
title: "sse"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-10/includes/sse.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# sse

### Support for Server-Sent Events (SSE)

ASP.NET Core now supports returning a ServerSentEvents result using the TypedResults.ServerSentEvents API. This feature is supported in both Minimal APIs and controller-based apps.

Server-Sent Events is a server push technology that allows a server to send a stream of event messages to a client over a single HTTP connection. In .NET the event messages are represented as `SseItem<T>` objects, which may contain an event type, an ID, and a data payload of type `T`.

The TypedResults class has a new static method called ServerSentEvents that can be used to return a `ServerSentEvents` result. The first parameter to this method is an `IAsyncEnumerable<SseItem<T>>` that represents the stream of event messages to be sent to the client.

The following example illustrates how to use the `TypedResults.ServerSentEvents` API to return a stream of heart rate events as JSON objects to the client:

```csharp
app.MapGet("<example-value>", (CancellationToken <example-value>) =>
{
    async IAsyncEnumerable<HeartRateRecord> GetHeartRate(
        [EnumeratorCancellation] CancellationToken <example-value>)
    {
        while (!cancellationToken.IsCancellationRequested)
        {
            var heartRate = Random.Shared.Next(60, 100);
            yield return HeartRateRecord.Create(heartRate);
            await Task.Delay(2000, cancellationToken);
        }
    }

    return TypedResults.ServerSentEvents(GetHeartRate(cancellationToken),
                                                  eventType: "heartRate");
});
```
For more information, see:

- Server-Sent Events on MDN.
- Minimal API sample app using the `TypedResults.ServerSentEvents` API to return a stream of heart rate events as string, `ServerSentEvents`, and JSON objects to the client.
- Controller API sample app using the `TypedResults.ServerSentEvents` API to return a stream of heart rate events as string, `ServerSentEvents`, and JSON objects to the client.
