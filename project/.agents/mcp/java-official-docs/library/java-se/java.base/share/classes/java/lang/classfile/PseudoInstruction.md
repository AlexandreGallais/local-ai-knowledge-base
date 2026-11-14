# PseudoInstruction interface (java.lang.classfile)

```java
public sealed interface PseudoInstruction extends CodeElement permits CharacterRange, ExceptionCatch, LabelTarget, LineNumber, LocalVariable, LocalVariableType, AbstractPseudoInstruction
```

Models metadata about a {@link CodeModel}, derived from the {@link
CodeAttribute Code} attribute itself or its attributes.
<p>
Order is significant for some pseudo-instructions relative to {@link
Instruction}s, such as {@link LabelTarget} or {@link LineNumber}.  Some
pseudo-instructions can be omitted in reading and writing according to
certain {@link ClassFile.Option}s.  These are specified in the corresponding
modeling interfaces.

@sealedGraph
@since 24