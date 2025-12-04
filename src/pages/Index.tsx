import { PasswordGenerator } from "@/components/PasswordGenerator";

const Index = () => {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <PasswordGenerator />
      </div>
    </main>
  );
};

export default Index;
