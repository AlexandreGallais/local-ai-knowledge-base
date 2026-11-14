# CodingErrorAction class (java.nio.charset)

```java
public final class CodingErrorAction
```

A typesafe enumeration for coding-error actions.

<p> Instances of this class are used to specify how malformed-input and
unmappable-character errors are to be handled by charset <a
href="CharsetDecoder.html#cae">decoders</a> and <a
href="CharsetEncoder.html#cae">encoders</a>.  </p>


@author Mark Reinhold
@author JSR-51 Expert Group
@since 1.4

## CodingErrorAction.IGNORE

```java
public static final CodingErrorAction IGNORE
```

Action indicating that a coding error is to be handled by dropping the
erroneous input and resuming the coding operation.

## CodingErrorAction.REPLACE

```java
public static final CodingErrorAction REPLACE
```

Action indicating that a coding error is to be handled by dropping the
erroneous input, appending the coder's replacement value to the output
buffer, and resuming the coding operation.

## CodingErrorAction.REPORT

```java
public static final CodingErrorAction REPORT
```

Action indicating that a coding error is to be reported, either by
returning a {@link CoderResult} object or by throwing a {@link
CharacterCodingException}, whichever is appropriate for the method
implementing the coding process.

## CodingErrorAction.toString()

```java
public String toString()
```

Returns a string describing this action.

@return  A descriptive string