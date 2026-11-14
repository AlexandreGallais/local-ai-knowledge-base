---
title: "Breaking changes in EF Core 9 (EF9) - EF Core (part 3 of 4)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/what-is-new/ef-core-9.0/breaking-changes.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Breaking changes in EF Core 9 (EF9) - EF Core (part 3 of 4)

## Azure Cosmos DB breaking changes

Extensive work has gone into making the Azure Cosmos DB provider better in 9.0. The changes include a number of high-impact breaking changes; if you are upgrading an existing application, please read the following carefully.

| **Breaking change**                                                                                                                                  | **Impact** |
|:---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| The discriminator property is now named `$type` instead of `Discriminator`                                      | High       |
| The `id` property no longer contains the discriminator by default                                                     | High       |
| The JSON `id` property is mapped to the key                                                                                   | High       |
| Sync I/O via the Azure Cosmos DB provider is no longer supported                                                                   | Medium     |
| SQL queries must now project JSON values directly                                                                  | Medium     |
| Undefined results are now automatically filtered from query results                                                   | Medium     |
| Incorrectly translated queries are no longer translated                                                            | Medium     |
| `HasIndex` now throws instead of being ignored                                                                            | Low        |
| `IncludeRootDiscriminatorInJsonId` was renamed to `HasRootDiscriminatorInJsonId` after 9.0.0-rc.2 | Low        |
| The referenced Newtonsoft.Json version was updated from 10.0.2 to 13.0.1                                         | Low        |

### High-impact changes

#### The discriminator property is now named `$type` instead of `Discriminator`

Tracking Issue #34269

##### Old behavior

EF automatically adds a discriminator property to JSON documents to identify the entity type that the document represents. In previous versions of EF, this JSON property used to be named `Discriminator` by default.

##### New behavior

Starting with EF Core 9.0, the discriminator property is now called `$type` by default. If you have existing documents in Azure Cosmos DB from previous versions of EF, these use the old `Discriminator` naming, and after upgrading to EF 9.0, queries against those documents will fail.

##### Why

An emerging JSON practice uses a `$type` property in scenarios where a document's type needs to be identified. For example, .NET's System.Text.Json also supports polymorphism, using `$type` as its default discriminator property name (docs). To align with the rest of the ecosystem and make it easier to interoperate with external tools, the default was changed.

##### Mitigations

The easiest mitigation is to simply configure the name of the discriminator property to be `Discriminator`, just as before using `Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder.HasDiscriminator*`:

```csharp
modelBuilder.Entity<Session>().HasDiscriminator<string>("Discriminator");
```

Doing this for all your top-level entity types will make EF behave just like before.

Alternatively, if you wish to update all your documents to use the new `$type` naming so that you no longer need the configuration above, you can do so using the Azure Cosmos DB SDK. The following code renames the `Discriminator` property to `$type` in all documents in a container:

```csharp
using Microsoft.Azure.Cosmos;
using System.Text.Json.Nodes;

// Replace with your Cosmos DB connection string.
var cosmosClient = new CosmosClient(connectionString);
var container = cosmosClient.GetContainer("myDatabase", "myContainer");

using var feedIterator = container.GetItemQueryIterator<JsonObject>("SELECT * FROM c WHERE IS_DEFINED(c.Discriminator)");
while (feedIterator.HasMoreResults)
{
    foreach (var item in await feedIterator.ReadNextAsync())
    {
        if (item.ContainsKey("Discriminator"))
        {
            item["$type"] = item["Discriminator"]!.DeepClone();
            item.Remove("Discriminator");

            // The id and partition key are required for ReplaceItemAsync.
            // Adjust the partition key <example-value> to match your container's partition key path.
            var id = item["id"]!.GetValue<string>();
            var partitionKey = new PartitionKey(item["myPartitionKeyProperty"]!.GetValue<string>());
            await container.ReplaceItemAsync(item, id, partitionKey);
        }
    }
}
```

> **Note:**
> Replace `myPartitionKeyProperty` with the name of the property that is configured as the partition key in your container. If your container uses the document `id` as the partition key, use `id` for the partition key value as well.

#### The `id` property now contains only the EF key <example-value> by default

Tracking Issue #34179

##### Old behavior

Previously, EF inserted the discriminator value of your entity type into the `id` property of the document. For example, if you saved a `Blog` entity type with an `Id` property containing 8, the JSON `id` property would contain `Blog|8`.

##### New behavior

Starting with EF Core 9.0, the JSON `id` property no longer contains the discriminator value, and only contains the value of your key property. For the above example, the JSON `id` property would simply be `8`. If you have existing documents in Azure Cosmos DB from previous versions of EF, these have the discriminator value in the JSON `id` property, and after upgrading to EF 9.0, queries against those documents will fail.

##### Why

Since the JSON `id` property must be unique, the discriminator was previously added to it to allow different entities with the same key value to exist. For example, this allowed having both a `Blog` and a `Post` with an `Id` property containing the value 8 within the same container and partition. This aligned better with relational database data modeling patterns, where each entity type is mapped to its own table, and therefore has its own key-space.

EF 9.0 generally changed the mapping to be more aligned with common Azure Cosmos DB NoSQL practices and expectations, rather than to correspond to the expectations of users coming from relational databases. In addition, having the discriminator value in the `id` property made it more difficult for external tools and systems to interact with EF-generated JSON documents; such external systems aren't generally aware of the EF discriminator values, which are by default derived from .NET types.

##### Mitigations

The easiest mitigation is to simply configure EF to include the discriminator in the JSON `id` property, as before using `Microsoft.EntityFrameworkCore.CosmosEntityTypeBuilderExtensions.HasDiscriminatorInJsonId*`. A new configuration option has been introduced for this purpose:

```csharp
modelBuilder.Entity<Session>().HasDiscriminatorInJsonId();
```

Doing this for all your top-level entity types will make EF behave just like before.

Alternatively, if you wish to update all your existing documents to remove the discriminator value from the `id` property so that you no longer need the configuration above, you can do so using the Azure Cosmos DB SDK. Note that this is only possible if entities of different types don't share the same key value within the same container partition.

Azure Cosmos DB does not allow updating the `id` property of an existing document; instead, you must delete the old document and create a new one with the updated `id`. The following code performs this migration:

```csharp
using Microsoft.Azure.Cosmos;
using System.Text.Json.Nodes;

// Replace with your Cosmos DB connection string.
var cosmosClient = new CosmosClient(connectionString);
var container = cosmosClient.GetContainer("myDatabase", "myContainer");

// Replace with the name of the property configured as the partition key in your container.
// If the partition key path is /id, set this to "id".
const string partitionKeyProperty = "myPartitionKeyProperty";

using var feedIterator = container.GetItemQueryIterator<JsonObject>("SELECT * FROM c");
while (feedIterator.HasMoreResults)
{
    foreach (var item in await feedIterator.ReadNextAsync())
    {
        var oldId = item["id"]!.GetValue<string>();
        var separatorIndex = oldId.IndexOf('|');
        if (separatorIndex != -1)
        {
            var newId = oldId[(separatorIndex + 1)..];

            // Capture the partition key value before updating the id.
            // When partitionKeyProperty is "id", this captures the old id for the delete operation.
            var partitionKeyForDelete = new PartitionKey(item[partitionKeyProperty]!.GetValue<string>());

            // Update the id to the new value without the discriminator prefix.
            item["id"] = JsonValue.Create(newId);

            // When partitionKeyProperty is "id", read it again after the update to get the new id for the create operation.
            var partitionKeyForCreate = new PartitionKey(item[partitionKeyProperty]!.GetValue<string>());

            // Azure Cosmos DB does not allow changing the id - create a new document and delete the old one.
            await container.CreateItemAsync(item, partitionKeyForCreate);
            await container.DeleteItemAsync<JsonObject>(oldId, partitionKeyForDelete);
        }
    }
}
```

> **Note:**
> Set `partitionKeyProperty` to the name of the property configured as the partition key in your container. When the partition key path is `/id`, the sample correctly uses the old `id` value for the delete operation and the new `id` value for the create operation, since `partitionKeyProperty` is read both before and after updating `item["id"]`.
>
> If a crash occurs between the `CreateItemAsync` and `DeleteItemAsync` calls, you may end up with both documents. When re-running the migration, handle this by catching `409 Conflict` from `CreateItemAsync` and proceeding to the `DeleteItemAsync` call to remove the old document.

#### The JSON `id` property is mapped to the key

Tracking Issue #34179

##### Old behavior

Previously, EF created a shadow property mapped to the JSON `id` property, unless one of the properties was mapped to `id` explicitly.

##### New behavior

Starting with EF Core 9, the key <example-value> will be mapped to the JSON `id` property by convention if possible. This means that the key <example-value> will no longer be persisted in the document under a different name with the same value, so non-EF code consuming the documents and relying on this property being present would no longer function correctly.

##### Why

EF 9.0 generally changed the mapping to be more aligned with common Azure Cosmos DB NoSQL practices and expectations. And it is not common to store the key value twice in the document.

##### Mitigations

If you would like to preserve EF Core 8 behavior the easiest mitigation is to use `Microsoft.EntityFrameworkCore.CosmosEntityTypeBuilderExtensions.HasShadowId*`, a new configuration option that has been introduced for this purpose:

```csharp
modelBuilder.Entity<Session>().HasShadowId();
```

Doing this for all your top-level entity types will make EF behave just like before. Or you could apply it to all entity types in the model with one call using `Microsoft.EntityFrameworkCore.CosmosModelBuilderExtensions.HasShadowIds*`:

```csharp
modelBuilder.HasShadowIds();
```

Alternatively, if you wish to adopt the new EF 9.0 behavior and your existing documents contain the key <example-value> stored separately (e.g., as `"Id": 8` alongside `"id": "Blog|8"`), you can remove the redundant key <example-value> using the Azure Cosmos DB SDK. If you are also migrating the `id` property format (removing the discriminator prefix), you can combine both steps as shown in the `id` property migration above. The following example removes a redundant `"Id"` property if the `id` migration has already been performed:

```csharp
using Microsoft.Azure.Cosmos;
using System.Text.Json.Nodes;

// Replace with your Cosmos DB connection string.
var cosmosClient = new CosmosClient(connectionString);
var container = cosmosClient.GetContainer("myDatabase", "myContainer");

// Adjust "Id" to match your entity's key <example-value> name.
using var feedIterator = container.GetItemQueryIterator<JsonObject>("SELECT * FROM c WHERE IS_DEFINED(c.Id)");
while (feedIterator.HasMoreResults)
{
    foreach (var item in await feedIterator.ReadNextAsync())
    {
        item.Remove("Id");

        var id = item["id"]!.GetValue<string>();

        // Adjust the partition key <example-value> to match your container's partition key path.
        var partitionKey = new PartitionKey(item["myPartitionKeyProperty"]!.GetValue<string>());
        await container.ReplaceItemAsync(item, id, partitionKey);
    }
}
```

> **Note:**
> Replace `Id` with the name of your entity's key <example-value> and `myPartitionKeyProperty` with the name of the property configured as the partition key in your container.
