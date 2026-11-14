# NotSerializableException class (java.io)

```java
public class NotSerializableException extends ObjectStreamException
```

Thrown when an instance is required to have a Serializable interface.
The serialization runtime or the class of the instance can throw
this exception. The argument should be the name of the class.

@since   1.1

## NotSerializableException.NotSerializableException(String)

```java
public NotSerializableException(String classname)
```

Constructs a NotSerializableException object with message string.

@param classname Class of the instance being serialized/deserialized.

## NotSerializableException.NotSerializableException()

```java
public NotSerializableException()
```

Constructs a NotSerializableException object.