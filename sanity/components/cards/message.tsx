
import { Card, Flex, Stack, Text } from "@sanity/ui";
import { AnimatePresence } from 'framer-motion';
import Slide from "@/components/motionAnimations/slide";
import useMessageCard, { messageLevelType } from "./useMessage";

type BaseProps = React.ComponentProps<typeof Card> & {
    level?: messageLevelType;
};

type MessageOnly = {
    message: string;
    messages?: never;
};

type MessagesOnly = {
    message?: never;
    messages: string[];
};

type MessageCardProps = BaseProps & (MessageOnly | MessagesOnly);


export default function MessageCard({ id, messages, message, level = "error", ...props }: MessageCardProps) {
    if (!messages?.length && !message) return null;

    const { getTone, getHeading, getRole, getIcon } = useMessageCard();
    const Icon = getIcon(level);
    const messagesToRender = messages || [];
    return (
        <Card
            tone={getTone(level)}
            paddingY={1}
            paddingX={1}
            radius={2}
            border
            shadow={2}
            role={getRole(level)}
            aria-labelledby={id}
            aria-live={level === "error" ? "assertive" : "polite"}
            overflow="hidden"
            {...props}
        >
            <Flex align={"flex-start"} gap={2} paddingY={1}>
                <Icon style={{ height: '1.5rem', width: '1.5rem', marginBlockStart: '2px' }} />
                <Stack space={level === "info" ? 0 : 2}>
                    <Text id={id} className={level === "info" ? "sr-only" : ""} weight="semibold" size={2} >{getHeading(level)}</Text>
                    <AnimatePresence
                        initial={false}
                        mode="popLayout"
                    >
                        {message ? (
                            <Slide className="whitespace-pre" key={`message-${message.substring(0, 20)}`}>
                                <p>{message}</p>
                            </Slide>
                        ) : (
                            <ul className="border rounded p-2! border-[var(--card-border-color)]">
                                {messagesToRender.map(message => (
                                    <Slide key={`message-${message.substring(0, 20)}`}>
                                        <li
                                            style={{ padding: '3px 4px' }}
                                            className="whitespace-pre text-wrap! max-w-[60ch]"
                                        >
                                            {message}
                                        </li>
                                    </Slide>
                                ))}
                            </ul>

                        )}
                    </AnimatePresence>
                </Stack>
            </Flex>
        </Card>
    )
}
