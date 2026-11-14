# MalformedInputException class (java.nio.charset)

```java
public class MalformedInputException extends CharacterCodingException
```

Checked exception thrown when an input byte sequence is not legal for given
charset, or an input character sequence is not a legal sixteen-bit Unicode
sequence.

@since 1.4

## MalformedInputException.MalformedInputException(int)

```java
public MalformedInputException(int inputLength)
```

Constructs an {@code MalformedInputException} with the given
length.
@param inputLength the length of the input

## MalformedInputException.getInputLength()

```java
public int getInputLength()
```

{@return the length of the input}

## MalformedInputException.getMessage()

```java
public String getMessage()
```

{@return the message}