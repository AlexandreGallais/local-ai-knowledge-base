# DateTimeParseException class (java.time.format)

```java
public class DateTimeParseException extends DateTimeException
```

An exception thrown when an error occurs during parsing.
<p>
This exception includes the text being parsed and the error index.

@implSpec
This class is intended for use in a single thread.

@since 1.8

## DateTimeParseException.DateTimeParseException(String, CharSequence, int)

```java
public DateTimeParseException(String message, CharSequence parsedData, int errorIndex)
```

Constructs a new exception with the specified message.

@param message  the message to use for this exception, may be null
@param parsedData  the parsed text, should not be null
@param errorIndex  the index in the parsed string that was invalid, should be a valid index

## DateTimeParseException.DateTimeParseException(String, CharSequence, int, Throwable)

```java
public DateTimeParseException(String message, CharSequence parsedData, int errorIndex, Throwable cause)
```

Constructs a new exception with the specified message and cause.

@param message  the message to use for this exception, may be null
@param parsedData  the parsed text, should not be null
@param errorIndex  the index in the parsed string that was invalid, should be a valid index
@param cause  the cause exception, may be null

## DateTimeParseException.getParsedString()

```java
public String getParsedString()
```

Returns the string that was being parsed.

@return the string that was being parsed, should not be null.

## DateTimeParseException.getErrorIndex()

```java
public int getErrorIndex()
```

Returns the index where the error was found.

@return the index in the parsed string that was invalid, should be a valid index