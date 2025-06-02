import { getServicesAndProductsList } from "@/firebase/firestore/servicesProducts";
import ServiceLevel1 from "@/components/Services/ServiceLevel1";

export async function generateStaticParams() {
  const list = await getServicesAndProductsList(null, null, null, "services");
  return list.map((item) => ({
    id: item,
  }));
}

export default function ServicePages({ params }) {
  const { id } = params;
  const decoded = decodeURIComponent(id);

  return <ServiceLevel1 id={decoded} />;
}
