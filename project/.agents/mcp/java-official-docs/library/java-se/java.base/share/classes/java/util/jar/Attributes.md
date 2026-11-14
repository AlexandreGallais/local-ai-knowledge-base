---
title: "Attributes class (java.util.jar)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/jar/Attributes.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Attributes class (java.util.jar)

```java
public class Attributes implements Map<Object,Object>, Cloneable
```

The Attributes class maps Manifest attribute names to associated string
values. Valid attribute names are case-insensitive, are restricted to
the ASCII characters in the set [0-9a-zA-Z_-], and cannot exceed 70
characters in length. There must be a colon and a SPACE after the name;
the combined length will not exceed 72 characters.
Attribute values can contain any characters and
will be UTF8-encoded when written to the output stream.  See the
JAR File Specification
for more information about valid attribute names and values.

This map and its views have a predictable iteration order, namely the
order that keys were inserted into the map, as with `LinkedHashMap`.

**See also:** Manifest

**Since:** 1.2

## Attributes.map

```java
protected Map<Object,Object> map
```

The attribute name-value mappings.

## Attributes.Attributes()

```java
public Attributes()
```

Constructs a new, empty Attributes object with default size.

## Attributes.Attributes(int)

```java
public Attributes(int size)
```

Constructs a new, empty Attributes object with the specified
initial size.

Parameters:

- `size`: the initial number of attributes

## Attributes.Attributes(Attributes)

```java
public Attributes(Attributes attr)
```

Constructs a new Attributes object with the same attribute name-value
mappings as in the specified Attributes.

Parameters:

- `attr`: the specified Attributes

## Attributes.get(Object)

```java
public Object get(Object name)
```

Returns the value of the specified attribute name, or null if the
attribute name was not found.

Parameters:

- `name`: the attribute name

**Returns:** the value of the specified attribute name, or null if
        not found.

## Attributes.getValue(String)

```java
public String getValue(String name)
```

Returns the value of the specified attribute name, specified as
a string, or null if the attribute was not found. The attribute
name is case-insensitive.

This method is defined as:

```java
     return (String)get(new Attributes.Name((String)name));
```

Parameters:

- `name`: the attribute name as a string

**Returns:** the String value of the specified attribute name, or null if
        not found.

Throws:

- `IllegalArgumentException`: if the attribute name is invalid

## Attributes.getValue(Name)

```java
public String getValue(Name name)
```

Returns the value of the specified Attributes.Name, or null if the
attribute was not found.

This method is defined as:

```java
    return (String)get(name);
```

Parameters:

- `name`: the Attributes.Name object

**Returns:** the String value of the specified Attribute.Name, or null if
        not found.

## Attributes.put(Object, Object)

```java
public Object put(Object name, Object value)
```

Associates the specified value with the specified attribute name
(key) in this Map. If the Map previously contained a mapping for
the attribute name, the old value is replaced.

Parameters:

- `name`: the attribute name
- `value`: the attribute value

**Returns:** the previous value of the attribute, or null if none

Throws:

- `ClassCastException`: if the name is not a Attributes.Name or the value is not a String

## Attributes.putValue(String, String)

```java
public String putValue(String name, String value)
```

Associates the specified value with the specified attribute name,
specified as a String. The attributes name is case-insensitive.
If the Map previously contained a mapping for the attribute name,
the old value is replaced.

This method is defined as:

```java
     return (String)put(new Attributes.Name(name), value);
```

Parameters:

- `name`: the attribute name as a string
- `value`: the attribute value

**Returns:** the previous value of the attribute, or null if none

Throws:

- `IllegalArgumentException`: if the attribute name is invalid

## Attributes.remove(Object)

```java
public Object remove(Object name)
```

Removes the attribute with the specified name (key) from this Map.
Returns the previous attribute value, or null if none.

Parameters:

- `name`: attribute name

**Returns:** the previous value of the attribute, or null if none

## Attributes.containsValue(Object)

```java
public boolean containsValue(Object value)
```

Returns true if this Map maps one or more attribute names (keys)
to the specified value.

Parameters:

- `value`: the attribute value

**Returns:** true if this Map maps one or more attribute names to
        the specified value

## Attributes.containsKey(Object)

```java
public boolean containsKey(Object name)
```

Returns true if this Map contains the specified attribute name (key).

Parameters:

- `name`: the attribute name

**Returns:** true if this Map contains the specified attribute name

## Attributes.putAll(Map<?,?>)

```java
public void putAll(Map<?,?> attr)
```

Copies all of the attribute name-value mappings from the specified
Attributes to this Map. Duplicate mappings will be replaced.

Parameters:

- `attr`: the Attributes to be stored in this map

Throws:

- `ClassCastException`: if attr is not an Attributes

## Attributes.clear()

```java
public void clear()
```

Removes all attributes from this Map.

## Attributes.size()

```java
public int size()
```

Returns the number of attributes in this Map.

## Attributes.isEmpty()

```java
public boolean isEmpty()
```

Returns true if this Map contains no attributes.

## Attributes.keySet()

```java
public Set<Object> keySet()
```

Returns a Set view of the attribute names (keys) contained in this Map.

## Attributes.values()

```java
public Collection<Object> values()
```

Returns a Collection view of the attribute values contained in this Map.

## Attributes.entrySet()

```java
public Set<Map.Entry<Object,Object>> entrySet()
```

Returns a Collection view of the attribute name-value mappings
contained in this Map.

## Attributes.equals(Object)

```java
public boolean equals(Object o)
```

Compares the specified object to the underlying
map for equality.
Returns true if the given object is also a Map
and the two maps represent the same mappings.

Parameters:

- `o`: the Object to be compared

**Returns:** true if the specified Object is equal to this Map

## Attributes.hashCode()

```java
public int hashCode()
```

Returns the hash code value for this Map.

## Attributes.clone()

```java
public Object clone()
```

Returns a copy of the Attributes, implemented as follows:

```java
    public Object clone() { return new Attributes(this);
```

Since the attribute names and values are themselves immutable,
the Attributes returned can be safely modified without affecting
the original.

## Attributes.Name(String)

```java
public Name(String name)
```

Constructs a new attribute name using the given string name.

Parameters:

- `name`: the attribute string name

Throws:

- `IllegalArgumentException`: if the attribute name was invalid
- `NullPointerException`: if the attribute name was null

## Attributes.equals(Object)

```java
public boolean equals(Object o)
```

Compares this attribute name to another for equality.

Parameters:

- `o`: the object to compare

**Returns:** true if this attribute name is equal to the
        specified attribute object

## Attributes.hashCode()

```java
public int hashCode()
```

Computes the hash value for this attribute name.

## Attributes.toString()

```java
public String toString()
```

Returns the attribute name as a String.

## Attributes.MANIFEST_VERSION

```java
public static final Name MANIFEST_VERSION
```

`Name` object for `Manifest-Version`
manifest attribute. This attribute indicates the version number
of the manifest standard to which a JAR file's manifest conforms.

**See also:** Manifest and Signature Specification

## Attributes.SIGNATURE_VERSION

```java
public static final Name SIGNATURE_VERSION
```

`Name` object for `Signature-Version`
manifest attribute used when signing JAR files.

**See also:** Manifest and Signature Specification

## Attributes.CONTENT_TYPE

```java
public static final Name CONTENT_TYPE
```

`Name` object for `Content-Type`
manifest attribute.

## Attributes.CLASS_PATH

```java
public static final Name CLASS_PATH
```

`Name` object for `Class-Path`
manifest attribute.

**See also:** JAR file specification

## Attributes.MAIN_CLASS

```java
public static final Name MAIN_CLASS
```

`Name` object for `Main-Class` manifest
attribute used for launching applications packaged in JAR files.
The `Main-Class` attribute is used in conjunction
with the `-jar` command-line option of the
`java` application launcher.

## Attributes.SEALED

```java
public static final Name SEALED
```

`Name` object for `Sealed` manifest attribute
used for sealing.

**See also:** Package Sealing

## Attributes.EXTENSION_LIST

```java
public static final Name EXTENSION_LIST
```

`Name` object for `Extension-List` manifest attribute
used for the extension mechanism that is no longer supported.

## Attributes.EXTENSION_NAME

```java
public static final Name EXTENSION_NAME
```

`Name` object for `Extension-Name` manifest attribute
used for the extension mechanism that is no longer supported.

## Attributes.EXTENSION_INSTALLATION

```java
public static final Name EXTENSION_INSTALLATION
```

`Name` object for `Extension-Installation` manifest attribute.

**Deprecated:** Extension mechanism is no longer supported.

## Attributes.IMPLEMENTATION_TITLE

```java
public static final Name IMPLEMENTATION_TITLE
```

`Name` object for `Implementation-Title`
manifest attribute used for package versioning.

## Attributes.IMPLEMENTATION_VERSION

```java
public static final Name IMPLEMENTATION_VERSION
```

`Name` object for `Implementation-Version`
manifest attribute used for package versioning.

## Attributes.IMPLEMENTATION_VENDOR

```java
public static final Name IMPLEMENTATION_VENDOR
```

`Name` object for `Implementation-Vendor`
manifest attribute used for package versioning.

## Attributes.IMPLEMENTATION_VENDOR_ID

```java
public static final Name IMPLEMENTATION_VENDOR_ID
```

`Name` object for `Implementation-Vendor-Id`
manifest attribute.

**Deprecated:** Extension mechanism is no longer supported.

## Attributes.IMPLEMENTATION_URL

```java
public static final Name IMPLEMENTATION_URL
```

`Name` object for `Implementation-URL`
manifest attribute.

**Deprecated:** Extension mechanism is no longer supported.

## Attributes.SPECIFICATION_TITLE

```java
public static final Name SPECIFICATION_TITLE
```

`Name` object for `Specification-Title`
manifest attribute used for package versioning.

## Attributes.SPECIFICATION_VERSION

```java
public static final Name SPECIFICATION_VERSION
```

`Name` object for `Specification-Version`
manifest attribute used for package versioning.

## Attributes.SPECIFICATION_VENDOR

```java
public static final Name SPECIFICATION_VENDOR
```

`Name` object for `Specification-Vendor`
manifest attribute used for package versioning.

## Attributes.MULTI_RELEASE

```java
public static final Name MULTI_RELEASE
```

`Name` object for `Multi-Release`
manifest attribute that indicates this is a multi-release JAR file.

**Since:** 9
