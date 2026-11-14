---
title: "ProcessBuilder class (java.lang) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/ProcessBuilder.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ProcessBuilder class (java.lang)

```java
public final class ProcessBuilder
```

This class is used to create operating system processes.

Each `ProcessBuilder` instance manages a collection
of process attributes.  The `start()` method creates a new
`Process` instance with those attributes.  The `start()` method can be invoked repeatedly from the same instance
to create new subprocesses with identical or related attributes.

The startPipeline method can be invoked to create
a pipeline of new processes that send the output of each process
directly to the next process.  Each process has the attributes of
its respective ProcessBuilder.

Each process builder manages these process attributes:

- a *command*, a list of strings which signifies the
external program file to be invoked and its arguments, if any.
Which string lists represent a valid operating system command is
system-dependent.  For example, it is common for each conceptual
argument to be an element in this list, but there are operating
systems where programs are expected to tokenize command line
strings themselves - on such a system a Java implementation might
require commands to contain exactly two elements.

- an *environment*, which is a system-dependent mapping from
*variables* to *values*.  The initial value is a copy of
the environment of the current process (see `System.getenv()`).

- a *working directory*.  The default value is the current
working directory of the current process, usually the directory
named by the system property `user.dir`.

- a source of *standard input*.
By default, the subprocess reads input from a pipe.  Java code
can access this pipe via the output stream returned by
`Process.getOutputStream()`.  However, standard input may
be redirected to another source using
redirectInput.
In this case, `Process.getOutputStream()` will return a
*null output stream*, for which:

- the write methods always
throw `IOException`

- the close method does nothing

- a destination for *standard output*
and *standard error*.  By default, the subprocess writes standard
output and standard error to pipes.  Java code can access these pipes
via the input streams returned by `Process.getInputStream()` and
`Process.getErrorStream()`.  However, standard output and
standard error may be redirected to other destinations using
redirectOutput and
redirectError.
In this case, `Process.getInputStream()` and/or
`Process.getErrorStream()` will return a *null input
stream*, for which:

- the read methods always return
`-1`

- the available method always returns
`0`

- the close method does nothing

- a *redirectErrorStream* property.  Initially, this property
is `false`, meaning that the standard output and error
output of a subprocess are sent to two separate streams, which can
be accessed using the `Process.getInputStream()` and `Process.getErrorStream()` methods.

If the value is set to `true`, then:

- standard error is merged with the standard output and always sent
to the same destination (this makes it easier to correlate error
messages with the corresponding output)

- the common destination of standard error and standard output can be
redirected using
redirectOutput

- any redirection set by the
redirectError
method is ignored when creating a subprocess

- the stream returned from `Process.getErrorStream()` will
always be a null input stream

Modifying a process builder's attributes will affect processes
subsequently started by that object's `start()` method, but
will never affect previously started processes or the Java process
itself.

Most error checking is performed by the `start()` method.
It is possible to modify the state of an object so that `start()` will fail.  For example, setting the command attribute to
an empty list will not throw an exception unless `start()`
is invoked.

**Note that this class is not synchronized.**
If multiple threads access a `ProcessBuilder` instance
concurrently, and at least one of the threads modifies one of the
attributes structurally, it *must* be synchronized externally.

Starting a new process which uses the default working directory
and environment is easy:

Here is an example that starts a process with a modified working
directory and environment, and redirects standard output and error
to be appended to a log file:

To start a process with an explicit set of environment
variables, first call Map.clear()
before adding environment variables.

Unless otherwise noted, passing a `null` argument to a constructor
or method in this class will cause a `NullPointerException` to be
thrown.

**Since:** 1.5

## ProcessBuilder.ProcessBuilder(List<String>)

```java
public ProcessBuilder(List<String> command)
```

Constructs a process builder with the specified operating
system program and arguments.  This constructor does *not*
make a copy of the `command` list.  Subsequent
updates to the list will be reflected in the state of the
process builder.  It is not checked whether
`command` corresponds to a valid operating system
command.

Parameters:

- `command`: the list containing the program and its arguments

## ProcessBuilder.ProcessBuilder(String...)

```java
public ProcessBuilder(String... command)
```

Constructs a process builder with the specified operating
system program and arguments.  This is a convenience
constructor that sets the process builder's command to a string
list containing the same strings as the `command`
array, in the same order.  It is not checked whether
`command` corresponds to a valid operating system
command.

Parameters:

- `command`: a string array containing the program and its arguments

## ProcessBuilder.command(List<String>)

```java
public ProcessBuilder command(List<String> command)
```

Sets this process builder's operating system program and
arguments.  This method does *not* make a copy of the
`command` list.  Subsequent updates to the list will
be reflected in the state of the process builder.  It is not
checked whether `command` corresponds to a valid
operating system command.

Parameters:

- `command`: the list containing the program and its arguments

**Returns:** this process builder

## ProcessBuilder.command(String...)

```java
public ProcessBuilder command(String... command)
```

Sets this process builder's operating system program and
arguments.  This is a convenience method that sets the command
to a string list containing the same strings as the
`command` array, in the same order.  It is not
checked whether `command` corresponds to a valid
operating system command.

Parameters:

- `command`: a string array containing the program and its arguments

**Returns:** this process builder

## ProcessBuilder.command()

```java
public List<String> command()
```

Returns this process builder's operating system program and
arguments.  The returned list is *not* a copy.  Subsequent
updates to the list will be reflected in the state of this
process builder.

**Returns:** this process builder's program and its arguments

## ProcessBuilder.environment()

```java
public Map<String,String> environment()
```

Returns a string map view of this process builder's environment.

Whenever a process builder is created, the environment is
initialized to a copy of the current process environment (see
`System.getenv()`).  Subprocesses subsequently started by
this object's `start()` method will use this map as
their environment.

The returned object may be modified using ordinary Map operations.  These modifications will be
visible to subprocesses started via the `start()`
method.  Two `ProcessBuilder` instances always
contain independent process environments, so changes to the
returned map will never be reflected in any other
`ProcessBuilder` instance or the values returned by
System.getenv.

If the system does not support environment variables, an
empty map is returned.

The returned map does not permit null keys or values.
Attempting to insert or query the presence of a null key or
value will throw a `NullPointerException`.
Attempting to query the presence of a key or value which is not
of type `String` will throw a `ClassCastException`.

The behavior of the returned map is system-dependent.  A
system may not allow modifications to environment variables or
may forbid certain variable names or values.  For this reason,
attempts to modify the map may fail with
`UnsupportedOperationException` or
`IllegalArgumentException`
if the modification is not permitted by the operating system.

Since the external format of environment variable names and
values is system-dependent, there may not be a one-to-one
mapping between them and Java's Unicode strings.  Nevertheless,
the map is implemented in such a way that environment variables
which are not modified by Java code will have an unmodified
native representation in the subprocess.

The returned map and its collection views may not obey the
general contract of the `Object.equals` and
`Object.hashCode` methods.

The returned map is typically case-sensitive on all platforms.

When passing information to a Java subprocess,
system properties
are generally preferred over environment variables.

**Returns:** this process builder's environment

**See also:** Runtime#exec(String[],String[],java.io.File)

**See also:** System#getenv()

## ProcessBuilder.directory()

```java
public File directory()
```

Returns this process builder's working directory.

Subprocesses subsequently started by this object's `start()` method will use this as their working directory.
The returned value may be `null` -- this means to use
the working directory of the current Java process, usually the
directory named by the system property `user.dir`,
as the working directory of the child process.

**Returns:** this process builder's working directory

## ProcessBuilder.directory(File)

```java
public ProcessBuilder directory(File directory)
```

Sets this process builder's working directory.

Subprocesses subsequently started by this object's `start()` method will use this as their working directory.
The argument may be `null` -- this means to use the
working directory of the current Java process, usually the
directory named by the system property `user.dir`,
as the working directory of the child process.

Parameters:

- `directory`: the new working directory

**Returns:** this process builder

## ProcessBuilder.type()

```java
public abstract Type type()
```

Returns the type of this `Redirect`.

**Returns:** the type of this `Redirect`

## ProcessBuilder.PIPE

```java
public static final Redirect PIPE
```

Indicates that subprocess I/O will be connected to the
current Java process over a pipe.

This is the default handling of subprocess standard I/O.

It will always be true that

## ProcessBuilder.INHERIT

```java
public static final Redirect INHERIT
```

Indicates that subprocess I/O source or destination will be the
same as those of the current process.  This is the normal
behavior of most operating system command interpreters (shells).

It will always be true that

## ProcessBuilder.DISCARD

```java
public static final Redirect DISCARD
```

Indicates that subprocess output will be discarded.
A typical implementation discards the output by writing to
an operating system specific "null file".

It will always be true that

**Since:** 9

## ProcessBuilder.file()

```java
public File file()
```

Returns the `File` source or destination associated
with this redirect, or `null` if there is no such file.

**Returns:** the file associated with this redirect,
        or `null` if there is no such file

## ProcessBuilder.from(File)

```java
public static Redirect from(final File file)
```

Returns a redirect to read from the specified file.

It will always be true that

Parameters:

- `file`: The `File` for the `Redirect`.

**Returns:** a redirect to read from the specified file

## ProcessBuilder.to(File)

```java
public static Redirect to(final File file)
```

Returns a redirect to write to the specified file.
If the specified file exists when the subprocess is started,
its previous contents will be discarded.

It will always be true that

Parameters:

- `file`: The `File` for the `Redirect`.

**Returns:** a redirect to write to the specified file

## ProcessBuilder.appendTo(File)

```java
public static Redirect appendTo(final File file)
```

Returns a redirect to append to the specified file.
Each write operation first advances the position to the
end of the file and then writes the requested data.
Whether the advancement of the position and the writing
of the data are done in a single atomic operation is
system-dependent and therefore unspecified.

It will always be true that

Parameters:

- `file`: The `File` for the `Redirect`.

**Returns:** a redirect to append to the specified file

## ProcessBuilder.equals(Object)

```java
public boolean equals(Object obj)
```

Compares the specified object with this `Redirect` for
equality.  Returns `true` if and only if the two
objects are identical or both objects are `Redirect`
instances of the same type associated with non-null equal
`File` instances.

## ProcessBuilder.hashCode()

```java
public int hashCode()
```

Returns a hash code value for this `Redirect`.

**Returns:** a hash code value for this `Redirect`

## ProcessBuilder.redirectInput(Redirect)

```java
public ProcessBuilder redirectInput(Redirect source)
```

Sets this process builder's standard input source.

Subprocesses subsequently started by this object's `start()`
method obtain their standard input from this source.

If the source is Redirect.PIPE
(the initial value), then the standard input of a
subprocess can be written to using the output stream
returned by `Process.getOutputStream()`.
If the source is set to any other value, then
`Process.getOutputStream()` will return a
null output stream.

Parameters:

- `source`: the new standard input source

**Returns:** this process builder

**Since:** 1.7

Throws:

- `IllegalArgumentException`: if the redirect does not correspond to a valid source of data, that is, has type WRITE or APPEND

## ProcessBuilder.redirectOutput(Redirect)

```java
public ProcessBuilder redirectOutput(Redirect destination)
```

Sets this process builder's standard output destination.

Subprocesses subsequently started by this object's `start()`
method send their standard output to this destination.

If the destination is Redirect.PIPE
(the initial value), then the standard output of a subprocess
can be read using the input stream returned by `Process.getInputStream()`.
If the destination is set to any other value, then
`Process.getInputStream()` will return a
null input stream.

Parameters:

- `destination`: the new standard output destination

**Returns:** this process builder

**Since:** 1.7

Throws:

- `IllegalArgumentException`: if the redirect does not correspond to a valid destination of data, that is, has type READ
