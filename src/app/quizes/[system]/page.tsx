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
      <h1 className="text-5xl font-bold text-center py-4">Subjets</h1>
      <div className="grid place-items-start grid-cols-1 gap-4 md:grid-cols-2">
        {subjects ? subjects.map((subject: { title: string, slug: { current: string } }) => (
          <div className="my-2 text-white card bg-black h-full w-full shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{subject.title}</h2>
              <div className="card-actions justify-end">
                <Link className="btn btn-primary" href={`/quizes/${params.system}/${subject.slug.current}`} key={subject.slug.current}>Buy Now</Link>
              </div>
            </div>
          </div>
        )) : <h1 className="text-5xl font-bold text-center py-4">No Subjects</h1>}
      </div>
    </div>
  );
}

