# DirectMethodHandleDesc interface (java.lang.constant)

```java
public sealed interface DirectMethodHandleDesc extends MethodHandleDesc permits DirectMethodHandleDescImpl
```

A <a href="package-summary.html#nominal">nominal descriptor</a> for a direct
{@link MethodHandle}.  A {@linkplain DirectMethodHandleDesc} corresponds to
a {@code Constant_MethodHandle_info} entry in the constant pool of a classfile.

@since 12

## DirectMethodHandleDesc.STATIC(REF_invokeStatic)

```java
STATIC(REF_invokeStatic), /** A method handle for a method invoked as with
```

A method handle for a method invoked as with {@code invokestatic}

## DirectMethodHandleDesc.INTERFACE_STATIC(REF_invokeStatic, true)

```java
INTERFACE_STATIC(REF_invokeStatic, true), /** A method handle for a method invoked as with
```

A method handle for a method invoked as with {@code invokestatic}

## DirectMethodHandleDesc.VIRTUAL(REF_invokeVirtual)

```java
VIRTUAL(REF_invokeVirtual), /** A method handle for a method invoked as with
```

A method handle for a method invoked as with {@code invokevirtual}

## DirectMethodHandleDesc.INTERFACE_VIRTUAL(REF_invokeInterface, true)

```java
INTERFACE_VIRTUAL(REF_invokeInterface, true), /** A method handle for a method invoked as with
```

A method handle for a method invoked as with {@code invokeinterface}

## DirectMethodHandleDesc.INTERFACE_SPECIAL(REF_invokeSpecial, true), /** A method handle for a constructor */ CONSTRUCTOR(REF_newInvokeSpecial), /** A method handle for a read accessor for an instance field */ GETTER(REF_getField), /** A method handle for a write accessor for an instance field */ SETTER(REF_putField), /** A method handle for a read accessor for a static field */ STATIC_GETTER(REF_getStatic), /** A method handle for a write accessor for a static field */ STATIC_SETTER(REF_putStatic)

```java
INTERFACE_SPECIAL(REF_invokeSpecial, true), /** A method handle for a constructor */ CONSTRUCTOR(REF_newInvokeSpecial), /** A method handle for a read accessor for an instance field */ GETTER(REF_getField), /** A method handle for a write accessor for an instance field */ SETTER(REF_putField), /** A method handle for a read accessor for a static field */ STATIC_GETTER(REF_getStatic), /** A method handle for a write accessor for a static field */ STATIC_SETTER(REF_putStatic)
```

A method handle for an interface method invoked as with {@code invokespecial}

## DirectMethodHandleDesc.CONSTRUCTOR(REF_newInvokeSpecial), /** A method handle for a read accessor for an instance field */ GETTER(REF_getField), /** A method handle for a write accessor for an instance field */ SETTER(REF_putField), /** A method handle for a read accessor for a static field */ STATIC_GETTER(REF_getStatic), /** A method handle for a write accessor for a static field */ STATIC_SETTER(REF_putStatic)

```java
CONSTRUCTOR(REF_newInvokeSpecial), /** A method handle for a read accessor for an instance field */ GETTER(REF_getField), /** A method handle for a write accessor for an instance field */ SETTER(REF_putField), /** A method handle for a read accessor for a static field */ STATIC_GETTER(REF_getStatic), /** A method handle for a write accessor for a static field */ STATIC_SETTER(REF_putStatic)
```

A method handle for a constructor

## DirectMethodHandleDesc.GETTER(REF_getField), /** A method handle for a write accessor for an instance field */ SETTER(REF_putField), /** A method handle for a read accessor for a static field */ STATIC_GETTER(REF_getStatic), /** A method handle for a write accessor for a static field */ STATIC_SETTER(REF_putStatic)

```java
GETTER(REF_getField), /** A method handle for a write accessor for an instance field */ SETTER(REF_putField), /** A method handle for a read accessor for a static field */ STATIC_GETTER(REF_getStatic), /** A method handle for a write accessor for a static field */ STATIC_SETTER(REF_putStatic)
```

A method handle for a read accessor for an instance field

## DirectMethodHandleDesc.SETTER(REF_putField), /** A method handle for a read accessor for a static field */ STATIC_GETTER(REF_getStatic), /** A method handle for a write accessor for a static field */ STATIC_SETTER(REF_putStatic)

```java
SETTER(REF_putField), /** A method handle for a read accessor for a static field */ STATIC_GETTER(REF_getStatic), /** A method handle for a write accessor for a static field */ STATIC_SETTER(REF_putStatic)
```

A method handle for a write accessor for an instance field

## DirectMethodHandleDesc.STATIC_GETTER(REF_getStatic), /** A method handle for a write accessor for a static field */ STATIC_SETTER(REF_putStatic)

```java
STATIC_GETTER(REF_getStatic), /** A method handle for a write accessor for a static field */ STATIC_SETTER(REF_putStatic)
```

A method handle for a read accessor for a static field

## DirectMethodHandleDesc.STATIC_SETTER(REF_putStatic)

```java
STATIC_SETTER(REF_putStatic)
```

A method handle for a write accessor for a static field

## DirectMethodHandleDesc.refKind

```java
public final int refKind
```

The corresponding {@code refKind} value for this kind of method handle,
as defined by {@link MethodHandleInfo}

## DirectMethodHandleDesc.isInterface

```java
public final boolean isInterface
```

Is this an interface

## DirectMethodHandleDesc.valueOf(int)

```java
public static Kind valueOf(int refKind)
```

Returns the enumeration member with the given {@code refKind} field.
Behaves as if {@code valueOf(refKind, false)}.  As a special case,
if {@code refKind} is {@code REF_invokeInterface} (9) then the
{@code isInterface} field will be true.

@param refKind refKind of desired member
@return the matching enumeration member
@throws IllegalArgumentException if there is no such member

## DirectMethodHandleDesc.valueOf(int, boolean)

```java
public static Kind valueOf(int refKind, boolean isInterface)
```

Returns the enumeration member with the given the {@code refKind} and
{@code isInterface} arguments.
For most values of {@code refKind} there is an exact match regardless of the value of {@code isInterface}.
These are:
<UL>
    <LI>{@code REF_invokeVirtual} which matches to {@code VIRTUAL}
    <LI>{@code REF_invokeInterface} which matches to {@code INTERFACE_VIRTUAL}
    <LI>{@code REF_newInvokeSpecial} which matches to {@code CONSTRUCTOR}
    <LI>{@code REF_getField} which matches to {@code GETTER}
    <LI>{@code REF_putField} which matches to {@code SETTER}
    <LI>{@code REF_getStatic} which matches to {@code STATIC_GETTER}
    <LI>{@code REF_putStatic} which matches to {@code STATIC_SETTER}
</UL>
As for the rest, the returned kind will depend on the value (false or true accordingly) of {@code isInterface}:
<UL>
    <LI>{@code REF_invokeStatic} which matches to {@code STATIC} or {@code INTERFACE_STATIC}
    <LI>{@code REF_invokeSpecial} which matches to {@code SPECIAL} or {@code INTERFACE_SPECIAL}
</UL>
@param refKind refKind of desired member
@param isInterface whether desired member is for interface methods
@return the matching enumeration member
@throws IllegalArgumentException if there is no such member

## DirectMethodHandleDesc.kind()

```java
Kind kind()
```

Returns the {@code kind} of the method handle described by this nominal
descriptor.

@return the {@link Kind}

## DirectMethodHandleDesc.refKind()

```java
int refKind()
```

Returns the {@code refKind} of the method handle described by this nominal
reference, as defined by {@link MethodHandleInfo}.

@return the reference kind

## DirectMethodHandleDesc.isOwnerInterface()

```java
boolean isOwnerInterface()
```

Indicates if the method is declared by an interface

@return true if the method is declared by an interface

## DirectMethodHandleDesc.owner()

```java
ClassDesc owner()
```

Returns a {@link ClassDesc} describing the class declaring the
method or field described by this nominal descriptor.

@return the class declaring the method or field

## DirectMethodHandleDesc.methodName()

```java
String methodName()
```

Returns the name of the method or field described by this nominal descriptor.
For constructors, returns the reserved name {@value ConstantDescs#INIT_NAME}.

@return the name of the method or field

## DirectMethodHandleDesc.lookupDescriptor()

```java
String lookupDescriptor()
```

Returns the lookup descriptor of the method handle described by this descriptor,
after adjusting for the invocation mode.  This will correspond to either
a method type descriptor string (for methods and constructors), or a field
descriptor string (for field access method handles).  The lookup descriptor
string is in the same format as accepted by {@link MethodHandleDesc#of(Kind, ClassDesc, String, String)}.

@return the lookup descriptor string