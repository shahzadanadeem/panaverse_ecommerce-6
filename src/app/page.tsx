import Image from "next/image";
import {client} from "@/lib/sanityClient";
import {Image as IImage} from 'sanity';
import { urlForImage } from "../../sanity/lib/image";

export const getProductData = async () => {
  //const res = await client.fetch(`*[_type=="product"]`);
  //const res = await client.fetch(`*[_type=="product"][0]`);
  //const res = await client.fetch(`*[_type=="product"]{title, description}`);
  //const res = await client.fetch(`*[_type=="product" && _id=="12e9652f-0701-4f6e-93a4-73ae6350188c"]`);
  const res = await client.fetch(`*[_type=="product"]{
    price, _id, title, image, category -> {name}
  }`);
  
  return res;
}

interface IProduct {
  _id: string, 
  title: string,
  description: string
  price: number,
  image: IImage,
  category: {
    name: string
  }
}

export default async function Home() {

  //const data = await getProductData();
  const data: IProduct[] = await getProductData();
  console.log(data);

  return (
    <div className="grid grid-cols-[repeat(3,auto)] justify-center gap-x-9">
        {data.map((item) => (
          <div>
            <Image 
            className="max-h-[200px] object-cover object-top"
            width={200}
            height={300}
            src={urlForImage(item.image).url()} alt="product" />
            <h2>{item.title}</h2>
            <h3>{item.price}</h3>
            <button className="border py-2 px-6 rounded bg-blue-600 text-white">Add to Cart</button>
          </div>

        ))}
    </div>
  );
}
 