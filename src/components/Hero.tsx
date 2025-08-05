const Hero = () => {
  return (
    <section className="py-section px-6">
      <div className="container mx-auto text-center max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-light text-foreground mb-6 leading-tight">
          Simple & Clean
        </h1>
        <p className="text-xl text-text-subtle mb-8 max-w-2xl mx-auto leading-relaxed">
          A minimal approach to design, focusing on whitespace, typography, and clarity. 
          Less is more in the modern digital landscape.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="px-8 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors shadow-soft">
            Get Started
          </button>
          <button className="px-8 py-3 border border-gentle-border text-foreground rounded-md hover:bg-secondary transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;