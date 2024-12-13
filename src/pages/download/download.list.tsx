import styled from 'styled-components'
import { Radio, RadioGroup } from 'react-radio-group'
import { useState } from 'react'
import { BorderedButton } from '~/components/buttons/Button'
import { PLATFORMS } from '~/static/platfroms.static'
import { COLORS_MAP } from '~/styles/colors.map'

export function DownloadList(): JSX.Element {
  const [platform, setPlatform] = useState<string>(null)

  function handleRadioChange(value) {
    setPlatform(value)
  }

  function downloadApp() {
    if (platform) {
      const link = PLATFORMS.find((plf) => plf.value === platform)?.link
      window.open(link, '_blank')
    }
  }

  return (
    <ListWrapper>
      <Label>
        We sent to you email with an access key
        <p>Now choose your OS system and put your key there</p>
      </Label>
      <RadioGroupWrapper name="platform" selectedValue={platform} onChange={handleRadioChange}>
        {PLATFORMS.map((plt, idx) => (
          <RadioWrapper
            className={platform == plt.value ? 'checked' : ''}
            id={idx + '_rw'}
            onClick={() => setPlatform(plt.value)}
          >
            <plt.img className="icon" />
            <CustomRadio id={idx + '_r'} value={plt.value} checked={platform == plt.value} />
            <label htmlFor={idx + '_r'} className="radio-label">
              {plt.title}
            </label>
          </RadioWrapper>
        ))}
      </RadioGroupWrapper>
      <BorderedButton disabled={!platform} type="button" onClick={downloadApp}>
        Download App
      </BorderedButton>
    </ListWrapper>
  )
}

const Label = styled.div`
  font-size: 16px;
`

// const ImageWrapper = styled.img``

const ListWrapper = styled.div`
  width: 100%;
  margin-top: 50px;
  padding: 0 30px;
  text-align: center;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  row-gap: 40px;

  @media (max-width: 500px) {
    padding-bottom: 30px;
  }
`

const RadioGroupWrapper = styled(RadioGroup)`
  max-width: 400px;
  display: inline-grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  column-gap: 10px;
  row-gap: 10px;

  .radio-label {
    //display: table-cell;
    //vertical-align: middle;
    width: 100px;
    text-align: center;
    cursor: pointer;
    color: white;
    //padding: 5px 10px;
    border-radius: 3px;
  }

  @media (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }
`

const RadioWrapper = styled.div`
  width: 120px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  border: 0.5px solid ${COLORS_MAP.standard.border};
  cursor: pointer;

  .icon {
    width: 70px;
    height: 100px;
  }

  &.checked {
    background-color: ${COLORS_MAP.conversely.background};

    .radio-label {
      color: ${COLORS_MAP.conversely.font};
      font-weight: 400;
    }

    .icon {
      fill: ${COLORS_MAP.conversely.font};
    }
  }
`

const CustomRadio = styled(Radio)`
  visibility: hidden;
  height: 0;
  width: 0;
  margin: 0;
`
