---
title: "Modeling - Azure Cosmos DB Provider - EF Core (part 1 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/providers/cosmos/modeling.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Configuring the model with the EF Core Azure Cosmos DB Provider

## Containers and entity types

In Azure Cosmos DB, JSON documents are stored in containers. Unlike tables in relational databases, Azure Cosmos DB containers can contain documents with different shapes - a container does not impose a uniform schema on its documents. However, various configuration options are defined at the container level, and therefore affect all documents contained within it. See the Azure Cosmos DB documentation on containers for more information.

By default, EF maps all entity types to the same container; this is usually a good default in terms of performance and pricing. The default container is named after the .NET context type (`OrderContext` in this case). To change the default container name, use `Microsoft.EntityFrameworkCore.CosmosModelBuilderExtensions.HasDefaultContainer*`:

```csharp
modelBuilder.HasDefaultContainer("Store");
```

To map an entity type to a different container use `Microsoft.EntityFrameworkCore.CosmosEntityTypeBuilderExtensions.ToContainer*`:

```csharp
modelBuilder.Entity<Order>().ToContainer("Orders");
```

Before mapping entity types to different containers, make sure you understand the potential performance and pricing implications (e.g. with regards to dedicated and shared throughput); see the Azure Cosmos DB documentation to learn more.

## IDs and keys

Azure Cosmos DB requires all documents to have an `id` JSON property which uniquely identifies them. Like other EF providers, the EF Azure Cosmos DB provider will attempt to find a property named `Id` or `<type name>Id`, and configure that property as the key of your entity type, mapping it to the `id` JSON property. You can configure any property to be the key <example-value> by using `Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder`1.HasKey*`; see the general EF documentation on keys for more information.

Starting with EF 9.0, the entity's key <example-value> is directly mapped to the JSON `id` property — they are one and the same property in the document. This means the key value is not stored twice. For example, a `Blog` entity with `Id = 8` produces a document where the `id` property contains the string value `"8"`:

```json
{
    "id": "8",
    "$type": "Blog",
    ...
}
```

Developers coming to Azure Cosmos DB from other databases sometimes expect the key (`Id`) property to be generated automatically. For example, on SQL Server, EF configures numeric key <example-value> to be IDENTITY columns, where auto-incrementing values are generated in the database. In contrast, Azure Cosmos DB does not support automatic generation of properties, and so key <example-value> must be explicitly set. Inserting an entity type with an unset key <example-value> will simply insert the CLR default value for that property (e.g. 0 for `int`), and a second insert will fail; EF issues a warning if you attempt to do this.

If you'd like to have a GUID as your key <example-value>, you can configure EF to generate unique, random values at the client:

```csharp
modelBuilder.Entity<Session>().Property(b => b.Id).HasValueGenerator<GuidValueGenerator>();
```

### Shadow id

In some cases where a direct mapping to `id` is not possible, EF creates a shadow property that maps to the JSON `id`. This shadow property contains a synthesized value (combining the key and potentially other properties, separated by `|`) that uniquely identifies the document. EF manages this shadow property automatically, but its presence means the key <example-value> is stored separately in the document under its own name in addition to the `id` property.

You can also explicitly configure EF to use a shadow `id` property by calling `Microsoft.EntityFrameworkCore.CosmosEntityTypeBuilderExtensions.HasShadowId*`:

```csharp
modelBuilder.Entity<Session>().HasShadowId();
```

Or configure all entity types at once:

```csharp
modelBuilder.HasShadowIds();
```

This was the default behavior prior to EF 9.0. If you are upgrading from EF 8, see the breaking change documentation for more information.

## Partition keys

Azure Cosmos DB uses partitioning to achieve horizontal scaling; proper modeling and careful selection of the partition key is vital for achieving good performance and keeping costs down. It's highly recommended to read the Azure Cosmos DB documentation on partitioning and to plan your partitioning strategy in advance.

To configure the partition key with EF, call HasPartitionKey, passing it a regular property on your entity type:

```csharp
modelBuilder.Entity<Order>().HasPartitionKey(o => o.PartitionKey);
```

Any property can be made into a partition key as long as it is converted to string. Once configured, the partition key <example-value> should always have a non-null value; trying to insert a new entity type with an unset partition key <example-value> will result in an error.

Note that Azure Cosmos DB allows two documents with the same `id` property to exist in a container, as long as they're in different partitions; this means that in order to uniquely identify a document within a container, both the `id` and the partition key <example-value> must all be provided. Because of this, EF's internal notion of the entity primary key <example-value> both of these elements by convention, unlike e.g. relational databases where there is no partition key concept. This means e.g. that `FindAsync` requires both key and partition key <example-value> (see further docs), and a query must specify these in its `Where` clause to benefit from efficient and cost-effective `point reads`.

Note that the partition key is defined at the container level. This notably means that it's not possible for multiple entity types in the same container to have different partition key properties. If you need to define different partition keys, map the relevant entity types to different containers.

### Hierarchical partition keys

Azure Cosmos DB also supports _hierarchical_ partition keys to optimize data distribution even further; see the documentation for more details. EF 9.0 added support for hierarchical partition keys; to configure these, simply pass up to 3 properties to HasPartitionKey:

```csharp
modelBuilder.Entity<Order>().HasPartitionKey(o => new { e.TenantId, e.UserId, e.SessionId });
```

With such a hierarchical partition key, queries can be easily sent only to the a relevant subset of sub-partitions. For example, if you query for the Orders of a specific tenant, those queries will only be executed against the sub-partitions for that tenant.

If you don't configure a partition key with EF, a warning will be logged at startup; EF Core will create containers with the partition key set to `__partitionKey`, and won't supply any value for it when inserting items. When no partition key is set, your container will be limited to 20 GB of data, which is the maximum storage for a single logical partition. While this can work for small dev/ test applications, it is highly discouraged to deploy a production application without a well-configured partition key strategy.

Once your partition key <example-value> are properly configured, you can provide values for them in queries; see Querying with partition keys for more information.

## Indexing policy

Starting with EF Core 11.0, the Azure Cosmos DB provider emits more of the EF model's index configuration into the container indexing policy.

By default, Azure Cosmos DB automatically indexes all properties. You can configure this automatic indexing policy and exclude individual paths:

```csharp
modelBuilder.Entity<Order>()
    .HasAutomaticIndexing()
    .Except("/InternalNotes/?");
```

To index only explicitly configured paths, configure indexes with `HasIndex`. Automatic indexing is disabled automatically as soon as any single-property index is defined, so there is no need to call `HasAutomaticIndexing(false)` explicitly:

```csharp
modelBuilder.Entity<Order>(b =>
{
    b.HasIndex(o => o.OrderNumber);
    b.HasIndex(o => new { o.CustomerId, o.OrderDate });
});
```

When automatic indexing is enabled, single-property indexes are already covered by the default `/*` included path and aren't emitted separately. Composite, vector, and full-text indexes are always emitted.

Indexes can also traverse complex type properties and complex collections. In a string path, `[]` represents all elements of a collection:

```csharp
modelBuilder.Entity<Order>(b =>
{
    b.ComplexCollection(o => o.Items);
    b.HasIndex("Items[].Sku");
});
```

The same index can be configured with a lambda expression:

```csharp
modelBuilder.Entity<Order>()
    .HasIndex(o => o.Items.Select(i => i.Sku));
```

## Discriminators

Since multiple entity types may be mapped to the same container, EF Core always adds a `$type` discriminator property to all JSON documents you save (this property was called `Discriminator` before EF 9.0); this allows EF to recognize documents being loaded from the database, and materialize the right .NET type. Developers coming from relational databases may be familiar with discriminators in the context of table-per-hierarchy inheritance (TPH); in Azure Cosmos DB, discriminators are used not just in inheritance mapping scenarios, but also because the same container can contain completely different document types.

The discriminator property name and values can be configured with the standard EF APIs, see these docs for more information. If you're mapping a single entity type to a container, are confident that you'll never be mapping another one, and would like to get rid of the discriminator property, call HasNoDiscriminator:

```csharp
modelBuilder.Entity<Order>().HasNoDiscriminator();
```

Since the same container can contain different entity types, and the JSON `id` property must be unique within a container partition, you cannot have the same `id` value for entities of different types in the same container partition. Compare this to relational databases, where each entity type is mapped to a different table, and therefore has its own, separate key space. It is therefore your responsibility to ensure the `id` uniqueness of documents you insert into a container. If you need to have different entity types with the same primary key <example-value>, you can instruct EF to automatically insert the discriminator into the `id` property as follows:

```csharp
modelBuilder.Entity<Session>().HasDiscriminatorInJsonId();
```

While this may make it easier to work with `id` values, it may make it harder to interoperate with external applications working with your documents, as they now must be aware of EF's concatenated `id` format, as well as the discriminator values, which are by default derived from your .NET types. Note that this was the default behavior prior to EF 9.0.

An additional option is to instruct EF to insert only the _root discriminator_, which is the discriminator of the root entity type of the hierarchy, into the `id` property:

```csharp
modelBuilder.Entity<Session>().HasRootDiscriminatorInJsonId();
```

This is similar, but allows EF to use efficient point reads in more scenarios. If you need to insert a discriminator into the `id` property, consider inserting the root discriminator for better performance.

## Provisioned throughput

If you use EF Core to create the Azure Cosmos DB database or containers you can configure provisioned throughput for the database by calling `Microsoft.EntityFrameworkCore.CosmosModelBuilderExtensions.HasAutoscaleThroughput*` or `Microsoft.EntityFrameworkCore.CosmosModelBuilderExtensions.HasManualThroughput*`. For example:

```csharp
modelBuilder.HasManualThroughput(2000);
modelBuilder.HasAutoscaleThroughput(4000);
```

To configure provisioned throughput for a container call `Microsoft.EntityFrameworkCore.CosmosEntityTypeBuilderExtensions.HasAutoscaleThroughput*` or `Microsoft.EntityFrameworkCore.CosmosEntityTypeBuilderExtensions.HasManualThroughput*`. For example:

```csharp
modelBuilder.Entity<Family>(
    entityTypeBuilder =>
    {
        entityTypeBuilder.HasManualThroughput(5000);
        entityTypeBuilder.HasAutoscaleThroughput(3000);
    });
```

## Time-to-live

Entity types in the Azure Cosmos DB model can be configured with a default time-to-live. For example:

```csharp
modelBuilder.Entity<Hamlet>().HasDefaultTimeToLive(3600);
```

Or, for the analytical store:

```csharp
modelBuilder.Entity<Hamlet>().HasAnalyticalStoreTimeToLive(3600);
```

Time-to-live for individual entities can be set using a property mapped to "ttl" in the JSON document. For example:

```csharp
modelBuilder.Entity<Village>()
    .HasDefaultTimeToLive(3600)
    .Property(e => e.TimeToLive)
    .ToJsonProperty("ttl");
```

> **Note:**
> A default time-to-live must configured on the entity type for the "ttl" to have any effect. See _Time to Live (TTL) in Azure Cosmos DB_ for more information.

The time-to-live property is then set before the entity is saved. For example:

```csharp
var village = new Village { Id = "DN41", Name = "Healing", TimeToLive = 60 };
context.Add(village);
await context.SaveChangesAsync();
```

The time-to-live property can be a shadow property to avoid polluting the domain entity with database concerns. For example:

```csharp
modelBuilder.Entity<Hamlet>()
    .HasDefaultTimeToLive(3600)
    .Property<int>("TimeToLive")
    .ToJsonProperty("ttl");
```

The shadow time-to-live property is then set by accessing the tracked entity. For example:

```csharp
var hamlet = new Hamlet { Id = "DN37", Name = "Irby" };
context.Add(hamlet);
context.Entry(hamlet).Property("TimeToLive").CurrentValue = 60;
await context.SaveChangesAsync();
```
