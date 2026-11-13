---
title: "Azure Cosmos DB Provider - Planetary Docs sample - EF Core (part 2 of 4)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/providers/cosmos/planetary-docs-sample.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Azure Cosmos DB Provider - Planetary Docs sample - EF Core (part 2 of 4)

## Introducing Planetary Docs

You may (or may not) know that Microsoft's official documentation runs entirely on open source. It uses markdown with some metadata enhancements to build the interactive documentation that .NET developers use daily. The hypothetical scenario for Planetary Docs is to provide a web-based tool for authoring the docs. It allows setting up the title, description, the alias of the author, assigning tags, editing markdown and previewing the HTML output.

It's planetary because Azure Cosmos DB is "planetary scale". The app provides the ability to search documents. Documents are stored under aliases and tags for fast lookup, but full text search is available as well. The app automatically audits the documents (it takes snapshots of the document anytime it is edited and provides a view of the history).

> **Note:**
> Delete and restore aren't implemented.

Here's a look at the document for `Document`:

```csharp
﻿using System;
using System.Collections.Generic;

namespace PlanetaryDocs.Domain
{
    /// <summary>
    /// A document item.
    /// </summary>
    public class Document
    {
        /// <summary>
        /// Gets or sets the unique identifier.
        /// </summary>
        public string Uid { get; set; }

        /// <summary>
        /// Gets or sets the title.
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// Gets or sets the description.
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Gets or sets the published date.
        /// </summary>
        public DateTime PublishDate { get; set; }

        /// <summary>
        /// Gets or sets the markdown content.
        /// </summary>
        public string Markdown { get; set; }

        /// <summary>
        /// Gets or sets the generated html.
        /// </summary>
        public string Html { get; set; }

        /// <summary>
        /// Gets or sets the author's alias.
        /// </summary>
        public string AuthorAlias { get; set; }

        /// <summary>
        /// Gets or sets the list of related tags.
        /// </summary>
        public List<string> Tags { get; set; }
            = new List<string>();

        /// <summary>
        /// Gets or sets the concurrency token.
        /// </summary>
        public string ETag { get; set; }

        /// <summary>
        /// Gets the hash code.
        /// </summary>
        /// <returns>The hash code of the unique identifier.</returns>
        public override int GetHashCode() => Uid.GetHashCode();

        /// <summary>
        /// Implements equality.
        /// </summary>
        /// <param name="obj">The object to compare to.</param>
        /// <returns>A value indicating whether the unique identifiers match.</returns>
        public override bool Equals(object obj) =>
            obj is Document document && document.Uid == Uid;

        /// <summary>
        /// Gets the string representation.
        /// </summary>
        /// <returns>The string representation.</returns>
        public override string ToString() =>
            $"Document {Uid} by {AuthorAlias} with {Tags.Count} tags: {Title}.";
    }
}
```
For faster lookups, the `DocumentSummary` class contains some basic <example-value> about the document.

```csharp
﻿namespace PlanetaryDocs.Domain
{
    /// <summary>
    /// Represents a summary of a document.
    /// </summary>
    public class DocumentSummary
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="DocumentSummary"/> class.
        /// </summary>
        public DocumentSummary()
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="DocumentSummary"/> class
        /// and initializes it with the <see cref="Document"/>.
        /// </summary>
        /// <param name="doc">The <see cref="Document"/> to summarize.</param>
        public DocumentSummary(Document doc)
        {
            Uid = doc.Uid;
            Title = doc.Title;
            AuthorAlias = doc.AuthorAlias;
        }

        /// <summary>
        /// Gets or sets the unique id of the <see cref="Document"/>.
        /// </summary>
        public string Uid { get; set; }

        /// <summary>
        /// Gets or sets the title.
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// Gets or sets the alias of the author.
        /// </summary>
        public string AuthorAlias { get; set; }

        /// <summary>
        /// Gets the hash code.
        /// </summary>
        /// <returns>The hash code of the document identifier.</returns>
        public override int GetHashCode() => Uid.GetHashCode();

        /// <summary>
        /// Implements equality.
        /// </summary>
        /// <param name="obj">The object to compare to.</param>
        /// <returns>A value indicating whether the unique identifiers match.</returns>
        public override bool Equals(object obj) =>
            obj is DocumentSummary ds && ds.Uid == Uid;

        /// <summary>
        /// Gets the string representation.
        /// </summary>
        /// <returns>The string representation.</returns>
        public override string ToString() => $"Summary for {Uid} by {AuthorAlias}: {Title}.";
    }
}
```
This is used by both `Author` and `Tag`. They look pretty similar. Here's the `Tag` code:

```csharp
﻿using System.Collections.Generic;

namespace PlanetaryDocs.Domain
{
    /// <summary>
    /// A tag.
    /// </summary>
    public class Tag : IDocSummaries
    {
        /// <summary>
        /// Gets or sets the name of the tag.
        /// </summary>
        public string TagName { get; set; }

        /// <summary>
        /// Gets or sets a summary of documents with the tag.
        /// </summary>
        public List<DocumentSummary> Documents { get; set; }
            = new List<DocumentSummary>();

        /// <summary>
        /// Gets or sets the concurrency token.
        /// </summary>
        public string ETag { get; set; }

        /// <summary>
        /// Gets the hash code.
        /// </summary>
        /// <returns>The hash code of the tag name.</returns>
        public override int GetHashCode() => TagName.GetHashCode();

        /// <summary>
        /// Implements equality.
        /// </summary>
        /// <param name="obj">The object to compare to.</param>
        /// <returns>A value indicating whether the tag names match.</returns>
        public override bool Equals(object obj) =>
            obj is Tag tag && tag.TagName == TagName;

        /// <summary>
        /// Gets the string representation.
        /// </summary>
        /// <returns>The string representation.</returns>
        public override string ToString() =>
            $"Tag {TagName} tagged by {Documents.Count} documents.";
    }
}
```
The `ETag` property is implemented on the model so it can be sent around the app and maintain the value (as opposed to using a shadow property ). The `ETag` is used for concurrency in Azure Cosmos DB. Concurrency support is implemented in the sample app. To test it, try opening the same document in two tabs, then update one and save it, and finally update the other and save it.

People often struggle with disconnected entities in EF Core. The pattern is used in this app to provide an example. It's not necessary in Blazor Server, but makes it easier to scale the app. The alternative approach is to track the state of the entity with EF Core's change tracker. The change tracker would enable you to drop the `ETag` property and use a shadow property instead.

Finally, there is the `DocumentAudit` document.

```csharp
﻿using System;
using System.Text.Json;

namespace PlanetaryDocs.Domain
{
    /// <summary>
    /// Represents a snapshot of the document.
    /// </summary>
    public class DocumentAudit
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="DocumentAudit"/> class.
        /// </summary>
        public DocumentAudit()
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="DocumentAudit"/> class
        /// and configures it with the <see cref="Document"/> passed in.
        /// </summary>
        /// <param name="document">The document to audit.</param>
        public DocumentAudit(Document document)
        {
            Id = Guid.NewGuid();
            Uid = document.Uid;
            Document = JsonSerializer.Serialize(document);
            Timestamp = DateTimeOffset.UtcNow;
        }

        /// <summary>
        /// Gets or sets a unique identifier.
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Gets or sets the identifier of the document.
        /// </summary>
        public string Uid { get; set; }

        /// <summary>
        /// Gets or sets the timestamp of the audit.
        /// </summary>
        public DateTimeOffset Timestamp { get; set; }

        /// <summary>
        /// Gets or sets the JSON serialized snapshot.
        /// </summary>
        public string Document { get; set; }

        /// <summary>
        /// Deserializes the snapshot.
        /// </summary>
        /// <returns>The <see cref="Document"/> snapshot.</returns>
        public Document GetDocumentSnapshot() =>
            JsonSerializer.Deserialize<Document>(Document);
    }
}
```
Ideally, the `Document` snapshot would be a proper property instead of a string. This is one of the EF Core Azure Cosmos DB provider limitations EF Core currently has. There is not a way for `Document` to do double-duty as both a standalone entity and an "owned" entity. If you want the user to be able to search on properties in the historical document, you could either add those properties to the `DocumentAudit` class to be automatically indexed, or make a `DocumentSnapshot` class that shares the same properties but is configured as "owned" by the `DocumentAudit` parent.

### Azure Cosmos DB setup

The strategy for the data store is to use three containers.

One container named `Documents` is dedicated exclusively to documents. They are partitioned by `id`. That's one partition per document. Here's the rationale.

The audits are stored in a container named `Audits`. The partition key is the document id, so all histories are stored in the same partition. This allows for fast, single-partition queries over historical data.

Finally, there is some metadata that is stored in `Meta`. The partition key is the meta data type, either `Author` or `Tag`. The metadata contains summaries of the related documents. If the user wants to search for documents with tag `x` the app doesn't have to scan all documents. Instead, it reads the document for tag `x` that contains a collection of the related documents it is tagged in. This approach is fast for read but does require some additional work on writes and updates that will be covered later.
