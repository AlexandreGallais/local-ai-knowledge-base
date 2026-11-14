---
title: "The Entity Framework 6 provider model - EF6 (part 2 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/fundamentals/providers/provider-model.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# The Entity Framework 6 provider model - EF6 (part 2 of 2)

## Additional EF6 provider changes

### Spatial provider changes

Providers that support spatial types must now implement some additional methods on classes deriving from DbSpatialDataReader:

*   `public abstract bool IsGeographyColumn(int ordinal)`
*   `public abstract bool IsGeometryColumn(int ordinal)`

There are also new asynchronous versions of existing methods that are recommended to be overridden as the default implementations delegate to the synchronous methods and therefore do not execute asynchronously:

*   `public virtual Task<DbGeography> GetGeographyAsync(int ordinal, CancellationToken <example-value>)`
*   `public virtual Task<DbGeometry> GetGeometryAsync(int ordinal, CancellationToken <example-value>)`

### Native support for Enumerable.Contains

EF6 introduces a new expression type, DbInExpression, which was added to address performance issues around use of Enumerable.Contains in LINQ queries. The DbProviderManifest class has a new virtual method, SupportsInExpression, which is called by EF to determine if a provider handles the new expression type. For compatibility with existing provider implementations the method returns false. To benefit from this improvement, an EF6 provider can add code to handle DbInExpression and override SupportsInExpression to return true. An instance of DbInExpression can be created by calling the DbExpressionBuilder.In method. A DbInExpression instance is composed of a DbExpression, usually representing a table column, and a list of DbConstantExpression to test for a match.

## NuGet packages for providers

One way to make an EF6 provider available is to release it as a NuGet package. Using a NuGet package has the following advantages:

*   It is easy to use NuGet to add the provider registration to the application’s config file
*   Additional changes can be made to the config file to set the default connection factory so that connections made by convention will use the registered provider
*   NuGet handles adding binding redirects so that the EF6 provider should continue to work even after a new EF package is released

An example of this is the EntityFramework.SqlServerCompact package which is included in the open source codebase. This package provides a good template for creating EF provider NuGet packages.

### PowerShell commands

When the EntityFramework NuGet package is installed it registers a PowerShell module that contains two commands that are very useful for provider packages:

*   Add-EFProvider adds a new entity for the provider in the target project’s configuration file and makes sure it is at the end of the list of registered providers.
*   Add-EFDefaultConnectionFactory either adds or updates the defaultConnectionFactory registration in the target project’s configuration file.

Both these commands take care of adding an entityFramework section to the config file and adding a providers collection if necessary.

It is intended that these commands be called from the install.ps1 NuGet script. For example, install.ps1 for the SQL Compact provider looks similar to this:

```powershell
param($installPath, $toolsPath, $package, $project)
Add-EFDefaultConnectionFactory $project 'System.Data.Entity.Infrastructure.SqlCeConnectionFactory, EntityFramework' -ConstructorArguments 'System.Data.SqlServerCe.4.0'
Add-EFProvider $project 'System.Data.SqlServerCe.4.0' 'System.Data.Entity.SqlServerCompact.SqlCeProviderServices, EntityFramework.SqlServerCompact'</pre>
```

More information about these commands can be obtained by using get-help in the Package Manager Console window.

## Wrapping providers

A wrapping provider is an EF and/or ADO.NET provider that wraps an existing provider to extend it with other functionality such as profiling or tracing capabilities. Wrapping providers can be registered in the normal way, but it is often more convenient to setup the wrapping provider at runtime by intercepting the resolution of provider-related services. The static event OnLockingConfiguration on the DbConfiguration class can be used to do this.

OnLockingConfiguration is called after EF has determined where all EF configuration for the app domain will be obtained from but before it is locked for use. At app startup (before EF is used) the app should register an event handler for this event. (We are considering adding support for registering this handler in the config file but this is not yet supported.) The event handler should then make a call to ReplaceService for every service that needs to be wrapped.

For example, to wrap IDbConnectionFactory and DbProviderService, a handler something like this should be registered:

```csharp
DbConfiguration.OnLockingConfiguration +=
    (_, a) =>
    {
        a.ReplaceService<DbProviderServices>(
            (s, k) => new MyWrappedProviderServices(s));

        a.ReplaceService<IDbConnectionFactory>(
            (s, k) => new MyWrappedConnectionFactory(s));
    };
```

The service that has been resolved and should now be wrapped together with the key that was used to resolve the service are passed to the handler. The handler can then wrap this service and replace the returned service with the wrapped version.

## Resolving a DbProviderFactory with EF

DbProviderFactory is one of the fundamental provider types needed by EF as described in the _Provider types overview_ section above. As already mentioned, It is not an EF type and registration is usually not part of EF configuration, but is instead the normal ADO.NET provider registration in the machine.config file and/or application’s config file.

Despite this EF still uses its normal dependency resolution mechanism when looking for a DbProviderFactory to use. The default resolver uses the normal ADO.NET registration in the config files and so this is usually transparent. But because of the normal dependency resolution mechanism is used it means that an IDbDependencyResolver can be used to resolve a DbProviderFactory even when normal ADO.NET registration has not been done.

Resolving DbProviderFactory in this way has several implications:

*   An application using code-based configuration can add calls in their DbConfiguration class to register the appropriate DbProviderFactory. This is especially useful for applications that do not want to (or cannot) make use of any file-based configuration at all.
*   The service can be wrapped or replaced using ReplaceService as described in the _Wrapping providers_ section above
*   Theoretically, a DbProviderServices implementation could resolve a DbProviderFactory.

The important point to note about doing any of these things is that they will only affect the lookup of DbProviderFactory by EF. Other non-EF code may still expect the ADO.NET provider to be registered in the normal way and may fail if the registration is not found. For this reason it is normally better for a DbProviderFactory to be registered in the normal ADO.NET way.

### Related services

If EF is used to resolve a DbProviderFactory, then it should also resolve the IProviderInvariantName and IDbProviderFactoryResolver services.

IProviderInvariantName is a service that is used to determine a provider invariant name for a given type of DbProviderFactory. The default implementation of this service uses the ADO.NET provider registration. This means that if the ADO.NET provider is not registered in the normal way because DbProviderFactory is being resolved by EF, then it will also be necessary to resolve this service. Note that a resolver for this service is automatically added when using the DbConfiguration.SetProviderFactory method.

As described in the _Provider types overview_ section above, the IDbProviderFactoryResolver is used to obtain the correct DbProviderFactory from a given DbConnection object. The default implementation of this service when running on .NET 4 uses the ADO.NET provider registration. This means that if the ADO.NET provider is not registered in the normal way because DbProviderFactory is being resolved by EF, then it will also be necessary to resolve this service.
