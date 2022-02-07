export function number(n: number) {
  if (!Number.isSafeInteger(n) || n < 0) throw new Error(`Wrong positive integer: ${n}`);
}

export function bool(b: boolean) {
  if (typeof b !== 'boolean') throw new Error(`Expected boolean, not ${b}`);
}

export function bytes(bytes: Uint8Array, ...lengths: number[]) {
  if (!(bytes instanceof Uint8Array)) throw new TypeError('Expected Uint8Array');
  if (lengths.length > 0 && !lengths.includes(bytes.length))
    throw new TypeError(`Expected Uint8Array of length ${lengths}, not of length=${bytes.length}`);
}

type Hash = {
  (data: Uint8Array): Uint8Array;
  blockLen: number;
  outputLen: number;
  create: any;
};
export function hash(hash: Hash) {
  if (typeof hash !== 'function' || typeof hash.create !== 'function')
    throw new Error('Hash should be wrapped by utils.wrapConstructor');
  number(hash.outputLen);
  number(hash.blockLen);
}

export function exists(instance: any, checkFinished = true) {
  if (instance.destroyed) throw new Error('Hash instance has been destroyed');
  if (checkFinished && instance.finished) throw new Error('Hash#digest() has already been called');
}
export function output(out: any, instance: any) {
  bytes(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error(`digestInto() expects output buffer of length at least ${min}`);
  }
}

const assert = {
  number,
  bool,
  bytes,
  hash,
  exists,
  output,
};

export default assert;
