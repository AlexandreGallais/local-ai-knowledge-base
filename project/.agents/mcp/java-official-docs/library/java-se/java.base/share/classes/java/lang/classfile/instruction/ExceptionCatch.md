# ExceptionCatch interface (java.lang.classfile.instruction)

```java
public sealed interface ExceptionCatch extends PseudoInstruction permits AbstractPseudoInstruction.ExceptionCatchImpl
```

A pseudo-instruction modeling an entry in the {@code exception_table} array
of a {@link CodeAttribute Code} attribute.  Catch (JVMS {@jvms 3.12}) and
finally (JVMS {@jvms 3.14}) blocks in Java source code compile to exception
table entries.  Delivered as a {@link CodeElement} when traversing the
contents of a {@link CodeModel}.
<p>
An exception table entry is composite:
{@snippet lang=text :
// @link substring="ExceptionCatch" target="#of(Label, Label, Label, Optional)" :
ExceptionCatch(
    Label handler, // @link substring="handler" target="#handler"
    Label tryStart, // @link substring="tryStart" target="#tryStart"
    Label tryEnd, // @link substring="tryEnd" target="#tryEnd"
    Optional<ClassEntry> catchType // @link substring="catchType" target="#catchType"
)
}

@see CodeBuilder#exceptionCatch CodeBuilder::exceptionCatch
@see CodeAttribute#exceptionHandlers()
@jvms 4.7.3 The {@code Code} Attribute
@since 24

## ExceptionCatch.handler()

```java
Label handler()
```

{@return the handler for the exception}

## ExceptionCatch.tryStart()

```java
Label tryStart()
```

{@return the beginning of the instruction range for the guarded instructions}

## ExceptionCatch.tryEnd()

```java
Label tryEnd()
```

{@return the end of the instruction range for the guarded instructions}

## ExceptionCatch.catchType()

```java
Optional<ClassEntry> catchType()
```

{@return the type of the exception to catch, or empty if this handler
catches everything}

## ExceptionCatch.of(Label, Label, Label, Optional<ClassEntry>)

```java
static ExceptionCatch of(Label handler, Label tryStart, Label tryEnd, Optional<ClassEntry> catchTypeEntry)
```

{@return an exception table pseudo-instruction}
@param handler the handler for the exception
@param tryStart the beginning of the instruction range for the guarded instructions
@param tryEnd the end of the instruction range for the guarded instructions
@param catchTypeEntry the type of exception to catch, or empty if this
                      handler is unconditional

## ExceptionCatch.of(Label, Label, Label)

```java
static ExceptionCatch of(Label handler, Label tryStart, Label tryEnd)
```

{@return an exception table pseudo-instruction to catch everything}
@param handler the handler for the exception
@param tryStart the beginning of the instruction range for the guarded instructions
@param tryEnd the end of the instruction range for the guarded instructions