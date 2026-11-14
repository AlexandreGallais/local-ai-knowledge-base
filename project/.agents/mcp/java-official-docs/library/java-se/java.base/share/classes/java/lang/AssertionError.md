---
title: "AssertionError class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/AssertionError.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AssertionError class (java.lang)

```java
public class AssertionError extends Error
```

Thrown to indicate that an assertion has failed.

The seven one-argument public constructors provided by this
class ensure that the assertion error returned by the invocation:

```java
    new AssertionError(<i>expression</i>)
```

has as its detail message the *string conversion* of
*expression* (as defined in section  of
*The Java Language Specification*),
regardless of the type of *expression*.

**Since:** 1.4

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
defined in section  of
*The Java Language Specification*.

If the specified object is an instance of `Throwable`, it
becomes the *cause* of the newly constructed assertion error.

Parameters:

- `detailMessage`: value to be used in constructing detail message

**See also:** Throwable#getCause()

## AssertionError.AssertionError(boolean)

```java
public AssertionError(boolean detailMessage)
```

Constructs an AssertionError with its detail message derived
from the specified `boolean`, which is converted to
a string as defined in section  of
*The Java Language Specification*.

Parameters:

- `detailMessage`: value to be used in constructing detail message

## AssertionError.AssertionError(char)

```java
public AssertionError(char detailMessage)
```

Constructs an AssertionError with its detail message derived
from the specified `char`, which is converted to a
string as defined in section  of
*The Java Language Specification*.

Parameters:

- `detailMessage`: value to be used in constructing detail message

## AssertionError.AssertionError(int)

```java
public AssertionError(int detailMessage)
```

Constructs an AssertionError with its detail message derived
from the specified `int`, which is converted to a
string as defined in section  of
*The Java Language Specification*.

Parameters:

- `detailMessage`: value to be used in constructing detail message

## AssertionError.AssertionError(long)

```java
public AssertionError(long detailMessage)
```

Constructs an AssertionError with its detail message derived
from the specified `long`, which is converted to a
string as defined in section  of
*The Java Language Specification*.

Parameters:

- `detailMessage`: value to be used in constructing detail message

## AssertionError.AssertionError(float)

```java
public AssertionError(float detailMessage)
```

Constructs an AssertionError with its detail message derived
from the specified `float`, which is converted to a
string as defined in section  of
*The Java Language Specification*.

Parameters:

- `detailMessage`: value to be used in constructing detail message

## AssertionError.AssertionError(double)

```java
public AssertionError(double detailMessage)
```

Constructs an AssertionError with its detail message derived
from the specified `double`, which is converted to a
string as defined in section  of
*The Java Language Specification*.

Parameters:

- `detailMessage`: value to be used in constructing detail message

## AssertionError.AssertionError(String, Throwable)

```java
public AssertionError(String message, Throwable cause)
```

Constructs a new `AssertionError` with the specified
detail message and cause.

Note that the detail message associated with
`cause` is *not* automatically incorporated in
this error's detail message.

Parameters:

- `message`: the detail message, may be `null`
- `cause`: the cause, may be `null`

**Since:** 1.7
