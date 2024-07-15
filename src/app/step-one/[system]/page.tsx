import { client } from "@/utils/sanity/client";
import Link from "next/link";

export const revalidate = 0;

export default async function System({ params }: { params: { system: string } }) {
  const { subjects } = (await client.fetch(`*[_type == 'system' && slug.current == $system][0] {
    "subjects": *[_type=='subject' && references(^._id)] {
      title,
      slug {current}
    }
  }`, { system: params.system }));

  return (
    <div className="min-h-screen bg-gray-900 px-5 sm:px-20 py-10 text-white">
      {subjects ? subjects.map((subject: { title: string, slug: { current: string } }) => (
        <Link href={`/step-one/${params.system}/${subject.slug.current}`} key={subject.slug.current}>
          <h1 className="rounded-lg bg-blue-950 w-full shadow-xl p-4 my-2 text-5xl text-center py-4">{subject.title}</h1>
        </Link>
      )) : <h1 className="text-5xl font-bold text-center py-4">No Subjects</h1>}
    </div>
  );
}

