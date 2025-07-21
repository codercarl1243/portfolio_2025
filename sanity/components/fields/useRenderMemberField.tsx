import { MemberFieldProps, FieldProps, FormPatch, set, PatchEvent, isReference } from "sanity";
import { messageLevelType } from "../cards/useMessage";
import MessageCard from "../cards/message";
import { AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "./lib";
import { hasCustomLayout, isArrayWithListOptions, isBoolean, isFieldSet, isFile, isImage, isPortableText } from "./guards";

type PatchVariants = FormPatch | PatchEvent | FormPatch[]
type UseRenderMemberFieldResult = {
  inputValue: string | undefined
  setInputValue: React.Dispatch<React.SetStateAction<string | undefined>>
  setInformationString: React.Dispatch<React.SetStateAction<string>>
  handleDomChange: (e: React.ChangeEvent<HTMLInputElement>, onChange: Function) => void
  handlePatchChange: (
    patch: FormPatch | PatchEvent | FormPatch[],
    cb: (patch: FormPatch | PatchEvent | FormPatch[]) => void
  ) => void
  validationMessages: Record<messageLevelType, string[]>
  renderDescription: (description: FieldProps["description"]) => React.JSX.Element | null
  renderFieldLabel: (args: Pick<FieldProps, "schemaType" | 'title' | 'inputId'>) => React.JSX.Element | null
  renderInformationString: (string: string, id: string | undefined) => React.JSX.Element | null
  renderValidationMessages: (id: string | undefined, level: messageLevelType) => React.JSX.Element | null
}
/**
 * Utility functions to support consistent rendering of Sanity MemberFields.
 * These help with validation handling, conditional labeling, and safe member access.
 */
export default function useRenderMemberField(member: MemberFieldProps['member']): UseRenderMemberFieldResult {

    function invariantMember(member: MemberFieldProps['member']): asserts member is MemberFieldProps['member'] {
        if (!member) {
            throw new Error("Expected `member` to be present in useRenderMemberField");
        }
    }
    invariantMember(member);
    // Create a stable reference to a debounced function
    const debouncedChangeRef = useRef<((value: string | undefined, onChange: Function) => void) | null>(null);
    const [inputValue, setInputValue] = useState<string | undefined>();
    const [validationMessages, setValidationMessages] = useState<Record<messageLevelType, string[]>>({
        error: [],
        warning: [],
        info: []
    });
    const [informationString, setInformationString] = useState('')

    useEffect(() => {
        if (!member.field?.value) return;
        const value = member?.field?.value;
        if (typeof value === 'string') {
            setInputValue(value);
        }

    }, [member?.field?.value]);

    // Sanity validation messages dont let us animate them in so we keep in state.
    useEffect(() => {
        if (!member?.field?.validation) return;

        const validation = member.field?.validation;

        const nextMessages = {
            error: validation.filter(m => m.level === "error").map(m => m.message),
            warning: validation.filter(m => m.level === "warning").map(m => m.message),
            info: validation.filter(m => m.level === "info").map(m => m.message),
        };

        setValidationMessages(nextMessages);
    }, [member.field?.validation]);

    // Initialize the debounced function once
    useEffect(() => {
        debouncedChangeRef.current = debounce((value: string | undefined, onChange: Function) => {
            onChange(set(value));
        }, 150);
    }, []);


    // For Sanity's form system events
    // TODO: Preprocess patches (e.g., normalize string input), Log/debug, Trigger analytics
    const handlePatchChange = (patch: PatchVariants, cb: (patch: FormPatch | FormPatch[] | PatchEvent) => void) => {
        return cb(patch);
    };

    // For DOM events with debouncing
    // TODO: Preprocess patches (e.g., normalize string input), Log/debug, Trigger analytics
    const handleDomChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: Function) => {
        let newValue = e.target?.value ?? '';

        setInputValue(newValue);

        if (debouncedChangeRef.current) {
            debouncedChangeRef.current(newValue, onChange);
        }
    };

    const renderInformationString = (
        string: string,
        id: string | undefined
    ) => {
        if (!string.length || !id) return null

        return (
            <AnimatePresence mode="wait">
                <MessageCard key={id + 'info'} id={id} level={'info'} message={informationString} />
            </AnimatePresence>
        )
    }

    const renderValidationMessages = (
        id: string | undefined,
        level: messageLevelType
    ) => {
        if (!validationMessages[level] || validationMessages[level].length === 0 || !id) return null

        return (
            <AnimatePresence mode="wait">
                <MessageCard key={id + level} id={id} level={level} messages={validationMessages[level]} />
            </AnimatePresence>
        )
    }


    const renderDescription =  useCallback((description: FieldProps["description"]) => {
        if (!description) return null;

        return <p>{description}</p>
    }, [])

    /** 
     * Some complex components shouldn't use a label for the field name and have their own separate nested label/input pairs
     * @returns Text or Label depending on field type checks
    */
    const renderFieldLabel = useCallback(({ schemaType, title, inputId }: Pick<FieldProps, "schemaType" | 'title' | 'inputId'>) => {
        if (!title) return null;

        if (
            // Dropdowns and Radio buttons have their own item labels and input elements.
            hasCustomLayout(schemaType) ||
            // Arrays with list options: Like radio buttons & dropdowns array fields
            // with predefined options have their own item labels and input elements.
            isArrayWithListOptions(schemaType) ||
            isPortableText(schemaType) ||
            isFieldSet(schemaType) ||
            isImage(schemaType) ||
            isFile(schemaType) ||
            // Reference fields: These have a complex UI with search functionality and item previews.
            isReference(schemaType) ||
            // Boolean fields: These typically render as toggle switches or checkboxes with their own labels.
            isBoolean(schemaType)
            || !inputId) {
            return <p className="text-base font-semibold text-amber-200">{title}</p>
        }

        return <label className="text-base font-semibold text-purple-600" htmlFor={inputId}>{title}</label>

    }, [])



    return { inputValue, setInputValue, setInformationString, handleDomChange, handlePatchChange, validationMessages, renderDescription, renderFieldLabel, renderInformationString, renderValidationMessages }
}
