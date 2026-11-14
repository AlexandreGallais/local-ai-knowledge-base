---
title: "Throwable class (java.lang) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Throwable.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Throwable class (java.lang) (part 2 of 2)

## Throwable.printStackTrace()

```java
public void printStackTrace()
```

Prints this throwable and its backtrace to the
standard error stream. This method prints a stack trace for this
`Throwable` object on the error output stream that is
the value of the field `System.err`. The first line of
output contains the result of the `toString()` method for
this object.  Remaining lines represent data previously recorded by
the method `fillInStackTrace()`. The format of this
information depends on the implementation, but the following
example may be regarded as typical:

```java
java.lang.NullPointerException
        at MyClass.mash(MyClass.java:9)
        at MyClass.crunch(MyClass.java:6)
        at MyClass.main(MyClass.java:3)
```

This example was produced by running the program:

```java
class MyClass {
    public static void main(String[] args) {
        crunch(null);
    }
    static void crunch(int[] a) {
        mash(a);
    }
    static void mash(int[] b) {
        System.out.println(b[0]);
    }
```

The backtrace for a throwable with an initialized, non-null cause
should generally include the backtrace for the cause.  The format
of this information depends on the implementation, but the following
example may be regarded as typical:

```java
HighLevelException: MidLevelException: LowLevelException
        at Junk.a(Junk.java:13)
        at Junk.main(Junk.java:4)
Caused by: MidLevelException: LowLevelException
        at Junk.c(Junk.java:23)
        at Junk.b(Junk.java:17)
        at Junk.a(Junk.java:11)
        ... 1 more
Caused by: LowLevelException
        at Junk.e(Junk.java:30)
        at Junk.d(Junk.java:27)
        at Junk.c(Junk.java:21)
        ... 3 more
```

Note the presence of lines containing the characters `"..."`.
These lines indicate that the remainder of the stack trace for this
exception matches the indicated number of frames from the bottom of the
stack trace of the exception that was caused by this exception (the
"enclosing" exception).  This shorthand can greatly reduce the length
of the output in the common case where a wrapped exception is thrown
from the same method as the "causative exception" is caught.  The above
example was produced by running the program:

```java
public class Junk {
    public static void main(String args[]) {
        try {
            a();
        } catch(HighLevelException e) {
            e.printStackTrace();
        }
    }
    static void a() throws HighLevelException {
        try {
            b();
        } catch(MidLevelException e) {
            throw new HighLevelException(e);
        }
    }
    static void b() throws MidLevelException {
        c();
    }
    static void c() throws MidLevelException {
        try {
            d();
        } catch(LowLevelException e) {
            throw new MidLevelException(e);
        }
    }
    static void d() throws LowLevelException {
       e();
    }
    static void e() throws LowLevelException {
        throw new LowLevelException();
    }
}

class HighLevelException extends Exception {
    HighLevelException(Throwable cause) { super(cause); }
}

class MidLevelException extends Exception {
    MidLevelException(Throwable cause)  { super(cause); }
}

class LowLevelException extends Exception {
```

As of release 7, the platform supports the notion of
*suppressed exceptions* (in conjunction with the `try`-with-resources statement). Any exceptions that were
suppressed in order to deliver an exception are printed out
beneath the stack trace.  The format of this information
depends on the implementation, but the following example may be
regarded as typical:

```java
Exception in thread "main" java.lang.Exception: Something happened
        at Foo.bar(Foo.java:10)
        at Foo.main(Foo.java:5)
        Suppressed: Resource$CloseFailException: Resource ID = 0
                at Resource.close(Resource.java:26)
                at Foo.bar(Foo.java:9)
                ... 1 more
```

Note that the "... n more" notation is used on suppressed exceptions
just as it is used on causes. Unlike causes, suppressed exceptions are
indented beyond their "containing exceptions."

An exception can have both a cause and one or more suppressed
exceptions:

```java
Exception in thread "main" java.lang.Exception: Main block
        at Foo3.main(Foo3.java:7)
        Suppressed: Resource$CloseFailException: Resource ID = 2
                at Resource.close(Resource.java:26)
                at Foo3.main(Foo3.java:5)
        Suppressed: Resource$CloseFailException: Resource ID = 1
                at Resource.close(Resource.java:26)
                at Foo3.main(Foo3.java:5)
Caused by: java.lang.Exception: I did it
        at Foo3.main(Foo3.java:8)
```

Likewise, a suppressed exception can have a cause:

```java
Exception in thread "main" java.lang.Exception: Main block
        at Foo4.main(Foo4.java:6)
        Suppressed: Resource2$CloseFailException: Resource ID = 1
                at Resource2.close(Resource2.java:20)
                at Foo4.main(Foo4.java:5)
        Caused by: java.lang.Exception: Rats, you caught me
                at Resource2$CloseFailException.<init>(Resource2.java:45)
                ... 2 more
```

## Throwable.printStackTrace(PrintStream)

```java
public void printStackTrace(PrintStream s)
```

Prints this throwable and its backtrace to the specified print stream.

Parameters:

- `s`: `PrintStream` to use for output

## Throwable.printStackTrace(PrintWriter)

```java
public void printStackTrace(PrintWriter s)
```

Prints this throwable and its backtrace to the specified
print writer.

Parameters:

- `s`: `PrintWriter` to use for output

**Since:** 1.1

## Throwable.fillInStackTrace()

```java
public synchronized Throwable fillInStackTrace()
```

Fills in the execution stack trace. This method records within this
`Throwable` object information about the current state of
the stack frames for the current thread.

If the stack trace of this `Throwable` Throwable, boolean, boolean) is not writable, calling this method has no effect.

**Returns:** a reference to this `Throwable` instance.

**See also:** java.lang.Throwable#printStackTrace()

## Throwable.getStackTrace()

```java
public StackTraceElement[] getStackTrace()
```

Provides programmatic access to the stack trace information printed by
`printStackTrace()`.  Returns an array of stack trace elements,
each representing one stack frame.  The zeroth element of the array
(assuming the array's length is non-zero) represents the top of the
stack, which is the last method invocation in the sequence.  Typically,
this is the point at which this throwable was created and thrown.
The last element of the array (assuming the array's length is non-zero)
represents the bottom of the stack, which is the first method invocation
in the sequence.

Some virtual machines may, under some circumstances, omit one
or more stack frames from the stack trace.  In the extreme case,
a virtual machine that has no stack trace information concerning
this throwable is permitted to return a zero-length array from this
method.  Generally speaking, the array returned by this method will
contain one element for every frame that would be printed by
`printStackTrace`.  Writes to the returned array do not
affect future calls to this method.

**Returns:** an array of stack trace elements representing the stack trace
        pertaining to this throwable.

**Since:** 1.4

## Throwable.setStackTrace(StackTraceElement[])

```java
public void setStackTrace(StackTraceElement[] stackTrace)
```

Sets the stack trace elements that will be returned by
`getStackTrace()` and printed by `printStackTrace()`
and related methods.

This method, which is designed for use by RPC frameworks and other
advanced systems, allows the client to override the default
stack trace that is either generated by `fillInStackTrace()`
when a throwable is constructed or deserialized when a throwable is
read from a serialization stream.

If the stack trace of this `Throwable` Throwable, boolean, boolean) is not writable, calling this method has no effect other than
validating its argument.

Parameters:

- `stackTrace`: the stack trace elements to be associated with this `Throwable`. The specified array is copied by this call; changes in the specified array after the method invocation returns will have no effect on this `Throwable`'s stack trace.

**Since:** 1.4

Throws:

- `NullPointerException`: if `stackTrace` is `null` or if any of the elements of `stackTrace` are `null`

## Throwable.addSuppressed(Throwable)

```java
public final synchronized void addSuppressed(Throwable exception)
```

Appends the specified exception to the exceptions that were
suppressed in order to deliver this exception. This method is
thread-safe and typically called (automatically and implicitly)
by the `try`-with-resources statement.

The suppression behavior is enabled *unless* disabled
Throwable, boolean, boolean) via a constructor.  When suppression is disabled, this method does
nothing other than to validate its argument.

Note that when one exception causes another exception, the first
exception is usually caught and then the second exception is
thrown in response.  In other words, there is a causal
connection between the two exceptions.

In contrast, there are situations where two independent
exceptions can be thrown in sibling code blocks, in particular
in the `try` block of a `try`-with-resources
statement and the compiler-generated `finally` block
which closes the resource.

In these situations, only one of the thrown exceptions can be
propagated.  In the `try`-with-resources statement, when
there are two such exceptions, the exception originating from
the `try` block is propagated and the exception from the
`finally` block is added to the list of exceptions
suppressed by the exception from the `try` block.  As an
exception unwinds the stack, it can accumulate multiple
suppressed exceptions.

An exception may have suppressed exceptions while also being
caused by another exception.  Whether or not an exception has a
cause is semantically known at the time of its creation, unlike
whether or not an exception will suppress other exceptions
which is typically only determined after an exception is
thrown.

Note that programmer written code is also able to take
advantage of calling this method in situations where there are
multiple sibling exceptions and only one can be propagated.

Parameters:

- `exception`: the exception to be added to the list of suppressed exceptions

**Since:** 1.7

Throws:

- `IllegalArgumentException`: if `exception` is this throwable; a throwable cannot suppress itself.
- `NullPointerException`: if `exception` is `null`

## Throwable.getSuppressed()

```java
public final synchronized Throwable[] getSuppressed()
```

Returns an array containing all of the exceptions that were
suppressed, typically by the `try`-with-resources
statement, in order to deliver this exception.

If no exceptions were suppressed or Throwable, boolean, boolean) suppression is disabled, an empty array is returned.  This method is
thread-safe.  Writes to the returned array do not affect future
calls to this method.

**Returns:** an array containing all of the exceptions that were
        suppressed to deliver this exception.

**Since:** 1.7
