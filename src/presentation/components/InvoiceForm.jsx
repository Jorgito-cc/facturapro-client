import TemplateSelector from "./TemplateSelector";

export default function InvoiceForm({
  invoice,
  setInvoice,
  selectedTemplate,
  setSelectedTemplate,
}) {
  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [...invoice.items, { description: "", quantity: 1, unitPrice: 0 }],
    });
  };

  const updateItem = (index, field, value) => {
    const newItems = [...invoice.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setInvoice({ ...invoice, items: newItems });
  };

  const removeItem = (index) => {
    const newItems = invoice.items.filter((_, i) => i !== index);
    setInvoice({ ...invoice, items: newItems });
  };

  const updateField = (field, value) => {
    setInvoice({ ...invoice, [field]: value });
  };

  const toggleColumn = (column) => {
    const currentColumns = invoice.visibleColumns || {
      description: true,
      quantity: true,
      unitPrice: true,
      total: true,
    };
    setInvoice({
      ...invoice,
      visibleColumns: {
        ...currentColumns,
        [column]: !currentColumns[column],
      },
    });
  };

  const toggleTotalGeneral = () => {
    setInvoice({
      ...invoice,
      showTotalGeneral: !(invoice.showTotalGeneral !== false),
    });
  };

  const calculateTotal = () => {
    return invoice.items.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice,
      0,
    );
  };

  const visibleColumns = invoice.visibleColumns || {
    description: true,
    quantity: true,
    unitPrice: true,
    total: true,
  };

  const showTotalGeneral = invoice.showTotalGeneral !== false;

  // Campos específicos por plantilla
  const isCotizacion = selectedTemplate === "cotizacion";
  const isFactura = selectedTemplate === "salud";

  return (
    <div className="space-y-6">
      {/* Template Selector */}
      <TemplateSelector
        selectedTemplate={selectedTemplate}
        onSelectTemplate={setSelectedTemplate}
      />

      {/* Información de la Empresa */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          Información de tu Empresa
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Nombre de la Empresa
            </label>
            <input
              type="text"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Mi Empresa S.A."
              value={invoice.companyName || ""}
              onChange={(e) => updateField("companyName", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Propietario
            </label>
            <input
              type="text"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Juan Pérez"
              value={invoice.ownerName || ""}
              onChange={(e) => updateField("ownerName", e.target.value)}
            />
          </div>

          {/* Teléfono - ambas plantillas */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Teléfono
            </label>
            <input
              type="text"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="+591 70000000"
              value={invoice.companyPhone || ""}
              onChange={(e) => updateField("companyPhone", e.target.value)}
            />
          </div>

          {/* Email - ambas plantillas */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="correo@empresa.com"
              value={invoice.companyEmail || ""}
              onChange={(e) => updateField("companyEmail", e.target.value)}
            />
          </div>

          {/* Dirección - ambas plantillas */}
          <div className="col-span-1 sm:col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Dirección
            </label>
            <input
              type="text"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Av. Principal #123"
              value={invoice.companyAddress || ""}
              onChange={(e) => updateField("companyAddress", e.target.value)}
            />
          </div>

          {/* Slogan - solo factura */}
          {isFactura && (
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Slogan
              </label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="La calidad es primero"
                value={invoice.slogan || ""}
                onChange={(e) => updateField("slogan", e.target.value)}
              />
            </div>
          )}

          {/* Sitio Web - solo factura */}
          {isFactura && (
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Sitio Web
              </label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="www.miempresa.com"
                value={invoice.website || ""}
                onChange={(e) => updateField("website", e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Información del Cliente */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          Información del Cliente
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Nombre del Cliente
            </label>
            <input
              type="text"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Nombre del cliente"
              value={invoice.customerName || ""}
              onChange={(e) => updateField("customerName", e.target.value)}
            />
          </div>

          {/* NIT/CI - solo factura */}
          {isFactura && (
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                NIT / CI
              </label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="12345678"
                value={invoice.customerNit || ""}
                onChange={(e) => updateField("customerNit", e.target.value)}
              />
            </div>
          )}

          {/* Teléfono cliente - ambos */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Teléfono
            </label>
            <input
              type="text"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="+591 70000000"
              value={invoice.customerPhone || ""}
              onChange={(e) => updateField("customerPhone", e.target.value)}
            />
          </div>

          {/* Dirección - solo factura */}
          {isFactura && (
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Dirección
              </label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Dirección del cliente"
                value={invoice.customerAddress || ""}
                onChange={(e) => updateField("customerAddress", e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Datos del Documento */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-purple-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          {isCotizacion ? "Datos de la Cotización" : "Datos de la Factura"}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              {isCotizacion ? "Número de Cotización" : "Número de Factura"}
            </label>
            <input
              type="text"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-100 cursor-not-allowed"
              value={invoice.invoiceNumber || ""}
              readOnly
              disabled
            />
            <p className="text-xs text-gray-400 mt-1">
              Generado automáticamente
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Fecha de Emisión
            </label>
            <input
              type="date"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              value={invoice.issueDate || ""}
              onChange={(e) => updateField("issueDate", e.target.value)}
            />
          </div>
          {/* IVA solo para plantilla salud/factura */}
          {isFactura && (
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                IVA (%)
              </label>
              <input
                type="number"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="13"
                value={invoice.taxRate || 13}
                onChange={(e) =>
                  updateField("taxRate", parseFloat(e.target.value) || 0)
                }
              />
            </div>
          )}
        </div>
      </div>

      {/* Configuración de Columnas Visibles - Para ambas plantillas */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-indigo-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
            />
          </svg>
          Columnas Visibles
        </h3>
        <p className="text-sm text-gray-500 mb-3">
          Selecciona qué columnas quieres mostrar en el documento:
        </p>
        <div className="flex flex-wrap gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={visibleColumns.description}
              onChange={() => toggleColumn("description")}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <span className="text-sm text-gray-700">Descripción</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={visibleColumns.quantity}
              onChange={() => toggleColumn("quantity")}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <span className="text-sm text-gray-700">Cantidad</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={visibleColumns.unitPrice}
              onChange={() => toggleColumn("unitPrice")}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <span className="text-sm text-gray-700">P. Unitario</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={visibleColumns.total}
              onChange={() => toggleColumn("total")}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <span className="text-sm text-gray-700">Total por ítem</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer border-l pl-3 border-gray-300">
            <input
              type="checkbox"
              checked={showTotalGeneral}
              onChange={toggleTotalGeneral}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <span className="text-sm text-gray-700 font-medium">
              Total General
            </span>
          </label>
        </div>
      </div>

      {/* Productos y Servicios */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-orange-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            Productos / Servicios
          </h3>
          <button
            onClick={addItem}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all shadow-md hover:shadow-lg font-medium text-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Agregar
          </button>
        </div>

        {/* Table header - hidden on mobile */}
        <div className="hidden sm:grid grid-cols-12 gap-2 text-sm font-medium text-gray-500 mb-2 px-2">
          <div className="col-span-5">
            Descripción (Enter para salto de línea)
          </div>
          <div className="col-span-2 text-center">Cantidad</div>
          <div className="col-span-2 text-center">Precio Unit.</div>
          <div className="col-span-2 text-right">Total</div>
          <div className="col-span-1"></div>
        </div>

        {/* Items */}
        <div className="space-y-2 sm:space-y-2">
          {invoice.items.length === 0 ? (
            <div className="text-center py-6 sm:py-8 text-gray-400">
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <p>No hay productos agregados</p>
              <p className="text-sm">Haz clic en "Agregar" para comenzar</p>
            </div>
          ) : (
            invoice.items.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-3 sm:p-2 hover:bg-gray-100 transition-colors"
              >
                {/* Mobile layout */}
                <div className="sm:hidden space-y-3">
                  <div className="flex justify-between items-start">
                    <textarea
                      className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      placeholder="Descripción del producto (Enter para nueva línea)"
                      rows={2}
                      value={item.description}
                      onChange={(e) =>
                        updateItem(index, "description", e.target.value)
                      }
                    />
                    <button
                      onClick={() => removeItem(index)}
                      className="ml-2 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Eliminar"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 mb-1 block">
                        Cantidad
                      </label>
                      <input
                        type="number"
                        min="1"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-center focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(
                            index,
                            "quantity",
                            parseInt(e.target.value) || 0,
                          )
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 mb-1 block">
                        Precio
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-center focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="0.00"
                        value={item.unitPrice}
                        onChange={(e) =>
                          updateItem(
                            index,
                            "unitPrice",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                      />
                    </div>
                    <div className="flex-1 flex items-end">
                      <div className="w-full bg-purple-100 rounded-lg px-3 py-2 text-center">
                        <span className="text-xs text-gray-500 block">
                          Total
                        </span>
                        <span className="font-bold text-purple-700">
                          {isCotizacion ? "Bs" : "$"}
                          {(item.quantity * item.unitPrice).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop layout */}
                <div className="hidden sm:grid grid-cols-12 gap-2 items-start">
                  <div className="col-span-5">
                    <textarea
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      placeholder="Descripción (Enter para nueva línea)"
                      rows={2}
                      value={item.description}
                      onChange={(e) =>
                        updateItem(index, "description", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-span-2 flex items-center h-full pt-2">
                    <input
                      type="number"
                      min="1"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-center focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(
                          index,
                          "quantity",
                          parseInt(e.target.value) || 0,
                        )
                      }
                    />
                  </div>
                  <div className="col-span-2 flex items-center h-full pt-2">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-center focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="0.00"
                      value={item.unitPrice}
                      onChange={(e) =>
                        updateItem(
                          index,
                          "unitPrice",
                          parseFloat(e.target.value) || 0,
                        )
                      }
                    />
                  </div>
                  <div className="col-span-2 text-right font-medium text-gray-700 pt-4">
                    {isCotizacion ? "Bs" : "$"}
                    {(item.quantity * item.unitPrice).toFixed(2)}
                  </div>
                  <div className="col-span-1 flex justify-center pt-3">
                    <button
                      onClick={() => removeItem(index)}
                      className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Eliminar"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Total */}
        {invoice.items.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-center sm:justify-end">
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-3 sm:p-4 w-full sm:w-auto sm:min-w-[200px]">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm sm:text-base">
                    Subtotal:
                  </span>
                  <span className="font-semibold">
                    {isCotizacion ? "Bs" : "$"}
                    {calculateTotal().toFixed(2)}
                  </span>
                </div>
                {/* IVA solo para plantilla salud/factura */}
                {isFactura && (
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-gray-600 text-sm sm:text-base">
                      IVA ({invoice.taxRate || 13}%):
                    </span>
                    <span className="font-semibold">
                      $
                      {(
                        calculateTotal() *
                        ((invoice.taxRate || 13) / 100)
                      ).toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-purple-200">
                  <span className="text-purple-700 font-bold">TOTAL:</span>
                  <span className="text-lg sm:text-xl font-bold text-purple-700">
                    {isCotizacion ? "Bs" : "$"}
                    {isFactura
                      ? (
                          calculateTotal() *
                          (1 + (invoice.taxRate || 13) / 100)
                        ).toFixed(2)
                      : calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Información de Pago (opcional) - Solo para Factura */}
      {isFactura && (
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-emerald-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            Información de Pago (Opcional)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Método de Pago
              </label>
              <select
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                value={invoice.paymentMethod || ""}
                onChange={(e) => updateField("paymentMethod", e.target.value)}
              >
                <option value="">Seleccionar...</option>
                <option value="Efectivo">Efectivo</option>
                <option value="Transferencia">Transferencia Bancaria</option>
                <option value="Tarjeta">Tarjeta de Crédito/Débito</option>
                <option value="QR">Código QR</option>
                <option value="Cheque">Cheque</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Banco
              </label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Nombre del banco"
                value={invoice.bankName || ""}
                onChange={(e) => updateField("bankName", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Número de Cuenta
              </label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="123-456789-00"
                value={invoice.accountNumber || ""}
                onChange={(e) => updateField("accountNumber", e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Notas */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-yellow-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Notas Adicionales
        </h3>
        <textarea
          className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
          rows={3}
          placeholder="Términos y condiciones, notas especiales, etc."
          value={invoice.notes || ""}
          onChange={(e) => updateField("notes", e.target.value)}
        />
      </div>
    </div>
  );
}
