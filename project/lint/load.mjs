/**
 * Loads the themes of rules that lint/settings.mjs switches on.
 *
 * A theme is a file of lint/eslint/ or lint/stylelint/. It exports its name, the npm packages it
 * needs, and a function that returns its configs from those packages. A theme is used only when it
 * is on in the settings and its packages are installed; when a package is missing, the lint says
 * which one in a single line, and the other themes still run.
 */
import { THEMES } from './settings.mjs';

/** The files each kind of rule applies to. */
export const FILES = {
  javascript: ['**/*.{js,mjs}'],
  scripts: ['**/*.{ts,mts,cts,js,mjs}'],
  templates: ['**/*.html'],
  tests: ['**/*.{spec,test}.{ts,mts}'],
  typescript: ['**/*.{ts,mts,cts}'],
};

/**
 * An installed npm package, or undefined when it is not installed.
 * @param {string} name The package.
 * @returns {Promise<unknown>} Its default export, or the module itself.
 */
async function load(name) {
  try {
    const module = await import(name);

    return module.default ?? module;
  } catch (error) {
    if (error?.code === 'ERR_MODULE_NOT_FOUND' && String(error.message).includes(`'${name}'`)) {
      return undefined;
    }

    throw error;
  }
}

/**
 * The configs of the themes that are on and installed, in the order given.
 * @param {{ theme: string, packages: string[], configs: Function }[]} themes Theme modules.
 * @returns {Promise<object[]>} The configs of ESLint or Stylelint.
 */
export async function useThemes(themes) {
  const configs = [];

  for (const { configs: build, packages, theme } of themes) {
    if (THEMES[theme] !== true) {
      continue;
    }

    const loaded = Object.fromEntries(
      await Promise.all(packages.map(async (name) => [name, await load(name)])),
    );
    const missing = packages.filter((name) => loaded[name] === undefined);

    if (missing.length > 0) {
      process.stderr.write(
        `lint: the theme "${theme}" is skipped, its packages are not installed: ${missing.join(', ')}\n`,
      );
      continue;
    }

    configs.push(...(await build(loaded)));
  }

  return configs;
}

/**
 * One Stylelint config from the parts the themes bring: their extends, plugins and rules, in order.
 * @param {{ extends?: string[], plugins?: string[], rules?: object }[]} parts The parts.
 * @returns {{ extends: string[], plugins: string[], rules: object }} The config.
 */
export function mergeStylelint(parts) {
  return {
    extends: parts.flatMap((part) => part.extends ?? []),
    plugins: parts.flatMap((part) => part.plugins ?? []),
    rules: Object.assign({}, ...parts.map((part) => part.rules ?? {})),
  };
}
