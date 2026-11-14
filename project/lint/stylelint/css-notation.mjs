/**
 * Theme "cssNotation" (format): the notation the standard config of Stylelint asks for, fixed at once.
 *
 * The rules of stylelint-config-standard-scss that fix themselves (short hex colors, modern color
 * functions, blank lines between rules, units of zero, lower-case keywords...), with the same
 * settings as the lint: so the lint never reports what the format could fix. They are read from the
 * shared configs themselves, so they follow their version.
 */
export const theme = 'cssNotation';

export const packages = ['stylelint', 'stylelint-config-standard-scss'];

/**
 * The rules of a shared config, those of the configs it extends first.
 * @param {string} name The package of the config.
 * @returns {Promise<Record<string, unknown>>} Its rules.
 */
async function sharedRules(name) {
  const module = await import(name);
  const config = module.default;
  const parents = await Promise.all(
    [config.extends ?? []].flat().map((parent) => sharedRules(parent)),
  );
  const inherited = parents.reduce(
    (rules, parent) => ({
      ...rules,
      ...parent,
    }),
    {},
  );

  // The rules of the config itself come last: they override those of the configs it extends.
  return {
    ...inherited,
    ...config.rules,
  };
}

/**
 * @param {Record<string, any>} loaded The packages of the theme.
 * @returns {Promise<object[]>} The part of the Stylelint config this theme brings.
 */
export async function configs(loaded) {
  const stylelint = loaded.stylelint;
  const rules = await sharedRules('stylelint-config-standard-scss');
  const fixable = await Promise.all(
    Object.entries(rules).map(async ([name, setting]) => {
      const rule = name.includes('/') ? undefined : await stylelint.rules[name];

      return rule?.meta?.fixable === true ? [[name, setting]] : [];
    }),
  );

  return [{ rules: Object.fromEntries(fixable.flat()) }];
}
