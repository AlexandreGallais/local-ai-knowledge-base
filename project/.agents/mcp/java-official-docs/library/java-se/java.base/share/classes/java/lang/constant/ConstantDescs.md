# ConstantDescs class (java.lang.constant)

```java
public final class ConstantDescs
```

Predefined values of <a href="package-summary.html#nominal">nominal descriptor</a>
for common constants, including descriptors for primitive class types and
other common platform types, and descriptors for method handles for standard
bootstrap methods.

@see ConstantDesc

@since 12

## ConstantDescs.DEFAULT_NAME

```java
public static final String DEFAULT_NAME
```

Invocation name to use when no name is needed, such as the name of a
constructor, or the invocation name of a dynamic constant or dynamic
callsite when the bootstrap is known to ignore the invocation name.

## ConstantDescs.CD_Object

```java
public static final ClassDesc CD_Object
```

{@link ClassDesc} representing {@link Object}

## ConstantDescs.CD_String

```java
public static final ClassDesc CD_String
```

{@link ClassDesc} representing {@link String}

## ConstantDescs.CD_Class

```java
public static final ClassDesc CD_Class
```

{@link ClassDesc} representing {@link Class}

## ConstantDescs.CD_Number

```java
public static final ClassDesc CD_Number
```

{@link ClassDesc} representing {@link Number}

## ConstantDescs.CD_Integer

```java
public static final ClassDesc CD_Integer
```

{@link ClassDesc} representing {@link Integer}

## ConstantDescs.CD_Long

```java
public static final ClassDesc CD_Long
```

{@link ClassDesc} representing {@link Long}

## ConstantDescs.CD_Float

```java
public static final ClassDesc CD_Float
```

{@link ClassDesc} representing {@link Float}

## ConstantDescs.CD_Double

```java
public static final ClassDesc CD_Double
```

{@link ClassDesc} representing {@link Double}

## ConstantDescs.CD_Short

```java
public static final ClassDesc CD_Short
```

{@link ClassDesc} representing {@link Short}

## ConstantDescs.CD_Byte

```java
public static final ClassDesc CD_Byte
```

{@link ClassDesc} representing {@link Byte}

## ConstantDescs.CD_Character

```java
public static final ClassDesc CD_Character
```

{@link ClassDesc} representing {@link Character}

## ConstantDescs.CD_Boolean

```java
public static final ClassDesc CD_Boolean
```

{@link ClassDesc} representing {@link Boolean}

## ConstantDescs.CD_Void

```java
public static final ClassDesc CD_Void
```

{@link ClassDesc} representing {@link Void}

## ConstantDescs.CD_Throwable

```java
public static final ClassDesc CD_Throwable
```

{@link ClassDesc} representing {@link Throwable}

## ConstantDescs.CD_Exception

```java
public static final ClassDesc CD_Exception
```

{@link ClassDesc} representing {@link Exception}

## ConstantDescs.CD_Enum

```java
public static final ClassDesc CD_Enum
```

{@link ClassDesc} representing {@link Enum}

## ConstantDescs.CD_VarHandle

```java
public static final ClassDesc CD_VarHandle
```

{@link ClassDesc} representing {@link VarHandle}

## ConstantDescs.CD_MethodHandles

```java
public static final ClassDesc CD_MethodHandles
```

{@link ClassDesc} representing {@link MethodHandles}

## ConstantDescs.CD_MethodHandles_Lookup

```java
public static final ClassDesc CD_MethodHandles_Lookup
```

{@link ClassDesc} representing {@link MethodHandles.Lookup}

## ConstantDescs.CD_MethodHandle

```java
public static final ClassDesc CD_MethodHandle
```

{@link ClassDesc} representing {@link MethodHandle}

## ConstantDescs.CD_MethodType

```java
public static final ClassDesc CD_MethodType
```

{@link ClassDesc} representing {@link MethodType}

## ConstantDescs.CD_CallSite

```java
public static final ClassDesc CD_CallSite
```

{@link ClassDesc} representing {@link CallSite}

## ConstantDescs.CD_Collection

```java
public static final ClassDesc CD_Collection
```

{@link ClassDesc} representing {@link Collection}

## ConstantDescs.CD_List

```java
public static final ClassDesc CD_List
```

{@link ClassDesc} representing {@link List}

## ConstantDescs.CD_Set

```java
public static final ClassDesc CD_Set
```

{@link ClassDesc} representing {@link Set}

## ConstantDescs.CD_Map

```java
public static final ClassDesc CD_Map
```

{@link ClassDesc} representing {@link Map}

## ConstantDescs.CD_ConstantDesc

```java
public static final ClassDesc CD_ConstantDesc
```

{@link ClassDesc} representing {@link ConstantDesc}

## ConstantDescs.CD_ClassDesc

```java
public static final ClassDesc CD_ClassDesc
```

{@link ClassDesc} representing {@link ClassDesc}

## ConstantDescs.CD_EnumDesc

```java
public static final ClassDesc CD_EnumDesc
```

{@link ClassDesc} representing {@link EnumDesc}

## ConstantDescs.CD_MethodTypeDesc

```java
public static final ClassDesc CD_MethodTypeDesc
```

{@link ClassDesc} representing {@link MethodTypeDesc}

## ConstantDescs.CD_MethodHandleDesc

```java
public static final ClassDesc CD_MethodHandleDesc
```

{@link ClassDesc} representing {@link MethodHandleDesc}

## ConstantDescs.CD_DirectMethodHandleDesc

```java
public static final ClassDesc CD_DirectMethodHandleDesc
```

{@link ClassDesc} representing {@link DirectMethodHandleDesc}

## ConstantDescs.CD_VarHandleDesc

```java
public static final ClassDesc CD_VarHandleDesc
```

{@link ClassDesc} representing {@link VarHandleDesc}

## ConstantDescs.CD_MethodHandleDesc_Kind

```java
public static final ClassDesc CD_MethodHandleDesc_Kind
```

{@link ClassDesc} representing {@link DirectMethodHandleDesc.Kind}

## ConstantDescs.CD_DynamicConstantDesc

```java
public static final ClassDesc CD_DynamicConstantDesc
```

{@link ClassDesc} representing {@link DynamicConstantDesc}

## ConstantDescs.CD_DynamicCallSiteDesc

```java
public static final ClassDesc CD_DynamicCallSiteDesc
```

{@link ClassDesc} representing {@link DynamicCallSiteDesc}

## ConstantDescs.CD_ConstantBootstraps

```java
public static final ClassDesc CD_ConstantBootstraps
```

{@link ClassDesc} representing {@link ConstantBootstraps}

## ConstantDescs.BSM_PRIMITIVE_CLASS

```java
public static final DirectMethodHandleDesc BSM_PRIMITIVE_CLASS
```

{@link MethodHandleDesc} representing {@link ConstantBootstraps#primitiveClass(Lookup, String, Class) ConstantBootstraps.primitiveClass}

## ConstantDescs.BSM_ENUM_CONSTANT

```java
public static final DirectMethodHandleDesc BSM_ENUM_CONSTANT
```

{@link MethodHandleDesc} representing {@link ConstantBootstraps#enumConstant(Lookup, String, Class) ConstantBootstraps.enumConstant}

## ConstantDescs.BSM_GET_STATIC_FINAL

```java
public static final DirectMethodHandleDesc BSM_GET_STATIC_FINAL
```

{@link MethodHandleDesc} representing {@link ConstantBootstraps#getStaticFinal(Lookup, String, Class, Class) ConstantBootstraps.getStaticFinal}
@since 15

## ConstantDescs.BSM_NULL_CONSTANT

```java
public static final DirectMethodHandleDesc BSM_NULL_CONSTANT
```

{@link MethodHandleDesc} representing {@link ConstantBootstraps#nullConstant(Lookup, String, Class) ConstantBootstraps.nullConstant}

## ConstantDescs.BSM_VARHANDLE_FIELD

```java
public static final DirectMethodHandleDesc BSM_VARHANDLE_FIELD
```

{@link MethodHandleDesc} representing {@link ConstantBootstraps#fieldVarHandle(Lookup, String, Class, Class, Class) ConstantBootstraps.fieldVarHandle}

## ConstantDescs.BSM_VARHANDLE_STATIC_FIELD

```java
public static final DirectMethodHandleDesc BSM_VARHANDLE_STATIC_FIELD
```

{@link MethodHandleDesc} representing {@link ConstantBootstraps#staticFieldVarHandle(Lookup, String, Class, Class, Class) ConstantBootstraps.staticFieldVarHandle}

## ConstantDescs.BSM_VARHANDLE_ARRAY

```java
public static final DirectMethodHandleDesc BSM_VARHANDLE_ARRAY
```

{@link MethodHandleDesc} representing {@link ConstantBootstraps#arrayVarHandle(Lookup, String, Class, Class) ConstantBootstraps.arrayVarHandle}

## ConstantDescs.BSM_INVOKE

```java
public static final DirectMethodHandleDesc BSM_INVOKE
```

{@link MethodHandleDesc} representing {@link ConstantBootstraps#invoke(Lookup, String, Class, MethodHandle, Object...) ConstantBootstraps.invoke}

## ConstantDescs.BSM_EXPLICIT_CAST

```java
public static final DirectMethodHandleDesc BSM_EXPLICIT_CAST
```

{@link MethodHandleDesc} representing {@link ConstantBootstraps#explicitCast(Lookup, String, Class, Object) ConstantBootstraps.explicitCast}
@since 15

## ConstantDescs.CD_int

```java
public static final ClassDesc CD_int
```

{@link ClassDesc} representing the primitive type {@code int}

## ConstantDescs.CD_long

```java
public static final ClassDesc CD_long
```

{@link ClassDesc} representing the primitive type {@code long}

## ConstantDescs.CD_float

```java
public static final ClassDesc CD_float
```

{@link ClassDesc} representing the primitive type {@code float}

## ConstantDescs.CD_double

```java
public static final ClassDesc CD_double
```

{@link ClassDesc} representing the primitive type {@code double}

## ConstantDescs.CD_short

```java
public static final ClassDesc CD_short
```

{@link ClassDesc} representing the primitive type {@code short}

## ConstantDescs.CD_byte

```java
public static final ClassDesc CD_byte
```

{@link ClassDesc} representing the primitive type {@code byte}

## ConstantDescs.CD_char

```java
public static final ClassDesc CD_char
```

{@link ClassDesc} representing the primitive type {@code char}

## ConstantDescs.CD_boolean

```java
public static final ClassDesc CD_boolean
```

{@link ClassDesc} representing the primitive type {@code boolean}

## ConstantDescs.CD_void

```java
public static final ClassDesc CD_void
```

{@link ClassDesc} representing the primitive type {@code void}

## ConstantDescs.BSM_CLASS_DATA

```java
public static final DirectMethodHandleDesc BSM_CLASS_DATA
```

{@link MethodHandleDesc} representing {@link MethodHandles#classData(Lookup, String, Class) MethodHandles.classData}
@since 21

## ConstantDescs.BSM_CLASS_DATA_AT

```java
public static final DirectMethodHandleDesc BSM_CLASS_DATA_AT
```

{@link MethodHandleDesc} representing {@link MethodHandles#classDataAt(Lookup, String, Class, int) MethodHandles.classDataAt}
@since 21

## ConstantDescs.NULL

```java
public static final ConstantDesc NULL
```

Nominal descriptor representing the constant {@code null}

## ConstantDescs.TRUE

```java
public static final DynamicConstantDesc<Boolean> TRUE
```

Nominal descriptor representing the constant {@linkplain Boolean#TRUE}
@since 15

## ConstantDescs.FALSE

```java
public static final DynamicConstantDesc<Boolean> FALSE
```

Nominal descriptor representing the constant {@linkplain Boolean#FALSE}
@since 15

## ConstantDescs.INIT_NAME

```java
public static final String INIT_NAME
```

The special name of instance initialization methods, {@value}. An instance
initialization method has this special name and is {@code void}.

@jvms 2.9.1 Instance Initialization Methods
@since 21

## ConstantDescs.CLASS_INIT_NAME

```java
public static final String CLASS_INIT_NAME
```

The special name of class initialization methods, {@value}. A class
initialization method has this special name, {@link java.lang.reflect.AccessFlag#STATIC
ACC_STATIC} flag set, is {@link #MTD_void void} and takes no arguments.

@jvms 2.9.2 Class Initialization Methods
@since 21

## ConstantDescs.MTD_void

```java
public static final MethodTypeDesc MTD_void
```

Nominal descriptor representing the method descriptor {@code ()V},
taking no argument and returning {@code void}.

@since 21

## ConstantDescs.ofCallsiteBootstrap(ClassDesc, String, ClassDesc, ClassDesc...)

```java
public static DirectMethodHandleDesc ofCallsiteBootstrap(ClassDesc owner, String name, ClassDesc returnType, ClassDesc... paramTypes)
```

Returns a {@link MethodHandleDesc} corresponding to a bootstrap method for
an {@code invokedynamic} callsite, which is a static method whose leading
parameter types are {@code Lookup}, {@code String}, and {@code MethodType}.

@param owner the class declaring the method
@param name the unqualified name of the method
@param returnType the return type of the method
@param paramTypes the types of the static bootstrap arguments, if any
@return the {@link MethodHandleDesc}
@throws NullPointerException if any of the arguments are null
@jvms 4.2.2 Unqualified Names

## ConstantDescs.ofConstantBootstrap(ClassDesc, String, ClassDesc, ClassDesc...)

```java
public static DirectMethodHandleDesc ofConstantBootstrap(ClassDesc owner, String name, ClassDesc returnType, ClassDesc... paramTypes)
```

Returns a {@link MethodHandleDesc} corresponding to a bootstrap method for a
dynamic constant, which is a static method whose leading arguments are
{@code Lookup}, {@code String}, and {@code Class}.

@param owner the class declaring the method
@param name the unqualified name of the method
@param returnType the return type of the method
@param paramTypes the types of the static bootstrap arguments, if any
@return the {@link MethodHandleDesc}
@throws NullPointerException if any of the arguments are null
@jvms 4.2.2 Unqualified Names