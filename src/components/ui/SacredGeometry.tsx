import React from 'react';

interface SacredGeometryProps {
  name: string;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

const SacredGeometry: React.FC<SacredGeometryProps> = ({
  name,
  className = "",
  size = 100,
  strokeWidth = 2,
}) => {
  let symbolSvg: JSX.Element;

  const commonSvgProps = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: strokeWidth,
    strokeLinecap: "round" as "round", // Type assertion for strokeLinecap
    strokeLinejoin: "round" as "round", // Type assertion for strokeLinejoin
  };

  const commonFillProps = {
    fill: "currentColor",
    stroke: "currentColor",
    strokeWidth: strokeWidth / 2, // Thinner stroke for fill highlight
    opacity: "0.1", // Subtle fill
  };


  switch (name) {
    case "Pentagram":
      // A simpler pentagram using a path for the outline
      // Coordinates are for a 100x100 box, will scale with `size`
      // Outer points: P1(50,5), P2(95,40), P3(75,95), P4(25,95), P5(5,40)
      const pS = size / 100; // scale factor
      const pStroke = strokeWidth;
      symbolSvg = (
        <>
          <polygon
            points={`${pS*50},${pS*5} ${pS*59.5},${pS*34.5} ${pS*90.5},${pS*34.5} ${pS*65.2},${pS*58} ${pS*72.4},${pS*90.2} ${pS*50},${pS*76} ${pS*27.6},${pS*90.2} ${pS*34.8},${pS*58} ${pS*9.5},${pS*34.5} ${pS*40.5},${pS*34.5}`}
            {...commonFillProps}
          />
          <polygon
            points={`${pS*50},${pS*5} ${pS*59.5},${pS*34.5} ${pS*90.5},${pS*34.5} ${pS*65.2},${pS*58} ${pS*72.4},${pS*90.2} ${pS*50},${pS*76} ${pS*27.6},${pS*90.2} ${pS*34.8},${pS*58} ${pS*9.5},${pS*34.5} ${pS*40.5},${pS*34.5}`}
            {...commonSvgProps}
            strokeWidth={pStroke}
          />
        </>
      );
      break;
    case "Hexagram":
      const hS = size / 100;
      const hStroke = strokeWidth;
      // Upward triangle: (50,10), (15,65), (85,65)
      // Downward triangle: (50,90), (15,35), (85,35)
      symbolSvg = (
        <>
          <polygon points={`${hS*50},${hS*10} ${hS*15},${hS*65} ${hS*85},${hS*65}`} {...commonFillProps} />
          <polygon points={`${hS*50},${hS*90} ${hS*15},${hS*35} ${hS*85},${hS*35}`} {...commonFillProps} />
          <polygon points={`${hS*50},${hS*10} ${hS*15},${hS*65} ${hS*85},${hS*65}`} {...commonSvgProps} strokeWidth={hStroke} />
          <polygon points={`${hS*50},${hS*90} ${hS*15},${hS*35} ${hS*85},${hS*35}`} {...commonSvgProps} strokeWidth={hStroke} />
        </>
      );
      break;
    case "FlowerOfLifeSegment":
      // Central circle + 6 surrounding circles
      const folR = size / 6; // Radius for each circle
      const folCx = size / 2;
      const folCy = size / 2;
      const folStroke = strokeWidth;
      symbolSvg = (
        <g>
          <circle cx={folCx} cy={folCy} r={folR} {...commonFillProps} />
          <circle cx={folCx} cy={folCy} r={folR} {...commonSvgProps} strokeWidth={folStroke} />
          {[0, 1, 2, 3, 4, 5].map(i => {
            const angle = (Math.PI / 3) * i;
            const cx = folCx + folR * Math.cos(angle);
            const cy = folCy + folR * Math.sin(angle);
            return (
              <React.Fragment key={i}>
                <circle cx={cx} cy={cy} r={folR} {...commonFillProps} />
                <circle cx={cx} cy={cy} r={folR} {...commonSvgProps} strokeWidth={folStroke} />
              </React.Fragment>
            );
          })}
        </g>
      );
      break;
    case "SriYantraPlaceholder":
      // Simplified: 3 nested triangles (alternating up/down) + outer circle
      const syS = size / 100;
      const syStroke = strokeWidth;
      symbolSvg = (
        <g>
          {/* Outer circles for boundary */}
          <circle cx={syS*50} cy={syS*50} r={syS*48} {...commonFillProps} />
          <circle cx={syS*50} cy={syS*50} r={syS*48} {...commonSvgProps} strokeWidth={syStroke} />
          <circle cx={syS*50} cy={syS*50} r={syS*40} {...commonSvgProps} strokeWidth={syStroke * 0.75} opacity="0.5" />

          {/* Central point/bindu */}
           <circle cx={syS*50} cy={syS*50} r={syS*3} fill="currentColor" stroke="none" />


          {/* Simplified Triangles (example, not accurate Sri Yantra) */}
          {/* Largest upward */}
          <polygon points={`${syS*50},${syS*10} ${syS*10},${syS*80} ${syS*90},${syS*80}`} {...commonSvgProps} strokeWidth={syStroke} />
          {/* Medium downward */}
          <polygon points={`${syS*50},${syS*90} ${syS*20},${syS*25} ${syS*80},${syS*25}`} {...commonSvgProps} strokeWidth={syStroke * 0.8} />
           {/* Smallest upward */}
          <polygon points={`${syS*50},${syS*30} ${syS*35},${syS*65} ${syS*65},${syS*65}`} {...commonSvgProps} strokeWidth={syStroke * 0.6} />
        </g>
      );
      break;
    default: // Handles single characters (sigils) or a default symbol
      if (name && name.length === 1) {
        symbolSvg = (
          <text
            x="50%"
            y="50%"
            dominantBaseline="central"
            textAnchor="middle"
            fontSize={size * 0.7} // Adjust font size relative to overall size
            fontFamily="var(--font-grimoire), symbola, sans-serif" // Use Grimoire font variable
            fill="currentColor"
            strokeWidth={strokeWidth / 4} // Thinner stroke for text
            stroke="currentColor"
          >
            {name}
          </text>
        );
      } else {
        // Default: simple spiral
        const dsS = size / 100;
        symbolSvg = (
          <path
            d={`M ${dsS*50},${dsS*50} m 0,-${dsS*40} a ${dsS*40},${dsS*40} 0 1,0 0,${dsS*80} a ${dsS*30},${dsS*30} 0 1,1 0,-${dsS*60} a ${dsS*20},${dsS*20} 0 1,0 0,${dsS*40} a ${dsS*10},${dsS*10} 0 1,1 0,-${dsS*20}`}
            {...commonSvgProps}
          />
        );
      }
      break;
  }

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {symbolSvg}
    </svg>
  );
};

export default SacredGeometry;
