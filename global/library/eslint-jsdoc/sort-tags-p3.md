---
title: "sort-tags (part 3 of 4)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/sort-tags.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# sort-tags (part 3 of 4)

````ts
/**
 * @returns {string}
 * @param b
 * @param a
 */
function quux () {}
// Message: Tags are not in the prescribed order: summary, typeSummary, module, exports, file, fileoverview, overview, import, template, typedef, interface, record, name, kind, type, alias, external, host, callback, func, function, method, class, constructor, modifies, mixes, mixin, mixinClass, mixinFunction, namespace, borrows, constructs, lends, implements, requires, desc, description, classdesc, tutorial, copyright, license, internal, overload, const, constant, final, global, readonly, abstract, virtual, var, member, memberof, memberof!, inner, instance, inheritdoc, inheritDoc, override, hideconstructor, param, arg, argument, prop, property, return, returns, async, generator, default, defaultvalue, enum, augments, extends, throws, exception, yield, yields, event, fires, emits, listens, this, satisfies, static, private, protected, public, access, package, -other, see, example, closurePrimitive, customElement, expose, hidden, idGenerator, meaning, ngInject, owner, wizaction, define, dict, export, externs, implicitCast, noalias, nocollapse, nocompile, noinline, nosideeffects, polymer, polymerBehavior, preserve, struct, suppress, unrestricted, category, ignore, author, version, variation, since, deprecated, todo

/**
 * Some description
 * @returns {string}
 * @param b
 * @param a
 */
function quux () {}
// Message: Tags are not in the prescribed order: summary, typeSummary, module, exports, file, fileoverview, overview, import, template, typedef, interface, record, name, kind, type, alias, external, host, callback, func, function, method, class, constructor, modifies, mixes, mixin, mixinClass, mixinFunction, namespace, borrows, constructs, lends, implements, requires, desc, description, classdesc, tutorial, copyright, license, internal, overload, const, constant, final, global, readonly, abstract, virtual, var, member, memberof, memberof!, inner, instance, inheritdoc, inheritDoc, override, hideconstructor, param, arg, argument, prop, property, return, returns, async, generator, default, defaultvalue, enum, augments, extends, throws, exception, yield, yields, event, fires, emits, listens, this, satisfies, static, private, protected, public, access, package, -other, see, example, closurePrimitive, customElement, expose, hidden, idGenerator, meaning, ngInject, owner, wizaction, define, dict, export, externs, implicitCast, noalias, nocollapse, nocompile, noinline, nosideeffects, polymer, polymerBehavior, preserve, struct, suppress, unrestricted, category, ignore, author, version, variation, since, deprecated, todo

/**
 * @returns {string}
 * @param b A long
 *   description
 * @param a
 */
function quux () {}
// Message: Tags are not in the prescribed order: summary, typeSummary, module, exports, file, fileoverview, overview, import, template, typedef, interface, record, name, kind, type, alias, external, host, callback, func, function, method, class, constructor, modifies, mixes, mixin, mixinClass, mixinFunction, namespace, borrows, constructs, lends, implements, requires, desc, description, classdesc, tutorial, copyright, license, internal, overload, const, constant, final, global, readonly, abstract, virtual, var, member, memberof, memberof!, inner, instance, inheritdoc, inheritDoc, override, hideconstructor, param, arg, argument, prop, property, return, returns, async, generator, default, defaultvalue, enum, augments, extends, throws, exception, yield, yields, event, fires, emits, listens, this, satisfies, static, private, protected, public, access, package, -other, see, example, closurePrimitive, customElement, expose, hidden, idGenerator, meaning, ngInject, owner, wizaction, define, dict, export, externs, implicitCast, noalias, nocollapse, nocompile, noinline, nosideeffects, polymer, polymerBehavior, preserve, struct, suppress, unrestricted, category, ignore, author, version, variation, since, deprecated, todo

/**
 * Some description
 * @returns {string}
 * @param b A long
 *   description
 * @param a
 */
function quux () {}
// Message: Tags are not in the prescribed order: summary, typeSummary, module, exports, file, fileoverview, overview, import, template, typedef, interface, record, name, kind, type, alias, external, host, callback, func, function, method, class, constructor, modifies, mixes, mixin, mixinClass, mixinFunction, namespace, borrows, constructs, lends, implements, requires, desc, description, classdesc, tutorial, copyright, license, internal, overload, const, constant, final, global, readonly, abstract, virtual, var, member, memberof, memberof!, inner, instance, inheritdoc, inheritDoc, override, hideconstructor, param, arg, argument, prop, property, return, returns, async, generator, default, defaultvalue, enum, augments, extends, throws, exception, yield, yields, event, fires, emits, listens, this, satisfies, static, private, protected, public, access, package, -other, see, example, closurePrimitive, customElement, expose, hidden, idGenerator, meaning, ngInject, owner, wizaction, define, dict, export, externs, implicitCast, noalias, nocollapse, nocompile, noinline, nosideeffects, polymer, polymerBehavior, preserve, struct, suppress, unrestricted, category, ignore, author, version, variation, since, deprecated, todo

/**
 * @param b A long
 *   description
 * @returns {string}
 * @param a
 */
function quux () {}
// Message: Tags are not in the prescribed order: summary, typeSummary, module, exports, file, fileoverview, overview, import, template, typedef, interface, record, name, kind, type, alias, external, host, callback, func, function, method, class, constructor, modifies, mixes, mixin, mixinClass, mixinFunction, namespace, borrows, constructs, lends, implements, requires, desc, description, classdesc, tutorial, copyright, license, internal, overload, const, constant, final, global, readonly, abstract, virtual, var, member, memberof, memberof!, inner, instance, inheritdoc, inheritDoc, override, hideconstructor, param, arg, argument, prop, property, return, returns, async, generator, default, defaultvalue, enum, augments, extends, throws, exception, yield, yields, event, fires, emits, listens, this, satisfies, static, private, protected, public, access, package, -other, see, example, closurePrimitive, customElement, expose, hidden, idGenerator, meaning, ngInject, owner, wizaction, define, dict, export, externs, implicitCast, noalias, nocollapse, nocompile, noinline, nosideeffects, polymer, polymerBehavior, preserve, struct, suppress, unrestricted, category, ignore, author, version, variation, since, deprecated, todo

/**
 * @typedef Foo<T>
 * @template {Object} T
 * @prop {T} bar
 */
// Message: Tags are not in the prescribed order: summary, typeSummary, module, exports, file, fileoverview, overview, import, template, typedef, interface, record, name, kind, type, alias, external, host, callback, func, function, method, class, constructor, modifies, mixes, mixin, mixinClass, mixinFunction, namespace, borrows, constructs, lends, implements, requires, desc, description, classdesc, tutorial, copyright, license, internal, overload, const, constant, final, global, readonly, abstract, virtual, var, member, memberof, memberof!, inner, instance, inheritdoc, inheritDoc, override, hideconstructor, param, arg, argument, prop, property, return, returns, async, generator, default, defaultvalue, enum, augments, extends, throws, exception, yield, yields, event, fires, emits, listens, this, satisfies, static, private, protected, public, access, package, -other, see, example, closurePrimitive, customElement, expose, hidden, idGenerator, meaning, ngInject, owner, wizaction, define, dict, export, externs, implicitCast, noalias, nocollapse, nocompile, noinline, nosideeffects, polymer, polymerBehavior, preserve, struct, suppress, unrestricted, category, ignore, author, version, variation, since, deprecated, todo

/**
 * @def
 * @xyz
 * @abc
 */
function quux () {}
// "jsdoc/sort-tags": ["error"|"warn", {"alphabetizeExtras":true}]
// Message: Tags are not in the prescribed order: summary, typeSummary, module, exports, file, fileoverview, overview, import, template, typedef, interface, record, name, kind, type, alias, external, host, callback, func, function, method, class, constructor, modifies, mixes, mixin, mixinClass, mixinFunction, namespace, borrows, constructs, lends, implements, requires, desc, description, classdesc, tutorial, copyright, license, internal, overload, const, constant, final, global, readonly, abstract, virtual, var, member, memberof, memberof!, inner, instance, inheritdoc, inheritDoc, override, hideconstructor, param, arg, argument, prop, property, return, returns, async, generator, default, defaultvalue, enum, augments, extends, throws, exception, yield, yields, event, fires, emits, listens, this, satisfies, static, private, protected, public, access, package, -other, see, example, closurePrimitive, customElement, expose, hidden, idGenerator, meaning, ngInject, owner, wizaction, define, dict, export, externs, implicitCast, noalias, nocollapse, nocompile, noinline, nosideeffects, polymer, polymerBehavior, preserve, struct, suppress, unrestricted, category, ignore, author, version, variation, since, deprecated, todo

/**
 * @xyz
 * @def
 * @abc
 */
function quux () {}
// "jsdoc/sort-tags": ["error"|"warn", {"tagSequence":[{"tags":["def","xyz","abc"]}]}]
// Message: Tags are not in the prescribed order: def, xyz, abc

/**
 * @xyz
 * @def
 * @abc
 */
function quux () {}
// "jsdoc/sort-tags": ["error"|"warn", {"tagSequence":[{"tags":["def","xyz"]},{"tags":["abc"]}]}]
// Message: Tags are not in the prescribed order: def, xyz, abc

/**
 * @returns {string}
 * @ignore
 * @param b A long
 *   description
 * @param a
 * @module
 */
function quux () {}
// Message: Tags are not in the prescribed order: summary, typeSummary, module, exports, file, fileoverview, overview, import, template, typedef, interface, record, name, kind, type, alias, external, host, callback, func, function, method, class, constructor, modifies, mixes, mixin, mixinClass, mixinFunction, namespace, borrows, constructs, lends, implements, requires, desc, description, classdesc, tutorial, copyright, license, internal, overload, const, constant, final, global, readonly, abstract, virtual, var, member, memberof, memberof!, inner, instance, inheritdoc, inheritDoc, override, hideconstructor, param, arg, argument, prop, property, return, returns, async, generator, default, defaultvalue, enum, augments, extends, throws, exception, yield, yields, event, fires, emits, listens, this, satisfies, static, private, protected, public, access, package, -other, see, example, closurePrimitive, customElement, expose, hidden, idGenerator, meaning, ngInject, owner, wizaction, define, dict, export, externs, implicitCast, noalias, nocollapse, nocompile, noinline, nosideeffects, polymer, polymerBehavior, preserve, struct, suppress, unrestricted, category, ignore, author, version, variation, since, deprecated, todo

/**
 * @xyz
 * @abc
 * @abc
 * @def
 * @xyz
 */
function quux () {}
// "jsdoc/sort-tags": ["error"|"warn", {"alphabetizeExtras":true}]
// Message: Tags are not in the prescribed order: summary, typeSummary, module, exports, file, fileoverview, overview, import, template, typedef, interface, record, name, kind, type, alias, external, host, callback, func, function, method, class, constructor, modifies, mixes, mixin, mixinClass, mixinFunction, namespace, borrows, constructs, lends, implements, requires, desc, description, classdesc, tutorial, copyright, license, internal, overload, const, constant, final, global, readonly, abstract, virtual, var, member, memberof, memberof!, inner, instance, inheritdoc, inheritDoc, override, hideconstructor, param, arg, argument, prop, property, return, returns, async, generator, default, defaultvalue, enum, augments, extends, throws, exception, yield, yields, event, fires, emits, listens, this, satisfies, static, private, protected, public, access, package, -other, see, example, closurePrimitive, customElement, expose, hidden, idGenerator, meaning, ngInject, owner, wizaction, define, dict, export, externs, implicitCast, noalias, nocollapse, nocompile, noinline, nosideeffects, polymer, polymerBehavior, preserve, struct, suppress, unrestricted, category, ignore, author, version, variation, since, deprecated, todo

/**
 * @param b A long
 *   description
 * @module
 */
function quux () {}
// Message: Tags are not in the prescribed order: summary, typeSummary, module, exports, file, fileoverview, overview, import, template, typedef, interface, record, name, kind, type, alias, external, host, callback, func, function, method, class, constructor, modifies, mixes, mixin, mixinClass, mixinFunction, namespace, borrows, constructs, lends, implements, requires, desc, description, classdesc, tutorial, copyright, license, internal, overload, const, constant, final, global, readonly, abstract, virtual, var, member, memberof, memberof!, inner, instance, inheritdoc, inheritDoc, override, hideconstructor, param, arg, argument, prop, property, return, returns, async, generator, default, defaultvalue, enum, augments, extends, throws, exception, yield, yields, event, fires, emits, listens, this, satisfies, static, private, protected, public, access, package, -other, see, example, closurePrimitive, customElement, expose, hidden, idGenerator, meaning, ngInject, owner, wizaction, define, dict, export, externs, implicitCast, noalias, nocollapse, nocompile, noinline, nosideeffects, polymer, polymerBehavior, preserve, struct, suppress, unrestricted, category, ignore, author, version, variation, since, deprecated, todo

/**
 * @def
 * @xyz
 * @abc
 */
function quux () {}
// "jsdoc/sort-tags": ["error"|"warn", {"linesBetween":2,"tagSequence":[{"tags":["qrs"]},{"tags":["def","xyz"]},{"tags":["abc"]}]}]
// Message: Tag groups do not have the expected whitespace

/**
 * @def
 * @xyz
 *
 *
 * @abc
 */
function quux () {}
// "jsdoc/sort-tags": ["error"|"warn", {"linesBetween":1,"tagSequence":[{"tags":["qrs"]},{"tags":["def","xyz"]},{"tags":["abc"]}]}]
// Message: Tag groups do not have the expected whitespace

/**
 * @def
 * @xyz A multiline
 * description
 * @abc
 */
function quux () {}
// "jsdoc/sort-tags": ["error"|"warn", {"linesBetween":2,"tagSequence":[{"tags":["qrs"]},{"tags":["def","xyz"]},{"tags":["abc"]}]}]
// Message: Tag groups do not have the expected whitespace

/**
 * @def
 * @xyz
 * @xyz
 *
 *
 * @abc
 */
function quux () {}
// "jsdoc/sort-tags": ["error"|"warn", {"linesBetween":1,"tagSequence":[{"tags":["qrs"]},{"tags":["def","xyz"]},{"tags":["abc"]}]}]
// Message: Tag groups do not have the expected whitespace

/**
 * Foo
 *
 * @param {(
 *  req: express.Request,
 *  done: (error: any, user?: any, info?: any) => void
 * ) => void} verify - callback to excute custom authentication logic
````
