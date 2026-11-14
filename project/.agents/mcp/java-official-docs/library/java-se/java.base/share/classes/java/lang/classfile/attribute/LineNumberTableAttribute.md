# LineNumberTableAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface LineNumberTableAttribute extends Attribute<LineNumberTableAttribute> permits BoundAttribute.BoundLineNumberTableAttribute, UnboundAttribute.UnboundLineNumberTableAttribute
```

Models the {@link Attributes#lineNumberTable() LineNumberTable} attribute
(JVMS {@jvms 4.7.12}), which records the mapping between indexes into
the {@code code} array and line numbers in the source file.  Its entries are
delivered as {@link LineNumber} when traversing the elements of a {@link
CodeModel}, which is toggled by {@link ClassFile.LineNumbersOption}.
<p>
This attribute only appears on {@code Code} attributes, and permits {@linkplain
AttributeMapper#allowMultiple() multiple instances} in a {@code Code}
attribute.  It has a data dependency on {@linkplain AttributeStability#LABELS
labels}.
<p>
This attribute cannot be sent to a {@link CodeBuilder}; its entries can be
constructed with {@link LineNumber}, resulting in at most one attribute
instance in the built {@code Code} attribute.
<p>
The attribute was introduced in the Java Platform version 1.0.2, major
version {@value ClassFile#JAVA_1_VERSION}.

@see Attributes#lineNumberTable()
@jvms 4.7.12 The {@code LineNumberTable} Attribute
@since 24

## LineNumberTableAttribute.lineNumbers()

```java
List<LineNumberInfo> lineNumbers()
```

{@return the table mapping bytecode offsets to source line numbers}

## LineNumberTableAttribute.of(List<LineNumberInfo>)

```java
static LineNumberTableAttribute of(List<LineNumberInfo> lines)
```

{@return a {@code LineNumberTable} attribute}

@apiNote
The created attribute cannot be written to a {@link CodeBuilder}.  Call
{@link CodeBuilder#lineNumber CodeBuilder::lineNumber} in the correct
order instead.

@param lines the line number descriptions