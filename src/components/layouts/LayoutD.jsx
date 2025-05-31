import { layoutData } from "../../data/layouts";

export default function LayoutD() {
  return (
    <div className="grid grid-cols-2 gap-2 w-full">
      {layoutData.D.map((src, index) => (
        <img key={index} src={src} alt={`Layout D ${index + 1}`} className="w-full h-auto object-cover" />
      ))}

      <h1 className="flex flex-col items-center justify-center ml-40 text-xl text-indigo-500 font-bold">
            P!CPAC <br />
            <span className="text-[8px] font-normal text-gray-400">
            {new Date().toLocaleDateString()}
            </span>
        </h1>
    </div>
  );
}