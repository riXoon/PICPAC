import { useNavigate } from 'react-router-dom';
import LayoutA from "../components/layouts/LayoutA";
import LayoutB from "../components/layouts/LayoutB";
import LayoutC from "../components/layouts/LayoutC";
import LayoutD from "../components/layouts/LayoutD";

export default function LayoutSelection() {
  const navigate = useNavigate();

  const layouts = [
    { id: 'A', Component: LayoutA },
    { id: 'B', Component: LayoutB },
    { id: 'C', Component: LayoutC },
    { id: 'D', Component: LayoutD },
  ];

  const handleSelect = (layoutId) => {
    navigate("/photobooth", { state: { layoutId } });
  };

  return (
    <div className="min-h-screen bg-blue-100 px-4 py-8">
      <div className="bg-blue-500 rounded-lg p-6 text-center text-white mb-8">
        <h1 className="text-2xl font-bold">choose layout</h1>
        <p className="text-sm">note: you have 5 seconds for each shot.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto">
        {layouts.map(({ id, Component }) => (
          <div key={id} className="flex flex-col items-center">
            <div
              onClick={() => handleSelect(id)}
              className={`bg-white rounded-lg shadow-md p-4 text-center transition-transform transform duration-500 hover:scale-105 active:scale-95 cursor-pointer
                ${id === 'D' ? 'w-full sm:w-[350px]' : 'w-full sm:w-[200px]'}
              `}
              style={{ minHeight: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <Component />
            </div>
            <h1 className="mt-2 text-md tracking-wider font-semibold text-indigo-500 text-center">
              Layout {id}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}
