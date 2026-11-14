---
title: "StandardWatchEventKinds class (java.nio.file)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/StandardWatchEventKinds.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# StandardWatchEventKinds class (java.nio.file)

```java
public final class StandardWatchEventKinds
```

Defines the *standard* event kinds.

**Since:** 1.7

## StandardWatchEventKinds.OVERFLOW

```java
public static final WatchEvent.Kind<Object> OVERFLOW
```

A special event to indicate that events may have been lost or
discarded.

 The context for this event is
implementation specific and may be `null`. The event count may be greater than `1`.

**See also:** WatchService

## StandardWatchEventKinds.ENTRY_CREATE

```java
public static final WatchEvent.Kind<Path> ENTRY_CREATE
```

Directory entry created.

 When a directory is registered for this event then the `WatchKey`
is queued when it is observed that an entry is created in the directory
or renamed into the directory. The event count
for this event is always `1`.

## StandardWatchEventKinds.ENTRY_DELETE

```java
public static final WatchEvent.Kind<Path> ENTRY_DELETE
```

Directory entry deleted.

 When a directory is registered for this event then the `WatchKey`
is queued when it is observed that an entry is deleted or renamed out of
the directory. The event count for this event
is always `1`.

## StandardWatchEventKinds.ENTRY_MODIFY

```java
public static final WatchEvent.Kind<Path> ENTRY_MODIFY
```

Directory entry modified.

 When a directory is registered for this event then the `WatchKey`
is queued when it is observed that an entry in the directory has been
modified. The event count for this event is
`1` or greater.
