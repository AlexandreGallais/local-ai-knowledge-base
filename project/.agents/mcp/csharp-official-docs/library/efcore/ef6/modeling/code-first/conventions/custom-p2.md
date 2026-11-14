---
title: "Custom Code First Conventions - EF6 (part 2 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/modeling/code-first/conventions/custom.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Custom Code First Conventions - EF6 (part 2 of 2)

## Execution Order

Conventions operate in a last wins manner, the same as the Fluent API. What this means is that if you write two conventions that configure the same option of the same property, then the last one to execute wins. As an example, in the code below the max length of all strings is set to 500 but we then configure all properties called Name in the model to have a max length of 250.

```csharp
    modelBuilder.Properties<string>()
                .Configure(c => c.HasMaxLength(500));

    modelBuilder.Properties<string>()
                .Where(x => x.Name == "Name")
                .Configure(c => c.HasMaxLength(250));
```

Because the convention to set max length to 250 is after the one that sets all strings to 500, all the properties called Name in our model will have a MaxLength of 250 while any other strings, such as descriptions, would be 500. Using conventions in this way means that you can provide a general convention for types or properties in your model and then overide them for subsets that are different.

The Fluent API and Data Annotations can also be used to override a convention in specific cases. In our example above if we had used the Fluent API to set the max length of a property then we could have put it before or after the convention, because the more specific Fluent API will win over the more general Configuration Convention.

 

## Built-in Conventions

Because custom conventions could be affected by the default Code First conventions, it can be useful to add conventions to run before or after another convention. To do this you can use the AddBefore and AddAfter methods of the Conventions collection on your derived DbContext. The following code would add the convention class we created earlier so that it will run before the built in key <example-value> convention.

```csharp
    modelBuilder.Conventions.AddBefore<IdKeyDiscoveryConvention>(new DateTime2Convention());
```

This is going to be of the most use when adding conventions that need to run before or after the built in conventions, a list of the built in conventions can be found here: System.Data.Entity.ModelConfiguration.Conventions Namespace.

You can also remove conventions that you do not want applied to your model. To remove a convention, use the Remove method. Here is an example of removing the PluralizingTableNameConvention.

```csharp
    protected override void OnModelCreating(DbModelBuilder modelBuilder)
    {
        modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
    }
```
