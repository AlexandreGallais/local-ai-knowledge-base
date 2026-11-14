# WatchEvent interface (java.nio.file)

```java
public interface WatchEvent<T>
```

An event or a repeated event for an object that is registered with a {@link
WatchService}.

<p> An event is classified by its {@link #kind() kind} and has a {@link
#count() count} to indicate the number of times that the event has been
observed. This allows for efficient representation of repeated events. The
{@link #context() context} method returns any context associated with
the event. In the case of a repeated event then the context is the same for
all events.

<p> Watch events are immutable and safe for use by multiple concurrent
threads.

@param   <T>     The type of the context object associated with the event

@since 1.7

## WatchEvent.name()

```java
String name()
```

Returns the name of the event kind.

@return the name of the event kind

## WatchEvent.type()

```java
Class<T> type()
```

Returns the type of the {@link WatchEvent#context context} value.


@return the type of the context value

## WatchEvent.name()

```java
String name()
```

Returns the name of the modifier.

@return the name of the modifier

## WatchEvent.kind()

```java
Kind<T> kind()
```

Returns the event kind.

@return  the event kind

## WatchEvent.count()

```java
int count()
```

Returns the event count. If the event count is greater than {@code 1}
then this is a repeated event.

@return  the event count

## WatchEvent.context()

```java
T context()
```

Returns the context for the event.

<p> In the case of {@link StandardWatchEventKinds#ENTRY_CREATE ENTRY_CREATE},
{@link StandardWatchEventKinds#ENTRY_DELETE ENTRY_DELETE}, and {@link
StandardWatchEventKinds#ENTRY_MODIFY ENTRY_MODIFY} events the context is
a {@code Path} that is the {@link Path#relativize relative} path between
the directory registered with the watch service, and the entry that is
created, deleted, or modified.

@return  the event context; may be {@code null}