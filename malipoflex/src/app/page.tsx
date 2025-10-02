// src/app/page.tsx
"use client";
import Header from "./shared-components/header";
import Sidebar from "./shared-components/sidebar";
import Button from "./shared-components/Button";
// import MembersManagement from "./membermanagement/page"; // Corrected to default import
import MembersManagement from "./membermanagement";
// import SavingManagement from "./savingsmanagement"; // Assuming this is also a page or component
import { SavingManagement } from "./savingsmanagement";

export default function Page() {
  const handleClick = () => alert("Clicked");

  return (
    <>
      <Header />
      {/* <Sidebar /> - Uncomment if needed */}
      {/* <Button className="mx-auto pr-3.5" buttonText="Click me" variant="primary" onClickHandler={handleClick} /> */}
      {/* <Button variant="primary" buttonText="Approve & Disburse" onClickHandler={() => {}} />
      <Button variant="secondary" buttonText="Reject Application" onClickHandler={() => {}} /> */}
      {/* <MembersManagement /> */}
      <SavingManagement />
    </>
  );
}