// Tests of the container templates of the base: the dev container declares its image, its check
// tools and its creation commands; the image templates keep the rules of docs/containers/.
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  chmodSync,
  existsSync,
  mkdtempSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import {
  dirname,
  join,
} from 'node:path';
import {
  describe,
  it,
} from 'node:test';
import { fileURLToPath } from 'node:url';
import { parseJsonc } from './jsonc.ts';

const TEMPLATES = join(dirname(fileURLToPath(import.meta.url)), '..', 'code', 'templates', 'containers');
const CHECK_TOOLS = [
  'hadolint',
  'kubeconform',
  'kube-linter',
  'helm',
];

function read(path: string): string {
  return readFileSync(join(TEMPLATES, path), 'utf8');
}

interface DevContainer {
  build?: {
    dockerfile?: string;
    context?: string;
    args?: Record<string, string>;
  };
  remoteUser?: string;
  onCreateCommand?: string;
  updateContentCommand?: Record<string, string>;
}

function devContainer(): DevContainer {
  return parseJsonc(read('devcontainer/devcontainer.json')) as DevContainer;
}

// The shell command of the RUN instruction guarded by EXTRACT_TOOLS.
function extractToolsBlock(dockerfile: string): string {
  const start = dockerfile.indexOf('RUN if [ "$EXTRACT_TOOLS"');
  const end = dockerfile.indexOf('\n    fi', start) + '\n    fi'.length;

  return dockerfile
    .slice(start + 'RUN '.length, end)
    .replaceAll('\\\n', ' ');
}

// Runs the command with apt-get and rm replaced by stubs that only log their arguments.
function runWithStubs(command: string, extractTools: string): string {
  const stubs = mkdtempSync(join(tmpdir(), 'stubs-'));
  const log = join(stubs, 'calls.log');

  for (const name of [
    'apt-get',
    'rm',
  ]) {
    writeFileSync(join(stubs, name), `#!/bin/sh\necho "${name} $*" >> "${log}"\n`);
    chmodSync(join(stubs, name), 0o755);
  }
  const result = spawnSync(
    'sh',
    [
      '-c',
      command,
    ],
    {
      env: {
        PATH: `${stubs}:/usr/bin:/bin`,
        EXTRACT_TOOLS: extractTools,
      },
    },
  );

  assert.equal(result.status, 0);
  return existsSync(log) ? readFileSync(log, 'utf8') : '';
}

describe('JSON with comments', () => {
  it('removes comments but keeps a // inside a string', () => {
    const text = '{\n  // comment\n  "url": "a//b", /* block */ "n": 1\n}';

    assert.deepEqual(parseJsonc(text), {
      url: 'a//b',
      n: 1,
    });
  });
});
describe('dev container template', () => {
  it('is valid JSON with comments that builds its image from the Dockerfile of the folder', () => {
    const config = devContainer();

    assert.equal(config.build?.dockerfile, 'Dockerfile');
    assert.equal(config.build.context, '.');
    assert.match(read('devcontainer/Dockerfile'), /^FROM mcr\.microsoft\.com\/dotnet\/sdk:\$\{DOTNET_VERSION\}$/m);
  });
  it('puts the check tools in the image and checks them in its creation command', () => {
    const config = devContainer();
    const dockerfile = read('devcontainer/Dockerfile');

    assert.match(dockerfile, /^COPY tools\/ \/usr\/local\/bin\/$/m);
    for (const tool of CHECK_TOOLS) {
      assert.ok(config.onCreateCommand?.includes(tool), `onCreateCommand checks ${tool}`);
      assert.ok(dockerfile.includes(tool), `the Dockerfile names ${tool}`);
    }
  });
  it('installs the coding assistant in the image and runs as a non-root user', () => {
    const dockerfile = read('devcontainer/Dockerfile');

    assert.match(dockerfile, /npm install --global "\$ASSISTANT_PACKAGE"/);
    assert.match(dockerfile, /^USER app$/m);
    assert.equal(devContainer().remoteUser, 'app');
  });
  it('installs Poppler and Tesseract in English and French, unless EXTRACT_TOOLS is false', () => {
    const block = extractToolsBlock(read('devcontainer/Dockerfile'));
    const installed = runWithStubs(block, 'true');

    assert.match(read('devcontainer/Dockerfile'), /^ARG EXTRACT_TOOLS=true$/m);
    assert.match(installed, /^apt-get install --yes --no-install-recommends poppler-utils tesseract-ocr tesseract-ocr-eng tesseract-ocr-fra$/m);
    assert.equal(runWithStubs(block, 'false'), '');
    assert.equal(devContainer().build?.args?.EXTRACT_TOOLS, 'true');
  });
  it('restores the .NET and npm dependencies in updateContentCommand', () => {
    const commands = Object
      .values(devContainer().updateContentCommand ?? {})
      .join(' && ');

    assert.match(commands, /dotnet restore/);
    assert.match(commands, /dotnet tool restore/);
    assert.match(commands, /npm ci/);
  });
});
describe('image templates', () => {
  it('builds .NET in two stages and runs as a non-root user on port 8080', () => {
    const dockerfile = read('dotnet.Dockerfile');

    assert.equal(dockerfile.match(/^FROM /gm)?.length, 2);
    assert.match(dockerfile, /^COPY --from=build /m);
    assert.match(dockerfile, /^USER \$APP_UID$/m);
    assert.match(dockerfile, /^EXPOSE 8080$/m);
    assert.match(dockerfile, /^ENTRYPOINT \["dotnet", "Api\.dll"\]$/m);
  });
  it('serves the browser folder of Angular with an unprivileged NGINX on port 8080', () => {
    assert.match(read('angular.Dockerfile'), /dist\/web\/browser /);
    assert.match(read('angular.Dockerfile'), /nginx\/nginx-unprivileged/);
    assert.match(read('nginx.conf'), /listen 8080;/);
  });
  it('gives the Service the selector and the port of the Deployment', () => {
    const manifest = read('deployment.yaml');

    assert.match(manifest, /containerPort: 8080/);
    assert.match(manifest, /targetPort: 8080/);
    assert.equal(manifest.match(/app\.kubernetes\.io\/name: api/g)?.length, 5);
    assert.doesNotMatch(manifest, /:latest/);
  });
});
