// @DOC: Used to annotate extra fields on Vue instances.
//       Use cases:
//         - Annotating Nuxt `asyncData`, because currently its return type is not merged into `this`.
//         - Annotating non-reactive fields.
// @EXAMPLE:
//   type AsyncData = {
//     fromAsyncData: number;
//   };
//   export default defineComponent({
//     async asyncData(): Promise<AsyncData> {
//       return {
//         fromAsyncData: 1,
//       };
//     },
//     data() {
//       return withCustomFields<AsyncData>()({
//         fromData: 2,
//       });
//     },
//   });
export function withCustomFields<TCustomFields>() {
  return <TData>(data: TData) => data as TData & TCustomFields;
}

// @DOC: Parse a regular (not +/- Infinity, not NaN) number from a string, if possible.
// @Example
//   parseRegularNumber(undefined) -> undefined
//   parseRegularNumber('') -> null (blank)
//   parseRegularNumber('\t') -> null (blank)
//   parseRegularNumber('a') -> null (NaN)
//   parseRegularNumber('--99') -> null (NaN)
//   parseRegularNumber('Infinity') -> null (+/- Infinity)
//   parseRegularNumber('0') -> 0
//   parseRegularNumber('-0') -> -0
//   parseRegularNumber('1') -> 1
//   parseRegularNumber('00011') -> 11
export function parseRegularNumber(raw: string | null | undefined): number | null | undefined {
  if (raw == null) return raw;
  if (raw.trim() === '') return null;
  const parsed = Number(raw);
  if (isNaN(parsed)) return null;
  if (isFinite(parsed)) return parsed;
  else return null;
}

// @DOC: Type guard to tell if value is NotNullable. Useful for type narrowing.
// @EXAMPLE:
//   const ns = [0, 1, null, undefined].filter(isNonNullable); // @NOTE: ns will be `number[]`
// @EXAMPLE:
//   function strict(n: number): void {
//     // Do stuff
//   }
//   function lax(n: number | null | undefined): void {
//     if (!isNonNullable(n)) return;
//     strict(n); // @NOTE: n is narrowed to `number`
//   }
export function isNonNullable<T>(value: T): value is NonNullable<T> {
  return value != null;
}
