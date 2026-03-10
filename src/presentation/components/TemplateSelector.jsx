export default function TemplateSelector({
  selectedTemplate,
  onSelectTemplate,
}) {
  const templates = [
    {
      id: "salud",
      name: "Profesional",
      description: "Diseño médico/corporativo con estilo azul y morado",
      preview: (
        <div className="bg-[#1a1a4e] p-3 rounded-lg h-full">
          <div className="bg-white rounded h-full relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400"></div>
            <div className="p-3">
              <div className="flex justify-end mb-2">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-cyan-500 rounded"></div>
                  <span className="text-[6px] font-bold text-[#1a1a4e]">
                    Empresa
                  </span>
                </div>
              </div>
              <p className="text-cyan-500 font-bold text-xs mb-1">FACTURA</p>
              <div className="flex gap-0.5 mb-2">
                {Array(8)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="h-px w-1 bg-gray-300"></div>
                  ))}
              </div>
              <div className="space-y-1">
                <div className="h-1 bg-gray-200 rounded w-3/4"></div>
                <div className="h-1 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="mt-2 space-y-0.5">
                <div className="flex gap-1">
                  <div className="h-1 bg-purple-200 rounded flex-1"></div>
                  <div className="h-1 bg-purple-200 rounded w-6"></div>
                </div>
                <div className="flex gap-1">
                  <div className="h-1 bg-gray-100 rounded flex-1"></div>
                  <div className="h-1 bg-gray-100 rounded w-6"></div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-500 to-cyan-400"></div>
          </div>
        </div>
      ),
    },
    {
      id: "cotizacion",
      name: "Cotización",
      description: "Diseño moderno con gradiente verde y azul",
      preview: (
        <div className="bg-white rounded-lg h-full relative overflow-hidden border border-gray-200">
          <div className="h-1 bg-gradient-to-r from-cyan-500 via-teal-400 to-green-400"></div>
          <div className="absolute top-0 right-0 w-16 h-8 bg-gradient-to-br from-cyan-400/30 to-transparent rounded-bl-full"></div>
          <div className="p-3">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[5px] text-gray-500">FECHA</p>
              <p className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-500">
                COTIZACIÓN
              </p>
            </div>
            <div className="flex justify-between mb-3">
              <div>
                <p className="text-[5px] text-gray-400">CLIENTE</p>
                <p className="text-[7px] text-cyan-600">Nombre</p>
              </div>
              <div className="text-right">
                <p className="text-[5px] text-gray-400">EMPRESA</p>
                <p className="text-[7px] text-cyan-600">Empresa</p>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between border-b border-cyan-200 pb-1">
                <span className="text-[6px] text-cyan-600">Descripción</span>
                <span className="text-[6px] text-cyan-600">Precio</span>
              </div>
              <div className="flex justify-between">
                <div className="h-0.5 bg-gray-200 rounded w-2/3"></div>
                <div className="h-0.5 bg-gray-200 rounded w-1/6"></div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <div className="h-3 bg-gradient-to-r from-cyan-500 via-teal-400 to-green-400"></div>
          </div>
        </div>
      ),
    },
    {
      id: "moderno",
      name: "Moderno",
      description: "Diseño elegante con sidebar oscuro y acentos dorados",
      preview: (
        <div className="bg-white rounded-lg h-full relative overflow-hidden border border-gray-200 flex">
          {/* Sidebar */}
          <div className="w-1/3 bg-slate-900 p-2">
            <div className="w-4 h-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded mb-2"></div>
            <div className="h-1 bg-slate-700 rounded w-3/4 mb-1"></div>
            <div className="h-0.5 bg-amber-400 rounded w-1/2"></div>
            <div className="mt-3 space-y-1">
              <div className="h-0.5 bg-slate-600 rounded w-full"></div>
              <div className="h-0.5 bg-slate-700 rounded w-3/4"></div>
            </div>
          </div>
          {/* Content */}
          <div className="flex-1 p-2">
            <p className="text-[8px] font-black text-slate-900 mb-1">
              COTIZACIÓN
            </p>
            <div className="h-0.5 bg-slate-200 rounded w-2/3 mb-2"></div>
            <div className="space-y-1">
              <div className="flex gap-1">
                <div className="h-0.5 bg-slate-200 rounded flex-1"></div>
                <div className="h-0.5 bg-slate-300 rounded w-4"></div>
              </div>
              <div className="flex gap-1">
                <div className="h-0.5 bg-slate-100 rounded flex-1"></div>
                <div className="h-0.5 bg-slate-200 rounded w-4"></div>
              </div>
            </div>
            <div className="absolute bottom-2 right-2">
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded px-2 py-0.5">
                <span className="text-[5px] font-bold text-white">TOTAL</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "minimalista",
      name: "Minimalista",
      description: "Diseño limpio y simple con acentos coral/rojo",
      preview: (
        <div className="bg-white rounded-lg h-full relative overflow-hidden border border-gray-200">
          {/* Top accent */}
          <div className="h-1 bg-gradient-to-r from-rose-500 via-red-500 to-orange-500"></div>
          <div className="p-3">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-[8px] font-black text-gray-900">EMPRESA</p>
                <div className="h-0.5 bg-rose-400 rounded w-8 mt-0.5"></div>
              </div>
              <p className="text-[7px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
                COTIZACIÓN
              </p>
            </div>
            <div className="mt-3 space-y-1">
              <div className="flex justify-between border-b border-gray-200 pb-1">
                <span className="text-[5px] text-gray-400">Descripción</span>
                <span className="text-[5px] text-gray-400">Total</span>
              </div>
              <div className="flex justify-between">
                <div className="h-0.5 bg-gray-200 rounded w-2/3"></div>
                <div className="h-0.5 bg-gray-200 rounded w-1/6"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-0.5 bg-gray-100 rounded w-1/2"></div>
                <div className="h-0.5 bg-gray-100 rounded w-1/6"></div>
              </div>
            </div>
            <div className="absolute bottom-3 right-3 bg-gradient-to-r from-rose-500 to-orange-500 rounded px-2 py-0.5">
              <span className="text-[5px] font-bold text-white">TOTAL</span>
            </div>
          </div>
          {/* Bottom accent */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-500 via-red-500 to-orange-500"></div>
        </div>
      ),
    },
  ];

  return (
    <div className="mb-6">
      <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
          />
        </svg>
        Selecciona una plantilla
      </h3>
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template.id)}
            className={`p-2 sm:p-3 rounded-xl transition-all duration-300 text-left ${
              selectedTemplate === template.id
                ? "ring-2 ring-purple-500 ring-offset-2 bg-purple-50 shadow-lg transform scale-105"
                : "bg-white hover:shadow-md border border-gray-200 hover:border-purple-300"
            }`}
          >
            <div className="h-24 sm:h-32 mb-2 sm:mb-3">{template.preview}</div>
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`font-semibold text-sm sm:text-base ${selectedTemplate === template.id ? "text-purple-700" : "text-gray-700"}`}
                >
                  {template.name}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500 line-clamp-2">
                  {template.description}
                </p>
              </div>
              {selectedTemplate === template.id && (
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 ml-2">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
