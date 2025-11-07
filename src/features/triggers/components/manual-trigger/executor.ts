import { NodeExecutor } from "@/features/executions/types";

type ManualTriggerData = Record<string, unknown>;
export const manualTriggerExecutor: NodeExecutor<ManualTriggerData> = async ({
    nodeId,
    context,
    step
}) => {
// Publish 'Loading' state for manual trigger

const result = await step.run("manual-trigger-wait", async () => context)

return result
}