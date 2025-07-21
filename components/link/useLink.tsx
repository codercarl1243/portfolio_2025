
import { RiExternalLinkLine, RiMailLine, RiPhoneLine } from "@remixicon/react";
import { LinkProps } from "./link.type";
export default function useLink() {

    function getIcon(variant: LinkProps['variant']) {
            switch (variant) {
                case "external":
                    return RiExternalLinkLine;
                case "tel":
                    return RiPhoneLine;
                case "mailto":
                    return RiMailLine;
                default:
                    return null;
            }
    }

function getRel(variant: LinkProps["variant"]): string | undefined {
  switch (variant) {
    case "external":
    case "mailto":
    case "tel":
      return "noopener noreferrer";
    case "onPage":
    case "internal":
    default:
      return undefined;
  }
}
    return {
        getIcon,
        getRel
    }
}