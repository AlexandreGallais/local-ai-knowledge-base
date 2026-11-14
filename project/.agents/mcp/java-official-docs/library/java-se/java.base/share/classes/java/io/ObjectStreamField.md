---
title: "ObjectStreamField class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/ObjectStreamField.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ObjectStreamField class (java.io)

```java
public class ObjectStreamField implements Comparable<Object>
```

A description of a Serializable field from a Serializable class.  An array
of ObjectStreamFields is used to declare the Serializable fields of a class.

**See also:** ObjectStreamClass

**Since:** 1.2

## ObjectStreamField.ObjectStreamField(String, Class<?>)

```java
public ObjectStreamField(String name, Class<?> type)
```

Create a Serializable field with the specified type.  This field should
be documented with a `serialField` tag.

Parameters:

- `name`: the name of the serializable field
- `type`: the `Class` object of the serializable field

## ObjectStreamField.ObjectStreamField(String, Class<?>, boolean)

```java
public ObjectStreamField(String name, Class<?> type, boolean unshared)
```

Creates an ObjectStreamField representing a serializable field with the
given name and type.  If unshared is false, values of the represented
field are serialized and deserialized in the default manner--if the
field is non-primitive, object values are serialized and deserialized as
if they had been written and read by calls to writeObject and
readObject.  If unshared is true, values of the represented field are
serialized and deserialized as if they had been written and read by
calls to writeUnshared and readUnshared.

Parameters:

- `name`: field name
- `type`: field type
- `unshared`: if false, write/read field values in the same manner as writeObject/readObject; if true, write/read in the same manner as writeUnshared/readUnshared

**Since:** 1.4

## ObjectStreamField.getName()

```java
public String getName()
```

Get the name of this field.

**Returns:** a `String` representing the name of the serializable
         field

## ObjectStreamField.getType()

```java
public Class<?> getType()
```

Get the type of the field.  If the type is non-primitive and this
`ObjectStreamField` was obtained from a deserialized `ObjectStreamClass` instance, then `Object.class` is returned.
Otherwise, the `Class` object for the type of the field is
returned.

**Returns:** a `Class` object representing the type of the
         serializable field

## ObjectStreamField.getTypeCode()

```java
public char getTypeCode()
```

Returns character encoding of field type.  The encoding is as follows:

```java
B            byte
C            char
D            double
F            float
I            int
J            long
L            class or interface
S            short
Z            boolean
[            array
```

**Returns:** the typecode of the serializable field

## ObjectStreamField.getTypeString()

```java
public String getTypeString()
```

Return the JVM type signature.

**Returns:** null if this field has a primitive type.

## ObjectStreamField.getOffset()

```java
public int getOffset()
```

Offset of field within instance data.

**Returns:** the offset of this field

**See also:** #setOffset

## ObjectStreamField.setOffset(int)

```java
protected void setOffset(int offset)
```

Offset within instance data.

Parameters:

- `offset`: the offset of the field

**See also:** #getOffset

## ObjectStreamField.isPrimitive()

```java
public boolean isPrimitive()
```

Return true if this field has a primitive type.

**Returns:** true if and only if this field corresponds to a primitive type

## ObjectStreamField.isUnshared()

```java
public boolean isUnshared()
```

Returns boolean value indicating whether or not the serializable field
represented by this ObjectStreamField instance is unshared.

**Returns:** `true` if this field is unshared

**Since:** 1.4

## ObjectStreamField.compareTo(Object)

```java
public int compareTo(Object obj)
```

Compare this field with another `ObjectStreamField`.  Return
-1 if this is smaller, 0 if equal, 1 if greater.  Types that are
primitives are "smaller" than object types.  If equal, the field names
are compared.

## ObjectStreamField.toString()

```java
public String toString()
```

Return a string that describes this field.
