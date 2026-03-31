"use client";

import { useRef, useState } from "react";

interface Props {
  value: string; // current image URL or base64 data URL
  onChange: (value: string) => void;
  label?: string;
}

export default function ImageInput({ value, onChange, label = "IMAGE" }: Props) {
  const [mode, setMode] = useState<"url" | "upload">("url");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onChange(result);
    };
    reader.readAsDataURL(file);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(true);
  }

  function handleDragLeave() {
    setDragOver(false);
  }

  const hasImage = value && value.length > 0;

  return (
    <div className="space-y-2">
      {/* Label + mode toggle */}
      <div className="flex items-center justify-between">
        <label className="text-white/50 text-[10px] tracking-widest uppercase font-semibold">
          {label}
        </label>
        <div className="flex rounded overflow-hidden border border-white/10 text-[10px] font-bold tracking-widest uppercase">
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-3 py-1 transition-colors ${
              mode === "url"
                ? "bg-twh-gold text-twh-dark"
                : "bg-transparent text-white/40 hover:text-white/70"
            }`}
          >
            URL
          </button>
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`px-3 py-1 transition-colors ${
              mode === "upload"
                ? "bg-twh-gold text-twh-dark"
                : "bg-transparent text-white/40 hover:text-white/70"
            }`}
          >
            Upload
          </button>
        </div>
      </div>

      {/* URL mode */}
      {mode === "url" && (
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className="w-full bg-white/5 border border-white/10 rounded px-3 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-twh-gold/60 transition-colors"
        />
      )}

      {/* Upload mode */}
      {mode === "upload" && (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`relative w-full rounded border-2 border-dashed cursor-pointer transition-all duration-200 flex flex-col items-center justify-center text-center select-none
            ${dragOver
              ? "border-twh-gold bg-twh-gold/10"
              : "border-white/20 hover:border-twh-gold/50 hover:bg-white/5"
            }
            ${hasImage ? "h-32" : "h-24"}
          `}
        >
          {hasImage ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value}
                alt="Preview"
                className="absolute inset-0 w-full h-full object-cover rounded opacity-60"
              />
              <div className="relative z-10 bg-twh-dark/70 rounded px-3 py-1.5 text-xs text-white font-semibold tracking-wide">
                Click or drag to replace
              </div>
            </>
          ) : (
            <>
              <svg className="w-7 h-7 text-white/30 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-white/40 text-xs tracking-wide">
                {dragOver ? "Drop to upload" : "Click or drag & drop an image"}
              </p>
              <p className="text-white/20 text-[10px] mt-0.5">JPG, PNG, WebP, AVIF</p>
            </>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      )}

      {/* Live preview strip (always shown when there's a value) */}
      {hasImage && (
        <div className="flex items-center gap-3 mt-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Preview"
            className="w-16 h-10 object-cover rounded border border-white/10 flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-white/30 text-[10px] truncate">
              {value.startsWith("data:") ? "Uploaded image (base64)" : value}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-white/30 hover:text-red-400 transition-colors text-[10px] tracking-widest uppercase flex-shrink-0"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
