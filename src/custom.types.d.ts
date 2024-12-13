declare module '*.svg' {
  // import React = require('react')
  import { SvgComponent } from '~/common/types/defined.types'

  // export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  export const ReactComponent: SvgComponent

  const src: string
  export default src
}
