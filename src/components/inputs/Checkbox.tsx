import { SvgComponent } from '~/common/types/defined.types'

export interface ICheckboxProps {
  image?: SvgComponent
  checked?: boolean
  setChecked?: (status: boolean) => void
}

export function Checkbox(props: ICheckboxProps): JSX.Element {
  const { image, checked, setChecked } = props
  const ImageSVG = image
  return (
    <>
      {image && <ImageSVG />}
      <label>
        <input type="checkbox" defaultChecked={checked} onChange={() => setChecked(!checked)} />
        Check Me!
      </label>
    </>
  )
}
