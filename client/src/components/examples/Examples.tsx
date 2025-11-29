import { ThemeProvider } from "../ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import Examples from "../Examples";

export default function ExamplesExample() {
  return (
    <ThemeProvider>
      <Examples />
      <Toaster />
    </ThemeProvider>
  );
}
