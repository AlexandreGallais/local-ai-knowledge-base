# PropertyResourceBundle class (java.util)

```java
public class PropertyResourceBundle extends ResourceBundle
```

{@code PropertyResourceBundle} is a concrete subclass of
{@code ResourceBundle} that manages resources for a locale
using a set of static strings from a property file. See
{@link ResourceBundle ResourceBundle} for more information about resource
bundles.

<p>
Unlike other types of resource bundle, you don't subclass
{@code PropertyResourceBundle}.  Instead, you supply properties
files containing the resource data.  {@code ResourceBundle.getBundle}
will automatically look for the appropriate properties file and create a
{@code PropertyResourceBundle} that refers to it. See
{@link ResourceBundle#getBundle(String, Locale, ClassLoader) ResourceBundle.getBundle}
for a complete description of the search and instantiation strategy.

<p>
The following <a id="sample">example</a> shows a member of a resource
bundle family with the base name "MyResources".
The text defines the bundle "MyResources_de",
the German member of the bundle family.
This member is based on {@code PropertyResourceBundle}, and the text
therefore is the content of the file "MyResources_de.properties"
(a related {@linkplain ListResourceBundle##sample example} shows
how you can add bundles to this family that are implemented as subclasses
of {@code ListResourceBundle}).
The keys in this example are of the form "s1" etc. The actual
keys are entirely up to your choice, so long as they are the same as
the keys you use in your program to retrieve the objects from the bundle.
Keys are case-sensitive.
{@snippet lang=properties :
    # MessageFormat pattern
    s1=Die Platte \"{1}\" enthält {0}.
    # location of {0} in pattern
    s2=1
    # sample disk name
    s3=Meine Platte
    # first ChoiceFormat choice
    s4=keine Dateien
    # second ChoiceFormat choice
    s5=eine Datei
    # third ChoiceFormat choice
    s6={0,number} Dateien
    # sample date
    s7=3. März 1996
}

@apiNote
{@code PropertyResourceBundle} can be constructed either
from an {@code InputStream} or a {@code Reader}, which represents a property file.
Constructing a {@code PropertyResourceBundle} instance from an {@code InputStream}
requires that the input stream be encoded in {@code UTF-8}. By default, if a
{@link java.nio.charset.MalformedInputException} or an
{@link java.nio.charset.UnmappableCharacterException} occurs on reading the
input stream, then the {@code PropertyResourceBundle} instance resets to the state
before the exception, re-reads the input stream in {@code ISO-8859-1}, and
continues reading. If the system property
{@systemProperty java.util.PropertyResourceBundle.encoding} is set to either
"ISO-8859-1" or "UTF-8", the input stream is solely read in that encoding,
and throws the exception if it encounters an invalid sequence.
If "ISO-8859-1" is specified, characters that cannot be represented in
ISO-8859-1 encoding must be represented by Unicode Escapes as defined in section
{@jls 3.3} of <cite>The Java Language Specification</cite>
whereas the other constructor which takes a {@code Reader} does not have that limitation.
Other encoding values are ignored for this system property.
The system property is read and evaluated when initializing this class.
Changing or removing the property has no effect after the initialization.

@implSpec
The implementation of a {@code PropertyResourceBundle} subclass must be
thread-safe if it's simultaneously used by multiple threads. The default
implementations of the non-abstract methods in this class are thread-safe.

@see ResourceBundle
@see ListResourceBundle
@see Properties
@since 1.1

## PropertyResourceBundle.PropertyResourceBundle(InputStream)

```java
public PropertyResourceBundle (InputStream stream) throws IOException
```

Creates a property resource bundle from an {@link java.io.InputStream
InputStream}. This constructor reads the property file in UTF-8 by default.
If a {@link java.nio.charset.MalformedInputException} or an
{@link java.nio.charset.UnmappableCharacterException} occurs on reading the
input stream, then the PropertyResourceBundle instance resets to the state
before the exception, re-reads the input stream in {@code ISO-8859-1} and
continues reading. If the system property
{@code java.util.PropertyResourceBundle.encoding} is set to either
"ISO-8859-1" or "UTF-8", the input stream is solely read in that encoding,
and throws the exception if it encounters an invalid sequence. Other
encoding values are ignored for this system property.
The system property is read and evaluated when initializing this class.
Changing or removing the property has no effect after the initialization.

@param stream an InputStream that represents a property file
       to read from.
@throws IOException if an I/O error occurs
@throws NullPointerException if {@code stream} is null
@throws IllegalArgumentException if {@code stream} contains a
    malformed Unicode escape sequence.
@throws MalformedInputException if the system property
    {@code java.util.PropertyResourceBundle.encoding} is set to "UTF-8"
    and {@code stream} contains an invalid UTF-8 byte sequence.
@throws UnmappableCharacterException if the system property
    {@code java.util.PropertyResourceBundle.encoding} is set to "UTF-8"
    and {@code stream} contains an unmappable UTF-8 byte sequence.

## PropertyResourceBundle.getKeys()

```java
public Enumeration<String> getKeys()
```

Returns an {@code Enumeration} of the keys contained in
this {@code ResourceBundle} and its parent bundles.

@return an {@code Enumeration} of the keys contained in
        this {@code ResourceBundle} and its parent bundles.
@see #keySet()

## PropertyResourceBundle.handleKeySet()

```java
protected Set<String> handleKeySet()
```

Returns a {@code Set} of the keys contained
<em>only</em> in this {@code ResourceBundle}.

@return a {@code Set} of the keys contained only in this
        {@code ResourceBundle}
@since 1.6
@see #keySet()