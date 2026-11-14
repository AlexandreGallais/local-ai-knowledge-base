---
title: "StackWalker class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/StackWalker.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# StackWalker class (java.lang)

```java
public final class StackWalker
```

A stack walker.

 The walk method opens a sequential stream
of StackFrames for the current thread and then applies
the given function to walk the `StackFrame` stream.
The stream reports stack frame elements in order, from the top most frame
that represents the execution point at which the stack was generated to
the bottom most frame.
The `StackFrame` stream is closed when the `walk` method returns.
If an attempt is made to reuse the closed stream,
`IllegalStateException` will be thrown.

 *Stack walker options* configure the stack frame
information obtained by a `StackWalker`.
By default, the class name and method information are collected but
not the Class reference.
The method information can be dropped via the DROP_METHOD_INFO option. The `Class` object can be retained for
access via the RETAIN_CLASS_REFERENCE option.
Stack frames of the reflection API and implementation classes are
hidden by default.

 `StackWalker` is thread-safe. Multiple threads can share
a single `StackWalker` object to traverse its own stack.

**API note:** Examples

1. To find the first caller filtering out a known list of implementation class:

2. To snapshot the top 10 stack frames of the current thread,

Unless otherwise noted, passing a `null` argument to a
constructor or method in this `StackWalker` class
will cause a NullPointerException
to be thrown.

**Since:** 9

## StackWalker.getClassName()

```java
public String getClassName()
```

**JLS:** 13.1 The Form of a Binary

## StackWalker.getMethodName()

```java
public String getMethodName()
```

Throws:

- `UnsupportedOperationException`: if the `StackWalker` is configured with DROP_METHOD_INFO option

## StackWalker.getDeclaringClass()

```java
public Class<?> getDeclaringClass()
```

Throws:

- `UnsupportedOperationException`: if the `StackWalker` is configured without RETAIN_CLASS_REFERENCE option

## StackWalker.getMethodType()

```java
public default MethodType getMethodType()
```

Returns the `MethodType` representing the parameter types and
the return type for the method represented by this stack frame.

**Implementation requirements:** The default implementation throws `UnsupportedOperationException`.

**Returns:** the `MethodType` of the method represented by this stack frame

**Since:** 10

Throws:

- `UnsupportedOperationException`: if the `StackWalker` is configured with DROP_METHOD_INFO option or without RETAIN_CLASS_REFERENCE option

## StackWalker.getDescriptor()

```java
public default String getDescriptor()
```

Returns the *descriptor* of the method represented by
this stack frame as defined by
*The Java Virtual Machine Specification*.

**Implementation requirements:** The default implementation throws `UnsupportedOperationException`.

**Returns:** the descriptor of the method represented by
        this stack frame

**See also:** MethodType#fromMethodDescriptorString(String, ClassLoader)

**See also:** MethodType#toMethodDescriptorString()

**jvms:** 4.3.3 Method Descriptors

**Since:** 10

Throws:

- `UnsupportedOperationException`: if the `StackWalker` is configured with DROP_METHOD_INFO option

## StackWalker.getByteCodeIndex()

```java
public int getByteCodeIndex()
```

Returns the index to the code array of the `Code` attribute
containing the execution point represented by this stack frame.
The code array gives the actual bytes of Java Virtual Machine code
that implement the method.

**Returns:** the index to the code array of the `Code` attribute
        containing the execution point represented by this stack frame,
        or a negative number if the method is native.

**jvms:** 4.7.3 The `Code` Attribute

Throws:

- `UnsupportedOperationException`: if the `StackWalker` is configured with DROP_METHOD_INFO option

## StackWalker.getFileName()

```java
public String getFileName()
```

Returns the name of the source file containing the execution point
represented by this stack frame.  Generally, this corresponds
to the `SourceFile` attribute of the relevant `class`
file as defined by *The Java Virtual Machine Specification*.
In some systems, the name may refer to some source code unit
other than a file, such as an entry in a source repository.

**Returns:** the name of the file containing the execution point
        represented by this stack frame, or `null` if
        this information is unavailable.

**jvms:** 4.7.10 The `SourceFile` Attribute

Throws:

- `UnsupportedOperationException`: if the `StackWalker` is configured with DROP_METHOD_INFO option

## StackWalker.getLineNumber()

```java
public int getLineNumber()
```

Returns the line number of the source line containing the execution
point represented by this stack frame.  Generally, this is
derived from the `LineNumberTable` attribute of the relevant
`class` file as defined by *The Java Virtual Machine
Specification*.

**Returns:** the line number of the source line containing the execution
        point represented by this stack frame, or a negative number if
        this information is unavailable.

**jvms:** 4.7.12 The `LineNumberTable` Attribute

Throws:

- `UnsupportedOperationException`: if the `StackWalker` is configured with DROP_METHOD_INFO option

## StackWalker.isNativeMethod()

```java
public boolean isNativeMethod()
```

Throws:

- `UnsupportedOperationException`: if the `StackWalker` is configured with DROP_METHOD_INFO option

## StackWalker.toStackTraceElement()

```java
public StackTraceElement toStackTraceElement()
```

Throws:

- `UnsupportedOperationException`: if the `StackWalker` is configured with DROP_METHOD_INFO option

## StackWalker.getInstance()

```java
public static StackWalker getInstance()
```

Returns a `StackWalker` instance.

 This `StackWalker` is configured to skip all
hidden frames and
no class reference is retained.

**Returns:** a `StackWalker` configured to skip all
hidden frames and
no class reference is retained.

## StackWalker.getInstance(Option)

```java
public static StackWalker getInstance(Option option)
```

Returns a `StackWalker` instance with the given option specifying
the stack frame information it can access.

Parameters:

- `option`: stack walking option

**Returns:** a `StackWalker` configured with the given option

## StackWalker.getInstance(Set<Option>)

```java
public static StackWalker getInstance(Set<Option> options)
```

Returns a `StackWalker` instance with the given `options` specifying
the stack frame information it can access.

If the given `options` is empty, this `StackWalker` is
configured to skip all hidden frames
and no class reference is retained.

Parameters:

- `options`: stack walking options

**Returns:** a `StackWalker` configured with the given options

## StackWalker.getInstance(Set<Option>, int)

```java
public static StackWalker getInstance(Set<Option> options, int estimateDepth)
```

Returns a `StackWalker` instance with the given `options` specifying
the stack frame information it can access.

If the given `options` is empty, this `StackWalker` is
configured to skip all hidden frames
and no class reference is retained.

The `estimateDepth` specifies the estimate number of stack frames
this `StackWalker` will traverse that the `StackWalker` could
use as a hint for the buffer size.

Parameters:

- `options`: stack walking options
- `estimateDepth`: Estimate number of stack frames to be traversed.

**Returns:** a `StackWalker` configured with the given options

Throws:

- `IllegalArgumentException`: if `estimateDepth <= 0`

## StackWalker.walk(Function<? super Stream<StackFrame>, ? extends T>)

```java
public <T> T walk(Function<? super Stream<StackFrame>, ? extends T> function)
```

Applies the given function to the stream of `StackFrame`s
for the current thread, traversing from the top frame of the stack,
which is the method calling this `walk` method.

The `StackFrame` stream will be closed when
this method returns.  When a closed `Stream<StackFrame>` object
is reused, `IllegalStateException` will be thrown.

Parameters:

- `function`: a function that takes a stream of stack frames and returns a result.
- `<T>`: The type of the result of applying the function to the stream of stack frame.

**API note:** For example, to find the first 10 calling frames, first skipping those frames
whose declaring class is in package `com.foo`:

This method takes a `Function` accepting a `Stream<StackFrame>`,
rather than returning a `Stream<StackFrame>` and allowing the
caller to directly manipulate the stream. The Java virtual machine is
free to reorganize a thread's control stack, for example, via
deoptimization. By taking a `Function` parameter, this method
allows access to stack frames through a stable view of a thread's control
stack.

Parallel execution is effectively disabled and stream pipeline
execution will only occur on the current thread.

**Implementation note:** The implementation stabilizes the stack by anchoring a frame
specific to the stack walking and ensures that the stack walking is
performed above the anchored frame. When the stream object is closed or
being reused, `IllegalStateException` will be thrown.

**Returns:** the result of applying the function to the stream of
        stack frame.

## StackWalker.forEach(Consumer<? super StackFrame>)

```java
public void forEach(Consumer<? super StackFrame> action)
```

Performs the given action on each element of `StackFrame` stream
of the current thread, traversing from the top frame of the stack,
which is the method calling this `forEach` method.

 This method is equivalent to calling

`walk(s -> { s.forEach(action); return null; });`

Parameters:

- `action`: an action to be performed on each `StackFrame` of the stack of the current thread

## StackWalker.getCallerClass()

```java
public Class<?> getCallerClass()
```

Gets the `Class` object of the caller who invoked the method
that invoked `getCallerClass`.

 This method filters reflection frames, `java.lang.invoke.MethodHandle`, and
hidden frames regardless of the
SHOW_REFLECT_FRAMES
and SHOW_HIDDEN_FRAMES options
this `StackWalker` has been configured with.

 This method should be called when a caller frame is present.  If
it is called from the bottom most frame on the stack,
`IllegalCallerException` will be thrown.

 This method throws `UnsupportedOperationException`
if this `StackWalker` is not configured with the
RETAIN_CLASS_REFERENCE option.

**API note:** For example, `Util::getResourceBundle` loads a resource bundle
on behalf of the caller.  It invokes `getCallerClass` to identify
the class whose method called `Util::getResourceBundle`.
Then, it obtains the class loader of that class, and uses
the class loader to load the resource bundle. The caller class
in this example is `MyTool`.

An equivalent way to find the caller class using the
walk method is as follows
(filtering the reflection frames, `MethodHandle` and hidden frames
not shown below):

When the `getCallerClass` method is called from a method that
is the bottom most frame on the stack,
for example, `static public void main` method launched by the
`java` launcher, or a method invoked from a JNI attached thread,
`IllegalCallerException` is thrown.

**Returns:** `Class` object of the caller's caller invoking this method.

Throws:

- `UnsupportedOperationException`: if this `StackWalker` is not configured with Option.RETAIN_CLASS_REFERENCE.
- `IllegalCallerException`: if there is no caller frame, i.e. when this `getCallerClass` method is called from a method which is the last frame on the stack.
