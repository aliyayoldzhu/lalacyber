const Header = () => {
  return (
    <header className="border-b border-gentle-border bg-background">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <div className="font-semibold text-lg text-foreground">
            Brand
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-text-subtle hover:text-foreground transition-colors">
              Home
            </a>
            <a href="#" className="text-text-subtle hover:text-foreground transition-colors">
              About
            </a>
            <a href="#" className="text-text-subtle hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;