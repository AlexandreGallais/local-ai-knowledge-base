---
title: "Breaking change: IIS: UrlRewrite middleware query strings are preserved"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/breaking-changes/5/iis-urlrewrite-middleware-query-strings-are-preserved.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# IIS: UrlRewrite middleware query strings are preserved

An IIS UrlRewrite middleware defect prevented the query string from being preserved in rewrite rules. That defect has been fixed to maintain consistency with the IIS UrlRewrite Module's behavior.

For discussion, see issue dotnet/aspnetcore#22972.

## Version introduced

ASP.NET Core 5.0

## Old behavior

Consider the following rewrite rule:

```xml
<rule name="MyRule" stopProcessing="true">
  <match url="^about" />
  <action type="Redirect" url="/contact" redirectType="Temporary" appendQueryString="true" />
</rule>
```

The preceding rule doesn't append the query string. A URI like `/about?id=1` redirects to `/contact` instead of `/contact?id=1`. The `appendQueryString` attribute defaults to `true` as well.

## New behavior

The query string is preserved. The URI from the example in Old behavior would be `/contact?id=1`.

## Reason for change

The old behavior didn't match the IIS UrlRewrite Module's behavior. To support porting between the middleware and module, the goal is to maintain consistent behaviors.

## Recommended action

If the behavior of removing the query string is preferred, set the `action` element to `appendQueryString="false"`.

## Affected APIs

`Microsoft.AspNetCore.Rewrite.IISUrlRewriteOptionsExtensions.AddIISUrlRewrite*`
