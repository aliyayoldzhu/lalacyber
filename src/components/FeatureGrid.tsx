const features = [
  {
    title: "Minimal Design",
    description: "Clean, uncluttered interfaces that focus on what matters most."
  },
  {
    title: "Whitespace",
    description: "Strategic use of space to create breathing room and clarity."
  },
  {
    title: "Typography",
    description: "Carefully chosen fonts and spacing for optimal readability."
  }
];

const FeatureGrid = () => {
  return (
    <div className="grid md:grid-cols-3 gap-12">
      {features.map((feature, index) => (
        <div key={index} className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-secondary rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-primary rounded-full"></div>
          </div>
          <h3 className="text-xl font-medium text-foreground mb-3">
            {feature.title}
          </h3>
          <p className="text-text-subtle leading-relaxed">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FeatureGrid;