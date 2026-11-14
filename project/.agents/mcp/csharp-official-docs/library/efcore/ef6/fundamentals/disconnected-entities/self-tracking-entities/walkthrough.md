---
title: "Self-Tracking Entities Walkthrough - EF6 (part 1 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/fundamentals/disconnected-entities/self-tracking-entities/walkthrough.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Self-Tracking Entities Walkthrough
> **Important:**
> We no longer recommend using the self-tracking-entities template. It will only continue to be available to support existing applications. If your application requires working with disconnected graphs of entities, consider other alternatives such as Trackable Entities, which is a technology similar to Self-Tracking-Entities that is more actively developed by the community, or writing custom code using the low-level change tracking APIs.

This walkthrough demonstrates the scenario in which a Windows Communication Foundation (WCF) service exposes an operation that returns an entity graph. Next, a client application manipulates that graph and submits the modifications to a service operation that validates and saves the updates to a database using Entity Framework.

Before completing this walkthrough make sure you read the Self-Tracking Entities page.

This walkthrough completes the following actions:

-   Creates a database to access.
-   Creates a class library that contains the model.
-   Swaps to the Self-Tracking Entity Generator template.
-   Moves the entity classes to a separate project.
-   Creates a WCF service that exposes operations to query and save entities.
-   Creates client applications (Console and WPF) that consume the service.

We'll use Database First in this walkthrough but the same techniques apply equally to Model First.

## Pre-Requisites

To complete this walkthrough you will need a recent version of Visual Studio.

## Create a Database

The database server that is installed with Visual Studio is different depending on the version of Visual Studio you have installed:

-   If you are using Visual Studio 2012 then you'll be creating a LocalDB database.
-   If you are using Visual Studio 2010 you'll be creating a SQL Express database.

Let's go ahead and generate the database.

-   Open Visual Studio
-   **View -> Server Explorer**
-   Right click on **Data Connections -> Add Connection…**
-   If you haven’t connected to a database from Server Explorer before you’ll need to select **Microsoft SQL Server** as the data source
-   Connect to either LocalDB or SQL Express, depending on which one you have installed
-   Enter **STESample** as the database name
-   Select **OK** and you will be asked if you want to create a new database, select **Yes**
-   The new database will now appear in Server Explorer
-   If you are using Visual Studio 2012
    -   Right-click on the database in Server Explorer and select **New Query**
    -   Copy the following SQL into the new query, then right-click on the query and select **Execute**
-   If you are using Visual Studio 2010
    -   Select **Data -> Transact SQL Editor -> New Query Connection...**
    -   Enter **.\\SQLEXPRESS** as the server name and click **OK**
    -   Select the **STESample** database from the drop down at the top of the query editor
    -   Copy the following SQL into the new query, then right-click on the query and select **Execute SQL**

```sql
    CREATE TABLE [dbo].[Blogs] (
        [BlogId] INT IDENTITY (1, 1) NOT NULL,
        [Name] NVARCHAR (200) NULL,
        [Url]  NVARCHAR (200) NULL,
        CONSTRAINT [PK_dbo.Blogs] PRIMARY KEY <example-value> ([BlogId] ASC)
    );

    CREATE TABLE [dbo].[Posts] (
        [PostId] INT IDENTITY (1, 1) NOT NULL,
        [Title] NVARCHAR (200) NULL,
        [Content] NTEXT NULL,
        [BlogId] INT NOT NULL,
        CONSTRAINT [PK_dbo.Posts] PRIMARY KEY <example-value> ([PostId] ASC),
        CONSTRAINT [FK_dbo.Posts_dbo.Blogs_BlogId] FOREIGN KEY ([BlogId]) REFERENCES [dbo].[Blogs] ([BlogId]) ON DELETE CASCADE
    );

    SET IDENTITY_INSERT [dbo].[Blogs] ON
    INSERT INTO [dbo].[Blogs] ([BlogId], [Name], [Url]) VALUES (1, N'ADO.NET Blog', N'blogs.msdn.com/adonet')
    SET IDENTITY_INSERT [dbo].[Blogs] OFF
    INSERT INTO [dbo].[Posts] ([Title], [Content], [BlogId]) VALUES (N'Intro to EF', N'Interesting stuff...', 1)
    INSERT INTO [dbo].[Posts] ([Title], [Content], [BlogId]) VALUES (N'What is New', N'More interesting stuff...', 1)
```

## Create the Model

First up, we need a project to put the model in.

-   **File -> New -> Project...**
-   Select **Visual C\#** from the left pane and then **Class Library**
-   Enter **STESample** as the name and click **OK**

Now we'll create a simple model in the EF Designer to access our database:

-   **Project -> Add New Item...**
-   Select **Data** from the left pane and then **ADO.NET Entity Data Model**
-   Enter **BloggingModel** as the name and click **OK**
-   Select **Generate from database** and click **Next**
-   Enter the connection information for the database that you created in the previous section
-   Enter **BloggingContext** as the name for the connection string and click **Next**
-   Check the box next to **Tables** and click **Finish**

## Swap to STE Code Generation

Now we need to disable the default code generation and swap to Self-Tracking Entities.

### If you are using Visual Studio 2012

-   Expand **BloggingModel.edmx** in **Solution Explorer** and delete the **BloggingModel.tt** and **BloggingModel.Context.tt**
    *This will disable the default code generation*
-   Right-click an empty area on the EF Designer surface and select **Add Code Generation Item...**
-   Select **Online** from the left pane and search for **STE Generator**
-   Select the **STE Generator for C\#** template, enter **STETemplate** as the name and click **Add**
-   The **STETemplate.tt** and **STETemplate.Context.tt** files are added nested under the BloggingModel.edmx file

### If you are using Visual Studio 2010

-   Right-click an empty area on the EF Designer surface and select **Add Code Generation Item...**
-   Select **Code** from the left pane and then **ADO.NET Self-Tracking Entity Generator**
-   Enter **STETemplate** as the name and click **Add**
-   The **STETemplate.tt** and **STETemplate.Context.tt** files are added directly to your project

## Move Entity Types into Separate Project

To use Self-Tracking Entities our client application needs access to the entity classes generated from our model. Because we don't want to expose the whole model to the client application we're going to move the entity classes into a separate project.

The first step is to stop generating entity classes in the existing project:

-   Right-click on **STETemplate.tt** in **Solution Explorer** and select **Properties**
-   In the **Properties** window clear **TextTemplatingFileGenerator** from the **CustomTool** property
-   Expand **STETemplate.tt** in **Solution Explorer** and delete all files nested under it

Next, we are going to add a new project and generate the entity classes in it

-   **File -> Add -> Project...**
-   Select **Visual C\#** from the left pane and then **Class Library**
-   Enter **STESample.Entities** as the name and click **OK**
-   **Project -> Add Existing Item...**
-   Navigate to the **STESample** project folder
-   Select to view **All Files (\*.\*)**
-   Select the **STETemplate.tt** file
-   Click on the drop down arrow next to the **Add** button and select **Add As Link**

We're also going to make sure the entity classes get generated in the same namespace as the context. This just reduces the number of using statements we need to add throughout our application.

-   Right-click on the linked **STETemplate.tt** in **Solution Explorer** and select **Properties**
-   In the **Properties** window set **Custom Tool Namespace** to **STESample**

The code generated by the STE template will need a reference to **System.Runtime.Serialization** in order to compile. This library is needed for the WCF **DataContract** and **DataMember** attributes that are used on the serializable entity types.

-   Right click on the **STESample.Entities** project in **Solution Explorer** and select **Add Reference...**
    -   In Visual Studio 2012 - check the box next to **System.Runtime.Serialization** and click **OK**
    -   In Visual Studio 2010 - select **System.Runtime.Serialization** and click **OK**

Finally, the project with our context in it will need a reference to the entity types.

-   Right click on the **STESample** project in **Solution Explorer** and select **Add Reference...**
    -   In Visual Studio 2012 - select **Solution** from the left pane, check the box next to **STESample.Entities** and click **OK**
    -   In Visual Studio 2010 - select the **Projects** tab, select **STESample.Entities** and click **OK**

>**Note:**
> Another option for moving the entity types to a separate project is to move the template file, rather than linking it from its default location. If you do this, you will need to update the **inputFile** variable in the template to provide the relative path to the edmx file (in this example that would be **..\\BloggingModel.edmx**).

## Create a WCF Service

Now it's time to add a WCF Service to expose our data, we'll start by creating the project.

-   **File -> Add -> Project...**
-   Select **Visual C\#** from the left pane and then **WCF Service Application**
-   Enter **STESample.Service** as the name and click **OK**
-   Add a reference to the **System.Data.Entity** assembly
-   Add a reference to the **STESample** and **STESample.Entities** projects

We need to copy the EF connection string to this project so that it is found at runtime.

-   Open the **App.Config** file for the **STESample **project and copy the **connectionStrings** element
-   Paste the **connectionStrings** element as a child element of the **configuration** element of the **Web.Config** file in the **STESample.Service** project

Now it's time to implement the actual service.

-   Open **IService1.cs** and replace the contents with the following code

```csharp
    using System.Collections.Generic;
    using System.ServiceModel;

    namespace STESample.Service
    {
        [ServiceContract]
        public interface IService1
        {
            [OperationContract]
            List<Blog> GetBlogs();

            [OperationContract]
            void UpdateBlog(Blog blog);
        }
    }
```

-   Open **Service1.svc** and replace the contents with the following code

```csharp
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;

    namespace STESample.Service
    {
        public class Service1 : IService1
        {
            /// <summary>
            /// Gets all the Blogs and related Posts.
            /// </summary>
            public List<Blog> GetBlogs()
            {
                using (BloggingContext context = new BloggingContext())
                {
                    return context.Blogs.Include("Posts").ToList();
                }
            }

            /// <summary>
            /// Updates Blog and its related Posts.
            /// </summary>
            public void UpdateBlog(Blog blog)
            {
                using (BloggingContext context = new BloggingContext())
                {
                    try
                    {
                        // TODO: Perform validation on the updated order before applying the changes.

                        // The ApplyChanges method examines the change tracking information
                        // contained in the graph of self-tracking entities to infer the set of operations
                        // that need to be performed to reflect the changes in the database.
                        context.Blogs.ApplyChanges(blog);
                        context.SaveChanges();

                    }
                    catch (UpdateException)
                    {
                        // To avoid propagating exception messages that contain sensitive data to the client tier
                        // calls to ApplyChanges and SaveChanges should be wrapped in exception handling code.
                        throw new InvalidOperationException("Failed to update. Try your request again.");
                    }
                }
            }        
        }
    }
```
