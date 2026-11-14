---
title: "AccessibleObject class (java.lang.reflect)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/reflect/AccessibleObject.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AccessibleObject class (java.lang.reflect)

```java
public class AccessibleObject implements AnnotatedElement
```

The `AccessibleObject` class is the base class for `Field`,
`Method`, and `Constructor` objects (known as *reflected
objects*). It provides the ability to flag a reflected object as
suppressing checks for Java language access control when it is used. This
permits sophisticated applications with sufficient privilege, such as Java
Object Serialization or other persistence mechanisms, to manipulate objects
in a manner that would normally be prohibited.

 Java language access control prevents use of private members outside
their top-level class; package access members outside their package; protected members
outside their package or subclasses; and public members outside their
module unless they are declared in an exported package and the user reads their module. By
default, Java language access control is enforced (with one variation) when
`Field`s, `Method`s, or `Constructor`s are used to get or
set fields, to invoke methods, or to create and initialize new instances of
classes, respectively. Every reflected object checks that the code using it
is in an appropriate class, package, or module. The check when invoked by
JNI code with no Java
class on the stack only succeeds if the member and the declaring class are
public, and the class is in a package that is exported to all modules.

 The one variation from Java language access control is that the checks
by reflected objects assume readability. That is, the module containing
the use of a reflected object is assumed to read the module in which
the underlying field, method, or constructor is declared.

 Whether the checks for Java language access control can be suppressed
(and thus, whether access can be enabled) depends on whether the reflected
object corresponds to a member in an exported or open package
(see `setAccessible(boolean)`).

**JLS:** 6.6 Access Control

**Since:** 1.2

## AccessibleObject.setAccessible(AccessibleObject[], boolean)

```java
public static void setAccessible(AccessibleObject[] array, boolean flag)
```

Convenience method to set the `accessible` flag for an
array of reflected objects.

 This method may be used to enable access to all reflected objects in
the array when access to each reflected object can be enabled as
specified by setAccessible(boolean).

A `SecurityException` is thrown if any of the elements of
the input `array` is a `java.lang.reflect.Constructor`
object for the class `java.lang.Class` and `flag` is true.

Parameters:

- `array`: the array of AccessibleObjects
- `flag`: the new value for the `accessible` flag in each object

Throws:

- `InaccessibleObjectException`: if access cannot be enabled for all objects in the array
- `SecurityException`: if an element in the array is a constructor for `java.lang.Class`

## AccessibleObject.setAccessible(boolean)

```java
public void setAccessible(boolean flag)
```

Set the `accessible` flag for this reflected object to
the indicated boolean value.  A value of `true` indicates that
the reflected object should suppress checks for Java language access
control when it is used. A value of `false` indicates that
the reflected object should enforce checks for Java language access
control when it is used, with the variation noted in the class description.

 This method may be used by a caller in class `C` to enable
access to a member of declaring class `D` if any of the following hold:

-  `C` and `D` are in the same module.

-  The member is `public` and `D` is `public` in
    a package that the module containing `D` exports to at least the module
    containing `C`.

-  The member is `protected` `static`, `D` is
    `public` in a package that the module containing `D`
    exports to at least the module containing `C`, and `C`
    is a subclass of `D`.

-  `D` is in a package that the module containing `D`
    opens to at least the module
    containing `C`.
    All packages in unnamed and open modules are open to all modules and
    so this method always succeeds when `D` is in an unnamed or
    open module.

 This method may be used by JNI code
with no caller class on the stack to enable access to a member
of declaring class `D` if and only if:

-  The member is `public` and `D` is `public` in
    a package that the module containing `D` exports unconditionally.

 This method cannot be used to enable access to private members,
members with default (package) access, protected instance members, or
protected constructors when the declaring class is in a different module
to the caller and the package containing the declaring class is not open
to the caller's module.

 This method cannot be used to enable *write*
access to a *non-modifiable* final field.  The following fields
are non-modifiable:

- static final fields declared in any class or interface

- final fields declared in a hidden class

- final fields declared in a record

 The `accessible` flag when `true` suppresses Java language access
control checks to only enable *read* access to
these non-modifiable final fields.

Parameters:

- `flag`: the new value for the `accessible` flag

**See also:** #trySetAccessible

**See also:** java.lang.invoke.MethodHandles#privateLookupIn

Throws:

- `InaccessibleObjectException`: if access cannot be enabled

## AccessibleObject.trySetAccessible()

```java
public final boolean trySetAccessible()
```

Set the `accessible` flag for this reflected object to `true`
if possible. This method sets the `accessible` flag, as if by
invoking setAccessible(true), and returns
the possibly-updated value for the `accessible` flag. If access
cannot be enabled, i.e. the checks or Java language access control cannot
be suppressed, this method returns `false` (as opposed to `setAccessible(true)` throwing `InaccessibleObjectException` when
it fails).

 This method is a no-op if the `accessible` flag for
this reflected object is `true`.

 For example, a caller can invoke `trySetAccessible`
on a `Method` object for a private instance method
`p.T::privateMethod` to suppress the checks for Java language access
control when the `Method` is invoked.
If `p.T` class is in a different module to the caller and
package `p` is open to at least the caller's module,
the code below successfully sets the `accessible` flag
to `true`.

```java
    p.T obj = ....;  // instance of p.T
    :
    Method m = p.T.class.getDeclaredMethod("privateMethod");
    if (m.trySetAccessible()) {
        m.invoke(obj);
    } else {
        // package p is not opened to the caller to access private member of T
        ...
    }
```

 If this method is invoked by JNI code
with no caller class on the stack, the `accessible` flag can
only be set if the member and the declaring class are public, and
the class is in a package that is exported unconditionally.

**Returns:** `true` if the `accessible` flag is set to `true`;
        `false` if access cannot be enabled.

**Since:** 9

**See also:** java.lang.invoke.MethodHandles#privateLookupIn

## AccessibleObject.isAccessible()

```java
public boolean isAccessible()
```

Get the value of the `accessible` flag for this reflected object.

**Returns:** the value of the object's `accessible` flag

**Deprecated:** This method is deprecated because its name hints that it checks
if the reflected object is accessible when it actually indicates
if the checks for Java language access control are suppressed.
This method may return `false` on a reflected object that is
accessible to the caller. To test if this reflected object is accessible,
it should use `canAccess(Object)`.

## AccessibleObject.canAccess(Object)

```java
public final boolean canAccess(Object obj)
```

Test if the caller can access this reflected object. If this reflected
object corresponds to an instance method or field then this method tests
if the caller can access the given `obj` with the reflected object.
For instance methods or fields then the `obj` argument must be an
instance of the declaring class. For
static members and constructors then `obj` must be `null`.

 This method returns `true` if the `accessible` flag
is set to `true`, i.e. the checks for Java language access control
are suppressed, or if the caller can access the member as
specified in *The Java Language Specification*,
with the variation noted in the class description.
If this method is invoked by JNI code
with no caller class on the stack, this method returns `true`
if the member and the declaring class are public, and the class is in
a package that is exported unconditionally.

Parameters:

- `obj`: an instance object of the declaring class of this reflected object if it is an instance method or field

**Returns:** `true` if the caller can access this reflected object.

**Since:** 9

**JLS:** 6.6 Access Control

**See also:** #trySetAccessible

**See also:** #setAccessible(boolean)

Throws:

- `IllegalArgumentException`: -  if this reflected object is a static member or constructor and the given `obj` is non-`null`, or
-  if this reflected object is an instance method or field and the given `obj` is `null` or of type that is not a subclass of the declaring class of the member.

## AccessibleObject.AccessibleObject()

```java
protected AccessibleObject()
```

Constructor: only used by the Java Virtual Machine.

## AccessibleObject.getAnnotation(Class<T>)

```java
public <T extends Annotation> T getAnnotation(Class<T> annotationClass)
```

(inherited documentation)

 Note that any annotation returned by this method is a
declaration annotation.

**Implementation requirements:** The default implementation throws `UnsupportedOperationException`; subclasses should override this method.

**Since:** 1.5

Throws:

- `NullPointerException`: (inherited documentation)

## AccessibleObject.isAnnotationPresent(Class<? extends Annotation>)

```java
public boolean isAnnotationPresent(Class<? extends Annotation> annotationClass)
```

(inherited documentation)

**Since:** 1.5

Throws:

- `NullPointerException`: (inherited documentation)

## AccessibleObject.getAnnotationsByType(Class<T>)

```java
public <T extends Annotation> T[] getAnnotationsByType(Class<T> annotationClass)
```

(inherited documentation)

 Note that any annotations returned by this method are
declaration annotations.

**Implementation requirements:** The default implementation throws `UnsupportedOperationException`; subclasses should override this method.

**Since:** 1.8

Throws:

- `NullPointerException`: (inherited documentation)

## AccessibleObject.getAnnotations()

```java
public Annotation[] getAnnotations()
```

(inherited documentation)

 Note that any annotations returned by this method are
declaration annotations.

**Since:** 1.5

## AccessibleObject.getDeclaredAnnotation(Class<T>)

```java
public <T extends Annotation> T getDeclaredAnnotation(Class<T> annotationClass)
```

(inherited documentation)

 Note that any annotation returned by this method is a
declaration annotation.

**Since:** 1.8

Throws:

- `NullPointerException`: (inherited documentation)

## AccessibleObject.getDeclaredAnnotationsByType(Class<T>)

```java
public <T extends Annotation> T[] getDeclaredAnnotationsByType(Class<T> annotationClass)
```

(inherited documentation)

 Note that any annotations returned by this method are
declaration annotations.

**Since:** 1.8

Throws:

- `NullPointerException`: (inherited documentation)

## AccessibleObject.getDeclaredAnnotations()

```java
public Annotation[] getDeclaredAnnotations()
```

(inherited documentation)

 Note that any annotations returned by this method are
declaration annotations.

**Implementation requirements:** The default implementation throws `UnsupportedOperationException`; subclasses should override this method.

**Since:** 1.5
