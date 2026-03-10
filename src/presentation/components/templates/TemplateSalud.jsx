// Plantilla estilo médico/profesional (sin fondo azul - ahora limpia)
export default function TemplateSalud({ invoice }) {
  const calculateSubtotal = () => {
    return invoice.items.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice,
      0,
    );
  };

  // Función para formatear fecha correctamente desde YYYY-MM-DD
  const formatDate = (dateStr) => {
    if (!dateStr) return new Date().toLocaleDateString("es-ES");

    // Si es formato YYYY-MM-DD, parseamos manualmente para evitar problemas de timezone
    if (typeof dateStr === "string" && dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = dateStr.split("-").map(Number);
      const months = [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
      ];
      return `${day} de ${months[month - 1]} de ${year}`;
    }

    return dateStr;
  };

  // Configuración de columnas visibles
  const visibleColumns = invoice.visibleColumns || {
    description: true,
    quantity: true,
    unitPrice: true,
    total: true,
  };

  const showTotalGeneral = invoice.showTotalGeneral !== false;

  const subtotal = calculateSubtotal();
  const taxRate = invoice.taxRate || 13;
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;

  return (
    <div className="bg-gray-50 p-8 min-h-[1123px] w-[794px]">
      {/* Decorative lines */}
      <div className="flex gap-1 mb-4">
        <div className="h-1 w-8 bg-cyan-400"></div>
        <div className="h-1 w-8 bg-cyan-400"></div>
        <div className="h-1 w-8 bg-cyan-400"></div>
      </div>

      {/* Main card */}
      <div className="bg-white rounded-sm relative shadow-sm">
        {/* Left accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-b from-cyan-400 to-cyan-500"></div>

        {/* Content */}
        <div className="pl-8 pr-6 py-6">
          {/* Header */}
          <div className="flex justify-end mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center">
                <span className="text-white text-xl">+</span>
              </div>
              <div>
                <span className="font-bold text-[#1a1a4e] text-xl">
                  {invoice.companyName || "Empresa"}
                </span>
                <p className="text-xs text-gray-400">
                  {invoice.companySlogan || "Tu empresa de confianza"}
                </p>
              </div>
            </div>
          </div>

          {/* Invoice title */}
          <h1 className="text-4xl font-bold text-cyan-500 mb-2">FACTURA</h1>

          {/* Decorative line */}
          <div className="flex gap-1 mb-6">
            {Array(20)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="h-0.5 w-3 bg-gray-300"></div>
              ))}
          </div>

          {/* Bill to section */}
          <div className="flex justify-between mb-8">
            <div>
              <h3 className="font-bold text-[#1a1a4e] mb-2">Facturar a:</h3>
              <p className="text-gray-700 font-semibold">
                {invoice.customerName || "Nombre del Cliente"}
              </p>
              <p className="text-gray-500 text-sm">
                {invoice.customerAddress || "Dirección del cliente"}
              </p>
              <p className="text-gray-500 text-sm">
                {invoice.customerPhone || "Teléfono"}
              </p>
              <p className="text-gray-500 text-sm">
                NIT: {invoice.customerNit || "00000000"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-500">
                <span className="font-bold text-[#1a1a4e]">INV #</span>
                {invoice.invoiceNumber || "0001234567"}
              </p>
              <p className="text-gray-400 text-sm">
                {invoice.invoiceCode || "00:47-99"}
              </p>
              <p className="text-gray-500 mt-4">
                <span className="font-bold text-[#1a1a4e]">Fecha: </span>
                {formatDate(invoice.issueDate)}
              </p>
            </div>
          </div>

          {/* Table */}
          <table className="w-full mb-6">
            <thead>
              <tr className="text-purple-600">
                {visibleColumns.description && (
                  <th className="text-left py-3 border-b-2 border-purple-200">
                    Descripción
                  </th>
                )}
                {visibleColumns.quantity && (
                  <th className="text-center py-3 border-b-2 border-purple-200">
                    Cant.
                  </th>
                )}
                {visibleColumns.unitPrice && (
                  <th className="text-right py-3 border-b-2 border-purple-200">
                    Precio Unit.
                  </th>
                )}
                {visibleColumns.total && (
                  <th className="text-right py-3 border-b-2 border-purple-200">
                    Total
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {invoice.items.length > 0 ? (
                invoice.items.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    {visibleColumns.description && (
                      <td className="py-3 text-gray-700 whitespace-pre-wrap">
                        {item.description || "Producto"}
                      </td>
                    )}
                    {visibleColumns.quantity && (
                      <td className="py-3 text-center text-gray-600">
                        {item.quantity || 0}
                      </td>
                    )}
                    {visibleColumns.unitPrice && (
                      <td className="py-3 text-right text-gray-600">
                        ${(item.unitPrice || 0).toFixed(2)}
                      </td>
                    )}
                    {visibleColumns.total && (
                      <td className="py-3 text-right text-gray-700 font-medium">
                        $
                        {((item.quantity || 0) * (item.unitPrice || 0)).toFixed(
                          2,
                        )}
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr className="border-b border-gray-100">
                  {visibleColumns.description && (
                    <td className="py-3 text-gray-400 italic">
                      Sin productos agregados
                    </td>
                  )}
                  {visibleColumns.quantity && (
                    <td className="py-3 text-center text-gray-400">-</td>
                  )}
                  {visibleColumns.unitPrice && (
                    <td className="py-3 text-right text-gray-400">-</td>
                  )}
                  {visibleColumns.total && (
                    <td className="py-3 text-right text-gray-400">-</td>
                  )}
                </tr>
              )}
            </tbody>
          </table>

          {/* Totals */}
          {showTotalGeneral && (
            <div className="flex justify-end mb-8">
              <div className="w-64">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">IVA ({taxRate}%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-3 bg-gray-50 px-2 mt-2 rounded">
                  <span className="font-bold text-[#1a1a4e]">Total</span>
                  <span className="font-bold text-[#1a1a4e] text-xl">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Payment info */}
          <div className="flex justify-between items-end mt-8 pt-4 border-t border-gray-200">
            <div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Info de Pago:</span>{" "}
                {invoice.paymentMethod || "Efectivo"}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Cuenta:</span>{" "}
                {invoice.accountNumber || "N/A"}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Banco:</span>{" "}
                {invoice.bankName || "N/A"}
              </p>
            </div>
            <div className="text-right">
              <div className="h-12 border-b-2 border-gray-300 w-32 mb-1"></div>
              <p className="text-xs text-gray-400">Firma Autorizada</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-cyan-500 to-cyan-400 py-3 px-6 flex justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold text-sm">
              {invoice.slogan || ""}
            </span>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-white opacity-60"></div>
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <div className="w-2 h-2 rounded-full bg-white opacity-60"></div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-white text-sm">
            <span>{invoice.website || "tuempresa.com"}</span>
            <div className="flex gap-2">
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
                f
              </div>
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
                in
              </div>
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
                @
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
