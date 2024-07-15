import Link from "next/link";

interface IProps {
  title: string;
  slug: { current: string };
}

export default function SystemCard({ title, slug }: IProps) {
  return (
    <div className="text-white card bg-black h-full w-full shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="card-actions justify-end">
          <Link href={`/step-one/${slug.current}`}>
            <button className="btn btn-primary">Go To System</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
