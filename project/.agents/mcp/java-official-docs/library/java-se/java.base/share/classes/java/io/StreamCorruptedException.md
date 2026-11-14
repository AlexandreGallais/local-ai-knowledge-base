# StreamCorruptedException class (java.io)

```java
public class StreamCorruptedException extends ObjectStreamException
```

Thrown when control information that was read from an object stream
violates internal consistency checks.

@since   1.1

## StreamCorruptedException.StreamCorruptedException(String)

```java
public StreamCorruptedException(String reason)
```

Create a StreamCorruptedException and list a reason why thrown.

@param reason  String describing the reason for the exception.

## StreamCorruptedException.StreamCorruptedException()

```java
public StreamCorruptedException()
```

Create a StreamCorruptedException and list no reason why thrown.