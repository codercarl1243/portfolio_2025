import { RiErrorWarningLine, RiInformationLine, RiQuestionLine } from "@remixicon/react";
import { FormNodeValidation } from "sanity";

export type messageLevelType = FormNodeValidation["level"];

export default function useMessageCard() {
    const getTone = (level?: messageLevelType): "critical" | "caution" | "primary" => {
        switch (level) {
            case "warning":
                return "caution";
            case "info":
                return "primary";
            case "error":
            default:
                return "critical";
        }
    };

    const getHeading = (level?: messageLevelType): string => {
        switch (level) {
            case "warning":
                return "Warning";
            case "info":
                return "Information";
            case "error":
            default:
                return "Validation Error";
        }
    };
    const getRole = (level?: messageLevelType): "alert" | "note" | undefined => {
        switch (level) {
            case "info":
                return "note";
            case "warning":
            case "error":
                return "alert";
            default:
                return undefined;
        }
    };

    const getIcon = (level?: messageLevelType) => {
        switch (level) {
            case "warning":
                return RiQuestionLine;
            case "info":
                return RiInformationLine;
            case "error":
            default:
                return RiErrorWarningLine;
        }
    };

    return { getTone, getHeading, getRole, getIcon }
}
