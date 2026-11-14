---
title: "Garbage Collection Notifications (part 1 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/garbage-collection/notifications.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Garbage collection notifications

There are situations in which a full garbage collection (that is, a generation 2 collection) by the common language runtime may adversely affect performance. This can be an issue particularly with servers that process large volumes of requests; in this case, a long garbage collection can cause a request time-out. To prevent a full collection from occurring during a critical period, you can be notified that a full garbage collection is approaching and then take action to redirect the workload to another server instance. You can also induce a collection yourself, provided that the current server instance does not need to process requests.

 The `System.GC.RegisterForFullGCNotification*` method registers for a notification to be raised when the runtime senses that a full garbage collection is approaching. There are two parts to this notification: when the full garbage collection is approaching and when the full garbage collection has completed.

> **Warning:**
> When the `<gcConcurrent>` configuration element is enabled, `System.GC.WaitForFullGCComplete*` may return `NotApplicable` `System.GCNotificationStatus` if the full GC was done as a background GC.

 To determine when a notification has been raised, use the `System.GC.WaitForFullGCApproach*` and `System.GC.WaitForFullGCComplete*` methods. Typically, you use these methods in a `while` loop to continually obtain a `System.GCNotificationStatus` enumeration that shows the status of the notification. If that value is `System.GCNotificationStatus.Succeeded`, you can do the following:

- In response to a notification obtained with the `System.GC.WaitForFullGCApproach*` method, you can redirect the workload and possibly induce a collection yourself.

- In response to a notification obtained with the `System.GC.WaitForFullGCComplete*` method, you can make the current server instance available to process requests again. You can also gather information. For example, you can use the `System.GC.CollectionCount*` method to record the number of collections.

 The `System.GC.WaitForFullGCApproach*` and the `System.GC.WaitForFullGCComplete*` methods are designed to work together. Using one without the other can produce indeterminate results.

## Full Garbage Collection

 The runtime causes a full garbage collection when any of the following scenarios are true:

- Enough memory has been promoted into generation 2 to cause the next generation 2 collection.

- Enough memory has been promoted into the large object heap to cause the next generation 2 collection.

- A collection of generation 1 is escalated to a collection of generation 2 due to other factors.

 The thresholds you specify in the `System.GC.RegisterForFullGCNotification*` method apply to the first two scenarios. However, in the first scenario you will not always receive the notification at the time proportional to the threshold values you specify for two reasons:

- The runtime does not check each small object allocation (for performance reasons).

- Only generation 1 collections promote memory into generation 2.

 The third scenario also contributes to the uncertainty of when you will receive the notification. Although this is not a guarantee, it does prove to be a useful way to mitigate the effects of an inopportune full garbage collection by redirecting the requests during this time or inducing the collection yourself when it can be better accommodated.

## Notification Threshold Parameters

 The `System.GC.RegisterForFullGCNotification*` method has two parameters to specify the threshold values of the generation 2 objects and the large object heap. When those values are met, a garbage collection notification should be raised. The following table describes these parameters.

|Parameter|Description|
|---------------|-----------------|
|`maxGenerationThreshold`|A number between 1 and 99 that specifies when the notification should be raised based on the objects promoted in generation 2.|
|`largeObjectHeapThreshold`|A number between 1 and 99 that specifies when the notification should be raised based on the objects that are allocated in the large object heap.|

 If you specify a value that is too high, there is a high probability that you will receive a notification, but it could be too long a period to wait before the runtime causes a collection. If you induce a collection yourself, you may reclaim more objects than would be reclaimed if the runtime causes the collection.

 If you specify a value that is too low, the runtime may cause the collection before you have had sufficient time to be notified.
