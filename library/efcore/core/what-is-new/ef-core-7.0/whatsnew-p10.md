---
title: "What's New in EF Core 7.0 (part 10 of 16)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-7.0/whatsnew.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# What's New in EF Core 7.0 (part 10 of 16)

### Replacing an existing convention

Sometimes rather than removing an existing convention completely we instead want to replace it with a convention that does basically the same thing, but with changed behavior. This is useful because the existing convention will already implement the interfaces it needs so as to be triggered appropriately.

#### Example: Opt-in property mapping

EF Core maps all public read-write properties by convention. This might not be appropriate for the way your entity types are defined. To change this, we can replace the `PropertyDiscoveryConvention` with our own implementation that doesn't map any property unless it is explicitly mapped in `OnModelCreating` or marked with a new attribute called `Persist`:

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
                     && Dependencies.TypeMappingSource.FindMapping(propertyInfo) != null)
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

The convention is then registered using the `Replace` method in `ConfigureConventions`:

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

This convention works by getting all readable properties and fields from the given entity type. If the member is attributed with `[Persist]`, then it is mapped by calling:

```csharp
entityTypeBuilder.Property(memberInfo);
```

On the other hand, if the member is a property that would otherwise have been mapped, then it is excluded from the model using:

```csharp
entityTypeBuilder.Ignore(propertyInfo.Name);
```

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

Notice that normally, `IsClean` would have been mapped, but since it is not marked with `[Persist]` (presumably because cleanliness is not a persistent property of laundry), it is now treated as an un-mapped property.

> **Tip:**
> This convention could not be implemented as a model finalizing convention because mapping a property triggers many other conventions to run to further configure the mapped property.
