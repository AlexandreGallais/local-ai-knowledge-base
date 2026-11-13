---
title: "jquery-validation"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/data/ef-rp/intro/samples/cu/wwwroot/lib/jquery-validation/README.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# jquery-validation

jQuery Validation Plugin - Form validation made easy
================================

[](http://travis-ci.org/jzaefferer/jquery-validation)
[](https://david-dm.org/jzaefferer/jquery-validation#info=devDependencies)

The jQuery Validation Plugin provides drop-in validation for your existing forms, while making all kinds of customizations to fit your application really easy.

## Help the project

[](http://pledgie.com/campaigns/18159)

This project is looking for help! You can donate to the ongoing pledgie campaign
and help spread the word. If you've used the plugin, or plan to use, consider a donation - any amount will help.

You can find the plan for how to spend the money on the pledgie page.

## Getting Started

### Downloading the prebuilt files

Prebuilt files can be downloaded from http://jqueryvalidation.org/

### Downloading the latest changes

The unreleased development files can be obtained by:

 1. Downloading or Forking this repository
 2. Setup the build
 3. Run `grunt` to create the built files in the "dist" directory

### Including it on your page

Include jQuery and the plugin on a page. Then select a form to validate and call the `validate` method.

```html
<form>
	<input required>
</form>
<script src="jquery.js"></script>
<script src="jquery.validate.js"></script>
<script>
$("form").validate();
</script>
```

Alternatively include jQuery and the plugin via requirejs in your module.

```js
define(["jquery", "jquery.validate"], function( $ ) {
	$("form").validate();
});
```

For more information on how to setup a rules and customizations, check the documentation.

## Reporting issues and contributing code

See the Contributing Guidelines for details.

**IMPORTANT NOTE ABOUT EMAIL VALIDATION**. As of version 1.12.0 this plugin is using the same regular expression that the HTML5 specification suggests for browsers to use. We will follow their lead and use the same check. If you think the specification is wrong, please report the issue to them. If you have different requirements, consider using a custom method.

## License
Copyright &copy; Jörn Zaefferer
Licensed under the MIT license.
