# ObjectStreamClass class (java.io)

```java
public final class ObjectStreamClass implements Serializable
```

Serialization's descriptor for classes.  It contains the name and
serialVersionUID of the class.  The ObjectStreamClass for a specific class
loaded in this Java VM can be found/created using the lookup method.

<p>The algorithm to compute the SerialVersionUID is described in
<a href="{@docRoot}/../specs/serialization/class.html#stream-unique-identifiers">
   <cite>Java Object Serialization Specification,</cite> Section 4.6, "Stream Unique Identifiers"</a>.

@spec serialization/index.html Java Object Serialization Specification
@author      Mike Warres
@author      Roger Riggs
@see ObjectStreamField
@see <a href="{@docRoot}/../specs/serialization/class.html">
     <cite>Java Object Serialization Specification,</cite> Section 4, "Class Descriptors"</a>
@since   1.1

## ObjectStreamClass.NO_FIELDS

```java
public static final ObjectStreamField[] NO_FIELDS
```

serialPersistentFields value indicating no serializable fields

## ObjectStreamClass.lookup(Class<?>)

```java
public static ObjectStreamClass lookup(Class<?> cl)
```

Find the descriptor for a class that can be serialized.  Creates an
ObjectStreamClass instance if one does not exist yet for class. Null is
returned if the specified class does not implement java.io.Serializable
or java.io.Externalizable.

@param   cl class for which to get the descriptor
@return  the class descriptor for the specified class

## ObjectStreamClass.lookupAny(Class<?>)

```java
public static ObjectStreamClass lookupAny(Class<?> cl)
```

Returns the descriptor for any class, regardless of whether it
implements {@link Serializable}.

@param        cl class for which to get the descriptor
@return       the class descriptor for the specified class
@since 1.6

## ObjectStreamClass.getName()

```java
public String getName()
```

Returns the name of the class described by this descriptor.
This method returns the name of the class in the format that
is used by the {@link Class#getName} method.

@return a string representing the name of the class

## ObjectStreamClass.getSerialVersionUID()

```java
public long getSerialVersionUID()
```

Return the serialVersionUID for this class.  The serialVersionUID
defines a set of classes all with the same name that have evolved from a
common root class and agree to be serialized and deserialized using a
common format.  NonSerializable classes have a serialVersionUID of 0L.

@return  the SUID of the class described by this descriptor

## ObjectStreamClass.forClass()

```java
public Class<?> forClass()
```

Return the class in the local VM that this version is mapped to.  Null
is returned if there is no corresponding local class.

@return  the {@code Class} instance that this descriptor represents

## ObjectStreamClass.getFields()

```java
public ObjectStreamField[] getFields()
```

Return an array of the fields of this serializable class.

@return  an array containing an element for each persistent field of
         this class. Returns an array of length zero if there are no
         fields.
@since 1.2

## ObjectStreamClass.getField(String)

```java
public ObjectStreamField getField(String name)
```

Get the field of this class by name.

@param   name the name of the data field to look for
@return  The ObjectStreamField object of the named field or null if
         there is no such named field.

## ObjectStreamClass.toString()

```java
public String toString()
```

Return a string describing this ObjectStreamClass.