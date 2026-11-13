import assert from 'node:assert/strict';
import {
  mkdirSync,
  mkdtempSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  describe,
  it,
} from 'node:test';
import {
  copyrightLines,
  LICENSE_FILE,
  licenseUrls,
  readLicenses,
} from './library-licenses.ts';

describe('copyright lines of a license file', () => {
  it('keeps the holder of an MIT license and drops its clauses', () => {
    const mit = 'MIT License\n\nCopyright (c) 2020 Yosuke Ota\n\nPermission is hereby granted...\n\nThe above copyright notice and this permission notice shall be included in all copies.\n';

    assert.deepEqual(copyrightLines(mit), ['Copyright (c) 2020 Yosuke Ota']);
  });
  it('drops template lines, the copyright of the license document and Markdown heading marks', () => {
    const text = '# Copyright 2023 Azat S.\nCopyright [yyyy] [name of copyright owner]\nCopyright <YEAR> <COPYRIGHT HOLDER>\nCopyright (c) 2000-2006, The Perl Foundation.\nCopyright and Related Rights\n';

    assert.deepEqual(copyrightLines(text), ['Copyright 2023 Azat S.']);
  });
  it('drops license clauses that start with (c) or with the lower-case word', () => {
    const text = '(c) You must retain, in the Source form of any Derivative Works\ncopyright and certain other rights. Our licenses are\nCopyright (c) Microsoft Corporation\n';

    assert.deepEqual(copyrightLines(text), ['Copyright (c) Microsoft Corporation']);
  });
  it('keeps a holder followed by an address or an e-mail, without the e-mail', () => {
    const text = 'Copyright OpenJS Foundation and other contributors, <www.openjsf.org>\nCopyright 2023 Azat S. <to@example.invalid>\n';

    assert.deepEqual(copyrightLines(text), [
      'Copyright OpenJS Foundation and other contributors, <www.openjsf.org>',
      'Copyright 2023 Azat S.',
    ]);
  });
  it('stops at the licenses of the dependencies that Node.js lists after its own', () => {
    const node = 'Copyright Node.js contributors. All rights reserved.\n\nThe externally maintained libraries used by Node.js are:\n\nCopyright (C) 2012 by various contributors\n';

    assert.deepEqual(copyrightLines(node), ['Copyright Node.js contributors. All rights reserved.']);
  });
  it('reads the holder an Apache license states in its appendix', () => {
    const apache = `${'Apache License\n'.repeat(60)}Copyright (c) 2015-2018 Google, Inc., Netflix, Inc., Microsoft Corp. and contributors\n`;

    assert.deepEqual(copyrightLines(apache), ['Copyright (c) 2015-2018 Google, Inc., Netflix, Inc., Microsoft Corp. and contributors']);
  });
});
describe('license files and addresses', () => {
  it('knows the names of license files and nothing else', () => {
    for (const name of [
      'LICENSE',
      'LICENSE.md',
      'LICENSE.txt',
      'LICENSE-CODE',
      'LICENSE-MIT',
      'license',
      'license.md',
      'NOTICE',
      'COPYRIGHT',
    ]) {
      assert.ok(LICENSE_FILE.test(name), name);
    }
    assert.ok(!LICENSE_FILE.test('README.md'));
    assert.ok(!LICENSE_FILE.test('licenses'));
  });
  it('gives the address of each license of an SPDX expression', () => {
    assert.deepEqual(licenseUrls('MIT OR Apache-2.0'), [
      'https://opensource.org/license/mit',
      'https://www.apache.org/licenses/LICENSE-2.0',
    ]);
    assert.deepEqual(licenseUrls('CC-BY-SA-2.5'), ['https://creativecommons.org/licenses/by-sa/2.5/']);
  });
  it('reads the license folder of each tool with its copyright lines', () => {
    const root = mkdtempSync(join(tmpdir(), 'licenses-'));

    mkdirSync(join(root, 'demo'));
    writeFileSync(join(root, 'demo', 'LICENSE'), 'Copyright (c) 2026 Demo\n');
    writeFileSync(join(root, 'demo', 'NOTICE'), 'Demo\nCopyright (c) Demo Corporation\n');
    assert.deepEqual(readLicenses(root), {
      demo: {
        files: [
          'LICENSE',
          'NOTICE',
        ],
        copyright: [
          'Copyright (c) 2026 Demo',
          'Copyright (c) Demo Corporation',
        ],
      },
    });
  });
});
