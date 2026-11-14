---
title: "IO class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/IO.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# IO class (java.lang)

```java
public final class IO
```

A collection of static methods that provide convenient access to `System.in`
and `System.out` for line-oriented input and output.

The `readln()` and `readln(String)` methods decode bytes read from
`System.in` into characters. The charset used for decoding is specified by the
stdin.encoding property. If this property is not present,
or if the charset it names cannot be loaded, then UTF-8 is used instead. Decoding
always replaces malformed and unmappable byte sequences with the charset's default
replacement string.

Charset decoding is set up upon the first call to one of the `readln` methods.
Decoding may buffer additional bytes beyond those that have been decoded to characters
returned to the application. After the first call to one of the `readln` methods,
any subsequent use of `System.in` results in unspecified behavior.

**API note:** The expected use case is that certain applications will use only the `readln`
methods to read from the standard input, and they will not mix these calls with
other techniques for reading from `System.in`.

**Since:** 25

## IO.println(Object)

```java
public static void println(Object obj)
```

Writes a string representation of the specified object and then writes
a line separator to the standard output.

 The effect is as if println(obj)
had been called on `System.out`.

Parameters:

- `obj`: the object to print, may be `null`

## IO.println()

```java
public static void println()
```

Writes a line separator to the standard output.

 The effect is as if println()
had been called on `System.out`.

## IO.print(Object)

```java
public static void print(Object obj)
```

Writes a string representation of the specified object to the
standard output.

 The effect is as if print(obj)
had been called on `System.out`.

Parameters:

- `obj`: the object to print, may be `null`

## IO.readln()

```java
public static String readln()
```

Reads a single line of text from the standard input.

One line is read from the decoded input as if by
BufferedReader.readLine()
and then the result is returned.

If necessary, this method first sets up charset decoding, as described in
above in the class specification.

**Returns:** a string containing the line read from the standard input, not
including any line separator characters. Returns `null` if an
end of stream has been reached without having read any characters.

Throws:

- `IOError`: if an I/O error occurs

## IO.readln(String)

```java
public static String readln(String prompt)
```

Writes a prompt and then reads a line of input.

Writes a prompt as if by calling print, and then reads a single
line of text as if by calling readln.

If necessary, this method first sets up charset decoding, as described in
above in the class specification.

Parameters:

- `prompt`: the prompt string, may be `null`

**Returns:** a string containing the line read from the standard input, not
including any line separator characters. Returns `null` if an
end of stream has been reached without having read any characters.

Throws:

- `IOError`: if an I/O error occurs
