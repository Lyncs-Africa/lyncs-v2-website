import { redirect } from "next/navigation";

export default function CarsIndexPage() {
  redirect("/cars/list");
}
