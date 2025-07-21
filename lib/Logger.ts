import { ErrorInfo } from "react";

// Replace with a logging service
export default function logErrorToService(error: Error, info: ErrorInfo) {
    console.error("Error caught:", error, info); 
}
