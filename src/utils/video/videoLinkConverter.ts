// required link format https://www.youtube.com/embed/[video_id]?si=TipNK-tholn1K98R

export enum Error {
	NULL_VIDEO
}

export default function videoLinkConverter(link: string): string | Error {
	if (link)
		if (link.startsWith('https://youtu.be')) {
			return `https://www.youtube.com/embed/${link.split('/').pop()}?rel=0&showinfo=0&iv_load_policy=3`;
		} else if (link.startsWith('https://www.youtube.com/watch')) {
			return `https://www.youtube.com/embed/${link.substring(link.search(/=/gm) + 1)}?rel=0&showinfo=0&iv_load_policy=3`;
		}

	return Error.NULL_VIDEO;
}
