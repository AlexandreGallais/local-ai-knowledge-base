---
title: "GCNotificationStatus enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/GCNotificationStatus.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# GCNotificationStatus enum

Namespace: `System`

```csharp
public enum GCNotificationStatus
```

Provides information about the current registration for notification of the next full garbage collection.

#### Remarks
Use the `GC.RegisterForFullGCNotification` method to register for a full garbage collection notification. Then use the `GC.WaitForFullGCApproach` method or the `GC.WaitForFullGCComplete` method to return a `GCNotificationStatus` enumeration that contains the status of the notification.

#### Examples
The following example obtains a `GCNotificationStatus` enumeration from the `GC.WaitForFullGCApproach` method. If the enumeration returns Succeeded, it calls the custom method `OnFullGCApproachNotify` to perform actions in response to the approaching full garbage collection. This code example is part of a larger example provided for Garbage Collection Notifications topic.

_Code sample not included: ~/snippets/csharp/System/GC/CancelFullGCNotification/Program.cs._

## GCNotificationStatus.Canceled field

```csharp
Canceled
```

The current registration was canceled by the user.

## GCNotificationStatus.Failed field

```csharp
Failed
```

The notification failed for any reason.

## GCNotificationStatus.NotApplicable field

```csharp
NotApplicable
```

This value can result when there's no current registration for a garbage collection notification, or a full GC has happened but was done as a background GC (that is, a GC that runs mostly concurrently with user threads) instead of a full blocking GC. Background GC is enabled by default; disabling it improves the prediction accuracy but incurs larger GC pauses.

## GCNotificationStatus.Succeeded field

```csharp
Succeeded
```

The notification was successful and the registration was not canceled.

## GCNotificationStatus.Timeout field

```csharp
Timeout
```

The time specified by the `millisecondsTimeout` parameter for either `GC.WaitForFullGCApproach` or `GC.WaitForFullGCComplete` has elapsed.
