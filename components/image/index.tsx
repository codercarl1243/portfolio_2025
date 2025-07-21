'use client';

import { TImageProps } from "./image.type";
import ImageRenderer from './image.renderer';
import { ErrorBoundary } from "react-error-boundary";
import logErrorToService from "@/lib/Logger";
import { RiFileDamageLine } from "@remixicon/react";
import Icon from "../icon";


export default function MainImage(props: TImageProps) {
    return (
        <ErrorBoundary
            fallback={<FallbackImage width={props.width ?? 800} height={props.height ?? 300} />}
            onError={logErrorToService}
        >
            <ImageRenderer {...props} />
        </ErrorBoundary>
    )
}

export function FallbackImage({ width, height }: React.ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <div style={{ width, height, display: "grid", placeContent: "center", cursor: "pointer" }} className="fallback-image">
            <Icon icon={RiFileDamageLine} size={"lg"}/>
        </div>
    )
}