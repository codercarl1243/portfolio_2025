import { Card, Stack, Text } from "@sanity/ui";
import { ComplexElementProps, FieldProps, MemberField, MemberFieldProps, PrimitiveInputElementProps } from "sanity";
import { useId } from "react";
import StatusCard from "@/sanity/components/cards/status";
import useRenderMemberField from "./useRenderMemberField";
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { mergeAttributesSafe } from "./lib";
import clsx from "clsx";

type RenderMemberFieldProps = {
  informationString?: string;
  showInformationString?: boolean;
  showFieldLabel?: boolean;
  isLoading?: boolean;
  inputElementProps?: Partial<ComplexElementProps | PrimitiveInputElementProps>;
  isDisabled?: boolean;
  className?: string;
} & Pick<MemberFieldProps, 'member' | 'renderField' | 'renderInput' | 'renderPreview' | 'renderItem'>

/**
 * A reusable and accessible wrapper for rendering custom Sanity fields.
 *
 * This component wraps a `MemberField` and handles:
 * - Displaying contextual information and validation messages
 * - Showing a loading state
 * - Forcibly disabling nested inputs when needed
 * - Setting ARIA attributes to improve accessibility
 *
 * Designed to work with Sanity Studio's form field APIs and styled with Sanity UI.
 * @example
 ```tsx
  <RenderMemberField
      member={member}
      renderField={renderField}
      renderItem={renderItem}
      renderInput={renderInput}
      renderPreview={renderPreview}
      showInformationString={true}
      showFieldLabel={true}
      informationString="Useful text to display"
      isLoading={isFetching}
      isDisabled={shouldDisable}
  />
 * ```
 *  */
export default function RenderMemberField({
  member,
  renderField,
  renderInput,
  renderItem,
  renderPreview,
  showFieldLabel = true,
  showInformationString,
  informationString = "",
  isLoading = false,
  isDisabled = false,
  inputElementProps = {},
  className = ""
}: RenderMemberFieldProps): React.JSX.Element {
  if (isLoading) {
    return <StatusCard />
  }

  const { inputValue,
    handleDomChange, handlePatchChange,
    renderDescription, renderFieldLabel, validationMessages, renderValidationMessages,
    renderInformationString
  } = useRenderMemberField(member);

  const errorValidationId = useId();
  const warningValidationId = useId();
  const infoValidationId = useId();
  const informationStringId = useId();

  const ariaDescribedyIds = [
    validationMessages.warning.length && warningValidationId,
    validationMessages.info.length && infoValidationId,
    validationMessages.error.length && errorValidationId,
    showInformationString && informationStringId
  ].filter(Boolean).join(" ");

  // Create a fallback component that maintains your styling
  const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
    <Card tone="critical" padding={3} radius={4}>
      <Text size={2} weight="semibold">Error rendering field: {member.name}</Text>
      <Text size={1} muted style={{ marginTop: '0.5em' }}>
        {process.env.NODE_ENV !== 'production' ? error.message : 'An error occurred in this field'}
      </Text>
    </Card>
  );

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className={clsx('memberField', className) }>
        <MemberField
          member={member}
          renderField={(fieldProps) => {
            const { title, description, ...restProps } = fieldProps

            return (
              <Card
                tone={isDisabled ? "transparent" : "default"}
                padding={isDisabled ? 1 : 0}
                radius={4}
                className="memberfield__field"
              >
                <Stack space={3}>
                  {showFieldLabel && renderFieldLabel({
                    schemaType: fieldProps.schemaType,
                    title,
                    inputId: fieldProps.inputId
                  })}
                  {renderDescription(description)}
                  {showInformationString && renderInformationString(informationString, informationStringId)}
                  {renderValidationMessages(errorValidationId, 'error')}
                  {renderValidationMessages(warningValidationId, 'warning')}
                  {renderValidationMessages(infoValidationId, 'info')}
                  {
                    renderField({
                      ...restProps as Omit<FieldProps, "renderDefault">,
                      validation: [] // Suppress Sanity's default tooltip validation UI — render own cards ⬆️
                    })
                  }

                </Stack>
              </Card>
            )
          }}

          renderInput={(renderInputProps) => {
            return (
              renderInput({
                ...renderInputProps,
                // For complex inputs like radio buttons, set readOnly || onChange || onBlur etc. at the top level
                readOnly: renderInputProps.readOnly ?? isDisabled,
                onChange: (patchEvent) => handlePatchChange(patchEvent, renderInputProps.onChange),
                elementProps: {
                  // Now treated as a loose object so that we can sneak in a valid html attribute: aria-invalid
                  ...(renderInputProps.elementProps as any),
                  ...mergeAttributesSafe(
                    {
                      readOnly: renderInputProps.readOnly ?? isDisabled,
                      "aria-describedby": ariaDescribedyIds,
                      "aria-invalid": validationMessages.error.length > 0 ? true : undefined,
                      className: "memberField__input"
                    }, 
                    inputElementProps
                  ),
                  // For simple inputs like text fields, set readOnly || onChange || onBlur etc. in elementProps
                  onChange: (event: React.ChangeEvent<HTMLInputElement>) => handleDomChange(event, renderInputProps.onChange),
                  value: inputValue ?? "",
                },
              })
            )
          }}
          renderItem={renderItem}
          renderPreview={renderPreview}
        />
      </div>
    </ErrorBoundary>
  );
}