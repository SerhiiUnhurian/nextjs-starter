import { useRouter } from 'next/router';

const PortfolioPage = () => {
  const router = useRouter();

  return (
    <div>
      <h1>{`The Portfolio Page №${router.query.id}!`}</h1>
    </div>
  );
};

export default PortfolioPage;
