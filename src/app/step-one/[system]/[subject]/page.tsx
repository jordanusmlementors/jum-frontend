import { client } from "@/utils/sanity/client";
import Link from "next/link";
import TutorialCard from "../../(components)/TutorialCard";

export const revalidate = 0;
export default async function Quiz({ params }: { params: { system: string, subject: string } }) {
  const { tutorials } = (await client.fetch(`*[_type == 'subject' && slug.current == $subject][0] {
  "tutorials": *[_type=='tutorial' && references(^._id)] {
    title,
    description,
    slug {current},
    videos[] {
      url,
      title,
      "files": [{
        "url": files[].asset->url,
        "title": files[].asset->originalFilename,
      }]
    }
  }
}`, { subject: params.subject }));

  return (
    <div className="min-h-screen bg-gray-900 px-5 sm:px-20 py-10">
      <h1 className="text-5xl font-bold text-center py-4">{tutorials.category}</h1>
      <div className="grid place-items-start grid-cols-1 gap-4">
        {tutorials.length > 0 ? tutorials.map((tutorial: any) => (
          <TutorialCard
            key={tutorial.slug.current}
            title={tutorial.title}
            description={tutorial.description}
            slug={tutorial.slug}
            system={params.system}
            subject={params.subject}
          />
        )) : <h1 className="text-5xl font-bold text-center py-4">No Tutorials yet!</h1>}
      </div>
    </div>
  );
}
