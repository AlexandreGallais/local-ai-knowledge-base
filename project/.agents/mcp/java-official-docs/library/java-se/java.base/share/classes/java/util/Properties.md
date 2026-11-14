# Properties class (java.util)

```java
public class Properties extends Hashtable<Object,Object>
```

The {@code Properties} class represents a persistent set of
properties. The {@code Properties} can be saved to a stream
or loaded from a stream. Each key and its corresponding value in
the property list is a string.
<p>
A property list can contain another property list as its
"defaults"; this second property list is searched if
the property key is not found in the original property list.
<p>
Because {@code Properties} inherits from {@code Hashtable}, the
{@code put} and {@code putAll} methods can be applied to a
{@code Properties} object.  Their use is strongly discouraged as they
allow the caller to insert entries whose keys or values are not
{@code Strings}.  The {@code setProperty} method should be used
instead.  If the {@code store} or {@code save} method is called
on a "compromised" {@code Properties} object that contains a
non-{@code String} key or value, the call will fail. Similarly,
the call to the {@code propertyNames} or {@code list} method
will fail if it is called on a "compromised" {@code Properties}
object that contains a non-{@code String} key.

<p>
The iterators returned by the {@code iterator} method of this class's
"collection views" (that is, {@code entrySet()}, {@code keySet()}, and
{@code values()}) may not fail-fast (unlike the Hashtable implementation).
These iterators are guaranteed to traverse elements as they existed upon
construction exactly once, and may (but are not guaranteed to) reflect any
modifications subsequent to construction.
<p>
The {@link #load(java.io.Reader) load(Reader)} {@code /}
{@link #store(java.io.Writer, java.lang.String) store(Writer, String)}
methods load and store properties from and to a character based stream
in a simple line-oriented format specified below.

The {@link #load(java.io.InputStream) load(InputStream)} {@code /}
{@link #store(java.io.OutputStream, java.lang.String) store(OutputStream, String)}
methods work the same way as the load(Reader)/store(Writer, String) pair, except
the input/output stream is encoded in ISO 8859-1 character encoding.
Characters that cannot be directly represented in this encoding can be written using
Unicode escapes as defined in section {@jls 3.3} of
<cite>The Java Language Specification</cite>;
only a single 'u' character is allowed in an escape
sequence.

<p> The {@link #loadFromXML(InputStream)} and {@link
#storeToXML(OutputStream, String, String)} methods load and store properties
in a simple XML format.  By default the UTF-8 character encoding is used,
however a specific encoding may be specified if required. Implementations
are required to support UTF-8 and UTF-16 and may support other encodings.
An XML properties document has the following DOCTYPE declaration:

<pre>
&lt;!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd"&gt;
</pre>
Note that the system URI (http://java.sun.com/dtd/properties.dtd) is
<i>not</i> accessed when exporting or importing properties; it merely
serves as a string to uniquely identify the DTD, which is:
<pre>
   &lt;?xml version="1.0" encoding="UTF-8"?&gt;

   &lt;!-- DTD for properties --&gt;

   &lt;!ELEMENT properties ( comment?, entry* ) &gt;

   &lt;!ATTLIST properties version CDATA #FIXED "1.0"&gt;

   &lt;!ELEMENT comment (#PCDATA) &gt;

   &lt;!ELEMENT entry (#PCDATA) &gt;

   &lt;!ATTLIST entry key CDATA #REQUIRED&gt;
</pre>

<p>This class is thread-safe: multiple threads can share a single
{@code Properties} object without the need for external synchronization.

@apiNote
The {@code Properties} class does not inherit the concept of a load factor
from its superclass, {@code Hashtable}.

@author  Arthur van Hoff
@author  Michael McCloskey
@author  Xueming Shen
@since   1.0

## Properties.defaults

```java
protected volatile Properties defaults
```

A property list that contains default values for any keys not
found in this property list.

@serial

## Properties.Properties()

```java
public Properties()
```

Creates an empty property list with no default values.

@implNote The initial capacity of a {@code Properties} object created
with this constructor is unspecified.

## Properties.Properties(int)

```java
public Properties(int initialCapacity)
```

Creates an empty property list with no default values, and with an
initial size accommodating the specified number of elements without the
need to dynamically resize.

@param  initialCapacity the {@code Properties} will be sized to
        accommodate this many elements
@throws IllegalArgumentException if the initial capacity is less than
        zero.
@since 10

## Properties.Properties(Properties)

```java
public Properties(Properties defaults)
```

Creates an empty property list with the specified defaults.

@implNote The initial capacity of a {@code Properties} object created
with this constructor is unspecified.

@param   defaults   the defaults.

## Properties.setProperty(String, String)

```java
public synchronized Object setProperty(String key, String value)
```

Calls the {@code Hashtable} method {@code put}. Provided for
parallelism with the {@code getProperty} method. Enforces use of
strings for property keys and values. The value returned is the
result of the {@code Hashtable} call to {@code put}.

@param key the key to be placed into this property list.
@param value the value corresponding to {@code key}.
@return     the previous value of the specified key in this property
            list, or {@code null} if it did not have one.
@see #getProperty
@since    1.2

## Properties.load(Reader)

```java
public synchronized void load(Reader reader) throws IOException
```

Reads a property list (key and element pairs) from the input
character stream in a simple line-oriented format.
<p>
Properties are processed in terms of lines. There are two
kinds of lines, <i>natural lines</i> and <i>logical lines</i>.
A natural line is defined as a line of
characters that is terminated either by a set of line terminator
characters ({@code \n} or {@code \r} or {@code \r\n})
or by the end of the stream. A natural line may be either a blank line,
a comment line, or hold all or some of a key-element pair. A logical
line holds all the data of a key-element pair, which may be spread
out across several adjacent natural lines by escaping
the line terminator sequence with a backslash character
{@code \}.  Note that a comment line cannot be extended
in this manner; every natural line that is a comment must have
its own comment indicator, as described below. Lines are read from
input until the end of the stream is reached.

<p>
A natural line that contains only white space characters is
considered blank and is ignored.  A comment line has an ASCII
{@code '#'} or {@code '!'} as its first non-whitespace
character; comment lines are also ignored and do not
encode key-element information.  In addition to line
terminators, this format considers the characters space
({@code ' '}, {@code '\u005Cu0020'}), tab
({@code '\t'}, {@code '\u005Cu0009'}), and form feed
({@code '\f'}, {@code '\u005Cu000C'}) to be white
space.

<p>
If a logical line is spread across several natural lines, the
backslash escaping the line terminator sequence, the line
terminator sequence, and any white space at the start of the
following line have no effect on the key or element values.
The remainder of the discussion of key and element parsing
(when loading) will assume all the characters constituting
the key and element appear on a single natural line after
line continuation characters have been removed.  Note that
it is <i>not</i> sufficient to only examine the character
preceding a line terminator sequence to decide if the line
terminator is escaped; there must be an odd number of
contiguous backslashes for the line terminator to be escaped.
Since the input is processed from left to right, a
non-zero even number of 2<i>n</i> contiguous backslashes
before a line terminator (or elsewhere) encodes <i>n</i>
backslashes after escape processing.

<p>
The key contains all of the characters in the line starting
with the first non-whitespace character and up to, but not
including, the first unescaped {@code '='},
{@code ':'}, or white space character other than a line
terminator. All of these key termination characters may be
included in the key by escaping them with a preceding backslash
character; for example,<p>

{@code \:\=}<p>

would be the two-character key {@code ":="}.  Line
terminator characters can be included using {@code \r} and
{@code \n} escape sequences.  Any white space after the
key is skipped; if the first non-whitespace character after
the key is {@code '='} or {@code ':'}, then it is
ignored and any white space characters after it are also
skipped.  All remaining characters on the line become part of
the associated element string; if there are no remaining
characters, the element is the empty string
{@code ""}.  Once the raw character sequences
constituting the key and element are identified, escape
processing is performed as described above.

<p>
As an example, each of the following three lines specifies the key
{@code "Truth"} and the associated element value
{@code "Beauty"}:
<pre>
Truth = Beauty
 Truth:Beauty
Truth                    :Beauty
</pre>
As another example, the following three lines specify a single
property:
<pre>
fruits                           apple, banana, pear, \
                                 cantaloupe, watermelon, \
                                 kiwi, mango
</pre>
The key is {@code "fruits"} and the associated element is:
<pre>"apple, banana, pear, cantaloupe, watermelon, kiwi, mango"</pre>
Note that a space appears before each {@code \} so that a space
will appear after each comma in the final result; the {@code \},
line terminator, and leading white space on the continuation line are
merely discarded and are <i>not</i> replaced by one or more other
characters.
<p>
As a third example, the line:
<pre>cheeses
</pre>
specifies that the key is {@code "cheeses"} and the associated
element is the empty string {@code ""}.
<p>
<a id="unicodeescapes"></a>
Characters in keys and elements can be represented in escape
sequences similar to those used for character and string literals
(see sections {@jls 3.3} and {@jls 3.10.6} of
<cite>The Java Language Specification</cite>).

The differences from the character escape sequences and Unicode
escapes used for characters and strings are:

<ul>
<li> Octal escapes are not recognized.

<li> The character sequence {@code \b} does <i>not</i>
represent a backspace character.

<li> The method does not treat a backslash character,
{@code \}, before a non-valid escape character as an
error; the backslash is silently dropped.  For example, in a
Java string the sequence {@code "\z"} would cause a
compile time error.  In contrast, this method silently drops
the backslash.  Therefore, this method treats the two character
sequence {@code "\b"} as equivalent to the single
character {@code 'b'}.

<li> Escapes are not necessary for single and double quotes;
however, by the rule above, single and double quote characters
preceded by a backslash still yield single and double quote
characters, respectively.

<li> Only a single 'u' character is allowed in a Unicode escape
sequence.

</ul>
<p>
The specified stream remains open after this method returns.

@param   reader   the input character stream.
@throws  IOException  if an error occurred when reading from the
         input stream.
@throws  IllegalArgumentException if a malformed Unicode escape
         appears in the input.
@throws  NullPointerException if {@code reader} is null.
@since   1.6

## Properties.load(InputStream)

```java
public synchronized void load(InputStream inStream) throws IOException
```

Reads a property list (key and element pairs) from the input
byte stream. The input stream is in a simple line-oriented
format as specified in
{@link #load(java.io.Reader) load(Reader)} and is assumed to use
the ISO 8859-1 character encoding; that is each byte is one Latin1
character. Characters not in Latin1, and certain special characters,
are represented in keys and elements using Unicode escapes as defined in
section {@jls 3.3} of
<cite>The Java Language Specification</cite>.
<p>
The specified stream remains open after this method returns.

@param      inStream   the input stream.
@throws     IOException  if an error occurred when reading from the
            input stream.
@throws     IllegalArgumentException if the input stream contains a
            malformed Unicode escape sequence.
@throws     NullPointerException if {@code inStream} is null.
@since 1.2

## Properties.save(OutputStream, String)

```java
public void save(OutputStream out, String comments)
```

Calls the {@code store(OutputStream out, String comments)} method
and suppresses IOExceptions that were thrown.

@deprecated This method does not throw an IOException if an I/O error
occurs while saving the property list.  The preferred way to save a
properties list is via the {@code store(OutputStream out,
String comments)} method or the
{@code storeToXML(OutputStream os, String comment)} method.

@param   out      an output stream.
@param   comments   a description of the property list.
@throws     ClassCastException  if this {@code Properties} object
            contains any keys or values that are not
            {@code Strings}.

## Properties.store(Writer, String)

```java
public void store(Writer writer, String comments) throws IOException
```

Writes this property list (key and element pairs) in this
{@code Properties} table to the output character stream in a
format suitable for using the {@link #load(java.io.Reader) load(Reader)}
method.
<p>
Properties from the defaults table of this {@code Properties}
table (if any) are <i>not</i> written out by this method.
<p>
If the comments argument is not null, then an ASCII {@code #}
character, the comments string, and a line separator are first written
to the output stream. Thus, the {@code comments} can serve as an
identifying comment. Any one of a line feed ({@code \n}), a carriage
return ({@code \r}), or a carriage return followed immediately by a line feed
({@code \r\n}) in comments is replaced by a
{@link System#lineSeparator() line separator} and if the next
character in comments is not character {@code #} or character {@code !} then
an ASCII {@code #} is written out after that line separator.
<p>
If the {@systemProperty java.properties.date} is set on the command line
and is non-empty (as determined by {@link String#isEmpty()  String.isEmpty}),
a comment line is written as follows.
First, a {@code #} character is written, followed by the contents
of the property, followed by a line separator. Any line terminator characters
in the value of the system property are treated the same way as noted above
for the comments argument.
If the system property is not set or is empty, a comment line is written
as follows.
First, a {@code #} character is written, followed by the current date and time
formatted as if by the {@link Date#toString() Date.toString} method,
followed by a line separator.
<p>
Then every entry in this {@code Properties} table is
written out, one per line. For each entry the key string is
written, then an ASCII {@code =}, then the associated
element string. For the key, all space characters are
written with a preceding {@code \} character.  For the
element, leading space characters, but not embedded or trailing
space characters, are written with a preceding {@code \}
character. The key and element characters {@code #},
{@code !}, {@code =}, and {@code :} are written
with a preceding backslash to ensure that they are properly loaded.
<p>
After the entries have been written, the output stream is flushed.
The output stream remains open after this method returns.

@implSpec The keys and elements are written in the natural sort order
of the keys in the {@code entrySet()} unless {@code entrySet()} is
overridden by a subclass to return a different value than {@code super.entrySet()}.

@param   writer      an output character stream writer.
@param   comments   a description of the property list.
@throws     IOException if writing this property list to the specified
            output stream throws an {@code IOException}.
@throws     ClassCastException  if this {@code Properties} object
            contains any keys or values that are not {@code Strings}.
@throws     NullPointerException  if {@code writer} is null.
@since 1.6

## Properties.store(OutputStream, String)

```java
public void store(OutputStream out, String comments) throws IOException
```

Writes this property list (key and element pairs) in this
{@code Properties} table to the output stream in a format suitable
for loading into a {@code Properties} table using the
{@link #load(InputStream) load(InputStream)} method.
<p>
Properties from the defaults table of this {@code Properties}
table (if any) are <i>not</i> written out by this method.
<p>
This method outputs the comments, properties keys and values in
the same format as specified in
{@link #store(java.io.Writer, java.lang.String) store(Writer)},
with the following differences:
<ul>
<li>The stream is written using the ISO 8859-1 character encoding.

<li>Characters not in Latin-1 in the comments are written as
{@code \u005Cu}<i>xxxx</i> for their appropriate unicode
hexadecimal value <i>xxxx</i>.

<li>Characters less than {@code \u005Cu0020} and characters greater
than {@code \u005Cu007E} in property keys or values are written
as {@code \u005Cu}<i>xxxx</i> for the appropriate hexadecimal
value <i>xxxx</i>.
</ul>
<p>
After the entries have been written, the output stream is flushed.
The output stream remains open after this method returns.

@param   out      an output stream.
@param   comments   a description of the property list.
@throws     IOException if writing this property list to the specified
            output stream throws an {@code IOException}.
@throws     ClassCastException  if this {@code Properties} object
            contains any keys or values that are not {@code Strings}.
@throws     NullPointerException  if {@code out} is null.
@since 1.2

## Properties.loadFromXML(InputStream)

```java
public synchronized void loadFromXML(InputStream in) throws IOException, InvalidPropertiesFormatException
```

Loads all of the properties represented by the XML document on the
specified input stream into this properties table.

<p>The XML document must have the following DOCTYPE declaration:
<pre>
&lt;!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd"&gt;
</pre>
Furthermore, the document must satisfy the properties DTD described
above.

<p> An implementation is required to read XML documents that use the
"{@code UTF-8}" or "{@code UTF-16}" encoding. An implementation may
support additional encodings.

<p>The specified stream is closed after this method returns.

@param in the input stream from which to read the XML document.
@throws IOException if reading from the specified input stream
        results in an {@code IOException}.
@throws java.io.UnsupportedEncodingException if the document's encoding
        declaration can be read and it specifies an encoding that is not
        supported
@throws InvalidPropertiesFormatException Data on input stream does not
        constitute a valid XML document with the mandated document type.
@throws NullPointerException if {@code in} is null.

@spec https://www.w3.org/TR/xml Extensible Markup Language (XML) 1.0 (Fifth Edition)
@see    #storeToXML(OutputStream, String, String)
@see    <a href="http://www.w3.org/TR/REC-xml/#charencoding">Character
        Encoding in Entities</a>
@since 1.5

## Properties.storeToXML(OutputStream, String)

```java
public void storeToXML(OutputStream os, String comment) throws IOException
```

Emits an XML document representing all of the properties contained
in this table.

<p> An invocation of this method of the form {@code props.storeToXML(os,
comment)} behaves in exactly the same way as the invocation
{@code props.storeToXML(os, comment, "UTF-8");}.

@param os the output stream on which to emit the XML document.
@param comment a description of the property list, or {@code null}
       if no comment is desired.
@throws IOException if writing to the specified output stream
        results in an {@code IOException}.
@throws NullPointerException if {@code os} is null.
@throws ClassCastException  if this {@code Properties} object
        contains any keys or values that are not
        {@code Strings}.
@see    #loadFromXML(InputStream)
@since 1.5

## Properties.storeToXML(OutputStream, String, String)

```java
public void storeToXML(OutputStream os, String comment, String encoding) throws IOException
```

Emits an XML document representing all of the properties contained
in this table, using the specified encoding.

<p>The XML document will have the following DOCTYPE declaration:
<pre>
&lt;!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd"&gt;
</pre>

<p>If the specified comment is {@code null} then no comment
will be stored in the document.

<p> An implementation is required to support writing of XML documents
that use the "{@code UTF-8}" or "{@code UTF-16}" encoding. An
implementation may support additional encodings.

<p>The specified stream remains open after this method returns.

<p>This method behaves the same as
{@linkplain #storeToXML(OutputStream os, String comment, Charset charset)}
except that it will {@linkplain java.nio.charset.Charset#forName look up the charset}
using the given encoding name.

@param os        the output stream on which to emit the XML document.
@param comment   a description of the property list, or {@code null}
                 if no comment is desired.
@param  encoding the name of a supported
                 <a href="../lang/package-summary.html#charenc">
                 character encoding</a>

@throws IOException if writing to the specified output stream
        results in an {@code IOException}.
@throws java.io.UnsupportedEncodingException if the encoding is not
        supported by the implementation.
@throws NullPointerException if {@code os} is {@code null},
        or if {@code encoding} is {@code null}.
@throws ClassCastException  if this {@code Properties} object
        contains any keys or values that are not {@code Strings}.

@spec https://www.w3.org/TR/xml Extensible Markup Language (XML) 1.0 (Fifth Edition)
@see    #loadFromXML(InputStream)
@see    <a href="http://www.w3.org/TR/REC-xml/#charencoding">Character
        Encoding in Entities</a>
@since 1.5

## Properties.storeToXML(OutputStream, String, Charset)

```java
public void storeToXML(OutputStream os, String comment, Charset charset) throws IOException
```

Emits an XML document representing all of the properties contained
in this table, using the specified encoding.

<p>The XML document will have the following DOCTYPE declaration:
<pre>
&lt;!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd"&gt;
</pre>

<p>If the specified comment is {@code null} then no comment
will be stored in the document.

<p> An implementation is required to support writing of XML documents
that use the "{@code UTF-8}" or "{@code UTF-16}" encoding. An
implementation may support additional encodings.

<p> Unmappable characters for the specified charset will be encoded as
numeric character references.

<p>The specified stream remains open after this method returns.

@param os        the output stream on which to emit the XML document.
@param comment   a description of the property list, or {@code null}
                 if no comment is desired.
@param charset   the charset

@throws IOException if writing to the specified output stream
        results in an {@code IOException}.
@throws NullPointerException if {@code os} or {@code charset} is {@code null}.
@throws ClassCastException  if this {@code Properties} object
        contains any keys or values that are not {@code Strings}.

@spec https://www.w3.org/TR/xml Extensible Markup Language (XML) 1.0 (Fifth Edition)
@see    #loadFromXML(InputStream)
@see    <a href="http://www.w3.org/TR/REC-xml/#charencoding">Character
        Encoding in Entities</a>
@since 10

## Properties.getProperty(String)

```java
public String getProperty(String key)
```

Searches for the property with the specified key in this property list.
If the key is not found in this property list, the default property list,
and its defaults, recursively, are then checked. The method returns
{@code null} if the property is not found.

@param   key   the property key.
@return  the value in this property list with the specified key value.
@see     #setProperty
@see     #defaults

## Properties.getProperty(String, String)

```java
public String getProperty(String key, String defaultValue)
```

Searches for the property with the specified key in this property list.
If the key is not found in this property list, the default property list,
and its defaults, recursively, are then checked. The method returns the
default value argument if the property is not found.

@param   key            the hashtable key.
@param   defaultValue   a default value.

@return  the value in this property list with the specified key value.
@see     #setProperty
@see     #defaults

## Properties.propertyNames()

```java
public Enumeration<?> propertyNames()
```

Returns an enumeration of all the keys in this property list,
including distinct keys in the default property list if a key
of the same name has not already been found from the main
properties list.

@return  an enumeration of all the keys in this property list, including
         the keys in the default property list.
@throws  ClassCastException if any key in this property list
         is not a string.
@see     java.util.Enumeration
@see     java.util.Properties#defaults
@see     #stringPropertyNames

## Properties.stringPropertyNames()

```java
public Set<String> stringPropertyNames()
```

Returns an unmodifiable set of keys from this property list
where the key and its corresponding value are strings,
including distinct keys in the default property list if a key
of the same name has not already been found from the main
properties list.  Properties whose key or value is not
of type {@code String} are omitted.
<p>
The returned set is not backed by this {@code Properties} object.
Changes to this {@code Properties} object are not reflected in the
returned set.

@return  an unmodifiable set of keys in this property list where
         the key and its corresponding value are strings,
         including the keys in the default property list.
@see     java.util.Properties#defaults
@since   1.6

## Properties.list(PrintStream)

```java
public void list(PrintStream out)
```

Prints this property list out to the specified output stream.
This method is useful for debugging.

@param   out   an output stream.
@throws  ClassCastException if any key in this property list
         is not a string.