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
<a href="{@docRoot}/../specs/jar/jar.html">JAR File Specification</a>
for more information about valid attribute names and values.

<p>This map and its views have a predictable iteration order, namely the
order that keys were inserted into the map, as with {@link LinkedHashMap}.

@spec jar/jar.html JAR File Specification
@author  David Connelly
@see     Manifest
@since   1.2

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

@param size the initial number of attributes

## Attributes.Attributes(Attributes)

```java
public Attributes(Attributes attr)
```

Constructs a new Attributes object with the same attribute name-value
mappings as in the specified Attributes.

@param attr the specified Attributes

## Attributes.get(Object)

```java
public Object get(Object name)
```

Returns the value of the specified attribute name, or null if the
attribute name was not found.

@param name the attribute name
@return the value of the specified attribute name, or null if
        not found.

## Attributes.getValue(String)

```java
public String getValue(String name)
```

Returns the value of the specified attribute name, specified as
a string, or null if the attribute was not found. The attribute
name is case-insensitive.
<p>
This method is defined as:
<pre>
     return (String)get(new Attributes.Name((String)name));
</pre>

@param name the attribute name as a string
@return the String value of the specified attribute name, or null if
        not found.
@throws IllegalArgumentException if the attribute name is invalid

## Attributes.getValue(Name)

```java
public String getValue(Name name)
```

Returns the value of the specified Attributes.Name, or null if the
attribute was not found.
<p>
This method is defined as:
<pre>
    return (String)get(name);
</pre>

@param name the Attributes.Name object
@return the String value of the specified Attribute.Name, or null if
        not found.

## Attributes.put(Object, Object)

```java
public Object put(Object name, Object value)
```

Associates the specified value with the specified attribute name
(key) in this Map. If the Map previously contained a mapping for
the attribute name, the old value is replaced.

@param name the attribute name
@param value the attribute value
@return the previous value of the attribute, or null if none
@throws    ClassCastException if the name is not a Attributes.Name
           or the value is not a String

## Attributes.putValue(String, String)

```java
public String putValue(String name, String value)
```

Associates the specified value with the specified attribute name,
specified as a String. The attributes name is case-insensitive.
If the Map previously contained a mapping for the attribute name,
the old value is replaced.
<p>
This method is defined as:
<pre>
     return (String)put(new Attributes.Name(name), value);
</pre>

@param name the attribute name as a string
@param value the attribute value
@return the previous value of the attribute, or null if none
@throws    IllegalArgumentException if the attribute name is invalid

## Attributes.remove(Object)

```java
public Object remove(Object name)
```

Removes the attribute with the specified name (key) from this Map.
Returns the previous attribute value, or null if none.

@param name attribute name
@return the previous value of the attribute, or null if none

## Attributes.containsValue(Object)

```java
public boolean containsValue(Object value)
```

Returns true if this Map maps one or more attribute names (keys)
to the specified value.

@param value the attribute value
@return true if this Map maps one or more attribute names to
        the specified value

## Attributes.containsKey(Object)

```java
public boolean containsKey(Object name)
```

Returns true if this Map contains the specified attribute name (key).

@param name the attribute name
@return true if this Map contains the specified attribute name

## Attributes.putAll(Map<?,?>)

```java
public void putAll(Map<?,?> attr)
```

Copies all of the attribute name-value mappings from the specified
Attributes to this Map. Duplicate mappings will be replaced.

@param attr the Attributes to be stored in this map
@throws    ClassCastException if attr is not an Attributes

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
{@linkplain Attributes#map map} for equality.
Returns true if the given object is also a Map
and the two maps represent the same mappings.

@param o the Object to be compared
@return true if the specified Object is equal to this Map

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
<pre>
    public Object clone() { return new Attributes(this); }
</pre>
Since the attribute names and values are themselves immutable,
the Attributes returned can be safely modified without affecting
the original.

## Attributes.Name(String)

```java
public Name(String name)
```

Constructs a new attribute name using the given string name.

@param name the attribute string name
@throws    IllegalArgumentException if the attribute name was
           invalid
@throws    NullPointerException if the attribute name was null

## Attributes.equals(Object)

```java
public boolean equals(Object o)
```

Compares this attribute name to another for equality.
@param o the object to compare
@return true if this attribute name is equal to the
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

{@code Name} object for {@code Manifest-Version}
manifest attribute. This attribute indicates the version number
of the manifest standard to which a JAR file's manifest conforms.
@see <a href="{@docRoot}/../specs/jar/jar.html#jar-manifest">
     Manifest and Signature Specification</a>

## Attributes.SIGNATURE_VERSION

```java
public static final Name SIGNATURE_VERSION
```

{@code Name} object for {@code Signature-Version}
manifest attribute used when signing JAR files.
@see <a href="{@docRoot}/../specs/jar/jar.html#jar-manifest">
     Manifest and Signature Specification</a>

## Attributes.CONTENT_TYPE

```java
public static final Name CONTENT_TYPE
```

{@code Name} object for {@code Content-Type}
manifest attribute.

## Attributes.CLASS_PATH

```java
public static final Name CLASS_PATH
```

{@code Name} object for {@code Class-Path}
manifest attribute.
@see <a href="{@docRoot}/../specs/jar/jar.html#class-path-attribute">
     JAR file specification</a>

## Attributes.MAIN_CLASS

```java
public static final Name MAIN_CLASS
```

{@code Name} object for {@code Main-Class} manifest
attribute used for launching applications packaged in JAR files.
The {@code Main-Class} attribute is used in conjunction
with the {@code -jar} command-line option of the
{@code java} application launcher.

## Attributes.SEALED

```java
public static final Name SEALED
```

{@code Name} object for {@code Sealed} manifest attribute
used for sealing.
@see <a href="{@docRoot}/../specs/jar/jar.html#package-sealing">
     Package Sealing</a>

## Attributes.EXTENSION_LIST

```java
public static final Name EXTENSION_LIST
```

{@code Name} object for {@code Extension-List} manifest attribute
used for the extension mechanism that is no longer supported.

## Attributes.EXTENSION_NAME

```java
public static final Name EXTENSION_NAME
```

{@code Name} object for {@code Extension-Name} manifest attribute
used for the extension mechanism that is no longer supported.

## Attributes.EXTENSION_INSTALLATION

```java
public static final Name EXTENSION_INSTALLATION
```

{@code Name} object for {@code Extension-Installation} manifest attribute.

@deprecated Extension mechanism is no longer supported.

## Attributes.IMPLEMENTATION_TITLE

```java
public static final Name IMPLEMENTATION_TITLE
```

{@code Name} object for {@code Implementation-Title}
manifest attribute used for package versioning.

## Attributes.IMPLEMENTATION_VERSION

```java
public static final Name IMPLEMENTATION_VERSION
```

{@code Name} object for {@code Implementation-Version}
manifest attribute used for package versioning.

## Attributes.IMPLEMENTATION_VENDOR

```java
public static final Name IMPLEMENTATION_VENDOR
```

{@code Name} object for {@code Implementation-Vendor}
manifest attribute used for package versioning.

## Attributes.IMPLEMENTATION_VENDOR_ID

```java
public static final Name IMPLEMENTATION_VENDOR_ID
```

{@code Name} object for {@code Implementation-Vendor-Id}
manifest attribute.

@deprecated Extension mechanism is no longer supported.

## Attributes.IMPLEMENTATION_URL

```java
public static final Name IMPLEMENTATION_URL
```

{@code Name} object for {@code Implementation-URL}
manifest attribute.

@deprecated Extension mechanism is no longer supported.

## Attributes.SPECIFICATION_TITLE

```java
public static final Name SPECIFICATION_TITLE
```

{@code Name} object for {@code Specification-Title}
manifest attribute used for package versioning.

## Attributes.SPECIFICATION_VERSION

```java
public static final Name SPECIFICATION_VERSION
```

{@code Name} object for {@code Specification-Version}
manifest attribute used for package versioning.

## Attributes.SPECIFICATION_VENDOR

```java
public static final Name SPECIFICATION_VENDOR
```

{@code Name} object for {@code Specification-Vendor}
manifest attribute used for package versioning.

## Attributes.MULTI_RELEASE

```java
public static final Name MULTI_RELEASE
```

{@code Name} object for {@code Multi-Release}
manifest attribute that indicates this is a multi-release JAR file.

@since   9