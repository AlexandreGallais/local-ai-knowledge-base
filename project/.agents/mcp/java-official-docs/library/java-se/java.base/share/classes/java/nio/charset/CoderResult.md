# CoderResult class (java.nio.charset)

```java
public final class CoderResult
```

A description of the result state of a coder.

<p> A charset coder, that is, either a decoder or an encoder, consumes bytes
(or characters) from an input buffer, translates them, and writes the
resulting characters (or bytes) to an output buffer.  A coding process
terminates for one of four categories of reasons, which are described by
instances of this class:

<ul>

  <li><p> <i>Underflow</i> is reported when there is no more input to be
  processed, or there is insufficient input and additional input is
  required.  This condition is represented by the unique result object
  {@link #UNDERFLOW}, whose {@link #isUnderflow() isUnderflow} method
  returns {@code true}.  </p></li>

  <li><p> <i>Overflow</i> is reported when there is insufficient room
  remaining in the output buffer.  This condition is represented by the
  unique result object {@link #OVERFLOW}, whose {@link #isOverflow()
  isOverflow} method returns {@code true}.  </p></li>

  <li><p> A <i>malformed-input error</i> is reported when a sequence of
  input units is not well-formed.  Such errors are described by instances of
  this class whose {@link #isMalformed() isMalformed} method returns
  {@code true} and whose {@link #length() length} method returns the length
  of the malformed sequence.  There is one unique instance of this class for
  all malformed-input errors of a given length.  </p></li>

  <li><p> An <i>unmappable-character error</i> is reported when a sequence
  of input units denotes a character that cannot be represented in the
  output charset.  Such errors are described by instances of this class
  whose {@link #isUnmappable() isUnmappable} method returns {@code true} and
  whose {@link #length() length} method returns the length of the input
  sequence denoting the unmappable character.  There is one unique instance
  of this class for all unmappable-character errors of a given length.
  </p></li>

</ul>

<p> For convenience, the {@link #isError() isError} method returns {@code true}
for result objects that describe malformed-input and unmappable-character
errors but {@code false} for those that describe underflow or overflow
conditions.  </p>


@author Mark Reinhold
@author JSR-51 Expert Group
@since 1.4

## CoderResult.toString()

```java
public String toString()
```

Returns a string describing this coder result.

@return  A descriptive string

## CoderResult.isUnderflow()

```java
public boolean isUnderflow()
```

Tells whether or not this object describes an underflow condition.

@return  {@code true} if, and only if, this object denotes underflow

## CoderResult.isOverflow()

```java
public boolean isOverflow()
```

Tells whether or not this object describes an overflow condition.

@return  {@code true} if, and only if, this object denotes overflow

## CoderResult.isError()

```java
public boolean isError()
```

Tells whether or not this object describes an error condition.

@return  {@code true} if, and only if, this object denotes either a
         malformed-input error or an unmappable-character error

## CoderResult.isMalformed()

```java
public boolean isMalformed()
```

Tells whether or not this object describes a malformed-input error.

@return  {@code true} if, and only if, this object denotes a
         malformed-input error

## CoderResult.isUnmappable()

```java
public boolean isUnmappable()
```

Tells whether or not this object describes an unmappable-character
error.

@return  {@code true} if, and only if, this object denotes an
         unmappable-character error

## CoderResult.length()

```java
public int length()
```

Returns the length of the erroneous input described by this
object&nbsp;&nbsp;<i>(optional operation)</i>.

@return  The length of the erroneous input, a positive integer

@throws  UnsupportedOperationException
         If this object does not describe an error condition, that is,
         if the {@link #isError() isError} does not return {@code true}

## CoderResult.UNDERFLOW

```java
public static final CoderResult UNDERFLOW
```

Result object indicating underflow, meaning that either the input buffer
has been completely consumed or, if the input buffer is not yet empty,
that additional input is required.

## CoderResult.OVERFLOW

```java
public static final CoderResult OVERFLOW
```

Result object indicating overflow, meaning that there is insufficient
room in the output buffer.

## CoderResult.malformedForLength(int)

```java
public static CoderResult malformedForLength(int length)
```

Static factory method that returns the unique object describing a
malformed-input error of the given length.

@param   length
         The given length

@return  The requested coder-result object

## CoderResult.unmappableForLength(int)

```java
public static CoderResult unmappableForLength(int length)
```

Static factory method that returns the unique result object describing
an unmappable-character error of the given length.

@param   length
         The given length

@return  The requested coder-result object

## CoderResult.throwException()

```java
public void throwException() throws CharacterCodingException
```

Throws an exception appropriate to the result described by this object.

@throws  BufferUnderflowException
         If this object is {@link #UNDERFLOW}

@throws  BufferOverflowException
         If this object is {@link #OVERFLOW}

@throws  MalformedInputException
         If this object represents a malformed-input error; the
         exception's length value will be that of this object

@throws  UnmappableCharacterException
         If this object represents an unmappable-character error; the
         exception's length value will be that of this object

@throws  CharacterCodingException
         {@code MalformedInputException} if this object represents a
         malformed-input error; {@code UnmappableCharacterException}
         if this object represents an unmappable-character error