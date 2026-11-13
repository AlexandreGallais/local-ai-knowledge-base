---
title: "Model Bulk Configuration - EF Core (part 3 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/modeling/bulk-configuration.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Model Bulk Configuration - EF Core (part 3 of 3)

### Replacing an existing convention

Sometimes rather than removing an existing convention completely we instead want to replace it with a convention that does basically the same thing, but with changed behavior. This is useful because the existing convention will already implement the interfaces it needs to be triggered appropriately.

#### Example: Opt-in property mapping

EF Core maps all public read-write properties by convention. This might not be appropriate for the way your entity types are defined. To change this, we can replace the `Microsoft.EntityFrameworkCore.Metadata.Conventions.PropertyDiscoveryConvention` with our own implementation that doesn't map any property unless it is explicitly mapped in `OnModelCreating` or marked with a new attribute called `Persist`:

```csharp
[AttributeUsage(AttributeTargets.Property | AttributeTargets.Field)]
public sealed class PersistAttribute : Attribute
{
}
```

Here is the new convention:

```csharp
public class AttributeBasedPropertyDiscoveryConvention : PropertyDiscoveryConvention
{
    public AttributeBasedPropertyDiscoveryConvention(ProviderConventionSetBuilderDependencies dependencies)
        : base(dependencies)
    {
    }

    public override void ProcessEntityTypeAdded(
        IConventionEntityTypeBuilder entityTypeBuilder,
        IConventionContext<IConventionEntityTypeBuilder> context)
        => Process(entityTypeBuilder);

    public override void ProcessEntityTypeBaseTypeChanged(
        IConventionEntityTypeBuilder entityTypeBuilder,
        IConventionEntityType? newBaseType,
        IConventionEntityType? oldBaseType,
        IConventionContext<IConventionEntityType> context)
    {
        if ((newBaseType == null
             || oldBaseType != null)
            && entityTypeBuilder.Metadata.BaseType == newBaseType)
        {
            Process(entityTypeBuilder);
        }
    }

    private void Process(IConventionEntityTypeBuilder entityTypeBuilder)
    {
        foreach (var memberInfo in GetRuntimeMembers())
        {
            if (Attribute.IsDefined(memberInfo, typeof(PersistAttribute), inherit: true))
            {
                entityTypeBuilder.Property(memberInfo);
            }
            else if (memberInfo is PropertyInfo propertyInfo
                     && Dependencies.TypeMappingSource.FindMapping(propertyInfo.PropertyType) != null)
            {
                entityTypeBuilder.Ignore(propertyInfo.Name);
            }
        }

        IEnumerable<MemberInfo> GetRuntimeMembers()
        {
            var clrType = entityTypeBuilder.Metadata.ClrType;

            foreach (var property in clrType.GetRuntimeProperties()
                         .Where(p => p.GetMethod != null && !p.GetMethod.IsStatic))
            {
                yield return property;
            }

            foreach (var property in clrType.GetRuntimeFields())
            {
                yield return property;
            }
        }
    }
}
```

> **Tip:**
> When replacing a built-in convention, the new convention implementation should inherit from the existing convention class. Note that some conventions have relational or provider-specific implementations, in which case the new convention implementation should inherit from the most specific existing convention class for the database provider in use.

The convention is then registered using the `Microsoft.EntityFrameworkCore.Metadata.Builders.ConventionSetBuilder.Replace*` method in `ConfigureConventions`:

```csharp
protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
{
    configurationBuilder.Conventions.Replace<PropertyDiscoveryConvention>(
        serviceProvider => new AttributeBasedPropertyDiscoveryConvention(
            serviceProvider.GetRequiredService<ProviderConventionSetBuilderDependencies>()));
}
```

> **Tip:**
> This is a case where the existing convention has dependencies, represented by the `ProviderConventionSetBuilderDependencies` dependency object. These are obtained from the internal service provider using `GetRequiredService` and passed to the convention constructor.

Notice that this convention allows fields to be mapped (in addition to properties) so long as they are marked with `[Persist]`. This means we can use private fields as hidden keys in the model.

For example, consider the following entity types:

```csharp
public class LaundryBasket
{
    [Persist]
    [Key]
    private readonly int _id;

    [Persist]
    public int TenantId { get; init; }

    public bool IsClean { get; set; }

    public List<Garment> Garments { get; } = new();
}

public class Garment
{
    public Garment(string name, string color)
    {
        Name = name;
        Color = color;
    }

    [Persist]
    [Key]
    private readonly int _id;

    [Persist]
    public int TenantId { get; init; }

    [Persist]
    public string Name { get; }

    [Persist]
    public string Color { get; }

    public bool IsClean { get; set; }

    public LaundryBasket? Basket { get; set; }
}
```

The model built from these entity types is:

```text
Model:
  EntityType: Garment
    Properties:
      _id (_id, int) Required PK AfterSave:Throw ValueGenerated.OnAdd
      Basket_id (no field, int?) Shadow FK Index
      Color (string) Required
      Name (string) Required
      TenantId (int) Required
    Navigations:
      Basket (LaundryBasket) ToPrincipal LaundryBasket Inverse: Garments
    Keys:
      _id PK
    Foreign keys:
      Garment {'Basket_id'} -> LaundryBasket {'_id'} ToDependent: Garments ToPrincipal: Basket ClientSetNull
    Indexes:
      Basket_id
  EntityType: LaundryBasket
    Properties:
      _id (_id, int) Required PK AfterSave:Throw ValueGenerated.OnAdd
      TenantId (int) Required
    Navigations:
      Garments (List<Garment>) Collection ToDependent Garment Inverse: Basket
    Keys:
      _id PK
```

Normally, `IsClean` would have been mapped, but since it is not marked with `[Persist]`, it is now treated as an un-mapped property.

> **Tip:**
> This convention could not be implemented as a model finalizing convention because there are existing model finalizing conventions that need to run after the property is mapped to further configure it.

### Conventions implementation considerations

EF Core keeps track of how every piece of configuration was made. This is represented by the `Microsoft.EntityFrameworkCore.Metadata.ConfigurationSource` enum. The different kinds of configuration are:

- `Explicit`: The model element was explicitly configured in `OnModelCreating`
- `DataAnnotation`: The model element was configured using a mapping attribute (aka data annotation) on the CLR type
- `Convention`: The model element was configured by a model building convention

Conventions should never override configuration marked as `DataAnnotation` or `Explicit`. This is achieved by using a _convention builder_, for example, the `Microsoft.EntityFrameworkCore.Metadata.Builders.IConventionPropertyBuilder`, which is obtained from the `Microsoft.EntityFrameworkCore.Metadata.IConventionProperty.Builder` property. For example:

```csharp
property.Builder.HasMaxLength(512);
```

Calling `HasMaxLength` on the convention builder will only set the max length _if it was not already configured by a mapping attribute or in `OnModelCreating`_.

Builder methods like this also have a second parameter: `fromDataAnnotation`. Set this to `true` if the convention is making the configuration on behalf of a mapping attribute. For example:

```csharp
property.Builder.HasMaxLength(512, fromDataAnnotation: true);
```

This sets the `ConfigurationSource` to `DataAnnotation`, which means that the value can now be overridden by explicit mapping on `OnModelCreating`, but not by non-mapping attribute conventions.

If the current configuration can't be overridden then the method will return `null`, this needs to be accounted for if you need to perform further configuration:

```csharp
property.Builder.HasMaxLength(512)?.IsUnicode(false);
```

Notice that if the unicode configuration can't be overridden the max length will still be set. In case when you need to configure the facets only when both calls succeed then you can preemptively check this by calling `Microsoft.EntityFrameworkCore.Metadata.Builders.IConventionPropertyBuilder.CanSetMaxLength*` and `Microsoft.EntityFrameworkCore.Metadata.Builders.IConventionPropertyBuilder.CanSetIsUnicode*`:

```csharp
public class MaxStringLengthNonUnicodeConvention : IModelFinalizingConvention
{
    public void ProcessModelFinalizing(IConventionModelBuilder modelBuilder, IConventionContext<IConventionModelBuilder> context)
    {
        foreach (var property in modelBuilder.Metadata.GetEntityTypes()
                     .SelectMany(
                         entityType => entityType.GetDeclaredProperties()
                             .Where(
                                 property => property.ClrType == typeof(string))))
        {
            var propertyBuilder = property.Builder;
            if (propertyBuilder.CanSetMaxLength(512)
                && propertyBuilder.CanSetIsUnicode(false))
            {
                propertyBuilder.HasMaxLength(512)!.IsUnicode(false);
            }
        }
    }
}
```

Here we can be sure that the call to `HasMaxLength` will not return `null`. It is still recommended to use the builder instance returned from `HasMaxLength` as it might be different from `propertyBuilder`.

> **Note:**
> Other conventions are not triggered immediately after a convention makes a change, they are delayed until all conventions have finished processing the current change.

### IConventionContext

All convention methods also have an `Microsoft.EntityFrameworkCore.Metadata.Conventions.IConventionContext`1` parameter. It provides methods that could be useful in some specific cases.

#### Example: NotMappedAttribute convention

This convention looks for `System.ComponentModel.DataAnnotations.Schema.NotMappedAttribute` on a type that is added to the model and tries to remove that entity type from the model. But if the entity type is removed from the model then any other conventions that implement `ProcessEntityTypeAdded` no longer need to be run. This can be accomplished by calling `Microsoft.EntityFrameworkCore.Metadata.Conventions.IConventionContext.StopProcessing`:

```csharp
public virtual void ProcessEntityTypeAdded(
    IConventionEntityTypeBuilder entityTypeBuilder,
    IConventionContext<IConventionEntityTypeBuilder> context)
{
    var type = entityTypeBuilder.Metadata.ClrType;
    if (!Attribute.IsDefined(type, typeof(NotMappedAttribute), inherit: true))
    {
        return;
    }

    if (entityTypeBuilder.ModelBuilder.Ignore(entityTypeBuilder.Metadata.Name, fromDataAnnotation: true) != null)
    {
        context.StopProcessing();
    }
}
```

### IConventionModel

Every builder object passed to the convention exposes a `Microsoft.EntityFrameworkCore.Metadata.Builders.IConventionModelBuilder.Metadata` property that provides a low-level access to the objects that comprise the model. In particular, there are methods that allow you to iterate over specific objects in the model and apply common configuration to them as seen in Example: Default length for all string properties. This API is similar to `Microsoft.EntityFrameworkCore.Metadata.IMutableModel` shown in Bulk configuration.

> **Caution:**
> It is advised to always perform configuration by calling methods on the builder exposed as the `Microsoft.EntityFrameworkCore.Metadata.IConventionModel.Builder` property, because the builders check whether the given configuration would override something that was already specified using Fluent API or Data Annotations.

## When to use each approach for bulk configuration

Use Metadata API when:

- The configuration needs to be applied at a certain time and not react to later changes in the model.
- The model building speed is very important. Metadata API has fewer safety checks and thus can be slightly faster than other approaches, however using a Compiled model would yield even better startup times.

Use Pre-convention model configuration when:

- The applicability condition is simple as it only depends on the type.
- The configuration needs to be applied at any point a property of the given type is added in the model and overrides Data Annotations and conventions

Use Finalizing Conventions when:

- The applicability condition is complex.
- The configuration shouldn't override what is specified by Data Annotations.

Use Interactive Conventions when:

- Multiple conventions depend on each other. Finalizing conventions run in the order they were added and therefore can't react to changes made by later finalizing conventions.
- The logic is shared between several contexts. Interactive conventions are safer than other approaches.
