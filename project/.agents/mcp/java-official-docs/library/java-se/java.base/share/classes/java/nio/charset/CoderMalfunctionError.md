# CoderMalfunctionError class (java.nio.charset)

```java
public class CoderMalfunctionError extends Error
```

Error thrown when the {@link CharsetDecoder#decodeLoop decodeLoop} method of
a {@link CharsetDecoder}, or the {@link CharsetEncoder#encodeLoop
encodeLoop} method of a {@link CharsetEncoder}, throws an unexpected
exception.

@since 1.4

## CoderMalfunctionError.CoderMalfunctionError(Exception)

```java
public CoderMalfunctionError(Exception cause)
```

Initializes an instance of this class.

@param  cause
        The unexpected exception that was thrown