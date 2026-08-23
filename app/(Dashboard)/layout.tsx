import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/Header";
import AppSidebar from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Dashboard from "../dashboard/page";





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (


    <>
      <Header />
      <div className="grid grid-cols-12">

        <div className="col-span-2">
          <SidebarProvider>
            <AppSidebar />
            <main>
              <SidebarTrigger />

            </main>
          </SidebarProvider>
        </div>
        <div className="col-span-10">
          {children}


        </div>



      </div>

    </>


  );
}
