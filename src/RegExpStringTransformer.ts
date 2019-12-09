export namespace RegExpStringTransformer {
  export function to<T>(value: RegExp|T): string|T {
    return value instanceof RegExp ? value.toString() : value;
  }

  export function from<T>(value: string|T): RegExp|string|T {
    if (typeof value !== "string") {
      return value;
    }
    const match = value.match(/^\/(.*)\/(.*)$/);
    if (match) {
      const [, pattern, flags] = match;
      return new RegExp(pattern, flags);
    } else {
      return value;
    }
  }
}
