import { PieChart, Pie, ResponsiveContainer, Legend,Tooltip } from 'recharts';

function CustomPieChart({data}) {

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ResponsiveContainer>
                <PieChart>
                <Tooltip />
                    <Pie
                        dataKey="value"
                        data={data}
                        label
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        isAnimationActive={true}
                        minAngle={3} // Ensures a minimum slice angle for values of 0
                    />
                    <Legend
                        layout="vertical"
                        align="right"
                        verticalAlign="middle"
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default CustomPieChart;
