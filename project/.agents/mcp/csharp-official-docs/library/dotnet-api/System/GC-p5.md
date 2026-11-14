---
title: "GC class (part 5 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/GC.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# GC class (part 5 of 5)

## GC.WaitForFullGCApproach() method

```csharp
public static GCNotificationStatus WaitForFullGCApproach ();
```

Returns the status of a registered notification for determining whether a full, blocking garbage collection by the common language runtime is imminent.

Returns: The status of the registered garbage collection notification.

#### Remarks
Use the `GCNotificationStatus` enumeration returned by this method to determine the status of the current garbage collection notification that was registered by using the `GC.RegisterForFullGCNotification` method. You can also use the `GC.WaitForFullGCComplete` method to determine whether the full garbage collection has completed.

When the enumeration returns `Succeeded`, you can do tasks such as preventing additional objects from being allocated and inducing a collection yourself with the `GC.Collect` method. Note that the notification does not guarantee that a full garbage collection will occur, only that conditions have reached the threshold that are favorable for a full garbage collection to occur.

This method waits indefinitely for a garbage collection notification to be obtained. If you want to specify a time-out period for the method to return if the notification cannot be obtained, use the `WaitForFullGCApproach` method overload. If you call this method without specifying a time-out, you can call the `GC.CancelFullGCNotification` method if you are waiting longer than preferred.

You should follow this method with a call to the `GC.WaitForFullGCComplete` method to make sure that you have had a full garbage collection. Calling this method alone causes indeterminate results.

#### Examples
The following example shows how to use this method to determine whether a full, blocking garbage collection is approaching. Whenever the status of the notification is `Succeeded`, the user method `OnFullGCApproachNotify` is called to perform actions in response to the approaching collection. This code example is part of a larger example provided for Garbage Collection Notifications topic.

_Code sample not included: ~/snippets/csharp/System/GC/CancelFullGCNotification/Program.cs._

## GC.WaitForFullGCApproach(Int32) method

```csharp
public static GCNotificationStatus WaitForFullGCApproach (int millisecondsTimeout);
```

Returns, in a specified time-out period, the status of a registered notification for determining whether a full, blocking garbage collection by the common language runtime is imminent.

Parameters:

- `millisecondsTimeout`: The length of time to wait before a notification status can be obtained. Specify -1 to wait indefinitely.

Returns: The status of the registered garbage collection notification.

Exceptions:

- `ArgumentOutOfRangeException`: `millisecondsTimeout` must be either non-negative or less than or equal to <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see> or -1.

#### Remarks
Use the `GCNotificationStatus` enumeration returned by this method to determine the status of the current garbage collection notification that was registered by using the `GC.RegisterForFullGCNotification` method. You can also use the `GC.WaitForFullGCComplete` method to determine whether the full garbage collection has completed.

Note that this method returns immediately whenever a garbage collection notification status is obtained, regardless of the value specified by `millisecondsTimeout`. If a garbage collection notification status is not obtained before `millisecondsTimeout` times out, this method returns `NotApplicable`.

When the enumeration returns `Succeeded`, you can do tasks such as preventing additional objects from being allocated and inducing a collection yourself with the `GC.Collect` method. Note that the notification does not guarantee that a full garbage collection will occur, only that conditions have reached the threshold that are favorable for a full garbage collection to occur.

You can call the `GC.CancelFullGCNotification` method when you cannot wait for the time-out period to elapse.

You should follow this method with a call to the `GC.WaitForFullGCComplete` method to make sure that you have had a full garbage collection. Calling this method alone causes indeterminate results.

## GC.WaitForFullGCApproach(TimeSpan) method

```csharp
public static GCNotificationStatus WaitForFullGCApproach (TimeSpan timeout);
```

Returns, in a specified time-out period, the status of a registered notification for determining whether a full, blocking garbage collection by the common language runtime is imminent.

Parameters:

- `timeout`: The timeout on waiting for a full GC approach

Returns: The status of a registered full GC notification

To be added.

## GC.WaitForFullGCComplete() method

```csharp
public static GCNotificationStatus WaitForFullGCComplete ();
```

Returns the status of a registered notification for determining whether a full, blocking garbage collection by the common language runtime has completed.

Returns: The status of the registered garbage collection notification.

#### Remarks
Use the `GCNotificationStatus` enumeration returned by this method to determine the status of the current garbage collection notification that was registered by using the `GC.RegisterForFullGCNotification` method. You can also use the `GC.WaitForFullGCApproach` method to determine whether a full garbage collection is imminent.

When the enumeration returns `Succeeded`, you can do tasks such as resuming work and obtaining a collection count with the `CollectionCount` method.

This method waits indefinitely for a garbage collection notification to be obtained. If you want to specify a time-out period for the method to return if the notification cannot be obtained, use the `WaitForFullGCApproach` method overload. If you call this method without specifying a time-out, you can call the `GC.CancelFullGCNotification` method if you are waiting longer than preferred.

This method call should be preceded with a call to the `GC.WaitForFullGCApproach` method to make sure that you have had a full garbage collection. Calling this method alone can produce indeterminate results.

#### Examples
The following example shows how to use this method to determine whether a full garbage collection has completed. Whenever the status of the notification is `Succeeded`, the user method `OnFullGCCompletedNotify` is called to perform actions in response to the completed collection. This code example is part of a larger example provided for Garbage Collection Notifications topic.

_Code sample not included: ~/snippets/csharp/System/GC/CancelFullGCNotification/Program.cs._

## GC.WaitForFullGCComplete(Int32) method

```csharp
public static GCNotificationStatus WaitForFullGCComplete (int millisecondsTimeout);
```

Returns, in a specified time-out period, the status of a registered notification for determining whether a full, blocking garbage collection by common language the runtime has completed.

Parameters:

- `millisecondsTimeout`: The length of time to wait before a notification status can be obtained. Specify -1 to wait indefinitely.

Returns: The status of the registered garbage collection notification.

Exceptions:

- `InvalidOperationException`: `millisecondsTimeout` must be either non-negative or less than or equal to <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see> or -1.

#### Remarks
Use the `GCNotificationStatus` enumeration returned by this method to determine the status of the current garbage collection notification that was registered by using the `GC.RegisterForFullGCNotification` method. You can also use the `GC.WaitForFullGCApproach` method to determine whether a full garbage collection is imminent.

Note that this method returns immediately whenever a garbage collection notification status is obtained, regardless of the value specified by `millisecondsTimeout`. If a garbage collection notification status is not obtained before `millisecondsTimeout` times out, this method returns `NotApplicable`.

When the enumeration returns `Succeeded`, you can do tasks such as resuming work and obtaining a collection count with the `CollectionCount` property.

You can call the `GC.CancelFullGCNotification` method when you cannot wait for the time-out period to elapse.

This method call should be preceded with a call to the `GC.WaitForFullGCApproach` method to make sure that you have had a full garbage collection. Calling this method alone can produce indeterminate results.

## GC.WaitForFullGCComplete(TimeSpan) method

```csharp
public static GCNotificationStatus WaitForFullGCComplete (TimeSpan timeout);
```

Returns the status of a registered notification about whether a blocking garbage collection has completed. May wait indefinitely for a full collection.

Parameters:

- `timeout`: The timeout on waiting for a full collection

Returns: The status of a registered full GC notification

To be added.

## GC.WaitForPendingFinalizers() method

```csharp
public static void WaitForPendingFinalizers ();
```

Suspends the current thread until the thread that is processing the queue of finalizers has emptied that queue.

#### Remarks
When the garbage collector finds objects that can be reclaimed, it checks each object to determine the object's finalization requirements. If an object implements a finalizer and has not disabled finalization by calling `GC.SuppressFinalize`, the object is placed in a list of objects that are marked as ready for finalization. The garbage collector calls the `Object.Finalize` methods for the objects in this list and removes the entries from the list. This method blocks until all finalizers have run to completion.

The thread on which finalizers are run is unspecified, so there is no guarantee that this method will terminate. However, this thread can be interrupted by another thread while the `GC.WaitForPendingFinalizers` method is in progress. For example, you can start another thread that waits for a period of time and then interrupts this thread if this thread is still suspended.

#### Examples
The following example demonstrates how to use the `GC.WaitForPendingFinalizers` method to suspend the current thread until finalization of all the collected objects is complete.

_Code sample not included: ~/snippets/csharp/System/GC/WaitForPendingFinalizers/class1.cs._
