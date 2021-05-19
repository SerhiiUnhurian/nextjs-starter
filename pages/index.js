import path from 'path';
import fs from 'fs/promises';
import Link from 'next/link';

export default function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd() + '/dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  const notFound = !data;

  return {
    props: data,
    revalidate: 10,
    notFound,
  };
}
