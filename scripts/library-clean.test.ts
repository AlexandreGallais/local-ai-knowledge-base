import assert from 'node:assert/strict';
import {
  describe,
  it,
} from 'node:test';
import {
  type CleanContext,
  cleanDocument,
} from './library-clean.ts';
import {
  bytes,
  neutralizeExamples,
  region,
  splitMarkdown,
} from './library-markdown.ts';
import type { Flavor } from './library-sources.ts';

const NEWLINE = '\n';

interface Page {
  flavor: Flavor;
  path: string;
  files?: Record<string, string>;
  currentVersion?: number;
}

function clean(page: Page, text: string): string {
  const files = page.files ?? {};
  const context: CleanContext = {
    flavor: page.flavor,
    path: page.path,
    read: (repositoryPath) => files[repositoryPath],
    ...page.currentVersion === undefined ? {} : { currentVersion: page.currentVersion },
  };

  return cleanDocument(text, context).body;
}

describe('DocFX pages', () => {
  const page = [
    '---',
    'title: Expression trees',
    'ms.date: 2026-01-01',
    '---',
    '# Build expression trees',
    '',
    'Use <xref:System.Linq.Expressions.Expression?displayProperty=nameWithType> to build one.',
    '',
    ':::code language="csharp" source="snippets/Build.cs" id="AddExpression":::',
    '',
    '[!INCLUDE [note](../includes/note.md)]',
    '',
    ':::image type="content" source="media/tree.png" alt-text="A tree.":::',
    '',
    '> [!NOTE]',
    '> Read the [guide](../guide.md).',
    '',
    ':::moniker range=">= aspnetcore-10.0"',
    'Kept for the newest version.',
    ':::moniker-end',
    ':::moniker range="< aspnetcore-8.0"',
    'Dropped: an old version.',
    ':::moniker-end',
  ].join(NEWLINE);
  const files = {
    'docs/csharp/snippets/Build.cs': 'class A\n{\n    // <AddExpression>\n    var sum = Expression.Add(a, b);\n    // </AddExpression>\n}\n',
    'docs/includes/note.md': '---\nms.topic: include\n---\nIncluded text.\n',
  };
  const body = clean(
    {
      flavor: 'docfx',
      path: 'docs/csharp/expressions.md',
      files,
      currentVersion: 11,
    },
    page,
  );

  it('inlines the region of a code sample and an include', () => {
    assert.match(body, /```csharp\nvar sum = Expression\.Add\(a, b\);\n```/);
    assert.match(body, /Included text\./);
  });
  it('removes DocFX markup: xref, images, alerts, links, old monikers', () => {
    assert.match(body, /Use `System\.Linq\.Expressions\.Expression` to build one\./);
    assert.match(body, /> \*\*Note:\*\*\n> Read the guide\./);
    assert.match(body, /Kept for the newest version\./);
    assert.doesNotMatch(body, /:::|xref|\.png|Dropped|ms\.date/);
  });
  it('says when a code sample is not in the clone', () => {
    assert.match(
      clean(
        {
          flavor: 'docfx',
          path: 'docs/a.md',
        },
        '# A\n\n[!code-csharp[Main](../samples/Missing.cs#Main)]\n',
      ),
      /_Code sample not included: \.\.\/samples\/Missing\.cs\._/,
    );
  });
});
describe('DocFX includes inside includes', () => {
  it('expands an include that holds a moniker range and another include, and a zone with a space', () => {
    const files = {
      'aspnetcore/includes/version.md': ':::moniker range="= aspnetcore-7.0 || = aspnetcore-11.0"\n[!INCLUDE[](~/includes/support.md)]\n:::moniker-end\n',
      'aspnetcore/includes/support.md': 'Supported text.\n',
    };
    const body = clean(
      {
        flavor: 'docfx',
        path: 'aspnetcore/blazor/page.md',
        files,
        currentVersion: 11,
      },
      '# Page\n\n[!INCLUDE[](~/includes/version.md)]\n\n::: zone pivot="visualstudio"\n\nUse the IDE.\n\n::: zone-end\n',
    );

    assert.match(body, /Supported text\./);
    assert.match(body, /\*\*visualstudio:\*\*\n\nUse the IDE\./);
    assert.doesNotMatch(body, /:::|INCLUDE/);
  });
});
describe('Hugo pages', () => {
  const page = [
    '---',
    'title: Pods',
    'weight: 10',
    '---',
    'A {{< glossary_tooltip text="Pod" term_id="pod" >}} runs containers.',
    '',
    '{{< feature-state for_k8s_version="v1.25" state="stable" >}}',
    '',
    '{{% code_sample file="pods/simple-pod.yaml" %}}',
    '',
    '{{< note >}}',
    'Pods are ephemeral.',
    '{{</ note >}}',
    '',
    '## {{% heading "whatsnext" %}}',
    '',
    'Read about Deployments.',
  ].join(NEWLINE);
  const body = clean(
    {
      flavor: 'hugo',
      path: 'content/en/docs/concepts/pods.md',
      files: { 'content/en/examples/pods/simple-pod.yaml': 'apiVersion: v1\nkind: Pod\n' },
    },
    page,
  );

  it('expands glossary tooltips, feature states, code samples and headings', () => {
    assert.match(body, /^# Pods$/m);
    assert.match(body, /A Pod runs containers\./);
    assert.match(body, /\*\*Feature state:\*\* v1\.25 \[stable\]/);
    assert.match(body, /```yaml\napiVersion: v1\nkind: Pod\n```/);
    assert.match(body, /\*\*Note:\*\*\nPods are ephemeral\./);
    assert.match(body, /^## What's next$/m);
    assert.doesNotMatch(body, /\{\{/);
  });
});
describe('Angular pages', () => {
  const page = [
    '<docs-decorative-header title="Signals" imgSrc="a.svg">',
    '</docs-decorative-header>',
    '',
    'Signals track state.',
    '',
    '<docs-code header="counter.ts" path="adev/src/content/examples/signals/counter.ts" region="count"/>',
    '',
    '<docs-callout title="Read-only signals">',
    'Use `asReadonly()`.',
    '</docs-callout>',
    '',
    '<docs-code language="ts">',
    'const count = signal(0);',
    '</docs-code>',
  ].join(NEWLINE);
  const files = { 'adev/src/content/examples/signals/counter.ts': '// #docregion count\nconst count = signal(0);\n// #enddocregion count\nconst other = 1;\n' };
  const body = clean(
    {
      flavor: 'angular',
      path: 'adev/src/content/guide/signals/overview.md',
      files,
    },
    page,
  );

  it('inlines docs-code by path and region, and turns the docs tags into Markdown', () => {
    assert.match(body, /File: `counter\.ts`\n\n```ts\nconst count = signal\(0\);\n```/);
    assert.match(body, /\*\*Read-only signals\*\*\nUse `asReadonly\(\)`\./);
    assert.match(body, /```ts\nconst count = signal\(0\);\n```/);
    assert.doesNotMatch(body, /<\/?docs-|docregion|const other/);
  });
});
describe('mdBook pages', () => {
  const page = '<Listing number="2-1" file-name="src/main.rs" caption="Read a guess">\n\n```rust\n{{#rustdoc_include ../listings/ch02/src/main.rs:here}}\n```\n\n</Listing>\n';
  const files = { 'listings/ch02/src/main.rs': '# fn hidden() {}\nfn main() {\n    // ANCHOR: here\n    let guess = String::new();\n    // ANCHOR_END: here\n}\n' };

  it('inlines the anchor of a listing inside its code fence and labels the listing', () => {
    const body = clean(
      {
        flavor: 'mdbook',
        path: 'src/ch02-00-guessing-game.md',
        files,
      },
      page,
    );

    assert.match(body, /\*\*Listing 2-1: Read a guess\*\* \(src\/main\.rs\)/);
    assert.match(body, /```rust\nlet guess = String::new\(\);\n```/);
    assert.doesNotMatch(body, /\{\{#|ANCHOR|hidden|<\/?Listing/);
  });
});
describe('MDN pages', () => {
  const page = [
    '---',
    'title: "Animation: cancel() method"',
    'slug: Web/API/Animation/cancel',
    '---',
    '',
    '{{ APIRef("Web Animations") }}',
    '',
    'The **`cancel()`** method of the {{domxref("Animation")}} interface sets {{domxref("Animation.startTime", "startTime")}} to `null`. See {{domxref("Element.animate()")}} and {{SVGElement("rect")}}.',
    '',
    '- `effect` {{optional_inline}}',
    '  - : The target effect.',
    '',
    '## Specifications',
    '',
    '{{Specifications}}',
    '',
    '## Browser compatibility',
    '',
    '{{Compat}}',
  ].join(NEWLINE);
  const body = clean(
    {
      flavor: 'mdn',
      path: 'files/en-us/web/api/animation/cancel/index.md',
    },
    page,
  );

  it('replaces the macros by their text and drops the sections left empty', () => {
    assert.match(body, /^# Animation: cancel\(\) method$/m);
    assert.match(body, /interface sets `startTime` to `null`\. See `Element\.animate\(\)` and `<rect>`\./);
    assert.match(body, /`effect` \(optional\)\n {4}The target effect\./);
    assert.doesNotMatch(body, /\{\{|Specifications|Browser compatibility/);
  });
});
describe('MDX, ESLint and plain Markdown pages', () => {
  it('drops the MDX imports, the source warning and the tabs of a typescript-eslint rule', () => {
    const page = "---\ndescription: 'Require Promise-like statements to be handled.'\n---\n\nimport Tabs from '@theme/Tabs';\n\n> 🛑 This file is source code!\n>\n> See **https://typescript-eslint.io/rules/x** for documentation.\n\nA floating Promise.\n\n:::tip\nUse `void`.\n:::\n\n<Tabs>\n<TabItem value=\"❌ Incorrect\">\n\n```ts\npromise;\n```\n\n</TabItem>\n</Tabs>\n";
    const body = clean(
      {
        flavor: 'mdx',
        path: 'packages/eslint-plugin/docs/rules/no-floating-promises.mdx',
      },
      page,
    );

    assert.match(body, /^# no-floating-promises$/m);
    assert.match(body, /\*\*Tip:\*\*\nUse `void`\./);
    assert.match(body, /\*\*❌ Incorrect\*\*\n\n```ts\npromise;\n```/);
    assert.doesNotMatch(body, /import |🛑|<\/?Tab/);
  });
  it('labels the incorrect and correct blocks of an ESLint rule', () => {
    const body = clean(
      {
        flavor: 'eslint',
        path: 'docs/src/rules/no-var.md',
      },
      '---\ntitle: no-var\n---\n\n::: incorrect\n\n```js\nvar x;\n```\n\n:::\n',
    );

    assert.match(body, /^# no-var\n\n\*\*Incorrect:\*\*\n\n```js\nvar x;\n```$/);
  });
  it('removes HTML comments, line breaks and details tags of plain Markdown', () => {
    const body = clean(
      {
        flavor: 'markdown',
        path: 'docs/rules/prefer-signals.md',
      },
      '<!--\n DO NOT EDIT.\n-->\n\n<br>\n\n# `@angular-eslint/prefer-signals`\n\n<details>\n<summary>❌ - Toggle examples of <strong>incorrect</strong> code</summary>\n\nText &amp; more.\n\n</details>\n',
    );

    assert.equal(body, '# `@angular-eslint/prefer-signals`\n\n**❌ - Toggle examples of incorrect code**\n\nText & more.');
  });
  it('removes the twoslash comments from the TypeScript handbook code', () => {
    const body = clean(
      {
        flavor: 'typescript',
        path: 'packages/documentation/copy/en/handbook-v2/Basics.md',
      },
      '---\ntitle: The Basics\n---\n\n```ts twoslash\n// @errors: 2349\nconst message = "x";\n//    ^?\n```\n',
    );

    assert.match(body, /```ts\nconst message = "x";\n```/);
  });
  it('inlines the option files of a Podman page', () => {
    const body = clean(
      {
        flavor: 'podman',
        path: 'docs/source/markdown/podman-run.1.md.in',
        files: { 'docs/source/markdown/options/detach.md': '####> This option file is used in:\n#### **--detach**, **-d**\n\nRun in the background.\n' },
      },
      '% podman-run 1\n\n## OPTIONS\n\n@@option detach\n',
    );

    assert.match(body, /#### \*\*--detach\*\*, \*\*-d\*\*\n\nRun in the background\./);
    assert.doesNotMatch(body, /@@option|####>/);
  });
});
describe('example values of the official docs', () => {
  it('replaces example addresses, tokens and passwords, and keeps the code around them', () => {
    const text = [
      'Sign in as someone@example.org.',
      'kubeadm join --discovery-token abcdef.0123456789abcdef',
      'export DOCKER_CONTENT_TRUST_ROOT_PASSPHRASE="fake-value"',
      'password = os.getenv("DB_PASSWORD", "fake-default")',
      '  "ApiKey": "fake-key-for-test"',
      'const id = eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.abc;',
    ].join('\n');

    assert.equal(neutralizeExamples(text), [
      'Sign in as user@example.com.',
      'kubeadm join --discovery-token <example-token>',
      'export DOCKER_CONTENT_TRUST_ROOT_PASSPHRASE="<example-value>"',
      'password = os.getenv("DB_PASSWORD", "<example-value>")',
      '  "ApiKey": "<example-value>"',
      'const id = <example-jwt>;',
    ].join('\n'));
  });
  it('replaces example private keys, card numbers and phone numbers, and keeps codec strings', () => {
    const text = [
      'const pem = `-----BEGIN PRIVATE KEY-----',
      'MIIEvQIBADANBgkqhkiG9w0BAQEFAASC',
      '-----END PRIVATE KEY-----`;',
      'Test card: 5299 1234 5678 9010.',
      '<a href="tel:+0000000000">Call</a> or +44 207 1234567.',
      'codecs="vp09.00.10.08"',
      'const pemHeader = "-----BEGIN PRIVATE KEY-----";',
      'const pemFooter = "-----END PRIVATE KEY-----";',
    ].join('\n');

    assert.equal(neutralizeExamples(text), [
      'const pem = `<example-private-key>`;',
      'Test card: <example-card-number>.',
      '<a href="tel:<example-phone>">Call</a> or <example-phone>.',
      'codecs="vp09.00.10.08"',
      'const pemHeader = "-----BEGIN PRIVATE KEY-----";',
      'const pemFooter = "-----END PRIVATE KEY-----";',
    ].join('\n'));
  });
});
describe('regions and split', () => {
  it('finds a #region of C# and drops the nested marks', () => {
    assert.equal(region('#region Setup\n    var a = 1;\n#endregion\n', 'Setup'), 'var a = 1;');
  });
  it('cuts a page of more than 16 KB at its H2 headings, each part 16 KB at most', () => {
    const section = (name: string): string => `## ${name}\n\n${'Some words about valves and pumps. '.repeat(250)}`;
    const page = `# Big page\n\n${section('One')}\n\n${section('Two')}\n\n${section('Three')}`;
    const parts = splitMarkdown(page, 16_000);

    assert.ok(parts.length >= 2);
    assert.ok(parts.every((part) => bytes(part) <= 16_000));
    assert.ok(parts
      .slice(1)
      .every((part) => part.startsWith('## ')));
  });
  it('closes and reopens a code fence cut in the middle', () => {
    const code = `\`\`\`ts\n${Array.from({ length: 3000 }, (_, index) => `const value${index} = ${index};`).join('\n')}\n\`\`\``;
    const parts = splitMarkdown(`# Code\n\n${code}`, 16_000);

    assert.ok(parts.length >= 2);
    for (const part of parts) {
      assert.ok(bytes(part) <= 16_000);
      assert.equal((part.match(/^```/gm) ?? []).length % 2, 0, 'every fence is closed');
    }
  });
});
