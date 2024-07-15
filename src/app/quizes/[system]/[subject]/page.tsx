import { client } from "@/utils/sanity/client";
import Link from "next/link";

export const revalidate = 0;
export default async function Quiz({ params }: { params: { system: string, subject: string } }) {
	const {quizzes} = (await client.fetch(`*[_type == 'subject' && slug.current == $subject][0] {
	  "quizzes": *[_type=='quizz' && references(^._id)] {
	    title,
	    slug {current}
	  }
	}`, { subject: params.subject }));

	console.log(quizzes);

	return (
		<div className="min-h-screen bg-gray-900 px-5 sm:px-20 py-10">
			<h1 className="text-5xl font-bold text-center py-4">{quizzes.category}</h1>
			<div className="grid place-items-start grid-cols-1 gap-4">
				{quizzes.length > 0 ? quizzes.map((quiz: any) => (
					<div key={quiz.slug.current} className="card bg-blue-950 w-full shadow-xl p-4 my-2">
						<h3 className="text-3xl font-bold mb-3 text-center">{quiz.title}</h3>
						<Link className="btn btn-primary" href={`/quizes/${params.system}/${params.subject}/${quiz.slug.current}`}>Attempt Quiz</Link>
					</div>
				)) : <h1 className="text-5xl font-bold text-center py-4">No Quizzes yet!</h1>}
			</div>
		</div>
	);
}
