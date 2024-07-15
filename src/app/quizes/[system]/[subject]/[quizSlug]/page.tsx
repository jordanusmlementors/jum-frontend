import { client } from "@/utils/sanity/client";
import QuestionCard from "./(compoents)/QuestionCard";

export const revalidate = 0;

export default async function Quiz({ params }: { params: { system: string, subject: string, quizSlug: string } }) {

	const quiz = (await client.fetch(`*[_type == 'quizz' && slug.current == $slug][0] {
		title,
		slug,
		questions[],
	}`, { slug: params.quizSlug }));

	const answersList = quiz.questions ? quiz.questions.map((question: any) => {
		return question.correctOption;
	}) : [];

	return (
		<div className="text-white min-h-screen bg-gray-900 px-5 sm:px-20 py-10">
			<h1 className="text-5xl font-bold text-center py-4">Quiz</h1>
			<QuestionCard 
				questions={quiz.questions ? quiz.questions : []}
				answersList={answersList}
			/>
		</div>
	);
}
