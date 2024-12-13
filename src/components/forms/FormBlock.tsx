import styled from 'styled-components'
import { COLORS_MAP } from '~/styles/colors.map'

export const FormBlock = styled.div`
  width: 50%;
  max-width: 420px;
  min-width: 300px;
  margin: 20px auto 0;
  padding: 30px;
  text-align: center;
  background-color: ${COLORS_MAP.form.background};
  border: 0.5px solid ${COLORS_MAP.form.border};
  background-clip: padding-box;

  @media (max-width: 700px) {
    padding: 30px 15px;
  }
`
