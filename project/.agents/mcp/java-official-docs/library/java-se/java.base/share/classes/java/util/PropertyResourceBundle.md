---
title: "PropertyResourceBundle class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/PropertyResourceBundle.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PropertyResourceBundle class (java.util)

```java
public class PropertyResourceBundle extends ResourceBundle
```

`PropertyResourceBundle` is a concrete subclass of
`ResourceBundle` that manages resources for a locale
using a set of static strings from a property file. See
ResourceBundle for more information about resource
bundles.

Unlike other types of resource bundle, you don't subclass
`PropertyResourceBundle`.  Instead, you supply properties
files containing the resource data.  `ResourceBundle.getBundle`
will automatically look for the appropriate properties file and create a
`PropertyResourceBundle` that refers to it. See
Locale, ClassLoader) ResourceBundle.getBundle
for a complete description of the search and instantiation strategy.

The following example shows a member of a resource
bundle family with the base name "MyResources".
The text defines the bundle "MyResources_de",
the German member of the bundle family.
This member is based on `PropertyResourceBundle`, and the text
therefore is the content of the file "MyResources_de.properties"
(a related example shows
how you can add bundles to this family that are implemented as subclasses
of `ListResourceBundle`).
The keys in this example are of the form "s1" etc. The actual
keys are entirely up to your choice, so long as they are the same as
the keys you use in your program to retrieve the objects from the bundle.
Keys are case-sensitive.

**API note:** `PropertyResourceBundle` can be constructed either
from an `InputStream` or a `Reader`, which represents a property file.
Constructing a `PropertyResourceBundle` instance from an `InputStream`
requires that the input stream be encoded in `UTF-8`. By default, if a
`java.nio.charset.MalformedInputException` or an
`java.nio.charset.UnmappableCharacterException` occurs on reading the
input stream, then the `PropertyResourceBundle` instance resets to the state
before the exception, re-reads the input stream in `ISO-8859-1`, and
continues reading. If the system property
`java.util.PropertyResourceBundle.encoding` is set to either
"ISO-8859-1" or "UTF-8", the input stream is solely read in that encoding,
and throws the exception if it encounters an invalid sequence.
If "ISO-8859-1" is specified, characters that cannot be represented in
ISO-8859-1 encoding must be represented by Unicode Escapes as defined in section
 of *The Java Language Specification*
whereas the other constructor which takes a `Reader` does not have that limitation.
Other encoding values are ignored for this system property.
The system property is read and evaluated when initializing this class.
Changing or removing the property has no effect after the initialization.

**Implementation requirements:** The implementation of a `PropertyResourceBundle` subclass must be
thread-safe if it's simultaneously used by multiple threads. The default
implementations of the non-abstract methods in this class are thread-safe.

**See also:** ResourceBundle

**See also:** ListResourceBundle

**See also:** Properties

**Since:** 1.1

## PropertyResourceBundle.PropertyResourceBundle(InputStream)

```java
public PropertyResourceBundle (InputStream stream) throws IOException
```

Creates a property resource bundle from an InputStream. This constructor reads the property file in UTF-8 by default.
If a `java.nio.charset.MalformedInputException` or an
`java.nio.charset.UnmappableCharacterException` occurs on reading the
input stream, then the PropertyResourceBundle instance resets to the state
before the exception, re-reads the input stream in `ISO-8859-1` and
continues reading. If the system property
`java.util.PropertyResourceBundle.encoding` is set to either
"ISO-8859-1" or "UTF-8", the input stream is solely read in that encoding,
and throws the exception if it encounters an invalid sequence. Other
encoding values are ignored for this system property.
The system property is read and evaluated when initializing this class.
Changing or removing the property has no effect after the initialization.

Parameters:

- `stream`: an InputStream that represents a property file to read from.

Throws:

- `IOException`: if an I/O error occurs
- `NullPointerException`: if `stream` is null
- `IllegalArgumentException`: if `stream` contains a malformed Unicode escape sequence.
- `MalformedInputException`: if the system property `java.util.PropertyResourceBundle.encoding` is set to "UTF-8" and `stream` contains an invalid UTF-8 byte sequence.
- `UnmappableCharacterException`: if the system property `java.util.PropertyResourceBundle.encoding` is set to "UTF-8" and `stream` contains an unmappable UTF-8 byte sequence.

## PropertyResourceBundle.getKeys()

```java
public Enumeration<String> getKeys()
```

Returns an `Enumeration` of the keys contained in
this `ResourceBundle` and its parent bundles.

**Returns:** an `Enumeration` of the keys contained in
        this `ResourceBundle` and its parent bundles.

**See also:** #keySet()

## PropertyResourceBundle.handleKeySet()

```java
protected Set<String> handleKeySet()
```

Returns a `Set` of the keys contained
*only* in this `ResourceBundle`.

**Returns:** a `Set` of the keys contained only in this
        `ResourceBundle`

**Since:** 1.6

**See also:** #keySet()
