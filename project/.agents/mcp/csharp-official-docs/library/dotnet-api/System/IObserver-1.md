---
title: "IObserver<T> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/IObserver`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IObserver<T> interface

Namespace: `System`

```csharp
public interface IObserver<in T>
```

Provides a mechanism for receiving push-based notifications.

Parameters:

- `T`: The object that provides notification information.

#### Remarks
The `IObserver<T>` and `IObservable<T>` interfaces provide a generalized mechanism for push-based notification, also known as the observer design pattern. The `IObservable<T>` interface represents the class that sends notifications (the provider); the `IObserver<T>` interface represents the class that receives them (the observer). `T` represents the class that provides the notification information.

An `IObserver<T>` implementation arranges to receive notifications from a provider (an `IObservable<T>` implementation) by passing an instance of itself to the provider's `IObservable<T>.Subscribe` method. This method returns an `IDisposable` object that can be used to unsubscribe the observer before the provider finishes sending notifications.

The `IObserver<T>` interface defines the following three methods that the observer must implement:

- The `IObserver<T>.OnNext` method, which is typically called by the provider to supply the observer with new data or state information.

- The `IObserver<T>.OnError` method, which is typically called by the provider to indicate that data is unavailable, inaccessible, or corrupted, or that the provider has experienced some other error condition.

- The `IObserver<T>.OnCompleted` method, which is typically called by the provider to indicate that it has finished sending notifications to observers.

#### Examples
The following example illustrates the observer design pattern. It defines a `Location` class that contains latitude and longitude information.

_Code sample not included: ~/snippets/csharp/System/IObservableT/Overview/provider.cs._

The `LocationReporter` class provides the `IObserver<T>` implementation. It displays information about the current location to the console. Its constructor includes a `name` parameter, which allows the `LocationReporter` instance to identify itself in its string output. It also includes a `Subscribe` method, which wraps a call to the provider's `IObservable<T>.Subscribe` method. This enables the method to assign the returned `IDisposable` reference to a private variable. The `LocationReporter` class also includes an `Unsubscribe` method, which calls the `IDisposable.Dispose` method of the object returned by the `IObservable<T>.Subscribe` method. The following code defines the `LocationReporter` class.

_Code sample not included: ~/snippets/csharp/System/IObservableT/Overview/observer.cs._

The `LocationTracker` class provides the `IObservable<T>` implementation. Its `TrackLocation` method is passed a nullable `Location` object that contains the latitude and longitude data. If the `Location` value is not `null`, the `TrackLocation` method calls the `IObserver<T>.OnNext` method of each observer.

_Code sample not included: ~/snippets/csharp/System/IObservableT/Overview/provider.cs._

If the `Location` value is `null`, the `TrackLocation` method instantiates a `LocationNotFoundException` object, which is shown in the following example. It then calls each observer's `IObserver<T>.OnError` method and passes it the `LocationNotFoundException` object. Note that `LocationNotFoundException` derives from `Exception` but does not add any new members.

_Code sample not included: ~/snippets/csharp/System/IObservableT/Overview/provider.cs._

Observers register to receive notifications from a `TrackLocation` object by calling its `IObservable<T>.Subscribe` method, which assigns a reference to the observer object to a private generic `List<T>` object. The method returns an `Unsubscriber` object, which is an `IDisposable` implementation that enables observers to stop receiving notifications. The `LocationTracker` class also includes an `EndTransmission` method. When no further location data is available, the method calls each observer's `IObserver<T>.OnCompleted` method and then clears the internal list of observers.

The following code then instantiates the provider and the observer.

_Code sample not included: ~/snippets/csharp/System/IObservableT/Overview/program.cs._

## IObserver<T>.OnCompleted() method

```csharp
public void OnCompleted ();
```

Notifies the observer that the provider has finished sending push-based notifications.

#### Remarks
When the observer's `IObserver<T>.OnCompleted` implementation is called, the `IObserver<T>.OnCompleted` method can optionally call the `IDisposable.Dispose` method of the `IDisposable` object that was returned to the observer when it called the `IObservable<T>.Subscribe` method.

#### Examples
The following example provides an implementation of the `IObserver<T>.OnCompleted` method in a latitude/longitude tracking application. The method simply reports that no further data is available and calls the provider's `IDisposable.Dispose` implementation. See the Example section of the `IObserver<T>` topic for the complete example.

_Code sample not included: ~/snippets/csharp/System/IObservableT/Overview/observer.cs._

## IObserver<T>.OnError(Exception) method

```csharp
public void OnError (Exception error);
```

Notifies the observer that the provider has experienced an error condition.

Parameters:

- `error`: An object that provides additional information about the error.

#### Remarks
Although `error` is an object that is derived from `Exception`, it does not necessarily represent an exception that is thrown by the provider. It can also represent a routine or expected error condition, such as data that is missing or unavailable. The `IObserver<T>.OnError` method should be seen as informational, and the provider should not expect the observer to provide error handling.

#### Examples
The following example provides an implementation of the `IObserver<T>.OnError` method in a latitude/longitude tracking application. The method simply reports that data is currently unavailable; it does not make use of the `Exception` object passed to it as a parameter. See the Example section of the `IObserver<T>` topic for the complete example.

_Code sample not included: ~/snippets/csharp/System/IObservableT/Overview/observer.cs._

## IObserver<T>.OnNext(T) method

```csharp
public void OnNext (T value);
```

Provides the observer with new data.

Parameters:

- `value`: The current notification information.

#### Remarks
After an observer has called a provider's `IObservable<T>.Subscribe` method, the provider calls the observer's `IObserver<T>.OnNext` method to provide notifications.

#### Examples
The following example provides an implementation of the `IObserver<T>.OnNext` method in a latitude/longitude tracking application. See the Example section of the `IObserver<T>` topic for the complete example.

_Code sample not included: ~/snippets/csharp/System/IObservableT/Overview/observer.cs._
