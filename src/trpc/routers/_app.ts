
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { inngest } from '@/inngest/client';
import { createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { TRPCError } from '@trpc/server';
export const appRouter = createTRPCRouter({

  testAi: protectedProcedure.mutation(async () => {
    // throw new TRPCError({code:'BAD_REQUEST', message: 'testing error handling'})
    await inngest.send({
      name: 'execute/ai',
    })

    
  }),





  getWorkflows: protectedProcedure
    .query(({ ctx }) => {
      console.log({ userId: ctx.auth.user.id })
      return prisma.workflow.findMany()
    }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: 'test/hello.world',
      data: {
        email: "gerald"
      }
    })
    return prisma.workflow.create({
      data: {
        name: 'New Workflow 2'
      }
    })
  })
});
// export type definition of API
export type AppRouter = typeof appRouter;