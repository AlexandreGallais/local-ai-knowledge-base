---
title: "WatchEvent interface (java.nio.file)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/WatchEvent.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# WatchEvent interface (java.nio.file)

```java
public interface WatchEvent<T>
```

An event or a repeated event for an object that is registered with a `WatchService`.

 An event is classified by its kind and has a count to indicate the number of times that the event has been
observed. This allows for efficient representation of repeated events. The
context method returns any context associated with
the event. In the case of a repeated event then the context is the same for
all events.

 Watch events are immutable and safe for use by multiple concurrent
threads.

Parameters:

- `<T>`: The type of the context object associated with the event

**Since:** 1.7

## WatchEvent.name()

```java
String name()
```

Returns the name of the event kind.

**Returns:** the name of the event kind

## WatchEvent.type()

```java
Class<T> type()
```

Returns the type of the context value.

**Returns:** the type of the context value

## WatchEvent.name()

```java
String name()
```

Returns the name of the modifier.

**Returns:** the name of the modifier

## WatchEvent.kind()

```java
Kind<T> kind()
```

Returns the event kind.

**Returns:** the event kind

## WatchEvent.count()

```java
int count()
```

Returns the event count. If the event count is greater than `1`
then this is a repeated event.

**Returns:** the event count

## WatchEvent.context()

```java
T context()
```

Returns the context for the event.

 In the case of ENTRY_CREATE,
ENTRY_DELETE, and ENTRY_MODIFY events the context is
a `Path` that is the relative path between
the directory registered with the watch service, and the entry that is
created, deleted, or modified.

**Returns:** the event context; may be `null`
