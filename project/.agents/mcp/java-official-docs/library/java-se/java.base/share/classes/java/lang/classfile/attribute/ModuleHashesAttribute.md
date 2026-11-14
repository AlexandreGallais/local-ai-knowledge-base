# ModuleHashesAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface ModuleHashesAttribute extends Attribute<ModuleHashesAttribute>, ClassElement permits BoundAttribute.BoundModuleHashesAttribute, UnboundAttribute.UnboundModuleHashesAttribute
```

Models the {@link Attributes#moduleHashes() ModuleHashes} attribute, which
appears on classes that {@linkplain ClassModel#isModuleInfo() represent}
module descriptors to capture the hashes of a set of co-delivered modules.
<p>
The specification of the {@code ModuleHashes} attribute is:
<pre> {@code

ModuleHashes_attribute {
  // index to CONSTANT_utf8_info structure in constant pool representing
  // the string "ModuleHashes"
  u2 attribute_name_index;
  u4 attribute_length;

  // index to CONSTANT_utf8_info structure with algorithm name
  u2 algorithm_index;

  // the number of entries in the hashes table
  u2 hashes_count;
  {   u2 module_name_index (index to CONSTANT_Module_info structure)
      u2 hash_length;
      u1 hash[hash_length];
  } hashes[hashes_count];

}
} </pre>
<p>
This attribute only appears on classes, and does not permit {@linkplain
AttributeMapper#allowMultiple multiple instances} in a class.  It has a
data dependency on the {@linkplain AttributeStability#CP_REFS constant pool}.
<p>
This attribute is not predefined in the Java SE Platform.  This is a
JDK-specific nonstandard attribute produced by the {@code jdk.jlink} module,
which defines the {@code jlink} and {@code jmod} tools.

@see Attributes#moduleHashes()
@see ModuleResolutionAttribute
@see ModuleTargetAttribute
@since 24

## ModuleHashesAttribute.algorithm()

```java
Utf8Entry algorithm()
```

{@return the algorithm name used to compute the hash}

## ModuleHashesAttribute.hashes()

```java
List<ModuleHashInfo> hashes()
```

{@return the hash information about related modules}

## ModuleHashesAttribute.of(String, List<ModuleHashInfo>)

```java
static ModuleHashesAttribute of(String algorithm, List<ModuleHashInfo> hashes)
```

{@return a {@code ModuleHashes} attribute}
@param algorithm the hashing algorithm
@param hashes the hash descriptions

## ModuleHashesAttribute.of(String, ModuleHashInfo...)

```java
static ModuleHashesAttribute of(String algorithm, ModuleHashInfo... hashes)
```

{@return a {@code ModuleHashes} attribute}
@param algorithm the hashing algorithm
@param hashes the hash descriptions

## ModuleHashesAttribute.of(Utf8Entry, List<ModuleHashInfo>)

```java
static ModuleHashesAttribute of(Utf8Entry algorithm, List<ModuleHashInfo> hashes)
```

{@return a {@code ModuleHashes} attribute}
@param algorithm the hashing algorithm
@param hashes the hash descriptions

## ModuleHashesAttribute.of(Utf8Entry, ModuleHashInfo...)

```java
static ModuleHashesAttribute of(Utf8Entry algorithm, ModuleHashInfo... hashes)
```

{@return a {@code ModuleHashes} attribute}
@param algorithm the hashing algorithm
@param hashes the hash descriptions