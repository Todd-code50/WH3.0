import BikeConfigurator from "@/components/configurator/BikeConfigurator";

export const metadata = {
  title: "Bike Configurator | The Wheelhouse",
  description: "Build your dream bike. Choose your frame, colour, groupset, wheels, tyres and finishing kit.",
};

export default function ConfigurePage() {
  return <BikeConfigurator />;
}
