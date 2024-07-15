import { client } from "@/utils/sanity/client";
import QuizCard from "./(components)/QuizCard";

interface Quiz {
  system: string;
  slug: { current: string };
}

export const revalidate = 0;

export default async function Quizes() {
  const systems = await client.fetch(`*[_type == "system"]  {
    system,
    slug { current },
  }
`);

  return (
    <div className="text-white min-h-screen bg-gray-900 px-5 sm:px-20 py-10">
      <h1 className="text-5xl font-bold text-center py-4 mb-2">Quizzes</h1>
      <div className="grid place-items-center grid-cols-1 lg:grid-cols-2 gap-4">
        {systems.map((quiz: Quiz) => (
          <QuizCard
            key={quiz.slug.current}
            title={quiz.system}
            slug={quiz.slug}
          />
        ))}
      </div>
    </div>
  );
}
