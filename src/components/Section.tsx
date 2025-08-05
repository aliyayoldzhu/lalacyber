interface SectionProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

const Section = ({ title, description, children }: SectionProps) => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
            {title}
          </h2>
          <p className="text-lg text-text-subtle max-w-2xl mx-auto">
            {description}
          </p>
        </div>
        {children}
      </div>
    </section>
  );
};

export default Section;