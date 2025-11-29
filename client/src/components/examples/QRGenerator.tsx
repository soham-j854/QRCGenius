import { ThemeProvider } from "../ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import QRGenerator from "../QRGenerator";

export default function QRGeneratorExample() {
  return (
    <ThemeProvider>
      <QRGenerator />
      <Toaster />
    </ThemeProvider>
  );
}
