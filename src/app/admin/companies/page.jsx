import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>About Companies</h1>
      <div className="grid lg:grid-cols-3 gap-5 px-5 pt-5">
     
        <Link className="px-5 py-1.5 rounded-md bg-kaavi text-white w-fit"  href={"/admin/companies/aktechnologies"}>Ak Technologies</Link>
        <Link className="px-5 py-1.5 rounded-md bg-kaavi text-white w-fit" href={"/admin/companies/akmedia"}>Ak Media</Link>
        <Link className="px-5 py-1.5 rounded-md bg-kaavi text-white w-fit" href={"/admin/companies/akassociates"}>Ak Associates</Link>
        <Link className="px-5 py-1.5 rounded-md bg-kaavi text-white w-fit" href={"/admin/companies/akfinearts"}>Ak FineArts</Link>
        <Link className="px-5 py-1.5 rounded-md bg-kaavi text-white w-fit" href={"/admin/companies/akpublishers"}>Ak Publishers</Link>
      </div>
    </div>
  );
}
