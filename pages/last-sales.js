import { useEffect, useState } from 'react';
import useSWR from 'swr';

const LastSalesPage = () => {
  const [sales, setSales] = useState();

  const { data, error } = useSWR(
    'https://next-starter-bc9e6-default-rtdb.europe-west1.firebasedatabase.app/sales.json'
  );

  if (error) return <div>failed to load</div>;
  if (!data || !sales) return <div>loading...</div>;

  useEffect(() => {
    if (data) {
      const sales = [];

      for (const [key, value] of Object.entries(data)) {
        sales.push({
          id: key,
          username: value.username,
          amount: value.amount,
        });
      }
      setSales(sales);
    }
  }, [data]);

  return (
    <ul>
      {sales.map(({ id, username, amount }) => (
        <li key={id}>
          {username} - {amount} units.
        </li>
      ))}
    </ul>
  );
};

export default LastSalesPage;
