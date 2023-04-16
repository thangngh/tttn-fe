import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

interface IProp {
  children: React.ReactNode;
}

export default function Screen({ children }: IProp) {
  return (
    <div className="flex flex-col h-full w-full ">
      <Header />
      <div className="flex-1 bg-base-content">{children}</div>
      <Footer />
    </div>
  );
}
