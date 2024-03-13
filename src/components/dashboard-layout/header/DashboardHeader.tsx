"use client";

import DashboardProfile from "./profile/DashboardProfile";
import GlobalLoader from "./profile/GlobalLoader";

const DashboardHeader = () => {
  return (
    <header>
      <GlobalLoader />
      <DashboardProfile />
    </header>
  );
};

export default DashboardHeader;
