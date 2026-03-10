import { useRef } from "react";
import { toast } from "react-toastify";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import TemplateSalud from "./templates/TemplateSalud";
import TemplateCotizacion from "./templates/TemplateCotizacion";
import TemplateModerno from "./templates/TemplateModerno";
import TemplateMinimalista from "./templates/TemplateMinimalista";

export default function InvoicePreview({ invoice, selectedTemplate }) {
  const previewRef = useRef(null);

  const getTemplate = () => {
    switch (selectedTemplate) {
      case "cotizacion":
        return <TemplateCotizacion invoice={invoice} />;
      case "moderno":
        return <TemplateModerno invoice={invoice} />;
      case "minimalista":
        return <TemplateMinimalista invoice={invoice} />;
      case "salud":
      default:
        return <TemplateSalud invoice={invoice} />;
    }
  };

  const exportAsImage = async () => {
    if (!previewRef.current) return;

    try {
      toast.info("Generando imagen...");
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });

      const link = document.createElement("a");
      link.download = `factura-${invoice.invoiceNumber || Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      toast.success("Imagen descargada correctamente");
    } catch (error) {
      console.error("Error al exportar imagen:", error);
      toast.error("Error al exportar la imagen");
    }
  };

  const exportAsPDF = async () => {
    if (!previewRef.current) return;

    try {
      toast.info("Generando PDF...");
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [794, 1123],
      });

      pdf.addImage(imgData, "PNG", 0, 0, 794, 1123);
      pdf.save(`factura-${invoice.invoiceNumber || Date.now()}.pdf`);
      toast.success("PDF descargado correctamente");
    } catch (error) {
      console.error("Error al exportar PDF:", error);
      toast.error("Error al exportar el PDF");
    }
  };

  const shareOnWhatsApp = async () => {
    if (!previewRef.current) return;

    try {
      toast.info("Preparando para compartir...");
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });

      // Convertir canvas a blob
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png"),
      );

      // Crear mensaje para WhatsApp
      const total = invoice.items.reduce(
        (acc, item) => acc + item.quantity * item.unitPrice,
        0,
      );
      const message =
        `📄 *Cotización*%0A%0A` +
        `👤 Cliente: ${invoice.customerName || "N/A"}%0A` +
        `📋 Número: ${invoice.invoiceNumber || "N/A"}%0A` +
        `💰 Total: $${total.toFixed(2)}%0A%0A` +
        `📅 Fecha: ${invoice.issueDate || new Date().toLocaleDateString("es-ES")}`;

      // Si soporta Web Share API con archivos
      if (
        navigator.canShare &&
        navigator.canShare({
          files: [new File([blob], "factura.png", { type: "image/png" })],
        })
      ) {
        const file = new File([blob], "factura.png", { type: "image/png" });
        await navigator.share({
          files: [file],
          title: "Factura",
          text: message.replace(/%0A/g, "\n").replace(/\*/g, ""),
        });
        toast.success("Compartido exitosamente");
      } else {
        // Fallback: abrir WhatsApp Web con mensaje
        window.open(`https://wa.me/?text=${message}`, "_blank");
        toast.info("Abriendo WhatsApp...");
      }
    } catch (error) {
      console.error("Error al compartir:", error);
      toast.error("Error al compartir, abriendo WhatsApp...");
      // Fallback simple
      const total = invoice.items.reduce(
        (acc, item) => acc + item.quantity * item.unitPrice,
        0,
      );
      const message = `Factura - Cliente: ${invoice.customerName || "N/A"}, Total: $${total.toFixed(2)}`;
      window.open(
        `https://wa.me/?text=${encodeURIComponent(message)}`,
        "_blank",
      );
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-3 sm:px-4 py-2 sm:py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
        <h3 className="font-semibold text-gray-700 flex items-center gap-2 text-sm sm:text-base">
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
        </h3>
        <div className="flex gap-1.5 sm:gap-2 w-full sm:w-auto justify-center sm:justify-end">
          {/* Exportar Imagen */}
          <button
            onClick={exportAsImage}
            title="Exportar como Imagen"
            className="flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg text-xs sm:text-sm font-medium flex-1 sm:flex-none"
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
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="hidden xs:inline sm:inline">Imagen</span>
          </button>

          {/* Exportar PDF */}
          <button
            onClick={exportAsPDF}
            title="Exportar como PDF"
            className="flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg text-xs sm:text-sm font-medium flex-1 sm:flex-none"
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
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <span className="hidden xs:inline sm:inline">PDF</span>
          </button>

          {/* Compartir WhatsApp */}
          <button
            onClick={shareOnWhatsApp}
            title="Compartir por WhatsApp"
            className="flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg text-xs sm:text-sm font-medium flex-1 sm:flex-none"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="hidden xs:inline sm:inline">WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Preview container */}
      <div className="flex-1 overflow-auto bg-gray-200 p-2 sm:p-4 lg:p-6">
        <div className="flex justify-center">
          <div
            ref={previewRef}
            className="shadow-2xl transform origin-top scale-[0.35] sm:scale-50 md:scale-[0.6] lg:scale-75"
          >
            {getTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
}
