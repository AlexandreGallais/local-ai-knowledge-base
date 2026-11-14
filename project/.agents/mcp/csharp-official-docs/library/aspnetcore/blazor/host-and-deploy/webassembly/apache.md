---
title: "Host and deploy ASP.NET Core Blazor WebAssembly with Apache"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/host-and-deploy/webassembly/apache.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Host and deploy ASP.NET Core Blazor WebAssembly with Apache

This article explains how to host and deploy Blazor WebAssembly using Apache.

To deploy a Blazor WebAssembly app to Apache:

Create the Apache configuration file. The following example is a simplified configuration file (`blazorapp.config`):

```
<VirtualHost *:80>
    ServerName www.example.com
    ServerAlias *.example.com

    DocumentRoot "/var/www/blazorapp"
    ErrorDocument 404 /index.html

    AddType application/wasm .wasm

    <Directory "/var/www/blazorapp">
        Options -Indexes
        AllowOverride None
    </Directory>

    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/css
        AddOutputFilterByType DEFLATE application/javascript
        AddOutputFilterByType DEFLATE text/html
        AddOutputFilterByType DEFLATE application/octet-stream
        AddOutputFilterByType DEFLATE application/wasm
        <IfModule mod_setenvif.c>
            BrowserMatch ^Mozilla/4 gzip-only-text/html
            BrowserMatch ^Mozilla/4.0[678] no-gzip
            BrowserMatch bMSIE !no-gzip !gzip-only-text/html
        </IfModule>
    </IfModule>

    ErrorLog /var/log/httpd/blazorapp-error.log
    CustomLog /var/log/httpd/blazorapp-access.log common
</VirtualHost>
```

Place the Apache configuration file into the `/etc/httpd/conf.d/` directory.

Place the app's published assets (`/bin/Release/{TARGET FRAMEWORK}/publish/wwwroot`, where the `{TARGET FRAMEWORK}` placeholder is the target framework) into the `/var/www/blazorapp` directory (the location specified to `DocumentRoot` in the configuration file).

Restart the Apache service.

For more information, see `mod_mime` and `mod_deflate`.

## Related content

* Apache documentation
* Developers on non-Microsoft support forums:
  * Stack Overflow (tag: `blazor`)
  * ASP.NET Core Slack Team
  * Blazor Gitter
