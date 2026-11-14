---
title: "What's New in EF Core 9 (part 7 of 7)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/what-is-new/ef-core-9.0/whatsnew.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# What's New in EF Core 9 (part 7 of 7)

## Model building

### Auto-compiled models

> **Tip:**
> The code shown here comes from the NewInEFCore9.CompiledModels sample.

Compiled models can improve startup time for applications with large models--that is entity type counts in the 100s or 1000s. In previous versions of EF Core, a compiled model had to be generated manually, using the command line. For example:

```dotnetcli
dotnet ef dbcontext optimize
```

After running the command, a line like, `.UseModel(MyCompiledModels.BlogsContextModel.Instance)` must be added to `OnConfiguring` to tell EF Core to use the compiled model.

Starting with EF9, this `.UseModel` line is no longer needed when the application's `DbContext` type is in the same project/assembly as the compiled model. Instead, the compiled model will be detected and used automatically. This can be seen by having EF log whenever it is building the model. Running a simple application then shows EF building the model when the application starts:

```output
Starting application...
>> EF is building the model...
Model loaded with 2 entity types.
```

The output from running `dotnet ef dbcontext optimize` on the model project is:

```output
PS D:\code\EntityFramework.Docs\samples\core\Miscellaneous\NewInEFCore9.CompiledModels\Model> dotnet ef dbcontext optimize

Build succeeded in 0.3s

Build succeeded in 0.3s
Build started...
Build succeeded.
>> EF is building the model...
>> EF is building the model...
Successfully generated a compiled model, it will be discovered automatically, but you can also call 'options.UseModel(BlogsContextModel.Instance)'. Run this command again when the model is modified.
PS D:\code\EntityFramework.Docs\samples\core\Miscellaneous\NewInEFCore9.CompiledModels\Model> 
```

Notice that the log output indicates that the _model was built when running the command_. If we now run the application again, after rebuilding but without making any code changes, then the output is:

```output
Starting application...
Model loaded with 2 entity types.
```

Notice that the model was not built when starting the application because the compiled model was detected and used automatically.

### MSBuild integration

With the above approach, the compiled model still needs to be regenerated manually when the entity types or `DbContext` configuration is changed. However, EF9 ships with an MSBuild task package that can automatically update the compiled model when the model project is built! To get started, install the Microsoft.EntityFrameworkCore.Tasks NuGet package. For example:

```dotnetcli
dotnet add package Microsoft.EntityFrameworkCore.Tasks --version 9.0.0
```

> **Tip:**
> Use the package version in the command above that matches the version of EF Core that you are using.

Then enable the integration by setting the `EFOptimizeContext` and `EFScaffoldModelStage` properties in your `.csproj` file. For example:

```xml
<PropertyGroup>
    <EFOptimizeContext>true</EFOptimizeContext>
    <EFScaffoldModelStage>build</EFScaffoldModelStage>
</PropertyGroup>
```

Now, if we build the project, we can see logging at build time indicating that the compiled model is being built:

```output
Optimizing DbContext...
dotnet exec --depsfile D:\code\EntityFramework.Docs\samples\core\Miscellaneous\NewInEFCore9.CompiledModels\App\bin\Release\net8.0\App.deps.json
  --additionalprobingpath G:\packages 
  --additionalprobingpath "C:\Program Files (x86)\Microsoft Visual Studio\Shared\NuGetPackages" 
  --runtimeconfig D:\code\EntityFramework.Docs\samples\core\Miscellaneous\NewInEFCore9.CompiledModels\App\bin\Release\net8.0\App.runtimeconfig.json G:\packages\microsoft.entityframeworkcore.tasks\9.0.0-preview.4.24205.3\tasks\net8.0\..\..\tools\netcoreapp2.0\ef.dll dbcontext optimize --output-dir D:\code\EntityFramework.Docs\samples\core\Miscellaneous\NewInEFCore9.CompiledModels\Model\obj\Release\net8.0\ 
  --namespace NewInEfCore9 
  --suffix .g 
  --assembly D:\code\EntityFramework.Docs\samples\core\Miscellaneous\NewInEFCore9.CompiledModels\Model\bin\Release\net8.0\Model.dll
  --project-dir D:\code\EntityFramework.Docs\samples\core\Miscellaneous\NewInEFCore9.CompiledModels\Model 
  --root-namespace NewInEfCore9 
  --language C# 
  --nullable 
  --working-dir D:\code\EntityFramework.Docs\samples\core\Miscellaneous\NewInEFCore9.CompiledModels\App 
  --verbose 
  --no-color 
  --prefix-output 
```

And running the application shows that the compiled model has been detected and hence the model is not built again:

```output
Starting application...
Model loaded with 2 entity types.
```

Now, whenever the model changes, the compiled model will be automatically rebuilt as soon as the project is built.

For more information see MSBuild integration.

### Read-only primitive collections

> **Tip:**
> The code shown here comes from PrimitiveCollectionsSample.cs.

EF8 introduced support for mapping arrays and mutable lists of primitive types. This has been expanded in EF9 to include read-only collections/lists. Specifically, EF9 supports collections typed as `IReadOnlyList`, `IReadOnlyCollection`, or `ReadOnlyCollection`. For example, in the following code, `DaysVisited` will be mapped by convention as a primitive collection of dates:

```csharp
public class DogWalk
{
    public int Id { get; set; }
    public string Name { get; set; }
    public ReadOnlyCollection<DateOnly> DaysVisited { get; set; }
}
```

The read-only collection can be backed by a normal, mutable collection if desired. For example, in the following code, `DaysVisited` can be mapped as a primitive collection of dates, while still allowing code in the class to manipulate the underlying list.

```csharp
    public class Pub
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IReadOnlyCollection<string> Beers { get; set; }

        private List<DateOnly> _daysVisited = new();
        public IReadOnlyList<DateOnly> DaysVisited => _daysVisited;
    }
```

These collections can then be used in queries in the normal way. For example, this LINQ query:

```csharp
var walksWithADrink = await context.Walks.Select(
    w => new
    {
        WalkName = w.Name,
        PubName = w.ClosestPub.Name,
        Count = w.DaysVisited.Count(v => w.ClosestPub.DaysVisited.Contains(v)),
        TotalCount = w.DaysVisited.Count
    }).ToListAsync();
```

Which translates to the following SQL on SQLite:

```sql
SELECT "w"."Name" AS "WalkName", "p"."Name" AS "PubName", (
    SELECT COUNT(*)
    FROM json_each("w"."DaysVisited") AS "d"
    WHERE "d"."value" IN (
        SELECT "d0"."value"
        FROM json_each("p"."DaysVisited") AS "d0"
    )) AS "Count", json_array_length("w"."DaysVisited") AS "TotalCount"
FROM "Walks" AS "w"
INNER JOIN "Pubs" AS "p" ON "w"."ClosestPubId" = "p"."Id"
```

### Specify fill-factor for keys and indexes

> **Tip:**
> The code shown here comes from ModelBuildingSample.cs.

EF9 supports specification of the SQL Server fill-factor when using EF Core Migrations to create keys and indexes. From the SQL Server docs, "When an index is created or rebuilt, the fill-factor value determines the percentage of space on each leaf-level page to be filled with data, reserving the remainder on each page as free space for future growth."

The fill-factor can be set on a single or composite primary and alternate keys and indexes using `Microsoft.EntityFrameworkCore.SqlServerIndexBuilderExtensions.HasFillFactor*`. For example:

```csharp
modelBuilder.Entity<User>()
    .HasKey(e => e.Id)
    .HasFillFactor(80);

modelBuilder.Entity<User>()
    .HasAlternateKey(e => new { e.Region, e.Ssn })
    .HasFillFactor(80);

modelBuilder.Entity<User>()
    .HasIndex(e => new { e.Name })
    .HasFillFactor(80);

modelBuilder.Entity<User>()
    .HasIndex(e => new { e.Region, e.Tag })
    .HasFillFactor(80);
```

When applied to existing tables, this will alter the tables to the fill-factor to the constraint:

```sql
ALTER TABLE [User] DROP CONSTRAINT [AK_User_Region_Ssn];
ALTER TABLE [User] DROP CONSTRAINT [PK_User];
DROP INDEX [IX_User_Name] ON [User];
DROP INDEX [IX_User_Region_Tag] ON [User];

ALTER TABLE [User] ADD CONSTRAINT [AK_User_Region_Ssn] UNIQUE ([Region], [Ssn]) WITH (FILLFACTOR = 80);
ALTER TABLE [User] ADD CONSTRAINT [PK_User] PRIMARY KEY ([Id]) WITH (FILLFACTOR = 80);
CREATE INDEX [IX_User_Name] ON [User] ([Name]) WITH (FILLFACTOR = 80);
CREATE INDEX [IX_User_Region_Tag] ON [User] ([Region], [Tag]) WITH (FILLFACTOR = 80);
```

This enhancement was contributed by @deano-hunter. Many thanks!

### Make existing model building conventions more extensible

> **Tip:**
> The code shown here comes from CustomConventionsSample.cs.

Public model building conventions for applications were introduced in EF7. In EF9, we have made it easier to extend some of the existing conventions. For example, the code to map properties by attribute in EF7 is this:

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

In EF9, this can be simplified down to the following:

```csharp
public class AttributeBasedPropertyDiscoveryConvention(ProviderConventionSetBuilderDependencies dependencies)
    : PropertyDiscoveryConvention(dependencies)
{
    protected override bool IsCandidatePrimitiveProperty(
        MemberInfo memberInfo, IConventionTypeBase structuralType, out CoreTypeMapping? mapping)
    {
        if (base.IsCandidatePrimitiveProperty(memberInfo, structuralType, out mapping))
        {
            if (Attribute.IsDefined(memberInfo, typeof(PersistAttribute), inherit: true))
            {
                return true;
            }

            structuralType.Builder.Ignore(memberInfo.Name);
        }

        mapping = null;
        return false;
    }
}
```

### Update ApplyConfigurationsFromAssembly to call non-public constructors

In previous versions of EF Core, the `Microsoft.EntityFrameworkCore.ModelBuilder.ApplyConfigurationsFromAssembly*` method only instantiated configuration types with a public, parameterless constructors. In EF9, we have both improved the error messages generated when this fails, and also enabled instantiation by non-public constructor. This is useful when co-locating configuration in a private nested class which should never be instantiated by application code. For example:

```csharp
public class Country
{
    public int Code { get; set; }
    public required string Name { get; set; }

    private class FooConfiguration : IEntityTypeConfiguration<Country>
    {
        private FooConfiguration()
        {
        }

        public void Configure(EntityTypeBuilder<Country> builder)
        {
            builder.HasKey(e => e.Code);
        }
    }
}
```

As an aside, some people think this pattern is an abomination because it couples the entity type to the configuration. Other people think it is very useful because it co-locates configuration with the entity type. Let's not debate this here. :-)

## SQL Server HierarchyId

> **Tip:**
> The code shown here comes from HierarchyIdSample.cs.

### Sugar for HierarchyId path generation

First class support for the SQL Server `HierarchyId` type was added in EF8. In EF9, a sugar method has been added to make it easier to create new child nodes in the tree structure. For example, the following code queries for an existing entity with a `HierarchyId` property:

```csharp
var daisy = await context.Halflings.SingleAsync(e => e.Name == "Daisy");
```

This `HierarchyId` property can then be used to create child nodes without any explicit string manipulation. For example:

```csharp
var child1 = new Halfling(HierarchyId.Parse(daisy.PathFromPatriarch, 1), "Toast");
var child2 = new Halfling(HierarchyId.Parse(daisy.PathFromPatriarch, 2), "Wills");
```

If `daisy` has a `HierarchyId` of `/4/1/3/1/`, then, `child1` will get the `HierarchyId` "/4/1/3/1/1/", and `child2` will get the `HierarchyId` "/4/1/3/1/2/".

To create a node between these two children, an additional sub-level can be used. For example:

```csharp
var child1b = new Halfling(HierarchyId.Parse(daisy.PathFromPatriarch, 1, 5), "Toast");
```

This creates a node with a `HierarchyId` of `/4/1/3/1/1.5/`, putting it between `child1` and `child2`.

This enhancement was contributed by @Rezakazemi890. Many thanks!

## Tooling

### Fewer rebuilds

The `dotnet ef` command line tool by default builds your project before executing the tool. This is because not rebuilding before running the tool is a common source of confusion when things don't work. Experienced developers can use the `--no-build` option to avoid this build, which may be slow. However, even the `--no-build` option could cause the project to be re-built the next time it is built outside of the EF tooling.

We believe a community contribution from @Suchiman has fixed this. However, we're also conscious that tweaks around MSBuild behaviors have a tendency to have unintended consequences, so we're asking people like you to try this out and report back on any negative experiences you have.
