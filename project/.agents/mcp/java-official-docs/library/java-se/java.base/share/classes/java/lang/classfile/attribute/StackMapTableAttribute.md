# StackMapTableAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface StackMapTableAttribute extends Attribute<StackMapTableAttribute>, CodeElement permits BoundAttribute.BoundStackMapTableAttribute, UnboundAttribute.UnboundStackMapTableAttribute
```

Models the {@link Attributes#stackMapTable() StackMapTable} attribute (JVMS
{@jvms 4.7.4}), which is used for verification by type checking ({@jvms
4.10.1}).
<p>
This attribute is not delivered in the traversal of a {@link CodeAttribute},
but instead automatically generated upon {@code class} file writing.
Advanced users can supply their own stack maps according to the {@link
ClassFile.StackMapsOption}.
<p>
This attribute only appears on {@code Code} attributes, and does not permit
{@linkplain AttributeMapper#allowMultiple multiple instances} in a {@code
Code} attribute.  It has a data dependency on {@linkplain
AttributeStability#LABELS labels} in the {@code code} array.
<p>
This attribute was introduced in the Java SE Platform version 6, major
version {@value ClassFile#JAVA_6_VERSION}.

@see Attributes#stackMapTable()
@see DiscontinuedInstruction.JsrInstruction
@see DiscontinuedInstruction.RetInstruction
@jvms 4.7.4 The {@code StackMapTable} Attribute
@jvms 4.10.1 Verification by Type Checking
@since 24

## StackMapTableAttribute.entries()

```java
List<StackMapFrameInfo> entries()
```

{@return the stack map frames}

## StackMapTableAttribute.of(List<StackMapFrameInfo>)

```java
public static StackMapTableAttribute of(List<StackMapFrameInfo> entries)
```

{@return a stack map table attribute}

@param entries the stack map frames