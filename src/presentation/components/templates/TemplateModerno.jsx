// Plantilla Moderno - Diseño con sidebar oscuro y acentos naranja/dorado
export default function TemplateModerno({ invoice }) {
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

  const visibleColumns = invoice.visibleColumns || {
    description: true,
    quantity: true,
    unitPrice: true,
    total: true,
  };

  const showTotalGeneral = invoice.showTotalGeneral !== false;

  return (
    <div className="min-h-[1123px] w-[794px] bg-white relative overflow-hidden flex">
      {/* Left sidebar */}
      <div className="w-56 bg-slate-900 text-white p-8 flex flex-col">
        {/* Logo/Company */}
        <div className="mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
            <span className="text-2xl font-bold text-slate-900">
              {(invoice.companyName || "E").charAt(0).toUpperCase()}
            </span>
          </div>
          <h2 className="text-xl font-bold text-white leading-tight">
            {invoice.companyName || "Nombre de la Empresa"}
          </h2>
          <p className="text-amber-400 text-sm mt-1">
            {invoice.ownerName || "Propietario"}
          </p>
        </div>

        {/* Company info */}
        <div className="space-y-4 text-sm flex-1">
          {invoice.companyPhone && (
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="text-slate-300">{invoice.companyPhone}</span>
            </div>
          )}
          {invoice.companyEmail && (
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-slate-300 break-all">
                {invoice.companyEmail}
              </span>
            </div>
          )}
          {invoice.companyAddress && (
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-slate-300">{invoice.companyAddress}</span>
            </div>
          )}
        </div>

        {/* Bottom decoration */}
        <div className="mt-auto pt-8">
          <div className="h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              COTIZACIÓN
            </h1>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-slate-500">
                N° {invoice.invoiceNumber || "COT-000001"}
              </span>
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
              <span className="text-slate-500">
                {formatDate(invoice.issueDate)}
              </span>
            </div>
          </div>
        </div>

        {/* Client info */}
        <div className="bg-slate-50 rounded-2xl p-6 mb-8">
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-2 font-semibold">
            FACTURAR A
          </p>
          <p className="text-xl font-bold text-slate-900">
            {invoice.customerName || "Nombre del Cliente"}
          </p>
          {invoice.customerPhone && (
            <p className="text-slate-600 mt-1">Tel: {invoice.customerPhone}</p>
          )}
        </div>

        {/* Table */}
        <div className="mb-8">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-slate-900">
                {visibleColumns.description && (
                  <th className="text-left py-4 text-slate-900 font-bold text-sm uppercase tracking-wider">
                    Descripción
                  </th>
                )}
                {visibleColumns.quantity && (
                  <th className="text-center py-4 text-slate-900 font-bold text-sm uppercase tracking-wider">
                    Cant.
                  </th>
                )}
                {visibleColumns.unitPrice && (
                  <th className="text-right py-4 text-slate-900 font-bold text-sm uppercase tracking-wider">
                    Precio
                  </th>
                )}
                {visibleColumns.total && (
                  <th className="text-right py-4 text-slate-900 font-bold text-sm uppercase tracking-wider">
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
                    className={`border-b border-slate-200 ${index % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
                  >
                    {visibleColumns.description && (
                      <td className="py-4 text-slate-700 whitespace-pre-wrap">
                        {item.description || "Producto o servicio"}
                      </td>
                    )}
                    {visibleColumns.quantity && (
                      <td className="py-4 text-center text-slate-600">
                        {item.quantity || 1}
                      </td>
                    )}
                    {visibleColumns.unitPrice && (
                      <td className="py-4 text-right text-slate-600">
                        {(item.unitPrice || 0).toLocaleString("es-BO")} Bs
                      </td>
                    )}
                    {visibleColumns.total && (
                      <td className="py-4 text-right font-semibold text-slate-900">
                        {(
                          (item.quantity || 0) * (item.unitPrice || 0)
                        ).toLocaleString("es-BO")}{" "}
                        Bs
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr className="border-b border-slate-200">
                  <td
                    colSpan={4}
                    className="py-6 text-slate-400 italic text-center"
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
          <div className="flex justify-end mb-8">
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl px-8 py-5 text-right shadow-lg">
              <p className="text-amber-900/70 text-sm font-semibold uppercase tracking-wider">
                Total a Pagar
              </p>
              <p className="text-3xl font-black text-white mt-1">
                {total.toLocaleString("es-BO")} Bs
              </p>
            </div>
          </div>
        )}

        {/* Notes */}
        {invoice.notes && (
          <div className="bg-slate-50 rounded-xl p-5 mt-auto">
            <p className="text-xs text-slate-400 uppercase tracking-widest mb-2 font-semibold">
              Notas
            </p>
            <p className="text-slate-600 text-sm whitespace-pre-wrap">
              {invoice.notes}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="absolute bottom-8 right-10 left-64">
          <div className="flex items-center justify-between text-sm text-slate-400">
            <p>Gracias por su preferencia</p>
            <p>{invoice.companyName || "Empresa"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
