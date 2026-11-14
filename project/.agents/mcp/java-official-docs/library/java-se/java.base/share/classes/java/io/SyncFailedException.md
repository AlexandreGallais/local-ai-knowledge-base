# SyncFailedException class (java.io)

```java
public class SyncFailedException extends IOException
```

Signals that a sync operation has failed.

@author  Ken Arnold
@see     java.io.FileDescriptor#sync
@see     java.io.IOException
@since   1.1

## SyncFailedException.SyncFailedException(String)

```java
public SyncFailedException(String desc)
```

Constructs an SyncFailedException with a detail message.
A detail message is a String that describes this particular exception.

@param desc  a String describing the exception.