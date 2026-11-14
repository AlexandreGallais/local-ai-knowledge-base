---
title: "TypeError: context.getScope is not a function"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/use/troubleshooting/v9-rule-api-changes.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# TypeError: context.getScope is not a function

## Symptoms

When using ESLint v9.0.0 or later with a plugin, you may see one of the following errors:

```plaintext
TypeError: context.getScope is not a function
TypeError: context.getAncestors is not a function
TypeError: context.markVariableAsUsed is not a function
TypeError: context.getDeclaredVariables is not a function
```

## Cause

ESLint v9.0.0 introduces changes to the rules API that plugin rules use, which included moving some methods from the `context` object to the `sourceCode` object. If you're seeing one of these errors, that means the plugin has not yet been updated to use the new rules API.

## Resolution

Common resolutions for this issue include:

- Upgrade the plugin to the latest version.
- Use the compatibility utilities to patch the plugin in your config file.

**Important:**
If you are already using the latest version of the plugin and you need to use the compatibility utilities to make the plugin work with ESLint v9.0.0 and later, make sure to open an issue on the plugin's repository to ask the maintainer to make the necessary API changes.

## Resources

For more information, see:

- Configure Plugins for documentation on how to configure plugins
- Create Plugins for documentation on how to define plugins
