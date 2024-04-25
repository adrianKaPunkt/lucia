'use client';

const Separator = ({ text }: { text?: string }) => {
  return (
    <div className="w-full flex items-center justify-center gap-2">
      <span className="border-b border-gray-300 w-full"></span>
      <p className="text-xs text-gray-400 flex-none">{` ${text} `}</p>
      <span className="border-b border-gray-300 w-full"></span>
    </div>
  );
};
export { Separator };
