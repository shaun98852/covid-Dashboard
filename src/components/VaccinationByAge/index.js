// Write your code here

import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {vaccByAge} = props

  return (
    <div className="box">
      <h1 className="headings">Vaccination by Age</h1>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            cx="50%"
            cy="50%"
            data={vaccByAge}
            startAngel={0}
            endAngle={360}
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="Male" fill="#2d87bb" />
            <Cell name="Female" fill="#a3df9f" />
            <Cell name="Others" fill="#64c2a6" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByAge
