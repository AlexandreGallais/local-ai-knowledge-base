# URISyntaxException class (java.net)

```java
public class URISyntaxException extends Exception
```

Checked exception thrown to indicate that a string could not be parsed as a
URI reference.

@author Mark Reinhold
@see URI
@since 1.4

## URISyntaxException.URISyntaxException(String, String, int)

```java
public URISyntaxException(String input, String reason, int index)
```

Constructs an instance from the given input string, reason, and error
index.

@param  input   The input string
@param  reason  A string explaining why the input could not be parsed
@param  index   The index at which the parse error occurred,
                or {@code -1} if the index is not known

@throws  NullPointerException
         If either the input or reason strings are {@code null}

@throws  IllegalArgumentException
         If the error index is less than {@code -1}

## URISyntaxException.URISyntaxException(String, String)

```java
public URISyntaxException(String input, String reason)
```

Constructs an instance from the given input string and reason.  The
resulting object will have an error index of {@code -1}.

@param  input   The input string
@param  reason  A string explaining why the input could not be parsed

@throws  NullPointerException
         If either the input or reason strings are {@code null}

## URISyntaxException.getInput()

```java
public String getInput()
```

Returns the input string.

@return  The input string

## URISyntaxException.getReason()

```java
public String getReason()
```

Returns a string explaining why the input string could not be parsed.

@return  The reason string

## URISyntaxException.getIndex()

```java
public int getIndex()
```

Returns an index into the input string of the position at which the
parse error occurred, or {@code -1} if this position is not known.

@return  The error index

## URISyntaxException.getMessage()

```java
public String getMessage()
```

Returns a string describing the parse error.  The resulting string
consists of the reason string followed by a colon character
({@code ':'}), a space, and the input string.  If the error index is
defined then the string {@code " at index "} followed by the index, in
decimal, is inserted after the reason string and before the colon
character.

@return  A string describing the parse error