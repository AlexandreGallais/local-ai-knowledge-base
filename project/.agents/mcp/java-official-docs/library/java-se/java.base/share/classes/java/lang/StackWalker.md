# StackWalker class (java.lang)

```java
public final class StackWalker
```

A stack walker.

<p> The {@link StackWalker#walk walk} method opens a sequential stream
of {@link StackFrame StackFrame}s for the current thread and then applies
the given function to walk the {@code StackFrame} stream.
The stream reports stack frame elements in order, from the top most frame
that represents the execution point at which the stack was generated to
the bottom most frame.
The {@code StackFrame} stream is closed when the {@code walk} method returns.
If an attempt is made to reuse the closed stream,
{@code IllegalStateException} will be thrown.

<p> {@linkplain Option <em>Stack walker options</em>} configure the stack frame
information obtained by a {@code StackWalker}.
By default, the class name and method information are collected but
not the {@link StackFrame#getDeclaringClass() Class reference}.
The method information can be dropped via the {@link Option#DROP_METHOD_INFO
DROP_METHOD_INFO} option. The {@code Class} object can be retained for
access via the {@link Option#RETAIN_CLASS_REFERENCE RETAIN_CLASS_REFERENCE} option.
Stack frames of the reflection API and implementation classes are
{@linkplain Option#SHOW_HIDDEN_FRAMES hidden} by default.

<p> {@code StackWalker} is thread-safe. Multiple threads can share
a single {@code StackWalker} object to traverse its own stack.

@apiNote
Examples

<p>1. To find the first caller filtering out a known list of implementation class:
{@snippet lang="java" :
    StackWalker walker = StackWalker.getInstance(Set.of(Option.DROP_METHOD_INFO, Option.RETAIN_CLASS_REFERENCE));
    Optional<Class<?>> callerClass = walker.walk(s ->
            s.map(StackFrame::getDeclaringClass)
             .filter(Predicate.not(implClasses::contains))
             .findFirst());
}

<p>2. To snapshot the top 10 stack frames of the current thread,
{@snippet lang="java" :
    List<StackFrame> stack = StackWalker.getInstance().walk(s -> s.limit(10).toList());
}

Unless otherwise noted, passing a {@code null} argument to a
constructor or method in this {@code StackWalker} class
will cause a {@link NullPointerException NullPointerException}
to be thrown.

@since 9

## StackWalker.getClassName()

```java
public String getClassName()
```

{@return the {@linkplain ClassLoader##binary-name binary name}
of the declaring class of the method represented by this stack frame}

@jls 13.1 The Form of a Binary

## StackWalker.getMethodName()

```java
public String getMethodName()
```

{@return the name of the method represented by this stack frame}

@throws UnsupportedOperationException if the {@code StackWalker} is configured
        with {@link Option#DROP_METHOD_INFO DROP_METHOD_INFO} option

## StackWalker.getDeclaringClass()

```java
public Class<?> getDeclaringClass()
```

{@return the declaring {@code Class} for the method represented by
this stack frame}

@throws UnsupportedOperationException if the {@code StackWalker} is configured
        without {@link Option#RETAIN_CLASS_REFERENCE RETAIN_CLASS_REFERENCE} option

## StackWalker.getMethodType()

```java
public default MethodType getMethodType()
```

Returns the {@link MethodType} representing the parameter types and
the return type for the method represented by this stack frame.

@implSpec
The default implementation throws {@code UnsupportedOperationException}.

@return the {@code MethodType} of the method represented by this stack frame

@throws UnsupportedOperationException if the {@code StackWalker} is configured
        with {@link Option#DROP_METHOD_INFO DROP_METHOD_INFO} option or
        without {@link Option#RETAIN_CLASS_REFERENCE RETAIN_CLASS_REFERENCE} option

@since 10

## StackWalker.getDescriptor()

```java
public default String getDescriptor()
```

Returns the <i>descriptor</i> of the method represented by
this stack frame as defined by
<cite>The Java Virtual Machine Specification</cite>.

@implSpec
The default implementation throws {@code UnsupportedOperationException}.

@return the descriptor of the method represented by
        this stack frame

@throws UnsupportedOperationException if the {@code StackWalker} is configured
        with {@link Option#DROP_METHOD_INFO DROP_METHOD_INFO} option

@see MethodType#fromMethodDescriptorString(String, ClassLoader)
@see MethodType#toMethodDescriptorString()
@jvms 4.3.3 Method Descriptors

@since 10

## StackWalker.getByteCodeIndex()

```java
public int getByteCodeIndex()
```

Returns the index to the code array of the {@code Code} attribute
containing the execution point represented by this stack frame.
The code array gives the actual bytes of Java Virtual Machine code
that implement the method.

@return the index to the code array of the {@code Code} attribute
        containing the execution point represented by this stack frame,
        or a negative number if the method is native.

@throws UnsupportedOperationException if the {@code StackWalker} is configured
        with {@link Option#DROP_METHOD_INFO DROP_METHOD_INFO} option

@jvms 4.7.3 The {@code Code} Attribute

## StackWalker.getFileName()

```java
public String getFileName()
```

Returns the name of the source file containing the execution point
represented by this stack frame.  Generally, this corresponds
to the {@code SourceFile} attribute of the relevant {@code class}
file as defined by <cite>The Java Virtual Machine Specification</cite>.
In some systems, the name may refer to some source code unit
other than a file, such as an entry in a source repository.

@return the name of the file containing the execution point
        represented by this stack frame, or {@code null} if
        this information is unavailable.

@throws UnsupportedOperationException if the {@code StackWalker} is configured
        with {@link Option#DROP_METHOD_INFO DROP_METHOD_INFO} option

@jvms 4.7.10 The {@code SourceFile} Attribute

## StackWalker.getLineNumber()

```java
public int getLineNumber()
```

Returns the line number of the source line containing the execution
point represented by this stack frame.  Generally, this is
derived from the {@code LineNumberTable} attribute of the relevant
{@code class} file as defined by <cite>The Java Virtual Machine
Specification</cite>.

@return the line number of the source line containing the execution
        point represented by this stack frame, or a negative number if
        this information is unavailable.

@throws UnsupportedOperationException if the {@code StackWalker} is configured
        with {@link Option#DROP_METHOD_INFO DROP_METHOD_INFO} option

@jvms 4.7.12 The {@code LineNumberTable} Attribute

## StackWalker.isNativeMethod()

```java
public boolean isNativeMethod()
```

{@return {@code true} if the method containing the execution point
represented by this stack frame is a native method}

@throws UnsupportedOperationException if the {@code StackWalker} is configured
        with {@link Option#DROP_METHOD_INFO DROP_METHOD_INFO} option

## StackWalker.toStackTraceElement()

```java
public StackTraceElement toStackTraceElement()
```

{@return {@code StackTraceElement} for this stack frame}

@throws UnsupportedOperationException if the {@code StackWalker} is configured
        with {@link Option#DROP_METHOD_INFO DROP_METHOD_INFO} option

## StackWalker.getInstance()

```java
public static StackWalker getInstance()
```

Returns a {@code StackWalker} instance.

<p> This {@code StackWalker} is configured to skip all
{@linkplain Option#SHOW_HIDDEN_FRAMES hidden frames} and
no {@linkplain Option#RETAIN_CLASS_REFERENCE class reference} is retained.

@return a {@code StackWalker} configured to skip all
{@linkplain Option#SHOW_HIDDEN_FRAMES hidden frames} and
no {@linkplain Option#RETAIN_CLASS_REFERENCE class reference} is retained.

## StackWalker.getInstance(Option)

```java
public static StackWalker getInstance(Option option)
```

Returns a {@code StackWalker} instance with the given option specifying
the stack frame information it can access.

@param option {@link Option stack walking option}

@return a {@code StackWalker} configured with the given option

## StackWalker.getInstance(Set<Option>)

```java
public static StackWalker getInstance(Set<Option> options)
```

Returns a {@code StackWalker} instance with the given {@code options} specifying
the stack frame information it can access.

<p>
If the given {@code options} is empty, this {@code StackWalker} is
configured to skip all {@linkplain Option#SHOW_HIDDEN_FRAMES hidden frames}
and no {@linkplain Option#RETAIN_CLASS_REFERENCE class reference} is retained.

@param options {@link Option stack walking options}

@return a {@code StackWalker} configured with the given options

## StackWalker.getInstance(Set<Option>, int)

```java
public static StackWalker getInstance(Set<Option> options, int estimateDepth)
```

Returns a {@code StackWalker} instance with the given {@code options} specifying
the stack frame information it can access.

<p>
If the given {@code options} is empty, this {@code StackWalker} is
configured to skip all {@linkplain Option#SHOW_HIDDEN_FRAMES hidden frames}
and no {@linkplain Option#RETAIN_CLASS_REFERENCE class reference} is retained.

<p>
The {@code estimateDepth} specifies the estimate number of stack frames
this {@code StackWalker} will traverse that the {@code StackWalker} could
use as a hint for the buffer size.

@param options {@link Option stack walking options}
@param estimateDepth Estimate number of stack frames to be traversed.

@return a {@code StackWalker} configured with the given options

@throws IllegalArgumentException if {@code estimateDepth <= 0}

## StackWalker.walk(Function<? super Stream<StackFrame>, ? extends T>)

```java
public <T> T walk(Function<? super Stream<StackFrame>, ? extends T> function)
```

Applies the given function to the stream of {@code StackFrame}s
for the current thread, traversing from the top frame of the stack,
which is the method calling this {@code walk} method.

<p>The {@code StackFrame} stream will be closed when
this method returns.  When a closed {@code Stream<StackFrame>} object
is reused, {@code IllegalStateException} will be thrown.

@apiNote
For example, to find the first 10 calling frames, first skipping those frames
whose declaring class is in package {@code com.foo}:
{@snippet lang="java" :
List<StackFrame> frames = StackWalker.getInstance().walk(s ->
        s.dropWhile(f -> f.getClassName().startsWith("com.foo."))
         .limit(10)
         .toList());
}

<p>This method takes a {@code Function} accepting a {@code Stream<StackFrame>},
rather than returning a {@code Stream<StackFrame>} and allowing the
caller to directly manipulate the stream. The Java virtual machine is
free to reorganize a thread's control stack, for example, via
deoptimization. By taking a {@code Function} parameter, this method
allows access to stack frames through a stable view of a thread's control
stack.

<p>Parallel execution is effectively disabled and stream pipeline
execution will only occur on the current thread.

@implNote The implementation stabilizes the stack by anchoring a frame
specific to the stack walking and ensures that the stack walking is
performed above the anchored frame. When the stream object is closed or
being reused, {@code IllegalStateException} will be thrown.

@param function a function that takes a stream of
                {@linkplain StackFrame stack frames} and returns a result.
@param <T> The type of the result of applying the function to the
           stream of {@linkplain StackFrame stack frame}.

@return the result of applying the function to the stream of
        {@linkplain StackFrame stack frame}.

## StackWalker.forEach(Consumer<? super StackFrame>)

```java
public void forEach(Consumer<? super StackFrame> action)
```

Performs the given action on each element of {@code StackFrame} stream
of the current thread, traversing from the top frame of the stack,
which is the method calling this {@code forEach} method.

<p> This method is equivalent to calling
<blockquote>
{@code walk(s -> { s.forEach(action); return null; });}
</blockquote>

@param action an action to be performed on each {@code StackFrame}
              of the stack of the current thread

## StackWalker.getCallerClass()

```java
public Class<?> getCallerClass()
```

Gets the {@code Class} object of the caller who invoked the method
that invoked {@code getCallerClass}.

<p> This method filters {@linkplain Option#SHOW_REFLECT_FRAMES reflection
frames}, {@link java.lang.invoke.MethodHandle}, and
{@linkplain Option#SHOW_HIDDEN_FRAMES hidden frames} regardless of the
{@link Option#SHOW_REFLECT_FRAMES SHOW_REFLECT_FRAMES}
and {@link Option#SHOW_HIDDEN_FRAMES SHOW_HIDDEN_FRAMES} options
this {@code StackWalker} has been configured with.

<p> This method should be called when a caller frame is present.  If
it is called from the bottom most frame on the stack,
{@code IllegalCallerException} will be thrown.

<p> This method throws {@code UnsupportedOperationException}
if this {@code StackWalker} is not configured with the
{@link Option#RETAIN_CLASS_REFERENCE RETAIN_CLASS_REFERENCE} option.

@apiNote
For example, {@code Util::getResourceBundle} loads a resource bundle
on behalf of the caller.  It invokes {@code getCallerClass} to identify
the class whose method called {@code Util::getResourceBundle}.
Then, it obtains the class loader of that class, and uses
the class loader to load the resource bundle. The caller class
in this example is {@code MyTool}.

{@snippet lang="java" :
class Util {
    private final StackWalker walker =
        StackWalker.getInstance(Set.of(Option.DROP_METHOD_INFO, Option.RETAIN_CLASS_REFERENCE));
    public ResourceBundle getResourceBundle(String bundleName) {
        Class<?> caller = walker.getCallerClass();
        return ResourceBundle.getBundle(bundleName, Locale.getDefault(), caller.getClassLoader());
    }
}

class MyTool {
    private final Util util = new Util();
    private void init() {
        ResourceBundle rb = util.getResourceBundle("mybundle");
    }
}
}

An equivalent way to find the caller class using the
{@link StackWalker#walk walk} method is as follows
(filtering the reflection frames, {@code MethodHandle} and hidden frames
not shown below):
{@snippet lang="java" :
    Optional<Class<?>> caller = walker.walk(s ->
        s.map(StackFrame::getDeclaringClass)
         .skip(2)
         .findFirst());
}

When the {@code getCallerClass} method is called from a method that
is the bottom most frame on the stack,
for example, {@code static public void main} method launched by the
{@code java} launcher, or a method invoked from a JNI attached thread,
{@code IllegalCallerException} is thrown.

@return {@code Class} object of the caller's caller invoking this method.

@throws UnsupportedOperationException if this {@code StackWalker}
        is not configured with {@link Option#RETAIN_CLASS_REFERENCE
        Option.RETAIN_CLASS_REFERENCE}.
@throws IllegalCallerException if there is no caller frame, i.e.
        when this {@code getCallerClass} method is called from a method
        which is the last frame on the stack.