---
title: "Watchable interface (java.nio.file)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/Watchable.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Watchable interface (java.nio.file)

```java
public interface Watchable
```

An object that may be registered with a watch service so that it can be
*watched* for changes and events.

 This interface defines the register method to register
the object with a `WatchService` returning a `WatchKey` to
represent the registration. An object may be registered with more than one
watch service. Registration with a watch service is cancelled by invoking the
key's cancel method.

**Since:** 1.7

**See also:** Path#register

## Watchable.register(WatchService, WatchEvent.Kind<?>[], WatchEvent.Modifier...)

```java
WatchKey register(WatchService watcher, WatchEvent.Kind<?>[] events, WatchEvent.Modifier... modifiers) throws IOException
```

Registers an object with a watch service.

 If the file system object identified by this object is currently
registered with the watch service then the watch key, representing that
registration, is returned after changing the event set or modifiers to
those specified by the `events` and `modifiers` parameters.
Changing the event set does not cause pending events for the object to be
discarded. Objects are automatically registered for the OVERFLOW event. This event is not
required to be present in the array of events.

 Otherwise the file system object has not yet been registered with the
given watch service, so it is registered and the resulting new key is
returned.

 Implementations of this interface should specify the events they
support.

Parameters:

- `watcher`: the watch service to which this object is to be registered
- `events`: the events for which this object should be registered
- `modifiers`: the modifiers, if any, that modify how the object is registered

**Returns:** a key <example-value> the registration of this object with the
         given watch service

Throws:

- `UnsupportedOperationException`: if unsupported events or modifiers are specified
- `IllegalArgumentException`: if an invalid of combination of events are modifiers are specified
- `ClosedWatchServiceException`: if the watch service is closed
- `IOException`: if an I/O error occurs

## Watchable.register(WatchService, WatchEvent.Kind<?>...)

```java
WatchKey register(WatchService watcher, WatchEvent.Kind<?>... events) throws IOException
```

Registers an object with a watch service.

 An invocation of this method behaves in exactly the same way as the
invocation

Parameters:

- `watcher`: the watch service to which this object is to be registered
- `events`: the events for which this object should be registered

**Returns:** a key <example-value> the registration of this object with the
         given watch service

Throws:

- `UnsupportedOperationException`: if unsupported events are specified
- `IllegalArgumentException`: if an invalid of combination of events are specified
- `ClosedWatchServiceException`: if the watch service is closed
- `IOException`: if an I/O error occurs
