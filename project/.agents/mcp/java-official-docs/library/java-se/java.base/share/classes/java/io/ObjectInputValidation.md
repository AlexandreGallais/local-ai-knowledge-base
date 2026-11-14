# ObjectInputValidation interface (java.io)

```java
public interface ObjectInputValidation
```

Callback interface to allow validation of objects within a graph.
Allows an object to be called when a complete graph of objects has
been deserialized.

@see     ObjectInputStream
@see     ObjectInputStream#registerValidation(java.io.ObjectInputValidation, int)
@since   1.1

## ObjectInputValidation.validateObject()

```java
public void validateObject() throws InvalidObjectException
```

Validates the object.

@throws    InvalidObjectException If the object cannot validate itself.