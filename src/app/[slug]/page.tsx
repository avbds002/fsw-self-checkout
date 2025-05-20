/*
Server components
pode ser async
pode chamar recursos do banco de dados
não pode usar hooks e nem ter iteratividade com eventos
*/

import Image from "next/image";

import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";

import ConsumptionMethodOption from "./components/consumption-method-option";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;

  const restaurant = await getRestaurantBySlug(slug);

  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
      {/*LOGO E TITULO*/}
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant?.avatarImgUrl}
          alt={restaurant?.name}
          width={82}
          height={82}
        />
        <h2 className="font-semibold">{restaurant.name}</h2>
      </div>
      {/*BEM VINDO*/}
      <div className="space-y-2 pt-24 text-center">
        <h3 className="text-2xl font-semibold">Seja bem vindo!</h3>
        <p className="opacity-55">
          Escolha como prefere aproveitar sua refeição. Estamos aqui para
          oferecer praticidade e sabor em cada detalhe!
        </p>
      </div>
      {/*Cards para comer e para levar*/}
      <div className="grid grid-cols-2 pt-14">
        <ConsumptionMethodOption
          slug={slug}
          buttonText="Para comer aqui"
          imgAlt="Comer aqui"
          imgUrl="/dine-in.png"
          option="DINE_IN"
        />
        <ConsumptionMethodOption
          slug={slug}
          buttonText="Para levar"
          imgAlt="Para levar"
          imgUrl="/takeaway.png"
          option="TAKEAWAY"
        />
      </div>
    </div>
  );
};

export default RestaurantPage;
