---
title: "sort-tags (part 4 of 4)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/sort-tags.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# sort-tags (part 4 of 4)

````ts
 * @see https://github.com/jaredhanson/passport/blob/v0.4.1/lib/middleware/authenticate.js#L217
 *
 */
// "jsdoc/sort-tags": ["error"|"warn", {"tagSequence":[{"tags":["since","access"]},{"tags":["class","augments","mixes"]},{"tags":["alias","memberof"]},{"tags":["see","link","global"]},{"tags":["fires","listens"]},{"tags":["param"]},{"tags":["yields"]},{"tags":["returns"]}]}]
// Message: Tags are not in the prescribed order: since, access, class, augments, mixes, alias, memberof, see, link, global, fires, listens, param, yields, returns

/**
 * Summary. (use period)
 *
 * Description. (use period)
 *
 * @since      1.0.1
 * @access     private
 *
 * @class
 * @mixes    mixin
 *
 * @alias    realName
 * @memberof namespace
 *
 * @see  Function/class relied on
 * @global
 *
 * @tutorial Asd
 * @license MIT
 *
 * @fires   eventName
 * @fires   className#eventName
 * @listens event:eventName
 * @listens className~event:eventName
 *
 * @tutorial Asd
 * @license MIT
 *
 * @yields {string} Yielded value description.
 *
 * @param {string} var1 - Description.
 * @param {string} var2 - Description of optional variable.
 * @param {string} var3 - Description of optional variable with default variable.
 * @param {object} objectVar - Description.
 * @param {string} objectVar.key - Description of a key in the objectVar parameter.
 *
 * @returns {string} Return value description.
 */
// "jsdoc/sort-tags": ["error"|"warn", {"tagSequence":[{"tags":["since","access"]},{"tags":["class","augments","mixes"]},{"tags":["alias","memberof"]},{"tags":["see","link","global"]},{"tags":["fires","listens"]},{"tags":["param"]},{"tags":["yields"]},{"tags":["returns"]}]}]
// Message: Tags are not in the prescribed order: since, access, class, augments, mixes, alias, memberof, see, link, global, fires, listens, param, yields, returns

/**
 * @def
 * @zzz
 * @abc
 */
function quux () {}
// "jsdoc/sort-tags": ["error"|"warn", {"linesBetween":1,"tagSequence":[{"tags":["qrs"]},{"tags":["def","-other","xyz"]},{"tags":["abc"]}]}]
// Message: Tag groups do not have the expected whitespace

/**
 * @xyz
 * @def
 * @abc
 */
function quux () {}
// "jsdoc/sort-tags": ["error"|"warn", {"alphabetizeExtras":true,"tagSequence":[]}]
// Message: Tags are not in the prescribed order: (alphabetical)

/**
 * @example
 * enum Color { Red, Green, Blue }
 * faker.helpers.enumValue(Color) // 1 (Green)
 *
 * enum Direction { North = 'North', South = 'South'}
 * faker.helpers.enumValue(Direction) // 'South'
 *
 * enum HttpStatus { Ok = 200, Created = 201, BadRequest = 400, Unauthorized = 401 }
 * faker.helpers.enumValue(HttpStatus) // 200 (Ok)
 * @since 8.0.0
 */
// "jsdoc/sort-tags": ["error"|"warn", {"tagSequence":[{"tags":["internal"]},{"tags":["template","param"]},{"tags":["returns"]},{"tags":["throws"]},{"tags":["see"]},{"tags":["example"]},{"tags":["since"]},{"tags":["deprecated"]}]}]
// Message: Tag groups do not have the expected whitespace

/**
 * @param b
 * @param a
 * @returns {string}
 * @example abc
 *
 *
 * @example def
 */
function quux () {}
// "jsdoc/sort-tags": ["error"|"warn", {"linesBetween":0,"tagExceptions":{"example":1}}]
// Message: Intra-group tags have unexpected whitespace
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @param b
 * @param a
 * @returns {string}
 */
function quux () {}

/**
 * @abc
 * @def
 * @xyz
 */
function quux () {}
// "jsdoc/sort-tags": ["error"|"warn", {"alphabetizeExtras":true}]

/**
 * @def
 * @xyz
 * @abc
 */
function quux () {}
// "jsdoc/sort-tags": ["error"|"warn", {"alphabetizeExtras":false}]

/**
 * @def
 * @xyz
 * @abc
 */
function quux () {}
// "jsdoc/sort-tags": ["error"|"warn", {"tagSequence":[{"tags":["def","xyz","abc"]}]}]

/** @def */
function quux () {}

/**
 * @def
 * @xyz
 *
 * @abc
 */
function quux () {}
// "jsdoc/sort-tags": ["error"|"warn", {"linesBetween":1,"tagSequence":[{"tags":["qrs"]},{"tags":["def","xyz"]},{"tags":["abc"]}]}]

/**
 * @def
 * @xyz A multiline
 * description
 *
 * @abc
 */
function quux () {}
// "jsdoc/sort-tags": ["error"|"warn", {"linesBetween":1,"tagSequence":[{"tags":["qrs"]},{"tags":["def","xyz"]},{"tags":["abc"]}]}]

/**
 * Foo
 *
 * @see https://github.com/jaredhanson/passport/blob/v0.4.1/lib/middleware/authenticate.js#L217
 *
 * @param {(
 *  req: express.Request,
 *  done: (error: any, user?: any, info?: any) => void
 * ) => void} verify - callback to excute custom authentication logic
 */
// "jsdoc/sort-tags": ["error"|"warn", {"tagSequence":[{"tags":["since","access"]},{"tags":["class","augments","mixes"]},{"tags":["alias","memberof"]},{"tags":["see","link","global"]},{"tags":["fires","listens"]},{"tags":["param"]},{"tags":["yields"]},{"tags":["returns"]}]}]

/**
 * Constructor.
 *
 * @public
 *
 * @param {string} [message] - Error message.
 */
// "jsdoc/sort-tags": ["error"|"warn", {"tagSequence":[{"tags":["since","access"]},{"tags":["class","augments","mixes"]},{"tags":["alias","memberof"]},{"tags":["public","protected","private","override"]},{"tags":["override","async"]},{"tags":["see","link","global"]},{"tags":["param"]},{"tags":["yields"]},{"tags":["returns"]},{"tags":["fires","-other","listens"]}]}]

/**
 * @param options.mode The mode to generate the birthdate. Supported modes are `'age'` and `'year'` .
 *
 * There are two modes available `'age'` and `'year'`:
 * - `'age'`: The min and max options define the age of the person (e.g. `18` - `42`).
 * - `'year'`: The min and max options define the range the birthdate may be in (e.g. `1900` - `2000`).
 *
 * Defaults to `year`.
 *
 * @example
 */
// "jsdoc/sort-tags": ["error"|"warn", {"tagSequence":[{"tags":["internal"]},{"tags":["template","param"]},{"tags":["returns"]},{"tags":["throws"]},{"tags":["see"]},{"tags":["example"]},{"tags":["since"]},{"tags":["deprecated"]}]}]

/**
 * @example
 * enum Color { Red, Green, Blue }
 * faker.helpers.enumValue(Color) // 1 (Green)
 *
 * enum Direction { North = 'North', South = 'South'}
 * faker.helpers.enumValue(Direction) // 'South'
 *
 * enum HttpStatus { Ok = 200, Created = 201, BadRequest = 400, Unauthorized = 401 }
 * faker.helpers.enumValue(HttpStatus) // 200 (Ok)
 *
 * @since 8.0.0
 */
// "jsdoc/sort-tags": ["error"|"warn", {"tagSequence":[{"tags":["internal"]},{"tags":["template","param"]},{"tags":["returns"]},{"tags":["throws"]},{"tags":["see"]},{"tags":["example"]},{"tags":["since"]},{"tags":["deprecated"]}]}]

/**
 * @def
 * @xyz
 * @abc
 */
function quux () {}
// "jsdoc/sort-tags": ["error"|"warn", {"linesBetween":2,"reportTagGroupSpacing":false,"tagSequence":[{"tags":["qrs"]},{"tags":["def","xyz"]},{"tags":["abc"]}]}]

/**
 * @param b
 * @param a
 * @returns {string}
 * @example abc
 *
 * @example def
 */
function quux () {}
// "jsdoc/sort-tags": ["error"|"warn", {"linesBetween":0,"tagExceptions":{"example":1}}]
````
