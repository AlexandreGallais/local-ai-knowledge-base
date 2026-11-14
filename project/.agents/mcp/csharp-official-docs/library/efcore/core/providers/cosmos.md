---
title: "Azure Cosmos DB Provider - EF Core"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/providers/cosmos/index.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# EF Core Azure Cosmos DB Provider

> **Warning:**
> Extensive work has gone into the Azure Cosmos DB provider in 9.0. In order to improve the provider, a number of high-impact breaking changes had to be made; if you are upgrading an existing application, please read the breaking changes section carefully.

This database provider allows Entity Framework Core to be used with Azure Cosmos DB. The provider is maintained as part of the Entity Framework Core Project.

It is strongly recommended to familiarize yourself with the Azure Cosmos DB documentation before reading this section.

> **Note:**
> This provider only works with Azure Cosmos DB for NoSQL.

## Install

Install the Microsoft.EntityFrameworkCore.Cosmos NuGet package.

### .NET CLI

```dotnetcli
dotnet add package Microsoft.EntityFrameworkCore.Cosmos
```

### Visual Studio

```powershell
Install-Package Microsoft.EntityFrameworkCore.Cosmos
```

***

## Get started

> **Tip:**
> You can view this article's sample on GitHub.

As for other providers the first step is to call UseCosmos:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder.UseCosmos(
        "https://localhost:8081",
        "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==",
        databaseName: "OrdersDB");
```

> **Warning:**
> The endpoint and key are hardcoded here for simplicity, but in a production app these should be stored securely. See Connecting and authenticating for different ways to connect to Azure Cosmos DB.

In this example `Order` is a simple entity with a reference to the owned type `StreetAddress`.

```csharp
public class Order
{
    public int Id { get; set; }
    public int? TrackingNumber { get; set; }
    public string PartitionKey { get; set; }
    public StreetAddress ShippingAddress { get; set; }
}
```

```csharp
public class StreetAddress
{
    public string Street { get; set; }
    public string City { get; set; }
}
```

Saving and querying data follows the normal EF pattern:

```csharp
using (var context = new OrderContext())
{
    await context.Database.EnsureDeletedAsync();
    await context.Database.EnsureCreatedAsync();

    context.Add(
        new Order
        {
            Id = 1, ShippingAddress = new StreetAddress { City = "London", Street = "221 B Baker St" }, PartitionKey = "1"
        });

    await context.SaveChangesAsync();
}

using (var context = new OrderContext())
{
    var order = await context.Orders.FirstAsync();
    Console.WriteLine($"First order will ship to: {order.ShippingAddress.Street}, {order.ShippingAddress.City}");
    Console.WriteLine();
}
```

> **Important:**
> Calling EnsureCreatedAsync is necessary to create the required containers and insert the seed data if present in the model. However `EnsureCreatedAsync` should only be called during deployment, not normal operation, as it may cause performance issues.
>
> Azure Cosmos DB SDK does not support RBAC for management plane operations in Azure Cosmos DB. Use Azure Management API instead of EnsureCreatedAsync with RBAC.

## Connecting and authenticating

The Azure Cosmos DB provider for EF Core has multiple overloads of the UseCosmos method. These overloads support the different ways that a connection can be made to the database, and the different ways of ensuring that the connection is secure.

> **Important:**
> Make sure to understand _Secure access to data in Azure Cosmos DB_ to understand the security implications and best practices for using each overload of the `UseCosmos` method.
> Generally, RBAC with token <example-value> is the recommended access-control mechanism.

| Connection Mechanism       | UseCosmos Overload                                                     | More information                                                                          |
|----------------------------|------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| Account endpoint and key   | `UseCosmos<DbContext>(accountEndpoint, accountKey, databaseName)`      | Primary/secondary keys                |
| Account endpoint and token | `UseCosmos<DbContext>(accountEndpoint, tokenCredential, databaseName)` | RBAC and Resource tokens |
| Connection string          | `UseCosmos<DbContext>(connectionString, databaseName)`                 | Work with account keys and connection strings    |

## Azure Cosmos DB options

It is also possible to configure the Azure Cosmos DB provider with a single connection string and to specify other options to customize the connection:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder.UseCosmos(
        "AccountEndpoint=https://localhost:8081/;AccountKey=<example-value>",
        databaseName: "OptionsDB",
        options =>
        {
            options.ConnectionMode(ConnectionMode.Gateway);
            options.WebProxy(new WebProxy());
            options.LimitToEndpoint();
            options.Region(Regions.AustraliaCentral);
            options.GatewayModeMaxConnectionLimit(32);
            options.MaxRequestsPerTcpConnection(8);
            options.MaxTcpConnectionsPerEndpoint(16);
            options.IdleTcpConnectionTimeout(TimeSpan.FromMinutes(1));
            options.OpenTcpConnectionTimeout(TimeSpan.FromMinutes(1));
            options.RequestTimeout(TimeSpan.FromMinutes(1));
        });
```

The code above shows some possible options - these are not intended to be used at the same time. See the Azure Cosmos DB Options documentation for a detailed description of the effect of each option mentioned above.
