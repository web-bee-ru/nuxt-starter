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
