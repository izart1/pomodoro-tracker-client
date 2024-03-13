import {
  CalendarRange,
  KanbanSquare,
  LayoutDashboard,
  Settings,
  Timer,
} from "lucide-react";

import { DASHBOARD_PAGE } from "@/config/pages-url.config";

import type { IMenuItem } from "./menu.interface";

export const MENU: IMenuItem[] = [
  {
    icon: LayoutDashboard,
    link: DASHBOARD_PAGE.HOME,
    name: "Dashboard",
  },
  {
    icon: KanbanSquare,
    link: DASHBOARD_PAGE.TASKS,
    name: "Tasks",
  },
  {
    icon: Timer,
    link: DASHBOARD_PAGE.TRACKER,
    name: "Tracker",
  },
  {
    icon: CalendarRange,
    link: DASHBOARD_PAGE.TIME_BLOCKING,
    name: "Time blocking",
  },
  {
    icon: Settings,
    link: DASHBOARD_PAGE.SETTINGS,
    name: "Settings",
  },
];
