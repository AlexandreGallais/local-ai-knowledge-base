# NewObjectInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface NewObjectInstruction extends Instruction permits AbstractInstruction.BoundNewObjectInstruction, AbstractInstruction.UnboundNewObjectInstruction
```

Models a {@link Opcode#NEW new} instruction in the {@code code} array of a {@code Code}
attribute.  Delivered as a {@link CodeElement} when traversing the elements
of a {@link CodeModel}.
<p>
A new object instruction is composite:
{@snippet lang=text :
// @link substring="NewObjectInstruction" target="#of" :
NewObjectInstruction(ClassEntry className) // @link substring="className" target="#className"
}
where the {@code className} is a non-abstract class.

@see Opcode.Kind#NEW_OBJECT
@see CodeBuilder#new_ CodeBuilder::new_
@jvms 6.5.new <em>new</em>
@since 24

## NewObjectInstruction.className()

```java
ClassEntry className()
```

{@return the type of object to create}

## NewObjectInstruction.of(ClassEntry)

```java
static NewObjectInstruction of(ClassEntry className)
```

{@return a new object instruction}

@param className the type of object to create