import type { Metadata } from "next";

import { Heading } from "@/components/ui/Heading";

import { NO_INDEX_PAGE } from "@/constants/seo.constants";

import Tracker from "./Tracker";

export const metadata: Metadata = {
  title: "Pomodoro tracker",
  ...NO_INDEX_PAGE,
};

export default function TrackerPage() {
  return (
    <div>
      <Heading title="Pomodoro tracker" />
      <Tracker />
    </div>
  );
}
