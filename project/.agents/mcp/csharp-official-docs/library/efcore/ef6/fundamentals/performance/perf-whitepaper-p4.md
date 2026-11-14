---
title: "Performance considerations for EF4, EF5, and EF6 - EF6 (part 4 of 12)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/fundamentals/performance/perf-whitepaper.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Performance considerations for EF4, EF5, and EF6 - EF6 (part 4 of 12)

### 2.3 Using Pre-Generated Views to decrease model load time

For detailed information on how to use pre-generated views on Entity Framework 6 visit Pre-Generated Mapping Views

#### 2.3.1 Pre-Generated views using the Entity Framework Power Tools Community Edition

You can use the Entity Framework 6 Power Tools Community Edition to generate views of EDMX and Code First models by right-clicking the model class file and using the Entity Framework menu to select “Generate Views”. The Entity Framework Power Tools Community Edition work only on DbContext-derived contexts.

#### 2.3.2 How to use Pre-generated views with a model created by EDMGen

EDMGen is a utility that ships with .NET and works with Entity Framework 4 and 5, but not with Entity Framework 6. EDMGen allows you to generate a model file, the object layer and the views from the command line. One of the outputs will be a Views file in your language of choice, VB or C\#. This is a code file containing Entity SQL snippets for each entity set. To enable pre-generated views, you simply include the file in your project.

If you manually make edits to the schema files for the model, you will need to re-generate the views file. You can do this by running EDMGen with the **/mode:ViewGeneration** flag.

#### 2.3.3 How to use Pre-Generated Views with an EDMX file

You can also use EDMGen to generate views for an EDMX file - the previously referenced MSDN topic describes how to add a pre-build event to do this - but this is complicated and there are some cases where it isn't possible. It's generally easier to use a T4 template to generate the views when your model is in an edmx file.

The ADO.NET team blog has a post that describes how to use a T4 template for view generation ( \<https://learn.microsoft.com/archive/blogs/adonet/how-to-use-a-t4-template-for-view-generation>). This post includes a template that can be downloaded and added to your project. The template was written for the first version of Entity Framework, so they aren’t guaranteed to work with the latest versions of Entity Framework. However, you can download a more up-to-date set of view generation templates for Entity Framework 4 and 5from the Visual Studio Gallery:

-   VB.NET: \<http://visualstudiogallery.msdn.microsoft.com/118b44f2-1b91-4de2-a584-7a680418941d>
-   C\#: \<http://visualstudiogallery.msdn.microsoft.com/ae7730ce-ddab-470f-8456-1b313cd2c44d>

If you’re using Entity Framework 6 you can get the view generation T4 templates from the Visual Studio Gallery at \<http://visualstudiogallery.msdn.microsoft.com/18a7db90-6705-4d19-9dd1-0a6c23d0751f>.

### 2.4 Reducing the cost of view generation

Using pre-generated views moves the cost of view generation from model loading (run time) to design time. While this improves startup performance at runtime, you will still experience the pain of view generation while you are developing. There are several additional tricks that can help reduce the cost of view generation, both at compile time and run time.

#### 2.4.1 Using Foreign Key <example-value> to reduce view generation cost

We have seen a number of cases where switching the associations in the model from Independent Associations to Foreign Key <example-value> dramatically improved the time spent in view generation.

To demonstrate this improvement, we generated two versions of the Navision model by using EDMGen. *Note: see appendix C for a description of the Navision model.* The Navision model is interesting for this exercise due to its very large amount of entities and relationships between them.

One version of this very large model was generated with Foreign Keys Associations and the other was generated with Independent Associations. We then timed how long it took to generate the views for each model. Entity Framework 5 test used the GenerateViews() method from class EntityViewGenerator to generate the views, while the Entity Framework 6 test used the GenerateViews() method from class StorageMappingItemCollection. This due to code restructuring that occurred in the Entity Framework 6 codebase.

Using Entity Framework 5, view generation for the model with Foreign Keys took 65 minutes in a lab machine. It's unknown how long it would have taken to generate the views for the model that used independent associations. We left the test running for over a month before the machine was rebooted in our lab to install monthly updates.

Using Entity Framework 6, view generation for the model with Foreign Keys took 28 seconds in the same lab machine. View generation for the model that uses Independent Associations took 58 seconds. The improvements done to Entity Framework 6 on its view generation code mean that many projects won’t need pre-generated views to obtain faster startup times.

It’s important to remark that pre-generating views in Entity Framework 4 and 5 can be done with EDMGen or the Entity Framework Power Tools. For Entity Framework 6 view generation can be done via the Entity Framework Power Tools or programmatically as described in Pre-Generated Mapping Views.

##### 2.4.1.1 How to use Foreign Keys instead of Independent Associations

When using EDMGen or the Entity Designer in Visual Studio, you get FKs by default, and it only takes a single checkbox or command line flag to switch between FKs and IAs.

If you have a large Code First model, using Independent Associations will have the same effect on view generation. You can avoid this impact by including Foreign Key <example-value> on the classes for your dependent objects, though some developers will consider this to be polluting their object model. You can find more information on this subject in \<http://blog.oneunicorn.com/2011/12/11/whats-the-deal-with-mapping-foreign-keys-using-the-entity-framework/>.

| When using      | Do this                                                                                                                                                                                                                                                                                                                              |
|:----------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Entity Designer | After adding an association between two entities, make sure you have a referential constraint. Referential constraints tell Entity Framework to use Foreign Keys instead of Independent Associations. For additional details visit \<https://learn.microsoft.com/archive/blogs/efdesign/foreign-keys-in-the-entity-framework>. |
| EDMGen          | When using EDMGen to generate your files from the database, your Foreign Keys will be respected and added to the model as such. For more information on the different options exposed by EDMGen visit http://msdn.microsoft.com/library/bb387165.aspx.                           |
| Code First      | See the "Relationship Convention" section of the Code First Conventions topic for information on how to include foreign key <example-value> on dependent objects when using Code First.                                                                                              |

#### 2.4.2 Moving your model to a separate assembly

When your model is included directly in your application's project and you generate views through a pre-build event or a T4 template, view generation and validation will take place whenever the project is rebuilt, even if the model wasn't changed. If you move the model to a separate assembly and reference it from your application's project, you can make other changes to your application without needing to rebuild the project containing the model.

*Note:*  when moving your model to separate assemblies remember to copy the connection strings for the model into the application configuration file of the client project.

#### 2.4.3 Disable validation of an edmx-based model

EDMX models are validated at compile time, even if the model is unchanged. If your model has already been validated, you can suppress validation at compile time by setting the "Validate on Build" property to false in the properties window. When you change your mapping or model, you can temporarily re-enable validation to verify your changes.

Note that performance improvements were made to the Entity Framework Designer for Entity Framework 6, and the cost of the “Validate on Build” is much lower than in previous versions of the designer.
