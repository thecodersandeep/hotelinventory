import { ErrorHandler } from "@angular/core";

export class GlobalErrorHandling implements ErrorHandler {
    handleError(error: any): void {
        console.log(error);
    }

}