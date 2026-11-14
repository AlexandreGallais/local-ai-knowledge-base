---
title: "The Entity Framework 6 provider model - EF6 (part 1 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/fundamentals/providers/provider-model.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# The Entity Framework 6 provider model

The Entity Framework provider model allows Entity Framework to be used with different types of database server. For example, one provider can be plugged in to allow EF to be used against Microsoft SQL Server, while another provider can be plugged into to allow EF to be used against Microsoft SQL Server Compact Edition. The providers for EF6 that we are aware of can be found on the Entity Framework providers page.

Certain changes were required to the way EF interacts with providers to allow EF to be released under an open source license. These changes require rebuilding of EF providers against the EF6 assemblies together with new mechanisms for registration of the provider.

## Rebuilding

With EF6 the core code that was previously part of the .NET Framework is now being shipped as out-of-band (OOB) assemblies. Details on how to build applications against EF6 can be found on the Updating applications for EF6 page. Providers will also need to be rebuilt using these instructions.

## Provider types overview

An EF provider is really a collection of provider-specific services defined by CLR types that these services extend from (for a base class) or implement (for an interface). Two of these services are fundamental and necessary for EF to function at all. Others are optional and only need to be implemented if specific functionality is required and/or the default implementations of these services does not work for the specific database server being targeted.

## Fundamental provider types

### DbProviderFactory

EF depends on having a type derived from System.Data.Common.DbProviderFactory for performing all low-level database access. DbProviderFactory is not actually part of EF but is instead a class in the .NET Framework that serves an entry point for ADO.NET providers that can be used by EF, other O/RMs or directly by an application to obtain instances of connections, commands, parameters and other ADO.NET abstractions in a provider agnostic way. More information about DbProviderFactory can be found in the MSDN documentation for ADO.NET.

### DbProviderServices

EF depends on having a type derived from DbProviderServices for providing additional functionality needed by EF on top of the functionality already provided by the ADO.NET provider. In older versions of EF the DbProviderServices class was part of the .NET Framework and was found in the System.Data.Common namespace. Starting with EF6 this class is now part of EntityFramework.dll and is in the System.Data.Entity.Core.Common namespace.

More details about the fundamental functionality of a DbProviderServices implementation can be found on MSDN. However, note that as of the time of writing this information is not updated for EF6 although most of the concepts are still valid. The SQL Server and SQL Server Compact implementations of DbProviderServices are also checked into to the open-source codebase and can serve as useful references for other implementations.

In older versions of EF the DbProviderServices implementation to use was obtained directly from an ADO.NET provider. This was done by casting DbProviderFactory to IServiceProvider and calling the GetService method. This tightly coupled the EF provider to the DbProviderFactory. This coupling blocked EF from being moved out of the .NET Framework and therefore for EF6 this tight coupling has been removed and an implementation of DbProviderServices is now registered directly in the application’s configuration file or in code-based configuration as described in more detail the _Registering DbProviderServices_ section below.

## Additional services

In addition to the fundamental services described above there are also many other services used by EF which are either always or sometimes provider-specific. Default provider-specific implementations of these services can be supplied by a DbProviderServices implementation. Applications can also override the implementations of these services, or provide implementations when a DbProviderServices type does not provide a default. This is described in more detail in the _Resolving additional services_ section below.

The additional service types that a provider may be of interest to a provider are listed below. More details about each of these service types can be found in the API documentation.

### IDbExecutionStrategy

This is an optional service that allows a provider to implement retries or other behavior when queries and commands are executed against the database. If no implementation is provided, then EF will simply execute the commands and propagate any exceptions thrown. For SQL Server this service is used to provide a retry policy which is especially useful when running against cloud-based database servers such as SQL Azure.

### IDbConnectionFactory

This is an optional service that allows a provider to create DbConnection objects by convention when given only a database name. Note that while this service can be resolved by a DbProviderServices implementation it has been present since EF 4.1 and can also be explicitly set in either the config file or in code. The provider will only get a chance to resolve this service if it registered as the default provider (see _The default provider_ below) and if a default connection factory has not been set elsewhere.

### DbSpatialServices

This is an optional services that allows a provider to add support for geography and geometry spatial types. An implementation of this service must be supplied in order for an application to use EF with spatial types. DbSpatialServices is asked for in two ways. First, provider-specific spatial services are requested using a DbProviderInfo object (which contains invariant name and manifest token) as key. Second, DbSpatialServices can be asked for with no key. This is used to resolve the “global spatial provider” that is used when creating stand-alone DbGeography or DbGeometry types.

### MigrationSqlGenerator

This is an optional service that allows EF Migrations to be used for the generation of SQL used in creating and modifying database schemas by Code First. An implementation is required in order to support Migrations. If an implementation is provided then it will also be used when databases are created using database initializers or the Database.Create method.

### Func<DbConnection, string, HistoryContextFactory>

This is an optional service that allows a provider to configure the mapping of the HistoryContext to the `__MigrationHistory` table used by EF Migrations. The HistoryContext is a Code First DbContext and can be configured using the normal fluent API to change things like the name of the table and the column mapping specifications. The default implementation of this service returned by EF for all providers may work for a given database server if all the default table and column mappings are supported by that provider. In such a case the provider does not need to supply an implementation of this service.

### IDbProviderFactoryResolver

This is an optional service for obtaining the correct DbProviderFactory from a given DbConnection object. The default implementation of this service returned by EF for all providers is intended to work for all providers. However, when running on .NET 4, the DbProviderFactory is not publicly accessible from one if its DbConnections. Therefore, EF uses some heuristics to search the registered providers to find a match. It is possible that for some providers these heuristics will fail and in such situations the provider should supply a new implementation.

## Registering DbProviderServices

The DbProviderServices implementation to use can be registered either in the application’s configuration file (app.config or web.config) or using code-based configuration. In either case the registration uses the provider’s “invariant name” as a key. This allows multiple providers to be registered and used in a single application. The invariant name used for EF registrations is the same as the invariant name used for ADO.NET provider registration and connection strings. For example, for SQL Server the invariant name “System.Data.SqlClient” is used.

### Config file registration

The DbProviderServices type to use is registered as a provider element in the providers list of the entityFramework section of the application’s config file. For example:

```xml
<entityFramework>
  <providers>
    <provider invariantName="My.Invariant.Name" type="MyProvider.MyProviderServices, MyAssembly" />
  </providers>
</entityFramework>
```

The _type_ string must be the assembly-qualified type name of the DbProviderServices implementation to use.

### Code-based registration

Starting with EF6 providers can also be registered using code. This allows an EF provider to be used without any change to the application’s configuration file. To use code-based configuration an application should create a DbConfiguration class as described in the code-based configuration documentation. The constructor of the DbConfiguration class should then call SetProviderServices to register the EF provider. For example:

```csharp
public class MyConfiguration : DbConfiguration
{
    public MyConfiguration()
    {
        SetProviderServices("My.New.Provider", new MyProviderServices());
    }
}
```

## Resolving additional services

As mentioned above in the _Provider types overview_ section, a DbProviderServices class can also be used to resolve additional services. This is possible because DbProviderServices implements IDbDependencyResolver and each registered DbProviderServices type is added as a “default resolver”. The IDbDependencyResolver mechanism is described in more detail in Dependency Resolution. However, it is not necessary to understand all the concepts in this specification to resolve additional services in a provider.

The most common way for a provider to resolve additional services is to call DbProviderServices.AddDependencyResolver for each service in the constructor of the DbProviderServices class. For example, SqlProviderServices (the EF provider for SQL Server) has code similar to this for initialization:

```csharp
private SqlProviderServices()
{
    AddDependencyResolver(new SingletonDependencyResolver<IDbConnectionFactory>(
        new SqlConnectionFactory()));

    AddDependencyResolver(new ExecutionStrategyResolver<DefaultSqlExecutionStrategy>(
        "System.data.SqlClient", null, () => new DefaultSqlExecutionStrategy()));

    AddDependencyResolver(new SingletonDependencyResolver<Func<MigrationSqlGenerator>>(
        () => new SqlServerMigrationSqlGenerator(), "System.data.SqlClient"));

    AddDependencyResolver(new SingletonDependencyResolver<DbSpatialServices>(
        SqlSpatialServices.Instance,
        k =>
        {
            var asSpatialKey = k as DbProviderInfo;
            return asSpatialKey == null
                || asSpatialKey.ProviderInvariantName == ProviderInvariantName;
        }));
}
```

This constructor uses the following helper classes:

*   SingletonDependencyResolver: provides a simple way to resolve Singleton services—that is, services for which the same instance is returned each time that GetService is called. Transient services are often registered as a singleton factory that will be used to create transient instances on demand.
*   ExecutionStrategyResolver: a resolver specific to returning IExecutionStrategy implementations.

Instead of using DbProviderServices.AddDependencyResolver it is also possible to override DbProviderServices.GetService and resolve additional services directly. This method will be called when EF needs a service defined by a certain type and, in some cases, for a given key. The method should return the service if it can, or return null to opt-out of returning the service and instead allow another class to resolve it. For example, to resolve the default connection factory the code in GetService might look something like this:

```csharp
public override object GetService(Type type, object key)
{
    if (type == typeof(IDbConnectionFactory))
    {
        return new SqlConnectionFactory();
    }
    return null;
}
```

### Registration order

When multiple DbProviderServices implementations are registered in an application’s config file they will be added as secondary resolvers in the order that they are listed. Since resolvers are always added to the top of the secondary resolver chain this means that the provider at the end of the list will get a chance to resolve dependencies before the others. (This can seem a little counter-intuitive at first, but it makes sense if you imagine taking each provider out of the list and stacking it on top of the existing providers.)

This ordering usually doesn’t matter because most provider services are provider-specific and keyed by provider invariant name. However, for services that are not keyed by provider invariant name or some other provider-specific key the service will be resolved based on this ordering. For example, if it is not explicitly set differently somewhere else, then the default connection factory will come from the topmost provider in the chain.

## Additional config file registrations

It is possible to explicitly register some of the additional provider services described above directly in an application’s config file. When this is done the registration in the config file will be used instead of anything returned by the GetService method of the DbProviderServices implementation.

### Registering the default connection factory

Starting with EF5 the EntityFramework NuGet package automatically registered either the SQL Express connection factory or the LocalDb connection factory in the config file.

For example:

```xml
<entityFramework>
  <defaultConnectionFactory type="System.Data.Entity.Infrastructure.SqlConnectionFactory, EntityFramework" >
</entityFramework>
```

The _type_ is the assembly-qualified type name for the default connection factory, which must implement IDbConnectionFactory.

It is recommended that a provider NuGet package set the default connection factory in this way when installed. See _NuGet Packages for providers_ below.
