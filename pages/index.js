import path from 'path';
import fs from 'fs/promises';

export default function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd() + '/dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: data,
    revalidate: 10,
  };
}
