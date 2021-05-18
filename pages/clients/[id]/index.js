import { useRouter } from 'next/router';

const ClientProjectsPage = () => {
  const router = useRouter();

  const loadProjectHandler = () => {
    // load data

    router.push(`/clients/${router.query.id}/project1`);
  };

  return (
    <div>
      <h1>{`The List of Projects of the Client #${router.query.id}!`}</h1>
      <button onClick={loadProjectHandler}>Project 1</button>
    </div>
  );
};

export default ClientProjectsPage;
