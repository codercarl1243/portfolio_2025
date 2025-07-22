import { Card, Flex} from "@sanity/ui";
import { FieldProps } from "sanity";


export default function FieldComponentWithNoLabelOrDescription(props: FieldProps) {
    return (
        <Card border={false} padding={0}>
                {props.children}
        </Card>
    )


}