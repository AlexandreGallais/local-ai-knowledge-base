---
title: "Deploy multiple locales"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/i18n/deploy.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Deploy multiple locales

If `myapp` is the directory that contains the distributable files of your project, you typically make different versions available for different locales in locale directories.
For example, your French version is located in the `myapp/fr` directory and the Spanish version is located in the `myapp/es` directory.

The HTML `base` tag with the `href` attribute specifies the base URI, or URL, for relative links.
If you set the `"localize"` option in `angular.json` workspace build configuration file to `true` or to an array of locale IDs, the CLI adjusts the base `href` for each version of the application.
To adjust the base `href` for each version of the application, the CLI uses the configured `"subPath"` as the URL segment for the locale.
If you don't set `"subPath"`, it defaults to the locale ID.
Specify the `"subPath"` for each locale in your `angular.json` workspace build configuration file.
The following example displays `"subPath"` set to an empty string.

File: `angular.json`

```json
"projects": {
  "angular.io-example": {
```

## Configure a server

Typical deployment of multiple languages serve each language from a different subdirectory.
Users are redirected to the preferred language defined in the browser using the `Accept-Language` HTTP header.
If the user has not defined a preferred language, or if the preferred language is not available, then the server falls back to the default language.
To change the language, change your current location to another subdirectory.
The change of subdirectory often occurs using a menu implemented in the application.

For more information on how to deploy apps to a remote server, see Deployment.

IMPORTANT: If you are using Server rendering with `outputMode` set to `server`, Angular automatically handles redirection dynamically based on the `Accept-Language` HTTP header. This simplifies deployment by eliminating the need for manual server or configuration adjustments.

### Nginx example

The following example displays an Nginx configuration.

```nginx
http {
    # Browser preferred language detection (does NOT require
    # AcceptLanguageModule)
    map $http_accept_language $accept_language {
        ~*^de de;
        ~*^fr fr;
        ~*^en "";
    }
    # ...
}

server {
    listen 80;
    server_name localhost;
    root /www/data;

    # Fallback to default language if no preference defined by browser
    if ($accept_language ~ "^$") {
        set $accept_language "fr";
    }

    # Redirect "/" to Angular application in the preferred language of the browser
    rewrite ^/$ /$accept_language permanent;

    # Everything under the Angular application is always redirected to Angular in the
    # correct language
    location ~ ^/(fr|de|$) {
        if ($accept_language = "") {
            try_files $uri /index.html?$args;
        }
        try_files $uri /$1/index.html?$args;
    }
    # ...
}
```

### Apache example

The following example displays an Apache configuration.

```apache
<VirtualHost *:80>
    ServerName localhost
    DocumentRoot /www/data

    <Directory "/www/data">
        # Enable rewrite engine for URL manipulation
        RewriteEngine on
        RewriteBase /

        # Serve 'index.html' for root-level access
        RewriteRule ^../index\.html$ - [L]

        # If the requested file or directory does not exist, redirect to 'index.html'
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule (..) $1/index.html [L]

        # Language-based redirection based on HTTP Accept-Language header

        # Redirect German users to the '/de/' directory
        RewriteCond %{HTTP:Accept-Language} ^de [NC]
        RewriteRule ^$ /de/ [R]

        # Redirect English-speaking users to the '/en/' directory
        RewriteCond %{HTTP:Accept-Language} ^en [NC]
        RewriteRule ^$ /en/ [R]

        # Redirect users with unsupported languages (not 'en' or 'de') to the '/fr/' directory
        RewriteCond %{HTTP:Accept-Language} !^en [NC]
        RewriteCond %{HTTP:Accept-Language} !^de [NC]
        RewriteRule ^$ /fr/ [R]
    </Directory>
</VirtualHost>
```

## Prerendering

If you set `outputMode` to `static`, the CLI prerenders the routes that your server routes configure with `RenderMode.Prerender` for each locale at build time, and it produces no server.
For more information, see Generate a fully static application.
Because no server chooses a language, your hosting setup handles redirects and not-found pages.

### Output layout

The CLI writes each locale to its own directory in `browser/`.
Each directory contains the prerendered HTML, the bundles, and a copy of the `public/` files for that locale.
The `lang` attribute and the `<base href>` of the prerendered pages match the locale.

The following layout assumes the source locale is served from the root, as described in the next section.

```text
browser/
├── index.html
├── about/index.html
├── tr/
│   ├── index.html
│   └── about/index.html
└── es/
    ├── index.html
    └── about/index.html
```

The root pages use `lang="en"` and `<base href="/">`. The `tr/` pages use `lang="tr"` and `<base href="/tr/">`, and the `es/` pages use `lang="es"` and `<base href="/es/">`.

### Serve the source locale from the root

To serve the source locale from `/` and nest the other locales under it, use the object form of `sourceLocale` and set `"subPath"` to an empty string.

```json
{
  "i18n": {
    "sourceLocale": {
      "code": "en",
      "subPath": ""
    },
    "locales": {
      "tr": "src/locale/messages.tr.xlf",
      "es": "src/locale/messages.es.xlf"
    }
  }
}
```

Without the empty `"subPath"`, the CLI places the source locale in its own directory named after the locale code, such as `/en/`.

### Redirect users to their language

Static output does not redirect based on the `Accept-Language` HTTP header.
Configure your host to redirect based on that header.
The Nginx and Apache examples assume that every locale, including the default, lives in its own subdirectory.
If you serve the source locale from the root, adapt them to redirect `/` only for the other locales.

### Not-found pages

The CLI does not prerender a page for the `**` wildcard route.
To get a not-found page, declare a concrete route such as `404` and make sure your server routes prerender it.
Each locale then gets its own page, for example `/404/index.html` and `/tr/404/index.html`.
Configure your host to serve the page that matches the locale path of the missing URL, for example with `error_page` in Nginx or `ErrorDocument` in Apache.
