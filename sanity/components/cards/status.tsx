import { Card, Flex, Spinner, Text } from "@sanity/ui";

type BaseCardProps = React.ComponentProps<typeof Card>;

type StatusCardProps =
  | (BaseCardProps & { message?: string; children?: never })
  | (BaseCardProps & { message: never; children: React.ReactNode });

/**
 * A reusable status card that displays a spinner with either a default or custom message.
 * You can provide a simple message using the `message` prop,
 * or fully customize the contents by providing `children`.
 *
 * Only one of `message` or `children` can be used at a time.
 *
 * @example
 * // Default loading message ("Loading…")
 * <StatusCard />
 *
 * @example
 * // Custom message
 * <StatusCard message="Saving..." />
 *
 * @example
 * // Custom content with children
 * <StatusCard>
 *   <p>Fetching data from API...</p>
 * </StatusCard>
 *
 * @example
 * // ❌ Incorrect usage: both `message` and `children` provided
 * <StatusCard message="Awesome Message...">
 *   <p>Children just wanna have fun</p>
 * </StatusCard>
 */
export default function StatusCard({
  message = "Loading…",
  children,
  ...props
}: StatusCardProps) {
  return (
    <Card tone="transparent" padding={2} aria-live="polite" role="status" {...props}>
      <Flex align="center" gap={2}>
        <Spinner />
        {children ?? <Text size={1}>{message}</Text>}
      </Flex>
    </Card>
  );
}