"use client"


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

import { useSidebar } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { ChevronDown, Plus } from "lucide-react"
import { usePathname } from "next/navigation"
import path from "path"





const AppSidebar = () => {


  const pathname = usePathname();

  return (

    <>

      <div className="mt-5">
        <Sidebar>
          <SidebarHeader>
            <SidebarMenu>

              <SidebarMenuItem>
                <SidebarMenuButton  className="data-[active=true]:bg-blue-900 data-[active=true]:text-white" render={<a href="/" />}  {...(pathname  == '/' ? { isActive : true } : { isActive : false }) } >

                  <span>Home </span>
                </SidebarMenuButton>

              </SidebarMenuItem>

               <SidebarMenuItem>
                <SidebarMenuButton  className="data-[active=true]:bg-blue-900 data-[active=true]:text-white" render={<a href="/users" />} {...(pathname == "/users" ? {isActive : true} : {isActive : false} )}>

                  <span>Users</span>
                </SidebarMenuButton>

              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton render={<a href="/team" />}>

                  <span>Team</span>
                </SidebarMenuButton>

              </SidebarMenuItem>


            </SidebarMenu>
          </SidebarHeader>
        </Sidebar>
      </div>

    </>

  )

}

export default AppSidebar;