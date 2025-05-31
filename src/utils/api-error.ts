export class ApiError extends Error {
  status: number;
  error: string;
  timestamp: number;
  details?: any; // Optional field for validation errors or additional details

  constructor(error: string, message: string, status: number, details?: any) {
    super(message);
    this.error = error;
    this.status = status;
    this.timestamp = Date.now();
    this.details = details;
  }
}
