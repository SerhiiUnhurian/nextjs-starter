import { Fragment } from 'react';
import path from 'path';
import fs from 'fs/promises';

const ProductDetailPage = ({ product }) => {
  return !product ? (
    // Fallback
    <p>Loading...</p>
  ) : (
    <Fragment>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </Fragment>
  );
};

async function getData() {
  const filePath = path.join(process.cwd() + '/dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export async function getStaticProps(context) {
  const { productId } = context.params;
  const data = await getData();
  const product = data.products.find(product => product.id === productId);
  const notFound = !product;

  return {
    props: {
      product: product,
    },
    revalidate: 10,
    notFound,
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map(product => product.id);
  const paths = ids.map(id => ({ params: { productId: id } }));

  return {
    paths,
    fallback: true,
  };
}

export default ProductDetailPage;
