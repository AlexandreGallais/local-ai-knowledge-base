# ModuleEntry interface (java.lang.classfile.constantpool)

```java
public sealed interface ModuleEntry extends PoolEntry permits AbstractPoolEntry.ModuleEntryImpl
```

Models a {@code CONSTANT_Module_info} structure, denoting a module, in the
constant pool of a {@code class} file.
<p>
The use of a {@code ModuleEntry} is modeled by a {@link ModuleDesc}.
Conversions are through {@link ConstantPoolBuilder#moduleEntry(ModuleDesc)}
and {@link #asSymbol()}.
<p>
A module entry is composite:
{@snippet lang=text :
// @link substring="ModuleEntry" target="ConstantPoolBuilder#moduleEntry(Utf8Entry)" :
ModuleEntry(Utf8Entry name) // @link substring="name" target="#name()"
}
where {@code name} is a {@linkplain #asSymbol() module name}.

@jvms 4.4.11 The {@code CONSTANT_Module_info} Structure
@since 24

## ModuleEntry.name()

```java
Utf8Entry name()
```

{@return the name of the {@linkplain #asSymbol() module}}

## ModuleEntry.asSymbol()

```java
ModuleDesc asSymbol()
```

{@return a symbolic descriptor for the {@linkplain #name() module name}}

@apiNote
If only symbol equivalence is desired, {@link #matches(ModuleDesc)
matches} should be used.  It requires reduced parsing and can
improve {@code class} file reading performance.

## ModuleEntry.matches(ModuleDesc)

```java
boolean matches(ModuleDesc desc)
```

{@return whether this entry describes the given module}

@param desc the module descriptor
@since 25