import { FC, useMemo } from "react";
import { VictoryPie, VictoryLabel } from "victory";
import { GradeData } from "../types";

interface GradeDonutProps {
  data?: GradeData;
}

const GradeDonut: FC<GradeDonutProps> = ({ data }) => {
  const chartData = useMemo(() => {
    if (!data) return [];
    return Object.entries(data).map(([grade, count]) => ({ x: grade, y: count }));
  }, [data]);

  return (
    <div>
      <VictoryPie
        colorScale={["#00897B", "#5E35B1", "#1E88E5", "#FDD835", "#D84315"]}
        labelComponent={<VictoryLabel angle={0} />}
        style={{ labels: { fontSize: 20, fill: "#FFF" } }}
        data={chartData}
      />
    </div>
  );
};

export default GradeDonut;
