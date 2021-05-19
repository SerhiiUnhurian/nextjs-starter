import { Fragment } from 'react';
import path from 'path';
import fs from 'fs/promises';

const ProductDetailPage = ({ product }) => {
  return (
    <Fragment>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </Fragment>
  );
};

export async function getStaticProps(context) {
  const { productId } = context.params;
  const filePath = path.join(process.cwd() + '/dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
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
  return {
    paths: [{ params: { productId: 'p1' } }],
    fallback: 'blocking',
  };
}

export default ProductDetailPage;
