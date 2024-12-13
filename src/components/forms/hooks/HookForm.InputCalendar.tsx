// import { Control, Path, useController } from 'react-hook-form'
// import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
// import styled from 'styled-components'
// import { Input, TextFieldPropsUnited } from '~/components/inputs/Input'
// import { InputCalendar } from '~/components/inputs/InputCalendar'
// import { InputMasked } from '~/components/inputs/InputMasked'
// import { formatDataToSlashString, getDateFromFormat } from '~/backbone/utils/formatDate.util'
//
// export interface IHookFormInputCalendarProps<ControlType> {
//   /**
//    * Name of field according React hook form hook generic
//    */
//   name: Path<ControlType>
//
//   /**
//    * Control value from useForm hook
//    */
//   control: Control<ControlType>
//
//   /**
//    * Validation function
//    * @param v {string | function}
//    * @see {validatePhoneNumber}
//    */
//   validate?: (v: string | undefined) => boolean | string
//
//   /**
//    * format date field
//    * By default is 'MMM dd, yyyy'
//    */
//   format?: string
//
//   disabled?: boolean
// }
//
// export function HookFormInputCalendar<T>(
//   props: IHookFormInputCalendarProps<T> &
//     Omit<TextFieldPropsUnited, 'onChange' | 'value' | 'defaultValue'>
// ): JSX.Element {
//   const {
//     name,
//     control,
//     validate,
//     required,
//     label,
//     isError,
//     errorText,
//     placeholder,
//     disabled,
//   } = props
//   const {
//     field: { value, onBlur, onChange },
//   } = useController({
//     name,
//     control,
//     rules: { required, validate: validate ? validate : () => true },
//   })
//   const [isShown, setIsShown] = useState<boolean>(false)
//   const [dateValue, setDateValue] = useState<Date | null>(null)
//
//   useEffect(() => {
//     if (value) {
//       setDateValue(getDateFromFormat(value as string, outputFormat))
//     }
//   }, [])
//
//   const handleOnChangeDate = useCallback(
//     (date: Date) => {
//       onChange(formatDataToSlashString(date))
//       setDateValue(date)
//
//       setIsShown(false)
//     },
//     [onChange, setIsShown]
//   )
//
//   const handleInputChange = useCallback(
//     (event: ChangeEvent<HTMLInputElement>) => {
//       const rawDate = event.target.value
//       onChange(rawDate)
//
//       setDateValue(getDateFromFormat(rawDate, outputFormat))
//     },
//     [onChange]
//   )
//
//   const inputRef = useRef()
//   const handleOutsideCalendarClick = useCallback(
//     (event) => {
//       if (inputRef.current === event.target) {
//         return
//       }
//       setIsShown(false)
//     },
//     [setIsShown]
//   )
//
//   return (
//     <HookInputWrapper>
//       <DateInput
//         type="text"
//         label={label}
//         placeholder={placeholder}
//         isError={isError}
//         errorText={errorText}
//         value={value as string}
//         onFocus={() => setIsShown(true)}
//         onBlur={onBlur}
//         onChange={handleInputChange}
//         ref={inputRef}
//         disabled={disabled}
//       />
//       <InputCalendar
//         onDateChanged={handleOnChangeDate}
//         isShown={isShown}
//         ref={calendarRef}
//         value={dateValue}
//       />
//     </HookInputWrapper>
//   )
// }
//
// const HookInputWrapper = styled.div`
//   position: relative;
// `
//
// const outputFormat = 'dd/MM/yyyy'
// const DateInput = InputMasked('99/99/9999', Input)
