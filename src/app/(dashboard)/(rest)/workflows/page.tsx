import { prefetchWorkflows } from "@/features/workflows/server/prefetch"
import { requireAuth } from "@/lib/auth-utils"
import { HydrateClient, prefetch } from "@/trpc/server"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { WorkflowsContainer, WorkflowsList } from "@/features/workflows/components/workflows" 
import type { SearchParams } from "nuqs/server"
import { workflowsParams } from "@/features/workflows/params"
import { useWorkflowsParamsLoader } from "@/features/workflows/server/params-loader"


type Props = {
  searchParams: Promise<SearchParams>
}

const Page = async ({ searchParams}: Props) => {
    await requireAuth()

const params = await useWorkflowsParamsLoader(searchParams)

    prefetchWorkflows(params)
  return (
    <WorkflowsContainer>
    <HydrateClient>
      <ErrorBoundary fallback={<p>Error!</p>}>
      <Suspense fallback={<p>Loading...</p>}>
      <WorkflowsList/>
      </Suspense>
      </ErrorBoundary>
    </HydrateClient></WorkflowsContainer>
  )
}
export default Page