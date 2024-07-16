"use client"
import styles from './chart.module.css'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const data = [
  {
    name: "Sun",
     "brokers-visit": 10,
    Achievements: 4,
  },
  {
    name: "Mon",
     "brokers-visit": 12,
    Achievements: 6,
  },
  {
    name: "Tue",
     "brokers-visit": 10,
    Achievements: 8,
  },
  {
    name: "Wed",
     "brokers-visit": 15,
    Achievements: 10,
  },
  {
    name: "Thu",
     "brokers-visit": 16,
    Achievements: 11,
  },
  {
    name: "Fri",
     "brokers-visit": 20,
    Achievements: 10,
  },
  {
    name: "Sat",
     "brokers-visit": 18,
    Achievements: 9,
  },
];

const Chart = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Weekly Recap</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{background:"#151c2c", border:"none"}}/>
          <Legend />
          <Line type="monotone" dataKey="Achievements" stroke="#8884d8" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="brokers-visit" stroke="#82ca9d" strokeDasharray="3 4 5 2" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart