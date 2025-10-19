import { createLoader } from "nuqs/server";
import { workflowsParams } from "../params";

export const useWorkflowsParamsLoader = createLoader(workflowsParams)