import videoLinkConverter from '../../utils/video/videoLinkConverter';
import { Error } from '../../utils/video/videoLinkConverter';

export default function YoutubeIframe({ link, className }: { link: string, className: string }) {
  const videoLink = videoLinkConverter(link) === Error.NULL_VIDEO ? null : videoLinkConverter(link);

  console.log("videoLink", videoLink);

  return (
    <div className={className}>
      {videoLink ? <iframe
        className="w-full"
        height="315"
        src={videoLink as string}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe> : <h1 className="text-3xl">This tutorial does not include videos</h1>}
    </div>
  );
}
