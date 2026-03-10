import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InvoiceForm from "../components/InvoiceForm";
import InvoicePreview from "../components/InvoicePreview";
import { useAuth } from "../../context/AuthContext";
import {
  createInvoiceApi,
  getMyInvoices,
} from "../../infrastructure/invoice.api";

// Función para generar número de factura incremental
const getNextInvoiceNumber = () => {
  const lastNumber = parseInt(
    localStorage.getItem("lastInvoiceNumber") || "0",
    10,
  );
  const nextNumber = lastNumber + 1;
  localStorage.setItem("lastInvoiceNumber", nextNumber.toString());
  return `FAC-${String(nextNumber).padStart(6, "0")}`;
};

// Obtener número actual sin incrementar (para inicialización)
const getCurrentInvoiceNumber = () => {
  const lastNumber = parseInt(
    localStorage.getItem("lastInvoiceNumber") || "0",
    10,
  );
  const nextNumber = lastNumber + 1;
  return `FAC-${String(nextNumber).padStart(6, "0")}`;
};

export default function CreateInvoicePage() {
  const {
    user,
    token,
    isGuest,
    isAdmin,
    isAuthenticated,
    logout,
    exitGuestMode,
  } = useAuth();
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState("cotizacion");
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("form"); // 'form' or 'preview' for mobile
  const [savedInvoices, setSavedInvoices] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const [invoice, setInvoice] = useState({
    // Datos de la empresa
    companyName: "",
    ownerName: "",
    companySlogan: "",
    slogan: "",
    website: "",
    companyPhone: "",
    companyEmail: "",
    companyAddress: "",

    // Datos del cliente
    customerName: "",
    customerNit: "",
    customerAddress: "",
    customerPhone: "",

    // Datos de la factura
    invoiceNumber: getCurrentInvoiceNumber(),
    invoiceCode: "",
    issueDate: new Date().toISOString().split("T")[0],
    taxRate: 13,

    // Items
    items: [],

    // Pago
    paymentMethod: "",
    bankName: "",
    accountNumber: "",

    // Notas
    notes: "",

    // Tipo de plantilla
    templateType: "cotizacion",

    // Columnas visibles (para cotización)
    visibleColumns: {
      description: true,
      quantity: true,
      unitPrice: true,
      total: true,
    },
    showTotalGeneral: true,
  });

  // Cargar facturas guardadas al iniciar (solo para usuarios autenticados)
  useEffect(() => {
    if (isAuthenticated && token) {
      fetchSavedInvoices();
    }
  }, [isAuthenticated, token]);

  const fetchSavedInvoices = async () => {
    if (!token) return;
    try {
      const data = await getMyInvoices(token);
      setSavedInvoices(data);
    } catch (error) {
      console.error("Error al cargar facturas:", error);
    }
  };

  const handleSave = async () => {
    if (invoice.items.length === 0) {
      toast.warning("Agrega al menos un producto o servicio");
      return;
    }

    // Si es invitado, solo procesar sin guardar
    if (isGuest) {
      toast.info(
        "Modo prueba gratuita: Puedes exportar pero no se guardará en historial. ¡Regístrate para guardar!",
      );
      return;
    }

    setIsSaving(true);
    try {
      // Confirmar el número de factura al guardar (incrementa el contador)
      const confirmedNumber = getNextInvoiceNumber();

      // Incluir el tipo de plantilla
      await createInvoiceApi(
        {
          ...invoice,
          invoiceNumber: confirmedNumber,
          templateType: selectedTemplate,
        },
        token,
      );
      toast.success(`Factura ${confirmedNumber} guardada exitosamente`);

      // Recargar lista de facturas guardadas
      await fetchSavedInvoices();

      // Crear nueva factura automáticamente
      handleNewInvoice();
    } catch (error) {
      console.error("Error al guardar:", error);
      toast.error(
        "Error al guardar la factura. Revisa la consola para más detalles.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleNewInvoice = () => {
    toast.info("Nueva factura creada");
    setInvoice({
      companyName: invoice.companyName,
      ownerName: invoice.ownerName,
      companySlogan: invoice.companySlogan,
      slogan: invoice.slogan,
      website: invoice.website,
      companyPhone: invoice.companyPhone,
      companyEmail: invoice.companyEmail,
      companyAddress: invoice.companyAddress,
      customerName: "",
      customerNit: "",
      customerAddress: "",
      customerPhone: "",
      invoiceNumber: getCurrentInvoiceNumber(),
      invoiceCode: "",
      issueDate: new Date().toISOString().split("T")[0],
      taxRate: 13,
      items: [],
      paymentMethod: "",
      bankName: invoice.bankName,
      accountNumber: invoice.accountNumber,
      notes: "",
      visibleColumns: {
        description: true,
        quantity: true,
        unitPrice: true,
        total: true,
      },
      showTotalGeneral: true,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-purple-50 to-blue-50">
      {/* Guest Mode Banner */}
      {isGuest && (
        <div className="bg-yellow-400 text-yellow-900 px-4 py-2 text-center text-sm">
          <span className="font-medium">Modo Prueba Gratuita</span> - Puedes
          crear y exportar documentos, pero no se guardarán.
          <Link
            to="/register"
            className="underline font-bold ml-2 hover:text-yellow-800"
            onClick={exitGuestMode}
          >
            ¡Regístrate gratis!
          </Link>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-full mx-auto px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo and title */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                to={isAuthenticated && !isGuest ? "/profile" : "/"}
                className="flex items-center gap-2 sm:gap-4"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                  <svg
                    className="w-4 h-4 sm:w-6 sm:h-6 text-white"
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
                </div>
                <div>
                  <h1 className="text-sm sm:text-xl font-bold text-gray-800">
                    FacturaPro
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                    {isGuest
                      ? "Modo Prueba"
                      : `Hola, ${user?.firstName || "Usuario"}`}
                  </p>
                </div>
              </Link>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Admin button */}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all font-medium text-xs sm:text-sm"
                >
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="hidden sm:inline">Admin</span>
                </Link>
              )}

              <button
                onClick={handleNewInvoice}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium text-xs sm:text-sm"
              >
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4"
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
                <span className="hidden xs:inline">Nueva</span>
                <span className="hidden sm:inline"> Factura</span>
              </button>

              {/* History button - only for authenticated users */}
              {isAuthenticated && !isGuest && (
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 border rounded-lg transition-all font-medium text-xs sm:text-sm ${
                    showHistory
                      ? "bg-emerald-500 border-emerald-600 text-white"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                  <span className="hidden sm:inline">Historial</span>
                  {savedInvoices.length > 0 && (
                    <span className="bg-emerald-100 text-emerald-700 text-xs px-1.5 py-0.5 rounded-full">
                      {savedInvoices.length}
                    </span>
                  )}
                </button>
              )}

              {/* Save button - only for authenticated users */}
              {isAuthenticated && !isGuest && (
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all shadow-md hover:shadow-lg font-medium text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <>
                      <svg
                        className="animate-spin w-3 h-3 sm:w-4 sm:h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span className="hidden sm:inline">Guardando...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                        />
                      </svg>
                      <span>Guardar</span>
                      <span className="hidden sm:inline"> en Sistema</span>
                    </>
                  )}
                </button>
              )}

              {/* Logout/Login button */}
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all text-xs sm:text-sm"
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
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="hidden sm:inline">Salir</span>
                </button>
              ) : isGuest ? (
                <Link
                  to="/login"
                  onClick={exitGuestMode}
                  className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-xs sm:text-sm font-medium"
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
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="hidden sm:inline">Iniciar Sesión</span>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Tab Navigation */}
      <div className="lg:hidden bg-white border-b border-gray-200 sticky top-[57px] z-40">
        <div className="flex">
          <button
            onClick={() => setActiveTab("form")}
            className={`flex-1 py-3 text-center font-medium text-sm transition-all ${
              activeTab === "form"
                ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Formulario
            </span>
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex-1 py-3 text-center font-medium text-sm transition-all ${
              activeTab === "preview"
                ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
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
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              Vista Previa
            </span>
          </button>
        </div>
      </div>

      {/* History Section - Responsive */}
      {showHistory && isAuthenticated && !isGuest && (
        <div className="bg-white border-b border-gray-200 p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
              <h2 className="text-base sm:text-lg font-bold text-gray-800 flex items-center gap-2">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <span className="hidden sm:inline">Facturas Guardadas</span>
                <span className="sm:hidden">Historial</span>
                <span className="text-sm font-normal text-gray-500">
                  ({savedInvoices.length})
                </span>
              </h2>
              <button
                onClick={() => setShowHistory(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {savedInvoices.length === 0 ? (
              <div className="text-center py-6 sm:py-8 text-gray-400">
                <svg
                  className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="font-medium text-sm sm:text-base">
                  No hay facturas guardadas
                </p>
                <p className="text-xs sm:text-sm">
                  Las facturas aparecerán aquí cuando las guardes
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4">
                {savedInvoices.map((inv, index) => (
                  <div
                    key={inv.id || index}
                    className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:shadow-md transition-all cursor-pointer group"
                    onClick={() => {
                      setInvoice({
                        ...invoice,
                        ...inv,
                        items: inv.items || [],
                      });
                      setSelectedTemplate(inv.templateType || "cotizacion");
                      setShowHistory(false);
                      toast.info(`Factura ${inv.invoiceNumber} cargada`);
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs sm:text-sm font-bold text-purple-600">
                        {inv.invoiceNumber || `#${index + 1}`}
                      </span>
                      <span
                        className={`text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${
                          inv.templateType === "cotizacion"
                            ? "bg-cyan-100 text-cyan-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {inv.templateType === "cotizacion" ? "COT" : "FAC"}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-gray-800 truncate">
                      {inv.customerName || "Sin cliente"}
                    </p>
                    <p className="text-xs text-gray-500 truncate hidden sm:block">
                      {inv.companyName || "Sin empresa"}
                    </p>
                    <div className="flex items-center justify-between mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-400">
                        {inv.issueDate || "Sin fecha"}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-emerald-600">
                        {inv.templateType === "cotizacion" ? "Bs" : "$"}
                        {(inv.items || [])
                          .reduce(
                            (acc, item) =>
                              acc +
                              (item.quantity || 0) * (item.unitPrice || 0),
                            0,
                          )
                          .toFixed(2)}
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity text-center hidden sm:block">
                      Click para cargar
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="lg:flex lg:h-[calc(100vh-73px)]">
        {/* Left panel - Form (hidden on mobile when preview is active) */}
        <div
          className={`${activeTab === "form" ? "block" : "hidden"} lg:block lg:w-1/2 overflow-auto p-4 sm:p-6 bg-gradient-to-b from-gray-50 to-white`}
        >
          <InvoiceForm
            invoice={invoice}
            setInvoice={setInvoice}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
          />
        </div>

        {/* Right panel - Preview (hidden on mobile when form is active) */}
        <div
          className={`${activeTab === "preview" ? "block" : "hidden"} lg:block lg:w-1/2 bg-gray-800 min-h-[calc(100vh-130px)] lg:min-h-0`}
        >
          <InvoicePreview
            invoice={invoice}
            selectedTemplate={selectedTemplate}
          />
        </div>
      </main>
    </div>
  );
}
