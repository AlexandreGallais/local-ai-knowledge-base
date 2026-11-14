# StackTraceElement class (java.lang)

```java
public final class StackTraceElement implements java.io.Serializable
```

An element in a stack trace, as returned by {@link
Throwable#getStackTrace()}.  Each element represents a single stack frame.
All stack frames except for the one at the top of the stack represent
a method invocation.  The frame at the top of the stack represents the
execution point at which the stack trace was generated.  Typically,
this is the point at which the throwable corresponding to the stack trace
was created.

@since  1.4
@author Josh Bloch

## StackTraceElement.StackTraceElement(String, String, String, int)

```java
public StackTraceElement(String declaringClass, String methodName, String fileName, int lineNumber)
```

Creates a stack trace element representing the specified execution
point. The {@link #getModuleName module name} and {@link
#getModuleVersion module version} of the stack trace element will
be {@code null}.

@param declaringClass the {@linkplain ClassLoader##binary-name binary name}
       of the class containing the execution point represented by
       the stack trace element
@param methodName the name of the method containing the execution point
       represented by the stack trace element
@param fileName the name of the file containing the execution point
        represented by the stack trace element, or {@code null} if
        this information is unavailable
@param lineNumber the line number of the source line containing the
        execution point represented by this stack trace element, or
        a negative number if this information is unavailable. A value
        of -2 indicates that the method containing the execution point
        is a native method
@throws NullPointerException if {@code declaringClass} or
        {@code methodName} is null
@since 1.5

## StackTraceElement.StackTraceElement(String, String, String, String, String, String, int)

```java
public StackTraceElement(String classLoaderName, String moduleName, String moduleVersion, String declaringClass, String methodName, String fileName, int lineNumber)
```

Creates a stack trace element representing the specified execution
point.

@param classLoaderName the class loader name if the class loader of
       the class containing the execution point represented by
       the stack trace is named; otherwise {@code null}
@param moduleName the module name if the class containing the
       execution point represented by the stack trace is in a named
       module; otherwise {@code null}
@param moduleVersion the module version if the class containing the
       execution point represented by the stack trace is in a named
       module that has a version; otherwise {@code null}
@param declaringClass the {@linkplain ClassLoader##binary-name binary name}
       of the class containing the execution point represented by
       the stack trace element
@param methodName the name of the method containing the execution point
       represented by the stack trace element
@param fileName the name of the file containing the execution point
       represented by the stack trace element, or {@code null} if
       this information is unavailable
@param lineNumber the line number of the source line containing the
       execution point represented by this stack trace element, or
       a negative number if this information is unavailable. A value
       of -2 indicates that the method containing the execution point
       is a native method

@throws NullPointerException if {@code declaringClass} is {@code null}
        or {@code methodName} is {@code null}

@since 9

## StackTraceElement.getFileName()

```java
public String getFileName()
```

Returns the name of the source file containing the execution point
represented by this stack trace element.  Generally, this corresponds
to the {@code SourceFile} attribute of the relevant {@code class}
file (as per <cite>The Java Virtual Machine Specification</cite>, Section
{@jvms 4.7.7}).  In some systems, the name may refer to some source code unit
other than a file, such as an entry in source repository.

@return the name of the file containing the execution point
        represented by this stack trace element, or {@code null} if
        this information is unavailable.

## StackTraceElement.getLineNumber()

```java
public int getLineNumber()
```

Returns the line number of the source line containing the execution
point represented by this stack trace element.  Generally, this is
derived from the {@code LineNumberTable} attribute of the relevant
{@code class} file (as per <cite>The Java Virtual Machine
Specification</cite>, Section {@jvms 4.7.8}).

@return the line number of the source line containing the execution
        point represented by this stack trace element, or a negative
        number if this information is unavailable.

## StackTraceElement.getModuleName()

```java
public String getModuleName()
```

Returns the module name of the module containing the execution point
represented by this stack trace element.

@return the module name of the {@code Module} containing the execution
        point represented by this stack trace element; {@code null}
        if the module name is not available.
@since 9
@see Module#getName()

## StackTraceElement.getModuleVersion()

```java
public String getModuleVersion()
```

Returns the module version of the module containing the execution point
represented by this stack trace element.

@return the module version of the {@code Module} containing the execution
        point represented by this stack trace element; {@code null}
        if the module version is not available.
@since 9
@see java.lang.module.ModuleDescriptor.Version

## StackTraceElement.getClassLoaderName()

```java
public String getClassLoaderName()
```

Returns the name of the class loader of the class containing the
execution point represented by this stack trace element.

@return the name of the class loader of the class containing the execution
        point represented by this stack trace element; {@code null}
        if the class loader is not named.

@since 9
@see java.lang.ClassLoader#getName()

## StackTraceElement.getClassName()

```java
public String getClassName()
```

{@return the {@linkplain ClassLoader##binary-name binary name}
of the {@code Class} containing the execution point represented
by this stack trace element}

## StackTraceElement.getMethodName()

```java
public String getMethodName()
```

Returns the name of the method containing the execution point
represented by this stack trace element.  If the execution point is
contained in an instance or class initializer, this method will return
the appropriate <i>special method name</i>, {@value ConstantDescs#INIT_NAME}
or {@value ConstantDescs#CLASS_INIT_NAME}, as per Section {@jvms 3.9}
of <cite>The Java Virtual Machine Specification</cite>.

@return the name of the method containing the execution point
        represented by this stack trace element.

## StackTraceElement.isNativeMethod()

```java
public boolean isNativeMethod()
```

Returns true if the method containing the execution point
represented by this stack trace element is a native method.

@return {@code true} if the method containing the execution point
        represented by this stack trace element is a native method.

## StackTraceElement.toString()

```java
public String toString()
```

Returns a string representation of this stack trace element.

@apiNote The format of this string depends on the implementation, but the
following examples may be regarded as typical:
<ul>
<li>
    "{@code com.foo.loader/foo@9.0/com.foo.Main.run(Main.java:101)}"
- See the description below.
</li>
<li>
    "{@code com.foo.loader/foo@9.0/com.foo.Main.run(Main.java)}"
- The line number is unavailable.
</li>
<li>
    "{@code com.foo.loader/foo@9.0/com.foo.Main.run(Unknown Source)}"
- Neither the file name nor the line number is available.
</li>
<li>
    "{@code com.foo.loader/foo@9.0/com.foo.Main.run(Native Method)}"
- The method containing the execution point is a native method.
</li>
<li>
    "{@code com.foo.loader//com.foo.bar.App.run(App.java:12)}"
- The class of the execution point is defined in the unnamed module of
the class loader named {@code com.foo.loader}.
</li>
<li>
    "{@code acme@2.1/org.acme.Lib.test(Lib.java:80)}"
- The class of the execution point is defined in {@code acme} module
loaded by a built-in class loader such as the application class loader.
</li>
<li>
    "{@code MyClass.mash(MyClass.java:9)}"
- {@code MyClass} class is on the application class path.
</li>
</ul>

<p> The first example shows a stack trace element consisting of
three elements, each separated by {@code "/"}, followed by
the source file name and the line number of the source line
containing the execution point.

The first element "{@code com.foo.loader}" is
the name of the class loader.  The second element "{@code foo@9.0}"
is the module name and version.  The third element is the method
containing the execution point; "{@code com.foo.Main"}" is the
binary name and "{@code run}" is the name of the method.
"{@code Main.java}" is the source file name and "{@code 101}" is
the line number.

<p> If a class is defined in an <em>unnamed module</em>
then the second element is omitted as shown in
"{@code com.foo.loader//com.foo.bar.App.run(App.java:12)}".

<p> If the class loader is a <a href="ClassLoader.html#builtinLoaders">
built-in class loader</a> or is not named then the first element
and its following {@code "/"} are omitted as shown in
"{@code acme@2.1/org.acme.Lib.test(Lib.java:80)}".
If the first element is omitted and the module is an unnamed module,
the second element and its following {@code "/"} are also omitted
as shown in "{@code MyClass.mash(MyClass.java:9)}".

<p> The {@code toString} method may return two different values on two
{@code StackTraceElement} instances that are
{@linkplain #equals(Object) equal}, for example one created via the
constructor, and one obtained from {@link java.lang.Throwable} or
{@link java.lang.StackWalker.StackFrame}, where an implementation may
choose to omit some element in the returned string.

@see    Throwable#printStackTrace()

## StackTraceElement.equals(Object)

```java
public boolean equals(Object obj)
```

Returns true if the specified object is another
{@code StackTraceElement} instance representing the same execution
point as this instance.  Two stack trace elements {@code a} and
{@code b} are equal if and only if:
<pre>{@code
    equals(a.getClassLoaderName(), b.getClassLoaderName()) &&
    equals(a.getModuleName(), b.getModuleName()) &&
    equals(a.getModuleVersion(), b.getModuleVersion()) &&
    equals(a.getClassName(), b.getClassName()) &&
    equals(a.getMethodName(), b.getMethodName())
    equals(a.getFileName(), b.getFileName()) &&
    a.getLineNumber() == b.getLineNumber()

}</pre>
where {@code equals} has the semantics of {@link
java.util.Objects#equals(Object, Object) Objects.equals}.

@param  obj the object to be compared with this stack trace element.
@return true if the specified object is another
        {@code StackTraceElement} instance representing the same
        execution point as this instance.

## StackTraceElement.hashCode()

```java
public int hashCode()
```

Returns a hash code value for this stack trace element.