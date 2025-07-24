import { SanityReference } from "@sanity/image-url/lib/types/types";
import { ObjectInputProps } from "sanity";
import RenderMemberField from "./memberFields/RenderMemberField";
import { getFieldMember } from "./memberFields/lib";
import Image, { FallbackImage } from '@/components/image';
import { valueProps } from "@/components/image/image.type";
import { useCallback, useState } from "react";
import Button from "@/components/button";
import { Card, Dialog, Stack } from "@sanity/ui";

type value = {
    image?: valueProps;
    asset?: SanityReference;
    alt: string | undefined;
}
type ExpandedObjectInputProps = ObjectInputProps<value>

export default function PostImageInput(props: ExpandedObjectInputProps) {
    const { value, members, renderField, renderInput, renderItem, renderPreview } = props;
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const onClose = useCallback(() => setDialogIsOpen(false), [])
    const onOpen = useCallback(() => setDialogIsOpen(true), [])

    const altFieldMember = getFieldMember(members, 'alt');
    const updatedMembers = members.filter(member => member.key !== 'field-alt')
    const ImageComponent = () => {

        const imageObject = value?.asset || value?.image || null;

        if (!value || !imageObject) {
            return <FallbackImage height={100} width={600} />
        }
        return <Image
            value={value}
            alt={value?.alt}
            height={100}
            width={600}
        />
    }

    const DialogContent = () => {
        return (
            <Card padding={2}>
                <Stack space={[3, 3, 4, 5]}>
                    {props.renderDefault({ ...props, members: updatedMembers })}
                    {altFieldMember &&
                        <RenderMemberField
                            member={altFieldMember}
                            renderField={renderField}
                            renderItem={renderItem}
                            renderPreview={renderPreview}
                            renderInput={renderInput}
                        />
                    }
                </Stack>
            </Card>
        )
    }

    return (
        <div>
            <Button onClick={onOpen}>
                <ImageComponent />
            </Button>
            {dialogIsOpen && (
                <Dialog
                    onClose={onClose}
                    id="post_main_image"
                    width={100}
                >
                    {<DialogContent />}
                </Dialog>
            )}
        </div>
    )
}