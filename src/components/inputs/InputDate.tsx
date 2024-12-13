import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components'
import ReactDatePicker from 'react-datepicker'
import { forwardRef, useState } from 'react'
import { Input, TextFieldPropsUnited } from '~/components/inputs/Input'
import { COLORS_MAP } from '~/styles/colors.map'
import { InputMasked } from '~/components/inputs/InputMasked'
import { formatISO8601ToDate } from '~/backbone/utils/formatDate.util'

export interface IInputDateProps extends TextFieldPropsUnited {
  /**
   * Handle the changed data from data picker
   * @param date
   */
  onChangeDate: (date: Date) => void

  initDate: string

  /**
   * format date field
   * By default is 'dd/MM/yyyy'
   */
  format?: string

  placeholder?: string
}

const DateInput = InputMasked('99/99/9999', Input)

/**
 * Date picker component with input possibility
 * @param props
 * @constructor
 */
export const InputDate = forwardRef(
  (props: IInputDateProps, _): JSX.Element => {
    const {
      placeholder,
      onChangeDate,
      disabled,
      initDate,
      format = 'dd/MM/yyyy',
      ...restProps
    } = props
    const [date, setDate] = useState<Date>(formatISO8601ToDate(initDate) || null)

    function handleDateChange(date: Date) {
      setDate(date)
      onChangeDate(date)
    }

    return (
      <InputWrapper>
        <ReactDatePicker
          dateFormat={format}
          closeOnScroll={true}
          selected={date}
          disabled={disabled}
          onChange={handleDateChange}
          required={false}
          showYearDropdown
          dateFormatCalendar="MMMM"
          yearDropdownItemNumber={100}
          scrollableYearDropdown
          customInput={<DateInput value={date} className="custom_input" {...restProps} />}
          placeholderText={placeholder || 'Select your birth date'}
          calendarClassName="c_calendar"
          className="c_input"
          dayClassName={() => 'c_day'}
          fixedHeight
        />
      </InputWrapper>
    )
  }
)

const InputWrapper = styled.div`
  .custom_input {
    padding: 0.4em 0.25em 0.3em;
    font-size: 15px;
    border-color: ${COLORS_MAP.standard.halfWhite};

    &:focus {
      border-bottom: solid 0.5px ${COLORS_MAP.form.border};
    }
  }

  .c_input {
    border-bottom-color: ${COLORS_MAP.standard.halfWhite};
  }

  .c_calendar {
    background-color: ${COLORS_MAP.standard.background};
    border: none;
    border-radius: 0;

    .react-datepicker__year-dropdown {
      background-color: ${COLORS_MAP.standard.backgroundNonTrans};
      border: none;
      color: ${COLORS_MAP.standard.font};
      box-shadow: 0 0 10px 0 ${COLORS_MAP.standard.shadow};

      .react-datepicker__year-option:hover {
        background-color: transparent;
        outline: 0.5px solid ${COLORS_MAP.standard.border};
        outline-offset: -0.5px;
      }
    }

    .react-datepicker__navigation-icon:before,
    .react-datepicker__year-read-view--down-arrow {
      border-color: ${COLORS_MAP.standard.border};
      border-width: 1px 1px 0 0;
    }

    .react-datepicker__year-read-view--down-arrow {
      margin-top: 3px;
    }

    .react-datepicker__year-option--selected {
      display: none;
    }

    .react-datepicker__year-option--selected_year {
      font-weight: bold;
    }

    .react-datepicker__triangle {
      display: none;
    }

    .react-datepicker__header {
      background-color: ${COLORS_MAP.standard.transparent};
      border: none;
      border-radius: 0;
      border-bottom: 0.5px solid ${COLORS_MAP.standard.border};

      .react-datepicker__current-month {
        color: ${COLORS_MAP.standard.font};
        font-weight: normal;
      }

      .react-datepicker__day-name,
      .react-datepicker__year-read-view--selected-year {
        color: ${COLORS_MAP.standard.font};
      }
    }
  }

  .c_day {
    color: ${COLORS_MAP.standard.font};

    .react-datepicker__day--today,
    .react-datepicker__day--weekend,
    &:hover,
    &.react-datepicker__day--selected {
      border-radius: 0;
      border: none;
      background-color: ${COLORS_MAP.standard.transparent};
      outline: 0.5px solid ${COLORS_MAP.standard.border};
      outline-offset: -0.5px;
    }
  }
`
