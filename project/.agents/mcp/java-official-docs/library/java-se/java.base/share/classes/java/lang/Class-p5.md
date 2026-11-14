---
title: "Class class (java.lang) (part 5 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Class.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Class class (java.lang) (part 5 of 6)

## Class.getDeclaredConstructor(Class<?>...)

```java
public Constructor<T> getDeclaredConstructor(Class<?>... parameterTypes) throws NoSuchMethodException
```

Returns a `Constructor` object that reflects the specified
constructor of the class represented by this
`Class` object.  The `parameterTypes` parameter is
an array of `Class` objects that identify the constructor's
formal parameter types, in declared order.

If this `Class` object represents an inner class
declared in a non-static context, the formal parameter types
include the explicit enclosing instance as the first parameter.

Parameters:

- `parameterTypes`: the parameter array

**Returns:** The `Constructor` object for the constructor with the
         specified parameter list

**See also:** #getConstructor(Class[])

**Since:** 1.1

Throws:

- `NoSuchMethodException`: if a matching constructor is not found, including when this `Class` object represents an interface, a primitive type, an array class, or void.

## Class.getResourceAsStream(String)

```java
public InputStream getResourceAsStream(String name)
```

Finds a resource with a given name.

 If this class is in a named Module then this method
will attempt to find the resource in the module. This is done by
delegating to the module's class loader findResource(String,String)
method, invoking it with the module name and the absolute name of the
resource. Resources in named modules are subject to the rules for
encapsulation specified in the `Module` getResourceAsStream method and so this
method returns `null` when the resource is a
non-"`.class`" resource in a package that is not open to the
caller's module.

 Otherwise, if this class is not in a named module then the rules for
searching resources associated with a given class are implemented by the
defining class loader of the class.  This method
delegates to this `Class` object's class loader.
If this `Class` object was loaded by the bootstrap class loader,
the method delegates to `ClassLoader.getSystemResourceAsStream`.

 Before delegation, an absolute resource name is constructed from the
given resource name using this algorithm:

-  If the `name` begins with a `'/'`
(`'\u002f'`), then the absolute name of the resource is the
portion of the `name` following the `'/'`.

-  Otherwise, the absolute name is of the following form:

  `modified_package_name/name`

 Where the `modified_package_name` is the package name of this
object with `'/'` substituted for `'.'`
(`'\u002e'`).

Parameters:

- `name`: name of the desired resource

**Returns:** A `java.io.InputStream` object; `null` if no
         resource with this name is found, or the resource is in a package
         that is not Module) open to at
         least the caller module.

**See also:** Module#getResourceAsStream(String)

**Since:** 1.1

Throws:

- `NullPointerException`: If `name` is `null`

## Class.getResource(String)

```java
public URL getResource(String name)
```

Finds a resource with a given name.

 If this class is in a named Module then this method
will attempt to find the resource in the module. This is done by
delegating to the module's class loader findResource(String,String)
method, invoking it with the module name and the absolute name of the
resource. Resources in named modules are subject to the rules for
encapsulation specified in the `Module` getResourceAsStream method and so this
method returns `null` when the resource is a
non-"`.class`" resource in a package that is not open to the
caller's module.

 Otherwise, if this class is not in a named module then the rules for
searching resources associated with a given class are implemented by the
defining class loader of the class.  This method
delegates to this `Class` object's class loader.
If this `Class` object was loaded by the bootstrap class loader,
the method delegates to `ClassLoader.getSystemResource`.

 Before delegation, an absolute resource name is constructed from the
given resource name using this algorithm:

-  If the `name` begins with a `'/'`
(`'\u002f'`), then the absolute name of the resource is the
portion of the `name` following the `'/'`.

-  Otherwise, the absolute name is of the following form:

  `modified_package_name/name`

 Where the `modified_package_name` is the package name of this
object with `'/'` substituted for `'.'`
(`'\u002e'`).

Parameters:

- `name`: name of the desired resource

**Returns:** A `java.net.URL` object; `null` if no resource with
        this name is found, the resource cannot be located by a URL, or the
        resource is in a package that is not
        Module) open to at least the caller
        module.

**Since:** 1.1

Throws:

- `NullPointerException`: If `name` is `null`

## Class.getProtectionDomain()

```java
public ProtectionDomain getProtectionDomain()
```

Returns the `ProtectionDomain` of this class.

**Returns:** the ProtectionDomain of this class

**See also:** java.security.ProtectionDomain

**Since:** 1.2

## Class.desiredAssertionStatus()

```java
public boolean desiredAssertionStatus()
```

Returns the assertion status that would be assigned to this
class if it were to be initialized at the time this method is invoked.
If this class has had its assertion status set, the most recent
setting will be returned; otherwise, if any package default assertion
status pertains to this class, the most recent setting for the most
specific pertinent package default assertion status is returned;
otherwise, if this class is not a system class (i.e., it has a
class loader) its class loader's default assertion status is returned;
otherwise, the system class default assertion status is returned.

**API note:** Few programmers will have any need for this method; it is provided
for the benefit of the JDK itself.  (It allows a class to determine at
the time that it is initialized whether assertions should be enabled.)
Note that this method is not guaranteed to return the actual
assertion status that was (or will be) associated with the specified
class when it was (or will be) initialized.

**Returns:** the desired assertion status of the specified class.

**See also:** java.lang.ClassLoader#setClassAssertionStatus

**See also:** java.lang.ClassLoader#setPackageAssertionStatus

**See also:** java.lang.ClassLoader#setDefaultAssertionStatus

**Since:** 1.4

## Class.isEnum()

```java
public boolean isEnum()
```

Returns true if and only if this class was declared as an enum in the
source code.

Note that `java.lang.Enum` is not itself an enum class.

Also note that if an enum constant is declared with a class body,
the class of that enum constant object is an anonymous class
and *not* the class of the declaring enum class. The
`Enum.getDeclaringClass` method of an enum constant can
be used to get the class of the enum class declaring the
constant.

**Returns:** true if and only if this class was declared as an enum in the
    source code

**Since:** 1.5

**JLS:** 8.9.1 Enum Constants

## Class.isRecord()

```java
public boolean isRecord()
```

Returns `true` if and only if this class is a record class.

 The direct superclass of a record
class is `java.lang.Record`. A record class is final. A record class has (possibly zero) record
components; `getRecordComponents()` returns a non-null but
possibly empty value for a record.

 Note that class `Record` is not a record class and thus
invoking this method on class `Record` returns `false`.

**Returns:** true if and only if this class is a record class, otherwise false

**JLS:** 8.10 Record Classes

**Since:** 16

## Class.getEnumConstants()

```java
public T[] getEnumConstants()
```

Returns the elements of this enum class or null if this
Class object does not represent an enum class.

**Returns:** an array containing the values comprising the enum class
    represented by this `Class` object in the order they're
    declared, or null if this `Class` object does not
    represent an enum class

**Since:** 1.5

**JLS:** 8.9.1 Enum Constants

## Class.cast(Object)

```java
public T cast(Object obj)
```

Casts an object to the class or interface represented
by this `Class` object.

Parameters:

- `obj`: the object to be cast

**Returns:** the object after casting, or null if obj is null

**Since:** 1.5

Throws:

- `ClassCastException`: if the object is not null and is not assignable to the type T.

## Class.asSubclass(Class)

```java
public <U> Class<? extends U> asSubclass(Class<U> clazz)
```

Casts this `Class` object to represent a subclass of the class
represented by the specified class object.  Checks that the cast
is valid, and throws a `ClassCastException` if it is not.  If
this method succeeds, it always returns a reference to this `Class` object.

This method is useful when a client needs to "narrow" the type of
a `Class` object to pass it to an API that restricts the
`Class` objects that it is willing to accept.  A cast would
generate a compile-time warning, as the correctness of the cast
could not be checked at runtime (because generic types are implemented
by erasure).

Parameters:

- ``: the type to cast this `Class` object to
- `clazz`: the class of the type to cast this `Class` object to

**Returns:** this `Class` object, cast to represent a subclass of
   the specified class object.

**Since:** 1.5

Throws:

- `ClassCastException`: if this `Class` object does not represent a subclass of the specified class (here "subclass" includes the class itself).

## Class.getAnnotation(Class)

```java
public <A extends Annotation> A getAnnotation(Class<A> annotationClass)
```

(inherited documentation)

Note that any annotation returned by this method is a
declaration annotation.

**Since:** 1.5

Throws:

- `NullPointerException`: (inherited documentation)

## Class.isAnnotationPresent(Class<? extends Annotation>)

```java
public boolean isAnnotationPresent(Class<? extends Annotation> annotationClass)
```

(inherited documentation)

**Since:** 1.5

Throws:

- `NullPointerException`: (inherited documentation)

## Class.getAnnotationsByType(Class)

```java
public <A extends Annotation> A[] getAnnotationsByType(Class<A> annotationClass)
```

(inherited documentation)

Note that any annotations returned by this method are
declaration annotations.

**Since:** 1.8

Throws:

- `NullPointerException`: (inherited documentation)

## Class.getAnnotations()

```java
public Annotation[] getAnnotations()
```

(inherited documentation)

Note that any annotations returned by this method are
declaration annotations.

**Since:** 1.5

## Class.getDeclaredAnnotation(Class)

```java
public <A extends Annotation> A getDeclaredAnnotation(Class<A> annotationClass)
```

(inherited documentation)

Note that any annotation returned by this method is a
declaration annotation.

**Since:** 1.8

Throws:

- `NullPointerException`: (inherited documentation)

## Class.getDeclaredAnnotationsByType(Class)

```java
public <A extends Annotation> A[] getDeclaredAnnotationsByType(Class<A> annotationClass)
```

(inherited documentation)

Note that any annotations returned by this method are
declaration annotations.

**Since:** 1.8

Throws:

- `NullPointerException`: (inherited documentation)

## Class.getDeclaredAnnotations()

```java
public Annotation[] getDeclaredAnnotations()
```

(inherited documentation)

Note that any annotations returned by this method are
declaration annotations.

**Since:** 1.5

## Class.getAnnotatedSuperclass()

```java
public AnnotatedType getAnnotatedSuperclass()
```

Returns an `AnnotatedType` object that represents the use of a
type to specify the superclass of the entity represented by this `Class` object. (The *use* of type Foo to specify the superclass
in '...  extends Foo' is distinct from the *declaration* of class
Foo.)

 If this `Class` object represents a class whose declaration
does not explicitly indicate an annotated superclass, then the return
value is an `AnnotatedType` object representing an element with no
annotations.

 If this `Class` represents either the `Object` class, an
interface type, an array type, a primitive type, or void, the return
value is `null`.

**Returns:** an object representing the superclass

**Since:** 1.8

## Class.getAnnotatedInterfaces()

```java
public AnnotatedType[] getAnnotatedInterfaces()
```

Returns an array of `AnnotatedType` objects that represent the use
of types to specify superinterfaces of the entity represented by this
`Class` object. (The *use* of type Foo to specify a
superinterface in '... implements Foo' is distinct from the
*declaration* of interface Foo.)

 If this `Class` object represents a class, the return value is
an array containing objects representing the uses of interface types to
specify interfaces implemented by the class. The order of the objects in
the array corresponds to the order of the interface types used in the
'implements' clause of the declaration of this `Class` object.

 If this `Class` object represents an interface, the return
value is an array containing objects representing the uses of interface
types to specify interfaces directly extended by the interface. The
order of the objects in the array corresponds to the order of the
interface types used in the 'extends' clause of the declaration of this
`Class` object.

 If this `Class` object represents a class or interface whose
declaration does not explicitly indicate any annotated superinterfaces,
the return value is an array of length 0.

 If this `Class` object represents either the `Object`
class, an array type, a primitive type, or void, the return value is an
array of length 0.

**Returns:** an array representing the superinterfaces

**Since:** 1.8

## Class.getNestHost()

```java
public Class<?> getNestHost()
```

Returns the nest host of the nest to which the class
or interface represented by this `Class` object belongs.
Every class and interface belongs to exactly one nest.

If the nest host of this class or interface has previously
been determined, then this method returns the nest host.
If the nest host of this class or interface has
not previously been determined, then this method determines the nest
host using the algorithm of JVMS 5.4.4, and returns it.

Often, a class or interface belongs to a nest consisting only of itself,
in which case this method returns `this` to indicate that the class
or interface is the nest host.

If this `Class` object represents a primitive type, an array type,
or `void`, then this method returns `this`,
indicating that the represented entity belongs to the nest consisting only of
itself, and is the nest host.

**Returns:** the nest host of this class or interface

**Since:** 11

**jvms:** 4.7.28 The `NestHost` Attribute

**jvms:** 4.7.29 The `NestMembers` Attribute

**jvms:** 5.4.4 Access Control
