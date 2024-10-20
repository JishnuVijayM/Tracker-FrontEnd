import React from 'react';
import { BarChart, Bar, ResponsiveContainer, LabelList, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const CustomBarChart = ({ data, totel }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend formatter={() => 'Total Days Taken'} />
                    <Bar dataKey="value" fill="#1264d8">
                        <LabelList dataKey="value" position="top" />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>

            {/* Text beside the chart */}
            <div style={{ marginLeft: '10px', fontSize: '16px', color: '#333' }}>
                Total: {totel} Days
            </div>
        </div>
    );
};

export default CustomBarChart;
