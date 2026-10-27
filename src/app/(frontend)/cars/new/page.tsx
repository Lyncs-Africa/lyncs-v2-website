import { redirect } from "next/navigation";

export default function CarsNewPage() {
  redirect("/cars/list?tab=brand-new");
}
