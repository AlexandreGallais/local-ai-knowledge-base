---
title: "Appendable interface (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Appendable.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Appendable interface (java.lang)

```java
public interface Appendable
```

An object to which `char` sequences and values can be appended.  The
`Appendable` interface must be implemented by any class whose
instances are intended to receive formatted output from a `java.util.Formatter`.

 The characters to be appended should be valid Unicode characters as
described in Unicode Character
Representation.  Note that supplementary characters may be composed of
multiple 16-bit `char` values.

 Appendables are not necessarily safe for multithreaded access.  Thread
safety is the responsibility of classes that extend and implement this
interface.

 Since this interface may be implemented by existing classes
with different styles of error handling there is no guarantee that
errors will be propagated to the invoker.

**Since:** 1.5

## Appendable.append(CharSequence)

```java
Appendable append(CharSequence csq) throws IOException
```

Appends the specified character sequence to this `Appendable`.

 Depending on which class implements the character sequence
`csq`, the entire sequence may not be appended.  For
instance, if `csq` is a `java.nio.CharBuffer` then
the subsequence to append is defined by the buffer's position and limit.

The contents of this `Appendable` are unspecified if the `CharSequence`
is modified during the method call or an exception is thrown
when accessing the `CharSequence`.

Parameters:

- `csq`: The character sequence to append. If `csq` is `null`, then the four characters `"null"` are appended to this Appendable.

**Returns:** A reference to this `Appendable`

Throws:

- `IOException`: If an I/O error occurs

## Appendable.append(CharSequence, int, int)

```java
Appendable append(CharSequence csq, int start, int end) throws IOException
```

Appends a subsequence of the specified character sequence to this
`Appendable`.

 An invocation of this method of the form `out.append(csq, start, end)`
when `csq` is not `null`, behaves in
exactly the same way as the invocation

```java
    out.append(csq.subSequence(start, end))
```

The contents of this `Appendable` are unspecified if the `CharSequence`
is modified during the method call or an exception is thrown
when accessing the `CharSequence`.

Parameters:

- `csq`: The character sequence from which a subsequence will be appended. If `csq` is `null`, then characters will be appended as if `csq` contained the four characters `"null"`.
- `start`: The index of the first character in the subsequence
- `end`: The index of the character following the last character in the subsequence

**Returns:** A reference to this `Appendable`

Throws:

- `IndexOutOfBoundsException`: If `start` or `end` are negative, `start` is greater than `end`, or `end` is greater than `csq.length()`
- `IOException`: If an I/O error occurs

## Appendable.append(char)

```java
Appendable append(char c) throws IOException
```

Appends the specified character to this `Appendable`.

Parameters:

- `c`: The character to append

**Returns:** A reference to this `Appendable`

Throws:

- `IOException`: If an I/O error occurs
