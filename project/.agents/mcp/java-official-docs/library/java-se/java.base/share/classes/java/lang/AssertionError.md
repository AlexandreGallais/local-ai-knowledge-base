# AssertionError class (java.lang)

```java
public class AssertionError extends Error
```

Thrown to indicate that an assertion has failed.

<p>The seven one-argument public constructors provided by this
class ensure that the assertion error returned by the invocation:
<pre>
    new AssertionError(<i>expression</i>)
</pre>
has as its detail message the <i>string conversion</i> of
<i>expression</i> (as defined in section {@jls 5.1.11} of
<cite>The Java Language Specification</cite>),
regardless of the type of <i>expression</i>.

@since   1.4

## AssertionError.AssertionError()

```java
public AssertionError()
```

Constructs an AssertionError with no detail message.

## AssertionError.AssertionError(Object)

```java
public AssertionError(Object detailMessage)
```

Constructs an AssertionError with its detail message derived
from the specified object, which is converted to a string as
defined in section {@jls 5.1.11} of
<cite>The Java Language Specification</cite>.
<p>
If the specified object is an instance of {@code Throwable}, it
becomes the <i>cause</i> of the newly constructed assertion error.

@param detailMessage value to be used in constructing detail message
@see   Throwable#getCause()

## AssertionError.AssertionError(boolean)

```java
public AssertionError(boolean detailMessage)
```

Constructs an AssertionError with its detail message derived
from the specified {@code boolean}, which is converted to
a string as defined in section {@jls 5.1.11} of
<cite>The Java Language Specification</cite>.

@param detailMessage value to be used in constructing detail message

## AssertionError.AssertionError(char)

```java
public AssertionError(char detailMessage)
```

Constructs an AssertionError with its detail message derived
from the specified {@code char}, which is converted to a
string as defined in section {@jls 5.1.11} of
<cite>The Java Language Specification</cite>.

@param detailMessage value to be used in constructing detail message

## AssertionError.AssertionError(int)

```java
public AssertionError(int detailMessage)
```

Constructs an AssertionError with its detail message derived
from the specified {@code int}, which is converted to a
string as defined in section {@jls 5.1.11} of
<cite>The Java Language Specification</cite>.

@param detailMessage value to be used in constructing detail message

## AssertionError.AssertionError(long)

```java
public AssertionError(long detailMessage)
```

Constructs an AssertionError with its detail message derived
from the specified {@code long}, which is converted to a
string as defined in section {@jls 5.1.11} of
<cite>The Java Language Specification</cite>.

@param detailMessage value to be used in constructing detail message

## AssertionError.AssertionError(float)

```java
public AssertionError(float detailMessage)
```

Constructs an AssertionError with its detail message derived
from the specified {@code float}, which is converted to a
string as defined in section {@jls 5.1.11} of
<cite>The Java Language Specification</cite>.

@param detailMessage value to be used in constructing detail message

## AssertionError.AssertionError(double)

```java
public AssertionError(double detailMessage)
```

Constructs an AssertionError with its detail message derived
from the specified {@code double}, which is converted to a
string as defined in section {@jls 5.1.11} of
<cite>The Java Language Specification</cite>.

@param detailMessage value to be used in constructing detail message

## AssertionError.AssertionError(String, Throwable)

```java
public AssertionError(String message, Throwable cause)
```

Constructs a new {@code AssertionError} with the specified
detail message and cause.

<p>Note that the detail message associated with
{@code cause} is <i>not</i> automatically incorporated in
this error's detail message.

@param  message the detail message, may be {@code null}
@param  cause the cause, may be {@code null}

@since 1.7