import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";

// USA GeoJSON can be imported from a URL or file
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

interface LocationData {
  name: string;
  value: number;
  coordinates: [number, number];
}

interface SalesMapChartProps {
  data: LocationData[];
}

const SalesMapChart: React.FC<SalesMapChartProps> = ({ data }) => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  // Create a scale for the marker size based on sales values
  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));

  const sizeScale = scaleLinear().domain([minValue, maxValue]).range([5, 20]);

  const colorScale = scaleLinear<string>()
    .domain([minValue, maxValue])
    .range(["#10b981", "#8b5cf6"]);

  return (
    <div className="h-full flex flex-col relative">
      <div className="flex-1 rounded-lg relative">
        <ComposableMap
          projection="geoAlbersUsa"
          projectionConfig={{ scale: 800 }}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
          }}
        >
          <ZoomableGroup>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#1e1e1e"
                    stroke="#333"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", fill: "#2a2a2a" },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* Plot sales locations with scaled markers */}
            {data.map((location, index) => (
              <Marker
                key={`marker-${index}`}
                coordinates={location.coordinates}
                onMouseEnter={(e) => {
                  setTooltipContent(
                    `${location.name}: $${location.value.toLocaleString()}`
                  );
                  setTooltipPosition({
                    x: e.clientX,
                    y: e.clientY,
                  });
                  setShowTooltip(true);
                }}
                onMouseLeave={() => {
                  setShowTooltip(false);
                }}
              >
                <circle
                  r={sizeScale(location.value)}
                  fill={colorScale(location.value)}
                  opacity={0.8}
                  stroke="#fff"
                  strokeWidth={0.5}
                  className="drop-shadow-glow cursor-pointer"
                  style={{ transition: "all 0.3s ease" }}
                />
                <text
                  textAnchor="middle"
                  y={-10}
                  style={{
                    fontFamily: "system-ui",
                    fontSize: 8,
                    fill: "#fff",
                    pointerEvents: "none",
                    opacity: 0.7,
                  }}
                >
                  {location.name}
                </text>
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>

        {/* Custom tooltip */}
        {showTooltip && (
          <div
            className="absolute z-10 px-3 py-2 text-xs text-white bg-black/80 backdrop-blur-md rounded-md shadow-lg pointer-events-none border border-white/10"
            style={{
              top: tooltipPosition.y - 100,
              left: tooltipPosition.x - 100,
              transform: "translate(-50%, -100%)",
            }}
          >
            {tooltipContent}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="p-2 bg-background/20 backdrop-blur-sm rounded-md mt-2 flex items-center justify-between">
        <div className="text-xs font-medium">Top Sales by Location</div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
          <span className="text-xs text-muted-foreground">Low</span>
          <span className="w-2 h-2 rounded-full bg-[#8b5cf6]"></span>
          <span className="text-xs text-muted-foreground">High</span>
        </div>
      </div>
    </div>
  );
};

export default SalesMapChart;
