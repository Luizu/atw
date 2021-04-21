import { Stack } from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";

import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title='GERAL'>
        <NavLink icon={RiDashboardLine} href="/dashboard" children="Dashboard" />
        <NavLink icon={RiContactsLine} href="/users" children="Franqueados" />
        <NavLink icon={RiContactsLine} href="/franchise" children="Franquias" />
      </NavSection>

      <NavSection title="SUPORTE">
        <NavLink icon={RiInputMethodLine} href="/ticket" children="Chamados" />
        <NavLink icon={RiGitMergeLine} href="/automation" children="Automação" />
      </NavSection>
    </Stack>
  )
}