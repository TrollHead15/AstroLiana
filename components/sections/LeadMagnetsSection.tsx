"use client";

const LeadMagnetsSection = () => {
  return (
    <section
      id="lead-magnets"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-primary/5"
      aria-label="Lead magnets section"
    >
      <div className="w-full max-w-6xl mx-auto text-center">
        <h2 className="text-h2 font-heading text-primary mb-6">
          Выберите свой подарок
        </h2>
        <p className="text-body text-foreground/70">
          Здесь будут размещены лид-магниты
        </p>
      </div>
    </section>
  );
};

export default LeadMagnetsSection;
