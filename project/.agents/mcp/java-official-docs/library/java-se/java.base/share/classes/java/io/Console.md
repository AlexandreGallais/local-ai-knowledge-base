---
title: "Console class (java.io) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/Console.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Console class (java.io)

```java
public sealed class Console implements Flushable permits ProxyingConsole
```

Methods to access the character-based console device, if any, associated
with the current Java virtual machine.

 Whether a virtual machine has a console is dependent upon the
underlying platform and also upon the manner in which the virtual
machine is invoked.  If the virtual machine is started from an
interactive command line without redirecting the standard input and
output streams then its console will exist and will typically be
connected to the keyboard and display from which the virtual machine
was launched.  If the virtual machine is started automatically, for
example by a background job scheduler, then it may not
have a console.

If this virtual machine has a console then it is represented by a
unique instance of this class which can be obtained by invoking the
`java.lang.System.console()` method.  If no console device is
available then an invocation of that method will return `null`.

Read and write operations are synchronized to guarantee the atomic
completion of critical operations; therefore invoking methods
`readLine()`, `readPassword()`, format(),
printf() as well as the read, format and write operations
on the objects returned by `reader()` and `writer()` may
block in multithreaded scenarios.

Read and write operations use the `Charset`s specified by
stdin.encoding and stdout.encoding, respectively. The
`Charset` used for write operations can also be retrieved using
the `charset()` method. Since `Console` is intended for
interactive use on a terminal, these charsets are typically the same.

Operations that format strings are locale sensitive, using either the
specified `Locale`, or the
default format Locale to produce localized
formatted strings.

Invoking `close()` on the objects returned by the `reader()`
and the `writer()` will not close the underlying stream of those
objects.

The console-read methods return `null` when the end of the
console input stream is reached, for example by typing control-D on
Unix or control-Z on Windows.  Subsequent read operations will succeed
if additional characters are later entered on the console's input
device.

Unless otherwise specified, passing a `null` argument to any method
in this class will cause a `NullPointerException` to be thrown.

**Security note:**
If an application needs to read a password or other secure data, it should
use `readPassword()` or Object...) and
manually zero the returned character array after processing to minimize the
lifetime of sensitive data in memory.

**Since:** 1.6

## Console.writer()

```java
public PrintWriter writer()
```

Retrieves the unique PrintWriter object
associated with this console.

**Returns:** The printwriter associated with this console

## Console.reader()

```java
public Reader reader()
```

Retrieves the unique Reader object associated
with this console.

This method is intended to be used by sophisticated applications, for
example, a `java.util.Scanner` object which utilizes the rich
parsing/scanning functionality provided by the `Scanner`:

For simple applications requiring only line-oriented reading, use
`readLine`.

The bulk read operations read(char[]),
int, int) read(char[], int, int) and
read(java.nio.CharBuffer)
on the returned object will not read in characters beyond the line
bound for each invocation, even if the destination buffer has space for
more characters. The `Reader`'s `read` methods may block if a
line bound has not been entered or reached on the console's input device.
A line bound is considered to be any one of a line feed (`'\n'`),
a carriage return (`'\r'`), a carriage return followed immediately
by a linefeed, or an end of stream.

**Returns:** The reader associated with this console

## Console.format(String, Object ...)

```java
public Console format(String format, Object ... args)
```

Writes a formatted string to this console's output stream using
the specified format string and arguments with the
default format locale.

Parameters:

- `format`: A format string as described in Format string syntax.
- `args`: Arguments referenced by the format specifiers in the format string. If there are more arguments than format specifiers, the extra arguments are ignored. The number of arguments is variable and may be zero. The maximum number of arguments is limited by the maximum dimension of a Java array as defined by *The Java Virtual Machine Specification*. The behavior on a `null` argument depends on the conversion.

**Returns:** This console

Throws:

- `IllegalFormatException`: If a format string contains an illegal syntax, a format specifier that is incompatible with the given arguments, insufficient arguments given the format string, or other illegal conditions. For specification of all possible formatting errors, see the Details section of the formatter class specification.

## Console.format(Locale, String, Object ...)

```java
public Console format(Locale locale, String format, Object ... args)
```

Writes a formatted string to this console's output stream using
the specified format string and arguments with the specified
`locale`.

Parameters:

- `locale`: The locale to apply during formatting. If `locale` is `null` then no localization is applied.
- `format`: A format string as described in Format string syntax.
- `args`: Arguments referenced by the format specifiers in the format string. If there are more arguments than format specifiers, the extra arguments are ignored. The number of arguments is variable and may be zero. The maximum number of arguments is limited by the maximum dimension of a Java array as defined by *The Java Virtual Machine Specification*. The behavior on a `null` argument depends on the conversion.

**Returns:** This console

**Since:** 23

Throws:

- `IllegalFormatException`: If a format string contains an illegal syntax, a format specifier that is incompatible with the given arguments, insufficient arguments given the format string, or other illegal conditions. For specification of all possible formatting errors, see the Details section of the formatter class specification.

## Console.printf(String, Object ...)

```java
public Console printf(String format, Object ... args)
```

A convenience method to write a formatted string to this console's
output stream using the specified format string and arguments with
the default format locale.

Parameters:

- `format`: A format string as described in Format string syntax.
- `args`: Arguments referenced by the format specifiers in the format string. If there are more arguments than format specifiers, the extra arguments are ignored. The number of arguments is variable and may be zero. The maximum number of arguments is limited by the maximum dimension of a Java array as defined by *The Java Virtual Machine Specification*. The behavior on a `null` argument depends on the conversion.

**Implementation requirements:** This is the same as calling `format(format, args)`.

**Returns:** This console

Throws:

- `IllegalFormatException`: If a format string contains an illegal syntax, a format specifier that is incompatible with the given arguments, insufficient arguments given the format string, or other illegal conditions. For specification of all possible formatting errors, see the Details section of the formatter class specification.

## Console.printf(Locale, String, Object ...)

```java
public Console printf(Locale locale, String format, Object ... args)
```

A convenience method to write a formatted string to this console's
output stream using the specified format string and arguments with
the specified `locale`.

Parameters:

- `locale`: The locale to apply during formatting. If `locale` is `null` then no localization is applied.
- `format`: A format string as described in Format string syntax.
- `args`: Arguments referenced by the format specifiers in the format string. If there are more arguments than format specifiers, the extra arguments are ignored. The number of arguments is variable and may be zero. The maximum number of arguments is limited by the maximum dimension of a Java array as defined by *The Java Virtual Machine Specification*. The behavior on a `null` argument depends on the conversion.

**Implementation requirements:** This is the same as calling
        `format(locale, format, args)`.

**Returns:** This console

**Since:** 23

Throws:

- `IllegalFormatException`: If a format string contains an illegal syntax, a format specifier that is incompatible with the given arguments, insufficient arguments given the format string, or other illegal conditions. For specification of all possible formatting errors, see the Details section of the formatter class specification.

## Console.readLine(String, Object ...)

```java
public String readLine(String format, Object ... args)
```

Provides a formatted prompt using the
default format locale, then reads a
single line of text from the console.

Parameters:

- `format`: A format string as described in Format string syntax.
- `args`: Arguments referenced by the format specifiers in the format string. If there are more arguments than format specifiers, the extra arguments are ignored. The number of arguments is variable and may be zero. The maximum number of arguments is limited by the maximum dimension of a Java array as defined by *The Java Virtual Machine Specification*. The behavior on a `null` argument depends on the conversion.

**Returns:** A string containing the line read from the console, not
         including any line-termination characters, or `null`
         if an end of stream has been reached.

Throws:

- `IllegalFormatException`: If a format string contains an illegal syntax, a format specifier that is incompatible with the given arguments, insufficient arguments given the format string, or other illegal conditions. For specification of all possible formatting errors, see the Details section of the formatter class specification.
- `IOError`: If an I/O error occurs.

## Console.readLine(Locale, String, Object ...)

```java
public String readLine(Locale locale, String format, Object ... args)
```

Provides a formatted prompt using the specified `locale`, then
reads a single line of text from the console.

Parameters:

- `locale`: The locale to apply during formatting. If `locale` is `null` then no localization is applied.
- `format`: A format string as described in Format string syntax.
- `args`: Arguments referenced by the format specifiers in the format string. If there are more arguments than format specifiers, the extra arguments are ignored. The number of arguments is variable and may be zero. The maximum number of arguments is limited by the maximum dimension of a Java array as defined by *The Java Virtual Machine Specification*. The behavior on a `null` argument depends on the conversion.

**Returns:** A string containing the line read from the console, not
         including any line-termination characters, or `null`
         if an end of stream has been reached.

**Since:** 23

Throws:

- `IllegalFormatException`: If a format string contains an illegal syntax, a format specifier that is incompatible with the given arguments, insufficient arguments given the format string, or other illegal conditions. For specification of all possible formatting errors, see the Details section of the formatter class specification.
- `IOError`: If an I/O error occurs.

## Console.readLine()

```java
public String readLine()
```

Reads a single line of text from the console.

**Returns:** A string containing the line read from the console, not
         including any line-termination characters, or `null`
         if an end of stream has been reached.

Throws:

- `IOError`: If an I/O error occurs.

## Console.readPassword(String, Object ...)

```java
public char[] readPassword(String format, Object ... args)
```

Provides a formatted prompt using the
default format locale, then reads a
password or passphrase from the console with echoing disabled.

Parameters:

- `format`: A format string as described in Format string syntax for the prompt text.
- `args`: Arguments referenced by the format specifiers in the format string. If there are more arguments than format specifiers, the extra arguments are ignored. The number of arguments is variable and may be zero. The maximum number of arguments is limited by the maximum dimension of a Java array as defined by *The Java Virtual Machine Specification*. The behavior on a `null` argument depends on the conversion.

**Returns:** A character array containing the password or passphrase read
         from the console, not including any line-termination characters,
         or `null` if an end of stream has been reached.

Throws:

- `IllegalFormatException`: If a format string contains an illegal syntax, a format specifier that is incompatible with the given arguments, insufficient arguments given the format string, or other illegal conditions. For specification of all possible formatting errors, see the Details section of the formatter class specification.
- `IOError`: If an I/O error occurs.

## Console.readPassword(Locale, String, Object ...)

```java
public char[] readPassword(Locale locale, String format, Object ... args)
```

Provides a formatted prompt using the specified `locale`, then
reads a password or passphrase from the console with echoing disabled.

Parameters:

- `locale`: The locale to apply during formatting. If `locale` is `null` then no localization is applied.
- `format`: A format string as described in Format string syntax for the prompt text.
- `args`: Arguments referenced by the format specifiers in the format string. If there are more arguments than format specifiers, the extra arguments are ignored. The number of arguments is variable and may be zero. The maximum number of arguments is limited by the maximum dimension of a Java array as defined by *The Java Virtual Machine Specification*. The behavior on a `null` argument depends on the conversion.

**Returns:** A character array containing the password or passphrase read
         from the console, not including any line-termination characters,
         or `null` if an end of stream has been reached.

**Since:** 23

Throws:

- `IllegalFormatException`: If a format string contains an illegal syntax, a format specifier that is incompatible with the given arguments, insufficient arguments given the format string, or other illegal conditions. For specification of all possible formatting errors, see the Details section of the formatter class specification.
- `IOError`: If an I/O error occurs.
