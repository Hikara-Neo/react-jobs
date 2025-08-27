import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  bg?: string;
};

const Card = ({ children, bg = "bg-grey-100" }: CardProps) => {
  return <div className={`${bg} p-6 rounded-lg shadow-md`}>{children}</div>;
};

export default Card;
