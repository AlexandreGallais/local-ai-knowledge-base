// Reads the entries of a ZIP archive with node:zlib only: XD, Word, Excel and PowerPoint files are
// ZIP archives of JSON and XML. Encrypted entries are refused, and every entry is capped once
// decompressed. Nothing from the archive is run or written by this module.
import {
  crc32,
  inflateRawSync,
} from 'node:zlib';

export interface Zip {
  names: string[];
  has: (name: string) => boolean;
  bytes: (name: string) => Buffer;
  text: (name: string) => string;
}

interface Entry {
  name: string;
  flags: number;
  method: number;
  crc: number;
  compressedSize: number;
  size: number;
  offset: number;
}

const END = 0x06_05_4B_50;
const CENTRAL = 0x02_01_4B_50;
const LOCAL = 0x04_03_4B_50;
const END_SIZE = 22;
const CENTRAL_SIZE = 46;
const LOCAL_SIZE = 30;
const ENCRYPTED = 0x41;
const BOM = new RegExp(`^${String.fromCodePoint(0xFE_FF)}`);

export const MAX_ENTRY_BYTES = 64 * 1024 * 1024;
export class ArchiveError extends Error {}

function endRecord(buffer: Buffer): number {
  for (let position = buffer.length - END_SIZE; position >= Math.max(0, buffer.length - END_SIZE - 0xFF_FF); position -= 1) {
    if (buffer.readUInt32LE(position) === END) {
      return position;
    }
  }
  throw new ArchiveError('Not a ZIP archive, or a damaged one.');
}

function readEntries(buffer: Buffer): Entry[] {
  const end = endRecord(buffer);
  const count = buffer.readUInt16LE(end + 10);
  const entries: Entry[] = [];
  let position = buffer.readUInt32LE(end + 16);

  if (count === 0xFF_FF || position === 0xFF_FF_FF_FF) {
    throw new ArchiveError('ZIP64 archive (over 4 GB or 65,535 entries): not read.');
  }
  for (let index = 0; index < count; index += 1) {
    if (position + CENTRAL_SIZE > buffer.length || buffer.readUInt32LE(position) !== CENTRAL) {
      throw new ArchiveError('Damaged ZIP archive: its directory cannot be read.');
    }
    const nameLength = buffer.readUInt16LE(position + 28);

    entries.push({
      name: buffer.toString('utf8', position + CENTRAL_SIZE, position + CENTRAL_SIZE + nameLength),
      flags: buffer.readUInt16LE(position + 8),
      method: buffer.readUInt16LE(position + 10),
      crc: buffer.readUInt32LE(position + 16),
      compressedSize: buffer.readUInt32LE(position + 20),
      size: buffer.readUInt32LE(position + 24),
      offset: buffer.readUInt32LE(position + 42),
    });
    position += CENTRAL_SIZE + nameLength + buffer.readUInt16LE(position + 30) + buffer.readUInt16LE(position + 32);
  }
  return entries;
}

function content(buffer: Buffer, entry: Entry): Buffer {
  if (entry.size > MAX_ENTRY_BYTES) {
    throw new ArchiveError(`Entry too large: ${entry.name} (${entry.size} bytes).`);
  }
  if (buffer.readUInt32LE(entry.offset) !== LOCAL) {
    throw new ArchiveError(`Damaged entry: ${entry.name}.`);
  }
  const start = entry.offset + LOCAL_SIZE + buffer.readUInt16LE(entry.offset + 26) + buffer.readUInt16LE(entry.offset + 28);
  const raw = buffer.subarray(start, start + entry.compressedSize);

  if (entry.method !== 0 && entry.method !== 8) {
    throw new ArchiveError(`Compression method ${entry.method} of ${entry.name} is not read.`);
  }
  const data = entry.method === 0 ? raw : inflateRawSync(raw, { maxOutputLength: MAX_ENTRY_BYTES });

  if (crc32(data) !== entry.crc) {
    throw new ArchiveError(`Damaged entry: ${entry.name} (checksum mismatch).`);
  }
  return data;
}

export function openZip(buffer: Buffer): Zip {
  const entries = readEntries(buffer);
  const encrypted = entries.find((entry) => (entry.flags & ENCRYPTED) !== 0);

  if (encrypted !== undefined) {
    throw new ArchiveError(`Encrypted entry: ${encrypted.name}. Ask the user for a copy without a password.`);
  }
  const byName = new Map(entries.map((entry) => [
    entry.name,
    entry,
  ]));
  const bytes = (name: string): Buffer => {
    const entry = byName.get(name);

    if (entry === undefined) {
      throw new ArchiveError(`Entry not found: ${name}.`);
    }
    return content(buffer, entry);
  };

  return {
    names: entries.map((entry) => entry.name),
    has: (name) => byName.has(name),
    bytes,
    text: (name) => bytes(name)
      .toString('utf8')
      .replace(BOM, ''),
  };
}

export function isZip(buffer: Buffer): boolean {
  return buffer.length >= 4 && buffer.readUInt32LE(0) === LOCAL;
}
