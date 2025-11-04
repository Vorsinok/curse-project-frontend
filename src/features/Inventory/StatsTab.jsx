import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
export default function StatsTab() {
  const data = [{ name:"2022", value:3 }, { name:"2023", value:8 }, { name:"2024", value:5 }];
  return (
    <div className="h-64 bg-white dark:bg-gray-800 rounded p-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
