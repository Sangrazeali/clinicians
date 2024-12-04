import { ResponsivePie } from "@nivo/pie";

const PieChart = ({ balance, total }: { balance: number; total: number }) => {
  const data = [
    {
      id: "balance",
      label: "Balance",
      value: balance,
      color: "#1C6DC1",
    },
    {
      id: "total",
      label: "Total",
      value: total,
      color: "#FFCC00",
    },
  ];
  return (
    <>
      <section className="h-[195px] w-[195px] mx-auto border border-[E6E6E6] p-1  rounded-full">
        <ResponsivePie
          data={data}
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          innerRadius={0}
          padAngle={1.5}
          cornerRadius={4}
          activeOuterRadiusOffset={10}
          colors={[data[0].color, data[1].color]}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          enableArcLinkLabels={false}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          enableArcLabels={false}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
          legends={[]}
        />
      </section>
    </>
  );
};

export default PieChart;
