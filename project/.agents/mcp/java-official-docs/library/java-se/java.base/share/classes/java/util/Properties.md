---
title: "Properties class (java.util) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Properties.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Properties class (java.util)

```java
public class Properties extends Hashtable<Object,Object>
```

The `Properties` class represents a persistent set of
properties. The `Properties` can be saved to a stream
or loaded from a stream. Each key and its corresponding value in
the property list is a string.

A property list can contain another property list as its
"defaults"; this second property list is searched if
the property key is not found in the original property list.

Because `Properties` inherits from `Hashtable`, the
`put` and `putAll` methods can be applied to a
`Properties` object.  Their use is strongly discouraged as they
allow the caller to insert entries whose keys or values are not
`Strings`.  The `setProperty` method should be used
instead.  If the `store` or `save` method is called
on a "compromised" `Properties` object that contains a
non-`String` key or value, the call will fail. Similarly,
the call to the `propertyNames` or `list` method
will fail if it is called on a "compromised" `Properties`
object that contains a non-`String` key.

The iterators returned by the `iterator` method of this class's
"collection views" (that is, `entrySet()`, `keySet()`, and
`values()`) may not fail-fast (unlike the Hashtable implementation).
These iterators are guaranteed to traverse elements as they existed upon
construction exactly once, and may (but are not guaranteed to) reflect any
modifications subsequent to construction.

The load(Reader) `/`
java.lang.String) store(Writer, String)
methods load and store properties from and to a character based stream
in a simple line-oriented format specified below.

The load(InputStream) `/`
java.lang.String) store(OutputStream, String)
methods work the same way as the load(Reader)/store(Writer, String) pair, except
the input/output stream is encoded in ISO 8859-1 character encoding.
Characters that cannot be directly represented in this encoding can be written using
Unicode escapes as defined in section  of
*The Java Language Specification*;
only a single 'u' character is allowed in an escape
sequence.

 The `loadFromXML(InputStream)` and String, String) methods load and store properties
in a simple XML format.  By default the UTF-8 character encoding is used,
however a specific encoding may be specified if required. Implementations
are required to support UTF-8 and UTF-16 and may support other encodings.
An XML properties document has the following DOCTYPE declaration:

```java
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
```

Note that the system URI (http://java.sun.com/dtd/properties.dtd) is
*not* accessed when exporting or importing properties; it merely
serves as a string to uniquely identify the DTD, which is:

```java
   <?xml version="1.0" encoding="UTF-8"?>

   <!-- DTD for properties -->

   <!ELEMENT properties ( comment?, entry* ) >

   <!ATTLIST properties version CDATA #FIXED "1.0">

   <!ELEMENT comment (#PCDATA) >

   <!ELEMENT entry (#PCDATA) >

   <!ATTLIST entry key CDATA #REQUIRED>
```

This class is thread-safe: multiple threads can share a single
`Properties` object without the need for external synchronization.

**API note:** The `Properties` class does not inherit the concept of a load factor
from its superclass, `Hashtable`.

**Since:** 1.0

## Properties.defaults

```java
protected volatile Properties defaults
```

A property list that contains default values for any keys not
found in this property list.

## Properties.Properties()

```java
public Properties()
```

Creates an empty property list with no default values.

**Implementation note:** The initial capacity of a `Properties` object created
with this constructor is unspecified.

## Properties.Properties(int)

```java
public Properties(int initialCapacity)
```

Creates an empty property list with no default values, and with an
initial size accommodating the specified number of elements without the
need to dynamically resize.

Parameters:

- `initialCapacity`: the `Properties` will be sized to accommodate this many elements

**Since:** 10

Throws:

- `IllegalArgumentException`: if the initial capacity is less than zero.

## Properties.Properties(Properties)

```java
public Properties(Properties defaults)
```

Creates an empty property list with the specified defaults.

Parameters:

- `defaults`: the defaults.

**Implementation note:** The initial capacity of a `Properties` object created
with this constructor is unspecified.

## Properties.setProperty(String, String)

```java
public synchronized Object setProperty(String key, String value)
```

Calls the `Hashtable` method `put`. Provided for
parallelism with the `getProperty` method. Enforces use of
strings for property keys and values. The value returned is the
result of the `Hashtable` call to `put`.

Parameters:

- `key`: the key to be placed into this property list.
- `value`: the value corresponding to `key`.

**Returns:** the previous value of the specified key in this property
            list, or `null` if it did not have one.

**See also:** #getProperty

**Since:** 1.2

## Properties.load(Reader)

```java
public synchronized void load(Reader reader) throws IOException
```

Reads a property list (key and element pairs) from the input
character stream in a simple line-oriented format.

Properties are processed in terms of lines. There are two
kinds of lines, *natural lines* and *logical lines*.
A natural line is defined as a line of
characters that is terminated either by a set of line terminator
characters (`\n` or `\r` or `\r\n`)
or by the end of the stream. A natural line may be either a blank line,
a comment line, or hold all or some of a key-element pair. A logical
line holds all the data of a key-element pair, which may be spread
out across several adjacent natural lines by escaping
the line terminator sequence with a backslash character
`\`.  Note that a comment line cannot be extended
in this manner; every natural line that is a comment must have
its own comment indicator, as described below. Lines are read from
input until the end of the stream is reached.

A natural line that contains only white space characters is
considered blank and is ignored.  A comment line has an ASCII
`'#'` or `'!'` as its first non-whitespace
character; comment lines are also ignored and do not
encode key-element information.  In addition to line
terminators, this format considers the characters space
(`' '`, `'\u005Cu0020'`), tab
(`'\t'`, `'\u005Cu0009'`), and form feed
(`'\f'`, `'\u005Cu000C'`) to be white
space.

If a logical line is spread across several natural lines, the
backslash escaping the line terminator sequence, the line
terminator sequence, and any white space at the start of the
following line have no effect on the key or element values.
The remainder of the discussion of key and element parsing
(when loading) will assume all the characters constituting
the key and element appear on a single natural line after
line continuation characters have been removed.  Note that
it is *not* sufficient to only examine the character
preceding a line terminator sequence to decide if the line
terminator is escaped; there must be an odd number of
contiguous backslashes for the line terminator to be escaped.
Since the input is processed from left to right, a
non-zero even number of 2*n* contiguous backslashes
before a line terminator (or elsewhere) encodes *n*
backslashes after escape processing.

The key <example-value> all of the characters in the line starting
with the first non-whitespace character and up to, but not
including, the first unescaped `'='`,
`':'`, or white space character other than a line
terminator. All of these key <example-value> characters may be
included in the key by escaping them with a preceding backslash
character; for example,

`\:\=`

would be the two-character key `":="`.  Line
terminator characters can be included using `\r` and
`\n` escape sequences.  Any white space after the
key is skipped; if the first non-whitespace character after
the key is `'='` or `':'`, then it is
ignored and any white space characters after it are also
skipped.  All remaining characters on the line become part of
the associated element string; if there are no remaining
characters, the element is the empty string
`""`.  Once the raw character sequences
constituting the key and element are identified, escape
processing is performed as described above.

As an example, each of the following three lines specifies the key
`"Truth"` and the associated element value
`"Beauty"`:

```java
Truth = Beauty
 Truth:Beauty
Truth                    :Beauty
```

As another example, the following three lines specify a single
property:

```java
fruits                           apple, banana, pear, \
                                 cantaloupe, watermelon, \
                                 kiwi, mango
```

The key is `"fruits"` and the associated element is:

```java
"apple, banana, pear, cantaloupe, watermelon, kiwi, mango"
```

Note that a space appears before each `\` so that a space
will appear after each comma in the final result; the `\`,
line terminator, and leading white space on the continuation line are
merely discarded and are *not* replaced by one or more other
characters.

As a third example, the line:

```java
cheeses
```

specifies that the key is `"cheeses"` and the associated
element is the empty string `""`.

Characters in keys and elements can be represented in escape
sequences similar to those used for character and string literals
(see sections  and  of
*The Java Language Specification*).

The differences from the character escape sequences and Unicode
escapes used for characters and strings are:

-  Octal escapes are not recognized.

-  The character sequence `\b` does *not*
represent a backspace character.

-  The method does not treat a backslash character,
`\`, before a non-valid escape character as an
error; the backslash is silently dropped.  For example, in a
Java string the sequence `"\z"` would cause a
compile time error.  In contrast, this method silently drops
the backslash.  Therefore, this method treats the two character
sequence `"\b"` as equivalent to the single
character `'b'`.

-  Escapes are not necessary for single and double quotes;
however, by the rule above, single and double quote characters
preceded by a backslash still yield single and double quote
characters, respectively.

-  Only a single 'u' character is allowed in a Unicode escape
sequence.

The specified stream remains open after this method returns.

Parameters:

- `reader`: the input character stream.

**Since:** 1.6

Throws:

- `IOException`: if an error occurred when reading from the input stream.
- `IllegalArgumentException`: if a malformed Unicode escape appears in the input.
- `NullPointerException`: if `reader` is null.

## Properties.load(InputStream)

```java
public synchronized void load(InputStream inStream) throws IOException
```

Reads a property list (key and element pairs) from the input
byte stream. The input stream is in a simple line-oriented
format as specified in
load(Reader) and is assumed to use
the ISO 8859-1 character encoding; that is each byte is one Latin1
character. Characters not in Latin1, and certain special characters,
are represented in keys and elements using Unicode escapes as defined in
section  of
*The Java Language Specification*.

The specified stream remains open after this method returns.

Parameters:

- `inStream`: the input stream.

**Since:** 1.2

Throws:

- `IOException`: if an error occurred when reading from the input stream.
- `IllegalArgumentException`: if the input stream contains a malformed Unicode escape sequence.
- `NullPointerException`: if `inStream` is null.

## Properties.save(OutputStream, String)

```java
public void save(OutputStream out, String comments)
```

Calls the `store(OutputStream out, String comments)` method
and suppresses IOExceptions that were thrown.

Parameters:

- `out`: an output stream.
- `comments`: a description of the property list.

**Deprecated:** This method does not throw an IOException if an I/O error
occurs while saving the property list.  The preferred way to save a
properties list is via the `store(OutputStream out, String comments)` method or the
`storeToXML(OutputStream os, String comment)` method.

Throws:

- `ClassCastException`: if this `Properties` object contains any keys or values that are not `Strings`.
