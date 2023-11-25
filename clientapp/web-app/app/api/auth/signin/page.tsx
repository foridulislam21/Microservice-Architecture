import EmptyFilter from "@/app/components/EmptyFilter";
import React from "react";

export default function Page({
  searchParams,
}: {
  searchParams: { callbackUrl: string };
}) {
  return (
    <EmptyFilter
      title="You need to logged In"
      subtitle="Please click on sign in"
      showLogin
      callbackUrl={searchParams.callbackUrl}
    />
  );
}
