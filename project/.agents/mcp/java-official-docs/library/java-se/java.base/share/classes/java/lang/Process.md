---
title: "Process class (java.lang) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Process.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Process class (java.lang)

```java
public abstract class Process
```

`Process` provides control of native processes started by
`ProcessBuilder.start` and `Runtime.exec`.
The class provides methods for performing input from the process, performing
output to the process, waiting for the process to complete,
checking the exit status of the process, and destroying (killing)
the process.
The `ProcessBuilder.start()` and
Runtime.exec
methods create a native process and return an instance of a
subclass of `Process` that can be used to control the process
and obtain information about it.

The methods that create processes may not work well for special
processes on certain native platforms, such as native windowing
processes, daemon processes, Win16/DOS processes on Microsoft
Windows, or shell scripts.

By default, the created process does not have its own terminal
or console.  All its standard I/O (i.e. stdin, stdout, stderr)
operations will be redirected to the parent process, where they can
be accessed via the streams obtained using the methods
`getOutputStream()`,
`getInputStream()`, and
`getErrorStream()`.
The I/O streams of characters and lines can be written and read using the methods
`outputWriter()`, `outputWriter(Charset)`,
`inputReader()`, `inputReader(Charset)`,
`errorReader()`, and `errorReader(Charset)`.
The parent process uses these streams to feed input to and get output
from the process.  Because some native platforms only provide
limited buffer size for standard input and output streams, failure
to promptly write the input stream or read the output stream of
the process may cause the process to block, or even deadlock.

Where desired,
process I/O can also be redirected
using methods of the `ProcessBuilder` class.

There is no requirement that the process represented by a `Process` object execute asynchronously or concurrently with respect
to the Java process that owns the `Process` object.

As of 1.5, `ProcessBuilder.start()` is the preferred way
to create a `Process`.

Subclasses of Process should override the `onExit()` and
`toHandle()` methods to provide a fully functional Process including the
process id,
information about the process,
direct children, and
direct children plus descendants of those children of the process.
Delegating to the underlying Process or ProcessHandle is typically
easiest and most efficient.

#### Resource Usage

Starting a process uses resources in both the invoking process and the invoked
process and for the communication streams between them.
The resources to control the process and for communication between the processes are retained
until there are no longer any references to the Process or the input, error, and output streams
or readers, or they have been closed.

The process is not killed when there are no more references to the `Process` object,
but rather the process continues executing asynchronously.
The process implementation closes file descriptors and handles for streams
that are no longer referenced to prevent leaking operating system resources.
Processes that have terminated or been terminated are monitored and their resources released.

Streams should be `closed` when they are no longer needed, to avoid delaying
releasing the operating system resources.
`Try-with-resources` can be used to open and close the streams.

For example, to capture the output of a program known to produce some output and then exit:

Stream resources (file descriptor or handle) are always paired; one in the invoking process
and the other end of that connection in the invoked process.
Closing a stream at either end terminates communication but does not have any direct effect
on the other Process. The closing of the stream typically results in the other process exiting.

 Destroying a process signals the operating system to terminate the process.
It is up to the operating system to clean up and release the resources of that process.
Typically, file descriptors and handles are closed. When they are closed, any connections to
other processes are terminated and file descriptors and handles in the invoking process signal
end-of-file or closed. Usually, that is seen as an end-of-file or an exception.

**Since:** 1.0

## Process.Process()

```java
public Process()
```

Default constructor for Process.

## Process.getOutputStream()

```java
public abstract OutputStream getOutputStream()
```

Returns the output stream connected to the normal input of the
process.  Output to the stream is piped into the standard
input of the process represented by this `Process` object.

If the standard input of the process has been redirected using
ProcessBuilder.redirectInput
then this method will return a
null output stream.

The output stream should be closed
when it is no longer needed.

**API note:** When writing to both `getOutputStream()` and either `outputWriter()`
or `outputWriter(Charset)`, BufferedWriter.flush
should be called before writes to the `OutputStream`.

**Implementation note:** Implementation note: It is a good idea for the returned
output stream to be buffered.

**Returns:** the output stream connected to the normal input of the
        process

## Process.getInputStream()

```java
public abstract InputStream getInputStream()
```

Returns the input stream connected to the normal output of the
process.  The stream obtains data piped from the standard
output of the process represented by this `Process` object.

If the standard output of the process has been redirected using
ProcessBuilder.redirectOutput
then this method will return a
null input stream.

Otherwise, if the standard error of the process has been
redirected using
ProcessBuilder.redirectErrorStream
then the input stream returned by this method will receive the
merged standard output and the standard error of the process.

The input stream should be closed
when it is no longer needed.

**API note:** Use either this method or an input reader
but not both on the same `Process`.
The input reader consumes and buffers bytes from the input stream.
Bytes read from the input stream would not be seen by the reader and
buffer contents are unpredictable.

**Implementation note:** Implementation note: It is a good idea for the returned
input stream to be buffered.

**Returns:** the input stream connected to the normal output of the
        process

## Process.getErrorStream()

```java
public abstract InputStream getErrorStream()
```

Returns the input stream connected to the error output of the
process.  The stream obtains data piped from the error output
of the process represented by this `Process` object.

If the standard error of the process has been redirected using
ProcessBuilder.redirectError or
ProcessBuilder.redirectErrorStream
then this method will return a
null input stream.

The error stream should be closed
when it is no longer needed.

**API note:** Use either this method or an error reader
but not both on the same `Process`.
The error reader consumes and buffers bytes from the error stream.
Bytes read from the error stream would not be seen by the reader and the
buffer contents are unpredictable.

**Implementation note:** Implementation note: It is a good idea for the returned
input stream to be buffered.

**Returns:** the input stream connected to the error output of
        the process

## Process.inputReader()

```java
public final BufferedReader inputReader()
```

Returns a BufferedReader connected to the standard
output of the process. The `Charset` for the native encoding is used
to read characters, lines, or stream lines from standard output.

This method delegates to `inputReader(Charset)` using the
`Charset` named by the `native.encoding` system property.
If the `native.encoding` is not a valid charset name or not supported
the `Charset.defaultCharset()` is used.

The reader should be closed
when it is no longer needed.

**API note:** Use either this method or the input stream
but not both on the same `Process`.
The input reader consumes and buffers bytes from the input stream.
Bytes read from the input stream would not be seen by the reader and the
buffer contents are unpredictable.

**Returns:** a BufferedReader using the
         `native.encoding` if supported, otherwise, the
         `Charset.defaultCharset()`

**Since:** 17

## Process.inputReader(Charset)

```java
public final BufferedReader inputReader(Charset charset)
```

Returns a BufferedReader connected to the
standard output of this process using a Charset.
The `BufferedReader` can be used to read characters, lines,
or stream lines of the standard output.

Characters are read by an InputStreamReader that reads and decodes bytes
from this process `getInputStream()`. Bytes are decoded to characters
using the `charset`; malformed-input and unmappable-character
sequences are replaced with the charset's default replacement.
The `BufferedReader` reads and buffers characters from the InputStreamReader.

The first call to this method creates the BufferedReader,
if called again with the same `charset` the same `BufferedReader` is returned.
It is an error to call this method again with a different `charset`.

If the standard output of the process has been redirected using
ProcessBuilder.redirectOutput
then the `InputStreamReader` will be reading from a
null input stream.

The reader should be closed
when it is no longer needed.

Otherwise, if the standard error of the process has been redirected using
ProcessBuilder.redirectErrorStream then the input reader returned by
this method will receive the merged standard output and the standard error
of the process.

Parameters:

- `charset`: the `Charset` used to decode bytes to characters

**API note:** Use either this method or the input stream
but not both on the same `Process`.
The input reader consumes and buffers bytes from the input stream.
Bytes read from the input stream would not be seen by the reader and the
buffer contents are unpredictable.

When the process has terminated, and the standard input has not been redirected,
reading of the bytes available from the underlying stream is on a best effort basis and
may be unpredictable.

**Returns:** a `BufferedReader` for the standard output of the process using the `charset`

**Since:** 17

Throws:

- `NullPointerException`: if the `charset` is `null`
- `IllegalStateException`: if called more than once with different charset arguments

## Process.errorReader()

```java
public final BufferedReader errorReader()
```

Returns a BufferedReader connected to the standard
error of the process. The `Charset` for the native encoding is used
to read characters, lines, or stream lines from standard error.

This method delegates to `errorReader(Charset)` using the
`Charset` named by the `native.encoding` system property.
If the `native.encoding` is not a valid charset name or not supported
the `Charset.defaultCharset()` is used.

The error reader should be closed
when it is no longer needed.

**API note:** Use either this method or the error stream
but not both on the same `Process`.
The error reader consumes and buffers bytes from the error stream.
Bytes read from the error stream would not be seen by the reader and the
buffer contents are unpredictable.

**Returns:** a BufferedReader using the
         `native.encoding` if supported, otherwise, the
         `Charset.defaultCharset()`

**Since:** 17

## Process.errorReader(Charset)

```java
public final BufferedReader errorReader(Charset charset)
```

Returns a BufferedReader connected to the
standard error of this process using a Charset.
The `BufferedReader` can be used to read characters, lines,
or stream lines of the standard error.

Characters are read by an InputStreamReader that reads and decodes bytes
from this process `getErrorStream()`. Bytes are decoded to characters
using the `charset`; malformed-input and unmappable-character
sequences are replaced with the charset's default replacement.
The `BufferedReader` reads and buffers characters from the InputStreamReader.

The first call to this method creates the BufferedReader,
if called again with the same `charset` the same `BufferedReader` is returned.
It is an error to call this method again with a different `charset`.

If the standard error of the process has been redirected using
ProcessBuilder.redirectError or
ProcessBuilder.redirectErrorStream
then the `InputStreamReader` will be reading from a
null input stream.

The error reader should be closed
when it is no longer needed.

Parameters:

- `charset`: the `Charset` used to decode bytes to characters

**API note:** Use either this method or the error stream
but not both on the same `Process`.
The error reader consumes and buffers bytes from the error stream.
Bytes read from the error stream would not be seen by the reader and the
buffer contents are unpredictable.

When the process has terminated, and the standard error has not been redirected,
reading of the bytes available from the underlying stream is on a best effort basis and
may be unpredictable.

**Returns:** a `BufferedReader` for the standard error of the process using the `charset`

**Since:** 17

Throws:

- `NullPointerException`: if the `charset` is `null`
- `IllegalStateException`: if called more than once with different charset arguments

## Process.outputWriter()

```java
public final BufferedWriter outputWriter()
```

Returns a `BufferedWriter` connected to the normal input of the process
using the native encoding.
Writes text to a character-output stream, buffering characters to provide
for the efficient writing of single characters, arrays, and strings.

This method delegates to `outputWriter(Charset)` using the
`Charset` named by the `native.encoding` system property.
If the `native.encoding` is not a valid charset name or not supported
the `Charset.defaultCharset()` is used.

The output writer should be closed
when it is no longer needed.

**Returns:** a `BufferedWriter` to the standard input of the process using the charset
         for the `native.encoding` system property

**Since:** 17
