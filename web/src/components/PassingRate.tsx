import { FC, useMemo } from "react";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory";
import { PassedData } from "../types";

interface PassingRateProps {
  data?: PassedData[];
}

const PassingRate: FC<PassingRateProps> = ({ data }) => {
  const chartData = useMemo(() => {
    if (!data) return [];
    return data.map((item) => {
      return {
        x: item.subjectName,
        y: item.passedStudentsCount,
      };
    });
  }, [data]);
  return (
    <div>
      <VictoryChart theme={VictoryTheme.material} domainPadding={10}>
        <VictoryBar style={{ data: { fill: "#c43a31" } }} data={chartData} />
      </VictoryChart>
    </div>
  );
};

export default PassingRate;
