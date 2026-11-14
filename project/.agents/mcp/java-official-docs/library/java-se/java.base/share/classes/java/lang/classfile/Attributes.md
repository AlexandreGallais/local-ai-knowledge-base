---
title: "Attributes class (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/Attributes.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Attributes class (java.lang.classfile)

```java
public final class Attributes
```

Attribute mappers for predefined (JVMS ) and JDK-specific
nonstandard attributes.

Unless otherwise specified, each mapper returned by methods in this class:

- is predefined in the JVMS instead of JDK-specific;

- does not permit multiple attribute instances in the same structure;

- the attribute has a data dependency on the constant pool.

**See also:** AttributeMapper

**See also:** java.lang.classfile.attribute

**Since:** 24

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

## Attributes.bootstrapMethods()

```java
public static AttributeMapper<BootstrapMethodsAttribute> bootstrapMethods()
```

## Attributes.characterRangeTable()

```java
public static AttributeMapper<CharacterRangeTableAttribute> characterRangeTable()
```

This is a JDK-specific attribute.
The mapper permits multiple instances in a `Code` attribute, but this
attribute should be only emitted once.
This has a data dependency on labels.

## Attributes.code()

```java
public static AttributeMapper<CodeAttribute> code()
```

## Attributes.compilationId()

```java
public static AttributeMapper<CompilationIDAttribute> compilationId()
```

This is a JDK-specific attribute.

## Attributes.constantValue()

```java
public static AttributeMapper<ConstantValueAttribute> constantValue()
```

## Attributes.deprecated()

```java
public static AttributeMapper<DeprecatedAttribute> deprecated()
```

The mapper permits multiple instances in a given location.
This has no data dependency.

## Attributes.enclosingMethod()

```java
public static AttributeMapper<EnclosingMethodAttribute> enclosingMethod()
```

## Attributes.exceptions()

```java
public static AttributeMapper<ExceptionsAttribute> exceptions()
```

## Attributes.innerClasses()

```java
public static AttributeMapper<InnerClassesAttribute> innerClasses()
```

## Attributes.lineNumberTable()

```java
public static AttributeMapper<LineNumberTableAttribute> lineNumberTable()
```

The mapper permits multiple instances in a `Code` attribute.
This has a data dependency on labels.

## Attributes.localVariableTable()

```java
public static AttributeMapper<LocalVariableTableAttribute> localVariableTable()
```

The mapper permits multiple instances in a `Code` attribute.
This has a data dependency on labels.

## Attributes.localVariableTypeTable()

```java
public static AttributeMapper<LocalVariableTypeTableAttribute> localVariableTypeTable()
```

The mapper permits multiple instances in a given location.
This has a data dependency on labels.

## Attributes.methodParameters()

```java
public static AttributeMapper<MethodParametersAttribute> methodParameters()
```

## Attributes.module()

```java
public static AttributeMapper<ModuleAttribute> module()
```

## Attributes.moduleHashes()

```java
public static AttributeMapper<ModuleHashesAttribute> moduleHashes()
```

This is a JDK-specific attribute.

## Attributes.moduleMainClass()

```java
public static AttributeMapper<ModuleMainClassAttribute> moduleMainClass()
```

## Attributes.modulePackages()

```java
public static AttributeMapper<ModulePackagesAttribute> modulePackages()
```

## Attributes.moduleResolution()

```java
public static AttributeMapper<ModuleResolutionAttribute> moduleResolution()
```

This is a JDK-specific attribute.
This has no data dependency.

## Attributes.moduleTarget()

```java
public static AttributeMapper<ModuleTargetAttribute> moduleTarget()
```

This is a JDK-specific attribute.

## Attributes.nestHost()

```java
public static AttributeMapper<NestHostAttribute> nestHost()
```

## Attributes.nestMembers()

```java
public static AttributeMapper<NestMembersAttribute> nestMembers()
```

## Attributes.permittedSubclasses()

```java
public static AttributeMapper<PermittedSubclassesAttribute> permittedSubclasses()
```

## Attributes.record()

```java
public static AttributeMapper<RecordAttribute> record()
```

## Attributes.runtimeInvisibleAnnotations()

```java
public static AttributeMapper<RuntimeInvisibleAnnotationsAttribute> runtimeInvisibleAnnotations()
```

## Attributes.runtimeInvisibleParameterAnnotations()

```java
public static AttributeMapper<RuntimeInvisibleParameterAnnotationsAttribute> runtimeInvisibleParameterAnnotations()
```

## Attributes.runtimeInvisibleTypeAnnotations()

```java
public static AttributeMapper<RuntimeInvisibleTypeAnnotationsAttribute> runtimeInvisibleTypeAnnotations()
```

This has a data dependency on arbitrary indices in the `class` file format.

## Attributes.runtimeVisibleAnnotations()

```java
public static AttributeMapper<RuntimeVisibleAnnotationsAttribute> runtimeVisibleAnnotations()
```

## Attributes.runtimeVisibleParameterAnnotations()

```java
public static AttributeMapper<RuntimeVisibleParameterAnnotationsAttribute> runtimeVisibleParameterAnnotations()
```

## Attributes.runtimeVisibleTypeAnnotations()

```java
public static AttributeMapper<RuntimeVisibleTypeAnnotationsAttribute> runtimeVisibleTypeAnnotations()
```

This has a data dependency on arbitrary indices in the `class` file format.

## Attributes.signature()

```java
public static AttributeMapper<SignatureAttribute> signature()
```

## Attributes.sourceDebugExtension()

```java
public static AttributeMapper<SourceDebugExtensionAttribute> sourceDebugExtension()
```

This has no data dependency.

## Attributes.sourceFile()

```java
public static AttributeMapper<SourceFileAttribute> sourceFile()
```

## Attributes.sourceId()

```java
public static AttributeMapper<SourceIDAttribute> sourceId()
```

This is a JDK-specific attribute.

## Attributes.stackMapTable()

```java
public static AttributeMapper<StackMapTableAttribute> stackMapTable()
```

This has a data dependency on labels.

## Attributes.synthetic()

```java
public static AttributeMapper<SyntheticAttribute> synthetic()
```

The mapper permits multiple instances in a given location.
This has no data dependency.
