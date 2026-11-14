# UnmappableCharacterException class (java.nio.charset)

```java
public class UnmappableCharacterException extends CharacterCodingException
```

Checked exception thrown when an input character (or byte) sequence
is valid but cannot be mapped to an output byte (or character)
sequence.

@since 1.4

## UnmappableCharacterException.UnmappableCharacterException(int)

```java
public UnmappableCharacterException(int inputLength)
```

Constructs an {@code UnmappableCharacterException} with the
given length.
@param inputLength the length of the input

## UnmappableCharacterException.getInputLength()

```java
public int getInputLength()
```

{@return the length of the input}

## UnmappableCharacterException.getMessage()

```java
public String getMessage()
```

{@return the message}