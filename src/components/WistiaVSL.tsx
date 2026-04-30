import { useEffect, useRef } from "react";

declare global {
  interface Window {
    _wq?: Array<Record<string, unknown>>;
  }
}

const MEDIA_ID = "ce8xlzzk5w";

interface Props {
  onReveal: () => void;
}

export function WistiaVSL({ onReveal }: Props) {
  const triggered = useRef(false);

  useEffect(() => {
    const ensureScript = (src: string, id: string) => {
      if (document.getElementById(id)) return;
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.id = id;
      document.body.appendChild(s);
    };
    ensureScript(
      `https://fast.wistia.com/embed/medias/${MEDIA_ID}.jsonp`,
      `wistia-jsonp-${MEDIA_ID}`,
    );
    ensureScript(
      "https://fast.wistia.com/assets/external/E-v1.js",
      "wistia-e-v1",
    );

    window._wq = window._wq || [];
    window._wq.push({
      id: MEDIA_ID,
      onReady: (video: any) => {
        try {
          video.unmute();
          video.volume(1);
        } catch {
          // ignore — autoplay policy may keep it muted until user interaction
        }
        video.bind("timechange", (t: number) => {
          const dur = video.duration();
          if (!triggered.current && dur && dur - t <= 15) {
            triggered.current = true;
            onReveal();
          }
        });
        video.bind("end", () => {
          if (!triggered.current) {
            triggered.current = true;
            onReveal();
          }
        });
      },
    });
  }, [onReveal]);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-background">
      <div
        className={`wistia_embed wistia_async_${MEDIA_ID} videoFoam=true autoPlay=false playButton=true smallPlayButton=true fullscreenButton=false settingsControl=false playbackRateControl=false qualityControl=false`}
        style={{ height: "100%", width: "100%", position: "relative" }}
      >
        &nbsp;
      </div>
    </div>
  );
}