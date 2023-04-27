import Screen from "./Screen";

interface IProps {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: IProps) {
  return <Screen>{children}</Screen>;
}
