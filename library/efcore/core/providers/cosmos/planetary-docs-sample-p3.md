---
title: "Azure Cosmos DB Provider - Planetary Docs sample - EF Core (part 3 of 4)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/providers/cosmos/planetary-docs-sample.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Azure Cosmos DB Provider - Planetary Docs sample - EF Core (part 3 of 4)

### Entity Framework Core

The `DbContext` for Planetary Docs is named `DocsContext` in the `PlanetaryDocs.DataAccess` project. It has a constructor that takes a `DbContextOptions<DocsContext>` parameter and passes it to the base class to enable run-time configuration.

```csharp
public DocsContext(DbContextOptions<DocsContext> options)
    : base(options) =>
        SavingChanges += DocsContext_SavingChanges;
```
The `DbSet<>` generic type is used to specify the classes that should be persisted.

```csharp
/// <summary>
/// Gets or sets the audits collection.
/// </summary>
public DbSet<DocumentAudit> Audits { get; set; }

/// <summary>
/// Gets or sets the documents collection.
/// </summary>
public DbSet<Document> Documents { get; set; }

/// <summary>
/// Gets or sets the tags collection.
/// </summary>
public DbSet<Tag> Tags { get; set; }

/// <summary>
/// Gets or sets the authors collection.
/// </summary>
public DbSet<Author> Authors { get; set; }
```
A few helper methods on the `DbContext` class make it easier to search for and assign metadata. Both metadata items use a string-based key and specify the type as the partition key. This enables a generic strategy to find records:

```csharp
public async ValueTask<T> FindMetaAsync<T>(string key)
    where T : class, IDocSummaries
{
    var partitionKey = ComputePartitionKey<T>();
    try
    {
        return await FindAsync<T>(key, partitionKey);
    }
    catch (CosmosException ce)
    {
        if (ce.StatusCode == HttpStatusCode.NotFound)
        {
            return null;
        }

        throw;
    }
}
```
`FindAsync` (the existing method on the base `DbContext` that is shipped as part of EF Core) doesn't require closing the type to specify the key. It takes it as an `object` parameter and applies it based on the internal representation of the model.

The entities are configured in the `OnModelCreating` overload. Here's the first configuration for `DocumentAudit`.

```csharp
modelBuilder.Entity<DocumentAudit>()
    .HasNoDiscriminator()
    .ToContainer(nameof(Audits))
    .HasPartitionKey(da => da.Uid)
    .HasKey(da => new { da.Id, da.Uid });
```
This configuration informs EF Core that...

- There will only be one type stored in the table, so there is no need for a discriminator to distinguish types.
- The documents should be stored in a container named `Audits`.
- The partition key is the document id.
- The access key is the unique identifier of the audit combined with the partition key (the unique identifier of the document).

Next, the `Document` is configured:

```csharp
var docModel = modelBuilder.Entity<Document>();

docModel.ToContainer(nameof(Documents))
    .HasNoDiscriminator()
    .HasKey(d => d.Uid);

docModel.HasPartitionKey(d => d.Uid)
    .Property(p => p.ETag)
    .IsETagConcurrency();
```
Here we specify a few more details, such as how the `ETag` property should be mapped:

```csharp
var tagModel = modelBuilder.Entity<Tag>();

tagModel.Property<string>(PartitionKey);

tagModel.HasPartitionKey(PartitionKey);

tagModel.ToContainer(Meta)
    .HasKey(nameof(Tag.TagName), PartitionKey);

tagModel.Property(t => t.ETag)
    .IsETagConcurrency();
```
The partition key is configured as a shadow property. Unlike the `ETag` property, the partition key is fixed and therefore doesn't have to live on the model. Read this to learn more about models in EF Core: Creating and configuring a model.

The `SaveChanges` event is used that to automatically insert a document snapshot any time a document is inserted or updated. Every time changes are saved and the event is fired, the `ChangeTracker` is queried to find an `Document` entities that were added or updated. An audit entry is inserted for each one.

```csharp
private void DocsContext_SavingChanges(
    object sender,
    SavingChangesEventArgs e)
{
    var entries = ChangeTracker.Entries<Document>()
        .Where(
            e => e.State == EntityState.Added ||
            e.State == EntityState.Modified)
        .Select(e => e.Entity)
        .ToList();

    foreach (var docEntry in entries)
    {
        Audits.Add(new DocumentAudit(docEntry));
    }
}
```
Doing it this way will ensure audits are generated even if you build other apps that share the same `DbContext`.

### The Data Service

A common question is whether developers should use the repository pattern with EF Core, and the answer is, "It depends." To the extent that the `DbContext` is testable and can be interfaced for mocking, there are many cases when using it directly is perfectly fine. Whether or not you specifically use the repository pattern, adding a data access layer often makes sense when there are database-related tasks to do outside of the EF Core functionality. In this example, there is database-related logic that makes more sense to isolate rather than bloating the `DbContext`, so it is implemented in `DocumentService`.

The service constructor is passed a `DbContext` factory. This is provided by EF Core to easily create new contexts using your preferred configuration. The app uses a "context per operation" rather than using long-lived contexts and change tracking. Here's the configuration to grab the settings and tell the factory to make contexts that connect to Azure Cosmos DB. The factory is then automatically injected into the service.

```csharp
services.Configure<CosmosSettings>(
    Configuration.GetSection(nameof(CosmosSettings)));
services.AddDbContextFactory<DocsContext>(
   (IServiceProvider sp, DbContextOptionsBuilder opts) =>
   {
       var cosmosSettings = sp
           .GetRequiredService<IOptions<CosmosSettings>>()
           .Value;

       opts.UseCosmos(
           cosmosSettings.EndPoint,
           cosmosSettings.AccessKey,
           nameof(DocsContext));
   });

services.AddScoped<IDocumentService, DocumentService>();
```
Using this pattern demonstrates disconnected entities and also builds some resiliency against the case when your Blazor SignalR circuit may break.

#### Load a document

The document load is intended to get a snapshot that isn't tracked for changes because those will be sent in a separate operation. The main requirement is to set the partition key.

```csharp
private static async Task<Document> LoadDocNoTrackingAsync(
DocsContext context, Document document) =>
    await context.Documents
        .WithPartitionKey(document.Uid)
        .AsNoTracking()
        .SingleOrDefaultAsync(d => d.Uid == document.Uid);
```
#### Query documents

The document query allows the user to search on text anywhere in the document and to further filter by author and/or tag. The pseudo code looks like this:

- If there is a tag, load the tag and use the document summary list as the result set
  - If there is also an author, load the author and filter the results to the intersection of results between tag and author
    - If there is text, load the documents that match the text then filter the results to the author and tag intersection
  - If there is also text, load the documents that match the text then filter the results to the tag results
- Else if there is an author, load the author and filter the results to the document summary list as the result set
  - If there is text, load the documents that match the text then filter the results to the author results
- Else load the documents that match the text

Performance-wise, a tag and/or author-based search only requires one or two documents to be loaded. A text search always loads matching documents and then further filters the list based on the existing documents, so it is significantly slower (but still fast).

Here's the implementation. Note the `HashSet` works due to the `Equals` and `GetHashCode` overrides:

```csharp
public async Task<List<DocumentSummary>> QueryDocumentsAsync(
    string searchText,
    string authorAlias,
    string tag)
{
    using var context = factory.CreateDbContext();

    var result = new HashSet<DocumentSummary>();

    var partialResults = false;

    if (!string.IsNullOrWhiteSpace(authorAlias))
    {
        partialResults = true;
        var author = await context.FindMetaAsync<Author>(authorAlias);
        foreach (var ds in author.Documents)
        {
            result.Add(ds);
        }
    }

    if (!string.IsNullOrWhiteSpace(tag))
    {
        var tagEntity = await context.FindMetaAsync<Tag>(tag);

        var resultSet =
            Enumerable.Empty<DocumentSummary>();

        // alias _AND_ tag
        if (partialResults)
        {
            resultSet = result.Intersect(tagEntity.Documents);
        }
        else
        {
            resultSet = tagEntity.Documents;
        }

        result.Clear();

        foreach (var docSummary in resultSet)
        {
            result.Add(docSummary);
        }

        partialResults = true;
    }

    // nothing more to do?
    if (string.IsNullOrWhiteSpace(searchText))
    {
        return result.OrderBy(r => r.Title).ToList();
    }

    // no list to filter further
    if (partialResults && result.Count < 1)
    {
        return result.ToList();
    }

    // find documents that match
    var documents = await context.Documents.Where(
        d => d.Title.Contains(searchText) ||
        d.Description.Contains(searchText) ||
        d.Markdown.Contains(searchText))
        .ToListAsync();

    // now only intersect with alias/tag constraints
    if (partialResults)
    {
        var uids = result.Select(ds => ds.Uid).ToList();
        documents = documents.Where(d => uids.Contains(d.Uid))
            .ToList();
    }

    return documents.Select(d => new DocumentSummary(d))
         .OrderBy(ds => ds.Title).ToList();
}
```
