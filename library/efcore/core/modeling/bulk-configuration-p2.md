---
title: "Model Bulk Configuration - EF Core (part 2 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/modeling/bulk-configuration.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Model Bulk Configuration - EF Core (part 2 of 3)

## Conventions

EF Core model building conventions are classes that contain logic that is triggered based on changes being made to the model as it is being built. This keeps the model up-to-date as explicit configuration is made, mapping attributes are applied, and other conventions run. To participate in this, every convention implements one or more interfaces which determine when the corresponding method will be triggered. For example, a convention that implements `Microsoft.EntityFrameworkCore.Metadata.Conventions.IEntityTypeAddedConvention` will be triggered whenever a new entity type is added to the model. Likewise, a convention that implements both `Microsoft.EntityFrameworkCore.Metadata.Conventions.IForeignKeyAddedConvention` and `Microsoft.EntityFrameworkCore.Metadata.Conventions.IKeyAddedConvention` will be triggered whenever either a key or a foreign key is added to the model.

Model building conventions are a powerful way to control the model configuration, but can be complex and hard to get right. In many cases, the pre-convention model configuration can be used instead to easily specify common configuration for properties and types.

### Adding a new convention

#### Example: Constrain length of discriminator properties

The table-per-hierarchy inheritance mapping strategy requires a discriminator column to specify which type is represented in any given row. By default, EF uses an unbounded string column for the discriminator, which ensures that it will work for any discriminator length. However, constraining the maximum length of discriminator strings can make for more efficient storage and queries. Let's create a new convention that will do that.

EF Core model building conventions are triggered based on changes being made to the model as it is being built. This keeps the model up-to-date as explicit configuration is made, mapping attributes are applied, and other conventions run. To participate in this, every convention implements one or more interfaces which determine when the convention will be triggered. For example, a convention that implements `Microsoft.EntityFrameworkCore.Metadata.Conventions.IEntityTypeAddedConvention` will be triggered whenever a new entity type is added to the model. Likewise, a convention that implements both `Microsoft.EntityFrameworkCore.Metadata.Conventions.IForeignKeyAddedConvention` and `Microsoft.EntityFrameworkCore.Metadata.Conventions.IKeyAddedConvention` will be triggered whenever either a key or a foreign key is added to the model.

Knowing which interfaces to implement can be tricky, since configuration made to the model at one point may be changed or removed at a later point. For example, a key may be created by convention, but then later replaced when a different key is configured explicitly.

Let's make this a bit more concrete by making a first attempt at implementing the discriminator-length convention:

```csharp
public class DiscriminatorLengthConvention1 : IEntityTypeBaseTypeChangedConvention
{
    public void ProcessEntityTypeBaseTypeChanged(
        IConventionEntityTypeBuilder entityTypeBuilder,
        IConventionEntityType? newBaseType,
        IConventionEntityType? oldBaseType,
        IConventionContext<IConventionEntityType> context)
    {
        var discriminatorProperty = entityTypeBuilder.Metadata.FindDiscriminatorProperty();
        if (discriminatorProperty != null
            && discriminatorProperty.ClrType == typeof(string))
        {
            discriminatorProperty.Builder.HasMaxLength(24);
        }
    }
}
```

This convention implements `Microsoft.EntityFrameworkCore.Metadata.Conventions.IEntityTypeBaseTypeChangedConvention`, which means it will be triggered whenever the mapped inheritance hierarchy for an entity type is changed. The convention then finds and configures the string discriminator property for the hierarchy.

This convention is then used by calling `Microsoft.EntityFrameworkCore.Metadata.Builders.ConventionSetBuilder.Add*` in `ConfigureConventions`:

```csharp
protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
{
    configurationBuilder.Conventions.Add(_ =>  new DiscriminatorLengthConvention1());
}
```

> **Note:**
> Rather than adding an instance of the convention directly, the `Add` method accepts a factory for creating instances of the convention. This allows the convention to use dependencies from the EF Core internal service provider. Since this convention has no dependencies, the service provider parameter is named `_`, indicating that it is never used.

Building the model and looking at the `Post` entity type shows that this has worked - the discriminator property is now configured to with a maximum length of 24:

```text
 Discriminator (no field, string) Shadow Required AfterSave:Throw MaxLength(24)
```

But what happens if we now explicitly configure a different discriminator property? For example:

```csharp
modelBuilder.Entity<Post>()
    .HasDiscriminator<string>("PostTypeDiscriminator")
    .HasValue<Post>("Post")
    .HasValue<FeaturedPost>("Featured");
```

Looking at the debug view of the model, we find that the discriminator length is no longer configured.

```text
 PostTypeDiscriminator (no field, string) Shadow Required AfterSave:Throw
```

This is because the discriminator property that we configured in our convention was later removed when the custom discriminator was added. We could attempt to fix this by implementing another interface on our convention to react to the discriminator changes, but figuring out which interface to implement is not easy.

Fortunately, there is an easier approach. A lot of the time, it doesn't matter what the model looks like while it is being built, as long as the final model is correct. In addition, the configuration we want to apply often does not need to trigger other conventions to react. Therefore, our convention can implement `Microsoft.EntityFrameworkCore.Metadata.Conventions.IModelFinalizingConvention`. _Model finalizing conventions_ run after all other model building is complete, and so have access to the near-final state of the model. This is opposed to _interactive conventions_ that react to each model change and make sure that the model is up-to-date at any point of the `OnModelCreating` method execution. A model finalizing convention will typically iterate over the entire model configuring model elements as it goes. So, in this case, we will find every discriminator in the model and configure it:

```csharp
public class DiscriminatorLengthConvention2 : IModelFinalizingConvention
{
    public void ProcessModelFinalizing(IConventionModelBuilder modelBuilder, IConventionContext<IConventionModelBuilder> context)
    {
        foreach (var entityType in modelBuilder.Metadata.GetEntityTypes()
                     .Where(entityType => entityType.BaseType == null))
        {
            var discriminatorProperty = entityType.FindDiscriminatorProperty();
            if (discriminatorProperty != null
                && discriminatorProperty.ClrType == typeof(string))
            {
                discriminatorProperty.Builder.HasMaxLength(24);
            }
        }
    }
}
```

After building the model with this new convention, we find that the discriminator length is now configured correctly even though it has been customized:

```text
PostTypeDiscriminator (no field, string) Shadow Required AfterSave:Throw MaxLength(24)
```

We can go one step further and configure the max length to be the length of the longest discriminator value:

```csharp
public class DiscriminatorLengthConvention3 : IModelFinalizingConvention
{
    public void ProcessModelFinalizing(IConventionModelBuilder modelBuilder, IConventionContext<IConventionModelBuilder> context)
    {
        foreach (var entityType in modelBuilder.Metadata.GetEntityTypes()
                     .Where(entityType => entityType.BaseType == null))
        {
            var discriminatorProperty = entityType.FindDiscriminatorProperty();
            if (discriminatorProperty != null
                && discriminatorProperty.ClrType == typeof(string))
            {
                var maxDiscriminatorValueLength =
                    entityType.GetDerivedTypesInclusive().Select(e => ((string)e.GetDiscriminatorValue()!).Length).Max();

                discriminatorProperty.Builder.HasMaxLength(maxDiscriminatorValueLength);
            }
        }
    }
}
```

Now the discriminator column max length is 8, which is the length of "Featured", the longest discriminator value in use.

```text
PostTypeDiscriminator (no field, string) Shadow Required AfterSave:Throw MaxLength(8)
```

#### Example: Default length for all string properties

Let's look at another example where a finalizing convention can be used - setting a default maximum length for _any_ string property. The convention looks quite similar to the previous example:

```csharp
public class MaxStringLengthConvention : IModelFinalizingConvention
{
    public void ProcessModelFinalizing(IConventionModelBuilder modelBuilder, IConventionContext<IConventionModelBuilder> context)
    {
        foreach (var property in modelBuilder.Metadata.GetEntityTypes()
                     .SelectMany(
                         entityType => entityType.GetDeclaredProperties()
                             .Where(
                                 property => property.ClrType == typeof(string))))
        {
            property.Builder.HasMaxLength(512);
        }
    }
}
```

This convention is pretty simple. It finds every string property in the model and sets its max length to 512. Looking in the debug view at the properties for `Post`, we see that all the string properties now have a max length of 512.

```text
EntityType: Post
  Properties:
    Id (int) Required PK AfterSave:Throw ValueGenerated.OnAdd
    AuthorId (no field, int?) Shadow FK Index
    BlogId (no field, int) Shadow Required FK Index
    Content (string) Required MaxLength(512)
    Discriminator (no field, string) Shadow Required AfterSave:Throw MaxLength(512)
    PublishedOn (DateTime) Required
    Title (string) Required MaxLength(512)
```

> **Note:**
> The same can be accomplished by pre-convention configuration, but using a convention allows to further filter applicable properties and for Data Annotations to override the configuration.

Finally, before we leave this example, what happens if we use both the `MaxStringLengthConvention` and `DiscriminatorLengthConvention3` at the same time? The answer is that it depends which order they are added, since model finalizing conventions run in the order they are added. So if `MaxStringLengthConvention` is added last, then it will run last, and it will set the max length of the discriminator property to 512. Therefore, in this case, it is better to add `DiscriminatorLengthConvention3` last so that it can override the default max length for just discriminator properties, while leaving all other string properties as 512.
