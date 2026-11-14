# MethodHandles class (java.lang.invoke)

```java
public final class MethodHandles
```

This class consists exclusively of static methods that operate on or return
method handles. They fall into several categories:
<ul>
<li>Lookup methods which help create method handles for methods and fields.
<li>Combinator methods, which combine or transform pre-existing method handles into new ones.
<li>Other factory methods to create method handles that emulate other common JVM operations or control flow patterns.
</ul>
A lookup, combinator, or factory method will fail and throw an
{@code IllegalArgumentException} if the created method handle's type
would have <a href="MethodHandle.html#maxarity">too many parameters</a>.

@author John Rose, JSR 292 EG
@since 1.7

## MethodHandles.lookup()

```java
public static Lookup lookup()
```

Returns a {@link Lookup lookup object} with
full capabilities to emulate all supported bytecode behaviors of the caller.
These capabilities include {@linkplain Lookup#hasFullPrivilegeAccess() full privilege access} to the caller.
Factory methods on the lookup object can create
<a href="MethodHandleInfo.html#directmh">direct method handles</a>
for any member that the caller has access to via bytecodes,
including protected and private fields and methods.
This lookup object is created by the original lookup class
and has the {@link Lookup#ORIGINAL ORIGINAL} bit set.
This lookup object is a <em>capability</em> which may be delegated to trusted agents.
Do not store it in place where untrusted code can access it.
<p>
This method is caller sensitive, which means that it may return different
values to different callers.
In cases where {@code MethodHandles.lookup} is called from a context where
there is no caller frame on the stack (e.g. when called directly
from a JNI attached thread), {@code IllegalCallerException} is thrown.
To obtain a {@link Lookup lookup object} in such a context, use an auxiliary class that will
implicitly be identified as the caller, or use {@link MethodHandles#publicLookup()}
to obtain a low-privileged lookup instead.
@return a lookup object for the caller of this method, with
{@linkplain Lookup#ORIGINAL original} and
{@linkplain Lookup#hasFullPrivilegeAccess() full privilege access}.
@throws IllegalCallerException if there is no caller frame on the stack.

## MethodHandles.publicLookup()

```java
public static Lookup publicLookup()
```

Returns a {@link Lookup lookup object} which is trusted minimally.
The lookup has the {@code UNCONDITIONAL} mode.
It can only be used to create method handles to public members of
public classes in packages that are exported unconditionally.
<p>
As a matter of pure convention, the {@linkplain Lookup#lookupClass() lookup class}
of this lookup object will be {@link java.lang.Object}.

@apiNote The use of Object is conventional, and because the lookup modes are
limited, there is no special access provided to the internals of Object, its package
or its module.  This public lookup object or other lookup object with
{@code UNCONDITIONAL} mode assumes readability. Consequently, the lookup class
is not used to determine the lookup context.

<p style="font-size:smaller;">
<em>Discussion:</em>
The lookup class can be changed to any other class {@code C} using an expression of the form
{@link Lookup#in publicLookup().in(C.class)}.
Also, it cannot access
<a href="MethodHandles.Lookup.html#callsens">caller sensitive methods</a>.
@return a lookup object which is trusted minimally

## MethodHandles.privateLookupIn(Class<?>, Lookup)

```java
public static Lookup privateLookupIn(Class<?> targetClass, Lookup caller) throws IllegalAccessException
```

Returns a {@link Lookup lookup} object on a target class to emulate all supported
bytecode behaviors, including <a href="MethodHandles.Lookup.html#privacc">private access</a>.
The returned lookup object can provide access to classes in modules and packages,
and members of those classes, outside the normal rules of Java access control,
instead conforming to the more permissive rules for modular <em>deep reflection</em>.
<p>
A caller, specified as a {@code Lookup} object, in module {@code M1} is
allowed to do deep reflection on module {@code M2} and package of the target class
if and only if all of the following conditions are {@code true}:
<ul>
<li>The caller lookup object must have {@linkplain Lookup#hasFullPrivilegeAccess()
full privilege access}.  Specifically:
  <ul>
    <li>The caller lookup object must have the {@link Lookup#MODULE MODULE} lookup mode.
        (This is because otherwise there would be no way to ensure the original lookup
        creator was a member of any particular module, and so any subsequent checks
        for readability and qualified exports would become ineffective.)
    <li>The caller lookup object must have {@link Lookup#PRIVATE PRIVATE} access.
        (This is because an application intending to share intra-module access
        using {@link Lookup#MODULE MODULE} alone will inadvertently also share
        deep reflection to its own module.)
  </ul>
<li>The target class must be a proper class, not a primitive or array class.
(Thus, {@code M2} is well-defined.)
<li>If the caller module {@code M1} differs from
the target module {@code M2} then both of the following must be true:
  <ul>
    <li>{@code M1} {@link Module#canRead reads} {@code M2}.</li>
    <li>{@code M2} {@link Module#isOpen(String,Module) opens} the package
        containing the target class to at least {@code M1}.</li>
  </ul>
</ul>
<p>
If any of the above checks is violated, this method fails with an
exception.
<p>
Otherwise, if {@code M1} and {@code M2} are the same module, this method
returns a {@code Lookup} on {@code targetClass} with
{@linkplain Lookup#hasFullPrivilegeAccess() full privilege access}
with {@code null} previous lookup class.
<p>
Otherwise, {@code M1} and {@code M2} are two different modules.  This method
returns a {@code Lookup} on {@code targetClass} that records
the lookup class of the caller as the new previous lookup class with
{@code PRIVATE} access but no {@code MODULE} access.
<p>
The resulting {@code Lookup} object has no {@code ORIGINAL} access.

@apiNote The {@code Lookup} object returned by this method is allowed to
{@linkplain Lookup#defineClass(byte[]) define classes} in the runtime package
of {@code targetClass}. Extreme caution should be taken when opening a package
to another module as such defined classes have the same full privilege
access as other members in {@code targetClass}'s module.

@param targetClass the target class
@param caller the caller lookup object
@return a lookup object for the target class, with private access
@throws IllegalArgumentException if {@code targetClass} is a primitive type or void or array class
@throws NullPointerException if {@code targetClass} or {@code caller} is {@code null}
@throws IllegalAccessException if any of the other access checks specified above fails
@since 9
@see Lookup#dropLookupMode
@see <a href="MethodHandles.Lookup.html#cross-module-lookup">Cross-module lookups</a>

## MethodHandles.classData(Lookup, String, Class<T>)

```java
public static <T> T classData(Lookup caller, String name, Class<T> type) throws IllegalAccessException
```

Returns the <em>class data</em> associated with the lookup class
of the given {@code caller} lookup object, or {@code null}.

<p> A hidden class with class data can be created by calling
{@link Lookup#defineHiddenClassWithClassData(byte[], Object, boolean, Lookup.ClassOption...)
Lookup::defineHiddenClassWithClassData}.
This method will cause the static class initializer of the lookup
class of the given {@code caller} lookup object be executed if
it has not been initialized.

<p> A hidden class created by {@link Lookup#defineHiddenClass(byte[], boolean, Lookup.ClassOption...)
Lookup::defineHiddenClass} and non-hidden classes have no class data.
{@code null} is returned if this method is called on the lookup object
on these classes.

<p> The {@linkplain Lookup#lookupModes() lookup modes} for this lookup
must have {@linkplain Lookup#ORIGINAL original access}
in order to retrieve the class data.

@apiNote
This method can be called as a bootstrap method for a dynamically computed
constant.  A framework can create a hidden class with class data, for
example that can be {@code Class} or {@code MethodHandle} object.
The class data is accessible only to the lookup object
created by the original caller but inaccessible to other members
in the same nest.  If a framework passes security sensitive objects
to a hidden class via class data, it is recommended to load the value
of class data as a dynamically computed constant instead of storing
the class data in private static field(s) which are accessible to
other nestmates.

@param <T> the type to cast the class data object to
@param caller the lookup context describing the class performing the
operation (normally stacked by the JVM)
@param name must be {@link ConstantDescs#DEFAULT_NAME}
            ({@code "_"})
@param type the type of the class data
@return the value of the class data if present in the lookup class;
otherwise {@code null}
@throws IllegalArgumentException if name is not {@code "_"}
@throws IllegalAccessException if the lookup context does not have
{@linkplain Lookup#ORIGINAL original} access
@throws ClassCastException if the class data cannot be converted to
the given {@code type}
@throws NullPointerException if {@code caller} or {@code type} argument
is {@code null}
@see Lookup#defineHiddenClassWithClassData(byte[], Object, boolean, Lookup.ClassOption...)
@see MethodHandles#classDataAt(Lookup, String, Class, int)
@since 16
@jvms 5.5 Initialization

## MethodHandles.classDataAt(Lookup, String, Class<T>, int)

```java
public static <T> T classDataAt(Lookup caller, String name, Class<T> type, int index) throws IllegalAccessException
```

Returns the element at the specified index in the
{@linkplain #classData(Lookup, String, Class) class data},
if the class data associated with the lookup class
of the given {@code caller} lookup object is a {@code List}.
If the class data is not present in this lookup class, this method
returns {@code null}.

<p> A hidden class with class data can be created by calling
{@link Lookup#defineHiddenClassWithClassData(byte[], Object, boolean, Lookup.ClassOption...)
Lookup::defineHiddenClassWithClassData}.
This method will cause the static class initializer of the lookup
class of the given {@code caller} lookup object be executed if
it has not been initialized.

<p> A hidden class created by {@link Lookup#defineHiddenClass(byte[], boolean, Lookup.ClassOption...)
Lookup::defineHiddenClass} and non-hidden classes have no class data.
{@code null} is returned if this method is called on the lookup object
on these classes.

<p> The {@linkplain Lookup#lookupModes() lookup modes} for this lookup
must have {@linkplain Lookup#ORIGINAL original access}
in order to retrieve the class data.

@apiNote
This method can be called as a bootstrap method for a dynamically computed
constant.  A framework can create a hidden class with class data, for
example that can be {@code List.of(o1, o2, o3....)} containing more than
one object and use this method to load one element at a specific index.
The class data is accessible only to the lookup object
created by the original caller but inaccessible to other members
in the same nest.  If a framework passes security sensitive objects
to a hidden class via class data, it is recommended to load the value
of class data as a dynamically computed constant instead of storing
the class data in private static field(s) which are accessible to other
nestmates.

@param <T> the type to cast the result object to
@param caller the lookup context describing the class performing the
operation (normally stacked by the JVM)
@param name must be {@link java.lang.constant.ConstantDescs#DEFAULT_NAME}
            ({@code "_"})
@param type the type of the element at the given index in the class data
@param index index of the element in the class data
@return the element at the given index in the class data
if the class data is present; otherwise {@code null}
@throws IllegalArgumentException if name is not {@code "_"}
@throws IllegalAccessException if the lookup context does not have
{@linkplain Lookup#ORIGINAL original} access
@throws ClassCastException if the class data cannot be converted to {@code List}
or the element at the specified index cannot be converted to the given type
@throws IndexOutOfBoundsException if the index is out of range
@throws NullPointerException if {@code caller} or {@code type} argument is
{@code null}; or if unboxing operation fails because
the element at the given index is {@code null}

@since 16
@see #classData(Lookup, String, Class)
@see Lookup#defineHiddenClassWithClassData(byte[], Object, boolean, Lookup.ClassOption...)

## MethodHandles.reflectAs(Class<T>, MethodHandle)

```java
public static <T extends Member> T reflectAs(Class<T> expected, MethodHandle target)
```

Performs an unchecked "crack" of a
<a href="MethodHandleInfo.html#directmh">direct method handle</a>.
The result is as if the user had obtained a lookup object capable enough
to crack the target method handle, called
{@link java.lang.invoke.MethodHandles.Lookup#revealDirect Lookup.revealDirect}
on the target to obtain its symbolic reference, and then called
{@link java.lang.invoke.MethodHandleInfo#reflectAs MethodHandleInfo.reflectAs}
to resolve the symbolic reference to a member.
@param <T> the desired type of the result, either {@link Member} or a subtype
@param expected a class object representing the desired result type {@code T}
@param target a direct method handle to crack into symbolic reference components
@return a reference to the method, constructor, or field object
@throws    NullPointerException if either argument is {@code null}
@throws    IllegalArgumentException if the target is not a direct method handle
@throws    ClassCastException if the member is not of the expected type
@since 1.8

## MethodHandles.PUBLIC

```java
public static final int PUBLIC
```

A single-bit mask representing {@code public} access,
 which may contribute to the result of {@link #lookupModes lookupModes}.
 The value, {@code 0x01}, happens to be the same as the value of the
 {@code public} {@linkplain java.lang.reflect.Modifier#PUBLIC modifier bit}.
 <p>
 A {@code Lookup} with this lookup mode performs cross-module access check
 with respect to the {@linkplain #lookupClass() lookup class} and
 {@linkplain #previousLookupClass() previous lookup class} if present.

## MethodHandles.PRIVATE

```java
public static final int PRIVATE
```

A single-bit mask representing {@code private} access,
 which may contribute to the result of {@link #lookupModes lookupModes}.
 The value, {@code 0x02}, happens to be the same as the value of the
 {@code private} {@linkplain java.lang.reflect.Modifier#PRIVATE modifier bit}.

## MethodHandles.PROTECTED

```java
public static final int PROTECTED
```

A single-bit mask representing {@code protected} access,
 which may contribute to the result of {@link #lookupModes lookupModes}.
 The value, {@code 0x04}, happens to be the same as the value of the
 {@code protected} {@linkplain java.lang.reflect.Modifier#PROTECTED modifier bit}.

## MethodHandles.PACKAGE

```java
public static final int PACKAGE
```

A single-bit mask representing {@code package} access (default access),
 which may contribute to the result of {@link #lookupModes lookupModes}.
 The value is {@code 0x08}, which does not correspond meaningfully to
 any particular {@linkplain java.lang.reflect.Modifier modifier bit}.

## MethodHandles.MODULE

```java
public static final int MODULE
```

A single-bit mask representing {@code module} access,
 which may contribute to the result of {@link #lookupModes lookupModes}.
 The value is {@code 0x10}, which does not correspond meaningfully to
 any particular {@linkplain java.lang.reflect.Modifier modifier bit}.
 In conjunction with the {@code PUBLIC} modifier bit, a {@code Lookup}
 with this lookup mode can access all public types in the module of the
 lookup class and public types in packages exported by other modules
 to the module of the lookup class.
 <p>
 If this lookup mode is set, the {@linkplain #previousLookupClass()
 previous lookup class} is always {@code null}.

 @since 9

## MethodHandles.UNCONDITIONAL

```java
public static final int UNCONDITIONAL
```

A single-bit mask representing {@code unconditional} access
 which may contribute to the result of {@link #lookupModes lookupModes}.
 The value is {@code 0x20}, which does not correspond meaningfully to
 any particular {@linkplain java.lang.reflect.Modifier modifier bit}.
 A {@code Lookup} with this lookup mode assumes {@linkplain
 java.lang.Module#canRead(java.lang.Module) readability}.
 This lookup mode can access all public members of public types
 of all modules when the type is in a package that is {@link
 java.lang.Module#isExported(String) exported unconditionally}.

 <p>
 If this lookup mode is set, the {@linkplain #previousLookupClass()
 previous lookup class} is always {@code null}.

 @since 9
 @see #publicLookup()

## MethodHandles.ORIGINAL

```java
public static final int ORIGINAL
```

A single-bit mask representing {@code original} access
 which may contribute to the result of {@link #lookupModes lookupModes}.
 The value is {@code 0x40}, which does not correspond meaningfully to
 any particular {@linkplain java.lang.reflect.Modifier modifier bit}.

 <p>
 If this lookup mode is set, the {@code Lookup} object must be
 created by the original lookup class by calling
 {@link MethodHandles#lookup()} method or by a bootstrap method
 invoked by the VM.  The {@code Lookup} object with this lookup
 mode has {@linkplain #hasFullPrivilegeAccess() full privilege access}.

 @since 16

## MethodHandles.lookupClass()

```java
public Class<?> lookupClass()
```

Tells which class is performing the lookup.  It is this class against
 which checks are performed for visibility and access permissions.
 <p>
 If this lookup object has a {@linkplain #previousLookupClass() previous lookup class},
 access checks are performed against both the lookup class and the previous lookup class.
 <p>
 The class implies a maximum level of access permission,
 but the permissions may be additionally limited by the bitmask
 {@link #lookupModes lookupModes}, which controls whether non-public members
 can be accessed.
 @return the lookup class, on behalf of which this lookup object finds members
 @see <a href="#cross-module-lookup">Cross-module lookups</a>

## MethodHandles.previousLookupClass()

```java
public Class<?> previousLookupClass()
```

Reports a lookup class in another module that this lookup object
was previously teleported from, or {@code null}.
<p>
A {@code Lookup} object produced by the factory methods, such as the
{@link #lookup() lookup()} and {@link #publicLookup() publicLookup()} method,
has {@code null} previous lookup class.
A {@code Lookup} object has a non-null previous lookup class
when this lookup was teleported from an old lookup class
in one module to a new lookup class in another module.

@return the lookup class in another module that this lookup object was
        previously teleported from, or {@code null}
@since 14
@see #in(Class)
@see MethodHandles#privateLookupIn(Class, Lookup)
@see <a href="#cross-module-lookup">Cross-module lookups</a>

## MethodHandles.lookupModes()

```java
public int lookupModes()
```

Tells which access-protection classes of members this lookup object can produce.
 The result is a bit-mask of the bits
 {@linkplain #PUBLIC PUBLIC (0x01)},
 {@linkplain #PRIVATE PRIVATE (0x02)},
 {@linkplain #PROTECTED PROTECTED (0x04)},
 {@linkplain #PACKAGE PACKAGE (0x08)},
 {@linkplain #MODULE MODULE (0x10)},
 {@linkplain #UNCONDITIONAL UNCONDITIONAL (0x20)},
 and {@linkplain #ORIGINAL ORIGINAL (0x40)}.
 <p>
 A freshly-created lookup object
 on the {@linkplain java.lang.invoke.MethodHandles#lookup() caller's class} has
 all possible bits set, except {@code UNCONDITIONAL}.
 A lookup object on a new lookup class
 {@linkplain java.lang.invoke.MethodHandles.Lookup#in created from a previous lookup object}
 may have some mode bits set to zero.
 Mode bits can also be
 {@linkplain java.lang.invoke.MethodHandles.Lookup#dropLookupMode directly cleared}.
 Once cleared, mode bits cannot be restored from the downgraded lookup object.
 The purpose of this is to restrict access via the new lookup object,
 so that it can access only names which can be reached by the original
 lookup object, and also by the new lookup class.
 @return the lookup modes, which limit the kinds of access performed by this lookup object
 @see #in
 @see #dropLookupMode

## MethodHandles.in(Class<?>)

```java
public Lookup in(Class<?> requestedLookupClass)
```

Creates a lookup on the specified new lookup class.
The resulting object will report the specified
class as its own {@link #lookupClass() lookupClass}.

<p>
However, the resulting {@code Lookup} object is guaranteed
to have no more access capabilities than the original.
In particular, access capabilities can be lost as follows:<ul>
<li>If the new lookup class is different from the old lookup class,
i.e. {@link #ORIGINAL ORIGINAL} access is lost.
<li>If the new lookup class is in a different module from the old one,
i.e. {@link #MODULE MODULE} access is lost.
<li>If the new lookup class is in a different package
than the old one, protected and default (package) members will not be accessible,
i.e. {@link #PROTECTED PROTECTED} and {@link #PACKAGE PACKAGE} access are lost.
<li>If the new lookup class is not within the same package member
as the old one, private members will not be accessible, and protected members
will not be accessible by virtue of inheritance,
i.e. {@link #PRIVATE PRIVATE} access is lost.
(Protected members may continue to be accessible because of package sharing.)
<li>If the new lookup class is not
{@linkplain #accessClass(Class) accessible} to this lookup,
then no members, not even public members, will be accessible
i.e. all access modes are lost.
<li>If the new lookup class, the old lookup class and the previous lookup class
are all in different modules i.e. teleporting to a third module,
all access modes are lost.
</ul>
<p>
The new previous lookup class is chosen as follows:
<ul>
<li>If the new lookup object has {@link #UNCONDITIONAL UNCONDITIONAL} bit,
the new previous lookup class is {@code null}.
<li>If the new lookup class is in the same module as the old lookup class,
the new previous lookup class is the old previous lookup class.
<li>If the new lookup class is in a different module from the old lookup class,
the new previous lookup class is the old lookup class.
</ul>
<p>
The resulting lookup's capabilities for loading classes
(used during {@link #findClass} invocations)
are determined by the lookup class' loader,
which may change due to this operation.

@param requestedLookupClass the desired lookup class for the new lookup object
@return a lookup object which reports the desired lookup class, or the same object
if there is no change
@throws IllegalArgumentException if {@code requestedLookupClass} is a primitive type or void or array class
@throws NullPointerException if the argument is null

@see #accessClass(Class)
@see <a href="#cross-module-lookup">Cross-module lookups</a>

## MethodHandles.dropLookupMode(int)

```java
public Lookup dropLookupMode(int modeToDrop)
```

Creates a lookup on the same lookup class which this lookup object
finds members, but with a lookup mode that has lost the given lookup mode.
The lookup mode to drop is one of {@link #PUBLIC PUBLIC}, {@link #MODULE
MODULE}, {@link #PACKAGE PACKAGE}, {@link #PROTECTED PROTECTED},
{@link #PRIVATE PRIVATE}, {@link #ORIGINAL ORIGINAL}, or
{@link #UNCONDITIONAL UNCONDITIONAL}.

<p> If this lookup is a {@linkplain MethodHandles#publicLookup() public lookup},
this lookup has {@code UNCONDITIONAL} mode set and it has no other mode set.
When dropping {@code UNCONDITIONAL} on a public lookup then the resulting
lookup has no access.

<p> If this lookup is not a public lookup, then the following applies
regardless of its {@linkplain #lookupModes() lookup modes}.
{@link #PROTECTED PROTECTED} and {@link #ORIGINAL ORIGINAL} are always
dropped and so the resulting lookup mode will never have these access
capabilities. When dropping {@code PACKAGE}
then the resulting lookup will not have {@code PACKAGE} or {@code PRIVATE}
access. When dropping {@code MODULE} then the resulting lookup will not
have {@code MODULE}, {@code PACKAGE}, or {@code PRIVATE} access.
When dropping {@code PUBLIC} then the resulting lookup has no access.

@apiNote
A lookup with {@code PACKAGE} but not {@code PRIVATE} mode can safely
delegate non-public access within the package of the lookup class without
conferring  <a href="MethodHandles.Lookup.html#privacc">private access</a>.
A lookup with {@code MODULE} but not
{@code PACKAGE} mode can safely delegate {@code PUBLIC} access within
the module of the lookup class without conferring package access.
A lookup with a {@linkplain #previousLookupClass() previous lookup class}
(and {@code PUBLIC} but not {@code MODULE} mode) can safely delegate access
to public classes accessible to both the module of the lookup class
and the module of the previous lookup class.

@param modeToDrop the lookup mode to drop
@return a lookup object which lacks the indicated mode, or the same object if there is no change
@throws IllegalArgumentException if {@code modeToDrop} is not one of {@code PUBLIC},
{@code MODULE}, {@code PACKAGE}, {@code PROTECTED}, {@code PRIVATE}, {@code ORIGINAL}
or {@code UNCONDITIONAL}
@see MethodHandles#privateLookupIn
@since 9

## MethodHandles.defineClass(byte[])

```java
public Class<?> defineClass(byte[] bytes) throws IllegalAccessException
```

Creates and links a class or interface from {@code bytes}
with the same class loader and in the same runtime package and
{@linkplain java.security.ProtectionDomain protection domain} as this lookup's
{@linkplain #lookupClass() lookup class} as if calling
{@link ClassLoader#defineClass(String,byte[],int,int,ProtectionDomain)
ClassLoader::defineClass}.

<p> The {@linkplain #lookupModes() lookup modes} for this lookup must include
{@link #PACKAGE PACKAGE} access as default (package) members will be
accessible to the class. The {@code PACKAGE} lookup mode serves to authenticate
that the lookup object was created by a caller in the runtime package (or derived
from a lookup originally created by suitably privileged code to a target class in
the runtime package). </p>

<p> The {@code bytes} parameter is the class bytes of a valid class file (as defined
by the <em>The Java Virtual Machine Specification</em>) with a class name in the
same package as the lookup class. </p>

<p> This method does not run the class initializer. The class initializer may
run at a later time, as detailed in section 12.4 of the <em>The Java Language
Specification</em>. </p>

@param bytes the class bytes
@return the {@code Class} object for the class
@throws IllegalAccessException if this lookup does not have {@code PACKAGE} access
@throws ClassFormatError if {@code bytes} is not a {@code ClassFile} structure
@throws IllegalArgumentException if {@code bytes} denotes a class in a different package
than the lookup class or {@code bytes} is not a class or interface
({@code ACC_MODULE} flag is set in the value of the {@code access_flags} item)
@throws VerifyError if the newly created class cannot be verified
@throws LinkageError if the newly created class cannot be linked for any other reason
@throws NullPointerException if {@code bytes} is {@code null}
@since 9
@see MethodHandles#privateLookupIn
@see Lookup#dropLookupMode
@see ClassLoader#defineClass(String,byte[],int,int,ProtectionDomain)

## MethodHandles.defineHiddenClass(byte[], boolean, ClassOption...)

```java
public Lookup defineHiddenClass(byte[] bytes, boolean initialize, ClassOption... options) throws IllegalAccessException
```

Creates a <em>hidden</em> class or interface from {@code bytes},
returning a {@code Lookup} on the newly created class or interface.

<p> Ordinarily, a class or interface {@code C} is created by a class loader,
which either defines {@code C} directly or delegates to another class loader.
A class loader defines {@code C} directly by invoking
{@link ClassLoader#defineClass(String, byte[], int, int, ProtectionDomain)
ClassLoader::defineClass}, which causes the Java Virtual Machine
to derive {@code C} from a purported representation in {@code class} file format.
In situations where use of a class loader is undesirable, a class or interface
{@code C} can be created by this method instead. This method is capable of
defining {@code C}, and thereby creating it, without invoking
{@code ClassLoader::defineClass}.
Instead, this method defines {@code C} as if by arranging for
the Java Virtual Machine to derive a nonarray class or interface {@code C}
from a purported representation in {@code class} file format
using the following rules:

<ol>
<li> The {@linkplain #lookupModes() lookup modes} for this {@code Lookup}
must include {@linkplain #hasFullPrivilegeAccess() full privilege} access.
This level of access is needed to create {@code C} in the module
of the lookup class of this {@code Lookup}.</li>

<li> The purported representation in {@code bytes} must be a {@code ClassFile}
structure (JVMS {@jvms 4.1}) of a supported major and minor version.
The major and minor version may differ from the {@code class} file version
of the lookup class of this {@code Lookup}.</li>

<li> The value of {@code this_class} must be a valid index in the
{@code constant_pool} table, and the entry at that index must be a valid
{@code CONSTANT_Class_info} structure. Let {@code N} be the binary name
encoded in internal form that is specified by this structure. {@code N} must
denote a class or interface in the same package as the lookup class.</li>

<li> Let {@code CN} be the string {@code N + "." + <suffix>},
where {@code <suffix>} is an unqualified name.

<p> Let {@code newBytes} be the {@code ClassFile} structure given by
{@code bytes} with an additional entry in the {@code constant_pool} table,
indicating a {@code CONSTANT_Utf8_info} structure for {@code CN}, and
where the {@code CONSTANT_Class_info} structure indicated by {@code this_class}
refers to the new {@code CONSTANT_Utf8_info} structure.

<p> Let {@code L} be the defining class loader of the lookup class of this {@code Lookup}.

<p> {@code C} is derived with name {@code CN}, class loader {@code L}, and
purported representation {@code newBytes} as if by the rules of JVMS {@jvms 5.3.5},
with the following adjustments:
<ul>
<li> The constant indicated by {@code this_class} is permitted to specify a name
that includes a single {@code "."} character, even though this is not a valid
binary class or interface name in internal form.</li>

<li> The Java Virtual Machine marks {@code L} as the defining class loader of {@code C},
but no class loader is recorded as an initiating class loader of {@code C}.</li>

<li> {@code C} is considered to have the same runtime
{@linkplain Class#getPackage() package}, {@linkplain Class#getModule() module}
and {@linkplain java.security.ProtectionDomain protection domain}
as the lookup class of this {@code Lookup}.
<li> Let {@code GN} be the binary name obtained by taking {@code N}
(a binary name encoded in internal form) and replacing ASCII forward slashes with
ASCII periods. For the instance of {@link java.lang.Class} representing {@code C}:
<ul>
<li> {@link Class#getName()} returns the string {@code GN + "/" + <suffix>},
     even though this is not a valid binary class or interface name.</li>
<li> {@link Class#descriptorString()} returns the string
     {@code "L" + N + "." + <suffix> + ";"},
     even though this is not a valid type descriptor name.</li>
<li> {@link Class#describeConstable()} returns an empty optional as {@code C}
     cannot be described in {@linkplain java.lang.constant.ClassDesc nominal form}.</li>
</ul>
</ul>
</li>
</ol>

<p> After {@code C} is derived, it is linked by the Java Virtual Machine.
Linkage occurs as specified in JVMS {@jvms 5.4.3}, with the following adjustments:
<ul>
<li> During verification, whenever it is necessary to load the class named
{@code CN}, the attempt succeeds, producing class {@code C}. No request is
made of any class loader.</li>

<li> On any attempt to resolve the entry in the run-time constant pool indicated
by {@code this_class}, the symbolic reference is considered to be resolved to
{@code C} and resolution always succeeds immediately.</li>
</ul>

<p> If the {@code initialize} parameter is {@code true},
then {@code C} is initialized by the Java Virtual Machine.

<p> The newly created class or interface {@code C} serves as the
{@linkplain #lookupClass() lookup class} of the {@code Lookup} object
returned by this method. {@code C} is <em>hidden</em> in the sense that
no other class or interface can refer to {@code C} via a constant pool entry.
That is, a hidden class or interface cannot be named as a supertype, a field type,
a method parameter type, or a method return type by any other class.
This is because a hidden class or interface does not have a binary name, so
there is no internal form available to record in any class's constant pool.
A hidden class or interface is not discoverable by {@link Class#forName(String, boolean, ClassLoader)},
{@link ClassLoader#loadClass(String, boolean)}, or {@link #findClass(String)}, and
is not {@linkplain java.instrument/java.lang.instrument.Instrumentation#isModifiableClass(Class)
modifiable} by Java agents or tool agents using the <a href="{@docRoot}/../specs/jvmti.html">
JVM Tool Interface</a>.

<p> A class or interface created by
{@linkplain ClassLoader#defineClass(String, byte[], int, int, ProtectionDomain)
a class loader} has a strong relationship with that class loader.
That is, every {@code Class} object contains a reference to the {@code ClassLoader}
that {@linkplain Class#getClassLoader() defined it}.
This means that a class created by a class loader may be unloaded if and
only if its defining loader is not reachable and thus may be reclaimed
by a garbage collector (JLS {@jls 12.7}).

By default, however, a hidden class or interface may be unloaded even if
the class loader that is marked as its defining loader is
<a href="../ref/package-summary.html#reachability">reachable</a>.
This behavior is useful when a hidden class or interface serves multiple
classes defined by arbitrary class loaders.  In other cases, a hidden
class or interface may be linked to a single class (or a small number of classes)
with the same defining loader as the hidden class or interface.
In such cases, where the hidden class or interface must be coterminous
with a normal class or interface, the {@link ClassOption#STRONG STRONG}
option may be passed in {@code options}.
This arranges for a hidden class to have the same strong relationship
with the class loader marked as its defining loader,
as a normal class or interface has with its own defining loader.

If {@code STRONG} is not used, then the invoker of {@code defineHiddenClass}
may still prevent a hidden class or interface from being
unloaded by ensuring that the {@code Class} object is reachable.

<p> The unloading characteristics are set for each hidden class when it is
defined, and cannot be changed later.  An advantage of allowing hidden classes
to be unloaded independently of the class loader marked as their defining loader
is that a very large number of hidden classes may be created by an application.
In contrast, if {@code STRONG} is used, then the JVM may run out of memory,
just as if normal classes were created by class loaders.

<p> Classes and interfaces in a nest are allowed to have mutual access to
their private members.  The nest relationship is determined by
the {@code NestHost} attribute (JVMS {@jvms 4.7.28}) and
the {@code NestMembers} attribute (JVMS {@jvms 4.7.29}) in a {@code class} file.
By default, a hidden class belongs to a nest consisting only of itself
because a hidden class has no binary name.
The {@link ClassOption#NESTMATE NESTMATE} option can be passed in {@code options}
to create a hidden class or interface {@code C} as a member of a nest.
The nest to which {@code C} belongs is not based on any {@code NestHost} attribute
in the {@code ClassFile} structure from which {@code C} was derived.
Instead, the following rules determine the nest host of {@code C}:
<ul>
<li>If the nest host of the lookup class of this {@code Lookup} has previously
    been determined, then let {@code H} be the nest host of the lookup class.
    Otherwise, the nest host of the lookup class is determined using the
    algorithm in JVMS {@jvms 5.4.4}, yielding {@code H}.</li>
<li>The nest host of {@code C} is determined to be {@code H},
    the nest host of the lookup class.</li>
</ul>

<p> A hidden class or interface may be serializable, but this requires a custom
serialization mechanism in order to ensure that instances are properly serialized
and deserialized. The default serialization mechanism supports only classes and
interfaces that are discoverable by their class name.

@param bytes the bytes that make up the class data,
in the format of a valid {@code class} file as defined by
<cite>The Java Virtual Machine Specification</cite>.
@param initialize if {@code true} the class will be initialized.
@param options {@linkplain ClassOption class options}
@return the {@code Lookup} object on the hidden class,
with {@linkplain #ORIGINAL original} and
{@linkplain Lookup#hasFullPrivilegeAccess() full privilege} access

@throws IllegalAccessException if this {@code Lookup} does not have
{@linkplain #hasFullPrivilegeAccess() full privilege} access
@throws ClassFormatError if {@code bytes} is not a {@code ClassFile} structure
@throws UnsupportedClassVersionError if {@code bytes} is not of a supported major or minor version
@throws IllegalArgumentException if {@code bytes} denotes a class in a different package
than the lookup class or {@code bytes} is not a class or interface
({@code ACC_MODULE} flag is set in the value of the {@code access_flags} item)
@throws IncompatibleClassChangeError if the class or interface named as
the direct superclass of {@code C} is in fact an interface, or if any of the classes
or interfaces named as direct superinterfaces of {@code C} are not in fact interfaces
@throws ClassCircularityError if any of the superclasses or superinterfaces of
{@code C} is {@code C} itself
@throws VerifyError if the newly created class cannot be verified
@throws LinkageError if the newly created class cannot be linked for any other reason
@throws NullPointerException if any parameter is {@code null}

@since 15
@see Class#isHidden()
@jvms 4.2.1 Binary Class and Interface Names
@jvms 4.2.2 Unqualified Names
@jvms 4.7.28 The {@code NestHost} Attribute
@jvms 4.7.29 The {@code NestMembers} Attribute
@jvms 5.4.3.1 Class and Interface Resolution
@jvms 5.4.4 Access Control
@jvms 5.3.5 Deriving a {@code Class} from a {@code class} File Representation
@jvms 5.4 Linking
@jvms 5.5 Initialization
@jls 12.7 Unloading of Classes and Interfaces

## MethodHandles.defineHiddenClassWithClassData(byte[], Object, boolean, ClassOption...)

```java
public Lookup defineHiddenClassWithClassData(byte[] bytes, Object classData, boolean initialize, ClassOption... options) throws IllegalAccessException
```

Creates a <em>hidden</em> class or interface from {@code bytes} with associated
{@linkplain MethodHandles#classData(Lookup, String, Class) class data},
returning a {@code Lookup} on the newly created class or interface.

<p> This method is equivalent to calling
{@link #defineHiddenClass(byte[], boolean, ClassOption...) defineHiddenClass(bytes, initialize, options)}
as if the hidden class is injected with a private static final <i>unnamed</i>
field which is initialized with the given {@code classData} at
the first instruction of the class initializer.
The newly created class is linked by the Java Virtual Machine.

<p> The {@link MethodHandles#classData(Lookup, String, Class) MethodHandles::classData}
and {@link MethodHandles#classDataAt(Lookup, String, Class, int) MethodHandles::classDataAt}
methods can be used to retrieve the {@code classData}.

@apiNote
A framework can create a hidden class with class data with one or more
objects and load the class data as dynamically-computed constant(s)
via a bootstrap method.  {@link MethodHandles#classData(Lookup, String, Class)
Class data} is accessible only to the lookup object created by the newly
defined hidden class but inaccessible to other members in the same nest
(unlike private static fields that are accessible to nestmates).
Care should be taken w.r.t. mutability for example when passing
an array or other mutable structure through the class data.
Changing any value stored in the class data at runtime may lead to
unpredictable behavior.
If the class data is a {@code List}, it is good practice to make it
unmodifiable for example via {@link List#of List::of}.

@param bytes     the class bytes
@param classData pre-initialized class data
@param initialize if {@code true} the class will be initialized.
@param options   {@linkplain ClassOption class options}
@return the {@code Lookup} object on the hidden class,
with {@linkplain #ORIGINAL original} and
{@linkplain Lookup#hasFullPrivilegeAccess() full privilege} access

@throws IllegalAccessException if this {@code Lookup} does not have
{@linkplain #hasFullPrivilegeAccess() full privilege} access
@throws ClassFormatError if {@code bytes} is not a {@code ClassFile} structure
@throws UnsupportedClassVersionError if {@code bytes} is not of a supported major or minor version
@throws IllegalArgumentException if {@code bytes} denotes a class in a different package
than the lookup class or {@code bytes} is not a class or interface
({@code ACC_MODULE} flag is set in the value of the {@code access_flags} item)
@throws IncompatibleClassChangeError if the class or interface named as
the direct superclass of {@code C} is in fact an interface, or if any of the classes
or interfaces named as direct superinterfaces of {@code C} are not in fact interfaces
@throws ClassCircularityError if any of the superclasses or superinterfaces of
{@code C} is {@code C} itself
@throws VerifyError if the newly created class cannot be verified
@throws LinkageError if the newly created class cannot be linked for any other reason
@throws NullPointerException if any parameter is {@code null}

@since 16
@see Lookup#defineHiddenClass(byte[], boolean, ClassOption...)
@see Class#isHidden()
@see MethodHandles#classData(Lookup, String, Class)
@see MethodHandles#classDataAt(Lookup, String, Class, int)
@jvms 4.2.1 Binary Class and Interface Names
@jvms 4.2.2 Unqualified Names
@jvms 4.7.28 The {@code NestHost} Attribute
@jvms 4.7.29 The {@code NestMembers} Attribute
@jvms 5.4.3.1 Class and Interface Resolution
@jvms 5.4.4 Access Control
@jvms 5.3.5 Deriving a {@code Class} from a {@code class} File Representation
@jvms 5.4 Linking
@jvms 5.5 Initialization
@jls 12.7 Unloading of Classes and Interfaces

## MethodHandles.toString()

```java
public String toString()
```

Displays the name of the class from which lookups are to be made,
followed by "/" and the name of the {@linkplain #previousLookupClass()
previous lookup class} if present.
(The name is the one reported by {@link java.lang.Class#getName() Class.getName}.)
If there are restrictions on the access permitted to this lookup,
this is indicated by adding a suffix to the class name, consisting
of a slash and a keyword.  The keyword represents the strongest
allowed access, and is chosen as follows:
<ul>
<li>If no access is allowed, the suffix is "/noaccess".
<li>If only unconditional access is allowed, the suffix is "/publicLookup".
<li>If only public access to types in exported packages is allowed, the suffix is "/public".
<li>If only public and module access are allowed, the suffix is "/module".
<li>If public and package access are allowed, the suffix is "/package".
<li>If public, package, and private access are allowed, the suffix is "/private".
</ul>
If none of the above cases apply, it is the case that
{@linkplain #hasFullPrivilegeAccess() full privilege access}
(public, module, package, private, and protected) is allowed.
In this case, no suffix is added.
This is true only of an object obtained originally from
{@link java.lang.invoke.MethodHandles#lookup MethodHandles.lookup}.
Objects created by {@link java.lang.invoke.MethodHandles.Lookup#in Lookup.in}
always have restricted access, and will display a suffix.
<p>
(It may seem strange that protected access should be
stronger than private access.  Viewed independently from
package access, protected access is the first to be lost,
because it requires a direct subclass relationship between
caller and callee.)
@see #in

## MethodHandles.findStatic(Class<?>, String, MethodType)

```java
public MethodHandle findStatic(Class<?> refc, String name, MethodType type) throws NoSuchMethodException, IllegalAccessException
```

Produces a method handle for a static method.
The type of the method handle will be that of the method.
(Since static methods do not take receivers, there is no
additional receiver argument inserted into the method handle type,
as there would be with {@link #findVirtual findVirtual} or {@link #findSpecial findSpecial}.)
The method and all its argument types must be accessible to the lookup object.
<p>
The returned method handle will have
{@linkplain MethodHandle#asVarargsCollector variable arity} if and only if
the method's variable arity modifier bit ({@code 0x0080}) is set.
<p>
If the returned method handle is invoked, the method's class will
be initialized, if it has not already been initialized.
<p><b>Example:</b>
{@snippet lang="java" :
import static java.lang.invoke.MethodHandles.*;
import static java.lang.invoke.MethodType.*;
...
MethodHandle MH_asList = publicLookup().findStatic(Arrays.class,
  "asList", methodType(List.class, Object[].class));
assertEquals("[x, y]", MH_asList.invoke("x", "y").toString());
}
@param refc the class from which the method is accessed
@param name the name of the method
@param type the type of the method
@return the desired method handle
@throws NoSuchMethodException if the method does not exist
@throws IllegalAccessException if access checking fails,
                               or if the method is not {@code static},
                               or if the method's variable arity modifier bit
                               is set and {@code asVarargsCollector} fails
@throws NullPointerException if any argument is null

## MethodHandles.findVirtual(Class<?>, String, MethodType)

```java
public MethodHandle findVirtual(Class<?> refc, String name, MethodType type) throws NoSuchMethodException, IllegalAccessException
```

Produces a method handle for a virtual method.
The type of the method handle will be that of the method,
with the receiver type (usually {@code refc}) prepended.
The method and all its argument types must be accessible to the lookup object.
<p>
When called, the handle will treat the first argument as a receiver
and, for non-private methods, dispatch on the receiver's type to determine which method
implementation to enter.
For private methods the named method in {@code refc} will be invoked on the receiver.
(The dispatching action is identical with that performed by an
{@code invokevirtual} or {@code invokeinterface} instruction.)
<p>
The first argument will be of type {@code refc} if the lookup
class has full privileges to access the member.  Otherwise
the member must be {@code protected} and the first argument
will be restricted in type to the lookup class.
<p>
The returned method handle will have
{@linkplain MethodHandle#asVarargsCollector variable arity} if and only if
the method's variable arity modifier bit ({@code 0x0080}) is set.
<p>
Because of the general <a href="MethodHandles.Lookup.html#equiv">equivalence</a> between {@code invokevirtual}
instructions and method handles produced by {@code findVirtual},
if the class is {@code MethodHandle} and the name string is
{@code invokeExact} or {@code invoke}, the resulting
method handle is equivalent to one produced by
{@link java.lang.invoke.MethodHandles#exactInvoker MethodHandles.exactInvoker} or
{@link java.lang.invoke.MethodHandles#invoker MethodHandles.invoker}
with the same {@code type} argument.
<p>
If the class is {@code VarHandle} and the name string corresponds to
the name of a signature-polymorphic access mode method, the resulting
method handle is equivalent to one produced by
{@link java.lang.invoke.MethodHandles#varHandleInvoker} with
the access mode corresponding to the name string and with the same
{@code type} arguments.
<p>
<b>Example:</b>
{@snippet lang="java" :
import static java.lang.invoke.MethodHandles.*;
import static java.lang.invoke.MethodType.*;
...
MethodHandle MH_concat = publicLookup().findVirtual(String.class,
  "concat", methodType(String.class, String.class));
MethodHandle MH_hashCode = publicLookup().findVirtual(Object.class,
  "hashCode", methodType(int.class));
MethodHandle MH_hashCode_String = publicLookup().findVirtual(String.class,
  "hashCode", methodType(int.class));
assertEquals("xy", (String) MH_concat.invokeExact("x", "y"));
assertEquals("xy".hashCode(), (int) MH_hashCode.invokeExact((Object)"xy"));
assertEquals("xy".hashCode(), (int) MH_hashCode_String.invokeExact("xy"));
// interface method:
MethodHandle MH_subSequence = publicLookup().findVirtual(CharSequence.class,
  "subSequence", methodType(CharSequence.class, int.class, int.class));
assertEquals("def", MH_subSequence.invoke("abcdefghi", 3, 6).toString());
// constructor "internal method" must be accessed differently:
MethodType MT_newString = methodType(void.class); //()V for new String()
try { assertEquals("impossible", lookup()
        .findVirtual(String.class, "<init>", MT_newString));
 } catch (NoSuchMethodException ex) { } // OK
MethodHandle MH_newString = publicLookup()
  .findConstructor(String.class, MT_newString);
assertEquals("", (String) MH_newString.invokeExact());
}

@param refc the class or interface from which the method is accessed
@param name the name of the method
@param type the type of the method, with the receiver argument omitted
@return the desired method handle
@throws NoSuchMethodException if the method does not exist
@throws IllegalAccessException if access checking fails,
                               or if the method is {@code static},
                               or if the method's variable arity modifier bit
                               is set and {@code asVarargsCollector} fails
@throws NullPointerException if any argument is null

## MethodHandles.findConstructor(Class<?>, MethodType)

```java
public MethodHandle findConstructor(Class<?> refc, MethodType type) throws NoSuchMethodException, IllegalAccessException
```

Produces a method handle which creates an object and initializes it, using
the constructor of the specified type.
The parameter types of the method handle will be those of the constructor,
while the return type will be a reference to the constructor's class.
The constructor and all its argument types must be accessible to the lookup object.
<p>
The requested type must have a return type of {@code void}.
(This is consistent with the JVM's treatment of constructor type descriptors.)
<p>
The returned method handle will have
{@linkplain MethodHandle#asVarargsCollector variable arity} if and only if
the constructor's variable arity modifier bit ({@code 0x0080}) is set.
<p>
If the returned method handle is invoked, the constructor's class will
be initialized, if it has not already been initialized.
<p><b>Example:</b>
{@snippet lang="java" :
import static java.lang.invoke.MethodHandles.*;
import static java.lang.invoke.MethodType.*;
...
MethodHandle MH_newArrayList = publicLookup().findConstructor(
  ArrayList.class, methodType(void.class, Collection.class));
Collection orig = Arrays.asList("x", "y");
Collection copy = (ArrayList) MH_newArrayList.invokeExact(orig);
assert(orig != copy);
assertEquals(orig, copy);
// a variable-arity constructor:
MethodHandle MH_newProcessBuilder = publicLookup().findConstructor(
  ProcessBuilder.class, methodType(void.class, String[].class));
ProcessBuilder pb = (ProcessBuilder)
  MH_newProcessBuilder.invoke("x", "y", "z");
assertEquals("[x, y, z]", pb.command().toString());
}
@param refc the class or interface from which the method is accessed
@param type the type of the method, with the receiver argument omitted, and a void return type
@return the desired method handle
@throws NoSuchMethodException if the constructor does not exist
@throws IllegalAccessException if access checking fails
                               or if the method's variable arity modifier bit
                               is set and {@code asVarargsCollector} fails
@throws NullPointerException if any argument is null

## MethodHandles.findClass(String)

```java
public Class<?> findClass(String targetName) throws ClassNotFoundException, IllegalAccessException
```

Looks up a class by name from the lookup context defined by this {@code Lookup} object,
<a href="MethodHandles.Lookup.html#equiv">as if resolved</a> by an {@code ldc} instruction.
Such a resolution, as specified in JVMS {@jvms 5.4.3.1}, attempts to locate and load the class,
and then determines whether the class is accessible to this lookup object.
<p>
For a class or an interface, the name is the {@linkplain ClassLoader##binary-name binary name}.
For an array class of {@code n} dimensions, the name begins with {@code n} occurrences
of {@code '['} and followed by the element type as encoded in the
{@linkplain Class##nameFormat table} specified in {@link Class#getName}.
<p>
The lookup context here is determined by the {@linkplain #lookupClass() lookup class},
its class loader, and the {@linkplain #lookupModes() lookup modes}.

@param targetName the {@linkplain ClassLoader##binary-name binary name} of the class
                  or the string representing an array class
@return the requested class.
@throws LinkageError if the linkage fails
@throws ClassNotFoundException if the class cannot be loaded by the lookup class' loader.
@throws IllegalAccessException if the class is not accessible, using the allowed access
modes.
@throws NullPointerException if {@code targetName} is null
@since 9
@jvms 5.4.3.1 Class and Interface Resolution

## MethodHandles.ensureInitialized(Class<T>)

```java
public <T> Class<T> ensureInitialized(Class<T> targetClass) throws IllegalAccessException
```

Ensures that {@code targetClass} has been initialized. The class
to be initialized must be {@linkplain #accessClass accessible}
to this {@code Lookup} object.  This method causes {@code targetClass}
to be initialized if it has not been already initialized,
as specified in JVMS {@jvms 5.5}.

<p>
This method returns when {@code targetClass} is fully initialized, or
when {@code targetClass} is being initialized by the current thread.

@param <T> the type of the class to be initialized
@param targetClass the class to be initialized
@return {@code targetClass} that has been initialized, or that is being
        initialized by the current thread.

@throws  IllegalArgumentException if {@code targetClass} is a primitive type or {@code void}
         or array class
@throws  IllegalAccessException if {@code targetClass} is not
         {@linkplain #accessClass accessible} to this lookup
@throws  ExceptionInInitializerError if the class initialization provoked
         by this method fails
@since 15
@jvms 5.5 Initialization

## MethodHandles.accessClass(Class<T>)

```java
public <T> Class<T> accessClass(Class<T> targetClass) throws IllegalAccessException
```

Determines if a class can be accessed from the lookup context defined by
this {@code Lookup} object. The static initializer of the class is not run.
If {@code targetClass} is an array class, {@code targetClass} is accessible
if the element type of the array class is accessible.  Otherwise,
{@code targetClass} is determined as accessible as follows.

<p>
If {@code targetClass} is in the same module as the lookup class,
the lookup class is {@code LC} in module {@code M1} and
the previous lookup class is in module {@code M0} or
{@code null} if not present,
{@code targetClass} is accessible if and only if one of the following is true:
<ul>
<li>If this lookup has {@link #PRIVATE} access, {@code targetClass} is
    {@code LC} or other class in the same nest of {@code LC}.</li>
<li>If this lookup has {@link #PACKAGE} access, {@code targetClass} is
    in the same runtime package of {@code LC}.</li>
<li>If this lookup has {@link #MODULE} access, {@code targetClass} is
    a public type in {@code M1}.</li>
<li>If this lookup has {@link #PUBLIC} access, {@code targetClass} is
    a public type in a package exported by {@code M1} to at least  {@code M0}
    if the previous lookup class is present; otherwise, {@code targetClass}
    is a public type in a package exported by {@code M1} unconditionally.</li>
</ul>

<p>
Otherwise, if this lookup has {@link #UNCONDITIONAL} access, this lookup
can access public types in all modules when the type is in a package
that is exported unconditionally.
<p>
Otherwise, {@code targetClass} is in a different module from {@code lookupClass},
and if this lookup does not have {@code PUBLIC} access, {@code lookupClass}
is inaccessible.
<p>
Otherwise, if this lookup has no {@linkplain #previousLookupClass() previous lookup class},
{@code M1} is the module containing {@code lookupClass} and
{@code M2} is the module containing {@code targetClass},
then {@code targetClass} is accessible if and only if
<ul>
<li>{@code M1} reads {@code M2}, and
<li>{@code targetClass} is public and in a package exported by
    {@code M2} at least to {@code M1}.
</ul>
<p>
Otherwise, if this lookup has a {@linkplain #previousLookupClass() previous lookup class},
{@code M1} and {@code M2} are as before, and {@code M0} is the module
containing the previous lookup class, then {@code targetClass} is accessible
if and only if one of the following is true:
<ul>
<li>{@code targetClass} is in {@code M0} and {@code M1}
    {@linkplain Module#canRead(Module)}  reads} {@code M0} and the type is
    in a package that is exported to at least {@code M1}.
<li>{@code targetClass} is in {@code M1} and {@code M0}
    {@linkplain Module#canRead(Module)}  reads} {@code M1} and the type is
    in a package that is exported to at least {@code M0}.
<li>{@code targetClass} is in a third module {@code M2} and both {@code M0}
    and {@code M1} reads {@code M2} and the type is in a package
    that is exported to at least both {@code M0} and {@code M2}.
</ul>
<p>
Otherwise, {@code targetClass} is not accessible.

@param <T> the type of the class to be access-checked
@param targetClass the class to be access-checked
@return {@code targetClass} that has been access-checked
@throws IllegalAccessException if the class is not accessible from the lookup class
and previous lookup class, if present, using the allowed access modes.
@throws NullPointerException if {@code targetClass} is {@code null}
@since 9
@see <a href="#cross-module-lookup">Cross-module lookups</a>

## MethodHandles.findSpecial(Class<?>, String, MethodType, Class<?>)

```java
public MethodHandle findSpecial(Class<?> refc, String name, MethodType type, Class<?> specialCaller) throws NoSuchMethodException, IllegalAccessException
```

Produces an early-bound method handle for a virtual method.
It will bypass checks for overriding methods on the receiver,
<a href="MethodHandles.Lookup.html#equiv">as if called</a> from an {@code invokespecial}
instruction from within the explicitly specified {@code specialCaller}.
The type of the method handle will be that of the method,
with a suitably restricted receiver type prepended.
(The receiver type will be {@code specialCaller} or a subtype.)
The method and all its argument types must be accessible
to the lookup object.
<p>
Before method resolution,
if the explicitly specified caller class is not identical with the
lookup class, or if this lookup object does not have
<a href="MethodHandles.Lookup.html#privacc">private access</a>
privileges, the access fails.
<p>
The returned method handle will have
{@linkplain MethodHandle#asVarargsCollector variable arity} if and only if
the method's variable arity modifier bit ({@code 0x0080}) is set.
<p style="font-size:smaller;">
<em>(Note:  JVM internal methods named {@value ConstantDescs#INIT_NAME}
are not visible to this API,
even though the {@code invokespecial} instruction can refer to them
in special circumstances.  Use {@link #findConstructor findConstructor}
to access instance initialization methods in a safe manner.)</em>
<p><b>Example:</b>
{@snippet lang="java" :
import static java.lang.invoke.MethodHandles.*;
import static java.lang.invoke.MethodType.*;
...
static class Listie extends ArrayList {
  public String toString() { return "[wee Listie]"; }
  static Lookup lookup() { return MethodHandles.lookup(); }
}
...
// no access to constructor via invokeSpecial:
MethodHandle MH_newListie = Listie.lookup()
  .findConstructor(Listie.class, methodType(void.class));
Listie l = (Listie) MH_newListie.invokeExact();
try { assertEquals("impossible", Listie.lookup().findSpecial(
        Listie.class, "<init>", methodType(void.class), Listie.class));
 } catch (NoSuchMethodException ex) { } // OK
// access to super and self methods via invokeSpecial:
MethodHandle MH_super = Listie.lookup().findSpecial(
  ArrayList.class, "toString" , methodType(String.class), Listie.class);
MethodHandle MH_this = Listie.lookup().findSpecial(
  Listie.class, "toString" , methodType(String.class), Listie.class);
MethodHandle MH_duper = Listie.lookup().findSpecial(
  Object.class, "toString" , methodType(String.class), Listie.class);
assertEquals("[]", (String) MH_super.invokeExact(l));
assertEquals(""+l, (String) MH_this.invokeExact(l));
assertEquals("[]", (String) MH_duper.invokeExact(l)); // ArrayList method
try { assertEquals("inaccessible", Listie.lookup().findSpecial(
        String.class, "toString", methodType(String.class), Listie.class));
 } catch (IllegalAccessException ex) { } // OK
Listie subl = new Listie() { public String toString() { return "[subclass]"; } };
assertEquals(""+l, (String) MH_this.invokeExact(subl)); // Listie method
}

@param refc the class or interface from which the method is accessed
@param name the name of the method (which must not be "&lt;init&gt;")
@param type the type of the method, with the receiver argument omitted
@param specialCaller the proposed calling class to perform the {@code invokespecial}
@return the desired method handle
@throws NoSuchMethodException if the method does not exist
@throws IllegalAccessException if access checking fails,
                               or if the method is {@code static},
                               or if the method's variable arity modifier bit
                               is set and {@code asVarargsCollector} fails
@throws NullPointerException if any argument is null

## MethodHandles.findGetter(Class<?>, String, Class<?>)

```java
public MethodHandle findGetter(Class<?> refc, String name, Class<?> type) throws NoSuchFieldException, IllegalAccessException
```

Produces a method handle giving read access to a non-static field.
The type of the method handle will have a return type of the field's
value type.
The method handle's single argument will be the instance containing
the field.
Access checking is performed immediately on behalf of the lookup class.
@param refc the class or interface from which the method is accessed
@param name the field's name
@param type the field's type
@return a method handle which can load values from the field
@throws NoSuchFieldException if the field does not exist
@throws IllegalAccessException if access checking fails, or if the field is {@code static}
@throws NullPointerException if any argument is null
@see #findVarHandle(Class, String, Class)

## MethodHandles.findSetter(Class<?>, String, Class<?>)

```java
public MethodHandle findSetter(Class<?> refc, String name, Class<?> type) throws NoSuchFieldException, IllegalAccessException
```

Produces a method handle giving write access to a non-static field.
The type of the method handle will have a void return type.
The method handle will take two arguments, the instance containing
the field, and the value to be stored.
The second argument will be of the field's value type.
Access checking is performed immediately on behalf of the lookup class.
@param refc the class or interface from which the method is accessed
@param name the field's name
@param type the field's type
@return a method handle which can store values into the field
@throws NoSuchFieldException if the field does not exist
@throws IllegalAccessException if access checking fails, or if the field is {@code static}
                               or {@code final}
@throws NullPointerException if any argument is null
@see #findVarHandle(Class, String, Class)

## MethodHandles.findVarHandle(Class<?>, String, Class<?>)

```java
public VarHandle findVarHandle(Class<?> recv, String name, Class<?> type) throws NoSuchFieldException, IllegalAccessException
```

Produces a VarHandle giving access to a non-static field {@code name}
of type {@code type} declared in a class of type {@code recv}.
The VarHandle's variable type is {@code type} and it has one
coordinate type, {@code recv}.
<p>
Access checking is performed immediately on behalf of the lookup
class.
<p>
Certain access modes of the returned VarHandle are unsupported under
the following conditions:
<ul>
<li>if the field is declared {@code final}, then the write, atomic
    update, numeric atomic update, and bitwise atomic update access
    modes are unsupported.
<li>if the field type is anything other than {@code byte},
    {@code short}, {@code char}, {@code int}, {@code long},
    {@code float}, or {@code double} then numeric atomic update
    access modes are unsupported.
<li>if the field type is anything other than {@code boolean},
    {@code byte}, {@code short}, {@code char}, {@code int} or
    {@code long} then bitwise atomic update access modes are
    unsupported.
</ul>
<p>
If the field is declared {@code volatile} then the returned VarHandle
will override access to the field (effectively ignore the
{@code volatile} declaration) in accordance to its specified
access modes.
<p>
If the field type is {@code float} or {@code double} then numeric
and atomic update access modes compare values using their bitwise
representation (see {@link Float#floatToRawIntBits} and
{@link Double#doubleToRawLongBits}, respectively).
@apiNote
Bitwise comparison of {@code float} values or {@code double} values,
as performed by the numeric and atomic update access modes, differ
from the primitive {@code ==} operator and the {@link Float#equals}
and {@link Double#equals} methods, specifically with respect to
comparing NaN values or comparing {@code -0.0} with {@code +0.0}.
Care should be taken when performing a compare and set or a compare
and exchange operation with such values since the operation may
unexpectedly fail.
There are many possible NaN values that are considered to be
{@code NaN} in Java, although no IEEE 754 floating-point operation
provided by Java can distinguish between them.  Operation failure can
occur if the expected or witness value is a NaN value and it is
transformed (perhaps in a platform specific manner) into another NaN
value, and thus has a different bitwise representation (see
{@link Float#intBitsToFloat} or {@link Double#longBitsToDouble} for more
details).
The values {@code -0.0} and {@code +0.0} have different bitwise
representations but are considered equal when using the primitive
{@code ==} operator.  Operation failure can occur if, for example, a
numeric algorithm computes an expected value to be say {@code -0.0}
and previously computed the witness value to be say {@code +0.0}.
@param recv the receiver class, of type {@code R}, that declares the
non-static field
@param name the field's name
@param type the field's type, of type {@code T}
@return a VarHandle giving access to non-static fields.
@throws NoSuchFieldException if the field does not exist
@throws IllegalAccessException if access checking fails, or if the field is {@code static}
@throws NullPointerException if any argument is null
@since 9

## MethodHandles.findStaticGetter(Class<?>, String, Class<?>)

```java
public MethodHandle findStaticGetter(Class<?> refc, String name, Class<?> type) throws NoSuchFieldException, IllegalAccessException
```

Produces a method handle giving read access to a static field.
The type of the method handle will have a return type of the field's
value type.
The method handle will take no arguments.
Access checking is performed immediately on behalf of the lookup class.
<p>
If the returned method handle is invoked, the field's class will
be initialized, if it has not already been initialized.
@param refc the class or interface from which the method is accessed
@param name the field's name
@param type the field's type
@return a method handle which can load values from the field
@throws NoSuchFieldException if the field does not exist
@throws IllegalAccessException if access checking fails, or if the field is not {@code static}
@throws NullPointerException if any argument is null

## MethodHandles.findStaticSetter(Class<?>, String, Class<?>)

```java
public MethodHandle findStaticSetter(Class<?> refc, String name, Class<?> type) throws NoSuchFieldException, IllegalAccessException
```

Produces a method handle giving write access to a static field.
The type of the method handle will have a void return type.
The method handle will take a single
argument, of the field's value type, the value to be stored.
Access checking is performed immediately on behalf of the lookup class.
<p>
If the returned method handle is invoked, the field's class will
be initialized, if it has not already been initialized.
@param refc the class or interface from which the method is accessed
@param name the field's name
@param type the field's type
@return a method handle which can store values into the field
@throws NoSuchFieldException if the field does not exist
@throws IllegalAccessException if access checking fails, or if the field is not {@code static}
                               or is {@code final}
@throws NullPointerException if any argument is null

## MethodHandles.findStaticVarHandle(Class<?>, String, Class<?>)

```java
public VarHandle findStaticVarHandle(Class<?> decl, String name, Class<?> type) throws NoSuchFieldException, IllegalAccessException
```

Produces a VarHandle giving access to a static field {@code name} of
type {@code type} declared in a class of type {@code decl}.
The VarHandle's variable type is {@code type} and it has no
coordinate types.
<p>
Access checking is performed immediately on behalf of the lookup
class.
<p>
If the returned VarHandle is operated on, the declaring class will be
initialized, if it has not already been initialized.
<p>
Certain access modes of the returned VarHandle are unsupported under
the following conditions:
<ul>
<li>if the field is declared {@code final}, then the write, atomic
    update, numeric atomic update, and bitwise atomic update access
    modes are unsupported.
<li>if the field type is anything other than {@code byte},
    {@code short}, {@code char}, {@code int}, {@code long},
    {@code float}, or {@code double}, then numeric atomic update
    access modes are unsupported.
<li>if the field type is anything other than {@code boolean},
    {@code byte}, {@code short}, {@code char}, {@code int} or
    {@code long} then bitwise atomic update access modes are
    unsupported.
</ul>
<p>
If the field is declared {@code volatile} then the returned VarHandle
will override access to the field (effectively ignore the
{@code volatile} declaration) in accordance to its specified
access modes.
<p>
If the field type is {@code float} or {@code double} then numeric
and atomic update access modes compare values using their bitwise
representation (see {@link Float#floatToRawIntBits} and
{@link Double#doubleToRawLongBits}, respectively).
@apiNote
Bitwise comparison of {@code float} values or {@code double} values,
as performed by the numeric and atomic update access modes, differ
from the primitive {@code ==} operator and the {@link Float#equals}
and {@link Double#equals} methods, specifically with respect to
comparing NaN values or comparing {@code -0.0} with {@code +0.0}.
Care should be taken when performing a compare and set or a compare
and exchange operation with such values since the operation may
unexpectedly fail.
There are many possible NaN values that are considered to be
{@code NaN} in Java, although no IEEE 754 floating-point operation
provided by Java can distinguish between them.  Operation failure can
occur if the expected or witness value is a NaN value and it is
transformed (perhaps in a platform specific manner) into another NaN
value, and thus has a different bitwise representation (see
{@link Float#intBitsToFloat} or {@link Double#longBitsToDouble} for more
details).
The values {@code -0.0} and {@code +0.0} have different bitwise
representations but are considered equal when using the primitive
{@code ==} operator.  Operation failure can occur if, for example, a
numeric algorithm computes an expected value to be say {@code -0.0}
and previously computed the witness value to be say {@code +0.0}.
@param decl the class that declares the static field
@param name the field's name
@param type the field's type, of type {@code T}
@return a VarHandle giving access to a static field
@throws NoSuchFieldException if the field does not exist
@throws IllegalAccessException if access checking fails, or if the field is not {@code static}
@throws NullPointerException if any argument is null
@since 9

## MethodHandles.bind(Object, String, MethodType)

```java
public MethodHandle bind(Object receiver, String name, MethodType type) throws NoSuchMethodException, IllegalAccessException
```

Produces an early-bound method handle for a non-static method.
The receiver must have a supertype {@code defc} in which a method
of the given name and type is accessible to the lookup class.
The method and all its argument types must be accessible to the lookup object.
The type of the method handle will be that of the method,
without any insertion of an additional receiver parameter.
The given receiver will be bound into the method handle,
so that every call to the method handle will invoke the
requested method on the given receiver.
<p>
The returned method handle will have
{@linkplain MethodHandle#asVarargsCollector variable arity} if and only if
the method's variable arity modifier bit ({@code 0x0080}) is set
<em>and</em> the trailing array argument is not the only argument.
(If the trailing array argument is the only argument,
the given receiver value will be bound to it.)
<p>
This is almost equivalent to the following code, with some differences noted below:
{@snippet lang="java" :
import static java.lang.invoke.MethodHandles.*;
import static java.lang.invoke.MethodType.*;
...
MethodHandle mh0 = lookup().findVirtual(defc, name, type);
MethodHandle mh1 = mh0.bindTo(receiver);
mh1 = mh1.withVarargs(mh0.isVarargsCollector());
return mh1;
}
where {@code defc} is either {@code receiver.getClass()} or a super
type of that class, in which the requested method is accessible
to the lookup class.
(Unlike {@code bind}, {@code bindTo} does not preserve variable arity.
Also, {@code bindTo} may throw a {@code ClassCastException} in instances where {@code bind} would
throw an {@code IllegalAccessException}, as in the case where the member is {@code protected} and
the receiver is restricted by {@code findVirtual} to the lookup class.)
@param receiver the object from which the method is accessed
@param name the name of the method
@param type the type of the method, with the receiver argument omitted
@return the desired method handle
@throws NoSuchMethodException if the method does not exist
@throws IllegalAccessException if access checking fails
                               or if the method's variable arity modifier bit
                               is set and {@code asVarargsCollector} fails
@throws NullPointerException if any argument is null
@see MethodHandle#bindTo
@see #findVirtual

## MethodHandles.unreflect(Method)

```java
public MethodHandle unreflect(Method m) throws IllegalAccessException
```

Makes a <a href="MethodHandleInfo.html#directmh">direct method handle</a>
to <i>m</i>, if the lookup class has permission.
If <i>m</i> is non-static, the receiver argument is treated as an initial argument.
If <i>m</i> is virtual, overriding is respected on every call.
Unlike the Core Reflection API, exceptions are <em>not</em> wrapped.
The type of the method handle will be that of the method,
with the receiver type prepended (but only if it is non-static).
If the method's {@code accessible} flag is not set,
access checking is performed immediately on behalf of the lookup class.
If <i>m</i> is not public, do not share the resulting handle with untrusted parties.
<p>
The returned method handle will have
{@linkplain MethodHandle#asVarargsCollector variable arity} if and only if
the method's variable arity modifier bit ({@code 0x0080}) is set.
<p>
If <i>m</i> is static, and
if the returned method handle is invoked, the method's class will
be initialized, if it has not already been initialized.
@param m the reflected method
@return a method handle which can invoke the reflected method
@throws IllegalAccessException if access checking fails
                               or if the method's variable arity modifier bit
                               is set and {@code asVarargsCollector} fails
@throws NullPointerException if the argument is null

## MethodHandles.unreflectSpecial(Method, Class<?>)

```java
public MethodHandle unreflectSpecial(Method m, Class<?> specialCaller) throws IllegalAccessException
```

Produces a method handle for a reflected method.
It will bypass checks for overriding methods on the receiver,
<a href="MethodHandles.Lookup.html#equiv">as if called</a> from an {@code invokespecial}
instruction from within the explicitly specified {@code specialCaller}.
The type of the method handle will be that of the method,
with a suitably restricted receiver type prepended.
(The receiver type will be {@code specialCaller} or a subtype.)
If the method's {@code accessible} flag is not set,
access checking is performed immediately on behalf of the lookup class,
as if {@code invokespecial} instruction were being linked.
<p>
Before method resolution,
if the explicitly specified caller class is not identical with the
lookup class, or if this lookup object does not have
<a href="MethodHandles.Lookup.html#privacc">private access</a>
privileges, the access fails.
<p>
The returned method handle will have
{@linkplain MethodHandle#asVarargsCollector variable arity} if and only if
the method's variable arity modifier bit ({@code 0x0080}) is set.
@param m the reflected method
@param specialCaller the class nominally calling the method
@return a method handle which can invoke the reflected method
@throws IllegalAccessException if access checking fails,
                               or if the method is {@code static},
                               or if the method's variable arity modifier bit
                               is set and {@code asVarargsCollector} fails
@throws NullPointerException if any argument is null

## MethodHandles.unreflectConstructor(Constructor<?>)

```java
public MethodHandle unreflectConstructor(Constructor<?> c) throws IllegalAccessException
```

Produces a method handle for a reflected constructor.
The type of the method handle will be that of the constructor,
with the return type changed to the declaring class.
The method handle will perform a {@code newInstance} operation,
creating a new instance of the constructor's class on the
arguments passed to the method handle.
<p>
If the constructor's {@code accessible} flag is not set,
access checking is performed immediately on behalf of the lookup class.
<p>
The returned method handle will have
{@linkplain MethodHandle#asVarargsCollector variable arity} if and only if
the constructor's variable arity modifier bit ({@code 0x0080}) is set.
<p>
If the returned method handle is invoked, the constructor's class will
be initialized, if it has not already been initialized.
@param c the reflected constructor
@return a method handle which can invoke the reflected constructor
@throws IllegalAccessException if access checking fails
                               or if the method's variable arity modifier bit
                               is set and {@code asVarargsCollector} fails
@throws NullPointerException if the argument is null

## MethodHandles.unreflectGetter(Field)

```java
public MethodHandle unreflectGetter(Field f) throws IllegalAccessException
```

Produces a method handle giving read access to a reflected field.
The type of the method handle will have a return type of the field's
value type.
If the field is {@code static}, the method handle will take no arguments.
Otherwise, its single argument will be the instance containing
the field.
If the {@code Field} object's {@code accessible} flag is not set,
access checking is performed immediately on behalf of the lookup class.
<p>
If the field is static, and
if the returned method handle is invoked, the field's class will
be initialized, if it has not already been initialized.
@param f the reflected field
@return a method handle which can load values from the reflected field
@throws IllegalAccessException if access checking fails
@throws NullPointerException if the argument is null

## MethodHandles.unreflectSetter(Field)

```java
public MethodHandle unreflectSetter(Field f) throws IllegalAccessException
```

Produces a method handle giving write access to a reflected field.
The type of the method handle will have a void return type.
If the field is {@code static}, the method handle will take a single
argument, of the field's value type, the value to be stored.
Otherwise, the two arguments will be the instance containing
the field, and the value to be stored.
If the {@code Field} object's {@code accessible} flag is not set,
access checking is performed immediately on behalf of the lookup class.
<p>
If the field is {@code final}, write access will not be
allowed and access checking will fail, except under certain
narrow circumstances documented for {@link Field#set Field.set}.
A method handle is returned only if a corresponding call to
the {@code Field} object's {@code set} method could return
normally.  In particular, fields which are both {@code static}
and {@code final} may never be set.
<p>
If the field is {@code static}, and
if the returned method handle is invoked, the field's class will
be initialized, if it has not already been initialized.
@param f the reflected field
@return a method handle which can store values into the reflected field
@throws IllegalAccessException if access checking fails,
        or if the field is {@code final} and write access
        is not enabled on the {@code Field} object
@throws NullPointerException if the argument is null

## MethodHandles.unreflectVarHandle(Field)

```java
public VarHandle unreflectVarHandle(Field f) throws IllegalAccessException
```

Produces a VarHandle giving access to a reflected field {@code f}
of type {@code T} declared in a class of type {@code R}.
The VarHandle's variable type is {@code T}.
If the field is non-static the VarHandle has one coordinate type,
{@code R}.  Otherwise, the field is static, and the VarHandle has no
coordinate types.
<p>
Access checking is performed immediately on behalf of the lookup
class, regardless of the value of the field's {@code accessible}
flag.
<p>
If the field is static, and if the returned VarHandle is operated
on, the field's declaring class will be initialized, if it has not
already been initialized.
<p>
Certain access modes of the returned VarHandle are unsupported under
the following conditions:
<ul>
<li>if the field is declared {@code final}, then the write, atomic
    update, numeric atomic update, and bitwise atomic update access
    modes are unsupported.
<li>if the field type is anything other than {@code byte},
    {@code short}, {@code char}, {@code int}, {@code long},
    {@code float}, or {@code double} then numeric atomic update
    access modes are unsupported.
<li>if the field type is anything other than {@code boolean},
    {@code byte}, {@code short}, {@code char}, {@code int} or
    {@code long} then bitwise atomic update access modes are
    unsupported.
</ul>
<p>
If the field is declared {@code volatile} then the returned VarHandle
will override access to the field (effectively ignore the
{@code volatile} declaration) in accordance to its specified
access modes.
<p>
If the field type is {@code float} or {@code double} then numeric
and atomic update access modes compare values using their bitwise
representation (see {@link Float#floatToRawIntBits} and
{@link Double#doubleToRawLongBits}, respectively).
@apiNote
Bitwise comparison of {@code float} values or {@code double} values,
as performed by the numeric and atomic update access modes, differ
from the primitive {@code ==} operator and the {@link Float#equals}
and {@link Double#equals} methods, specifically with respect to
comparing NaN values or comparing {@code -0.0} with {@code +0.0}.
Care should be taken when performing a compare and set or a compare
and exchange operation with such values since the operation may
unexpectedly fail.
There are many possible NaN values that are considered to be
{@code NaN} in Java, although no IEEE 754 floating-point operation
provided by Java can distinguish between them.  Operation failure can
occur if the expected or witness value is a NaN value and it is
transformed (perhaps in a platform specific manner) into another NaN
value, and thus has a different bitwise representation (see
{@link Float#intBitsToFloat} or {@link Double#longBitsToDouble} for more
details).
The values {@code -0.0} and {@code +0.0} have different bitwise
representations but are considered equal when using the primitive
{@code ==} operator.  Operation failure can occur if, for example, a
numeric algorithm computes an expected value to be say {@code -0.0}
and previously computed the witness value to be say {@code +0.0}.
@param f the reflected field, with a field of type {@code T}, and
a declaring class of type {@code R}
@return a VarHandle giving access to non-static fields or a static
field
@throws IllegalAccessException if access checking fails
@throws NullPointerException if the argument is null
@since 9

## MethodHandles.revealDirect(MethodHandle)

```java
public MethodHandleInfo revealDirect(MethodHandle target)
```

Cracks a <a href="MethodHandleInfo.html#directmh">direct method handle</a>
created by this lookup object or a similar one.
Security and access checks are performed to ensure that this lookup object
is capable of reproducing the target method handle.
This means that the cracking may fail if target is a direct method handle
but was created by an unrelated lookup object.
This can happen if the method handle is <a href="MethodHandles.Lookup.html#callsens">caller sensitive</a>
and was created by a lookup object for a different class.
@param target a direct method handle to crack into symbolic reference components
@return a symbolic reference which can be used to reconstruct this method handle from this lookup object
@throws IllegalArgumentException if the target is not a direct method handle or if access checking fails
@throws    NullPointerException if the target is {@code null}
@see MethodHandleInfo
@since 1.8

## MethodHandles.hasPrivateAccess()

```java
public boolean hasPrivateAccess()
```

Returns {@code true} if this lookup has {@code PRIVATE} and {@code MODULE} access.
@return {@code true} if this lookup has {@code PRIVATE} and {@code MODULE} access.

@deprecated This method was originally designed to test {@code PRIVATE} access
that implies full privilege access but {@code MODULE} access has since become
independent of {@code PRIVATE} access.  It is recommended to call
{@link #hasFullPrivilegeAccess()} instead.
@since 9

## MethodHandles.hasFullPrivilegeAccess()

```java
public boolean hasFullPrivilegeAccess()
```

Returns {@code true} if this lookup has <em>full privilege access</em>,
i.e. {@code PRIVATE} and {@code MODULE} access.
A {@code Lookup} object must have full privilege access in order to
access all members that are allowed to the
{@linkplain #lookupClass() lookup class}.

@return {@code true} if this lookup has full privilege access.
@since 14
@see <a href="MethodHandles.Lookup.html#privacc">private and module access</a>

## MethodHandles.linkMethodHandleConstant(byte, Class<?>, String, Object)

```java
/*non-public*/ MethodHandle linkMethodHandleConstant(byte refKind, Class<?> defc, String name, Object type) throws ReflectiveOperationException
```

Hook called from the JVM (via MethodHandleNatives) to link MH constants:

## MethodHandles.arrayConstructor(Class<?>)

```java
public static MethodHandle arrayConstructor(Class<?> arrayClass) throws IllegalArgumentException
```

Produces a method handle constructing arrays of a desired type,
as if by the {@code anewarray} bytecode.
The return type of the method handle will be the array type.
The type of its sole argument will be {@code int}, which specifies the size of the array.

<p> If the returned method handle is invoked with a negative
array size, a {@code NegativeArraySizeException} will be thrown.

@param arrayClass an array type
@return a method handle which can create arrays of the given type
@throws NullPointerException if the argument is {@code null}
@throws IllegalArgumentException if {@code arrayClass} is not an array type
@see java.lang.reflect.Array#newInstance(Class, int)
@jvms 6.5 {@code anewarray} Instruction
@since 9

## MethodHandles.arrayLength(Class<?>)

```java
public static MethodHandle arrayLength(Class<?> arrayClass) throws IllegalArgumentException
```

Produces a method handle returning the length of an array,
as if by the {@code arraylength} bytecode.
The type of the method handle will have {@code int} as return type,
and its sole argument will be the array type.

<p> If the returned method handle is invoked with a {@code null}
array reference, a {@code NullPointerException} will be thrown.

@param arrayClass an array type
@return a method handle which can retrieve the length of an array of the given array type
@throws NullPointerException if the argument is {@code null}
@throws IllegalArgumentException if arrayClass is not an array type
@jvms 6.5 {@code arraylength} Instruction
@since 9

## MethodHandles.arrayElementGetter(Class<?>)

```java
public static MethodHandle arrayElementGetter(Class<?> arrayClass) throws IllegalArgumentException
```

Produces a method handle giving read access to elements of an array,
as if by the {@code aaload} bytecode.
The type of the method handle will have a return type of the array's
element type.  Its first argument will be the array type,
and the second will be {@code int}.

<p> When the returned method handle is invoked,
the array reference and array index are checked.
A {@code NullPointerException} will be thrown if the array reference
is {@code null} and an {@code ArrayIndexOutOfBoundsException} will be
thrown if the index is negative or if it is greater than or equal to
the length of the array.

@param arrayClass an array type
@return a method handle which can load values from the given array type
@throws NullPointerException if the argument is null
@throws  IllegalArgumentException if arrayClass is not an array type
@jvms 6.5 {@code aaload} Instruction

## MethodHandles.arrayElementSetter(Class<?>)

```java
public static MethodHandle arrayElementSetter(Class<?> arrayClass) throws IllegalArgumentException
```

Produces a method handle giving write access to elements of an array,
as if by the {@code astore} bytecode.
The type of the method handle will have a void return type.
Its last argument will be the array's element type.
The first and second arguments will be the array type and int.

<p> When the returned method handle is invoked,
the array reference and array index are checked.
A {@code NullPointerException} will be thrown if the array reference
is {@code null} and an {@code ArrayIndexOutOfBoundsException} will be
thrown if the index is negative or if it is greater than or equal to
the length of the array.

@param arrayClass the class of an array
@return a method handle which can store values into the array type
@throws NullPointerException if the argument is null
@throws IllegalArgumentException if arrayClass is not an array type
@jvms 6.5 {@code aastore} Instruction

## MethodHandles.arrayElementVarHandle(Class<?>)

```java
public static VarHandle arrayElementVarHandle(Class<?> arrayClass) throws IllegalArgumentException
```

Produces a VarHandle giving access to elements of an array of type
{@code arrayClass}.  The VarHandle's variable type is the component type
of {@code arrayClass} and the list of coordinate types is
{@code (arrayClass, int)}, where the {@code int} coordinate type
corresponds to an argument that is an index into an array.
<p>
Certain access modes of the returned VarHandle are unsupported under
the following conditions:
<ul>
<li>if the component type is anything other than {@code byte},
    {@code short}, {@code char}, {@code int}, {@code long},
    {@code float}, or {@code double} then numeric atomic update access
    modes are unsupported.
<li>if the component type is anything other than {@code boolean},
    {@code byte}, {@code short}, {@code char}, {@code int} or
    {@code long} then bitwise atomic update access modes are
    unsupported.
</ul>
<p>
If the component type is {@code float} or {@code double} then numeric
and atomic update access modes compare values using their bitwise
representation (see {@link Float#floatToRawIntBits} and
{@link Double#doubleToRawLongBits}, respectively).

<p> When the returned {@code VarHandle} is invoked,
the array reference and array index are checked.
A {@code NullPointerException} will be thrown if the array reference
is {@code null} and an {@code ArrayIndexOutOfBoundsException} will be
thrown if the index is negative or if it is greater than or equal to
the length of the array.

@apiNote
Bitwise comparison of {@code float} values or {@code double} values,
as performed by the numeric and atomic update access modes, differ
from the primitive {@code ==} operator and the {@link Float#equals}
and {@link Double#equals} methods, specifically with respect to
comparing NaN values or comparing {@code -0.0} with {@code +0.0}.
Care should be taken when performing a compare and set or a compare
and exchange operation with such values since the operation may
unexpectedly fail.
There are many possible NaN values that are considered to be
{@code NaN} in Java, although no IEEE 754 floating-point operation
provided by Java can distinguish between them.  Operation failure can
occur if the expected or witness value is a NaN value and it is
transformed (perhaps in a platform specific manner) into another NaN
value, and thus has a different bitwise representation (see
{@link Float#intBitsToFloat} or {@link Double#longBitsToDouble} for more
details).
The values {@code -0.0} and {@code +0.0} have different bitwise
representations but are considered equal when using the primitive
{@code ==} operator.  Operation failure can occur if, for example, a
numeric algorithm computes an expected value to be say {@code -0.0}
and previously computed the witness value to be say {@code +0.0}.
@param arrayClass the class of an array, of type {@code T[]}
@return a VarHandle giving access to elements of an array
@throws NullPointerException if the arrayClass is null
@throws IllegalArgumentException if arrayClass is not an array type
@since 9

## MethodHandles.byteArrayViewVarHandle(Class<?>, ByteOrder)

```java
public static VarHandle byteArrayViewVarHandle(Class<?> viewArrayClass, ByteOrder byteOrder) throws IllegalArgumentException
```

Produces a VarHandle giving access to elements of a {@code byte[]} array
viewed as if it were a different primitive array type, such as
{@code int[]} or {@code long[]}.
The VarHandle's variable type is the component type of
{@code viewArrayClass} and the list of coordinate types is
{@code (byte[], int)}, where the {@code int} coordinate type
corresponds to an argument that is an index into a {@code byte[]} array.
The returned VarHandle accesses bytes at an index in a {@code byte[]}
array, composing bytes to or from a value of the component type of
{@code viewArrayClass} according to the given endianness.
<p>
The supported component types (variables types) are {@code short},
{@code char}, {@code int}, {@code long}, {@code float} and
{@code double}.
<p>
Access of bytes at a given index will result in an
{@code ArrayIndexOutOfBoundsException} if the index is less than {@code 0}
or greater than the {@code byte[]} array length minus the size (in bytes)
of {@code T}.
<p>
Only plain {@linkplain VarHandle.AccessMode#GET get} and {@linkplain VarHandle.AccessMode#SET set}
access modes are supported by the returned var handle. For all other access modes, an
{@link UnsupportedOperationException} will be thrown.

@apiNote if access modes other than plain access are required, clients should
consider using off-heap memory through
{@linkplain java.nio.ByteBuffer#allocateDirect(int) direct byte buffers} or
off-heap {@linkplain java.lang.foreign.MemorySegment memory segments},
or memory segments backed by a
{@linkplain java.lang.foreign.MemorySegment#ofArray(long[]) {@code long[]}},
for which stronger alignment guarantees can be made.

@param viewArrayClass the view array class, with a component type of
type {@code T}
@param byteOrder the endianness of the view array elements, as
stored in the underlying {@code byte} array
@return a VarHandle giving access to elements of a {@code byte[]} array
viewed as if elements corresponding to the components type of the view
array class
@throws NullPointerException if viewArrayClass or byteOrder is null
@throws IllegalArgumentException if viewArrayClass is not an array type
@throws UnsupportedOperationException if the component type of
viewArrayClass is not supported as a variable type
@since 9

## MethodHandles.byteBufferViewVarHandle(Class<?>, ByteOrder)

```java
public static VarHandle byteBufferViewVarHandle(Class<?> viewArrayClass, ByteOrder byteOrder) throws IllegalArgumentException
```

Produces a VarHandle giving access to elements of a {@code ByteBuffer}
viewed as if it were an array of elements of a different primitive
component type to that of {@code byte}, such as {@code int[]} or
{@code long[]}.
The VarHandle's variable type is the component type of
{@code viewArrayClass} and the list of coordinate types is
{@code (ByteBuffer, int)}, where the {@code int} coordinate type
corresponds to an argument that is an index into a {@code byte[]} array.
The returned VarHandle accesses bytes at an index in a
{@code ByteBuffer}, composing bytes to or from a value of the component
type of {@code viewArrayClass} according to the given endianness.
<p>
The supported component types (variables types) are {@code short},
{@code char}, {@code int}, {@code long}, {@code float} and
{@code double}.
<p>
Access will result in a {@code ReadOnlyBufferException} for anything
other than the read access modes if the {@code ByteBuffer} is read-only.
<p>
Access of bytes at a given index will result in an
{@code IndexOutOfBoundsException} if the index is less than {@code 0}
or greater than the {@code ByteBuffer} limit minus the size (in bytes) of
{@code T}.
<p>
For heap byte buffers, access is always unaligned. As a result, only the plain
{@linkplain VarHandle.AccessMode#GET get}
and {@linkplain VarHandle.AccessMode#SET set} access modes are supported by the
returned var handle. For all other access modes, an {@link IllegalStateException}
will be thrown.
<p>
For direct buffers only, access of bytes at an index may be aligned or misaligned for {@code T},
with respect to the underlying memory address, {@code A} say, associated
with the {@code ByteBuffer} and index.
If access is misaligned then access for anything other than the
{@code get} and {@code set} access modes will result in an
{@code IllegalStateException}.  In such cases atomic access is only
guaranteed with respect to the largest power of two that divides the GCD
of {@code A} and the size (in bytes) of {@code T}.
If access is aligned then following access modes are supported and are
guaranteed to support atomic access:
<ul>
<li>read write access modes for all {@code T}.  Access modes {@code get}
    and {@code set} for {@code long} and {@code double} are supported but
    have no atomicity guarantee, as described in Section {@jls 17.7} of
    <cite>The Java Language Specification</cite>.
<li>atomic update access modes for {@code int}, {@code long},
    {@code float} or {@code double}.
    (Future major platform releases of the JDK may support additional
    types for certain currently unsupported access modes.)
<li>numeric atomic update access modes for {@code int} and {@code long}.
    (Future major platform releases of the JDK may support additional
    numeric types for certain currently unsupported access modes.)
<li>bitwise atomic update access modes for {@code int} and {@code long}.
    (Future major platform releases of the JDK may support additional
    numeric types for certain currently unsupported access modes.)
</ul>
<p>
Misaligned access, and therefore atomicity guarantees, may be determined
for a {@code ByteBuffer}, {@code bb} (direct or otherwise), an
{@code index}, {@code T} and its corresponding boxed type,
{@code T_BOX}, as follows:
<pre>{@code
int sizeOfT = T_BOX.BYTES;  // size in bytes of T
ByteBuffer bb = ...
int misalignedAtIndex = bb.alignmentOffset(index, sizeOfT);
boolean isMisaligned = misalignedAtIndex != 0;
}</pre>
<p>
If the variable type is {@code float} or {@code double} then atomic
update access modes compare values using their bitwise representation
(see {@link Float#floatToRawIntBits} and
{@link Double#doubleToRawLongBits}, respectively).
@param viewArrayClass the view array class, with a component type of
type {@code T}
@param byteOrder the endianness of the view array elements, as
stored in the underlying {@code ByteBuffer} (Note this overrides the
endianness of a {@code ByteBuffer})
@return a VarHandle giving access to elements of a {@code ByteBuffer}
viewed as if elements corresponding to the components type of the view
array class
@throws NullPointerException if viewArrayClass or byteOrder is null
@throws IllegalArgumentException if viewArrayClass is not an array type
@throws UnsupportedOperationException if the component type of
viewArrayClass is not supported as a variable type
@since 9

## MethodHandles.spreadInvoker(MethodType, int)

```java
public static MethodHandle spreadInvoker(MethodType type, int leadingArgCount)
```

Produces a method handle which will invoke any method handle of the
given {@code type}, with a given number of trailing arguments replaced by
a single trailing {@code Object[]} array.
The resulting invoker will be a method handle with the following
arguments:
<ul>
<li>a single {@code MethodHandle} target
<li>zero or more leading values (counted by {@code leadingArgCount})
<li>an {@code Object[]} array containing trailing arguments
</ul>
<p>
The invoker will invoke its target like a call to {@link MethodHandle#invoke invoke} with
the indicated {@code type}.
That is, if the target is exactly of the given {@code type}, it will behave
like {@code invokeExact}; otherwise it behave as if {@link MethodHandle#asType asType}
is used to convert the target to the required {@code type}.
<p>
The type of the returned invoker will not be the given {@code type}, but rather
will have all parameters except the first {@code leadingArgCount}
replaced by a single array of type {@code Object[]}, which will be
the final parameter.
<p>
Before invoking its target, the invoker will spread the final array, apply
reference casts as necessary, and unbox and widen primitive arguments.
If, when the invoker is called, the supplied array argument does
not have the correct number of elements, the invoker will throw
an {@link IllegalArgumentException} instead of invoking the target.
<p>
This method is equivalent to the following code (though it may be more efficient):
{@snippet lang="java" :
MethodHandle invoker = MethodHandles.invoker(type);
int spreadArgCount = type.parameterCount() - leadingArgCount;
invoker = invoker.asSpreader(Object[].class, spreadArgCount);
return invoker;
}
This method throws no reflective exceptions.
@param type the desired target type
@param leadingArgCount number of fixed arguments, to be passed unchanged to the target
@return a method handle suitable for invoking any method handle of the given type
@throws NullPointerException if {@code type} is null
@throws IllegalArgumentException if {@code leadingArgCount} is not in
                 the range from 0 to {@code type.parameterCount()} inclusive,
                 or if the resulting method handle's type would have
         <a href="MethodHandle.html#maxarity">too many parameters</a>

## MethodHandles.exactInvoker(MethodType)

```java
public static MethodHandle exactInvoker(MethodType type)
```

Produces a special <em>invoker method handle</em> which can be used to
invoke any method handle of the given type, as if by {@link MethodHandle#invokeExact invokeExact}.
The resulting invoker will have a type which is
exactly equal to the desired type, except that it will accept
an additional leading argument of type {@code MethodHandle}.
<p>
This method is equivalent to the following code (though it may be more efficient):
{@code publicLookup().findVirtual(MethodHandle.class, "invokeExact", type)}

<p style="font-size:smaller;">
<em>Discussion:</em>
Invoker method handles can be useful when working with variable method handles
of unknown types.
For example, to emulate an {@code invokeExact} call to a variable method
handle {@code M}, extract its type {@code T},
look up the invoker method {@code X} for {@code T},
and call the invoker method, as {@code X.invoke(T, A...)}.
(It would not work to call {@code X.invokeExact}, since the type {@code T}
is unknown.)
If spreading, collecting, or other argument transformations are required,
they can be applied once to the invoker {@code X} and reused on many {@code M}
method handle values, as long as they are compatible with the type of {@code X}.
<p style="font-size:smaller;">
<em>(Note:  The invoker method is not available via the Core Reflection API.
An attempt to call {@linkplain java.lang.reflect.Method#invoke java.lang.reflect.Method.invoke}
on the declared {@code invokeExact} or {@code invoke} method will raise an
{@link java.lang.UnsupportedOperationException UnsupportedOperationException}.)</em>
<p>
This method throws no reflective exceptions.
@param type the desired target type
@return a method handle suitable for invoking any method handle of the given type
@throws IllegalArgumentException if the resulting method handle's type would have
         <a href="MethodHandle.html#maxarity">too many parameters</a>

## MethodHandles.invoker(MethodType)

```java
public static MethodHandle invoker(MethodType type)
```

Produces a special <em>invoker method handle</em> which can be used to
invoke any method handle compatible with the given type, as if by {@link MethodHandle#invoke invoke}.
The resulting invoker will have a type which is
exactly equal to the desired type, except that it will accept
an additional leading argument of type {@code MethodHandle}.
<p>
Before invoking its target, if the target differs from the expected type,
the invoker will apply reference casts as
necessary and box, unbox, or widen primitive values, as if by {@link MethodHandle#asType asType}.
Similarly, the return value will be converted as necessary.
If the target is a {@linkplain MethodHandle#asVarargsCollector variable arity method handle},
the required arity conversion will be made, again as if by {@link MethodHandle#asType asType}.
<p>
This method is equivalent to the following code (though it may be more efficient):
{@code publicLookup().findVirtual(MethodHandle.class, "invoke", type)}
<p style="font-size:smaller;">
<em>Discussion:</em>
A {@linkplain MethodType#genericMethodType general method type} is one which
mentions only {@code Object} arguments and return values.
An invoker for such a type is capable of calling any method handle
of the same arity as the general type.
<p style="font-size:smaller;">
<em>(Note:  The invoker method is not available via the Core Reflection API.
An attempt to call {@linkplain java.lang.reflect.Method#invoke java.lang.reflect.Method.invoke}
on the declared {@code invokeExact} or {@code invoke} method will raise an
{@link java.lang.UnsupportedOperationException UnsupportedOperationException}.)</em>
<p>
This method throws no reflective exceptions.
@param type the desired target type
@return a method handle suitable for invoking any method handle convertible to the given type
@throws IllegalArgumentException if the resulting method handle's type would have
         <a href="MethodHandle.html#maxarity">too many parameters</a>

## MethodHandles.varHandleExactInvoker(VarHandle.AccessMode, MethodType)

```java
public static MethodHandle varHandleExactInvoker(VarHandle.AccessMode accessMode, MethodType type)
```

Produces a special <em>invoker method handle</em> which can be used to
invoke a signature-polymorphic access mode method on any VarHandle whose
associated access mode type is compatible with the given type.
The resulting invoker will have a type which is exactly equal to the
desired given type, except that it will accept an additional leading
argument of type {@code VarHandle}.

@param accessMode the VarHandle access mode
@param type the desired target type
@return a method handle suitable for invoking an access mode method of
        any VarHandle whose access mode type is of the given type.
@since 9

## MethodHandles.varHandleInvoker(VarHandle.AccessMode, MethodType)

```java
public static MethodHandle varHandleInvoker(VarHandle.AccessMode accessMode, MethodType type)
```

Produces a special <em>invoker method handle</em> which can be used to
invoke a signature-polymorphic access mode method on any VarHandle whose
associated access mode type is compatible with the given type.
The resulting invoker will have a type which is exactly equal to the
desired given type, except that it will accept an additional leading
argument of type {@code VarHandle}.
<p>
Before invoking its target, if the access mode type differs from the
desired given type, the invoker will apply reference casts as necessary
and box, unbox, or widen primitive values, as if by
{@link MethodHandle#asType asType}.  Similarly, the return value will be
converted as necessary.
<p>
This method is equivalent to the following code (though it may be more
efficient): {@code publicLookup().findVirtual(VarHandle.class, accessMode.name(), type)}

@param accessMode the VarHandle access mode
@param type the desired target type
@return a method handle suitable for invoking an access mode method of
        any VarHandle whose access mode type is convertible to the given
        type.
@since 9

## MethodHandles.explicitCastArguments(MethodHandle, MethodType)

```java
public static MethodHandle explicitCastArguments(MethodHandle target, MethodType newType)
```

Produces a method handle which adapts the type of the
given method handle to a new type by pairwise argument and return type conversion.
The original type and new type must have the same number of arguments.
The resulting method handle is guaranteed to report a type
which is equal to the desired new type.
<p>
If the original type and new type are equal, returns target.
<p>
The same conversions are allowed as for {@link MethodHandle#asType MethodHandle.asType},
and some additional conversions are also applied if those conversions fail.
Given types <em>T0</em>, <em>T1</em>, one of the following conversions is applied
if possible, before or instead of any conversions done by {@code asType}:
<ul>
<li>If <em>T0</em> and <em>T1</em> are references, and <em>T1</em> is an interface type,
    then the value of type <em>T0</em> is passed as a <em>T1</em> without a cast.
    (This treatment of interfaces follows the usage of the bytecode verifier.)
<li>If <em>T0</em> is boolean and <em>T1</em> is another primitive,
    the boolean is converted to a byte value, 1 for true, 0 for false.
    (This treatment follows the usage of the bytecode verifier.)
<li>If <em>T1</em> is boolean and <em>T0</em> is another primitive,
    <em>T0</em> is converted to byte via Java casting conversion (JLS {@jls 5.5}),
    and the low order bit of the result is tested, as if by {@code (x & 1) != 0}.
<li>If <em>T0</em> and <em>T1</em> are primitives other than boolean,
    then a Java casting conversion (JLS {@jls 5.5}) is applied.
    (Specifically, <em>T0</em> will convert to <em>T1</em> by
    widening and/or narrowing.)
<li>If <em>T0</em> is a reference and <em>T1</em> a primitive, an unboxing
    conversion will be applied at runtime, possibly followed
    by a Java casting conversion (JLS {@jls 5.5}) on the primitive value,
    possibly followed by a conversion from byte to boolean by testing
    the low-order bit.
<li>If <em>T0</em> is a reference and <em>T1</em> a primitive,
    and if the reference is null at runtime, a zero value is introduced.
</ul>
@param target the method handle to invoke after arguments are retyped
@param newType the expected type of the new method handle
@return a method handle which delegates to the target after performing
          any necessary argument conversions, and arranges for any
          necessary return value conversions
@throws NullPointerException if either argument is null
@throws WrongMethodTypeException if the conversion cannot be made
@see MethodHandle#asType

## MethodHandles.permuteArguments(MethodHandle, MethodType, int...)

```java
public static MethodHandle permuteArguments(MethodHandle target, MethodType newType, int... reorder)
```

Produces a method handle which adapts the calling sequence of the
given method handle to a new type, by reordering the arguments.
The resulting method handle is guaranteed to report a type
which is equal to the desired new type.
<p>
The given array controls the reordering.
Call {@code #I} the number of incoming parameters (the value
{@code newType.parameterCount()}, and call {@code #O} the number
of outgoing parameters (the value {@code target.type().parameterCount()}).
Then the length of the reordering array must be {@code #O},
and each element must be a non-negative number less than {@code #I}.
For every {@code N} less than {@code #O}, the {@code N}-th
outgoing argument will be taken from the {@code I}-th incoming
argument, where {@code I} is {@code reorder[N]}.
<p>
No argument or return value conversions are applied.
The type of each incoming argument, as determined by {@code newType},
must be identical to the type of the corresponding outgoing parameter
or parameters in the target method handle.
The return type of {@code newType} must be identical to the return
type of the original target.
<p>
The reordering array need not specify an actual permutation.
An incoming argument will be duplicated if its index appears
more than once in the array, and an incoming argument will be dropped
if its index does not appear in the array.
As in the case of {@link #dropArguments(MethodHandle,int,List) dropArguments},
incoming arguments which are not mentioned in the reordering array
may be of any type, as determined only by {@code newType}.
{@snippet lang="java" :
import static java.lang.invoke.MethodHandles.*;
import static java.lang.invoke.MethodType.*;
...
MethodType intfn1 = methodType(int.class, int.class);
MethodType intfn2 = methodType(int.class, int.class, int.class);
MethodHandle sub = ... (int x, int y) -> (x-y) ...;
assert(sub.type().equals(intfn2));
MethodHandle sub1 = permuteArguments(sub, intfn2, 0, 1);
MethodHandle rsub = permuteArguments(sub, intfn2, 1, 0);
assert((int)rsub.invokeExact(1, 100) == 99);
MethodHandle add = ... (int x, int y) -> (x+y) ...;
assert(add.type().equals(intfn2));
MethodHandle twice = permuteArguments(add, intfn1, 0, 0);
assert(twice.type().equals(intfn1));
assert((int)twice.invokeExact(21) == 42);
}
<p>
<em>Note:</em> The resulting adapter is never a {@linkplain MethodHandle#asVarargsCollector
variable-arity method handle}, even if the original target method handle was.
@param target the method handle to invoke after arguments are reordered
@param newType the expected type of the new method handle
@param reorder an index array which controls the reordering
@return a method handle which delegates to the target after it
          drops unused arguments and moves and/or duplicates the other arguments
@throws NullPointerException if any argument is null
@throws IllegalArgumentException if the index array length is not equal to
                 the arity of the target, or if any index array element
                 not a valid index for a parameter of {@code newType},
                 or if two corresponding parameter types in
                 {@code target.type()} and {@code newType} are not identical,

## MethodHandles.constant(Class<?>, Object)

```java
public static MethodHandle constant(Class<?> type, Object value)
```

Produces a method handle of the requested return type which returns the given
constant value every time it is invoked.
<p>
Before the method handle is returned, the passed-in value is converted to the requested type.
If the requested type is primitive, widening primitive conversions are attempted,
else reference conversions are attempted.
<p>The returned method handle is equivalent to {@code identity(type).bindTo(value)}.
@param type the return type of the desired method handle
@param value the value to return
@return a method handle of the given return type and no arguments, which always returns the given value
@throws NullPointerException if the {@code type} argument is null
@throws ClassCastException if the value cannot be converted to the required return type
@throws IllegalArgumentException if the given type is {@code void.class}

## MethodHandles.identity(Class<?>)

```java
public static MethodHandle identity(Class<?> type)
```

Produces a method handle which returns its sole argument when invoked.
@param type the type of the sole parameter and return value of the desired method handle
@return a unary method handle which accepts and returns the given type
@throws NullPointerException if the argument is null
@throws IllegalArgumentException if the given type is {@code void.class}

## MethodHandles.zero(Class<?>)

```java
public static MethodHandle zero(Class<?> type)
```

Produces a constant method handle of the requested return type which
returns the default value for that type every time it is invoked.
The resulting constant method handle will have no side effects.
<p>The returned method handle is equivalent to {@code empty(methodType(type))}.
It is also equivalent to {@code explicitCastArguments(constant(Object.class, null), methodType(type))},
since {@code explicitCastArguments} converts {@code null} to default values.
@param type the expected return type of the desired method handle
@return a constant method handle that takes no arguments
        and returns the default value of the given type (or void, if the type is void)
@throws NullPointerException if the argument is null
@see MethodHandles#constant
@see MethodHandles#empty
@see MethodHandles#explicitCastArguments
@since 9

## MethodHandles.empty(MethodType)

```java
public static MethodHandle empty(MethodType type)
```

Produces a method handle of the requested type which ignores any arguments, does nothing,
and returns a suitable default depending on the return type.
That is, it returns a zero primitive value, a {@code null}, or {@code void}.
<p>The returned method handle is equivalent to
{@code dropArguments(zero(type.returnType()), 0, type.parameterList())}.

@apiNote Given a predicate and target, a useful "if-then" construct can be produced as
{@code guardWithTest(pred, target, empty(target.type())}.
@param type the type of the desired method handle
@return a constant method handle of the given type, which returns a default value of the given return type
@throws NullPointerException if the argument is null
@see MethodHandles#zero(Class)
@see MethodHandles#constant
@since 9

## MethodHandles.insertArguments(MethodHandle, int, Object...)

```java
public static MethodHandle insertArguments(MethodHandle target, int pos, Object... values)
```

Provides a target method handle with one or more <em>bound arguments</em>
in advance of the method handle's invocation.
The formal parameters to the target corresponding to the bound
arguments are called <em>bound parameters</em>.
Returns a new method handle which saves away the bound arguments.
When it is invoked, it receives arguments for any non-bound parameters,
binds the saved arguments to their corresponding parameters,
and calls the original target.
<p>
The type of the new method handle will drop the types for the bound
parameters from the original target type, since the new method handle
will no longer require those arguments to be supplied by its callers.
<p>
Each given argument object must match the corresponding bound parameter type.
If a bound parameter type is a primitive, the argument object
must be a wrapper, and will be unboxed to produce the primitive value.
<p>
The {@code pos} argument selects which parameters are to be bound.
It may range between zero and <i>N-L</i> (inclusively),
where <i>N</i> is the arity of the target method handle
and <i>L</i> is the length of the values array.
<p>
<em>Note:</em> The resulting adapter is never a {@linkplain MethodHandle#asVarargsCollector
variable-arity method handle}, even if the original target method handle was.
@param target the method handle to invoke after the argument is inserted
@param pos where to insert the argument (zero for the first)
@param values the series of arguments to insert
@return a method handle which inserts an additional argument,
        before calling the original method handle
@throws NullPointerException if the target or the {@code values} array is null
@throws IllegalArgumentException if {@code pos} is less than {@code 0} or greater than
        {@code N - L} where {@code N} is the arity of the target method handle and {@code L}
        is the length of the values array.
@throws ClassCastException if an argument does not match the corresponding bound parameter
        type.
@see MethodHandle#bindTo

## MethodHandles.dropArguments(MethodHandle, int, List<Class<?>>)

```java
public static MethodHandle dropArguments(MethodHandle target, int pos, List<Class<?>> valueTypes)
```

Produces a method handle which will discard some dummy arguments
before calling some other specified <i>target</i> method handle.
The type of the new method handle will be the same as the target's type,
except it will also include the dummy argument types,
at some given position.
<p>
The {@code pos} argument may range between zero and <i>N</i>,
where <i>N</i> is the arity of the target.
If {@code pos} is zero, the dummy arguments will precede
the target's real arguments; if {@code pos} is <i>N</i>
they will come after.
<p>
<b>Example:</b>
{@snippet lang="java" :
import static java.lang.invoke.MethodHandles.*;
import static java.lang.invoke.MethodType.*;
...
MethodHandle cat = lookup().findVirtual(String.class,
  "concat", methodType(String.class, String.class));
assertEquals("xy", (String) cat.invokeExact("x", "y"));
MethodType bigType = cat.type().insertParameterTypes(0, int.class, String.class);
MethodHandle d0 = dropArguments(cat, 0, bigType.parameterList().subList(0,2));
assertEquals(bigType, d0.type());
assertEquals("yz", (String) d0.invokeExact(123, "x", "y", "z"));
}
<p>
This method is also equivalent to the following code:
<blockquote><pre>
{@link #dropArguments(MethodHandle,int,Class...) dropArguments}{@code (target, pos, valueTypes.toArray(new Class[0]))}
</pre></blockquote>
@param target the method handle to invoke after the arguments are dropped
@param pos position of first argument to drop (zero for the leftmost)
@param valueTypes the type(s) of the argument(s) to drop
@return a method handle which drops arguments of the given types,
        before calling the original method handle
@throws NullPointerException if the target is null,
                             or if the {@code valueTypes} list or any of its elements is null
@throws IllegalArgumentException if any element of {@code valueTypes} is {@code void.class},
                 or if {@code pos} is negative or greater than the arity of the target,
                 or if the new method handle's type would have too many parameters

## MethodHandles.dropArguments(MethodHandle, int, Class<?>...)

```java
public static MethodHandle dropArguments(MethodHandle target, int pos, Class<?>... valueTypes)
```

Produces a method handle which will discard some dummy arguments
before calling some other specified <i>target</i> method handle.
The type of the new method handle will be the same as the target's type,
except it will also include the dummy argument types,
at some given position.
<p>
The {@code pos} argument may range between zero and <i>N</i>,
where <i>N</i> is the arity of the target.
If {@code pos} is zero, the dummy arguments will precede
the target's real arguments; if {@code pos} is <i>N</i>
they will come after.
@apiNote
{@snippet lang="java" :
import static java.lang.invoke.MethodHandles.*;
import static java.lang.invoke.MethodType.*;
...
MethodHandle cat = lookup().findVirtual(String.class,
  "concat", methodType(String.class, String.class));
assertEquals("xy", (String) cat.invokeExact("x", "y"));
MethodHandle d0 = dropArguments(cat, 0, String.class);
assertEquals("yz", (String) d0.invokeExact("x", "y", "z"));
MethodHandle d1 = dropArguments(cat, 1, String.class);
assertEquals("xz", (String) d1.invokeExact("x", "y", "z"));
MethodHandle d2 = dropArguments(cat, 2, String.class);
assertEquals("xy", (String) d2.invokeExact("x", "y", "z"));
MethodHandle d12 = dropArguments(cat, 1, int.class, boolean.class);
assertEquals("xz", (String) d12.invokeExact("x", 12, true, "z"));
}
<p>
This method is also equivalent to the following code:
<blockquote><pre>
{@link #dropArguments(MethodHandle,int,List) dropArguments}{@code (target, pos, Arrays.asList(valueTypes))}
</pre></blockquote>
@param target the method handle to invoke after the arguments are dropped
@param pos position of first argument to drop (zero for the leftmost)
@param valueTypes the type(s) of the argument(s) to drop
@return a method handle which drops arguments of the given types,
        before calling the original method handle
@throws NullPointerException if the target is null,
                             or if the {@code valueTypes} array or any of its elements is null
@throws IllegalArgumentException if any element of {@code valueTypes} is {@code void.class},
                 or if {@code pos} is negative or greater than the arity of the target,
                 or if the new method handle's type would have
                 <a href="MethodHandle.html#maxarity">too many parameters</a>

## MethodHandles.dropArgumentsToMatch(MethodHandle, int, List<Class<?>>, int)

```java
public static MethodHandle dropArgumentsToMatch(MethodHandle target, int skip, List<Class<?>> newTypes, int pos)
```

Adapts a target method handle to match the given parameter type list. If necessary, adds dummy arguments. Some
leading parameters can be skipped before matching begins. The remaining types in the {@code target}'s parameter
type list must be a sub-list of the {@code newTypes} type list at the starting position {@code pos}. The
resulting handle will have the target handle's parameter type list, with any non-matching parameter types (before
or after the matching sub-list) inserted in corresponding positions of the target's original parameters, as if by
{@link #dropArguments(MethodHandle, int, Class[])}.
<p>
The resulting handle will have the same return type as the target handle.
<p>
In more formal terms, assume these two type lists:<ul>
<li>The target handle has the parameter type list {@code S..., M...}, with as many types in {@code S} as
indicated by {@code skip}. The {@code M} types are those that are supposed to match part of the given type list,
{@code newTypes}.
<li>The {@code newTypes} list contains types {@code P..., M..., A...}, with as many types in {@code P} as
indicated by {@code pos}. The {@code M} types are precisely those that the {@code M} types in the target handle's
parameter type list are supposed to match. The types in {@code A} are additional types found after the matching
sub-list.
</ul>
Given these assumptions, the result of an invocation of {@code dropArgumentsToMatch} will have the parameter type
list {@code S..., P..., M..., A...}, with the {@code P} and {@code A} types inserted as if by
{@link #dropArguments(MethodHandle, int, Class[])}.

@apiNote
Two method handles whose argument lists are "effectively identical" (i.e., identical in a common prefix) may be
mutually converted to a common type by two calls to {@code dropArgumentsToMatch}, as follows:
{@snippet lang="java" :
import static java.lang.invoke.MethodHandles.*;
import static java.lang.invoke.MethodType.*;
...
...
MethodHandle h0 = constant(boolean.class, true);
MethodHandle h1 = lookup().findVirtual(String.class, "concat", methodType(String.class, String.class));
MethodType bigType = h1.type().insertParameterTypes(1, String.class, int.class);
MethodHandle h2 = dropArguments(h1, 0, bigType.parameterList());
if (h1.type().parameterCount() < h2.type().parameterCount())
    h1 = dropArgumentsToMatch(h1, 0, h2.type().parameterList(), 0);  // lengthen h1
else
    h2 = dropArgumentsToMatch(h2, 0, h1.type().parameterList(), 0);    // lengthen h2
MethodHandle h3 = guardWithTest(h0, h1, h2);
assertEquals("xy", h3.invoke("x", "y", 1, "a", "b", "c"));
}
@param target the method handle to adapt
@param skip number of targets parameters to disregard (they will be unchanged)
@param newTypes the list of types to match {@code target}'s parameter type list to
@param pos place in {@code newTypes} where the non-skipped target parameters must occur
@return a possibly adapted method handle
@throws NullPointerException if either argument is null
@throws IllegalArgumentException if any element of {@code newTypes} is {@code void.class},
        or if {@code skip} is negative or greater than the arity of the target,
        or if {@code pos} is negative or greater than the newTypes list size,
        or if {@code newTypes} does not contain the {@code target}'s non-skipped parameter types at position
        {@code pos}.
@since 9

## MethodHandles.dropReturn(MethodHandle)

```java
public static MethodHandle dropReturn(MethodHandle target)
```

Drop the return value of the target handle (if any).
The returned method handle will have a {@code void} return type.

@param target the method handle to adapt
@return a possibly adapted method handle
@throws NullPointerException if {@code target} is null
@since 16

## MethodHandles.filterArguments(MethodHandle, int, MethodHandle...)

```java
public static MethodHandle filterArguments(MethodHandle target, int pos, MethodHandle... filters)
```

Adapts a target method handle by pre-processing
one or more of its arguments, each with its own unary filter function,
and then calling the target with each pre-processed argument
replaced by the result of its corresponding filter function.
<p>
The pre-processing is performed by one or more method handles,
specified in the elements of the {@code filters} array.
The first element of the filter array corresponds to the {@code pos}
argument of the target, and so on in sequence.
The filter functions are invoked in left to right order.
<p>
Null arguments in the array are treated as identity functions,
and the corresponding arguments left unchanged.
(If there are no non-null elements in the array, the original target is returned.)
Each filter is applied to the corresponding argument of the adapter.
<p>
If a filter {@code F} applies to the {@code N}th argument of
the target, then {@code F} must be a method handle which
takes exactly one argument.  The type of {@code F}'s sole argument
replaces the corresponding argument type of the target
in the resulting adapted method handle.
The return type of {@code F} must be identical to the corresponding
parameter type of the target.
<p>
It is an error if there are elements of {@code filters}
(null or not)
which do not correspond to argument positions in the target.
<p><b>Example:</b>
{@snippet lang="java" :
import static java.lang.invoke.MethodHandles.*;
import static java.lang.invoke.MethodType.*;
...
MethodHandle cat = lookup().findVirtual(String.class,
  "concat", methodType(String.class, String.class));
MethodHandle upcase = lookup().findVirtual(String.class,
  "toUpperCase", methodType(String.class));
assertEquals("xy", (String) cat.invokeExact("x", "y"));
MethodHandle f0 = filterArguments(cat, 0, upcase);
assertEquals("Xy", (String) f0.invokeExact("x", "y")); // Xy
MethodHandle f1 = filterArguments(cat, 1, upcase);
assertEquals("xY", (String) f1.invokeExact("x", "y")); // xY
MethodHandle f2 = filterArguments(cat, 0, upcase, upcase);
assertEquals("XY", (String) f2.invokeExact("x", "y")); // XY
}
<p>Here is pseudocode for the resulting adapter. In the code, {@code T}
denotes the return type of both the {@code target} and resulting adapter.
{@code P}/{@code p} and {@code B}/{@code b} represent the types and values
of the parameters and arguments that precede and follow the filter position
{@code pos}, respectively. {@code A[i]}/{@code a[i]} stand for the types and
values of the filtered parameters and arguments; they also represent the
return types of the {@code filter[i]} handles. The latter accept arguments
{@code v[i]} of type {@code V[i]}, which also appear in the signature of
the resulting adapter.
{@snippet lang="java" :
T target(P... p, A[i]... a[i], B... b);
A[i] filter[i](V[i]);
T adapter(P... p, V[i]... v[i], B... b) {
  return target(p..., filter[i](v[i])..., b...);
}
}
<p>
<em>Note:</em> The resulting adapter is never a {@linkplain MethodHandle#asVarargsCollector
variable-arity method handle}, even if the original target method handle was.

@param target the method handle to invoke after arguments are filtered
@param pos the position of the first argument to filter
@param filters method handles to call initially on filtered arguments
@return method handle which incorporates the specified argument filtering logic
@throws NullPointerException if the target is null
                             or if the {@code filters} array is null
@throws IllegalArgumentException if a non-null element of {@code filters}
         does not match a corresponding argument type of target as described above,
         or if the {@code pos+filters.length} is greater than {@code target.type().parameterCount()},
         or if the resulting method handle's type would have
         <a href="MethodHandle.html#maxarity">too many parameters</a>

## MethodHandles.collectArguments(MethodHandle, int, MethodHandle)

```java
public static MethodHandle collectArguments(MethodHandle target, int pos, MethodHandle filter)
```

Adapts a target method handle by pre-processing
a sub-sequence of its arguments with a filter (another method handle).
The pre-processed arguments are replaced by the result (if any) of the
filter function.
The target is then called on the modified (usually shortened) argument list.
<p>
If the filter returns a value, the target must accept that value as
its argument in position {@code pos}, preceded and/or followed by
any arguments not passed to the filter.
If the filter returns void, the target must accept all arguments
not passed to the filter.
No arguments are reordered, and a result returned from the filter
replaces (in order) the whole subsequence of arguments originally
passed to the adapter.
<p>
The argument types (if any) of the filter
replace zero or one argument types of the target, at position {@code pos},
in the resulting adapted method handle.
The return type of the filter (if any) must be identical to the
argument type of the target at position {@code pos}, and that target argument
is supplied by the return value of the filter.
<p>
In all cases, {@code pos} must be greater than or equal to zero, and
{@code pos} must also be less than or equal to the target's arity.
<p><b>Example:</b>
{@snippet lang="java" :
import static java.lang.invoke.MethodHandles.*;
import static java.lang.invoke.MethodType.*;
...
MethodHandle deepToString = publicLookup()
  .findStatic(Arrays.class, "deepToString", methodType(String.class, Object[].class));

MethodHandle ts1 = deepToString.asCollector(String[].class, 1);
assertEquals("[strange]", (String) ts1.invokeExact("strange"));

MethodHandle ts2 = deepToString.asCollector(String[].class, 2);
assertEquals("[up, down]", (String) ts2.invokeExact("up", "down"));

MethodHandle ts3 = deepToString.asCollector(String[].class, 3);
MethodHandle ts3_ts2 = collectArguments(ts3, 1, ts2);
assertEquals("[top, [up, down], strange]",
             (String) ts3_ts2.invokeExact("top", "up", "down", "strange"));

MethodHandle ts3_ts2_ts1 = collectArguments(ts3_ts2, 3, ts1);
assertEquals("[top, [up, down], [strange]]",
             (String) ts3_ts2_ts1.invokeExact("top", "up", "down", "strange"));

MethodHandle ts3_ts2_ts3 = collectArguments(ts3_ts2, 1, ts3);
assertEquals("[top, [[up, down, strange], charm], bottom]",
             (String) ts3_ts2_ts3.invokeExact("top", "up", "down", "strange", "charm", "bottom"));
}
<p>Here is pseudocode for the resulting adapter. In the code, {@code T}
represents the return type of the {@code target} and resulting adapter.
{@code V}/{@code v} stand for the return type and value of the
{@code filter}, which are also found in the signature and arguments of
the {@code target}, respectively, unless {@code V} is {@code void}.
{@code A}/{@code a} and {@code C}/{@code c} represent the parameter types
and values preceding and following the collection position, {@code pos},
in the {@code target}'s signature. They also turn up in the resulting
adapter's signature and arguments, where they surround
{@code B}/{@code b}, which represent the parameter types and arguments
to the {@code filter} (if any).
{@snippet lang="java" :
T target(A...,V,C...);
V filter(B...);
T adapter(A... a,B... b,C... c) {
  V v = filter(b...);
  return target(a...,v,c...);
}
// and if the filter has no arguments:
T target2(A...,V,C...);
V filter2();
T adapter2(A... a,C... c) {
  V v = filter2();
  return target2(a...,v,c...);
}
// and if the filter has a void return:
T target3(A...,C...);
void filter3(B...);
T adapter3(A... a,B... b,C... c) {
  filter3(b...);
  return target3(a...,c...);
}
}
<p>
A collection adapter {@code collectArguments(mh, 0, coll)} is equivalent to
one which first "folds" the affected arguments, and then drops them, in separate
steps as follows:
{@snippet lang="java" :
mh = MethodHandles.dropArguments(mh, 1, coll.type().parameterList()); //step 2
mh = MethodHandles.foldArguments(mh, coll); //step 1
}
If the target method handle consumes no arguments besides than the result
(if any) of the filter {@code coll}, then {@code collectArguments(mh, 0, coll)}
is equivalent to {@code filterReturnValue(coll, mh)}.
If the filter method handle {@code coll} consumes one argument and produces
a non-void result, then {@code collectArguments(mh, N, coll)}
is equivalent to {@code filterArguments(mh, N, coll)}.
Other equivalences are possible but would require argument permutation.
<p>
<em>Note:</em> The resulting adapter is never a {@linkplain MethodHandle#asVarargsCollector
variable-arity method handle}, even if the original target method handle was.

@param target the method handle to invoke after filtering the subsequence of arguments
@param pos the position of the first adapter argument to pass to the filter,
           and/or the target argument which receives the result of the filter
@param filter method handle to call on the subsequence of arguments
@return method handle which incorporates the specified argument subsequence filtering logic
@throws NullPointerException if either argument is null
@throws IllegalArgumentException if the return type of {@code filter}
         is non-void and is not the same as the {@code pos} argument of the target,
         or if {@code pos} is not between 0 and the target's arity, inclusive,
         or if the resulting method handle's type would have
         <a href="MethodHandle.html#maxarity">too many parameters</a>
@see MethodHandles#foldArguments
@see MethodHandles#filterArguments
@see MethodHandles#filterReturnValue

## MethodHandles.filterReturnValue(MethodHandle, MethodHandle)

```java
public static MethodHandle filterReturnValue(MethodHandle target, MethodHandle filter)
```

Adapts a target method handle by post-processing
its return value (if any) with a filter (another method handle).
The result of the filter is returned from the adapter.
<p>
If the target returns a value, the filter must accept that value as
its only argument.
If the target returns void, the filter must accept no arguments.
<p>
The return type of the filter
replaces the return type of the target
in the resulting adapted method handle.
The argument type of the filter (if any) must be identical to the
return type of the target.
<p><b>Example:</b>
{@snippet lang="java" :
import static java.lang.invoke.MethodHandles.*;
import static java.lang.invoke.MethodType.*;
...
MethodHandle cat = lookup().findVirtual(String.class,
  "concat", methodType(String.class, String.class));
MethodHandle length = lookup().findVirtual(String.class,
  "length", methodType(int.class));
System.out.println((String) cat.invokeExact("x", "y")); // xy
MethodHandle f0 = filterReturnValue(cat, length);
System.out.println((int) f0.invokeExact("x", "y")); // 2
}
<p>Here is pseudocode for the resulting adapter. In the code,
{@code T}/{@code t} represent the result type and value of the
{@code target}; {@code V}, the result type of the {@code filter}; and
{@code A}/{@code a}, the types and values of the parameters and arguments
of the {@code target} as well as the resulting adapter.
{@snippet lang="java" :
T target(A...);
V filter(T);
V adapter(A... a) {
  T t = target(a...);
  return filter(t);
}
// and if the target has a void return:
void target2(A...);
V filter2();
V adapter2(A... a) {
  target2(a...);
  return filter2();
}
// and if the filter has a void return:
T target3(A...);
void filter3(V);
void adapter3(A... a) {
  T t = target3(a...);
  filter3(t);
}
}
<p>
<em>Note:</em> The resulting adapter is never a {@linkplain MethodHandle#asVarargsCollector
variable-arity method handle}, even if the original target method handle was.
@param target the method handle to invoke before filtering the return value
@param filter method handle to call on the return value
@return method handle which incorporates the specified return value filtering logic
@throws NullPointerException if either argument is null
@throws IllegalArgumentException if the argument list of {@code filter}
         does not match the return type of target as described above

## MethodHandles.foldArguments(MethodHandle, MethodHandle)

```java
public static MethodHandle foldArguments(MethodHandle target, MethodHandle combiner)
```

Adapts a target method handle by pre-processing
some of its arguments, and then calling the target with
the result of the pre-processing, inserted into the original
sequence of arguments.
<p>
The pre-processing is performed by {@code combiner}, a second method handle.
Of the arguments passed to the adapter, the first {@code N} arguments
are copied to the combiner, which is then called.
(Here, {@code N} is defined as the parameter count of the combiner.)
After this, control passes to the target, with any result
from the combiner inserted before the original {@code N} incoming
arguments.
<p>
If the combiner returns a value, the first parameter type of the target
must be identical with the return type of the combiner, and the next
{@code N} parameter types of the target must exactly match the parameters
of the combiner.
<p>
If the combiner has a void return, no result will be inserted,
and the first {@code N} parameter types of the target
must exactly match the parameters of the combiner.
<p>
The resulting adapter is the same type as the target, except that the
first parameter type is dropped,
if it corresponds to the result of the combiner.
<p>
(Note that {@link #dropArguments(MethodHandle,int,List) dropArguments} can be used to remove any arguments
that either the combiner or the target does not wish to receive.
If some of the incoming arguments are destined only for the combiner,
consider using {@link MethodHandle#asCollector asCollector} instead, since those
arguments will not need to be live on the stack on entry to the
target.)
<p><b>Example:</b>
{@snippet lang="java" :
import static java.lang.invoke.MethodHandles.*;
import static java.lang.invoke.MethodType.*;
...
MethodHandle trace = publicLookup().findVirtual(java.io.PrintStream.class,
  "println", methodType(void.class, String.class))
    .bindTo(System.out);
MethodHandle cat = lookup().findVirtual(String.class,
  "concat", methodType(String.class, String.class));
assertEquals("boojum", (String) cat.invokeExact("boo", "jum"));
MethodHandle catTrace = foldArguments(cat, trace);
// also prints "boo":
assertEquals("boojum", (String) catTrace.invokeExact("boo", "jum"));
}
<p>Here is pseudocode for the resulting adapter. In the code, {@code T}
represents the result type of the {@code target} and resulting adapter.
{@code V}/{@code v} represent the type and value of the parameter and argument
of {@code target} that precedes the folding position; {@code V} also is
the result type of the {@code combiner}. {@code A}/{@code a} denote the
types and values of the {@code N} parameters and arguments at the folding
position. {@code B}/{@code b} represent the types and values of the
{@code target} parameters and arguments that follow the folded parameters
and arguments.
{@snippet lang="java" :
// there are N arguments in A...
T target(V, A[N]..., B...);
V combiner(A...);
T adapter(A... a, B... b) {
  V v = combiner(a...);
  return target(v, a..., b...);
}
// and if the combiner has a void return:
T target2(A[N]..., B...);
void combiner2(A...);
T adapter2(A... a, B... b) {
  combiner2(a...);
  return target2(a..., b...);
}
}
<p>
<em>Note:</em> The resulting adapter is never a {@linkplain MethodHandle#asVarargsCollector
variable-arity method handle}, even if the original target method handle was.
@param target the method handle to invoke after arguments are combined
@param combiner method handle to call initially on the incoming arguments
@return method handle which incorporates the specified argument folding logic
@throws NullPointerException if either argument is null
@throws IllegalArgumentException if {@code combiner}'s return type
         is non-void and not the same as the first argument type of
         the target, or if the initial {@code N} argument types
         of the target
         (skipping one matching the {@code combiner}'s return type)
         are not identical with the argument types of {@code combiner}

## MethodHandles.foldArguments(MethodHandle, int, MethodHandle)

```java
public static MethodHandle foldArguments(MethodHandle target, int pos, MethodHandle combiner)
```

Adapts a target method handle by pre-processing some of its arguments, starting at a given position, and then
calling the target with the result of the pre-processing, inserted into the original sequence of arguments just
before the folded arguments.
<p>
This method is closely related to {@link #foldArguments(MethodHandle, MethodHandle)}, but allows to control the
position in the parameter list at which folding takes place. The argument controlling this, {@code pos}, is a
zero-based index. The aforementioned method {@link #foldArguments(MethodHandle, MethodHandle)} assumes position
0.

@apiNote Example:
{@snippet lang="java" :
    import static java.lang.invoke.MethodHandles.*;
    import static java.lang.invoke.MethodType.*;
    ...
    MethodHandle trace = publicLookup().findVirtual(java.io.PrintStream.class,
    "println", methodType(void.class, String.class))
    .bindTo(System.out);
    MethodHandle cat = lookup().findVirtual(String.class,
    "concat", methodType(String.class, String.class));
    assertEquals("boojum", (String) cat.invokeExact("boo", "jum"));
    MethodHandle catTrace = foldArguments(cat, 1, trace);
    // also prints "jum":
    assertEquals("boojum", (String) catTrace.invokeExact("boo", "jum"));
}
<p>Here is pseudocode for the resulting adapter. In the code, {@code T}
represents the result type of the {@code target} and resulting adapter.
{@code V}/{@code v} represent the type and value of the parameter and argument
of {@code target} that precedes the folding position; {@code V} also is
the result type of the {@code combiner}. {@code A}/{@code a} denote the
types and values of the {@code N} parameters and arguments at the folding
position. {@code Z}/{@code z} and {@code B}/{@code b} represent the types
and values of the {@code target} parameters and arguments that precede and
follow the folded parameters and arguments starting at {@code pos},
respectively.
{@snippet lang="java" :
// there are N arguments in A...
T target(Z..., V, A[N]..., B...);
V combiner(A...);
T adapter(Z... z, A... a, B... b) {
  V v = combiner(a...);
  return target(z..., v, a..., b...);
}
// and if the combiner has a void return:
T target2(Z..., A[N]..., B...);
void combiner2(A...);
T adapter2(Z... z, A... a, B... b) {
  combiner2(a...);
  return target2(z..., a..., b...);
}
}
<p>
<em>Note:</em> The resulting adapter is never a {@linkplain MethodHandle#asVarargsCollector
variable-arity method handle}, even if the original target method handle was.

@param target the method handle to invoke after arguments are combined
@param pos the position at which to start folding and at which to insert the folding result; if this is {@code
           0}, the effect is the same as for {@link #foldArguments(MethodHandle, MethodHandle)}.
@param combiner method handle to call initially on the incoming arguments
@return method handle which incorporates the specified argument folding logic
@throws NullPointerException if either argument is null
@throws IllegalArgumentException if either of the following two conditions holds:
         (1) {@code combiner}'s return type is non-{@code void} and not the same as the argument type at position
             {@code pos} of the target signature;
         (2) the {@code N} argument types at position {@code pos} of the target signature (skipping one matching
             the {@code combiner}'s return type) are not identical with the argument types of {@code combiner}.

@see #foldArguments(MethodHandle, MethodHandle)
@since 9

## MethodHandles.filterArgumentsWithCombiner(MethodHandle, int, MethodHandle, int ...)

```java
/*non-public*/ static MethodHandle filterArgumentsWithCombiner(MethodHandle target, int position, MethodHandle combiner, int ... argPositions)
```

Adapts a target method handle by pre-processing some of its arguments, then calling the target with the result
of the pre-processing replacing the argument at the given position.

@param target the method handle to invoke after arguments are combined
@param position the position at which to start folding and at which to insert the folding result; if this is {@code
           0}, the effect is the same as for {@link #foldArguments(MethodHandle, MethodHandle)}.
@param combiner method handle to call initially on the incoming arguments
@param argPositions indexes of the target to pick arguments sent to the combiner from
@return method handle which incorporates the specified argument folding logic
@throws NullPointerException if either argument is null
@throws IllegalArgumentException if either of the following two conditions holds:
         (1) {@code combiner}'s return type is not the same as the argument type at position
             {@code pos} of the target signature;
         (2) the {@code N} argument types at positions {@code argPositions[1...N]} of the target signature are
             not identical with the argument types of {@code combiner}.

## MethodHandles.foldArgumentsWithCombiner(MethodHandle, int, MethodHandle, int ...)

```java
/*non-public*/ static MethodHandle foldArgumentsWithCombiner(MethodHandle target, int position, MethodHandle combiner, int ... argPositions)
```

Adapts a target method handle by pre-processing some of its arguments, calling the target with the result of
the pre-processing inserted into the original sequence of arguments at the given position.

@param target the method handle to invoke after arguments are combined
@param position the position at which to start folding and at which to insert the folding result; if this is {@code
           0}, the effect is the same as for {@link #foldArguments(MethodHandle, MethodHandle)}.
@param combiner method handle to call initially on the incoming arguments
@param argPositions indexes of the target to pick arguments sent to the combiner from
@return method handle which incorporates the specified argument folding logic
@throws NullPointerException if either argument is null
@throws IllegalArgumentException if either of the following two conditions holds:
         (1) {@code combiner}'s return type is non-{@code void} and not the same as the argument type at position
             {@code pos} of the target signature;
         (2) the {@code N} argument types at positions {@code argPositions[1...N]} of the target signature
             (skipping {@code position} where the {@code combiner}'s return will be folded in) are not identical
             with the argument types of {@code combiner}.

## MethodHandles.guardWithTest(MethodHandle, MethodHandle, MethodHandle)

```java
public static MethodHandle guardWithTest(MethodHandle test, MethodHandle target, MethodHandle fallback)
```

Makes a method handle which adapts a target method handle,
by guarding it with a test, a boolean-valued method handle.
If the guard fails, a fallback handle is called instead.
All three method handles must have the same corresponding
argument and return types, except that the return type
of the test must be boolean, and the test is allowed
to have fewer arguments than the other two method handles.
<p>
Here is pseudocode for the resulting adapter. In the code, {@code T}
represents the uniform result type of the three involved handles;
{@code A}/{@code a}, the types and values of the {@code target}
parameters and arguments that are consumed by the {@code test}; and
{@code B}/{@code b}, those types and values of the {@code target}
parameters and arguments that are not consumed by the {@code test}.
{@snippet lang="java" :
boolean test(A...);
T target(A...,B...);
T fallback(A...,B...);
T adapter(A... a,B... b) {
  if (test(a...))
    return target(a..., b...);
  else
    return fallback(a..., b...);
}
}
Note that the test arguments ({@code a...} in the pseudocode) cannot
be modified by execution of the test, and so are passed unchanged
from the caller to the target or fallback as appropriate.
@param test method handle used for test, must return boolean
@param target method handle to call if test passes
@param fallback method handle to call if test fails
@return method handle which incorporates the specified if/then/else logic
@throws NullPointerException if any argument is null
@throws IllegalArgumentException if {@code test} does not return boolean,
         or if all three method types do not match (with the return
         type of {@code test} changed to match that of the target).

## MethodHandles.catchException(MethodHandle, Class<? extends Throwable>, MethodHandle)

```java
public static MethodHandle catchException(MethodHandle target, Class<? extends Throwable> exType, MethodHandle handler)
```

Makes a method handle which adapts a target method handle,
by running it inside an exception handler.
If the target returns normally, the adapter returns that value.
If an exception matching the specified type is thrown, the fallback
handle is called instead on the exception, plus the original arguments.
<p>
The target and handler must have the same corresponding
argument and return types, except that handler may omit trailing arguments
(similarly to the predicate in {@link #guardWithTest guardWithTest}).
Also, the handler must have an extra leading parameter of {@code exType} or a supertype.
<p>
Here is pseudocode for the resulting adapter. In the code, {@code T}
represents the return type of the {@code target} and {@code handler},
and correspondingly that of the resulting adapter; {@code A}/{@code a},
the types and values of arguments to the resulting handle consumed by
{@code handler}; and {@code B}/{@code b}, those of arguments to the
resulting handle discarded by {@code handler}.
{@snippet lang="java" :
T target(A..., B...);
T handler(ExType, A...);
T adapter(A... a, B... b) {
  try {
    return target(a..., b...);
  } catch (ExType ex) {
    return handler(ex, a...);
  }
}
}
Note that the saved arguments ({@code a...} in the pseudocode) cannot
be modified by execution of the target, and so are passed unchanged
from the caller to the handler, if the handler is invoked.
<p>
The target and handler must return the same type, even if the handler
always throws.  (This might happen, for instance, because the handler
is simulating a {@code finally} clause).
To create such a throwing handler, compose the handler creation logic
with {@link #throwException throwException},
in order to create a method handle of the correct return type.
@param target method handle to call
@param exType the type of exception which the handler will catch
@param handler method handle to call if a matching exception is thrown
@return method handle which incorporates the specified try/catch logic
@throws NullPointerException if any argument is null
@throws IllegalArgumentException if {@code handler} does not accept
         the given exception type, or if the method handle types do
         not match in their return types and their
         corresponding parameters
@see MethodHandles#tryFinally(MethodHandle, MethodHandle)

## MethodHandles.throwException(Class<?>, Class<? extends Throwable>)

```java
public static MethodHandle throwException(Class<?> returnType, Class<? extends Throwable> exType)
```

Produces a method handle which will throw exceptions of the given {@code exType}.
The method handle will accept a single argument of {@code exType},
and immediately throw it as an exception.
The method type will nominally specify a return of {@code returnType}.
The return type may be anything convenient:  It doesn't matter to the
method handle's behavior, since it will never return normally.
@param returnType the return type of the desired method handle
@param exType the parameter type of the desired method handle
@return method handle which can throw the given exceptions
@throws NullPointerException if either argument is null

## MethodHandles.loop(MethodHandle[]...)

```java
public static MethodHandle loop(MethodHandle[]... clauses)
```

Constructs a method handle representing a loop with several loop variables that are updated and checked upon each
iteration. Upon termination of the loop due to one of the predicates, a corresponding finalizer is run and
delivers the loop's result, which is the return value of the resulting handle.
<p>
Intuitively, every loop is formed by one or more "clauses", each specifying a local <em>iteration variable</em> and/or a loop
exit. Each iteration of the loop executes each clause in order. A clause can optionally update its iteration
variable; it can also optionally perform a test and conditional loop exit. In order to express this logic in
terms of method handles, each clause will specify up to four independent actions:<ul>
<li><em>init:</em> Before the loop executes, the initialization of an iteration variable {@code v} of type {@code V}.
<li><em>step:</em> When a clause executes, an update step for the iteration variable {@code v}.
<li><em>pred:</em> When a clause executes, a predicate execution to test for loop exit.
<li><em>fini:</em> If a clause causes a loop exit, a finalizer execution to compute the loop's return value.
</ul>
The full sequence of all iteration variable types, in clause order, will be notated as {@code (V...)}.
The values themselves will be {@code (v...)}.  When we speak of "parameter lists", we will usually
be referring to types, but in some contexts (describing execution) the lists will be of actual values.
<p>
Some of these clause parts may be omitted according to certain rules, and useful default behavior is provided in
this case. See below for a detailed description.
<p>
<em>Parameters optional everywhere:</em>
Each clause function is allowed but not required to accept a parameter for each iteration variable {@code v}.
As an exception, the init functions cannot take any {@code v} parameters,
because those values are not yet computed when the init functions are executed.
Any clause function may neglect to take any trailing subsequence of parameters it is entitled to take.
In fact, any clause function may take no arguments at all.
<p>
<em>Loop parameters:</em>
A clause function may take all the iteration variable values it is entitled to, in which case
it may also take more trailing parameters. Such extra values are called <em>loop parameters</em>,
with their types and values notated as {@code (A...)} and {@code (a...)}.
These become the parameters of the resulting loop handle, to be supplied whenever the loop is executed.
(Since init functions do not accept iteration variables {@code v}, any parameter to an
init function is automatically a loop parameter {@code a}.)
As with iteration variables, clause functions are allowed but not required to accept loop parameters.
These loop parameters act as loop-invariant values visible across the whole loop.
<p>
<em>Parameters visible everywhere:</em>
Each non-init clause function is permitted to observe the entire loop state, because it can be passed the full
list {@code (v... a...)} of current iteration variable values and incoming loop parameters.
The init functions can observe initial pre-loop state, in the form {@code (a...)}.
Most clause functions will not need all of this information, but they will be formally connected to it
as if by {@link #dropArguments}.
<a id="astar"></a>
More specifically, we shall use the notation {@code (V*)} to express an arbitrary prefix of a full
sequence {@code (V...)} (and likewise for {@code (v*)}, {@code (A*)}, {@code (a*)}).
In that notation, the general form of an init function parameter list
is {@code (A*)}, and the general form of a non-init function parameter list is {@code (V*)} or {@code (V... A*)}.
<p>
<em>Checking clause structure:</em>
Given a set of clauses, there is a number of checks and adjustments performed to connect all the parts of the
loop. They are spelled out in detail in the steps below. In these steps, every occurrence of the word "must"
corresponds to a place where {@link IllegalArgumentException} will be thrown if the required constraint is not
met by the inputs to the loop combinator.
<p>
<em>Effectively identical sequences:</em>
<a id="effid"></a>
A parameter list {@code A} is defined to be <em>effectively identical</em> to another parameter list {@code B}
if {@code A} and {@code B} are identical, or if {@code A} is shorter and is identical with a proper prefix of {@code B}.
When speaking of an unordered set of parameter lists, we say they the set is "effectively identical"
as a whole if the set contains a longest list, and all members of the set are effectively identical to
that longest list.
For example, any set of type sequences of the form {@code (V*)} is effectively identical,
and the same is true if more sequences of the form {@code (V... A*)} are added.
<p>
<em>Step 0: Determine clause structure.</em><ol type="a">
<li>The clause array (of type {@code MethodHandle[][]}) must be non-{@code null} and contain at least one element.
<li>The clause array may not contain {@code null}s or sub-arrays longer than four elements.
<li>Clauses shorter than four elements are treated as if they were padded by {@code null} elements to length
four. Padding takes place by appending elements to the array.
<li>Clauses with all {@code null}s are disregarded.
<li>Each clause is treated as a four-tuple of functions, called "init", "step", "pred", and "fini".
</ol>
<p>
<em>Step 1A: Determine iteration variable types {@code (V...)}.</em><ol type="a">
<li>The iteration variable type for each clause is determined using the clause's init and step return types.
<li>If both functions are omitted, there is no iteration variable for the corresponding clause ({@code void} is
used as the type to indicate that). If one of them is omitted, the other's return type defines the clause's
iteration variable type. If both are given, the common return type (they must be identical) defines the clause's
iteration variable type.
<li>Form the list of return types (in clause order), omitting all occurrences of {@code void}.
<li>This list of types is called the "iteration variable types" ({@code (V...)}).
</ol>
<p>
<em>Step 1B: Determine loop parameters {@code (A...)}.</em><ul>
<li>Examine and collect init function parameter lists (which are of the form {@code (A*)}).
<li>Examine and collect the suffixes of the step, pred, and fini parameter lists, after removing the iteration variable types.
(They must have the form {@code (V... A*)}; collect the {@code (A*)} parts only.)
<li>Do not collect suffixes from step, pred, and fini parameter lists that do not begin with all the iteration variable types.
(These types will be checked in step 2, along with all the clause function types.)
<li>Omitted clause functions are ignored.  (Equivalently, they are deemed to have empty parameter lists.)
<li>All of the collected parameter lists must be effectively identical.
<li>The longest parameter list (which is necessarily unique) is called the "external parameter list" ({@code (A...)}).
<li>If there is no such parameter list, the external parameter list is taken to be the empty sequence.
<li>The combined list consisting of iteration variable types followed by the external parameter types is called
the "internal parameter list".
</ul>
<p>
<em>Step 1C: Determine loop return type.</em><ol type="a">
<li>Examine fini function return types, disregarding omitted fini functions.
<li>If there are no fini functions, the loop return type is {@code void}.
<li>Otherwise, the common return type {@code R} of the fini functions (their return types must be identical) defines the loop return
type.
</ol>
<p>
<em>Step 1D: Check other types.</em><ol type="a">
<li>There must be at least one non-omitted pred function.
<li>Every non-omitted pred function must have a {@code boolean} return type.
</ol>
<p>
<em>Step 2: Determine parameter lists.</em><ol type="a">
<li>The parameter list for the resulting loop handle will be the external parameter list {@code (A...)}.
<li>The parameter list for init functions will be adjusted to the external parameter list.
(Note that their parameter lists are already effectively identical to this list.)
<li>The parameter list for every non-omitted, non-init (step, pred, and fini) function must be
effectively identical to the internal parameter list {@code (V... A...)}.
</ol>
<p>
<em>Step 3: Fill in omitted functions.</em><ol type="a">
<li>If an init function is omitted, use a {@linkplain #empty default value} for the clause's iteration variable
type.
<li>If a step function is omitted, use an {@linkplain #identity identity function} of the clause's iteration
variable type; insert dropped argument parameters before the identity function parameter for the non-{@code void}
iteration variables of preceding clauses. (This will turn the loop variable into a local loop invariant.)
<li>If a pred function is omitted, use a constant {@code true} function. (This will keep the loop going, as far
as this clause is concerned.  Note that in such cases the corresponding fini function is unreachable.)
<li>If a fini function is omitted, use a {@linkplain #empty default value} for the
loop return type.
</ol>
<p>
<em>Step 4: Fill in missing parameter types.</em><ol type="a">
<li>At this point, every init function parameter list is effectively identical to the external parameter list {@code (A...)},
but some lists may be shorter. For every init function with a short parameter list, pad out the end of the list.
<li>At this point, every non-init function parameter list is effectively identical to the internal parameter
list {@code (V... A...)}, but some lists may be shorter. For every non-init function with a short parameter list,
pad out the end of the list.
<li>Argument lists are padded out by {@linkplain #dropArgumentsToMatch(MethodHandle, int, List, int) dropping unused trailing arguments}.
</ol>
<p>
<em>Final observations.</em><ol type="a">
<li>After these steps, all clauses have been adjusted by supplying omitted functions and arguments.
<li>All init functions have a common parameter type list {@code (A...)}, which the final loop handle will also have.
<li>All fini functions have a common return type {@code R}, which the final loop handle will also have.
<li>All non-init functions have a common parameter type list {@code (V... A...)}, of
(non-{@code void}) iteration variables {@code V} followed by loop parameters.
<li>Each pair of init and step functions agrees in their return type {@code V}.
<li>Each non-init function will be able to observe the current values {@code (v...)} of all iteration variables.
<li>Every function will be able to observe the incoming values {@code (a...)} of all loop parameters.
</ol>
<p>
<em>Example.</em> As a consequence of step 1A above, the {@code loop} combinator has the following property:
<ul>
<li>Given {@code N} clauses {@code Cn = {null, Sn, Pn}} with {@code n = 1..N}.
<li>Suppose predicate handles {@code Pn} are either {@code null} or have no parameters.
(Only one {@code Pn} has to be non-{@code null}.)
<li>Suppose step handles {@code Sn} have signatures {@code (B1..BX)Rn}, for some constant {@code X>=N}.
<li>Suppose {@code Q} is the count of non-void types {@code Rn}, and {@code (V1...VQ)} is the sequence of those types.
<li>It must be that {@code Vn == Bn} for {@code n = 1..min(X,Q)}.
<li>The parameter types {@code Vn} will be interpreted as loop-local state elements {@code (V...)}.
<li>Any remaining types {@code BQ+1..BX} (if {@code Q<X}) will determine
the resulting loop handle's parameter types {@code (A...)}.
</ul>
In this example, the loop handle parameters {@code (A...)} were derived from the step functions,
which is natural if most of the loop computation happens in the steps.  For some loops,
the burden of computation might be heaviest in the pred functions, and so the pred functions
might need to accept the loop parameter values.  For loops with complex exit logic, the fini
functions might need to accept loop parameters, and likewise for loops with complex entry logic,
where the init functions will need the extra parameters.  For such reasons, the rules for
determining these parameters are as symmetric as possible, across all clause parts.
In general, the loop parameters function as common invariant values across the whole
loop, while the iteration variables function as common variant values, or (if there is
no step function) as internal loop invariant temporaries.
<p>
<em>Loop execution.</em><ol type="a">
<li>When the loop is called, the loop input values are saved in locals, to be passed to
every clause function. These locals are loop invariant.
<li>Each init function is executed in clause order (passing the external arguments {@code (a...)})
and the non-{@code void} values are saved (as the iteration variables {@code (v...)}) into locals.
These locals will be loop varying (unless their steps behave as identity functions, as noted above).
<li>All function executions (except init functions) will be passed the internal parameter list, consisting of
the non-{@code void} iteration values {@code (v...)} (in clause order) and then the loop inputs {@code (a...)}
(in argument order).
<li>The step and pred functions are then executed, in clause order (step before pred), until a pred function
returns {@code false}.
<li>The non-{@code void} result from a step function call is used to update the corresponding value in the
sequence {@code (v...)} of loop variables.
The updated value is immediately visible to all subsequent function calls.
<li>If a pred function returns {@code false}, the corresponding fini function is called, and the resulting value
(of type {@code R}) is returned from the loop as a whole.
<li>If all the pred functions always return true, no fini function is ever invoked, and the loop cannot exit
except by throwing an exception.
</ol>
<p>
<em>Usage tips.</em>
<ul>
<li>Although each step function will receive the current values of <em>all</em> the loop variables,
sometimes a step function only needs to observe the current value of its own variable.
In that case, the step function may need to explicitly {@linkplain #dropArguments drop all preceding loop variables}.
This will require mentioning their types, in an expression like {@code dropArguments(step, 0, V0.class, ...)}.
<li>Loop variables are not required to vary; they can be loop invariant.  A clause can create
a loop invariant by a suitable init function with no step, pred, or fini function.  This may be
useful to "wire" an incoming loop argument into the step or pred function of an adjacent loop variable.
<li>If some of the clause functions are virtual methods on an instance, the instance
itself can be conveniently placed in an initial invariant loop "variable", using an initial clause
like {@code new MethodHandle[]{identity(ObjType.class)}}.  In that case, the instance reference
will be the first iteration variable value, and it will be easy to use virtual
methods as clause parts, since all of them will take a leading instance reference matching that value.
</ul>
<p>
Here is pseudocode for the resulting loop handle. As above, {@code V} and {@code v} represent the types
and values of loop variables; {@code A} and {@code a} represent arguments passed to the whole loop;
and {@code R} is the common result type of all finalizers as well as of the resulting loop.
{@snippet lang="java" :
V... init...(A...);
boolean pred...(V..., A...);
V... step...(V..., A...);
R fini...(V..., A...);
R loop(A... a) {
  V... v... = init...(a...);
  for (;;) {
    for ((v, p, s, f) in (v..., pred..., step..., fini...)) {
      v = s(v..., a...);
      if (!p(v..., a...)) {
        return f(v..., a...);
      }
    }
  }
}
}
Note that the parameter type lists {@code (V...)} and {@code (A...)} have been expanded
to their full length, even though individual clause functions may neglect to take them all.
As noted above, missing parameters are filled in as if by {@link #dropArgumentsToMatch(MethodHandle, int, List, int)}.

@apiNote Example:
{@snippet lang="java" :
// iterative implementation of the factorial function as a loop handle
static int one(int k) { return 1; }
static int inc(int i, int acc, int k) { return i + 1; }
static int mult(int i, int acc, int k) { return i * acc; }
static boolean pred(int i, int acc, int k) { return i < k; }
static int fin(int i, int acc, int k) { return acc; }
// assume MH_one, MH_inc, MH_mult, MH_pred, and MH_fin are handles to the above methods
// null initializer for counter, should initialize to 0
MethodHandle[] counterClause = new MethodHandle[]{null, MH_inc};
MethodHandle[] accumulatorClause = new MethodHandle[]{MH_one, MH_mult, MH_pred, MH_fin};
MethodHandle loop = MethodHandles.loop(counterClause, accumulatorClause);
assertEquals(120, loop.invoke(5));
}
The same example, dropping arguments and using combinators:
{@snippet lang="java" :
// simplified implementation of the factorial function as a loop handle
static int inc(int i) { return i + 1; } // drop acc, k
static int mult(int i, int acc) { return i * acc; } //drop k
static boolean cmp(int i, int k) { return i < k; }
// assume MH_inc, MH_mult, and MH_cmp are handles to the above methods
// null initializer for counter, should initialize to 0
MethodHandle MH_one = MethodHandles.constant(int.class, 1);
MethodHandle MH_pred = MethodHandles.dropArguments(MH_cmp, 1, int.class); // drop acc
MethodHandle MH_fin = MethodHandles.dropArguments(MethodHandles.identity(int.class), 0, int.class); // drop i
MethodHandle[] counterClause = new MethodHandle[]{null, MH_inc};
MethodHandle[] accumulatorClause = new MethodHandle[]{MH_one, MH_mult, MH_pred, MH_fin};
MethodHandle loop = MethodHandles.loop(counterClause, accumulatorClause);
assertEquals(720, loop.invoke(6));
}
A similar example, using a helper object to hold a loop parameter:
{@snippet lang="java" :
// instance-based implementation of the factorial function as a loop handle
static class FacLoop {
  final int k;
  FacLoop(int k) { this.k = k; }
  int inc(int i) { return i + 1; }
  int mult(int i, int acc) { return i * acc; }
  boolean pred(int i) { return i < k; }
  int fin(int i, int acc) { return acc; }
}
// assume MH_FacLoop is a handle to the constructor
// assume MH_inc, MH_mult, MH_pred, and MH_fin are handles to the above methods
// null initializer for counter, should initialize to 0
MethodHandle MH_one = MethodHandles.constant(int.class, 1);
MethodHandle[] instanceClause = new MethodHandle[]{MH_FacLoop};
MethodHandle[] counterClause = new MethodHandle[]{null, MH_inc};
MethodHandle[] accumulatorClause = new MethodHandle[]{MH_one, MH_mult, MH_pred, MH_fin};
MethodHandle loop = MethodHandles.loop(instanceClause, counterClause, accumulatorClause);
assertEquals(5040, loop.invoke(7));
}

@param clauses an array of arrays (4-tuples) of {@link MethodHandle}s adhering to the rules described above.

@return a method handle embodying the looping behavior as defined by the arguments.

@throws IllegalArgumentException in case any of the constraints described above is violated.

@see MethodHandles#whileLoop(MethodHandle, MethodHandle, MethodHandle)
@see MethodHandles#doWhileLoop(MethodHandle, MethodHandle, MethodHandle)
@see MethodHandles#countedLoop(MethodHandle, MethodHandle, MethodHandle)
@see MethodHandles#iteratedLoop(MethodHandle, MethodHandle, MethodHandle)
@since 9

## MethodHandles.whileLoop(MethodHandle, MethodHandle, MethodHandle)

```java
public static MethodHandle whileLoop(MethodHandle init, MethodHandle pred, MethodHandle body)
```

Constructs a {@code while} loop from an initializer, a body, and a predicate.
This is a convenience wrapper for the {@linkplain #loop(MethodHandle[][]) generic loop combinator}.
<p>
The {@code pred} handle describes the loop condition; and {@code body}, its body. The loop resulting from this
method will, in each iteration, first evaluate the predicate and then execute its body (if the predicate
evaluates to {@code true}).
The loop will terminate once the predicate evaluates to {@code false} (the body will not be executed in this case).
<p>
The {@code init} handle describes the initial value of an additional optional loop-local variable.
In each iteration, this loop-local variable, if present, will be passed to the {@code body}
and updated with the value returned from its invocation. The result of loop execution will be
the final value of the additional loop-local variable (if present).
<p>
The following rules hold for these argument handles:<ul>
<li>The {@code body} handle must not be {@code null}; its type must be of the form
{@code (V A...)V}, where {@code V} is non-{@code void}, or else {@code (A...)void}.
(In the {@code void} case, we assign the type {@code void} to the name {@code V},
and we will write {@code (V A...)V} with the understanding that a {@code void} type {@code V}
is quietly dropped from the parameter list, leaving {@code (A...)V}.)
<li>The parameter list {@code (V A...)} of the body is called the <em>internal parameter list</em>.
It will constrain the parameter lists of the other loop parts.
<li>If the iteration variable type {@code V} is dropped from the internal parameter list, the resulting shorter
list {@code (A...)} is called the <em>external parameter list</em>.
<li>The body return type {@code V}, if non-{@code void}, determines the type of an
additional state variable of the loop.
The body must both accept and return a value of this type {@code V}.
<li>If {@code init} is non-{@code null}, it must have return type {@code V}.
Its parameter list (of some <a href="MethodHandles.html#astar">form {@code (A*)}</a>) must be
<a href="MethodHandles.html#effid">effectively identical</a>
to the external parameter list {@code (A...)}.
<li>If {@code init} is {@code null}, the loop variable will be initialized to its
{@linkplain #empty default value}.
<li>The {@code pred} handle must not be {@code null}.  It must have {@code boolean} as its return type.
Its parameter list (either empty or of the form {@code (V A*)}) must be
effectively identical to the internal parameter list.
</ul>
<p>
The resulting loop handle's result type and parameter signature are determined as follows:<ul>
<li>The loop handle's result type is the result type {@code V} of the body.
<li>The loop handle's parameter types are the types {@code (A...)},
from the external parameter list.
</ul>
<p>
Here is pseudocode for the resulting loop handle. In the code, {@code V}/{@code v} represent the type / value of
the sole loop variable as well as the result type of the loop; and {@code A}/{@code a}, that of the argument
passed to the loop.
{@snippet lang="java" :
V init(A...);
boolean pred(V, A...);
V body(V, A...);
V whileLoop(A... a...) {
  V v = init(a...);
  while (pred(v, a...)) {
    v = body(v, a...);
  }
  return v;
}
}

@apiNote Example:
{@snippet lang="java" :
// implement the zip function for lists as a loop handle
static List<String> initZip(Iterator<String> a, Iterator<String> b) { return new ArrayList<>(); }
static boolean zipPred(List<String> zip, Iterator<String> a, Iterator<String> b) { return a.hasNext() && b.hasNext(); }
static List<String> zipStep(List<String> zip, Iterator<String> a, Iterator<String> b) {
  zip.add(a.next());
  zip.add(b.next());
  return zip;
}
// assume MH_initZip, MH_zipPred, and MH_zipStep are handles to the above methods
MethodHandle loop = MethodHandles.whileLoop(MH_initZip, MH_zipPred, MH_zipStep);
List<String> a = Arrays.asList("a", "b", "c", "d");
List<String> b = Arrays.asList("e", "f", "g", "h");
List<String> zipped = Arrays.asList("a", "e", "b", "f", "c", "g", "d", "h");
assertEquals(zipped, (List<String>) loop.invoke(a.iterator(), b.iterator()));
}


@apiNote The implementation of this method can be expressed as follows:
{@snippet lang="java" :
MethodHandle whileLoop(MethodHandle init, MethodHandle pred, MethodHandle body) {
    MethodHandle fini = (body.type().returnType() == void.class
                        ? null : identity(body.type().returnType()));
    MethodHandle[]
        checkExit = { null, null, pred, fini },
        varBody   = { init, body };
    return loop(checkExit, varBody);
}
}

@param init optional initializer, providing the initial value of the loop variable.
            May be {@code null}, implying a default initial value.  See above for other constraints.
@param pred condition for the loop, which may not be {@code null}. Its result type must be {@code boolean}. See
            above for other constraints.
@param body body of the loop, which may not be {@code null}. It controls the loop parameters and result type.
            See above for other constraints.

@return a method handle implementing the {@code while} loop as described by the arguments.
@throws IllegalArgumentException if the rules for the arguments are violated.
@throws NullPointerException if {@code pred} or {@code body} are {@code null}.

@see #loop(MethodHandle[][])
@see #doWhileLoop(MethodHandle, MethodHandle, MethodHandle)
@since 9

## MethodHandles.doWhileLoop(MethodHandle, MethodHandle, MethodHandle)

```java
public static MethodHandle doWhileLoop(MethodHandle init, MethodHandle body, MethodHandle pred)
```

Constructs a {@code do-while} loop from an initializer, a body, and a predicate.
This is a convenience wrapper for the {@linkplain #loop(MethodHandle[][]) generic loop combinator}.
<p>
The {@code pred} handle describes the loop condition; and {@code body}, its body. The loop resulting from this
method will, in each iteration, first execute its body and then evaluate the predicate.
The loop will terminate once the predicate evaluates to {@code false} after an execution of the body.
<p>
The {@code init} handle describes the initial value of an additional optional loop-local variable.
In each iteration, this loop-local variable, if present, will be passed to the {@code body}
and updated with the value returned from its invocation. The result of loop execution will be
the final value of the additional loop-local variable (if present).
<p>
The following rules hold for these argument handles:<ul>
<li>The {@code body} handle must not be {@code null}; its type must be of the form
{@code (V A...)V}, where {@code V} is non-{@code void}, or else {@code (A...)void}.
(In the {@code void} case, we assign the type {@code void} to the name {@code V},
and we will write {@code (V A...)V} with the understanding that a {@code void} type {@code V}
is quietly dropped from the parameter list, leaving {@code (A...)V}.)
<li>The parameter list {@code (V A...)} of the body is called the <em>internal parameter list</em>.
It will constrain the parameter lists of the other loop parts.
<li>If the iteration variable type {@code V} is dropped from the internal parameter list, the resulting shorter
list {@code (A...)} is called the <em>external parameter list</em>.
<li>The body return type {@code V}, if non-{@code void}, determines the type of an
additional state variable of the loop.
The body must both accept and return a value of this type {@code V}.
<li>If {@code init} is non-{@code null}, it must have return type {@code V}.
Its parameter list (of some <a href="MethodHandles.html#astar">form {@code (A*)}</a>) must be
<a href="MethodHandles.html#effid">effectively identical</a>
to the external parameter list {@code (A...)}.
<li>If {@code init} is {@code null}, the loop variable will be initialized to its
{@linkplain #empty default value}.
<li>The {@code pred} handle must not be {@code null}.  It must have {@code boolean} as its return type.
Its parameter list (either empty or of the form {@code (V A*)}) must be
effectively identical to the internal parameter list.
</ul>
<p>
The resulting loop handle's result type and parameter signature are determined as follows:<ul>
<li>The loop handle's result type is the result type {@code V} of the body.
<li>The loop handle's parameter types are the types {@code (A...)},
from the external parameter list.
</ul>
<p>
Here is pseudocode for the resulting loop handle. In the code, {@code V}/{@code v} represent the type / value of
the sole loop variable as well as the result type of the loop; and {@code A}/{@code a}, that of the argument
passed to the loop.
{@snippet lang="java" :
V init(A...);
boolean pred(V, A...);
V body(V, A...);
V doWhileLoop(A... a...) {
  V v = init(a...);
  do {
    v = body(v, a...);
  } while (pred(v, a...));
  return v;
}
}

@apiNote Example:
{@snippet lang="java" :
// int i = 0; while (i < limit) { ++i; } return i; => limit
static int zero(int limit) { return 0; }
static int step(int i, int limit) { return i + 1; }
static boolean pred(int i, int limit) { return i < limit; }
// assume MH_zero, MH_step, and MH_pred are handles to the above methods
MethodHandle loop = MethodHandles.doWhileLoop(MH_zero, MH_step, MH_pred);
assertEquals(23, loop.invoke(23));
}


@apiNote The implementation of this method can be expressed as follows:
{@snippet lang="java" :
MethodHandle doWhileLoop(MethodHandle init, MethodHandle body, MethodHandle pred) {
    MethodHandle fini = (body.type().returnType() == void.class
                        ? null : identity(body.type().returnType()));
    MethodHandle[] clause = { init, body, pred, fini };
    return loop(clause);
}
}

@param init optional initializer, providing the initial value of the loop variable.
            May be {@code null}, implying a default initial value.  See above for other constraints.
@param body body of the loop, which may not be {@code null}. It controls the loop parameters and result type.
            See above for other constraints.
@param pred condition for the loop, which may not be {@code null}. Its result type must be {@code boolean}. See
            above for other constraints.

@return a method handle implementing the {@code while} loop as described by the arguments.
@throws IllegalArgumentException if the rules for the arguments are violated.
@throws NullPointerException if {@code pred} or {@code body} are {@code null}.

@see #loop(MethodHandle[][])
@see #whileLoop(MethodHandle, MethodHandle, MethodHandle)
@since 9

## MethodHandles.countedLoop(MethodHandle, MethodHandle, MethodHandle)

```java
public static MethodHandle countedLoop(MethodHandle iterations, MethodHandle init, MethodHandle body)
```

Constructs a loop that runs a given number of iterations.
This is a convenience wrapper for the {@linkplain #loop(MethodHandle[][]) generic loop combinator}.
<p>
The number of iterations is determined by the {@code iterations} handle evaluation result.
The loop counter {@code i} is an extra loop iteration variable of type {@code int}.
It will be initialized to 0 and incremented by 1 in each iteration.
<p>
If the {@code body} handle returns a non-{@code void} type {@code V}, a leading loop iteration variable
of that type is also present.  This variable is initialized using the optional {@code init} handle,
or to the {@linkplain #empty default value} of type {@code V} if that handle is {@code null}.
<p>
In each iteration, the iteration variables are passed to an invocation of the {@code body} handle.
A non-{@code void} value returned from the body (of type {@code V}) updates the leading
iteration variable.
The result of the loop handle execution will be the final {@code V} value of that variable
(or {@code void} if there is no {@code V} variable).
<p>
The following rules hold for the argument handles:<ul>
<li>The {@code iterations} handle must not be {@code null}, and must return
the type {@code int}, referred to here as {@code I} in parameter type lists.
<li>The {@code body} handle must not be {@code null}; its type must be of the form
{@code (V I A...)V}, where {@code V} is non-{@code void}, or else {@code (I A...)void}.
(In the {@code void} case, we assign the type {@code void} to the name {@code V},
and we will write {@code (V I A...)V} with the understanding that a {@code void} type {@code V}
is quietly dropped from the parameter list, leaving {@code (I A...)V}.)
<li>The parameter list {@code (V I A...)} of the body contributes to a list
of types called the <em>internal parameter list</em>.
It will constrain the parameter lists of the other loop parts.
<li>As a special case, if the body contributes only {@code V} and {@code I} types,
with no additional {@code A} types, then the internal parameter list is extended by
the argument types {@code A...} of the {@code iterations} handle.
<li>If the iteration variable types {@code (V I)} are dropped from the internal parameter list, the resulting shorter
list {@code (A...)} is called the <em>external parameter list</em>.
<li>The body return type {@code V}, if non-{@code void}, determines the type of an
additional state variable of the loop.
The body must both accept a leading parameter and return a value of this type {@code V}.
<li>If {@code init} is non-{@code null}, it must have return type {@code V}.
Its parameter list (of some <a href="MethodHandles.html#astar">form {@code (A*)}</a>) must be
<a href="MethodHandles.html#effid">effectively identical</a>
to the external parameter list {@code (A...)}.
<li>If {@code init} is {@code null}, the loop variable will be initialized to its
{@linkplain #empty default value}.
<li>The parameter list of {@code iterations} (of some form {@code (A*)}) must be
effectively identical to the external parameter list {@code (A...)}.
</ul>
<p>
The resulting loop handle's result type and parameter signature are determined as follows:<ul>
<li>The loop handle's result type is the result type {@code V} of the body.
<li>The loop handle's parameter types are the types {@code (A...)},
from the external parameter list.
</ul>
<p>
Here is pseudocode for the resulting loop handle. In the code, {@code V}/{@code v} represent the type / value of
the second loop variable as well as the result type of the loop; and {@code A...}/{@code a...} represent
arguments passed to the loop.
{@snippet lang="java" :
int iterations(A...);
V init(A...);
V body(V, int, A...);
V countedLoop(A... a...) {
  int end = iterations(a...);
  V v = init(a...);
  for (int i = 0; i < end; ++i) {
    v = body(v, i, a...);
  }
  return v;
}
}

@apiNote Example with a fully conformant body method:
{@snippet lang="java" :
// String s = "Lambdaman!"; for (int i = 0; i < 13; ++i) { s = "na " + s; } return s;
// => a variation on a well known theme
static String step(String v, int counter, String init) { return "na " + v; }
// assume MH_step is a handle to the method above
MethodHandle fit13 = MethodHandles.constant(int.class, 13);
MethodHandle start = MethodHandles.identity(String.class);
MethodHandle loop = MethodHandles.countedLoop(fit13, start, MH_step);
assertEquals("na na na na na na na na na na na na na Lambdaman!", loop.invoke("Lambdaman!"));
}

@apiNote Example with the simplest possible body method type,
and passing the number of iterations to the loop invocation:
{@snippet lang="java" :
// String s = "Lambdaman!"; for (int i = 0; i < 13; ++i) { s = "na " + s; } return s;
// => a variation on a well known theme
static String step(String v, int counter ) { return "na " + v; }
// assume MH_step is a handle to the method above
MethodHandle count = MethodHandles.dropArguments(MethodHandles.identity(int.class), 1, String.class);
MethodHandle start = MethodHandles.dropArguments(MethodHandles.identity(String.class), 0, int.class);
MethodHandle loop = MethodHandles.countedLoop(count, start, MH_step);  // (v, i) -> "na " + v
assertEquals("na na na na na na na na na na na na na Lambdaman!", loop.invoke(13, "Lambdaman!"));
}

@apiNote Example that treats the number of iterations, string to append to, and string to append
as loop parameters:
{@snippet lang="java" :
// String s = "Lambdaman!", t = "na"; for (int i = 0; i < 13; ++i) { s = t + " " + s; } return s;
// => a variation on a well known theme
static String step(String v, int counter, int iterations_, String pre, String start_) { return pre + " " + v; }
// assume MH_step is a handle to the method above
MethodHandle count = MethodHandles.identity(int.class);
MethodHandle start = MethodHandles.dropArguments(MethodHandles.identity(String.class), 0, int.class, String.class);
MethodHandle loop = MethodHandles.countedLoop(count, start, MH_step);  // (v, i, _, pre, _) -> pre + " " + v
assertEquals("na na na na na na na na na na na na na Lambdaman!", loop.invoke(13, "na", "Lambdaman!"));
}

@apiNote Example that illustrates the usage of {@link #dropArgumentsToMatch(MethodHandle, int, List, int)}
to enforce a loop type:
{@snippet lang="java" :
// String s = "Lambdaman!", t = "na"; for (int i = 0; i < 13; ++i) { s = t + " " + s; } return s;
// => a variation on a well known theme
static String step(String v, int counter, String pre) { return pre + " " + v; }
// assume MH_step is a handle to the method above
MethodType loopType = methodType(String.class, String.class, int.class, String.class);
MethodHandle count = MethodHandles.dropArgumentsToMatch(MethodHandles.identity(int.class),    0, loopType.parameterList(), 1);
MethodHandle start = MethodHandles.dropArgumentsToMatch(MethodHandles.identity(String.class), 0, loopType.parameterList(), 2);
MethodHandle body  = MethodHandles.dropArgumentsToMatch(MH_step,                              2, loopType.parameterList(), 0);
MethodHandle loop = MethodHandles.countedLoop(count, start, body);  // (v, i, pre, _, _) -> pre + " " + v
assertEquals("na na na na na na na na na na na na na Lambdaman!", loop.invoke("na", 13, "Lambdaman!"));
}

@apiNote The implementation of this method can be expressed as follows:
{@snippet lang="java" :
MethodHandle countedLoop(MethodHandle iterations, MethodHandle init, MethodHandle body) {
    return countedLoop(empty(iterations.type()), iterations, init, body);
}
}

@param iterations a non-{@code null} handle to return the number of iterations this loop should run. The handle's
                  result type must be {@code int}. See above for other constraints.
@param init optional initializer, providing the initial value of the loop variable.
            May be {@code null}, implying a default initial value.  See above for other constraints.
@param body body of the loop, which may not be {@code null}.
            It controls the loop parameters and result type in the standard case (see above for details).
            It must accept its own return type (if non-void) plus an {@code int} parameter (for the counter),
            and may accept any number of additional types.
            See above for other constraints.

@return a method handle representing the loop.
@throws NullPointerException if either of the {@code iterations} or {@code body} handles is {@code null}.
@throws IllegalArgumentException if any argument violates the rules formulated above.

@see #countedLoop(MethodHandle, MethodHandle, MethodHandle, MethodHandle)
@since 9

## MethodHandles.countedLoop(MethodHandle, MethodHandle, MethodHandle, MethodHandle)

```java
public static MethodHandle countedLoop(MethodHandle start, MethodHandle end, MethodHandle init, MethodHandle body)
```

Constructs a loop that counts over a range of numbers.
This is a convenience wrapper for the {@linkplain #loop(MethodHandle[][]) generic loop combinator}.
<p>
The loop counter {@code i} is a loop iteration variable of type {@code int}.
The {@code start} and {@code end} handles determine the start (inclusive) and end (exclusive)
values of the loop counter.
The loop counter will be initialized to the {@code int} value returned from the evaluation of the
{@code start} handle and run to the value returned from {@code end} (exclusively) with a step width of 1.
<p>
If the {@code body} handle returns a non-{@code void} type {@code V}, a leading loop iteration variable
of that type is also present.  This variable is initialized using the optional {@code init} handle,
or to the {@linkplain #empty default value} of type {@code V} if that handle is {@code null}.
<p>
In each iteration, the iteration variables are passed to an invocation of the {@code body} handle.
A non-{@code void} value returned from the body (of type {@code V}) updates the leading
iteration variable.
The result of the loop handle execution will be the final {@code V} value of that variable
(or {@code void} if there is no {@code V} variable).
<p>
The following rules hold for the argument handles:<ul>
<li>The {@code start} and {@code end} handles must not be {@code null}, and must both return
the common type {@code int}, referred to here as {@code I} in parameter type lists.
<li>The {@code body} handle must not be {@code null}; its type must be of the form
{@code (V I A...)V}, where {@code V} is non-{@code void}, or else {@code (I A...)void}.
(In the {@code void} case, we assign the type {@code void} to the name {@code V},
and we will write {@code (V I A...)V} with the understanding that a {@code void} type {@code V}
is quietly dropped from the parameter list, leaving {@code (I A...)V}.)
<li>The parameter list {@code (V I A...)} of the body contributes to a list
of types called the <em>internal parameter list</em>.
It will constrain the parameter lists of the other loop parts.
<li>As a special case, if the body contributes only {@code V} and {@code I} types,
with no additional {@code A} types, then the internal parameter list is extended by
the argument types {@code A...} of the {@code end} handle.
<li>If the iteration variable types {@code (V I)} are dropped from the internal parameter list, the resulting shorter
list {@code (A...)} is called the <em>external parameter list</em>.
<li>The body return type {@code V}, if non-{@code void}, determines the type of an
additional state variable of the loop.
The body must both accept a leading parameter and return a value of this type {@code V}.
<li>If {@code init} is non-{@code null}, it must have return type {@code V}.
Its parameter list (of some <a href="MethodHandles.html#astar">form {@code (A*)}</a>) must be
<a href="MethodHandles.html#effid">effectively identical</a>
to the external parameter list {@code (A...)}.
<li>If {@code init} is {@code null}, the loop variable will be initialized to its
{@linkplain #empty default value}.
<li>The parameter list of {@code start} (of some form {@code (A*)}) must be
effectively identical to the external parameter list {@code (A...)}.
<li>Likewise, the parameter list of {@code end} must be effectively identical
to the external parameter list.
</ul>
<p>
The resulting loop handle's result type and parameter signature are determined as follows:<ul>
<li>The loop handle's result type is the result type {@code V} of the body.
<li>The loop handle's parameter types are the types {@code (A...)},
from the external parameter list.
</ul>
<p>
Here is pseudocode for the resulting loop handle. In the code, {@code V}/{@code v} represent the type / value of
the second loop variable as well as the result type of the loop; and {@code A...}/{@code a...} represent
arguments passed to the loop.
{@snippet lang="java" :
int start(A...);
int end(A...);
V init(A...);
V body(V, int, A...);
V countedLoop(A... a...) {
  int e = end(a...);
  int s = start(a...);
  V v = init(a...);
  for (int i = s; i < e; ++i) {
    v = body(v, i, a...);
  }
  return v;
}
}

@apiNote The implementation of this method can be expressed as follows:
{@snippet lang="java" :
MethodHandle countedLoop(MethodHandle start, MethodHandle end, MethodHandle init, MethodHandle body) {
    MethodHandle returnVar = dropArguments(identity(init.type().returnType()), 0, int.class, int.class);
    // assume MH_increment and MH_predicate are handles to implementation-internal methods with
    // the following semantics:
    // MH_increment: (int limit, int counter) -> counter + 1
    // MH_predicate: (int limit, int counter) -> counter < limit
    Class<?> counterType = start.type().returnType();  // int
    Class<?> returnType = body.type().returnType();
    MethodHandle incr = MH_increment, pred = MH_predicate, retv = null;
    if (returnType != void.class) {  // ignore the V variable
        incr = dropArguments(incr, 1, returnType);  // (limit, v, i) => (limit, i)
        pred = dropArguments(pred, 1, returnType);  // ditto
        retv = dropArguments(identity(returnType), 0, counterType); // ignore limit
    }
    body = dropArguments(body, 0, counterType);  // ignore the limit variable
    MethodHandle[]
        loopLimit  = { end, null, pred, retv }, // limit = end(); i < limit || return v
        bodyClause = { init, body },            // v = init(); v = body(v, i)
        indexVar   = { start, incr };           // i = start(); i = i + 1
    return loop(loopLimit, bodyClause, indexVar);
}
}

@param start a non-{@code null} handle to return the start value of the loop counter, which must be {@code int}.
             See above for other constraints.
@param end a non-{@code null} handle to return the end value of the loop counter (the loop will run to
           {@code end-1}). The result type must be {@code int}. See above for other constraints.
@param init optional initializer, providing the initial value of the loop variable.
            May be {@code null}, implying a default initial value.  See above for other constraints.
@param body body of the loop, which may not be {@code null}.
            It controls the loop parameters and result type in the standard case (see above for details).
            It must accept its own return type (if non-void) plus an {@code int} parameter (for the counter),
            and may accept any number of additional types.
            See above for other constraints.

@return a method handle representing the loop.
@throws NullPointerException if any of the {@code start}, {@code end}, or {@code body} handles is {@code null}.
@throws IllegalArgumentException if any argument violates the rules formulated above.

@see #countedLoop(MethodHandle, MethodHandle, MethodHandle)
@since 9

## MethodHandles.iteratedLoop(MethodHandle, MethodHandle, MethodHandle)

```java
public static MethodHandle iteratedLoop(MethodHandle iterator, MethodHandle init, MethodHandle body)
```

Constructs a loop that ranges over the values produced by an {@code Iterator<T>}.
This is a convenience wrapper for the {@linkplain #loop(MethodHandle[][]) generic loop combinator}.
<p>
The iterator itself will be determined by the evaluation of the {@code iterator} handle.
Each value it produces will be stored in a loop iteration variable of type {@code T}.
<p>
If the {@code body} handle returns a non-{@code void} type {@code V}, a leading loop iteration variable
of that type is also present.  This variable is initialized using the optional {@code init} handle,
or to the {@linkplain #empty default value} of type {@code V} if that handle is {@code null}.
<p>
In each iteration, the iteration variables are passed to an invocation of the {@code body} handle.
A non-{@code void} value returned from the body (of type {@code V}) updates the leading
iteration variable.
The result of the loop handle execution will be the final {@code V} value of that variable
(or {@code void} if there is no {@code V} variable).
<p>
The following rules hold for the argument handles:<ul>
<li>The {@code body} handle must not be {@code null}; its type must be of the form
{@code (V T A...)V}, where {@code V} is non-{@code void}, or else {@code (T A...)void}.
(In the {@code void} case, we assign the type {@code void} to the name {@code V},
and we will write {@code (V T A...)V} with the understanding that a {@code void} type {@code V}
is quietly dropped from the parameter list, leaving {@code (T A...)V}.)
<li>The parameter list {@code (V T A...)} of the body contributes to a list
of types called the <em>internal parameter list</em>.
It will constrain the parameter lists of the other loop parts.
<li>As a special case, if the body contributes only {@code V} and {@code T} types,
with no additional {@code A} types, then the internal parameter list is extended by
the argument types {@code A...} of the {@code iterator} handle; if it is {@code null} the
single type {@code Iterable} is added and constitutes the {@code A...} list.
<li>If the iteration variable types {@code (V T)} are dropped from the internal parameter list, the resulting shorter
list {@code (A...)} is called the <em>external parameter list</em>.
<li>The body return type {@code V}, if non-{@code void}, determines the type of an
additional state variable of the loop.
The body must both accept a leading parameter and return a value of this type {@code V}.
<li>If {@code init} is non-{@code null}, it must have return type {@code V}.
Its parameter list (of some <a href="MethodHandles.html#astar">form {@code (A*)}</a>) must be
<a href="MethodHandles.html#effid">effectively identical</a>
to the external parameter list {@code (A...)}.
<li>If {@code init} is {@code null}, the loop variable will be initialized to its
{@linkplain #empty default value}.
<li>If the {@code iterator} handle is non-{@code null}, it must have the return
type {@code java.util.Iterator} or a subtype thereof.
The iterator it produces when the loop is executed will be assumed
to yield values which can be converted to type {@code T}.
<li>The parameter list of an {@code iterator} that is non-{@code null} (of some form {@code (A*)}) must be
effectively identical to the external parameter list {@code (A...)}.
<li>If {@code iterator} is {@code null} it defaults to a method handle which behaves
like {@link java.lang.Iterable#iterator()}.  In that case, the internal parameter list
{@code (V T A...)} must have at least one {@code A} type, and the default iterator
handle parameter is adjusted to accept the leading {@code A} type, as if by
the {@link MethodHandle#asType asType} conversion method.
The leading {@code A} type must be {@code Iterable} or a subtype thereof.
This conversion step, done at loop construction time, must not throw a {@code WrongMethodTypeException}.
</ul>
<p>
The type {@code T} may be either a primitive or reference.
Since type {@code Iterator<T>} is erased in the method handle representation to the raw type {@code Iterator},
the {@code iteratedLoop} combinator adjusts the leading argument type for {@code body} to {@code Object}
as if by the {@link MethodHandle#asType asType} conversion method.
Therefore, if an iterator of the wrong type appears as the loop is executed, runtime exceptions may occur
as the result of dynamic conversions performed by {@link MethodHandle#asType(MethodType)}.
<p>
The resulting loop handle's result type and parameter signature are determined as follows:<ul>
<li>The loop handle's result type is the result type {@code V} of the body.
<li>The loop handle's parameter types are the types {@code (A...)},
from the external parameter list.
</ul>
<p>
Here is pseudocode for the resulting loop handle. In the code, {@code V}/{@code v} represent the type / value of
the loop variable as well as the result type of the loop; {@code T}/{@code t}, that of the elements of the
structure the loop iterates over, and {@code A...}/{@code a...} represent arguments passed to the loop.
{@snippet lang="java" :
Iterator<T> iterator(A...);  // defaults to Iterable::iterator
V init(A...);
V body(V,T,A...);
V iteratedLoop(A... a...) {
  Iterator<T> it = iterator(a...);
  V v = init(a...);
  while (it.hasNext()) {
    T t = it.next();
    v = body(v, t, a...);
  }
  return v;
}
}

@apiNote Example:
{@snippet lang="java" :
// get an iterator from a list
static List<String> reverseStep(List<String> r, String e) {
  r.add(0, e);
  return r;
}
static List<String> newArrayList() { return new ArrayList<>(); }
// assume MH_reverseStep and MH_newArrayList are handles to the above methods
MethodHandle loop = MethodHandles.iteratedLoop(null, MH_newArrayList, MH_reverseStep);
List<String> list = Arrays.asList("a", "b", "c", "d", "e");
List<String> reversedList = Arrays.asList("e", "d", "c", "b", "a");
assertEquals(reversedList, (List<String>) loop.invoke(list));
}

@apiNote The implementation of this method can be expressed approximately as follows:
{@snippet lang="java" :
MethodHandle iteratedLoop(MethodHandle iterator, MethodHandle init, MethodHandle body) {
    // assume MH_next, MH_hasNext, MH_startIter are handles to methods of Iterator/Iterable
    Class<?> returnType = body.type().returnType();
    Class<?> ttype = body.type().parameterType(returnType == void.class ? 0 : 1);
    MethodHandle nextVal = MH_next.asType(MH_next.type().changeReturnType(ttype));
    MethodHandle retv = null, step = body, startIter = iterator;
    if (returnType != void.class) {
        // the simple thing first:  in (I V A...), drop the I to get V
        retv = dropArguments(identity(returnType), 0, Iterator.class);
        // body type signature (V T A...), internal loop types (I V A...)
        step = swapArguments(body, 0, 1);  // swap V <-> T
    }
    if (startIter == null)  startIter = MH_getIter;
    MethodHandle[]
        iterVar    = { startIter, null, MH_hasNext, retv }, // it = iterator; while (it.hasNext())
        bodyClause = { init, filterArguments(step, 0, nextVal) };  // v = body(v, t, a)
    return loop(iterVar, bodyClause);
}
}

@param iterator an optional handle to return the iterator to start the loop.
                If non-{@code null}, the handle must return {@link java.util.Iterator} or a subtype.
                See above for other constraints.
@param init optional initializer, providing the initial value of the loop variable.
            May be {@code null}, implying a default initial value.  See above for other constraints.
@param body body of the loop, which may not be {@code null}.
            It controls the loop parameters and result type in the standard case (see above for details).
            It must accept its own return type (if non-void) plus a {@code T} parameter (for the iterated values),
            and may accept any number of additional types.
            See above for other constraints.

@return a method handle embodying the iteration loop functionality.
@throws NullPointerException if the {@code body} handle is {@code null}.
@throws IllegalArgumentException if any argument violates the above requirements.

@since 9

## MethodHandles.tryFinally(MethodHandle, MethodHandle)

```java
public static MethodHandle tryFinally(MethodHandle target, MethodHandle cleanup)
```

Makes a method handle that adapts a {@code target} method handle by wrapping it in a {@code try-finally} block.
Another method handle, {@code cleanup}, represents the functionality of the {@code finally} block. Any exception
thrown during the execution of the {@code target} handle will be passed to the {@code cleanup} handle. The
exception will be rethrown, unless {@code cleanup} handle throws an exception first.  The
value returned from the {@code cleanup} handle's execution will be the result of the execution of the
{@code try-finally} handle.
<p>
The {@code cleanup} handle will be passed one or two additional leading arguments.
The first is the exception thrown during the
execution of the {@code target} handle, or {@code null} if no exception was thrown.
The second is the result of the execution of the {@code target} handle, or, if it throws an exception,
a {@code null}, zero, or {@code false} value of the required type is supplied as a placeholder.
The second argument is not present if the {@code target} handle has a {@code void} return type.
(Note that, except for argument type conversions, combinators represent {@code void} values in parameter lists
by omitting the corresponding paradoxical arguments, not by inserting {@code null} or zero values.)
<p>
The {@code target} and {@code cleanup} handles must have the same corresponding argument and return types, except
that the {@code cleanup} handle may omit trailing arguments. Also, the {@code cleanup} handle must have one or
two extra leading parameters:<ul>
<li>a {@code Throwable}, which will carry the exception thrown by the {@code target} handle (if any); and
<li>a parameter of the same type as the return type of both {@code target} and {@code cleanup}, which will carry
the result from the execution of the {@code target} handle.
This parameter is not present if the {@code target} returns {@code void}.
</ul>
<p>
The pseudocode for the resulting adapter looks as follows. In the code, {@code V} represents the result type of
the {@code try/finally} construct; {@code A}/{@code a}, the types and values of arguments to the resulting
handle consumed by the cleanup; and {@code B}/{@code b}, those of arguments to the resulting handle discarded by
the cleanup.
{@snippet lang="java" :
V target(A..., B...);
V cleanup(Throwable, V, A...);
V adapter(A... a, B... b) {
  V result = (zero value for V);
  Throwable throwable = null;
  try {
    result = target(a..., b...);
  } catch (Throwable t) {
    throwable = t;
    throw t;
  } finally {
    result = cleanup(throwable, result, a...);
  }
  return result;
}
}
<p>
Note that the saved arguments ({@code a...} in the pseudocode) cannot
be modified by execution of the target, and so are passed unchanged
from the caller to the cleanup, if it is invoked.
<p>
The target and cleanup must return the same type, even if the cleanup
always throws.
To create such a throwing cleanup, compose the cleanup logic
with {@link #throwException throwException},
in order to create a method handle of the correct return type.
<p>
Note that {@code tryFinally} never converts exceptions into normal returns.
In rare cases where exceptions must be converted in that way, first wrap
the target with {@link #catchException(MethodHandle, Class, MethodHandle)}
to capture an outgoing exception, and then wrap with {@code tryFinally}.
<p>
It is recommended that the first parameter type of {@code cleanup} be
declared {@code Throwable} rather than a narrower subtype.  This ensures
{@code cleanup} will always be invoked with whatever exception that
{@code target} throws.  Declaring a narrower type may result in a
{@code ClassCastException} being thrown by the {@code try-finally}
handle if the type of the exception thrown by {@code target} is not
assignable to the first parameter type of {@code cleanup}.  Note that
various exception types of {@code VirtualMachineError},
{@code LinkageError}, and {@code RuntimeException} can in principle be
thrown by almost any kind of Java code, and a finally clause that
catches (say) only {@code IOException} would mask any of the others
behind a {@code ClassCastException}.

@param target the handle whose execution is to be wrapped in a {@code try} block.
@param cleanup the handle that is invoked in the finally block.

@return a method handle embodying the {@code try-finally} block composed of the two arguments.
@throws NullPointerException if any argument is null
@throws IllegalArgumentException if {@code cleanup} does not accept
         the required leading arguments, or if the method handle types do
         not match in their return types and their
         corresponding trailing parameters

@see MethodHandles#catchException(MethodHandle, Class, MethodHandle)
@since 9

## MethodHandles.tableSwitch(MethodHandle, MethodHandle...)

```java
public static MethodHandle tableSwitch(MethodHandle fallback, MethodHandle... targets)
```

Creates a table switch method handle, which can be used to switch over a set of target
method handles, based on a given target index, called selector.
<p>
For a selector value of {@code n}, where {@code n} falls in the range {@code [0, N)},
and where {@code N} is the number of target method handles, the table switch method
handle will invoke the n-th target method handle from the list of target method handles.
<p>
For a selector value that does not fall in the range {@code [0, N)}, the table switch
method handle will invoke the given fallback method handle.
<p>
All method handles passed to this method must have the same type, with the additional
requirement that the leading parameter be of type {@code int}. The leading parameter
represents the selector.
<p>
Any trailing parameters present in the type will appear on the returned table switch
method handle as well. Any arguments assigned to these parameters will be forwarded,
together with the selector value, to the selected method handle when invoking it.

@apiNote Example:
The cases each drop the {@code selector} value they are given, and take an additional
{@code String} argument, which is concatenated (using {@link String#concat(String)})
to a specific constant label string for each case:
{@snippet lang="java" :
MethodHandles.Lookup lookup = MethodHandles.lookup();
MethodHandle caseMh = lookup.findVirtual(String.class, "concat",
        MethodType.methodType(String.class, String.class));
caseMh = MethodHandles.dropArguments(caseMh, 0, int.class);

MethodHandle caseDefault = MethodHandles.insertArguments(caseMh, 1, "default: ");
MethodHandle case0 = MethodHandles.insertArguments(caseMh, 1, "case 0: ");
MethodHandle case1 = MethodHandles.insertArguments(caseMh, 1, "case 1: ");

MethodHandle mhSwitch = MethodHandles.tableSwitch(
    caseDefault,
    case0,
    case1
);

assertEquals("default: data", (String) mhSwitch.invokeExact(-1, "data"));
assertEquals("case 0: data", (String) mhSwitch.invokeExact(0, "data"));
assertEquals("case 1: data", (String) mhSwitch.invokeExact(1, "data"));
assertEquals("default: data", (String) mhSwitch.invokeExact(2, "data"));
}

@param fallback the fallback method handle that is called when the selector is not
                within the range {@code [0, N)}.
@param targets array of target method handles.
@return the table switch method handle.
@throws NullPointerException if {@code fallback}, the {@code targets} array, or any
                             any of the elements of the {@code targets} array are
                             {@code null}.
@throws IllegalArgumentException if the {@code targets} array is empty, if the leading
                                 parameter of the fallback handle or any of the target
                                 handles is not {@code int}, or if the types of
                                 the fallback handle and all of target handles are
                                 not the same.

@since 17

## MethodHandles.filterValue(VarHandle, MethodHandle, MethodHandle)

```java
public static VarHandle filterValue(VarHandle target, MethodHandle filterToTarget, MethodHandle filterFromTarget)
```

Adapts a target var handle by pre-processing incoming and outgoing values using a pair of filter functions.
<p>
When calling e.g. {@link VarHandle#set(Object...)} on the resulting var handle, the incoming value (of type {@code T}, where
{@code T} is the <em>last</em> parameter type of the first filter function) is processed using the first filter and then passed
to the target var handle.
Conversely, when calling e.g. {@link VarHandle#get(Object...)} on the resulting var handle, the return value obtained from
the target var handle (of type {@code T}, where {@code T} is the <em>last</em> parameter type of the second filter function)
is processed using the second filter and returned to the caller. More advanced access mode types, such as
{@link VarHandle.AccessMode#COMPARE_AND_EXCHANGE} might apply both filters at the same time.
<p>
For the boxing and unboxing filters to be well-formed, their types must be of the form {@code (A... , S) -> T} and
{@code (A... , T) -> S}, respectively, where {@code T} is the type of the target var handle. If this is the case,
the resulting var handle will have type {@code S} and will feature the additional coordinates {@code A...} (which
will be appended to the coordinates of the target var handle).
<p>
If the boxing and unboxing filters throw any checked exceptions when invoked, the resulting var handle will
throw an {@link IllegalStateException}.
<p>
The resulting var handle will feature the same access modes (see {@link VarHandle.AccessMode}) and
atomic access guarantees as those featured by the target var handle.

@param target the target var handle
@param filterToTarget a filter to convert some type {@code S} into the type of {@code target}
@param filterFromTarget a filter to convert the type of {@code target} to some type {@code S}
@return an adapter var handle which accepts a new type, performing the provided boxing/unboxing conversions.
@throws IllegalArgumentException if {@code filterFromTarget} and {@code filterToTarget} are not well-formed, that is, they have types
other than {@code (A... , S) -> T} and {@code (A... , T) -> S}, respectively, where {@code T} is the type of the target var handle,
or if it's determined that either {@code filterFromTarget} or {@code filterToTarget} throws any checked exceptions.
@throws NullPointerException if any of the arguments is {@code null}.
@since 22

## MethodHandles.filterCoordinates(VarHandle, int, MethodHandle...)

```java
public static VarHandle filterCoordinates(VarHandle target, int pos, MethodHandle... filters)
```

Adapts a target var handle by pre-processing incoming coordinate values using unary filter functions.
<p>
When calling e.g. {@link VarHandle#get(Object...)} on the resulting var handle, the incoming coordinate values
starting at position {@code pos} (of type {@code C1, C2 ... Cn}, where {@code C1, C2 ... Cn} are the return types
of the unary filter functions) are transformed into new values (of type {@code S1, S2 ... Sn}, where {@code S1, S2 ... Sn} are the
parameter types of the unary filter functions), and then passed (along with any coordinate that was left unaltered
by the adaptation) to the target var handle.
<p>
For the coordinate filters to be well-formed, their types must be of the form {@code S1 -> T1, S2 -> T1 ... Sn -> Tn},
where {@code T1, T2 ... Tn} are the coordinate types starting at position {@code pos} of the target var handle.
<p>
If any of the filters throws a checked exception when invoked, the resulting var handle will
throw an {@link IllegalStateException}.
<p>
The resulting var handle will feature the same access modes (see {@link VarHandle.AccessMode}) and
atomic access guarantees as those featured by the target var handle.

@param target the target var handle
@param pos the position of the first coordinate to be transformed
@param filters the unary functions which are used to transform coordinates starting at position {@code pos}
@return an adapter var handle which accepts new coordinate types, applying the provided transformation
to the new coordinate values.
@throws IllegalArgumentException if the handles in {@code filters} are not well-formed, that is, they have types
other than {@code S1 -> T1, S2 -> T2, ... Sn -> Tn} where {@code T1, T2 ... Tn} are the coordinate types starting
at position {@code pos} of the target var handle, if {@code pos} is not between 0 and the target var handle coordinate arity, inclusive,
or if more filters are provided than the actual number of coordinate types available starting at {@code pos},
or if it's determined that any of the filters throws any checked exceptions.
@throws NullPointerException if any of the arguments is {@code null} or {@code filters} contains {@code null}.
@since 22

## MethodHandles.insertCoordinates(VarHandle, int, Object...)

```java
public static VarHandle insertCoordinates(VarHandle target, int pos, Object... values)
```

Provides a target var handle with one or more <em>bound coordinates</em>
in advance of the var handle's invocation. As a consequence, the resulting var handle will feature less
coordinate types than the target var handle.
<p>
When calling e.g. {@link VarHandle#get(Object...)} on the resulting var handle, incoming coordinate values
are joined with bound coordinate values, and then passed to the target var handle.
<p>
For the bound coordinates to be well-formed, their types must be {@code T1, T2 ... Tn },
where {@code T1, T2 ... Tn} are the coordinate types starting at position {@code pos} of the target var handle.
<p>
The resulting var handle will feature the same access modes (see {@link VarHandle.AccessMode}) and
atomic access guarantees as those featured by the target var handle.

@param target the var handle to invoke after the bound coordinates are inserted
@param pos the position of the first coordinate to be inserted
@param values the series of bound coordinates to insert
@return an adapter var handle which inserts additional coordinates,
        before calling the target var handle
@throws IllegalArgumentException if {@code pos} is not between 0 and the target var handle coordinate arity, inclusive,
or if more values are provided than the actual number of coordinate types available starting at {@code pos}.
@throws ClassCastException if the bound coordinates in {@code values} are not well-formed, that is, they have types
other than {@code T1, T2 ... Tn }, where {@code T1, T2 ... Tn} are the coordinate types starting at position {@code pos}
of the target var handle.
@throws NullPointerException if any of the arguments is {@code null} or {@code values} contains {@code null}.
@since 22

## MethodHandles.permuteCoordinates(VarHandle, List<Class<?>>, int...)

```java
public static VarHandle permuteCoordinates(VarHandle target, List<Class<?>> newCoordinates, int... reorder)
```

Provides a var handle which adapts the coordinate values of the target var handle, by re-arranging them
so that the new coordinates match the provided ones.
<p>
The given array controls the reordering.
Call {@code #I} the number of incoming coordinates (the value
{@code newCoordinates.size()}), and call {@code #O} the number
of outgoing coordinates (the number of coordinates associated with the target var handle).
Then the length of the reordering array must be {@code #O},
and each element must be a non-negative number less than {@code #I}.
For every {@code N} less than {@code #O}, the {@code N}-th
outgoing coordinate will be taken from the {@code I}-th incoming
coordinate, where {@code I} is {@code reorder[N]}.
<p>
No coordinate value conversions are applied.
The type of each incoming coordinate, as determined by {@code newCoordinates},
must be identical to the type of the corresponding outgoing coordinate
in the target var handle.
<p>
The reordering array need not specify an actual permutation.
An incoming coordinate will be duplicated if its index appears
more than once in the array, and an incoming coordinate will be dropped
if its index does not appear in the array.
<p>
The resulting var handle will feature the same access modes (see {@link VarHandle.AccessMode}) and
atomic access guarantees as those featured by the target var handle.
@param target the var handle to invoke after the coordinates have been reordered
@param newCoordinates the new coordinate types
@param reorder an index array which controls the reordering
@return an adapter var handle which re-arranges the incoming coordinate values,
before calling the target var handle
@throws IllegalArgumentException if the index array length is not equal to
the number of coordinates of the target var handle, or if any index array element is not a valid index for
a coordinate of {@code newCoordinates}, or if two corresponding coordinate types in
the target var handle and in {@code newCoordinates} are not identical.
@throws NullPointerException if any of the arguments is {@code null} or {@code newCoordinates} contains {@code null}.
@since 22

## MethodHandles.collectCoordinates(VarHandle, int, MethodHandle)

```java
public static VarHandle collectCoordinates(VarHandle target, int pos, MethodHandle filter)
```

Adapts a target var handle by pre-processing
a sub-sequence of its coordinate values with a filter (a method handle).
The pre-processed coordinates are replaced by the result (if any) of the
filter function and the target var handle is then called on the modified (usually shortened)
coordinate list.
<p>
If {@code R} is the return type of the filter, then:
<ul>
<li>if {@code R} <em>is not</em> {@code void}, the target var handle must have a coordinate of type {@code R} in
position {@code pos}. The parameter types of the filter will replace the coordinate type at position {@code pos}
of the target var handle. When the returned var handle is invoked, it will be as if the filter is invoked first,
and its result is passed in place of the coordinate at position {@code pos} in a downstream invocation of the
target var handle.</li>
<li> if {@code R} <em>is</em> {@code void}, the parameter types (if any) of the filter will be inserted in the
coordinate type list of the target var handle at position {@code pos}. In this case, when the returned var handle
is invoked, the filter essentially acts as a side effect, consuming some of the coordinate values, before a
downstream invocation of the target var handle.</li>
</ul>
<p>
If any of the filters throws a checked exception when invoked, the resulting var handle will
throw an {@link IllegalStateException}.
<p>
The resulting var handle will feature the same access modes (see {@link VarHandle.AccessMode}) and
atomic access guarantees as those featured by the target var handle.

@param target the var handle to invoke after the coordinates have been filtered
@param pos the position in the coordinate list of the target var handle where the filter is to be inserted
@param filter the filter method handle
@return an adapter var handle which filters the incoming coordinate values,
before calling the target var handle
@throws IllegalArgumentException if the return type of {@code filter}
is not void, and it is not the same as the {@code pos} coordinate of the target var handle,
if {@code pos} is not between 0 and the target var handle coordinate arity, inclusive,
if the resulting var handle's type would have <a href="MethodHandle.html#maxarity">too many coordinates</a>,
or if it's determined that {@code filter} throws any checked exceptions.
@throws NullPointerException if any of the arguments is {@code null}.
@since 22

## MethodHandles.dropCoordinates(VarHandle, int, Class<?>...)

```java
public static VarHandle dropCoordinates(VarHandle target, int pos, Class<?>... valueTypes)
```

Returns a var handle which will discard some dummy coordinates before delegating to the
target var handle. As a consequence, the resulting var handle will feature more
coordinate types than the target var handle.
<p>
The {@code pos} argument may range between zero and <i>N</i>, where <i>N</i> is the arity of the
target var handle's coordinate types. If {@code pos} is zero, the dummy coordinates will precede
the target's real arguments; if {@code pos} is <i>N</i> they will come after.
<p>
The resulting var handle will feature the same access modes (see {@link VarHandle.AccessMode}) and
atomic access guarantees as those featured by the target var handle.

@param target the var handle to invoke after the dummy coordinates are dropped
@param pos position of the first coordinate to drop (zero for the leftmost)
@param valueTypes the type(s) of the coordinate(s) to drop
@return an adapter var handle which drops some dummy coordinates,
        before calling the target var handle
@throws IllegalArgumentException if {@code pos} is not between 0 and the target var handle coordinate arity, inclusive.
@throws NullPointerException if any of the arguments is {@code null} or {@code valueTypes} contains {@code null}.
@since 22