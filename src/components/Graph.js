import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from 'recharts';

const HoldingPriceGraph = ({ stock }) => {
  const [priceHistory, setPriceHistory] = useState([]);
  const [lastAddedTime, setLastAddedTime] = useState(Date.now());

  useEffect(() => {
    if (!stock?.price) return;

    const now = Date.now();
    if (now - lastAddedTime >= 10000) { // Every 10 seconds
      const newPoint = {
        time: new Date().toISOString(),
        price: Number(stock.price),
      };
      setPriceHistory((prev) => [...prev.slice(-49), newPoint]);
      setLastAddedTime(now);
    }
  }, [stock.price, lastAddedTime]);

  const avg = Number(stock.avg);
  const latestPoint = priceHistory[priceHistory.length - 1];

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={priceHistory}>
          <CartesianGrid strokeDasharray="3 3" />

          {/* X-Axis with Label */}
          <XAxis
            dataKey="time"
            tickFormatter={(t) =>
              new Date(t).toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })
            }
          >

          </XAxis>

          {/* Y-Axis with Label */}
          <YAxis domain={['auto', 'auto']}>
            
          </YAxis>

          <Tooltip formatter={(value) => `₹${value}`} />

          {/* Line Chart */}
          <Line
            type="monotone"
            dataKey="price"
            stroke={
              latestPoint && latestPoint.price >= avg ? '#00b84e' : '#ff4d4f'
            }
            strokeWidth={2.5}
            isAnimationActive={false}
            dot={(data) =>
              data.index === priceHistory.length - 1 ? (
                <circle
                  cx={data.cx}
                  cy={data.cy}
                  r={5}
                  fill={
                    latestPoint && latestPoint.price >= avg ? '#00b84e' : '#ff4d4f'
                  }
                  stroke="#fff"
                  strokeWidth={1}
                />
              ) : null
            }
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HoldingPriceGraph;
