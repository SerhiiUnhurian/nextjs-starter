import { useEffect, useState } from 'react';
import useSWR from 'swr';

const LastSalesPage = props => {
  const [sales, setSales] = useState(props.sales);

  const { data, error } = useSWR(
    'https://next-starter-bc9e6-default-rtdb.europe-west1.firebasedatabase.app/sales.json'
  );

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

  if (error) return <div>failed to load</div>;
  if (!data && !sales) return <div>loading...</div>;

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

export async function getStaticProps() {
  const response = await fetch(
    'https://next-starter-bc9e6-default-rtdb.europe-west1.firebasedatabase.app/sales.json'
  );
  const data = await response.json();
  const sales = [];

  for (const [key, value] of Object.entries(data)) {
    sales.push({
      id: key,
      username: value.username,
      amount: value.amount,
    });
  }

  return { props: { sales }, revalidate: 10 };
}
