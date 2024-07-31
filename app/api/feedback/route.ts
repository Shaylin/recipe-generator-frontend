import { GeneratedRecipeFeedback } from "@/app/api/feedback/generatedRecipeFeedback";
import ServiceRegistry from "@/services/serviceRegistry";

export async function POST(request: Request): Promise<Response> {
  const recipeFeedback = await request.json() as GeneratedRecipeFeedback;
  const feedbackService = ServiceRegistry.getFeedbackService();
  
  const feedbackSuccess = await feedbackService.sendFeedback(recipeFeedback.good, recipeFeedback.response);
  
  if (!feedbackSuccess) {
    return new Response(JSON.stringify({ message: `Failed to add ${recipeFeedback.response.title} to the database due to a server issue. Please contact the developer for support.` }), {
      status: 500
    });
  }
  
  return new Response(JSON.stringify({ message: recipeFeedback.response.title }), {
    status: 200
  });
}