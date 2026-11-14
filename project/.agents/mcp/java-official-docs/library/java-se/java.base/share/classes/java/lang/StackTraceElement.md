---
title: "StackTraceElement class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/StackTraceElement.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# StackTraceElement class (java.lang)

```java
public final class StackTraceElement implements java.io.Serializable
```

An element in a stack trace, as returned by `Throwable.getStackTrace()`.  Each element represents a single stack frame.
All stack frames except for the one at the top of the stack represent
a method invocation.  The frame at the top of the stack represents the
execution point at which the stack trace was generated.  Typically,
this is the point at which the throwable corresponding to the stack trace
was created.

**Since:** 1.4

## StackTraceElement.StackTraceElement(String, String, String, int)

```java
public StackTraceElement(String declaringClass, String methodName, String fileName, int lineNumber)
```

Creates a stack trace element representing the specified execution
point. The module name and module version of the stack trace element will
be `null`.

Parameters:

- `declaringClass`: the binary name of the class containing the execution point represented by the stack trace element
- `methodName`: the name of the method containing the execution point represented by the stack trace element
- `fileName`: the name of the file containing the execution point represented by the stack trace element, or `null` if this information is unavailable
- `lineNumber`: the line number of the source line containing the execution point represented by this stack trace element, or a negative number if this information is unavailable. A value of -2 indicates that the method containing the execution point is a native method

**Since:** 1.5

Throws:

- `NullPointerException`: if `declaringClass` or `methodName` is null

## StackTraceElement.StackTraceElement(String, String, String, String, String, String, int)

```java
public StackTraceElement(String classLoaderName, String moduleName, String moduleVersion, String declaringClass, String methodName, String fileName, int lineNumber)
```

Creates a stack trace element representing the specified execution
point.

Parameters:

- `classLoaderName`: the class loader name if the class loader of the class containing the execution point represented by the stack trace is named; otherwise `null`
- `moduleName`: the module name if the class containing the execution point represented by the stack trace is in a named module; otherwise `null`
- `moduleVersion`: the module version if the class containing the execution point represented by the stack trace is in a named module that has a version; otherwise `null`
- `declaringClass`: the binary name of the class containing the execution point represented by the stack trace element
- `methodName`: the name of the method containing the execution point represented by the stack trace element
- `fileName`: the name of the file containing the execution point represented by the stack trace element, or `null` if this information is unavailable
- `lineNumber`: the line number of the source line containing the execution point represented by this stack trace element, or a negative number if this information is unavailable. A value of -2 indicates that the method containing the execution point is a native method

**Since:** 9

Throws:

- `NullPointerException`: if `declaringClass` is `null` or `methodName` is `null`

## StackTraceElement.getFileName()

```java
public String getFileName()
```

Returns the name of the source file containing the execution point
represented by this stack trace element.  Generally, this corresponds
to the `SourceFile` attribute of the relevant `class`
file (as per *The Java Virtual Machine Specification*, Section
).  In some systems, the name may refer to some source code unit
other than a file, such as an entry in source repository.

**Returns:** the name of the file containing the execution point
        represented by this stack trace element, or `null` if
        this information is unavailable.

## StackTraceElement.getLineNumber()

```java
public int getLineNumber()
```

Returns the line number of the source line containing the execution
point represented by this stack trace element.  Generally, this is
derived from the `LineNumberTable` attribute of the relevant
`class` file (as per *The Java Virtual Machine
Specification*, Section ).

**Returns:** the line number of the source line containing the execution
        point represented by this stack trace element, or a negative
        number if this information is unavailable.

## StackTraceElement.getModuleName()

```java
public String getModuleName()
```

Returns the module name of the module containing the execution point
represented by this stack trace element.

**Returns:** the module name of the `Module` containing the execution
        point represented by this stack trace element; `null`
        if the module name is not available.

**Since:** 9

**See also:** Module#getName()

## StackTraceElement.getModuleVersion()

```java
public String getModuleVersion()
```

Returns the module version of the module containing the execution point
represented by this stack trace element.

**Returns:** the module version of the `Module` containing the execution
        point represented by this stack trace element; `null`
        if the module version is not available.

**Since:** 9

**See also:** java.lang.module.ModuleDescriptor.Version

## StackTraceElement.getClassLoaderName()

```java
public String getClassLoaderName()
```

Returns the name of the class loader of the class containing the
execution point represented by this stack trace element.

**Returns:** the name of the class loader of the class containing the execution
        point represented by this stack trace element; `null`
        if the class loader is not named.

**Since:** 9

**See also:** java.lang.ClassLoader#getName()

## StackTraceElement.getClassName()

```java
public String getClassName()
```

## StackTraceElement.getMethodName()

```java
public String getMethodName()
```

Returns the name of the method containing the execution point
represented by this stack trace element.  If the execution point is
contained in an instance or class initializer, this method will return
the appropriate *special method name*, `ConstantDescs#INIT_NAME`
or `ConstantDescs#CLASS_INIT_NAME`, as per Section
of *The Java Virtual Machine Specification*.

**Returns:** the name of the method containing the execution point
        represented by this stack trace element.

## StackTraceElement.isNativeMethod()

```java
public boolean isNativeMethod()
```

Returns true if the method containing the execution point
represented by this stack trace element is a native method.

**Returns:** `true` if the method containing the execution point
        represented by this stack trace element is a native method.

## StackTraceElement.toString()

```java
public String toString()
```

Returns a string representation of this stack trace element.

**API note:** The format of this string depends on the implementation, but the
following examples may be regarded as typical:

-
    "`com.foo.loader/user@example.com/com.foo.Main.run(Main.java:101)`"
- See the description below.

-
    "`com.foo.loader/user@example.com/com.foo.Main.run(Main.java)`"
- The line number is unavailable.

-
    "`com.foo.loader/user@example.com/com.foo.Main.run(Unknown Source)`"
- Neither the file name nor the line number is available.

-
    "`com.foo.loader/user@example.com/com.foo.Main.run(Native Method)`"
- The method containing the execution point is a native method.

-
    "`com.foo.loader//com.foo.bar.App.run(App.java:12)`"
- The class of the execution point is defined in the unnamed module of
the class loader named `com.foo.loader`.

-
    "`user@example.com/org.acme.Lib.test(Lib.java:80)`"
- The class of the execution point is defined in `acme` module
loaded by a built-in class loader such as the application class loader.

-
    "`MyClass.mash(MyClass.java:9)`"
- `MyClass` class is on the application class path.

 The first example shows a stack trace element consisting of
three elements, each separated by `"/"`, followed by
the source file name and the line number of the source line
containing the execution point.

The first element "`com.foo.loader`" is
the name of the class loader.  The second element "`user@example.com`"
is the module name and version.  The third element is the method
containing the execution point; "`com.foo.Main"`" is the
binary name and "`run`" is the name of the method.
"`Main.java`" is the source file name and "`101`" is
the line number.

 If a class is defined in an *unnamed module*
then the second element is omitted as shown in
"`com.foo.loader//com.foo.bar.App.run(App.java:12)`".

 If the class loader is a
built-in class loader or is not named then the first element
and its following `"/"` are omitted as shown in
"`user@example.com/org.acme.Lib.test(Lib.java:80)`".
If the first element is omitted and the module is an unnamed module,
the second element and its following `"/"` are also omitted
as shown in "`MyClass.mash(MyClass.java:9)`".

 The `toString` method may return two different values on two
`StackTraceElement` instances that are
equal, for example one created via the
constructor, and one obtained from `java.lang.Throwable` or
`java.lang.StackWalker.StackFrame`, where an implementation may
choose to omit some element in the returned string.

**See also:** Throwable#printStackTrace()

## StackTraceElement.equals(Object)

```java
public boolean equals(Object obj)
```

Returns true if the specified object is another
`StackTraceElement` instance representing the same execution
point as this instance.  Two stack trace elements `a` and
`b` are equal if and only if:

```java
    equals(a.getClassLoaderName(), b.getClassLoaderName()) &&
    equals(a.getModuleName(), b.getModuleName()) &&
    equals(a.getModuleVersion(), b.getModuleVersion()) &&
    equals(a.getClassName(), b.getClassName()) &&
    equals(a.getMethodName(), b.getMethodName())
    equals(a.getFileName(), b.getFileName()) &&
    a.getLineNumber() == b.getLineNumber()
```

where `equals` has the semantics of Object) Objects.equals.

Parameters:

- `obj`: the object to be compared with this stack trace element.

**Returns:** true if the specified object is another
        `StackTraceElement` instance representing the same
        execution point as this instance.

## StackTraceElement.hashCode()

```java
public int hashCode()
```

Returns a hash code value for this stack trace element.
