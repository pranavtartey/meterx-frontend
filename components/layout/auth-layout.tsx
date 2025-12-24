import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div>
      <div>
        This is the auth layout.
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
