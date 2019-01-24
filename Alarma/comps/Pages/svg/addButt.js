import React from 'react'
import Svg, { G, Ellipse } from 'expo';
const { Path } = Svg;



const SvgComponent = () => (
  <Svg viewBox="0 0 89.27 89.44" width={100} height={100}>
    <G data-name="Layer 2">
      <G data-name="Users profile">
        <Ellipse cx={44.64} cy={44.72} rx={44.64} ry={44.72} fill="#49cbc6" />
        <Path
          strokeWidth={6.95}
          fill="none"
          stroke="#4d4d4d"
          strokeMiterlimit={10}
          d="M44.64 22.84V67.6"
        />
        <Path
          strokeWidth={5.96}
          fill="none"
          stroke="#4d4d4d"
          strokeMiterlimit={10}
          d="M22.32 45.22h43.64"
        />
      </G>
    </G>
  </Svg>
)

export default SvgComponent
