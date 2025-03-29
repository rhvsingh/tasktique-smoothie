
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AuthProvider } from "@/providers/AuthProvider";
import "../index.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Productivity & Time Management Assistant",
  description: "AI-Powered Productivity & Time Management Assistant using Neomorphism UI design",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <DndProvider backend={HTML5Backend}>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              {children}
            </TooltipProvider>
          </DndProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
