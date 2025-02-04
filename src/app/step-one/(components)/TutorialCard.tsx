import Link from "next/link";

interface IProps {
  title: string;
  description: string;
  slug: { current: string };
  system: string,
  subject: string
}

export default function TutorialCard({ title, description, slug, system, subject }: IProps) {
  return (
    <div className="text-white card bg-black h-full w-full shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <Link href={`/step-one/${system}/${subject}/${slug.current}`}>
            <button className="btn btn-primary">Watch tutorial</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
