// import Image from "next/image";
// import Sidebar from "./shared-components/sidebar/";
// import Button from "./shared-components/Button";
// import Header from "./shared-components/header";
// export default function Home() {
//   return (
//     <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
//       <Sidebar />
//       <Button buttonText="Learn More" variant="primary" onClickHandler={() => alert("Click was successful")} />
//         <Header
     
//     </div>
//   );
// }

// import Image from "next/image";
'use client';
import Header from "./shared-components/header";
import Sidebar from "./shared-components/sidebar";
import Button from "./shared-components/Button";

export default function Page() {
  const handleClick = () => alert('Clicked');

  return (
    <>
      <Header />
      <Sidebar />
      {/* <Button className="mx-auto pr-3.5" buttonText="Click me" variant="primary" onClickHandler={handleClick} /> */}
      <Button variant="primary" buttonText="Approve & Disburse" onClickHandler={() => {}} />
      <Button variant="secondary" buttonText="Reject Application" onClickHandler={() => {}} />

    </>
  );
}



