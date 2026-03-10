// Plantilla estilo cotización (verde/azul gradient)
export default function TemplateCotizacion({ invoice }) {
  const calculateTotal = () => {
    return invoice.items.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice,
      0,
    );
  };

  const total = calculateTotal();

  const formatDate = (dateStr) => {
    if (!dateStr) {
      const today = new Date();
      return today
        .toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
        .toUpperCase();
    }
    // Parsear la fecha correctamente desde formato YYYY-MM-DD
    const [year, month, day] = dateStr.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date
      .toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
      .toUpperCase();
  };

  // Configuración de columnas visibles
  const visibleColumns = invoice.visibleColumns || {
    description: true,
    quantity: true,
    unitPrice: true,
    total: true,
  };

  const showTotalGeneral = invoice.showTotalGeneral !== false;

  return (
    <div className="min-h-[1123px] w-[794px] bg-white relative overflow-hidden">
      {/* Top gradient bar */}
      <div className="h-3 bg-gradient-to-r from-cyan-500 via-teal-400 to-green-400"></div>

      {/* Top right decorative gradient */}
      <div className="absolute top-0 right-0 w-96 h-48 bg-gradient-to-br from-cyan-400/30 via-teal-300/20 to-green-300/10 rounded-bl-full"></div>

      {/* Content */}
      <div className="px-12 py-10 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-gray-500 text-sm tracking-widest mb-2">
              {formatDate(invoice.issueDate)}
            </p>
            <p className="text-gray-400 text-xs tracking-widest">
              N° {invoice.invoiceNumber || "COT-000001"}
            </p>
          </div>
          <div>
            {/* Título con color sólido para que se vea en exportación */}
            <h1 className="text-5xl font-bold text-cyan-600 tracking-wide">
              COTIZACIÓN
            </h1>
          </div>
        </div>

        {/* Client and Company info */}
        <div className="flex justify-between mb-12">
          <div>
            <p className="text-xs text-gray-400 tracking-widest mb-1">
              CLIENTE
            </p>
            <p className="text-xl text-cyan-600 font-semibold">
              {invoice.customerName || "Nombre del Cliente"}
            </p>
            {invoice.customerPhone && (
              <p className="text-sm text-gray-500 mt-1">
                Tel: {invoice.customerPhone}
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 tracking-widest mb-1">
              EMPRESA
            </p>
            <p className="text-xl text-cyan-600 font-semibold">
              {invoice.companyName || "Nombre de la Empresa"}
            </p>
            <p className="text-sm text-gray-500">
              {invoice.ownerName || "Propietario"}
            </p>
            {invoice.companyAddress && (
              <p className="text-sm text-gray-500">{invoice.companyAddress}</p>
            )}
            {invoice.companyEmail && (
              <p className="text-sm text-gray-500">{invoice.companyEmail}</p>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="mb-12">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-cyan-500">
                {visibleColumns.description && (
                  <th className="text-left py-4 text-cyan-600 font-semibold text-lg">
                    Descripción
                  </th>
                )}
                {visibleColumns.quantity && (
                  <th className="text-center py-4 text-cyan-600 font-semibold text-lg">
                    Cantidad
                  </th>
                )}
                {visibleColumns.unitPrice && (
                  <th className="text-right py-4 text-cyan-600 font-semibold text-lg">
                    P. Unitario
                  </th>
                )}
                {visibleColumns.total && (
                  <th className="text-right py-4 text-cyan-600 font-semibold text-lg">
                    Total
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {invoice.items.length > 0 ? (
                invoice.items.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-dashed border-gray-200"
                  >
                    {visibleColumns.description && (
                      <td className="py-5 text-gray-700 whitespace-pre-wrap">
                        {item.description || "Producto o servicio"}
                      </td>
                    )}
                    {visibleColumns.quantity && (
                      <td className="py-5 text-center text-gray-700">
                        {item.quantity || 1}
                      </td>
                    )}
                    {visibleColumns.unitPrice && (
                      <td className="py-5 text-right">
                        <span className="font-medium text-gray-700">
                          {(item.unitPrice || 0).toLocaleString("es-BO")}
                        </span>
                        <span className="text-gray-500 ml-1">Bs</span>
                      </td>
                    )}
                    {visibleColumns.total && (
                      <td className="py-5 text-right">
                        <span className="font-bold text-gray-800">
                          {(
                            (item.quantity || 0) * (item.unitPrice || 0)
                          ).toLocaleString("es-BO")}
                        </span>
                        <span className="text-gray-500 ml-1">Bs</span>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr className="border-b border-dashed border-gray-200">
                  <td
                    colSpan={4}
                    className="py-5 text-gray-400 italic text-center"
                  >
                    Agrega productos o servicios...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Total */}
        {showTotalGeneral && (
          <div className="flex justify-center mb-16">
            <div className="bg-gray-50 border border-gray-200 rounded-sm px-8 py-4 inline-flex items-center gap-8">
              <span className="text-cyan-600 font-medium tracking-wider">
                TOTAL
              </span>
              <span className="text-2xl font-bold text-gray-800">
                {total.toLocaleString("es-BO")}{" "}
                <span className="text-lg">Bs</span>
              </span>
            </div>
          </div>
        )}

        {/* Notes section */}
        {invoice.notes && (
          <div className="mb-8">
            <p className="text-xs text-gray-400 tracking-widest mb-2">NOTAS</p>
            <p className="text-gray-600 text-sm whitespace-pre-wrap">
              {invoice.notes}
            </p>
          </div>
        )}

        {/* Contact info */}
        <div className="flex justify-between text-sm text-gray-500 mt-auto">
          <div>
            <p>{invoice.companyPhone || "Teléfono de contacto"}</p>
            <p>{invoice.companyEmail || "email@empresa.com"}</p>
          </div>
          <div className="text-right">
            <p>{invoice.companyAddress || "Dirección de la empresa"}</p>
          </div>
        </div>
      </div>

      {/* Bottom gradient bar */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-16 bg-gradient-to-r from-cyan-500 via-teal-400 to-green-400 opacity-90"></div>
        <div className="h-6 bg-gradient-to-r from-cyan-600 via-teal-500 to-green-500"></div>
      </div>

      {/* Decorative shapes */}
      <div className="absolute bottom-24 left-1/4 transform -translate-x-1/2">
        <div className="w-32 h-32 bg-gradient-to-br from-cyan-400/10 to-teal-400/10 rounded-full"></div>
      </div>
    </div>
  );
}
