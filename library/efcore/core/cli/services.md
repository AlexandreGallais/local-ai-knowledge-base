---
title: "Design-time services - EF Core"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/cli/services.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Design-time services

Some services used by the tools are only used at design time. These services are managed separately from EF Core's runtime services to prevent them from being deployed with your app. To override one of these services (for example the service to generate migration files), add an implementation of `IDesignTimeServices` to your startup project.

```csharp
internal class MyDesignTimeServices : IDesignTimeServices
{
    public void ConfigureDesignTimeServices(IServiceCollection services)
        => services.AddSingleton<IMigrationsCodeGenerator, MyMigrationsCodeGenerator>();
}
```

## Referencing Microsoft.EntityFrameworkCore.Design

Microsoft.EntityFrameworkCore.Design is a DevelopmentDependency package. This means that the dependency won't flow transitively into other projects, and that you cannot, by default, reference its types.

In order to reference its types and override design-time services, update the PackageReference item's metadata in your project file.

```xml
<PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="9.0.0">
  <PrivateAssets>all</PrivateAssets>
  <!-- Remove IncludeAssets to allow compiling against the assembly -->
  <!--<IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>-->
</PackageReference>
```

If the package is being referenced transitively via Microsoft.EntityFrameworkCore.Tools, you will need to add an explicit PackageReference to the package and change its metadata.

## List of services

The following is a list of the design-time services.

Service                                                                              | Description
------------------------------------------------------------------------------------ | -----------
`Microsoft.EntityFrameworkCore.Design.IAnnotationCodeGenerator`                 | Generates the code for corresponding model annotations.
`Microsoft.EntityFrameworkCore.Design.ICSharpHelper`                            | Helps with generating C# code.
`Microsoft.EntityFrameworkCore.Design.IPluralizer`                              | Pluralizes and singularizes words.
`Microsoft.EntityFrameworkCore.Migrations.Design.ICSharpMigrationOperationGenerator`       | Generates C# code for migration operations.
`Microsoft.EntityFrameworkCore.Migrations.Design.ICSharpSnapshotGenerator`                 | Generates C# code for model snapshots.
`Microsoft.EntityFrameworkCore.Migrations.Design.IMigrationsCodeGenerator`      | Generates code for a migration.
`Microsoft.EntityFrameworkCore.Migrations.Design.IMigrationsCodeGeneratorSelector` | Selects the appropriate migrations code generator.
`Microsoft.EntityFrameworkCore.Migrations.Design.IMigrationsScaffolder`         | The main class for managing migration files.
`Microsoft.EntityFrameworkCore.Scaffolding.ICompiledModelCodeGenerator`         | Generates code for compiled model metadata.
`Microsoft.EntityFrameworkCore.Scaffolding.ICompiledModelCodeGeneratorSelector` | Selects the appropriate compiled model code generator.
`Microsoft.EntityFrameworkCore.Scaffolding.ICompiledModelScaffolder`            | The main class for scaffolding compiled models.
`Microsoft.EntityFrameworkCore.Scaffolding.IDatabaseModelFactory`               | Creates a database model from a database.
`Microsoft.EntityFrameworkCore.Scaffolding.IModelCodeGenerator`                 | Generates code for a model.
`Microsoft.EntityFrameworkCore.Scaffolding.IModelCodeGeneratorSelector`         | Selects the appropriate model code generator.
`Microsoft.EntityFrameworkCore.Scaffolding.IProviderConfigurationCodeGenerator` | Generates OnConfiguring code.
`Microsoft.EntityFrameworkCore.Scaffolding.IReverseEngineerScaffolder`          | The main class for scaffolding reverse engineered models.
`Microsoft.EntityFrameworkCore.Scaffolding.IScaffoldingModelFactory`            | Creates a model from a database model.
`Microsoft.EntityFrameworkCore.Query.IPrecompiledQueryCodeGenerator`            | Generates code for precompiled queries.
`Microsoft.EntityFrameworkCore.Query.IPrecompiledQueryCodeGeneratorSelector`    | Selects the appropriate precompiled query code generator.

## Using services

These services can also be useful for creating your own tools. For example, when you want to automate part of your design-time workflow.

You can build a service provider containing these services using the AddEntityFrameworkDesignTimeServices and AddDbContextDesignTimeServices extension methods.

```csharp
using var db = new MyDbContext();

// Create design-time services
var serviceCollection = new ServiceCollection();
serviceCollection.AddDbContextDesignTimeServices(db);

var provider = db.GetService<IDatabaseProvider>().Name;
var providerAssembly = Assembly.Load(new AssemblyName(provider));
var providerServicesAttribute = providerAssembly.GetCustomAttribute<DesignTimeProviderServicesAttribute>();
var designTimeServicesType = providerAssembly.GetType(providerServicesAttribute.TypeName, throwOnError: true);
((IDesignTimeServices)Activator.CreateInstance(designTimeServicesType)!).ConfigureDesignTimeServices(serviceCollection);

serviceCollection.AddEntityFrameworkDesignTimeServices();

var serviceProvider = serviceCollection.BuildServiceProvider();

// Add a migration
var migrationsScaffolder = serviceProvider.GetRequiredService<IMigrationsScaffolder>();
var migration = migrationsScaffolder.ScaffoldMigration(migrationName, rootNamespace);
migrationsScaffolder.Save(projectDir, migration, outputDir);
```
