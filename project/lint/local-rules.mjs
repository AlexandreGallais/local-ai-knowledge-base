// The local rules of this project, as an ESLint plugin named "local": what no npm plugin gives in the
// shape the project needs. Plain ESM, ESLint 10 rule format, no dependency. Both configs use it.
import {
  existsSync,
  readFileSync,
} from 'node:fs';
import {
  basename,
  dirname,
  join,
  resolve,
} from 'node:path';

const SHEET = 'local rule, see lint/local-rules.mjs: ';
const IDENTIFIER = 'Identifier';
// Nothing before the first comment but a byte order mark, a shebang line and blanks.
const BYTE_ORDER_MARK = String.fromCodePoint(0xFE_FF);
const SHEBANG_AND_BLANKS = /(#![^\n]*\n)?\s*$/u.source;
const TOP_OF_FILE = new RegExp('^('.concat(BYTE_ORDER_MARK, ')?', SHEBANG_AND_BLANKS), 'u');
const FUNCTION_INIT = new Set([
  'ArrowFunctionExpression',
  'FunctionExpression',
]);
const TYPE_DECLARATIONS = new Set([
  'TSInterfaceDeclaration',
  'TSTypeAliasDeclaration',
]);

function rule(name, meta, create) {
  return {
    meta: {
      ...meta,
      docs: {
        description: meta.description,
        url: `${SHEET}${name}`,
      },
    },
    create,
  };
}

// ---------------------------------------------------------------- one function per file
const exportedFunction = (node, name) => ({
  function: {
    node,
    name,
  },
});
const exportedOther = (node, what) => ({
  other: {
    node,
    what,
  },
});

function declaratorExport(declarator) {
  const init = declarator.init;
  const isFunction = init !== null && init !== undefined && FUNCTION_INIT.has(init.type) && declarator.id.type === IDENTIFIER;

  return isFunction ? exportedFunction(declarator.id, declarator.id.name) : exportedOther(declarator, 'a value that is not a function');
}

function declarationExports(node) {
  const declaration = node.declaration;

  if (!declaration) {
    return node.specifiers
      .filter((item) => item.exportKind !== 'type')
      .map((specifier) => exportedOther(specifier, 'an export list'));
  }
  if (declaration.type === 'FunctionDeclaration') {
    return [exportedFunction(declaration.id ?? declaration, declaration.id?.name)];
  }
  if (declaration.type === 'VariableDeclaration') {
    return declaration.declarations.map((declarator) => declaratorExport(declarator));
  }
  return TYPE_DECLARATIONS.has(declaration.type) ? [] : [exportedOther(declaration, declaration.type === 'ClassDeclaration' ? 'a class' : 'a declaration that is not a function')];
}

// What one export statement gives at run time: functions and other values.
function exportsOf(node) {
  if (node.type === 'ExportDefaultDeclaration' || node.type === 'ExportAllDeclaration') {
    return [exportedOther(node, node.type === 'ExportDefaultDeclaration' ? 'a default export' : 'an export-all')];
  }
  return node.type === 'ExportNamedDeclaration' && node.exportKind !== 'type' ? declarationExports(node) : [];
}

/** Names of the functions a module exports at run time, and what else it exports. */
function collectExports(program) {
  const found = program.body.flatMap((node) => exportsOf(node));

  return {
    functions: found
      .filter((item) => item.function)
      .map((item) => item.function),
    others: found
      .filter((item) => item.other)
      .map((item) => item.other),
  };
}

function exportsTypes(program) {
  return program.body.some((item) => item.type === 'ExportNamedDeclaration' && (item.exportKind === 'type' || TYPE_DECLARATIONS.has(item.declaration?.type)));
}

const singleExportedFunction = rule(
  'single-exported-function',
  {
    type: 'problem',
    description: 'A file exports exactly one function and nothing else at run time.',
    schema: [],
    messages: {
      none: 'Export exactly one function from this file. It exports none.',
      extra: 'Export one function per file. Move "{{name}}" to its own file.',
      other: 'Export only one function from this file. Remove {{what}}.',
    },
  },
  (context) => ({
    'Program:exit'(node) {
      const {
        functions,
        others,
      } = collectExports(node);

      // A file of types only exports nothing at run time: allowed.
      if (functions.length === 0 && others.length === 0 && !exportsTypes(node)) {
        context.report({
          node,
          loc: {
            line: 1,
            column: 0,
          },
          messageId: 'none',
        });
      }
      functions
        .slice(1)
        .forEach((extra) => context.report({
          node: extra.node,
          messageId: 'extra',
          data: { name: extra.name },
        }));
      others.forEach((other) => context.report({
        node: other.node,
        messageId: 'other',
        data: { what: other.what },
      }));
    },
  }),
);

// ---------------------------------------------------------------- copyright header
function firstComment(sourceCode) {
  const comment = sourceCode
    .getAllComments()
    .find((item) => item.type !== 'Shebang');

  return comment && TOP_OF_FILE.test(sourceCode.text.slice(0, comment.range[0])) ? comment : undefined;
}

function hasCopyright(sourceCode, pattern) {
  const comment = firstComment(sourceCode);

  return comment !== undefined && new RegExp(pattern, 'u').test(comment.value);
}

const FIRST_LINE = {
  line: 1,
  column: 0,
};
const copyrightHeader = rule(
  'copyright-header',
  {
    type: 'problem',
    description: 'A file starts with the copyright comment of the project.',
    schema: [
      {
        type: 'object',
        properties: { pattern: { type: 'string' } },
        required: ['pattern'],
        additionalProperties: false,
      },
    ],
    messages: { missing: 'Start this file with the copyright comment of the project (see lint/settings.mjs).' },
  },
  (context) => ({
    Program(node) {
      if (!hasCopyright(context.sourceCode, context.options[0].pattern)) {
        context.report({
          node,
          loc: FIRST_LINE,
          messageId: 'missing',
        });
      }
    },
  }),
);
// Format pass: writes the copyright comment at the top of a file that has none.
const insertCopyright = rule(
  'insert-copyright',
  {
    type: 'layout',
    fixable: 'code',
    description: 'Inserts the copyright comment of the project.',
    schema: [
      {
        type: 'object',
        properties: {
          pattern: { type: 'string' },
          text: { type: 'string' },
        },
        required: [
          'pattern',
          'text',
        ],
        additionalProperties: false,
      },
    ],
    messages: { insert: 'Insert the copyright comment.' },
  },
  (context) => ({
    Program(node) {
      const {
        pattern,
        text,
      } = context.options[0];

      if (!hasCopyright(context.sourceCode, pattern)) {
        context.report({
          node,
          loc: FIRST_LINE,
          messageId: 'insert',
          fix: (fixer) => fixer.insertTextBeforeRange(
            [
              0,
              0,
            ],
            `${text}\n\n`,
          ),
        });
      }
    },
  }),
);

// ---------------------------------------------------------------- line breaks
// Format pass: list-style leaves function parameters alone; this puts each on its own line once a
// function has two, and the closing parenthesis on its own line too. The indent rule aligns them.
function reportParameters(context, node) {
  const source = context.sourceCode;
  const params = node.params ?? [];

  if (params.length < 2) {
    return;
  }
  for (const param of params) {
    const before = source.getTokenBefore(param);

    if (before.loc.end.line === param.loc.start.line) {
      context.report({
        node: param,
        messageId: 'split',
        fix: (fixer) => fixer.replaceTextRange(
          [
            before.range[1],
            param.range[0],
          ],
          '\n',
        ),
      });
    }
  }
  const last = params.at(-1);
  const closing = source.getTokenAfter(last, (token) => token.value === ')');

  if (closing && closing.loc.start.line === last.loc.end.line) {
    const tail = source.getTokenBefore(closing);

    context.report({
      node: last,
      messageId: 'split',
      fix: (fixer) => fixer.replaceTextRange(
        [
          tail.range[1],
          closing.range[0],
        ],
        tail.value === ',' ? '\n' : ',\n',
      ),
    });
  }
}

const oneParameterPerLine = rule(
  'one-parameter-per-line',
  {
    type: 'layout',
    fixable: 'whitespace',
    description: 'One parameter per line once a function has two.',
    schema: [],
    messages: { split: 'Put each parameter on its own line.' },
  },
  (context) => {
    const check = (node) => reportParameters(context, node);

    return {
      FunctionDeclaration: check,
      FunctionExpression: check,
      ArrowFunctionExpression: check,
      TSDeclareFunction: check,
      TSMethodSignature: check,
      TSFunctionType: check,
    };
  },
);

// A short first item, then a last item that opens on the same line: `describe('name', () => {`.
function hugs(items, open, close) {
  const [first, last] = items;

  return items.length === 2 && first.loc.start.line === open.loc.end.line && first.loc.end.line === first.loc.start.line && last.loc.start.line === first.loc.end.line && last.loc.end.line === close.loc.start.line;
}

// Format pass: in a list already written on several lines, each item on its own line, and the
// closing bracket too. An object written on several lines puts even a single property on its line.
function reportItems(context, list, brackets, minItems) {
  const source = context.sourceCode;
  const [open, close] = brackets;
  const items = list.filter(Boolean);

  if (items.length < minItems || open.loc.start.line === close.loc.end.line || hugs(items, open, close)) {
    return;
  }
  for (const item of items) {
    const before = source.getTokenBefore(item);

    if (before.loc.end.line === item.loc.start.line) {
      context.report({
        node: item,
        messageId: 'split',
        fix: (fixer) => fixer.replaceTextRange(
          [
            before.range[1],
            item.range[0],
          ],
          '\n',
        ),
      });
    }
  }
  const tail = source.getTokenBefore(close);

  if (tail.loc.end.line === close.loc.start.line) {
    context.report({
      node: items.at(-1),
      messageId: 'split',
      fix: (fixer) => fixer.replaceTextRange(
        [
          tail.range[1],
          close.range[0],
        ],
        tail.value === ',' ? '\n' : ',\n',
      ),
    });
  }
}

const oneItemPerLine = rule(
  'one-item-per-line',
  {
    type: 'layout',
    fixable: 'whitespace',
    description: 'One item per line in a list written on several lines.',
    schema: [],
    messages: { split: 'Put each item of this list on its own line.' },
  },
  (context) => {
    const source = context.sourceCode;
    const ends = (node) => [
      source.getFirstToken(node),
      source.getLastToken(node),
    ];
    const call = (node) => {
      const open = source.getTokenAfter(node.typeArguments ?? node.callee, (token) => token.value === '(');

      if (open) {
        reportItems(
          context,
          node.arguments,
          [
            open,
            source.getLastToken(node),
          ],
          2,
        );
      }
    };

    return {
      CallExpression: call,
      NewExpression: call,
      ArrayExpression: (node) => reportItems(context, node.elements, ends(node), 2),
      ObjectExpression: (node) => reportItems(context, node.properties, ends(node), 1),
    };
  },
);

// ---------------------------------------------------------------- imports
function packageOf(specifier) {
  const parts = specifier.split('/');

  return specifier.startsWith('@') ? parts
    .slice(0, 2)
    .join('/') : parts[0];
}

function nearestManifest(start) {
  let folder = start;

  while (!existsSync(join(folder, 'package.json'))) {
    const parent = dirname(folder);

    if (parent === folder) {
      return undefined;
    }
    folder = parent;
  }
  return JSON.parse(readFileSync(join(folder, 'package.json'), 'utf8'));
}

function declaredPackages(start) {
  const manifest = nearestManifest(start) ?? {};

  return new Set(Object.keys({
    ...manifest.dependencies,
    ...manifest.devDependencies,
    ...manifest.peerDependencies,
    ...manifest.optionalDependencies,
  }));
}

function isBareSpecifier(specifier) {
  return typeof specifier === 'string' && !specifier.startsWith('.') && !specifier.startsWith('/') && !specifier.startsWith('node:');
}

// Replaces import-x/no-extraneous-dependencies without its native resolver.
const noUndeclaredImport = rule(
  'no-undeclared-import',
  {
    type: 'problem',
    description: 'Every imported package is declared in package.json.',
    schema: [],
    messages: { missing: 'The package "{{name}}" is not in package.json. Use what the project has, or ask the user to add it.' },
  },
  (context) => {
    const declared = declaredPackages(dirname(resolve(context.filename)));
    const check = (node) => {
      const specifier = node.source?.value;

      if (isBareSpecifier(specifier) && !declared.has(packageOf(specifier))) {
        context.report({
          node: node.source,
          messageId: 'missing',
          data: { name: packageOf(specifier) },
        });
      }
    };

    return {
      ImportDeclaration: check,
      ExportNamedDeclaration: check,
      ExportAllDeclaration: check,
      ImportExpression: check,
    };
  },
);
const RELATIVE_IMPORT = /\b(?:import|export)\b[^'"]*?\bfrom\s*['"](\.{1,2}\/[^'"]+)['"]|\bimport\s*\(\s*['"](\.{1,2}\/[^'"]+)['"]\s*\)/g;

function resolveModule(from, specifier) {
  const base = resolve(dirname(from), specifier);

  return [
    base,
    `${base}.ts`,
    `${base}.mts`,
    join(base, 'index.ts'),
    base.replace(/\.js$/, '.ts'),
  ].find((path) => existsSync(path) && !path.endsWith('/'));
}

function relativeImports(file, cache) {
  if (!cache.has(file)) {
    const text = existsSync(file) ? readFileSync(file, 'utf8') : '';

    cache.set(
      file,
      [...text.matchAll(RELATIVE_IMPORT)]
        .map((match) => resolveModule(file, match[1] ?? match[2]))
        .filter(Boolean),
    );
  }
  return cache.get(file);
}

// The chain of imports that leads from a file back to the start, or undefined.
function pathBack(start, from, walk) {
  for (const next of relativeImports(from, walk.cache)) {
    if (next === start) {
      return [next];
    }
    if (!walk.seen.has(next) && walk.seen.size < 200) {
      walk.seen.add(next);
      const rest = pathBack(start, next, walk);

      if (rest) {
        return [
          next,
          ...rest,
        ];
      }
    }
  }
  return undefined;
}

function cycleFrom(start, target, cache) {
  if (target === undefined) {
    return undefined;
  }
  return target === start ? [] : pathBack(start, target, {
    cache,
    seen: new Set([target]),
  });
}

// Replaces import-x/no-cycle for relative imports: a chain of imports never comes back to the file.
const noImportCycle = rule(
  'no-import-cycle',
  {
    type: 'problem',
    description: 'Relative imports never form a cycle.',
    schema: [],
    messages: { cycle: 'This import starts a cycle: {{chain}}. Move the shared code to a third file.' },
  },
  (context) => {
    const start = resolve(context.filename);
    const cache = new Map();

    return {
      ImportDeclaration(node) {
        const specifier = node.source.value;

        if (typeof specifier !== 'string' || !specifier.startsWith('.') || node.importKind === 'type') {
          return;
        }
        const target = resolveModule(start, specifier);
        const rest = cycleFrom(start, target, cache);

        if (rest !== undefined) {
          context.report({
            node: node.source,
            messageId: 'cycle',
            data: {
              chain: [
                start,
                target,
                ...rest,
              ]
                .map((path) => basename(path))
                .join(' -> '),
            },
          });
        }
      },
    };
  },
);
// ---------------------------------------------------------------- NgRx Signals stores
// The building blocks of @ngrx/signals; any other with...() call is a feature of the project.
const STORE_BLOCKS = new Set([
  'withState',
  'withComputed',
  'withMethods',
  'withHooks',
  'withProps',
  'withLinkedState',
  'withEntities',
  'withReducer',
  'withEventHandlers',
  'withFeature',
]);
const STORE_LIMITS = {
  signalStore: 15,
  signalStoreFeature: 10,
};

function storeArguments(node) {
  return node.arguments.filter((argument) => argument.type === 'CallExpression' && argument.callee.type === IDENTIFIER && /^with[A-Z]/.test(argument.callee.name));
}

const storeListsFeatures = rule(
  'store-lists-features',
  {
    type: 'problem',
    description: 'A store lists either features of sub-domains or the blocks of a small store, never both; at most 15 features in a store and 10 in a signalStoreFeature.',
    schema: [],
    messages: {
      mixed: 'This store lists features of sub-domains: move "{{name}}" to a feature file.',
      tooMany: '{{count}} features in {{callee}}: at most {{max}}. Group some in a signalStoreFeature.',
    },
  },
  (context) => ({
    CallExpression(node) {
      const callee = node.callee.type === IDENTIFIER ? node.callee.name : '';
      const max = STORE_LIMITS[callee];

      if (max === undefined) {
        return;
      }
      const features = node.arguments.filter((argument) => argument.type !== 'ObjectExpression' && !(argument.type === 'CallExpression' && argument.callee.name === 'type'));

      if (features.length > max) {
        context.report({
          node,
          messageId: 'tooMany',
          data: {
            count: String(features.length),
            callee,
            max: String(max),
          },
        });
      }
      const calls = storeArguments(node);
      const hasOwnFeature = calls.some((call) => !STORE_BLOCKS.has(call.callee.name));

      if (callee === 'signalStore' && hasOwnFeature) {
        for (const call of calls.filter((item) => STORE_BLOCKS.has(item.callee.name))) {
          context.report({
            node: call,
            messageId: 'mixed',
            data: { name: call.callee.name },
          });
        }
      }
    },
  }),
);

// ---------------------------------------------------------------- named syntax bans
function restrictSyntax(name, selector, message) {
  return rule(
    name,
    {
      type: 'problem',
      description: message,
      schema: [],
      messages: { found: message },
    },
    (context) => ({
      [selector](node) {
        context.report({
          node,
          messageId: 'found',
        });
      },
    }),
  );
}

const BANS = [
  ['no-enum', 'TSEnumDeclaration', 'Write a union of string literals, not an enum.'],
  ['no-redundant-standalone', 'Decorator Property[key.name="standalone"][value.value=true]', 'Remove "standalone: true": it is the default.'],
];

export const local = {
  meta: {
    name: 'local',
    version: '0.2.0',
  },
  rules: {
    'single-exported-function': singleExportedFunction,
    'copyright-header': copyrightHeader,
    'insert-copyright': insertCopyright,
    'one-parameter-per-line': oneParameterPerLine,
    'one-item-per-line': oneItemPerLine,
    'no-undeclared-import': noUndeclaredImport,
    'no-import-cycle': noImportCycle,
    'store-lists-features': storeListsFeatures,
    ...Object.fromEntries(BANS.map(([name, selector, message]) => [
      name,
      restrictSyntax(name, selector, message),
    ])),
  },
};
