import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

function ExecutiveGaurd() {

  return (
    <div className="py-32 text-center text-3xl">
      <h1 className="mb-7">
        You're trying to access Executive Panel
      </h1>
      <h1>
        Please{" "}
        <Link href="/login/exec" className="text-blue-800 font-bold uppercase">
          login{" "}
        </Link>
        to continue
      </h1>
    </div>
  );
}

export default ExecutiveGaurd;
