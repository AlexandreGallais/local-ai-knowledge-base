# PatternSyntaxException class (java.util.regex)

```java
public class PatternSyntaxException extends IllegalArgumentException
```

Unchecked exception thrown to indicate a syntax error in a
regular-expression pattern.

@since 1.4

## PatternSyntaxException.PatternSyntaxException(String, String, int)

```java
public PatternSyntaxException(String desc, String regex, int index)
```

Constructs a new instance of this class.

@param  desc
        A description of the error

@param  regex
        The erroneous pattern

@param  index
        The approximate index in the pattern of the error,
        or {@code -1} if the index is not known

## PatternSyntaxException.getIndex()

```java
public int getIndex()
```

Retrieves the error index.

@return  The approximate index in the pattern of the error,
        or {@code -1} if the index is not known

## PatternSyntaxException.getDescription()

```java
public String getDescription()
```

Retrieves the description of the error.

@return  The description of the error

## PatternSyntaxException.getPattern()

```java
public String getPattern()
```

Retrieves the erroneous regular-expression pattern.

@return  The erroneous pattern

## PatternSyntaxException.getMessage()

```java
public String getMessage()
```

Returns a multi-line string containing the description of the syntax
error and its index, the erroneous regular-expression pattern, and a
visual indication of the error index within the pattern.

@return  The full detail message