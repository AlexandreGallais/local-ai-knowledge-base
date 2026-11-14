# Manifest class (java.util.jar)

```java
public class Manifest implements Cloneable
```

The Manifest class is used to maintain Manifest entry names and their
associated Attributes. There are main Manifest Attributes as well as
per-entry Attributes. For information on the Manifest format, please
see the
<a href="{@docRoot}/../specs/jar/jar.html">
Manifest format specification</a>.
<p> Unless otherwise noted, passing a {@code null} argument to a constructor
or method in this class will cause a {@link NullPointerException} to be
thrown.

@spec jar/jar.html JAR File Specification
@author  David Connelly
@see     Attributes
@since   1.2

## Manifest.Manifest()

```java
public Manifest()
```

Constructs a new, empty Manifest.

## Manifest.Manifest(InputStream)

```java
public Manifest(InputStream is) throws IOException
```

Constructs a new Manifest from the specified input stream.

@param is the input stream containing manifest data
@throws IOException if an I/O error has occurred

## Manifest.Manifest(Manifest)

```java
public Manifest(Manifest man)
```

Constructs a new Manifest that is a copy of the specified Manifest.

@param man the Manifest to copy

## Manifest.getMainAttributes()

```java
public Attributes getMainAttributes()
```

{@return the main Attributes for the Manifest}

## Manifest.getEntries()

```java
public Map<String,Attributes> getEntries()
```

Returns a Map of the entries contained in this Manifest. Each entry
is represented by a String name (key) and associated Attributes (value).
The Map permits the {@code null} key, but no entry with a null key is
created by {@link #read}, nor is such an entry written by using {@link
#write}.

@return a Map of the entries contained in this Manifest

## Manifest.getAttributes(String)

```java
public Attributes getAttributes(String name)
```

Returns the Attributes for the specified entry name.
This method is defined as:
<pre>
     return (Attributes)getEntries().get(name)
</pre>
Though {@code null} is a valid {@code name}, when
{@code getAttributes(null)} is invoked on a {@code Manifest}
obtained from a jar file, {@code null} will be returned.  While jar
files themselves do not allow {@code null}-named attributes, it is
possible to invoke {@link #getEntries} on a {@code Manifest}, and
on that result, invoke {@code put} with a null key and an
arbitrary value.  Subsequent invocations of
{@code getAttributes(null)} will return the just-{@code put}
value.
<p>
Note that this method does not return the manifest's main attributes;
see {@link #getMainAttributes}.

@param name entry name
@return the Attributes for the specified entry name

## Manifest.clear()

```java
public void clear()
```

Clears the main Attributes as well as the entries in this Manifest.

## Manifest.write(OutputStream)

```java
public void write(OutputStream out) throws IOException
```

Writes the Manifest to the specified OutputStream.
Attributes.Name.MANIFEST_VERSION must be set in
MainAttributes prior to invoking this method.

@param out the output stream
@throws    IOException if an I/O error has occurred
@see #getMainAttributes

## Manifest.read(InputStream)

```java
public void read(InputStream is) throws IOException
```

Reads the Manifest from the specified InputStream. The entry
names and attributes read will be merged in with the current
manifest entries.

@param is the input stream
@throws    IOException if an I/O error has occurred

## Manifest.equals(Object)

```java
public boolean equals(Object o)
```

Returns true if the specified Object is also a Manifest and has
the same main Attributes and entries.

@param o the object to be compared
@return true if the specified Object is also a Manifest and has
the same main Attributes and entries

## Manifest.hashCode()

```java
public int hashCode()
```

Returns the hash code for this Manifest.

## Manifest.clone()

```java
public Object clone()
```

Returns a shallow copy of this Manifest.  The shallow copy is
implemented as follows:
<pre>
    public Object clone() { return new Manifest(this); }
</pre>
@return a shallow copy of this Manifest