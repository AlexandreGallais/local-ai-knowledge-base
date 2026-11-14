# NullPointerException class (java.lang)

```java
public class NullPointerException extends RuntimeException
```

Thrown when an application attempts to use {@code null} in a
case where an object is required. These include:
<ul>
<li>Calling the instance method of a {@code null} object.
<li>Accessing or modifying the field of a {@code null} object.
<li>Taking the length of {@code null} as if it were an array.
<li>Accessing or modifying the slots of {@code null} as if it
    were an array.
<li>Throwing {@code null} as if it were a {@code Throwable}
    value.
</ul>
<p>
Applications should throw instances of this class to indicate
other illegal uses of the {@code null} object.

{@code NullPointerException} objects may be constructed by the
virtual machine as if {@linkplain Throwable#Throwable(String,
Throwable, boolean, boolean) suppression were disabled and/or the
stack trace was not writable}.

@since   1.0

## NullPointerException.NullPointerException()

```java
public NullPointerException()
```

Constructs a {@code NullPointerException} with no detail message.

## NullPointerException.NullPointerException(String)

```java
public NullPointerException(String s)
```

Constructs a {@code NullPointerException} with the specified
detail message.

@param   s   the detail message.

## NullPointerException.fillInStackTrace()

```java
public synchronized Throwable fillInStackTrace()
```

{@inheritDoc}

## NullPointerException.getMessage()

```java
public String getMessage()
```

Returns the detail message string of this throwable.

<p> If a non-null message was supplied in a constructor it is
returned. Otherwise, an implementation specific message or
{@code null} is returned.

@implNote
If no explicit message was passed to the constructor, and as
long as certain internal information is available, a verbose
description of the null reference is returned.
The internal information is not available in deserialized
NullPointerExceptions.

@return the detail message string, which may be {@code null}.