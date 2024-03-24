import appLogo from "../assets/harower-text-logo.svg";
import Image from "next/image";
const AppLogo = () => {
  return <Image alt="vice-logo" src={appLogo} className="w-[144px] h-[28px]" />;
};

export default AppLogo;
