---
title: "sqlitedev"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/includes/RP/sqlitedev.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# sqlitedev

### Use SQLite for development, SQL Server for production

When SQLite is selected, the template generated code is ready for development. The following code shows how to inject `Microsoft.AspNetCore.Hosting.IWebHostEnvironment` into `Startup`. `IWebHostEnvironment` is injected so `ConfigureServices` can use SQLite in development and SQL Server in production.

```csharp
public class Startup
{
    public Startup(IConfiguration configuration, IWebHostEnvironment env)
    {
        Environment = env;
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }
    public IWebHostEnvironment Environment { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        if (Environment.IsDevelopment())
        {
            services.AddDbContext<RazorPagesMovieContext>(options =>
            options.UseSqlite(
                Configuration.GetConnectionString("RazorPagesMovieContext")));
        }
        else
        {
            services.AddDbContext<RazorPagesMovieContext>(options =>
            options.UseSqlServer(
                Configuration.GetConnectionString("MovieContext")));
        }

        services.AddRazorPages();
    }

    public void Configure(IApplicationBuilder app)
    {
        if (Environment.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        else
        {
            app.UseExceptionHandler("/Error");
            app.UseHsts();
        }

        app.UseHttpsRedirection();
        app.UseStaticFiles();

        app.UseRouting();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapRazorPages();
        });
    }
}
```
