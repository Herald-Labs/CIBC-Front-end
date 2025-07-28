// Header.js
import { PageNav } from "@/components/header-bar/components/page-nav.tsx";
import TeamSwitcher from "@/components/header-bar/components/team-switcher.tsx";
import { Search } from "@/components/header-bar/components/search.tsx";
import { UserNav } from "@/components/header-bar/components/user-nav.tsx";

export default function HeaderBar() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <TeamSwitcher />
        <PageNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <UserNav />
        </div>
      </div>
    </header>
  );
}

