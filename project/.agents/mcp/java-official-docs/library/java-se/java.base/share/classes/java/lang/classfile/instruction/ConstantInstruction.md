# ConstantInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface ConstantInstruction extends Instruction
```

Models a constant-load instruction in the {@code code} array of a {@code
Code} attribute, including {@linkplain IntrinsicConstantInstruction
"intrinsic"}, {@linkplain ArgumentConstantInstruction "argument"}, and
{@linkplain LoadConstantInstruction "load"} constant instructions.
Corresponding opcodes have a {@linkplain Opcode#kind() kind} of {@link
Opcode.Kind#CONSTANT}.  Delivered as a {@link CodeElement} when traversing
the elements of a {@link CodeModel}.
<p>
The loaded constant value is symbolically represented as a {@link ConstantDesc}:
{@snippet lang=text :
// @link substring="ConstantInstruction" target="CodeBuilder#loadConstant(ConstantDesc)" :
ConstantInstruction(ConstantDesc constantValue) // @link substring="constantValue" target="#constantValue()"
}

@see Opcode.Kind#CONSTANT
@see CodeBuilder#loadConstant(ConstantDesc) CodeBuilder::loadConstant
@sealedGraph
@since 24

## ConstantInstruction.constantValue()

```java
ConstantDesc constantValue()
```

{@return the constant value}

## ConstantInstruction.typeKind()

```java
TypeKind typeKind()
```

{@return the {@linkplain TypeKind##computational-type computational type} of the constant}
This is derived from the {@link #constantValue() constantValue}.

## ConstantInstruction.constantEntry()

```java
LoadableConstantEntry constantEntry()
```

{@return the constant value}

## ConstantInstruction.ofIntrinsic(Opcode)

```java
static IntrinsicConstantInstruction ofIntrinsic(Opcode op)
```

{@return an intrinsic constant instruction}

@param op the opcode for the specific type of intrinsic constant instruction,
          which must be of kind {@link Opcode.Kind#CONSTANT}
@throws IllegalArgumentException if the opcode does not represent a constant
                                 with implicit value

## ConstantInstruction.ofArgument(Opcode, int)

```java
static ArgumentConstantInstruction ofArgument(Opcode op, int value)
```

{@return an argument constant instruction}
<p>
{@code value} must be in the range of {@code byte}, {@code [-128, 127]},
for {@link Opcode#BIPUSH}, and in the range of {@code short}, {@code
[-32768, 32767]}, for {@link Opcode#SIPUSH}.

@param op the opcode for the specific type of argument constant instruction,
          which must be {@link Opcode#BIPUSH} or {@link Opcode#SIPUSH}
@param value the constant value
@throws IllegalArgumentException if the opcode is not {@link Opcode#BIPUSH}
        or {@link Opcode#SIPUSH}, or if the constant value is out of range
        for the opcode

## ConstantInstruction.ofLoad(Opcode, LoadableConstantEntry)

```java
static LoadConstantInstruction ofLoad(Opcode op, LoadableConstantEntry constant)
```

{@return a load constant instruction}

@param op the opcode for the specific type of load constant instruction,
          which must be of kind {@link Opcode.Kind#CONSTANT}
@param constant the constant value
@throws IllegalArgumentException if the opcode is not {@link Opcode#LDC},
                                 {@link Opcode#LDC_W}, or {@link Opcode#LDC2_W}