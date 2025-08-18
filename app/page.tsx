import Image from "next/image";
import MapComponent from "./components/map";

export default function Home() {
  return (
    <div className="w-full h-full">
      <MapComponent/>
    </div>
  );
}
