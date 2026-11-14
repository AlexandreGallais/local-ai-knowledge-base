---
title: "IObservable<T> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/IObservable`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IObservable<T> interface

Namespace: `System`

```csharp
public interface IObservable<out T>
```

Defines a provider for push-based notification.

Parameters:

- `T`: The object that provides notification information.

#### Remarks
The `IObserver<T>` and `IObservable<T>` interfaces provide a generalized mechanism for push-based notification, also known as the observer design pattern. The `IObservable<T>` interface represents the class that sends notifications (the provider); the `IObserver<T>` interface represents the class that receives them (the observer). `T` represents the class that provides the notification information. In some push-based notifications, the `IObserver<T>` implementation and `T` can represent the same type.

The provider must implement a single method, `IObservable<T>.Subscribe`, that indicates that an observer wants to receive push-based notifications. Callers to the method pass an instance of the observer. The method returns an `IDisposable` implementation that enables observers to cancel notifications at any time before the provider has stopped sending them.

At any given time, a given provider may have zero, one, or multiple observers. The provider is responsible for storing references to observers and ensuring that they are valid before it sends notifications. The `IObservable<T>` interface does not make any assumptions about the number of observers or the order in which notifications are sent.

The provider sends the following three kinds of notifications to the observer by calling `IObserver<T>` methods:

- The current data. The provider can call the `IObserver<T>.OnNext` method to pass the observer a `T` object that has current data, changed data, or fresh data.

- An error condition. The provider can call the `IObserver<T>.OnError` method to notify the observer that some error condition has occurred.

- No further data. The provider can call the `IObserver<T>.OnCompleted` method to notify the observer that it has finished sending notifications.

#### Examples
The following example illustrates the observer design pattern. It defines a `Location` class that contains latitude and longitude information.

_Code sample not included: ~/snippets/csharp/System/IObservableT/Overview/provider.cs._

The `LocationTracker` class provides the `IObservable<T>` implementation. Its `TrackLocation` method is passed a nullable `Location` object that contains the latitude and longitude data. If the `Location` value is not `null`, the `TrackLocation` method calls the `IObserver<T>.OnNext` method of each observer.

_Code sample not included: ~/snippets/csharp/System/IObservableT/Overview/provider.cs._

If the `Location` value is `null`, the `TrackLocation` method instantiates a `LocationUnknownException` object, which is shown in the following example. It then calls each observer's `IObserver<T>.OnError` method and passes it the `LocationUnknownException` object. Note that `LocationUnknownException` derives from `Exception`, but does not add any new members.

_Code sample not included: ~/snippets/csharp/System/IObservableT/Overview/provider.cs._

Observers register to receive notifications from a `LocationTracker` object by calling its `IObservable<T>.Subscribe` method, which assigns a reference to the observer object to a private generic `List<T>` object. The method returns an `Unsubscriber` object, which is an `IDisposable` implementation that enables observers to stop receiving notifications. The `LocationTracker` class also includes an `EndTransmission` method. When no further location data is available, the method calls each observer's `IObserver<T>.OnCompleted` method and then clears the internal list of observers.

In this example, the `LocationReporter` class provides the `IObserver<T>` implementation. It displays information about the current location to the console. Its constructor includes a `name` parameter, which enables the `LocationReporter` instance to identify itself in its string output. It also includes a `Subscribe` method, which wraps a call to the provider's `IObservable<T>.Subscribe` method. This allows the method to assign the returned `IDisposable` reference to a private variable. The `LocationReporter` class also includes an `Unsubscribe` method, which calls the `IDisposable.Dispose` method of the object that is returned by the `IObservable<T>.Subscribe` method. The following code defines the `LocationReporter` class.

_Code sample not included: ~/snippets/csharp/System/IObservableT/Overview/observer.cs._

The following code then instantiates the provider and the observer.

_Code sample not included: ~/snippets/csharp/System/IObservableT/Overview/program.cs._

## IObservable<T>.Subscribe(IObserver<T>) method

```csharp
public IDisposable Subscribe (IObserver<out T> observer);
```

Notifies the provider that an observer is to receive notifications.

Parameters:

- `observer`: The object that is to receive notifications.

Returns: A reference to an interface that allows observers to stop receiving notifications before the provider has finished sending them.

#### Remarks
The `IObservable<T>.Subscribe` method must be called to register an observer for push-based notifications. A typical implementation of the `IObservable<T>.Subscribe` method does the following:

- It stores a reference to the observer in a collection object, such as a `List<T>` object.

- It returns a reference to an `IDisposable` interface. This enables observers to unsubscribe (that is, to stop receiving notifications) before the provider has finished sending them and called the subscriber's `IObserver<T>.OnCompleted` method.

At any given time, a particular instance of an `IObservable<T>` implementation is responsible for handling all subscriptions and notifying all subscribers. Unless the documentation for a particular `IObservable<T>` implementation indicates otherwise, observers should make no assumptions about the `IObservable<T>` implementation, such as the order of notifications that multiple observers will receive.

#### Examples
The following example illustrates the `IObservable<T>.Subscribe` method for an application that reports latitude and longitude information. It defines an `IList<T>` collection object that stores references to all observers. It also returns a private class named `Unsubscriber` that implements the `IDisposable` interface and enables subscribers to stop receiving event notifications.  See the Example section of the `IObservable<T>` topic for the complete example.

_Code sample not included: ~/snippets/csharp/System/IObservableT/Overview/provider.cs._
