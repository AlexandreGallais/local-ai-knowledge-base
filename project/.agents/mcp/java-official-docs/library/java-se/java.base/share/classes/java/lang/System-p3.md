---
title: "System class (java.lang) (part 3 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/System.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# System class (java.lang) (part 3 of 4)

## System.log(Level, Object)

```java
public default void log(Level level, Object obj)
```

Logs a message produced from the given object.

If the logger is currently enabled for the given log message level then
a message is logged that, by default, is the result produced from
calling  toString on the given object.
Otherwise, the object is not operated on.

Parameters:

- `level`: the log message level.
- `obj`: the object to log.

**Implementation requirements:** When logging is enabled for the given level, the default
implementation for this method calls
`this.log(level, (ResourceBundle)null, obj.toString(), (Object[])null);`

Throws:

- `NullPointerException`: if `level` is `null`, or `obj` is `null`.

## System.log(Level, String, Throwable)

```java
public default void log(Level level, String msg, Throwable thrown)
```

Logs a message associated with a given throwable.

Parameters:

- `level`: the log message level.
- `msg`: the string message (or a key in the message catalog, if this logger is a java.util.ResourceBundle, java.lang.Module) localized logger); can be `null`.
- `thrown`: a `Throwable` associated with the log message; can be `null`.

**Implementation requirements:** The default implementation for this method calls
`this.log(level, (ResourceBundle)null, msg, thrown);`

Throws:

- `NullPointerException`: if `level` is `null`.

## System.log(Level, Supplier<String>, Throwable)

```java
public default void log(Level level, Supplier<String> msgSupplier, Throwable thrown)
```

Logs a lazily supplied message associated with a given throwable.

If the logger is currently enabled for the given log message level
then a message is logged that is the result produced by the
given supplier function.  Otherwise, the supplier is not operated on.

Parameters:

- `level`: one of the log message level identifiers.
- `msgSupplier`: a supplier function that produces a message.
- `thrown`: a `Throwable` associated with log message; can be `null`.

**Implementation requirements:** When logging is enabled for the given level, the default
implementation for this method calls
`this.log(level, (ResourceBundle)null, msgSupplier.get(), thrown);`

Throws:

- `NullPointerException`: if `level` is `null`, or `msgSupplier` is `null`.

## System.log(Level, String, Object...)

```java
public default void log(Level level, String format, Object... params)
```

Logs a message with an optional list of parameters.

Parameters:

- `level`: one of the log message level identifiers.
- `format`: the string message format in `java.text.MessageFormat` format, (or a key in the message catalog, if this logger is a java.util.ResourceBundle, java.lang.Module) localized logger); can be `null`.
- `params`: an optional list of parameters to the message (may be none).

**Implementation requirements:** The default implementation for this method calls
`this.log(level, (ResourceBundle)null, format, params);`

Throws:

- `NullPointerException`: if `level` is `null`.

## System.log(Level, ResourceBundle, String, Throwable)

```java
public void log(Level level, ResourceBundle bundle, String msg, Throwable thrown)
```

Logs a localized message associated with a given throwable.

If the given resource bundle is non-`null`,  the `msg`
string is localized using the given resource bundle.
Otherwise the `msg` string is not localized.

Parameters:

- `level`: the log message level.
- `bundle`: a resource bundle to localize `msg`; can be `null`.
- `msg`: the string message (or a key in the message catalog, if `bundle` is not `null`); can be `null`.
- `thrown`: a `Throwable` associated with the log message; can be `null`.

Throws:

- `NullPointerException`: if `level` is `null`.

## System.log(Level, ResourceBundle, String, Object...)

```java
public void log(Level level, ResourceBundle bundle, String format, Object... params)
```

Logs a message with resource bundle and an optional list of
parameters.

If the given resource bundle is non-`null`,  the `format`
string is localized using the given resource bundle.
Otherwise the `format` string is not localized.

Parameters:

- `level`: the log message level.
- `bundle`: a resource bundle to localize `format`; can be `null`.
- `format`: the string message format in `java.text.MessageFormat` format, (or a key in the message catalog if `bundle` is not `null`); can be `null`.
- `params`: an optional list of parameters to the message (may be none).

Throws:

- `NullPointerException`: if `level` is `null`.

## System.LoggerFinder()

```java
protected LoggerFinder()
```

Creates a new instance of `LoggerFinder`.

**Implementation note:** It is recommended that a `LoggerFinder` service
  implementation does not perform any heavy initialization in its
  constructor, in order to avoid possible risks of deadlock or class
  loading cycles during the instantiation of the service provider.

## System.getLogger(String, Module)

```java
public abstract Logger getLogger(String name, Module module)
```

Returns an instance of Logger
for the given `module`.

Parameters:

- `name`: the name of the logger.
- `module`: the module for which the logger is being requested.

**Returns:** a logger suitable for use within the given
        module.

Throws:

- `NullPointerException`: if `name` is `null` or `module` is `null`.

## System.getLocalizedLogger(String, ResourceBundle, Module)

```java
public Logger getLocalizedLogger(String name, ResourceBundle bundle, Module module)
```

Returns a localizable instance of Logger
for the given `module`.
The returned logger will use the provided resource bundle for
message localization.

Parameters:

- `name`: the name of the logger.
- `bundle`: a resource bundle; can be `null`.
- `module`: the module for which the logger is being requested.

**Implementation requirements:** By default, this method calls java.lang.Module) this.getLogger(name, module) to obtain a logger, then wraps that
logger in a `Logger` instance where all methods that do not
take a `ResourceBundle` as parameter are redirected to one
which does - passing the given `bundle` for
localization. So for instance, a call to String) Logger.log(Level.INFO, msg)
will end up as a call to ResourceBundle, String, Object...) Logger.log(Level.INFO, bundle, msg, (Object[])null) on the wrapped
logger instance.
Note however that by default, string messages returned by Supplier<String> will not be
localized, as it is assumed that such strings are messages which are
already constructed, rather than keys in a resource bundle.

An implementation of `LoggerFinder` may override this method,
for example, when the underlying logging backend provides its own
mechanism for localizing log messages, then such a
`LoggerFinder` would be free to return a logger
that makes direct use of the mechanism provided by the backend.

**Returns:** an instance of Logger  which will use the
provided resource bundle for message localization.

Throws:

- `NullPointerException`: if `name` is `null` or `module` is `null`.

## System.getLoggerFinder()

```java
public static LoggerFinder getLoggerFinder()
```

Returns the `LoggerFinder` instance. There is one
single system-wide `LoggerFinder` instance in
the Java Runtime.  See the class specification of how the
LoggerFinder implementation is located and
loaded.

**Returns:** the LoggerFinder instance.

## System.getLogger(String)

```java
public static Logger getLogger(String name)
```

Returns an instance of Logger for the caller's
use.

Parameters:

- `name`: the name of the logger.

**Implementation requirements:** Instances returned by this method route messages to loggers
obtained by calling java.lang.Module) LoggerFinder.getLogger(name, module), where
`module` is the caller's module.
In cases where `System.getLogger` is called from a context where
there is no caller frame on the stack (e.g when called directly
from a JNI attached thread), `IllegalCallerException` is thrown.
To obtain a logger in such a context, use an auxiliary class that will
implicitly be identified as the caller, or use the system LoggerFinder to obtain a logger instead.
Note that doing the latter may eagerly initialize the underlying
logging system.

**API note:** This method may defer calling the java.lang.Module) LoggerFinder.getLogger method to create an actual logger supplied by
the logging backend, for instance, to allow loggers to be obtained during
the system initialization time.

**Returns:** an instance of `Logger` that can be used by the calling
        class.

**Since:** 9

Throws:

- `NullPointerException`: if `name` is `null`.
- `IllegalCallerException`: if there is no Java caller frame on the stack.

## System.getLogger(String, ResourceBundle)

```java
public static Logger getLogger(String name, ResourceBundle bundle)
```

Returns a localizable instance of Logger for the caller's use.
The returned logger will use the provided resource bundle for message
localization.

Parameters:

- `name`: the name of the logger.
- `bundle`: a resource bundle.

**Implementation requirements:** The returned logger will perform message localization as specified
by java.util.ResourceBundle, java.lang.Module) LoggerFinder.getLocalizedLogger(name, bundle, module), where
`module` is the caller's module.
In cases where `System.getLogger` is called from a context where
there is no caller frame on the stack (e.g when called directly
from a JNI attached thread), `IllegalCallerException` is thrown.
To obtain a logger in such a context, use an auxiliary class that
will implicitly be identified as the caller, or use the system LoggerFinder to obtain a logger instead.
Note that doing the latter may eagerly initialize the underlying
logging system.

**API note:** This method is intended to be used after the system is fully initialized.
This method may trigger the immediate loading and initialization
of the `LoggerFinder` service, which may cause issues if the
Java Runtime is not ready to initialize the concrete service
implementation yet.
System classes which may be loaded early in the boot sequence and
need to log localized messages should create a logger using
`getLogger(java.lang.String)` and then use the log methods that
take a resource bundle as parameter.

**Returns:** an instance of `Logger` which will use the provided
resource bundle for message localization.

**Since:** 9

Throws:

- `NullPointerException`: if `name` is `null` or `bundle` is `null`.
- `IllegalCallerException`: if there is no Java caller frame on the stack.

## System.exit(int)

```java
public static void exit(int status)
```

Initiates the shutdown sequence of the Java Virtual
Machine. This method initiates the shutdown sequence (if it is not already initiated)
and then blocks indefinitely. This method neither returns nor throws an exception;
that is, it does not complete either normally or abruptly.

The argument serves as a status code. By convention, a nonzero status code
indicates abnormal termination.

The call `System.exit(n)` is effectively equivalent to the call:

Parameters:

- `status`: exit status.

**Implementation note:** The initiation of the shutdown sequence is logged by `Runtime.exit(int)`.

**See also:** java.lang.Runtime#exit(int)

## System.gc()

```java
public static void gc()
```

Runs the garbage collector in the Java Virtual Machine.

Calling the `gc` method suggests that the Java Virtual Machine
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

The call `System.gc()` is effectively equivalent to the
call:

```java
Runtime.getRuntime().gc()
```

**See also:** java.lang.Runtime#gc()

## System.runFinalization()

```java
public static void runFinalization()
```

Runs the finalization methods of any objects pending finalization.

Calling this method suggests that the Java Virtual Machine expend
effort toward running the `finalize` methods of objects
that have been found to be discarded but whose `finalize`
methods have not yet been run. When control returns from the
method call, the Java Virtual Machine has made a best effort to
complete all outstanding finalizations.

The call `System.runFinalization()` is effectively
equivalent to the call:

```java
Runtime.getRuntime().runFinalization()
```

**Deprecated:** Finalization has been deprecated for removal.  See
`java.lang.Object.finalize` for background information and details
about migration options.

When running in a JVM in which finalization has been disabled or removed,
no objects will be pending finalization, so this method does nothing.

**See also:** java.lang.Runtime#runFinalization()

**JLS:** 12.6 Finalization of Class Instances

## System.load(String)

```java
public static void load(String filename)
```

Loads the native library specified by the filename argument.  The filename
argument must be an absolute path name.

If the filename argument, when stripped of any platform-specific library
prefix, path, and file extension, indicates a library whose name is,
for example, L, and a native library called L is statically linked
with the VM, then the JNI_OnLoad_L function exported by the library
is invoked rather than attempting to load a dynamic library.
A filename matching the argument does not have to exist in the
file system.
See the  JNI Specification
for more details.

Otherwise, the filename argument is mapped to a native library image in
an implementation-dependent manner.

The call `System.load(name)` is effectively equivalent
to the call:

```java
Runtime.getRuntime().load(name)
```

Parameters:

- `filename`: the file to load.

**See also:** java.lang.Runtime#load(java.lang.String)

Throws:

- `UnsatisfiedLinkError`: if either the filename is not an absolute path name, the native library is not statically linked with the VM, or the library cannot be mapped to a native library image by the host system.
- `NullPointerException`: if `filename` is `null`
- `IllegalCallerException`: if the caller is in a module that does not have native access enabled.
