import { useRouter } from 'next/router';

const PostsPage = () => {
  const router = useRouter();
  console.log(router);

  return (
    <div>
      <h1>The Blog Posts</h1>
    </div>
  );
};

export default PostsPage;
