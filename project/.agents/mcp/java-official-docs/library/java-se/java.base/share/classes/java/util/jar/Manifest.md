---
title: "Manifest class (java.util.jar)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/jar/Manifest.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Manifest class (java.util.jar)

```java
public class Manifest implements Cloneable
```

The Manifest class is used to maintain Manifest entry names and their
associated Attributes. There are main Manifest Attributes as well as
per-entry Attributes. For information on the Manifest format, please
see the

Manifest format specification.

 Unless otherwise noted, passing a `null` argument to a constructor
or method in this class will cause a `NullPointerException` to be
thrown.

**See also:** Attributes

**Since:** 1.2

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

Parameters:

- `is`: the input stream containing manifest data

Throws:

- `IOException`: if an I/O error has occurred

## Manifest.Manifest(Manifest)

```java
public Manifest(Manifest man)
```

Constructs a new Manifest that is a copy of the specified Manifest.

Parameters:

- `man`: the Manifest to copy

## Manifest.getMainAttributes()

```java
public Attributes getMainAttributes()
```

## Manifest.getEntries()

```java
public Map<String,Attributes> getEntries()
```

Returns a Map of the entries contained in this Manifest. Each entry
is represented by a String name (key) and associated Attributes (value).
The Map permits the `null` key, but no entry with a null key is
created by `read`, nor is such an entry written by using `write`.

**Returns:** a Map of the entries contained in this Manifest

## Manifest.getAttributes(String)

```java
public Attributes getAttributes(String name)
```

Returns the Attributes for the specified entry name.
This method is defined as:

```java
     return (Attributes)getEntries().get(name)
```

Though `null` is a valid `name`, when
`getAttributes(null)` is invoked on a `Manifest`
obtained from a jar file, `null` will be returned.  While jar
files themselves do not allow `null`-named attributes, it is
possible to invoke `getEntries` on a `Manifest`, and
on that result, invoke `put` with a null key and an
arbitrary value.  Subsequent invocations of
`getAttributes(null)` will return the just-`put`
value.

Note that this method does not return the manifest's main attributes;
see `getMainAttributes`.

Parameters:

- `name`: entry name

**Returns:** the Attributes for the specified entry name

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

Parameters:

- `out`: the output stream

**See also:** #getMainAttributes

Throws:

- `IOException`: if an I/O error has occurred

## Manifest.read(InputStream)

```java
public void read(InputStream is) throws IOException
```

Reads the Manifest from the specified InputStream. The entry
names and attributes read will be merged in with the current
manifest entries.

Parameters:

- `is`: the input stream

Throws:

- `IOException`: if an I/O error has occurred

## Manifest.equals(Object)

```java
public boolean equals(Object o)
```

Returns true if the specified Object is also a Manifest and has
the same main Attributes and entries.

Parameters:

- `o`: the object to be compared

**Returns:** true if the specified Object is also a Manifest and has
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

```java
    public Object clone() { return new Manifest(this);
```

**Returns:** a shallow copy of this Manifest
