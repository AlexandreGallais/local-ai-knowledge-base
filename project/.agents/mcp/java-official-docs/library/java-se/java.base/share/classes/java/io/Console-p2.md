---
title: "Console class (java.io) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/Console.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Console class (java.io) (part 2 of 2)

## Console.readPassword()

```java
public char[] readPassword()
```

Reads a password or passphrase from the console with echoing disabled.

**Returns:** A character array containing the password or passphrase read
         from the console, not including any line-termination characters,
         or `null` if an end of stream has been reached.

Throws:

- `IOError`: If an I/O error occurs.

## Console.flush()

```java
public void flush()
```

Flushes the console and forces any buffered output to be written
immediately.

## Console.charset()

```java
public Charset charset()
```

The returned charset is used for encoding the data that is sent to
the output (e.g., display), specified by the host environment or user.
It defaults to the one based on stdout.encoding,
and may not necessarily be the same as the default charset returned from
Charset.defaultCharset().

**Since:** 17

## Console.isTerminal()

```java
public boolean isTerminal()
```

This method returns `true` if the console device, associated with the current
Java virtual machine, is a terminal, typically an interactive command line
connected to a keyboard and display.

**Implementation note:** The default implementation returns the value equivalent to calling
`isatty(stdin/stdout)` on POSIX platforms, or whether standard in/out file
descriptors are character devices or not on Windows.

**Since:** 22
