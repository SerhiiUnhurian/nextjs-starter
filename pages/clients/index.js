import Link from 'next/link';

const ClientsPage = () => {
  const clients = [
    { id: 'maximus', name: 'Maxinus' },
    { id: 'hector', name: 'Hector' },
    { id: 'achilles', name: 'Achilles' },
  ];

  return (
    <div>
      <h1>The List of Clients!</h1>
      <ul>
        {clients.map(client => (
          <li key={client.id}>
            <Link
              href={{ pathname: '/clients/[id]', query: { id: client.id } }}
            >
              {client.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientsPage;
