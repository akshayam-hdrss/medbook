import CharityPage from "@/components/CharityPage";
import { getCharities } from "@/firebase/firestore/charity";

export async function generateStaticParams() {
  const data = await getCharities();
  return data.map((doc) => ({ id: doc.id }));
}

export default function Page({ params }) {
  const { id } = params;
  return <CharityPage id={id} />;
}
