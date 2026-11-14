# StandardWatchEventKinds class (java.nio.file)

```java
public final class StandardWatchEventKinds
```

Defines the <em>standard</em> event kinds.

@since 1.7

## StandardWatchEventKinds.OVERFLOW

```java
public static final WatchEvent.Kind<Object> OVERFLOW
```

A special event to indicate that events may have been lost or
discarded.

<p> The {@link WatchEvent#context context} for this event is
implementation specific and may be {@code null}. The event {@link
WatchEvent#count count} may be greater than {@code 1}.

@see WatchService

## StandardWatchEventKinds.ENTRY_CREATE

```java
public static final WatchEvent.Kind<Path> ENTRY_CREATE
```

Directory entry created.

<p> When a directory is registered for this event then the {@link WatchKey}
is queued when it is observed that an entry is created in the directory
or renamed into the directory. The event {@link WatchEvent#count count}
for this event is always {@code 1}.

## StandardWatchEventKinds.ENTRY_DELETE

```java
public static final WatchEvent.Kind<Path> ENTRY_DELETE
```

Directory entry deleted.

<p> When a directory is registered for this event then the {@link WatchKey}
is queued when it is observed that an entry is deleted or renamed out of
the directory. The event {@link WatchEvent#count count} for this event
is always {@code 1}.

## StandardWatchEventKinds.ENTRY_MODIFY

```java
public static final WatchEvent.Kind<Path> ENTRY_MODIFY
```

Directory entry modified.

<p> When a directory is registered for this event then the {@link WatchKey}
is queued when it is observed that an entry in the directory has been
modified. The event {@link WatchEvent#count count} for this event is
{@code 1} or greater.