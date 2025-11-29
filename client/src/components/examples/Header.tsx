import { ThemeProvider } from "../ThemeProvider";
import Header from "../Header";

export default function HeaderExample() {
  return (
    <ThemeProvider>
      <Header onNavigate={(section) => console.log("Navigate to:", section)} />
    </ThemeProvider>
  );
}
