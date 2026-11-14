---
title: "Properties class (java.util) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Properties.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Properties class (java.util) (part 2 of 2)

## Properties.store(Writer, String)

```java
public void store(Writer writer, String comments) throws IOException
```

Writes this property list (key and element pairs) in this
`Properties` table to the output character stream in a
format suitable for using the load(Reader)
method.

Properties from the defaults table of this `Properties`
table (if any) are *not* written out by this method.

If the comments argument is not null, then an ASCII `#`
character, the comments string, and a line separator are first written
to the output stream. Thus, the `comments` can serve as an
identifying comment. Any one of a line feed (`\n`), a carriage
return (`\r`), or a carriage return followed immediately by a line feed
(`\r\n`) in comments is replaced by a
line separator and if the next
character in comments is not character `#` or character `!` then
an ASCII `#` is written out after that line separator.

If the `java.properties.date` is set on the command line
and is non-empty (as determined by String.isEmpty),
a comment line is written as follows.
First, a `#` character is written, followed by the contents
of the property, followed by a line separator. Any line terminator characters
in the value of the system property are treated the same way as noted above
for the comments argument.
If the system property is not set or is empty, a comment line is written
as follows.
First, a `#` character is written, followed by the current date and time
formatted as if by the Date.toString method,
followed by a line separator.

Then every entry in this `Properties` table is
written out, one per line. For each entry the key <example-value> is
written, then an ASCII `=`, then the associated
element string. For the key, all space characters are
written with a preceding `\` character.  For the
element, leading space characters, but not embedded or trailing
space characters, are written with a preceding `\`
character. The key and element characters `#`,
`!`, `=`, and `:` are written
with a preceding backslash to ensure that they are properly loaded.

After the entries have been written, the output stream is flushed.
The output stream remains open after this method returns.

Parameters:

- `writer`: an output character stream writer.
- `comments`: a description of the property list.

**Implementation requirements:** The keys and elements are written in the natural sort order
of the keys in the `entrySet()` unless `entrySet()` is
overridden by a subclass to return a different value than `super.entrySet()`.

**Since:** 1.6

Throws:

- `IOException`: if writing this property list to the specified output stream throws an `IOException`.
- `ClassCastException`: if this `Properties` object contains any keys or values that are not `Strings`.
- `NullPointerException`: if `writer` is null.

## Properties.store(OutputStream, String)

```java
public void store(OutputStream out, String comments) throws IOException
```

Writes this property list (key and element pairs) in this
`Properties` table to the output stream in a format suitable
for loading into a `Properties` table using the
load(InputStream) method.

Properties from the defaults table of this `Properties`
table (if any) are *not* written out by this method.

This method outputs the comments, properties keys and values in
the same format as specified in
java.lang.String) store(Writer),
with the following differences:

- The stream is written using the ISO 8859-1 character encoding.

- Characters not in Latin-1 in the comments are written as
`\u005Cu`*xxxx* for their appropriate unicode
hexadecimal value *xxxx*.

- Characters less than `\u005Cu0020` and characters greater
than `\u005Cu007E` in property keys or values are written
as `\u005Cu`*xxxx* for the appropriate hexadecimal
value *xxxx*.

After the entries have been written, the output stream is flushed.
The output stream remains open after this method returns.

Parameters:

- `out`: an output stream.
- `comments`: a description of the property list.

**Since:** 1.2

Throws:

- `IOException`: if writing this property list to the specified output stream throws an `IOException`.
- `ClassCastException`: if this `Properties` object contains any keys or values that are not `Strings`.
- `NullPointerException`: if `out` is null.

## Properties.loadFromXML(InputStream)

```java
public synchronized void loadFromXML(InputStream in) throws IOException, InvalidPropertiesFormatException
```

Loads all of the properties represented by the XML document on the
specified input stream into this properties table.

The XML document must have the following DOCTYPE declaration:

```java
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
```

Furthermore, the document must satisfy the properties DTD described
above.

 An implementation is required to read XML documents that use the
"`UTF-8`" or "`UTF-16`" encoding. An implementation may
support additional encodings.

The specified stream is closed after this method returns.

Parameters:

- `in`: the input stream from which to read the XML document.

**See also:** #storeToXML(OutputStream, String, String)

**See also:** Character
        Encoding in Entities

**Since:** 1.5

Throws:

- `IOException`: if reading from the specified input stream results in an `IOException`.
- `java.io.UnsupportedEncodingException`: if the document's encoding declaration can be read and it specifies an encoding that is not supported
- `InvalidPropertiesFormatException`: Data on input stream does not constitute a valid XML document with the mandated document type.
- `NullPointerException`: if `in` is null.

## Properties.storeToXML(OutputStream, String)

```java
public void storeToXML(OutputStream os, String comment) throws IOException
```

Emits an XML document representing all of the properties contained
in this table.

 An invocation of this method of the form `props.storeToXML(os, comment)` behaves in exactly the same way as the invocation
`props.storeToXML(os, comment, "UTF-8");`.

Parameters:

- `os`: the output stream on which to emit the XML document.
- `comment`: a description of the property list, or `null` if no comment is desired.

**See also:** #loadFromXML(InputStream)

**Since:** 1.5

Throws:

- `IOException`: if writing to the specified output stream results in an `IOException`.
- `NullPointerException`: if `os` is null.
- `ClassCastException`: if this `Properties` object contains any keys or values that are not `Strings`.

## Properties.storeToXML(OutputStream, String, String)

```java
public void storeToXML(OutputStream os, String comment, String encoding) throws IOException
```

Emits an XML document representing all of the properties contained
in this table, using the specified encoding.

The XML document will have the following DOCTYPE declaration:

```java
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
```

If the specified comment is `null` then no comment
will be stored in the document.

 An implementation is required to support writing of XML documents
that use the "`UTF-8`" or "`UTF-16`" encoding. An
implementation may support additional encodings.

The specified stream remains open after this method returns.

This method behaves the same as
os, String comment, Charset charset)
except that it will look up the charset
using the given encoding name.

Parameters:

- `os`: the output stream on which to emit the XML document.
- `comment`: a description of the property list, or `null` if no comment is desired.
- `encoding`: the name of a supported  character encoding

**See also:** #loadFromXML(InputStream)

**See also:** Character
        Encoding in Entities

**Since:** 1.5

Throws:

- `IOException`: if writing to the specified output stream results in an `IOException`.
- `java.io.UnsupportedEncodingException`: if the encoding is not supported by the implementation.
- `NullPointerException`: if `os` is `null`, or if `encoding` is `null`.
- `ClassCastException`: if this `Properties` object contains any keys or values that are not `Strings`.

## Properties.storeToXML(OutputStream, String, Charset)

```java
public void storeToXML(OutputStream os, String comment, Charset charset) throws IOException
```

Emits an XML document representing all of the properties contained
in this table, using the specified encoding.

The XML document will have the following DOCTYPE declaration:

```java
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
```

If the specified comment is `null` then no comment
will be stored in the document.

 An implementation is required to support writing of XML documents
that use the "`UTF-8`" or "`UTF-16`" encoding. An
implementation may support additional encodings.

 Unmappable characters for the specified charset will be encoded as
numeric character references.

The specified stream remains open after this method returns.

Parameters:

- `os`: the output stream on which to emit the XML document.
- `comment`: a description of the property list, or `null` if no comment is desired.
- `charset`: the charset

**See also:** #loadFromXML(InputStream)

**See also:** Character
        Encoding in Entities

**Since:** 10

Throws:

- `IOException`: if writing to the specified output stream results in an `IOException`.
- `NullPointerException`: if `os` or `charset` is `null`.
- `ClassCastException`: if this `Properties` object contains any keys or values that are not `Strings`.

## Properties.getProperty(String)

```java
public String getProperty(String key)
```

Searches for the property with the specified key in this property list.
If the key is not found in this property list, the default property list,
and its defaults, recursively, are then checked. The method returns
`null` if the property is not found.

Parameters:

- `key`: the property key.

**Returns:** the value in this property list with the specified key value.

**See also:** #setProperty

**See also:** #defaults

## Properties.getProperty(String, String)

```java
public String getProperty(String key, String defaultValue)
```

Searches for the property with the specified key in this property list.
If the key is not found in this property list, the default property list,
and its defaults, recursively, are then checked. The method returns the
default value argument if the property is not found.

Parameters:

- `key`: the hashtable key.
- `defaultValue`: a default value.

**Returns:** the value in this property list with the specified key value.

**See also:** #setProperty

**See also:** #defaults

## Properties.propertyNames()

```java
public Enumeration<?> propertyNames()
```

Returns an enumeration of all the keys in this property list,
including distinct keys in the default property list if a key
of the same name has not already been found from the main
properties list.

**Returns:** an enumeration of all the keys in this property list, including
         the keys in the default property list.

**See also:** java.util.Enumeration

**See also:** java.util.Properties#defaults

**See also:** #stringPropertyNames

Throws:

- `ClassCastException`: if any key in this property list is not a string.

## Properties.stringPropertyNames()

```java
public Set<String> stringPropertyNames()
```

Returns an unmodifiable set of keys from this property list
where the key and its corresponding value are strings,
including distinct keys in the default property list if a key
of the same name has not already been found from the main
properties list.  Properties whose key or value is not
of type `String` are omitted.

The returned set is not backed by this `Properties` object.
Changes to this `Properties` object are not reflected in the
returned set.

**Returns:** an unmodifiable set of keys in this property list where
         the key and its corresponding value are strings,
         including the keys in the default property list.

**See also:** java.util.Properties#defaults

**Since:** 1.6

## Properties.list(PrintStream)

```java
public void list(PrintStream out)
```

Prints this property list out to the specified output stream.
This method is useful for debugging.

Parameters:

- `out`: an output stream.

Throws:

- `ClassCastException`: if any key in this property list is not a string.
