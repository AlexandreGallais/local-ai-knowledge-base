---
title: "DiagnosticSource and DiagnosticListener (part 3 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/diagnostics/diagnosticsource-diagnosticlistener.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# DiagnosticSource and DiagnosticListener (part 3 of 3)

### Discovery of DiagnosticListeners

The first step in receiving events is to discover which `DiagnosticListeners` you are
interested in. `DiagnosticListener` supports a way of discovering `DiagnosticListeners` that are
active in the system at runtime. The API to accomplish this is the `System.Diagnostics.DiagnosticListener.AllListeners` property.

Implement an `Observer<T>` class that inherits from the `IObservable` interface, which is the 'callback' version of the `IEnumerable` interface. You can learn more about it at the Reactive Extensions site.
An `IObserver` has three callbacks, `OnNext`, `OnComplete`,
and `OnError`. An `IObservable` has a single method called `Subscribe` that gets passed one of these
Observers. Once connected, the Observer gets callbacks (mostly `OnNext` callbacks) when things
happen.

A typical use of the `AllListeners` static property looks like this:

```csharp
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
This code creates a callback delegate and, using the `AllListeners.Subscribe` method, requests
that the delegate be called for every active `DiagnosticListener` in the system. The decision of whether or not to subscribe to the listener
is made by inspecting its name. The code above is looking for the 'System.Net.Http' listener that you created previously.

Like all calls to `Subscribe()`, this one returns an `IDisposable` that represents the subscription itself.
Callbacks will continue to happen as long as nothing calls `Dispose()` on this subscription object.
The code example never calls `Dispose()`, so it will receive callbacks forever.

When you subscribe to `AllListeners`, you get a callback for ALL ACTIVE `DiagnosticListeners`.
Thus, upon subscribing, you get a flurry of callbacks for all existing `DiagnosticListeners`, and as new ones
are created, you receive a callback for those as well. You receive a complete list of everything it's possible
to subscribe to.

#### Subscribe to DiagnosticListeners

A `DiagnosticListener` implements the `IObservable<KeyValuePair<string, object>>` interface, so you can
call `Subscribe()` on it as well. The following code shows how to fill out the previous example:

```csharp
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
```
In this example, after finding the 'System.Net.Http' `DiagnosticListener`, an action is created that
prints out the name of the listener, event, and `payload.ToString()`.

> **Note:**
> `DiagnosticListener` implements `IObservable<KeyValuePair<string, object>>`. This means
 on each callback we get a `KeyValuePair`. The key of this pair is the name of the event
 and the value is the payload `object`. The example simply logs this information
 to the console.

It's important to keep track of subscriptions to the `DiagnosticListener`. In the previous code, the
`networkSubscription` variable remembers this. If you form another `creation`, you must
unsubscribe the previous listener and subscribe to the new one.

The `DiagnosticSource`/`DiagnosticListener` code is thread safe, but the
callback code also needs to be thread safe. To ensure the callback code is thread safe, locks are used. It is possible to create two `DiagnosticListeners`
with the same name at the same time. To avoid race conditions, updates of shared variables are performed under the protection of a lock.

Once the previous code is run, the next time a `Write()` is done on 'System.Net.Http' `DiagnosticListener`
the information will be logged to the console.

Subscriptions are independent of one another. As a result, other code
can do exactly the same thing as the code example and generate two 'pipes' of the logging
information.

#### Decode Payloads

The `KeyvaluePair` that is passed to the callback has the event name and payload, but the payload is typed simply as
an `object`. There are two ways of getting more specific data:

If the payload is a well known type (for example, a `string`, or an `HttpMessageRequest`), then you can simply
cast the `object` to the expected type (using the `as` operator so as not to cause an exception if
you are wrong) and then access the fields. This is very efficient.

Use reflection API. For example, assume the following method is present.

```csharp
    /// Define a shortcut method that fetches a field of a particular name.
    static class PropertyExtensions
    {
        static object GetProperty(this object _this, string propertyName)
        {
            return _this.GetType().GetTypeInfo().GetDeclaredProperty(propertyName)?.GetValue(_this);
        }
    }
```

To decode the payload more fully, you could replace the `listener.Subscribe()` call with the following code.

```csharp
    networkSubscription = listener.Subscribe(delegate(KeyValuePair<string, object> evnt) {
        var eventName = evnt.Key;
        var payload = evnt.Value;
        if (eventName == "RequestStart")
        {
            var url = payload.GetProperty("Url") as string;
            var request = payload.GetProperty("Request");
            Console.WriteLine("Got RequestStart with URL {0} and Request {1}", url, request);
        }
    });
```

Note that using reflection is relatively expensive. However, using reflection is the only
option if the payloads were generated using anonymous types. This overhead can be reduced by
making fast, specialized property fetchers using either PropertyInfo.GetMethod.CreateDelegate() or
`System.Reflection.Emit` namespace, but that's beyond the scope of this article.
(For an example of a fast, delegate-based property fetcher, see the PropertySpec
class used in the `DiagnosticSourceEventSource`.)

#### Filtering

In the previous example, the code uses the `IObservable.Subscribe()` method to hook up the callback. This
causes all events to be given to the callback. However, `DiagnosticListener` has overloads of
`Subscribe()` that allow the controller to control which events are given.

The `listener.Subscribe()` call in the previous example can be replaced with the following code to demonstrate.

```csharp
    // Create the callback delegate.
    Action<KeyValuePair<string, object>> callback = (KeyValuePair<string, object> evnt) =>
        Console.WriteLine("From Listener {0} Received Event {1} with payload {2}", networkListener.Name, evnt.Key, evnt.Value.ToString());

    // Turn it into an observer (using the Observer<T> Class above).
    Observer<KeyValuePair<string, object>> observer = new Observer<KeyValuePair<string, object>>(callback);

    // Create a predicate (asks only for one kind of event).
    Predicate<string> predicate = (string eventName) => eventName == "RequestStart";

    // Subscribe with a filter predicate.
    IDisposable subscription = listener.Subscribe(observer, predicate);

    // subscription.Dispose() to stop the callbacks.
```

This efficiently subscribes to only the 'RequestStart' events. All other events will cause the `DiagnosticSource.IsEnabled()`
method to return `false` and thus be efficiently filtered out.

> **Note:**
> Filtering is only designed as a performance optimization. It is possible for a listener to receive events even when they
> do not satisfy the filter. This could occur because some other listener has subscribed to the event or because the source
> of the event didn't check IsEnabled() prior to sending it. If you want to be certain that a given event satisfies the filter
> you will need to check it inside the callback. For example:

```c#
    Action<KeyValuePair<string, object>> callback = (KeyValuePair<string, object> evnt) =>
        {
            if(predicate(evnt.Key)) // only print out events that satisfy our filter
            {
                Console.WriteLine("From Listener {0} Received Event {1} with payload {2}", networkListener.Name, evnt.Key, evnt.Value.ToString());
            }
        };
```

##### Context-based filtering

Some scenarios require advanced filtering based on extended context.
Producers can call `System.Diagnostics.DiagnosticSource.IsEnabled*` overloads and supply additional event properties as shown in the following code.

```csharp
//aRequest and anActivity are the current request and activity about to be logged.
if (httpLogger.IsEnabled("RequestStart", aRequest, anActivity))
    httpLogger.Write("RequestStart", new { Url="http://clr", Request=aRequest });
```

The next code example demonstrates that consumers can use such properties to filter events more precisely.

```csharp
    // Create a predicate (asks only for Requests for certain URIs)
    Func<string, object, object, bool> predicate = (string eventName, object context, object activity) =>
    {
        if (eventName == "RequestStart")
        {
            if (context is HttpRequestMessage request)
            {
                return IsUriEnabled(request.RequestUri);
            }
        }
        return false;
    }

    // Subscribe with a filter predicate
    IDisposable subscription = listener.Subscribe(observer, predicate);
```

Producers are not aware of the filter a consumer has provided. `DiagnosticListener`
will invoke the provided filter, omitting additional arguments if necessary, thus the filter
should expect to receive a `null` context.
If a producer calls `IsEnabled()` with event name and context, those calls are enclosed in an overload that takes
only the event name. Consumers must ensure that their filter allows events without context
to pass through.
