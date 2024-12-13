import styled from 'styled-components'
import { ReactComponent as IconLoading } from '~/assets/loading-circle-dashed-big.svg'

export interface ILoadingProps {
  visible?: boolean
}

/**
 *
 * @param props
 * @constructor
 */
export function Loading(props: ILoadingProps): JSX.Element {
  const { visible = true } = props

  return (
    <>
      {visible && (
        <LoadingWrapper>
          <IconLoading />
        </LoadingWrapper>
      )}
    </>
  )
}

const LoadingWrapper = styled.div`
  width: 100%;
  height: 50px;
  text-align: center;
  margin: 10px 0;
`
