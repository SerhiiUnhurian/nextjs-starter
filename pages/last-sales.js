import { useEffect, useState } from 'react';

const LastSalesPage = props => {
  const [sales, setSales] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetch(
      'https://next-starter-bc9e6-default-rtdb.europe-west1.firebasedatabase.app/sales.json'
    )
      .then(response => response.json())
      .then(data => {
        const sales = [];

        for (const [key, value] of Object.entries(data)) {
          sales.push({
            id: key,
            username: value.username,
            amount: value.amount,
          });
        }

        setSales(sales);
        setIsLoading(false);
      });
  }, []);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
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
