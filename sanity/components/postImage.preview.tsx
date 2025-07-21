import { Card } from "@sanity/ui";
import { PreviewProps } from "sanity";


export default function PostImagePreview({media, title}: PreviewProps){

    console.log("media", media);
    console.log("title", title);

    return (
        <Card tone={'positive'}>
            image preview
        </Card>
    )
}