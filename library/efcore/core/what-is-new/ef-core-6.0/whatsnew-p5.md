---
title: "What's New in EF Core 6.0 (part 5 of 11)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-6.0/whatsnew.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# What's New in EF Core 6.0 (part 5 of 11)

### Diagnostics

GitHub Issue: #17298.

The Azure Cosmos DB provider now logs more diagnostic information, including events for inserting, querying, updating, and deleting data from the database. The request units (RU) are included in these events whenever appropriate.

> **Note:**
> The logs show here use `EnableSensitiveDataLogging()` so that ID values are shown.

Inserting an item into the Azure Cosmos DB database generates the `CosmosEventId.ExecutedCreateItem` event. For example, this code:

```csharp
var triangle = new Triangle
{
    Name = "Impossible",
    PartitionKey = "TrianglesPartition",
    Angle1 = 90,
    Angle2 = 90,
    InsertedOn = DateTime.UtcNow
};
context.Add(triangle);
await context.SaveChangesAsync();
```

Logs the following diagnostic event:

```none
info: 8/30/2021 14:41:13.356 CosmosEventId.ExecutedCreateItem[30104] (Microsoft.EntityFrameworkCore.Database.Command)
      Executed CreateItem (5 ms, 7.43 RU) ActivityId='417db46f-fcdd-49d9-a7f0-77210cd06f84', Container='Shapes', Id='Impossible', Partition='TrianglesPartition'
```

Retrieving items from the Azure Cosmos DB database using a query generates the `CosmosEventId.ExecutingSqlQuery` event, and then one or more `CosmosEventId.ExecutedReadNext` events for the items read. For example, this code:

```csharp
var equilateral = await context.Triangles.SingleAsync(e => e.Name == "Equilateral");
```

Logs the following diagnostic events:

```none
info: 8/30/2021 14:41:13.475 CosmosEventId.ExecutingSqlQuery[30100] (Microsoft.EntityFrameworkCore.Database.Command)
      Executing SQL query for container 'Shapes' in partition '(null)' [Parameters=[]]
      SELECT c
      FROM root c
      WHERE ((c["Discriminator"] = "Triangle") AND (c["id"] = "Equilateral"))
      OFFSET 0 LIMIT 2
info: 8/30/2021 14:41:13.651 CosmosEventId.ExecutedReadNext[30102] (Microsoft.EntityFrameworkCore.Database.Command)
      Executed ReadNext (169.6126 ms, 2.93 RU) ActivityId='4e465fae-3d49-4c1f-bd04-142bc5d0b0a1', Container='Shapes', Partition='(null)', Parameters=[]
      SELECT c
      FROM root c
      WHERE ((c["Discriminator"] = "Triangle") AND (c["id"] = "Equilateral"))
      OFFSET 0 LIMIT 2
```

Retrieving a single item from the Azure Cosmos DB database using `Find` with a partition key generates the `CosmosEventId.ExecutingReadItem` and `CosmosEventId.ExecutedReadItem` events. For example, this code:

```csharp
var isosceles = await context.Triangles.FindAsync("Isosceles", "TrianglesPartition");
```

Logs the following diagnostic events:

```none
info: 8/30/2021 14:53:39.326 CosmosEventId.ExecutingReadItem[30101] (Microsoft.EntityFrameworkCore.Database.Command)
      Reading resource 'Isosceles' item from container 'Shapes' in partition 'TrianglesPartition'.
info: 8/30/2021 14:53:39.330 CosmosEventId.ExecutedReadItem[30103] (Microsoft.EntityFrameworkCore.Database.Command)
      Executed ReadItem (1 ms, 1 RU) ActivityId='3c278643-4e7f-4bb2-9953-6055b5f1288f', Container='Shapes', Id='Isosceles', Partition='TrianglesPartition'
```

Saving an updated item to the Azure Cosmos DB database generates the `CosmosEventId.ExecutedReplaceItem` event. For example, this code:

```csharp
triangle.Angle2 = 89;
await context.SaveChangesAsync();
```

Logs the following diagnostic event:

```none
info: 8/30/2021 14:53:39.343 CosmosEventId.ExecutedReplaceItem[30105] (Microsoft.EntityFrameworkCore.Database.Command)
      Executed ReplaceItem (6 ms, 10.67 RU) ActivityId='1525b958-fea1-49e8-89f9-d429d0351fdb', Container='Shapes', Id='Impossible', Partition='TrianglesPartition'
```

Deleting an item from the Azure Cosmos DB database generates the `CosmosEventId.ExecutedDeleteItem` event. For example, this code:

```csharp
context.Remove(triangle);
await context.SaveChangesAsync();
```

Logs the following diagnostic event:

```none
info: 8/30/2021 14:53:39.359 CosmosEventId.ExecutedDeleteItem[30106] (Microsoft.EntityFrameworkCore.Database.Command)
      Executed DeleteItem (6 ms, 7.43 RU) ActivityId='cbc54463-405b-48e7-8c32-2c6502a4138f', Container='Shapes', Id='Impossible', Partition='TrianglesPartition'
```

### Configure throughput

GitHub Issue: #17301.

The Azure Cosmos DB model can now be configured with manual or auto-scale throughput. These values provision throughput on the database. For example:

```csharp
modelBuilder.HasManualThroughput(2000);
modelBuilder.HasAutoscaleThroughput(4000);
```

In addition, individual entity types can be configured to provision throughput for the corresponding container. For example:

```csharp
modelBuilder.Entity<Family>(
    entityTypeBuilder =>
    {
        entityTypeBuilder.HasManualThroughput(5000);
        entityTypeBuilder.HasAutoscaleThroughput(3000);
    });
```

### Configure time-to-live

GitHub Issue: #17307.

Entity types in the Azure Cosmos DB model can now be configured with the default time-to-live and time-to-live for the analytical store. For example:

```csharp
modelBuilder.Entity<Family>(
    entityTypeBuilder =>
    {
        entityTypeBuilder.HasDefaultTimeToLive(100);
        entityTypeBuilder.HasAnalyticalStoreTimeToLive(200);
    });
```

### Resolve HTTP client factory

GitHub Issue: #21274. This feature was contributed by @dnperfors. Many thanks!

The `HttpClientFactory` used by the Azure Cosmos DB provider can now be set explicitly. This can be especially useful during testing, for example to bypass certificate validation when using the Azure Cosmos DB emulator on Linux:

```csharp
optionsBuilder
    .EnableSensitiveDataLogging()
    .UseCosmos(
        "https://localhost:8081",
        "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==",
        "PrimitiveCollections",
        cosmosOptionsBuilder =>
        {
            cosmosOptionsBuilder.HttpClientFactory(
                () => new HttpClient(
                    new HttpClientHandler
                    {
                        ServerCertificateCustomValidationCallback =
                            HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
                    }));
        });
```

> **Note:**
> See Taking the EF Core Azure Cosmos DB Provider for a Test Drive on the .NET Blog for a detailed example of applying the Azure Cosmos DB provider improvements to an existing application.

## Improvements to scaffolding from an existing database

EF Core 6.0 contains several improvements when reverse engineering an EF model from an existing database.

### Scaffolding many-to-many relationships

GitHub Issue: #22475.

EF Core 6.0 detects simple join tables and automatically generates a many-to-many mapping for them. For example, consider tables for `Posts` and `Tags`, and a join table `PostTag` connecting them:

```sql
CREATE TABLE [Tags] (
  [Id] int NOT NULL IDENTITY,
  [Name] nvarchar(max) NOT NULL,
  [Description] nvarchar(max) NULL,
  CONSTRAINT [PK_Tags] PRIMARY KEY ([Id]));

CREATE TABLE [Posts] (
    [Id] int NOT NULL IDENTITY,
    [Title] nvarchar(max) NOT NULL,
    [Contents] nvarchar(max) NOT NULL,
    [PostedOn] datetime2 NOT NULL,
    [UpdatedOn] datetime2 NULL,
    CONSTRAINT [PK_Posts] PRIMARY KEY ([Id]));

CREATE TABLE [PostTag] (
    [PostsId] int NOT NULL,
    [TagsId] int NOT NULL,
    CONSTRAINT [PK_PostTag] PRIMARY KEY ([PostsId], [TagsId]),
    CONSTRAINT [FK_PostTag_Posts_TagsId] FOREIGN KEY ([TagsId]) REFERENCES [Tags] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_PostTag_Tags_PostsId] FOREIGN KEY ([PostsId]) REFERENCES [Posts] ([Id]) ON DELETE CASCADE);
```

These tables can be scaffolded from the command line. For example:

```dotnetcli
dotnet ef dbcontext scaffold "Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=BloggingWithNRTs" Microsoft.EntityFrameworkCore.SqlServer
```

This results in a class for Post:

```csharp
public partial class Post
{
    public Post()
    {
        Tags = new HashSet<Tag>();
    }

    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Contents { get; set; } = null!;
    public DateTime PostedOn { get; set; }
    public DateTime? UpdatedOn { get; set; }
    public int BlogId { get; set; }

    public virtual Blog Blog { get; set; } = null!;

    public virtual ICollection<Tag> Tags { get; set; }
}
```

And a class for Tag:

```csharp
public partial class Tag
{
    public Tag()
    {
        Posts = new HashSet<Post>();
    }

    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string? Description { get; set; }

    public virtual ICollection<Post> Posts { get; set; }
}
```

But no class for the `PostTag` table. Instead, configuration for a many-to-many relationship is scaffolded:

```csharp
entity.HasMany(d => d.Tags)
    .WithMany(p => p.Posts)
    .UsingEntity<Dictionary<string, object>>(
        "PostTag",
        r => r.HasOne<Tag>().WithMany().HasForeignKey("TagsId"),
        l => l.HasOne<Post>().WithMany().HasForeignKey("PostsId"),
        j =>
            {
                j.HasKey("PostsId", "TagsId");
                j.ToTable("PostTag");
                j.HasIndex(new[] { "TagsId" }, "IX_PostTag_TagsId");
            });
```

### Scaffold C# nullable reference types

GitHub Issue: #15520.

EF Core 6.0 now scaffolds an EF model and entity types that use C# nullable reference types (NRTs). NRT usage is scaffolded automatically when NRT support is enabled in the C# project into which the code is being scaffolded.

For example, the following `Tags` table contains both nullable non-nullable string columns:

```sql
CREATE TABLE [Tags] (
  [Id] int NOT NULL IDENTITY,
  [Name] nvarchar(max) NOT NULL,
  [Description] nvarchar(max) NULL,
  CONSTRAINT [PK_Tags] PRIMARY KEY ([Id]));
```

This results in corresponding nullable and non-nullable string properties in the generated class:

```csharp
public partial class Tag
{
    public Tag()
    {
        Posts = new HashSet<Post>();
    }

    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string? Description { get; set; }

    public virtual ICollection<Post> Posts { get; set; }
}
```

Similarly, the following `Posts` tables contains a required relationship to the `Blogs` table:

```sql
CREATE TABLE [Posts] (
    [Id] int NOT NULL IDENTITY,
    [Title] nvarchar(max) NOT NULL,
    [Contents] nvarchar(max) NOT NULL,
    [PostedOn] datetime2 NOT NULL,
    [UpdatedOn] datetime2 NULL,
    [BlogId] int NOT NULL,
    CONSTRAINT [PK_Posts] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Posts_Blogs_BlogId] FOREIGN KEY ([BlogId]) REFERENCES [Blogs] ([Id]));
```

This results in the scaffolding of non-nullable (required) relationship between blogs:

```csharp
public partial class Blog
{
    public Blog()
    {
        Posts = new HashSet<Post>();
    }

    public int Id { get; set; }
    public string Name { get; set; } = null!;

    public virtual ICollection<Post> Posts { get; set; }
}
```

And posts:

```csharp
public partial class Post
{
    public Post()
    {
        Tags = new HashSet<Tag>();
    }

    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Contents { get; set; } = null!;
    public DateTime PostedOn { get; set; }
    public DateTime? UpdatedOn { get; set; }
    public int BlogId { get; set; }

    public virtual Blog Blog { get; set; } = null!;

    public virtual ICollection<Tag> Tags { get; set; }
}
```

Finally, DbSet properties in the generated DbContext are created in a NRT-friendly way. For example:

```csharp
public virtual DbSet<Blog> Blogs { get; set; } = null!;
public virtual DbSet<Post> Posts { get; set; } = null!;
public virtual DbSet<Tag> Tags { get; set; } = null!;
```

### Database comments are scaffolded to code comments

GitHub Issue: #19113. This feature was contributed by @ErikEJ. Many thanks!

Comments on SQL tables and columns are now scaffolded into the entity types created when reverse-engineering an EF Core model from an existing SQL Server database.

```csharp
/// <summary>
/// The Blog table.
/// </summary>
public partial class Blog
{
    /// <summary>
    /// The primary key.
    /// </summary>
    [Key]
    public int Id { get; set; }
}
```
