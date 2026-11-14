---
title: "Throwable class (java.lang) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Throwable.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Throwable class (java.lang)

```java
public class Throwable implements Serializable
```

The `Throwable` class is the superclass of all errors and
exceptions in the Java language. Only objects that are instances of this
class (or one of its subclasses) are thrown by the Java Virtual Machine or
can be thrown by the Java `throw` statement. Similarly, only
this class or one of its subclasses can be the argument type in a
`catch` clause.

For the purposes of compile-time checking of exceptions, `Throwable` and any subclass of `Throwable` that is not also a
subclass of either `RuntimeException` or `Error` are
regarded as checked exceptions.

Instances of two subclasses, `java.lang.Error` and
`java.lang.Exception`, are conventionally used to indicate
that exceptional situations have occurred. Typically, these instances
are freshly created in the context of the exceptional situation so
as to include relevant information (such as stack trace data).

A throwable contains a snapshot of the execution stack of its
thread at the time it was created. It can also contain a message
string that gives more information about the error. Over time, a
throwable can suppress other
throwables from being propagated.  Finally, the throwable can also
contain a *cause*: another throwable that caused this
throwable to be constructed.  The recording of this causal information
is referred to as the *chained exception* facility, as the
cause can, itself, have a cause, and so on, leading to a "chain" of
exceptions, each caused by another.

One reason that a throwable may have a cause is that the class that
throws it is built atop a lower layered abstraction, and an operation on
the upper layer fails due to a failure in the lower layer.  It would be bad
design to let the throwable thrown by the lower layer propagate outward, as
it is generally unrelated to the abstraction provided by the upper layer.
Further, doing so would tie the API of the upper layer to the details of
its implementation, assuming the lower layer's exception was a checked
exception.  Throwing a "wrapped exception" (i.e., an exception containing a
cause) allows the upper layer to communicate the details of the failure to
its caller without incurring either of these shortcomings.  It preserves
the flexibility to change the implementation of the upper layer without
changing its API (in particular, the set of exceptions thrown by its
methods).

A second reason that a throwable may have a cause is that the method
that throws it must conform to a general-purpose interface that does not
permit the method to throw the cause directly.  For example, suppose
a persistent collection conforms to the Collection interface, and that its persistence is implemented atop
`java.io`.  Suppose the internals of the `add` method
can throw an IOException.  The implementation
can communicate the details of the `IOException` to its caller
while conforming to the `Collection` interface by wrapping the
`IOException` in an appropriate unchecked exception.  (The
specification for the persistent collection should indicate that it is
capable of throwing such exceptions.)

A cause can be associated with a throwable in two ways: via a
constructor that takes the cause as an argument, or via the
`initCause(Throwable)` method.  New throwable classes that
wish to allow causes to be associated with them should provide constructors
that take a cause and delegate (perhaps indirectly) to one of the
`Throwable` constructors that takes a cause.

Because the `initCause` method is public, it allows a cause to be
associated with any throwable, even a "legacy throwable" whose
implementation predates the addition of the exception chaining mechanism to
`Throwable`.

By convention, class `Throwable` and its subclasses have two
constructors, one that takes no arguments and one that takes a
`String` argument that can be used to produce a detail message.
Further, those subclasses that might likely have a cause associated with
them should have two more constructors, one that takes a
`Throwable` (the cause), and one that takes a
`String` (the detail message) and a `Throwable` (the
cause).

**JLS:** 11.2 Compile-Time Checking of Exceptions

**Since:** 1.0

## Throwable.STACK_TRACE_ELEMENT_SENTINEL

```java
public static final StackTraceElement STACK_TRACE_ELEMENT_SENTINEL
```

Setting the stack trace to a one-element array containing this sentinel
value indicates future attempts to set the stack trace will be
ignored.  The sentinel is equal to the result of calling:

`new StackTraceElement("", "", null, Integer.MIN_VALUE)`

## Throwable.STACK_TRACE_SENTINEL

```java
public static final StackTraceElement[] STACK_TRACE_SENTINEL
```

Sentinel value used in the serial form to indicate an immutable
stack trace.

## Throwable.Throwable()

```java
public Throwable()
```

Constructs a new throwable with `null` as its detail message.
The cause is not initialized, and may subsequently be initialized by a
call to `initCause`.

The `fillInStackTrace()` method is called to initialize
the stack trace data in the newly created throwable.

## Throwable.Throwable(String)

```java
public Throwable(String message)
```

Constructs a new throwable with the specified detail message.  The
cause is not initialized, and may subsequently be initialized by
a call to `initCause`.

The `fillInStackTrace()` method is called to initialize
the stack trace data in the newly created throwable.

Parameters:

- `message`: the detail message. The detail message is saved for later retrieval by the `getMessage()` method.

## Throwable.Throwable(String, Throwable)

```java
public Throwable(String message, Throwable cause)
```

Constructs a new throwable with the specified detail message and
cause.

Note that the detail message associated with
`cause` is *not* automatically incorporated in
this throwable's detail message.

The `fillInStackTrace()` method is called to initialize
the stack trace data in the newly created throwable.

Parameters:

- `message`: the detail message (which is saved for later retrieval by the `getMessage()` method).
- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.4

## Throwable.Throwable(Throwable)

```java
public Throwable(Throwable cause)
```

Constructs a new throwable with the specified cause and a detail
message of `(cause==null ? null : cause.toString())` (which
typically contains the class and detail message of `cause`).
This constructor is useful for throwables that are little more than
wrappers for other throwables (for example, `java.security.PrivilegedActionException`).

The `fillInStackTrace()` method is called to initialize
the stack trace data in the newly created throwable.

Parameters:

- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.4

## Throwable.Throwable(String, Throwable, boolean, boolean)

```java
protected Throwable(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace)
```

Constructs a new throwable with the specified detail message,
cause, suppression enabled or
disabled, and writable stack trace enabled or disabled.  If
suppression is disabled, `getSuppressed` for this object
will return a zero-length array and calls to `addSuppressed` that would otherwise append an exception to the
suppressed list will have no effect.  If the writable stack
trace is false, this constructor will not call `fillInStackTrace()`, a `null` will be written to the
`stackTrace` field, and subsequent calls to `fillInStackTrace` and `setStackTrace(StackTraceElement[])` will not set the stack
trace.  If the writable stack trace is false, `getStackTrace` will return a zero length array.

Note that the other constructors of `Throwable` treat
suppression as being enabled and the stack trace as being
writable.  Subclasses of `Throwable` should document any
conditions under which suppression is disabled and document
conditions under which the stack trace is not writable.
Disabling of suppression should only occur in exceptional
circumstances where special requirements exist, such as a
virtual machine reusing exception objects under low-memory
situations.  Circumstances where a given exception object is
repeatedly caught and rethrown, such as to implement control
flow between two sub-systems, is another situation where
immutable throwable objects would be appropriate.

Parameters:

- `message`: the detail message.
- `cause`: the cause. (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)
- `enableSuppression`: whether or not suppression is enabled
- `writableStackTrace`: whether or not the stack trace is writable

**See also:** OutOfMemoryError

**See also:** NullPointerException

**See also:** ArithmeticException

**Since:** 1.7

## Throwable.getMessage()

```java
public String getMessage()
```

Returns the detail message string of this throwable.

**Returns:** the detail message string of this `Throwable` instance
         (which may be `null`).

## Throwable.getLocalizedMessage()

```java
public String getLocalizedMessage()
```

Creates a localized description of this throwable.
Subclasses may override this method in order to produce a
locale-specific message.  For subclasses that do not override this
method, the default implementation returns the same result as
`getMessage()`.

**Returns:** The localized description of this throwable.

**Since:** 1.1

## Throwable.getCause()

```java
public synchronized Throwable getCause()
```

Returns the cause of this throwable or `null` if the
cause is nonexistent or unknown.  (The cause is the throwable that
caused this throwable to get thrown.)

This implementation returns the cause that was supplied via one of
the constructors requiring a `Throwable`, or that was set after
creation with the `initCause(Throwable)` method.  While it is
typically unnecessary to override this method, a subclass can override
it to return a cause set by some other means.  This is appropriate for
a "legacy chained throwable" that predates the addition of chained
exceptions to `Throwable`.  Note that it is *not*
necessary to override any of the `PrintStackTrace` methods,
all of which invoke the `getCause` method to determine the
cause of a throwable.

**Returns:** the cause of this throwable or `null` if the
         cause is nonexistent or unknown.

**Since:** 1.4

## Throwable.initCause(Throwable)

```java
public synchronized Throwable initCause(Throwable cause)
```

Initializes the *cause* of this throwable to the specified value.
(The cause is the throwable that caused this throwable to get thrown.)

This method can be called at most once.  It is generally called from
within the constructor, or immediately after creating the
throwable.  If this throwable was created
with `Throwable(Throwable)` or
`Throwable(String,Throwable)`, this method cannot be called
even once.

An example of using this method on a legacy throwable type
without other support for setting the cause is:

```java
try {
    lowLevelOp();
} catch (LowLevelException le) {
    throw (HighLevelException)
          new HighLevelException().initCause(le); // Legacy constructor
```

Parameters:

- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Returns:** a reference to this `Throwable` instance.

**Since:** 1.4

Throws:

- `IllegalArgumentException`: if `cause` is this throwable. (A throwable cannot be its own cause.)
- `IllegalStateException`: if this throwable was created with `Throwable(Throwable)` or `Throwable(String,Throwable)`, or this method has already been called on this throwable.

## Throwable.toString()

```java
public String toString()
```

Returns a short description of this throwable.
The result is the concatenation of:

-  the name of the class of this object

-  ": " (a colon and a space)

-  the result of invoking this object's `getLocalizedMessage`
     method

If `getLocalizedMessage` returns `null`, then just
the class name is returned.

**Returns:** a string representation of this throwable.
