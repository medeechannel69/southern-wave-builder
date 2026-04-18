import type jsPDF from "jspdf";

// Sarabun Regular + Bold from Google Fonts (TTF)
const SARABUN_REGULAR_URL = "https://fonts.gstatic.com/s/sarabun/v15/DtVjJx26TKEr37c9YL5rBQUPFw.ttf";
const SARABUN_BOLD_URL = "https://fonts.gstatic.com/s/sarabun/v15/DtVmJx26TKEr37c9YL5rXFI3MR-T6Q.ttf";

let cachedRegular: string | null = null;
let cachedBold: string | null = null;

async function fetchAsBase64(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load font: ${url}`);
  const buf = await res.arrayBuffer();
  let binary = "";
  const bytes = new Uint8Array(buf);
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunk)));
  }
  return btoa(binary);
}

export async function registerSarabun(doc: jsPDF): Promise<void> {
  if (!cachedRegular) cachedRegular = await fetchAsBase64(SARABUN_REGULAR_URL);
  if (!cachedBold) cachedBold = await fetchAsBase64(SARABUN_BOLD_URL);

  doc.addFileToVFS("Sarabun-Regular.ttf", cachedRegular);
  doc.addFont("Sarabun-Regular.ttf", "Sarabun", "normal");
  doc.addFileToVFS("Sarabun-Bold.ttf", cachedBold);
  doc.addFont("Sarabun-Bold.ttf", "Sarabun", "bold");

  doc.setFont("Sarabun", "normal");
}
