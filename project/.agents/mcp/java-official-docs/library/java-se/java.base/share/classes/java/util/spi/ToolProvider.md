---
title: "ToolProvider interface (java.util.spi)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/spi/ToolProvider.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ToolProvider interface (java.util.spi)

```java
public interface ToolProvider
```

An interface for command-line tools to provide a way to
be invoked without necessarily starting a new VM.

Tool providers are normally located using the service-provider
loading facility defined by `ServiceLoader`.
Each provider must provide a name, and a method to run
an instance of the corresponding tool. When a tool is run,
it will be provided with an array of string arguments, and a
pair of streams: one for normal (or expected) output and the other
for reporting any errors that may occur.
The interpretation of the string arguments will normally be defined by
each individual tool provider, but will generally correspond to the
arguments that could be provided to the tool when invoking the tool
from the command line.

**Since:** 9

## ToolProvider.name()

```java
String name()
```

Returns the name of this tool provider.

**API note:** It is recommended that the name be the same as would be
used on the command line: for example, "javac", "jar", "jlink".

**Returns:** the name of this tool provider

## ToolProvider.description()

```java
default Optional<String> description()
```

**API note:** It is recommended that the description fits into a single
line in order to allow creating concise overviews like the following:

```java
jar
  Create, manipulate, and extract an archive of classes and resources.
javac
  Read Java declarations and compile them into class files.
jlink
  Assemble a set of modules (...) into a custom runtime image.
```

**Implementation requirements:** This implementation returns an empty `Optional`.

**Since:** 19

## ToolProvider.run(PrintWriter, PrintWriter, String...)

```java
int run(PrintWriter out, PrintWriter err, String... args)
```

Runs an instance of the tool, returning zero for a successful run.
Any non-zero return value indicates a tool-specific error during the
execution.

Two streams should be provided, for "expected" output, and for any
error messages. If it is not necessary to distinguish the output,
the same stream may be used for both.

Parameters:

- `out`: a stream to which "expected" output should be written
- `err`: a stream to which any error messages should be written
- `args`: the command-line arguments for the tool

**API note:** The interpretation of the arguments will be specific to
each tool.

**Returns:** the result of executing the tool.
        A return value of 0 means the tool did not encounter any errors;
        any other value indicates that at least one error occurred
        during execution.

Throws:

- `NullPointerException`: if any of the arguments are `null`, or if there are any `null` values in the `args` array

## ToolProvider.run(PrintStream, PrintStream, String...)

```java
default int run(PrintStream out, PrintStream err, String... args)
```

Runs an instance of the tool, returning zero for a successful run.
Any non-zero return value indicates a tool-specific error during the
execution.

Two streams should be provided, for "expected" output, and for any
error messages. If it is not necessary to distinguish the output,
the same stream may be used for both.

Parameters:

- `out`: a stream to which "expected" output should be written
- `err`: a stream to which any error messages should be written
- `args`: the command-line arguments for the tool

**API note:** The interpretation of the arguments will be specific to
each tool.

**Implementation note:** This implementation wraps the `out` and `err`
streams within `PrintWriter`s, and then calls
PrintWriter, String[]).

**Returns:** the result of executing the tool.
        A return value of 0 means the tool did not encounter any errors;
        any other value indicates that at least one error occurred
        during execution.

Throws:

- `NullPointerException`: if any of the arguments are `null`, or if there are any `null` values in the `args` array

## ToolProvider.findFirst(String)

```java
static Optional<ToolProvider> findFirst(String name)
```

Returns the first instance of a `ToolProvider` with the given name,
as loaded by `ServiceLoader` using the system class loader.

Parameters:

- `name`: the name of the desired tool provider

**Returns:** an `Optional<ToolProvider>` of the first instance found

Throws:

- `NullPointerException`: if `name` is `null`
