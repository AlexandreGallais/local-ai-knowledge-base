# CodeModel interface (java.lang.classfile)

```java
public sealed interface CodeModel extends CompoundElement<CodeElement>, AttributedElement, MethodElement permits CodeAttribute, BufferedCodeBuilder.Model
```

Models the body of a method (the {@code Code} attribute).  A {@code Code}
attribute is viewed as a {@linkplain CompoundElement composition} of {@link
CodeElement}s, which is the only way to access {@link Instruction}s; the
order of elements of a code model is significant.
<p>
A {@code CodeModel} is obtained from {@link MethodModel#code()}, or in the
traversal of the member elements of a method.
<p>
{@link MethodBuilder#withCode} is the main way to build code models.  {@link
MethodBuilder#transformCode} and {@link CodeBuilder#transforming} allow
creating new {@code Code} attributes by selectively processing the original
code elements and directing the results to a code builder.
<p>
A {@code Code} attribute holds attributes, but they are usually not member
elements, but are decomposed to {@link PseudoInstruction}, accessible
according to {@link DeadLabelsOption}, {@link DebugElementsOption}, and
{@link LineNumbersOption}.  {@link StackMapTableAttribute} can only be
accessed via {@linkplain AttributedElement explicit attribute reading}, as it
is considered a derived property from the code body.

@see MethodModel#code()
@see CodeTransform
@see CodeAttribute
@jvms 4.7.3 The {@code Code} Attribute
@since 24

## CodeModel.parent()

```java
Optional<MethodModel> parent()
```

{@return the enclosing method, if known}

## CodeModel.exceptionHandlers()

```java
List<ExceptionCatch> exceptionHandlers()
```

{@return the exception table of the method}  The exception table is also
modeled by {@link ExceptionCatch} elements in the streaming view.