# LocalVariableTypeTableAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface LocalVariableTypeTableAttribute extends Attribute<LocalVariableTypeTableAttribute> permits BoundAttribute.BoundLocalVariableTypeTableAttribute, UnboundAttribute.UnboundLocalVariableTypeTableAttribute
```

Models the {@link Attributes#localVariableTypeTable() LocalVariableTypeTable}
attribute (JVMS {@jvms 4.7.14}), which records debug information about local
variables with generic types.  Its entries are delivered as {@link
LocalVariableType}s when traversing the elements of a {@link CodeModel},
which can be toggled by {@link ClassFile.DebugElementsOption}.
<p>
This attribute only appears on {@code Code} attributes, and permits {@linkplain
AttributeMapper#allowMultiple() multiple instances} in a {@code Code}
attribute.  It has a data dependency on {@linkplain AttributeStability#LABELS
labels}.
<p>
This attribute cannot be sent to a {@link CodeBuilder}; its entries can be
constructed with {@link LocalVariableType}, resulting in at most one attribute
instance in the built {@code Code} attribute.
<p>
The attribute was introduced in the Java SE Platform version 5.0, major
version {@value ClassFile#JAVA_5_VERSION}.

@apiNote
Only local variables that have generic field types need to be described by
this attribute.  If a local variable is described in a {@code
LocalVariableTypeTable} attribute, it must also be described in a {@link
LocalVariableTableAttribute LocalVariableTable} attribute.

@see Attributes#localVariableTypeTable()
@jvms 4.7.14 The {@code LocalVariableTypeTable} Attribute
@since 24

## LocalVariableTypeTableAttribute.localVariableTypes()

```java
List<LocalVariableTypeInfo> localVariableTypes()
```

{@return debug information for the local variables with generic types in this method}

## LocalVariableTypeTableAttribute.of(List<LocalVariableTypeInfo>)

```java
static LocalVariableTypeTableAttribute of(List<LocalVariableTypeInfo> locals)
```

{@return a {@code LocalVariableTypeTable} attribute}
@param locals the local variable descriptions