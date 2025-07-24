
import { Card, Stack } from "@sanity/ui";
import { AnimatePresence } from 'framer-motion';
import Slide from "@/components/motionAnimations/slide";
import useMessageCard, { messageLevelType } from "./useMessage";
import Icon from "@/components/icon";
import { P } from "@/components";
import clsx from "clsx";

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
    const icon = getIcon(level);
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
            className="message-card"
            {...props}
        >
                <Icon className="message-card__icon" icon={icon} />
                <Stack space={level === "info" ? 0 : 2}>
                    <P 
                    id={id} 
                    className={clsx("message-card__heading", level === "info" ? "sr-only" : "")} 
                    >
                        {getHeading(level)}
                    </P>
                    <AnimatePresence
                        initial={false}
                        mode="popLayout"
                    >
                        {message ? (
                            <Slide className="whitespace-pre" key={`message-${message.substring(0, 20)}`}>
                                <p>{message}</p>
                            </Slide>
                        ) : (
                            <ul className="message-card__list">
                                {messagesToRender.map(message => (
                                    <Slide key={`message-${message.substring(0, 20)}`}>
                                        <li
                                            style={{ padding: '3px 4px' }}
                                            className="message-card__list--item"
                                        >
                                            {message}
                                        </li>
                                    </Slide>
                                ))}
                            </ul>

                        )}
                    </AnimatePresence>
                </Stack>
        </Card>
    )
}
