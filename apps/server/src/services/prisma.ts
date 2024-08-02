import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()
async function main(message:string) {
    const user = await prisma.message.create({
      data: {
        content: message,
      },
    })
    console.log(user)
  }
  
export default main