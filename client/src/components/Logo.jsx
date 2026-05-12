export const Logo = () => {
  return (
    <div className="flex flex-col items-center gap-3">
      
      <div className="flex items-center text-3xl font-black tracking-tight">
        Track<span className="text-[#006c49]">R</span>
      </div>

      {/* animated tracking bar */}
      <div className="w-24 h-1 bg-[#e8f0e9] rounded-full overflow-hidden relative">
        <div className="w-1/2 h-full bg-[#006c49] absolute animate-[slide_1.2s_infinite]" />
      </div>

      <style jsx>{`
        @keyframes slide {
          0% { left: -50%; }
          50% { left: 50%; }
          100% { left: 100%; }
        }
      `}</style>

    </div>
  );
};