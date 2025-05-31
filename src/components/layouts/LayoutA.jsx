import { layoutData } from "../../data/layouts";

export default function LayoutA() {
  return (
    <div className="grid grid-cols-1 gap-2 h-full">
      {layoutData.A.map((src, index) => (
        <img key={index} src={src} alt={`Layout A ${index + 1}`} className="w-full h-full object-cover" />
      ))}
        <h1 className="flex flex-col text-xl text-indigo-500 font-bold">
            P!CPAC <br />
            <span className="text-[8px] font-normal text-gray-400">
            {new Date().toLocaleDateString()}
            </span>
        </h1>
    </div>
  );
}