import { GeneratedRecipeFeedback } from "@/app/api/feedback/generatedRecipeFeedback";
import ServiceRegistry from "@/services/serviceRegistry";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const recipeFeedback = await request.json() as GeneratedRecipeFeedback;
  const feedbackService = ServiceRegistry.getFeedbackService();
  
  const feedbackSuccess = await feedbackService.sendFeedback(recipeFeedback.good, recipeFeedback.response);
  
  if (!feedbackSuccess) {
    return new NextResponse(JSON.stringify({ message: `Failed to add ${recipeFeedback.response.title} to the database due to a server issue. Please contact the developer for support.` }), {
      status: 500
    });
  }
  
  return new NextResponse(JSON.stringify({ message: recipeFeedback.response.title }), {
    status: 200
  });
}