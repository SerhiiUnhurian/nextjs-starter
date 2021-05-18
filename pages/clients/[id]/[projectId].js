import { useRouter } from 'next/router';

const ProjectPage = () => {
  const router = useRouter();

  return (
    <div>
      <h1>{`The Project #${router.query.projectId} of the Client #${router.query.id}!`}</h1>
    </div>
  );
};

export default ProjectPage;
