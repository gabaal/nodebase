'use client'

import { Button } from "@/components/ui/button"
import { requireAuth } from "@/lib/auth-utils"
import { useTRPC } from "@/trpc/client"
import { caller } from "@/trpc/server"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

const Page = () => {
 const trpc = useTRPC()
 const queryClient = useQueryClient()
 const {data} = useQuery(trpc.getWorkflows.queryOptions())

 const create = useMutation(trpc.createWorkflow.mutationOptions({
  onSuccess: () => {
    toast.success('Job completed! 🎉')
 }}))

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
    protected server component
    <div>
      {JSON.stringify(data, null, 2)}
    </div>
    <Button disabled={create.isPending} onClick ={() => create.mutate()} >Create Workflow</Button>
    </div>
  )
}
export default Page