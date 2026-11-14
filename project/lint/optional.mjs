// The lint plugins a project may lack. eslint and typescript-eslint are needed; every other plugin is
// optional: when it is not installed, its rules and the configs it brings are left out, and the rest of
// the format and the lint still run.
/** The rule prefixes of the plugins that were not found, filled by optional(). */
export const missingPrefixes = new Set();

/**
 * A plugin of the project's node_modules, or undefined when it is not installed.
 * @param {string} name The npm package.
 * @param {string[]} prefixes The rule prefixes the plugin owns, as "unicorn" or "@angular-eslint/template".
 */
export async function optional(name, prefixes) {
  try {
    const loaded = await import(name);

    return loaded.default ?? loaded;
  } catch (error) {
    if (error?.code !== 'ERR_MODULE_NOT_FOUND' || !String(error.message).includes(`'${name}'`)) {
      throw error;
    }
    for (const prefix of prefixes) {
      missingPrefixes.add(prefix);
    }
    return undefined;
  }
}

function prefixOf(rule) {
  return rule.includes('/') ? rule.slice(0, rule.lastIndexOf('/')) : '';
}

/**
 * The configs without what a missing plugin would need: its rules, its plugin entry, the configs it
 * extends with.
 * @param {object[]} configs Flat config objects.
 * @param {Set<string>} missing Rule prefixes of the missing plugins.
 */
export function prune(configs, missing = missingPrefixes) {
  if (missing.size === 0) {
    return configs;
  }
  return configs.map((config) => {
    const next = { ...config };

    if (Array.isArray(next.extends)) {
      next.extends = next.extends.filter((item) => item !== undefined);
    }
    if (next.plugins !== undefined) {
      next.plugins = Object.fromEntries(Object
        .entries(next.plugins)
        .filter(([, plugin]) => plugin !== undefined));
    }
    if (next.rules !== undefined) {
      next.rules = Object.fromEntries(Object
        .entries(next.rules)
        .filter(([rule]) => !missing.has(prefixOf(rule))));
    }
    return next;
  });
}
