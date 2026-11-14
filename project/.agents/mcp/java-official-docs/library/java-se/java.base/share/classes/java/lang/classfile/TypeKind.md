# TypeKind enum (java.lang.classfile)

```java
public enum TypeKind
```

Describes the data types Java Virtual Machine operates on.  This omits {@code
returnAddress} (JVMS {@jvms 2.3.3}) and includes {@link #VOID void} (JVMS
{@jvms 4.3.3}), which appears as a method return type.
<p>
The <code>{@index returnAddress}</code> type is only used by discontinued
{@linkplain DiscontinuedInstruction.JsrInstruction jump subroutine} and
{@linkplain DiscontinuedInstruction.RetInstruction return from subroutine}
instructions.  Jump subroutine instructions push {@code returnAddress} to the
operand stack; {@link StoreInstruction astore} instructions store {@code
returnAddress} from the operand stack to local variables; return from
subroutine instructions load {@code returnAddress} from local variables.

<h2 id="computational-type">Computational Type</h2>
In the {@code class} file format, local variables (JVMS {@jvms 2.6.1}),
and the operand stack (JVMS {@jvms 2.6.2}) of the Java Virtual Machine,
{@link #BOOLEAN boolean}, {@link #BYTE byte}, {@link #CHAR char},
{@link #SHORT short} types do not exist and are {@linkplain
#asLoadable() represented} by the {@link #INT int} computational type.
{@link #INT int}, {@link #FLOAT float}, {@link #REFERENCE reference},
{@code returnAddress}, {@link #LONG long}, and {@link #DOUBLE doule}
are the computational types of the Java Virtual Machine.

@jvms 2.2 Data Types
@jvms 2.11.1 Types and the Java Virtual Machine
@since 24

## TypeKind.upperBound()

```java
public ClassDesc upperBound()
```

{@return the most specific upper bound field descriptor that can store any value
of this type} This is the primitive class descriptor for primitive types and
{@link #VOID void} and {@link ConstantDescs#CD_Object Object} descriptor for
{@link #REFERENCE reference}.

## TypeKind.newarrayCode()

```java
public int newarrayCode()
```

{@return the code used by the {@link Opcode#NEWARRAY newarray} instruction to create an array
of this component type, or {@code -1} if this type is not supported by {@code newarray}}

@jvms 6.5.newarray <em>newarray</em>
@see NewPrimitiveArrayInstruction
@see #fromNewarrayCode(int) fromNewarrayCode(int)

## TypeKind.slotSize()

```java
public int slotSize()
```

{@return the number of local variable index or operand stack depth consumed by this type}
This is also the category of this type for instructions operating on the operand stack without
regard to type (JVMS {@jvms 2.11.1}), such as {@link Opcode#POP pop} versus {@link Opcode#POP2
pop2}.

@jvms 2.6.1 Local Variables
@jvms 2.6.2 Operand Stacks

## TypeKind.asLoadable()

```java
public TypeKind asLoadable()
```

{@return the {@linkplain ##computational-type computational type} for this type, or {@link #VOID void}
for {@code void}}

@see LoadInstruction
@see StoreInstruction

## TypeKind.fromNewarrayCode(int)

```java
public static TypeKind fromNewarrayCode(int newarrayCode)
```

{@return the component type described by the array code used as an operand to {@link Opcode#NEWARRAY
newarray}}

@param newarrayCode the operand of the {@code newarray} instruction
@throws IllegalArgumentException if the code is invalid
@jvms 6.5.newarray <em>newarray</em>
@see NewPrimitiveArrayInstruction
@see #newarrayCode() newarrayCode()

## TypeKind.fromDescriptor(CharSequence)

```java
public static TypeKind fromDescriptor(CharSequence s)
```

{@return the type associated with the specified field descriptor}
@param s the field descriptor
@throws IllegalArgumentException only if the descriptor is not valid

## TypeKind.from(TypeDescriptor.OfField<?>)

```java
public static TypeKind from(TypeDescriptor.OfField<?> descriptor)
```

{@return the type associated with the specified field descriptor}
@param descriptor the field descriptor