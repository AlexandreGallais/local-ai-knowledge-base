# InvalidPathException class (java.nio.file)

```java
public class InvalidPathException extends IllegalArgumentException
```

Unchecked exception thrown when path string cannot be converted into a
{@link Path} because the path string contains invalid characters, or
the path string is invalid for other file system specific reasons.

@since 1.7

## InvalidPathException.InvalidPathException(String, String, int)

```java
public InvalidPathException(String input, String reason, int index)
```

Constructs an instance from the given input string, reason, and error
index.

@param  input   the input string
@param  reason  a string explaining why the input was rejected
@param  index   the index at which the error occurred,
                or {@code -1} if the index is not known

@throws  NullPointerException
         if either the input or reason strings are {@code null}

@throws  IllegalArgumentException
         if the error index is less than {@code -1}

## InvalidPathException.InvalidPathException(String, String)

```java
public InvalidPathException(String input, String reason)
```

Constructs an instance from the given input string and reason.  The
resulting object will have an error index of {@code -1}.

@param  input   the input string
@param  reason  a string explaining why the input was rejected

@throws  NullPointerException
         if either the input or reason strings are {@code null}

## InvalidPathException.getInput()

```java
public String getInput()
```

Returns the input string.

@return  the input string

## InvalidPathException.getReason()

```java
public String getReason()
```

Returns a string explaining why the input string was rejected.

@return  the reason string

## InvalidPathException.getIndex()

```java
public int getIndex()
```

Returns an index into the input string of the position at which the
error occurred, or {@code -1} if this position is not known.

@return  the error index

## InvalidPathException.getMessage()

```java
public String getMessage()
```

Returns a string describing the error.  The resulting string
consists of the reason string followed by a colon character
({@code ':'}), a space, and the input string.  If the error index is
defined then the string {@code " at index "} followed by the index, in
decimal, is inserted after the reason string and before the colon
character.

@return  a string describing the error