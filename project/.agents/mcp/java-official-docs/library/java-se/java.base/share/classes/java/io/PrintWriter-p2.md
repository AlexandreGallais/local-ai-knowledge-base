---
title: "PrintWriter class (java.io) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/PrintWriter.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PrintWriter class (java.io) (part 2 of 2)

## PrintWriter.print(Object)

```java
public void print(Object obj)
```

Prints an object.  The string produced by the `java.lang.String.valueOf(Object)` method is translated into bytes
according to the default charset, and these bytes
are written in exactly the manner of the `write(int)`
method.

Parameters:

- `obj`: The `Object` to be printed

**See also:** java.lang.Object#toString()

**See also:** Charset#defaultCharset()

## PrintWriter.println()

```java
public void println()
```

Terminates the current line by writing the line separator string.  The
line separator is `System.lineSeparator()` and is not necessarily
a single newline character (`'\n'`).

## PrintWriter.println(boolean)

```java
public void println(boolean x)
```

Prints a boolean value and then terminates the line.  This method behaves
as though it invokes `print(boolean)` and then
`println()`.

Parameters:

- `x`: the `boolean` value to be printed

## PrintWriter.println(char)

```java
public void println(char x)
```

Prints a character and then terminates the line.  This method behaves as
though it invokes `print(char)` and then `println()`.

Parameters:

- `x`: the `char` value to be printed

## PrintWriter.println(int)

```java
public void println(int x)
```

Prints an integer and then terminates the line.  This method behaves as
though it invokes `print(int)` and then `println()`.

Parameters:

- `x`: the `int` value to be printed

## PrintWriter.println(long)

```java
public void println(long x)
```

Prints a long integer and then terminates the line.  This method behaves
as though it invokes `print(long)` and then
`println()`.

Parameters:

- `x`: the `long` value to be printed

## PrintWriter.println(float)

```java
public void println(float x)
```

Prints a floating-point number and then terminates the line.  This method
behaves as though it invokes `print(float)` and then
`println()`.

Parameters:

- `x`: the `float` value to be printed

## PrintWriter.println(double)

```java
public void println(double x)
```

Prints a double-precision floating-point number and then terminates the
line.  This method behaves as though it invokes `print(double)` and then `println()`.

Parameters:

- `x`: the `double` value to be printed

## PrintWriter.println(char[])

```java
public void println(char[] x)
```

Prints an array of characters and then terminates the line.  This method
behaves as though it invokes `print(char[])` and then
`println()`.

Parameters:

- `x`: the array of `char` values to be printed

## PrintWriter.println(String)

```java
public void println(String x)
```

Prints a String and then terminates the line.  This method behaves as
though it invokes `print(String)` and then
`println()`.

Parameters:

- `x`: the `String` value to be printed

## PrintWriter.println(Object)

```java
public void println(Object x)
```

Prints an Object and then terminates the line.  This method calls
at first String.valueOf(x) to get the printed object's string value,
then behaves as
though it invokes `print(String)` and then
`println()`.

Parameters:

- `x`: The `Object` to be printed.

## PrintWriter.printf(String, Object ...)

```java
public PrintWriter printf(String format, Object ... args)
```

A convenience method to write a formatted string to this writer using
the specified format string and arguments.  If automatic flushing is
enabled, calls to this method will flush the output buffer.

 An invocation of this method of the form
`out.printf(format, args)`
behaves in exactly the same way as the invocation

Parameters:

- `format`: A format string as described in Format string syntax.
- `args`: Arguments referenced by the format specifiers in the format string. If there are more arguments than format specifiers, the extra arguments are ignored. The number of arguments is variable and may be zero. The maximum number of arguments is limited by the maximum dimension of a Java array as defined by *The Java Virtual Machine Specification*. The behaviour on a `null` argument depends on the conversion.

**Returns:** This writer

**Since:** 1.5

Throws:

- `java.util.IllegalFormatException`: If a format string contains an illegal syntax, a format specifier that is incompatible with the given arguments, insufficient arguments given the format string, or other illegal conditions. For specification of all possible formatting errors, see the Details section of the formatter class specification.
- `NullPointerException`: If the `format` is `null`

## PrintWriter.printf(Locale, String, Object ...)

```java
public PrintWriter printf(Locale l, String format, Object ... args)
```

A convenience method to write a formatted string to this writer using
the specified format string and arguments.  If automatic flushing is
enabled, calls to this method will flush the output buffer.

 An invocation of this method of the form
`out.printf(l, format, args)`
behaves in exactly the same way as the invocation

Parameters:

- `l`: The locale to apply during formatting. If `l` is `null` then no localization is applied.
- `format`: A format string as described in Format string syntax.
- `args`: Arguments referenced by the format specifiers in the format string. If there are more arguments than format specifiers, the extra arguments are ignored. The number of arguments is variable and may be zero. The maximum number of arguments is limited by the maximum dimension of a Java array as defined by *The Java Virtual Machine Specification*. The behaviour on a `null` argument depends on the conversion.

**Returns:** This writer

**Since:** 1.5

Throws:

- `java.util.IllegalFormatException`: If a format string contains an illegal syntax, a format specifier that is incompatible with the given arguments, insufficient arguments given the format string, or other illegal conditions. For specification of all possible formatting errors, see the Details section of the formatter class specification.
- `NullPointerException`: If the `format` is `null`

## PrintWriter.format(String, Object ...)

```java
public PrintWriter format(String format, Object ... args)
```

Writes a formatted string to this writer using the specified format
string and arguments.  If automatic flushing is enabled, calls to this
method will flush the output buffer.

 The locale always used is the one returned by Locale.getDefault(), regardless of any
previous invocations of other formatting methods on this object.

Parameters:

- `format`: A format string as described in Format string syntax.
- `args`: Arguments referenced by the format specifiers in the format string. If there are more arguments than format specifiers, the extra arguments are ignored. The number of arguments is variable and may be zero. The maximum number of arguments is limited by the maximum dimension of a Java array as defined by *The Java Virtual Machine Specification*. The behaviour on a `null` argument depends on the conversion.

**Returns:** This writer

**Since:** 1.5

Throws:

- `java.util.IllegalFormatException`: If a format string contains an illegal syntax, a format specifier that is incompatible with the given arguments, insufficient arguments given the format string, or other illegal conditions. For specification of all possible formatting errors, see the Details section of the Formatter class specification.
- `NullPointerException`: If the `format` is `null`

## PrintWriter.format(Locale, String, Object ...)

```java
public PrintWriter format(Locale l, String format, Object ... args)
```

Writes a formatted string to this writer using the specified format
string and arguments.  If automatic flushing is enabled, calls to this
method will flush the output buffer.

Parameters:

- `l`: The locale to apply during formatting. If `l` is `null` then no localization is applied.
- `format`: A format string as described in Format string syntax.
- `args`: Arguments referenced by the format specifiers in the format string. If there are more arguments than format specifiers, the extra arguments are ignored. The number of arguments is variable and may be zero. The maximum number of arguments is limited by the maximum dimension of a Java array as defined by *The Java Virtual Machine Specification*. The behaviour on a `null` argument depends on the conversion.

**Returns:** This writer

**Since:** 1.5

Throws:

- `java.util.IllegalFormatException`: If a format string contains an illegal syntax, a format specifier that is incompatible with the given arguments, insufficient arguments given the format string, or other illegal conditions. For specification of all possible formatting errors, see the Details section of the formatter class specification.
- `NullPointerException`: If the `format` is `null`

## PrintWriter.append(CharSequence)

```java
public PrintWriter append(CharSequence csq)
```

Appends the specified character sequence to this writer.

 An invocation of this method of the form `out.append(csq)`
when `csq` is not `null`, behaves in exactly the same way
as the invocation

 Depending on the specification of `toString` for the
character sequence `csq`, the entire sequence may not be
appended. For instance, invoking the `toString` method of a
character buffer will return a subsequence whose content depends upon
the buffer's position and limit.

Parameters:

- `csq`: The character sequence to append. If `csq` is `null`, then the four characters `"null"` are appended to this writer.

**Returns:** This writer

**Since:** 1.5

## PrintWriter.append(CharSequence, int, int)

```java
public PrintWriter append(CharSequence csq, int start, int end)
```

Appends a subsequence of the specified character sequence to this writer.

 An invocation of this method of the form
`out.append(csq, start, end)`
when `csq` is not `null`, behaves in
exactly the same way as the invocation

Parameters:

- `csq`: The character sequence from which a subsequence will be appended. If `csq` is `null`, then characters will be appended as if `csq` contained the four characters `"null"`.
- `start`: The index of the first character in the subsequence
- `end`: The index of the character following the last character in the subsequence

**Returns:** This writer

**Since:** 1.5

Throws:

- `IndexOutOfBoundsException`: If `start` or `end` are negative, `start` is greater than `end`, or `end` is greater than `csq.length()`

## PrintWriter.append(char)

```java
public PrintWriter append(char c)
```

Appends the specified character to this writer.

 An invocation of this method of the form `out.append(c)`
behaves in exactly the same way as the invocation

Parameters:

- `c`: The 16-bit character to append

**Returns:** This writer

**Since:** 1.5
