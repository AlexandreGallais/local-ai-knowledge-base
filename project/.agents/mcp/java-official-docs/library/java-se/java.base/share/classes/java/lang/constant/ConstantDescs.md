---
title: "ConstantDescs class (java.lang.constant)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/constant/ConstantDescs.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ConstantDescs class (java.lang.constant)

```java
public final class ConstantDescs
```

Predefined values of nominal descriptor
for common constants, including descriptors for primitive class types and
other common platform types, and descriptors for method handles for standard
bootstrap methods.

**See also:** ConstantDesc

**Since:** 12

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

`ClassDesc` representing `Object`

## ConstantDescs.CD_String

```java
public static final ClassDesc CD_String
```

`ClassDesc` representing `String`

## ConstantDescs.CD_Class

```java
public static final ClassDesc CD_Class
```

`ClassDesc` representing `Class`

## ConstantDescs.CD_Number

```java
public static final ClassDesc CD_Number
```

`ClassDesc` representing `Number`

## ConstantDescs.CD_Integer

```java
public static final ClassDesc CD_Integer
```

`ClassDesc` representing `Integer`

## ConstantDescs.CD_Long

```java
public static final ClassDesc CD_Long
```

`ClassDesc` representing `Long`

## ConstantDescs.CD_Float

```java
public static final ClassDesc CD_Float
```

`ClassDesc` representing `Float`

## ConstantDescs.CD_Double

```java
public static final ClassDesc CD_Double
```

`ClassDesc` representing `Double`

## ConstantDescs.CD_Short

```java
public static final ClassDesc CD_Short
```

`ClassDesc` representing `Short`

## ConstantDescs.CD_Byte

```java
public static final ClassDesc CD_Byte
```

`ClassDesc` representing `Byte`

## ConstantDescs.CD_Character

```java
public static final ClassDesc CD_Character
```

`ClassDesc` representing `Character`

## ConstantDescs.CD_Boolean

```java
public static final ClassDesc CD_Boolean
```

`ClassDesc` representing `Boolean`

## ConstantDescs.CD_Void

```java
public static final ClassDesc CD_Void
```

`ClassDesc` representing `Void`

## ConstantDescs.CD_Throwable

```java
public static final ClassDesc CD_Throwable
```

`ClassDesc` representing `Throwable`

## ConstantDescs.CD_Exception

```java
public static final ClassDesc CD_Exception
```

`ClassDesc` representing `Exception`

## ConstantDescs.CD_Enum

```java
public static final ClassDesc CD_Enum
```

`ClassDesc` representing `Enum`

## ConstantDescs.CD_VarHandle

```java
public static final ClassDesc CD_VarHandle
```

`ClassDesc` representing `VarHandle`

## ConstantDescs.CD_MethodHandles

```java
public static final ClassDesc CD_MethodHandles
```

`ClassDesc` representing `MethodHandles`

## ConstantDescs.CD_MethodHandles_Lookup

```java
public static final ClassDesc CD_MethodHandles_Lookup
```

`ClassDesc` representing `MethodHandles.Lookup`

## ConstantDescs.CD_MethodHandle

```java
public static final ClassDesc CD_MethodHandle
```

`ClassDesc` representing `MethodHandle`

## ConstantDescs.CD_MethodType

```java
public static final ClassDesc CD_MethodType
```

`ClassDesc` representing `MethodType`

## ConstantDescs.CD_CallSite

```java
public static final ClassDesc CD_CallSite
```

`ClassDesc` representing `CallSite`

## ConstantDescs.CD_Collection

```java
public static final ClassDesc CD_Collection
```

`ClassDesc` representing `Collection`

## ConstantDescs.CD_List

```java
public static final ClassDesc CD_List
```

`ClassDesc` representing `List`

## ConstantDescs.CD_Set

```java
public static final ClassDesc CD_Set
```

`ClassDesc` representing `Set`

## ConstantDescs.CD_Map

```java
public static final ClassDesc CD_Map
```

`ClassDesc` representing `Map`

## ConstantDescs.CD_ConstantDesc

```java
public static final ClassDesc CD_ConstantDesc
```

`ClassDesc` representing `ConstantDesc`

## ConstantDescs.CD_ClassDesc

```java
public static final ClassDesc CD_ClassDesc
```

`ClassDesc` representing `ClassDesc`

## ConstantDescs.CD_EnumDesc

```java
public static final ClassDesc CD_EnumDesc
```

`ClassDesc` representing `EnumDesc`

## ConstantDescs.CD_MethodTypeDesc

```java
public static final ClassDesc CD_MethodTypeDesc
```

`ClassDesc` representing `MethodTypeDesc`

## ConstantDescs.CD_MethodHandleDesc

```java
public static final ClassDesc CD_MethodHandleDesc
```

`ClassDesc` representing `MethodHandleDesc`

## ConstantDescs.CD_DirectMethodHandleDesc

```java
public static final ClassDesc CD_DirectMethodHandleDesc
```

`ClassDesc` representing `DirectMethodHandleDesc`

## ConstantDescs.CD_VarHandleDesc

```java
public static final ClassDesc CD_VarHandleDesc
```

`ClassDesc` representing `VarHandleDesc`

## ConstantDescs.CD_MethodHandleDesc_Kind

```java
public static final ClassDesc CD_MethodHandleDesc_Kind
```

`ClassDesc` representing `DirectMethodHandleDesc.Kind`

## ConstantDescs.CD_DynamicConstantDesc

```java
public static final ClassDesc CD_DynamicConstantDesc
```

`ClassDesc` representing `DynamicConstantDesc`

## ConstantDescs.CD_DynamicCallSiteDesc

```java
public static final ClassDesc CD_DynamicCallSiteDesc
```

`ClassDesc` representing `DynamicCallSiteDesc`

## ConstantDescs.CD_ConstantBootstraps

```java
public static final ClassDesc CD_ConstantBootstraps
```

`ClassDesc` representing `ConstantBootstraps`

## ConstantDescs.BSM_PRIMITIVE_CLASS

```java
public static final DirectMethodHandleDesc BSM_PRIMITIVE_CLASS
```

`MethodHandleDesc` representing String, Class) ConstantBootstraps.primitiveClass

## ConstantDescs.BSM_ENUM_CONSTANT

```java
public static final DirectMethodHandleDesc BSM_ENUM_CONSTANT
```

`MethodHandleDesc` representing String, Class) ConstantBootstraps.enumConstant

## ConstantDescs.BSM_GET_STATIC_FINAL

```java
public static final DirectMethodHandleDesc BSM_GET_STATIC_FINAL
```

`MethodHandleDesc` representing String, Class, Class) ConstantBootstraps.getStaticFinal

**Since:** 15

## ConstantDescs.BSM_NULL_CONSTANT

```java
public static final DirectMethodHandleDesc BSM_NULL_CONSTANT
```

`MethodHandleDesc` representing String, Class) ConstantBootstraps.nullConstant

## ConstantDescs.BSM_VARHANDLE_FIELD

```java
public static final DirectMethodHandleDesc BSM_VARHANDLE_FIELD
```

`MethodHandleDesc` representing String, Class, Class, Class) ConstantBootstraps.fieldVarHandle

## ConstantDescs.BSM_VARHANDLE_STATIC_FIELD

```java
public static final DirectMethodHandleDesc BSM_VARHANDLE_STATIC_FIELD
```

`MethodHandleDesc` representing String, Class, Class, Class) ConstantBootstraps.staticFieldVarHandle

## ConstantDescs.BSM_VARHANDLE_ARRAY

```java
public static final DirectMethodHandleDesc BSM_VARHANDLE_ARRAY
```

`MethodHandleDesc` representing String, Class, Class) ConstantBootstraps.arrayVarHandle

## ConstantDescs.BSM_INVOKE

```java
public static final DirectMethodHandleDesc BSM_INVOKE
```

`MethodHandleDesc` representing String, Class, MethodHandle, Object...) ConstantBootstraps.invoke

## ConstantDescs.BSM_EXPLICIT_CAST

```java
public static final DirectMethodHandleDesc BSM_EXPLICIT_CAST
```

`MethodHandleDesc` representing String, Class, Object) ConstantBootstraps.explicitCast

**Since:** 15

## ConstantDescs.CD_int

```java
public static final ClassDesc CD_int
```

`ClassDesc` representing the primitive type `int`

## ConstantDescs.CD_long

```java
public static final ClassDesc CD_long
```

`ClassDesc` representing the primitive type `long`

## ConstantDescs.CD_float

```java
public static final ClassDesc CD_float
```

`ClassDesc` representing the primitive type `float`

## ConstantDescs.CD_double

```java
public static final ClassDesc CD_double
```

`ClassDesc` representing the primitive type `double`

## ConstantDescs.CD_short

```java
public static final ClassDesc CD_short
```

`ClassDesc` representing the primitive type `short`

## ConstantDescs.CD_byte

```java
public static final ClassDesc CD_byte
```

`ClassDesc` representing the primitive type `byte`

## ConstantDescs.CD_char

```java
public static final ClassDesc CD_char
```

`ClassDesc` representing the primitive type `char`

## ConstantDescs.CD_boolean

```java
public static final ClassDesc CD_boolean
```

`ClassDesc` representing the primitive type `boolean`

## ConstantDescs.CD_void

```java
public static final ClassDesc CD_void
```

`ClassDesc` representing the primitive type `void`

## ConstantDescs.BSM_CLASS_DATA

```java
public static final DirectMethodHandleDesc BSM_CLASS_DATA
```

`MethodHandleDesc` representing String, Class) MethodHandles.classData

**Since:** 21

## ConstantDescs.BSM_CLASS_DATA_AT

```java
public static final DirectMethodHandleDesc BSM_CLASS_DATA_AT
```

`MethodHandleDesc` representing String, Class, int) MethodHandles.classDataAt

**Since:** 21

## ConstantDescs.NULL

```java
public static final ConstantDesc NULL
```

Nominal descriptor representing the constant `null`

## ConstantDescs.TRUE

```java
public static final DynamicConstantDesc<Boolean> TRUE
```

Nominal descriptor representing the constant `Boolean.TRUE`

**Since:** 15

## ConstantDescs.FALSE

```java
public static final DynamicConstantDesc<Boolean> FALSE
```

Nominal descriptor representing the constant `Boolean.FALSE`

**Since:** 15

## ConstantDescs.INIT_NAME

```java
public static final String INIT_NAME
```

The special name of instance initialization methods, ``. An instance
initialization method has this special name and is `void`.

**jvms:** 2.9.1 Instance Initialization Methods

**Since:** 21

## ConstantDescs.CLASS_INIT_NAME

```java
public static final String CLASS_INIT_NAME
```

The special name of class initialization methods, ``. A class
initialization method has this special name, ACC_STATIC flag set, is void and takes no arguments.

**jvms:** 2.9.2 Class Initialization Methods

**Since:** 21

## ConstantDescs.MTD_void

```java
public static final MethodTypeDesc MTD_void
```

Nominal descriptor representing the method descriptor `()V`,
taking no argument and returning `void`.

**Since:** 21

## ConstantDescs.ofCallsiteBootstrap(ClassDesc, String, ClassDesc, ClassDesc...)

```java
public static DirectMethodHandleDesc ofCallsiteBootstrap(ClassDesc owner, String name, ClassDesc returnType, ClassDesc... paramTypes)
```

Returns a `MethodHandleDesc` corresponding to a bootstrap method for
an `invokedynamic` callsite, which is a static method whose leading
parameter types are `Lookup`, `String`, and `MethodType`.

Parameters:

- `owner`: the class declaring the method
- `name`: the unqualified name of the method
- `returnType`: the return type of the method
- `paramTypes`: the types of the static bootstrap arguments, if any

**Returns:** the `MethodHandleDesc`

**jvms:** 4.2.2 Unqualified Names

Throws:

- `NullPointerException`: if any of the arguments are null

## ConstantDescs.ofConstantBootstrap(ClassDesc, String, ClassDesc, ClassDesc...)

```java
public static DirectMethodHandleDesc ofConstantBootstrap(ClassDesc owner, String name, ClassDesc returnType, ClassDesc... paramTypes)
```

Returns a `MethodHandleDesc` corresponding to a bootstrap method for a
dynamic constant, which is a static method whose leading arguments are
`Lookup`, `String`, and `Class`.

Parameters:

- `owner`: the class declaring the method
- `name`: the unqualified name of the method
- `returnType`: the return type of the method
- `paramTypes`: the types of the static bootstrap arguments, if any

**Returns:** the `MethodHandleDesc`

**jvms:** 4.2.2 Unqualified Names

Throws:

- `NullPointerException`: if any of the arguments are null
