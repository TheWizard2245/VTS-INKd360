"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Measured from public/images/wheel-template.png (6900x6900 square):
// white ring spans ~x71-6872 (outer radius ratio) and the black hub spans ~x2637-4363 (inner radius ratio).
const OUTER_R_RATIO = 0.493;
const INNER_R_RATIO = 0.125;
const CANVAS_SIZE = 640;

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (dataUrl: string) => void;
  initialPreview?: string;
};

export default function WheelCustomizer({ open, onClose, onSave, initialPreview }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const templateImgRef = useRef<HTMLImageElement | null>(null);
  const uploadImgRef = useRef<HTMLImageElement | null>(null);
  const [hasUpload, setHasUpload] = useState(false);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragState = useRef<{ dragging: boolean; lastX: number; lastY: number }>({
    dragging: false,
    lastX: 0,
    lastY: 0,
  });

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const template = templateImgRef.current;
    if (!canvas || !template) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.drawImage(template, 0, 0, CANVAS_SIZE, CANVAS_SIZE);

    const upload = uploadImgRef.current;
    if (upload) {
      const cx = CANVAS_SIZE / 2;
      const cy = CANVAS_SIZE / 2;
      const outerR = CANVAS_SIZE * OUTER_R_RATIO;
      const innerR = CANVAS_SIZE * INNER_R_RATIO;

      ctx.save();
      const clip = new Path2D();
      clip.arc(cx, cy, outerR, 0, Math.PI * 2);
      clip.arc(cx, cy, innerR, 0, Math.PI * 2);
      ctx.clip(clip, "evenodd");

      const coverScale = Math.max(CANVAS_SIZE / upload.width, CANVAS_SIZE / upload.height) * scale;
      const drawW = upload.width * coverScale;
      const drawH = upload.height * coverScale;
      const drawX = cx - drawW / 2 + offset.x;
      const drawY = cy - drawH / 2 + offset.y;
      ctx.drawImage(upload, drawX, drawY, drawW, drawH);
      ctx.restore();
    }
  }, [scale, offset]);

  // load template once
  useEffect(() => {
    const img = new Image();
    img.src = "/images/wheel-template.png";
    img.onload = () => {
      templateImgRef.current = img;
      draw();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // restore prior preview's source image if reopened (best-effort: just show blank ring again, user re-uploads if they want to edit)
  useEffect(() => {
    if (open) {
      draw();
    }
  }, [open, draw]);

  useEffect(() => {
    draw();
  }, [scale, offset, draw]);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        uploadImgRef.current = img;
        setHasUpload(true);
        setScale(1);
        setOffset({ x: 0, y: 0 });
        draw();
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!hasUpload) return;
    dragState.current = { dragging: true, lastX: e.clientX, lastY: e.clientY };
    (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragState.current.dragging) return;
    const dx = e.clientX - dragState.current.lastX;
    const dy = e.clientY - dragState.current.lastY;
    dragState.current.lastX = e.clientX;
    dragState.current.lastY = e.clientY;
    setOffset((o) => ({ x: o.x + dx, y: o.y + dy }));
  };
  const onPointerUp = () => {
    dragState.current.dragging = false;
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    onSave(canvas.toDataURL("image/png"));
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">
      <div className="bg-panel border border-line rounded-sm max-w-3xl w-full p-6 md:p-8 max-h-[92vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <span className="inline-block font-mono text-xs uppercase tracking-wide text-blue border border-blue rounded-full px-3 py-1 mb-3">
              Custom Wheel Preview
            </span>
            <h3 className="text-2xl md:text-3xl">See Your Graphic on the INKd 360</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-steel hover:text-paper text-2xl leading-none cursor-pointer"
          >
            &times;
          </button>
        </div>
        <p className="text-steel text-sm mb-5 max-w-[60ch]">
          Upload your own graphic and drag it into place to preview what a custom INKd 360 wheel
          face could look like. This is a visual reference only — our team will confirm final
          artwork with you before production.
        </p>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="mx-auto">
            <canvas
              ref={canvasRef}
              width={CANVAS_SIZE}
              height={CANVAS_SIZE}
              className="w-full max-w-[360px] rounded-full touch-none border border-line bg-ink-black"
              style={{ cursor: hasUpload ? "grab" : "default" }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
            />
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <label className="block">
              <span className="block font-mono text-xs uppercase tracking-wide text-steel mb-2">
                Upload your graphic
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFile(file);
                }}
                className="block w-full text-sm text-paper file:mr-3 file:py-2 file:px-4 file:rounded-sm file:border-0 file:font-mono file:text-xs file:uppercase file:bg-flame file:text-ink-black file:cursor-pointer cursor-pointer"
              />
            </label>

            {hasUpload && (
              <>
                <label className="block">
                  <span className="block font-mono text-xs uppercase tracking-wide text-steel mb-2">
                    Zoom
                  </span>
                  <input
                    type="range"
                    min={0.5}
                    max={3}
                    step={0.01}
                    value={scale}
                    onChange={(e) => setScale(parseFloat(e.target.value))}
                    className="w-full accent-flame"
                  />
                </label>
                <p className="text-steel text-xs">Drag the wheel image to reposition your graphic.</p>
              </>
            )}

            <div className="flex gap-3 mt-auto pt-2 flex-wrap">
              <button
                onClick={handleSave}
                disabled={!hasUpload}
                className="font-mono text-[13px] uppercase tracking-wide px-6 py-3 rounded-sm bg-gradient-to-r from-flame to-violet text-ink-black font-bold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Save Preview
              </button>
              <button
                onClick={onClose}
                className="font-mono text-[13px] uppercase tracking-wide px-6 py-3 rounded-sm border border-line text-paper bg-[rgba(20,15,34,0.4)] hover:border-blue cursor-pointer"
              >
                Skip for now
              </button>
            </div>
          </div>
        </div>

        {initialPreview && (
          <p className="text-steel text-xs mt-4">You already saved a preview for this wheel — uploading a new graphic will replace it.</p>
        )}
      </div>
    </div>
  );
}
