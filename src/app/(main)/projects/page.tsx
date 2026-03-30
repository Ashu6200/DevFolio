'use client';
import { trpc } from '@/utils/trpc';

const ProjectPage = () => {
  const { data, isLoading } = trpc.blog.list.useQuery();

  if (isLoading) return <p>Loading...</p>;
  return (
    <ul>
      {data?.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};

export default ProjectPage;
