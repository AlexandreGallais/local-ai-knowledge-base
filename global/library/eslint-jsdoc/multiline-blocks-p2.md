---
title: "multiline-blocks (part 2 of 2)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/multiline-blocks.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# multiline-blocks (part 2 of 2)

## Passing examples

The following patterns are not considered problems:

````ts
/** Not reported */

/**
 *  Not reported
 */

/** Reported up here
 * because the rest is multiline
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"noZeroLineText":false}]

/** @tag */

/** @lends */
// "jsdoc/multiline-blocks": ["error"|"warn", {"noSingleLineBlocks":true}]

/** @tag */
// "jsdoc/multiline-blocks": ["error"|"warn", {"noSingleLineBlocks":true,"singleLineTags":["tag"]}]

/** @tag */
// "jsdoc/multiline-blocks": ["error"|"warn", {"noSingleLineBlocks":true,"singleLineTags":["*"]}]

/**
 *
 */

/**
 *
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"noMultilineBlocks":false}]

/** Test */
// "jsdoc/multiline-blocks": ["error"|"warn", {"noMultilineBlocks":true}]

/**
 * This is long enough to be permitted by our config.
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"minimumLengthForMultiline":25,"noMultilineBlocks":true}]

/**
 * This is long enough to be permitted by our config.
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"minimumLengthForMultiline":50,"noMultilineBlocks":true}]

/**
 * This has the right tag so is permitted.
 * @theRightTag
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"multilineTags":["theRightTag"],"noMultilineBlocks":true}]

/** This has no tags but is single line so is not permitted. */
// "jsdoc/multiline-blocks": ["error"|"warn", {"multilineTags":["*"],"noMultilineBlocks":true}]

/**
 * This has the wrong tags so is not permitted.
 * @notTheRightTag
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"minimumLengthForMultiline":10,"multilineTags":["onlyThisIsExempted"],"noMultilineBlocks":true}]

/**
 * This has the wrong tags so is not permitted.
 * @theRightTag
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"minimumLengthForMultiline":500,"multilineTags":["theRightTag"],"noMultilineBlocks":true}]

/** tag */

/**
 * @lends This is ok per multiline
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"noMultilineBlocks":true,"noSingleLineBlocks":true}]

/**
 * This has too many tags so cannot be fixed ot a single line.
 * @oneTag
 * @anotherTag
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"multilineTags":[],"noMultilineBlocks":true}]

/**
 * This has too many tags so cannot be fixed ot a single line.
 * @oneTag
 * @anotherTag
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"allowMultipleTags":true,"multilineTags":[],"noMultilineBlocks":true}]

/**
 * This has a tag and description so cannot be fixed ot a single line.
 * @oneTag
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"allowMultipleTags":true,"multilineTags":[],"noMultilineBlocks":true}]

/**
 * This has a tag and description so cannot be fixed ot a single line.
 * @oneTag
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"allowMultipleTags":false,"multilineTags":["oneTag"],"noMultilineBlocks":true}]

/** @someTag with Description */
// "jsdoc/multiline-blocks": ["error"|"warn", {"noFinalLineText":true}]

/**
 * This description here is very much long enough, I'd say, wouldn't you?
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"requireSingleLineUnderCount":80}]

/**
 * This description here is
 * on multiple lines.
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"requireSingleLineUnderCount":80}]

/** This description here is on a single line, so it doesn't matter if it goes over. */
// "jsdoc/multiline-blocks": ["error"|"warn", {"requireSingleLineUnderCount":80}]

/**
 * @someTag {someType} This description here is very much long enough, I'd say, wouldn't you?
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"requireSingleLineUnderCount":80}]

/**
 * @someTag {someType} This description here is
 * on multiple lines.
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"requireSingleLineUnderCount":80}]

/** @someTag {someTag} This description here is on a single line, so it doesn't matter if it goes over. */
// "jsdoc/multiline-blocks": ["error"|"warn", {"requireSingleLineUnderCount":80}]

/**
 * Description short but has...
 * @someTag
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"requireSingleLineUnderCount":80}]

/**
 * @someTag
 * @anotherTag
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"requireSingleLineUnderCount":80}]

/**
 * @type {{
    visible: import("vue").Ref<boolean>,
    attack: import("vue").Ref<AttackPve|AttackPvp|undefined>,
    hero: import("vue").Ref<HeroOwn|undefined>,
    outpost: import("vue").Ref<Outpost|undefined>,
    rewards: import("vue").Ref<Rewards|undefined>
* }}
*/
// "jsdoc/multiline-blocks": ["error"|"warn", {"requireSingleLineUnderCount":120}]
````
