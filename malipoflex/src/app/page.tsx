import Image from "next/image";
import Sidebar from "./shared-components/sidebar";
import TeaserScreen from "./Teaser/page";
import SignUpPage from "./register/page";
import LoginPage from "./login/page";
import Onboarding from "./Onboarding/page";
import Getstarted from "./Getstarted/page";
export default function Home() {
return (
    <div >
      {/* <Register/> */}
      {/* <Sidebar /> */}
      {/* <TeaserScreen/>
      <Getstarted/> */}
      {/* <SignUpPage/>
      <LoginPage/> */}
      <Onboarding/>
    </div>
  );
}
