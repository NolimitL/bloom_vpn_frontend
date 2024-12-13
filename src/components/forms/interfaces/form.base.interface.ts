/**
 * Common form props used by each form
 * Style example how to use the interface
 *    @example  when there are few extra props
 *      interface IabcProps extends IFromBase<[from data type]>{
 *        a: string
 *        b: number
 *      }
 *    @example  when there are no extra props
 *      const AbcPropsType = IFromBase<[from data type]>
 *
 */
export interface IFormBase<T> {
  onSubmit: (data: T) => void
  initialData?: Partial<T>
}
