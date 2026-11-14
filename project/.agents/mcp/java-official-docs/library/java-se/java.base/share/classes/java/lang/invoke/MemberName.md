# MemberName class (java.lang.invoke)

```java
/*non-public*/ final class MemberName implements Member, Cloneable
```

A {@code MemberName} is a compact symbolic datum which fully characterizes
a method or field reference.
A member name refers to a field, method, constructor, or member type.
Every member name has a simple name (a string) and a type (either a Class or MethodType).
A member name may also have a non-null declaring class, or it may be simply
a naked name/type pair.
A member name may also have non-zero modifier flags.
Finally, a member name may be either resolved or unresolved.
If it is resolved, the existence of the named member has been determined by the JVM.
<p>
Whether resolved or not, a member name provides no access rights or
invocation capability to its possessor.  It is merely a compact
representation of all symbolic information necessary to link to
and properly use the named member.
<p>
When resolved, a member name's internal implementation may include references to JVM metadata.
This representation is stateless and only descriptive.
It provides no private information and no capability to use the member.
<p>
By contrast, a {@linkplain java.lang.reflect.Method} contains fuller information
about the internals of a method (except its bytecodes) and also
allows invocation.  A MemberName is much lighter than a Method,
since it contains about 7 fields to the 16 of Method (plus its sub-arrays),
and those seven fields omit much of the information in Method.
@author jrose

## MemberName.getDeclaringClass()

```java
public Class<?> getDeclaringClass()
```

Return the declaring class of this member.
 In the case of a bare name and type, the declaring class will be null.

## MemberName.getClassLoader()

```java
public ClassLoader getClassLoader()
```

Utility method producing the class loader of the declaring class.

## MemberName.getName()

```java
public String getName()
```

Return the simple name of this member.
 For a type, it is the same as {@link Class#getSimpleName}.
 For a method or field, it is the simple name of the member.
 For a constructor, it is always {@code "<init>"}.

## MemberName.getMethodType()

```java
public MethodType getMethodType()
```

Return the declared type of this member, which
 must be a method or constructor.

## MemberName.getInvocationType()

```java
public MethodType getInvocationType()
```

Return the actual type under which this method or constructor must be invoked.
 For non-static methods or constructors, this is the type with a leading parameter,
 a reference to declaring class.  For static methods, it is the same as the declared type.

## MemberName.getFieldType()

```java
public Class<?> getFieldType()
```

Return the declared type of this member, which
 must be a field or type.
 If it is a type member, that type itself is returned.

## MemberName.getType()

```java
public Object getType()
```

Utility method to produce either the method type or field type of this member.

## MemberName.getModifiers()

```java
public int getModifiers()
```

Return the modifier flags of this member.
 @see java.lang.reflect.Modifier

## MemberName.getReferenceKind()

```java
public byte getReferenceKind()
```

Return the reference kind of this member, or zero if none.

## MemberName.isMethodHandleInvoke()

```java
public boolean isMethodHandleInvoke()
```

Utility method to query if this member is a method handle invocation (invoke or invokeExact).

## MemberName.isStatic()

```java
public boolean isStatic()
```

Utility method to query the modifier flags of this member.

## MemberName.isPublic()

```java
public boolean isPublic()
```

Utility method to query the modifier flags of this member.

## MemberName.isPrivate()

```java
public boolean isPrivate()
```

Utility method to query the modifier flags of this member.

## MemberName.isProtected()

```java
public boolean isProtected()
```

Utility method to query the modifier flags of this member.

## MemberName.isFinal()

```java
public boolean isFinal()
```

Utility method to query the modifier flags of this member.

## MemberName.canBeStaticallyBound()

```java
public boolean canBeStaticallyBound()
```

Utility method to query whether this member or its defining class is final.

## MemberName.isVolatile()

```java
public boolean isVolatile()
```

Utility method to query the modifier flags of this member.

## MemberName.isAbstract()

```java
public boolean isAbstract()
```

Utility method to query the modifier flags of this member.

## MemberName.isNative()

```java
public boolean isNative()
```

Utility method to query the modifier flags of this member.

## MemberName.isBridge()

```java
public boolean isBridge()
```

Utility method to query the modifier flags of this member; returns false if the member is not a method.

## MemberName.isVarargs()

```java
public boolean isVarargs()
```

Utility method to query the modifier flags of this member; returns false if the member is not a method.

## MemberName.isSynthetic()

```java
public boolean isSynthetic()
```

Utility method to query the modifier flags of this member; returns false if the member is not a method.

## MemberName.isInvocable()

```java
public boolean isInvocable()
```

Utility method to query whether this member is a method or constructor.

## MemberName.isMethod()

```java
public boolean isMethod()
```

Query whether this member is a method.

## MemberName.isConstructor()

```java
public boolean isConstructor()
```

Query whether this member is a constructor.

## MemberName.isField()

```java
public boolean isField()
```

Query whether this member is a field.

## MemberName.isType()

```java
public boolean isType()
```

Query whether this member is a type.

## MemberName.isPackage()

```java
public boolean isPackage()
```

Utility method to query whether this member is neither public, private, nor protected.

## MemberName.isCallerSensitive()

```java
public boolean isCallerSensitive()
```

Query whether this member has a CallerSensitive annotation.

## MemberName.isTrustedFinalField()

```java
public boolean isTrustedFinalField()
```

Query whether this member is a trusted final field.

## MemberName.refersTo(Class<?>, String)

```java
public boolean refersTo(Class<?> declc, String n)
```

Check if MemberName is a call to a method named {@code name} in class {@code declaredClass}.

## MemberName.MemberName(Method)

```java
public MemberName(Method m)
```

Create a name for the given reflected method.  The resulting name will be in a resolved state.

## MemberName.asConstructor()

```java
public MemberName asConstructor()
```

If this MN is not REF_newInvokeSpecial, return a clone with that ref. kind.
 In that case it must already be REF_invokeSpecial.

## MemberName.asNormalOriginal()

```java
public MemberName asNormalOriginal()
```

If this MN is a REF_invokeSpecial, return a clone with the "normal" kind
 REF_invokeVirtual; also switch either to REF_invokeInterface if clazz.isInterface.
 The end result is to get a fully virtualized version of the MN.
 (Note that resolving in the JVM will sometimes devirtualize, changing
 REF_invokeVirtual of a final to REF_invokeSpecial, and REF_invokeInterface
 in some corner cases to either of the previous two; this transform
 undoes that change under the assumption that it occurred.)

## MemberName.MemberName(Constructor<?>)

```java
public MemberName(Constructor<?> ctor)
```

Create a name for the given reflected constructor.  The resulting name will be in a resolved state.

## MemberName.MemberName(Field)

```java
public MemberName(Field fld)
```

Create a name for the given reflected field.  The resulting name will be in a resolved state.

## MemberName.MemberName(Class<?>)

```java
public MemberName(Class<?> type)
```

Create a name for the given class.  The resulting name will be in a resolved state.

## MemberName.getDefinition()

```java
public MemberName getDefinition()
```

Get the definition of this member name.
 This may be in a super-class of the declaring class of this member.

## MemberName.equals(MemberName)

```java
public boolean equals(MemberName that)
```

Decide if two member names have exactly the same symbolic content.
 Does not take into account any actual class members, so even if
 two member names resolve to the same actual member, they may
 be distinct references.

## MemberName.MemberName(Class<?>, String, Class<?>, byte)

```java
public MemberName(Class<?> defClass, String name, Class<?> type, byte refKind)
```

Create a field or type name from the given components:
 Declaring class, name, type, reference kind.
 The declaring class may be supplied as null if this is to be a bare name and type.
 The resulting name will in an unresolved state.

## MemberName.MemberName(Class<?>, String, MethodType, byte)

```java
public MemberName(Class<?> defClass, String name, MethodType type, byte refKind)
```

Create a method or constructor name from the given components:
 Declaring class, name, type, reference kind.
 It will be a constructor if and only if the name is {@code "<init>"}.
 The declaring class may be supplied as null if this is to be a bare name and type.
 The last argument is optional, a boolean which requests REF_invokeSpecial.
 The resulting name will in an unresolved state.

## MemberName.MemberName(byte, Class<?>, String, Object)

```java
public MemberName(byte refKind, Class<?> defClass, String name, Object type)
```

Create a method, constructor, or field name from the given components:
 Reference kind, declaring class, name, type.

## MemberName.isResolved()

```java
public boolean isResolved()
```

Query whether this member name is resolved.
 A resolved member name is one for which the JVM has found
 a method, constructor, field, or type binding corresponding exactly to the name.
 (Document?)

## MemberName.toString()

```java
public String toString()
```

Produce a string form of this member name.
 For types, it is simply the type's own string (as reported by {@code toString}).
 For fields, it is {@code "DeclaringClass.name/type"}.
 For methods and constructors, it is {@code "DeclaringClass.name(ptype...)rtype"}.
 If the declaring class is null, the prefix {@code "DeclaringClass."} is omitted.
 If the member is unresolved, a prefix {@code "*."} is prepended.

## MemberName.getFactory()

```java
/*non-public*/ static Factory getFactory()
```

Actually making a query requires an access check.

## MemberName.resolveOrFail(byte, MemberName, Class<?>, int, Class<NoSuchMemberException>)

```java
public <NoSuchMemberException extends ReflectiveOperationException> MemberName resolveOrFail(byte refKind, MemberName m, Class<?> lookupClass, int allowedModes, Class<NoSuchMemberException> nsmClass) throws IllegalAccessException, NoSuchMemberException
```

Produce a resolved version of the given member.
 Super types are searched (for inherited members) if {@code searchSupers} is true.
 Access checking is performed on behalf of the given {@code lookupClass}.
 If lookup fails or access is not permitted, a {@linkplain ReflectiveOperationException} is thrown.
 Otherwise a fresh copy of the given member is returned, with modifier bits filled in.

## MemberName.resolveOrNull(byte, MemberName, Class<?>, int)

```java
public MemberName resolveOrNull(byte refKind, MemberName m, Class<?> lookupClass, int allowedModes)
```

Produce a resolved version of the given member.
 Super types are searched (for inherited members) if {@code searchSupers} is true.
 Access checking is performed on behalf of the given {@code lookupClass}.
 If lookup fails or access is not permitted, return null.
 Otherwise a fresh copy of the given member is returned, with modifier bits filled in.