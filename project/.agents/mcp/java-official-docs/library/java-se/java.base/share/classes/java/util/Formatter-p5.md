---
title: "Formatter class (java.util) (part 5 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Formatter.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Formatter class (java.util) (part 5 of 5)

## Formatter.Formatter(String, String)

```java
public Formatter(String fileName, String csn) throws FileNotFoundException, UnsupportedEncodingException
```

Constructs a new formatter with the specified file name and charset.

 The locale used is the default locale for
formatting for this instance of the Java
virtual machine.

Parameters:

- `fileName`: The name of the file to use as the destination of this formatter. If the file exists then it will be truncated to zero size; otherwise, a new file will be created. The output will be written to the file and is buffered.
- `csn`: The name of a supported charset

Throws:

- `FileNotFoundException`: If the given file name does not denote an existing, writable regular file and a new regular file of that name cannot be created, or if some other error occurs while opening or creating the file
- `UnsupportedEncodingException`: If the named charset is not supported

## Formatter.Formatter(String, String, Locale)

```java
public Formatter(String fileName, String csn, Locale l) throws FileNotFoundException, UnsupportedEncodingException
```

Constructs a new formatter with the specified file name, charset, and
locale.

Parameters:

- `fileName`: The name of the file to use as the destination of this formatter. If the file exists then it will be truncated to zero size; otherwise, a new file will be created. The output will be written to the file and is buffered.
- `csn`: The name of a supported charset
- `l`: The locale to apply during formatting. If `l` is `null` then no localization is applied.

Throws:

- `FileNotFoundException`: If the given file name does not denote an existing, writable regular file and a new regular file of that name cannot be created, or if some other error occurs while opening or creating the file
- `UnsupportedEncodingException`: If the named charset is not supported

## Formatter.Formatter(String, Charset, Locale)

```java
public Formatter(String fileName, Charset charset, Locale l) throws IOException
```

Constructs a new formatter with the specified file name, charset, and
locale.

Parameters:

- `fileName`: The name of the file to use as the destination of this formatter. If the file exists then it will be truncated to zero size; otherwise, a new file will be created. The output will be written to the file and is buffered.
- `charset`: A charset
- `l`: The locale to apply during formatting. If `l` is `null` then no localization is applied.

**Since:** 10

Throws:

- `IOException`: if an I/O error occurs while opening or creating the file
- `NullPointerException`: if `fileName` or `charset` is `null`.

## Formatter.Formatter(File)

```java
public Formatter(File file) throws FileNotFoundException
```

Constructs a new formatter with the specified file.

 The charset used is the default charset for this
instance of the Java virtual machine.

 The locale used is the default locale for
formatting for this instance of the Java
virtual machine.

Parameters:

- `file`: The file to use as the destination of this formatter. If the file exists then it will be truncated to zero size; otherwise, a new file will be created. The output will be written to the file and is buffered.

Throws:

- `FileNotFoundException`: If the given file object does not denote an existing, writable regular file and a new regular file of that name cannot be created, or if some other error occurs while opening or creating the file

## Formatter.Formatter(File, String)

```java
public Formatter(File file, String csn) throws FileNotFoundException, UnsupportedEncodingException
```

Constructs a new formatter with the specified file and charset.

 The locale used is the default locale for
formatting for this instance of the Java
virtual machine.

Parameters:

- `file`: The file to use as the destination of this formatter. If the file exists then it will be truncated to zero size; otherwise, a new file will be created. The output will be written to the file and is buffered.
- `csn`: The name of a supported charset

Throws:

- `FileNotFoundException`: If the given file object does not denote an existing, writable regular file and a new regular file of that name cannot be created, or if some other error occurs while opening or creating the file
- `UnsupportedEncodingException`: If the named charset is not supported

## Formatter.Formatter(File, String, Locale)

```java
public Formatter(File file, String csn, Locale l) throws FileNotFoundException, UnsupportedEncodingException
```

Constructs a new formatter with the specified file, charset, and
locale.

Parameters:

- `file`: The file to use as the destination of this formatter. If the file exists then it will be truncated to zero size; otherwise, a new file will be created. The output will be written to the file and is buffered.
- `csn`: The name of a supported charset
- `l`: The locale to apply during formatting. If `l` is `null` then no localization is applied.

Throws:

- `FileNotFoundException`: If the given file object does not denote an existing, writable regular file and a new regular file of that name cannot be created, or if some other error occurs while opening or creating the file
- `UnsupportedEncodingException`: If the named charset is not supported

## Formatter.Formatter(File, Charset, Locale)

```java
public Formatter(File file, Charset charset, Locale l) throws IOException
```

Constructs a new formatter with the specified file, charset, and
locale.

Parameters:

- `file`: The file to use as the destination of this formatter. If the file exists then it will be truncated to zero size; otherwise, a new file will be created. The output will be written to the file and is buffered.
- `charset`: A charset
- `l`: The locale to apply during formatting. If `l` is `null` then no localization is applied.

**Since:** 10

Throws:

- `IOException`: if an I/O error occurs while opening or creating the file
- `NullPointerException`: if `file` or `charset` is `null`.

## Formatter.Formatter(PrintStream)

```java
public Formatter(PrintStream ps)
```

Constructs a new formatter with the specified print stream.

 The locale used is the default locale for
formatting for this instance of the Java
virtual machine.

 Characters are written to the given PrintStream object and are therefore encoded using that object's
charset.

Parameters:

- `ps`: The stream to use as the destination of this formatter.

## Formatter.Formatter(OutputStream)

```java
public Formatter(OutputStream os)
```

Constructs a new formatter with the specified output stream.

 The charset used is the default charset for this
instance of the Java virtual machine.

 The locale used is the default locale for
formatting for this instance of the Java
virtual machine.

Parameters:

- `os`: The output stream to use as the destination of this formatter. The output will be buffered.

## Formatter.Formatter(OutputStream, String)

```java
public Formatter(OutputStream os, String csn) throws UnsupportedEncodingException
```

Constructs a new formatter with the specified output stream and
charset.

 The locale used is the default locale for
formatting for this instance of the Java
virtual machine.

Parameters:

- `os`: The output stream to use as the destination of this formatter. The output will be buffered.
- `csn`: The name of a supported charset

Throws:

- `UnsupportedEncodingException`: If the named charset is not supported

## Formatter.Formatter(OutputStream, String, Locale)

```java
public Formatter(OutputStream os, String csn, Locale l) throws UnsupportedEncodingException
```

Constructs a new formatter with the specified output stream, charset,
and locale.

Parameters:

- `os`: The output stream to use as the destination of this formatter. The output will be buffered.
- `csn`: The name of a supported charset
- `l`: The locale to apply during formatting. If `l` is `null` then no localization is applied.

Throws:

- `UnsupportedEncodingException`: If the named charset is not supported

## Formatter.Formatter(OutputStream, Charset, Locale)

```java
public Formatter(OutputStream os, Charset charset, Locale l)
```

Constructs a new formatter with the specified output stream, charset,
and locale.

Parameters:

- `os`: The output stream to use as the destination of this formatter. The output will be buffered.
- `charset`: A charset
- `l`: The locale to apply during formatting. If `l` is `null` then no localization is applied.

**Since:** 10

Throws:

- `NullPointerException`: if `os` or `charset` is `null`.

## Formatter.locale()

```java
public Locale locale()
```

Returns the locale set by the construction of this formatter.

 The format method
for this object which has a locale argument does not change this value.

**Returns:** `null` if no localization is applied, otherwise a
         locale

Throws:

- `FormatterClosedException`: If this formatter has been closed by invoking its `close()` method

## Formatter.out()

```java
public Appendable out()
```

Returns the destination for the output.

**Returns:** The destination for the output

Throws:

- `FormatterClosedException`: If this formatter has been closed by invoking its `close()` method

## Formatter.toString()

```java
public String toString()
```

Returns the result of invoking `toString()` on the destination
for the output.  For example, the following code formats text into a
`StringBuilder` then retrieves the resultant string:

```java
  Formatter f = new Formatter();
  f.format("Last reboot at %tc", lastRebootDate);
  String s = f.toString();
  // -> s == "Last reboot at Sat Jan 01 00:00:00 PST 2000"
```

 An invocation of this method behaves in exactly the same way as the
invocation

```java
    out().toString()
```

 Depending on the specification of `toString` for the `Appendable`, the returned string may or may not contain the characters
written to the destination.  For instance, buffers typically return
their contents in `toString()`, but streams cannot since the
data is discarded.

**Returns:** The result of invoking `toString()` on the destination
         for the output

Throws:

- `FormatterClosedException`: If this formatter has been closed by invoking its `close()` method

## Formatter.flush()

```java
public void flush()
```

Flushes this formatter.  If the destination implements the `java.io.Flushable` interface, its `flush` method will be invoked.

 Flushing a formatter writes any buffered output in the destination
to the underlying stream.

Throws:

- `FormatterClosedException`: If this formatter has been closed by invoking its `close()` method

## Formatter.close()

```java
public void close()
```

Closes this formatter.  If the destination implements the `java.io.Closeable` interface, its `close` method will be invoked.

 Closing a formatter allows it to release resources it may be holding
(such as open files).  If the formatter is already closed, then invoking
this method has no effect.

 Attempting to invoke any methods except `ioException()` in
this formatter after it has been closed will result in a `FormatterClosedException`.

## Formatter.ioException()

```java
public IOException ioException()
```

Returns the `IOException` last thrown by this formatter's `Appendable`.

 If the destination's `append()` method never throws
`IOException`, then this method will always return `null`.

**Returns:** The last exception thrown by the Appendable or `null` if
         no such exception exists.

## Formatter.format(String, Object ...)

```java
public Formatter format(String format, Object ... args)
```

Writes a formatted string to this object's destination using the
specified format string and arguments.  The locale used is the one
defined during the construction of this formatter.

Parameters:

- `format`: A format string as described in Format string syntax.
- `args`: Arguments referenced by the format specifiers in the format string. If there are more arguments than format specifiers, the extra arguments are ignored. The maximum number of arguments is limited by the maximum dimension of a Java array as defined by *The Java Virtual Machine Specification*.

**Returns:** This formatter

Throws:

- `IllegalFormatException`: If a format string contains an illegal syntax, a format specifier that is incompatible with the given arguments, insufficient arguments given the format string, or other illegal conditions. For specification of all possible formatting errors, see the Details section of the formatter class specification.
- `FormatterClosedException`: If this formatter has been closed by invoking its `close()` method

## Formatter.format(Locale, String, Object ...)

```java
public Formatter format(Locale l, String format, Object ... args)
```

Writes a formatted string to this object's destination using the
specified locale, format string, and arguments.

Parameters:

- `l`: The locale to apply during formatting. If `l` is `null` then no localization is applied. This does not change this object's locale that was set during construction.
- `format`: A format string as described in Format string syntax
- `args`: Arguments referenced by the format specifiers in the format string. If there are more arguments than format specifiers, the extra arguments are ignored. The maximum number of arguments is limited by the maximum dimension of a Java array as defined by *The Java Virtual Machine Specification*.

**Returns:** This formatter

Throws:

- `IllegalFormatException`: If a format string contains an illegal syntax, a format specifier that is incompatible with the given arguments, insufficient arguments given the format string, or other illegal conditions. For specification of all possible formatting errors, see the Details section of the formatter class specification.
- `FormatterClosedException`: If this formatter has been closed by invoking its `close()` method
