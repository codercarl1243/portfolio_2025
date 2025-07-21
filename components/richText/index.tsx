import { PortableText } from "next-sanity";
import { marks } from "./marks";
import { types } from "./types";
import { block } from "./block";
import { lists } from "./lists";

const portableTextComponents = {
  block,
  lists,
  types,
  marks
}

export default function Main({ value }: { value: any }) {
  return (
    // <div className="!max-w-fit prose py-4 ">
    // <div>
      <PortableText value={value} components={portableTextComponents} />
    // </div>
  )
}