# Attributes class (java.lang.classfile)

```java
public final class Attributes
```

Attribute mappers for predefined (JVMS {@jvms 4.7}) and JDK-specific
nonstandard attributes.
<p>
Unless otherwise specified, each mapper returned by methods in this class:
<ul>
<li>is predefined in the JVMS instead of JDK-specific;
<li>does not permit {@linkplain AttributeMapper#allowMultiple() multiple
attribute instances} in the same structure;
<li>the attribute has a {@linkplain AttributeMapper#stability() data
dependency} on the {@linkplain AttributeStability#CP_REFS constant pool}.
</ul>

@see AttributeMapper
@see java.lang.classfile.attribute
@since 24

## Attributes.NAME_ANNOTATION_DEFAULT

```java
public static final String NAME_ANNOTATION_DEFAULT
```

AnnotationDefault

## Attributes.NAME_BOOTSTRAP_METHODS

```java
public static final String NAME_BOOTSTRAP_METHODS
```

BootstrapMethods

## Attributes.NAME_CHARACTER_RANGE_TABLE

```java
public static final String NAME_CHARACTER_RANGE_TABLE
```

CharacterRangeTable

## Attributes.NAME_CODE

```java
public static final String NAME_CODE
```

Code

## Attributes.NAME_COMPILATION_ID

```java
public static final String NAME_COMPILATION_ID
```

CompilationID

## Attributes.NAME_CONSTANT_VALUE

```java
public static final String NAME_CONSTANT_VALUE
```

ConstantValue

## Attributes.NAME_DEPRECATED

```java
public static final String NAME_DEPRECATED
```

Deprecated

## Attributes.NAME_ENCLOSING_METHOD

```java
public static final String NAME_ENCLOSING_METHOD
```

EnclosingMethod

## Attributes.NAME_EXCEPTIONS

```java
public static final String NAME_EXCEPTIONS
```

Exceptions

## Attributes.NAME_INNER_CLASSES

```java
public static final String NAME_INNER_CLASSES
```

InnerClasses

## Attributes.NAME_LINE_NUMBER_TABLE

```java
public static final String NAME_LINE_NUMBER_TABLE
```

LineNumberTable

## Attributes.NAME_LOCAL_VARIABLE_TABLE

```java
public static final String NAME_LOCAL_VARIABLE_TABLE
```

LocalVariableTable

## Attributes.NAME_LOCAL_VARIABLE_TYPE_TABLE

```java
public static final String NAME_LOCAL_VARIABLE_TYPE_TABLE
```

LocalVariableTypeTable

## Attributes.NAME_METHOD_PARAMETERS

```java
public static final String NAME_METHOD_PARAMETERS
```

MethodParameters

## Attributes.NAME_MODULE

```java
public static final String NAME_MODULE
```

Module

## Attributes.NAME_MODULE_HASHES

```java
public static final String NAME_MODULE_HASHES
```

ModuleHashes

## Attributes.NAME_MODULE_MAIN_CLASS

```java
public static final String NAME_MODULE_MAIN_CLASS
```

ModuleMainClass

## Attributes.NAME_MODULE_PACKAGES

```java
public static final String NAME_MODULE_PACKAGES
```

ModulePackages

## Attributes.NAME_MODULE_RESOLUTION

```java
public static final String NAME_MODULE_RESOLUTION
```

ModuleResolution

## Attributes.NAME_MODULE_TARGET

```java
public static final String NAME_MODULE_TARGET
```

ModuleTarget

## Attributes.NAME_NEST_HOST

```java
public static final String NAME_NEST_HOST
```

NestHost

## Attributes.NAME_NEST_MEMBERS

```java
public static final String NAME_NEST_MEMBERS
```

NestMembers

## Attributes.NAME_PERMITTED_SUBCLASSES

```java
public static final String NAME_PERMITTED_SUBCLASSES
```

PermittedSubclasses

## Attributes.NAME_RECORD

```java
public static final String NAME_RECORD
```

Record

## Attributes.NAME_RUNTIME_INVISIBLE_ANNOTATIONS

```java
public static final String NAME_RUNTIME_INVISIBLE_ANNOTATIONS
```

RuntimeInvisibleAnnotations

## Attributes.NAME_RUNTIME_INVISIBLE_PARAMETER_ANNOTATIONS

```java
public static final String NAME_RUNTIME_INVISIBLE_PARAMETER_ANNOTATIONS
```

RuntimeInvisibleParameterAnnotations

## Attributes.NAME_RUNTIME_INVISIBLE_TYPE_ANNOTATIONS

```java
public static final String NAME_RUNTIME_INVISIBLE_TYPE_ANNOTATIONS
```

RuntimeInvisibleTypeAnnotations

## Attributes.NAME_RUNTIME_VISIBLE_ANNOTATIONS

```java
public static final String NAME_RUNTIME_VISIBLE_ANNOTATIONS
```

RuntimeVisibleAnnotations

## Attributes.NAME_RUNTIME_VISIBLE_PARAMETER_ANNOTATIONS

```java
public static final String NAME_RUNTIME_VISIBLE_PARAMETER_ANNOTATIONS
```

RuntimeVisibleParameterAnnotations

## Attributes.NAME_RUNTIME_VISIBLE_TYPE_ANNOTATIONS

```java
public static final String NAME_RUNTIME_VISIBLE_TYPE_ANNOTATIONS
```

RuntimeVisibleTypeAnnotations

## Attributes.NAME_SIGNATURE

```java
public static final String NAME_SIGNATURE
```

Signature

## Attributes.NAME_SOURCE_DEBUG_EXTENSION

```java
public static final String NAME_SOURCE_DEBUG_EXTENSION
```

SourceDebugExtension

## Attributes.NAME_SOURCE_FILE

```java
public static final String NAME_SOURCE_FILE
```

SourceFile

## Attributes.NAME_SOURCE_ID

```java
public static final String NAME_SOURCE_ID
```

SourceID

## Attributes.NAME_STACK_MAP_TABLE

```java
public static final String NAME_STACK_MAP_TABLE
```

StackMapTable

## Attributes.NAME_SYNTHETIC

```java
public static final String NAME_SYNTHETIC
```

Synthetic

## Attributes.annotationDefault()

```java
public static AttributeMapper<AnnotationDefaultAttribute> annotationDefault()
```

{@return the mapper for the {@code AnnotationDefault} attribute}

## Attributes.bootstrapMethods()

```java
public static AttributeMapper<BootstrapMethodsAttribute> bootstrapMethods()
```

{@return the mapper for the {@code BootstrapMethods} attribute}

## Attributes.characterRangeTable()

```java
public static AttributeMapper<CharacterRangeTableAttribute> characterRangeTable()
```

{@return the mapper for the {@code CharacterRangeTable} attribute}
This is a JDK-specific attribute.
The mapper permits multiple instances in a {@code Code} attribute, but this
attribute should be only emitted once.
This has a data dependency on {@linkplain AttributeStability#LABELS labels}.

## Attributes.code()

```java
public static AttributeMapper<CodeAttribute> code()
```

{@return the mapper for the {@code Code} attribute}

## Attributes.compilationId()

```java
public static AttributeMapper<CompilationIDAttribute> compilationId()
```

{@return the mapper for the {@code CompilationID} attribute}
This is a JDK-specific attribute.

## Attributes.constantValue()

```java
public static AttributeMapper<ConstantValueAttribute> constantValue()
```

{@return the mapper for the {@code ConstantValue} attribute}

## Attributes.deprecated()

```java
public static AttributeMapper<DeprecatedAttribute> deprecated()
```

{@return the mapper for the {@code Deprecated} attribute}
The mapper permits multiple instances in a given location.
This has {@linkplain AttributeStability#STATELESS no data dependency}.

## Attributes.enclosingMethod()

```java
public static AttributeMapper<EnclosingMethodAttribute> enclosingMethod()
```

{@return the mapper for the {@code EnclosingMethod} attribute}

## Attributes.exceptions()

```java
public static AttributeMapper<ExceptionsAttribute> exceptions()
```

{@return the mapper for the {@code Exceptions} attribute}

## Attributes.innerClasses()

```java
public static AttributeMapper<InnerClassesAttribute> innerClasses()
```

{@return the mapper for the {@code InnerClasses} attribute}

## Attributes.lineNumberTable()

```java
public static AttributeMapper<LineNumberTableAttribute> lineNumberTable()
```

{@return the mapper for the {@code LineNumberTable} attribute}
The mapper permits multiple instances in a {@code Code} attribute.
This has a data dependency on {@linkplain AttributeStability#LABELS labels}.

## Attributes.localVariableTable()

```java
public static AttributeMapper<LocalVariableTableAttribute> localVariableTable()
```

{@return the mapper for the {@code LocalVariableTable} attribute}
The mapper permits multiple instances in a {@code Code} attribute.
This has a data dependency on {@linkplain AttributeStability#LABELS labels}.

## Attributes.localVariableTypeTable()

```java
public static AttributeMapper<LocalVariableTypeTableAttribute> localVariableTypeTable()
```

{@return the mapper for the {@code LocalVariableTypeTable} attribute}
The mapper permits multiple instances in a given location.
This has a data dependency on {@linkplain AttributeStability#LABELS labels}.

## Attributes.methodParameters()

```java
public static AttributeMapper<MethodParametersAttribute> methodParameters()
```

{@return the mapper for the {@code MethodParameters} attribute}

## Attributes.module()

```java
public static AttributeMapper<ModuleAttribute> module()
```

{@return the mapper for the {@code Module} attribute}

## Attributes.moduleHashes()

```java
public static AttributeMapper<ModuleHashesAttribute> moduleHashes()
```

{@return the mapper for the {@code ModuleHashes} attribute}
This is a JDK-specific attribute.

## Attributes.moduleMainClass()

```java
public static AttributeMapper<ModuleMainClassAttribute> moduleMainClass()
```

{@return the mapper for the {@code ModuleMainClass} attribute}

## Attributes.modulePackages()

```java
public static AttributeMapper<ModulePackagesAttribute> modulePackages()
```

{@return the mapper for the {@code ModulePackages} attribute}

## Attributes.moduleResolution()

```java
public static AttributeMapper<ModuleResolutionAttribute> moduleResolution()
```

{@return the mapper for the {@code ModuleResolution} attribute}
This is a JDK-specific attribute.
This has {@linkplain AttributeStability#STATELESS no data dependency}.

## Attributes.moduleTarget()

```java
public static AttributeMapper<ModuleTargetAttribute> moduleTarget()
```

{@return the mapper for the {@code ModuleTarget} attribute}
This is a JDK-specific attribute.

## Attributes.nestHost()

```java
public static AttributeMapper<NestHostAttribute> nestHost()
```

{@return the mapper for the {@code NestHost} attribute}

## Attributes.nestMembers()

```java
public static AttributeMapper<NestMembersAttribute> nestMembers()
```

{@return the mapper for the {@code NestMembers} attribute}

## Attributes.permittedSubclasses()

```java
public static AttributeMapper<PermittedSubclassesAttribute> permittedSubclasses()
```

{@return the mapper for the {@code PermittedSubclasses} attribute}

## Attributes.record()

```java
public static AttributeMapper<RecordAttribute> record()
```

{@return the mapper for the {@code Record} attribute}

## Attributes.runtimeInvisibleAnnotations()

```java
public static AttributeMapper<RuntimeInvisibleAnnotationsAttribute> runtimeInvisibleAnnotations()
```

{@return the mapper for the {@code RuntimeInvisibleAnnotations} attribute}

## Attributes.runtimeInvisibleParameterAnnotations()

```java
public static AttributeMapper<RuntimeInvisibleParameterAnnotationsAttribute> runtimeInvisibleParameterAnnotations()
```

{@return the mapper for the {@code RuntimeInvisibleParameterAnnotations} attribute}

## Attributes.runtimeInvisibleTypeAnnotations()

```java
public static AttributeMapper<RuntimeInvisibleTypeAnnotationsAttribute> runtimeInvisibleTypeAnnotations()
```

{@return the mapper for the {@code RuntimeInvisibleTypeAnnotations} attribute}
This has a data dependency on {@linkplain AttributeStability#UNSTABLE
arbitrary indices} in the {@code class} file format.

## Attributes.runtimeVisibleAnnotations()

```java
public static AttributeMapper<RuntimeVisibleAnnotationsAttribute> runtimeVisibleAnnotations()
```

{@return the mapper for the {@code RuntimeVisibleAnnotations} attribute}

## Attributes.runtimeVisibleParameterAnnotations()

```java
public static AttributeMapper<RuntimeVisibleParameterAnnotationsAttribute> runtimeVisibleParameterAnnotations()
```

{@return the mapper for the {@code RuntimeVisibleParameterAnnotations} attribute}

## Attributes.runtimeVisibleTypeAnnotations()

```java
public static AttributeMapper<RuntimeVisibleTypeAnnotationsAttribute> runtimeVisibleTypeAnnotations()
```

{@return the mapper for the {@code RuntimeVisibleTypeAnnotations} attribute}
This has a data dependency on {@linkplain AttributeStability#UNSTABLE
arbitrary indices} in the {@code class} file format.

## Attributes.signature()

```java
public static AttributeMapper<SignatureAttribute> signature()
```

{@return the mapper for the {@code Signature} attribute}

## Attributes.sourceDebugExtension()

```java
public static AttributeMapper<SourceDebugExtensionAttribute> sourceDebugExtension()
```

{@return the mapper for the {@code SourceDebugExtension} attribute}
This has {@linkplain AttributeStability#STATELESS no data dependency}.

## Attributes.sourceFile()

```java
public static AttributeMapper<SourceFileAttribute> sourceFile()
```

{@return the mapper for the {@code SourceFile} attribute}

## Attributes.sourceId()

```java
public static AttributeMapper<SourceIDAttribute> sourceId()
```

{@return the mapper for the {@code SourceID} attribute}
This is a JDK-specific attribute.

## Attributes.stackMapTable()

```java
public static AttributeMapper<StackMapTableAttribute> stackMapTable()
```

{@return the mapper for the {@code StackMapTable} attribute}
This has a data dependency on {@linkplain AttributeStability#LABELS labels}.

## Attributes.synthetic()

```java
public static AttributeMapper<SyntheticAttribute> synthetic()
```

{@return the mapper for the {@code Synthetic} attribute}
The mapper permits multiple instances in a given location.
This has {@linkplain AttributeStability#STATELESS no data dependency}.