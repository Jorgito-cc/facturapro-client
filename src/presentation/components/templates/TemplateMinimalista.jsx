// Plantilla Minimalista - Diseño limpio con líneas rojas/coral
export default function TemplateMinimalista({ invoice }) {
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
      return today.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }
    const [year, month, day] = dateStr.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const visibleColumns = invoice.visibleColumns || {
    description: true,
    quantity: true,
    unitPrice: true,
    total: true,
  };

  const showTotalGeneral = invoice.showTotalGeneral !== false;

  return (
    <div className="min-h-[1123px] w-[794px] bg-white relative overflow-hidden p-12">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-500 via-red-500 to-orange-500"></div>

      {/* Header */}
      <div className="flex justify-between items-start mb-16 mt-4">
        {/* Company */}
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            {invoice.companyName || "EMPRESA"}
          </h1>
          <p className="text-rose-500 font-medium mt-1">
            {invoice.ownerName || "Propietario"}
          </p>
          <div className="mt-4 space-y-1 text-sm text-gray-500">
            {invoice.companyPhone && <p>{invoice.companyPhone}</p>}
            {invoice.companyEmail && <p>{invoice.companyEmail}</p>}
            {invoice.companyAddress && <p>{invoice.companyAddress}</p>}
          </div>
        </div>

        {/* Invoice info */}
        <div className="text-right">
          <div className="inline-block">
            <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
              COTIZACIÓN
            </h2>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between gap-8 text-sm">
                <span className="text-gray-400">Número</span>
                <span className="text-gray-900 font-semibold">
                  {invoice.invoiceNumber || "COT-000001"}
                </span>
              </div>
              <div className="flex justify-between gap-8 text-sm">
                <span className="text-gray-400">Fecha</span>
                <span className="text-gray-900 font-semibold">
                  {formatDate(invoice.issueDate)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client section */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-6 bg-gradient-to-b from-rose-500 to-orange-500 rounded-full"></div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Cliente
          </h3>
        </div>
        <div className="pl-4 border-l-2 border-gray-100">
          <p className="text-xl font-bold text-gray-900">
            {invoice.customerName || "Nombre del Cliente"}
          </p>
          {invoice.customerPhone && (
            <p className="text-gray-500 mt-1">{invoice.customerPhone}</p>
          )}
        </div>
      </div>

      {/* Items table */}
      <div className="mb-12">
        <table className="w-full">
          <thead>
            <tr>
              {visibleColumns.description && (
                <th className="text-left py-4 text-xs font-bold text-gray-400 uppercase tracking-widest border-b-2 border-gray-900">
                  Descripción
                </th>
              )}
              {visibleColumns.quantity && (
                <th className="text-center py-4 text-xs font-bold text-gray-400 uppercase tracking-widest border-b-2 border-gray-900 w-20">
                  Cant.
                </th>
              )}
              {visibleColumns.unitPrice && (
                <th className="text-right py-4 text-xs font-bold text-gray-400 uppercase tracking-widest border-b-2 border-gray-900 w-28">
                  Precio
                </th>
              )}
              {visibleColumns.total && (
                <th className="text-right py-4 text-xs font-bold text-gray-400 uppercase tracking-widest border-b-2 border-gray-900 w-28">
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
                  className="border-b border-gray-100 hover:bg-gray-50/50"
                >
                  {visibleColumns.description && (
                    <td className="py-5 text-gray-800 whitespace-pre-wrap">
                      {item.description || "Producto o servicio"}
                    </td>
                  )}
                  {visibleColumns.quantity && (
                    <td className="py-5 text-center text-gray-600">
                      {item.quantity || 1}
                    </td>
                  )}
                  {visibleColumns.unitPrice && (
                    <td className="py-5 text-right text-gray-600">
                      {(item.unitPrice || 0).toLocaleString("es-BO")} Bs
                    </td>
                  )}
                  {visibleColumns.total && (
                    <td className="py-5 text-right font-bold text-gray-900">
                      {(
                        (item.quantity || 0) * (item.unitPrice || 0)
                      ).toLocaleString("es-BO")}{" "}
                      Bs
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr className="border-b border-gray-100">
                <td
                  colSpan={4}
                  className="py-8 text-gray-400 italic text-center"
                >
                  Agrega productos o servicios...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Total section */}
      {showTotalGeneral && (
        <div className="flex justify-end mb-12">
          <div className="w-72">
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-gray-900 font-medium">
                {total.toLocaleString("es-BO")} Bs
              </span>
            </div>
            <div className="flex justify-between items-center py-4 bg-gradient-to-r from-rose-500 to-orange-500 -mx-4 px-4 mt-4 rounded-xl">
              <span className="text-white font-bold text-lg">TOTAL</span>
              <span className="text-white font-black text-2xl">
                {total.toLocaleString("es-BO")} Bs
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Notes */}
      {invoice.notes && (
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-6 bg-gradient-to-b from-rose-500 to-orange-500 rounded-full"></div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Notas
            </h3>
          </div>
          <p className="text-gray-600 text-sm whitespace-pre-wrap pl-4 border-l-2 border-gray-100">
            {invoice.notes}
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="px-12 py-8">
          <div className="flex justify-between items-center text-sm text-gray-400 border-t border-gray-200 pt-8">
            <p>¡Gracias por confiar en nosotros!</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full"></div>
              <p className="font-medium text-gray-600">
                {invoice.companyName || "Empresa"}
              </p>
            </div>
          </div>
        </div>
        {/* Bottom gradient */}
        <div className="h-1.5 bg-gradient-to-r from-rose-500 via-red-500 to-orange-500"></div>
      </div>
    </div>
  );
}
