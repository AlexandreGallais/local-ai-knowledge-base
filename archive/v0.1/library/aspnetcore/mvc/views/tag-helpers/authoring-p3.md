---
title: "Author Tag Helpers in ASP.NET Core (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/mvc/views/tag-helpers/authoring.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Author Tag Helpers in ASP.NET Core (part 3 of 3)

## Load minified partial view TagHelper

In production environments, performance can be improved by loading minified partial views. To take advantage of minified partial view in production:

* Create/set up a pre-build process that minifies partial views.
* Use the following code to load  minified partial views in non-development environments.

```csharp
public class MinifiedVersionPartialTagHelper : PartialTagHelper
    {
        public MinifiedVersionPartialTagHelper(ICompositeViewEngine viewEngine, 
                                IViewBufferScope viewBufferScope)
                               : base(viewEngine, viewBufferScope)
        {

        }

        public override Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
        {
            // Append ".min" to load the minified partial view.
            if (!IsDevelopment())
            {
                Name += ".min";
            }

            return base.ProcessAsync(context, output);
        }

        private bool IsDevelopment()
        {
            return Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") 
                                                 == EnvironmentName.Development;
        }
    }
```
