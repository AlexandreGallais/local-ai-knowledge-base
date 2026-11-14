---
title: "Microsoft SQL Server Database Provider - Hierarchical Data - EF Core (part 4 of 4)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/providers/sql-server/hierarchyid.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Microsoft SQL Server Database Provider - Hierarchical Data - EF Core (part 4 of 4)

Following the update, querying for the descendants of "Mungo" returns "Bungo", "Belba", "Linda", "Bingo", "Bilbo", "Falco", and "Poppy", while querying for the descendants of "Ponto" returns "Longo", "Rosa", "Polo", "Otho", "Posco", "Prisca", "Lotho", "Ponto", "Porto", "Peony", and "Angelica".

## Function mappings

.NET                                             | SQL
------------------------------------------------ | ---
hierarchyId.GetAncestor(n)                       | @hierarchyId.GetAncestor(@n)
hierarchyId.GetDescendant(child)                 | @hierarchyId.GetDescendant(@child, NULL)
hierarchyId.GetDescendant(child1, child2)        | @hierarchyId.GetDescendant(@child1, @child2)
hierarchyId.GetLevel()                           | @hierarchyId.GetLevel()
hierarchyId.GetReparentedValue(oldRoot, newRoot) | @hierarchyId.GetReparentedValue(@oldRoot, @newRoot)
HierarchyId.GetRoot()                            | hierarchyid::GetRoot()
hierarchyId.IsDescendantOf(parent)               | @hierarchyId.IsDescendantOf(@parent)
HierarchyId.Parse(input)                         | hierarchyid::Parse(@input)
hierarchyId.ToString()                           | @hierarchyId.ToString()

## Additional resources

- Hierarchical Data in SQL Server
