import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { MouseEventHandler } from "react";

export type TLinkProps = {
    icon: IconProp;
    text: string;
    href: string;
    onClick: MouseEventHandler<HTMLAnchorElement> | undefined;
};
