# IllformedLocaleException class (java.util)

```java
public class IllformedLocaleException extends RuntimeException
```

Thrown by methods in {@link Locale} and {@link Locale.Builder} to
indicate that an argument is not a well-formed BCP 47 tag.

@see Locale
@since 1.7

## IllformedLocaleException.IllformedLocaleException()

```java
public IllformedLocaleException()
```

Constructs a new {@code IllformedLocaleException} with no
detail message and -1 as the error index.

## IllformedLocaleException.IllformedLocaleException(String)

```java
public IllformedLocaleException(String message)
```

Constructs a new {@code IllformedLocaleException} with the
given message and -1 as the error index.

@param message the message

## IllformedLocaleException.IllformedLocaleException(String, int)

```java
public IllformedLocaleException(String message, int errorIndex)
```

Constructs a new {@code IllformedLocaleException} with the
given message and the error index.  The error index is the approximate
offset from the start of the ill-formed value to the point where the
parse first detected an error.  A negative error index value indicates
either the error index is not applicable or unknown.

@param message the message
@param errorIndex the index

## IllformedLocaleException.getErrorIndex()

```java
public int getErrorIndex()
```

Returns the index where the error was found. A negative value indicates
either the error index is not applicable or unknown.

@return the error index