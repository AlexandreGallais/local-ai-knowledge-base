# ParseException class (java.text)

```java
public class ParseException extends Exception
```

Signals that an error has been reached unexpectedly
while parsing.
@see java.lang.Exception
@see java.text.Format
@see java.text.FieldPosition
@author      Mark Davis
@since 1.1

## ParseException.ParseException(String, int)

```java
public ParseException(String s, int errorOffset)
```

Constructs a ParseException with the specified detail message and
offset.
A detail message is a String that describes this particular exception.

@param s the detail message
@param errorOffset the position where the error is found while parsing.

## ParseException.getErrorOffset()

```java
public int getErrorOffset ()
```

Returns the position where the error was found.

@return the position where the error was found