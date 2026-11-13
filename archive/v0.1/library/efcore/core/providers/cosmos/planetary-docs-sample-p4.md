---
title: "Azure Cosmos DB Provider - Planetary Docs sample - EF Core (part 4 of 4)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/providers/cosmos/planetary-docs-sample.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Azure Cosmos DB Provider - Planetary Docs sample - EF Core (part 4 of 4)

### Create a document

Ordinarily, creating a document with EF Core would be as easy as:

```csharp
context.Add(document);
await context.SaveChangesAsync();
```

For `PlanetaryDocs` however, the document can have associated tags and an author. These have summaries that must be updated explicitly because there are no formal relationships.

> **Note:**
> This example uses code to keep documents in sync. If the database is used by multiple applications and services, it may make more sense to implement the logic at the database level and use triggers and stored procedures instead.

A generic method handles keeping the documents in sync. The pseudo code is the same whether it is for an author or a tag:

- If the document was inserted or updated
  - A new document will result in "author changed" and "tags added"
  - If the author was changed or a tag removed
    - Load the metadata document for the old author or removed tag
    - Remove the document from the summary list
  - If the author was changed
    - Load the metadata document for the new author
    - Add the document to the summary list
      - Load all tags for the model
      - Update the author in the summary list for each tag
  - If tags were added
    - If tag exists
      - Load the metadata document for the tag
      - Add the document to the summary list
    - Else
      - Create a new tag with the document in the summary list
  - If the document was updated and the title changed
    - Load the metadata for the existing author and/or tags
    - Update the title in the summary list

This algorithm is an example of how EF Core shines. All of these manipulations can happen in a single pass. If a tag is referenced multiple times, it is only ever loaded once. The final call to save changes will commit all changes including inserts.

Here's the code for handling changes to tags that is called as part of the insert process:

```csharp
private static async Task HandleTagsAsync(
    DocsContext context,
    Document document,
    bool authorChanged)
{
    var refDoc = await LoadDocNoTrackingAsync(context, document);

    // did the title change?
    var updatedTitle = refDoc != null && refDoc.Title != document.Title;

    // tags removed need summary taken away
    if (refDoc != null)
    {
        var removed = refDoc.Tags.Where(
            t => !document.Tags.Any(dt => dt == t));

        foreach (var removedTag in removed)
        {
            var tag = await context.FindMetaAsync<Tag>(removedTag);

            if (tag != null)
            {
                var docSummary =
                    tag.Documents.Find(
                        d => d.Uid == document.Uid);

                if (docSummary != null)
                {
                    tag.Documents.Remove(docSummary);
                    context.Entry(tag).State = EntityState.Modified;
                }
            }
        }
    }

    // figure out new tags
    var tagsAdded = refDoc == null ?
        document.Tags : document.Tags.Where(
            t => !refDoc.Tags.Any(rt => rt == t));

    // do existing tags need title updated?
    if (updatedTitle || authorChanged)
    {
        // added ones will be handled later
        var tagsToChange = document.Tags.Except(tagsAdded);

        foreach (var tagName in tagsToChange)
        {
            var tag = await context.FindMetaAsync<Tag>(tagName);
            var ds = tag.Documents.SingleOrDefault(ds => ds.Uid == document.Uid);
            if (ds != null)
            {
                ds.Title = document.Title;
                ds.AuthorAlias = document.AuthorAlias;
                context.Entry(tag).State = EntityState.Modified;
            }
        }
    }

    // brand new tags (for the document)
    foreach (var tagAdded in tagsAdded)
    {
        var tag = await context.FindMetaAsync<Tag>(tagAdded);

        // new tag (overall)
        if (tag == null)
        {
            tag = new Tag { TagName = tagAdded };
            context.SetPartitionKey(tag);
            context.Add(tag);
        }
        else
        {
            context.Entry(tag).State = EntityState.Modified;
        }

        // either way, add the document summary
        tag.Documents.Add(new DocumentSummary(document));
    }
}
```
The algorithm as implemented works for inserts, updates, and deletes.

#### Update a document

Now that the metadata sync has been implemented, the update code is simply:

```csharp
public async Task UpdateDocumentAsync(Document document)
{
    using var context = factory.CreateDbContext();

    await HandleMetaAsync(context, document);

    context.Update(document);

    await context.SaveChangesAsync();
}
```
Concurrency works in this scenario because we persist the loaded version of the entity in the `ETag` property.

#### Delete a document

The delete code uses a simplified algorithm to remove existing tag and author references.

```csharp
public async Task DeleteDocumentAsync(string uid)
{
    using var context = factory.CreateDbContext();
    var docToDelete = await LoadDocumentAsync(uid);
    var author = await context.FindMetaAsync<Author>(docToDelete.AuthorAlias);
    var summary = author.Documents.Find(d => d.Uid == uid);
    if (summary != null)
    {
        author.Documents.Remove(summary);
        context.Update(author);
    }

    foreach (var tag in docToDelete.Tags)
    {
        var tagEntity = await context.FindMetaAsync<Tag>(tag);
        var tagSummary = tagEntity.Documents.Find(d => d.Uid == uid);
        if (tagSummary != null)
        {
            tagEntity.Documents.Remove(tagSummary);
            context.Update(tagEntity);
        }
    }

    context.Remove(docToDelete);
    await context.SaveChangesAsync();
}
```
#### Search metadata (tags or authors)

Finding tags or authors that match a text string is a straightforward query. The key is to improve performance and reduce the cost of the query by making it a single partition query.

```csharp
public async Task<List<string>> SearchAuthorsAsync(string searchText)
{
    using var context = factory.CreateDbContext();
    var partitionKey = DocsContext.ComputePartitionKey<Author>();
    return (await context.Authors
        .WithPartitionKey(partitionKey)
        .Select(a => a.Alias)
        .ToListAsync())
        .Where(
            a => a.Contains(searchText, System.StringComparison.InvariantCultureIgnoreCase))
        .OrderBy(a => a)
        .ToList();
}
```
The `ComputePartitionKey` method returns the simple type name as the partition. The authors list is not long, so the code pulls the aliases first, then applies an in-memory filter for the _contains_ logic.

### Deal with document audits

The last set of APIs deal with the automatically generated audits. This method loads document audits then projects them onto a summary. The projection is not done in the query because it requires deserializing the snapshot. Instead, the list of audits is obtained, then snapshots are deserialized to pull out the relevant data to display such as title and author.

```csharp
public async Task<List<DocumentAuditSummary>> LoadDocumentHistoryAsync(string uid)
{
    using var context = factory.CreateDbContext();
    return (await context.Audits
        .WithPartitionKey(uid)
        .Where(da => da.Uid == uid)
        .ToListAsync())
        .Select(da => new DocumentAuditSummary(da))
        .OrderBy(das => das.Timestamp)
        .ToList();
}
```
The `ToListAsync` materializes the query results and everything after is manipulated in memory.

The app also lets you review an audit record using the same viewer control that live documents use. A method loads the audit, materializes the snapshot and returns a `Document` entity for the view to use.

```csharp
public async Task<Document> LoadDocumentSnapshotAsync(System.Guid guid, string uid)
{
    using var context = factory.CreateDbContext();
    try
    {
        var audit = await context.FindAsync<DocumentAudit>(guid, uid);
        return audit.GetDocumentSnapshot();
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
Finally, although you can delete a record, the audits remain. The web app doesn't implement this yet, but it is implemented in the data service. The steps are simply deserialize the requested version and insert it.

```csharp
public async Task<Document> RestoreDocumentAsync(Guid id, string uid)
{
    var snapshot = await LoadDocumentSnapshotAsync(id, uid);
    await InsertDocumentAsync(snapshot);
    return await LoadDocumentAsync(uid);
}
```
## Conclusion

The goal behind the sample is to provide some guidance for using the EF Core Azure Cosmos DB provider and to demonstrate the areas it shines. Please file an issue with feedback or suggestions. We accept pull requests, so if you want to implement missing functionality or see an area of improvement, let us know!
