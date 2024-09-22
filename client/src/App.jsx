import './App.css';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

function App() {
  return (
    <div>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="navigation-menu-trigger">Item One</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink className="navigation-menu-link">Link</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {/* Repeat for other items */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="navigation-menu-trigger">Item Two</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink className="navigation-menu-link">Link</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {/* Add more items as needed */}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      <div style={{ marginTop: '60px' }}>
        {/* Your main content goes here */}
      </div>
    </div>
  );
}

export default App;
