# CodeBuilder interface (java.lang.classfile)

```java
public sealed interface CodeBuilder extends ClassFileBuilder<CodeElement, CodeBuilder> permits CodeBuilder.BlockCodeBuilder, ChainedCodeBuilder, TerminalCodeBuilder, NonterminalCodeBuilder
```

A builder for {@link CodeModel Code} attributes (method bodies).  {@link
MethodBuilder#withCode} is the basic way to obtain a code builder; {@link
ClassBuilder#withMethodBody} is a shortcut.  There are also derived code
builders from {@link #block}, which handles code blocks and {@link
#transforming}, which runs transforms on existing handlers, both of which
requires a code builder to be available first.
<p>
Refer to {@link ClassFileBuilder} for general guidance and caution around
the use of builders for structures in the {@code class} file format.  Unlike
in other builders, the order of member elements in a code builder is
significant: they affect the resulting bytecode.  Many Class-File API options
affect code builders: {@link DeadCodeOption} and {@link ShortJumpsOption}
affect the resulting bytecode, and {@link DeadLabelsOption}, {@link
DebugElementsOption}, {@link LineNumbersOption}, {@link StackMapsOption}, and
{@link AttributesProcessingOption} affect the resulting attributes on the
built {@code Code} attribute, that some elements sent to a code builder is
otherwise ignored.

<h2 id="instruction-factories">Instruction Factories</h2>
{@code CodeBuilder} provides convenience methods to create instructions (See
JVMS {@jvms 6.5} Instructions) by their mnemonic, taking necessary operands.
<ul>
<li>Instructions that encode their operands in their opcode, such as {@code
aload_<n>}, share their factories with their generic version like {@link
#aload aload}. Note that some constant instructions, such as {@link #iconst_1
iconst_1}, do not have generic versions, and thus have their own factories.
<li>Instructions that accept wide operands, such as {@code ldc2_w} or {@code
wide}, share their factories with their regular version like {@link #ldc}.
Note that {@link #goto_w goto_w} has its own factory to avoid {@linkplain
ShortJumpsOption short jumps}.
<li>The {@code goto}, {@code instanceof}, {@code new}, and {@code return}
instructions' factories are named {@link #goto_ goto_}, {@link #instanceOf
instanceOf}, {@link #new_ new_}, and {@link #return_() return_} respectively,
due to clashes with keywords in the Java programming language.
<li>Factories are not provided for instructions {@link Opcode#JSR jsr},
{@link Opcode#JSR_W jsr_w}, {@link Opcode#RET ret}, and {@link Opcode#RET_W
wide ret}, which cannot appear in class files with major version {@value
ClassFile#JAVA_7_VERSION} or higher. (JVMS {@jvms 4.9.1})  They can still be
provided via {@link #with}.
</ul>

@see MethodBuilder#withCode
@see CodeModel
@see CodeTransform
@since 24

## CodeBuilder.newLabel()

```java
Label newLabel()
```

{@return a fresh unbound label}
The label can be bound with {@link #labelBinding}.

## CodeBuilder.startLabel()

```java
Label startLabel()
```

{@return the label associated with the beginning of the current block}
If this builder is not a "block" builder, such as those provided by
{@link #block(Consumer)} or {@link #ifThenElse(Consumer, Consumer)},
the current block will be the entire method body.

## CodeBuilder.endLabel()

```java
Label endLabel()
```

{@return the label associated with the end of the current block}
If this builder is not a "block" builder, such as those provided by
{@link #block(Consumer)} or {@link #ifThenElse(Consumer, Consumer)},
the current block will be the entire method body.

## CodeBuilder.receiverSlot()

```java
int receiverSlot()
```

{@return the local variable slot associated with the receiver}

@throws IllegalStateException if this is a static method

## CodeBuilder.parameterSlot(int)

```java
int parameterSlot(int paramNo)
```

{@return the local variable slot associated with the specified parameter}
The returned value is adjusted for the receiver slot (if the method is
an instance method) and for the requirement that {@link TypeKind#LONG
long} and {@link TypeKind#DOUBLE double}
values require two slots.

@param paramNo the index of the parameter
@throws IndexOutOfBoundsException if the parameter index is out of bounds

## CodeBuilder.allocateLocal(TypeKind)

```java
int allocateLocal(TypeKind typeKind)
```

{@return the local variable slot of a fresh local variable}  This method
makes reasonable efforts to determine which slots are in use and which
are not.  When transforming a method, fresh locals begin at the {@code
maxLocals} of the original method.  For a method being built directly,
fresh locals begin after the last parameter slot.
<p>
If the current code builder is a {@link BlockCodeBuilder}, at the end of
the block, locals are reset to their value at the beginning of the block.

@param typeKind the type of the local variable

## CodeBuilder.transforming(CodeTransform, Consumer<CodeBuilder>)

```java
default CodeBuilder transforming(CodeTransform transform, Consumer<CodeBuilder> handler)
```

Apply a transform to the code built by a handler, directing results to
this builder.

@apiNote
This is similar to {@link #transform}, but this does not require the
code elements to be viewed as a {@link CodeModel} first.

@param transform the transform to apply to the code built by the handler
@param handler the handler that receives a {@link CodeBuilder} to
build the code
@return this builder

## CodeBuilder.breakLabel()

```java
Label breakLabel()
```

{@return the label locating where control is passed back to the
parent block}  A branch to this label "break"'s out of the current
block.
<p>
If the last instruction in this block does not lead to the break
label, Class-File API may append instructions to target the "break"
label to the built block.

## CodeBuilder.block(Consumer<BlockCodeBuilder>)

```java
default CodeBuilder block(Consumer<BlockCodeBuilder> handler)
```

Adds a lexical block to the method being built.
<p>
Within this block, the {@link #startLabel()} and {@link #endLabel()}
correspond to the start and end of the block, and the {@link
BlockCodeBuilder#breakLabel()} also corresponds to the end of the block,
or the cursor position immediately after this call in this builder.

@param handler handler that receives a {@link BlockCodeBuilder} to
generate the body of the lexical block
@return this builder

## CodeBuilder.ifThen(Consumer<BlockCodeBuilder>)

```java
default CodeBuilder ifThen(Consumer<BlockCodeBuilder> thenHandler)
```

Adds an "if-then" block that is conditional on the {@link TypeKind#BOOLEAN
boolean} value on top of the operand stack.  Control flow enters the
"then" block if the value represents {@code true}.
<p>
The {@link BlockCodeBuilder#breakLabel()} for the "then" block corresponds
to the cursor position immediately after this call in this builder.

@param thenHandler handler that receives a {@linkplain BlockCodeBuilder}
                   to generate the body of the {@code if}
@return this builder
@see #ifThen(Opcode, Consumer)

## CodeBuilder.ifThen(Opcode, Consumer<BlockCodeBuilder>)

```java
default CodeBuilder ifThen(Opcode opcode, Consumer<BlockCodeBuilder> thenHandler)
```

Adds an "if-then" block that is conditional on the value(s) on top of the
operand stack in accordance with the given opcode.  Control flow enters
the "then" block if the branching condition for {@code opcode} succeeds.
<p>
The {@link BlockCodeBuilder#breakLabel()} for the "then" block corresponds
to the cursor position immediately after this call in this builder.

@param opcode the operation code for a branch instruction that accepts
              one or two operands on the stack
@param thenHandler handler that receives a {@link BlockCodeBuilder} to
                   generate the body of the {@code if}
@return this builder
@throws IllegalArgumentException if the operation code is not for a
        branch instruction that accepts one or two operands

## CodeBuilder.ifThenElse(Consumer<BlockCodeBuilder>, Consumer<BlockCodeBuilder>)

```java
default CodeBuilder ifThenElse(Consumer<BlockCodeBuilder> thenHandler, Consumer<BlockCodeBuilder> elseHandler)
```

Adds an "if-then-else" block that is conditional on the {@link
TypeKind#BOOLEAN boolean} value on top of the operand stack.  Control
flow enters the "then" block if the value represents {@code true}, and
enters the "else" block otherwise.
<p>
The {@link BlockCodeBuilder#breakLabel()} for each block corresponds to
the cursor position immediately after this call in this builder.

@param thenHandler handler that receives a {@link BlockCodeBuilder} to
                   generate the body of the {@code if}
@param elseHandler handler that receives a {@link BlockCodeBuilder} to
                   generate the body of the {@code else}
@return this builder
@see #ifThenElse(Opcode, Consumer, Consumer)

## CodeBuilder.ifThenElse(Opcode, Consumer<BlockCodeBuilder>, Consumer<BlockCodeBuilder>)

```java
default CodeBuilder ifThenElse(Opcode opcode, Consumer<BlockCodeBuilder> thenHandler, Consumer<BlockCodeBuilder> elseHandler)
```

Adds an "if-then-else" block that is conditional on the value(s) on top
of the operand stack in accordance with the given opcode.  Control flow
enters the "then" block if the branching condition for {@code opcode}
succeeds, and enters the "else" block otherwise.
<p>
The {@link BlockCodeBuilder#breakLabel()} for each block corresponds to
the cursor position immediately after this call in this builder.

@param opcode the operation code for a branch instruction that accepts
              one or two operands on the stack
@param thenHandler handler that receives a {@linkplain BlockCodeBuilder}
                   to generate the body of the {@code if}
@param elseHandler handler that receives a {@linkplain BlockCodeBuilder}
                   to generate the body of the {@code else}
@return this builder
@throws IllegalArgumentException if the operation code is not for a
        branch instruction that accepts one or two operands

## CodeBuilder.catching(ClassDesc, Consumer<BlockCodeBuilder>)

```java
CatchBuilder catching(ClassDesc exceptionType, Consumer<BlockCodeBuilder> catchHandler)
```

Adds a catch block that catches an exception of the given type.
<p>
The caught exception will be on top of the operand stack when the
catch block is entered.
<p>
The {@link BlockCodeBuilder#breakLabel()} for the catch block corresponds
to the break label of the {@code tryHandler} block in {@link #trying}.
<p>
If the type of exception is {@code null} then the catch block catches
all exceptions.

@param exceptionType the type of exception to catch, may be {@code null}
@param catchHandler handler that receives a {@link BlockCodeBuilder} to
                    generate the body of the catch block
@return this builder
@throws IllegalArgumentException if an existing catch block catches
        an exception of the given type or {@code exceptionType}
        represents a primitive type
@see #catchingMulti
@see #catchingAll

## CodeBuilder.catchingMulti(List<ClassDesc>, Consumer<BlockCodeBuilder>)

```java
CatchBuilder catchingMulti(List<ClassDesc> exceptionTypes, Consumer<BlockCodeBuilder> catchHandler)
```

Adds a catch block that catches exceptions of the given types.
<p>
The caught exception will be on top of the operand stack when the
catch block is entered.
<p>
The {@link BlockCodeBuilder#breakLabel()} for the catch block corresponds
to the break label of the {@code tryHandler} block in {@link #trying}.
<p>
If list of exception types is empty then the catch block catches all
exceptions.

@param exceptionTypes the types of exception to catch
@param catchHandler handler that receives a {@link BlockCodeBuilder}
                    to generate the body of the catch block
@return this builder
@throws IllegalArgumentException if an existing catch block catches
        one or more exceptions of the given types
@see #catching
@see #catchingAll

## CodeBuilder.catchingAll(Consumer<BlockCodeBuilder>)

```java
void catchingAll(Consumer<BlockCodeBuilder> catchAllHandler)
```

Adds a "catch" block that catches all exceptions.
<p>
The {@link BlockCodeBuilder#breakLabel()} for the catch block corresponds
to the break label of the {@code tryHandler} block in {@link #trying}.
<p>
The caught exception will be on top of the operand stack when the
catch block is entered.

@param catchAllHandler handler that receives a {@link BlockCodeBuilder}
                       to generate the body of the catch block
@throws IllegalArgumentException if an existing catch block catches
        all exceptions
@see #catching
@see #catchingMulti

## CodeBuilder.trying(Consumer<BlockCodeBuilder>, Consumer<CatchBuilder>)

```java
default CodeBuilder trying(Consumer<BlockCodeBuilder> tryHandler, Consumer<CatchBuilder> catchesHandler)
```

Adds a "try-catch" block comprising one try block and zero or more catch
blocks.  Exceptions thrown by instructions in the try block may be caught
by catch blocks.
<p>
The {@link BlockCodeBuilder#breakLabel()} for the try block and all
catch blocks in the {@code catchesHandler} correspond to the cursor
position immediately after this call in this builder.

@param tryHandler handler that receives a {@link BlockCodeBuilder} to
                  generate the body of the try block.
@param catchesHandler a handler that receives a {@link CatchBuilder}
                      to generate bodies of catch blocks
@return this builder
@throws IllegalArgumentException if the try block is empty
@see CatchBuilder
@see ExceptionCatch
@see #exceptionCatch

## CodeBuilder.loadLocal(TypeKind, int)

```java
default CodeBuilder loadLocal(TypeKind tk, int slot)
```

Generates an instruction to load a value from a local variable.

@param tk the load type
@param slot the local variable slot
@return this builder
@throws IllegalArgumentException if {@code tk} is {@link TypeKind#VOID
        void} or {@code slot} is out of range
@see LoadInstruction

## CodeBuilder.storeLocal(TypeKind, int)

```java
default CodeBuilder storeLocal(TypeKind tk, int slot)
```

Generates an instruction to store a value to a local variable.

@param tk the store type
@param slot the local variable slot
@return this builder
@throws IllegalArgumentException if {@code tk} is {@link TypeKind#VOID
        void} or {@code slot} is out of range
@see StoreInstruction

## CodeBuilder.branch(Opcode, Label)

```java
default CodeBuilder branch(Opcode op, Label target)
```

Generates a branch instruction.
<p>
This may generate multiple instructions to accomplish the same effect if
{@link ClassFile.ShortJumpsOption#FIX_SHORT_JUMPS} is set, the
opcode has {@linkplain Opcode#sizeIfFixed() size} 3, and {@code target}
cannot be encoded as a BCI offset in {@code [-32768, 32767]}.

@param op the branch opcode
@param target the branch target
@return this builder
@throws IllegalArgumentException if {@code op} is not of {@link
        Opcode.Kind#BRANCH}
@see BranchInstruction

## CodeBuilder.return_(TypeKind)

```java
default CodeBuilder return_(TypeKind tk)
```

Generates a return instruction.

@param tk the return type
@return this builder
@see ReturnInstruction

## CodeBuilder.fieldAccess(Opcode, FieldRefEntry)

```java
default CodeBuilder fieldAccess(Opcode opcode, FieldRefEntry ref)
```

Generates an instruction to access a field.

@param opcode the field access opcode
@param ref the field reference
@return this builder
@throws IllegalArgumentException if {@code opcode} is not of {@link
        Opcode.Kind#FIELD_ACCESS}
@see FieldInstruction

## CodeBuilder.fieldAccess(Opcode, ClassDesc, String, ClassDesc)

```java
default CodeBuilder fieldAccess(Opcode opcode, ClassDesc owner, String name, ClassDesc type)
```

Generates an instruction to access a field.

@param opcode the field access opcode
@param owner the class
@param name the field name
@param type the field type
@return this builder
@throws IllegalArgumentException if {@code opcode} is not of {@link
        Opcode.Kind#FIELD_ACCESS}, or {@code owner} is primitive
@see FieldInstruction

## CodeBuilder.invoke(Opcode, MemberRefEntry)

```java
default CodeBuilder invoke(Opcode opcode, MemberRefEntry ref)
```

Generates an instruction to invoke a method.

@param opcode the invoke opcode
@param ref the interface method or method reference
@return this builder
@throws IllegalArgumentException if {@code opcode} is not of {@link
        Opcode.Kind#INVOKE}
@see InvokeInstruction

## CodeBuilder.invoke(Opcode, ClassDesc, String, MethodTypeDesc, boolean)

```java
default CodeBuilder invoke(Opcode opcode, ClassDesc owner, String name, MethodTypeDesc desc, boolean isInterface)
```

Generates an instruction to invoke a method.

@param opcode the invoke opcode
@param owner the class
@param name the method name
@param desc the method type
@param isInterface whether the owner class is an interface
@return this builder
@throws IllegalArgumentException if {@code opcode} is not of {@link
        Opcode.Kind#INVOKE}, or {@code owner} is primitive
@see InvokeInstruction

## CodeBuilder.arrayLoad(TypeKind)

```java
default CodeBuilder arrayLoad(TypeKind tk)
```

Generates an instruction to load from an array.

@param tk the array element type
@return this builder
@throws IllegalArgumentException if {@code tk} is {@link TypeKind#VOID
        void}
@see ArrayLoadInstruction

## CodeBuilder.arrayStore(TypeKind)

```java
default CodeBuilder arrayStore(TypeKind tk)
```

Generates an instruction to store into an array.

@param tk the array element type
@return this builder
@throws IllegalArgumentException if {@code tk} is {@link TypeKind#VOID
        void}
@see ArrayStoreInstruction

## CodeBuilder.conversion(TypeKind, TypeKind)

```java
default CodeBuilder conversion(TypeKind fromType, TypeKind toType)
```

Generates instruction(s) to convert {@code fromType} to {@code toType}.

@param fromType the source type
@param toType the target type
@return this builder
@throws IllegalArgumentException for conversions of {@link TypeKind#VOID
        void} or {@link TypeKind#REFERENCE reference}
@see ConvertInstruction

## CodeBuilder.loadConstant(ConstantDesc)

```java
default CodeBuilder loadConstant(ConstantDesc value)
```

Generates an instruction pushing a constant onto the operand stack.

@param value the constant value, may be {@code null}
@return this builder
@see ConstantInstruction

## CodeBuilder.loadConstant(int)

```java
default CodeBuilder loadConstant(int value)
```

Generates an instruction pushing a constant {@link TypeKind#INT int}
value onto the operand stack.  This is equivalent to {@link
#loadConstant(ConstantDesc) loadConstant(Integer.valueOf(value))}.

@param value the int value
@return this builder
@see ConstantInstruction

## CodeBuilder.loadConstant(long)

```java
default CodeBuilder loadConstant(long value)
```

Generates an instruction pushing a constant {@link TypeKind#LONG long}
value onto the operand stack.  This is equivalent to {@link
#loadConstant(ConstantDesc) loadConstant(Long.valueOf(value))}.

@param value the long value
@return this builder
@see ConstantInstruction

## CodeBuilder.loadConstant(float)

```java
default CodeBuilder loadConstant(float value)
```

Generates an instruction pushing a constant {@link TypeKind#FLOAT float}
value onto the operand stack.  This is equivalent to {@link
#loadConstant(ConstantDesc) loadConstant(Float.valueOf(value))}.
<p>
All NaN values of the {@code float} may or may not be collapsed
into a single {@linkplain Float#NaN "canonical" NaN value}.

@param value the float value
@return this builder
@see ConstantInstruction

## CodeBuilder.loadConstant(double)

```java
default CodeBuilder loadConstant(double value)
```

Generates an instruction pushing a constant {@link TypeKind#DOUBLE double}
value onto the operand stack.  This is equivalent to {@link
#loadConstant(ConstantDesc) loadConstant(Double.valueOf(value))}.
<p>
All NaN values of the {@code double} may or may not be collapsed
into a single {@linkplain Double#NaN "canonical" NaN value}.

@param value the double value
@return this builder
@see ConstantInstruction

## CodeBuilder.nop()

```java
default CodeBuilder nop()
```

Generates a do-nothing instruction.

@return this builder
@see NopInstruction

## CodeBuilder.newBoundLabel()

```java
default Label newBoundLabel()
```

Creates a new label bound at the current position.

@return this builder
@see #newLabel()
@see #labelBinding

## CodeBuilder.labelBinding(Label)

```java
default CodeBuilder labelBinding(Label label)
```

Binds a label to the current position.

@apiNote
The label to bind does not have to be {@linkplain #newLabel() from this
builder}; it can be from another parsed {@link CodeModel}.

@param label the label
@return this builder
@see LabelTarget

## CodeBuilder.lineNumber(int)

```java
default CodeBuilder lineNumber(int line)
```

Declares a source line number beginning at the current position.
<p>
This call may be ignored according to {@link ClassFile.LineNumbersOption}.

@param line the line number
@return this builder
@see LineNumber

## CodeBuilder.exceptionCatch(Label, Label, Label, ClassEntry)

```java
default CodeBuilder exceptionCatch(Label start, Label end, Label handler, ClassEntry catchType)
```

Declares an exception table entry.
<p>
This call may be ignored if any of the argument labels is not {@linkplain
#labelBinding bound} and {@link ClassFile.DeadLabelsOption#DROP_DEAD_LABELS}
is set.

@param start the try block start
@param end the try block end
@param handler the exception handler start
@param catchType the catch type, may be {@code null} to catch all exceptions and errors
@return this builder
@see ExceptionCatch
@see CodeBuilder#trying

## CodeBuilder.exceptionCatch(Label, Label, Label, Optional<ClassEntry>)

```java
default CodeBuilder exceptionCatch(Label start, Label end, Label handler, Optional<ClassEntry> catchType)
```

Declares an exception table entry.
<p>
This call may be ignored if any of the argument labels is not {@linkplain
#labelBinding bound} and {@link ClassFile.DeadLabelsOption#DROP_DEAD_LABELS}
is set.

@param start the try block start
@param end the try block end
@param handler the exception handler start
@param catchType the optional catch type, empty to catch all exceptions and errors
@return this builder
@see ExceptionCatch
@see CodeBuilder#trying

## CodeBuilder.exceptionCatch(Label, Label, Label, ClassDesc)

```java
default CodeBuilder exceptionCatch(Label start, Label end, Label handler, ClassDesc catchType)
```

Declares an exception table entry.
<p>
This call may be ignored if any of the argument labels is not {@linkplain
#labelBinding bound} and {@link ClassFile.DeadLabelsOption#DROP_DEAD_LABELS}
is set.

@param start the try block start
@param end the try block end
@param handler the exception handler start
@param catchType the catch type
@return this builder
@throws IllegalArgumentException if {@code catchType} is primitive
@see ExceptionCatch
@see CodeBuilder#trying

## CodeBuilder.exceptionCatchAll(Label, Label, Label)

```java
default CodeBuilder exceptionCatchAll(Label start, Label end, Label handler)
```

Declares an exception table entry catching all exceptions and errors.
<p>
This call may be ignored if any of the argument labels is not {@linkplain
#labelBinding bound} and {@link ClassFile.DeadLabelsOption#DROP_DEAD_LABELS}
is set.

@param start the try block start
@param end the try block end
@param handler the exception handler start
@return this builder
@see ExceptionCatch
@see CodeBuilder#trying

## CodeBuilder.characterRange(Label, Label, int, int, int)

```java
default CodeBuilder characterRange(Label startScope, Label endScope, int characterRangeStart, int characterRangeEnd, int flags)
```

Declares a character range entry.
<p>
This call may be ignored if {@link ClassFile.DebugElementsOption#DROP_DEBUG}
is set, or if any of the argument labels is not {@linkplain #labelBinding
bound} and {@link ClassFile.DeadLabelsOption#DROP_DEAD_LABELS} is set.

@param startScope the start scope of the character range
@param endScope the end scope of the character range
@param characterRangeStart the encoded start of the character range region (inclusive)
@param characterRangeEnd the encoded end of the character range region (exclusive)
@param flags the flags word, indicating the kind of range
@return this builder
@see CharacterRange

## CodeBuilder.localVariable(int, Utf8Entry, Utf8Entry, Label, Label)

```java
default CodeBuilder localVariable(int slot, Utf8Entry nameEntry, Utf8Entry descriptorEntry, Label startScope, Label endScope)
```

Declares a local variable entry.
<p>
This call may be ignored if {@link ClassFile.DebugElementsOption#DROP_DEBUG}
is set, or if any of the argument labels is not {@linkplain #labelBinding
bound} and {@link ClassFile.DeadLabelsOption#DROP_DEAD_LABELS} is set.

@param slot the local variable slot
@param nameEntry the variable name
@param descriptorEntry the variable descriptor
@param startScope the start scope of the variable
@param endScope the end scope of the variable
@return this builder
@throws IllegalArgumentException if {@code slot} is out of range
@see LocalVariable

## CodeBuilder.localVariable(int, String, ClassDesc, Label, Label)

```java
default CodeBuilder localVariable(int slot, String name, ClassDesc descriptor, Label startScope, Label endScope)
```

Declares a local variable entry.
<p>
This call may be ignored if {@link ClassFile.DebugElementsOption#DROP_DEBUG}
is set, or if any of the argument labels is not {@linkplain #labelBinding
bound} and {@link ClassFile.DeadLabelsOption#DROP_DEAD_LABELS} is set.

@param slot the local variable slot
@param name the variable name
@param descriptor the variable descriptor
@param startScope the start scope of the variable
@param endScope the end scope of the variable
@return this builder
@throws IllegalArgumentException if {@code slot} is out of range
@see LocalVariable

## CodeBuilder.localVariableType(int, Utf8Entry, Utf8Entry, Label, Label)

```java
default CodeBuilder localVariableType(int slot, Utf8Entry nameEntry, Utf8Entry signatureEntry, Label startScope, Label endScope)
```

Declares a local variable type entry.
<p>
This call may be ignored if {@link ClassFile.DebugElementsOption#DROP_DEBUG}
is set, or if any of the argument labels is not {@linkplain #labelBinding
bound} and {@link ClassFile.DeadLabelsOption#DROP_DEAD_LABELS} is set.

@apiNote
When a local variable type entry is declared, a local variable entry with
the descriptor derived from erasure (JLS {@jls 4.6}) of the signature
should be declared as well.

@param slot the local variable slot
@param nameEntry the variable name
@param signatureEntry the variable signature
@param startScope the start scope of the variable
@param endScope the end scope of the variable
@return this builder
@throws IllegalArgumentException if {@code slot} is out of range
@see LocalVariableType

## CodeBuilder.localVariableType(int, String, Signature, Label, Label)

```java
default CodeBuilder localVariableType(int slot, String name, Signature signature, Label startScope, Label endScope)
```

Declares a local variable type entry.
<p>
This call may be ignored if {@link ClassFile.DebugElementsOption#DROP_DEBUG}
is set, or if any of the argument labels is not {@linkplain #labelBinding
bound} and {@link ClassFile.DeadLabelsOption#DROP_DEAD_LABELS} is set.

@apiNote
When a local variable type entry is declared, a local variable entry with
the descriptor derived from erasure (JLS {@jls 4.6}) of the signature
should be declared as well.

@param slot the local variable slot
@param name the variable name
@param signature the variable signature
@param startScope the start scope of the variable
@param endScope the end scope of the variable
@return this builder
@throws IllegalArgumentException if {@code slot} is out of range
@see LocalVariableType

## CodeBuilder.aconst_null()

```java
default CodeBuilder aconst_null()
```

Generates an instruction pushing the null object {@link TypeKind#REFERENCE
reference} onto the operand stack.

@return this builder
@see Opcode#ACONST_NULL
@see ConstantInstruction.IntrinsicConstantInstruction

## CodeBuilder.aaload()

```java
default CodeBuilder aaload()
```

Generates an instruction to load from a {@link TypeKind#REFERENCE
reference} array.

@return this builder
@see Opcode#AALOAD
@see #arrayLoad(TypeKind)
@see ArrayLoadInstruction

## CodeBuilder.aastore()

```java
default CodeBuilder aastore()
```

Generates an instruction to store into a {@link TypeKind#REFERENCE
reference} array.

@return this builder
@see Opcode#AASTORE
@see #arrayStore(TypeKind)
@see ArrayStoreInstruction

## CodeBuilder.aload(int)

```java
default CodeBuilder aload(int slot)
```

Generates an instruction to load a {@link TypeKind#REFERENCE reference}
from a local variable.
<p>
This may also generate {@link Opcode#ALOAD_0 aload_&lt;N&gt;} and {@link
Opcode#ALOAD_W wide aload} instructions.

@param slot the local variable slot
@return this builder
@throws IllegalArgumentException if {@code slot} is out of range
@see Opcode#ALOAD
@see #loadLocal
@see LoadInstruction

## CodeBuilder.anewarray(ClassEntry)

```java
default CodeBuilder anewarray(ClassEntry classEntry)
```

Generates an instruction to create a new array of {@link TypeKind#REFERENCE
reference}.

@param classEntry the component type
@return this builder
@see Opcode#ANEWARRAY
@see NewReferenceArrayInstruction

## CodeBuilder.anewarray(ClassDesc)

```java
default CodeBuilder anewarray(ClassDesc className)
```

Generates an instruction to create a new array of {@link TypeKind#REFERENCE
reference}.

@param className the component type
@return this builder
@throws IllegalArgumentException if {@code className} represents a primitive type
@see Opcode#ANEWARRAY
@see NewReferenceArrayInstruction

## CodeBuilder.areturn()

```java
default CodeBuilder areturn()
```

Generates an instruction to return a {@link TypeKind#REFERENCE reference}
from this method.

@return this builder
@see Opcode#ARETURN
@see #return_(TypeKind)
@see ReturnInstruction

## CodeBuilder.arraylength()

```java
default CodeBuilder arraylength()
```

Generates an instruction to get the length of an array.

@return this builder
@see Opcode#ARRAYLENGTH
@see OperatorInstruction

## CodeBuilder.astore(int)

```java
default CodeBuilder astore(int slot)
```

Generates an instruction to store a {@link TypeKind#REFERENCE reference}
into a local variable.  Such an instruction can also store a {@link
TypeKind##returnAddress returnAddress}.
<p>
This may also generate {@link Opcode#ASTORE_0 astore_&lt;N&gt;} and
{@link Opcode#ASTORE_W wide astore} instructions.

@param slot the local variable slot
@return this builder
@throws IllegalArgumentException if {@code slot} is out of range
@see Opcode#ASTORE
@see #storeLocal
@see StoreInstruction

## CodeBuilder.athrow()

```java
default CodeBuilder athrow()
```

Generates an instruction to throw an exception or error.

@return this builder
@see Opcode#ATHROW
@see ThrowInstruction

## CodeBuilder.baload()

```java
default CodeBuilder baload()
```

Generates an instruction to load from a {@link TypeKind#BYTE byte} or
{@link TypeKind#BOOLEAN boolean} array.

@return this builder
@see Opcode#BALOAD
@see #arrayLoad(TypeKind)
@see ArrayLoadInstruction

## CodeBuilder.bastore()

```java
default CodeBuilder bastore()
```

Generates an instruction to store into a {@link TypeKind#BYTE byte} or
{@link TypeKind#BOOLEAN boolean} array.

@return this builder
@see Opcode#BASTORE
@see #arrayStore(TypeKind)
@see ArrayStoreInstruction

## CodeBuilder.bipush(int)

```java
default CodeBuilder bipush(int b)
```

Generates an instruction pushing an {@link TypeKind#INT int} in the range
of {@link TypeKind#BYTE byte} ({@code [-128, 127]}) onto the operand
stack.

@param b the int in the range of byte
@return this builder
@throws IllegalArgumentException if {@code b} is out of range of byte
@see Opcode#BIPUSH
@see #loadConstant(int)
@see ConstantInstruction.IntrinsicConstantInstruction

## CodeBuilder.caload()

```java
default CodeBuilder caload()
```

Generates an instruction to load from a {@link TypeKind#CHAR char} array.

@return this builder
@see Opcode#CALOAD
@see #arrayLoad(TypeKind)
@see ArrayLoadInstruction

## CodeBuilder.castore()

```java
default CodeBuilder castore()
```

Generates an instruction to store into a {@link TypeKind#CHAR char} array.

@return this builder
@see Opcode#CASTORE
@see #arrayStore(TypeKind)
@see ArrayStoreInstruction

## CodeBuilder.checkcast(ClassEntry)

```java
default CodeBuilder checkcast(ClassEntry type)
```

Generates an instruction to check whether an object is of the given type,
throwing a {@link ClassCastException} if the check fails.

@param type the object type
@return this builder
@see Opcode#CHECKCAST
@see TypeCheckInstruction

## CodeBuilder.checkcast(ClassDesc)

```java
default CodeBuilder checkcast(ClassDesc type)
```

Generates an instruction to check whether an object is of the given type,
throwing a {@link ClassCastException} if the check fails.

@param type the object type
@return this builder
@throws IllegalArgumentException if {@code type} represents a primitive type
@see Opcode#CHECKCAST
@see TypeCheckInstruction

## CodeBuilder.d2f()

```java
default CodeBuilder d2f()
```

Generates an instruction to convert a {@link TypeKind#DOUBLE double} into
a {@link TypeKind#FLOAT float}.

@return this builder
@see Opcode#D2F
@see ConvertInstruction

## CodeBuilder.d2i()

```java
default CodeBuilder d2i()
```

Generates an instruction to convert a {@link TypeKind#DOUBLE double} into
an {@link TypeKind#INT int}.

@return this builder
@see Opcode#D2I
@see ConvertInstruction

## CodeBuilder.d2l()

```java
default CodeBuilder d2l()
```

Generates an instruction to convert a {@link TypeKind#DOUBLE double} into
a {@link TypeKind#LONG long}.

@return this builder
@see Opcode#D2L
@see ConvertInstruction

## CodeBuilder.dadd()

```java
default CodeBuilder dadd()
```

Generates an instruction to add two {@link TypeKind#DOUBLE doubles}.

@return this builder
@see Opcode#DADD
@see OperatorInstruction

## CodeBuilder.daload()

```java
default CodeBuilder daload()
```

Generates an instruction to load from a {@link TypeKind#DOUBLE double}
array.

@return this builder
@see Opcode#DALOAD
@see #arrayLoad(TypeKind)
@see ArrayLoadInstruction

## CodeBuilder.dastore()

```java
default CodeBuilder dastore()
```

Generates an instruction to store into a {@link TypeKind#DOUBLE double}
array.

@return this builder
@see Opcode#DASTORE
@see #arrayStore(TypeKind)
@see ArrayStoreInstruction

## CodeBuilder.dcmpg()

```java
default CodeBuilder dcmpg()
```

Generates an instruction to compare two {@link TypeKind#DOUBLE doubles},
producing {@code 1} if any operand is {@link Double#isNaN(double) NaN}.

@return this builder
@see Opcode#DCMPG
@see OperatorInstruction

## CodeBuilder.dcmpl()

```java
default CodeBuilder dcmpl()
```

Generates an instruction to compare two {@link TypeKind#DOUBLE doubles},
producing {@code -1} if any operand is {@link Double#isNaN(double) NaN}.

@return this builder
@see Opcode#DCMPL
@see OperatorInstruction

## CodeBuilder.dconst_0()

```java
default CodeBuilder dconst_0()
```

Generates an instruction pushing {@link TypeKind#DOUBLE double} constant
0 onto the operand stack.

@return this builder
@see Opcode#DCONST_0
@see #loadConstant(double)
@see ConstantInstruction.IntrinsicConstantInstruction

## CodeBuilder.dconst_1()

```java
default CodeBuilder dconst_1()
```

Generates an instruction pushing {@link TypeKind#DOUBLE double} constant
1 onto the operand stack.

@return this builder
@see Opcode#DCONST_1
@see #loadConstant(double)
@see ConstantInstruction.IntrinsicConstantInstruction

## CodeBuilder.ddiv()

```java
default CodeBuilder ddiv()
```

Generates an instruction to divide {@link TypeKind#DOUBLE doubles}.

@return this builder
@see Opcode#DDIV
@see OperatorInstruction

## CodeBuilder.dload(int)

```java
default CodeBuilder dload(int slot)
```

Generates an instruction to load a {@link TypeKind#DOUBLE double} from a
local variable.
<p>
This may also generate {@link Opcode#DLOAD_0 dload_&lt;N&gt;} and {@link
Opcode#DLOAD_W wide dload} instructions.

@param slot the local variable slot
@return this builder
@throws IllegalArgumentException if {@code slot} is out of range
@see Opcode#DLOAD
@see #loadLocal(TypeKind, int)
@see LoadInstruction

## CodeBuilder.dmul()

```java
default CodeBuilder dmul()
```

Generates an instruction to multiply {@link TypeKind#DOUBLE doubles}.

@return this builder
@see Opcode#DMUL
@see OperatorInstruction

## CodeBuilder.dneg()

```java
default CodeBuilder dneg()
```

Generates an instruction to negate a {@link TypeKind#DOUBLE double}.

@return this builder
@see Opcode#DNEG
@see OperatorInstruction

## CodeBuilder.drem()

```java
default CodeBuilder drem()
```

Generates an instruction to calculate {@link TypeKind#DOUBLE double}
remainder.

@return this builder
@see Opcode#DREM
@see OperatorInstruction

## CodeBuilder.dreturn()

```java
default CodeBuilder dreturn()
```

Generates an instruction to return a {@link TypeKind#DOUBLE double} from
this method.

@return this builder
@see Opcode#DRETURN
@see #return_(TypeKind)
@see ReturnInstruction

## CodeBuilder.dstore(int)

```java
default CodeBuilder dstore(int slot)
```

Generates an instruction to store a {@link TypeKind#DOUBLE double} into a
local variable.
<p>
This may also generate {@link Opcode#DSTORE_0 dstore_&lt;N&gt;} and
{@link Opcode#DSTORE_W wide dstore} instructions.

@param slot the local variable slot
@return this builder
@throws IllegalArgumentException if {@code slot} is out of range
@see Opcode#DSTORE
@see #storeLocal(TypeKind, int)
@see StoreInstruction

## CodeBuilder.dsub()

```java
default CodeBuilder dsub()
```

Generates an instruction to subtract {@link TypeKind#DOUBLE doubles}.

@return this builder
@see Opcode#DSUB
@see OperatorInstruction

## CodeBuilder.dup()

```java
default CodeBuilder dup()
```

Generates an instruction to duplicate the top operand stack value.

@return this builder
@see Opcode#DUP
@see StackInstruction

## CodeBuilder.dup2()

```java
default CodeBuilder dup2()
```

Generates an instruction to duplicate the top one or two operand stack
value.

@return this builder
@see Opcode#DUP2
@see StackInstruction

## CodeBuilder.dup2_x1()

```java
default CodeBuilder dup2_x1()
```

Generates an instruction to duplicate the top one or two operand stack
values and insert two or three values down.

@return this builder
@see Opcode#DUP2_X1
@see StackInstruction

## CodeBuilder.dup2_x2()

```java
default CodeBuilder dup2_x2()
```

Generates an instruction to duplicate the top one or two operand stack
values and insert two, three, or four values down.

@return this builder
@see Opcode#DUP2_X2
@see StackInstruction

## CodeBuilder.dup_x1()

```java
default CodeBuilder dup_x1()
```

Generates an instruction to duplicate the top operand stack value and
insert two values down.

@return this builder
@see Opcode#DUP_X1
@see StackInstruction

## CodeBuilder.dup_x2()

```java
default CodeBuilder dup_x2()
```

Generates an instruction to duplicate the top operand stack value and
insert two or three values down.

@return this builder
@see Opcode#DUP_X2
@see StackInstruction

## CodeBuilder.f2d()

```java
default CodeBuilder f2d()
```

Generates an instruction to convert a {@link TypeKind#FLOAT float} into a
{@link TypeKind#DOUBLE double}.

@return this builder
@see Opcode#F2D
@see ConvertInstruction

## CodeBuilder.f2i()

```java
default CodeBuilder f2i()
```

Generates an instruction to convert a {@link TypeKind#FLOAT float} into
an {@link TypeKind#INT int}.

@return this builder
@see Opcode#F2I
@see ConvertInstruction

## CodeBuilder.f2l()

```java
default CodeBuilder f2l()
```

Generates an instruction to convert a {@link TypeKind#FLOAT float} into a
{@link TypeKind#LONG long}.

@return this builder
@see Opcode#F2L
@see ConvertInstruction

## CodeBuilder.fadd()

```java
default CodeBuilder fadd()
```

Generates an instruction to add two {@link TypeKind#FLOAT floats}.

@return this builder
@see Opcode#FADD
@see OperatorInstruction

## CodeBuilder.faload()

```java
default CodeBuilder faload()
```

Generates an instruction to load from a {@link TypeKind#FLOAT float}
array.

@return this builder
@see Opcode#FALOAD
@see #arrayLoad(TypeKind)
@see ArrayLoadInstruction

## CodeBuilder.fastore()

```java
default CodeBuilder fastore()
```

Generates an instruction to store into a {@link TypeKind#FLOAT float}
array.

@return this builder
@see Opcode#FASTORE
@see #arrayStore(TypeKind)
@see ArrayStoreInstruction

## CodeBuilder.fcmpg()

```java
default CodeBuilder fcmpg()
```

Generates an instruction to compare {@link TypeKind#FLOAT floats},
producing {@code 1} if any operand is {@link Float#isNaN(float) NaN}.

@return this builder
@see Opcode#FCMPG
@see OperatorInstruction

## CodeBuilder.fcmpl()

```java
default CodeBuilder fcmpl()
```

Generates an instruction to compare {@link TypeKind#FLOAT floats},
producing {@code -1} if any operand is {@link Float#isNaN(float) NaN}.

@return this builder
@see Opcode#FCMPL
@see OperatorInstruction

## CodeBuilder.fconst_0()

```java
default CodeBuilder fconst_0()
```

Generates an instruction pushing {@link TypeKind#FLOAT float} constant 0
onto the operand stack.

@return this builder
@see Opcode#FCONST_0
@see #loadConstant(float)
@see ConstantInstruction.IntrinsicConstantInstruction

## CodeBuilder.fconst_1()

```java
default CodeBuilder fconst_1()
```

Generates an instruction pushing {@link TypeKind#FLOAT float} constant 1
onto the operand stack.

@return this builder
@see Opcode#FCONST_1
@see #loadConstant(float)
@see ConstantInstruction.IntrinsicConstantInstruction

## CodeBuilder.fconst_2()

```java
default CodeBuilder fconst_2()
```

Generates an instruction pushing {@link TypeKind#FLOAT float} constant 2
onto the operand stack.

@return this builder
@see Opcode#FCONST_2
@see #loadConstant(float)
@see ConstantInstruction.IntrinsicConstantInstruction

## CodeBuilder.fdiv()

```java
default CodeBuilder fdiv()
```

Generates an instruction to divide {@link TypeKind#FLOAT floats}.

@return this builder
@see Opcode#FDIV
@see OperatorInstruction

## CodeBuilder.fload(int)

```java
default CodeBuilder fload(int slot)
```

Generates an instruction to load a {@link TypeKind#FLOAT float} from a
local variable.
<p>
This may also generate {@link Opcode#FLOAD_0 fload_&lt;N&gt;} and {@link
Opcode#FLOAD_W wide fload} instructions.

@param slot the local variable slot
@return this builder
@throws IllegalArgumentException if {@code slot} is out of range
@see Opcode#FLOAD
@see #loadLocal(TypeKind, int)
@see LoadInstruction

## CodeBuilder.fmul()

```java
default CodeBuilder fmul()
```

Generates an instruction to multiply {@link TypeKind#FLOAT floats}.

@return this builder
@see Opcode#FMUL
@see OperatorInstruction

## CodeBuilder.fneg()

```java
default CodeBuilder fneg()
```

Generates an instruction to negate a {@link TypeKind#FLOAT float}.

@return this builder
@see Opcode#FNEG
@see OperatorInstruction

## CodeBuilder.frem()

```java
default CodeBuilder frem()
```

Generates an instruction to calculate {@link TypeKind#FLOAT floats}
remainder.

@return this builder
@see Opcode#FREM
@see OperatorInstruction

## CodeBuilder.freturn()

```java
default CodeBuilder freturn()
```

Generates an instruction to return a {@link TypeKind#FLOAT float} from
this method.

@return this builder
@see Opcode#FRETURN
@see #return_(TypeKind)
@see ReturnInstruction

## CodeBuilder.fstore(int)

```java
default CodeBuilder fstore(int slot)
```

Generates an instruction to store a {@link TypeKind#FLOAT float} into a
local variable.
<p>
This may also generate {@link Opcode#FSTORE_0 fstore_&lt;N&gt;} and
{@link Opcode#FSTORE_W wide fstore} instructions.

@param slot the local variable slot
@return this builder
@throws IllegalArgumentException if {@code slot} is out of range
@see Opcode#FSTORE
@see #storeLocal(TypeKind, int)
@see StoreInstruction

## CodeBuilder.fsub()

```java
default CodeBuilder fsub()
```

Generates an instruction to subtract {@link TypeKind#FLOAT floats}.

@return this builder
@see Opcode#FSUB
@see OperatorInstruction

## CodeBuilder.getfield(FieldRefEntry)

```java
default CodeBuilder getfield(FieldRefEntry ref)
```

Generates an instruction to fetch field from an object.

@param ref the field reference
@return this builder
@see Opcode#GETFIELD
@see #fieldAccess(Opcode, FieldRefEntry)
@see FieldInstruction

## CodeBuilder.getfield(ClassDesc, String, ClassDesc)

```java
default CodeBuilder getfield(ClassDesc owner, String name, ClassDesc type)
```

Generates an instruction to fetch field from an object.

@param owner the owner class
@param name the field name
@param type the field type
@return this builder
@throws IllegalArgumentException if {@code owner} represents a primitive type
@see Opcode#GETFIELD
@see #fieldAccess(Opcode, ClassDesc, String, ClassDesc)
@see FieldInstruction

## CodeBuilder.getstatic(FieldRefEntry)

```java
default CodeBuilder getstatic(FieldRefEntry ref)
```

Generates an instruction to get static field from a class or interface.

@param ref the field reference
@return this builder
@see Opcode#GETSTATIC
@see #fieldAccess(Opcode, FieldRefEntry)
@see FieldInstruction

## CodeBuilder.getstatic(ClassDesc, String, ClassDesc)

```java
default CodeBuilder getstatic(ClassDesc owner, String name, ClassDesc type)
```

Generates an instruction to get static field from a class or interface.

@param owner the owner class
@param name the field name
@param type the field type
@return this builder
@throws IllegalArgumentException if {@code owner} represents a primitive type
@see Opcode#GETSTATIC
@see #fieldAccess(Opcode, ClassDesc, String, ClassDesc)
@see FieldInstruction

## CodeBuilder.goto_(Label)

```java
default CodeBuilder goto_(Label target)
```

Generates an instruction to branch always.
<p>
This may also generate {@link Opcode#GOTO_W goto_w} instructions if
{@link ShortJumpsOption#FIX_SHORT_JUMPS} is set.

@apiNote
The instruction's name is {@code goto}, which coincides with a reserved
keyword of the Java programming language, thus this method is named with
an extra {@code _} suffix instead.

@param target the branch target
@return this builder
@see Opcode#GOTO
@see #branch(Opcode, Label)
@see BranchInstruction

## CodeBuilder.goto_w(Label)

```java
default CodeBuilder goto_w(Label target)
```

Generates an instruction to branch always with wide index.

@param target the branch target
@return this builder
@see Opcode#GOTO_W
@see #branch(Opcode, Label)
@see BranchInstruction

## CodeBuilder.i2b()

```java
default CodeBuilder i2b()
```

Generates an instruction to truncate an {@link TypeKind#INT int} into the
range of {@link TypeKind#BYTE byte} and sign-extend it.

@return this builder
@see Opcode#I2B
@see ConvertInstruction

## CodeBuilder.i2c()

```java
default CodeBuilder i2c()
```

Generates an instruction to truncate an {@link TypeKind#INT int} into the
range of {@link TypeKind#CHAR char} and zero-extend it.

@return this builder
@see Opcode#I2C
@see ConvertInstruction

## CodeBuilder.i2d()

```java
default CodeBuilder i2d()
```

Generates an instruction to convert an {@link TypeKind#INT int} into a
{@link TypeKind#DOUBLE double}.

@return this builder
@see Opcode#I2D
@see ConvertInstruction

## CodeBuilder.i2f()

```java
default CodeBuilder i2f()
```

Generates an instruction to convert an {@link TypeKind#INT int} into a
{@link TypeKind#FLOAT float}.

@return this builder
@see Opcode#I2F
@see ConvertInstruction

## CodeBuilder.i2l()

```java
default CodeBuilder i2l()
```

Generates an instruction to convert an {@link TypeKind#INT int} into a
{@link TypeKind#LONG long}.

@return this builder
@see Opcode#I2L
@see ConvertInstruction

## CodeBuilder.i2s()

```java
default CodeBuilder i2s()
```

Generates an instruction to truncate an {@link TypeKind#INT int} into the
range of {@link TypeKind#SHORT short} and sign-extend it.

@return this builder
@see Opcode#I2S
@see ConvertInstruction

## CodeBuilder.iadd()

```java
default CodeBuilder iadd()
```

Generates an instruction to add two {@link TypeKind#INT ints}.

@return this builder
@see Opcode#IADD
@see OperatorInstruction

## CodeBuilder.iaload()

```java
default CodeBuilder iaload()
```

Generates an instruction to load from an {@link TypeKind#INT int} array.

@return this builder
@see Opcode#IALOAD
@see #arrayLoad(TypeKind)
@see ArrayLoadInstruction

## CodeBuilder.iand()

```java
default CodeBuilder iand()
```

Generates an instruction to calculate bitwise AND of {@link TypeKind#INT
ints}, also used for {@link TypeKind#BOOLEAN boolean} AND.

@return this builder
@see Opcode#IAND
@see OperatorInstruction

## CodeBuilder.iastore()

```java
default CodeBuilder iastore()
```

Generates an instruction to store into an {@link TypeKind#INT int} array.

@return this builder
@see Opcode#IASTORE
@see #arrayStore(TypeKind)
@see ArrayStoreInstruction

## CodeBuilder.iconst_0()

```java
default CodeBuilder iconst_0()
```

Generates an instruction pushing {@link TypeKind#INT int} constant 0 onto
the operand stack.

@return this builder
@see Opcode#ICONST_0
@see #loadConstant(int)
@see ConstantInstruction.IntrinsicConstantInstruction

## CodeBuilder.iconst_1()

```java
default CodeBuilder iconst_1()
```

Generates an instruction pushing {@link TypeKind#INT int} constant 1 onto
the operand stack.

@return this builder
@see Opcode#ICONST_1
@see #loadConstant(int)
@see ConstantInstruction.IntrinsicConstantInstruction

## CodeBuilder.iconst_2()

```java
default CodeBuilder iconst_2()
```

Generates an instruction pushing {@link TypeKind#INT int} constant 2 onto
the operand stack.

@return this builder
@see Opcode#ICONST_2
@see #loadConstant(int)
@see ConstantInstruction.IntrinsicConstantInstruction

## CodeBuilder.iconst_3()

```java
default CodeBuilder iconst_3()
```

Generates an instruction pushing {@link TypeKind#INT int} constant 3 onto
the operand stack.

@return this builder
@see Opcode#ICONST_3
@see #loadConstant(int)
@see ConstantInstruction.IntrinsicConstantInstruction

## CodeBuilder.iconst_4()

```java
default CodeBuilder iconst_4()
```

Generates an instruction pushing {@link TypeKind#INT int} constant 4 onto
the operand stack.

@return this builder
@see Opcode#ICONST_4
@see #loadConstant(int)
@see ConstantInstruction.IntrinsicConstantInstruction

## CodeBuilder.iconst_5()

```java
default CodeBuilder iconst_5()
```

Generates an instruction pushing {@link TypeKind#INT int} constant 5 onto
the operand stack.

@return this builder
@see Opcode#ICONST_5
@see #loadConstant(int)
@see ConstantInstruction.IntrinsicConstantInstruction

## CodeBuilder.iconst_m1()

```java
default CodeBuilder iconst_m1()
```

Generates an instruction pushing {@link TypeKind#INT int} constant -1
onto the operand stack.

@return this builder
@see Opcode#ICONST_M1
@see #loadConstant(int)
@see ConstantInstruction.IntrinsicConstantInstruction

## CodeBuilder.idiv()

```java
default CodeBuilder idiv()
```

Generates an instruction to divide {@link TypeKind#INT ints}.

@return this builder
@see Opcode#IDIV
@see OperatorInstruction

## CodeBuilder.if_acmpeq(Label)

```java
default CodeBuilder if_acmpeq(Label target)
```

Generates an instruction to branch if {@link TypeKind#REFERENCE reference}
comparison {@code operand1 == operand2} succeeds.
<p>
This may generate multiple instructions to accomplish the same effect if
{@link ClassFile.ShortJumpsOption#FIX_SHORT_JUMPS} is set and {@code
target} cannot be encoded as a BCI offset in {@code [-32768, 32767]}.

@param target the branch target
@return this builder
@see Opcode#IF_ACMPEQ
@see #branch(Opcode, Label)
@see BranchInstruction

## CodeBuilder.if_acmpne(Label)

```java
default CodeBuilder if_acmpne(Label target)
```

Generates an instruction to branch if {@link TypeKind#REFERENCE reference}
comparison {@code operand1 != operand2} succeeds.
<p>
This may generate multiple instructions to accomplish the same effect if
{@link ClassFile.ShortJumpsOption#FIX_SHORT_JUMPS} is set and {@code
target} cannot be encoded as a BCI offset in {@code [-32768, 32767]}.

@param target the branch target
@return this builder
@see Opcode#IF_ACMPNE
@see #branch(Opcode, Label)
@see BranchInstruction

## CodeBuilder.if_icmpeq(Label)

```java
default CodeBuilder if_icmpeq(Label target)
```

Generates an instruction to branch if {@link TypeKind#INT int} comparison
{@code operand1 == operand2} succeeds.
<p>
This may generate multiple instructions to accomplish the same effect if
{@link ClassFile.ShortJumpsOption#FIX_SHORT_JUMPS} is set and {@code
target} cannot be encoded as a BCI offset in {@code [-32768, 32767]}.

@param target the branch target
@return this builder
@see Opcode#IF_ICMPEQ
@see #branch(Opcode, Label)
@see BranchInstruction

## CodeBuilder.if_icmpge(Label)

```java
default CodeBuilder if_icmpge(Label target)
```

Generates an instruction to branch if {@link TypeKind#INT int} comparison
{@code operand1 >= operand2} succeeds.
<p>
This may generate multiple instructions to accomplish the same effect if
{@link ClassFile.ShortJumpsOption#FIX_SHORT_JUMPS} is set and {@code
target} cannot be encoded as a BCI offset in {@code [-32768, 32767]}.

@param target the branch target
@return this builder
@see Opcode#IF_ICMPGE
@see #branch(Opcode, Label)
@see BranchInstruction

## CodeBuilder.if_icmpgt(Label)

```java
default CodeBuilder if_icmpgt(Label target)
```

Generates an instruction to branch if {@link TypeKind#INT int} comparison
{@code operand1 > operand2} succeeds.
<p>
This may generate multiple instructions to accomplish the same effect if
{@link ClassFile.ShortJumpsOption#FIX_SHORT_JUMPS} is set and {@code
target} cannot be encoded as a BCI offset in {@code [-32768, 32767]}.

@param target the branch target
@return this builder
@see Opcode#IF_ICMPGT
@see #branch(Opcode, Label)
@see BranchInstruction

## CodeBuilder.if_icmple(Label)

```java
default CodeBuilder if_icmple(Label target)
```

Generates an instruction to branch if {@link TypeKind#INT int} comparison
{@code operand1 <= operand2} succeeds.
<p>
This may generate multiple instructions to accomplish the same effect if
{@link ClassFile.ShortJumpsOption#FIX_SHORT_JUMPS} is set and {@code
target} cannot be encoded as a BCI offset in {@code [-32768, 32767]}.

@param target the branch target
@return this builder
@see Opcode#IF_ICMPLE
@see #branch(Opcode, Label)
@see BranchInstruction

## CodeBuilder.if_icmplt(Label)

```java
default CodeBuilder if_icmplt(Label target)
```

Generates an instruction to branch if {@link TypeKind#INT int} comparison
{@code operand1 < operand2} succeeds.
<p>
This may generate multiple instructions to accomplish the same effect if
{@link ClassFile.ShortJumpsOption#FIX_SHORT_JUMPS} is set and {@code
target} cannot be encoded as a BCI offset in {@code [-32768, 32767]}.

@param target the branch target
@return this builder
@see Opcode#IF_ICMPLT
@see #branch(Opcode, Label)
@see BranchInstruction

## CodeBuilder.if_icmpne(Label)

```java
default CodeBuilder if_icmpne(Label target)
```

Generates an instruction to branch if {@link TypeKind#INT int} comparison
{@code operand1 != operand2} succeeds.
<p>
This may generate multiple instructions to accomplish the same effect if
{@link ClassFile.ShortJumpsOption#FIX_SHORT_JUMPS} is set and {@code
target} cannot be encoded as a BCI offset in {@code [-32768, 32767]}.

@param target the branch target
@return this builder
@see Opcode#IF_ICMPNE
@see #branch(Opcode, Label)
@see BranchInstruction

## CodeBuilder.ifnonnull(Label)

```java
default CodeBuilder ifnonnull(Label target)
```

Generates an instruction to branch if {@link TypeKind#REFERENCE reference}
is not {@code null}.
<p>
This may generate multiple instructions to accomplish the same effect if
{@link ClassFile.ShortJumpsOption#FIX_SHORT_JUMPS} is set and {@code
target} cannot be encoded as a BCI offset in {@code [-32768, 32767]}.

@param target the branch target
@return this builder
@see Opcode#IFNONNULL
@see #branch(Opcode, Label)
@see BranchInstruction

## CodeBuilder.ifnull(Label)

```java
default CodeBuilder ifnull(Label target)
```

Generates an instruction to branch if {@link TypeKind#REFERENCE reference}
is {@code null}.
<p>
This may generate multiple instructions to accomplish the same effect if
{@link ClassFile.ShortJumpsOption#FIX_SHORT_JUMPS} is set and {@code
target} cannot be encoded as a BCI offset in {@code [-32768, 32767]}.

@param target the branch target
@return this builder
@see Opcode#IFNULL
@see #branch(Opcode, Label)
@see BranchInstruction

## CodeBuilder.ifeq(Label)

```java
default CodeBuilder ifeq(Label target)
```

Generates an instruction to branch if {@link TypeKind#INT int} comparison
with zero {@code == 0} succeeds.
<p>
This may generate multiple instructions to accomplish the same effect if
{@link ClassFile.ShortJumpsOption#FIX_SHORT_JUMPS} is set and {@code
target} cannot be encoded as a BCI offset in {@code [-32768, 32767]}.

@param target the branch target
@return this builder
@see Opcode#IFEQ
@see #branch(Opcode, Label)
@see BranchInstruction

## CodeBuilder.ifge(Label)

```java
default CodeBuilder ifge(Label target)
```

Generates an instruction to branch if {@link TypeKind#INT int} comparison
with zero {@code >= 0} succeeds.
<p>
This may generate multiple instructions to accomplish the same effect if
{@link ClassFile.ShortJumpsOption#FIX_SHORT_JUMPS} is set and {@code
target} cannot be encoded as a BCI offset in {@code [-32768, 32767]}.

@param target the branch target
@return this builder
@see Opcode#IFGE
@see #branch(Opcode, Label)
@see BranchInstruction

## CodeBuilder.ifgt(Label)

```java
default CodeBuilder ifgt(Label target)
```

Generates an instruction to branch if {@link TypeKind#INT int} comparison
with zero {@code > 0} succeeds.
<p>
This may generate multiple instructions to accomplish the same effect if
{@link ClassFile.ShortJumpsOption#FIX_SHORT_JUMPS} is set and {@code
target} cannot be encoded as a BCI offset in {@code [-32768, 32767]}.

@param target the branch target
@return this builder
@see Opcode#IFGT
@see #branch(Opcode, Label)
@see BranchInstruction

## CodeBuilder.ifle(Label)

```java
default CodeBuilder ifle(Label target)
```

Generates an instruction to branch if {@link TypeKind#INT int} comparison
with zero {@code <= 0} succeeds.
<p>
This may generate multiple instructions to accomplish the same effect if
{@link ClassFile.ShortJumpsOption#FIX_SHORT_JUMPS} is set and {@code
target} cannot be encoded as a BCI offset in {@code [-32768, 32767]}.

@param target the branch target
@return this builder
@see Opcode#IFLE
@see #branch(Opcode, Label)
@see BranchInstruction

## CodeBuilder.iflt(Label)

```java
default CodeBuilder iflt(Label target)
```

Generates an instruction to branch if {@link TypeKind#INT int} comparison
with zero {@code < 0} succeeds.
<p>
This may generate multiple instructions to accomplish the same effect if
{@link ClassFile.ShortJumpsOption#FIX_SHORT_JUMPS} is set and {@code
target} cannot be encoded as a BCI offset in {@code [-32768, 32767]}.

@param target the branch target
@return this builder
@see Opcode#IFLT
@see #branch(Opcode, Label)
@see BranchInstruction

## CodeBuilder.ifne(Label)

```java
default CodeBuilder ifne(Label target)
```

Generates an instruction to branch if {@link TypeKind#INT int} comparison
with zero {@code != 0} succeeds.
<p>
This may generate multiple instructions to accomplish the same effect if
{@link ClassFile.ShortJumpsOption#FIX_SHORT_JUMPS} is set and {@code
target} cannot be encoded as a BCI offset in {@code [-32768, 32767]}.

@param target the branch target
@return this builder
@see Opcode#IFNE
@see #branch(Opcode, Label)
@see BranchInstruction

## CodeBuilder.iinc(int, int)

```java
default CodeBuilder iinc(int slot, int val)
```

Generates an instruction to increment an {@link TypeKind#INT int} local
variable by a constant.
<p>
This may also generate {@link Opcode#IINC_W wide iinc} instructions if
{@code slot} exceeds {@code 255} or {@code val} exceeds the range of
{@link TypeKind#BYTE byte}.

@param slot the local variable slot
@param val the increment value
@return this builder
@throws IllegalArgumentException if {@code slot} or {@code val} is out of range
@see Opcode#IINC
@see IncrementInstruction

## CodeBuilder.iload(int)

```java
default CodeBuilder iload(int slot)
```

Generates an instruction to load an {@link TypeKind#INT int} from a local
variable.
<p>
This may also generate {@link Opcode#ILOAD_0 iload_&lt;N&gt;} and {@link
Opcode#ILOAD_W wide iload} instructions.

@param slot the local variable slot
@return this builder
@throws IllegalArgumentException if {@code slot} is out of range
@see Opcode#ILOAD
@see #loadLocal(TypeKind, int)
@see LoadInstruction

## CodeBuilder.imul()

```java
default CodeBuilder imul()
```

Generates an instruction to multiply {@link TypeKind#INT ints}.

@return this builder
@see Opcode#IMUL
@see OperatorInstruction

## CodeBuilder.ineg()

```java
default CodeBuilder ineg()
```

Generates an instruction to negate an {@link TypeKind#INT int}.

@return this builder
@see Opcode#INEG
@see OperatorInstruction

## CodeBuilder.instanceOf(ClassEntry)

```java
default CodeBuilder instanceOf(ClassEntry target)
```

Generates an instruction to determine if an object is of the given type,
producing a {@link TypeKind#BOOLEAN boolean} result on the operand stack.

@apiNote
The instruction's name is {@code instanceof}, which coincides with a
reserved keyword of the Java programming language, thus this method is
named with camel case instead.

@param target the target type
@return this builder
@see Opcode#INSTANCEOF
@see TypeCheckInstruction

## CodeBuilder.instanceOf(ClassDesc)

```java
default CodeBuilder instanceOf(ClassDesc target)
```

Generates an instruction to determine if an object is of the given type,
producing a {@link TypeKind#BOOLEAN boolean} result on the operand stack.

@apiNote
The instruction's name is {@code instanceof}, which coincides with a
reserved keyword of the Java programming language, thus this method is
named with camel case instead.

@param target the target type
@return this builder
@throws IllegalArgumentException if {@code target} represents a primitive type
@see Opcode#INSTANCEOF
@see TypeCheckInstruction

## CodeBuilder.invokedynamic(InvokeDynamicEntry)

```java
default CodeBuilder invokedynamic(InvokeDynamicEntry ref)
```

Generates an instruction to invoke a dynamically-computed call site.

@param ref the dynamic call site
@return this builder
@see Opcode#INVOKEDYNAMIC
@see InvokeDynamicInstruction

## CodeBuilder.invokedynamic(DynamicCallSiteDesc)

```java
default CodeBuilder invokedynamic(DynamicCallSiteDesc ref)
```

Generates an instruction to invoke a dynamically-computed call site.

@param ref the dynamic call site
@return this builder
@see Opcode#INVOKEDYNAMIC
@see InvokeDynamicInstruction

## CodeBuilder.invokeinterface(InterfaceMethodRefEntry)

```java
default CodeBuilder invokeinterface(InterfaceMethodRefEntry ref)
```

Generates an instruction to invoke an interface method.

@param ref the interface method reference
@return this builder
@see Opcode#INVOKEINTERFACE
@see #invoke(Opcode, MemberRefEntry)
@see InvokeInstruction

## CodeBuilder.invokeinterface(ClassDesc, String, MethodTypeDesc)

```java
default CodeBuilder invokeinterface(ClassDesc owner, String name, MethodTypeDesc type)
```

Generates an instruction to invoke an interface method.

@param owner the owner interface
@param name the method name
@param type the method type
@return this builder
@throws IllegalArgumentException if {@code owner} represents a primitive type
@see Opcode#INVOKEINTERFACE
@see #invoke(Opcode, ClassDesc, String, MethodTypeDesc, boolean)
@see InvokeInstruction

## CodeBuilder.invokespecial(InterfaceMethodRefEntry)

```java
default CodeBuilder invokespecial(InterfaceMethodRefEntry ref)
```

Generates an instruction to invoke an instance method in an interface;
direct invocation of methods of the current class and its supertypes.

@param ref the interface method reference
@return this builder
@see Opcode#INVOKESPECIAL
@see #invoke(Opcode, MemberRefEntry)
@see InvokeInstruction

## CodeBuilder.invokespecial(MethodRefEntry)

```java
default CodeBuilder invokespecial(MethodRefEntry ref)
```

Generates an instruction to invoke an instance method in a class; direct
invocation of instance initialization methods and methods of the current
class and its supertypes.

@param ref the method reference
@return this builder
@see Opcode#INVOKESPECIAL
@see #invoke(Opcode, MemberRefEntry)
@see InvokeInstruction

## CodeBuilder.invokespecial(ClassDesc, String, MethodTypeDesc)

```java
default CodeBuilder invokespecial(ClassDesc owner, String name, MethodTypeDesc type)
```

Generates an instruction to invoke an instance method in a class; direct
invocation of instance initialization methods and methods of the current
class and its supertypes.

@param owner the owner class, must not be an interface
@param name the method name
@param type the method type
@return this builder
@throws IllegalArgumentException if {@code owner} represents a primitive type
@see Opcode#INVOKESPECIAL
@see #invoke(Opcode, ClassDesc, String, MethodTypeDesc, boolean)
@see InvokeInstruction

## CodeBuilder.invokespecial(ClassDesc, String, MethodTypeDesc, boolean)

```java
default CodeBuilder invokespecial(ClassDesc owner, String name, MethodTypeDesc type, boolean isInterface)
```

Generates an instruction to invoke an instance method; direct invocation
of instance initialization methods and methods of the current class and
its supertypes.

@param owner the owner class or interface
@param name the method name
@param type the method type
@param isInterface whether the owner is an interface
@return this builder
@throws IllegalArgumentException if {@code owner} represents a primitive type
@see Opcode#INVOKESPECIAL
@see #invoke(Opcode, ClassDesc, String, MethodTypeDesc, boolean)
@see InvokeInstruction

## CodeBuilder.invokestatic(InterfaceMethodRefEntry)

```java
default CodeBuilder invokestatic(InterfaceMethodRefEntry ref)
```

Generates an instruction to invoke a class (static) method of an interface.

@param ref the interface method reference
@return this builder
@see Opcode#INVOKESTATIC
@see #invoke(Opcode, MemberRefEntry)
@see InvokeInstruction

## CodeBuilder.invokestatic(MethodRefEntry)

```java
default CodeBuilder invokestatic(MethodRefEntry ref)
```

Generates an instruction to invoke a class (static) method of a class.

@param ref the method reference
@return this builder
@see Opcode#INVOKESTATIC
@see #invoke(Opcode, MemberRefEntry)
@see InvokeInstruction

## CodeBuilder.invokestatic(ClassDesc, String, MethodTypeDesc)

```java
default CodeBuilder invokestatic(ClassDesc owner, String name, MethodTypeDesc type)
```

Generates an instruction to invoke a class (static) method of a class.

@param owner the owner class, must not be an interface
@param name the method name
@param type the method type
@return this builder
@throws IllegalArgumentException if {@code owner} represents a primitive type
@see Opcode#INVOKESTATIC
@see #invoke(Opcode, ClassDesc, String, MethodTypeDesc, boolean)
@see InvokeInstruction

## CodeBuilder.invokestatic(ClassDesc, String, MethodTypeDesc, boolean)

```java
default CodeBuilder invokestatic(ClassDesc owner, String name, MethodTypeDesc type, boolean isInterface)
```

Generates an instruction to invoke a class (static) method.

@param owner the owner class or interface
@param name the method name
@param type the method type
@param isInterface whether the owner is an interface
@return this builder
@throws IllegalArgumentException if {@code owner} represents a primitive type
@see Opcode#INVOKESTATIC
@see #invoke(Opcode, ClassDesc, String, MethodTypeDesc, boolean)
@see InvokeInstruction

## CodeBuilder.invokevirtual(MethodRefEntry)

```java
default CodeBuilder invokevirtual(MethodRefEntry ref)
```

Generates an instruction to invoke an instance method; dispatch based on class.

@param ref the method reference
@return this builder
@see Opcode#INVOKEVIRTUAL
@see #invoke(Opcode, MemberRefEntry)
@see InvokeInstruction

## CodeBuilder.invokevirtual(ClassDesc, String, MethodTypeDesc)

```java
default CodeBuilder invokevirtual(ClassDesc owner, String name, MethodTypeDesc type)
```

Generates an instruction to invoke an instance method; dispatch based on class.

@param owner the owner class, must not be an interface
@param name the method name
@param type the method type
@return this builder
@throws IllegalArgumentException if {@code owner} represents a primitive type
@see Opcode#INVOKEVIRTUAL
@see #invoke(Opcode, ClassDesc, String, MethodTypeDesc, boolean)
@see InvokeInstruction

## CodeBuilder.ior()

```java
default CodeBuilder ior()
```

Generates an instruction to calculate bitwise OR of {@link TypeKind#INT
ints}, also used for {@link TypeKind#BOOLEAN boolean} OR.

@return this builder
@see Opcode#IOR
@see OperatorInstruction

## CodeBuilder.irem()

```java
default CodeBuilder irem()
```

Generates an instruction to calculate {@link TypeKind#INT ints} remainder.

@return this builder
@see Opcode#IREM
@see OperatorInstruction

## CodeBuilder.ireturn()

```java
default CodeBuilder ireturn()
```

Generates an instruction to return an {@link TypeKind#INT int} from this
method.

@return this builder
@see Opcode#IRETURN
@see #return_(TypeKind)
@see ReturnInstruction

## CodeBuilder.ishl()

```java
default CodeBuilder ishl()
```

Generates an instruction to shift an {@link TypeKind#INT int} left.

@return this builder
@see Opcode#ISHL
@see OperatorInstruction

## CodeBuilder.ishr()

```java
default CodeBuilder ishr()
```

Generates an instruction to shift an {@link TypeKind#INT int} right.
This carries the sign bit to the vacated most significant bits, as
opposed to {@link #iushr()} that fills vacated most significant bits with
{@code 0}.

@return this builder
@see Opcode#ISHR
@see OperatorInstruction

## CodeBuilder.istore(int)

```java
default CodeBuilder istore(int slot)
```

Generates an instruction to store an {@link TypeKind#INT int} into a
local variable.
<p>
This may also generate {@link Opcode#ISTORE_0 istore_&lt;N&gt;} and
{@link Opcode#ISTORE_W wide istore} instructions.

@param slot the local variable slot
@return this builder
@throws IllegalArgumentException if {@code slot} is out of range
@see Opcode#ISTORE
@see #storeLocal(TypeKind, int)
@see StoreInstruction

## CodeBuilder.isub()

```java
default CodeBuilder isub()
```

Generates an instruction to subtract {@link TypeKind#INT ints}.

@return this builder
@see Opcode#ISUB
@see OperatorInstruction

## CodeBuilder.iushr()

```java
default CodeBuilder iushr()
```

Generates an instruction to logical shift an {@link TypeKind#INT int}
right.  This fills vacated most significant bits with {@code 0}, as
opposed to {@link #ishr()} that carries the sign bit to the vacated most
significant bits.

@return this builder
@see Opcode#IUSHR
@see OperatorInstruction

## CodeBuilder.ixor()

```java
default CodeBuilder ixor()
```

Generates an instruction to calculate bitwise XOR of {@link TypeKind#INT
ints}.  This can also be used for {@link TypeKind#BOOLEAN boolean} XOR.

@return this builder
@see Opcode#IXOR
@see OperatorInstruction

## CodeBuilder.lookupswitch(Label, List<SwitchCase>)

```java
default CodeBuilder lookupswitch(Label defaultTarget, List<SwitchCase> cases)
```

Generates an instruction to access a jump table by key match and jump.

@param defaultTarget the default jump target
@param cases the switch cases
@return this builder
@see Opcode#LOOKUPSWITCH
@see LookupSwitchInstruction

## CodeBuilder.l2d()

```java
default CodeBuilder l2d()
```

Generates an instruction to convert a {@link TypeKind#LONG long} into a
{@link TypeKind#DOUBLE double}.

@return this builder
@see Opcode#L2D
@see OperatorInstruction

## CodeBuilder.l2f()

```java
default CodeBuilder l2f()
```

Generates an instruction to convert a {@link TypeKind#LONG long} into a
{@link TypeKind#FLOAT float}.

@return this builder
@see Opcode#L2F
@see OperatorInstruction

## CodeBuilder.l2i()

```java
default CodeBuilder l2i()
```

Generates an instruction to convert a {@link TypeKind#LONG long} into an
{@link TypeKind#INT int}.

@return this builder
@see Opcode#L2I
@see OperatorInstruction

## CodeBuilder.ladd()

```java
default CodeBuilder ladd()
```

Generates an instruction to add two {@link TypeKind#LONG longs}.

@return this builder
@see Opcode#LADD
@see OperatorInstruction

## CodeBuilder.laload()

```java
default CodeBuilder laload()
```

Generates an instruction to load from a {@link TypeKind#LONG long} array.

@return this builder
@see Opcode#LALOAD
@see #arrayLoad(TypeKind)
@see ArrayLoadInstruction

## CodeBuilder.land()

```java
default CodeBuilder land()
```

Generates an instruction to calculate bitwise AND of {@link TypeKind#LONG
longs}.

@return this builder
@see Opcode#LAND
@see OperatorInstruction

## CodeBuilder.lastore()

```java
default CodeBuilder lastore()
```

Generates an instruction to store into a {@link TypeKind#LONG long} array.

@return this builder
@see Opcode#LASTORE
@see #arrayStore(TypeKind)
@see ArrayStoreInstruction

## CodeBuilder.lcmp()

```java
default CodeBuilder lcmp()
```

Generates an instruction to compare {@link TypeKind#LONG longs}.

@return this builder
@see Opcode#LCMP
@see OperatorInstruction

## CodeBuilder.lconst_0()

```java
default CodeBuilder lconst_0()
```

Generates an instruction pushing {@link TypeKind#LONG long} constant 0
onto the operand stack.

@return this builder
@see Opcode#LCONST_0
@see #loadConstant(long)
@see ConstantInstruction.IntrinsicConstantInstruction

## CodeBuilder.lconst_1()

```java
default CodeBuilder lconst_1()
```

Generates an instruction pushing {@link TypeKind#LONG long} constant 1
onto the operand stack.

@return this builder
@see Opcode#LCONST_1
@see #loadConstant(long)
@see ConstantInstruction.IntrinsicConstantInstruction

## CodeBuilder.ldc(ConstantDesc)

```java
default CodeBuilder ldc(ConstantDesc value)
```

Generates an instruction pushing an item from the run-time constant pool
onto the operand stack.
<p>
This may also generate {@link Opcode#LDC_W ldc_w} and {@link Opcode#LDC2_W
ldc2_w} instructions.

@apiNote
{@link #loadConstant(ConstantDesc) loadConstant} generates more optimal
instructions and should be used for general constants if an {@code ldc}
instruction is not strictly required.

@param value the constant value
@return this builder
@see Opcode#LDC
@see #loadConstant(ConstantDesc)
@see ConstantInstruction.LoadConstantInstruction

## CodeBuilder.ldc(LoadableConstantEntry)

```java
default CodeBuilder ldc(LoadableConstantEntry entry)
```

Generates an instruction pushing an item from the run-time constant pool
onto the operand stack.
<p>
This may also generate {@link Opcode#LDC_W ldc_w} and {@link Opcode#LDC2_W
ldc2_w} instructions.

@param entry the constant value
@return this builder
@see Opcode#LDC
@see #loadConstant(ConstantDesc)
@see ConstantInstruction.LoadConstantInstruction

## CodeBuilder.ldiv()

```java
default CodeBuilder ldiv()
```

Generates an instruction to divide {@link TypeKind#LONG longs}.

@return this builder
@see Opcode#LDIV
@see OperatorInstruction

## CodeBuilder.lload(int)

```java
default CodeBuilder lload(int slot)
```

Generates an instruction to load a {@link TypeKind#LONG long} from a
local variable.
<p>
This may also generate {@link Opcode#LLOAD_0 lload_&lt;N&gt;} and {@link
Opcode#LLOAD_W wide lload} instructions.

@param slot the local variable slot
@return this builder
@throws IllegalArgumentException if {@code slot} is out of range
@see Opcode#LLOAD
@see #loadLocal(TypeKind, int)
@see LoadInstruction

## CodeBuilder.lmul()

```java
default CodeBuilder lmul()
```

Generates an instruction to multiply {@link TypeKind#LONG longs}.

@return this builder
@see Opcode#LMUL
@see OperatorInstruction

## CodeBuilder.lneg()

```java
default CodeBuilder lneg()
```

Generates an instruction to negate a {@link TypeKind#LONG long}.

@return this builder
@see Opcode#LNEG
@see OperatorInstruction

## CodeBuilder.lor()

```java
default CodeBuilder lor()
```

Generates an instruction to calculate bitwise OR of {@link TypeKind#LONG
longs}.

@return this builder
@see Opcode#LOR
@see OperatorInstruction

## CodeBuilder.lrem()

```java
default CodeBuilder lrem()
```

Generates an instruction to calculate {@link TypeKind#LONG longs}
remainder.

@return this builder
@see Opcode#LREM
@see OperatorInstruction

## CodeBuilder.lreturn()

```java
default CodeBuilder lreturn()
```

Generates an instruction to return a {@link TypeKind#LONG long} from this
method.

@return this builder
@see Opcode#LRETURN
@see #return_(TypeKind)
@see ReturnInstruction

## CodeBuilder.lshl()

```java
default CodeBuilder lshl()
```

Generates an instruction to shift a {@link TypeKind#LONG long} left.

@return this builder
@see Opcode#LSHL
@see OperatorInstruction

## CodeBuilder.lshr()

```java
default CodeBuilder lshr()
```

Generates an instruction to shift a {@link TypeKind#LONG long} right.
This carries the sign bit to the vacated most significant bits, as
opposed to {@link #lushr()} that fills vacated most significant bits with
{@code 0}.

@return this builder
@see Opcode#LSHR
@see OperatorInstruction

## CodeBuilder.lstore(int)

```java
default CodeBuilder lstore(int slot)
```

Generates an instruction to store a {@link TypeKind#LONG long} into a
local variable.
<p>
This may also generate {@link Opcode#LSTORE_0 lstore_&lt;N&gt;} and
{@link Opcode#LSTORE_W wide lstore} instructions.

@param slot the local variable slot
@return this builder
@throws IllegalArgumentException if {@code slot} is out of range
@see Opcode#LSTORE
@see #storeLocal(TypeKind, int)
@see StoreInstruction

## CodeBuilder.lsub()

```java
default CodeBuilder lsub()
```

Generates an instruction to subtract {@link TypeKind#LONG longs}.

@return this builder
@see Opcode#LSUB
@see OperatorInstruction

## CodeBuilder.lushr()

```java
default CodeBuilder lushr()
```

Generates an instruction to logical shift a {@link TypeKind#LONG long}
right.  This fills vacated most significant bits with {@code 0}, as
opposed to {@link #lshr()} that carries the sign bit to the vacated most
significant bits.

@return this builder
@see Opcode#LUSHR
@see OperatorInstruction

## CodeBuilder.lxor()

```java
default CodeBuilder lxor()
```

Generates an instruction to calculate bitwise XOR of {@link TypeKind#LONG
longs}.

@return this builder
@see Opcode#LXOR
@see OperatorInstruction

## CodeBuilder.monitorenter()

```java
default CodeBuilder monitorenter()
```

Generates an instruction to enter monitor for an object.

@return this builder
@see Opcode#MONITORENTER
@see MonitorInstruction

## CodeBuilder.monitorexit()

```java
default CodeBuilder monitorexit()
```

Generates an instruction to exit monitor for an object.

@return this builder
@see Opcode#MONITOREXIT
@see MonitorInstruction

## CodeBuilder.multianewarray(ClassEntry, int)

```java
default CodeBuilder multianewarray(ClassEntry array, int dims)
```

Generates an instruction to create a new multidimensional array.

@param array the array type
@param dims the number of dimensions
@return this builder
@throws IllegalArgumentException if {@code dims} is out of range
@see Opcode#MULTIANEWARRAY
@see NewMultiArrayInstruction

## CodeBuilder.multianewarray(ClassDesc, int)

```java
default CodeBuilder multianewarray(ClassDesc array, int dims)
```

Generates an instruction to create a new multidimensional array.

@param array the array type
@param dims the number of dimensions
@return this builder
@throws IllegalArgumentException if {@code array} represents a primitive type
        or if {@code dims} is out of range
@see Opcode#MULTIANEWARRAY
@see NewMultiArrayInstruction

## CodeBuilder.new_(ClassEntry)

```java
default CodeBuilder new_(ClassEntry clazz)
```

Generates an instruction to create a new object.

@apiNote
The instruction's name is {@code new}, which coincides with a reserved
keyword of the Java programming language, thus this method is named with
an extra {@code _} suffix instead.

@param clazz the new class type
@return this builder
@see Opcode#NEW
@see NewObjectInstruction

## CodeBuilder.new_(ClassDesc)

```java
default CodeBuilder new_(ClassDesc clazz)
```

Generates an instruction to create a new object.

@apiNote
The instruction's name is {@code new}, which coincides with a reserved
keyword of the Java programming language, thus this method is named with
an extra {@code _} suffix instead.

@param clazz the new class type
@return this builder
@throws IllegalArgumentException if {@code clazz} represents a primitive type
@see Opcode#NEW
@see NewObjectInstruction

## CodeBuilder.newarray(TypeKind)

```java
default CodeBuilder newarray(TypeKind typeKind)
```

Generates an instruction to create a new array of a primitive type.

@param typeKind the primitive array type
@return this builder
@throws IllegalArgumentException when the {@code typeKind} is not a legal
        primitive array component type
@see Opcode#NEWARRAY
@see NewPrimitiveArrayInstruction

## CodeBuilder.pop()

```java
default CodeBuilder pop()
```

Generates an instruction to pop the top operand stack value.

@return this builder
@see Opcode#POP
@see StackInstruction

## CodeBuilder.pop2()

```java
default CodeBuilder pop2()
```

Generates an instruction to pop the top one or two operand stack values.

@return this builder
@see Opcode#POP2
@see StackInstruction

## CodeBuilder.putfield(FieldRefEntry)

```java
default CodeBuilder putfield(FieldRefEntry ref)
```

Generates an instruction to set field in an object.

@param ref the field reference
@return this builder
@see Opcode#PUTFIELD
@see #fieldAccess(Opcode, FieldRefEntry)
@see FieldInstruction

## CodeBuilder.putfield(ClassDesc, String, ClassDesc)

```java
default CodeBuilder putfield(ClassDesc owner, String name, ClassDesc type)
```

Generates an instruction to set field in an object.

@param owner the owner class
@param name the field name
@param type the field type
@return this builder
@throws IllegalArgumentException if {@code owner} represents a primitive type
@see Opcode#PUTFIELD
@see #fieldAccess(Opcode, ClassDesc, String, ClassDesc)
@see FieldInstruction

## CodeBuilder.putstatic(FieldRefEntry)

```java
default CodeBuilder putstatic(FieldRefEntry ref)
```

Generates an instruction to set static field in a class.

@param ref the field reference
@return this builder
@see Opcode#PUTSTATIC
@see #fieldAccess(Opcode, FieldRefEntry)
@see FieldInstruction

## CodeBuilder.putstatic(ClassDesc, String, ClassDesc)

```java
default CodeBuilder putstatic(ClassDesc owner, String name, ClassDesc type)
```

Generates an instruction to set static field in a class.

@param owner the owner class or interface
@param name the field name
@param type the field type
@return this builder
@throws IllegalArgumentException if {@code owner} represents a primitive type
@see Opcode#PUTSTATIC
@see #fieldAccess(Opcode, ClassDesc, String, ClassDesc)
@see FieldInstruction

## CodeBuilder.return_()

```java
default CodeBuilder return_()
```

Generates an instruction to return {@link TypeKind#VOID void} from this
method.

@apiNote
The instruction's name is {@code return}, which coincides with a reserved
keyword of the Java programming language, thus this method is named with
an extra {@code _} suffix instead.

@return this builder
@see Opcode#RETURN
@see #return_(TypeKind)
@see ReturnInstruction

## CodeBuilder.saload()

```java
default CodeBuilder saload()
```

Generates an instruction to load from a {@link TypeKind#SHORT short}
array.

@return this builder
@see Opcode#SALOAD
@see #arrayLoad(TypeKind)
@see ArrayLoadInstruction

## CodeBuilder.sastore()

```java
default CodeBuilder sastore()
```

Generates an instruction to store into a {@link TypeKind#SHORT short}
array.

@return this builder
@see Opcode#SASTORE
@see #arrayStore(TypeKind)
@see ArrayStoreInstruction

## CodeBuilder.sipush(int)

```java
default CodeBuilder sipush(int s)
```

Generates an instruction pushing an {@link TypeKind#INT int} in the range
of {@link TypeKind#SHORT short}, {@code [-32768, 32767]}, onto the
operand stack.

@param s the int in the range of short
@return this builder
@throws IllegalArgumentException if {@code s} is out of range of short
@see Opcode#SIPUSH
@see #loadConstant(int)
@see ConstantInstruction.ArgumentConstantInstruction

## CodeBuilder.swap()

```java
default CodeBuilder swap()
```

Generates an instruction to swap the top two operand stack values.

@return this builder
@see Opcode#SWAP
@see StackInstruction

## CodeBuilder.tableswitch(int, int, Label, List<SwitchCase>)

```java
default CodeBuilder tableswitch(int low, int high, Label defaultTarget, List<SwitchCase> cases)
```

Generates an instruction to access a jump table by index and jump.

@param low the minimum key, inclusive
@param high the maximum key, inclusive
@param defaultTarget the default jump target
@param cases the switch cases
@return this builder
@see Opcode#TABLESWITCH
@see TableSwitchInstruction

## CodeBuilder.tableswitch(Label, List<SwitchCase>)

```java
default CodeBuilder tableswitch(Label defaultTarget, List<SwitchCase> cases)
```

Generates an instruction to access a jump table by index and jump.
Computes the minimum and maximum keys from the {@code cases}.

@param defaultTarget the default jump target
@param cases the switch cases
@return this builder
@see Opcode#TABLESWITCH
@see #tableswitch(int, int, Label, List)
@see TableSwitchInstruction