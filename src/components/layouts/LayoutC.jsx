import { layoutData } from "../../data/layouts";

export default function LayoutC() {
  return (
    <div className="grid grid-cols-1 gap-2 h-full">
      {layoutData.C.map((src, index) => (
        <img key={index} src={src} alt={`Layout C ${index + 1}`} className="w-full h-full" />
      ))}

      <h1 className="flex flex-col items-center text-xl text-indigo-500 font-bold">
            P!CPAC <br />
            <span className="text-[8px] font-normal text-gray-400">
            {new Date().toLocaleDateString()}
            </span>
        </h1>
    </div>
  );
}