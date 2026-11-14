---
title: "TypeAnnotation interface (java.lang.classfile) (part 5 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/TypeAnnotation.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# TypeAnnotation interface (java.lang.classfile) (part 5 of 6)

## TypeAnnotation.TARGET_CLASS_TYPE_PARAMETER_BOUND

```java
int TARGET_CLASS_TYPE_PARAMETER_BOUND
```

The value of type annotation target type CLASS_TYPE_PARAMETER_BOUND.

## TypeAnnotation.TARGET_METHOD_TYPE_PARAMETER_BOUND

```java
int TARGET_METHOD_TYPE_PARAMETER_BOUND
```

The value of type annotation target type METHOD_TYPE_PARAMETER_BOUND.

## TypeAnnotation.TARGET_FIELD

```java
int TARGET_FIELD
```

The value of type annotation target type FIELD.

## TypeAnnotation.TARGET_METHOD_RETURN

```java
int TARGET_METHOD_RETURN
```

The value of type annotation target type METHOD_RETURN.

## TypeAnnotation.TARGET_METHOD_RECEIVER

```java
int TARGET_METHOD_RECEIVER
```

The value of type annotation target type METHOD_RECEIVER.

## TypeAnnotation.TARGET_METHOD_FORMAL_PARAMETER

```java
int TARGET_METHOD_FORMAL_PARAMETER
```

The value of type annotation target type METHOD_FORMAL_PARAMETER.

## TypeAnnotation.TARGET_THROWS

```java
int TARGET_THROWS
```

The value of type annotation target type THROWS.

## TypeAnnotation.TARGET_LOCAL_VARIABLE

```java
int TARGET_LOCAL_VARIABLE
```

The value of type annotation target type LOCAL_VARIABLE.

## TypeAnnotation.TARGET_RESOURCE_VARIABLE

```java
int TARGET_RESOURCE_VARIABLE
```

The value of type annotation target type RESOURCE_VARIABLE.

## TypeAnnotation.TARGET_EXCEPTION_PARAMETER

```java
int TARGET_EXCEPTION_PARAMETER
```

The value of type annotation target type EXCEPTION_PARAMETER.

## TypeAnnotation.TARGET_INSTANCEOF

```java
int TARGET_INSTANCEOF
```

The value of type annotation target type INSTANCEOF.

## TypeAnnotation.TARGET_NEW

```java
int TARGET_NEW
```

The value of type annotation target type NEW.

## TypeAnnotation.TARGET_CONSTRUCTOR_REFERENCE

```java
int TARGET_CONSTRUCTOR_REFERENCE
```

The value of type annotation target type CONSTRUCTOR_REFERENCE.

## TypeAnnotation.TARGET_METHOD_REFERENCE

```java
int TARGET_METHOD_REFERENCE
```

The value of type annotation target type METHOD_REFERENCE.

## TypeAnnotation.TARGET_CAST

```java
int TARGET_CAST
```

The value of type annotation target type CAST.

## TypeAnnotation.TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT

```java
int TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT
```

The value of type annotation target type CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT.

## TypeAnnotation.TARGET_METHOD_INVOCATION_TYPE_ARGUMENT

```java
int TARGET_METHOD_INVOCATION_TYPE_ARGUMENT
```

The value of type annotation target type METHOD_INVOCATION_TYPE_ARGUMENT.

## TypeAnnotation.TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT

```java
int TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT
```

The value of type annotation target type CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT.

## TypeAnnotation.TARGET_METHOD_REFERENCE_TYPE_ARGUMENT

```java
int TARGET_METHOD_REFERENCE_TYPE_ARGUMENT
```

The value of type annotation target type METHOD_REFERENCE_TYPE_ARGUMENT.

## TypeAnnotation.targetType()

```java
TargetType targetType()
```

## TypeAnnotation.size()

```java
default int size()
```

## TypeAnnotation.ofTypeParameter(TargetType, int)

```java
static TypeParameterTarget ofTypeParameter(TargetType targetType, int typeParameterIndex)
```

Parameters:

- `targetType`: `TargetType.CLASS_TYPE_PARAMETER` or `TargetType.METHOD_TYPE_PARAMETER`
- `typeParameterIndex`: specifies which type parameter declaration is annotated

## TypeAnnotation.ofClassTypeParameter(int)

```java
static TypeParameterTarget ofClassTypeParameter(int typeParameterIndex)
```

Parameters:

- `typeParameterIndex`: specifies which type parameter declaration is annotated

## TypeAnnotation.ofMethodTypeParameter(int)

```java
static TypeParameterTarget ofMethodTypeParameter(int typeParameterIndex)
```

Parameters:

- `typeParameterIndex`: specifies which type parameter declaration is annotated

## TypeAnnotation.ofClassExtends(int)

```java
static SupertypeTarget ofClassExtends(int supertypeIndex)
```

Parameters:

- `supertypeIndex`: the index into the interfaces array or 65535 to indicate it is the superclass

## TypeAnnotation.ofTypeParameterBound(TargetType, int, int)

```java
static TypeParameterBoundTarget ofTypeParameterBound(TargetType targetType, int typeParameterIndex, int boundIndex)
```

Parameters:

- `targetType`: `TargetType.CLASS_TYPE_PARAMETER_BOUND` or `TargetType.METHOD_TYPE_PARAMETER_BOUND`
- `typeParameterIndex`: specifies which type parameter declaration is annotated
- `boundIndex`: specifies which bound of the type parameter declaration is annotated

## TypeAnnotation.ofClassTypeParameterBound(int, int)

```java
static TypeParameterBoundTarget ofClassTypeParameterBound(int typeParameterIndex, int boundIndex)
```

Parameters:

- `typeParameterIndex`: specifies which type parameter declaration is annotated
- `boundIndex`: specifies which bound of the type parameter declaration is annotated

## TypeAnnotation.ofMethodTypeParameterBound(int, int)

```java
static TypeParameterBoundTarget ofMethodTypeParameterBound(int typeParameterIndex, int boundIndex)
```

Parameters:

- `typeParameterIndex`: specifies which type parameter declaration is annotated
- `boundIndex`: specifies which bound of the type parameter declaration is annotated

## TypeAnnotation.of(TargetType)

```java
static EmptyTarget of(TargetType targetType)
```

Parameters:

- `targetType`: `TargetType.FIELD`, `TargetType.METHOD_RETURN` or `TargetType.METHOD_RECEIVER`

## TypeAnnotation.ofField()

```java
static EmptyTarget ofField()
```

## TypeAnnotation.ofMethodReturn()

```java
static EmptyTarget ofMethodReturn()
```

## TypeAnnotation.ofMethodReceiver()

```java
static EmptyTarget ofMethodReceiver()
```

## TypeAnnotation.ofMethodFormalParameter(int)

```java
static FormalParameterTarget ofMethodFormalParameter(int formalParameterIndex)
```

The
index may differ from the index in the method descriptor because some
synthetic or implicit parameters are omitted.

Parameters:

- `formalParameterIndex`: specifies which formal parameter declaration has an annotated type

## TypeAnnotation.ofThrows(int)

```java
static ThrowsTarget ofThrows(int throwsTargetIndex)
```

Parameters:

- `throwsTargetIndex`: the index into the exception table of the Exceptions attribute of the method

## TypeAnnotation.ofVariable(TargetType, List<LocalVarTargetInfo>)

```java
static LocalVarTarget ofVariable(TargetType targetType, List<LocalVarTargetInfo> table)
```

Parameters:

- `targetType`: `TargetType.LOCAL_VARIABLE` or `TargetType.RESOURCE_VARIABLE`
- `table`: the list of local variable targets

## TypeAnnotation.ofLocalVariable(List<LocalVarTargetInfo>)

```java
static LocalVarTarget ofLocalVariable(List<LocalVarTargetInfo> table)
```

Parameters:

- `table`: the list of local variable targets

## TypeAnnotation.ofResourceVariable(List<LocalVarTargetInfo>)

```java
static LocalVarTarget ofResourceVariable(List<LocalVarTargetInfo> table)
```

Parameters:

- `table`: the list of local variable targets

## TypeAnnotation.ofExceptionParameter(int)

```java
static CatchTarget ofExceptionParameter(int exceptionTableIndex)
```

Parameters:

- `exceptionTableIndex`: the index into the exception table of the Code attribute

## TypeAnnotation.ofOffset(TargetType, Label)

```java
static OffsetTarget ofOffset(TargetType targetType, Label target)
```

Parameters:

- `targetType`: `TargetType.INSTANCEOF`, `TargetType.NEW`, `TargetType.CONSTRUCTOR_REFERENCE`, or `TargetType.METHOD_REFERENCE`
- `target`: the label right before the instruction

## TypeAnnotation.ofInstanceofExpr(Label)

```java
static OffsetTarget ofInstanceofExpr(Label target)
```

Parameters:

- `target`: the label right before the instruction

## TypeAnnotation.ofNewExpr(Label)

```java
static OffsetTarget ofNewExpr(Label target)
```

Parameters:

- `target`: the label right before the instruction

## TypeAnnotation.ofConstructorReference(Label)

```java
static OffsetTarget ofConstructorReference(Label target)
```

Parameters:

- `target`: the label right before the instruction

## TypeAnnotation.ofMethodReference(Label)

```java
static OffsetTarget ofMethodReference(Label target)
```

Parameters:

- `target`: the label right before the instruction

## TypeAnnotation.ofTypeArgument(TargetType, Label, int)

```java
static TypeArgumentTarget ofTypeArgument(TargetType targetType, Label target, int typeArgumentIndex)
```

Parameters:

- `targetType`: `TargetType.CAST`, `TargetType.CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT`, `TargetType.METHOD_INVOCATION_TYPE_ARGUMENT`, `TargetType.CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT`, or `TargetType.METHOD_REFERENCE_TYPE_ARGUMENT`
- `target`: the label right before the instruction
- `typeArgumentIndex`: specifies which type in the cast operator or argument is annotated

## TypeAnnotation.ofCastExpr(Label, int)

```java
static TypeArgumentTarget ofCastExpr(Label target, int typeArgumentIndex)
```

Parameters:

- `target`: the label right before the instruction
- `typeArgumentIndex`: specifies which type in the cast operator is annotated

## TypeAnnotation.ofConstructorInvocationTypeArgument(Label, int)

```java
static TypeArgumentTarget ofConstructorInvocationTypeArgument(Label target, int typeArgumentIndex)
```

Parameters:

- `target`: the label right before the instruction
- `typeArgumentIndex`: specifies which type in the argument is annotated

## TypeAnnotation.ofMethodInvocationTypeArgument(Label, int)

```java
static TypeArgumentTarget ofMethodInvocationTypeArgument(Label target, int typeArgumentIndex)
```

Parameters:

- `target`: the label right before the instruction
- `typeArgumentIndex`: specifies which type in the argument is annotated

## TypeAnnotation.ofConstructorReferenceTypeArgument(Label, int)

```java
static TypeArgumentTarget ofConstructorReferenceTypeArgument(Label target, int typeArgumentIndex)
```

Parameters:

- `target`: the label right before the instruction
- `typeArgumentIndex`: specifies which type in the argument is annotated

## TypeAnnotation.ofMethodReferenceTypeArgument(Label, int)

```java
static TypeArgumentTarget ofMethodReferenceTypeArgument(Label target, int typeArgumentIndex)
```

Parameters:

- `target`: the label right before the instruction
- `typeArgumentIndex`: specifies which type in the argument is annotated

## TypeAnnotation.typeParameterIndex()

```java
int typeParameterIndex()
```

JVMS: The value of the type_parameter_index item specifies which type parameter declaration is annotated.
A type_parameter_index value of 0 specifies the first type parameter declaration.

**Returns:** the index into the type parameters

## TypeAnnotation.supertypeIndex()

```java
int supertypeIndex()
```

JVMS: A supertype_index value of 65535 specifies that the annotation appears on the superclass in an extends
clause of a class declaration.

Any other supertype_index value is an index into the interfaces array of the enclosing ClassFile structure,
and specifies that the annotation appears on that superinterface in either the implements clause of a class
declaration or the extends clause of an interface declaration.

**Returns:** the index into the interfaces array or 65535 to indicate it is the superclass

## TypeAnnotation.typeParameterIndex()

```java
int typeParameterIndex()
```

Which type parameter declaration has an annotated bound.

**Returns:** the zero-origin index into the type parameters

## TypeAnnotation.boundIndex()

```java
int boundIndex()
```

Which bound of the type parameter declaration is annotated.

**Returns:** the zero-origin index into bounds on the type parameter

## TypeAnnotation.formalParameterIndex()

```java
int formalParameterIndex()
```

The index may differ from the
index in the method descriptor because some synthetic or implicit
parameters are omitted.

## TypeAnnotation.throwsTargetIndex()

```java
int throwsTargetIndex()
```

The index into the exception_index_table array of the
Exceptions attribute of the method_info structure enclosing the
RuntimeVisibleTypeAnnotations attribute.

**Returns:** the index into the list java.lang.classfile.attribute.ExceptionsAttribute.exceptions()

## TypeAnnotation.table()

```java
List<LocalVarTargetInfo> table()
```

## TypeAnnotation.startLabel()

```java
Label startLabel()
```

The given local variable has a value at indices into the code array in the interval
[start_pc, start_pc + length), that is, between start_pc inclusive and start_pc + length exclusive.

**Returns:** the start of the bytecode section

## TypeAnnotation.endLabel()

```java
Label endLabel()
```

The given local variable has a value at indices into the code array in the interval
[start_pc, start_pc + length), that is, between start_pc inclusive and start_pc + length exclusive.

**Returns:** the end of the bytecode section

## TypeAnnotation.index()

```java
int index()
```

The given local variable must be at index in the local variable array of the current frame.

If the local variable at index is of type double or long, it occupies both index and index + 1.

**Returns:** the index into the local variables

## TypeAnnotation.of(Label, Label, int)

```java
static LocalVarTargetInfo of(Label startLabel, Label endLabel, int index)
```

Parameters:

- `startLabel`: the code label indicating start of an interval where variable has value
- `endLabel`: the code label indicating start of an interval where variable has value
- `index`: index into the local variables

## TypeAnnotation.exceptionTableIndex()

```java
int exceptionTableIndex()
```

The index into the exception_table array of the Code
attribute enclosing the RuntimeVisibleTypeAnnotations attribute.

**Returns:** the index into the exception table

## TypeAnnotation.target()

```java
Label target()
```

The label right before the `Instruction` corresponding to the
instanceof expression, the new expression, or the method reference
expression.

**Returns:** the label right before the instruction

## TypeAnnotation.target()

```java
Label target()
```

The label right before the `Instruction` corresponding to the
cast expression, the new expression, the explicit constructor
invocation statement, the method invocation expression, or the method
reference expression.

**Returns:** the label right before the instruction

## TypeAnnotation.typeArgumentIndex()

```java
int typeArgumentIndex()
```

For a cast expression, the value of the type_argument_index item specifies which type in the cast
operator is annotated. A type_argument_index value of 0 specifies the first (or only) type in the cast
operator.

The possibility of more than one type in a cast expression arises from a cast to an intersection type.

For an explicit type argument list, the value of the type_argument_index item specifies which type argument
is annotated. A type_argument_index value of 0 specifies the first type argument.

**Returns:** the index into the type arguments
