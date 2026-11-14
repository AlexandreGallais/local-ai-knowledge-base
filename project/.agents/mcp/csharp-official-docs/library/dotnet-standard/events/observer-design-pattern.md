---
title: "Observer design pattern (part 1 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/events/observer-design-pattern.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Observer design pattern

The observer design pattern enables a subscriber to register with and receive notifications from a provider. It's suitable for any scenario that requires push-based notification. The pattern defines a *provider* (also known as a *subject* or an *observable*) and zero, one, or more *observers*. Observers register with the provider, and whenever a predefined condition, event, or state change occurs, the provider automatically notifies all observers by calling a delegate. In this method call, the provider can also provide current state information to observers. In .NET, the observer design pattern is applied by implementing the generic `System.IObservable`1` and `System.IObserver`1` interfaces. The generic type parameter represents the type that provides notification information.

## When to apply the pattern

The observer design pattern is suitable for distributed push-based notifications, because it supports a clean separation between two different components or application layers, such as a data source (business logic) layer and a user interface (display) layer. The pattern can be implemented whenever a provider uses callbacks to supply its clients with current information.

Implementing the pattern requires that you provide the following details:

- A provider or subject, which is the object that sends notifications to observers. A provider is a class or structure that implements the `System.IObservable`1` interface. The provider must implement a single method, `System.IObservable`1.Subscribe*`, which is called by observers that wish to receive notifications from the provider.

- An observer, which is an object that receives notifications from a provider. An observer is a class or structure that implements the `System.IObserver`1` interface. The observer must implement three methods, all of which are called by the provider:

  - `System.IObserver`1.OnNext*`, which supplies the observer with new or current information.
  - `System.IObserver`1.OnError*`, which informs the observer that an error has occurred.
  - `System.IObserver`1.OnCompleted*`, which indicates that the provider has finished sending notifications.

- A mechanism that allows the provider to keep track of observers. Typically, the provider uses a container object, such as a `System.Collections.Generic.List`1` object, to hold references to the `System.IObserver`1` implementations that have subscribed to notifications. Using a storage container for this purpose enables the provider to handle zero to an unlimited number of observers. The order in which observers receive notifications isn't defined; the provider is free to use any method to determine the order.

- An `System.IDisposable` implementation that enables the provider to remove observers when notification is complete. Observers receive a reference to the `System.IDisposable` implementation from the `System.IObservable`1.Subscribe*` method, so they can also call the `System.IDisposable.Dispose*` method to unsubscribe before the provider has finished sending notifications.

- An object that contains the data that the provider sends to its observers. The type of this object corresponds to the generic type parameter of the `System.IObservable`1` and `System.IObserver`1` interfaces. Although this object can be the same as the `System.IObservable`1` implementation, most commonly it's a separate type.

> **Note:**
> In addition to implementing the observer design pattern, you might be interested in exploring libraries that are built using the `System.IObservable`1` and `System.IObserver`1` interfaces. For example, Reactive Extensions for .NET (Rx) consist of a set of extension methods and LINQ standard sequence operators to support asynchronous programming.

## When to consider alternatives

The `IObservable<T>`/`IObserver<T>` interfaces are well suited for push-based notification scenarios, but .NET offers other patterns that might be a better fit:

- **Standard .NET events** — For simple notification scenarios within a single application, events are more idiomatic and easier to implement.
- **`IAsyncEnumerable<T>`** — For async pull-based sequences where the consumer controls the pace, use async streams.
- **`System.Threading.Channels`** — For producer-consumer patterns with backpressure and async support, use `System.Threading.Channels`.
- **Reactive Extensions (Rx.NET)** — For complex event composition, filtering, and transformation, use the `System.Reactive` package instead of implementing `IObservable<T>` directly.

The most prominent use of `IObservable<T>` in .NET is `System.Diagnostics.DiagnosticListener`, which lets framework and library authors emit structured diagnostic events that consumers subscribe to.
