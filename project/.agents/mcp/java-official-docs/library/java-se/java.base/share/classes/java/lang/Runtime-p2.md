---
title: "Runtime class (java.lang) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Runtime.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Runtime class (java.lang) (part 2 of 3)

## Runtime.exec(String[], String[])

```java
public Process exec(String[] cmdarray, String[] envp) throws IOException
```

Executes the specified command and arguments in a separate process
with the specified environment.

This is a convenience method.  An invocation of the form
`exec(cmdarray, envp)`
behaves in exactly the same way as the invocation
String[], File) exec`(cmdarray, envp, null)`.

Parameters:

- `cmdarray`: array containing the command to call and its arguments.
- `envp`: array of strings, each element of which has environment variable settings in the format *name*=*value*, or `null` if the subprocess should inherit the environment of the current process.

**Returns:** A new `Process` object for managing the subprocess

**Implementation note:** In the reference implementation, logging of the created process can be enabled,
see `ProcessBuilder.start()` for details.

**See also:** ProcessBuilder

Throws:

- `IOException`: If an I/O error occurs
- `NullPointerException`: If `cmdarray` is `null`, or one of the elements of `cmdarray` is `null`, or one of the elements of `envp` is `null`
- `IndexOutOfBoundsException`: If `cmdarray` is an empty array (has length `0`)

## Runtime.exec(String[], String[], File)

```java
public Process exec(String[] cmdarray, String[] envp, File dir) throws IOException
```

Executes the specified command and arguments in a separate process with
the specified environment and working directory.

Given an array of strings `cmdarray`, representing the
tokens of a command line, and an array of strings `envp`,
representing "environment" variable settings, this method creates
a new process in which to execute the specified command.

This method checks that `cmdarray` is a valid operating
system command.  Which commands are valid is system-dependent,
but at the very least the command must be a non-empty list of
non-null strings.

If `envp` is `null`, the subprocess inherits the
environment settings of the current process.

A minimal set of system dependent environment variables may
be required to start a process on some operating systems.
As a result, the subprocess may inherit additional environment variable
settings beyond those in the specified environment.
The minimal set of system dependent environment variables
may override the values provided in the environment.

`ProcessBuilder.start()` is now the preferred way to
start a process with a modified environment.

The working directory of the new subprocess is specified by `dir`.
If `dir` is `null`, the subprocess inherits the
current working directory of the current process.

Starting an operating system process is highly system-dependent.
Among the many things that can go wrong are:

- The operating system program file was not found.

- Access to the program file was denied.

- The working directory does not exist.

In such cases an exception will be thrown.  The exact nature
of the exception is system-dependent, but it will always be a
subclass of `IOException`.

If the operating system does not support the creation of
processes, an `UnsupportedOperationException` will be thrown.

Parameters:

- `cmdarray`: array containing the command to call and its arguments.
- `envp`: array of strings, each element of which has environment variable settings in the format *name*=*value*, or `null` if the subprocess should inherit the environment of the current process.
- `dir`: the working directory of the subprocess, or `null` if the subprocess should inherit the working directory of the current process.

**Returns:** A new `Process` object for managing the subprocess

**Implementation note:** In the reference implementation, logging of the created process can be enabled,
see `ProcessBuilder.start()` for details.

**See also:** ProcessBuilder

**Since:** 1.3

Throws:

- `UnsupportedOperationException`: If the operating system does not support the creation of processes.
- `IOException`: If an I/O error occurs
- `NullPointerException`: If `cmdarray` is `null`, or one of the elements of `cmdarray` is `null`, or one of the elements of `envp` is `null`
- `IndexOutOfBoundsException`: If `cmdarray` is an empty array (has length `0`)

## Runtime.availableProcessors()

```java
public native int availableProcessors()
```

Returns the number of processors available to the Java virtual machine.

 This value may change during a particular invocation of the virtual
machine.  Applications that are sensitive to the number of available
processors should therefore occasionally poll this property and adjust
their resource usage appropriately.

**Returns:** the maximum number of processors available to the virtual
         machine; never smaller than one

**Since:** 1.4

## Runtime.freeMemory()

```java
public native long freeMemory()
```

Returns the amount of free memory in the Java Virtual Machine.
Calling the
`gc` method may result in increasing the value returned
by `freeMemory.`

**Returns:** an approximation to the total amount of memory currently
         available for future allocated objects, measured in bytes.

## Runtime.totalMemory()

```java
public native long totalMemory()
```

Returns the total amount of memory in the Java virtual machine.
The value returned by this method may vary over time, depending on
the host environment.

Note that the amount of memory required to hold an object of any
given type may be implementation-dependent.

**Returns:** the total amount of memory currently available for current
         and future objects, measured in bytes.

## Runtime.maxMemory()

```java
public native long maxMemory()
```

Returns the maximum amount of memory that the Java virtual machine
will attempt to use.  If there is no inherent limit then the value
`java.lang.Long.MAX_VALUE` will be returned.

**Returns:** the maximum amount of memory that the virtual machine will
         attempt to use, measured in bytes

**Since:** 1.4

## Runtime.gc()

```java
public native void gc()
```

Runs the garbage collector in the Java Virtual Machine.

Calling this method suggests that the Java Virtual Machine
expend effort toward recycling unused objects in order to
make the memory they currently occupy available for reuse
by the Java Virtual Machine.
When control returns from the method call, the Java Virtual Machine
has made a best effort to reclaim space from all unused objects.
There is no guarantee that this effort will recycle any particular
number of unused objects, reclaim any particular amount of space, or
complete at any particular time, if at all, before the method returns or ever.
There is also no guarantee that this effort will determine
the change of reachability in any particular number of objects,
or that any particular number of Reference
objects will be cleared and enqueued.

The name `gc` stands for "garbage
collector". The Java Virtual Machine performs this recycling
process automatically as needed, in a separate thread, even if the
`gc` method is not invoked explicitly.

The method `System.gc()` is the conventional and convenient
means of invoking this method.

## Runtime.runFinalization()

```java
public void runFinalization()
```

Runs the finalization methods of any objects pending finalization.
Calling this method suggests that the Java virtual machine expend
effort toward running the `finalize` methods of objects
that have been found to be discarded but whose `finalize`
methods have not yet been run. When control returns from the
method call, the virtual machine has made a best effort to
complete all outstanding finalizations.

The virtual machine performs the finalization process
automatically as needed, in a separate thread, if the
`runFinalization` method is not invoked explicitly.

The method `System.runFinalization()` is the conventional
and convenient means of invoking this method.

**Deprecated:** Finalization has been deprecated for removal.  See
`java.lang.Object.finalize` for background information and details
about migration options.

When running in a JVM in which finalization has been disabled or removed,
no objects will be pending finalization, so this method does nothing.

**See also:** java.lang.Object#finalize()

**JLS:** 12.6 Finalization of Class Instances

## Runtime.load(String)

```java
public void load(String filename)
```

Loads the native library specified by the filename argument.  The filename
argument must be an absolute path name.
(for example
`Runtime.getRuntime().load("/home/avh/lib/libX11.so");`).

If the filename argument, when stripped of any platform-specific library
prefix, path, and file extension, indicates a library whose name is,
for example, L, and a native library called L is statically linked
with the VM, then the JNI_OnLoad_L function exported by the library
is invoked rather than attempting to load a dynamic library.
A filename matching the argument does not have to exist in the file
system.
See the  JNI Specification
for more details.

Otherwise, the filename argument is mapped to a native library image in
an implementation-dependent manner.

This is similar to the method `loadLibrary(String)`, but it
accepts a general file name as an argument rather than just a library
name, allowing any file of native code to be loaded.

The method `System.load(String)` is the conventional and
convenient means of invoking this method.

Parameters:

- `filename`: the file to load.

**See also:** java.lang.Runtime#getRuntime()

Throws:

- `UnsatisfiedLinkError`: if either the filename is not an absolute path name, the native library is not statically linked with the VM, or the library cannot be mapped to a native library image by the host system.
- `NullPointerException`: if `filename` is `null`
- `IllegalCallerException`: if the caller is in a module that does not have native access enabled.

## Runtime.loadLibrary(String)

```java
public void loadLibrary(String libname)
```

Loads the native library specified by the `libname`
argument.  The `libname` argument must not contain any platform
specific prefix, file extension or path. If a native library
called `libname` is statically linked with the VM, then the
JNI_OnLoad_`libname` function exported by the library is invoked.
See the  JNI Specification
for more details.

Otherwise, the libname argument is loaded from a system library
location and mapped to a native library image in an
implementation-dependent manner.

The method `System.loadLibrary(String)` is the conventional
and convenient means of invoking this method. If native
methods are to be used in the implementation of a class, a standard
strategy is to put the native code in a library file (call it
`LibFile`) and then to put a static initializer:

```java
static { System.loadLibrary("LibFile");
```

within the class declaration. When the class is loaded and
initialized, the necessary native code implementation for the native
methods will then be loaded as well.

If this method is called more than once with the same library
name, the second and subsequent calls are ignored.

Parameters:

- `libname`: the name of the library.

Throws:

- `UnsatisfiedLinkError`: if either the libname argument contains a file path, the native library is not statically linked with the VM, or the library cannot be mapped to a native library image by the host system.
- `NullPointerException`: if `libname` is `null`
- `IllegalCallerException`: if the caller is in a module that does not have native access enabled.

## Runtime.version()

```java
public static Version version()
```

Returns the version of the Java Runtime Environment as a `Version`.

**Returns:** the `Version` of the Java Runtime Environment

**Since:** 9

## Runtime.parse(String)

```java
public static Version parse(String s)
```

Parses the given string as a valid
version string containing a
version number followed by pre-release and
build information.

Parameters:

- `s`: A string to interpret as a version

**Returns:** The Version of the given string

Throws:

- `IllegalArgumentException`: If the given string cannot be interpreted as a valid version
- `NullPointerException`: If the given string is `null`
- `NumberFormatException`: If an element of the version number or the build number cannot be represented as an `Integer`

## Runtime.feature()

```java
public int feature()
```

Returns the value of the feature element of
the version number.

**Returns:** The value of the feature element

**Since:** 10

## Runtime.interim()

```java
public int interim()
```

Returns the value of the interim element of
the version number, or zero if it is absent.

**Returns:** The value of the interim element, or zero

**Since:** 10

## Runtime.update()

```java
public int update()
```

Returns the value of the update element of the
version number, or zero if it is absent.

**Returns:** The value of the update element, or zero

**Since:** 10

## Runtime.patch()

```java
public int patch()
```

Returns the value of the patch element of the
version number, or zero if it is absent.

**Returns:** The value of the patch element, or zero

**Since:** 10

## Runtime.major()

```java
public int major()
```

Returns the value of the major element of the version number.

**Deprecated:** As of Java SE 10, the first element of a version
number is not the major-release number but the feature-release
counter, incremented for every time-based release.  Use the `feature()` method in preference to this method.  For compatibility,
this method returns the value of the feature
element.

**Returns:** The value of the feature element

## Runtime.minor()

```java
public int minor()
```

Returns the value of the minor element of the version number, or
zero if it is absent.

**Deprecated:** As of Java SE 10, the second element of a version
number is not the minor-release number but the interim-release
counter, incremented for every interim release.  Use the `interim()` method in preference to this method.  For compatibility,
this method returns the value of the interim
element, or zero if it is absent.

**Returns:** The value of the interim element, or zero

## Runtime.security()

```java
public int security()
```

Returns the value of the security element of the version number, or
zero if it is absent.

**Deprecated:** As of Java SE 10, the third element of a version
number is not the security level but the update-release counter,
incremented for every update release.  Use the `update()`
method in preference to this method.  For compatibility, this method
returns the value of the update element, or
zero if it is absent.

**Returns:** The value of the update element, or zero

## Runtime.version()

```java
public List<Integer> version()
```

Returns an unmodifiable List of the integers
represented in the version number.
The `List` always contains at least one element corresponding to
the feature version number.

**Returns:** An unmodifiable list of the integers
         represented in the version number
