import { createApiRouteHandler } from "@/lib/api";
import { MsLearnProfile } from "@/types";

export const GET = createApiRouteHandler<MsLearnProfile>({
  endpoint: "https://mslearn.thenull.dev/",
  errorMessage: "Failed to fetch Microsoft Learn profile"
});
