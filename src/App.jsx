import { useState, useEffect } from 'react';

export default function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=8&page=1&sparkline=false')
      .then(res => res.json())
      .then(data => {
        setCoins(data);
        setLoading(false);
      })
      .catch(err => console.error("Failed to fetch data:", err));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-8 font-sans">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-blue-400">Live Crypto Markets</h1>
        <p className="text-gray-400 mt-2">Real-time pricing dashboard</p>
      </header>
      
      {loading ? (
        <p className="text-center text-gray-400 animate-pulse text-xl">Fetching live data...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coins.map(coin => (
            <div key={coin.id} className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 flex flex-col items-center hover:scale-105 transition-transform duration-200">
              <img src={coin.image} alt={coin.name} className="w-16 h-16 mb-4 object-contain" />
              <h2 className="text-xl font-bold mt-2">{coin.name}</h2>
              <span className="text-gray-500 uppercase text-sm font-semibold tracking-wider mb-4">{coin.symbol}</span>
              <p className="text-2xl font-mono text-green-400 font-bold">${coin.current_price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
